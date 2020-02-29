"use strict";

// ControllerAction-cell-process-create.js
var arccore = require("@encapsule/arccore");

var holarchy = require("@encapsule/holarchy");

module.exports = {
  id: "DNAoE5L3R-mY6jLAF2S95A",
  name: "Holistic App Client Runtime Subprocess Action",
  description: "Creates a cellular subprocess.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      cm: {
        ____types: "jsObject",
        actions: {
          ____types: "jsObject",
          cell: {
            ____types: "jsObject",
            process: {
              ____types: "jsObject",
              create: {
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
      var message = request_.actionRequest.holarchy.cm.actions.cell.process.create;
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
        errors.push("Cannot create a new cell process at APM binding path '".concat(targetProcessPath, "' because we cannot access this namespace's definition in the OCD runtime filter spec."));
        errors.push(ocdResponse.error);
        break;
      }

      var targetProcessNamespaceSpec = ocdResponse.result; // Here we rely on OPC to ensure the APM binding in the runtime filter spec appdsl annotations
      // means that the target is a cell without requiring any further redundant inspection of the
      // namespace filter spec declaration (this is OPC's job).

      if (!targetProcessNamespaceSpec.____appdsl || !targetProcessNamespaceSpec.____appdsl.apm) {
        errors.push("Cannot create a new cell process at APM binding path '".concat(targetProcessPath, "' because this namespace was not declared with an APM binding identifier."));
        break;
      }

      ocdResponse = request_.context.ocdi.writeNamespace(targetProcessPath, message.ocdInitData);

      if (ocdResponse.error) {
        errors.push("Cannot create a new cell process at APM binding path '".concat(targetProcessPath, "' due to error writing into the OCD namepsace:"));
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