"use strict";

// opm-method-constructor-filter-output-spec.js
var inputFilterSpec = require("./opm-method-constructor-input-spec");

module.exports = {
  ____label: "Normalized Observable Process Model Descriptor",
  ____description: "A descriptor object containing a normalized copy of an OPM declaration, and derived information consumed by the ObservableProcessModel class.",
  ____types: "jsObject",
  declaration: inputFilterSpec,
  digraph: {
    ____label: "Observable Process Model Digraph",
    ____description: "A reference to a DirectedGraph model of the OPM.",
    ____accept: "jsObject"
  }
};