"use strict";

// AbstractProcessModel-app-client-runtime.js
var holarchy = require("@encapsule/holarchy");

var appClientRuntimeDeclaration = require("./AbstractProcessModel-app-client-runtime-declaration");

module.exports = new holarchy.AbstractProcessModel(appClientRuntimeDeclaration);