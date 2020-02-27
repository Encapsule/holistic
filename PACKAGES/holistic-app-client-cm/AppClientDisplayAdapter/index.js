"use strict";

var holarchy = require("@encapsule/holarchy");

var holarchyCM = require("@encapsule/holarchy-cm");

module.exports = new holarchy.CellModel({
  id: "UX7JquBhSZO0QyEk7u9-sw",
  name: "Holistic App Client Display Adapter",
  description: "Manages the DOM display via @encapsule/d2r2 and React.",
  apm: require("./AbstractProcessModel-app-client-display-adapter"),
  actions: [require("./ControllerAction-react-render-client-view")],
  subcells: [holarchyCM.cml]
});