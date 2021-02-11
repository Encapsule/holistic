"use strict";

// cmt-method-constructor-input-spec.js
module.exports = {
  ____label: "CellModelTemplate::constructor Request",
  ____description: "Request object value passed to CellModelTemplate::constructor function.",
  ____types: "jsObject",
  cmasScope: {
    ____label: "CellModelArtifactSpace Scope",
    ____description: "The CellModelArtifactSpace instance that models the CellModel artifact space that an instance of this CellModelTemplate should subspace when synthesizing CellModel instances via its CellModelTemplate::synthesizeCellModel method.",
    // Typically, the cmas reference will be @encapsule/holistic RTL package, or derived app service scope CellModelArtifactSpace instance.
    ____accept: "jsObject" // Either a CellModelAddressSpace class instance or CellModelAddressSpace::constructor request object.

  },
  templateLabel: {
    ____label: "CellModelTemplate Instance Label",
    ____description: "A unique and stable label (no spaces, legal JavaScript variable name token) that refers to the family of CellModel that may be synthesized by calling the constructed CellModelTemplate instance's synthesizeCellModel method.",
    ____accept: "jsString" // Note that the CellModelTemplate instance's base CellModelArtifactSpace class constructor will be called with cmasScope.makeSubspaceInstance({ spaceLabel: templateLabel })

  },
  cellModelGenerator: {
    ____label: "CellModel Generator",
    ____description: "CellModelTemplate::synthesizeCellModel method calls the CellModelTemplate class instance's cellModelGenerator filter to synthesize a unique specialization of CellModel. These values specialize the behavior of the CellModel generator filter for the specific family of CellModel identified by templateLabel value.",
    ____types: "jsObject",
    synthesizeMethodRequestSpec: {
      ____label: "CellModelTemplate::synthesizeCellModel Request Spec",
      ____description: "A developer-defined format of a request object passed to CellModelTemplate::synthesizeCellModel method.",
      ____accept: "jsObject" // This will be an @encapsule/arccore.filter spec object.

    },
    generatorFilterBodyFunction: {
      ____label: "CellModelTemplate::synthesizeCellModel Generator bodyFunction",
      ____description: "A developer-defined @encapsule/arccore.filter style bodyFunction that implements a transformation from CellModelAddressSpace + synthesizeMethodRequest to specialized CellModel artifact instance.",
      ____accept: "jsFunction"
    }
  }
};