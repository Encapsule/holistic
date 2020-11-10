"use strict";

// ControllerAction-app-client-display-step-worker.js
var holarchy = require("@encapsule/holarchy");

var hacdLib = require("./lib");

var d2r2 = require("@encapsule/d2r2");

var d2r2ComponentsMap = require("@encapsule/d2r2-components");

var d2r2ComponentsAppPlatform = [];
Object.keys(d2r2ComponentsMap.components).forEach(function (key_) {
  d2r2ComponentsAppPlatform.push(d2r2ComponentsMap.components[key_]);
});
var controllerAction = new holarchy.ControllerAction({
  id: "U3iqspa5TKGXeLfES-6hXA",
  name: "Holistic App Client Display Adapter: Process Step Worker",
  description: "Performs actions on behalf of the Holistic App Client Display Adapter process.",
  actionRequestSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      app: {
        ____types: "jsObject",
        client: {
          ____types: "jsObject",
          display: {
            ____types: "jsObject",
            _private: {
              ____types: "jsObject",
              stepWorker: {
                ____types: "jsObject",
                action: {
                  ____accept: "jsString",
                  ____inValueSet: ["noop", "initialize-display-adapter"],
                  ____defaultValue: "noop"
                }
              }
            }
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
      var messageBody = request_.actionRequest.holistic.app.client.display._private.stepWorker;
      console.log("".concat(actorName, " processing \"").concat(messageBody.action, "\" request on behalf of app client kernel process."));
      var hacdLibResponse = hacdLib.getStatus.request(request_.context);

      if (hacdLibResponse.error) {
        errors.push(hacdLibResponse.error);
        break;
      }

      var displayAdapterStatus = hacdLibResponse.result;
      var displayAdapterCellData = displayAdapterStatus.cellMemory;
      var ocdResponse = void 0;

      switch (messageBody.action) {
        case "noop":
          break;

        case "initialize-display-adapter":
          if (displayAdapterCellData.config !== undefined) {
            errors.push("The display adapter has already been initialized!");
            break;
          }

          var targetDOMElement = document.getElementById(displayAdapterCellData.construction.idTargetDOMElement);

          if (!targetDOMElement) {
            errors.push("Cannot initialize the display adapter because the DOM element ID \"".concat(displayAdapterCellData.construction.idTargetDOMElement, "\" does not exist."));
            break;
          }

          var factoryResponse = d2r2.ComponentRouterFactory.create({
            d2r2ComponentSets: [d2r2ComponentsAppPlatform, displayAdapterCellData.construction.d2r2Components]
          });

          if (factoryResponse.error) {
            errors.push("Cannot initialize the display adapter because an error occurred d2r2 <ComponentRouter/> construction:");
            errors.push(factoryResponse.error);
            break;
          }

          var ComponentRouter = factoryResponse.result;
          ocdResponse = request_.context.ocdi.writeNamespace({
            apmBindingPath: request_.context.apmBindingPath,
            dataPath: "#.config"
          }, {
            targetDOMElement: targetDOMElement,
            ComponentRouter: ComponentRouter
          });

          if (ocdResponse.error) {
            errors.push(ocdResponse.error);
            break;
          }

          break;

        default:
          errors.push("Internal error: unhandled action \"".concat(messageBody.action, "\"."));
          break;
      }

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