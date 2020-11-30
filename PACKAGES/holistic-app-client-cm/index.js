"use strict";

// @encapsule/holistic-app-client/index.js
var packageMeta = require("./package.json");

var holarchy = require("@encapsule/holarchy");

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
  HolisticAppClient: require("./HolisticAppClient"),
  // New ES6 class
  appClientCellModelFactory: require("./holistic-app-client-cellmodel-factory-filter"),
  cml: require("./HolisticAppClientKernel")
};