"use strict";

module.exports = [{
  id: "N8wBqzGVT6i6Dvwzff4Zrw",
  name: "Proxy Test A",
  description: "A CellModel that contains a counter and a CellProcessProxy helper cell.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          constructorRequest: {
            id: "m6Wno85ESaCtnWyzFb9Adw",
            name: "Proxy Test A",
            description: "A test to take a look at comparing two values owned by two different cell processes connected by a proxy.",
            cellmodel: {
              id: "NAlcfNAXTteoRMDrYOzTjA",
              name: "Proxy Test A Model",
              description: "A test process.",
              apm: {
                id: "mctGtkfiQmeO93Va6WkGZw",
                name: "Proxy Test A Process",
                description: "A test process.",
                ocdDataSpec: {
                  ____types: "jsObject",
                  ____defaultValue: {},
                  count: {
                    ____types: "jsNumber",
                    ____defaultValue: 0
                  },
                  proxy: {
                    ____types: "jsObject",
                    ____appdsl: {
                      apm: "CPPU-UPgS8eWiMap3Ixovg"
                      /* cell process proxy (CPP) */

                    }
                  }
                }
              }
            }
          },
          testActorRequests: [{
            actRequest: {
              actorName: "Proxy Test A",
              actorTaskDescription: "Start test process.",
              actionRequest: {
                holarchy: {
                  CellProcessor: {
                    process: {
                      create: {
                        apmID: "mctGtkfiQmeO93Va6WkGZw"
                      }
                    }
                  }
                }
              }
            }
          }, {
            actRequest: {
              actorName: "Proxy Test A",
              actorTaskDescription: "Start test process.",
              actionRequest: {
                holarchy: {
                  CellProcessor: {
                    process: {
                      "delete": {
                        cellProcessNamespace: {
                          apmID: "mctGtkfiQmeO93Va6WkGZw"
                        }
                      }
                    }
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
}];