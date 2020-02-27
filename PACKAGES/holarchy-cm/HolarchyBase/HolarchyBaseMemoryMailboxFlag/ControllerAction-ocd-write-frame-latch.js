"use strict"; // ControllerAction-ocd-write-frame-latch.js

var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.ControllerAction({
  id: "iyvk_9vhRn2qvrjOes5v7Q",
  name: "Frame Latch: Write",
  description: "Writes the value made observable by frame latch APM instance.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      cm: {
        ____types: "jsObject",
        actions: {
          ____types: "jsObject",
          frameLatch: {
            ____types: "jsObject",
            write: {
              ____types: "jsObject",
              path: {
                ____label: "Frame Latch Bound Namespace Path",
                ____accept: "jsString"
              },
              value: {
                ____label: "Write Value",
                ____opaque: true
              }
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____label: "Write Frame Latch Result",
    ____description: "This is generically a reference to the value written to the frame latch indicated by 'path'.",
    ____opaque: true
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var message = request_.actionRequest.holarchy.cm.actions.frameLatch.write;
      var rpResponse = holarchy.ObservableControllerData.dataPathResolve({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: message.path
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var apmBindingPath = rpResponse.result;
      var ocdResponse = request_.context.ocdi.writeNamespace("".concat(apmBindingPath, ".value"), message.value);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var setClockResponse = request_.context.act({
        actorName: "Write Frame Latch",
        actorDescriptor: "Responsible for updating the state of a frame latch OPM instance.",
        actionRequest: {
          holarchy: {
            cm: {
              actions: {
                ocd: {
                  setBooleanFlag: {
                    path: "#.clock"
                  }
                }
              }
            }
          }
        },
        apmBindingPath: apmBindingPath
      });

      if (setClockResponse.error) {
        errors.push(setClockResponse.error);
        break;
      }

      response.result = message.value;
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});