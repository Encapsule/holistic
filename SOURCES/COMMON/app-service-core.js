"use strict";

// app-service-core.js
// Exports a HolisticServiceCore class instance using the constructor request object
// that is exported from the ./app-service-core-specializations.js module.
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