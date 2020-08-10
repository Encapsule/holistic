"use strict";

var ControllerAction = require("../../../ControllerAction");

var ObservableControllerData = require("../../../ObservableControllerData");

var controllerAction = new ControllerAction({
  id: "aXju3wSBQnufe0r51Y04wg",
  name: "Write Sub-Action Response",
  description: "A low-level utility action that dispatches a subaction returning the response to the caller and writing it also to the indicated OCD response namespace.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      core: {
        ____types: "jsObject",
        writeSubactionResponse: {
          ____types: "jsObject",
          subactionRequest: {
            ____label: "Sub-Action Request",
            ____description: "Some caller-specified action request that we're to dispatch on their behalf so that we can save the response in shared memory.",
            ____accept: "jsObject"
          },
          writeResponsePath: {
            ____label: "Write Response Path",
            ____description: "Absolute (begins in ~), cell-relative (begins in #), OCD path to write the subaction response. Note that relative paths are also supported here.",
            ____accept: "jsString"
          }
        }
      }
    }
  },
  actionResult: {
    ____types: "jsObject",
    error: {
      ____accept: ["jsNull", "jsString"]
    },
    result: {
      ____opaque: true
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
      var message = request_.actionRequest.holarchy.core.writeSubactionResponse;
      var rpResponse = ObservableControllerData.dataPathResolve({
        dataPath: message.writeResponsePath,
        apmBindingPath: request_.context.apmBindingPath
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var writeResponsePath = rpResponse.result; // resolved to absolute OCD path (that may be invalid).
      // Dispatch the subaction...

      var subactionResponse = request_.context.act({
        actorName: "Write Subaction Response",
        actorTaskDescription: "Dispatching caller-specified subaction in order to write the response to a caller-specified OCD namespace.",
        actionRequest: message.subactionRequest,
        apmBindingPath: request_.context.apmBindingPath
      });

      if (subactionResponse.error) {
        errors.push(subactionResponse.error);
      } else {
        response.result = subactionResponse.result.actionResult;
      } // Attempt to write the subaction response to the indicated namespace path.


      var ocdResponse = request_.context.ocdi.writeNamespace(writeResponsePath, response);

      if (ocdResponse.error) {
        errors.push("Failed to write subaction response to OCD path '".concat(writeResponsePath, "'. Operation failed with error:"));
        errors.push(ocdResponse.error);
        errors.push("See response.result for the actual subaction response that we were not able to write."); // TODO?

        response.result = subactionResponse;
      }

      break;
    } // end while


    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (!controllerAction.isValid()) {
  throw new Error(controllerAction.jsJSON());
}

module.exports = controllerAction;