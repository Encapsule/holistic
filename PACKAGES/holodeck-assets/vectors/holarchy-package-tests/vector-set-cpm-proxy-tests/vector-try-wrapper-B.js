"use strict";

(function () {
  var cmWrapperB = require("./cm-test-wrapper-B");

  module.exports = {
    id: "PsfI4RldTvqMLC8ULpTfhg",
    name: "Try cm-test-wrapper-B",
    description: "A small regression test.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellProcessor: {
            constructorRequest: {
              id: "QWZc3sD8QTaBOdmXHR7_Bg",
              name: "Test cm-test-wrapper-B APM",
              description: "Activate and connect proxy helper cell.",
              cellmodel: cmWrapperB
            },
            testActorRequests: [{
              actRequest: {
                actorName: "Test PsfI4RldTvqMLC8ULpTfhg",
                actorTaskDescription: "Activate primary cm-test-wrapper-B cell process.",
                actionRequest: {
                  CellProcessor: {
                    process: {
                      activate: {
                        processData: {
                          /*default*/
                        }
                      },
                      processCoordinates: {
                        apmID: "jYMDrEcRSOalZc7zet4hrQ",
                        instanceName: "primary"
                      }
                    }
                  }
                } // actionRequest

              } // actRequest

            }, // testActorRequest
            {
              actRequest: {
                actorName: "Test PsfI4RldTvqMLC8ULpTfhg",
                actorTaskDescription: "Connect cell process proxy to shared cell process.",
                actionRequest: {
                  CellProcessor: {
                    proxy: {
                      proxyCoordinates: "#.wrapperA.proxy",
                      connect: {
                        processCoordinates: {
                          apmID: "jYMDrEcRSOalZc7zet4hrQ",
                          instanceName: "secondary-shared"
                        }
                      }
                    }
                  }
                },
                apmBindingPath: {
                  apmID: "jYMDrEcRSOalZc7zet4hrQ",
                  instanceName: "primary"
                }
              } // actRequest

            }, // testActorRequest
            {
              actRequest: {
                actorName: "Test PsfI4RldTvqMLC8ULpTfhg",
                actorTaskDescription: "Deactivate primary cm-test-wrapper-B cell process.",
                actionRequest: {
                  CellProcessor: {
                    process: {
                      deactivate: {},
                      processCoordinates: {
                        apmID: "jYMDrEcRSOalZc7zet4hrQ",
                        instanceName: "primary"
                      }
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