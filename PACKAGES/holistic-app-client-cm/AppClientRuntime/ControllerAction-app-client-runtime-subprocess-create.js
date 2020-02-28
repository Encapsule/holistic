"use strict";

// ControllerAction-app-client-runtime-subprocess-create.js
var arccore = require("@encapsule/arccore");

var holarchy = require("@encapsule/holarchy");

module.exports = {
  id: "DNAoE5L3R-mY6jLAF2S95A",
  name: "Holistic App Client Runtime Subprocess Action",
  description: "Creates a cellular subprocess.",
  actionRequestSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      client: {
        ____types: "jsObject",
        cm: {
          ____types: "jsObject",
          HolisticAppRuntime: {
            ____types: "jsObject",
            actions: {
              ____types: "jsObject",
              subprocessCreate: {
                ____types: "jsObject",
                apmBindingPath: {
                  ____accept: "jsString"
                },
                ocdInitData: {
                  ____accept: "jsObject",
                  ____defaultValue: {}
                }
              }
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____types: "jsObject",
    apmBindingPath: {
      ____accept: "jsString"
    },
    processID: {
      ____accept: "jsString"
    }
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      erorr: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var message = request_.actionRequest.holistic.client.cm.HolisticAppRuntime.actions.subprocessCreate;
      var rpResponse = holarchy.ObservableControllerData.dataPathResolve({
        dataPath: message.apmBindingPath,
        apmBindingPath: request_.context.apmBindingPath
      });

      if (rpResponse.error) {
        errors.push(rpRepsonse.error);
        break;
      }

      var targetProcessPath = rpResponse.result;
      var ocdResponse = request_.context.ocdi.getNamespaceSpec(targetProcessPath);

      if (ocdResponse.error) {
        errors.push("Target APM binding address does not exist in the OCD filter spec.");
        errors.push(ocdResponse.error);
        break;
      }

      var targetProcessNamespaceSpec = ocdResponse.result;

      if (!targetProcessNamespaceSpec.____types || !(targetProcessNamespaceSpec.____types === "jsObject") || !targetProcessNamespaceSpec.____appdsl || !targetProcessNamespaceSpec.____appdsl.apm) {
        errors.push("Target APM binding address specifies an OCD namespace that has no APM binding annotation in its filter spec.");
        break;
      }

      ocdResponse = request_.context.ocdi.writeNamespace(targetProcessPath, message.ocdInitData);

      if (ocdResponse.error) {
        error.push(ocdResponse.error);
      }

      response.result = {
        apmBindingPath: targetProcessPath,
        processID: arccore.identifier.irut.fromReference(targetProcessPath).result
      };
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  } // bodyFunction

};