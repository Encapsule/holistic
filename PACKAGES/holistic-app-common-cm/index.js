"use strict";

// @encapsule/holistic-app-common-cm/index.js
var packageMeta = require("./package.json");

module.exports = {
  __meta: {
    author: packageMeta.author,
    name: packageMeta.name,
    version: packageMeta.version,
    codename: packageMeta.codename,
    build: packageMeta.buildID,
    source: packageMeta.buildSource
  },
  // v0.0.48-kyanite
  HolisticAppNucleus: require("./HolisticAppNucleus"),
  // New ES6 class
  // v0.0.48-kyanite this is being pulled inside the nucleus - nobody cares.
  appCommonKernelCellModelFactory: require("./holistic-app-common-cellmodel-factory-filter"),
  // v0.0.48-kyanite this is being pulled inside the nucleus - nobody needs to have these details in their face.
  // CellModel Library (cml)
  cml: require("./HolisticAppCommonKernel")
};