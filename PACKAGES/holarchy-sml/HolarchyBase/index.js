"use strict";

var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.CellModel({
  id: "c2cq2OE9SiaLKahL3Mk0KA",
  name: "Holarchy Base Cell Model",
  description: "A collection of low-level building blocks.",
  subcells: [require("./HolarchyBaseMemoryMailboxFlag")]
});