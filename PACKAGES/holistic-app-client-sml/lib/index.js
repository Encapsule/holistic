"use strict";

// @encapsule/holistic-app-client-sml/lib/index.js
module.exports = {
  actions: {
    d2r2ReactClientDisplayAdaptor: [require("./d2r2-react-client-display-adaptor/ControllerAction-react-render-client-view")],
    DOMLocationProcessor: [require("./dom-location-processor/ControllerAction-dom-location-processor-initialize"), require("./dom-location-processor/ControllerAction-dom-location-processor-sink-event-hashchange")]
  },
  models: {
    d2r2ReactClientDisplayAdaptor: require("./d2r2-react-client-display-adaptor/ObservableProcessModel-d2r2-react-client-display-adaptor"),
    DOMLocationProcessor: require("./dom-location-processor/ObservableProcessModel-dom-location-processor")
  },
  operators: {},
  test: {
    declaration: {
      d2r2ReactClientDisplayAdaptor: require("./d2r2-react-client-display-adaptor/ObservableProcessModel-d2r2-react-client-display-adaptor-declaration"),
      DOMLocationProcessor: require("./dom-location-processor/ObservableProcessModel-dom-location-processor-declaration")
    }
  }
};