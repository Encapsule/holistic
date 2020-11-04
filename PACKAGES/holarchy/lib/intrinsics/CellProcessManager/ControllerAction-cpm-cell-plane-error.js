"use strict";

// ControllerAction-cpm-cell-plane-error.js
var ControllerAction = require("../../../ControllerAction");

var controllerAction = new ControllerAction({
  id: "Rd5sgBjkSyq25-xIwydPRA",
  name: "Cell Process Manager: Cell Plane Error Handler",
  description: "This action is dispatched generically from OPC.act when an external actor makes an action request that produces a response.error. Or, a response.result.lastEvaluation containing transport error(s).",
  actionRequestSpec: {
    ____types: "jsObject",
    CellProcessor: {
      ____types: "jsObject",
      _private: {
        ____types: "jsObject",
        opcCellPlaneErrorNotification: {
          ____types: "jsObject",
          errorType: {
            ____accept: "jsString",
            ____inValueSet: ["action-error", "evaluation-error"]
          },
          opcActResponse: {
            ____accept: "jsObject"
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____accept: "jsString",
    ____defaultValue: "okay"
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var actorName = "[".concat(this.operationID, "::").concat(this.operationName, "]");
      console.log("".concat(actorName, " processing cell plane error notification from OPC."));
      /*
        Okay. If we even got this far then we already know a great deal about what
        may or may not be working. Specifically, we know that if the OPC was constructed
        by CellProcessor then this ControllerAction was registered (otherwise we would not
        be dispatched). And, we also know that CellProcessor constructor will always construct
        its OPC instance using the first-evaluation-on-construction option. And, this will initialize
        the CPM. And, any failure in CPM initialization will be considered by OPC as a fatal error
        that fails OPC.constructor resulting in a zombie CellProcessor instance that will not
        dispatch act method requests to its contained OPC instance (also a zombie in this case).
        So, here we are. And, actually we don't really care what happened; it's up to some app
        server/client kernel process to decide what to do about this based (typically) on
        interaction w/some derived app server/client process (that we know nothing about whatsoever
        at the CPM level of abstraction). And, we like it that way ;-)
      */
      // As above, we don't care particularly. Let's try to inform a holistic app server/client kernel process
      // about the error. Note that just like OPC.act makes best-effort to delegate external action error reports
      // to CPM, CPM makes best-effort to delegate to app server/client kernel process (that may not be registered
      // or may not be activated).

      var messageBody = request_.actionRequest.CellProcessor._private.opcCellPlaneErrorNotification;
      var cpmCellPlaneErrorString = null;

      if (messageBody.opcActResponse.error) {
        // We received the notification because some ControllerAction returned repsonse.error.
        cpmCellPlaneErrorString = messageBody.opcActResponse.error;
      } else {
        (function () {
          // We received the notification because OPC_.evaluate caught error(s) dispatching TransitionOperator(s) and/or ControllerAction(s).
          // Calculate an error string based on analysis of the OPC._evaluate algorithm's lastEvaluation telemetry result.
          var lastEvaluation = messageBody.opcActResponse.result.lastEvaluation;
          var failedEvalFrames = [];

          var _loop = function _loop(evalFrameIndex_) {
            var evalFrame = lastEvaluation.evalFrames[evalFrameIndex_];
            evalFrame.summary.reports.errors.forEach(function (errorCellID_) {
              failedEvalFrames.push({
                evalNumber: lastEvaluation.evalNumber,
                frameNumber: evalFrameIndex_,
                errorFrame: evalFrame.bindings[errorCellID_]
              });
            });
          };

          for (var evalFrameIndex_ = 0; evalFrameIndex_ < lastEvaluation.evalFrames.length; evalFrameIndex_++) {
            _loop(evalFrameIndex_);
          }

          var errorMessage = ["A total of ".concat(failedEvalFrames.length, " failed cell evaluations were found:")];
          failedEvalFrames.forEach(function (failedEvalFrameDescriptor_) {
            errorMessage.push(JSON.stringify(failedEvalFrameDescriptor_));
          });
          cpmCellPlaneErrorString = errorMessage.join(" ");
        })();
      }

      var errorNotificationActResponse = request_.context.act({
        actorName: actorName,
        actorTaskDescription: "Attempting to notifiy an active holistic app server/client kernel process about the OPC cell plane error.",
        actionRequest: {
          holistic: {
            app: {
              kernel: {
                _private: {
                  cpmCellPlaneErrorNotification: {
                    errorType: messageBody.errorType,
                    badResponse: {
                      error: cpmCellPlaneErrorString,
                      result: messageBody.opcActResponse.result
                    }
                  } // messageBody

                }
              }
            }
          }
        }
      });
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