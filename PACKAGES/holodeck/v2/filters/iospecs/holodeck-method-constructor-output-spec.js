"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// holodeck-method-constructor-output-spec.js
var inputFilterSpec = _objectSpread({}, require("./holodeck-method-constructor-input-spec"));

delete inputFilterSpec.holodeckHarnesses;
module.exports = _objectSpread(_objectSpread({}, inputFilterSpec), {}, {
  ____label: "Holodeck Constructor Result",
  harnessDiscriminator: {
    ____label: "Holodeck Harness Discriminator",
    ____description: "A reference to a Holodeck environment's harness discriminator filter (used to route a harness request to a specific harness plug-in filter for evaluation.",
    ____types: "jsObject",
    filterDescriptor: {
      ____accept: "jsObject"
    },
    request: {
      ____accept: "jsFunction"
    },
    supportedFilters: {
      ____types: "jsArray",
      filterName: {
        ____accept: "jsString"
      }
    }
  },
  harnessFilters: {
    ____label: "Holodeck Harness Filters",
    ____description: "A sorted array of HolodeckHarness filters registered for use in this Holodeck instance. This includes both holodeck-intrinsic and developer-registered harnesses.",
    ____types: "jsArray",
    harnessFilter: {
      ____label: "Holodeck Harness Filter",
      ____description: "A filter object obtained from a registered HolodeckHarness instance.",
      ____types: "jsObject",
      filterDescriptor: {
        ____accept: "jsObject"
      },
      request: {
        ____accept: "jsFunction"
      }
    }
  }
});