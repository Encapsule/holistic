#!/usr/bin/env node

/*
  $ node --inspect-brk test-ThemeProcessor.js
*/
// Node.js intrinsic RTL packages.
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var path = require("path");

var process = require("process"); // Holistic RTL packages.


var holodeck = require("@encapsule/holodeck");

var holodeckAssets = require("@encapsule/holodeck-assets");

var factoryResponse = holodeck.runnerFilter.request({
  id: "zo1Zq8MhSC6llzYIb12U_A",
  name: "ThemeProcessor Holodeck v1 Environment Runner",
  description: "Throw-away v1 holodeck environment for experimenting w/ThemeProcessor CellModel.",
  logsRootDir: path.resolve(path.join(__dirname, "logs")),
  testHarnessFilters: _toConsumableArray(holodeckAssets.holarchy.harnesses),
  testRequestSets: [require("./ThemeProcessor-vector-set")]
});

if (factoryResponse.error) {
  console.error(factoryResponse.error);
  process.exit(1); // And, we're out (process exit status !== 0 is conventionally used to indicate process exit with error).
}