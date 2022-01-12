"use strict";

// vector-set-cmas-base-constructor.js
// These are test vectors to confirm the basic functionality of the @encapsule/holarchy CellModelArtifactSpace class.
(function () {
  var arccore = require("@encapsule/arccore");

  var holarchy = require("@encapsule/holarchy");

  var vectorSetName = "CellModelArtifactSpace Constructor/Method";
  module.exports = [{
    // UNDEFINED CONSTRUCTOR
    id: "6T9b-OukTF6wGWqNgqb_8Q",
    name: "".concat(vectorSetName, ": Bad Constructor Request Undefined"),
    description: "Attempt to construct a CMAS instance w/undefined constructor request.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: false
          }
        }
      }
    }
  }, {
    // BAD/EMPTY CONSTRUCTOR
    id: "eQ5T-rDDTOa3YjlDhsAc6A",
    name: "".concat(vectorSetName, ": Bad Constructor Request Missing Space Label"),
    description: "Attempt to construct CMAS instance w/bad request object.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: false,
            constructorRequest: {}
          }
        }
      }
    }
  }, {
    // BAD CONSTRUCTION W/ZERO-LENGTH SPACELABEL
    id: "PpgtBOCYTNKN3EZTE2RgxQ",
    name: "".concat(vectorSetName, ": Bad Constructor Request Zero-Length Space Label"),
    description: "Attempt to construct CMAS instance w/a zero-length spaceLabel string.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: false,
            constructorRequest: {
              spaceLabel: ""
            }
          }
        }
      }
    }
  }, {
    // VALID CONSTRUCTION
    id: "3uscUmZjQYimppjDK5YUTw",
    name: "".concat(vectorSetName, ": Good Constructor From Valid Request Descriptor"),
    description: "Attempt to construct a CMAS instance w/a valid spaceLabel string value.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: true,
            constructorRequest: {
              spaceLabel: "Whatever >0 string I want..."
            }
          }
        }
      }
    }
  }, {
    // MAPLABELS REQUEST W/NO REQUEST ----- TODO: THIS SHOULD BE AN INVALID REQUEST THAT RETURNS response.error
    id: "cQAkSm2XTbOrtf3esFMEPA",
    name: "".concat(vectorSetName, ": Good constructor w/method call to mapLabels w/undefined request."),
    description: "You should get response.error on mapLabels method call with undefined request.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: true,
            constructorRequest: {
              spaceLabel: "Amsterdam"
            },
            methodCall: {
              assertValidRequest: true
              /*TODO:false*/
              ,
              methodName: "mapLabels",
              methodRequest: undefined
            }
          }
        }
      }
    }
  }, {
    // MAPLABELS REQUEST W/EMPTY REQUEST OBJECT --- TODO: THIS SHOULD BE AN INVALID REQUEST THAT RETURNS response.error
    id: "qTqUDRmnRCGxwS-E7n7Lgg",
    name: "".concat(vectorSetName, ": Good constructor w/method call to mapLabels w/empty object request."),
    description: "You should get response.error on mapLabels method call w/empty object request.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: true,
            constructorRequest: {
              spaceLabel: "Rome"
            },
            methodCall: {
              assertValidRequest: true
              /*TODO: false*/
              ,
              methodName: "mapLabels",
              methodRequest: {}
            }
          }
        }
      }
    }
  }, {
    // MAPLABELS REQUEST W/REQUEST OBJECT W/INVALID KEY(S) --- TODO: THIS SHOULD BE AN INVALID REQUEST THAT RETURNS response.error
    id: "JosXtSKVRHqaK1fB8gZLXQ",
    name: "".concat(vectorSetName, ": Good constructor w/method call to mapLabels w/object request w/no unknown key."),
    description: "You should get a response.error on mapLabels method call w/request object devoid of known key names.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: true,
            constructorRequest: {
              spaceLabel: "Florence"
            },
            methodCall: {
              assertValidRequest: true
              /*TODO: false*/
              ,
              methodName: "mapLabels",
              methodRequest: {
                SOME_WEIRD_STUFF: "BLAH BLAH BLAH"
              }
            }
          }
        }
      }
    }
  }, {
    // MAPLABELS GET CM ID - BASELINE
    id: "TMkvnj2xSaqZdnwRPcQRfg",
    name: "".concat(vectorSetName, ": Good constructor w/method call to mapLabels to retrieve CMID."),
    description: "We should be able to retrive CMID from mapLabels.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: true,
            constructorRequest: {
              spaceLabel: "Prague"
            },
            methodCall: {
              assertValidRequest: true,
              methodName: "mapLabels",
              methodRequest: {
                CM: "foo"
              }
            },
            testAssertion: {
              description: "response.result.CMID should be an IRUT.",
              assertionFunction: function assertionFunction(_ref) {
                var testVectorRequest = _ref.testVectorRequest,
                    cmasRef = _ref.cmasRef,
                    methodResponse = _ref.methodResponse;
                return {
                  error: null,
                  result: testVectorRequest.chaiAssert.isTrue(arccore.identifier.irut.isIRUT(methodResponse.result.CMID).result, "response.result.CMID must be an IRUT")
                };
              }
            }
          }
        }
      }
    }
  }, {
    // MAPLABELS GET APM ID - BASELINE
    id: "JoTuvTDvQMu98fcWlJt0lg",
    // old "-GSSwHkeSJ24e2kfpXle_g", // NOTE THIS CAUSES FILE SYSTEM PROBLEMS BECAUSE STARTS W/HYPHEN
    name: "".concat(vectorSetName, ": Good constructor w/method call to mapLabels to retrieve APMID."),
    description: "We should be able to retrive CMID from mapLabels.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: true,
            constructorRequest: {
              spaceLabel: "Dublin"
            },
            methodCall: {
              assertValidRequest: true,
              methodName: "mapLabels",
              methodRequest: {
                APM: "xyzzy"
              }
            },
            testAssertion: {
              description: "response.result.APMID should be an IRUT.",
              assertionFunction: function assertionFunction(_ref2) {
                var testVectorRequest = _ref2.testVectorRequest,
                    cmasRef = _ref2.cmasRef,
                    methodResponse = _ref2.methodResponse;
                return {
                  error: null,
                  result: testVectorRequest.chaiAssert.isTrue(arccore.identifier.irut.isIRUT(methodResponse.result.APMID).result, "response.result.APMID must be an IRUT")
                };
              }
            }
          }
        }
      }
    }
  }, {
    // MAPLABELS GET ACT ID FAILS IF NO CM LABEL
    id: "BQPU4zfgR2e0I6k3c7jIlg",
    name: "".concat(vectorSetName, ": Good constructor w/method call to mapLabels to retrieve ACTID w/out CM label."),
    description: "You should receive response.error and get no key returned in response.response if you don't also specify CM label.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: true,
            constructorRequest: {
              spaceLabel: "Geneva"
            },
            methodCall: {
              assertValidRequest: false,
              methodName: "mapLabels",
              methodRequest: {
                ACT: "baz"
              }
            },
            testAssertion: {
              description: "response.error should be set and response.result should have no IRUTs.",
              assertionFunction: function assertionFunction(_ref3) {
                var testVectorRequest = _ref3.testVectorRequest,
                    cmasRef = _ref3.cmasRef,
                    methodResponse = _ref3.methodResponse;
                return {
                  error: null,
                  result: [testVectorRequest.chaiAssert.isUndefined(methodResponse.result.CMID || methodResponse.result.APMID || methodResponse.ACTID || methodResponse.TOPID || methodResponse.OTHERID, "We expect response.result to contain no IRUT ID's.")]
                };
              }
            }
          }
        }
      }
    }
  }, {
    // MAPLABELS GET ACT ID W/CM LABEL SPECIFIED
    id: "3LqqpbCbTdSaJhT3a1Lgug",
    name: "".concat(vectorSetName, ": Good constructor w/method call to mapLabels to retrieve ACTID with CM label."),
    description: "You should receive response.error and get no key returned in response.response if you don't also specify CM label.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: true,
            constructorRequest: {
              spaceLabel: "Milan"
            },
            methodCall: {
              assertValidRequest: false,
              methodName: "mapLabels",
              methodRequest: {
                cm: "one-two-three",
                ACT: "baz"
              }
            },
            testAssertion: {
              description: "response.error should be set and response.result should have no IRUTs.",
              assertionFunction: function assertionFunction(_ref4) {
                var testVectorRequest = _ref4.testVectorRequest,
                    cmasRef = _ref4.cmasRef,
                    methodResponse = _ref4.methodResponse;
                return {
                  error: null,
                  result: [testVectorRequest.chaiAssert.isUndefined(methodResponse.result.CMID || methodResponse.result.APMID || methodResponse.ACTID || methodResponse.TOPID || methodResponse.OTHERID, "We expect response.result to contain no IRUT ID's.")]
                };
              }
            }
          }
        }
      }
    }
  }, {
    // MAPLABELS GET TOP ID W/out CM LABEL SPECIFIED
    id: "JXupqxTHQoyoU65pvP0NkA",
    name: "".concat(vectorSetName, ": Good constructor w/method call to mapLabels to retrieve TOPID with CM label."),
    description: "You should receive response.error and get no key returned in response.response if you don't also specify CM label.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: true,
            constructorRequest: {
              spaceLabel: "Paris"
            },
            methodCall: {
              assertValidRequest: false,
              methodName: "mapLabels",
              methodRequest: {
                TOP: "gopher"
              }
            },
            testAssertion: {
              description: "response.error should be set and response.result should have no IRUTs.",
              assertionFunction: function assertionFunction(_ref5) {
                var testVectorRequest = _ref5.testVectorRequest,
                    cmasRef = _ref5.cmasRef,
                    methodResponse = _ref5.methodResponse;
                return {
                  error: null,
                  result: [testVectorRequest.chaiAssert.isUndefined(methodResponse.result.CMID || methodResponse.result.APMID || methodResponse.ACTID || methodResponse.TOPID || methodResponse.OTHERID, "We expect response.result to contain no IRUT ID's.")]
                };
              }
            }
          }
        }
      }
    }
  }, {
    // MAPLABELS GET TOP ID W/CM LABEL SPECIFIED
    id: "8XwrM618Rn2GRe5HR5Qu5g",
    name: "".concat(vectorSetName, ": Good constructor w/method call to mapLabels to retrieve TOPID with CM label."),
    description: "You should receive response.error and get no key returned in response.response if you don't also specify CM label.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: true,
            constructorRequest: {
              spaceLabel: "London"
            },
            methodCall: {
              assertValidRequest: true,
              methodName: "mapLabels",
              methodRequest: {
                CM: "apples",
                TOP: "oranges"
              }
            },
            testAssertion: {
              description: "response.result.TOPID should be an IRUT.",
              assertionFunction: function assertionFunction(_ref6) {
                var testVectorRequest = _ref6.testVectorRequest,
                    cmasRef = _ref6.cmasRef,
                    methodResponse = _ref6.methodResponse;
                return {
                  error: null,
                  result: testVectorRequest.chaiAssert.isTrue(arccore.identifier.irut.isIRUT(methodResponse.result.TOPID).result, "response.result.TOPID must be an IRUT")
                };
              }
            }
          }
        }
      }
    }
  }, {
    // MAPLABELS GET OTHER ID LABEL SPECIFIED
    id: "lwnFOtKuSKu__OiZTm9kWQ",
    name: "".concat(vectorSetName, ": Good constructor w/method call to mapLabels to retrieve TOPID with CM label."),
    description: "You should receive response.error and get no key returned in response.response if you don't also specify CM label.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: true,
            constructorRequest: {
              spaceLabel: "Berlin"
            },
            methodCall: {
              assertValidRequest: true,
              methodName: "mapLabels",
              methodRequest: {
                OTHER: "something-else"
              }
            },
            testAssertion: {
              description: "response.result.TOPID should be an IRUT.",
              assertionFunction: function assertionFunction(_ref7) {
                var testVectorRequest = _ref7.testVectorRequest,
                    cmasRef = _ref7.cmasRef,
                    methodResponse = _ref7.methodResponse;
                return {
                  error: null,
                  result: testVectorRequest.chaiAssert.isTrue(arccore.identifier.irut.isIRUT(methodResponse.result.OTHERID).result, "response.result.OTHERID must be an IRUT")
                };
              }
            }
          }
        }
      }
    }
  }, {
    id: "5HEaG_IAQeSXqUkUDK5Q7Q",
    name: "".concat(vectorSetName, ": Good constructor w/method call to makeSubspaceInstance w/missing request."),
    description: "Call to makeSubspaceInstance method should fail.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: true,
            constructorRequest: {
              spaceLabel: "Santorini"
            },
            methodCall: {
              assertValidRequest: false,
              methodName: "makeSubspaceInstance"
            }
          }
        }
      }
    }
  }, {
    id: "E5aKxjHfRh68Oh6JuueTjQ",
    name: "".concat(vectorSetName, ": Good constructor w/method call to makeSubspaceInstance w/valid spaceLabel."),
    description: "We should be able to instantiate a new subspace from valid CMAS instance.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            assertValidInstance: true,
            constructorRequest: {
              spaceLabel: "Barcelona"
            },
            methodCall: {
              assertValidRequest: true,
              methodName: "makeSubspaceInstance",
              methodRequest: {
                spaceLabel: "Porto"
              }
            }
          }
        }
      }
    }
  }
  /*
     "oUCkDaKBSgei1XNvY1yE1Q",
    "2KIaVvwsSxSD2Dyj53lyVg",
    "s-uVM0e6RImX-9TZeYZbEA",
    "NpgvDZZWTPy3btzatk-Cqg",
    "iZfChGV0Q8mPFdsE82-Tkw",
    "-RYGwvHbT4u5hbfkTvo4tw",
    "T_ksgcb_RyuZWcOigvI26Q",
    "C9bgSrO3TB27UTiv5MKh5Q",
    "Yt7Jj_pXRGWhVZMbrMZyKw",
    "KT8hP61NSGSbccDYsSAvLA",
    "rNLzI4aCQPKesT5A5lJi5A",
    "mdVHoVxCQ2OPRa7fBQrrAw",
    "bWB4Z7JnQhW1DJi8B4ropg",
    "IW7NhjJXTD-NLrdxwicK_g"
  */
  ];
})();