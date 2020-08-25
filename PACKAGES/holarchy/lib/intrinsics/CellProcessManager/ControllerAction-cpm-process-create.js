"use strict";

// SOURCES/LIB/holarchy/lib/intrinsics/ControllerAction-cpm-process-create.js
var arccore = require("@encapsule/arccore");

var ControllerAction = require("../../ControllerAction");

var cpmMountingNamespaceName = require("../../filters/cpm-mounting-namespace-name");

var controllerAction = new ControllerAction({
  id: "SdL0-5kmTuiNrWNu7zGZhg",
  name: "Cell Process Manager: Process Create",
  description: "Requests that the Cell Process Manager create a new cell process inside the CellProcessor runtime host instance.",
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
              ____accept: ["jsUndefined", "jsString"]
            },
            cellProcessInitData: {
              ____accept: "jsObject",
              ____defaultValue: {}
            },
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
      console.log("Cell Process Manager process create..."); // Dereference the body of the action request.

      var message = request_.actionRequest.holarchy.CellProcessor.process.create; // This is closely coupled w/the CellProcessor constructor filter.

      var apmProcessesNamespace = "~.".concat(message.apmID, "_CellProcesses"); // Query the ObservableCellData instance (ocdi) to determine if the apmID value passed by the caller induces an apmProcessNamespace value that's been pre-defined by the CellProcessor constructor.

      var ocdResponse = request_.context.ocdi.getNamespaceSpec(apmProcessesNamespace);

      if (ocdResponse.error) {
        errors.push("Invalid apmID value '".concat(message.apmID, "' specified. No CellModel registered in this CellProcessor based on this AbstractProcessModel."));
        errors.push(ocdResponse.error);
        break;
      } // Derive the IRUT-format hash of the caller's specified cellProcessUniqueName. Or, if not specified use a IRUT-format v4 UUID instead.
      // The implication here is test vector log stability in holodeck primarily:
      // So, I recommend but do not require that derived apps / services always specifiy cellProcessUniqueName value.


      var apmProcessInstanceID = message.cellProcessUniqueName ? arccore.identifier.irut.fromReference(message.cellProcessUniqueName).result : arccore.identifier.irut.fromEther(); // ... from which we can now derive the absolute OCD path of the new cell process (proposed).

      var apmBindingPath = "".concat(apmProcessesNamespace, ".cellProcessMap.").concat(apmProcessInstanceID); // ... from which we can now derive the new cell process ID (proposed).

      var cellProcessID = arccore.identifier.irut.fromReference(apmBindingPath).result; // Now we need to determine the actual cellProcessID of cell process that is to be assigned as the parent of the new child cell process.
      // NOTE: The CPM's cell process tree structure is used for managing the lifespan of cell processes; deleting a cell process via delete
      // process action will delete that cell process and all its decendants.

      var parentCellProcessID = void 0;

      if (!message.parentCellProcess) {
        parentCellProcessID = arccore.identifier.irut.fromReference(request_.context.apmBindingPath).result;
      } else {}

      parentCellProcessID = !message.parentCellProcess ? // if no override...
      arccore.identifier.irut.fromReference(request_.context.apmBindingPath).result : // ... IRUT hash the outer context.apmBindingPath (aka #)
      // else if override
      message.parentCellProcess.cellProcessID ? // ... If the override specifies a cellProcessID ...
      message.parentCellProcess.cellProcessID : // ... use it
      // else
      message.apmBindingPath ? // ... If the override specifies an apmBindingPath ...
      arccore.identifier.irut.fromReference(message.parentCellProcess.apmBindingPath).result : // ... use it
      // else
      // ... deduce from apmID, cellProcessUniqueName and path conventions defined by CellProcess and CPM.
      arccore.identifier.irut.fromReference("~.".concat(message.parentCellProcess.cellProcessNamespace.apmID, "_CellProcesses.cellProcessMap.").concat(arccore.identifier.irut.fromReference(message.parentCellProcess.cellProcessNamespace.cellProcessUniqueName).result)).result; // TODO: Convert to cpmLib call.
      // Now we have to dereference the cell process manager's cell process tree digraph runtime model

      var cellProcessTreePath = "~.".concat(cpmMountingNamespaceName, ".cellProcessTree"); // Read shared memory to retrieve a reference to the process manager's process tree data.

      ocdResponse = request_.context.ocdi.readNamespace(cellProcessTreePath);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var cellProcessTreeData = ocdResponse.result; // Query the process tree digraph to determine if the new cell process' ID slot has already been allocated (i.e. it's a disallowed duplicate process create request).

      if (cellProcessTreeData.digraph.isVertex(cellProcessID)) {
        errors.push("Invalid cellProcessUniqueName value '".concat(message.cellProcessUniqueName, "' is not unique. Cell process '").concat(cellProcessID, "' already exists."));
        break;
      } // Query the process tree digraph to determine if the parent cell process ID exists.


      if (!cellProcessTreeData.digraph.isVertex(parentCellProcessID)) {
        errors.push("The apmBindingPath '".concat(request_.context.apmBindingPath, "' specified by this request is not a valid parent cell process binding path."));
        errors.push("Cell process ID '".concat(parentCellProcessID, "' is not known to cell process manager."));
        break;
      } // Attempt to initialize the new cell process' shared memory.


      ocdResponse = request_.context.ocdi.writeNamespace(apmBindingPath, message.cellProcessInitData);

      if (ocdResponse.error) {
        errors.push("Failed to create cell process at path '".concat(apmBindingPath, "' due to problems with the process initialization data specified."));
        errors.push(ocdResponse.error);
      } // Record the new cell process in the cell process manager's digraph.


      cellProcessTreeData.digraph.addVertex({
        u: cellProcessID,
        p: {
          apmBindingPath: apmBindingPath
        }
      });
      cellProcessTreeData.digraph.addEdge({
        e: {
          u: parentCellProcessID,
          v: cellProcessID
        }
      });
      ocdResponse = request_.context.ocdi.writeNamespace("".concat(cellProcessTreePath, ".revision"), cellProcessTreeData.revision + 1);

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