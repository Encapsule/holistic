"use strict";

// ControllerAction-cpm-aciton-request-on.js
var ControllerAction = require("../../../ControllerAction");

var ObservableControllerData = require("../../../lib/ObservableControllerData");

var cpmLib = require("./lib");

var controllerAction = new ControllerAction({
  id: "wB5QKMYtS7yY2-v7Y3tGWA",
  name: "Cell Process Manager: ControllerAction Request On Cell (actOn)",
  description: "Generically re-routes the ControllerAction request specified by actRequest to the active cell specified by apmBindingPath + path, or path (iff path is fully-qualified).",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        actOn: {
          ____types: "jsObject",
          coordinates: {
            ____types: ["jsString", // If a string, then the caller-supplied value must be either a fully-qualified or relative path to a cell. Or, an IRUT that resolves to a known cellProcessID.
            "jsObject" // If an object, then the caller has specified the low-level apmID, instanceName coordinates directly.
            ],
            ____defaultValue: "#",
            apmID: {
              ____accept: "jsString"
            },
            instanceName: {
              ____accept: "jsString",
              ____defaultValue: "singleton"
            }
          },
          actionRequest: {
            ____accept: "jsObject"
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____opaque: true // The response.result returned by the ControllerAction that processed the re-routed actRequest is returned w/out inspection.

  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var messageBody = request_.actionRequest.holarchy.CellProcessor.actOn;
      var coordinates = messageBody.coordinates;
      var coordinatesTypeString = Object.prototype.toString.call(coordinates);

      if ("[object String]" === coordinatesTypeString && messageBody.coordinates.startsWith("#")) {
        var ocdResponse = ObservableControllerData.dataPathResolve({
          apmBindingPath: request_.context.apmBindingPath,
          dataPath: messageBody.coordinates
        });

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        coordinates = ocdResponse.result;
      }

      var cpmLibResponse = cpmLib.resolveCellCoordinates.request({
        coordinates: coordinates,
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var targetCellPath = cpmLibResponse.result.cellPath;
      var actResponse = request_.context.act({
        actorName: "Cell Process Manager: actOn",
        actorTaskDescription: "Delegating ControllerAction request to cell at path '".concat(targetCellPath, "'."),
        actionRequest: messageBody.actionRequest,
        apmBindingPath: targetCellPath
      });

      if (actResponse.error) {
        errors.push(actResponse.error);
        break;
      }

      response.result = actResponse.result.actionResult;
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (!controllerAction.isValid()) {
  throw new Error(controllerAction.toJSON());
}

module.exports = controllerAction;