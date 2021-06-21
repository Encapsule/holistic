"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//   Regions are rectangular display elements (e.g. a DIV's) styled programmatically (i.e. we set CSS attributes on a DOM element) when the display element is rendered.
var regionStylesSpec = {
  ____label: "Region Styles",
  ____types: "jsObject",
  color: {
    ____types: "jsObject",
    backgroundColor: {
      ____label: "Background Color",
      ____accept: "jsString"
    },
    foregroundColor: {
      ____label: "Foreground Color",
      ____description: "Used to set the color text content.",
      ____accept: "jsString"
    }
  },
  spacing: {
    ____types: "jsObject",
    margin: {
      ____accept: "jsString"
    },
    padding: {
      ____accept: "jsString"
    }
  },
  shape: {
    ____types: "jsObject",
    border: {
      ____accept: "jsString"
    },
    borderRadius: {
      ____accept: "jsString"
    }
  },
  shadow: {
    ____accept: "jsString"
  }
}; // Control region styles define a single region within the control's display element tree.

var controlRegionStylesSpec = {
  ____label: "Control Region Styles",
  ____types: "jsObject",
  // We do it this way in anticipation of needing to extend controlRegionStylesSpec w/additional style properties beyond those defined in the regionStylesSpec.
  color: _objectSpread({}, regionStylesSpec.color),
  spacing: _objectSpread({}, regionStylesSpec.spacing),
  shape: _objectSpread({}, regionStylesSpec.shape),
  shadow: _objectSpread({}, regionStylesSpec.shadow)
};
var controlBoxStylesSpec = {
  ____label: "Control Box Styles",
  ____types: "jsObject",
  inner: controlRegionStylesSpec,
  outer: controlRegionStylesSpec
};
/*
  ENABLE   FOCUS     SELECT     HOVER
  disabled X         X          X
  enabled  unfocused unselected nohover
  enabled  unfocused unselected hover
  enabled  unfocused selected   nohover
  enabled  unfocused selected   hover
  enabled  focused   unselected nohover
  enabled  focused   unselected hover
  enabled  focused   selected   nohover
  enabled  focused   selected   hover

  2^3 + 1 = 9 unique controlBoxStylesSpec defined for a generic control

*/

var controlStylesSpec = {
  ____types: "jsObject",
  disabled: controlBoxStylesSpec,
  enabled: {
    ____types: "jsObject",
    unfocused: {
      ____types: "jsObject",
      unselected: {
        ____types: "jsObject",
        nohover: controlBoxStylesSpec,
        hover: controlBoxStylesSpec
      },
      selected: {
        ____types: "jsObject",
        nohover: controlBoxStylesSpec,
        hover: controlBoxStylesSpec
      }
    },
    focused: {
      ____types: "jsObject",
      unselected: {
        ____types: "jsObject",
        nohover: controlBoxStylesSpec,
        hover: controlBoxStylesSpec
      },
      selected: {
        ____types: "jsObject",
        nohover: controlBoxStylesSpec,
        hover: controlBoxStylesSpec
      }
    }
  } // ~.enabled

};
/*
  ENABLE   BUTTON   CLICK     FOCUS    SELECT    HOVER
  disabled X        X         X        X         X
  enabled  open     noclick
  enabled  open     click
  enabled  closed   noclick
  enabled  closed   click

  2^5 + 1 = 33 unique controlBoxStylesSpec defined for a button control

*/

