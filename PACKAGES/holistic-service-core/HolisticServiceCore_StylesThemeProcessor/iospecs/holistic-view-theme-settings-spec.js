"use strict";

var _regionShadowSettings;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var holisticThemeSpecs = require("./holistic-view-theme-object-specs");

var typographyBaseSettings = {
  ____types: "jsObject",
  fontFamily: {
    ____accept: "jsString"
  },
  fontStyle: {
    ____accept: "jsString"
  },
  fontWeight: {
    ____accept: "jsString"
  },
  sizes: {
    ____types: "jsObject",
    smallest: {
      ____accept: "jsString"
    },
    smaller: {
      ____accept: "jsString"
    },
    normal: {
      ____accept: "jsString"
    },
    larger: {
      ____accept: "jsString"
    },
    largest: {
      ____accept: "jsString"
    }
  }
};

var typographyHeadingSettings = _objectSpread(_objectSpread({}, typographyBaseSettings), {}, {
  sizes: {
    ____types: "jsObject",
    h1: {
      ____accept: "jsString"
    },
    h2: {
      ____accept: "jsString"
    },
    h3: {
      ____accept: "jsString"
    },
    h4: {
      ____accept: "jsString"
    },
    h5: {
      ____accept: "jsString"
    },
    h6: {
      ____accept: "jsString"
    }
  }
});

var regionSpacingSettingsSpec = {
  ____types: "jsObject",
  ____defaultValue: {},
  margin: {
    ____types: "jsObject",
    ____defaultValue: {},
    value: {
      ____accept: "jsNumber",
      ____defaultValue: 0
    },
    units: {
      ____accept: "jsString",
      ____inValueSet: ["px", "em", "pt"],
      ____defaultValue: "px"
    }
  },
  padding: {
    ____types: "jsObject",
    ____defaultValue: {},
    value: {
      ____accept: "jsNumber",
      ____defaultValue: 0
    },
    units: {
      ____accept: "jsString",
      ____inValueSet: ["px", "em", "pt"],
      ____defaultValue: "px"
    }
  }
};
var regionShapeSettingsSpec = {
  ____types: "jsObject",
  ____defaultValue: {},
  radius: {
    ____types: "jsObject",
    ____defaultValue: {},
    value: {
      ____accept: "jsNumber",
      ____defaultValue: 0
    },
    units: {
      ____accept: "jsString",
      ____inValueSet: ["px", "em", "pt"],
      ____defaultValue: "px"
    }
  },
  size: {
    ____types: "jsObject",
    ____defaultValue: {},
    value: {
      ____accept: "jsNumber",
      ____defaultValue: 0
    },
    units: {
      ____accept: "jsString",
      ____inValueSet: ["px", "em", "pt"],
      ____defaultValue: "px"
    }
  },
  style: {
    ____accept: "jsString",
    ____inValueSet: ["none", "solid", "dotted", "dashed"],
    ____defaultValue: "none"
  }
}; // regionShapeSettingsSpec

var regionShadowSettingsSpec = (_regionShadowSettings = {
  ____types: "jsObject",
  ____defaultValue: {}
}, _defineProperty(_regionShadowSettings, "____defaultValue", {}), _defineProperty(_regionShadowSettings, "enabled", {
  ____accept: "jsBoolean",
  ____defaultValue: false
}), _defineProperty(_regionShadowSettings, "hOffset", {
  ____types: "jsObject",
  ____defaultValue: {},
  value: {
    ____accept: "jsNumber",
    ____defaultValue: 0
  },
  units: {
    ____accept: "jsString",
    ____inValueSet: ["px", "em", "pt"],
    ____defaultValue: "px"
  }
}), _defineProperty(_regionShadowSettings, "vOffset", {
  ____types: "jsObject",
  ____defaultValue: {},
  value: {
    ____accept: "jsNumber",
    ____defaultValue: 0
  },
  units: {
    ____accept: "jsString",
    ____inValueSet: ["px", "em", "pt"],
    ____defaultValue: "px"
  }
}), _defineProperty(_regionShadowSettings, "blur", {
  ____types: "jsObject",
  ____defaultValue: {},
  value: {
    ____accept: "jsNumber",
    ____defaultValue: 0
  },
  units: {
    ____accept: "jsString",
    ____inValueSet: ["px", "em", "pt"],
    ____defaultValue: "px"
  }
}), _defineProperty(_regionShadowSettings, "spread", {
  ____types: "jsObject",
  ____defaultValue: {},
  value: {
    ____accept: "jsNumber",
    ____defaultValue: 0
  },
  units: {
    ____accept: "jsString",
    ____inValueSet: ["px", "em", "pt"],
    ____defaultValue: "px"
  }
}), _defineProperty(_regionShadowSettings, "xset", {
  ____accept: "jsString",
  ____inValueSet: ["outset", "inset"],
  ____defaultValue: "outset"
}), _regionShadowSettings); // regionShadowSettingsSoec

