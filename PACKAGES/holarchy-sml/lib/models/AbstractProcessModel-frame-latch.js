"use strict";

// AbstractProcessModel-frame-latch.js
// DON'T USE THIS FOR ANYTHING YET! DO NOT DERIVE FROM THIS...
var holarchy = require("@encapsule/holarchy");

var apmFrameLatchDeclaration = require("./declarations/AbstractProcessModel-frame-latch-declaration");

module.exports = new holarchy.AbstractProcessModel(apmFrameLatchDeclaration);