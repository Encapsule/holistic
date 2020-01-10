"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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