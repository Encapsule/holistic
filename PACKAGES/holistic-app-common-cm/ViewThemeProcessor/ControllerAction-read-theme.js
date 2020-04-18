"use strict";

var holarchy = require("@encapsule/holarchy");

var ControllerAction = holarchy.ControllerAction;

var themeSettingsSpec = require("./iospecs/holistic-app-theme-settings-spec");

var themeObjectSpecs = require("./iospecs/holistic-app-theme-object-specs");

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
          write: {
            ____types: "jsObject",
            settings: themeSettingsSpec
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
      inBreakScope = true; // Here we bias for the expected typical case that theme settings have not changed,
      // and that the controller action will return the previously-calculated theme document.
      // Resolve the OCD path of the cell process' inputs namespace version in OCD shared memory.

      var rpResponse = holarchy.ObservableControllerData.dataPathResolve({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: "#.inputs.version"
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var ocdPath = rpResponse.result; // Read the cell process inputs namespace from shared OCD memory.

      var ocdReadResponse = request_.context.ocdi.readNamespace(ocdPath);

      if (ocdReadResponse.error) {
        errors.push(ocdReadResponse.error);
        break;
      }

      var inputVersion = ocdReadResponse.result; // Resolve the OCD path of the cell process' outputs namespace version in OCD shared memory.

      rpResponse = holarchy.ObservableControllerData.dataPathResolve({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: "#.outputs.version"
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      ocdPath = rpResponse.result; // Read the cell process outputs namespace from shared OCD memory.

      ocdReadResponse = request_.context.ocdi.readNamespace(ocdPath);

      if (ocdReadResponse.error) {
        errors.push(ocdReadResponse.error);
        break;
      }

      var outputVersion = outputReadResponse.result; // Determine if the Holistic View Theme document stored in the cell process' outputs namespace.
      // is up-to-date w/respect to Holistic View Theme Settings stored in the cell process' inputs namespace.

      if (outputVersion !== -1 && outputVersion === inputVersion) {
        rpResponse = holarchy.ObservableControllerData.dataPathResolve({
          apmBindingPath: request_.context.apmBindingPath,
          dataPath: "#.outputs.holisticAppTheme"
        });

        if (rpResponse.error) {
          errors.push(rpResponse.error);
          break;
        }

        ocdPath = rpResponse.result;
        ocdReadResponse = request_.context.ocdi.readNamespace(ocdPath);

        if (ocdReadResponse.error) {
          errors.push(ocdReadResponse.error);
          break;
        } // Return the cached Holistic App Theme document.


        response.result = ocdReadResponse.result;
        break;
      } // Resolve the OCD path of the cell process' inputs.themeSettings namespace.


      rpResponse = holarchy.ObservableProcessData.dataPathResolve({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: "#.inputs.themeSettings"
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      ocdPath = rpResponse.result;
      ocdReadResponse = request_.context.ocdi.readNamespace(ocdPath);

      if (ocdReadResponse.error) {
        errors.push(ocdReadResponse.error);
        break;
      }

      var themeSettings = ocdReadResponse.result; // ================================================================
      // DELEGATE TO THE ACTUAL THEME GENERATOR ALGORITHM HERE:

      var transformResponse = themeTransformFunction(themeSettings);

      if (transformResponse.error) {
        errors.push(transformResponse.error);
        break;
      } // ================================================================


      var outputs = {
        version: inputVersion,
        holisticAppTheme: transformResponse.result
      };
      rpResponse = holarchy.ObservableProcessController.dataPathResolve({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: "#.outputs"
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      ocdPath = rpResponse.result;
      var ocdWriteResponse = request_.context.ocdi.writeNamespace(ocdPath, outputs);

      if (ocdWriteResponse.error) {
        errors.push(ocdWriteResponse.error);
        break;
      }

      response.result = outputs;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});