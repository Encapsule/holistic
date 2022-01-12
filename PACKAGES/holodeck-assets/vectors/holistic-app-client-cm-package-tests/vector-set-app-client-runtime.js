"use strict";

// vector-set-app-client-runtime.js
var clientCM = require("@encapsule/holistic-app-client-cm");

var cellModelResponse = clientCM.cml.getArtifact({
  id: "JatYSE8JQj6GxT8AOsbssQ"
  /*Holistic App Client Kernel*/
  ,
  type: "CM"
});

if (cellModelResponse.error) {
  throw new Error(cellModelResponse.error);
}

var HolisticAppClientKernel = cellModelResponse.result;
module.exports = [{
  id: "sThxzN9-QuKCgErSNYhcQQ",
  name: "Holistic App Client Kernel CellModel Test",
  description: "Instantiate the Holistic App Client Runtime CellModel through the CellModel test harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: HolisticAppClientKernel
        }
      }
    }
  }
}];