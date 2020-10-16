"use strict";

// SOURCES/LIB/holarchy/lib/intrinsics/CellProcessManager/ControllerAction-cpm-process-create.js
var arccore = require("@encapsule/arccore");

var ControllerAction = require("../../../ControllerAction");

var cpmMountingNamespaceName = require("../../filters/cpm-mounting-namespace-name");

var cpmLib = require("./lib");

var controllerAction = new ControllerAction({
  id: "SdL0-5kmTuiNrWNu7zGZhg",
  name: "Cell Process Manager: Process Create",
  description: "Create a new child cell process bound to the specified APM that is owned by the requesting cell process, #. Or, the specified parent cell process (via override).",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        process: {
          ____types: "jsObject",
          create: {
            // Semantically, this should be thought of as a request to CPM to activate an owned process at coordinates lifespan is tied to the cell this action was called on via parent/child relationship.
            ____types: "jsObject",
            coordinates: {
              ____types: "jsObject",
              apmID: {
                ____accept: "jsString"
              },
              instanceName: {
                ____accept: "jsString",
                ____defaultValue: "singleton"
              }
            },
            cellProcessData: {
              ____accept: ["jsObject", "jsUndefined"]
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____types: "jsObject",
    apmBindingPath: {
      ____accept: ["jsNull", "jsString"],
      ____defaultValue: null
    },
    // this is the OCD path of the new process
    cellProcessID: {
      ____accept: ["jsNull", "jsString"],
      ____defaultValue: null
    } // This is an IRUT-format cell process ID

  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      console.log("[".concat(this.operationID, "::").concat(this.operationName, "] starting...")); // Read shared memory to retrieve a reference to the CPM's private process management data.

      var cpmLibResponse = cpmLib.getProcessManagerData.request({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cpmDataDescriptor = cpmLibResponse.result;
      var ownedCellProcesses = cpmDataDescriptor.data.ownedCellProcesses; // Dereference the body of the action request.

      var message = request_.actionRequest.holarchy.CellProcessor.process.create;
      cpmLibResponse = cpmLib.resolveCellProcessCoordinates.request({
        coordinates: {
          apmID: message.coordinates.apmID,
          instanceName: message.coordinates.instanceName
        },
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var coordinates = cpmLibResponse.result; // Query ownedCellProcesses.digraph to determine if the new cell process' ID slot has already been allocated (i.e. it's a disallowed duplicate process create request).

      if (ownedCellProcesses.digraph.isVertex(coordinates.cellProcessID)) {
        errors.push("The cell process could not be created as requested because cell process ID '".concat(coordinates.cellProcessID, "' is already active at path '").concat(coordinates.cellProcessPath, "'."));
        break;
      } // Get ownership report.


      cpmLibResponse = cpmLib.getProcessOwnershipReportDescriptor.request({
        cellPath: request_.context.apmBindingPath,
        cpmDataDescriptor: cpmDataDescriptor,
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push("The cell process could not be created as requested. While examining create process request made by an active cell at '".concat(request_.context.apmBindingPath, "' we were not able to deduce which cell process should be given ownership of the requested new cell process ID '").concat(coordinates.cellProcessID, "' to be activated at path '{coordinates.cellProcessPath}'. More detail:"));
        errors.push(cpmLibResponse.error);
        break;
      }

      var cellOwnershipReport = cpmLibResponse.result; // At this point we have cleared all hurdles and are prepared to create the new cell process.
      // We will do that first so that if it fails we haven't changed any CPM digraph models of the process table.

      var ocdResponse = request_.context.ocdi.writeNamespace(coordinates.cellProcessPath, message.cellProcessData);

      if (ocdResponse.error) {
        errors.push("Failed to create cell process ID '".concat(coordinates.cellProcessID, "' at path '").concat(coordinates.cellProcessPath, "' due to problems with the process initialization data specified."));
        errors.push(ocdResponse.error);
      } // Okay - the new cell process was created successfully!
      // Next we need to keep a record of what was done so we can undo it later. Unsuprisingly, this is a major pain in the ass to do this correctly. If you're here hunting bugs, sorry - really did my best! Otherwise, you're welcome.
      // So, now time for games w/the cellOwnershipVector and digraph.
      // The first element in the cellOwnershipVector always describes the cell that we've concluded is the caller's desired owner for the new cell process.
      // The last element in the cellOwnershipVector always describes first element's nearest-containing cell that is already being tracked by CPM (i.e. there's already a vertex for it in ownedCellProcesses.digraph.
      // If first === last then we're dealing with a cell we've dealth with previously in its lifespan that has just created itself a new child cell process.
      // If first !== last then [first...last) entries in the cellOwnershipVector describe the new cell processes owner (first entry) and an ordered list of its containers back to the point (last entry) where we've currently got a vertex in ownedCellProcesses.digraph.


      var parentCellOwnershipDescriptor = cellOwnershipReport.ownershipVector.pop();

      while (cellOwnershipReport.ownershipVector.length > 0) {
        var cellOwnershipDescriptor = cellOwnershipReport.ownershipVector.pop(); // pop from the end of the vector (ordered) to grab the descriptor of the cell that we know is already in ownedCellProcesses.digraph

        ownedCellProcesses.digraph.addVertex({
          u: cellOwnershipDescriptor.cellID,
          p: {
            apmBindingPath: cellOwnershipDescriptor.cellPath,
            role: "cell-process-helper",
            apmID: message.coordinates.apmID
          }
        });
        ownedCellProcesses.digraph.addEdge({
          e: {
            u: parentCellOwnershipDescriptor.cellID,
            v: cellOwnershipDescriptor.cellID
          }
        });
        parentCellOwnershipDescriptor = cellOwnershipDescriptor;
      } // Record the new cell process in the cell process manager's digraph.


      ownedCellProcesses.digraph.addVertex({
        u: coordinates.cellProcessID,
        p: {
          apmBindingPath: coordinates.cellProcessPath,
          role: "cell-process",
          apmID: message.coordinates.apmID
        }
      });
      ownedCellProcesses.digraph.addEdge({
        e: {
          u: parentCellOwnershipDescriptor.cellID,
          v: coordinates.cellProcessID
        }
      });
      ocdResponse = request_.context.ocdi.writeNamespace("".concat(cpmDataDescriptor.path, ".ownedCellProcesses.revision"), ownedCellProcesses.revision + 1);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var apmProcessesRevisionNamespace = "".concat(coordinates.cellProcessesPath, ".revision");
      ocdResponse = request_.context.ocdi.readNamespace(apmProcessesRevisionNamespace);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var apmProcessesRevision = ocdResponse.result;
      ocdResponse = request_.context.ocdi.writeNamespace(apmProcessesRevisionNamespace, apmProcessesRevision + 1);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      } // Respond back to the caller w/information about the newly-created cell process.


      response.result = {
        apmBindingPath: coordinates.cellProcessPath,
        cellProcessID: coordinates.cellProcessID
      };
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (!controllerAction.isValid()) {
  throw new Error(controllerAction.toJSON());
}

module.exports = controllerAction;