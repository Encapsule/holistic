"use strict";

/*
  O       o O       o O       o
  | O   o | | O   o | | O   o |
  | | O | | | | O | | | | O | |
  | o   O | | o   O | | o   O |
  o       O o       O o       O
*/
// @encapsule/holarchy
// Copyright (C) 2000-2020 Christopher D. Russell
// Published for free and public use under MIT License by Encapsule Project, Seattle WA USA
// @encapsule/holistic platform disitution package is available for public download here:
// git@github.com:Encapsule/holistic.git https://github.com/Encapsule/holistic
// Default distribution repo branch is #release-stable. Use this production services.
// Stable test builds for the next #release-stable merge are vetted on #release-test.
// Follow Encapsule Project on Twitter & GitHub for news and release updates @Encapsule.
//
// @encapsule/holistic-app-common-cm/index.js
// ****************************************************************
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
  HolisticAppCommon: require("./HolisticAppCommon"),
  // ES6 class construction function export
  HolisticServiceCore: require("./HolisticAppCommon"),
  // PREFERRED ALIAS - I plan to rename the class definition and the module name and the RTL package shortly.
  // These are @encapsule/arccore.filter specs exported by @encapsule/holistic-service-core RTL
  // that are needed by @encapsule/holistic-node-service and @encapsule/holistic-btab-service RTL's
  serviceTypes: {
    HolisticServiceCore: {
      constructor: require("./lib/filters/iospecs/HolisticAppCommon-method-constructor-filter-input-spec"),
      _private: require("./lib/filters/iospecs/HolisticAppCommon-method-constructor-filter-output-spec")
    }
  }
};