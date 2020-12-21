"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// @viewpath/viewpath5/SOURCES/SERVER/holism/integrations/get-user-identity-from-http-request.js
//
// This module exports a filter-style bodyFunction that used to create a filter that is called
// by @encapsule/holism to obtain a "user identity assertion descriptor" from the HTTP request.
// This function is synchronous because we are only interested in if the user claims to be
// someone who is logged into this application. If a claim is made we call it an "identity
// assertion" because the claim is not necessarily valid until verified.
var userIdentityCookieName = "vp5-user-session";

module.exports = function (request_) {
  console.log("..... " + this.operationID + "::" + this.operationName);
  var response = {
    error: null,
    result: undefined
  }; // If returned unmodified this defaults to anonymous user session (i.e. not authenticated).

  var errors = [];
  var inBreakScope = false;

  while (!inBreakScope) {
    inBreakScope = true;
    var headers = request_.request_descriptor.headers;

    if (!headers.cookie) {
      break;
    }

    var cookieSplit = headers.cookie.split("; ");
    var cookieMap = {};

    var _iterator = _createForOfIteratorHelper(cookieSplit),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var cookie = _step.value;
        var nameValueSplit = cookie.split("=");
        cookieMap[nameValueSplit[0]] = nameValueSplit[1];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (!cookieMap[userIdentityCookieName]) {
      break;
    }

    response.result = {
      userSessionId: cookieMap[userIdentityCookieName]
    };
    break;
  }

  if (errors.length) {
    response.error = errors.join(" ");
  }

  return response;
};