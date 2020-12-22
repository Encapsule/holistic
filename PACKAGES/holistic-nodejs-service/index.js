"use strict";

// @encapsule/holistic-app-server-cm/index.js
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
  // v0.0.49-spectrolite
  HolisticNodeService: require("./HolisticNodeService") // New ES6 class

};