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
            ____types: "jsObject",
            apmID: {
              ____accept: "jsString"
            },
            cellProcessUniqueName: {
              ____accept: "jsString",
              ____defaultValue: "singleton"
            },
            cellProcessInitData: {
              ____accept: ["jsObject", "jsUndefined"]
            },
            // This override is provided to support CellProcessor's intrinisic CellProcessManager process, ~.
            // If you think you actually need to use this facility, please let me know what your use case(s) are.
            parentCellProcess: {
              ____label: "Parent Cell Process Override",
              ____description: "Explicitly overrides default action behavior of using #, the action's outer apmBindingPath value, as the parent cell process for the new cell process.",
              ____types: ["jsUndefined", "jsObject"],
              // Either of
              cellProcessID: {
                ____accept: ["jsUndefined", "jsString"]
              },
              // Preferred
              // ... or
              apmBindingPath: {
                ____accept: ["jsUndefined", "jsString"]
              },
              // Equivalent, but less efficient
              // ... or
              cellProcessNamespace: {
                ____types: ["jsUndefined", "jsObject"],
                apmID: {
                  ____accept: "jsString"
                },
                cellProcessUniqueName: {
                  ____accept: "jsString",
                  ____defaultValue: "singleton"
                }
              }
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

      var message = request_.actionRequest.holarchy.CellProcessor.process.create; // TODO: Replace w/cpmLib call
      // This is closely coupled w/the CellProcessor constructor filter.

      var apmProcessesNamespace = "~.".concat(message.apmID, "_CellProcesses");
      var ocdResponse = request_.context.ocdi.getNamespaceSpec(apmProcessesNamespace);

      if (ocdResponse.error) {
        errors.push("The CellModel provided to this CellProcessor instance's constructor function did not register an AbstractProcessModel with ID '".concat(message.apmID, "'. So, we cannot create a cell process based on this APM ID because we have no ideas even what it is."));
        errors.push(ocdResponse.error);
        break;
      } // Based on how we constructed the query path, apmProcessNamespace, we now know that it is possible to dynamically add a cell bound to the specified APM.
      // Use the caller's cellProcessUniqueName to create an IRUT-format instance identifier...


      var newCellProcessInstanceID = arccore.identifier.irut.fromReference(message.cellProcessUniqueName).result; // ... from which we can now derive the absolute OCD path of the new cell process (proposed).

      var newCellProcessBindingPath = "".concat(apmProcessesNamespace, ".cellProcessMap.").concat(newCellProcessInstanceID); // ... from which we can now derive the new cell process ID (proposed).

      var newCellProcessID = arccore.identifier.irut.fromReference(newCellProcessBindingPath).result; // Query ownedCellProcesses.digraph to determine if the new cell process' ID slot has already been allocated (i.e. it's a disallowed duplicate process create request).

      if (ownedCellProcesses.digraph.isVertex(newCellProcessID)) {
        errors.push("Cannot create cell process ID '".concat(newCellProcessID, "' at path '").concat(newCellProcessBindingPath, "' because it is already active!"));
        break;
      } // Now we need to determine the actual cellProcessID of cell process that is to be assigned OWNERSHIP responsibility for the new child cell process.
      // Note that we are explicitly allowing the case that a helper be able to create a process and then discover this process as its own (as opposed to another cell's) child subsequently.


      var parentCellProcessID = null;
      var queryCellPath = null;

      if (!message.parentCellProcess) {
        // Use the caller's explicitly assigned apmBindingPath as the path to cell that is to be assigned ownership of the new cell process.
        // This is a bit tricky as this path may not actually correspond to a cell process but rather to a cell in the case that the cell actor making process create request may be doing so as a helper for another process.
        queryCellPath = request_.context.apmBindingPath;
      } else {
        queryCellPath = message.parentCellProcess.apmBindingPath ? message.parentCellProcess.apmBindingPath : "~.".concat(message.parentCellProcess.cellProcessNamespace.apmID, "_CellProcesses.cellProcessMap.").concat(arccore.identifier.irut.fromReference(message.parentCellProcess.cellProcessNamespace.cellProcessUniqueName).result);
      } // Now, regardless of if we took queryCellPath from the caller-specified apmBindingPath (typically set implicitly during OPC processing of APM operator and action requests),
      // or explicitly by the caller via the parentCellProcess override option, we attempt to deduce which cell should be assigned ownership responsibility for the proposed cell process.


      cpmLibResponse = cpmLib.getOwnerProcessDescriptor.request({
        cellPath: queryCellPath,
        cpmDataDescriptor: cpmDataDescriptor,
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push("Cannot create cell process because we cannot determine which other cell process should be assigned ownership of the proposed new cell process w/ID '".concat(newCellProcessID, "' at path '").concat(apmBindingPath, "'."));
        errors.push(cpmLibResponse.error);
        break;
      }

      var cellOwnershipReport = cpmLibResponse.result; // At this point we have cleared all hurdles and are prepared to create the new cell process.
      // We will do that first so that if it fails we haven't changed any CPM digraph models of the process table.

      ocdResponse = request_.context.ocdi.writeNamespace(newCellProcessBindingPath, message.cellProcessInitData);

      if (ocdResponse.error) {
        errors.push("Failed to create cell process ID '".concat(newCellProcessID, "' at path '").concat(newCellProcessBindingPath, "' due to problems with the process initialization data specified."));
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
            apmID: message.apmID
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
        u: newCellProcessID,
        p: {
          apmBindingPath: newCellProcessBindingPath,
          role: "cell-process",
          apmID: message.apmID
        }
      });
      ownedCellProcesses.digraph.addEdge({
        e: {
          u: parentCellOwnershipDescriptor.cellID,
          v: newCellProcessID
        }
      });
      ocdResponse = request_.context.ocdi.writeNamespace("".concat(cpmDataDescriptor.path, ".ownedCellProcesses.revision"), ownedCellProcesses.revision + 1);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var apmProcessesRevisionNamespace = "".concat(apmProcessesNamespace, ".revision");
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
        apmBindingPath: newCellProcessBindingPath,
        cellProcessID: newCellProcessID
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