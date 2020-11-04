"use strict";

module.exports = {
  aspects: {
    opcProcessStateRootOverlaySpec: {
      // ____label: <generated dynamically>
      ____types: "jsObject",
      ____defaultValue: {}
    },
    opcProcessModelBindingRootOverlaySpec: {
      // ____label: <generated dynamically>
      // ____description: <generated dynamically>
      ____types: "jsObject",
      ____defaultValue: {},
      __apmiStep: {
        // ____label: <generated dynamically>
        // ____description: <generated dynamically>
        ____accept: "jsString",
        ____defaultValue: "uninitialized" // ____inValueSet: [ <dynamically generated from APM> ] // TODO: Is this really true? I think I didn't do this yet?

      },
      __apmiEvalError: {
        ____label: "Abstract Process Model Evaluation Error",
        ____description: "A possible response.error returned by an action or operator called by OPC._evaluate while it was last evaluating this cell's APM process step rules. OPC._evaluate will set this value as a note to itself that it should not further attempt to evaluate this cell.",
        ____accept: ["jsUndefined", "jsString"]
      }
    }
  }
};