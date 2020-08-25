"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// SOURCES/LIB/holarchy/lib/intrinsics/ControllerAction-cpm-process-query.js
var arccore = require("@encapsule/arccore");

var ControllerAction = require("../../ControllerAction");

var cpmLib = require("./lib"); // const cpmMountingNamespaceName = require("../../filters/cpm-mounting-namespace-name");


var controllerAction = new ControllerAction({
  id: "r-JgxABoS_a-mSE2c1nvKA",
  name: "Cell Process Manager: Process Query",
  description: "Performs a query on a specific cell process managed by the Cell Process Manager.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        process: {
          ____types: "jsObject",
          query: {
            ____types: "jsObject",
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
            },
            queryCellProcess: {
              ____label: "Query Cell Process Override",
              ____description: "Allows the caller to optionally override that default action behavior to specify the cell process ID to query.",
              // If queryCellProcess object is ommitted, then we deduce the cell process ID from the controller action's outer apmBindingPath.
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
    parent: {
      ____label: "Parent Cell Process",
      ____description: "The cell process ID and apmBindingPath of the queried cell process' parent cell process.",
      ____types: ["jsUndefined", "jsObject"],
      cellProcessID: {
        ____accept: ["jsNull", "jsString"],
        ____defaultValue: null
      },
      apmBindingPath: {
        ____accept: ["jsNull", "jsString"],
        ____defaultValue: null
      }
    },
    ancestors: {
      ____label: "Ancestor Cell Processes",
      ____description: "An array of cell process ID and apmBindingPath descriptor objects that include the queried cell process' parent, it's parent...",
      ____types: ["jsUndefined", "jsArray"],
      element: {
        ____label: "Ancestor Cell Process",
        ____description: "The cell process ID and apmBindingPath of one of the queried cell process' ancestor cell process.",
        ____types: "jsObject",
        cellProcessID: {
          ____accept: "jsString"
        },
        apmBindingPath: {
          ____accept: "jsString"
        }
      }
    },
    children: {
      ____label: "Child Cell Processes",
      ____description: "An array of cell process ID and apmBindingPath descriptor objects that include the queried cell process' child processes.",
      ____types: ["jsUndefined", "jsArray"],
      element: {
        ____label: "Child Cell Process",
        ____description: "The cell process ID and apmBindingPath of one of the queried cell process' child cell process(es).",
        ____types: "jsObject",
        cellProcessID: {
          ____accept: "jsString"
        },
        apmBindingPath: {
          ____accept: "jsString"
        }
      }
    },
    descendants: {
      ____label: "Descendant Cell Processes",
      ____description: "An array of cell process ID and apmBindingPath descriptor objects that include the queried cell process' children, their children...",
      ____types: ["jsUndefined", "jsArray"],
      element: {
        ____label: "Descendant Cell Process",
        ____description: "The cell process ID and apmBindingPath of one of the queried cell process' descendant cell process(es).",
        ____types: "jsObject",
        cellProcessID: {
          ____accept: "jsString"
        },
        apmBindingPath: {
          ____accept: "jsString"
        }
      }
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
      var message = request_.actionRequest.holarchy.CellProcessor.process.query;

      if (!message.resultSets.parent && !message.resultSets.ancestors && !message.resultSets.children && !message.resultSets.descendants) {
        errors.push("Invalid cell process query request. If you explicitly set resultSets flags then you must set at least one result set Boolean flag.");
        break;
      }

      var cellProcessID = null;

      if (message.queryCellProcess) {
        if (!message.queryCellProcess.cellProcessID && !message.queryCellProcess.apmBindingPath && !message.queryCellProcess.cellProcessNamespace) {
          errors.push("Invalid cell process query request. If you explicitly set queryCellProcess then you must specify cellProcessID. Or either apmBindingPath or cellProcessNamespace so that cellProcessID can be calculated.");
          break;
        }

        cellProcessID = message.queryCellProcesscellProcessID ? message.queryCellProcess.cellProcessID : message.queryCellProcess.apmBindingPath ? arccore.identifier.irut.fromReference(message.queryCellProcess.apmBindingPath).result : arccore.identifier.irut.fromReference("~.".concat(message.queryCellProcess.cellProcessNamespace.apmID, "_CellProcesses.cellProcessMap.").concat(arccore.identifier.irut.fromReference(message.queryCellProcess.cellProcessNamespace.cellProcessUniqueName).result)).result;
      } else {
        cellProcessID = arccore.identifier.irut.fromReference(request_.context.apmBindingPath).result;
      } // Get a reference to the Cell Process Manager's process tree descriptor object.


      var cpmLibResponse = cpmLib.getProcessTreeData({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cellProcessTreeData = cpmLibResponse.result; // Get a reference to this cell process' descriptor.

      cpmLibResponse = cpmLib.getProcessDescriptor({
        cellProcessID: cellProcessID,
        treeData: cellProcessTreeData
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cellProcessDescriptor = cpmLibResponse.result;
      response.result = {
        query: _objectSpread(_objectSpread({}, cellProcessDescriptor), {}, {
          resultSets: message.resultSets
        })
      };

      if (message.resultSets.parent) {
        cpmLibResponse = cpmLib.getProcessParentDescriptor({
          cellProcessID: cellProcessID,
          treeData: cellProcessTreeData
        });

        if (cpmLibResponse.error) {
          errors.push(cpmLibResponse.error);
          break;
        }

        response.result.parent = cpmLibResponse.result;
      } // anscestors; parent and it's parent...


      if (message.resultSets.ancestors) {
        cpmLibResponse = cpmLib.getProcessAncestorDescriptors({
          cellProcessID: cellProcessID,
          treeData: cellProcessTreeData
        });

        if (cpmLibResponse.error) {
          errors.push(cpmLibResponse.error);
          break;
        }

        response.result.ancestors = cpmLibResponse.result;
      } // children


      if (message.resultSets.children) {
        cpmLibResponse = cpmLib.getProcessChildrenDescriptors({
          cellProcessID: cellProcessID,
          treeData: cellProcessTreeData
        });

        if (cpmLibResponse.error) {
          errors.push(cpmLibResponse.error);
          break;
        }

        response.result.children = cpmLibResponse.result;
      } // descendants; children and their children...


      if (message.resultSets.descendants) {
        cpmLibResponse = cpmLib.getProcessDescendantDescriptors({
          cellProcessID: cellProcessID,
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