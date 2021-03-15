"use strict";

(function () {
  // Holistic platform holarchy common library.
  var holarchyCM = require("@encapsule/holarchy-cm"); // The filter spec that defines the data type we want to make "observable".


  var routerEventDescriptorSpec = require("../lib/iospecs/router-event-descriptor-spec"); // Synthesize a new member of the ObservableValue family of CellModel.


  var synthResponse = holarchyCM.cmtObservableValue.synthesizeCellModel({
    // This is the human-readable label string used to refer to the specific ObservableValue family member CellModel.
    cellModelLabel: "RouterEventDescriptor",
    // This is the CellModelArtifactSpace that we want the IRUT ID's of the synthesized artifacts to be placed in.
    cmasScope: holarchyCM.cmasHolarchyCMPackage,
    // ObservableValue_T' (a CellModelTemplate class instance) defines specialization inputs used to customize the behavior its CellModel synthesize algorithm.
    specializationData: {
      valueTypeDescription: "A router event descriptor produced by HolisticHTML5Service_DOMLocation cell process.",
      valueTypeSpec: routerEventDescriptorSpec
    }
  });

  if (synthResponse.error) {
    throw new Error(synthResponse.error);
  }

  module.exports = synthResponse.result;
})();