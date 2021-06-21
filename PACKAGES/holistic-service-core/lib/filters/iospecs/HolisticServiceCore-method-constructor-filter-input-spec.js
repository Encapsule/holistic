"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// HolisticAppCommon-method-constructor-filter-input-spec.js
var appMetadataBaseObjectSpecs = require("./app-metadata-base-object-specs");

module.exports = {
  ____label: "HolisticServiceCore::constructor Request Object",
  ____description: "This is the request format developers need to follow in order to construct a HolisticServiceCore class instance.",
  ____types: "jsObject",
  ____defaultValue: {},
  // When we say "types" we're talking about the format of runtime data values passed around inside the app.
  // We use @encapsule/arccore.filter data specification objects (not JSON schema or similar) to define these formats.
  // And, @encapsule/arccore.filter to enforce the the schemas at runtime.
  appTypes: {
    ____label: "Holistic Service Core Runtime Types",
    ____description: "Developer-defined runtime type definitions, and extensions to holistic-platform-defined types for a small set of core application-layer objects for which the platform runtime provides runtime type filtering and/or generic orchestration services on behalf of the derived app service.",
    ____types: "jsObject",
    ____defaultValue: {},
    appMetadata: {
      ____label: "App Service Metadata Type Extension Specs",
      ____description: "Holistic app platform defines four extensible application metadata categories. You are allowed to extend the platform-defined base app-layer object definitions associated with each bucket via optional filter spec definition provided here.",
      ____types: "jsObject",
      ____defaultValue: {},
      // I guess this is fine. If nobody uses it, then we'll remove it.
      orgExt: {
        ____label: "App Service Org Metadata Extension Props Spec",
        ____description: "An optional filter spec that defines top-level properties to be added to organization metadata base spec to ensure platform + app-specific org metadata property values are available consistently throughout the app runtime.",
        ____accept: "jsObject",
        // This is an arccore.filter specification
        ____defaultValue: {} // no app-specific extension properties

      },
      // I guess this is fine. If nobody uses it, then we'll remove it.
      appExt: {
        ____label: "App Service App Metadata Extension Props Spec",
        ____description: "An optional filter spec that defines top-level properties to be added to app metadata base spec to ensure platform + app-specific app metadata property values are available consistently throughout the app runtime.",
        ____accept: "jsObject",
        // This is an arccore.filter specification
        ____defaultValue: {} // no app-specific extension properties

      },
      // IMPORTANT NOTE:
      // Great care must be taken to never include app server details in the app client (which is treated as a known but ultimately untrusted process by app server's)
      // The app client needs to understand the routes that the server is likely to respond to w/HTML5 documents (e.g. if a user clicked a menu or navigation link).
      // We plan to automate the display of such navigation in the client using page metadata. Coincidentally, the pageURI's we use in page metadata correlate 1:1
      // with pageURI used to register app server @encapsule/holism service filter plug-ins to actually generate these HTML5 document responses. But, note that they're
      // INTENTIONALLY DECOUPLED such that it's possible to do whatever you want to ultimately w/backend routing completely independent of the what app client sees of
      // the world by looking at shared untrusted metadata. So, do not add microcode for controlling login inside @encapsule/holism to page metadata! If you ever need
      // this then what you should do is set up your own metadata registry in your SOURCES/SERVER tree and keep it there. Pleased read more notes on this topic below.
      pageExt: {
        ____label: "App Service Page Metadata Extension Props Spec",
        ____description: "An optional filter spec that defines top-level properties to be added to page metadata base sepc to ensure platform + app-specific page metadata property values are available consistently throughout the app runtime.",
        ____accept: "jsObject",
        // this is a filter spec
        ____defaultValue: {} // no app-specific extension properties

      },
      hashrouteExt: {
        ____label: "App Service Hashroute Metadata Extension Props Spec",
        ____description: "An optional filter spec that defined top-level properties to be added to hashroute metadata base spec to ensure platform + app-specific hashroute metadata property values are available consistently through the app runtime.",
        ____accept: "jsObject",
        // this is a filter spec
        ____defaultValue: {} // no app-specific extension properties

      }
    },
    // ~.appTypes.appMetadata
    userLoginSession: {
      ____label: "App Service User Login Session Type Specs",
      ____description: "Holistic app platform provides runtime data filtering and orchestration of sensitive user login session information generically on behalf of your derived app service w/out dictacting at all how the derived app server process actually implements its authentication/authorization system(s).",
      ____types: "jsObject",
      // this is a filter spec
      ____defaultValue: {},
      // IMPORTANT:
      // As above we cannot leak details about the data types used by the app server into the app client.
      // In particular we need to guard against this happening accidentally by including sensitive code or
      // data into the app client. Currently, we use webpack. But, later we might use something better.
      // Regardless, the issue of keeping backend implementation away from the client is the same.
      // There's a simple approach that fixes this issue safely and simply.
      // It must be applied consistently for all such cases where SOURCES/CLIENT or SOURCES/COMMON
      // derive in some manner from sources you are maintaining under SOURCES/SERVER. DO NOT import
      // require these sources.
      // Rather, add a pre-build step to synthesize the needed sources module(s) into the places
      // that they are needed in SOURCES/CLIENT and SOURCES/COMMON such that webpack (or whatever)
      // may blithely scan your SOURCES/COMMON and SOURCES/CLIENT build trees to assemble the final
      // app client bundle file w/low risk of leaking critical details.
      // There should only be a few cases like this I think? Anyway, likely one extensible
      // pre-build step per-app is all that's needed to solve this problem acceptably.
      // Meanwhile, use a little Node.js script and wire in a pre-build step. Or (horror)
      // EXPLICITLY MAINTAIN PARALLEL SPECS (if your case count is low this is not hard and it's
      // 100% clear what's going on).
      // THIS IS COMMON BECAUSE IT IS NEEDED BY APP SERVER
      // To affect clipping of sensitive data read from backend storage that
      // is handed off to @encapsule/holism service filter plug-ins AFTER
      // the service filter plug-in serializes its response payload. This
      // does not prevent a badly written service filter from copying sensitive
      // data into unfiltered portions of the HTTP response payload it serializes.
      // It does mean if they do nothing that the default user login session passed
      // to service filters will not be passed verbatim on to the app client.
      untrusted: {
        ____label: "Untrusted Client User Login Session Descriptor",
        ____types: "jsObject",
        ____defaultValue: {},
        clientUserLoginSessionSpec: {
          ____label: "App Client User Login Session Descriptor",
          ____description: "This is the app-defined format of a user login session as will be returned to the browser tab's app client service via its bootROM. This spec should be code-generated from your SOURCES/SERVER tree as a pre-build step. Or, simply maintained separately for security reasons.",
          ____accept: "jsObject",
          // this is a filter spec
          ____defaultValue: {
            ____label: "HolisticAppCommon Default Client User Session Descriptor",
            ____accept: "jsObject",
            ____defaultValue: {}
          }
        } // ~.appTypes.userLoginSession.untrusted.clientUserLoginSession

      } // ~.appTypes.userLoginSession.untrusted

    } // ~.appTypes.userLoginSession

  },
  // ~.appTypes
  appData: {
    ____label: "Holistic Service Core Build-Time Data Values",
    ____description: "A manifest of values set at development and/or app service build-time used to initialize core structures inside the service core instance.",
    ____types: "jsObject",
    ____defaultValue: {},
    // v0.0.49-spectrolite
    // Can we simply replace app metadata with the build?
    // I want to untangle this shit once and for now now that I'm in here tearing it up again.
    // Okay - so the current builds take the appBuild descriptor and splice it into a subnamespace
    // of a very terse base app metadata spec. This means that we can eliminate I think both org and
    // app metadata specs and values entirely from this API and make org and app non-extensible
    // fixed-format data that's required developer input in holistic-app.json manifest used by appgen.
    // (and subsequently by the Makefile it code-generates into the derived app service repo's root directory).
    appBuild: _objectSpread({}, appMetadataBaseObjectSpecs.input.app.build),
    // ~.appData.appBuild
    appConfig: {
      ____label: "Service Synthesis Config Options",
      ____description: "Shared config options for derived HolisticXService class instances.",
      ____types: "jsObject",
      ____defaultValue: {},
      display: {
        ____label: "Display Synthesis Config Options",
        ____description: "Display adapter CellModel synthesis options to be applied consistently during HolisticXService class instance construction.",
        ____types: "jsObject",
        ____defaultValue: {},
        targetDOMElementID: {
          ____label: "Service Display Adapter DOM Target Element ID",
          ____description: "The id attribute value used to render <html><body><div id={targetDOMElementID}>{service display adapter rendered content}</div></body></html>.",
          ____accept: "jsString",
          ____defaultValue: "idServiceDisplay"
        }
      }
    },
    // ~.appData.appConfig
    appMetadata: {
      ____label: "App Service Metadata Values",
      ____description: "App metadata runtime property values by holistic platform-defined metadata category.",
      ____types: "jsObject",
      ____defaultValue: {},
      // NO WAIT - it's okay to leave this as-is. Mostly nobody will use it?
      // TODO: Deprecate this input and derive the information instead from appBuild
      org: {
        ____label: "App Service Org Metadata",
        ____description: "Values that define attributes about publisher and presumed owner of the copyright on this specific app service.",
        ____accept: "jsObject",
        // We don't know the type before we stitch it together. So, the value filtering occurs inside the constructor function and not here at the API boundary. Same for the other values specified here.
        ____defaultValue: {}
      },
      // NO WAIT - it's okay to leave this as-is. Mostly nobody will use it?
      // TODO: Deprecate this input and derive the information instead from appBuild
      app: {
        ____label: "App Service App Metadata",
        ____description: "We may just replace this w/no input at all from the app developer here. Instead asking them to provide this information via holistic-app.json and picking it up from app-build.json",
        ____accept: "jsObject",
        // Filtered inside the constructor function.
        ____defaultValue: {}
      },
      // TODO: There is now little reason why we cannot automatically synthesize the correct @encapsule/holism service filter registrations to provide customizable server-rendering behaviors based on app-specific extensions to page metadata picked up by app-specific @encapsule/holism service or gateway plug-in filters.
      // NOTE: If we automate this someday, then it's a pre-build step that loads the app's HolisticAppCommon instance, reads some data, and generates the files into SOURCES for main build.
      pages: {
        ____label: "App Service Pages Metadata",
        ____description: "Page views are defined as reserved GET:/URI routes implemented by the app server service's embedded HTTP 1.1 server that return Content-Encoding: utf-8 Content-Type: text/html response containing a serialized app client service process to be started in the browser tab.",
        ____types: "jsObject",
        ____asMap: true,
        ____defaultValue: {},
        pageURI: {
          // e.g. "/", "/reports", "/login", ...
          ____label: "Page URI App Metadata",
          ____description: "Data used to determine details about which page views are supported by the app server process. And, to allow any specific initial configuration of the app client service to learn of alternate configurations of the app that may be available.",
          ____accept: "jsObject" // Filtered inside the constructor function.

        }
      },
      hashroutes: {
        ____label: "App Service Hashroutes Metadata",
        ____description: "Hashroutes are UTF-8 strings starting with the # character appened on the end of an app server HTTP request URL that we interpret as secondary resource request URI's to be serviced by the app client service once it has booted.",
        ____types: "jsObject",
        ____asMap: true,
        ____defaultValue: {},
        hashroutePathname: {
          ____label: "Hashroute Pathname App Metadata",
          ____description: "Data used to determine details about which page view and what specific behaviors the app client service should invoke in response to an initial or subsequent user/programmatic update the location.href's hashroute string (UTF-8 string beginning w/# appended at tail of location.href).",
          ____accept: "jsObject" // Filtered inside the constructor function

        }
      }
    } // ~.appData.appMetadata

  },
  // ~.appData
  appModels: {
    ____label: "Holistic Service Core Behavior Models",
    ____description: "A collection of application-specific plug-in artifacts derived from @encapsule/holistic RTL's registered with this HolisticServiceCore instance for subsequent registration in derived HolisticNodeService and HolisticBTabService runtime service instances.",
    ____types: "jsObject",
    ____defaultValue: {},
    display: {
      ____label: "App Service Core Display Behavior Models",
      ____description: "Appliction-layer-specific plug-ins that used to configure the derived service's display subsystem.",
      ____types: "jsObject",
      ____defaultValue: {},
      d2r2Components: {
        ____label: "@encapsule/d2r2 React.Element Generator Filters",
        ____description: "A collection of @encapsule/d2r2 component binding filters be be registered with the derived service's <ComponentRouter/> instance.",
        ____types: "jsArray",
        ____defaultValue: [],
        d2d2Component: {
          ____label: "@encapsule/d2r2 Compomnent",
          ____description: "An @encapsule/d2r2 Component is a React.Component wrapped in an @encapsule/arccore.filter that performs runtime validation/normalization of this.props data and synthesis of a specific React.Element bound to the filtered data.",
          ____accept: "jsObject" // This is an @encapsule/arccore.filter descriptor object w/extra properties added by @encapsule/d2r2 for tracking and diagnostics. We accept it w/out filtering here as we're just caching the registration on behalf of some service; if there's an error the service class constructor will report the problem(s).

        } // ~.appModels.display.d2r2Component

      } // ~.appModels.display.d2r2

    },
    // ~.appModels.display
    cellModels: {
      ____label: "App Service Core Cells",
      ____description: "A collection of application-specific CellModel plug-ins that define the behaviors of a derived holistic app service instance.",
      ____types: "jsArray",
      ____defaultValue: [],
      cellModel: {
        ____label: "@encapsule/holarchy CellModel",
        ____description: "A CellModel class instance that defines the behaviors and characteristics of an application-specific class of cell processes that needs to be registered w/a holistic service's kernel cell (a singleton cell process) so that application-layer service code may activate instance(s).",
        ____accept: "jsObject" // This is an @encapsule/holarchy CellModel class instance that can represent effectively any shared behavior

      } // ~.appModels.cellModels.cellModel

    } // ~.appModels.cellModels

  } // ~.appModels

}; // ~