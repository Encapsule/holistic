"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// HolisticNodeService-method-constructor-filter.js
// v0.0.49-spectrolite
// Absolutely no question that @encapsule/holism HTTP server is EOL at this point.
// It cannot carry the weight it needs to w/out sucking time needlessly.
// We know now a much more advanced means of expressing this same logic as a CellModel.
//
// But, there's no time to do this work now unfortunately as it would likely take
// several weeks of focussed effort to pull it off cleanly and build a nice kernel
// layer for HolisticNodeService similar to what we've built for HolisticHTML5Service.
var path = require("path");

var process = require("process");

var arccore = require("@encapsule/arccore");

var holism = require("@encapsule/holism");

var d2r2 = require("@encapsule/d2r2");

var _require = require("@encapsule/holistic-service-core"),
    HolisticServiceCore = _require.HolisticServiceCore;

var inputFilterSpec = require("./iospecs/HolisticNodeService-method-constructor-filter-input-spec");

var outputFilterSpec = require("./iospecs/HolisticNodeService-method-constructor-filter-output-spec");

var renderHtmlFunction = require("../holism-http-server/integrations/render-html");

var holisticPlatformMemoryFileRegistrationMapFunction = require("../holism-http-server/config/memory-files");

var holisticPlatformServiceFilterRegistrationMapFunction = require("../holism-http-server/config/service-filters");

