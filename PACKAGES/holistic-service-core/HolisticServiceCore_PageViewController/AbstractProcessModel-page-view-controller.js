"use strict";

var holarchy = require("@encapsule/holarchy");

var apm = new holarchy.AbstractProcessModel({
  id: "AZaqZtWRSdmHOA6EbTr9HQ",
  name: "PageViewController Process",
  description: "Provides a service-level API for swapping the currently active view process in under control of the derived HTML5 service logic.",
  ocdDataSpec: {
    ____types: "jsObject",
    ____defaultValue: {},
    activeHashroutePathname: {
      ____label: "Active Hashroute Pathname",
      ____description: "The hashroute pathname that was used as the PageView cell process instanceName to activate activePageViewCellProcess.",
      ____accept: ["jsNull", "jsString"],
      ____defaultValue: null
    },
    activePageViewCellProcess: {
      ____label: "Active Page View Cell Process",
      ____description: "The APM binding path of the currently-active page view cell process (if there is one).",
      ____accept: ["jsNull", "jsObject"],
      ____defaultValue: null // TODO: This is a CellProcessor.process.activate response result

    }
  },
  steps: {
    uninitialized: {
      description: "Default process starting step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "pageview-controller-ready"
      }]
    },
    "pageview-controller-ready": {
      description: "Waiting for the HTML5 service logic to set the page view."
    }
  }
});

if (!apm.isValid()) {
  throw new Error(apm.toJSON());
}

module.exports = apm;