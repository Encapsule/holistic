"use strict";

// @encapsule/holarchy-cm package exports:
var holarchy = require("@encapsule/holarchy");

var packageMeta = require("./package");

module.exports = {
  __meta: {
    author: packageMeta.author,
    name: packageMeta.name,
    version: packageMeta.version,
    codename: packageMeta.codename,
    build: packageMeta.buildID,
    source: packageMeta.buildSource
  },
  cml: new holarchy.CellModel({
    id: "RyMcv3MpTI-Co1EyVOIvlw",
    name: "Holarchy CML",
    description: "Holarchy Cell Model Library (CML) provides cellular process primitive operations, actions, and cell models for re-use in higher-order cell models.",
    subcells: [require("./HolarchyCore"), require("./HolarchyBase")]
  })
};