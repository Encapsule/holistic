"use strict";

// ControllerAction-clear-boolean-flag.js
var ControllerAction = require("../../../../ControllerAction");

var ObservableControllerData = require("../../../ObservableControllerData");

module.exports = new ControllerAction({
  id: "_yxWfFLnTqqN-UxRdd7W5w",
  name: "OCD Boolean Flag Clear",
  description: "Set the Boolean-type OCD namespace specified by path to value false.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      cm: {
        ____types: "jsObject",
        actions: {
          ____types: "jsObject",
          ocd: {
            ____types: "jsObject",
            clearBooleanFlag: {
              ____types: "jsObject",
              path: {
                ____accept: "jsString"
              }
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____accept: "jsUndefined"
  },
  // no result
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var message = request_.actionRequest.holarchy.cm.actions.ocd.clearBooleanFlag;
      var rpResponse = ObservableControllerData.dataPathResolve({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: message.path
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var ocdResponse = request_.context.ocdi.writeNamespace(rpResponse.result, false);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
      }

      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  } // end bodyFunction

});