"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// display-stream-artifact-generator-filter.js
(function () {
  var arccore = require("@encapsule/arccore");

  var holarchy = require("@encapsule/holarchy");

  var d2r2 = require("@encapsule/d2r2");

  var cmtDisplayView = require("./"); // Currently, we're co-resident w/the DisplayView_T definition.


  var factoryResponse = arccore.filter.create({
    operationID: "A04R9PeERUatNtwHZ_cjkw",
    operationName: "Display Stream Models Generator",
    operationDescription: "Encapsulates the details of generating a specialized DisplayView_T family CellModel and its matching d2r2Component wrapper in a single operation. Someday, this will be a constructor function request filter.",
    // TODO: Make this into a class when we move all DisplayView_T to @encapsule/holistic-service-core RTL
    inputFilterSpec: {
      ____label: "Display Stream Artifact Generator Request",
      ____types: "jsObject",
      displayViewSynthesizeRequest: {
        ____label: "DisplayView_T::synthesizeCellModel Request",
        ____description: "The full request descriptor to be passed to DisplayView_T::synthesizeCellModel method.",
        ____accept: "jsObject" // We let DisplayView_T do the work of validating the contents of this namespace in the request.

      },
      reactComponentClass: {
        ____accept: "jsFunction" // This is a reference to class X's constructor function where X extends React.Component.

      }
    },
    outputFilterSpec: {
      ____types: "jsObject",
      cellModel: {
        ____accept: "jsObject"
      },
      // This will be a CellModel class instance or constructor function request object for the same.
      d2r2Component: {
        ____accept: "jsObject"
      } // This will be a d2r2Component (whatever they are --- I forget how we pass them around; I think just a specialized filter at this point?)

    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var synthResponse = cmtDisplayView.synthesizeCellModel(request_.displayViewSynthesizeRequest); // Just the request in and see what happens.

        if (synthResponse.error) {
          errors.push("The actual call to DisplayView_T::synthesizeCellModel failed with error:");
          errors.push(synthResponse.error);
          break;
        }

        var cellModelConstructorRequest = synthResponse.result;
        var cellModel = new holarchy.CellModel(cellModelConstructorRequest);

        if (!cellModel.isValid()) {
          errors.push("The CellModel::constructor request we received back from DisplayView_T::synthesizeCellModel is DOA due to error:");
          errors.push(cellModel.toJSON());
          break;
        }

        var renderDataSpec = {
          ____label: "".concat(request_.displayViewSynthesizeRequest.cellModelLabel, " Render Data Spec"),
          ____types: "jsObject"
        };
        renderDataSpec[cellModelConstructorRequest.apm.ocdDataSpec.outputs.displayView.____appdsl.apm] = _objectSpread(_objectSpread({}, request_.displayViewSynthesizeRequest.specializationData.displayElement.renderDataSpec), {}, {
          ____defaultValue: undefined
        });
        console.log("RENDER DATA SPEC FOR NEW d2r2 COMPONENT = \"".concat(JSON.stringify(renderDataSpec, undefined, 4), "\""));
        synthResponse = d2r2.ComponentFactory.request({
          id: cmtDisplayView.mapLabels({
            OTHER: "".concat(cellModelConstructorRequest.id, ":d2r2Component")
          }).result.OTHERID,
          name: "".concat(request_.displayViewSynthesizeRequest.cellModelLabel, " Display Process"),
          description: "A filter that generates a React.Element instance created via React.createElement API from the reactComponentClass specified here bound to the request data.",
          renderDataBindingSpec: _objectSpread({}, renderDataSpec),
          reactComponent: request_.reactComponentClass
        });

        if (synthResponse.error) {
          errors.push("Oh snap. Things were going so well... Unfortunately, we cannot synthesize a d2r2 React.Element synthesizer filter (d2r2Component) due to error:");
          errors.push(synthResponse.error);
          break;
        }

        var d2r2Component = synthResponse.result;
        console.log("RESULT d2r2 COMPONENT:");
        console.log(d2r2Component); // And, we're good?

        response.result = {
          cellModel: cellModel,
          d2r2Component: d2r2Component
        };
        break;
      }

      if (errors.length) {
        errors.unshift("Unable to synthesize DisplayStream models due to fatal error:");
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result; // @encapsule/arccore.filter object
})();