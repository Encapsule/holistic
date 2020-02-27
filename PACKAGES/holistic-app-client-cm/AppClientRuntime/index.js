"use strict";

// HolisticAppClientRuntime.js
var holarchy = require("@encapsule/holarchy");

var holarchyCML = require("@encapsule/holarchy-cm");

module.exports = new holarchy.CellModel({
  id: "ENENGxq1TkCa6Sk9YXaLlw",
  name: "Holistic App Client Runtime",
  description: "Holistic client application core runtime.",
  apm: require("./AbstractProcessModel-app-client-runtime"),
  actions: [require("./ControllerAction-app-client-runtime-hook-events"), require("./ControllerAction-app-client-runtime-notify-event")],
  subcells: [holarchyCML.cml]
});