"use strict";

// cp-method-contructor-input-spec.js
//
module.exports = {
  ____label: "Software Cell Processor Descriptor",
  ____description: "A request object passed to the SoftwareCellProcessor ES6 class constructor function.",
  ____types: "jsObject",
  id: {
    ____label: "Processor ID",
    ____description: "A unique version-independent IRUT identifier used to identify this SoftwareModel.",
    ____accept: "jsString" // must be an IRUT

  },
  name: {
    ____label: "Processor Name",
    ____description: "A short name used to refer to this SoftwareCellProcessor.",
    ____accept: "jsString"
  },
  description: {
    ____label: "Processor Description",
    ____description: "A short description of this SoftwareCellProcessor's purpose and/or function.",
    ____accept: "jsString"
  },
  cellmodel: {
    ____label: "App/Service Cell Model",
    ____description: "Either a CM descriptor or equivalent CellModel ES6 class instance.",
    ____accept: "jsObject" // further processed in bodyFunction

  },
  options: {
    ____label: "Options",
    ____description: "Optional behavioral overrides and runtime settings.",
    ____types: "jsObject",
    ____defaultValue: {}
  }
};