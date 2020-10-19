"use strict";

// SOURCES/LIB/holarchy/lib/intrinsics/CellProcessProxy/ControllerAction-cpp-proxy-disconnect.js
var arccore = require("@encapsule/arccore");

var ControllerAction = require("../../../ControllerAction");

var ObservableControllerData = require("../../../lib/ObservableControllerData");

var cpmLib = require("../CellProcessManager/lib");

var cppLib = require("./lib");

var action = new ControllerAction({
  id: "ySiBEGcaRGWVOZmwBRyhrA",
  name: "Cell Process Proxy: Disconnect Proxy",
  description: "Disconnect a connected cell process proxy from whatever local cell process it is currently connected to.",
  actionRequestSpec: {
    ____types: "jsObject",
    CellProcessor: {
      ____types: "jsObject",
      proxy: {
        ____types: "jsObject",
        proxyCoordinates: {
          ____label: "Cell Process Proxy Helper Cell Coordinates Variant (Optional)",
          ____accept: "jsString",
          ____defaultValue: "#"
        },
        disconnect: {
          ____accept: "jsObject"
        }
      }
    }
  },
  actionResultSpec: {
    ____accept: "jsObject" // TODO

  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var messageBody = request_.actionRequest.CellProcessor.proxy;

      if (arccore.identifier.irut.isIRUT(messageBody.proxyCoordinates).result) {
        errors.push("Cannot resolve location of the cell process proxy helper cell to link given a cell process ID!");
        break;
      }

      var ocdResponse = ObservableControllerData.dataPathResolve({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: messageBody.proxyCoordinates
      });

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var proxyHelperPath = ocdResponse.result; // This ensures we're addressing an actuall CellProcessProxy-bound cell.
      // And, get us a copy of its memory and its current connection state.

      var cppLibResponse = cppLib.getStatus.request({
        proxyHelperPath: proxyHelperPath,
        ocdi: request_.context.ocdi
      });

      if (cppLibResponse.error) {
        errors.push("Cannot locate the cell process proxy cell instance.");
        errors.push(cppLibResponse.error);
        break;
      } // Okay - we're talking to an active CellProcessProxy helper cell.


      var cppMemoryStatusDescriptor = cppLibResponse.result; // Get the CPM process' data.

      var cpmLibResponse = cpmLib.getProcessManagerData.request({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cpmDataDescriptor = cpmLibResponse.result;
      var sharedCellProcesses = cpmDataDescriptor.data.sharedCellProcesses;

      if (cppMemoryStatusDescriptor.status === "disconnected") {
        // We're already disconnected. So, there is nothing to do."
        response.result = {
          actionTaken: "noop"
        };
        break;
      }

      var proxyID = arccore.identifier.irut.fromReference(proxyHelperPath).result;

      if (!sharedCellProcesses.digraph.isVertex(proxyID)) {
        errors.push("INTERNAL ERROR: proxy disconnect action has found your proxy at path '".concat(proxyHelperPath, "' in '").concat(cppMemoryStatusDescriptor.status, "' status."));
        errors.push("But, we cannot find the expected sharedCellProcesses.digraph vertex '".concat(proxyID, "'? Please report this..."));
        break;
      }

      ocdResponse = request_.context.ocdi.writeNamespace("".concat(proxyHelperPath, ".CPPU-UPgS8eWiMap3Ixovg_private"), {}); // resets the state of the proxy cell

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      sharedCellProcesses.digraph.removeVertex(proxyID);
      cppLibResponse = cppLib.collectGarbage.request({
        act: request_.context.act,
        cpmData: cpmDataDescriptor.data,
        ocdi: request_.context.ocdi
      });

      if (cppLibResponse.error) {
        errors.push("Oh snap! An error occurred during garbage collection!");
        errors.push(cppLibResponse.error);
        break;
      }

      ocdResponse = request_.context.ocdi.writeNamespace({
        apmBindingPath: cpmDataDescriptor.path,
        dataPath: "#.sharedCellProcesses.revision"
      }, cpmDataDescriptor.data.sharedCellProcesses.revision + 1);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      response.result = {
        actionTaken: "disconnected"
      };
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (!action.isValid()) {
  throw new Error(action.toJSON());
}

module.exports = action;