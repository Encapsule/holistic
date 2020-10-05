"use strict";

// SOURCES/LIB/holarchy/lib/intrinsics/CellProcessProxy/ControllerAction-cpp-proxy-disconnect.js
var arccore = require("@encapsule/arccore");

var ControllerAction = require("../../../ControllerAction");

var OCD = require("../../../lib/ObservableControllerData");

var cpmLib = require("../CellProcessManager/lib");

var cppLib = require("./lib");

var action = new ControllerAction({
  id: "ySiBEGcaRGWVOZmwBRyhrA",
  name: "Cell Process Proxy: Disconnect Proxy",
  description: "Disconnect a connected cell process proxy from whatever local cell process it is currently connected to.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessProxy: {
        ____types: "jsObject",
        disconnect: {
          ____types: "jsObject",
          // Disconnect this cell process proxy process instance...
          proxyPath: {
            ____accept: "jsString",
            ____defaultValue: "#"
          } // ... from the local cell process that the proxy is connected to.

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
      var message = request_.actionRequest.holarchy.CellProcessProxy.disconnect; // Get the CPM process' data.

      var cpmLibResponse = cpmLib.getProcessManagerData.request({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cpmDataDescriptor = cpmLibResponse.result;
      var sharedCellProcesses = cpmDataDescriptor.data.sharedCellProcesses; // This ensures we're addressing an actuall CellProcessProxy-bound cell.
      // And, get us a copy of its memory and its current connection state.

      var cppLibResponse = cppLib.getStatus.request({
        apmBindingPath: request_.context.apmBindingPath,
        proxyPath: message.proxyPath,
        ocdi: request_.context.ocdi
      });

      if (cppLibResponse.error) {
        errors.push("Cannot locate the cell process proxy cell instance.");
        errors.push(cppLibResponse.error);
        break;
      }

      var cppMemoryStatusDescriptor = cppLibResponse.result;

      if (cppMemoryStatusDescriptor.status === "disconnected") {
        // We're already disconnected. So, this is a noop.
        response.result = {
          actionTaken: "noop"
        };
        break;
      }

      var proxyPath = cppMemoryStatusDescriptor.paths.resolvedPath;
      var proxyID = arccore.identifier.irut.fromReference(proxyPath).result;

      if (!sharedCellProcesses.digraph.isVertex(proxyID)) {
        errors.push("INTERNAL ERROR: proxy disconnect action has found your proxy at path '".concat(proxyPath, "' in '").concat(cppMemoryStatusDescriptor.status, "' status."));
        errors.push("But, we cannot find the expected sharedCellProcesses.digraph vertex '".concat(proxtID, "'? Please report this..."));
        break;
      }

      var ocdResponse = request_.context.ocdi.writeNamespace(proxyPath, {}); // resets the state of the proxy cell

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