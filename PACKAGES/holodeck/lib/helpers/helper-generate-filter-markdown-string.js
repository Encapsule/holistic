"use strict";

// helper-generate-filter-markdown-string.js
//
// This is a little wrapper around arctools facility
// that is rather stupid insofar as it relies on handlebars
// and does so in a way that forces inelegant solutions like
// this.
var arctools = require("@encapsule/arctools");

var arccore = arctools.arccore;

var fs = require("fs");

var path = require("path");

var templatePath = path.resolve(path.join(require.resolve("@encapsule/arctools").split("/").slice(0, -1).join("/"), "templates/filter.hbs"));
var templateString = fs.readFileSync(templatePath).toString("utf-8");

module.exports = function (request_) {
  return arctools.filterDocGenerate.request({
    filter: request_.filter,
    template: templateString
  });
};