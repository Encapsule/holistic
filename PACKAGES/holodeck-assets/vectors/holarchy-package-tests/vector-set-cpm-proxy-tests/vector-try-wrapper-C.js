"use strict";

(function () {
  module.exports = {
    id: "KCVAn0g-QAC6vOb3HPzd_A",
    name: "Try cm-wrapper-C",
    description: "Regression test cm-wrapper-C APM.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellProcessor: {
            constructorRequest: {
              id: "Tb1hyfhVT7aGza9xYV7xUQ",
              name: "Test cm-test-wrapper-C",
              description: "Activate and connect proxy helper cell.",
              cellmodel: require("./cm-test-wrapper-C")
            },
            testActorRequests: [{
              actRequest: {
                actorName: "Test KCVAn0g-QAC6vOb3HPzd_A",
                actorTaskDescription: "Activate primary cm-test-wrapper-C cell process.",
                actionRequest: {
                  CellProcessor: {
                    process: {
                      activate: {
                        processData: {
                          /*default*/
                        }
                      },
                      processCoordinates: {
                        apmID: "xStE95jnR6u1IJeLznmyxw",
                        instanceName: "primary"
                      } // cm-test-wrapper-C

                    }
                  }
                } // actionRequest

              } // actRequest

            }, // testActorRequest
            {
              actRequest: {
                actorName: "Test KCVAn0g-QAC6vOb3HPzd_A",
                actorTaskDescription: "Connect cell process proxy to shared cell process.",
                actionRequest: {
                  CellProcessor: {
                    proxy: {
                      proxyCoordinates: "#.wrapperB.wrapperA.proxy",
                      connect: {
                        processCoordinates: {
                          apmID: "xStE95jnR6u1IJeLznmyxw",
                          instanceName: "secondary-shared"
                        }
                      }
                    }
                  }
                },
                apmBindingPath: {
                  apmID: "xStE95jnR6u1IJeLznmyxw",
                  instanceName: "primary"
                }
              } // actRequest

            }, // testActorRequest
            {
              actRequest: {
                actorName: "Test KCVAn0g-QAC6vOb3HPzd_A",
                actorTaskDescription: "Deactivate primary cm-test-wrapper-C cell process.",
                actionRequest: {
                  CellProcessor: {
                    process: {
                      deactivate: {},
                      processCoordinates: {
                        apmID: "xStE95jnR6u1IJeLznmyxw",
                        instanceName: "primary"
                      } // cm-test-wrapper-C

                    }
                  }
                }
              } // actRequest

            } // testActorRequest
            ] // testActorRequests

          } // CellProcessor

        }
      }
    }
  };
})();