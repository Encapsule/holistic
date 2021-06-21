"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// SOURCES/LIB/holarchy/lib/intrinsics/ControllerAction-cpm-process-query.js
var arccore = require("@encapsule/arccore");

var ControllerAction = require("../../../ControllerAction");

var ObservableControllerData = require("../../../lib/ObservableControllerData");

var cpmLib = require("./lib");

var cellProcessQueryResponseDescriptorSpec = require("./lib/iospecs/cell-process-query-response-descriptor-spec");

var cellProcessQueryRequestFilterBySpec = require("./lib/iospecs/cell-process-query-request-filterby-spec");

var controllerAction = new ControllerAction({
  id: "r-JgxABoS_a-mSE2c1nvKA",
  name: "Cell Process Manager: Process Query",
  description: "Performs a query on a specific cell process managed by the Cell Process Manager.",
  actionRequestSpec: {
    ____types: "jsObject",
    CellProcessor: {
      ____types: "jsObject",
      cell: {
        ____types: "jsObject",
        cellCoordinates: {
          ____types: ["jsString", // because it might be a cellProcessPath or cellProcessID
          "jsObject" // because it might be a raw coordinates apmID, instanceName descriptor
          ],
          ____defaultValue: "#",
          // i.e. query the current cell
          apmID: {
            ____accept: "jsString"
          },
          instanceName: {
            ____accept: "jsString",
            ____defaultValue: "singleton"
          }
        },
        query: {
          ____types: "jsObject",
          filterBy: cellProcessQueryRequestFilterBySpec,
          resultSets: {
            ____types: "jsObject",
            ____defaultValue: {
              parent: true,
              ancestors: true,
              children: true,
              descendants: true
            },
            parent: {
              ____accept: "jsBoolean",
              ____defaultValue: false
            },
            ancestors: {
              ____accept: "jsBoolean",
              ____defaultValue: false
            },
            children: {
              ____accept: "jsBoolean",
              ____defaultValue: false
            },
            descendants: {
              ____accept: "jsBoolean",
              ____defaultValue: false
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____label: "Query Cell Process Action Result",
    ____description: "A descriptor object returned by act call to Cell Process Manager cell process query via response.result.actionResult.",
    ____types: "jsObject",
    query: {
      ____label: "Query Cell Process",
      ____description: "The cell process ID and apmBindingPath of the queried cell process.",
      ____types: "jsObject",
      cellProcessID: {
        ____accept: "jsString"
      },
      apmBindingPath: {
        ____accept: "jsString"
      },
      apmID: {
        ____accept: "jsString"
      },
      resultSets: {
        ____types: "jsObject",
        parent: {
          ____accept: "jsBoolean"
        },
        ancestors: {
          ____accept: "jsBoolean"
        },
        children: {
          ____accept: "jsBoolean"
        },
        descendants: {
          ____accept: "jsBoolean"
        }
      }
    },
    parent: _objectSpread({
      ____label: "Parent Cell Process",
      ____description: "The cell process ID and apmBindingPath of the queried cell process' parent cell process.",
      ____types: ["jsUndefined", "jsObject"]
    }, cellProcessQueryResponseDescriptorSpec),
    ancestors: {
      ____label: "Ancestor Cell Processes",
      ____description: "An array of cell process ID and apmBindingPath descriptor objects that include the queried cell process' parent, it's parent...",
      ____types: ["jsUndefined", "jsArray"],
      cellProcessDescriptor: cellProcessQueryResponseDescriptorSpec
    },
    children: {
      ____label: "Child Cell Processes",
      ____description: "An array of cell process ID and apmBindingPath descriptor objects that include the queried cell process' child processes.",
      ____types: ["jsUndefined", "jsArray"],
      childProcessDescriptor: cellProcessQueryResponseDescriptorSpec
    },
    descendants: {
      ____label: "Descendant Cell Processes",
      ____description: "An array of cell process ID and apmBindingPath descriptor objects that include the queried cell process' children, their children...",
      ____types: ["jsUndefined", "jsArray"],
      descendantProcessDescriptor: cellProcessQueryResponseDescriptorSpec
    }
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      console.log("Cell Process Manager process query...");
      var messageBody = request_.actionRequest.CellProcessor.cell;

      if (!messageBody.query.resultSets.parent && !messageBody.query.resultSets.ancestors && !messageBody.query.resultSets.children && !messageBody.query.resultSets.descendants) {
        errors.push("Invalid cell process query request. If you explicitly set resultSets flags then you must set at least one result set flag true.");
        break;
      }

      var unresolvedCoordinates = messageBody.cellCoordinates;

      if (Object.prototype.toString.call(unresolvedCoordinates) === "[object String]") {
        var ocdResponse = ObservableControllerData.dataPathResolve({
          apmBindingPath: request_.context.apmBindingPath,
          dataPath: unresolvedCoordinates
        });

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        unresolvedCoordinates = ocdResponse.result;
      } // TODO !!!
      // As we are currently calling this action there would seemingly be little trouble w/this resolution call.
      // However, when this action is called it will be dispatched w/request_.context.apmBindingPath set to the _cell_ binding path.
      // This may or may not be a cell process path depending on if the cell was explicity activated. Or, exists by virtue of
      // being part of (what we call a helper cell) of another cell that was explicitly activated.
      // SO... We expect that this call will fail when passed a cell coordindates vs process coordinates.


      var cpmLibResponse = cpmLib.resolveCellProcessCoordinates.request({
        coordinates: unresolvedCoordinates,
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push("YOU HAVE HIT A KNOWN LIMITATION OF @encapsule/holarchy v0.0.47-alexandrite:");
        errors.push(cpmLibResponse.error);
        break;
      }

      var resolvedCoordinates = cpmLibResponse.result;
      var cellProcessID = resolvedCoordinates.cellProcessID; // Get a reference to the Cell Process Manager's process tree descriptor object.

      cpmLibResponse = cpmLib.getProcessManagerData.request({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cpmDataDescriptor = cpmLibResponse.result;
      var cellProcessTreeData = cpmDataDescriptor.data.ownedCellProcesses; // Get a reference to this cell process' descriptor.

      cpmLibResponse = cpmLib.getProcessDescriptor.request({
        cellProcessID: cellProcessID,
        ocdi: request_.context.ocdi,
        treeData: cellProcessTreeData
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cellProcessDescriptor = cpmLibResponse.result;
      response.result = {
        query: _objectSpread(_objectSpread({}, cellProcessDescriptor), {}, {
          resultSets: messageBody.query.resultSets
        })
      };

      if (messageBody.query.resultSets.parent) {
        cpmLibResponse = cpmLib.getProcessParentDescriptor.request({
          cellProcessID: cellProcessID,
          filterBy: messageBody.query.filterBy,
          ocdi: request_.context.ocdi,
          treeData: cellProcessTreeData
        });

        if (cpmLibResponse.error) {
          errors.push(cpmLibResponse.error);
          break;
        }

        response.result.parent = cpmLibResponse.result;
      } // anscestors; parent and it's parent...


      if (messageBody.query.resultSets.ancestors) {
        cpmLibResponse = cpmLib.getProcessAncestorDescriptors.request({
          cellProcessID: cellProcessID,
          filterBy: messageBody.query.filterBy,
          ocdi: request_.context.ocdi,
          treeData: cellProcessTreeData
        });

        if (cpmLibResponse.error) {
          errors.push(cpmLibResponse.error);
          break;
        }

        response.result.ancestors = cpmLibResponse.result;
      } // children


      if (messageBody.query.resultSets.children) {
        cpmLibResponse = cpmLib.getProcessChildrenDescriptors.request({
          cellProcessID: cellProcessID,
          filterBy: messageBody.query.filterBy,
          ocdi: request_.context.ocdi,
          treeData: cellProcessTreeData
        });

        if (cpmLibResponse.error) {
          errors.push(cpmLibResponse.error);
          break;
        }

        response.result.children = cpmLibResponse.result;
      } // descendants; children and their children...


      if (messageBody.query.resultSets.descendants) {
        cpmLibResponse = cpmLib.getProcessDescendantDescriptors.request({
          cellProcessID: cellProcessID,
          filterBy: messageBody.query.filterBy,
          ocdi: request_.context.ocdi,
          treeData: cellProcessTreeData
        });

        if (cpmLibResponse.error) {
          errors.push(cpmLibResponse.error);
          break;
        }

        response.result.descendants = cpmLibResponse.result;
      }

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