"use strict";

// cpm-resolve-cell-process-coordinates.js
var arccore = require("@encapsule/arccore");

var cpmGetCellProcessManagerData = require("./cpm-get-cell-process-manager-data");

var ObservableControllerData = require("../../../../lib/ObservableControllerData");

var cpmMountingNamespaceName = require("../../../filters/cpm-mounting-namespace-name"); // Shim for CPM mounting path. Eventually, we'll bind CPM to ~ and remove this entirely.


var cpmPath = "~.".concat(cpmMountingNamespaceName);

(function () {
  var cpmCache = {};

  function getMemoryMapVDID(_ref) {
    var ocdi = _ref.ocdi;
    return ocdi._private.accessFilters.read["~"].filterDescriptor.outputTypeVDID;
  }

  function getCache(_ref2) {
    var ocdi = _ref2.ocdi;
    var cpmVDID = getMemoryMapVDID({
      ocdi: ocdi
    });
    var cache = cpmCache[cpmVDID];

    if (!cache) {
      cache = cpmCache[cpmVDID] = {
        byDataPath: {},
        byCellPath: {},
        byCellProcessPath: {},
        byCellProcessCoordinates: {},
        byCellProcessID: {}
      };
    }

    return cache;
  }

  function isValidDataPath(_ref3) {
    var dataPath = _ref3.dataPath,
        ocdi = _ref3.ocdi;
    var cache = getCache({
      ocdi: ocdi
    });

    if (cache.byDataPath[dataPath]) {
      return true;
    }

    var ocdResponse = ocdi.getNamespaceSpec(dataPath);

    if (ocdResponse.error) {
      return false;
    }

    cache.byDataPath[dataPath] = {
      dataPathID: arccore.identifier.irut.fromReference(dataPath).result
    };
    return true;
  }

  function isValidCellPath(_ref4) {
    var cellPath = _ref4.cellPath,
        ocdi = _ref4.ocdi;
    var cache = getCache({
      ocdi: ocdi
    });

    if (cache.byCellPath[cellPath]) {
      return true;
    }

    if (!isValidDataPath({
      dataPath: cellPath,
      ocdi: ocdi
    })) {
      return false;
    } // TODO: Once we have addressed current issue w/proxy helper depth, we will move CPM binding to ~ and remove this shim for good.


    var queryCellPath = cellPath !== "~" ? cellPath : cpmPath;
    var ocdResponse = ocdi.getNamespaceSpec(queryCellPath);

    if (ocdResponse.error) {
      throw new Error("Internal error: invariant assumption violated.");
    }

    var namespaceSpec = ocdResponse.result;

    if (!namespaceSpec.____appdsl || !namespaceSpec.____appdsl.apm) {
      return false;
    }

    cache.byCellPath[cellPath] = {
      cellPathID: cache.byDataPath[cellPath].dataPathID,
      apmID: namespaceSpec.____appdsl.apm
    };
    return true;
  }

  function isCellProcessActivatable(_ref5) {
    var apmID = _ref5.apmID,
        ocdi = _ref5.ocdi;
    var cache = getCache({
      ocdi: ocdi
    });

    if (cache.byCellProcessCoordinates[apmID]) {
      return true;
    }

    var dataPath = "~.".concat(apmID, "_CellProcesses");

    if (!isValidDataPath({
      dataPath: dataPath,
      ocdi: ocdi
    })) {
      return false;
    }

    cache.byCellProcessCoordinates[apmID] = {
      dataPath: dataPath,
      apmID: apmID,
      instances: {}
    };
    return true;
  }

  function isValidCellProcessInstanceCoordinates(_ref6) {
    var apmID = _ref6.apmID,
        instanceName = _ref6.instanceName,
        ocdi = _ref6.ocdi;
    var cache = getCache({
      ocdi: ocdi
    });

    if (!isCellProcessActivatable({
      apmID: apmID,
      ocdi: ocdi
    })) {
      return false;
    }

    if (cache.byCellProcessCoordinates[apmID].instances[instanceName]) {
      return true;
    }

    var instanceID = arccore.identifier.irut.fromReference(instanceName).result;
    var cellProcessPath = "".concat(cache.byCellProcessCoordinates[apmID].dataPath, ".cellProcessMap.").concat(instanceID);

    if (!isValidCellPath({
      cellPath: cellProcessPath,
      ocdi: ocdi
    })) {
      return false;
    }

    var cellProcessID = cache.byCellPath[cellProcessPath].cellPathID;
    cache.byCellProcessCoordinates[apmID].instances[instanceName] = cache.byCellProcessID[cellProcessID] = cache.byCellProcessPath[cellProcessPath] = {
      coordinates: {
        apmID: apmID,
        instanceName: instanceName
      },
      cellProcessesPath: cache.byCellProcessCoordinates[apmID].dataPath,
      cellProcessPath: cellProcessPath,
      instanceID: instanceID,
      cellProcessID: cellProcessID
    };
    return true;
  }

  factoryResponse = arccore.filter.create({
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
        var cache = getCache({
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

                if (!isValidCellPath({
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

            if (isValidCellProcessInstanceCoordinates({
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
  var factoryResponse = arccore.filter.create({
    operationID: "0XCZSfBSRSuwYgeIfLHhVw",
    operationName: "cpmLib: Resolve Cell Coordindates",
    operationDescription: "Converts variant input type into a normalized cell coordinates descriptor object.",
    inputFilterSpec: {
      ____label: "Cell Coordinates Variant",
      ____types: "jsObject",
      coordinates: {
        ____label: "Cell Process Coordinates Variant",
        ____types: ["jsString", // Either cellPath or cellProcessPath or cellProcessID.
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
      cellPath: {
        ____accept: "jsString"
      },
      apmID: {
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
        var cpmLibResponse = resolveCellProcessCoordinates.request({
          coordinates: request_.coordinates,
          ocdi: request_.ocdi
        });

        if (!cpmLibResponse.error) {
          var resolvedCoordinates = cpmLibResponse.result;
          response.result = {
            cellPath: resolvedCoordinates.cellProcessPath,
            apmID: resolvedCoordinates.coordinates.apmID
          };
          break;
        }

        if (!isValidCellPath({
          cellPath: request_.coordinates,
          ocdi: request_.ocdi
        })) {
          errors.push("Invalid cellPath '".concat(request_.coordinates, "'."));
          break;
        }

        var cache = getCache({
          ocdi: request_.ocdi
        });
        response.result = {
          cellPath: request_.coordinates,
          apmID: cache.byCellPath[request_.coordinates].apmID
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

  var resolveCellCoordinates = factoryResponse.result;
  module.exports = {
    resolveCellCoordinates: resolveCellCoordinates,
    resolveCellProcessCoordinates: resolveCellProcessCoordinates
  };
})();