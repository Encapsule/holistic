"use strict";

// cell-process-query-request-filterby-spec.js
module.exports = {
  ____label: "Optional Filter-By APM Binding",
  ____description: "An optional APM ID or array of APM ID's that must be matched in query response result.",
  ____types: ["jsUndefined", "jsObject"],
  apmIDs: {
    ____types: ["jsString", "jsArray"],
    apmID: {
      ____accept: "jsString"
    }
  }
};