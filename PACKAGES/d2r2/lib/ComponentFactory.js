"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// content-data-view-binding-filter-factory.js
var arccore = require("@encapsule/arccore");

var React = require("react");

var factoryResponse = arccore.filter.create({
  operationID: "QSFGMUwaTtWW36j9SVV_dw",
  operationName: "d2r2 Component Factory",
  operationDescription: "Constructs a d2r2 Component Filter that wraps a React.Component for use with d2r2 <ComponentRouter/>.",
  inputFilterSpec: {
    ____label: "d2r2 Component Descriptor",
    ____description: "Defines the 1:1 relationship between an HTML render request and a React component responsible of transforming the request into HTML.",
    ____types: "jsObject",
    id: {
      ____label: "React Component Binding Filter ID",
      ____description: "An optional 22-character, version independent IRUT identifier (optional) used to identify this React component data binding filter.",
      ____accept: "jsString"
    },
    name: {
      ____label: "React Component Name",
      ____description: "The name of the React component.",
      ____accept: "jsString"
    },
    description: {
      ____label: "React Component Description",
      ____description: "A short description of the type of data this React component renders and/or the purpose of this React component.",
      ____accept: "jsString"
    },
    renderDataBindingSpec: {
      ____label: "Input Filter Spec",
      ____description: "An ARCcore.filter specification (https://encapsule.io/docs/ARCcore/filter) defining an input message data type. Values that passed into the React component data binding" + " filter are \"bound\" to the specified React control at runtime in the process of dynamic dispatch via the <ComponentRouter/> infrastructure component.",
      ____accept: "jsObject"
    },
    reactComponent: {
      ____label: "React Component",
      ____description: "A React component reference that is used for every binding process performed by the generated React component binding filter.",
      ____accept: "jsFunction"
    }
  },
  bodyFunction: function bodyFunction(factoryRequest_) {
    var response = {
      error: null,
      result: null
    };
    var errors = [];
    var inBreakScope = false;
    var factoryRequest = factoryRequest_;

    while (!inBreakScope) {
      inBreakScope = true;
      var testResponse = arccore.identifier.irut.isIRUT(factoryRequest_.id);

      if (testResponse.error) {
        errors.unshift(testResponse.error);
        errors.unshift("An error occurred while attempting to determine if the filter identifier you specified is or is not a valid IRUT:");
        break;
      }

      if (!testResponse.result) {
        errors.push("Sorry. The filter identifier that you specified is not a valid 22-character IRUT identifier.");
        break;
      }

      var operationID = factoryRequest_.id;
      var innerFactoryResponse = arccore.filter.create({
        operationID: operationID,
        operationName: factoryRequest.name,
        operationDescription: factoryRequest.description + " (d2r2 Component Filter)",
        inputFilterSpec: {
          ____label: "d2r2 Component Render Request",
          ____types: "jsObject",
          reactContext: {
            ____label: "React Context Data",
            ____description: "A reference to an object to be applied to this.props via spread operator that is not parsed by <ComponentRouter/>.",
            ____accept: "jsObject" // NOT SCHEMATIZED BY DESIGN BECAUSE WE HAVE NO IDEA... It's totally up to d2r2 component authors.

          },
          renderData: factoryRequest.renderDataBindingSpec
        },
        bodyFunction: function bodyFunction(renderRequest_) {
          var reactElement = React.createElement(factoryRequest.reactComponent, _objectSpread(_objectSpread({}, renderRequest_.reactContext), {}, {
            renderData: renderRequest_.renderData
          }));
          return {
            error: null,
            result: reactElement
          };
        },
        outputFilterSpec: {
          ____label: "Bound React Component",
          ____description: "The result of calling React.createElement to bind filtered render request of specific type to the specified React component.",
          ____accept: "jsObject"
        }
      });

      if (innerFactoryResponse.error) {
        errors.unshift(innerFactoryResponse.error);
        break;
      }

      response.result = innerFactoryResponse.result;
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  },
  outputFilterSpec: {
    ____label: "View Content Router Filter",
    ____description: "A filter that accepts a specific request message type and returns the encapsulated React component bound to the incoming message.",
    ____types: "jsObject",
    filterDescriptor: {
      ____accept: "jsObject"
    },
    request: {
      ____accept: "jsFunction"
    }
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

var reactComponentBindingFilterFactory = factoryResponse.result;
reactComponentBindingFilterFactory.create = reactComponentBindingFilterFactory.request;
module.exports = factoryResponse.result;