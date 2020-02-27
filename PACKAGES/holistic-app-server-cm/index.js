"use strict";

// @encapsule/holistic-app-server-cm/index.js
var packageMeta = require("./package.json");

var holarchyCM = require("@encapsule/holarchy-cm");

module.exports = {
  __meta: {
    author: packageMeta.author,
    name: packageMeta.name,
    version: packageMeta.version,
    codename: packageMeta.codename,
    build: packageMeta.buildID,
    source: packageMeta.buildSource
  } // WIP: We're not applying @encapsule/holarchy in the Node.js app server just yet.

};