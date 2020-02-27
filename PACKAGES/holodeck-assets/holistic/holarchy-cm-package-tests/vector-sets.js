"use strict";

// Exports a "vector set" (an array of arrays of holodeck vectors).
module.exports = [// Frame latch OPM is used to create a value mailbox that decouples
// the writer of the mailbox from the knowledge of how the value
// written to the mailbox is consumed and for what purposes.
//
// Other OPM's may observe a Frame Latch OPMI by its fully-qualified
// OCD path (or OPMI-relative path) using the transition operator
// @encapsule/holarchy-cm TransitionOperator-opm-at-step.js.
// to determine when it has reached its "updated" step and trigger
// whatever action(s) are required.
//
// Broadly, entire reactive systems can be viewed as chains
// of OPM that use Frame Latches to define their input value(s)
// and/or output value(s) such that they can be observed
// (and consequently processed) by other OPMI's.
require("./vector-set-frame-latch"), require("./vector-set-cml")];