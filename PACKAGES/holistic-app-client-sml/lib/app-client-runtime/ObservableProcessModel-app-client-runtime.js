"use strict";

// ObservableProcessModel-app-client-runtime.js
var holarchy = require("@encapsule/holarchy");

var appClientRuntimeDeclaration = require("./ObservableProcessModel-app-client-runtime-declaration");

module.exports = new holarchy.ObservableProcessModel(appClientRuntimeDeclaration);