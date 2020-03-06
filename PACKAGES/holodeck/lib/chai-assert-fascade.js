"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// chai-assert-fascade.js
//
var chai = require("chai");

var assert = chai.assert; // TODO: Follow-up with chai team and see if this is really anything more than an unsafe hack.

var assertFascade = _objectSpread({}, assert); // copy the original


var assertFuncs = Object.keys(assert);

var _loop = function _loop() {
  var funcName = assertFuncs.shift(); // Replace all functions (seemingly unbound) on the assert namesapce descriptor with fascades.

  if (Object.prototype.toString.call(assert[funcName]) === "[object Function]") {
    var originalFunction = assert[funcName];

    assertFascade[funcName] = function () {
      var args = [].slice.call(arguments, 0);
      var response = {
        error: null,
        result: {
          assert: {
            name: funcName,
            arg: args,
            exception: null
          }
        }
      };

      try {
        originalFunction(args);
      } catch (exception_) {
        response.error = exception_.toString();
        response.result.assert.exception = exception_;
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