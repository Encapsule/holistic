"use strict";

module.exports = [// ================================================================
// CASES WE EXPECT TO NOT WORK CONSISTENTLY (IMPORTANT)
{
  id: "VcFs1BSZTLCb8nlIwW3Pmg",
  name: "CellModel Constructor Error #1",
  description: "Default construct holarchy/CellModel ES6 class. Should fail.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: undefined
        }
      }
    }
  }
}, {
  id: "OXCzJI-JT72xRNRuEn51Bw",
  name: "CellModel Constructor Error #2",
  description: "Construct CellModel w/missing top-level metadata to test error handling. Should fail.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: {}
        }
      }
    }
  }
}, {
  id: "Xp1zz6GTQuug4w1umxHPlQ",
  name: "CellModel Constructor Error #2",
  description: "Construct CellModel w/no artifact registrations to test error handling. Should fail, heretic.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: {
            id: "Xp1zz6GTQuug4w1umxHPlQ",
            name: "CellModel Constructor Error #2",
            description: "Construct CellModel w/bad APM registration to test error handling. Should fail."
          }
        }
      }
    }
  }
}, {
  id: "MHVj3IaXR7SIsY1MUwMG_A",
  name: "CellModel Constructor Error #3",
  description: "Construct CellModel w/bad APM registration to test error handling. Should fail."
}, {
  id: "OP9PyLDXTaac7_AHb1qCfg",
  name: "CelModel Constructor Error #4",
  description: "Construct CellModel w/bad TOP registration to test error handling. Should fail."
}, {
  id: "OcoS0S_MRg2traJs1gDQ-g",
  name: "CellModel Constructor Error #5",
  description: "Construct CellModel w/bad ACT registration to test error handling. Should fail."
}, {
  id: "N88iVPFrQJO_VNKqdyrF1Q",
  name: "CellModel Constructor Error #6",
  description: "Construct CellModel w/bad subcell registration to test error handling. Should fail."
}, {
  id: "xhZFsZ7KTFCHaSkVZ_VMXQ",
  name: "CellModel Constructor Error #7",
  description: "Construct CellModel w/bad duplicate ID APM registration to test error handling. Should fail"
}, {
  id: "wtgq7mnyQI-qZXBxv2wTrw",
  name: "CellModel Constructor Error #8",
  description: "Construct CellModel w/bad duplicate ID TOP registration to test error handling. Should fail."
}, {
  id: "FUyhcKKfTeycNWD0JVxkhw",
  name: "CellModel Constructor Error #9",
  description: "Construct CellModel w/bad duplicate ID ACT registration to test error handling. Should fail."
}, {
  id: "OrkMuFl_TyiqVKdt9Qs6Dw",
  name: "CellModel Constructor Error #10",
  description: "Construct CellModel w/bad duplicate ID subcell registration to test error handling. Should fail."
}, {
  id: "Geq5MDymQLKcO9JQe7Lc8w",
  name: "CellModel Constructor Error #11",
  description: "Construct CellModel w/bad duplicate APM registrations that do not deep compare to test error handling. Should fail."
}, {
  id: "QE3J6XhJSHqelGnpFMawzA",
  name: "CellModel Constructor Error #12",
  description: "Construct CellModel w/bad duplicate TOP registrations that do not deep compare to test error handling. Should fail."
}, {
  id: "130L3KaTS3uFybwDdVlWwg",
  name: "CellModel Constructor Error #13",
  description: "Construct CellModel w/bad duplicate ACT registrations that do not deep compare to test error handling. Should fail."
}, {
  id: "HPaNXEH9SYmOZTLlD5jUXg",
  name: "CellModel Constructor Error #14",
  description: "Construct CellModel w/bad duplicate submodel registrations that do not deep compare to test error handling. Should fail."
}, // ================================================================
// CASES WE EXPECT TO WORK
{
  id: "vzmMGynKTy2uu6W8R-1rvQ",
  name: "CellModel Constructor #1",
  description: "Construct CellModel w/single APM registration specified using a constructor request object.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: {
            id: "vzmMGynKTy2uu6W8R-1rvQ",
            name: "CellModel Constructor #2",
            description: "Try to construct a minimally configured CellModel with a mimimally-defined OPM association.",
            apm: {
              id: "cJSBP90NTcu1bJMhCOjbQg",
              name: "Placeholder APM",
              description: "A minimally-configured placeholder."
            }
          }
        }
      }
    }
  }
}, {
  id: "7pAVXoWbTSeZSF4SzLrlxg",
  name: " CellModel Constructor #2",
  description: "Construct CellModel w/single APM registration specified using pre-constructed AbstractProcessModel ES6 class instance."
}, {
  id: "AE_pEJ7LTdSvohEBZl_Bfw",
  name: "CellModel Constructor #3",
  description: "Construct CellModel w/single TOP registration specified using a constructor request object.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: {
            id: "AE_pEJ7LTdSvohEBZl_Bfw",
            name: "CellModel Constructor #3",
            description: "Try to construct a minimally configured CellModel with a single TransitionOperator plug-in.",
            operators: [{
              id: "o3Q4YKI_SLOus82xE7Gaag",
              name: "Placeholder TOP",
              description: "A minimally configured placeholder.",
              operatorRequestSpec: {
                ____accept: "jsObject"
              },
              bodyFunction: function bodyFunction(request_) {
                return {
                  error: null,
                  result: false
                };
              }
            }]
          }
        }
      }
    }
  }
}, {
  id: "5aJ-FcXOSYqqF_ha651qQA",
  name: "CellModel Constructor #4",
  description: "Construct CellModel w/single TOP registration specified using pre-constructed TransitionOperator ES6 class instance."
}, {
  id: "E7xo1-qaSuSrsN5-8jgmRg",
  name: "CellModel Constructor #5",
  description: "Construct CellModel w/single ACT registration specified using a constructor request object.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: {
            id: "E7xo1-qaSuSrsN5-8jgmRg",
            name: "CellModel Constructor #4",
            description: "Try to construct a minimally configured CellModel with a single ControllerAction plug-in.",
            actions: [{
              id: "SXYrt7-1SOe91wpQLWFutQ",
              name: "Fake Test Action",
              description: "A fake test action.",
              actionRequestSpec: {
                ____types: "jsObject",
                whatever: {
                  ____accept: "jsNull"
                }
              },
              bodyFunction: function bodyFunction(request_) {
                return {
                  error: null
                };
              }
            }]
          }
        }
      }
    }
  }
}, {
  id: "zMnQxFBZQuaeu7buQH_qkw",
  name: "CellModel Constructor #6",
  description: "Construct CellModel w/single ACT registration specified using a pre-constructed ControllerAction ES6 class instance."
}, {
  id: "rShJ0riLSiOxLt0OpFJLJA",
  name: "SoftewareCellModel Constructor #7",
  description: "Construct CellModel w/two subcell registrations specified using constructor request objects.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: {
            id: "rShJ0riLSiOxLt0OpFJLJA",
            name: "SoftewareCellModel Constructor #5",
            description: "Try to construct a full (but-ultimately fake) CellModel including subcell definitions.",
            subcells: [{
              id: "HbLgO6RMRRacUTjXqv2Rrw",
              name: "Test Subcell #1",
              description: "Test subcell #1 defines an APM.",
              apm: {
                id: "gA3KJMtcS6K8o5cV4plg3w",
                name: "Test Subcell #1 APM",
                description: "Just a test"
              }
            }, {
              id: "0Yacg-V9QDqmbVlOFMSVVw",
              name: "Test Subcell #2",
              description: "Test subcell #2 defines a TOP.",
              operators: [{
                id: "gcVJ6OIFQfyM6tn194wrsg",
                name: "Test Subcell #2 TOP",
                description: "Just a test",
                operatorRequestSpec: {
                  ____accept: "jsBoolean"
                },
                bodyFunction: function bodyFunction(request_) {
                  return {
                    error: null
                  };
                }
              }]
            }, {
              id: "fZ7sK3URSaK3QR7_IycJrw",
              name: "Test Subcell #3",
              description: "Test subcell #3 defines an ACT",
              actions: [{
                id: "NQmQIuSMTbWYlQtmQr9n0A",
                name: "Test Subcell #3 ACT",
                description: "Just a test",
                actionRequestSpec: {
                  ____accept: "jsBoolean"
                },
                bodyFunction: function bodyFunction(request_) {
                  return {
                    error: null
                  };
                }
              }]
            }]
          }
        }
      }
    }
  }
}];