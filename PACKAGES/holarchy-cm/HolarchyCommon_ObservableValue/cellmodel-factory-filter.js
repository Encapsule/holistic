"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ObservableValue-CellModel-factory-filter.js
var arccore = require("@encapsule/arccore");

var holarchy = require("@encapsule/holarchy");

var lib = require("./lib");

(function () {
  var filterDeclaration = {
    operationID: "pubMU3fRR7GItLYLDT4ePw",
    operationName: "ObservableValue CellModel Factory",
    operationDescription: "A filter that manufactures an ObservableValue CellModel class instance that is specialized to a specific value type.",
    inputFilterSpec: {
      ____label: "ObservableValue CellModel Factory Request",
      ____description: "Descriptor object sent to ObservableValue CellModel factory with instructions about how to specialize the desired CellModel instance.",
      ____types: "jsObject",
      cellID: {
        ____accept: "jsString"
      },
      // must be a unique IRUT
      apmID: {
        ____accept: "jsString"
      },
      // must be a unique IRUT
      valueTypeLabel: {
        ____accept: "jsString"
      },
      valueTypeDescription: {
        ____accept: "jsString"
      },
      valueTypeSpec: {
        ____label: "Value Data Specification",
        ____description: "An @encapsule/arccore.filter specification for the value type to be made observable.",
        ____accept: "jsObject" // This is an @encapsule/arccore.filter specification declaration.

      }
    },
    outputFilterSpec: {
      ____accept: "jsObject" // This is an @encapsule/holarchy CellModel class instance.

    },
    bodyFunction: function bodyFunction(factoryRequest_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var innerResponse = arccore.identifier.irut.isIRUT(factoryRequest_.cellID);

        if (!innerResponse.result) {
          errors.push("Invalid cellID value \"".concat(factoryRequest_.cellID, "\": ").concat(innerResponse.guidance));
          break;
        }

        innerResponse = arccore.identifier.irut.isIRUT(factoryRequest_.apmID);

        if (!innerResponse.result) {
          errors.push("Invalid apmID value \"".concat(factoryRequest_.apmID, "\": ").concat(innerResponse.guidance));
          break;
        }

        var cellMemorySpec = {
          ____types: "jsObject",
          ____defaultValue: {},
          value: _objectSpread({}, factoryRequest_.valueTypeSpec),
          revision: {
            ____types: "jsNumber",
            ____defaultValue: -1
          }
        };
        var cellModelDeclaration = {
          id: factoryRequest_.cellID,
          name: "".concat(factoryRequest_.valueTypeLabel, " ObservableValue Model"),
          description: "ObservableValue specialization for value type \"".concat(factoryRequest_.valueTypeLabel, "\"."),
          apm: {
            id: factoryRequest_.apmID,
            name: "".concat(factoryRequest_.valueTypeLabel, " ObservableValue Process"),
            description: "ObservableValue specialization for type \"".concat(factoryRequest_.valueTypeLabel, "\". Value description \"").concat(factoryRequest_.valueTypeDescription, "\""),
            ocdDataSpec: cellMemorySpec,
            steps: {
              "uninitialized": {
                description: "Default starting process step.",
                transitions: [{
                  transitionIf: {
                    always: true
                  },
                  nextStep: "observable-value-initialize"
                }]
              },
              "observable-value-initialize": {
                description: "ObservableValue is initializing.",
                transitions: [{
                  transitionIf: {
                    holarchy: {
                      cm: {
                        operators: {
                          ocd: {
                            compare: {
                              values: {
                                a: {
                                  value: -1
                                },
                                operator: "<",
                                b: {
                                  path: "#.revision"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  nextStep: "observable-value-ready"
                }, {
                  transitionIf: {
                    always: true
                  },
                  nextStep: "observable-value-reset"
                }]
              },
              "observable-value-reset": {
                description: "ObservableValue has not yet been written and is in reset process step."
              },
              "observable-value-ready": {
                description: "ObservableValue is ready and processing write action(s)."
              }
            }
          },
          actions: [// ----------------------------------------------------------------
          // holarchy.cm.actions.ObservableValue.reset
          {
            id: arccore.identifier.irut.fromReference("".concat(factoryRequest_.cellID, ".ControllerAction.reset")).result,
            name: "".concat(factoryRequest_.valueTypeLabel, " ObservableValue Reset"),
            description: "Resets the ".concat(factoryRequest_.valueTypeLabel, " ObservableValue cell process."),
            actionRequestSpec: {
              ____types: "jsObject",
              holarchy: {
                ____types: "jsObject",
                cm: {
                  ____types: "jsObject",
                  actions: {
                    ____types: "jsObject",
                    ObservableValue: {
                      ____types: "jsObject",
                      reset: {
                        ____accept: "jsObject"
                      }
                    }
                  }
                }
              }
            },
            actionResultSpec: {
              ____accept: "jsString",
              ____defaultValue: "okay"
            },
            bodyFunction: function bodyFunction(actionRequest_) {
              var response = {
                error: null
              };
              var errors = [];
              var inBreakScope = false;

              while (!inBreakScope) {
                inBreakScope = true;
                var libResponse = lib.getStatus(_objectSpread(_objectSpread({}, actionRequest_.context), {}, {
                  apmID: factoryRequest_.apmID
                }));

                if (libResponse.error) {
                  errors.push(libResponse.error);
                  break;
                } // const { cellMemory, cellProcess } = libResponse.result;


                var ocdResponse = actionRequest_.context.ocdi.writeNamespace(apmBindingPath, {});

                if (ocdResponse.error) {
                  errors.push(ocdResponse.error);
                  break;
                }

                break;
              }

              if (errors.length) {
                response.error = errors.join(" ");
              }

              return response;
            } // bodyFunction

          }, // action: holarchy.cm.actions.ObservableValue.reset
          // ----------------------------------------------------------------
          // holarchy.cm.actions.ObservableValue.write
          {
            id: arccore.identifier.irut.fromReference("".concat(factoryRequest_.cellID, ".ControllerAction.write")).result,
            name: "".concat(factoryRequest_.valueTypeLabel, " ObservableValue Write"),
            description: "Writes a new value to a ".concat(factoryRequest_.valueTypeLabel, " ObservableValue cell process."),
            actionRequestSpec: {
              ____types: "jsObject",
              holarchy: {
                ____types: "jsObject",
                cm: {
                  ____types: "jsObject",
                  actions: {
                    ____types: "jsObject",
                    ObservableValue: {
                      ____types: "jsObject",
                      write: {
                        ____types: "jsObject",
                        value: factoryRequest_.valueTypeSpec
                      }
                    }
                  }
                }
              }
            },
            actionResultSpec: {
              ____accept: "jsString",
              ____defaultValue: "okay"
            },
            bodyFunction: function bodyFunction(actionRequest_) {
              var response = {
                error: null
              };
              var errors = [];
              var inBreakScope = false;

              while (!inBreakScope) {
                inBreakScope = true;
                var libResponse = lib.getStatus(_objectSpread(_objectSpread({}, actionRequest_.context), {}, {
                  apmID: factoryRequest_.apmID
                }));

                if (libResponse.error) {
                  errors.push(libResponse.error);
                  break;
                }

                var _libResponse$result = libResponse.result,
                    cellMemory = _libResponse$result.cellMemory,
                    cellProcess = _libResponse$result.cellProcess;
                var messageBody = actionRequest_.actionRequest.holarchy.cm.actions.ObservableValue.write;
                cellMemory.__apmiStep = "observable-value-ready", cellMemory.value = messageBody.value;
                cellMemory.revision += 1;
                var ocdResponse = actionRequest_.context.ocdi.writeNamespace(cellProcess.apmBindingPath, cellMemory);

                if (ocdResponse.error) {
                  errors.push(ocdResponse.error);
                  break;
                }

                break;
              }

              if (errors.length) {
                response.error = errors.join(" ");
              }

              return response;
            } // bodyFunction

          }, // action holarcy.cm.actions.ObservableValue.write.value
          // ----------------------------------------------------------------
          // holarchy.cm.actions.ObservableValue.read
          {
            id: arccore.identifier.irut.fromReference("".concat(factoryRequest_.cellID, ".ControllerAction.read")).result,
            name: "".concat(factoryRequest_.valueTypeLabel, " ObservableValue Read"),
            description: "Reads the current value from a ".concat(factoryRequest_.valueTypeLabel, " ObservableValue cell."),
            actionRequestSpec: {
              ____types: "jsObject",
              holarchy: {
                ____types: "jsObject",
                cm: {
                  ____types: "jsObject",
                  actions: {
                    ____types: "jsObject",
                    ObservableValue: {
                      ____types: "jsObject",
                      read: {
                        ____types: "jsObject"
                      }
                    }
                  }
                }
              }
            },
            actionResultSpec: _objectSpread({}, cellMemorySpec),
            bodyFunction: function bodyFunction(actionRequest_) {
              return {
                error: "Not yet implemented."
              };
            }
          }],
          operators: [],
          subcells: []
        };
        var cellModel = new holarchy.CellModel(cellModelDeclaration);

        if (!cellModel.isValid()) {
          errors.push(cellModel.toJSON());
          break;
        }

        response.result = cellModel;
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  };
  var factoryResponse = arccore.filter.create(filterDeclaration);

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();