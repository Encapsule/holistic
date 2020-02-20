"use strict";

// @encapsule/holistic-app-client-sml/lib/index.js
module.exports = {
  actions: {
    d2r2ReactClientDisplayAdaptor: [require("./d2r2-react-client-display-adaptor/ControllerAction-react-render-client-view")],
    DOMLocationProcessor: [require("./dom-location-processor/ControllerAction-dom-location-processor-initialize"), require("./dom-location-processor/ControllerAction-dom-location-processor-sink-event-hashchange")],
    HolisticAppCLient: [require("./app-client-runtime/ControllerAction-app-client-runtime-hook-events")]
  },
  models: {
    HolisticAppClient: require("./app-client-runtime/AbstractProcessModel-app-client-runtime"),
    HolisticAppView: require("./app-client-view/AbstractProcessModel-app-client-view"),
    d2r2ReactClientDisplayAdaptor: require("./d2r2-react-client-display-adaptor/AbstractProcessModel-d2r2-react-client-display-adaptor"),
    DOMLocationProcessor: require("./dom-location-processor/AbstractProcessModel-dom-location-processor")
  },
  operators: {},
  test: {
    declaration: {
      appClientRuntime: require("./app-client-runtime/AbstractProcessModel-app-client-runtime-declaration"),
      appClientView: require("./app-client-view/AbstractProcessModel-app-client-view-declaration"),
      d2r2ReactClientDisplayAdaptor: require("./d2r2-react-client-display-adaptor/AbstractProcessModel-d2r2-react-client-display-adaptor-declaration"),
      DOMLocationProcessor: require("./dom-location-processor/AbstractProcessModel-dom-location-processor-declaration")
    }
  }
};