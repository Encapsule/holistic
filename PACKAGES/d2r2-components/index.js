"use strict";

// index.js
var packageMeta = require("./package");

var components = require("./elements");

var legacyStyles = require("./theme"); // TODO: Retire this mess in favor of some form of theme standardization.


module.exports = {
  __meta: {
    author: packageMeta.author,
    name: packageMeta.name,
    version: packageMeta.version,
    codename: packageMeta.codename,
    build: packageMeta.buildID,
    source: packageMeta.buildSource
  },
  components: components,
  styles: legacyStyles
};