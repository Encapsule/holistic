"use strict";

(function () {
  var cmWrapperA = require("./cm-test-wrapper-A");

  module.exports = {
    id: "d9zubWjfQnOX6DigaBbV6w",
    name: "Try cm-test-wrapper-A",
    description: "Attempt to exercise the cm-test-wrapper-A model.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellProcessor: {
            constructorRequest: {
              id: "cDdTLoYpTIiYqQJSfVZDGg",
              name: "Test cm-test-wrapper-A APM",
              description: "Activate and connect proxy helper cell.",
              cellmodel: cmWrapperA
            },
            testActorRequests: [{
              actRequest: {
                actorName: "Test d9zubWjfQnOX6DigaBbV6w",
                actorTaskDescription: "Activate primary cm-test-wrapper-A cell process.",
                actionRequest: {
                  CellProcessor: {
                    process: {
                      activate: {
                        processData: {
                          /*default*/
                        }
                      },
                      processCoordinates: {
                        apmID: "N6y8PUKiQ_yaW-0vDsQVhA",
                        instanceName: "primary"
                      }
                    }
                  }
                } // actionRequest

              } // actRequest

            }, // testActorRequest
            {
              actRequest: {
                actorName: "Test d9zubWjfQnOX6DigaBbV6w",
                actorTaskDescription: "Connect cell process proxy to shared cell process.",
                actionRequest: {
                  CellProcessor: {
                    proxy: {
                      proxyCoordinates: "#.proxy",
                      connect: {
                        processCoordinates: {
                          apmID: "N6y8PUKiQ_yaW-0vDsQVhA",
                          instanceName: "secondary-shared"
                        }
                      }
                    }
                  }
                },
                apmBindingPath: {
                  apmID: "N6y8PUKiQ_yaW-0vDsQVhA",
                  instanceName: "primary"
                }
              } // actRequest

            }, // testActorRequest
            {
              actRequest: {
                actorName: "Test d9zubWjfQnOX6DigaBbV6w",
                actorTaskDescription: "Disconnect the cell process proxy from shared cell process.",
                actionRequest: {
                  CellProcessor: {
                    proxy: {
                      proxyCoordinates: "#.proxy",
                      disconnect: {}
                    }
                  }
                },
                apmBindingPath: {
                  apmID: "N6y8PUKiQ_yaW-0vDsQVhA",
                  instanceName: "primary"
                }
              } // actRequest

            }, // testActorRequest
            {
              actRequest: {
                actorName: "Test d9zubWjfQnOX6DigaBbV6w",
                actorTaskDescription: "Activate an owned secondary child cell process.",
                actionRequest: {
                  CellProcessor: {
                    process: {
                      activate: {
                        processData: {
                          /*default*/
                        }
                      },
                      processCoordinates: {
                        apmID: "N6y8PUKiQ_yaW-0vDsQVhA",
                        instanceName: "secondary"
                      }
                    }
                  }
                },
                apmBindingPath: {
                  apmID: "N6y8PUKiQ_yaW-0vDsQVhA",
                  instanceName: "primary"
                }
              } // actRequest

            }, // testActorRequest
            {
              actRequest: {
                actorName: "Test d9zubWjfQnOX6DigaBbV6w",
                actorTaskDescription: "Connect the primary test cell's proxy to the secondary owned test cell.",
                actionRequest: {
                  CellProcessor: {
                    proxy: {
                      proxyCoordinates: "#.proxy",
                      connect: {
                        processCoordinates: {
                          apmID: "N6y8PUKiQ_yaW-0vDsQVhA",
                          instanceName: "secondary"
                        }
                      }
                    }
                  }
                },
                apmBindingPath: {
                  apmID: "N6y8PUKiQ_yaW-0vDsQVhA",
                  instanceName: "primary"
                }
              }
            }, // testActorRequest
            {
              actRequest: {
                actorName: "Test d9zubWjfQnOX6DigaBbV6w",
                actorTaskDescription: "Attempt to destroy the secondary owned cell process w/the proxy connected.",
                actionRequest: {
                  CellProcessor: {
                    process: {
                      processCoordinates: {
                        apmID: "N6y8PUKiQ_yaW-0vDsQVhA",
                        instanceName: "secondary"
                      },
                      deactivate: {}
                    }
                  }
                }
              } // actRequest

            }, // testActorRequest
            {
              actRequest: {
                actorName: "Test d9zubWjfQnOX6DigaBbV6w",
                actorTaskDescription: "Connect the primary test cell's proxy to secondary shared cell.",
                actionRequest: {
                  CellProcessor: {
                    proxy: {
                      proxyCoordinates: "#.proxy",
                      connect: {
                        processCoordinates: {
                          apmID: "N6y8PUKiQ_yaW-0vDsQVhA",
                          instanceName: "secondary"
                        }
                      }
                    }
                  }
                },
                apmBindingPath: {
                  apmID: "N6y8PUKiQ_yaW-0vDsQVhA",
                  instanceName: "primary"
                }
              }
            }, // testActorRequest
            {
              actRequest: {
                actorName: "Test d9zubWjfQnOX6DigaBbV6w",
                actorTaskDescription: "Deactivate primary cm-test-wrapper_a cell process.",
                actionRequest: {
                  CellProcessor: {
                    process: {
                      deactivate: {},
                      processCoordinates: {
                        apmID: "N6y8PUKiQ_yaW-0vDsQVhA",
                        instanceName: "primary"
                      }
                    }
                  }
                }
              } // actRequest

            } // testActorRequest
            ] // testActorRequests array

          } // CellProcessor

        } // holarchy

      } // holistic

    } // vectorRequest

  }; // testVector descriptor object
})();