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
  } // v0.0.49-spectrolite
  // THIS RTL MODULE HAS BEEN TEMPORARILY DEPRECATED
  // The CellModel named "FrameLatch" is no longer being used.
  // If you are performing low-level, bare-metal testing of ObservableProcessController
  // and need to pickup intrinsic artifacts typically only registered in OPC
  // when contained w/in a CellProcessor instance, then use the 'HolarchyCommon'
  // CellModel export from the @encapsule/holarchy RTL. I believe this primarily
  // impacts only holistic platform internal test suites and is not of any
  // major concern to anyone at this point.

};