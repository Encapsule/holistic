"use strict";

// ControllerAction-react-rehydrate-client-view.js
var holarchy = require("@encapsule/holarchy");

var React = require("react");

var ReactDOM = require("react-dom");

module.exports = new holarchy.ControllerAction({
  id: "d2vRmtn2QA6Ox8W4PwDWNA",
  name: "d2r2/React Client Display Adaptor: Rehydrate",
  description: "Rehydrate server-rendered React view and connect UI event handlers.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      sml: {
        ____types: "jsObject",
        actions: {
          ____types: "jsObject",
          react: {
            ____types: "jsObject",
            rehydrate: {
              ____types: "jsBoolean",
              ____inValueSet: [true]
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____accept: "jsUndefined"
  },
  // no response.result
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null,
      result: undefined
      /*no result*/

    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var message = request_.actionRequest.holarchy.sml.actions.react.rehydrate; // Resolve the full path to the d2r2 React Client Display Adaptor's input namespace.

      var rpResponse = holarchy.ObservableControllerData.dataPathResolve({
        opmBindingPath: request_.context.opmBindingPath,
        dataPath: "#.inputs"
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var pathInputs = rpResponse.result; // Read the d2r2 React Client Display Adaptor's input namespace from the OCD.

      var ocdResponse = request_.context.ocdi.readNamespace(pathInputs);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var inputs = ocdResponse.result; // Resolve the full path to the specified d2r2 render context namespace.

      rpResponse = holarchy.ObservableControllerData.dataPathResolve({
        opmBindingPath: request_.context.opmBindingPath,
        dataPath: inputs.clock.value.pathRenderContext
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var pathRenderContext = rpResponse.result; // Read the specified OCD namespace and use it as the d2r2 renderContext.

      ocdResponse = request_.context.ocdi.readNamespace(pathRenderContext);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var renderContext = ocdResponse.result; // Resolve the full path to the specified d2r2 render context namespace.

      rpResponse = holarchy.ObservableControllerData.dataPathResolve({
        opmBindingPath: request_.context.opmBindingPath,
        dataPath: inputs.clock.value.pathRenderData
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var pathRenderData = rpResponse.result; // Read the specifed OCD namespace and use it as the d2r2 renderData.

      ocdResponse = request_.context.ocdi.readNamespace(pathRenderData);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var renderData = ocdResponse.result; // ================================================================
      // ================================================================
      // ================================================================
      // THIS NEEDS TO BE REPLACED. WE WANT TO USE THE RAW DATA READ FROM
      // THE SPECIFIED RENDER CONTEXT AND RENDER DATA WITHOUT ANY MODIFICATION.
      // WE DO NOT WANT TO HAVE ANY KNOWLEDGE WHATEVER IN THIS MODEL ABOUT
      // THE FORMAT OF THESE MESSAGES.

      var legacyReactContext = {
        appStateContext: {
          // TODO: remove this especially
          ComponentRouter: inputs.ComponentRouter
        },
        document: renderContext,
        renderData: renderData
      }; // ================================================================
      // ================================================================
      // ================================================================

      var d2r2Component = React.createElement(inputs.ComponentRouter, legacyReactContext); // See: https://reactjs.org/docs/react-dom.html#hydrate

      ReactDOM.hydrate(d2r2Component, inputs.DOMElement, function () {
        // TODO: What should an external actor, in this case React, do if a transport error
        // occurs when calling opci.act? I think it's reasonable to provide some sort of centralized
        // error reporting of any and all act call failures. What's tricky is that we would like
        // action plug-ins to be able to provide custom error handling (i.e. possibly not report
        // or report in some custom way). And, we would like to be able to not worry about failures
        // in cases such as this example (in theory this _should_ never fail but) knowing that
        // they will be reported via a standardized mechanism and as such will not slip by unnoticed.
        var actResponse = request_.context.act({
          actorName: "React Rehydrate Completion Handler",
          actionDescription: "Signal completion of client application view rehydration via React.",
          actionRequest: {
            holarchy: {
              sml: {
                actions: {
                  ocd: {
                    clearBooleanFlag: {
                      path: "#.private.renderPending"
                    }
                  }
                }
              }
            }
          },
          opmBindingPath: request_.context.opmBindingPath
        }); // So for now I am going to throw an Error object.
        // - I want to know if this happens.
        // - I don't think it will happen.
        // - Buy some time to think this through

        if (actResponse.error) {
          console.error(actResponse.error);
          throw new Error(actResponse.error);
        }

        return;
      });
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});
/*

// See: https://reactjs.org/docs/react-dom.html#hydrate
// This code path executes on client application first run only. Subsequently, ReactDOM.render
// must be used to update view via appStateContext.renderPageContent function.
console.log("> Re-hydrating the server-rendered React page view...");

let DataRoutableComponent = React.createElement(appStateContext.ComponentRouter, reactDataContext);
ReactDOM.hydrate(DataRoutableComponent, targetDomElement, function() {
    console.log("> Client view re-hydration complete.");
    console.log("> Client application boot complete.");
    console.log("> Client application is now interactive.");
    console.log("================================================================");
});

*/