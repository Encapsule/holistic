"use strict";

// cm-method-constructor-input-spec.js
// @encapsule/holarchy.CellModel::constructor inputFilterSpec
module.exports = {
  ____label: "Cell Model Descriptor",
  ____description: "A request object passed to CellModel ES6 class constructor function.",
  ____types: "jsObject",
  id: {
    ____label: "Model ID",
    ____description: "A unique version-independent IRUT identifier used to identify this CellModel.",
    ____accept: "jsString" // must be an IRUT

  },
  name: {
    ____label: "Model Name",
    ____description: "A short name used to refer to this CellModel.",
    ____accept: "jsString"
  },
  description: {
    ____label: "Model Description",
    ____description: "A short description of this CellModel.",
    ____accept: "jsString"
  },
  apm: {
    ____label: "Cell Model Behaviors",
    ____description: "An optional APM descriptor that if provided will be used to ascribe memory and/or higher-order observable process behaviors to this CellModel.",
    ____accept: ["jsNull", "jsObject"],
    // further processed in bodyFunction
    ____defaultValue: null // If null, then a valid CM defines at least one TOP or ACT.

  },
  operators: {
    ____label: "Cell Model Operators",
    ____description: "An optional array of Transition Operator descriptor objects one for each TransitionOperator defined by this CellModel.",
    ____types: "jsArray",
    ____defaultValue: [],
    TransitionOperator: {
      ____label: "Transition Operator",
      ____description: "Either a TOP descriptor or its corresponding TransitionOperator ES6 class instance.",
      ____accept: "jsObject" // further processed in bodyFunction

    }
  },
  actions: {
    ____label: "Cell Model Actions",
    ____description: "An optional array of controller action descriptor object(s) or equivalent ControllerAction ES6 class instance(s) defined by this CellModel.",
    ____types: "jsArray",
    ____defaultValue: [],
    ControllerAction: {
      ____label: "Controller Action",
      ____description: "Either an ACT descriptor or its corresponding ControllerAction ES6 class instance.",
      ____accept: "jsObject" // further processed in bodyFunction

    }
  },
  subcells: {
    ____label: "Subcell Model Registrations",
    ____description: "An optional array of Cell Model descriptor object(s) and/or CellModel ES6 class instance(s).",
    ____types: "jsArray",
    ____defaultValue: [],
    subcell: {
      ____label: "Subcell Model Registration",
      ____description: "A Cell Model descriptor or equivalent CellModel ES6 class instance.",
      ____accept: "jsObject" // further processed in bodyFunction

    }
  }
}; // CellModel::constructor inputFilterSpec