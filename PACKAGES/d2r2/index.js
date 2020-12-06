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
  // We export a filter reference (the "factory" (see factory pattern)) that synthesizes a React.Element via a call to React.createElement from inputs:
  // 1. Your filtered request data
  // 2. Your React.Component-derived class
  reactElementSynthFilterFactory: ComponentFactory,
  // USE THIS SIGNATURE TO CREATE "React.Element synthesis filters" (this is succinct and aligns well with React terminology).
  // DEPRECATED: DO NOT USE THESE ANYMORE PLEASE!
  ReactComponentBindingFactory: ComponentFactory,
  ComponentFactory: ComponentFactory,
  // Might be interesting to someday create an alias for <ComponentRouter/> called <SomeComponent {...this.props} selectComponentRequest={...} /> that
  // functions equivalently. I am not changing the name now because it would be too confusing. But, later when people are trying to understand how to
  // do for themselves what we do w/RMDR generally, d2r2 is the natural starting point; it's the most accessible aspect of the system because it
  // interfaces w/React and produces observable behaviors a large number of React developers can understand and build from.
  ComponentRouterFactory: ComponentRouterFactory // <ComponentRouter/> has been around awhile now and works well. But, it's correct use is rather involved.

};