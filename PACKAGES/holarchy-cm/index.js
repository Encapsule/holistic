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
  // CellModelArtifactSpace class instance specialized for @encapsule/holarchy-cm package.
  cmasHolarchyCMPackage: require("./cmasHolarchyCMPackage"),
  // CellModelTemplate class instance for synthesizing value-type-specialized ObservableValue CellModel.
  cmtObservableValue: require("./ObservableValue_T"),
  cmObservableValueHelper: require("./ObservableValueHelper"),
  cmtDisplayView: require("./DisplayView_T"),
  cmtDisplayStreamMessage: require("./DisplayView_T/DisplayStreamMessage_T"),
  generateDisplayStreamModels: require("./DisplayView_T/display-stream-artifact-generator-filter")
};