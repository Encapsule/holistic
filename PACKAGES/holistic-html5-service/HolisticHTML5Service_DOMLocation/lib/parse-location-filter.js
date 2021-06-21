"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// holistic-html5-service/HolisticHTML5Service_DOMLocation/lib/parse-location-filter.js
var arccore = require("@encapsule/arccore");

var queryString = require("query-string");

var url = require("url");

var routerEventDescriptorSpec = require("./iospecs/router-event-descriptor-spec");

(function () {
  var factoryResponse = arccore.filter.create({
    operationID: "aK2x16jDRbmGyemCOeBDJQ",
    operationName: "HolisticHTML5Service_DOMLocation Parse",
    operationDescription: "Performs a parse of the window.location.href string into base URI and hashroute components.",
    inputFilterSpec: {
      ____types: "jsObject",
      // TODO: I don't think we need this or should support it any longer. It's very confusing.
      actor: {
        ____accept: "jsString",
        ____inValueSet: ["server", // indicates the the router event descriptor contains parse of unmodified server window.location.href
        "user", // indicates the router event event descriptor contains parse of window.location.href obtained from user-induced-event
        "app" // no idea
        ]
      },
      href: {
        ____accept: "jsString"
      }
    },
    outputFilterSpec: _objectSpread({}, routerEventDescriptorSpec),
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true; // Parse the current location.href.

        var hrefParse = url.parse(request_.href); // Assume we do not have a hashroute fragment in location.href string...

        var hashrouteParse = null; // ... but, if we actually do then parse it per holistic app platform-defined rules:

        if (hrefParse.hash) {
          /*
            Hashroute fragment string component of a URL (i.e. the string that begins w/#) is
            explicitly defined in HTTP 1.1 spec as an opaque UTF-8 string. This means that we
            can do with this string whatever we want. But, that's a lot of possibilities.
            And, in the interest of making life a little simpler to understand, we implement
            a set of parsing conventions for the hashroute fragment here that reuses and
            re-applies most of HTTP 1.1 spec parsing conventions for base URL to the hashroute
            fragment string.
          */
          var hashrouteParseRaw = url.parse(hrefParse.hash.slice(1)); // Drop the # character to make url.parse believe it's parsing a standard server URI pathname.

          hashrouteParse = {
            pathname: "#".concat(hashrouteParseRaw.pathname ? hashrouteParseRaw.pathname : ""),
            path: "#".concat(hashrouteParseRaw.path ? hashrouteParseRaw.path : ""),
            search: hashrouteParseRaw.search,
            query: hashrouteParseRaw.query
          };
        } // if (hrefParse.hash) -> parse the hashroute fragment


        response.result = {
          // router event descriptor object
          actor: request_.actor,
          hrefParse: hrefParse,
          hashrouteString: hrefParse.hash ? hrefParse.hash : null,
          hashrouteParse: hashrouteParse,
          hashrouteQueryParse: hashrouteParse ? queryString.parse(hashrouteParse.query) : null
        };
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result; // This is an arccore.filter instance.
})();