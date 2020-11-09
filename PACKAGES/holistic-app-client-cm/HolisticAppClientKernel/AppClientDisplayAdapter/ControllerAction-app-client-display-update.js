"use strict";

// ControllerAction-app-client-display-update.js
var holarchy = require("@encapsule/holarchy");

var controllerAction = new holarchy.ControllerAction({
  id: "RlNHSKNBT32xejFqjsiZyg",
  name: "Holistic App Client Display Adapter: Update Display Layout",
  description: "Performs a programmatic re-rendering of the display adapter's DIV target using d2r2 <ComponentRouter/>."
});

if (!controllerAction.isValid()) {
  throw new Error(controllerAction.toJSON());
}

module.exports = controllerAction;