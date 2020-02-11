"use strict";

// ObservableProcessModel-app-client-view.js
var holarchy = require("@encapsule/holarchy");

var appClientViewDeclaration = require("./ObservableProcessModel-app-client-view-declaration");

module.exports = new holarchy.ObservableProcessModel(appClientViewDeclaration);