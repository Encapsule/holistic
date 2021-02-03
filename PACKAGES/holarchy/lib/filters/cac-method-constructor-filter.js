"use strict";

var arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
  operationID: "actXQlKYQ9KDriZba3t00w",
  operationName: "Controller Action Filter Factory",
  operationDescription: "Constructs a controller action filter plug-in compatible with ObservableProcessModel and ObversableProcessController.",
  inputFilterSpec: require("./iospecs/cac-method-constructor-input-spec"),
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
              ____description: "Fully-qualified dot-delimited path to the current APM instance's associated data in the OCD instance.",
              ____accept: "jsString"
            },
            ocdi: {
              ____label: "OCD Store Instance",
              ____description: "A reference to the OCD store instance managed by OPC.",
              ____accept: "jsObject"
            },
            act: {
              ____label: "OPC.act Method",
              ____description: "A reference to ObservableProcessController.act method.",
              ____accept: "jsFunction"
            }
          },
          actionRequest: request_.actionRequestSpec
        },
        outputFilterSpec: request_.actionResultSpec,
        bodyFunction: request_.bodyFunction
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
    ____label: "Controller Action Filter",
    ____accept: "jsObject"
  }
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;