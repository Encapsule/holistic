"use strict";

// SOURCES/LIB/holarchy/lib/intrinsics/CellProcessProxy/ControllerAction-cpp-proxy-connect.js
var arccore = require("@encapsule/arccore");

var ControllerAction = require("../../../ControllerAction");

var OCD = require("../../../lib/ObservableControllerData");

var cpmLib = require("../CellProcessManager/lib");

var cppLib = require("./lib");

var action = new ControllerAction({
  id: "X6ck_Bo4RmWTVHl-vk-urw",
  name: "Cell Process Proxy: Connect Proxy",
  description: "Disconnect a connected cell process proxy process (if connected). And, connect the proxy to the specified local cell process.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessProxy: {
        ____types: "jsObject",
        connect: {
          ____types: "jsObject",
          // Connect from this proxy process (a helper cell process)...
          proxyPath: {
            ____accept: "jsString",
            ____defaultValue: "#"
          },
          // ... to this new or existing local cell process.
          localCellProcess: {
            ____types: "jsObject",
            apmID: {
              ____accept: "jsString"
            },
            instanceName: {
              ____accept: "jsString",
              ____defaultValue: "singleton"
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____accept: "jsObject" // TODO

  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var runGarbageCollector = false;
      var message = request_.actionRequest.holarchy.CellProcessProxy.connect; // Get the CPM process' data.

      var cpmLibResponse = cpmLib.getProcessManagerData.request({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cpmDataDescriptor = cpmLibResponse.result;
      var thisCellProcessID = arccore.identifier.irut.fromReference(request_.context.apmBindingPath).result; // TODO:
      // I think it's useful to remove this restriction in the future and allow any cell process to assert itself as the owner of the proxy.
      // Because, it actually may really be the owner of the proxy despite not being more than a helper cell process itself.
      // Note, that there's a similar nuanced restriction that applies to calling CPM process create from a worker cell process step action.
      // Where apmBindingPath is required to be a the path to an active owned cell process that is assigned as the single parent (owner) of
      // of every owned cell process (child) created w/CPM process create.

      if (!cpmDataDescriptor.data.ownedCellProcesses.digraph.isVertex(thisCellProcessID)) {
        errors.push("Invalid apmBindingPath value '".concat(request_.context.apmBindingPath, "' does not resolve to an active worker or shared cell process."));
        break;
      } // This ensures we're addressing an actuall CellProcessProxy-bound cell.
      // And, get us a copy of its memory and its current connection state.


      var cppLibResponse = cppLib.getStatus.request({
        apmBindingPath: request_.context.apmBindingPath,
        proxyPath: message.proxyPath,
        ocdi: request_.context.ocdi
      });

      if (cppLibResponse.error) {
        errors.push("Cannot locate the cell process proxy cell instance.");
        errors.push(cppLibResponse.error);
        break;
      }

      var cppMemoryStatusDescriptor = cppLibResponse.result;
      var proxyPath = cppMemoryStatusDescriptor.paths.resolvedPath;

      if (!proxyPath.startsWith(request_.context.apmBindingPath)) {
        errors.push("Invalid proxyPath value '".concat(message.proxyPath, "' resolves to an apmBindingPath value '").concat(proxyPath, "' that is outside of the proxy owner process' cell memory space!"));
        break;
      } // At this point we know / are confident of the following:
      //
      // - We know which existing owned (i.e. allocated w/CPM process create) OR shared (i.e. allocated w/CPM process open)
      // cell process will OWN (i.e. will hold, by proxy in this example) a reference to another local owned or shared cell process.
      // - We are confident that relative to the owner we can access the specified cell process proxy helper cell. And, that it is actually
      // bound to the CellProcessProxy APM etc.
      //
      // However, we do not yet know anything yet about the local cell process that the caller wishes to connect to via the proxy instance. So, we look at that next.


      var lcpBindingPath = "~.".concat(message.localCellProcess.apmID, "_CellProcesses.cellProcessMap.").concat(arccore.identifier.irut.fromReference(message.localCellProcess.instanceName).result);
      var ocdResponse = request_.context.ocdi.getNamespaceSpec(lcpBindingPath);

      if (ocdResponse.error) {
        errors.push("Unknown APM ID value specified for localCellProcess.apmID. Do you have a CellModel registered w/APM ID value '".concat(message.localCellProcess.apmID, "'?"));
        errors.push(ocdResponse.error);
        break;
      }

      var lcpProcessID = arccore.identifier.irut.fromReference(lcpBindingPath).result;
      var proxyHelperID = arccore.identifier.irut.fromReference(proxyPath).result; // We now know it's possible to create an instance of the localCellProcess. But, we still do not know if the lcp is already present in
      // either the sharedCellProcesses.digraph and/or the ownedCellProcesses.digraph. And, the logic is a bit tricky. However, at this point
      // we can start to mutate the graphs because we're past the point where any bad input provided via request_ is likely to cause an error.

      if (!cpmDataDescriptor.data.sharedCellProcesses.digraph.isVertex(thisCellProcessID)) {
        // This host is not currently hosting any connected proxy helper instance(s). And, no other host owns proxy instance(s) that are connected to it.
        // And, we know the host must exist. So, it must be an owned cell process. Record it as such.
        cpmDataDescriptor.data.sharedCellProcesses.digraph.addVertex({
          u: thisCellProcessID,
          p: {
            role: "owned",
            apmBindingPath: request_.context.apmBindingPath
          }
        });
      }

      if (cpmDataDescriptor.data.sharedCellProcesses.digraph.isVertex(proxyHelperID)) {
        // This indicates that this proxy helper instance is currently connected.
        cpmDataDescriptor.data.sharedCellProcesses.digraph.removeVertex(proxyHelperID); // host -> proxy -> lcp (linked) ===> host lcp (unlinked)

        runGarbageCollector = true;
      }

      var thisCellProcessRole = cpmDataDescriptor.data.sharedCellProcesses.digraph.getVertexProperty(thisCellProcessID).role;
      cpmDataDescriptor.data.sharedCellProcesses.digraph.addVertex({
        u: proxyHelperID,
        p: {
          role: "".concat(thisCellProcessRole, "-proxy"),
          apmBindingPath: proxyPath
        }
      });
      cpmDataDescriptor.data.sharedCellProcesses.digraph.addEdge({
        e: {
          u: thisCellProcessID,
          v: proxyHelperID
        },
        p: {
          role: "host-to-proxy"
        }
      }); // If LCP is present in the sharedProcessesDigraph and not the ownedProcessesDigraph there's a consistency problem.

      if (cpmDataDescriptor.data.sharedCellProcesses.digraph.isVertex(lcpProcessID)) {
        if (!cpmDataDescriptor.data.ownedCellProcesses.digraph.isVertex(lcpProcessID)) {
          errors("Internal consistency error detected. Cannot connect proxy '".concat(proxyPath, "' to localCellProcess '").concat(lcpBindingPath, "'."));
          break;
        }

        var lcpProps = cpmDataDescriptor.data.sharedCellProcesses.digraph.getVertexProperty(lcpProcessID);
        cpmDataDescriptor.data.sharedCellProcesses.digraph.addEdge({
          e: {
            u: proxyHelperID,
            v: lcpProcessID
          },
          p: {
            role: "proxy-to-".concat(lcpProps.role)
          }
        });
      } else {
        if (cpmDataDescriptor.data.ownedCellProcesses.digraph.isVertex(lcpProcessID)) {
          cpmDataDescriptor.data.sharedCellProcesses.digraph.addVertex({
            u: lcpProcessID,
            p: {
              role: "owned",
              apmBindingPath: lcpBindingPath
            }
          });
          cpmDataDescriptor.data.sharedCellProcesses.digraph.addEdge({
            e: {
              u: proxyHelperID,
              v: lcpProcessID
            },
            p: {
              role: "proxy-to-owned"
            }
          });
        } else {
          var actionResponse = request_.context.act({
            actorName: "Cell Process Proxy: open connection",
            actorTaskDescription: "Attempting to create a new owned worker process that will be managed as a shared cell process.",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: message.localCellProcess.apmID,
                      cellProcessUniqueName: message.localCellProcess.instanceName,
                      cellProcessInitData: {
                        construction: {
                          instanceName: message.localCellProcess.instanceName
                        }
                      }
                    }
                  }
                }
              }
            },
            apmBindingPath: "~" // shared cell processes are owned by the CellProcessor

          });

          if (actionResponse.error) {
            errors.push("Failed to create new shared cell process during cell process proxy connect.");
            errors.push(actionResponse.error);
          }

          cpmDataDescriptor.data.sharedCellProcesses.digraph.addVertex({
            u: lcpProcessID,
            p: {
              role: "shared",
              apmBindingPath: lcpBindingPath
            }
          });
          cpmDataDescriptor.data.sharedCellProcesses.digraph.addEdge({
            e: {
              u: proxyHelperID,
              v: lcpProcessID
            },
            p: {
              role: "proxy-to-shared"
            }
          });
        }
      }

      ocdResponse = request_.context.ocdi.writeNamespace(proxyPath, {
        lcpRequest: {
          apmID: message.localCellProcess.apmID,
          instanceName: message.localCellProcess.instanceName,
          proxyOwner: request_.context.apmBindingPath
        },
        lcpConnect: lcpBindingPath
      });

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      ocdResponse = request_.context.ocdi.writeNamespace({
        apmBindingPath: cpmDataDescriptor.path,
        dataPath: "#.sharedCellProcesses.revision"
      }, cpmDataDescriptor.data.sharedCellProcesses.revision + 1);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      if (runGarbageCollector) {
        cppLibResponse = cppLib.collectGarbage.request({
          act: request_.context.act,
          cpmData: cpmDataDescriptor.data,
          ocdi: request_.context.ocdi
        });

        if (cppLibResponse.error) {
          errors.push("Oh snap! An error occurred during garbage collection!");
          errors.push(cppLibResponse.error);
          break;
        }
      }

      response.result = {
        host: {
          apmBindingPath: request_.context.apmBindingPath,
          processID: thisCellProcessID
        },
        proxy: {
          apmBindingPath: proxyPath,
          proccessID: proxyHelperID
        },
        connected: {
          apmBindingPath: lcpBindingPath,
          processID: lcpProcessID
        }
      };
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (!action.isValid()) {
  throw new Error(action.toJSON());
}

module.exports = action;