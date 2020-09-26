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
    ____description: "Optional behavioral overrides and cellular runtime host settings.",
    ____types: "jsObject",
    ____defaultValue: {},
    ignoreConstructorWarnings: {
      ____label: "Ignore Constructor Warnings",
      ____description: "If set true, CellProcessor will ignore construction-time warnings. You are advised to leave this set to false while developing new services. Otherwise, little typos will break your CellProcessor-hosted runtime service in ways that are hard to diagnose (often due disagreements over APM ID's).",
      ____accept: "jsBoolean",
      ____defaultValue: false
    },
    opc: {
      ____label: "OPC Options (Advanced)",
      ____description: "Advanced options to override CellProcessor's runtime cellular process host, ObservableProcessController, default behavior settings. Do not commit changes to these settings w/out careful review of your test logs please!",
      ____types: "jsObject",
      ____defaultValue: {},
      bootToStandby: {
        ____label: "Boot To Standby",
        ____description: "Upon successful construction of a new CellProcessor instance, leave the OPC in standby mode that defers all cell evaluation until the first call to CellProcessor.act. This is generally only used for testing purposes. And, in very specific weird experiments.",
        ____accept: "jsBoolean",
        ____defaultValue: false
      },
      maxFrames: {
        ____label: "Maximum Cell Evaluation Frames",
        ____description: "The maximum number of evaluation frames (a complete pass over all active cells) that are allowed to occur synchronously before OPC declares that the cellular service is mutating out of control.",
        ____accept: ["jsUndefined", // Take the OPC default maxFrames (currently set to 64 which is really much more than is typically needed)
        "jsNumber" // An override value subject to OPC-imposed constraints (currently limited to a maximum of 256 (which is ridiculous))
        ]
      }
    }
  }
};