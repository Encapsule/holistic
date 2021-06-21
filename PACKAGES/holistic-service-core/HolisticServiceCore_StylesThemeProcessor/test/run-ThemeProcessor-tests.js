#!/usr/bin/env node

/*
  $ node --inspect-brk test-ThemeProcessor.js
*/
// Node.js intrinsic RTL packages.
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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