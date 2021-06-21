"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// SOURCES/LIB/holarchy/lib/intrinsics/ControllerAction-cpm-process-delete.js
var arccore = require("@encapsule/arccore");

var ControllerAction = require("../../../ControllerAction");

var ObservableControllerData = require("../../../lib/ObservableControllerData");

var cpmLib = require("./lib");

var cppLib = require("../CellProcessProxy/lib");

var controllerAction = new ControllerAction({
  id: "4s_DUfKnQ4aS-xRjewAfUQ",
  name: "Cell Process Manager: Process Delete",
  description: "Requests that the Cell Process Manager delete a branch of the cell process tree.",
  actionRequestSpec: {
    ____types: "jsObject",
    CellProcessor: {
      ____types: "jsObject",
      process: {
        ____types: "jsObject",
        processCoordinates: {
          ____types: ["jsString", // because it might be a cellProcessPath or cellProcessID
          "jsObject" // because it might be a raw coordinates apmID, instanceName descriptor
          ],
          ____defaultValue: "#",
          apmID: {
            ____accept: "jsString"
          },
          instanceName: {
            ____accept: "jsString",
            ____defaultValue: "singleton"
          }
        },
        deactivate: {
          ____accept: "jsObject"
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
  bodyFunction: function bodyFunction(request_) {
    var _this = this;

    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      inBreakScope = true;
      console.log("[".concat(_this.operationID, "::").concat(_this.operationName, "] action start..."));
      var messageBody = request_.actionRequest.CellProcessor.process;
      var unresolvedCoordinates = messageBody.processCoordinates;

      if (Object.prototype.toString.call(unresolvedCoordinates) === "[object String]") {
        if (!arccore.identifier.irut.isIRUT(unresolvedCoordinates).result) {
          if (unresolvedCoordinates.startsWith("#")) {
            var _ocdResponse = ObservableControllerData.dataPathResolve({
              apmBindingPath: request_.context.apmBindingPath,
              dataPath: unresolvedCoordinates
            });

            if (_ocdResponse.error) {
              errors.push(_ocdResponse.error);
              return "break";
            }

            unresolvedCoordinates = _ocdResponse.result;
          }
        }
      }

      var cpmLibResponse = cpmLib.resolveCellProcessCoordinates.request({
        coordinates: unresolvedCoordinates,
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        return "break";
      }

      var resolvedCoordinates = cpmLibResponse.result;
      var cellProcessID = resolvedCoordinates.cellProcessID;
      cpmLibResponse = cpmLib.getProcessManagerData.request({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        return "break";
      }

      var cpmDataDescriptor = cpmLibResponse.result;
      var ownedCellProcessesData = cpmDataDescriptor.data.ownedCellProcesses;
      var sharedCellProcessesData = cpmDataDescriptor.data.sharedCellProcesses;
      var inDegree = ownedCellProcessesData.digraph.inDegree(cellProcessID);

      switch (inDegree) {
        case -1:
          errors.push("Invalid cell process apmBindingPath or cellProcessID specified in cell process delete. No such cell process ID '".concat(cellProcessID, "'."));
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

      if (sharedCellProcessesData.digraph.isVertex(cellProcessID)) {
        if (sharedCellProcessesData.digraph.getVertexProperty(cellProcessID).role === "shared") {
          errors.push("Invalid cell process apmBindingPath or cellProcess ID specified in cell process delete. Cell process ID '".concat(cellProcessID, "' is a shared process that cannot be deleted w/Cell Process Manager process delete."));
          return "break";
        }
      }

      var parentProcessID = ownedCellProcessesData.digraph.inEdges(cellProcessID)[0].u;
      var processesToDelete = [];
      var digraphTraversalResponse = arccore.graph.directed.depthFirstTraverse({
        digraph: ownedCellProcessesData.digraph,
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

      var cellProcessRemoveIDs = [];

      for (var i = 0; processesToDelete.length > i; i++) {
        var cellID = processesToDelete[i];
        var cellDescriptor = ownedCellProcessesData.digraph.getVertexProperty(cellID);

        if (cellDescriptor.role === "cell-process") {
          cellProcessRemoveIDs.push(cellID);
          var apmBindingPath = cellDescriptor.apmBindingPath;
          var apmBindingPathTokens = apmBindingPath.split(".");
          var apmProcessesNamespace = apmBindingPathTokens.slice(0, apmBindingPathTokens.length - 1).join(".");
          var apmProcessesRevisionNamespace = [].concat(_toConsumableArray(apmBindingPathTokens.slice(0, apmBindingPathTokens.length - 2)), ["revision"]).join("."); // TODO: ObservableControllerData should abstract all common array and map type operations.
          // DELETE CELL PROCESS FROM ObservableControllerData.
          // You see... This is a horrible pattern. There are simpler way available even w/current OCD.
          // But, there's a reason why I insist on using writeNamespace even here. And, why we 100% need OCD to support containers natively.
          // Read the array...

          var _ocdResponse2 = request_.context.ocdi.readNamespace(apmProcessesNamespace);

          if (_ocdResponse2.error) {
            errors.push(_ocdResponse2.error);
            break;
          }

          var processesMemory = _ocdResponse2.result; // Delete the element (this is the cell process)...

          delete processesMemory[apmBindingPathTokens[apmBindingPathTokens.length - 1]]; // Write the entire array back into OCD (removing the cell process from OCD).

          _ocdResponse2 = request_.context.ocdi.writeNamespace(apmProcessesNamespace, processesMemory);

          if (_ocdResponse2.error) {
            errors.push(_ocdResponse2.error);
            break;
          } // There's no reason why OCD cannot also support an efficient namespace increment operator.


          _ocdResponse2 = request_.context.ocdi.readNamespace(apmProcessesRevisionNamespace);

          if (_ocdResponse2.error) {
            errors.push(_ocdResponse2.error);
            break;
          }

          var apmProcessesRevision = _ocdResponse2.result;
          _ocdResponse2 = request_.context.ocdi.writeNamespace(apmProcessesRevisionNamespace, apmProcessesRevision + 1);

          if (_ocdResponse2.error) {
            errors.push(_ocdResponse2.error);
            break;
          }
        }

        ownedCellProcessesData.digraph.removeVertex(cellID);
      }

      if (errors.length) {
        return "break";
      }

      var ocdResponse = request_.context.ocdi.writeNamespace("".concat(cpmDataDescriptor.path, ".ownedCellProcesses.revision"), ownedCellProcessesData.revision + 1);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        return "break";
      }

      var cppLibResponse = cppLib.removeOwnedProcesses.request({
        cpmData: cpmDataDescriptor.data,
        deletedOwnedCellProcesses: processesToDelete
      });

      if (cppLibResponse.error) {
        errors.push(cppLibResponse.error);
        return "break";
      }

      if (cppLibResponse.result.runGarbageCollector) {
        cppLibResponse = cppLib.collectGarbage.request({
          act: request_.context.act,
          cpmData: cpmDataDescriptor.data,
          ocdi: request_.context.ocdi
        });

        if (cppLibResponse.error) {
          errors.push(cppLibResponse.error);
          return "break";
        }

        ocdResponse = request_.context.ocdi.writeNamespace("".concat(cpmDataDescriptor.path, ".sharedCellProcesses.revision"), sharedCellProcessesData.revision + 1);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          return "break";
        }
      }

      response.result = {
        apmBindingPath: ownedCellProcessesData.digraph.getVertexProperty(parentProcessID).apmBindingPath,
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

    console.log("[".concat(this.operationID, "::").concat(this.operationName, "] action completed w/status '").concat(response.error ? "ERROR" : "SUCCESS", "'."));
    return response;
  }
});

if (!controllerAction.isValid()) {
  throw new Error(controllerAction.toJSON());
}

module.exports = controllerAction;