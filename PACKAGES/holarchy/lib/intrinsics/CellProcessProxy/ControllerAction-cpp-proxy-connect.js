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
    CellProcessor: {
      ____types: "jsObject",
      proxy: {
        ____types: "jsObject",
        proxyCoordinates: {
          ____label: "Cell Process Proxy Helper Cell Coordinates Variant (Optional)",
          ____accept: "jsString",
          ____defaultValue: "#"
        },
        connect: {
          ____types: "jsObject",
          processCoordinates: {
            ____label: "Cell Process Coordinates Variant (Required)",
            ____types: ["jsString", // If a string, then the caller-supplied value must be either a fully-qualified or relative path to a cell process. Or, an IRUT that resolves to a known cellProcessID.
            "jsObject" // If an object, then the caller has specified the low-level apmID, instanceName coordinates directly.
            ],
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
      var messageBody = request_.actionRequest.CellProcessor.proxy; // We do not accept IRUT-format cell process identifier here.

      if (arccore.identifier.irut.isIRUT(messageBody.proxyCoordinates).result) {
        errors.push("Cannot resolve location of the cell process proxy helper cell to link given a cell process ID!");
        break;
      } // Take messageBody.proxyCoordinates as either:
      // a fully-qualified OCD path (i.e. begins w/~)
      // an OCD path relative to apmBindingPath (i.e. begins w/#)


      var ocdResponse = OCD.dataPathResolve({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: messageBody.proxyCoordinates
      });

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var proxyHelperPath = ocdResponse.result; // This ensures we're addressing an actuall CellProcessProxy-bound cell. And, get us a copy of its memory and its current connection state.

      var cppLibResponse = cppLib.getStatus.request({
        proxyHelperPath: proxyHelperPath,
        ocdi: request_.context.ocdi
      });

      if (cppLibResponse.error) {
        errors.push("Cannot locate the cell process proxy cell instance.");
        errors.push(cppLibResponse.error);
        break;
      }

      var cppMemoryStatusDescriptor = cppLibResponse.result; // Okay - we're talking to an active CellProcessProxy helper cell.
      // Get the CPM process' data.

      var cpmLibResponse = cpmLib.getProcessManagerData.request({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cpmDataDescriptor = cpmLibResponse.result; // CellProcessProxy cells are always owned by another cell...
      // CellProcessProxy CellModel APM ID is registered for use as a helper cell (via ____appdsl APM ID string) .
      // But, is not registered with the CPM so you cannot activate a proxy via CPM process create.
      // This means that any CPP cell will be owned by some or another containing cell
      // Which means you cannot connect a proxy to a proxy... At least not directly.
      // So, now because we know we're a helper cell (i.e. declared within and thus "owned") by at least one containing APM layer
      // we need to determine exactly where we are in relationship to the cell below us on this memory branch that is actually
      // an cell process (i.e. its hashed cellPath IRUT is present in the CPM cell process graph).

      cpmLibResponse = cpmLib.getProcessOwnershipReportDescriptor.request({
        cellPath: proxyHelperPath,
        cpmDataDescriptor: cpmDataDescriptor,
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push("An unexpected error occurred while trying to determine which cell process owns CellProcessProxy helper cell at path '".concat(proxyHelperPath, "':"));
        errors.push(cpmLibResponse.error);
        break;
      }

      var cellOwnershipReport = cpmLibResponse.result; // TEMPORARY: For now, let's keep the current restrictions on proxy depth that we have currently imposed as they are so as not to break anything.

      /*
      if (cellOwnershipReport.ownershipVector.length !== 2) {
          errors.push(`Unsupported connection request on CellProcessProxy helper cell at path '${proxyHelperPath}' that is declared at namespace height ${cellOwnershipReport.ownershipVector.length} > 2 relative to its owning cell process. NOTE: I am working to remove this restriction now...`);
          break;
      }
      */
      // v0.2.9-firestorm // Jan 2022
      // Until now we have always restricted the depth of cell process proxy helper cells to 2 as above.
      // v0.2.9-firestorm uses the head (0) and tail (length-1) of the ownershipVector instead of 0, 1.
      // There's no facility here to deal w/a cell that deletes OCD data associates with a connected proxy.

      var proxyOwnershipDepth = cellOwnershipReport.ownershipVector.length;
      var proxyHelperID = cellOwnershipReport.ownershipVector[0].cellID;
      var proxyOwnerProcessID = cellOwnershipReport.ownershipVector[proxyOwnershipDepth - 1].cellID;
      var proxyOwnerProcessPath = cellOwnershipReport.ownershipVector[proxyOwnershipDepth - 1].cellPath; // At this point we know / are confident of the following:
      //
      // - We know which existing owned (i.e. allocated w/CPM process create) OR shared (i.e. allocated w/CPM process open)
      // cell process will OWN (i.e. will hold, by proxy in this example) a reference to another local owned or shared cell process.
      // - We are confident that relative to the owner we can access the specified cell process proxy helper cell. And, that it is actually
      // bound to the CellProcessProxy APM etc.
      //
      // However, we do not yet know anything yet about the local cell process that the caller wishes to connect to via the proxy instance. So, we look at that next.

      cpmLibResponse = cpmLib.resolveCellProcessCoordinates.request({
        coordinates: messageBody.connect.processCoordinates,
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var resolvedProcessCoordinates = cpmLibResponse.result;
      var lcpBindingPath = resolvedProcessCoordinates.cellProcessPath;
      var lcpProcessID = resolvedProcessCoordinates.cellProcessID; // We now know it's possible to create an instance of the localCellProcess. But, we still do not know if the lcp is already present in
      // either the sharedCellProcesses.digraph and/or the ownedCellProcesses.digraph. And, the logic is a bit tricky. However, at this point
      // we can start to mutate the graphs because we're past the point where any bad input provided via request_ is likely to cause an error.

      if (!cpmDataDescriptor.data.sharedCellProcesses.digraph.isVertex(proxyOwnerProcessID)) {
        // This host is not currently hosting any connected proxy helper instance(s). And, no other host owns proxy instance(s) that are connected to it.
        // And, we know the host must exist. So, it must be an owned cell process. Record it as such.
        cpmDataDescriptor.data.sharedCellProcesses.digraph.addVertex({
          u: proxyOwnerProcessID,
          p: {
            role: "owned",
            apmBindingPath: proxyOwnerProcessPath
          }
        });
      }

      if (cpmDataDescriptor.data.sharedCellProcesses.digraph.isVertex(proxyHelperID)) {
        // This indicates that this proxy helper instance is currently connected.
        cpmDataDescriptor.data.sharedCellProcesses.digraph.removeVertex(proxyHelperID); // host -> proxy -> lcp (linked) ===> host lcp (unlinked)

        runGarbageCollector = true;
      }

      var proxyOwnerProcessRole = cpmDataDescriptor.data.sharedCellProcesses.digraph.getVertexProperty(proxyOwnerProcessID).role;
      cpmDataDescriptor.data.sharedCellProcesses.digraph.addVertex({
        u: proxyHelperID,
        p: {
          role: "".concat(proxyOwnerProcessRole, "-proxy"),
          apmBindingPath: proxyHelperPath
        }
      });
      cpmDataDescriptor.data.sharedCellProcesses.digraph.addEdge({
        e: {
          u: proxyOwnerProcessID,
          v: proxyHelperID
        },
        p: {
          role: "host-to-proxy"
        }
      }); // If LCP is present in the sharedProcessesDigraph and not the ownedProcessesDigraph there's a consistency problem.

      if (cpmDataDescriptor.data.sharedCellProcesses.digraph.isVertex(lcpProcessID)) {
        if (!cpmDataDescriptor.data.ownedCellProcesses.digraph.isVertex(lcpProcessID)) {
          errors("Internal consistency error detected. Cannot connect proxy '".concat(proxyHelperPath, "' to localCellProcess '").concat(lcpBindingPath, "'."));
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
              CellProcessor: {
                process: {
                  processCoordinates: lcpProcessID,
                  activate: {
                    processData: {
                      construction: {
                        instanceName: resolvedProcessCoordinates.coordinates.instanceName
                      }
                    }
                  }
                }
              }
            },
            apmBindingPath: "~" // shared cell processes are owned by the CellProcessor instance's Cell Process Manager daemon process.

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

      ocdResponse = request_.context.ocdi.writeNamespace(proxyHelperPath, {
        "CPPU-UPgS8eWiMap3Ixovg_private": {
          lcpRequest: resolvedProcessCoordinates.coordinates,
          lcpConnect: lcpBindingPath
        }
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
          apmBindingPath: proxyOwnerProcessPath,
          processID: proxyOwnerProcessID
        },
        proxy: {
          apmBindingPath: proxyHelperPath,
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