var holisticAppModels = {
  display: {
    d2r2Components: []
  },
  cellModels: []
};
var factoryResponse = arccore.filter.create({
  operationID: "365COUTSRWCt2PLogVt51g",
  operationName: "HolisticNodeService::constructor Filter",
  operationDescription: "Validates/normalizes a HolisticNodeService::constructor function request descriptor object. And, returns the new instance's private state data.",
  inputFilterSpec: inputFilterSpec,
  outputFilterSpec: outputFilterSpec,
  bodyFunction: function bodyFunction(request_) {
    console.log("HolisticNodeService::constructor [".concat(this.filterDescriptor.operationID, "::").concat(this.filterDescriptor.operationName, "]"));
    var response = {
      error: null,
      result: {
        appServiceCore: null,
        // null is an invalid value type per output filter spec set to force an error if the value isn't set appropriately by bodyFunction
        httpServerInstance: {
          holismInstance: {
            config: {
              filters: {
                getMemoryFileRegistrationMap: null,
                // as above
                getServiceFilterRegistrationMap: null // as above

              },
              data: {
                memoryFileRegistrations: null,
                // as above
                serviceFilterRegistrations: null // as above

              }
            }
          }
        }
      }
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      inBreakScope = true; // Cache the HolisticServiceCore definition.

      var appServiceCore = request_.appServiceCore instanceof HolisticServiceCore ? request_.appServiceCore : new HolisticServiceCore(request_.appServiceCore);

      if (!appServiceCore.isValid()) {
        errors.push("Invalid appServiceCore value cannot be resolved to valid HolisticAppCommon class instance:");
        errors.push(response.result.appServiceCore.toJSON());
        return "break";
      }

      response.result.appServiceCore = appServiceCore;
      var appBuild = appServiceCore.getAppBuild(); // Obtain build-time @encapsule/holism HTTP server config information from the derived app server.
      // These are function callbacks wrapped in filters to ensure correctness of response and to provide
      // developers with reference on format of the request value they are sent.
      // Create a filter to box the developer's getMemoryFileRegistrationMap callback function.

      var factoryResponse = arccore.filter.create({
        operationID: "tMYd-5e7Qm-iFV2TAufL6Q",
        operationName: "HolisticAppServer::constructor HTTP Mem-Cached Files Config Map Integration Filter",
        operationDescription: "Used to dispatch and validate the response.result of developer-defined getMemCachedFilesConfigMap function.",
        inputFilterSpec: {
          ____types: "jsObject",
          appBuild: _objectSpread({}, holism.filters.factories.server.filterDescriptor.inputFilterSpec.holisticAppBuildManifest),
          // <== THIS IS SUBOPTIMAL: we want this format set in common and we'll pick it up from there
          deploymentEnvironment: _objectSpread({}, holism.filters.factories.server.filterDescriptor.inputFilterSpec.appServerRuntimeEnvironment),
          targetBodyFunction: {
            ____accept: "jsFunction"
          }
        },
        outputFilterSpec: _objectSpread({}, holism.filters.factories.server.filterDescriptor.inputFilterSpec.config.files),
        bodyFunction: function bodyFunction(request_) {
          // request_.appModels.httpRequestProcessor.holismConfig.registrations.resources.getMemoryFileRegistrationMap
          return request_.targetBodyFunction({
            appBuild: request_.appBuild,
            deploymentEnvironment: request_.deploymentEnvironment
          });
        }
      });

      if (factoryResponse.error) {
        errors.push("Cannot build a wrapper filter to retrieve your app server's memory-cached file configuration map due to error:");
        errors.push(factoryResponse.error);
        return "break";
      }

      var getMemoryFileRegistrationMapFilter = response.result.httpServerInstance.holismInstance.config.filters.getMemoryFileRegistrationMap = factoryResponse.result; // Create a filter to box the developer's getServiceFilterRegistrationMap callback function.

      factoryResponse = arccore.filter.create({
        operationID: "0suEywsvTl200kgcEVBsLw",
        operationName: "HolisticAppServer::constructor HTTP Service Filter Config Map Integration Filter",
        operationDescription: "Used to dispatch and validate the response.result of developer-defined getServiceFilterConfigMap function.",
        inputFilterSpec: {
          ____types: "jsObject",
          appBuild: _objectSpread({}, holism.filters.factories.server.filterDescriptor.inputFilterSpec.holisticAppBuildManifest),
          // <== THIS IS SUBOPTIMAL: we want this format set in common and we'll pick it up from there
          deploymentEnvironment: _objectSpread({}, holism.filters.factories.server.filterDescriptor.inputFilterSpec.appServerRuntimeEnvironment)
        },
        outputFilterSpec: _objectSpread({}, holism.filters.factories.server.filterDescriptor.inputFilterSpec.config.services),
        bodyFunction: request_.appModels.httpRequestProcessor.holismConfig.registrations.resources.getServiceFilterRegistrationMap
      });

      if (factoryResponse.error) {
        errors.push("Cannot build a wrapper filter to retrieve your app server's service filter configuration map due to error:");
        errors.push(factoryResponse.error);
        return "break";
      }

      var getServiceFilterRegistrationMapFilter = response.result.httpServerInstance.holismInstance.config.filters.getServiceFilterRegistrationMap = factoryResponse.result; // Get the derived app server's memory file registration map via our filter.

      var callbackRequest = {
        appBuild: appBuild,
        deploymentEnvironment: request_.appModels.httpRequestProcessor.holismConfig.deploymentEnvironmentFlag,
        targetBodyFunction: request_.appModels.httpRequestProcessor.holismConfig.registrations.resources.getMemoryFileRegistrationMap
      };
      var filterResponse = getMemoryFileRegistrationMapFilter.request(callbackRequest);

      if (filterResponse.error) {
        errors.push("An error occurred while querying your app server for its memory file registration map:");
        errors.push(filterResponse.error);
        return "break";
      }

      var appServerMemoryFileRegistrationMap = response.result.httpServerInstance.holismInstance.config.data.memoryFileRegistrations = filterResponse.result; // The the holistic platform's memory file registration map via our filter.

      callbackRequest.targetBodyFunction = holisticPlatformMemoryFileRegistrationMapFunction;
      filterResponse = getMemoryFileRegistrationMapFilter.request(callbackRequest);

      if (filterResponse.error) {
        errors.push("Internal error occurred querying holistic platform memory file resource registration map:");
        errors.push(filterResponse.error);
        return "break";
      }

      var holisticPlatformMemoryFileRegistrationMap = filterResponse.result;

      var memoryFileRegistrationMapInput = _objectSpread(_objectSpread({}, appServerMemoryFileRegistrationMap), holisticPlatformMemoryFileRegistrationMap);

      var memoryFileRegistrationMapOutput = {}; // Populated in the following loop. This is what gets passed to @encapsule/holism
      // We need the relative path to the actual ASSET resource file.

      var cwd = process.cwd();
      var relativeAssetPath = cwd; // path.relative(cwd, path.resolve(path.join(cwd, "BUILD/runtime-phase3")));

      for (var filename_ in memoryFileRegistrationMapInput) {
        resourceFilepath = path.join(relativeAssetPath, filename_);
        memoryFileRegistrationMapOutput[resourceFilepath] = memoryFileRegistrationMapInput[filename_];
      } // Get the derived app server's service filter plug-in registration map.


      filterResponse = getServiceFilterRegistrationMapFilter.request(callbackRequest);

      if (filterResponse.error) {
        errors.push("An error occured while querying your app server for its service filter plug-in registration map:");
        errors.push(filterResponse.error);
        return "break";
      }

      var appServerServiceFilterRegistrationMap = response.result.httpServerInstance.holismInstance.config.data.serviceFilterRegistrations = filterResponse.result; // Okay - so nothing has gone wrong so far!
      // We should now have enough information to construct what the @encapsule/holism RTL calls "integration filters" that wrap a bunch of callback functions
      // in filters that are subsequently dispatched at various phases of an HTTP request lifecycle in order to ask questions of and/or delegate behaviors
      // to the derived app service (i.e. application-layer facilities, behaviors, features, etc. added to the app server via the available platform-defined
      // extension points). We don't want to really play games w/@encapsule/holism right now so am pretty much just building a super-precise and generic
      // implementation of what a developer might otherwise have to figure out how to do inside SOURCES/SERVER/server.js (which is quite a bit actually
      // to stay in sync w/the app client work in particular).
      // But, before we call @encapsule/holism to splice together HTTP stream processing filters we need to construct
      // the an @encapsule/d2r2 <ComponentRouter/> instance for use by the holistic Node.js service HTML5 document renderer.

      factoryResponse = d2r2.ComponentRouterFactory.request({
        d2r2ComponentSets: [holisticAppModels.display.d2r2Components, request_.appModels.display.d2r2Components, appServiceCore.getDisplayComponents()]
      });

      if (factoryResponse.error) {
        errors.push("An error occurred attempting to initialize @encapsule/d2r2 <ComponentRouter/> instance for use in the ".concat(appBuild.app.name, " Node.js service:"));
        errors.push(factoryResponse.error);
      }

      var ComponentRouter = factoryResponse.result; // v0.0.49-spectrolite
      // This is a very old abstraction (circa 2015?) Wiring this up here 5-years later I think it's pretty good insofar
      // as this factory provides a succinct request API the distills the factory input requirements. What we do not need
      // is to implement runtime synthesis of filters in @encapsule/holism (or any other RTL for that matter) now that we
      // have CellProcessor in 2020. No time to make the swap over now (it's straight-forward but would take 1+ month to
      // build a runtime service environment in CellProcessor atop Node.js similar to what we are about to unleash in the
      // browser tab.

      var appMetadataTypeSpecs = appServiceCore.getAppMetadataTypeSpecs();
      console.log("> \"".concat(path.resolve(__filename), "\" App server @encapsule/holism configuration accepted."));
      console.log("> \"".concat(path.resolve(__filename), "\" Synthesizing type-specialized encapsule/holism HTTP stream processing filters for ").concat(appBuild.app.name, " app server service..."));
      factoryResponse = holism.integrations.create({
        filter_id_seed: "M4MFr-ZvS3eovgdTnNTrdg",
        // TODO: Confirm my assumption that this can be any static IRUT w/out violating any important invariant assumptions about the derived IRUTs...
        name: "".concat(appBuild.app.name, " @encapsule/holism HTTP Request Processor Lifecycle Integration Filters"),
        description: "A set of filters leverages by the @encapsule/holism HTTP request processor to obtain information and/or delegate behaviors to the derived app server service process.",
        version: "".concat(appBuild.app.version),
        // ----------------------------------------------------------------
        appStateContext: _objectSpread(_objectSpread({}, request_.appModels.httpRequestProcessor.holismConfig.appStateContext), {}, {
          ComponentRouter: ComponentRouter
        }),
        // ----------------------------------------------------------------
        integrations: {
          preprocessor: {
            redirect: request_.appModels.httpRequestProcessor.holismConfig.lifecycle.redirectPreprocessor
          },
          metadata: {
            // This doesn't need to be all fancy like this. Metadata has grown beyond just the sphere of @encapsule/holism
            // and many of the patterns I devised when I wrote it initially don't make that much sense anymore. Like the org and
            // app callbacks are utter nonsense we could cut. But, I would have to think about it.
            org: {
              get: {
                bodyFunction: function bodyFunction() {
                  return {
                    error: null,
                    result: appServiceCore.getAppMetadataOrg()
                  };
                },
                outputFilterSpec: appMetadataTypeSpecs.org
              }
            },
            site: {
              // aka app metadata app (whatever)
              get: {
                bodyFunction: function bodyFunction() {
                  return {
                    error: null,
                    result: appServiceCore.getAppMetadataApp()
                  };
                },
                outputFilterSpec: appMetadataTypeSpecs.app
              }
            },
            page: {
              get: {
                bodyFunction: function bodyFunction(_ref) {
                  var http_code = _ref.http_code,
                      http_message = _ref.http_message,
                      resource_uri = _ref.resource_uri;
                  var result;

                  if (http_code !== 200) {
                    var appMetadata = appServiceCore.getAppMetadataApp();
                    return {
                      error: null,
                      result: {
                        title: "".concat(appMetadata.name, " - HTTP Error ").concat(http_code),
                        name: "".concat(appMetadata.name, " HTTP Error ").concat(http_code),
                        description: "".concat(appMetadata.name, " could not process your HTTP request and failed with code ").concat(http_code, " - ").concat(http_message, ".")
                      }
                    };
                  }

                  return appServiceCore.getAppMetadataPage(resource_uri); // returns a filter response
                },
                outputFilterSpec: appMetadataTypeSpecs.pages.pageURI
              }
            },
            session: {
              get_identity: {
                bodyFunction: request_.appModels.httpRequestProcessor.holismConfig.lifecycle.getUserIdentityAssertion ? request_.appModels.httpRequestProcessor.holismConfig.lifecycle.getUserIdentityAssertion : function () {
                  return {
                    error: null,
                    result: undefined
                  };
                },
                outputFilterSpec: request_.appTypes.userLoginSession.trusted.userIdentityAssertionDescriptorSpec
              },
              get_session: {
                bodyFunction: request_.appModels.httpRequestProcessor.holismConfig.lifecycle.getUserLoginSession ? request_.appModels.httpRequestProcessor.holismConfig.lifecycle.getUserLoginSession : function (request_) {
                  setTimeout(function () {
                    request_.result_handler();
                  }, 1);
                  return {
                    error: null
                  };
                },
                response: {
                  result_spec: request_.appTypes.userLoginSession.trusted.userLoginSessionReplicaDataSpec,
                  client_spec: appServiceCore.getClientUserLoginSessionSpec()
                }
              }
            }
          },
          render: {
            html: {
              bodyFunction: renderHtmlFunction,
              renderOptions: request_.appModels.httpRequestProcessor.holismConfig.lifecycle.renderHTML5Options
            }
          }
        }
      });

      if (factoryResponse.error) {
        errors.push("An error occurred during configuration of ".concat(appBuild.app.name, "'s @encapsule/holism HTTP request/response stream filters:"));
        errors.push(factoryResponse.error);
        return "break";
      }

      var holismInstanceIntegrationFilters = response.result.httpServerInstance.holismInstance.integrations = factoryResponse.result;
      console.log("> \"".concat(path.resolve(__filename), "\" @encapsule/holism HTTP stream processor has been configured for ").concat(appBuild.app.name, " app server service."));
      console.log("> \"".concat(path.resolve(__filename), "\" Performing final dynamic assembly of ").concat(appBuild.app.name, " embedded @encapsule/holism HTTP request processor instance..."));
      factoryResponse = holism.server.create({
        holisticAppBuildManifest: appBuild,
        appServerRuntimeEnvironment: request_.appModels.httpRequestProcessor.holismConfig.deploymentEnvironmentFlag,
        config: {
          options: {},
          // TODO! We're already taking in the options. Connect this...
          files: memoryFileRegistrationMapOutput,
          services: appServerServiceFilterRegistrationMap
        },
        integrations: holismInstanceIntegrationFilters
      });

      if (factoryResponse.error) {
        errors.push("An error occurred in the final steps of initializing ".concat(appBuild.app.name, "'s embedded @encapsule/holism HTTP request processor:"));
        errors.push(factoryResponse.error);
        return "break";
      } // This is the specialized @encapsule/holism server filter instance. It's really actually hard
      // to explain (too hard to explain) how/why @encapsule/holism. Leaving it mostly intact here
      // for now. But, most of it is code we ultimately do not have to write anymore because of CellModel.
      // Looking forward to moving everything backend into CellProcessor services. It should be straight foward;
      // most of the process kinks are being distilled w/a flame thrower in the app client now.


      response.result.httpServerInstance.holismInstance.httpRequestProcessor = factoryResponse.result;
      return "break";
    };

    while (!inBreakScope) {
      var resourceFilepath;

      var _ret = _loop();

      if (_ret === "break") break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    } // Wow... That's a lot of information ;-)
    // console.log(JSON.stringify(response, undefined, 4));


    return response;
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;