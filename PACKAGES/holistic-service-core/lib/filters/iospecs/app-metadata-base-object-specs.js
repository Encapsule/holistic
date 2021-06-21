"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// app-metadata-base-object-specs.js
// v0.0.49-spectrolite
// We're going with this prior work from v0.0.48-kyanite. This is okay I think
// Here we sketch out app metadata in as much detail as we need/care to know about it.
// Having ONE CENTRAL PLACE where this information is analyzed, indexed, and then made
// available via a CellModel for use in app server or app client service is essential
// for my sanity. It is also essential that I be able to add/remove items that are
// needed by the platform and not have to edit any platform code or any derived app
// code for non-breaking schema changes (e.g. add something new).
var pageViewTopoSortProps = {
  children: {
    ____label: "Child Page Views",
    ____description: "An ordered array of either pageURI or hashroutePathname string keys corresponding to this page view's direct child page views.",
    ____types: "jsArray",
    ____defaultValue: [],
    keyString: {
      ____accept: "jsString"
    }
  },
  ts: {
    ____label: "Topological Sort Info",
    ____description: "Information deduced via a directed graph topological sort on the page view tree defined by your page/hashroute metadata that's useful for building dynamic menus & page-view-level UI nav widgets.",
    ____types: "jsObject",
    ____defaultValue: {},
    d: {
      ____label: "Depth",
      ____accept: ["jsNumber", "jsNull"],
      ____defaultValue: null
    },
    i: {
      ____label: "In",
      ____accept: ["jsNumber", "jsNull"],
      ____defaultValue: null
    },
    o: {
      ____label: "Out",
      ____accept: ["jsNumber", "jsNull"],
      ____defaultValue: null
    },
    p: {
      ____label: "Pages",
      ____accept: ["jsNumber", "jsNull"],
      ____defaultValue: null
    },
    w: {
      ____label: "Width",
      ____accept: ["jsNull", "jsNumber"],
      ____defaultValue: null
    }
  }
};
var basePackageBuildProps = {
  ____types: "jsObject",
  name: {
    ____accept: "jsString"
  },
  description: {
    ____accept: "jsString"
  },
  version: {
    ____accept: "jsString"
  },
  codename: {
    ____accept: "jsString"
  },
  author: {
    ____accept: "jsString"
  },
  license: {
    ____accept: "jsString"
  },
  buildID: {
    ____accept: "jsString"
  },
  buildSource: {
    ____accept: "jsString"
  },
  buildTime: {
    ____accept: "jsNumber"
  },
  buildDateISO: {
    ____accept: "jsString"
  }
};
module.exports = {
  // platform base definitions for app-extensible static metadata types.
  // This is a descriptor object (i.e. object w/known prop names vs a map w/unknown prop names) containing filter specs.
  input: {
    // These specs are combined with specs specified by the derived app to set the runtime metadata formats allowed.
    org: {
      ____label: "Org Metadata Input",
      ____description: "Information about the group/organization/company that produced this derived app service.",
      ____types: "jsObject",
      ____defaultValue: {},
      name: {
        ____label: "Org Name",
        ____description: "The name of the publishing organization.",
        ____accept: "jsString",
        ____defaultValue: "Your Company/Organization Name"
      },
      location: {
        ____label: "Org Location",
        ____description: "The geographic location of the organization.",
        ____accept: "jsString",
        ____defaultValue: "Somewhere, Someplace Country"
      },
      url: {
        ____label: "Org URL",
        ____description: "The full URL of the publishing organization's main website.",
        ____accept: "jsString",
        ____defaultValue: "http://your-co-org.com"
      },
      social: {
        ____label: "Org Social Media",
        ____description: "Links to the organization's social media account(s).",
        ____types: "jsObject",
        ____defaultValue: {},
        twitterUrl: {
          ____label: "Org Twitter URL",
          ____description: "The full URL of your organization's Twitter account.",
          ____accept: "jsString",
          ____defaultValue: "https://twitter.com/encapsule" // e.g. @encapsule on Twitter (substitute as appropriate for your own company or organization's needs)

        },
        githubUrl: {
          ____label: "Org GitHub Org URL",
          ____description: "The full URL of the organization's GitHub organization.",
          ____accept: "jsString",
          ____defaultValue: "https://github.com/Encapsule" // e.g. @encapsule on GitHub (substitue as approriate for your own company or organization's needs)

        }
      },
      copyrightHolder: {
        ____label: "Org Copyright Holder",
        ____description: "Information about the organization's principal copyright holder.",
        ____types: "jsObject",
        ____defaultValue: {},
        name: {
          ____label: "Org Copyright Holder Name",
          ____description: "The name of the principal copyright holder of this application.",
          ____accept: "jsString",
          ____defaultValue: "Your Co/Org, Inc." // This is used to create a legal copyright (C) string w/the year tied to wall clock (so it updates automatically on New Years).

        }
      }
    },
    app: {
      ____label: "App Metadata Input",
      ____description: "Information about this specific app service + the app service build's unique app-build.json data.",
      ____types: "jsObject",
      ____defaultValue: {},
      name: {
        ____label: "Application Name",
        ____description: "A short name for the website.",
        ____accept: "jsString",
        ____defaultValue: "The Name of Your App Service"
      },
      description: {
        ____label: "Application Description",
        ____description: "A short description of the website.",
        ____accept: "jsString",
        ____defaultValue: "A description of your app service."
      },
      build: {
        ____label: "Application Build Manifest",
        ____description: "A copy of the build descriptor generated when this application was built and packaged for deployment.",
        ____types: "jsObject",
        app: _objectSpread(_objectSpread({}, basePackageBuildProps), {}, {
          copyright: {
            ____types: "jsObject",
            holder: {
              ____accept: "jsString"
            },
            year: {
              ____accept: "jsNumber"
            }
          }
        }),
        platform: {
          ____types: "jsObject",
          app: _objectSpread({}, basePackageBuildProps),
          data: _objectSpread({}, basePackageBuildProps),
          display: {
            ____types: "jsObject",
            name: {
              ____accept: "jsString"
            },
            // The library used to scribble on the DOM (will be set to React unless/until we find something that's better)
            description: {
              ____accept: "jsString"
            },
            version: {
              ____accept: "jsString"
            },
            // semver
            author: {
              ____accept: "jsString"
            } // The author of the library used for DOM scribbling (currently set to Facebook who publishes React library)

          }
        }
      }
    },
    page: {
      ____label: "App Page Metadata Input",
      ____description: "Information about a specific HTML5 document (aka derived app client) synthesized by the derived app server in response to a request to https://xyzzy.com/<URI>.",
      ____types: "jsObject",
      ____defaultValue: {},
      title: {
        ____label: "Page Title",
        ____description: "A short title for the page that is used to populate the browser title and history.",
        ____accept: "jsString",
        ____defaultValue: "Missing Page View Title"
      },
      description: {
        ____label: "Page Description",
        ____description: "A short description of this page that is used for page header metadata. And, in abbreviated lists as a short description.",
        ____accept: "jsString",
        ____defaultValue: "Missing page view description."
      },
      name: {
        ____label: "Page Name",
        ____description: "A short moniker to use as the display label for menus, buttons, and hyperlinks referring to this page.",
        ____accept: "jsString",
        ____defaultValue: "Missing Page View Name"
      },
      tooltip: {
        ____label: "Page Tooltip",
        ____description: "A short string to display on mouse over/hover over links/buttons/menus...",
        ____accept: "jsString",
        ____defaultValue: "Missing page view tooltip..."
      },
      rank: {
        ____label: "Page Peer Rank",
        ____description: "A integer value used to determine the order of this page relative to its siblings.",
        ____accept: "jsNumber",
        ____defaultValue: 0 // defaults to simple alpha sort by name

      },
      // WE WANT TO REWORK THE LINE BETWEEN THE PLATFORM AND THE APP METADATA PROPS VERY CAREFULLY WHEN WE GET TO IT.
      pageViewProcessConfig: {
        ____label: "Page View Process Config",
        ____description: "Information that is used by a PageView cell process to configure and specialize its behaviors to the unique requirements of a specific view.",
        ____accept: "jsObject",
        ____defaultValue: {} // TODO: We're not playing CellProcessor games on the server just yet. We're moving that way quickly however.
        // In the future this object spec will expand to encode the information needed to deal with various aspects
        // of dynamically synthesizing the client app service (i.e. rendering a static HTML5 w/a template and including
        // a bootROM + a standard bundle of CellModel + a CellProcessor to run them in). These aspects could include custom
        // behaviors for authN, authZ, redirection, error reporting, data gateway, storage-prefetch, dynamic reconfiguration
        // of the specific config and/or initial boot state of the app client process in the browser tab...

      }
    },
    hashroute: {
      ____label: "App Hashroute Metadata Input",
      ____description: "Information about a specific dynamically-generated browser page view that may be displayed to the user by the derived app client service under various programmatically-determined conditions.",
      ____types: "jsObject",
      ____defaultValue: {},
      title: {
        ____label: "Page Title",
        ____description: "A short title for the page that is used to populate the browser title and history.",
        ____accept: "jsString",
        ____defaultValue: "Missing Page View Title"
      },
      description: {
        ____label: "Page Description",
        ____description: "A short description of this page that is used for page header metadata. And, in abbreviated lists as a short description.",
        ____accept: "jsString",
        ____defaultValue: "Missing page view description."
      },
      name: {
        ____label: "Page Name",
        ____description: "A short moniker to use as the display label for menus, buttons, and hyperlinks referring to this page.",
        ____accept: "jsString",
        ____defaultValue: "Missing Page View Name"
      },
      tooltip: {
        ____label: "Page Tooltip",
        ____description: "A short string to display on mouse over/hover over links/buttons/menus...",
        ____accept: "jsString",
        ____defaultValue: "Missing page view tooltip..."
      },
      rank: {
        ____label: "Page Peer Rank",
        ____description: "A integer value used to determine the order of this page relative to its siblings.",
        ____accept: "jsNumber",
        ____defaultValue: 0 // defaults to simple alpha sort by name

      },
      // NOT 100% SURE ABOUT THE CONTENTS OR REPRESENTATION OF DATA IN THIS NAMESPACE
      // There's more integration work to be done to eliminate the last of the baseline
      // sharp edges left in v0.0.49 blocking before returning back to complete the work
      // started in early Dec 2020 on PageViewController and PageView CellModels.
      pageViewProcessConfig: {
        ____label: "Page View Process Config",
        ____description: "Information that is used by a PageView cell process to configure and specialize its behaviors to the unique requirements of a specific view.",
        ____accept: "jsObject",
        ____defaultValue: {} // THIS IS LIKELY TO GROW LARGE AND COMPLEX
        // But, developers are expected to simply require-in a module that was code-generated in the correct format; this is not by-hand but rather info pulled from our design spreadsheet woven together with other stuff.

      }
    }
  },
  // These are spliced over the input specs to allow values (e.g. topological sort data) to be added by the platform during construction of the metadata store.
  output: {
    org: {
      ____label: "Organization Metadata Value",
      ____description: "Information about the group/organization/company that produced this derived app service.",
      ____types: "jsObject"
    },
    app: {
      ____label: "App Metadata Value",
      ____description: "Information about this specific app service.",
      ____types: "jsObject"
    },
    page: _objectSpread({
      ____label: "App Page Metadata Value",
      ____description: "Information about a specific HTML5 document (aka derived app client) synthesized by the derived app server in response to a request to https://xyzzy.com/<URI>.",
      ____types: "jsObject"
    }, pageViewTopoSortProps),
    hashroute: _objectSpread({
      ____label: "App Hashroute Metadata Value",
      ____description: "Information about a specific dynamically-generated browser page view that may be displayed to the user by the derived app client service under various programmatically-determined conditions.",
      ____types: "jsObject"
    }, pageViewTopoSortProps)
  }
};