"use strict";

var opcActorStackEntrySpec = require("./opc-actor-stack-entry-spec");

module.exports = {
  ____label: "OPC.act Method Request",
  ____description: "Defines the request format accepted by ObservableProcessController.act method.",
  ____types: "jsObject",
  // Requests of this type are passed to the opc-method-act-filter.js implementation by OPC.act method implementation.
  // It's the OPC.act method implementation that adds the actual opcRef value (this inside the method implementation).
  // A caller of OPC act doesn't specify this.
  opcRef: {
    ____label: "OPC Reference",
    ____description: "A reference to the ObservableProcessController class instance to act on.",
    ____accept: "jsObject"
  },
  // The caller of OPC.act method is an "actor" attempting to perform some or another task...
  actorName: opcActorStackEntrySpec.actorName,
  actorTaskDescription: opcActorStackEntrySpec.actorTaskDescription,
  actionRequest: {
    ____label: "Action Request",
    ____description: "An actor-specified request descriptor object that is dynamically routed to an appropriate ControllerAction plug-in filter by the ObservableProcessController instance.",
    ____accept: "jsObject" // All actionRequests are action-specific descriptor objects declared by the ControllerAction author.

  },
  // 2022.01.18 -- open question I cannot answer off the top of my head:
  // Typically, if specified apmBindingPath is literally an OCD path defined by CellProcessManager (CPM)
  // for explicit/implicit cell process activations. Question is: Does it have to be? I think so...
  // We probably need to update the naming conventions here; it's bloody difficult to follow...
  // 2022.01.21 -- I have updated the implementation of opc-method-act-filter.js to allow it to delegate to
  // a ControllerAction defined by some or another CellProcessManager implementation to resolve activatable
  // cell process coordinates into an apmBindinPath (actually an OCD path). This leaves the questions above
  // unresolved for now. At this point I think it makes sense to rename apmBindingPath to something more
  // descriptive. And, it likely makes sense to extend the changes just made to allow any valid cell process
  // path (i.e. any OCD namespace that's bound to am APM regardless of if it can be explicitly activated
  // via CPM) to be specified using an extension of activatable cell process coordinates
  // (e.g. apmID, instanceName, relative #. path)?
  apmBindingPath: {
    ____label: "APM Binding Path",
    ____description: "Optional fully-qualified dot-delimited path to an APM instance binding namespace in the OCD. Or, a process coordinate descriptor object. Defaults to ~ if not specified.",
    ____types: ["jsString", "jsObject"],
    ____defaultValue: "~",
    // If apmBindingPath is not specified, then the action is bound to the anonymous root namespace of OCD and must resolve its own paths.
    apmID: {
      ____accept: "jsString"
    },
    instanceName: {
      ____accept: "jsString",
      ____defaultValue: "singleton"
    }
  }
};