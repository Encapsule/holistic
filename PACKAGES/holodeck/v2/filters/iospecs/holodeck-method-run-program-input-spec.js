"use strict";

// holodeck-method-run-program-input-spec.js
module.exports = {
  ____label: "Holodeck::runProgram Request",
  ____types: "jsObject",
  // This reference is set by the calling Holodeck class instance overwriting any value specified by the caller of Holodeck::runProgram.
  HolodeckInstance: {
    ____label: "Holodeck Instance",
    ____description: "A reference to the calling Holodeck class instance's 'this'.",
    ____opaque: true
  },
  programRequest: {
    ____label: "Holodeck Program Request",
    ____description: "This is a reference to the programRequest value passed to Holodeck::runProgram.",
    ____opaque: true // this is parsed inside the run filter's bodyFunction

  }
};