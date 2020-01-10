"use strict";

// index.js
var packageMeta = require("./package");

var ComponentFactory = require("./lib/ComponentFactory");

var ComponentRouterFactory = require("./lib/ComponentRouterFactory");

module.exports = {
  __meta: {
    author: packageMeta.author,
    name: packageMeta.name,
    version: packageMeta.version,
    codename: packageMeta.codename,
    build: packageMeta.buildID,
    source: packageMeta.buildSource
  },
  ReactComponentBindingFactory: ComponentFactory,
  ComponentFactory: ComponentFactory,
  ComponentRouterFactory: ComponentRouterFactory
};