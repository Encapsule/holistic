"use strict";

// cac-method-constructor-input-spec.js
module.exports = {
  ____label: "Filter Factory Request",
  ____types: "jsObject",
  id: {
    ____label: "Controller Action ID",
    ____description: "A unique version-independent IRUT used to identify this specific ControllerAction definition.",
    ____accept: "jsString"
  },
  name: {
    ____label: "Controller Action Name",
    ____description: "A short but descriptive moniker for this ControllerAction definition.",
    ____accept: "jsString"
  },
  description: {
    ____label: "Controller Action Decrtipion",
    ____description: "A terse description of the functionality implemented by this ControllerAction.",
    ____accept: "jsString"
  },
  actionRequestSpec: {
    ____label: "Controller Action Request Spec",
    ____description: "A developer-defined filter spec that defines the request message signature of the action.",
    ____accept: "jsObject"
  },
  actionResultSpec: {
    ____label: "Controller Action Result Spec",
    ____description: "A developer-defined filter spec that defines the response.result signature of the generated controller action plug-in filter.",
    ____accept: "jsObject",
    ____defaultValue: {
      ____label: "No Result (Default)",
      ____description: "If you need your ControllerAction to return a response.result, declare actionResultSpec in your ControllerAction declaration.",
      ____accept: "jsUndefined" // i.e. no response.result value is allowed whatsoever by default

    }
  },
  bodyFunction: {
    ____label: "Action Plug-in Body Function",
    ____description: "A developer-defined filter bodyFunction implementation that implements the developer-defined controller action's runtime semantics.",
    ____accept: "jsFunction"
  }
};