"use strict";

var holodeck = require("@encapsule/holodeck");

var holarchy = require("@encapsule/holarchy");

var factoryResponse = holodeck.harnessFactory.request({
  id: "0xHlX_WKQ3y-3CFQ0DDx1w",
  name: "ControllerAction Harness",
  description: "Constructs an instance of ES6 class ControllerAction that is serialized and passed back as response.result.",
  // idempotent
  testVectorRequestInputSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        ControllerAction: {
          ____types: "jsObject",
          constructorRequest: {
            // Either a ControllerAction constructor request object or pre-constructed ControllerAction class instance reference.
            ____opaque: true
          }
        }
      }
    }
  },
  // testVectorRequestInputSpec
  testVectorResultOutputSpec: {
    ____accept: "jsObject" // TODO: Tighten this up

  },
  // testVectorResultOutputSpec
  harnessBodyFunction: function harnessBodyFunction(request_) {
    var messageBody = request_.vectorRequest.holistic.holarchy.ControllerAction;
    var controllerAction = messageBody.constructorRequest instanceof holarchy.ControllerAction ? messageBody.constructorRequest : new holarchy.ControllerAction(messageBody.constructorRequest);
    var response = {
      error: null,
      result: {
        isValid: controllerAction.isValid(),
        toJSON: controllerAction.toJSON(),
        _private: controllerAction._private
      }
    };
    return response;
  } // harnessBodyFunction

});

if (factoryResponse.error) {
  throw new Erorr(factoryResponse.error);
}

module.exports = factoryResponse.result;