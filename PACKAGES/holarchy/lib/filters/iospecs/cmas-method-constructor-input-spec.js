"use strict";

// cmas-method-constructor-input-spec.js
module.exports = {
  ____label: "CellModelArtifactSpace::constructor Request",
  ____description: "Descriptor object passed into the CellModelArtifactSpace class constructor function.",
  ____types: "jsObject",
  ____defaultValue: {},
  spaceLabel: {
    ____label: "Artifact Space Label",
    ____description: "A unique string label used to identify the specific CellModel artifact space to use to resolve CellModel artifact label queries.",
    ____accept: "jsString"
  }
};