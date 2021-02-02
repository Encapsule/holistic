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
  factories: {
    makeObservableValueCellModel: require("./HolarchyCommon_ObservableValue/cellmodel-factory-filter"),
    makeValueObserverWorkerCellModel: require("./HolarchyCommon_ValueObserverWorker/cellmodel-factory-filter")
  }
};