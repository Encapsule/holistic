"use strict";

// cpp-run-shared-processes-garbage-collector.js
var arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
  operationID: "GCPRxmA6TYSxEyKRsjLVKg",
  operationName: "Cell Process Proxy: Garbage Collector",
  operationDescription: "When owned cell processes are deleted and when connections to shared cell processes are disconnected, the shared process digraph must be rebalanced. And, shared processes that no longer have connected proxies should be removed from the cell process manager's process tree (what we call the owned cell processes digraph).",
  inputFilterSpec: {
    ____types: "jsObject",
    cpmData: {
      ____accept: "jsObject"
    },
    ocdi: {
      ____accept: "jsObject"
    },
    act: {
      ____accept: "jsFunction"
    }
  },
  outputFilterSpec: {
    ____opaque: true // TODO

  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      inBreakScope = true;
      var ownedDigraph = request_.cpmData.ownedCellProcesses.digraph;
      var sharedDigraph = request_.cpmData.sharedCellProcesses.digraph;
      var gcContinue = true;

      var _loop2 = function _loop2() {
        gcContinue = false; // Examine all the root vertices in the shared processes digraph.

        var rootVertices = sharedDigraph.getRootVertices();
        var leafVertices = sharedDigraph.getLeafVertices();
        var verticesToRemove = [];
        var sharedProcessesToDelete = [];
        var inBreakScope2 = false;

        var _loop3 = function _loop3() {
          inBreakScope2 = true; // ****************************************************************
          // ****************************************************************
          // ****************************************************************
          // Analyze the current root vertex set.

          while (rootVertices.length) {
            var examineVertex = rootVertices.pop();
            var examineVertexProp = sharedDigraph.getVertexProperty(examineVertex);

            switch (examineVertexProp.role) {
              case "owned-proxy":
              case "shared-proxy":
                // A helper cell that has reached the root has, by definition, no cell process proxies connected to it.
                verticesToRemove.push(examineVertex);
                break;

              case "owned":
                // A cell that is a process that is owned that has reached the root is an owned process that has no cell process proxies connected to it.
                // However, it may be an owned process that hosts proxy(ies) that are connected to other cell processes.
                // So, in this case the owned process vertex w/zero in-degree represents an owned process that is possibly
                // holding references to other owned and shared processes. To determine if this is the case, we have to count
                // its out-edges.
                if (!sharedDigraph.outDegree(examineVertex)) {
                  // Okay. So this vertex represents an owned cell process that is itself hosting no connected cell process proxy instances at the moment.
                  // So, we no longer need to track it in the sharedCellProcesses.digraph.
                  verticesToRemove.push(examineVertex);
                }

                break;

              case "shared":
                // A cell that is a process that is shared that has reached the root has no connected cell process proxies. And, it represents the allocation
                // of a special-owned cell process that is reference counted by this mechanism.
                sharedProcessesToDelete.push(examineVertex);
                break;

              default:
                errors.push("Unexpected shared process role value '".concat(examineVertexProp.role, "'."));
                break;
            }

            if (errors.length) {
              break;
            }
          } // while examine all current root vertices


          if (errors.length) {
            return "break";
          }

          gcContinue = verticesToRemove.length + sharedProcessesToDelete.length > 0;

          if (gcContinue) {
            return "continue";
          } // ****************************************************************
          // ****************************************************************
          // ****************************************************************
          // Analyze the current leaf vertex set.


          while (leafVertices.length) {
            var _examineVertex = leafVertices.pop();

            var _examineVertexProp = sharedDigraph.getVertexProperty(_examineVertex);

            switch (_examineVertexProp.role) {
              case "owned-proxy":
              case "shared-proxy":
                // Any proxy that's in the shared digraph indicates that that proxy helper cell thinks its connected.
                // The fact that it's now a leaf vertex indicates that it's no longer connected. This may actually
                // only occur when the connection was from a proxy cell to an owned cell process that has been deleted.
                // So, we want to update the cell process proxy helper cell's state (put it in broken state), and then
                // we want to remove the proxy vertex as we only allow connected proxies in the shared digraph.
                var ocdResponse = request_.ocdi.writeNamespace({
                  apmBindingPath: _examineVertexProp.apmBindingPath,
                  dataPath: "#.CPPU-UPgS8eWiMap3Ixovg_private.lcpConnect"
                }, null);

                if (ocdResponse.error) {
                  errors.push(ocdResponse.error);
                  break;
                }

                verticesToRemove.push(_examineVertex);
                break;

              case "owned":
              case "shared":
                break;

              default:
                errors.push("Unexpected shared process role value '".concat(_examineVertexProp.role, "'."));
                break;
            }

            if (errors.length) {
              break;
            }
          }

          if (errors.length) {
            return "break";
          }

          gcContinue = verticesToRemove.length + sharedProcessesToDelete.length > 0;

          if (gcContinue) {
            return "continue";
          } // ****************************************************************
          // ****************************************************************
          // ****************************************************************
          // Find self-referential clusters of shared processes w/no connected proxies from any owned processes.


          var ownedProcessVertices = [];
          sharedDigraph.getVertices().forEach(function (vertex_) {
            if (sharedDigraph.getVertexProperty(vertex_).role === "owned") {
              ownedProcessVertices.push(vertex_);
            }
          });
          var digraphTraversalResponse = arccore.graph.directed.breadthFirstTraverse({
            digraph: sharedDigraph,
            options: {
              startVector: ownedProcessVertices,
              allowEmptyStartVector: true
            },
            visitor: {}
          });

          if (digraphTraversalResponse.error) {
            errors.push(digraphTraversalResponse.error);
            return "break";
          }

          if (digraphTraversalResponse.result.searchStatus !== "completed") {
            errors.push("Internal validation error performing shared process cluster identification. Breadth fist search did not complete as expected.");
            return "break";
          }

          var undiscoveredVertices = Object.keys(digraphTraversalResponse.result.undiscoveredMap);

          while (undiscoveredVertices.length) {
            var _examineVertex2 = undiscoveredVertices.pop();

            var _examineVertexProp2 = sharedDigraph.getVertexProperty(_examineVertex2);

            if (_examineVertexProp2.role === "shared") {
              sharedProcessesToDelete.push(_examineVertex2);
            }
          }

          gcContinue = verticesToRemove.length + sharedProcessesToDelete.length > 0;
          return "break";
        };

        while (!inBreakScope2) {
          var _ret3 = _loop3();

          if (_ret3 === "break") break;
          if (_ret3 === "continue") continue;
        } // while (!inExamineScope)
        // ****************************************************************
        // ****************************************************************
        // ****************************************************************
        // Recycle the cells.


        while (sharedProcessesToDelete.length) {
          var deleteProcessID = sharedProcessesToDelete.pop();
          var outEdges = sharedDigraph.outEdges(deleteProcessID);
          outEdges.forEach(function (edge_) {
            verticesToRemove.push(edge_.v);
          });
          sharedDigraph.removeVertex(deleteProcessID);
          var actResponse = request_.act({
            actorName: "Cell Process Proxy: Garbage Collector",
            actorTaskDescription: "Deleting unreferenced shared cell process.",
            actionRequest: {
              CellProcessor: {
                process: {
                  deactivate: {},
                  processCoordinates: deleteProcessID
                }
              }
            }
          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }
        }

        if (errors.length) {
          return "break";
        } // Take out the trash.


        while (verticesToRemove.length) {
          sharedDigraph.removeVertex(verticesToRemove.pop());
        } // Now, depending on gcContinue take another pass on the revised CPM digraphs.

      };

      while (gcContinue) {
        var _ret2 = _loop2();

        if (_ret2 === "break") break;
      } // end while gcContinue


      if (errors.length) {
        return "break";
      }

      return "break";
    };

    while (!inBreakScope) {
      var _ret = _loop();

      if (_ret === "break") break;
    } // end while !inBreakScope


    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;