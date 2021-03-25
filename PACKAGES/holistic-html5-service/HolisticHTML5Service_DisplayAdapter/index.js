"use strict";

(function () {
  var arccore = require("@encapsule/arccore");

  var holarchy = require("@encapsule/holarchy");

  var cmasHolisticHTML5ServicePackage = require("../cmasHolisticHTML5ServicePackage");

  var cmLabel = require("./cell-label");

  var hacdLib = require("./lib");

  var d2r2 = require("@encapsule/d2r2");

  var factoryResponse = arccore.filter.create({
    operationID: "IN0xuhS8RQ6F3_M5uXiadg",
    operationName: "".concat(cmLabel, " CellModel Factory"),
    operationDescription: "Used to synthesize a specialized HolisticHTML5Service_DisplayAdapater CellModel for use by HolisticHTML5Service_Kernel cell process.",
    inputFilterSpec: {
      ____types: "jsObject",
      appBuild: {
        ____accept: "jsObject"
      },
      appModels: {
        ____types: "jsObject",
        display: {
          ____label: "".concat(cmLabel, " Specializations"),
          ____types: "jsObject",
          targetDOMElementID: {
            ____accept: "jsString" // This is the platform's selected DOM element id string value used by the caller to obtain targetDOMElement from the DOM.

          },
          d2r2Components: {
            ____label: "Holistic Tab Service Display Adapter d2r2 Components",
            ____description: "This is derived app service's d2r2 component set. The display adapter merges platform-provided d2r2 components prior to creating <ComponentRouter/>.",
            ____types: "jsArray",
            d2r2Component: {
              ____accept: "jsObject" // This is an @encapsule/d2r2 component element generator filter object

            }
          }
        }
      }
    },
    outputFilterSpec: {
      ____accept: "jsObject" // This is an @encapsule/holarchy CellModel (the DisplayAdapter CellModel specifically).

    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      var _loop = function _loop() {
        inBreakScope = true;
        var appBuild = request_.appBuild;
        var targetDOMElementID = request_.appModels.display.targetDOMElementID;
        var targetDOMElement = document.getElementById(targetDOMElementID);

        if (!targetDOMElement) {
          errors.push("Cannot locate the specified targetDOMElementID \"".concat(targetDOMElementID, "\" in the DOM?!"));
          return "break";
        } // Let's build us a specialized instance of React.Component <ComponentRouter/>
        // Think of it like this: <AnyComponent {...this.props} renderData={ ...magic } />
        // Where, the value of magic determines which d2r2 component is used to generate
        // the React.Element synthesized by <AnyComponent/> (aka <ComponentRouter/> by
        // calling React.createElement w/this.props ={ ...this.props, renderData={filtered(magic)}
        // and React.Component constructor function = 1 of the N React.Component constructor functions
        // ... magic. Use it for dynamic layout and decoupling - not game animation kids; that's not what it's for ;-)


        var factoryResponse = d2r2.ComponentRouterFactory.request({
          d2r2ComponentSets: [request_.appModels.display.d2r2Components]
        });

        if (factoryResponse.error) {
          errors.push("Unable to construct an @encapsule/d2r2 <ComponentRouter/> for use by ".concat(appBuild.app.name, " tab service due to error:"));
          errors.push(factoryResponse.error);
          return "break";
        }

        var ComponentRouter = factoryResponse.result;
        var cellModel = new holarchy.CellModel({
          id: "UX7JquBhSZO0QyEk7u9-sw",
          // TODO: Change to mapLabels and update the kernel to follow the new IRUT ID resolution protocol for APM ID
          name: "".concat(cmLabel, " Model"),
          description: "Manages the DOM display via @encapsule/d2r2 and React.",
          apm: require("./AbstractProcessModel-app-client-display-adapter"),
          actions: [// ----------------------------------------------------------------
          {
            // TODO: Don't do this I think... (not this way at least - this can be much much simpler / cleaner).
            // ... generic action that returns a result pulled from closure scope is rather suspsect here...
            id: "o24IDZhRRA6MbUoOcT15EQ",
            name: "".concat(cmLabel, " Load Config"),
            description: "Bootstraps information from CellModel construction scope into the cell's memory.",
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
                        loadConfig: {
                          ____accept: "jsObject"
                        }
                      }
                    }
                  }
                }
              }
            },
            actionResultSpec: {
              ____accept: "jsString",
              ____defaultValue: "Okay"
            },
            bodyFunction: function bodyFunction(request_) {
              var response = {
                error: null
              };
              var errors = [];
              var inBreakScope = false;

              while (!inBreakScope) {
                inBreakScope = true;
                var hacdLibResponse = hacdLib.getStatus.request(request_.context);

                if (hacdLibResponse.error) {
                  errors.push(hacdLibResponse.error);
                  break;
                }

                var _hacdLibResponse$resu = hacdLibResponse.result,
                    cellMemory = _hacdLibResponse$resu.cellMemory,
                    cellProcess = _hacdLibResponse$resu.cellProcess;
                var ocdResponse = request_.context.ocdi.writeNamespace({
                  apmBindingPath: cellProcess.apmBindingPath,
                  dataPath: "#.config"
                }, {
                  targetDOMElementID: targetDOMElementID,
                  targetDOMElement: targetDOMElement,
                  ComponentRouter: ComponentRouter
                });

                if (ocdResponse.error) {
                  errors.push(ocdResponse.error);
                  break;
                }

                break;
              }

              if (errors.length) {
                response.error = errors.join(" ");
              }

              return response;
            }
          }, // ACT: holistic.app.client.display._private.loadConfig
          // ----------------------------------------------------------------
          require("./ControllerAction-app-client-display-activate"), require("./ControllerAction-app-client-display-update"), require("./ControllerAction-app-client-display-register-display-view-process"), require("./ControllerAction-app-client-display-pump-display-view-stream")],
          subcells: []
        });

        if (!cellModel.isValid()) {
          errors.push("Unable to synthesize d2r2/React display adapater CellModel for use in ".concat(appBuild.app.name, " tab service due to error:"));
          errors.push(cellModel.toJSON());
          return "break";
        }

        response.result = cellModel;
        return "break";
      };

      while (!inBreakScope) {
        var _ret = _loop();

        if (_ret === "break") break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    } // bodyFunction

  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result; // This is an @encapsule/arccore.filter (specifically its a HolisticTabService kernel CellModel factory).
})();