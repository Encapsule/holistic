"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// HolisticServiceCore-method-constructor-filter.js
var arccore = require("@encapsule/arccore");

var holismMetadataFactory = require("@encapsule/holism-metadata");

var appMetadataBaseObjectSpecs = require("./iospecs/app-metadata-base-object-specs"); // intrinsic properties of org, app, page, and hashroute metadata required by the platform


var Holistic_d2r2Components = require("@encapsule/d2r2-components").components;

var ServiceCore_KernelCellModelFactory = require("../../HolisticServiceCore_Kernel");

var appServiceBootROMSpecFactory = require("./iospecs/app-service-boot-rom-spec-factory");

(function () {
  var factoryResponse = arccore.filter.create({
    operationID: "P9-aWxR5Ts6AhYSQ7Ymgbg",
    operationName: "HolisticServiceCore::constructor Filter",
    operationDescription: "Validates/normalizes a HolisticAppCommon::constructor function request object and returns the new instance's private state data.",
    inputFilterSpec: require("./iospecs/HolisticServiceCore-method-constructor-filter-input-spec"),
    outputFilterSpec: require("./iospecs/HolisticServiceCore-method-constructor-filter-output-spec"),
    bodyFunction: function bodyFunction(request_) {
      console.log("HolisticServiceCore::constructor [".concat(this.filterDescriptor.operationID, "::").concat(this.filterDescriptor.operationName, "]"));
      var response = {
        error: null,
        result: {
          // set the outer levels of the response.result up assuming we'll be successful splicing in the required values later in this bodyFunction
          nonvolatile: {
            // Nothing in this namespace should ever be written to during the lifespan of a derived app service process.
            // This is the validated/normalized value passed by the derived app to HolisticAppCommon constructor function.
            appCommonDefinition: request_ // Copy the filtered constructor request data immediately; this is an immutable reference copy to support deep introspection of a holistic app service runtime.

          }
        }
      };
      var errors = [];
      var inBreakScope = false;

      var _loop = function _loop() {
        inBreakScope = true; // v0.0.49-spectrolite
        // @encapsule/holism-metadata exports a factory filter that is unaware of how the filter specs it is passed are generated.
        // We take care of that detail here in HolisticAppCommon class constructor filter. Previously, this sort of thing was done
        // all over the place in different ways.
        // First things first...

        var appBuild = request_.appData.appBuild; // Use this!
        // Synthesize a filter spec to validate the derived app service's metadata values.

        var derivedAppService_MetadataInputSpec = {
          ____label: "App Service Metadata Input Values",
          ____description: "This is the format for the app metadata values required by by HolisticAppCommon::constructor function.",
          ____types: "jsObject",
          org: _objectSpread(_objectSpread(_objectSpread({}, request_.appTypes.appMetadata.orgExtSpec), appMetadataBaseObjectSpecs.input.org), {}, {
            ____label: "Build-Time Org Metadata Input Descriptor",
            ____description: "The value provided by the developer to define app-specific metadata for their organization."
          }),
          // TODO: Now that this is migrated to the correct place. Add ____label/____description from appBuild metadata
          app: _objectSpread(_objectSpread(_objectSpread({}, request_.appTypes.appMetadata.appExtSpec), appMetadataBaseObjectSpecs.input.app), {}, {
            ____label: "Build-Time App Metadata Input Descriptor",
            ____description: "The value provided by the developer to define app-specific metadata for this specific app and/or service."
          }),
          pages: {
            ____label: "Build-Time Page Metadata Input Descriptor Map",
            ____description: "A map of pageURI string keys to page metadata descriptor objects provided by the developer to define app-specific page metadata for this specific app and/or service.",
            ____types: "jsObject",
            ____asMap: true,
            pageURI: _objectSpread(_objectSpread(_objectSpread({}, request_.appTypes.appMetadata.pageExtSpec), appMetadataBaseObjectSpecs.input.page), {}, {
              ____label: "Build-Time Page Metadata Descriptor",
              ____description: "The value provided by the developer to define app-specific metadata for a specific page URI hosted by a HolisticNodeService instance."
            })
          },
          hashroutes: {
            ____label: "Build-Time Hashroute Metadata Input Descriptor Map",
            ____description: "A map of hashroutePathname string keys to hashroute metadata descriptor objects provided by the developer to define app-specific page metadata for this specific app and/or service. Note, that hashroute metadata is defined per/service. But, is leveraged primarily by HolisticHTML5Service.",
            ____types: "jsObject",
            ____asMap: true,
            hashroutePathname: _objectSpread(_objectSpread(_objectSpread({}, request_.appTypes.appMetadata.hashrouteExtSpec), appMetadataBaseObjectSpecs.input.hashroute), {}, {
              ____label: "Build-Time Hashroute Metadata Input Descriptor",
              ____description: "The value provided by the developer to define app-specific metadata for a specific hashroute pathname hosted by a HolisticHTML5Service instance."
            })
          }
        }; // derivedAppMetadataInputSpec
        // Synthesize a filter spec to validate (or simply document) the metadata values returned by any app metadata query by bucket org/app/page/hashroute.

        var derivedAppService_MetadataOutputSpec = {
          ____label: "App Service Metadata Query Results",
          ____description: "This is the format for the app metadata values returned by any query to the app metadata digraph.",
          ____types: "jsObject",
          org: _objectSpread(_objectSpread(_objectSpread({}, derivedAppService_MetadataInputSpec.org), appMetadataBaseObjectSpecs.output.org), {}, {
            ____label: "App Service Org Metadata Query Result",
            ____description: "This is an org metadata digraph query response.result value.",
            ____types: "jsObject",
            ____asMap: false
          }),
          app: _objectSpread(_objectSpread(_objectSpread({}, derivedAppService_MetadataInputSpec.app), appMetadataBaseObjectSpecs.output.app), {}, {
            ____label: "App Service App Metadata Query Result",
            ____description: "This is a app metadata digraph query response.result value.",
            ____types: "jsObject",
            ____asMap: false
          }),
          pages: {
            ____label: "App Service Pages Metadata Map Query Result",
            ____description: "This is a pages metadata digraph query response.result value.",
            ____types: "jsObject",
            ____asMap: true,
            pageURI: _objectSpread(_objectSpread(_objectSpread({}, derivedAppService_MetadataInputSpec.pages.pageURI), appMetadataBaseObjectSpecs.output.page), {}, {
              ____label: "App Service Page Metadata Query Result",
              ____description: "This is a page metadata digraph query response.result value.",
              ____types: "jsObject",
              ____asMap: false
            })
          },
          hashroutes: {
            ____label: "App Service Hashroutes Metadata Map Query Result",
            ____description: "This is a hashroutes metadata digraph query response.result value.",
            ____types: "jsObject",
            ____asMap: true,
            hashroutePathname: _objectSpread(_objectSpread(_objectSpread({}, derivedAppService_MetadataInputSpec.hashroutes.hashroutePathname), appMetadataBaseObjectSpecs.output.hashroute), {}, {
              ____label: "App Service Hashroute Metadata Query Result",
              ____description: "This is a hashroute metadata query response.result value.",
              ____types: "jsObject",
              ____asMap: false
            })
          }
        }; // Construct a filter specialized on our metadata types that builds the app metadata digraph.
        // Call into current @encapsule/holism-metadata package that basically just has this factory in it.

        var digraphBuilderFactoryResponse = holismMetadataFactory.request({
          id: "RRvaL94rQfm-fS0rxSOTxw",
          // id is required but of little significance we throw away the builder after we use it once here.
          name: "App Metadata Digraph Builder Filter",
          description: "A filter that accepts app-specific metadata values and produces a normalized holistic app metadata digraph model used to satisfy value and topological queries on app metadata.",
          metadataInputSpec: derivedAppService_MetadataInputSpec,
          metadataOutputSpec: derivedAppService_MetadataOutputSpec
        });

        if (digraphBuilderFactoryResponse.error) {
          errors.push("An error occurred while constructing a filter to process your app metadata values and build your app service's metadata digraph.");
          errors.push("Usually this indicates error(s) in app service metadata filter spec(s) provided to this constructor function.");
          errors.push(digraphBuilderFactoryResponse.error);
          return "break";
        }

        var digraphBuilder = digraphBuilderFactoryResponse.result; // Use the digraphBuilder to filter the developer-supplied app metadata values and build the app metadata digraph.

        var digraphBuilderResponse = digraphBuilder.request({
          org: request_.appData.appMetadata.org,
          app: request_.appData.appMetadata.app,
          pages: request_.appData.appMetadata.pages,
          hashroutes: request_.appData.appMetadata.hashroutes
        });

        if (digraphBuilderResponse.error) {
          errors.push("An error occured while processing the app metadata value(s) specified to this constructor function.");
          errors.push(digraphBuilderResponse.error);
          return "break";
        }

        var appMetadataDigraph = digraphBuilderResponse.result;
        response.result.nonvolatile.appMetadata = {
          values: {
            digraph: appMetadataDigraph
          },
          specs: derivedAppService_MetadataOutputSpec
        }; // v0.0.49-spectrolite
        // This is a small little accomodation made here to hide differences between HolisticNodeService
        // and HolisticHTML5Service implementations. HolisticNodeSerivce derives primarily from @encapsule/holism
        // that and that RTL's API (old) was designed to be in charge (i.e. it takes a lot of broad inputs and does type synthesis internally
        // making it rather difficult to extend and maintain; this is why APM composition BTW.. This is exactly why you can splice filter specs
        // together into trees natively w/____appdsl: apm .... + you can also then activate the data, or even evaluate it per async rules...

        var metadataValueAccessors = response.result.nonvolatile.appMetadata.accessors = {
          getAppMetadataDigraph: function getAppMetadataDigraph() {
            return appMetadataDigraph;
          },
          getAppMetadataOrg: function getAppMetadataOrg() {
            return appMetadataDigraph.getVertexProperty("__org");
          },
          getAppMetadataApp: function getAppMetadataApp() {
            return appMetadataDigraph.getVertexProperty("__app");
          },
          getAppMetadataPage: function getAppMetadataPage(pageURI_) {
            return appMetadataDigraph.getVertexProperty(pageURI_);
          },
          getAppMetadataHashroute: function getAppMetadataHashroute(hashroutePathname_) {
            return appMetadataDigraph.getVertexProperty(hashroutePathname_);
          }
        }; // Okay - now we need to go process the application-specific appModels passed in by the developer.
        // These are combined w/core platform level appModel contributions that represent behaviors shared
        // by all holistic app services (e.g. holistic Node.js service or holistic browser tab service).

        var coreDisplayComponents = response.result.nonvolatile.coreDisplayComponents = [].concat(_toConsumableArray(request_.appModels.display.d2r2Components), _toConsumableArray(Holistic_d2r2Components)); // Note that we do not instantiate an @encapsule/d2r2 <ComponentRouter/> instance here
        // because a HolisticServiceCore instance only contains a partial specification of the complete
        // set of d2r2 components that need to be registered by a specific holistic service runtime.
        // i.e. we just cache them and hand the set off to HolisticXService constructor function via
        // HolisticServiceCore class instance reference.
        // Synthesize the service bootROM filter specification that is needed by:
        // - HolisticNodeService: used to serialize initial runtime context, boot-time microcode instruction, and options into the tail of a serialized HolisticHTML5Service (aka HTML5 doc synthesized by HolisticNodeService) for use by the HolisticHTML5Service kernel boot process.
        // - HolisticHTML5Service: ... is initially activated inside a HolisticNodeService instance service filter context and subsequently serialized to HTML5 doc where it is deserialized by the HolisticHTML5Service kernel process during standard boot and service initialization sequence.

        var bootROMSynthResponse = appServiceBootROMSpecFactory.request({
          httpResponseDispositionSpec: {
            ____types: "jsObject",
            code: {
              ____accept: "jsNumber"
            },
            message: {
              ____accept: "jsString"
            }
          },
          pageMetadataSpec: response.result.nonvolatile.appMetadata.specs.pages.pageURI,
          serverAgentSpec: require("./iospecs/http-server-agent-result-spec.json"),
          userLoginSessionDataSpec: response.result.nonvolatile.appCommonDefinition.appTypes.userLoginSession.untrusted.clientUserLoginSessionSpec
        });

        if (bootROMSynthResponse.error) {
          errors.push("Unable to synthesize the ".concat(appBuild.app.name, " service core kernel CellModel due to error:"));
          errors.push(bootROMSynthResponse.error);
          return "break";
        }

        response.result.nonvolatile.serviceBootROMSpec = bootROMSynthResponse.result; // Okay - Now we need to go synthesize some number (we don't care) of CellModel's to do
        // some stuff that all services need done that's rather complex to automate unless you're
        // ridiculously disciplined. So we do that here instead.

        var cmFactoryResponse = ServiceCore_KernelCellModelFactory.request({
          appBuild: appBuild,
          appTypes: {
            metadata: {
              specs: response.result.nonvolatile.appMetadata.specs
            },
            bootROM: {
              spec: response.result.nonvolatile.serviceBootROMSpec
            }
          },
          appModels: {
            metadata: {
              accessors: metadataValueAccessors
            }
          }
        });

        if (cmFactoryResponse.error) {
          errors.push("Unable to synthesize the ".concat(appBuild.app.name, " service core kernel CellModel due to error:"));
          errors.push(cmFactoryResponse.error);
          return "break";
        }

        var serviceCoreKernelCellModel = cmFactoryResponse.result;
        var coreCellModels = response.result.nonvolatile.coreCellModels = [serviceCoreKernelCellModel].concat(_toConsumableArray(request_.appModels.cellModels)); // console.log(JSON.stringify(response, undefined, 4));

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
    }
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();