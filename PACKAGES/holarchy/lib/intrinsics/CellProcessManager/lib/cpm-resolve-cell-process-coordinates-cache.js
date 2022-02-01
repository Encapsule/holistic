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
  } // If the fully-qualified (i.e. starts w/~ character) OCD path corresponds to a namespace located in the OCD's filter spec then it's a valid data path. Otherwise, it is not.


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
  } // If the fully-qualified OCD path is a valid data path and the namespace descriptor indicates an APM binding then it's also a valid cell path.


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
  } // The CellProcessManager (CPM) allocates an ObservableControllerData (OCD) namespace for every
  // AbstractProcessModel (APM) registered with the CellProcessor (CP) constructor function.


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
    }); // Determine if the specified APM is registered for use in this CellProcessor instance.

    if (!isCellProcessActivatable({
      apmID: apmID,
      ocdi: ocdi
    })) {
      return false;
    } // Determine if anyone has previously queried this specific named cell process instance.


    if (cache.byCellProcessCoordinates[apmID].instances[instanceName]) {
      return true;
    } // Convert the instanceName into an IRUT.


    var instanceID = arccore.identifier.irut.fromReference(instanceName).result; // Calcuate the apmBinding OCD path for the cell process instance.

    var cellProcessPath = "".concat(cache.byCellProcessCoordinates[apmID].dataPath, ".cellProcessMap.").concat(instanceID); // Double check that path resolves to a valid namespace in the OCD w/an associated APM binding (which we don't check here).

    if (!isValidCellPath({
      cellPath: cellProcessPath,
      ocdi: ocdi
    })) {
      return false;
    } // Retrieve the cell process ID (an IRUT hash of the data path that's a named activable cell process instance).


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