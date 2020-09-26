"use strict";

var holodeck = require("@encapsule/holodeck");

var holarchy = require("@encapsule/holarchy");

var factoryResponse = holodeck.harnessFactory.request({
  id: "UBSclp3gSqCCmSvoG3W4tw",
  name: "CellProcessor Harness",
  description: "Constructs an instance of ES6 class CellProcessor and serializes it for inspection. There's a lot more we plan to do with this later.",
  harnessOptions: {
    idempotent: true
  },
  testVectorRequestInputSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        CellProcessor: {
          ____types: "jsObject",
          constructorRequest: {
            // CellProcessor constructor request object or pre-constructed CellProcessor class instance reference.
            ____opaque: true // accept any request and let CellModel sort it out

          },
          actRequests: {
            ____types: "jsArray",
            ____defaultValue: [],
            actRequest: {
              ____opaque: true // accept any request and let OPC sort it out

            }
          }
        }
      }
    }
  },
  testVectorResultOutputSpec: {
    ____types: "jsObject",
    construction: {
      ____types: "jsObject",
      ____defaultValue: {},
      isValid: {
        ____accept: "jsBoolean"
      },
      postConstructionToJSON: {
        ____accept: ["jsString", // The instance is invalid and this is this._private.constructorError string.
        "jsObject" // The instance is valid and this is this._private object.
        ]
      }
    },
    testActionLog: {
      ____label: "CellProcessor.act Calls Performed by the Test",
      ____types: "jsArray",
      ____defaultValue: [],
      testActionSummary: {
        ____types: "jsObject",
        testHarnessActionSummary: {
          ____types: "jsObject",
          actionRequest: {
            ____accept: "jsString",
            ____inValueSet: ["PASS", "FAIL"]
          },
          postActionCellProcessorEval: {
            ____accept: "jsString",
            ____inValueSet: ["SKIPPED", "PASS", "FAIL"]
          }
        },
        testHarnessActionDispatch: {
          ____types: "jsObject",
          actRequest: {
            ____accept: "jsObject"
          },
          actResponse: {
            ____types: "jsObject",
            error: {
              ____accept: ["jsNull", "jsString"]
            },
            result: {
              ____opaque: true
            }
          }
        },
        postActionToJSON: {
          ____accept: "jsObject"
        }
      } // testActionSummary

    }
  },
  harnessBodyFunction: function harnessBodyFunction(vectorRequest_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      inBreakScope = true;
      response.result = {
        phase1: []
      };
      var messageBody = vectorRequest_.vectorRequest.holistic.holarchy.CellProcessor;
      var cpInstance = messageBody.constructorRequest instanceof holarchy.CellProcessor ? messageBody.constructorRequest : new holarchy.CellProcessor(messageBody.constructorRequest);
      var serialized = JSON.parse(JSON.stringify(cpInstance)); // Remove non-idempotent information from the serialized OPC object.

      if (cpInstance.isValid()) {
        delete serialized.opc.iid;

        if (serialized.opc.lastEvalResponse && serialized.opc.lastEvalResponse.result) {
          delete serialized.opc.lastEvalResponse.result.summary.evalStopwatch;
        }
      }

      response.result = {
        construction: {
          isValid: cpInstance.isValid(),
          postConstructionToJSON: serialized
        },
        testActionLog: []
      };

      if (!cpInstance.isValid()) {
        return "break";
      }

      messageBody.actRequests.forEach(function (actRequest_) {
        delete cpInstance._private.opc._private.lastEvaluationResponse; // TODO: Figure out why this delete is necessary? Or, is it. I do not remember the details at this point. Seems harmless, so just a TODO.

        var actResponse = cpInstance.act(actRequest_); // Filter non-idempotent information out of the actResponse object.

        if (!actResponse.error) {
          // Might be nice to dump this information to stdout...
          console.log(actResponse.result.lastEvaluation.summary.evalStopwatch);
          delete actResponse.result.lastEvaluation.summary.evalStopwatch;
        }

        response.result.testActionLog.push({
          testHarnessActionSummary: {
            actionRequest: actResponse.error ? "FAIL" : "PASS",
            postActionCellProcessorEval: actResponse.error ? "SKIPPED" : actResponse.result.lastEvaluation.summary.counts.errors ? "FAIL" : "PASS"
          },
          testHarnessActionDispatch: {
            actRequest: actRequest_,
            actResponse: actResponse
          },
          postActionToJSON: JSON.parse(JSON.stringify(cpInstance.toJSON().opc.toJSON().ocdi.toJSON()))
        });
      }); // end for test CellProcessor.act calls

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

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;