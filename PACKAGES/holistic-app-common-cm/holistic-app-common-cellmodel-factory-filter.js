"use strict";

// holistic-app-common-cellmodel-factory-filter.js
var arccore = require("@encapsule/arccore");

var holarchy = require("@encapsule/holarchy"); // We use an anonymous function wrapper here to create a private closure space to work in while we're synthesizing the module.exports value.


(function () {
  // Here we explicitly declare the factory filter's declaration as a const object.
  // And, we do this because it allows us to know deterministically that this value
  // will be a reference to filterDeclaration within the scope of the declaration.
  var filterDeclaration = {
    operationID: "ZKu2zOu_SFCvA8q0VMrQWw",
    operationName: "Holistic App Common CellModel Factory",
    operationDescription: "A filter that manufactures a CellModel that encapsulates common platform behaviors shared by both the derived app server and derived app client services.",
    inputFilterSpec: require("./lib/filters/iospecs/holistic-app-common-cellmodel-factory-input-spec"),
    outputFilterSpec: {
      ____label: "Holistic App Common CellModel",
      ____accept: "jsObject"
    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    } // bodyFunction

  };
  var factoryResponse = arccore.filter.create(filterDeclaration);

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();