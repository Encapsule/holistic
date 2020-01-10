"use strict";

// opm-frame-latch.js
var holarchy = require("@encapsule/holarchy");

var opmFrameLatchDeclaration = require("./opm-frame-latch-declaration");

module.exports = new holarchy.ObservableProcessModel(opmFrameLatchDeclaration);