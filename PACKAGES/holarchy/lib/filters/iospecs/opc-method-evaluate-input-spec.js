"use strict";

var opcEvaluateRequestSpec = {
  ____label: "OPC Evaluate Request",
  ____description: "Implements the OPC's core evaluation algorithm providing strict runtime control over this synchronous function's request and response input and output data.",
  ____types: "jsObject",
  opcRef: {
    ____label: "OPC Reference",
    ____description: "A reference to the calling ObervableControllerProcess class instance. (Set by OPC.act method that delegates to the filter).",
    ____accept: "jsObject"
  }
};
module.exports = opcEvaluateRequestSpec;