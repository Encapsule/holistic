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
  // v0.0.48-spectrolite
  HolisticHTML5Service: require("./HolisticHTML5Service") // New ES6 class

};