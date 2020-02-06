"use strict";

// ObservableProcessModel-frame-latch.js
var holarchy = require("@encapsule/holarchy");

var opmFrameLatchDeclaration = require("./declarations/ObservableProcessModel-frame-latch-declaration");

module.exports = new holarchy.ObservableProcessModel(opmFrameLatchDeclaration);