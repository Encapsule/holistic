"use strict";

var holarchy = require("@encapsule/holarchy");

var ControllerAction = holarchy.ControllerAction;

var themeObjectSpecs = require("./iospecs/holistic-view-theme-object-specs");

var themeTransformFunction = require("./theme-transform-function");

module.exports = new ControllerAction({
  id: "e2kGs2nLRwW7RtFDPi8REg",
  name: "Read Theme Palette",
  description: "Reads (and updates if necessary) the current theme output.",
  actionRequestSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      view: {
        ____types: "jsObject",
        theme: {
          ____types: "jsObject",
          read: {
            ____types: "jsObject"
          }
        }
      }
    }
  },
  actionResultSpec: themeObjectSpecs.holisticAppThemeSpec,
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true; // Read the cell process inputs namespace from shared OCD memory.

      var ocdResponse = request_.context.ocdi.readNamespace({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: "#.inputs.version"
      });

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var inputVersion = ocdResponse.result; // defaults to value 0
      // Read the cell process outputs namespace from shared OCD memory.

      ocdResponse = request_.context.ocdi.readNamespace({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: "#.outputs.version"
      });

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var outputVersion = ocdResponse.result; // defaults to value -1
      // Determine if the Holistic View Theme document stored in the cell process' outputs namespace.
      // is up-to-date w/respect to Holistic View Theme Settings stored in the cell process' inputs namespace.

      if (outputVersion !== -1 && outputVersion === inputVersion) {
        // If we've previously generated the theme document, and it's up-to-date then read it and return it to the caller.
        ocdResponse = request_.context.ocdi.readNamespace({
          apmBindingPath: request_.context.apmBindingPath,
          dataPath: "#.outputs.holisticAppTheme"
        });

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        response.result = ocdResponse.result;
        break;
      } // Read the latest version of the theme settings from the model's input namespace.


      ocdResponse = request_.context.ocdi.readNamespace({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: "#.inputs.themeSettings"
      });

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var themeSettings = ocdResponse.result; // Regenerate the theme document given the latest theme settings.

      var transformResponse = themeTransformFunction(themeSettings);

      if (transformResponse.error) {
        errors.push(transformResponse.error);
        break;
      } // Setup the new output value for the model.


      var outputs = {
        version: inputVersion,
        holisticAppTheme: transformResponse.result
      }; // Update model's outputs namespace w/incremented version and new theme document values.

      ocdResponse = request_.context.ocdi.writeNamespace({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: "#.outputs"
      }, outputs);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      } // Return the theme document to the caller.


      response.result = outputs.holisticAppTheme;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});