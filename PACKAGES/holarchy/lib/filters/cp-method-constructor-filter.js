"use strict";

// cp-method-constructor-filter.js
var arccore = require("@encapsule/arccore");

var CellModel = require("../../CellModel");

var factoryResponse = arccore.filter.create({
  operationID: "7tYVAis3TJGjaEe-6DiKHw",
  operationName: "SoftwareCellProcessor::constructor Filter",
  operationDescription: "Filters request descriptor passed to SoftwareCellProcessor::constructor function.",
  inputFilterSpec: {
    ____label: "Software Cell Processor Descriptor",
    ____description: "A request object passed to the SoftwareCellProcessor ES6 class constructor function.",
    ____types: "jsObject",
    id: {
      ____label: "Processor ID",
      ____description: "A unique version-independent IRUT identifier used to identify this SoftwareModel.",
      ____accept: "jsString" // must be an IRUT

    },
    name: {
      ____label: "Processor Name",
      ____description: "A short name used to refer to this SoftwareCellProcessor.",
      ____accept: "jsString"
    },
    description: {
      ____label: "Processor Description",
      ____description: "A short description of this SoftwareCellProcessor's purpose and/or function.",
      ____accept: "jsString"
    },
    cellmodel: {
      ____label: "App/Service Cell Model",
      ____description: "Either a CM descriptor or equivalent CellModel ES6 class instance.",
      ____accept: "jsObject" // further processed in bodyFunction

    },
    options: {
      ____label: "Options",
      ____description: "Optional behavioral overrides and runtime settings.",
      ____types: "jsObject",
      ____defaultValue: {}
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
      var cellmodel = request_.cellmodel instanceof CellModel ? request_.cellmodel : new CellModel(request_.cellmodel);

      if (!cellmodel.isValid()) {
        errors.push("Invalid CellModel specified for constructor request path ~.cellmodel:");
        errors.push(cellmodel.toJSON());
        break;
      }

      var configResponse = cellmodel.getCMConfig({
        type: "APM"
      });

      if (configResponse.error) {
        errors.push("Unexpected internal error querying APM configuration of specified CellModel. Please report this error:");
        errors.push(configResponse.error);
      }

      var apmConfig = configResponse.result;
      var apmVariantFilterSpec = {
        ____label: "Cell Variant Descriptor",
        ____description: "Defines a single descriptor object that defines optional subnames for all registered APM's registered in CM [".concat(cellmodel.getID(), "::").concat(cellmodel.getName(), "]."),
        ____types: "jsObject",
        ____defaultValue: {}
      };

      for (var i = 0; i < apmConfig.length; i++) {
        var apm = apmConfig[i];
        var apmID = apm.getID();
        var apmName = apm.getName();
        var apmFilterName = "[".concat(apmID, "::").concat(apmName, "]");
        apmVariantFilterSpec[apm.getID()] = {
          ____label: "".concat(apmFilterName, " Wrapper"),
          ____description: "Optional wrapper descriptor for CM ".concat(apmFilterName, "."),
          ____types: ["jsUndefined", "jsObject"],
          cell: {
            ____label: "".concat(apmFilterName, " Instance"),
            ____types: "jsObject",
            ____appdsl: {
              apm: apmID // I love this means of composition...

            }
          }
        };
      }

      var cellProcessDigraphName = "[$cellmodel.getID()}::".concat(cellmodel.getName(), "] Cell Process Digraph");
      var cellProcessDigraphDescriptorSpec = {
        ____label: cellProcessDigraphName,
        ____description: "Observable digraph tracking parent/child relationships across cellular processes.",
        ____types: "jsObject",
        ____defaultValue: {},
        name: {
          ____label: "App/Service Name",
          ____accept: "jsString",
          ____defaultValue: cellProcessDigraphName
        },
        description: {
          ____label: "App/Service Description",
          ____accept: "jsString",
          ____defaultValue: "No description specified."
        },
        vlist: {
          ____label: "Process List",
          ____description: "An array of @encapsule/arccore.graph DirectedGraph vertex descriptor objects.",
          ____types: "jsArray",
          ____defaultValue: [],
          cellProcessDescriptor: {
            ____label: "Cell Process Descriptor",
            ____types: "jsObject",
            u: {
              ____label: "Cell Process ID",
              ____description: "The unique IRUT ID of the cell process.",
              ____accept: "jsString"
            },
            p: {
              ____label: "Cell Process Properties Descriptor",
              ____description: "Describes various facets of a cellular process instance.",
              ____types: "jsObject",
              cellProcess: apmVariantFilterSpec // the actual proces runtime memory runtime bound to an APM

            }
          }
        },
        elist: {
          ____label: "Process Relationships",
          ____description: "An array of parent/child process/sub-process relationships.",
          ____types: "jsArray",
          ____defaultValue: [],
          cellProcessRelationshipDescriptor: {
            ____label: "Cell Process Relationship Descriptor",
            ____description: "Tracks a specified parent cell process to child cell process relationship.",
            ____types: "jsObject",
            e: {
              ____label: "Process ID Pair",
              ____description: "A pair of cell process ID's where u is the parent and v is child cell process.",
              ____types: "jsObject",
              u: {
                ____label: "Parent Cell Process ID",
                ____description: "The unique IRUT ID of the parent cell process.",
                ____accept: "jsString"
              },
              v: {
                ____label: "Child Cell Process ID",
                ____description: " The unique IRUT ID of the child cell process.",
                ____accept: "jsString"
              }
            },
            p: {
              ____label: "Relationship Metadata",
              ____description: "A currently unused edge property.",
              ____types: "jsObject",
              ____defaultValue: {}
            }
          }
        }
      };
      var mcpID = arccore.identifier.irut.fromReference("Cell Process CellModel" + request_.id).result;
      var mcpAPMID = arccore.identifier.irut.fromReference("Cell Process AbstractProcessModel" + request_.id).result;
      var MCP = new CellModel({
        id: mcpID,
        name: request_.name,
        description: request_.description,
        apm: {
          id: mcpAPMID,
          name: "Master Cell Process (MCP)",
          description: "Manages aynchronous cellular processes executing within a CellProcessor instance.",
          ocdDataSpec: cellProcessDigraphDescriptorSpec
        },
        subcells: [cellmodel]
      });

      if (!MCP.isValid()) {
        errors.push("Unable to contruct the MasterCellProcess CellModel due to error:");
        errors.push(MCP.toJSON());
        break;
      }

      response.result = MCP;
      break;
    }

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