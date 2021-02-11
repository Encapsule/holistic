"use strict";

// Holon-method-constructor-filter.js
(function () {
  var arccore = require("@encapsule/arccore");

  var factoryResponse = arccore.filter.create({});

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();