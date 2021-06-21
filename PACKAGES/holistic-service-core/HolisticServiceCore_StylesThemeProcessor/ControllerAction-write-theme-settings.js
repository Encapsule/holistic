"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var holarchy = require("@encapsule/holarchy");

var ControllerAction = holarchy.ControllerAction;
module.exports = new ControllerAction({
  id: "UK08qja3QiaHFGhl99fbmg",
  name: "ViewThemeProcessor::Write Settings",
  description: "Update the whole or part of the ViewThemeProcessor model's input theme settings document.",
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
            path: {
              ____label: "Settings Path",
              ____description: "An optional filter-style dot-delimited path into the themeSettings inputs document.",
              ____accept: "jsString",
              ____defaultValue: "~" // i.e. data is the entire settings document

            },
            data: {
              ____label: "Settings Data",
              ____description: "Settings data to write. Either the entire settings document (iff path is ~), or the subtree indicated by path.",
              ____opaque: true
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____label: "Normalized Theme Settings",
    ____description: "A reference to a normalized copy of the current theme settings input data.",
    ____accept: "jsObject"
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null,
      result: {}
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var message = request_.actionRequest.holistic.view.theme.write; // We resolve the fully-qualified path of #.inputs.version manually because we re-use the resolved address to read then write the same namespace.

      var rpResponse = holarchy.ObservableControllerData.dataPathResolve({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: "#.inputs.version"
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var settingsVersionPath = rpResponse.result; // Read the current theme settings version number.

      var ocdResponse = request_.context.ocdi.readNamespace(settingsVersionPath);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var settingsVersion = ocdResponse.result; // Write the new theme settings data.

      ocdResponse = request_.context.ocdi.writeNamespace({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: ["#", "inputs", "themeSettings"].concat(_toConsumableArray(message.path.split(".").slice(1))).join(".")
      }, message.data);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      response.result = ocdResponse.result; // normalized copy of the theme settings
      // Increment the theme settings version.

      ocdResponse = request_.context.ocdi.writeNamespace(settingsVersionPath, settingsVersion + 1);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});