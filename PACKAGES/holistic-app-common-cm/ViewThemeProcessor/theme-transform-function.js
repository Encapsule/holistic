"use strict";

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
      page: themeSettings_.page,
      panel: {
        navigation: {
          color: {},
          spacing: {},
          shape: {},
          shadow: ""
        },
        application: {
          color: {},
          spacing: {},
          shape: {},
          shadow: ""
        },
        notification: {
          color: {},
          spacing: {},
          shape: {},
          shadow: ""
        },
        tools: {
          color: {},
          spacing: {},
          shape: {},
          shadow: ""
        },
        help: {
          color: {},
          spacing: {},
          shape: {},
          shadow: ""
        },
        menu: {
          color: {},
          spacing: {},
          shape: {},
          shadow: ""
        }
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