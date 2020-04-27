"use strict";

// test-settins-spec.js
var arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
  operationID: "demo",
  inputFilterSpec: require("./iospecs/holistic-view-theme-settings-spec")
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

var filter = factoryResponse.result;
var filterResponse = filter.request();
console.log(JSON.stringify(filterResponse, undefined, 4));