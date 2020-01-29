"use strict";

// opm-frame-latch.js
var holarchy = require("@encapsule/holarchy");

var opmFrameLatchDeclaration = require("./ObservableProcessModel-frame-latch-declaration");

module.exports = new holarchy.ObservableProcessModel(opmFrameLatchDeclaration);