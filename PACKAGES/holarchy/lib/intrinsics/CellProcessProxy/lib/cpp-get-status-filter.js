"use strict";

// cpp-get-status-filter.js
var arccore = require("@encapsule/arccore");

var OCD = require("../../../../lib/ObservableControllerData");

var factoryResponse = arccore.filter.create({
  operationID: "EH_OsCUFT5eybmstGuNCyA",
  operationName: "Cell Process Proxy: Get CPP Memory & Status",
  operationDescription: "Retrieves a copy of a cell process proxy cell's OCD memory, that is returned to the caller along w/a status flag indicating the current status of this CPP cell instance.",
  inputFilterSpec: {
    ____types: "jsObject",
    proxyHelperPath: {
      ____accept: "jsString"
    },
    ocdi: {
      ____accept: "jsObject"
    }
  },
  outputFilterSpec: {
    ____types: "jsObject",
    data: {
      ____accept: "jsObject"
    },
    status: {
      ____accept: "jsString",
      ____inValueSet: ["connected", "disconnected", "broken"]
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
      var ocdResponse = request_.ocdi.getNamespaceSpec(request_.proxyHelperPath);

      if (ocdResponse.error) {
        errors.push("Unable to query status of CellProcessProxy helper cell at path '".concat(request_.proxyHelperPath, "' because this namespace is not known inside this CellProcessor instance."));
        errors.push(ocdResponse.error);
        break;
      }

      var proxyCellSpec = ocdResponse.result;

      if (!proxyCellSpec.____appdsl || !proxyCellSpec.____appdsl.apm) {
        errors.push("Unable to query status of CellProcessProxy helper cell at path '".concat(request_.proxyHelperPath, "' because this namespace is declared as data within a cell but is not itself declared as a cell (i.e. it has no app DSL APM binding annotation)."));
        break;
      }

      if (proxyCellSpec.____appdsl.apm !== "CPPU-UPgS8eWiMap3Ixovg") {
        errors.push("Unable to query status of CellProcessProxy helper cell at path '".concat(request_.proxyHelperPath, "' because this namespace is declared as a cell bound to APM ID '").concat(proxyCellSpec.____appdsl.apm, "' that is not a CellProcessProxy."));
        break;
      }

      ocdResponse = request_.ocdi.readNamespace("".concat(request_.proxyHelperPath, ".CPPU-UPgS8eWiMap3Ixovg_private"));

      if (ocdResponse.error) {
        errors.push("Unable to query status of CellProcessProxy helper cell at path '".concat(request_.proxyHelperPath, "' because the cell is not active (i.e. it does not exist currently)."));
        break;
      }

      var proxyCellMemory = ocdResponse.result;
      response.result = {
        data: proxyCellMemory,
        status: {
          "[object Undefined]": "disconnected",
          "[object Null]": "broken",
          "[object String]": "connected"
        }[Object.prototype.toString.call(proxyCellMemory.lcpConnect)]
      };
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;