"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// cp-method-constructor-filter.js
var arccore = require("@encapsule/arccore");

var CellModel = require("../../CellModel");

var CellProcessManager = require("../intrinsics/CellProcessManager");

var HolarchyCore = require("../intrinsics/HolarchyCore");

var ObservableProcessController = require("../../lib/ObservableProcessController");

var cpmMountingNamespaceName = require("./cpm-mounting-namespace-name");

(function () {
  var filterDeclaration = {
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
        console.log("O       o O       o O       o");
        console.log("| O   o | | O   o | | O   o |");
        console.log("| | O | | | | O | | | | O | |");
        console.log("| o   O | | o   O | | o   O |");
        console.log("o       O o       O o       O");
        console.log("CellProcessor::constructor [".concat(request_.id, "::").concat(request_.name, "] enter..."));
        console.log("> Configuring a contained ObservableProcessController instance to host this specific class of cellular runtime service...");
        var cpName = "".concat(request_.name, " Service"); // Dereference the input CellModel.

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


        var cpAPMID = arccore.identifier.irut.fromReference("".concat(request_.id, "_CellProcessManager_AbstractProcessModel")).result; // Define the CellProcessor process manager process namespace in shared memory and bind our APM.
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
        var cmDescription = "Cell process mamanger provides cell process activation, deactivation, query, proxy, and memory management services for activatable cell processes in the ".concat(cpName, " cell plane.");
        var cpCM = new CellModel({
          id: cpCMID,
          name: "".concat(cpName, " Cell Process Manager (synthesized)"),
          description: cmDescription,
          apm: {
            id: cpAPMID,
            name: "".concat(cpName, " Cell Process Manager (synthesized)"),
            description: cmDescription,
            ocdDataSpec: {
              ____label: "Cell Process Manager",
              ____description: "Namespace reserved for storage of root cell process manager data structures. Access this information only via ControllerActions and TransitionOperators.",
              ____types: "jsObject",
              ____defaultValue: {},
              ownedCellProcesses: {
                ____label: "Owned Cell Processes Data",
                ____description: "Data used by the CPM to track and manage the lifespan of cell processes tree created & destroyed w/the CPM process create & delete actions respectively.",
                ____types: "jsObject",
                ____defaultValue: {},
                revision: {
                  ____label: "Owned Cell Processes Data Revision",
                  ____description: "A monotonically-increasing counter value that is incremented every time a cell process is created or deleted via ControllerAction call.",
                  ____accept: "jsNumber",
                  ____defaultValue: 0
                },
                digraph: {
                  ____label: "Owned Cell Processes Data Model",
                  ____description: "A deserialized @encapsule/arccore.graph DirectedGraph class instance leveraged by the cell process manager action interface.",
                  ____accept: ["jsUndefined", "jsObject"]
                }
              },
              // ownedCellProcesses
              sharedCellProcesses: {
                ____label: "Shared Cell Processes Data",
                ____description: "Data used by the CPM to track and manage the lifespan of reference-counted, shared, cell processes accessed via embedded helper cells that function as local in-cell-process proxies to other cell process(es).",
                ____types: "jsObject",
                ____defaultValue: {},
                revision: {
                  ____label: "Shared Cell Processes Data Revision",
                  ____description: "A monotonically-increasing counter value that is incremented every time a shared cell process is created or deleted via ControllerAction call.",
                  ____accept: "jsNumber",
                  ____defaultValue: 0
                },
                digraph: {
                  ____label: "Shared Cell Processes Data Model",
                  ____description: "A deserialized @encapsule/arccore.graph DirectedGraph class instance leveraged by the cell process manager action interface.",
                  ____accept: ["jsUndefined", "jsObject"]
                }
              } // sharedCellProcesses

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
                    CellProcessor: {
                      _private: {
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
          operators: CellProcessManager.operators,
          subcells: [].concat(_toConsumableArray(CellProcessManager.subcells), [HolarchyCore, request_.cellmodel])
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
          name: "".concat(cpName, " ObservableProcessController"),
          description: "Provides generic shared memory and runtime evaluation services for cell process service '".concat(cpName, "'."),
          ocdTemplateSpec: ocdTemplateSpec,
          abstractProcessModelSets: [opcConfig.apm],
          transitionOperatorSets: [opcConfig.top],
          controllerActionSets: [opcConfig.act]
        });

        if (!cpOPC.isValid()) {
          errors.push(JSON.stringify(cpOPC));
          break;
        } // v0.0.62-titanite --- Let's see what happens if we fail CellProcessor instance construction iff there are any OPC construction warnings (missing APM registrations are difficult to diagnose in terms of failed ACT/TOP calls).
        // TODO: This should be a construction-time policy option and not hard-coded behavior probably. Then a service class can expose the option, and we can make it simpler for developers to disable the checks if they really want to dive in.
        // If you're staring at this comment and think "that's exactly what I need right now" let me know and I'll add it. Otherwise moving on for now; primarily dropping this in here to prevent myself from wasting time
        // in the debugger on things that are merely APM registration typos as opposed to bugs in CellModelArtifactSpace, CellModelTemplate, or one of the derived CellModel generator filters...
        // 2nd-thought: LET'S NOT DO THIS HERE. IT'S THE WRONG LAYER.

        /*
        if (cpOPC._private.constructionWarnings && cpOPC._private.constructionWarnings.length) {
            errors.push("Warnings were reported during construction of this CellProcessor instance's contained ObservableProcessController that indicate the cellplane could not be configured as declared in your service CellModel definition:");
            cpOPC._private.constructionWarnings.forEach((warning_) => { errors.push(warning_); });
            break;
        }
        */


        response.result = {
          cm: cpCM,
          opc: cpOPC
        }; // Wow...

        break;
      } // end while


      if (errors.length) {
        errors.unshift("Cannot construct CellProcessor due to error:");
        response.error = errors.join(" ");
      }

      if (!response.error) {
        console.log("> ObservableProcessController instance initialized.");
        console.log("> CellProcessor cell runtime plane has been initialized and is ready for action(s).");
        console.log("CellProcessor::constructor [".concat(request_.id, "::").concat(request_.name, "] exit."));
        console.log("O       o O       o O       o");
        console.log("| O   o | | O   o | | O   o |");
        console.log("| | O | | | | O | | | | O | |");
        console.log("| o   O | | o   O | | o   O |");
        console.log("o       O o       O o       O");
        console.log("\n\n");
      } else {
        console.log("> CellProcessor instance initialization FAILED.");
        console.log("> All subsequent calls to methods on this instance will return an response.error.");
        console.log("CellProcessor::constructor [".concat(request_.id, "::").concat(request_.name, "] exit."));
        console.error(response.error);
      }

      return response;
    }
  }; // filterDeclaration

  var factoryResponse = arccore.filter.create(filterDeclaration);

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();