module.exports = {
  ____label: "Holistic App Theme Settings",
  ____description: "Settings are inputs used to derive the values in the Holistic App Theme Styles document (dynamically updated JSON).",
  ____types: "jsObject",
  ____defaultValue: {},
  color: {
    ____types: "jsObject",
    ____defaultValue: {},
    page: _objectSpread({
      ____types: "jsObject",
      ____defaultValue: {
        backgroundColor: "#FFFFFF",
        foregroundColor: "#000000"
      }
    }, holisticThemeSpecs.holisticAppThemeSpec.page.color),
    text: {
      ____types: "jsObject",
      ____defaultValue: {},
      content: {
        ____label: "Content Text Colors",
        ____description: "Settings to determine color style values to be applied to standard content text.",
        ____types: "jsObject",
        ____defaultValue: {},
        backgroundColor: {
          ____accept: "jsString",
          ____defaultValue: "#FFFFFF00"
        },
        foregroundColor: {
          ____accept: "jsString",
          ____defaultValue: "#000000FF"
        },
        link: {
          ____label: "Content Link Text Colors",
          ____description: "Settings to determine color style values to be applied to links embedded in standard content text.",
          ____types: "jsObject",
          ____defaultValue: {},
          application: {
            ____label: "Content App Link Text Colors",
            ____description: "Settings to determine color style values to be applied to application links (i.e. click events processed by either the client app or its origin server app).",
            ____types: "jsObject",
            ____defaultValue: {},
            backgroundColor: {
              ____accept: "jsString",
              ____defaultValue: "#FFFFFF00"
            },
            foregroundColor: {
              ____accept: "jsString",
              ____defaultValue: "#00CC00FF"
            }
          },
          site: {
            ____label: "Content Site Link Text Colors",
            ____description: "Settings to determine color style values to be applied to site links (i.e. click events that cause a browser HTTP request outside of the application's origin domain (i.e. external sites).",
            ____types: "jsObject",
            ____defaultValue: {},
            backgroundColor: {
              ____accept: "jsString",
              ____defaultValue: "#FFFFFF00"
            },
            foregroundColor: {
              ____accept: "jsString",
              ____defaultValue: "#00CC00FF"
            }
          },
          tooltip: {
            ____label: "Content Tooltip Link Text Colors",
            ____description: "Settings to determine color style values to be applied to tooltip links (i.e. click events that typically show a tooltip for help/context/options/metadata etc...).",
            ____types: "jsObject",
            ____defaultValue: {},
            backgroundColor: {
              ____accept: "jsString",
              ____defaultValue: "#FFFFFF00"
            },
            foregroundColor: {
              ____accept: "jsString",
              ____defaultValue: "#00CC00FF"
            }
          }
        }
      }
    }
  },
  // ~.color
  spacing: {
    ____types: "jsObject",
    ____defaultValue: {},
    page: _objectSpread({}, regionSpacingSettingsSpec),
    panel: {
      ____types: "jsObject",
      ____defaultValue: {},
      navigation: _objectSpread({}, regionSpacingSettingsSpec),
      application: _objectSpread({}, regionSpacingSettingsSpec),
      notification: _objectSpread({}, regionSpacingSettingsSpec),
      tools: _objectSpread({}, regionSpacingSettingsSpec),
      help: _objectSpread({}, regionSpacingSettingsSpec),
      menu: _objectSpread({}, regionSpacingSettingsSpec)
    },
    // ~.spacing.panel
    window: {
      ____types: "jsObject",
      ____defaultValue: {},
      modal: _objectSpread({}, regionSpacingSettingsSpec),
      popup: _objectSpread({}, regionSpacingSettingsSpec),
      tooltip: _objectSpread({}, regionSpacingSettingsSpec),
      tool: _objectSpread({}, regionSpacingSettingsSpec),
      content: _objectSpread({}, regionSpacingSettingsSpec)
    },
    // ~.spacing.window
    control: {
      ____types: "jsObject",
      ____defaultValue: {},
      button: {
        ____types: "jsObject",
        ____defaultValue: {},
        standard: {
          ____types: "jsObject",
          ____defaultValue: {}
        },
        tool: {
          ____types: "jsObject",
          ____defaultValue: {}
        }
      } // ~.spacing.control.button

    } // ~.spacing.control

  },
  // ~.spacing
  shape: {
    ____types: "jsObject",
    ____defaultValue: {},
    panel: {
      ____types: "jsObject",
      ____defaultValue: {},
      navigation: _objectSpread(_objectSpread({}, regionShapeSettingsSpec), {}, {
        ____defaultValue: {
          radius: {
            size: 0.33,
            units: "em"
          },
          size: {
            value: 1,
            units: "px"
          },
          style: "solid"
        }
      }),
      application: _objectSpread({}, regionShapeSettingsSpec),
      notification: _objectSpread({}, regionShapeSettingsSpec),
      tools: _objectSpread({}, regionShapeSettingsSpec),
      help: _objectSpread({}, regionShapeSettingsSpec),
      menu: _objectSpread({}, regionShapeSettingsSpec)
    },
    // ~.shape.panel
    window: {
      ____types: "jsObject",
      ____defaultValue: {},
      modal: _objectSpread({}, regionShapeSettingsSpec),
      popup: _objectSpread({}, regionShapeSettingsSpec),
      tooltip: _objectSpread({}, regionShapeSettingsSpec),
      tool: _objectSpread({}, regionShapeSettingsSpec),
      content: _objectSpread({}, regionShapeSettingsSpec)
    },
    // ~.shape.window
    control: {
      ____types: "jsObject",
      ____defaultValue: {}
    } // ~.shape.control

  },
  // ~.shape
  shadow: {
    ____types: "jsObject",
    ____defaultValue: {},
    panel: {
      ____types: "jsObject",
      ____defaultValue: {},
      navigation: _objectSpread({}, regionShadowSettingsSpec),
      application: _objectSpread({}, regionShadowSettingsSpec),
      notification: _objectSpread({}, regionShadowSettingsSpec),
      tools: _objectSpread({}, regionShadowSettingsSpec),
      help: _objectSpread({}, regionShadowSettingsSpec),
      menu: _objectSpread({}, regionShadowSettingsSpec)
    },
    // ~.shadow.panel
    window: {
      ____types: "jsObject",
      ____defaultValue: {},
      modal: _objectSpread({}, regionShadowSettingsSpec),
      popup: _objectSpread({}, regionShadowSettingsSpec),
      tooltip: _objectSpread({}, regionShadowSettingsSpec),
      tool: _objectSpread({}, regionShadowSettingsSpec),
      content: _objectSpread({}, regionShadowSettingsSpec)
    },
    // ~.shadow.window
    control: {
      ____types: "jsObject",
      ____defaultValue: {}
    } // ~.shadow.control

  },
  // ~.shadow
  typograph: {
    ____label: "Typography Style Settings",
    ____description: "Typography settings control the basic typeface and font style settings applied to a holistic app theme.",
    ____types: "jsObject",
    ____defaultValue: {
      content: {
        fontFamily: "Nunito",
        fontWeight: "normal",
        fontStyle: "none",
        sizes: {
          smallest: "8pt",
          smaller: "10pt",
          normal: "12pt",
          larger: "14pt",
          largest: "16pt"
        }
      },
      monospace: {
        fontFamily: "Courier",
        fontWeight: "normal",
        fontStyle: "none",
        sizes: {
          smallest: "8pt",
          smaller: "10pt",
          normal: "12pt",
          larger: "14pt",
          largest: "16pt"
        }
      },
      heading: {
        fontFamily: "Montserrat",
        fontWeight: "normal",
        fontStyle: "none",
        sizes: {
          h1: "24pt",
          h2: "20pt",
          h3: "16pt",
          h4: "14pt",
          h5: "12pt",
          h6: "10pt"
        }
      },
      title: {
        fontFamily: "Roboto",
        fontWeight: "normal",
        fontStyle: "none",
        sizes: {
          smallest: "12pt",
          smaller: "14pt",
          normal: "16pt",
          larger: "18pt",
          largest: "20pt"
        }
      },
      control: {
        fontFamily: "Play",
        fontWeight: "normal",
        fontStyle: "none",
        sizes: {
          smallest: "8pt",
          smaller: "9pt",
          normal: "10pt",
          larger: "12pt",
          largest: "14pt"
        }
      },
      menu: {
        fontFamily: "Play",
        fontWeight: "normal",
        fontStyle: "none",
        sizes: {
          smallest: "8pt",
          smaller: "9pt",
          normal: "10pt",
          larger: "12pt",
          largest: "14pt"
        }
      }
    },
    content: typographyBaseSettings,
    monospace: typographyBaseSettings,
    heading: typographyHeadingSettings,
    title: typographyBaseSettings,
    control: typographyBaseSettings,
    menu: typographyBaseSettings
  } // ~.typography

};