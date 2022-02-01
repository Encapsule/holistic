"use strict";

// Exports a "vector set" that is defined as
// an array of arrays of holodeck test vectors.
module.exports = [require("./vector-set-cp-test-harness-validation-tests"), // Low-level ObservableControllerData ES6 class tests.
require("./vector-set-ocd-base-tests"), // Low-level ObservableProcessController ES6 class tests.
require("./vector-set-opc-constructor"), require("./vector-set-opc-constructor-bindings"), require("./vector-set-opc-method-act"), require("./vector-set-opc-evaluate-p1-operators"), require("./vector-set-opc-evaluate-p2-exit-actions"), require("./vector-set-opc-evaluate-p3-enter-actions"), // Low-level AbstractProcessModel ES6 class tests.
require("./vector-set-apm-constructor"), // Low-level ControllerAction ES6 class tests.
require("./vector-set-act-constructor"), // Low-level TransitionOperator ES6 class tests.
require("./vector-set-top-constructor"), // Low-level CellModel ES6 class tests.
require("./vector-set-cm-constructor"), // Low-level CellProcessor ES6 class tests.
// ... includes CPM owned process create / delete / query action tests
require("./vector-set-cp-constructor"), // ... includes test matrix (or part of it) for CPM owned process operators (ancesors, parent, children, descendants)
require("./vector-set-cpm-process-operators"), require("./vector-set-cpm-shared-processes"), require("./vector-set-cpm-proxy-tests"), require("./vector-set-cmas-base-constructor"), require("./vector-set-cmas-base-a-vs-b-invariants"), require("./vector-set-cpm-proxy-tests/")];