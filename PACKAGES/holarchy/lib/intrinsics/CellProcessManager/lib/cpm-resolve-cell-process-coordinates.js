"use strict";

// cpm-resolve-cell-process-coordinates.js
var arccore = require("@encapsule/arccore");

var cellCoordinatesCache = require("./cpm-resolve-cell-process-coordinates-cache");

(function () {
  var factoryResponse = arccore.filter.create({
    operationID: "6qK5QrJ4Tu2kWi3HOLlbKw",
    operationName: "cpmLib: Resolve Cell Process Coordinates",
    operationDescription: "Converts variant input type into a normalized cell process coordinates descriptor object.",
    inputFilterSpec: {
      ____label: "Cell Process Coordinates Resolve Request",
      ____description: "A variant input type that is resolved to the various equivalent representations of a cell process managed by the CellProcessManager daemon.",
      ____types: "jsObject",
      coordinates: {
        ____label: "Cell Process Coordinates Variant",
        ____types: ["jsString", // Either cellProcessID or cellProcessPath.
        "jsObject" // Raw cellplane coordinate descriptor object.
        ],
        apmID: {
          ____accept: "jsString"
        },
        instanceName: {
          ____accept: "jsString",
          ____defaultValue: "singleton"
        }
      },
      ocdi: {
        ____accept: "jsObject"
      }
    },
    outputFilterSpec: {
      ____types: "jsObject",
      coordinates: {
        ____types: "jsObject",
        apmID: {
          ____accept: "jsString"
        },
        instanceName: {
          ____accept: "jsString"
        }
      },
      cellProcessesPath: {
        ____accept: "jsString"
      },
      cellProcessPath: {
        ____accept: "jsString"
      },
      cellProcessID: {
        ____accept: "jsString"
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
        var cache = cellCoordinatesCache.getCache({
          ocdi: request_.ocdi
        });
        var coordinatesTypeString = Object.prototype.toString.call(request_.coordinates);

        switch (coordinatesTypeString) {
          case "[object String]":
            if (arccore.identifier.irut.isIRUT(request_.coordinates).result) {
              // Resolve by cellProcessID.
              response.result = cache.byCellProcessID[request_.coordinates];

              if (!response.result) {
                errors.push("Unknown cellProcessID '".concat(request_.coordinates, "'."));
              }
            } else {
              // Resolve by cellProcessPath.
              // A "cell process" is entirely an abstraction implemented by the Cell Process Manager.
              // At this point we know the caller has passed a string value that is not an IRUT.
              // So, we have ruled out the possibility that the caller wishes to resolve the cell process
              // via cellProcessID. And, now conclude via elimination that if the string value is valid
              // that it has to be an OCD path that is a valid data path, a valid cell path, and a valid
              // cell process path in this CellProcessor instance. Currently, there are two possibilities:
              // 1. request_.coordinates is a previously cached cellProcessPath (i.e. the process was created via CPM activate)
              // 2. request_.coordinates is literally === "~" indicating an attempt to resolve the CPM daemon process.
              // Bias for the 99% case - we're attempting to resolve a cellProcessPath previously cached via resolving raw APM ID, instanceName coordinates.
              response.result = cache.byCellProcessPath[request_.coordinates];

              if (!response.result) {
                if (request_.coordinates !== "~") {
                  errors.push("Unknown cellProcessPath '".concat(request_.coordinates, "'."));
                  break;
                }

                if (!cellCoordinatesCache.isValidCellPath({
                  cellPath: "~",
                  ocdi: request_.ocdi
                })) {
                  throw new Error("Internal error: violation of invariant assumption.");
                }

                var cellPathDescriptor = cache.byCellPath["~"];
                response.result = cache.byCellProcessPath["~"] = {
                  coordinates: {
                    apmID: cellPathDescriptor.apmID,
                    instanceName: "daemon"
                  },
                  cellProcessesPath: "~",
                  cellProcessPath: "~",
                  instanceID: "daemon",
                  cellProcessID: cellPathDescriptor.cellPathID
                };
              }
            }

            break;

          case "[object Object]":
            // The caller has specified the raw cell process coordinates descriptor object.
            var c = request_.coordinates;

            if (cellCoordinatesCache.isValidCellProcessInstanceCoordinates({
              apmID: c.apmID,
              instanceName: c.instanceName,
              ocdi: request_.ocdi
            })) {
              response.result = cache.byCellProcessCoordinates[c.apmID].instances[c.instanceName];
            } else {
              errors.push("No activatable cell process at coordinates apmID '".concat(request_.coordinates.apmID, "' instanceName '").concat(request_.coordinates.instanceName, "."));
            }

            break;

          default:
            errors.push("Internal error: Unhandled type string case.");
            break;
        }

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

  var resolveCellProcessCoordinates = factoryResponse.result;
  module.exports = resolveCellProcessCoordinates;
})();