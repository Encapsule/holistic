"use strict";

module.exports = {
  ____label: "OPC.act Method Result",
  ____description: "Defines the response.result format returned by ObservableProcessController.act method.",
  ____types: "jsObject",
  actionResult: {
    ____label: "Action Result",
    ____description: "A result filtered through ControllerAction actionRequestSpec returned by the ControllerAction's bodyFunction.",
    ____opaque: true // The exact format of actionResult is determined by the specific ControllerAction that processed the actionRequest message.

  },
  lastEvaluation: {
    ____label: "Last Evaluation",
    ____description: "A structure that provides detailed information about the last evaluation (re-evaluation typically) of the cellular process system hosted by an OPC instance.",
    ____accept: ["jsUndefined", // Only external actors trigger evaluation. Internal actors (e.g. OPC evaluate itself) do not and therefor do not return evaluation summary information.
    "jsObject" // When a external actor calls OPC.act then after a ControllerAction is dispatched, then OPC._evaluate is called and this is that method filter's output.
    ]
  }
};