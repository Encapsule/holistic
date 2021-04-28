"use strict";

// app-metadata-app-values.js
var appBuildManifest = require("../../app-build");

module.exports = {
  name: appBuildManifest.app.name,
  description: appBuildManifest.app.description,
  build: appBuildManifest
};