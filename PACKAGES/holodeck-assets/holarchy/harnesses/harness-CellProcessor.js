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
    isValid: {
      ____accept: "jsBoolean"
    },
    cpJSON: {
      ____accept: ["jsString", // The instance is invalid and this is this._private.constructorError string.
      "jsObject" // The instance is valid and this is this._private object.
      ]
    },
    actionEvaluations: {
      ____label: "Post Action State",
      ____types: "jsArray",
      ____defaultValue: [],
      evaluationResponse: {
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
        },
        ocdJSON: {
          ____accept: "jsObject"
        }
      }
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
      var cpToJSON = JSON.parse(JSON.stringify(cpInstance)); // TODO: Filter non-idempotent info out of the cpToJSON payload written to holdeck 1 eval logs.

      response.result = {
        isValid: cpInstance.isValid(),
        cpJSON: cpToJSON,
        actionEvaluations: []
      };
      messageBody.actRequests.forEach(function (actRequest_) {
        delete cpInstance._private.opc._private.lastEvaluationResponse; // why? I got this from OPC test harness. Need to look into this...

        if (!cpInstance.isValid()) {
          response.result.actionEvaluations.push({
            actRequest: actRequest_,
            actResponse: {
              error: "CellProcessor instance is invalid!"
            }
          });
          return;
        }

        var actResponse = cpInstance.act(actRequest_);
        response.result.actionEvaluations.push({
          actRequest: actRequest_,
          actResponse: actResponse,
          ocdJSON: JSON.parse(JSON.stringify(cpInstance._private.opc._private.ocdi._private.storeData))
        });
      });
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