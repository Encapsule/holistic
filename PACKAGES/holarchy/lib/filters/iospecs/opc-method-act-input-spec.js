"use strict";

module.exports = {
  ____label: "OPC.act Method Request",
  ____description: "Defines the request format accepted by ObservableProcessController.act method.",
  ____types: "jsObject",
  // "Actors" are functions that call ObservableProcessController.act to affect some "action".
  actorName: {
    // e.g. "App Config Agent", "UX Event Responder", "Network Responder", "Web Worker Responder"...
    ____label: "Actor Name",
    ____description: "A short and descriptive moniker for the function (actor) calling the ObservableProcessController.act method. Used in diagnostics, tests, and logs.",
    ____accept: "jsString"
  },
  actionDescription: {
    ____label: "Action Description",
    ____description: "Actors may provide an optional explanation of why they're calling the ObservbaleProcessController.act method. Used in diagnostics, tests, and logs.",
    ____accept: "jsString",
    ____defaultValue: "No actor description provided."
  },
  actionRequest: {
    ____label: "Action Request",
    ____description: "Actors specify a request descriptor object that contains information used to route the request to an appropriate ControllerAction plug-in filter.",
    ____accept: "jsObject"
  },
  opmBindingPath: {
    ____label: "OPM Binding Path",
    ____description: "Optional fully-qualified dot-delimited path to an OPM instance binding namespace in the OCD. Defaults to '~' (default for external controller action plug-ins.",
    ____accept: "jsString",
    ____defaultValue: "~"
  }
};