var controlButtonStylesSpec = {
  ____types: "jsObject",
  disabled: controlBoxStylesSpec,
  enabled: {
    ____types: "jsObject",
    open: {
      ____types: "jsObject",
      noclick: controlStylesSpec.enabled,
      click: controlStylesSpec.enabled
    },
    closed: {
      ____types: "jsObject",
      noclick: controlStylesSpec.enabled,
      click: controlStylesSpec.enabled
    }
  } // ~.enabled

};
var holisticAppThemeSpec = {
  ____label: "Holistic App Theme Styles",
  ____description: "A collection of low-level styles, colors, fonts, spacing, etc... applied by name by theme-aware React components.",
  ____types: ["jsUndefined", // ViewThemeProcessor initial theme output is undefined until it's read via ConrollerAction.
  "jsObject"],
  settings: {
    ____label: "Theme Settings",
    ____description: "A normalized copy of the theme settings used to generate this copy of the view theme document.",
    ____accept: "jsObject"
  },
  page: {
    ____label: "Page Styles",
    ____description: "Values used to style the full-page client application (typically below) content widgets.",
    ____types: "jsObject",
    color: {
      ____types: "jsObject",
      backgroundColor: {
        ____label: "Background Color",
        ____accept: "jsString"
      },
      foregroundColor: {
        ____label: "Foreground Color",
        ____description: "Used to set the color CSS attribute of text content.",
        ____accept: "jsString"
      }
    },
    spacing: {
      ____types: "jsObject",
      margin: {
        ____accept: "jsString"
      },
      padding: {
        ____accept: "jsString"
      }
    }
  },
  // ~.page
  panel: {
    ____label: "Panel Styles",
    ____description: "Values used to style panels (display widgets typically attached to an edge(s) of the page).",
    ____types: "jsObject",
    navigation: _objectSpread({
      ____label: "Navigation Panel Styles",
      ____description: "Values used to style navigation panels (e.g. page header and footer panels)."
    }, regionStylesSpec),
    application: _objectSpread({
      ____label: "Appliction Panel Styles",
      ____description: "Values used to style application panels (e.g. an application-specific set of options/tool UI elements embedded in a panel)."
    }, regionStylesSpec),
    notification: _objectSpread({
      ____label: "Notification Panel Styles",
      ____description: "Values used to style notification panels (e.g. toast notifications etc.)"
    }, regionStylesSpec),
    tools: _objectSpread({
      ____label: "Tools Panel Styles",
      ____description: "Values used to style tools panels (e.g. in-application development/analysis/debug tool panels)."
    }, regionStylesSpec),
    help: _objectSpread({
      ____label: "Help Panel Styles",
      ____description: "Values used to style helper panels (e.g. in-application guides, tutorials, instruction panels)."
    }, regionStylesSpec),
    menu: _objectSpread({
      ____label: "Menu Panel Styles"
    }, regionStylesSpec)
  },
  // ~.panel
  window: {
    ____label: "Window Styles",
    ____description: "Values used to style windows (display widgets that float over content/other widgets e.g. dialogs, pop-ups, transitive menus, tooltips, floating windows).",
    ____types: "jsObject",
    modal: _objectSpread({
      ____label: "Modal Window Styles",
      ____description: "Values used to style modal dialog windows."
    }, regionStylesSpec),
    popup: _objectSpread({
      ____label: "Pop-up Window Stlyes",
      ____description: "Values used to style pop-up windows (transient, non-modal windows typically asking questions, confirming, providing options...)."
    }, regionStylesSpec),
    tooltip: _objectSpread({
      ____label: "Tooltip Window Styles",
      ____description: "Values used to style tooltip windows (transient, non-modal windows typically containing help or explanative text about something the user has focused or is hovering over)."
    }, regionStylesSpec),
    tool: _objectSpread({
      ____label: "Tools Window Styles",
      ____description: "Values used to style tool windows (widgets containing buttons and other user-facing controls options.)",
      ____types: "jsObject"
    }, regionStylesSpec),
    content: _objectSpread({
      ____label: "Content Window Styles",
      ____description: "Values used to style content windows (widgets containing mostly text content, perhaps some embedded menus, panels, or other types of controls)"
    }, regionStylesSpec)
  },
  // ~.window
  control: {
    ____label: "Control Styles",
    ____description: "Values used to style various types of controls (i.e. widgets that usually hook user input events and are interactive).",
    ____types: "jsObject",
    button: {
      ____label: "Button Control Styles",
      ____description: "Values used to style various types of buttons controls.",
      ____types: "jsObject",
      // Buttons are special case where we use styles to imply to the user what to expect when the button in pressed.
      // This gets a little tricky as it's important to have a reasonable way to affect dynamic styling updates to
      // buttons to reflect various transient conditions: e.g. mouse over, click, pending, complete, enable, disable...
      standard: {
        ____types: "jsObject",
        // Normal buttons use a color scheme that derives from and is consistent with every other element of the theme.
        normal: controlButtonStylesSpec,
        // Several special button types use pre-defined color scheme to indicate special button semantics.
        accept: controlButtonStylesSpec,
        reject: controlButtonStylesSpec,
        confirm: controlButtonStylesSpec
      },
      // Tool buttons differ from standard.normal buttons insofar as they typically use different spacing and typography settings (e.g. they're smaller).
      tool: controlButtonStylesSpec
    },
    // ~.control.button
    checkbox: controlStylesSpec,
    radio: controlStylesSpec,
    slider: controlStylesSpec,
    formInput: controlStylesSpec,
    dropDown: controlStylesSpec,
    menuItem: controlStylesSpec
  },
  // ~.control
  typography: {
    ____label: "Typograph Styles",
    ____description: "Values used for styling text fontFamily CSS attribute.",
    ____types: "jsObject",
    content: {
      ____label: "Content Text Styles",
      ____description: "Values used to style general (default) text content (i.e. non-widget text e.g. paragraphs of prose).",
      ____types: "jsObject",
      smallest: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      smaller: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      normal: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      larger: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      largest: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      }
    },
    // ~typograph.general
    monospace: {
      ____label: "Monospace Text Styles",
      ____description: "Values used to style monospaced text content (i.e. code examples, table column content that needs to align by column etc.).",
      ____types: "jsObject",
      smallest: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      smaller: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      normal: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      larger: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      largest: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      }
    },
    header: {
      ____label: "Header Text Styles",
      ____description: "Values used to style header text content.",
      ____types: "jsObject",
      h1: {
        ____label: "Header 1 Text Styles",
        ____description: "Values used to style H1 heading text.",
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      h2: {
        ____label: "Heading 2 Text Styles",
        ____description: "Values to style H2 heading text.",
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      h3: {
        ____label: "Header 3 Text Styles",
        ____description: "Values used to style H3 heading text.",
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      h4: {
        ____label: "Heading 4 Text Styles",
        ____description: "Values used to style H4 heading text.",
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      h5: {
        ____label: "Heading 5 Text Styles",
        ____description: "Values used to style H5 heading text.",
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      h6: {
        ____label: "Heading 6 Text Styles",
        ____description: "Values used to style H6 heading text.",
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      }
    },
    title: {
      ____label: "Title Text Font",
      ____description: "Values used to style title text for windows, panels, controls, etc.",
      ____types: "jsObject",
      smallest: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      smaller: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      normal: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      larger: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      largest: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      }
    },
    // ~.typography.title
    control: {
      ____label: "Control Text Font",
      ____description: "Values used to style content text labels (non-title) in widows, panels, controls, etc.",
      ____types: "jsObject",
      smallest: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      smaller: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      normal: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      larger: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      },
      largest: {
        ____types: "jsObject",
        fontFamily: {
          ____types: "jsString"
        },
        fontSize: {
          ____types: "jsString"
        },
        fontWeight: {
          ____types: "jsString"
        },
        fontStyle: {
          ____types: "jsString"
        }
      }
    } // ~.typography.control

  } // ~.typography

}; // ~holisticAppThemeSpec

module.exports = {
  regionStylesSpec: regionStylesSpec,
  controlRegionStylesSpec: controlRegionStylesSpec,
  controlBoxStylesSpec: controlBoxStylesSpec,
  controlStylesSpec: controlStylesSpec,
  controlButtonStylesSpec: controlButtonStylesSpec,
  holisticAppThemeSpec: holisticAppThemeSpec
};