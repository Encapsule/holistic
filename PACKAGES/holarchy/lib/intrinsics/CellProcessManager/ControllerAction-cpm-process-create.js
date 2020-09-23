"use strict";

// SOURCES/LIB/holarchy/lib/intrinsics/CellProcessManager/ControllerAction-cpm-process-create.js
var arccore = require("@encapsule/arccore");

var ControllerAction = require("../../ControllerAction");

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
              ____accept: "jsObject",
              // An APM always defines an outer object w/known property names that we accept and pass through to action's body function.
              ____defaultValue: {}
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
                  ____accept: ["jsUndefined", "jsString"]
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
      console.log("Cell Process Manager process create..."); // Read shared memory to retrieve a reference to the CPM's private process management data.

      var cpmLibResponse = cpmLib.getProcessManagerData.request({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cpmDataDescriptor = cpmLibResponse.result;
      var ownedCellProcessesData = cpmDataDescriptor.data.ownedCellProcesses; // Dereference the body of the action request.

      var message = request_.actionRequest.holarchy.CellProcessor.process.create; // This is closely coupled w/the CellProcessor constructor filter.
      // TODO: Replace w/cpmLib call

      var apmProcessesNamespace = "~.".concat(message.apmID, "_CellProcesses"); // Query the ObservableCellData instance (ocdi) to determine if apmProcessNamespace exists.

      var ocdResponse = request_.context.ocdi.getNamespaceSpec(apmProcessesNamespace);

      if (ocdResponse.error) {
        errors.push("Invalid apmID value '".concat(message.apmID, "' specified. No CellModel registered in this CellProcessor based on this AbstractProcessModel."));
        errors.push(ocdResponse.error);
        break;
      }

      var apmProcessInstanceID = arccore.identifier.irut.fromReference(message.cellProcessUniqueName).result; // ... from which we can now derive the absolute OCD path of the new cell process (proposed).

      var apmBindingPath = "".concat(apmProcessesNamespace, ".cellProcessMap.").concat(apmProcessInstanceID); // ... from which we can now derive the new cell process ID (proposed).

      var cellProcessID = arccore.identifier.irut.fromReference(apmBindingPath).result; // Now we need to determine the actual cellProcessID of cell process that is to be assigned as the parent of the new child cell process.
      // NOTE: The CPM's cell process tree structure is used for managing the lifespan of cell processes; deleting a cell process via delete
      // process action will delete that cell process and all its decendants.

      var parentCellProcessID = null;
      var queryCellPath = null;

      if (!message.parentCellProcess) {
        queryCellPath = request_.context.apmBindingPath;
      } else {
        queryCellPath = message.parentCellProcess.apmBindingPath ? message.parentCellProcess.apmBindingPath : "~.".concat(message.parentCellProcess.cellProcessNamespace.apmID, "_CellProcesses.cellProcessMap.").concat(arccore.identifier.irut.fromReference(message.parentCellProcess.cellProcessNamespace.cellProcessUniqueName).result);
      } // NO EXPLICIT OVERRIDE PROVIDED.
      // Assume the caller is a cell that wants to create a child process. We care if that cell is a process or not. If it's not, then it's a cell owned by a process. And, we need to know which.


      cpmLibResponse = cpmLib.getOwnerProcessDescriptor.request({
        cellPath: queryCellPath,
        cpmDataDescriptor: cpmDataDescriptor,
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cellOwnershipVector = cpmLibResponse.result;
      parentCellProcessID = cellOwnershipVector.ownershipVector[cellOwnershipVector.ownershipVector.length - 1].cellProcessID; // is always the owning cell process
      // Query the process tree digraph to determine if the new cell process' ID slot has already been allocated (i.e. it's a disallowed duplicate process create request).

      if (ownedCellProcessesData.digraph.isVertex(cellProcessID)) {
        errors.push("Invalid cellProcessUniqueName value '".concat(message.cellProcessUniqueName, "' is not unique. Cell process '").concat(cellProcessID, "' already exists."));
        break;
      } // Query the process tree digraph to determine if the parent cell process ID exists.


      if (!ownedCellProcessesData.digraph.isVertex(parentCellProcessID)) {
        errors.push("The apmBindingPath '".concat(request_.context.apmBindingPath, "' specified by this request is not a valid parent cell process binding path."));
        errors.push("Cell process ID '".concat(parentCellProcessID, "' is not known to cell process manager."));
        break;
      } // Attempt to initialize the new cell process' shared memory.


      ocdResponse = request_.context.ocdi.writeNamespace(apmBindingPath, message.cellProcessInitData);

      if (ocdResponse.error) {
        errors.push("Failed to create cell process at path '".concat(apmBindingPath, "' due to problems with the process initialization data specified."));
        errors.push(ocdResponse.error);
      } // Record the new cell process in the cell process manager's digraph.


      ownedCellProcessesData.digraph.addVertex({
        u: cellProcessID,
        p: {
          apmBindingPath: apmBindingPath
        }
      });
      ownedCellProcessesData.digraph.addEdge({
        e: {
          u: parentCellProcessID,
          v: cellProcessID
        }
      });
      ocdResponse = request_.context.ocdi.writeNamespace("".concat(cpmDataDescriptor.path, ".ownedCellProcesses.revision"), ownedCellProcessesData.revision + 1);

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
        apmBindingPath: apmBindingPath,
        cellProcessID: cellProcessID
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