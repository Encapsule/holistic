"use strict";

module.exports = {
  ____label: "OPC Actor Stack Entry",
  ____types: "jsObject",
  actorName: {
    // e.g. "App Config Agent", "UX Event Responder", "Network Responder", "Web Worker Responder"...
    ____label: "Actor Name",
    ____description: "A short and descriptive moniker for the function (actor) calling the ObservableProcessController.act method. Used in diagnostics, tests, and logs.",
    ____accept: "jsString"
  },
  actorTaskDescription: {
    ____label: "Actor Task Description",
    ____description: "A short description of what exactly this actor is attempting to do by calling this specific ControllerAction.",
    ____accept: "jsString",
    ____defaultValue: "<bad actor specifies no task description>"
  },
  actorTaskContext: {
    ____label: "Actor Task Context",
    ____description: "An optional opaque context descriptor object that an actor may specify. Typically used for information that's helpful for debugging. It does not get used to affect changes to runtime behavior.",
    ____accept: ["jsUndefined", "jsObject"]
  }
};