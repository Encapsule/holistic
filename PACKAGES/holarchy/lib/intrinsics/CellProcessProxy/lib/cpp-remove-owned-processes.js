"use strict";

// cpp-remove-owned-processes.js
var arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
  operationID: "4UFmQUodTzmEvkGpJXufNg",
  operationName: "Cell Process Proxy: Remove Owned Processes",
  operationDescription: "When a cell process is created via CPM process create it is dynamically allocated as an owned cell process and tracked in the parent/child process tree. It may never be deleted by connecting and disconnecting cell process proxies. Rather, it must always be deleted directly via CPM process delete. Or, indirectly via CPM process delete of a member of the owned process' ancestor set (that deletes the entire branch of processes from the CPM's parent/child process tree. But, when owned cell processes are deleted so too are any cell process proxy helper instances they may own. So we need to reflect the removal of owned process tree branches via CPM process delete into the shared cell process digraph and then run a GC cycle to (a) potentially release now unneeded shared processes (b) break open proxy connections that were previously established to owned cell processes on the removed owned process tree branch.",
  inputFilterSpec: {
    ____types: "jsObject",
    cpmData: {
      ____accept: "jsObject"
    },
    deletedOwnedCellProcesses: {
      ____types: "jsArray",
      processID: {
        ____accept: "jsString"
      }
    }
  },
  outputFilterSpec: {
    ____types: "jsObject",
    ____defaultValue: {},
    runGarbageCollector: {
      ____accept: "jsBoolean",
      ____defaultValue: false
    }
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      inBreakScope = true;
      var sharedDigraph = request_.cpmData.sharedCellProcesses.digraph;
      var runGarbageCollector = false;

      while (request_.deletedOwnedCellProcesses.length) {
        // We actually do not care if these process ID's are present in the owned process digraph or not.
        // They are as good as dead to us in terms of managing reference counts on shared processes.
        var deleteProcessID = request_.deletedOwnedCellProcesses.pop();

        if (sharedDigraph.isVertex(deleteProcessID)) {
          // We are tracking this owned process in the shared process digraph.
          var outEdges = sharedDigraph.outEdges(deleteProcessID); // these are proxy helper cells
          // Deleting an owned process deletes its owned proxy helpers by definition.

          outEdges.forEach(function (outEdge_) {
            sharedDigraph.removeVertex(outEdge_.v); // proxy helper cell
          });
          sharedDigraph.removeVertex(deleteProcessID);
          runGarbageCollector = true;
        }
      }

      response.result = {
        runGarbageCollector: runGarbageCollector
      };
      return "break";
    };

    while (!inBreakScope) {
      var _ret = _loop();

      if (_ret === "break") break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  } //

});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;