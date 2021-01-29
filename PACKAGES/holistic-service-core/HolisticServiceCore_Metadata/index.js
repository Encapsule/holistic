"use strict";

var arccore = require("@encapsule/arccore");

var holarchy = require("@encapsule/holarchy");

(function () {
  var factoryResponse = arccore.filter.create({
    operationID: "7007lG0iS4esk_zoF6GLhA",
    operationName: "Holistic Service Core App Metadata CellModel Factory",
    operationDescription: "Filter used to synthesize a specialized app metadata CellModel.",
    inputFilterSpec: {
      ____types: "jsObject",
      appBuild: {
        // Because lazy
        ____accept: "jsObject" // TODO make this explicit should be explicit

      },
      appTypes: {
        ____types: "jsObject",
        metadata: {
          ____types: "jsObject",
          specs: {
            ____accept: "jsObject" // TODO: lock this down? It's technically fine as we're passing through a filter spec as an opaque descriptor object here. No need to actually re-filter it.

          }
        },
        bootROM: {
          ____types: "jsObject",
          spec: {
            ____accept: "jsObject" // TODO: lock this down? Same rationale for leaving it as-is as above.

          }
        }
      },
      appModels: {
        ____types: "jsObject",
        metadata: {
          ____types: "jsObject",
          accessors: {
            ____accept: "jsObject"
          }
        }
      }
    },
    outputFilterSpec: {
      ____accept: "jsObject" // This is an @encapsule/holarchy CellModel class instance.

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
        var metadataTypes = request_.appTypes.metadata.specs;
        var metadataAccessors = request_.appModels.metadata.accessors;
        var pageMetadataOverrideSpec = {
          ____types: ["jsNull", "jsObject"],
          ____defaultValue: null,
          httpResponseDisposition: request_.appTypes.bootROM.spec.initialDisplayData.httpResponseDisposition,
          errorPageMetadata: request_.appTypes.bootROM.spec.initialDisplayData.pageMetadata
        };
        var cellModel = new holarchy.CellModel({
          id: "-mApjtHVTE2UpIANFJGaPQ",
          name: "".concat(appBuild.app.name, " HolisticServiceCore_Metadata Model"),
          description: "Provides a standard way for any cell to access app-defined static metadata values consistently across ".concat(appBuild.app.name, " HolisticNodeService and HolisticTabService instances."),
          apm: {
            id: "srjZAO8JQ2StYj07u_rgGg",
            name: "".concat(appBuild.app.name, " HolisticServiceCore_Metadata Process"),
            description: "Isn't really a process. Rather, it's an action to query metadata from any active cell consistently.",
            // TODO: Look into removing this entirely. It will cause breaks in I don't want to deal with right now in tab service kernel. And, it's harmless to activate it and let it have a { __apmiStep: uninitialzed } value in OCD.
            ocdDataSpec: {
              ____types: "jsObject",
              ____defaultValue: {},
              pageMetadataOverride: pageMetadataOverrideSpec
            },
            steps: {
              uninitialized: {
                description: "Default starting step of a newly-activated cell process.",
                transitions: [{
                  transitionIf: {
                    always: true
                  },
                  nextStep: "metadata-wait-kernel-config"
                }]
              },
              "metadata-wait-kernel-config": {
                description: "Waiting for for the HolisticHTML5Service_Kernel process to provide boot-time config data...",
                transitions: [{
                  transitionIf: {
                    holarchy: {
                      cm: {
                        operators: {
                          ocd: {
                            isNamespaceTruthy: {
                              path: "#.pageMetadataOverride"
                            }
                          }
                        }
                      }
                    }
                  },
                  nextStep: "metadata-configured"
                }]
              },
              "metadata-configured": {
                description: "HolisticServiceCore_Metadata process has been configured.",
                transitions: [{
                  transitionIf: {
                    always: true
                  },
                  nextStep: "metadata-ready"
                }]
              },
              "metadata-ready": {
                description: "The HolisticServiceCore_Metadata process is configured and ready to process action requests."
              }
            }
          },
          actions: [{
            id: "maQuXnptRbill0zhL56-WA",
            name: "HolisticServiceCore_Metadata Config",
            description: "Configures the HolisticServiceCore_Metadata process w/post bootROM serialization data prior to calling the derived serice's start lifecycle action.",
            actionRequestSpec: {
              ____types: "jsObject",
              holistic: {
                ____types: "jsObject",
                app: {
                  ____types: "jsObject",
                  metadata: {
                    ____types: "jsObject",
                    _private: {
                      ____types: "jsObject",
                      config: {
                        ____types: "jsObject",
                        pageMetadataOverride: pageMetadataOverrideSpec
                      }
                    }
                  }
                }
              }
            },
            actionResultSpec: {
              ____accept: "jsUndefined"
            },
            // no result
            bodyFunction: function bodyFunction(request_) {
              var response = {
                error: null
              };
              var errors = [];
              var inBreakScope = false;

              while (!inBreakScope) {
                inBreakScope = true;
                var messageBody = request_.actionRequest.holistic.app.metadata._private.config;
                var ocdResponse = request_.context.ocdi.getNamespaceSpec(request_.context.apmBindingPath);

                if (ocdResponse.error) {
                  errors.push(ocdResponse.error);
                  break;
                }

                var apmBindingPathSpec = ocdResponse.result;

                if (!apmBindingPathSpec.____appdsl || !apmBindingPathSpec.____appdsl.apm || apmBindingPathSpec.____appdsl.apm !== "srjZAO8JQ2StYj07u_rgGg") {
                  errors.push("Invalid apmBindingPath=\"".concat(request_.context.apmBindingPath, "\" does not resolve to an active HolisticServiceCore_Metadata cell as expected."));
                  break;
                }

                ocdResponse = request_.context.ocdi.writeNamespace({
                  apmBindingPath: request_.context.apmBindingPath,
                  dataPath: "#.pageMetadataOverride"
                }, messageBody.pageMetadataOverride);

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
          }, {
            id: "8KWW5zkCTMKRihNXKX_Pdw",
            name: "HolisticServiceCore_Metadata Query",
            description: "Retrieves a copy of the service's org, app, page, or hashroute metadata.",
            actionRequestSpec: {
              ____types: "jsObject",
              holistic: {
                ____types: "jsObject",
                app: {
                  ____types: "jsObject",
                  metadata: {
                    ____types: "jsObject",
                    query: {
                      ____types: "jsObject",
                      type: {
                        ____accept: "jsString",
                        ____inValueSet: ["org", "app", "page", "hashroute", "digraph"]
                      },
                      uri: {
                        ____accept: ["jsNull"
                        /* N/A (type is org or app) */
                        , "jsString"],
                        ____defaultValue: null
                      }
                    }
                  }
                }
              }
            },
            // actionRequestSpec
            actionResultSpec: {
              ____label: "App Metadata Query Result",
              ____description: "App metadata query by type result descriptor object.",
              ____accept: "jsObject" // The metadata descriptor object in the format specified by the developer's app metadata filter specs.

            },
            bodyFunction: function bodyFunction(request_) {
              var response = {
                error: null
              };
              var errors = [];
              var inBreakScope = false;

              while (!inBreakScope) {
                inBreakScope = true;
                var metadataResponse = void 0;
                var messageBody = request_.actionRequest.holistic.app.metadata.query;

                switch (messageBody.type) {
                  case "org":
                    response.result = metadataAccessors.getAppMetadataOrg();
                    break;

                  case "app":
                    response.result = metadataAccessors.getAppMetadataApp();
                    break;

                  case "page":
                    response.result = metadataAccessors.getAppMetadataPage(messageBody.uri);

                    if (!response.result) {
                      errors.push("No page metadata available for URI \"".concat(messageBody.uri, "\"."));
                    }

                    break;

                  case "hashroute":
                    response.result = metadataAccessors.getAppMetadataHashroute(messageBody.uri);

                    if (!response.result) {
                      errors.push("No page metadata available for URI \"".concat(messageBody.uri, "\"."));
                    }

                    break;

                  case "digraph":
                    response.result = metadataAccessors.getAppMetadataDigraph();
                    break;

                  default:
                    errors.push("Internal error: Unhandled query.type value \"".concat(messageBody.type, "\"."));
                    break;
                } // switch


                if (errors.length) {
                  break;
                }

                break;
              }

              if (errors.length) {
                response.error = errors.join(" ");
              }

              return response;
            }
          } // ControllerAction holistic.app.metadata.query
          ]
        });

        if (!cellModel.isValid()) {
          throw new Error(cellModel.toJSON());
        }

        response.result = cellModel;
        return "break";
      };

      while (!inBreakScope) {
        var _ret = _loop();

        if (_ret === "break") break;
      } // inBreakScope


      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    } // bodyFunctoin

  }); // arccore.filter.create

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();