"use strict";

// ControllerAction-app-client-display-activate.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolisticHTML5ServicePackage = require("../cmasHolisticHTML5ServicePackage");

  var cmLabel = require("./cell-label");

  var actionLabel = "activate";

  var hacdLib = require("./lib");

  var React = require("react");

  var ReactDOM = require("react-dom");

  var controllerAction = new holarchy.ControllerAction({
    id: cmasHolisticHTML5ServicePackage.mapLabels({
      CM: cmLabel,
      ACT: actionLabel
    }).result.ACTID,
    name: "".concat(cmLabel, " Activate"),
    description: "Performs initial programmatic re-render of the display adapter's DIV target using d2r2 <ComponentRouter/> and a copy of the d2r2 renderData that the app server process used to render the static HTML5 content that resides currently in the display adapter's DIV target element.",
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
                activate: {
                  ____types: "jsObject",
                  windowLoadTimeMs: {
                    ____types: "jsNumber"
                  },
                  displayLayoutRequest: {
                    ____types: "jsObject",
                    renderData: {
                      // The routable portion of this.props bound to a <ComponentRouter/> instance
                      ____accept: "jsObject"
                    }
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
        var messageBody = request_.actionRequest.holistic.app.client.display._private.activate;
        console.log("".concat(actorName, " attempting to re-activate the suspended display process via Data-Driven ReactDOM.hydrate (@encapsule/d2r2)."));
        var hacdLibResponse = hacdLib.getStatus.request(request_.context);

        if (hacdLibResponse.error) {
          errors.push(hacdLibResponse.error);
          break;
        }

        var _hacdLibResponse$resu = hacdLibResponse.result,
            cellMemory = _hacdLibResponse$resu.cellMemory,
            cellProcess = _hacdLibResponse$resu.cellProcess;
        var displayAdapterStatus = hacdLibResponse.result;
        var displayAdapterCellData = displayAdapterStatus.cellMemory;

        if (displayAdapterCellData.__apmiStep !== "display-adapter-wait-kernel-config") {
          errors.push("This action may only be called once the app client display adapter process is in its \"display-adapter-wait-kernel-config\" step.");
          break;
        }

        var thisProps = {
          renderContext: {
            serverRender: true,
            ComponentRouter: cellMemory.config.ComponentRouter,
            act: request_.context.act,
            apmBindingPath: request_.context.apmBindingPath // This will be the holistic app client kernel - not a view process.

          },
          renderData: messageBody.displayLayoutRequest.renderData
        }; // This re-renders the exact context rendered via ReactDOM by the app server process again in the client
        // using markers embedded by React to make it fast. Effectively, this runs the React components through
        // their full lifecycle (whereas they are not mounted ever in the context of the app server process).

        var d2r2Component = React.createElement(cellMemory.config.ComponentRouter, thisProps);
        ReactDOM.hydrate(d2r2Component, cellMemory.config.targetDOMElement);
        console.log("> App server display process has been re-activated from deserialized bootDOM data via React.hydrate API."); // Re-render flipping the renderEnvironment flag to "client". Typically, this is used by the rendering d2r2 Component to trigger some sort of loading/spinner transition.

        delete thisProps.renderContext.serverRender;
        d2r2Component = React.createElement(cellMemory.config.ComponentRouter, thisProps);
        ReactDOM.render(d2r2Component, cellMemory.config.targetDOMElement);
        console.log("> App server display process has been replaced w/client display process from deserialized bootROM data via React.render API.");
        cellMemory.displayUpdateCount += 1;
        var ocdResponse = request_.context.ocdi.writeNamespace({
          apmBindingPath: cellProcess.apmBindingPath,
          dataPath: "#.displayUpdateCount"
        }, cellMemory.displayUpdateCount);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        console.log("> App client display process activation via d2r2/React update #".concat(cellMemory.displayUpdateCount, " complete."));
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
})();