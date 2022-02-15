"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ControllerAction-app-client-display-pump-display-view-stream.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolisticHTML5ServicePackage = require("../cmasHolisticHTML5ServicePackage");

  var hacdLib = require("./lib");

  var React = require("react");

  var ReactDOM = require("react-dom");

  var cmLabel = require("./cell-label");

  var actionLabel = "pumpDisplayViewStream";
  var actionName = "".concat(cmLabel, " Pump Display View Stream");
  var action = new holarchy.ControllerAction({
    id: cmasHolisticHTML5ServicePackage.mapLabels({
      CM: cmLabel,
      ACT: actionLabel
    }).result.ACTID,
    name: actionName,
    description: "Dispatched to read an updated DisplayStreamMessage from our ObservableValueHelper and call React.",
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
                // We're going to trigger this from APM step transition rule
                ____types: "jsObject",
                pumpDisplayStream: {
                  ____types: "jsObject"
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
        console.log("================================================================");
        console.log("================================================================");
        console.log("================================================================");
        console.log("================================================================");
        console.log("[".concat(this.filterDescriptor.operationID, "::").concat(this.filterDescriptor.operationName, "] attempting to update display layout due to detected chanage(s)...")); // Get our cell memory and process data.

        var hacdLibResponse = hacdLib.getStatus.request(request_.context);

        if (hacdLibResponse.error) {
          errors.push(hacdLibResponse.error);
          break;
        }

        console.log("> HolisticHTML5Service_DisplayAdapter has located its process and read its cell memory...");
        var _hacdLibResponse$resu = hacdLibResponse.result,
            cellMemory = _hacdLibResponse$resu.cellMemory,
            cellProcess = _hacdLibResponse$resu.cellProcess; // Read the updated DisplayStreamMessage from our ObservableValueHelper input.

        var actResponse = request_.context.act({
          actorName: actionName,
          actorTaskDescription: "Attempting to read a new DisplayStreamMessage from our ObservableValueHelper input...",
          actionRequest: {
            holarchy: {
              common: {
                actions: {
                  ObservableValueHelper: {
                    readValue: {
                      path: "#.inputs.displayViewStream"
                    }
                  }
                }
              }
            }
          },
          apmBindingPath: request_.context.apmBindingPath // because we're triggered by APM step transition rule

        });

        if (actResponse.error) {
          errors.push(actResponse.error);
          break;
        } // Okay, got it!


        var displayStreamMessage = actResponse.result.actionResult;
        console.log("> HolisticHTML5Service_DisplayAdapter has read a new DisplayStreamMessage from its registered DisplayView cell..."); // Now, build an object to bind to a React.Component class to create a React.Element instance.
        // ATTENTION: THIS IS THE FINAL OUTPUT CONTRACT SENT INTO <ComponentRouter/>.
        // Changes made here must be reflected (very very carefully) through d2r2 and the all DisplayView* <-> ViewDisplay* codepaths.

        var thisProps = {
          renderContext: _objectSpread(_objectSpread({}, displayStreamMessage.value.renderContext), {}, {
            //displayPath: `${displayStreamMessage.value.renderContext.displayPath}.${displayStreamMessage.value.renderContext.displayInstance}`,
            d2r2BusState: "dv-root-active-vd-root-pending",
            ComponentRouter: cellMemory.config.ComponentRouter,
            act: request_.context.act
          }),
          renderData: _objectSpread(_objectSpread({}, displayStreamMessage.value.renderData), {}, {
            revision: displayStreamMessage.revision
          })
        }; // Now, create us a React.Element --- Note that this _appears_ simple.
        // It's a bridge between two worlds; here we have no idea what's inside thisProps.
        // And, <ComponentRouter/> maps thisProps to 1:N registered d2r2Components.
        // So, basically this can render anything into display process land.

        var reactElement = React.createElement(cellMemory.config.ComponentRouter, thisProps);
        console.log("> HolisticHTML5Service_DisplayAdapter has manufactured a React.Element from request data via d2r2 <ComponentRouter/>..."); // SO, AFTER ALL THAT ...
        // Replace the currently user-visible DOM contents (indirectly), by making an "action request" on ReactDOM.render.
        // We presume that whomever provided the DisplayStreamMessage was smart enough to send along enough info
        // so that whatever React.Element(s) they mount in the React VDOM can communicate back to to the CellProcessor
        // via thisProps.renderContext.act function.

        ReactDOM.render(reactElement, cellMemory.config.targetDOMElement);
        console.log("> HolisticHTML5Service_DisplayAdapter has udpated/replaced the current set of ViewDisplay process(es) (aka mounted React.Element) in the React-managed VDOM...");
        cellMemory.displayUpdateCount += 1;
        var ocdResponse = request_.context.ocdi.writeNamespace({
          apmBindingPath: cellProcess.apmBindingPath,
          dataPath: "#.displayUpdateCount"
        }, cellMemory.displayUpdateCount);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        console.log("[".concat(this.filterDescriptor.operationID, "::").concat(this.filterDescriptor.operationName, "] display process tree update ").concat(cellMemory.displayUpdateCount, " complete."));
        console.log("================================================================");
        console.log("================================================================");
        console.log("================================================================");
        console.log("================================================================"); // And, we're out.

        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (!action.isValid()) {
    throw new Error(action.toJSON());
  }

  module.exports = action;
})();