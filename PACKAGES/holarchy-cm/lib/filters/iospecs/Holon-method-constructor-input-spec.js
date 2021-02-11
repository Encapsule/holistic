"use strict";

// Holon-method-constructor-input-spec.js
module.exports = {
  ____label: "Holon::constructor Request",
  ____description: "A descriptor object passed to Holon::constructor function to instantiate a Holon instance (a neighborhood of related CellModel).",
  ____types: "jsObject",
  label: {
    ____label: "Holon Instance Label",
    ____description: "A developer-defined unique string label used to identify the Holon instance's neighborhood.",
    ____accept: "jsString"
  },
  instanceConstructorRequestSpec: {
    ____label: "Holon Instance Constructor Request Spec",
    ____accept: "jsObject"
  },
  instanceConstructorBodyFunction: {
    ____label: "Holon Instance Constructor Body Function",
    ____accept: "jsFunction"
  }
};