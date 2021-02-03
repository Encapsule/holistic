"use strict";

var arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
  operationID: "-99RI_6HTsiQgwN2OV1xXQ",
  operationName: "Transition Operator Filter Factory",
  operationDescription: "Constructs a transition operator filter plug-in that is compatible with ObservableProcessModel and ObservableProcessController.",
  inputFilterSpec: require("./iospecs/top-method-constructor-input-spec"),
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null,
      result: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var innerFactoryResponse = arccore.filter.create({
        operationID: request_.id,
        operationName: request_.name,
        operationDescription: request_.description,
        inputFilterSpec: {
          ____label: request_.name + " Request",
          ____types: "jsObject",
          context: {
            ____label: "OPC Context Descriptor",
            ____description: "An object containing references to OPC instance-managed runtime API's available to transition operator filters.",
            ____types: "jsObject",
            apmBindingPath: {
              ____label: "APM Binding Path",
              ____description: "Fully-qualified dot-delimited path to the current APM instance's associated data in the OCD.",
              ____accept: "jsString"
            },
            ocdi: {
              ____label: "OCD Store Instance",
              ____description: "A reference to the OCD store instance managed by OPC.",
              ____accept: "jsObject"
            },
            transitionDispatcher: {
              ____label: "OPC Transition Dispatcher",
              ____description: "A reference to an OPC instance's transition operator dispatcher instance.",
              ____accept: "jsObject"
            }
          },
          operatorRequest: request_.operatorRequestSpec
        },
        bodyFunction: request_.bodyFunction,
        outputFilterSpec: {
          ____accept: "jsBoolean"
        }
      });

      if (innerFactoryResponse.error) {
        errors.unshift(innerFactoryResponse.error);
        break;
      }

      response.result = innerFactoryResponse.result;
      break;
    }

    if (errors.length) response.error = errors.join(" ");
    return response;
  },
  outputFilterSpec: {
    ____label: "Transition Operator Filter",
    ____accept: "jsObject"
  }
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;