"use strict";

// cmt-method-constructor-input-spec.js
module.exports = {
  ____label: "CellModelTemplate::constructor Request",
  ____description: "Request object value passed to CellModelTemplate::constructor function.",
  ____types: "jsObject",
  templateLabel: {
    ____label: "CellModelTemplate Instance Label",
    ____description: "A unique and stable label (no spaces, legal JavaScript variable name token) that refers to the family of CellModel that may be synthesized by calling the constructed CellModelTemplate instance's synthesizeCellModel method.",
    ____accept: "jsString" // v0.0.62-titanite --- templateLabel is passed into a developer-defined CellModel generator filter bodyFunction for _labeling_ purposes. It does not get involved in CMAS.mapLabels/or makeSubspaceInstance (unless you make pass the value as a label to CMAS).

  },
  cellModelGenerator: {
    ____label: "CellModel Generator",
    ____description: "CellModelTemplate::synthesizeCellModel method calls the CellModelTemplate class instance's cellModelGenerator filter to synthesize a unique specialization of CellModel. These values specialize the behavior of the CellModel generator filter for the specific family of CellModel identified by templateLabel value.",
    ____types: "jsObject",
    specializationDataSpec: {
      ____label: "CellModelTemplate::synthesizeCellModel Specialization Data Spec",
      ____description: "A filter spec that defines the format of the information someone who will call your CellModelTemplate class instance's synthesizeCellModel method must supply via ~.specializationData value.",
      ____accept: "jsObject" // This will be an @encapsule/arccore.filter spec object.

    },
    generatorFilterBodyFunction: {
      ____label: "CellModelTemplate::synthesizeCellModel Generator bodyFunction",
      ____description: "A developer-defined @encapsule/arccore.filter style bodyFunction that implements a transformation from CellModelAddressSpace + synthesizeMethodRequest to specialized CellModel artifact instance.",
      ____accept: "jsFunction"
    }
  }
};