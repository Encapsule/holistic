"use strict";

// Exports here are import/require inputs to the CellProcess::constructor filter that is responsible
// for construction of the core Cell Process Manager CellModel using synthesized ObservableCellData
// spec + these reusable core operator and action plug-ins (i.e. these are declared as part of Cell
// Process Manager's CellModel. Or, you can think of it as a partial specification of the Cell
// Process Manager model; the app/service-independent parts only are specified and the rest is only
// knowable at CellProcessor construction time via analysis of the CellModel passed to the constructor.
module.exports = {
  actions: [require("./ControllerAction-cpm-initialize"), require("./ControllerAction-cpm-cell-plane-error"), require("./ControllerAction-cpm-process-create"), require("./ControllerAction-cpm-process-delete"), require("./ControllerAction-cpm-process-query"), // TODO: Disabled until I have time to think about which facets of the Cell Process Manager's state data we want to expose. And, to what ends.
  // Note: There's a trove of functionality for dealing with mapping OCD memory to various levels of abstraction that's entirely hidden from
  // developers currently (because it's difficult to use correctly given extreme level of abstraction). Some of these functions need to be
  // exposed. But, not until I have time to re-assess the design of CPM itself (which has some problems I would like to fix before building
  // another service kernel for HolisticNodeService). I do not want developers building "tricks" or derived patterns based on knowledge of
  // how CPM works internally so it's critical not to expose these details in any way that could be used by developers to make it difficult to
  // later change or evolve the implementation of CPM (or even OCD or OCP) w/out breaking derived service code.
  // require("./ControllerAction-cpm-query")
  require("./ControllerAction-cpm-action-request-delegate")],
  operators: [// Very basic low-level
  require("./TransitionOperator-cpm-cell-in-step"), require("./TransitionOperator-cpm-cell-group-in-step"), require("./TransitionOperator-cpm-operator-request-delegate"), // Monitor the state of ancestor and desdendant owned procecess/
  require("./TransitionOperator-cpm-ancestor-processes-active"), require("./TransitionOperator-cpm-ancestor-processes-all-in-step"), require("./TransitionOperator-cpm-ancestor-processes-any-in-step"), require("./TransitionOperator-cpm-child-processes-active"), require("./TransitionOperator-cpm-child-processes-all-in-step"), require("./TransitionOperator-cpm-child-processes-any-in-step"), require("./TransitionOperator-cpm-descendant-processes-active"), require("./TransitionOperator-cpm-descendant-processes-all-in-step"), require("./TransitionOperator-cpm-descendant-processes-any-in-step"), require("./TransitionOperator-cpm-parent-process-active"), require("./TransitionOperator-cpm-parent-process-in-step")],
  subcells: [require("../CellProcessProxy")]
};