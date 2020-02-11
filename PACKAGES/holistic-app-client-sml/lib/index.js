"use strict";

// @encapsule/holistic-app-client-sml/lib/index.js
module.exports = {
  actions: {
    d2r2ReactClientDisplayAdaptor: [require("./d2r2-react-client-display-adaptor/ControllerAction-react-render-client-view")],
    DOMLocationProcessor: [require("./dom-location-processor/ControllerAction-dom-location-processor-initialize"), require("./dom-location-processor/ControllerAction-dom-location-processor-sink-event-hashchange")]
  },
  models: {
    appClientRuntime: require("./app-client-runtime/ObservableProcessModel-app-client-runtime"),
    appClientView: require("./app-client-view/ObservableProcessModel-app-client-view"),
    d2r2ReactClientDisplayAdaptor: require("./d2r2-react-client-display-adaptor/ObservableProcessModel-d2r2-react-client-display-adaptor"),
    DOMLocationProcessor: require("./dom-location-processor/ObservableProcessModel-dom-location-processor")
  },
  operators: {},
  test: {
    declaration: {
      appClientRuntime: require("./app-client-runtime/ObservableProcessModel-app-client-runtime-declaration"),
      appClientView: require("./app-client-view/ObservableProcessModel-app-client-view-declaration"),
      d2r2ReactClientDisplayAdaptor: require("./d2r2-react-client-display-adaptor/ObservableProcessModel-d2r2-react-client-display-adaptor-declaration"),
      DOMLocationProcessor: require("./dom-location-processor/ObservableProcessModel-dom-location-processor-declaration")
    }
  }
};