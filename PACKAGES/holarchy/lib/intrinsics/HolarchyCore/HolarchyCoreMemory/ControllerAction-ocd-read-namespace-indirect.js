"use strict";

// ControllerAction-ocd-read-namespace-indirect.js
var ControllerAction = require("../../../../ControllerAction");

var ObservableControllerData = require("../../../ObservableControllerData");

module.exports = new ControllerAction({
  id: "Ve_kEFkGSMSgOqUWu9Yo_w",
  name: "OCD Read Namespace Indirect",
  description: "Reads and returns the value of OCD namespace via path indirection.",
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
            readNamespaceIndirect: {
              ____types: "jsObject",
              path2: {
                ____label: "Target Path Namespace Path",
                ____description: "The OCD path of the string namespace containing the OCD path of the target namespace to read.",
                ____accept: "jsString"
              }
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____opaque: true // response.result is whatever is stored in the target OCD namespace

  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var message = request_.actionRequest.holarchy.cm.actions.ocd.readNamespaceIndirect;
      var rpResponse = ObservableControllerData.dataPathResolve({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: message.path2
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var targetPath2 = rpResponse.result;
      rpResponse = holarchy.ObservableControllerData.dataPathResolve({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: targetPath2
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var targetPath = rpResponse.result;
      var ocdResponse = request_.context.ocdi.readNamespace(targetPath);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      response.result = ocdResponse.result;
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});