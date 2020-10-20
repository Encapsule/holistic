"use strict";

// cpm-resolve-cell-process-coordinates-cache.js
var arccore = require("@encapsule/arccore");

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

  module.exports = {
    getCache: getCache,
    isValidDataPath: isValidDataPath,
    isValidCellPath: isValidCellPath,
    isCellProcessActivatable: isCellProcessActivatable,
    isValidCellProcessInstanceCoordinates: isValidCellProcessInstanceCoordinates
  };
})();