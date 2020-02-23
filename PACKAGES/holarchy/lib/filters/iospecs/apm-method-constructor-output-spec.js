"use strict";

// apm-method-constructor-filter-output-spec.js
var inputFilterSpec = require("./apm-method-constructor-input-spec");

module.exports = {
  ____label: "Normalized Abstract Process Model Descriptor",
  ____description: "Normalized APM declaration and derived information consumed by the AbstractProcessModel class.",
  ____types: "jsObject",
  vdid: {
    ____label: "Version-Dependent Identifier",
    ____description: "An IRUT hash of this APM's definition used to ensure that two APM's with the same ID are actually the same APM.",
    ____accept: "jsString"
  },
  declaration: inputFilterSpec,
  digraph: {
    ____label: "Abstract Process Model Digraph",
    ____description: "A reference to a DirectedGraph model of the APM.",
    ____accept: "jsObject"
  }
};