"use strict";

// app-service-core.js
(function () {
  var _require = require("@encapsule/holistic-service-core"),
      HolisticServiceCore = _require.HolisticServiceCore;

  var appServiceCoreSpecializations = require("./app-service-core-specializations");

  var appServiceCore = new HolisticServiceCore(appServiceCoreSpecializations);

  if (!appServiceCore.isValid()) {
    throw new Error(appServiceCore.toJSON());
  }

  module.exports = appServiceCore;
})();