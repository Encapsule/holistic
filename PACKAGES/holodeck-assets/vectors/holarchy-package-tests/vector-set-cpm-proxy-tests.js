"use strict";

var holarchy = require("@encapsule/holarchy");

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
                  construction: {
                    ____accept: "jsObject",
                    ____defaultValue: {}
                  },
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
                },
                steps: {
                  uninitialized: {
                    description: "Default process step label.",
                    transitions: [{
                      transitionIf: {
                        always: true
                      },
                      nextStep: "connect_proxy"
                    }]
                  },
                  connect_proxy: {
                    description: "Attempt to connect the proxy.",
                    actions: {
                      enter: [// Note that this is deliberately verbose. We could equivalently write:
                      // { CellProcess: { connect: { proxy: { proxyCoordindates: "#.proxy" processCoordinates: { coordinates: { apmID: "mctGtkfiQmeO93Va6WkGZw" /*Back to host*/ } } } } }
                      {
                        CellProcessor: {
                          cell: {
                            cellCoordinates: "#.proxy",
                            delegate: {
                              actionRequest: {
                                CellProcessor: {
                                  proxy: {
                                    connect: {
                                      processCoordinates: {
                                        apmID: "mctGtkfiQmeO93Va6WkGZw"
                                        /*Back to host*/

                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }]
                    },
                    transitions: [{
                      transitionIf: {
                        CellProcessor: {
                          proxy: {
                            proxyCoordinates: "#.proxy",
                            connect: {
                              statusIs: "broken"
                            }
                          }
                        }
                      },
                      nextStep: "connect_proxy_error"
                    }, {
                      transitionIf: {
                        CellProcessor: {
                          proxy: {
                            proxyCoordinates: "#.proxy",
                            connect: {
                              statusIs: "disconnected"
                            }
                          }
                        }
                      },
                      nextStep: "connect_proxy_error"
                    }, {
                      transitionIf: {
                        CellProcessor: {
                          proxy: {
                            proxyCoordinates: "#.proxy",
                            connect: {
                              statusIs: "connected"
                            }
                          }
                        }
                      },
                      nextStep: "proxy_connected"
                    }, {
                      transitionIf: {
                        always: true
                      },
                      nextStep: "connect_proxy_error"
                    }]
                  },
                  connect_proxy_error: {
                    description: "The attempt to connect the proxy failed."
                  },
                  proxy_connected: {
                    description: "The proxy is now connected."
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
                CellProcessor: {
                  process: {
                    activate: {
                      /* default processData */
                    },
                    processCoordinates: {
                      apmID: "mctGtkfiQmeO93Va6WkGZw"
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
                CellProcessor: {
                  process: {
                    deactivate: {},
                    processCoordinates: {
                      apmID: "mctGtkfiQmeO93Va6WkGZw"
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
}, {
  id: "aRXQIZvdSE2rVnqR0HrfYg",
  name: "CPM Shared Process Test #4",
  description: "Coming back to this and taking a closer look at CellProcessProxy (CPP) (part 1).",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          constructorRequest: {
            id: "mtzaOOxAQcaaN_-9CqgZOw",
            // This is a the CellProcessor instance ID
            name: "CPM Shared Process Test #4",
            description: "Try to use a CellProcessProxy cell embedded as a helper in a parent cell process (part 1).",
            cellmodel: {
              id: "xXfx_svjT363tD-optUHog",
              // This is a the CellModel instance ID
              name: "CellModel for aRXQIZvdSE2rVnqR0HrfYg Test",
              description: "A top-level CellModel instance for test aRXQIZvdSE2rVnqR0HrfYg.",
              apm: {
                id: "TQ0j4BIhRQu5SmS-cWxJvQ",
                // AbstractProcessModel instance ID
                name: "AbstractProcessModel for aRXQIZvdSE2rVnqR0HrfYg Test",
                description: "A top-level AbstractProcessModel for test aRXQIZvdSE2rVnqR0HrfYg.",
                ocdDataSpec: {
                  ____types: "jsObject",
                  ____defaultValue: {},
                  nsd1: {
                    ____types: "jsObject",
                    ____defaultValue: {},
                    nsd2: {
                      ____types: "jsObject",
                      ____defaultValue: {},
                      nsd3: {
                        ____types: "jsObject",
                        ____defaultValue: {},
                        nsd4: {
                          ____types: "jsObject",
                          ____defaultValue: {},
                          cppTest: holarchy.appTypes.helperCells.cellProcessProxy
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          testActorRequests: [{
            actRequest: {
              actorName: "Test aRXQIZvdSE2rVnqR0HrfYg",
              actorTaskDescription: "Activate test cell.",
              actionRequest: {
                CellProcessor: {
                  process: {
                    activate: {},
                    processCoordinates: {
                      apmID: "TQ0j4BIhRQu5SmS-cWxJvQ",
                      instanceName: "root-instance"
                    }
                  }
                }
              }
            }
          }, {
            actRequest: {
              actorName: "Test aRXQIZvdSE2rVnqR0HrfYg",
              actorTaskDescription: "Attempt to connect a Cell Process Proxy helper cell process to new shared process.",
              actionRequest: {
                CellProcessor: {
                  proxy: {
                    proxyCoordinates: "#.nsd1.nsd2.nsd3.nsd4.cppTest",
                    connect: {
                      processCoordinates: {
                        apmID: "TQ0j4BIhRQu5SmS-cWxJvQ",
                        instanceName: "secondary-instance"
                      }
                    }
                  }
                }
              },
              apmBindingPath: {
                apmID: "TQ0j4BIhRQu5SmS-cWxJvQ",
                instanceName: "root-instance"
              }
            }
          }, {
            actRequest: {
              actorName: "Test aRXQIZvdSE2rVnqR0HrfYg",
              actorTaskDescription: "Attempt to disconnect the Cell Process Proxy helper cell process from shared process.",
              actionRequest: {
                CellProcessor: {
                  proxy: {
                    proxyCoordinates: "#.nsd1.nsd2.nsd3.nsd4.cppTest",
                    disconnect: {}
                  }
                }
              },
              apmBindingPath: {
                apmID: "TQ0j4BIhRQu5SmS-cWxJvQ",
                instanceName: "root-instance"
              }
            }
          }, {
            actRequest: {
              actorName: "Test aRXQIZvdSE2rVnqR0HrfYg",
              actorTaskDescription: "Deactivate test cell.",
              actionRequest: {
                CellProcessor: {
                  process: {
                    deactivate: {},
                    processCoordinates: {
                      apmID: "TQ0j4BIhRQu5SmS-cWxJvQ",
                      instanceName: "root-instance"
                    }
                  }
                }
              }
            }
          }]
        }
      }
    }
  } // vectorRequest

} // holodeck test request
];