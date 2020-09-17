"use strict";

// cppLib/index.js
module.exports = {
  collectGarbage: require("./cpp-garbage-collector"),
  getStatus: require("./cpp-get-status-filter"),
  removeOwnedProcesses: require("./cpp-remove-owned-processes"),
  proxyActionOperatorRequest: require("./cpp-proxy-action-operator-request")
};