"use strict";

// cp-method-constructor-filter.js
var arccore = require("@encapsule/arccore");

var CellModel = require("../../CellModel");

var CellProcessManager = require("../intrinsics/CellProcessManager");

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

      var apmConfig = configResponse.result; // Synthesize the filter specification to be used to configure the ObservableProcessController's shared memory ObservableControllerData store for this CellProcess instance.

      var ocdTemplateSpec = {
        ____types: "jsObject"
      }; // The Cell Process Manager manages some number of subcell processes.
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
          ____label: "".concat(apmFilterName, " Cell Processes Memory"),
          ____description: "Shared cell process memory for cell processes bound to AbstractProcessModel ".concat(apmFilterName, "."),
          ____types: "jsObject",
          ____defaultValue: {},
          cellProcessMap: {
            ____label: "".concat(apmFilterName, " Cell Process Map"),
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
          },
          revision: {
            ____accept: "jsNumber",
            ____defaultValue: 0
          }
        };
      } // end for apmConfig.length


      var cpAPMID = arccore.identifier.irut.fromReference("".concat(request_.id, "_CellProcess_AbstractProcessModel")).result; // Define the CellProcessor process manager process namespace in shared memory and bound our APM.
      // Note that we specifiy a default value here ensuring that the process manager cell process is
      // always started automatically whenever a CellProcess instance is constructed.

      ocdTemplateSpec[cpmMountingNamespaceName] = {
        ____types: "jsObject",
        ____defaultValue: {},
        ____appdsl: {
          apm: cpAPMID
        }
      }; // Now create a new CellModel for the Cell Process Managager that will manage the data in the cpmMountingNamespaceName namespace.

      var cpCMID = arccore.identifier.irut.fromReference("".concat(request_.id, "_CellProcessor_CellModel")).result;
      var cpCM = new CellModel({
        id: cpCMID,
        name: "Cell Process Manager ".concat(cpName, " Model"),
        description: "Cell process manager root process for CellProcessor ".concat(cpName, "."),
        apm: {
          id: cpAPMID,
          name: "Cell Process Manager ".concat(cpName),
          description: "Cell process manager root process for CellProcessor ".concat(cpName, "."),
          ocdDataSpec: {
            ____label: "Cell Process Manager",
            ____description: "Namespace reserved for storage of root cell process manager data structures. Access this information only via ControllerActions and TransitionOperators.",
            ____types: "jsObject",
            ____defaultValue: {},
            cellProcessTree: {
              ____label: "Cell Process Tree",
              ____description: "An @encapsule/arccore.graph DirectedGraph object used to keep track of the cell process tree.",
              ____types: "jsObject",
              ____defaultValue: {},
              revision: {
                ____label: "Cell Process Tree Revision",
                ____description: "A monotonically-increasing counter value that is incremented every time a cell process is created or deleted via ControllerAction call.",
                ____accept: "jsNumber",
                ____defaultValue: 0
              },
              digraph: {
                ____label: "Cell Process Runtime Model",
                ____description: "A deserialized @encapsule/arccore.graph DirectedGraph class instance leveraged by the cell process manager action interface.",
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
        actions: CellProcessManager.actions,
        subcells: [HolarchyCore, request_.cellmodel]
      });

      if (!cpCM.isValid()) {
        errors.push(JSON.stringify(cpCM));
        break;
      } // Extract all the flattened artifact registrations from the synthesized Cell Process Manager CellModel
      // that are required to configure an ObservableProcessController runtime host instance to actually
      // execute all the cell processes created from all the CellModel APM's...


      configResponse = cpCM.getCMConfig();

      if (configResponse.error) {
        errors.push(configResponse.error);
        break;
      }

      var opcConfig = configResponse.result; // Now instantiate an ObservableProcessController runtime host instance using configuration derived from the Cell Processor's model.

      var cpOPC = new ObservableProcessController({
        id: arccore.identifier.irut.fromReference("".concat(request_.id, "_CellProcessor_ObservableProcessController")).result,
        name: "".concat(cpName, " Observable Process Controller"),
        description: "Provides shared memory and runtime automata process orchestration for ".concat(cpName, " CellProcessor-resident cell processes."),
        ocdTemplateSpec: ocdTemplateSpec,
        abstractProcessModelSets: [opcConfig.apm],
        transitionOperatorSets: [opcConfig.top],
        controllerActionSets: [opcConfig.act]
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