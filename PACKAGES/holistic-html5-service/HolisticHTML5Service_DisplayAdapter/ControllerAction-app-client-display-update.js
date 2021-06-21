"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ControllerAction-app-client-display-update.js
var holarchy = require("@encapsule/holarchy");

var hacdLib = require("./lib");

var React = require("react");

var ReactDOM = require("react-dom"); /// OH GOOD LORD --- Just realized I have been staring at this module when
/// when the _actual_ contract that matters really is in ControllerAction-pump...


var controllerAction = new holarchy.ControllerAction({
  id: "RlNHSKNBT32xejFqjsiZyg",
  name: "Holistic App Client Display Adapter: Update Display Layout",
  description: "Performs a programmatic re-rendering of the display adapter's DIV target using d2r2 <ComponentRouter/>.",
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
            update: {
              ____label: "Data-Driven React Render (d2r2) Command Request",
              ____description: "Leverages an in-memory database of d2r2Component filter instances registered w/the holistic service's DisplayAdapter cell to dynamically bind thisProps to 1:N React.Component classes in order to synthesize a React.Element that is rendered via React to the targetDOMElement.",
              ____types: "jsObject",
              renderContext: {
                ____label: "this.props.renderContext Overrides",
                ____types: "jsObject",
                ____defaultValue: {},
                apmBindingPath: {
                  ____accept: ["jsUndefined", // If not specified then this action will use its request_.context.apmBindingPath
                  "jsString" // The apmBindingPath of the cell process to pass through to the root React.Element instead of request_.context.apmBindingPath
                  ]
                },
                viewDisplayPath: {
                  ____accept: "jsString"
                }
              },
              // v0.0.59-whitecoral --- DISABLE THIS FINALLY

              /*
              // ================================================================
              // i.e. NEVER USE THIS UNTIL I HAVE TIME TO REMOVE THIS
              // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
              renderData: {
                  // DEPRECATED
                  // The routable portion of this.props bound to a <ComponentRouter/> instance
                  ____accept: [
                      "jsUndefined", // Prefer to use thisProps that will be made mandatory in a short time.
                      // "jsObject" FORCE A VALIDATION ERROR TO SEE IF ANYONE IS USING THIS
                  ]
              },
              */
              // ////////////////////////////////////////////////////////////////
              // ================================================================
              // v=== USE THIS INSTEAD! (NOTE YOU'RE RESPONSIBLE (ENTIRELY) FOR SETTING thisProps.renderData. AS THIS IS WHAT <ComponentRouter/> uses (exclusively) to route its this.props to 1:N of your registered d2r2 Components (aka React.Element generator filters).
              thisProps: {
                ____label: "Component Props",
                ____description: "If specified, this is assumed to be the entirety of the actor's d2r2 render request descriptor bound to the <1:N/> resolved by <ComponentRouter/>. Note that you cannot influence the values sent via thisProps.renderContext except via overrides allowed by this request.",
                ____accept: "jsObject",
                ____defaultValue: {
                  renderData: {
                    forceDisplayError: "You didn't specify any renderData!"
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

      try {
        var actorName = "[".concat(this.operationID, "::").concat(this.operationName, "]");
        var messageBody = request_.actionRequest.holistic.app.client.display.update;
        console.log("".concat(actorName, " attempting add/remove active display processes via Data-Driven ReactDOM.render (@encapsule/d2r2)."));
        var hacdLibResponse = hacdLib.getStatus.request(request_.context);

        if (hacdLibResponse.error) {
          errors.push(hacdLibResponse.error);
          break;
        }

        var _hacdLibResponse$resu = hacdLibResponse.result,
            cellMemory = _hacdLibResponse$resu.cellMemory,
            cellProcess = _hacdLibResponse$resu.cellProcess;

        switch (cellMemory.__apmiStep) {
          case "display-adapter-ready":
          case "display-adapter-wait-display-view":
            break;

          default:
            errors.push("This action may only be called once the app client display adapter process is in either \"display-adapter-ready\" or \"display-adapter-wait-display-view\" step.");
            break;
        }

        var thisProps = _objectSpread(_objectSpread({}, messageBody.thisProps), {}, {
          renderContext: {
            // NOTE: serverRender Boolean flag is not set here; it is only ever set during initial server-side rendering and initial client-side display activation.
            ComponentRouter: cellMemory.config.ComponentRouter,
            act: request_.context.act,
            apmBindingPath: messageBody.renderContext.apmBindingPath ? messageBody.renderContext.apmBindingPath : request_.context.apmBindingPath
          }
        });

        if (messageBody.renderData) {
          thisProps.renderData = messageBody.renderData;
        }

        var reactElement = React.createElement(cellMemory.config.ComponentRouter, thisProps);
        ReactDOM.render(reactElement, cellMemory.config.targetDOMElement);
        cellMemory.displayUpdateCount += 1;
        var ocdResponse = request_.context.ocdi.writeNamespace({
          apmBindingPath: cellProcess.apmBindingPath,
          dataPath: "#.displayUpdateCount"
        }, cellMemory.displayUpdateCount);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        console.log("> d2r2/React display process update #".concat(cellMemory.displayUpdateCount, " completed."));
        break;
      } catch (exception_) {
        errors.push("AN EXCEPTION OCCURRED INSIDE THE APP CLIENT DISPLAY ADAPATER UPDATE ACTION:");
        errors.push(exception_.message);
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