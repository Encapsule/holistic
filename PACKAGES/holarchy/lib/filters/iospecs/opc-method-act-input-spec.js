"use strict";

var opcActorStackEntrySpec = require("./opc-actor-stack-entry-spec");

module.exports = {
  ____label: "OPC.act Method Request",
  ____description: "Defines the request format accepted by ObservableProcessController.act method.",
  ____types: "jsObject",
  // "Actors" are functions that call ObservableProcessController.act to affect some "action".
  actorName: opcActorStackEntrySpec.actorName,
  actorTaskDescription: opcActorStackEntrySpec.actorTaskDescription,
  actionRequest: {
    ____label: "Action Request",
    ____description: "Actors specify a request descriptor object that contains information used to route the request to an appropriate ControllerAction plug-in filter.",
    ____accept: "jsObject" // All actionRequests are action-specific descriptor objects.

  },
  apmBindingPath: {
    ____label: "APM Binding Path",
    ____description: "Optional fully-qualified dot-delimited path to an APM instance binding namespace in the OCD. Defaults to '~' (default for external controller action plug-ins.",
    ____accept: "jsString",
    ____defaultValue: "~" // If apmBindingPath is not specified, then the action is bound to the anonymous root namespace of OCD and must resolve its own paths.

  }
};