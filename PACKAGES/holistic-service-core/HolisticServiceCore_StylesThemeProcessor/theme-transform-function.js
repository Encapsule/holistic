"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// theme-transform-function
var color = require("color"); // https://www.npmjs.com/package/color


var holisticThemeSettingsSpec = require("./iospecs/holistic-view-theme-settings-spec");

var holisticThemeObjectSpecs = require("./iospecs/holistic-view-theme-object-specs");

module.exports = function (themeSettings_) {
  var response = {
    error: null
  };
  var errors = [];
  var inBreakScope = false;

  while (!inBreakScope) {
    inBreakScope = true;
    var theme = {
      settings: themeSettings_,
      page: themeSettings_.page,
      panel: {
        navigation: _objectSpread({
          color: {}
        }, themeSettings_.panel),
        application: _objectSpread({
          color: {}
        }, themeSettings_.panel),
        notification: _objectSpread({
          color: {}
        }, themeSettings_.panel),
        tools: _objectSpread({
          color: {}
        }, themeSettings_.panel),
        help: _objectSpread({
          color: {}
        }, themeSettings_.panel),
        menu: _objectSpread({
          color: {}
        }, themeSettings_.panel)
      },
      // ~.panel
      window: {
        modal: {
          color: {},
          spacing: {},
          shape: {},
          shadow: ""
        },
        popup: {
          color: {},
          spacing: {},
          shape: {},
          shadow: ""
        },
        tooltip: {
          color: {},
          spacing: {},
          shape: {},
          shadow: ""
        },
        tool: {
          color: {},
          spacing: {},
          shape: {},
          shadow: ""
        },
        content: {
          color: {},
          spacing: {},
          shape: {},
          shadow: ""
        }
      },
      // ~.window
      control: {
        button: {
          standard: {},
          tool: {}
        },
        checkbox: {
          enabled: {},
          disabled: {}
        },
        radio: {
          enabled: {},
          disabled: {}
        },
        slider: {
          enabled: {},
          disabled: {}
        },
        formInput: {
          enabled: {},
          disabled: {}
        },
        dropDown: {
          enabled: {},
          disabled: {}
        },
        menuItem: {
          enabled: {},
          disabled: {}
        }
      },
      // ~.control
      typography: {
        content: {
          smallest: {},
          smaller: {},
          normal: {},
          larger: {},
          largest: {}
        },
        monospace: {
          smallest: {},
          smaller: {},
          normal: {},
          larger: {},
          largest: {}
        },
        header: {
          h1: {},
          h2: {},
          h3: {},
          h4: {},
          h5: {},
          h6: {}
        },
        title: {
          smallest: {},
          smaller: {},
          normal: {},
          larger: {},
          largest: {}
        },
        control: {
          smallest: {},
          smaller: {},
          normal: {},
          larger: {},
          largest: {}
        }
      }
    }; // theme

    response.result = theme;
    break;
  }

  if (errors.length) {
    response.error = errors.join(" ");
  }

  return response;
}; // bodyFunction