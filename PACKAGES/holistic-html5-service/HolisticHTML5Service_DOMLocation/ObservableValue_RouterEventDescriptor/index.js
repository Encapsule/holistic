"use strict";

(function () {
  var arccore = require("@encapsule/arccore");

  var holarchyCM = require("@encapsule/holarchy-cm");

  var routerEventDescriptorSpec = require("../lib/iospecs/router-event-descriptor-spec");

  var synthResponse = holarchyCM.cmtObservableValue.synthesizeCellModel({
    cellModelLabel: "RouterEventDescriptor",
    synthesizeRequest: {
      valueTypeDescription: "A router event descriptor produced by HolisticHTML5Service_DOMLocation cell process.",
      valueTypeSpec: routerEventDescriptorSpec
    }
  });

  if (synthResponse.error) {
    throw new Error(synthResponse.error);
  }

  module.exports = synthResponse.result;
})();