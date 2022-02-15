"use strict";

// sources/common/view/component-router/react-component-router-factory.js
//
// This module builds and exports an ARCcore.filter instance that implements a
// factory for building a <ComponentRouter/> React component given an array of
// React component data binding filters.
var arccore = require("@encapsule/arccore");

var ComponentRouterSubfactory = require("./ComponentRouter.jsx");

var factoryResponse = arccore.filter.create({
  operationID: "Jo7GwCreQNaZp11l52Uciw",
  operationName: "d2r2 <ComponentRouter/> Factory",
  operationDescription: "Constructs a <ComponentRouter/> React component that auto-selects a delegation target (React component) based on 'this.props.renderData'.",
  inputFilterSpec: {
    ____label: "Component Router Constructor Request",
    ____description: "A descriptor object that specifies input to the <ComponentRouter/> factory filter.",
    ____types: "jsObject",
    d2r2ComponentSets: {
      ____label: "d2r2 Component Sets",
      ____description: "An array of of arrays of d2r2 Component filters.",
      ____types: "jsArray",
      d2r2ComponentSet: {
        ____label: "d2r2 Component Set",
        ____description: "An array of d2r2 Component filters.",
        ____types: "jsArray",
        d2r2ComponentFilter: {
          ____label: "d2r2 Component Filter",
          ____description: "Reference to a d2r2 Component filter.",
          ____types: "jsObject",
          filterDescriptor: {
            ____accept: "jsObject"
          },
          request: {
            ____accept: "jsFunction"
          }
        }
      }
    }
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null,
      result: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      console.log(this.filterDescriptor.operationID + "::" + this.filterDescriptor.operationName);
      var d2r2ComponentFilters = [];
      request_.d2r2ComponentSets.forEach(function (d2r2ComponentSet_) {
        d2r2ComponentSet_.forEach(function (d2r2ComponentFilter_) {
          d2r2ComponentFilters.push(d2r2ComponentFilter_); // console.log("..... " + d2r2ComponentFilter_.filterDescriptor.operationID + "::" + d2r2ComponentFilter_.filterDescriptor.operationName);
        });
      });

      if (d2r2ComponentFilters.length < 2) {
        errors.push("Internal error: Less than two input filters?");
        break;
      } // Create an ARCcore.discriminator filter that routes its request to 1:N possible target filters.


      var innerFactoryResponse = arccore.discriminator.create({
        id: "darBJdtyS7y5BnckiqN3eg",
        name: "Data-Driven React Render (d2r2) Discriminator",
        description: "Routes d2r2 render requests to an appropriate d2r2-extended React component for server or client side DOM rendering.",
        options: {
          action: "getFilter"
        },
        filters: d2r2ComponentFilters
      });

      if (innerFactoryResponse.error) {
        errors.push("Failed to initialize the <ComponentRouter/> React component due to a problem constructing its underlying Encapsule/ARCcore.discriminator filter instance.");
        errors.push("Typically, this is result of specifying two or more data-bound React components whose input filter specifications overlap ambiguously (discriminator " + "requires that each data-bound React component must have a unique input signature (i.e. can be discriminated from other signatures by inspecting namespace " + "names and namespace value types.");
        errors.unshift(innerFactoryResponse.error);
        break;
      }

      var d2r2ComponentFilterRouter = innerFactoryResponse.result; // Create the actual <ComponentRouter/> React component that encapsulates the ARCcore.discriminator instance
      // that performs the actual signature based routing inside of the component's render method. We're also going
      // to pass in a reference to original React component data binding filter array; discriminator will hold these
      // all by reference anyway and we're going to use these direct references to provide additional information in
      // <ComponentRouter/>'s error reporting mode.

      var ComponentRouter = ComponentRouterSubfactory(d2r2ComponentFilterRouter, d2r2ComponentFilters); // Return the discriminator filter.

      console.log("..... <ComponentRouter/> runtime instance constructed to auto-delegate 'this.props.renderData' to 1:".concat(d2r2ComponentFilters.length, " registered d2r2 components."));
      response.result = ComponentRouter;
      break;
    }

    if (errors.length) response.error = errors.join(" ");
    return response;
  },
  outputFilterSpec: {
    ____opaque: true
  }
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
var dataViewRouterFactory = factoryResponse.result;
dataViewRouterFactory.create = dataViewRouterFactory.request;
module.exports = dataViewRouterFactory;