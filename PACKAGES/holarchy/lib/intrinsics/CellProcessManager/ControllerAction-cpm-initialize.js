"use strict";

// SOURCES/LIB/holarchy/lib/intrinsics/ControllerAction-cpm-initialize.js
var arccore = require("@encapsule/arccore");

var ControllerAction = require("../../../ControllerAction");

var cpmMountingNamespaceName = require("../../filters/cpm-mounting-namespace-name");

var cpmLib = require("./lib");

var controllerAction = new ControllerAction({
  id: "VNaA0AMsTXawb32xLaNGTA",
  name: "Cell Process Manager: Initialize",
  description: "Performs initialization of Cell Process Manager cell process (the root and parent process of all cell processes executing in a CellProcess runtime host instance).",
  actionRequestSpec: {
    ____types: "jsObject",
    CellProcessor: {
      ____types: "jsObject",
      _private: {
        ____types: "jsObject",
        initialize: {
          ____types: "jsObject",
          options: {
            ____accept: ["jsUndefined", "jsObject"]
          }
        }
      }
    }
  },
  // actionRequestSpec
  actionResultSpec: {
    ____accept: "jsString",
    ____defaultValue: "okay"
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      console.log("Cell Process Manager process initializing..."); // const messageBody = request_.actionRequest.CellProcessor._private.initialize;

      var cpmLibResponse = cpmLib.getProcessManagerData.request({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cpmDataDescriptor = cpmLibResponse.result;
      var graphFactoryResponse = arccore.graph.directed.create(cpmDataDescriptor.data.ownedCellProcesses.digraph ? cpmDataDescriptor.data.ownedCellProcesses.digraph : {
        name: "Owned Cell Processes Tree Model",
        description: "Tracks parent/child relationships between dynamically created cellular processes executing within a CellProcessor runtime host instance.",
        vlist: [{
          u: arccore.identifier.irut.fromReference("~").result,
          p: {
            apmBindingPath: "~",
            name: "Cell Process Manager"
          }
        }]
      });

      if (graphFactoryResponse.error) {
        errors.push(graphFactoryResponse.error);
        break;
      }

      cpmDataDescriptor.data.ownedCellProcesses.digraph = graphFactoryResponse.result;
      graphFactoryResponse = arccore.graph.directed.create(cpmDataDescriptor.data.sharedCellProcesses.digraph ? cpmDataDescriptor.data.sharedCellProcesses.digraph : {
        name: "Shared Cell Processes Digraph Model",
        description: "Tracks reference-counted relationships between shared cell processes and embedded worker cell processes."
      });

      if (graphFactoryResponse.error) {
        errors.push(graphFactoryResponse.error);
        break;
      }

      cpmDataDescriptor.data.sharedCellProcesses.digraph = graphFactoryResponse.result;
      var ocdResponse = request_.context.ocdi.writeNamespace(cpmDataDescriptor.path, cpmDataDescriptor.data);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  } // bodyFunction

});

if (!controllerAction.isValid()) {
  throw new Error(controllerAction.toJSON());
}

module.exports = controllerAction;