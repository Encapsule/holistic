"use strict";

// @encapsule/holistic-app-common-cm/index.js
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
  cml: new holarchy.CellModel({
    id: "74npOB-3S8GEgHwdtWwHrg",
    name: "Holistic App Common Kernel",
    description: "Provides core kernel cell process models shared by the holistic app server and holistic app client application cell models.",
    subcells: [require("./ViewThemeProcessor")]
  })
};