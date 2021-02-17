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
  cmasHolisticHTML5ServicePackage: require("./cmasHolisticHTML5ServicePackage"),
  // v0.0.48-spectrolite
  HolisticHTML5Service: require("./HolisticHTML5Service"),
  // New ES6 class
  // App-level service logic may call this function to reuse the HTML5 service kernel's fatal boot exception display.
  // NOTE: You probably should not use this during runtime of your application (i.e. after the HTML5 service calls
  // the start lifecycle action) --- It's very unfriendly and intended to be seen only be developers.
  displayServiceException: require("./lib/holistic-html5-service-exception-display")
};