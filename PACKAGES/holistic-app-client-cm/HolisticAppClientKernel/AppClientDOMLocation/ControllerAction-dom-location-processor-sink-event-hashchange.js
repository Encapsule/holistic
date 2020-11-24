"use strict";

// ControllerAction-dom-client-event-sink-hashchange.js
var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.ControllerAction({
  id: "peTmTek_SB64-ofd_PSGjg",
  name: "DOM Client Location Processor: 'hashchange'",
  description: "Accepts info about the 'hashchange' event and encapsulates the details of updating the DOM Client Locaiton Processor APM memory to record the event details.",
  actionRequestSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      app: {
        ____types: "jsObject",
        client: {
          ____types: "jsObject",
          cm: {
            ____types: "jsObject",
            actions: {
              ____types: "jsObject",
              DOMLocationProcessor: {
                ____types: "jsObject",
                notifyEvent: {
                  ____types: "jsObject",
                  hashchange: {
                    ____accept: "jsBoolean",
                    ____inValueSet: [true]
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____accept: "jsUndefined"
  },
  // action returns no response.result
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true; // v0.0.47-kyanite note
      // Been a long time since I've been in this module...
      // Okay - what's actually important is to take some of the fine details of the logic
      // below (there are some critical nuances to dealing w/initialization) and then
      // and convert the rest over to push a notification through the derived app client's
      // hashroute lifecycle action. I had previously guessed we might observe this model's
      // process step to deduce hash changes. We may still do that someday. But, for now it's
      // much simpler to understand that you need to implement lifecycle action hashroute
      // if you want something to happen vs you need to write a CellModel that observes another
      // blah blah blah...

      console.log("Current value of location.href is '".concat(location.href, "'"));
      var ocdResponse = request_.context.ocdi.readNamespace({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: "#"
      });

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var cellMemory = ocdResponse.result;

      if (cellMemory.outputs.currentRoute && cellMemory.outputs.currentRoute.href === location.href) {
        console.log("This event will be ignored. It was induced by the DOM Location Processor's init action replacing the server's non-hashroute with the default, #.");
        break;
      }

      var routerEventDescriptor = {
        actor: cellMemory["private"].routerEventCount === cellMemory["private"].lastOutputEventIndex ? cellMemory["private"].routerEventCount ? "user" : "server" : "app",
        href: location.href,
        // capture the entire href serialization from the location object
        routerEventNumber: cellMemory["private"].routerEventCount
      };
      cellMemory["private"].locationHistory.push(routerEventDescriptor);
      cellMemory["private"].routerEventCount++;

      if (cellMemory["private"].routerEventCount > cellMemory["private"].lastOutputEventIndex) {
        cellMemory["private"].lastOutputIndex++;
        cellMemory["private"].updateObservers = true;
        cellMemory.outputs.currentRoute = routerEventDescriptor;
      } // if notify observers


      ocdResponse = request_.context.ocdi.writeNamespace({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: "#"
      }, cellMemory);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      } // if cellMemory.private.updateObservers - we can now call the derived app client process' hashroute lifecycle action and tell them


      if (cellMemory["private"].updateObservers) {
        var actResponse = request_.context.act({
          actorName: "DOMLocationProcessor",
          actionTaskDescription: "Informing the app client service of udpate to the current hashroute location data.",
          actionRequest: {
            CellProcessor: {
              cell: {
                delegate: {
                  cell: cellMemory.derivedAppClientProcessCoordinates,
                  actionRequest: {
                    holistic: {
                      app: {
                        client: {
                          lifecycle: {
                            hashroute: {
                              routerEventDescriptor: routerEventDescriptor
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          apmBindingPath: request_.context.apmBindingPath
        });

        if (actResponse.error) {
          errors.push(actResponse.error);
          break;
        }
      }
      /*
       // Resolve the full path the DOM Location Processor outputs namespace.
      let rpResponse = holarchy.ObservableControllerData.dataPathResolve({
          apmBindingPath: request_.context.apmBindingPath,
          dataPath: "#.outputs"
      });
      if (rpResponse.error) {
          errors.push(rpResponse.error);
          break;
      }
      const pathOutputs = rpResponse.result;
       let ocdResponse = request_.context.ocdi.readNamespace(pathOutputs);
      if (ocdResponse.error) { errors.push(ocdResponse.error); break; }
      const outputs = ocdResponse.result;
       if (outputs.currentRoute && (outputs.currentRoute.href === location.href)) {
          console.log("This event will be ignored. It was induced by the DOM Location Processor's init action replacing the server's non-hashroute with the default, #.");
          break;
      }
       // Resolve the full path the DOM Location Processor private namespace.
      rpResponse = holarchy.ObservableControllerData.dataPathResolve({
          apmBindingPath: request_.context.apmBindingPath,
          dataPath: "#.private"
      });
      if (rpResponse.error) {
          errors.push(rpResponse.error);
          break;
      }
      const pathPrivate = rpResponse.result;
       // Read the DOM Location Processor's private OCD namespace.
      ocdResponse = request_.context.ocdi.readNamespace(pathPrivate);
      if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
      }
      const privateNamespace = ocdResponse.result;
       const routerEventDescriptor = {
          actor: ((privateNamespace.routerEventCount === privateNamespace.lastOutputEventIndex)?(privateNamespace.routerEventCount?"user":"server"):"app"),
          href: location.href, // capture the entire href serialization from the location object
          routerEventNumber: privateNamespace.routerEventCount
      };
       privateNamespace.locationHistory.push(routerEventDescriptor);
       privateNamespace.routerEventCount++; // total hashchange events
       if (privateNamespace.routerEventCount > privateNamespace.lastOutputEventIndex) {
           // Always re-written in the epilogue.
          privateNamespace.lastOutputEventIndex++;
          privateNamespace.updateObservers = true;
           // Resolve the full path the DOM Location Processor outputs.currentRoute namespace.
          let rpResponse = holarchy.ObservableControllerData.dataPathResolve({
              apmBindingPath: request_.context.apmBindingPath,
              dataPath: "#.outputs.currentRoute"
          });
          if (rpResponse.error) {
              errors.push(rpResponse.error);
              break;
          }
          const pathCurrentRoute = rpResponse.result;
           // Write the current route descriptor to the output.
          let ocdResponse = request_.context.ocdi.writeNamespace(pathCurrentRoute, routerEventDescriptor);
          if (ocdResponse.error) {
              errors.push(ocdResponse.error);
              break;
          }
      }
       ocdResponse = request_.context.ocdi.writeNamespace(pathPrivate, privateNamespace);
      if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
      }
       */


      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});