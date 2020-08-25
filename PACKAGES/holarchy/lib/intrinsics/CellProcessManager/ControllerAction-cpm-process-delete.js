"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// SOURCES/LIB/holarchy/lib/intrinsics/ControllerAction-cpm-process-delete.js
var arccore = require("@encapsule/arccore");

var ControllerAction = require("../../ControllerAction");

var cpmMountingNamespaceName = require("../../filters/cpm-mounting-namespace-name");

var controllerAction = new ControllerAction({
  id: "4s_DUfKnQ4aS-xRjewAfUQ",
  name: "Cell Process Manager: Process Delete",
  description: "Requests that the Cell Process Manager delete a branch of the cell process tree.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        process: {
          ____types: "jsObject",
          "delete": {
            ____types: "jsObject",
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
  },
  actionResultSpec: {
    ____types: "jsObject",
    apmBindingPath: {
      ____accept: "jsString"
    },
    // this is the OCD path of deleted process' parent process
    cellProcessID: {
      ____accept: "jsString"
    } // this is an IRUT-format hash of parent process' apmBindingPath

  },
  // NOTE: Unlike most ControllerAction bodyFunctions, process delete action DOES NOT consider
  // request_.context.apmBindingPath at all!
  //
  // The process namespace of the cell process to delete is determined from the cell process tree digraph
  // using cellProcessID that is either specified directly. Or, that is calculated from from apmBindingPath
  // or cellProcessNamespace.
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      inBreakScope = true;
      console.log("Cell Process Manager process delete..."); // Dereference the body of the action request.

      var message = request_.actionRequest.holarchy.CellProcessor.process["delete"];

      if (!message.cellProcessID && !message.apmBindingPath && !message.cellProcessNamespace) {
        errors.push("You need to specify cellProcessID. Or eiter apmBindingPath or cellProcessNamespace so that cellProcessID can be calculated.");
        return "break";
      } // TODO: This should be converted to a cpmLib call


      var cellProcessID = message.cellProcessID ? message.cellProcessID : message.apmBindingPath ? arccore.identifier.irut.fromReference(message.apmBindingPath).result : arccore.identifier.irut.fromReference("~.".concat(message.cellProcessNamespace.apmID, "_CellProcesses.cellProcessMap.").concat(arccore.identifier.irut.fromReference(message.cellProcessNamespace.cellProcessUniqueName).result)).result; // Now we have to dereference the cell process manager's process digraph (always a single-rooted tree).

      var cellProcessTreePath = "~.".concat(cpmMountingNamespaceName, ".cellProcessTree");
      var ocdResponse = request_.context.ocdi.readNamespace(cellProcessTreePath);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        return "break";
      }

      var cellProcessTreeData = ocdResponse.result;
      var inDegree = cellProcessTreeData.digraph.inDegree(cellProcessID);

      switch (inDegree) {
        case -1:
          errors.push("Invalid cell process apmBindingPath or cellProcessID specified in cell process delete. No such cell process '".concat(cellProcessID, "'."));
          break;

        case 0:
          errors.push("You cannot delete the root cell process manager process using this mechanism! Delete the CellProcessor instance if that's what you really want to do.");
          break;

        case 1:
          // As expected...
          break;

        default:
          errors.push("Internal validation error inspecting the cell process digraph model. '".concat(cellProcessID, "' has inDegree === ").concat(inDegree, "? That should not be possible!"));
          break;
      }

      if (errors.length) {
        return "break";
      }

      var parentProcessID = cellProcessTreeData.digraph.inEdges(cellProcessID)[0].u;
      var processesToDelete = [];
      var digraphTraversalResponse = arccore.graph.directed.breadthFirstTraverse({
        digraph: cellProcessTreeData.digraph,
        options: {
          startVector: [cellProcessID]
        },
        visitor: {
          finishVertex: function finishVertex(request_) {
            processesToDelete.push(request_.u);
            return true;
          }
        }
      });

      if (digraphTraversalResponse.error) {
        errors.push(digraphTraversalResponse.error);
        return "break";
      }

      if (digraphTraversalResponse.result.searchStatus !== "completed") {
        errors.push("Internal validation error performing breadth-first visit of cell process digraph from cellProcessID = '".concat(cellProcessID, "'. Search did not complete?!"));
        return "break";
      }

      for (var i = 0; processesToDelete.length > i; i++) {
        var _cellProcessID = processesToDelete[i];
        var processDescriptor = cellProcessTreeData.digraph.getVertexProperty(_cellProcessID);
        var apmBindingPath = processDescriptor.apmBindingPath;
        var apmBindingPathTokens = apmBindingPath.split(".");
        var apmProcessesNamespace = apmBindingPathTokens.slice(0, apmBindingPathTokens.length - 1).join(".");
        var apmProcessesRevisionNamespace = [].concat(_toConsumableArray(apmBindingPathTokens.slice(0, apmBindingPathTokens.length - 2)), ["revision"]).join(".");
        ocdResponse = request_.context.ocdi.readNamespace(apmProcessesNamespace);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var processesMemory = ocdResponse.result;
        delete processesMemory[apmBindingPathTokens[apmBindingPathTokens.length - 1]];
        ocdResponse = request_.context.ocdi.writeNamespace(apmProcessesNamespace, processesMemory);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

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
        }

        cellProcessTreeData.digraph.removeVertex(_cellProcessID);
      }

      if (errors.length) {
        return "break";
      }

      ocdResponse = request_.context.ocdi.writeNamespace("".concat(cellProcessTreePath, ".revision"), cellProcessTreeData.revision + 1);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        return "break";
      }

      response.result = {
        apmBindingPath: cellProcessTreeData.digraph.getVertexProperty(parentProcessID).apmBindingPath,
        cellProcessID: parentProcessID
      };
      return "break";
    };

    while (!inBreakScope) {
      var _ret = _loop();

      if (_ret === "break") break;
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