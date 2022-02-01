"use strict";

(function () {
  module.exports = {
    id: "KMP8r45sTGOkc_jluz_YoQ",
    name: "Try cm-test-wrapper-D",
    description: "Attempt to exercise the cm-test-wrapper-D model.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellProcessor: {
            constructorRequest: {
              id: "F7FGe9IBQmCbQWClzUxVdA",
              name: "Test cm-test-wrapper-D APM",
              description: "Activate and connect proxy helper cell.",
              cellmodel: require("./cm-test-wrapper-D")
            },
            testActorRequests: [{
              actRequest: {
                actorName: "Test KMP8r45sTGOkc_jluz_YoQ",
                actorTaskDescription: "Activate primary cm-test-wrapper-D cell process.",
                actionRequest: {
                  CellProcessor: {
                    process: {
                      activate: {
                        processData: {
                          /*default*/
                        }
                      },
                      processCoordinates: {
                        apmID: "iNPXCgKERFmORVJn2ytmqg",
                        instanceName: "primary"
                      } // cm-test-wrapper-D

                    }
                  }
                } // actionRequest

              } // actRequest

            }, // testActorRequest
            {
              actRequest: {
                actorName: "Test KMP8r45sTGOkc_jluz_YoQ",
                actorTaskDescription: "Connect cell process proxy to shared cell process.",
                actionRequest: {
                  CellProcessor: {
                    proxy: {
                      proxyCoordinates: "#.wrapperC.wrapperB.wrapperA.proxy",
                      connect: {
                        processCoordinates: {
                          apmID: "iNPXCgKERFmORVJn2ytmqg",
                          instanceName: "secondary-shared"
                        }
                      }
                    }
                  }
                },
                apmBindingPath: {
                  apmID: "iNPXCgKERFmORVJn2ytmqg",
                  instanceName: "primary"
                }
              } // actRequest

            }, // testActorRequest
            // ^^ EXISTING STEPS
            {
              actRequest: {
                actorName: "Test KMP8r45sTGOkc_jluz_YoQ",
                actorTaskDescription: "Disconnect the cell process proxy from shared cell process.",
                actionRequest: {
                  CellProcessor: {
                    proxy: {
                      proxyCoordinates: "#.wrapperC.wrapperB.wrapperA.proxy",
                      disconnect: {}
                    }
                  }
                },
                apmBindingPath: {
                  apmID: "iNPXCgKERFmORVJn2ytmqg",
                  instanceName: "primary"
                }
              } // actRequest

            }, // testActorRequest
            {
              actRequest: {
                actorName: "Test KMP8r45sTGOkc_jluz_YoQ",
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
                        apmID: "iNPXCgKERFmORVJn2ytmqg",
                        instanceName: "secondary"
                      }
                    }
                  }
                },
                apmBindingPath: {
                  apmID: "iNPXCgKERFmORVJn2ytmqg",
                  instanceName: "primary"
                }
              } // actRequest

            }, // testActorRequest
            {
              actRequest: {
                actorName: "Test KMP8r45sTGOkc_jluz_YoQ",
                actorTaskDescription: "Connect the primary test cell's proxy to the secondary owned test cell.",
                actionRequest: {
                  CellProcessor: {
                    proxy: {
                      proxyCoordinates: "#.wrapperC.wrapperB.wrapperA.proxy",
                      connect: {
                        processCoordinates: {
                          apmID: "iNPXCgKERFmORVJn2ytmqg",
                          instanceName: "secondary"
                        }
                      }
                    }
                  }
                },
                apmBindingPath: {
                  apmID: "iNPXCgKERFmORVJn2ytmqg",
                  instanceName: "primary"
                }
              }
            }, // testActorRequest
            {
              actRequest: {
                actorName: "Test KMP8r45sTGOkc_jluz_YoQ",
                actorTaskDescription: "Attempt to destroy the secondary owned cell process w/the proxy connected.",
                actionRequest: {
                  CellProcessor: {
                    process: {
                      processCoordinates: {
                        apmID: "iNPXCgKERFmORVJn2ytmqg",
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
                actorName: "Test KMP8r45sTGOkc_jluz_YoQ",
                actorTaskDescription: "Connect the primary test cell's proxy to secondary shared cell.",
                actionRequest: {
                  CellProcessor: {
                    proxy: {
                      proxyCoordinates: "#.wrapperC.wrapperB.wrapperA.proxy",
                      connect: {
                        processCoordinates: {
                          apmID: "iNPXCgKERFmORVJn2ytmqg",
                          instanceName: "secondary"
                        }
                      }
                    }
                  }
                },
                apmBindingPath: {
                  apmID: "iNPXCgKERFmORVJn2ytmqg",
                  instanceName: "primary"
                }
              }
            }, // testActorRequest
            // EXISTING LAST STEP
            {
              actRequest: {
                actorName: "Test KMP8r45sTGOkc_jluz_YoQ",
                actorTaskDescription: "Deactivate primary cm-test-wrapper-D cell process.",
                actionRequest: {
                  CellProcessor: {
                    process: {
                      deactivate: {},
                      processCoordinates: {
                        apmID: "iNPXCgKERFmORVJn2ytmqg",
                        instanceName: "primary"
                      } // cm-test-wrapper-D

                    }
                  }
                }
              } // actRequest

            } // testActorRequest
            ]
          }
        }
      }
    }
  };
})();