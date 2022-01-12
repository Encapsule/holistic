"use strict";

/*
  O       o O       o O       o
  | O   o | | O   o | | O   o |
  | | O | | | | O | | | | O | |
  | o   O | | o   O | | o   O |
  o       O o       O o       O
*/
// @encapsule/holarchy
// Copyright (C) 2000-2021 Christopher D. Russell
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
  HolisticServiceCore: require("./HolisticServiceCore"),
  // These are @encapsule/arccore.filter specs exported by @encapsule/holistic-service-core RTL
  // that are needed by @encapsule/holistic-node-service and @encapsule/holistic-html5-service RTL's
  serviceTypes: {
    HolisticServiceCore: {
      constructor: require("./lib/filters/iospecs/HolisticServiceCore-method-constructor-filter-input-spec"),
      _private: require("./lib/filters/iospecs/HolisticServiceCore-method-constructor-filter-output-spec"),
      httpServerError: require("./lib/filters/iospecs/http-response-error-result-spec.json"),
      httpServerAgent: require("./lib/filters/iospecs/http-server-agent-result-spec.json")
    }
  }
};