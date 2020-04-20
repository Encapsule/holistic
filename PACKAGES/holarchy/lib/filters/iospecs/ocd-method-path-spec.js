"use strict";

// ocd-method-path-spec.js
module.exports = {
  ____label: "OCD Path",
  ____description: "Either a fully-qualified OCD dot-delimited path string. Or, equivalent OCD relative path resolve request object.",
  ____types: ["jsString", // fully-qualified, dot-delimited OCD path beginning in ~
  "jsObject" // OCD relative path resolve request object
  ],
  apmBindingPath: {
    ____label: "APM Binding Path",
    ____description: "The fully-qualified OCD path associated with an APM instance in the OCD.",
    ____accept: "jsString"
  },
  dataPath: {
    ____label: "Resolve Path",
    ____description: "A fully-qualified OCD path. Or, a relative path to be converted by this filter using apmBindingPath.",
    ____accept: "jsString"
  }
};