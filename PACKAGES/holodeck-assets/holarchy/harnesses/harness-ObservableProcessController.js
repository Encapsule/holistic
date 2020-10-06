"use strict";

var arccore = require("@encapsule/arccore");

var holodeck = require("@encapsule/holodeck");

var holarchy = require("@encapsule/holarchy");

var factoryResponse = holodeck.harnessFactory.request({
  id: "54MiSgQdSiukMX4fIZJimg",
  name: "ObservableProcessControler Harness",
  description: "Constructs an instance of ES6 class ObservableProcessController, serializes it, and then executes some number of serialized act calls.",
  harnessOptions: {
    idempotent: true
  },
  testVectorRequestInputSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        ObservableProcessController: {
          ____types: "jsObject",
          constructorRequest: {
            // ObservableProcessController constructor request or pre-constructed ObservableProcessController class instance reference.
            ____opaque: true // accept any request and let OPC sort it out

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
    opcToJSON: {
      ____label: "Post-Construction State",
      ____accept: "jsObject"
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
        }
      }
    }
  },
  harnessBodyFunction: function harnessBodyFunction(request_) {
    var messageBody = request_.vectorRequest.holistic.holarchy.ObservableProcessController;
    var response = {
      error: null,
      result: {
        opcToJSON: null,
        actionEvaluations: []
      }
    };
    var opcInstance = messageBody.constructorRequest instanceof holarchy.ObservableProcessController ? messageBody.constructorRequest : new holarchy.ObservableProcessController(messageBody.constructorRequest);
    var toJSON = opcInstance.toJSON(); // TODO: Again - arccore.util.deepCopy/clone is proving to
    // be problematic. The intended contract of this export function
    // is very permissive - it should make a deep copy of whatever
    // you pass to it. Instead, here is a case that causes an exception.
    // This is concerning as the input request is a serialization object
    // derived from an OPC instance. We know that OPC.toJSON is currently
    // not really legitimate --- it's purpose is to allow a developer
    // to suspend a system of observable processes which implies a variant
    // contructor function (not supported currently). It's probably a reasonable
    // idea to immediately add ObservableProcessController._getTestData in
    // order to avoid taking a dependency on toJSON. This way we can later
    // fix toJSON to work as intended w/out breaking existing tests.

    var serialized = JSON.parse(JSON.stringify(toJSON)); // Let's just delete the known non-idempotent (i.e. volatile) timing information
    // and iid information in order to treat this as an idempotent test case.

    delete serialized.iid;

    if (serialized.lastEvalResponse && serialized.lastEvalResponse.result) {
      delete serialized.lastEvalResponse.result.summary.evalStopwatch;
    } // If we hit a construction failure then toJSON is going to return us a constructor error response descriptor


    if (serialized.result) {
      delete serialized.result.iid;

      if (serialized.result.lastEvalResponse && serialized.result.lastEvalResponse.result) {
        delete serialized.result.lastEvalResponse.result.summary.evalStopwatch;
      }
    }

    response.result.opcToJSON = serialized; // Dispatch act requests. Note we don't care about the object status. If the opci is invalid, then the logs will be full of errors.

    messageBody.actRequests.forEach(function (actRequest_) {
      // TODO: FIX THIS: This is a bug in OPC.act - should it delete last eval results on entry? Maybe in OPC._evaluate?
      delete opcInstance._private.lastEvalautionResponse;

      if (!opcInstance.isValid()) {
        response.result.actionEvaluations.push({
          actRequest: actRequest_,
          actResponse: {
            error: "OPC instance is invalid!"
          }
        });
        return;
      }

      var actResponse = opcInstance.act(actRequest_); // Delete non-idempotent data from the response.

      if (!actResponse.error) {
        delete actResponse.result.lastEvaluation.summary.evalStopwatch;
      } else {
        // TODO: FIX THIS: Depending on how act fails
        // it probably doesn't make sense to return last evaluation response in all cases (like this one).
        delete actResponse.result;
      }

      response.result.actionEvaluations.push({
        actRequest: actRequest_,
        actResponse: actResponse
      });
    });
    return response;
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;