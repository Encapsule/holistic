"use strict";

// Exports here are import/require inputs to the CellProcess::constructor filter that is responsible
// for construction of the core Cell Process Manager CellModel using synthesized ObservableCellData
// spec + these reusable core operator and action plug-ins (i.e. these are declared as part of Cell
// Process Manager's CellModel. Or, you can think of it as a partial specification of the Cell
// Process Manager model; the app/service-independent parts only are specified and the rest is only
// knowable at CellProcessor construction time via analysis of the CellModel passed to the constructor.
module.exports = {
  actions: [require("./ControllerAction-cpm-initialize"), require("./ControllerAction-cpm-process-close"), require("./ControllerAction-cpm-process-create"), require("./ControllerAction-cpm-process-delete"), require("./ControllerAction-cpm-process-open"), require("./ControllerAction-cpm-process-query") // require("./ControllerAction-cpm-query") // TODO: Disable this action until it's needed and restabilize the tests (on a clean branch).
  ],
  operators: [require("./TransitionOperator-cpm-ancestor-processes-active"), // STAGE 1 COMPLETE
  require("./TransitionOperator-cpm-ancestor-processes-all-in-step"), // STAGE 1 COMPLETE
  require("./TransitionOperator-cpm-ancestor-processes-any-in-step"), // STAGE 1 COMPLETE
  require("./TransitionOperator-cpm-child-processes-active"), // STAGE 1 COMPLETE
  require("./TransitionOperator-cpm-child-processes-all-in-step"), // STAGE 1 COMPLETE
  require("./TransitionOperator-cpm-child-processes-any-in-step"), // STAGE 1 COMPLETE
  require("./TransitionOperator-cpm-descendant-processes-active"), // STAGE 1 COMPLETE
  require("./TransitionOperator-cpm-descendant-processes-all-in-step"), // STAGE 1 COMPLETE
  require("./TransitionOperator-cpm-descendant-processes-any-in-step"), // STAGE 1 COMPLETE
  require("./TransitionOperator-cpm-parent-process-active"), // STAGE 1 COMPLETE
  require("./TransitionOperator-cpm-parent-process-in-step") // STAGE 1 COMPLETE
  ],
  subcells: [require("../CellProcessProxy")]
};