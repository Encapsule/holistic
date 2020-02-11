"use strict";

// vector-set-app-client-view.js
var clientSML = require("@encapsule/holistic-app-client-sml");

module.exports = [{
  id: "VyQv8NaWTAuoY0daxO9mzQ",
  name: "Client App View OPM #1",
  description: "Attempt to instantiate the current App Client View OPM via our test harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessModel: {
          constructorRequest: clientSML.client.test.declaration.appClientView
        }
      }
    }
  }
}];