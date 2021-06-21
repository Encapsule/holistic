"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// chai-assert-fascade.js
//
var chai = require("chai"); // It will take additional effort to determine how to deal and if it's worth dealing
// with chai's expect/should features that present a much more complex integration
// than their assert API's due to function chaining syntax and some or another protocol
// that has to be reverse engineered from sources it looks like. SO, for now we'll just
// leverage chai's assert functions slightly modified so that they do not throw ErrorAssertions
// that are inconvenient for our style of testing w/holodeck.


var assert = chai.assert; // https://www.chaijs.com/api/assert/

var assertFascade = _objectSpread({}, assert); // copy the original


var assertFuncs = Object.keys(assert);

var _loop = function _loop() {
  var funcName = assertFuncs.shift(); // Replace all functions (seemingly unbound) on the assert namespace descriptor with fascades.

  if (Object.prototype.toString.call(assert[funcName]) === "[object Function]") {
    var originalFunction = assert[funcName];

    assertFascade[funcName] = function () {
      var args = [].slice.call(arguments, 0);
      var didAssert = false;
      var response = {
        funcName: funcName,
        args: args,
        assertion: null
      }; // <--- THIS IS WHAT YOU GET BACK from the fascade wrapper around each chai.assert.X function _instead_ of an exception ErrorAssertion

      try {
        // It's an assertion library ;-) It throws ErrorAssertions to indicate the assertion is not met.
        originalFunction.apply(void 0, _toConsumableArray(args));
      } catch (exception_) {
        response.assertion = exception_.message; // Is an ErrorAssertion object
      }

      return response;
    };
  }
};

while (assertFuncs.length) {
  _loop();
}

;
module.exports = assertFascade;