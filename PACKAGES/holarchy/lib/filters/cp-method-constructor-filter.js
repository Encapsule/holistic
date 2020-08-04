"use strict";

// cp-method-constructor-filter.js
var arccore = require("@encapsule/arccore");

var CellModel = require("../../CellModel");

var CellProcessorIntrinsics = require("../intrinsics/CellProcessor");

var HolarchyCore = require("../intrinsics/HolarchyCore");

var ObservableProcessController = require("../../lib/ObservableProcessController");

var cpmMountingNamespaceName = require("./cpm-mounting-namespace-name");

var factoryResponse = arccore.filter.create({
  operationID: "7tYVAis3TJGjaEe-6DiKHw",
  operationName: "CellProcessor::constructor Filter",
  operationDescription: "Encapsulates the construction-time operations required to initialize a CellProcessor cellular process runtime host environment.",
  inputFilterSpec: require("./iospecs/cp-method-constructor-input-spec"),
  outputFilterSpec: require("./iospecs/cp-method-constructor-output-spec"),
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var cpName = "[".concat(request_.id, "::").concat(request_.name, "]"); // Dereference the input CellModel.

      var cellmodel = request_.cellmodel instanceof CellModel ? request_.cellmodel : new CellModel(request_.cellmodel);

      if (!cellmodel.isValid()) {
        errors.push("Invalid CellModel specified for constructor request path ~.cellmodel:");
        errors.push(JSON.stringify(cellmodel));
        break;
      } // Extract a list of the AbstractProcessModel's registered in this CellModel.


      var configResponse = cellmodel.getCMConfig({
        type: "APM"
      });

      if (configResponse.error) {
        errors.push("Unexpected internal error querying APM configuration of specified CellModel. Please report this error:");
        errors.push(configResponse.error);
      }

      var apmConfig = configResponse.result; // Synthesize the Cell Process Manager OCD filter specification.

      var ocdTemplateSpec = {
        ____types: "jsObject"
      };
      ocdTemplateSpec[cpmMountingNamespaceName] = {}; // The Cell Process Manager manages some number of subcell processes.
      // Here we allocate a prescriptively-named map of process instances for each Abstract Process Model (APM)
      // discovered in the in the input CellModel instance.

      for (var i = 0; i < apmConfig.length; i++) {
        var apm = apmConfig[i];
        var apmID = apm.getID();
        var apmName = apm.getName();
        var apmDescription = apm.getDescription();
        var apmFilterName = "[".concat(apmID, "::").concat(apmName, "]");
        var apmProcessesNamespace = "".concat(apmID, "_CellProcesses");
        ocdTemplateSpec[apmProcessesNamespace] = {
          ____label: "".concat(apmFilterName, " Cell Processes Map"),
          ____description: "A map of ".concat(apmFilterName, " process instances by process ID that are managed by the CellProcessor (~) runtime host instance."),
          ____types: "jsObject",
          ____asMap: true,
          ____defaultValue: {},
          cellProcessID: {
            ____label: "".concat(apmFilterName, " Cell Process Instance"),
            ____description: "Cell process instance memory for ".concat(apmFilterName, ": ").concat(apmDescription),
            ____types: "jsObject",
            ____appdsl: {
              apm: apmID
            } // <3 <3 <3

          }
        };
      } // end for apmConfig.length
      // Now create a new CellModel for the Cell Process Managager.


      var cpCMID = arccore.identifier.irut.fromReference("".concat(request_.id, "_CellProcessor_CellModel")).result;
      var cpAPMID = arccore.identifier.irut.fromReference("".concat(request_.id, "_CellProcess_AbstractProcessModel")).result;
      var cpCM = new CellModel({
        id: cpCMID,
        name: "".concat(cpName, " Cell Processor"),
        description: "Manages the lifespan of cell processes executing in the ".concat(cpName, " CellProcessor runtime host instance."),
        apm: {
          id: cpAPMID,
          name: "".concat(cpName, " Cell Process Manager"),
          description: "Defines shared memory and stateful behaviors for ".concat(cpName, " CellProcessor runtime host instance."),
          ocdDataSpec: {
            ____types: "jsObject",
            ____defaultValue: {},
            cellProcessDigraph: {
              ____types: "jsObject",
              ____defaultValue: {},
              runtime: {
                ____accept: ["jsUndefined", "jsObject"]
              },
              serialized: {
                ____accept: ["jsUndefined", "jsObject"]
              }
            }
          },
          steps: {
            uninitialized: {
              description: "Default starting step of a cell process.",
              transitions: [{
                transitionIf: {
                  always: true
                },
                nextStep: "initializing"
              }]
            },
            initializing: {
              description: "CellProcessor manager process is initializing.",
              transitions: [{
                transitionIf: {
                  always: true
                },
                nextStep: "ready"
              }],
              actions: {
                enter: [{
                  holarchy: {
                    CellProcessor: {
                      initialize: {}
                    }
                  }
                }]
              }
            },
            ready: {
              description: "CellProcessor manager process is ready to accept commands and queries."
            }
          }
        },
        actions: CellProcessorIntrinsics.actions,
        subcells: [HolarchyCore, request_.cellmodel]
      });

      if (!cpCM.isValid()) {
        errors.push(JSON.stringify(cpCM));
        break;
      }

      ocdTemplateSpec["x7pM9bwcReupSRh0fcYTgw_CellProcessor"] = {
        ____types: "jsObject",
        ____defaultValue: {},
        ____appdsl: {
          apm: cpAPMID
        }
      }; // Now instantiate an ObservableProcessController runtime host instance using configuration derived from the Cell Processor's model.

      var innerResponse = void 0;
      innerResponse = cpCM.getCMConfig({
        type: "APM"
      });

      if (innerResponse.error) {
        errors.push(InnerResponse.errror);
        break;
      }

      var cpFinalAPM = innerResponse.result;
      innerResponse = cpCM.getCMConfig({
        type: "TOP"
      });

      if (innerResponse.error) {
        errors.push(InnerResponse.errror);
        break;
      }

      var cpFinalTOP = innerResponse.result;
      innerResponse = cpCM.getCMConfig({
        type: "ACT"
      });

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      var cpFinalACT = innerResponse.result;
      var cpOPC = new ObservableProcessController({
        id: arccore.identifier.irut.fromReference("".concat(request_.id, "_CellProcessor_ObservableProcessController")).result,
        name: "".concat(cpName, " Observable Process Controller"),
        description: "Provides shared memory and runtime automata process orchestration for ".concat(cpName, " CellProcessor-resident cell processes."),
        ocdTemplateSpec: ocdTemplateSpec,
        abstractProcessModelSets: [cpFinalAPM],
        transitionOperatorSets: [cpFinalTOP],
        controllerActionSets: [cpFinalACT]
      });

      if (!cpOPC.isValid()) {
        errors.push(JSON.stringify(cpOPC));
        break;
      }

      response.result = {
        cm: cpCM,
        opc: cpOPC
      };
      break;
    } // end while


    if (errors.length) {
      errors.unshift("Cannot construct CellProcessor due to error:");
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;