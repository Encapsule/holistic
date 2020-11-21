"use strict";

// ocd-method-contructor-filter.js
var arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
  operationID: "Z0_rX_NhQ5-c0BCWNTXmgw",
  operationName: "OCD::constructor Filter",
  operationDescription: "Implements the ObservableControllerData class constructor method.",
  inputFilterSpec: {
    ____label: "OCD Constructor Request",
    ____types: "jsObject",
    ____defaultValue: {},
    spec: {
      ____label: "OCD Filter Specification",
      ____accept: "jsObject" // this is a filter specification

    },
    data: {
      ____label: "OCD Constructor Data",
      ____opaque: true
    }
  },
  outputFilterSpec: {
    ____label: "OCD Constructor Result",
    ____types: "jsObject",
    storeData: {
      ____label: "Initial Store Data",
      ____opaque: true
    },
    storeDataSpec: {
      ____label: "OCD Filter Spec",
      ____accept: "jsObject"
    },
    accessFilters: {
      ____label: "Access Filter Cache",
      ____types: "jsObject",
      read: {
        ____accept: "jsObject"
      },
      write: {
        ____accept: "jsObject"
      }
    },
    dirty: {
      ____label: "Dirty Data Flag",
      ____description: "A Boolean flag indicating if any write(s) have occurred as a consequence of actor(s) calling mutating method(s) on this OCD class instance.",
      ____accept: "jsBoolean",
      ____defaultValue: true
    }
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var innerResponse = arccore.filter.create({
        operationID: "3aDV_cacQByO0tTzVrBxnA",
        operationName: "OCD Constructor Data Filter",
        operationDescription: "Validate/normalize data per input spec to deduce initial runtime value of the state data managed by an OPC class instance.",
        inputFilterSpec: request_.spec
      });

      if (innerResponse.error) {
        errors.push("Invalid arccore.filter specification specified for OCD store.");
        errors.push(innerResponse.error);
        break;
      }

      var dataFilter = innerResponse.result;
      innerResponse = dataFilter.request(request_.data);

      if (innerResponse.error) {
        errors.push("Invalid initialization data specified for OCD store.");
        errors.push(innerResponse.error);
        break;
      }

      response.result = {
        storeData: innerResponse.result,
        storeDataSpec: dataFilter.filterDescriptor.inputFilterSpec,
        accessFilters: {
          read: {},
          write: {}
        }
      };
      break;
    } // while(!inBreakScope)


    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  } // bodyFunction

});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;