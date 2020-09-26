"use strict";

// @nncapsule/holistic/SOURCES/LIB/holarchy/opc/filters/iospects/opc-method-constructor-input-spec.js
//
// This filter spec defines the request descriptor object format accepted by ObserverableProcessController::constructor function.
module.exports = {
  ____label: "OPC Constructor Request",
  ____description: "ObservableProcessController::constructor function delegates its single in-param to this filter that uses the following filter spec to validate/normalize it before executing bodyFunction.",
  ____types: "jsObject",
  id: {
    // holistic-derived apps inherit a platform dependency on @encapsule/arctools package that is installed in
    // the derived app's node_modules directory w/tools registered in node_modules/.bin/arc*. From the root
    // of your package, $ ./node_modules/.bin/arc_generateIRUT
    ____label: "OPC System VIID IRUT",
    ____description: "Developer-assigned unique 22-character IRUT identifier used as the Version-Independent Indentifier (VIID) of this specific OPC system model.",
    ____accept: "jsString" // IRUT (preferred) or "demo" to receive one-time random IRUT (enforced in bodyFunction)

  },
  name: {
    ____label: "OPC System Name",
    ____description: "Developer-defined short name assigned to this OPC system model.",
    ____accept: ["jsUndefined", "jsString"] // default assigned conditionally in bodyFunction

  },
  description: {
    ____label: "OPC System Description",
    ____description: "Developer-defined short descripion of the function and/or role of this OPC configuration.",
    ____accept: ["jsString", "jsUndefined"] // default assigned conditionally in bodyFunction

  },
  options: {
    ____label: "OPC Config Options",
    ____description: "Developer-defined OPC instance options.",
    ____types: "jsObject",
    ____defaultValue: {},
    evaluate: {
      ____label: "OPC Instance Evaluation Options",
      ____description: "Options to facilitate OPC testing and other advanced runtime configuration scenarios.",
      ____types: "jsObject",
      ____defaultValue: {},
      maxFrames: {
        ____label: "OPC Evaluation Frame Limit",
        ____description: "The maximum number of frames allowed per system evaluation.",
        ____accept: "jsNumber",
        ____defaultValue: 64,
        ____inRangeInclusive: {
          begin: 0,
          end: 256
          /* seems unlikely any reasonable service would need this many frames. but, the important thing is to cap it. */

        }
      },
      firstEvaluation: {
        ____label: "OPC First Evaluation Flag",
        ____description: "Determines if an OPC instance auto-evaluates post construction. Or, is deferred until after the first external OPC.act call is processed.",
        ____accept: "jsString",
        ____defaultValue: "constructor",
        ____inValueSet: ["constructor", // first evaluation occurs in the epilogue of ObservableProcessController::constructor
        "action" // first evaluation occurs in the epilogue of ObservableProcessController::act
        ]
      }
    }
  },
  ocdTemplateSpec: {
    ____accept: "jsObject",
    // replaced by OPC
    ____defaultValue: {
      ____types: "jsObject"
    } // by default take the OPC-defined OCD runtime spec (useful really only for testing because it doesn't contain any app state data.

  },
  ocdInitData: {
    ____label: "Initial State Data",
    ____description: "Optional reference to a descriptor object containing full or partial information to be passed to the OCD constructor. This information is applied during construction and prior to first evaluation.",
    ____accept: "jsObject",
    // OCD store instances are always modeled as a descriptor object.
    ____defaultValue: {}
  },
  abstractProcessModelSets: {
    ____label: "Abstract Process Model Sets",
    ____description: "An array of arrays of unique AbstractProcessModel class instances.",
    ____types: "jsArray",
    ____defaultValue: [],
    index: {
      ____label: "Abstract Process Model Set",
      ____description: "An array of unique AbstractProcessModel class instances.",
      ____types: "jsArray",
      index: {
        ____label: "AbstractProcesModel",
        ____description: "Reference to a AbstractProcessModel class instance.",
        ____accept: "jsObject"
      }
    }
  },
  // abstractProcessModels
  // Transition operator filters are aggregated in an arccore.discrimintor filter for dispatch by the OPC during OPM evaluation.
  transitionOperatorSets: {
    ____label: "Transition Operator Filter Sets",
    ____description: "An array of arrays of unique TransitionOperatorFilter class instances.",
    ____types: "jsArray",
    ____defaultValue: [],
    index: {
      ____label: "Transition Operator Filter Set",
      ____description: "An an array of unique TransitionOperatorFilter class instances.",
      ____types: "jsArray",
      index: {
        ____label: "Transition Operator Filter",
        ____description: "Reference to a previously-instantiated TransitionOperatorFilter class instance.",
        ____accept: "jsObject"
      }
    }
  },
  // transitionOperatorFilters
  // Controller action filters are aggregated in an arccore.discriminator filter for dispatch by the OPC during OPM evaluation. And, in response to external events of interest to OPM's.
  controllerActionSets: {
    ____label: "Controller Action Filter Sets",
    ____description: "An array of arrays of unique ControllerActionFilter class instances.",
    ____types: "jsArray",
    ____defaultValue: [],
    index: {
      ____label: "Controller Action Filter Set",
      ____description: "An array of unique ControllerActionFilter class instances.",
      ____types: "jsArray",
      index: {
        ____label: "Controller Action Filter",
        ____description: "Reference to a previously-instantiated ControllerActionFilter class instance.",
        ____accept: "jsObject"
      }
    }
  }
};