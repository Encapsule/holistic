"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// HolisticAppNucleus-method-constructor-filter-output-spec.js
module.exports = {
  ____label: "HolisticAppCommon Private Instance Data",
  ____types: "jsObject",
  nonvolatile: {
    ____label: "Holistic Service Core NVRAM",
    ____description: "Data in this namespace is considered nonvolatile (i.e. read-only/immutable) for the during of a holistic app service's runtime.",
    ____types: "jsObject",
    // A note about terminology.
    // In C++ a declaration tells the compiler "Hey - there's this thing called X and it has a type of Y."
    // And, a definition is a statement that tells the compiler "Hey - I want an instance of Y named Z to use in my algorithm."
    // Here we define the format of serviceCoreDefinition which reads "We want an instance of Y (where Y is a "Holistic Service Core Definition" type as per the spec)
    // called Z (where Z is a "variable" (modeled as a namespace in a document) named "serviceCoreDefinition").
    // Not to confuse matters more...
    // A "service core defition" is a collection of other "definitions" some of which are actually "declarations" as per the definitions above.
    // Mostly, nobody should care. But, if you are readying through this code and trying to understand it then this information will help you
    // keep your bearing.
    appCommonDefinition: _objectSpread(_objectSpread({}, require("./HolisticServiceCore-method-constructor-filter-input-spec")), {}, {
      // This is the constructor filter's input spec that we spread into the output spec and relabel.
      ____label: "Holistic Service Core Definition",
      ____description: "This is a of the normalized constructor request descriptor object that we keep for reference so that it is possible to deeply introspect a derived app service runtime."
    }),
    appMetadata: {
      ____label: "App Metadata",
      ____description: "Information pertaining to build-time static app metadata used through the derived app service's processes.",
      ____types: "jsObject",
      values: {
        ____types: "jsObject",
        digraph: {
          ____label: "App Metadata Digraph",
          ____description: "Reference to a DirectedGraph class instance containing the derived app's metadata.",
          ____accept: "jsObject"
        }
      },
      specs: {
        ____label: "App Metadata Runtime Types",
        ____description: "A descriptor objects containing the specialized filter specs for each of the holistic platform's pre-defined app metadata buckets.",
        ____types: "jsObject",
        org: {
          ____label: "App Metadata Org Runtime Type Spec",
          ____description: "The format of an app metadata organization descriptor object.",
          ____accept: "jsObject" // This is a filter spec

        },
        app: {
          ____label: "App Metadata App Runtime Type Spec",
          ____description: "The format of an app metadata application descriptor object.",
          ____accept: "jsObject" // This is a filter spec

        },
        pages: {
          ____label: "App Metadata Page Map Runtime Type Spec",
          ____description: "The format of a map (dictionary) of app metadata page descriptor objects.",
          ____accept: "jsObject" // This is a filter spec

        },
        hashroutes: {
          ____label: "App Metadata Hashroute Map Runtime Type Spec",
          ____description: "The format of a map (dictionary) of app metadata hashroute descriptor objects.",
          ____accept: "jsObject" // This is a filter spec

        }
      },
      accessors: {
        ____label: "App Metadata Accessor Functions",
        ____description: "Low-level functions that implement the core app metadata query API. This function is exposed by getX methods on HolisticCoreService for use by HolisticNodeService. And, by AppMetadata CellModel that is used currently only in HolisticTabService (because we have no CellProcessor in HolisticNodeService right now).",
        ____types: "jsObject",
        getAppMetadataDigraph: {
          ____accept: "jsFunction"
        },
        getAppMetadataOrg: {
          ____accept: "jsFunction"
        },
        getAppMetadataApp: {
          ____accept: "jsFunction"
        },
        getAppMetadataPage: {
          ____accept: "jsFunction"
        },
        getAppMetadataHashroute: {
          ____accept: "jsFunction"
        }
      }
    },
    coreDisplayComponents: {
      ____label: "Core Display d2r2 Component Registrations",
      ____description: "An array of @encapsule/d2r2 React.component wrapper filters (used to generated React.Element bound to filtered data) to be used in either HolisticNodeService or HolisticTabService.",
      ____types: "jsArray",
      d2r2Component: {
        ____label: "@encapsule/d2r2 Component Filter",
        ____description: "An @encapsule/arccore.filter that wraps a specific React.Component providing a means to create a specific React.Element bound to validated/normalized (i.e. filtered) this.props data.",
        ____accept: "jsObject" // This is a filter reference produced by calling a factory filter exported by @encapsule/d2r2

      }
    },
    coreCellModels: {
      ____label: "Core CellModel Registrations",
      ____description: "An array of @encapsule/holarchy CellModel instances that extend the behaviors of either HolisticNodeService or HolisticTabService.",
      ____types: "jsArray",
      cellModel: {
        ____label: "CellModel Registration",
        ____description: "A reference to an @encapsule/holarchy CellModel instance the represents some behavior or feature to be used in HolisticNodeService or HolisticTabService.",
        ____accept: "jsObject" // This is a CellModel class instance reference

      }
    },
    serviceBootROMSpec: {
      ____label: "Service BootROM Spec",
      ____description: "The type-specialized filter specification used to ensure the format of values serialized by HolisticNodeService into a new HolisticHTML5Service's bootROM (base64-encoded JSON serialized into HTML5 documents synthesized by HolisticNodeService).",
      ____accept: "jsObject"
    }
  } // ~.nonvolatile (We may enforce this w/recursive Object.freeze later). We presume this data invariant for lifespan of a holistic service. Do not change it.

};