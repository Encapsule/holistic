"use strict";

var holarchy = require("@encapsule/holarchy");

var fixtureACTExamples = require("./fixture-act-examples");

var apmBindingSuccess = new holarchy.AbstractProcessModel({
  id: "jDGvZvHASx-U1cV497Oamw",
  name: "test",
  description: "Binding SUCCESS!"
});
module.exports = [{
  id: "gwtkQR51TYm93K32K6QHNA",
  name: "Undefined constructor request",
  description: "Send nothing (undefined) to OPC constructor.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: undefined
        }
      }
    }
  }
}, {
  id: "iQ5RngZ0QNyH67mVrlwo4w",
  name: "Barely defined constructor request",
  description: "Send nothing but an empty object to OPC constructor.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {}
        }
      }
    }
  }
}, {
  id: "QvEwWTkbT8G_SQsmWmg2zQ",
  name: "Minimal constructor request #1: Invalid ID",
  description: "Test basic constructor request variant #1 by passing a bad IRUT as the ID.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "fail"
          }
        }
      }
    }
  }
},
/* DISABLE THIS VECTOR BECAUSE IT PRODUCES UNSTABLE OUTPUT DUE TO RELIANCE ON arccore.identifier.irut.fromEther()
{
    id: "pcAvtzoITt-q-ut90VhcVA",
    name: "Minimal constructor with 'demo' ID",
    description: "Use the magic 'demo' id to get a randomly generated IRUT assigned to the ID.",
    vectorRequest: {
        holistic: {
            holarchy: {
                ObservableProcessController: {
                    constructorRequest: { id: "demo" }
                }
            }
        }
    }
},
*/
{
  id: "l_P652EhQU6_z7afrV-PMQ",
  name: "Minimal constructor valid ID all default inputs",
  description: "Confirm default construction variant #1",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "l_P652EhQU6_z7afrV-PMQ"
          }
        }
      }
    }
  }
}, {
  id: "juolo4dqSgKdLEYLoHJJ1Q",
  name: "Miniaml constructor w/minimal valid ocdTemplateSpec",
  description: "Confirm minimal ocdTemplateSpec same as default construction.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "juolo4dqSgKdLEYLoHJJ1Q",
            name: "Valid ID w/minimal but valid custom opaque ocd template spec.",
            ocdTemplateSpec: {
              ____types: "jsObject"
            }
          }
        }
      }
    }
  }
}, {
  id: "dirl1VuNQCmBrzbJXWMTtA",
  name: "Invalid OCD template spec #1",
  description: "OCD template spec must be a valid filter spec #1",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "dirl1VuNQCmBrzbJXWMTtA",
            ocdTemplateSpec: {}
          }
        }
      }
    }
  }
}, {
  id: "ChcuyPLCSQCsICTprPzfog",
  name: "Invalid OCD template spec #2",
  description: "OCD template spec must be a valid filter spec #2",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "ChcuyPLCSQCsICTprPzfog",
            ocdTemplateSpec: {
              ____notAQunderscoreDirective: true
            }
          }
        }
      }
    }
  }
}, {
  id: "ZbwxkWJgTEKjxXpYX0_h7Q",
  name: "Invliad OCD template spec #3",
  description: "OCD template spec ~ namespace is not allowed to use the ____opaque directive.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "ZbwxkWJgTEKjxXpYX0_h7Q",
            ocdTemplateSpec: {
              ____opaque: true
            } // valid filter spec, invalid OCD template spec

          }
        }
      }
    }
  }
}, {
  id: "X5zbSBkaQeG6Wft5cGVRwg",
  name: "Invalid OCD template spec #4",
  description: "OCD template namespace ~ is not allowed to specify any value other that jsObject for ____types directive.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "X5zbSBkaQeG6Wft5cGVRwg",
            ocdTemplateSpec: {
              ____types: "jsString"
            } // valid filter spec, invalid OCD template spec

          }
        }
      }
    }
  }
}, {
  id: "ElMglky8TBGkzkd6W4690A",
  name: "OCD template spec typically specifies ____types jsObject.",
  description: "OCD template spec ~ namespace is NOT allowed to use the ____accept jsObject directive.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "vi6NeCCXSG61m6OMk7KZyw",
            ocdTemplateSpec: {
              ____accept: "jsObject"
            } // okay?

          }
        }
      }
    }
  }
}, {
  id: "waM_L9rTT6ySTY4ja__K3g",
  name: "Invalid OCD template spec #5",
  description: "OCD template namespace ~ is NOT allowed to use ____types: [].",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "waM_L9rTT6ySTY4ja__K3g",
            ocdTemplateSpec: {
              ____types: ["jsObject"]
            } // valid filter spec, invalid OCD template spec

          }
        }
      }
    }
  }
}, {
  id: "nCoUIS0RTlmuKUSpimee7A",
  name: "Invalid OCD template spec #7",
  description: "OCD template namespace ~ is only allowed to use one quanderscore directive, ____types.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "nCoUIS0RTlmuKUSpimee7A",
            ocdTemplateSpec: {
              ____types: "jsObject",
              ____defaultValue: {}
            }
          }
        }
      }
    }
  }
}, {
  id: "FxMOqQPARcGcMZ24x2tq7A",
  name: "Invalid OCD template spec #7",
  description: "Test our ability to extend the OPC-managed root namespace, ~.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "FxMOqQPARcGcMZ24x2tq7A",
            ocdTemplateSpec: {
              ____types: "jsObject",
              testString: {
                ____label: "Test Namespace 1",
                ____accept: "jsString",
                ____defaultValue: "Please specify a value for ~.testString."
              }
            }
          }
        }
      }
    }
  }
}, {
  id: "fzc39RvNTLmHF5UNn_-Fng",
  name: "Valid ID, ocdTemplateSpec, data",
  description: "Valid OPC instance + dev ocdTemplateSpec + invalid valid init data",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "fzc39RvNTLmHF5UNn_-Fng",
            ocdTemplateSpec: {
              ____types: "jsObject",
              testString: {
                ____label: "Test Namespace 1",
                ____accept: "jsString",
                ____defaultValue: "Please specify a value for ~.testString."
              }
            },
            ocdInitData: {
              testString: 3.1415926536
            }
          }
        }
      }
    }
  }
}, {
  id: "DipB21oZR5ihBCYESC5HWw",
  name: "Valid ID, ocdTemplateSpec, data",
  description: "Valid OPC instance + dev ocdTemplateSpec + valid init data",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "DipB21oZR5ihBCYESC5HWw",
            ocdTemplateSpec: {
              ____types: "jsObject",
              testString: {
                ____label: "Test Namespace 1",
                ____accept: "jsString",
                ____defaultValue: "Please specify a value for ~.testString."
              }
            },
            ocdInitData: {
              testString: "Hello, World!"
            }
          }
        }
      }
    }
  }
}, {
  id: "np4M1LDWSyeNXOmFYJulhA",
  name: "Invalid OPC template spec binding #1",
  description: "Pass an OCD template spec w/invalid APM binding IRUT",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "np4M1LDWSyeNXOmFYJulhA",
            ocdTemplateSpec: {
              ____types: "jsObject",
              app: {
                ____types: "jsObject",
                ____defaultValue: {},
                ____appdsl: {
                  apm: "not and IRUT"
                }
              }
            }
          }
        }
      }
    }
  }
}, {
  id: "197ZsgbfRRGGMWqhwmaBDg",
  name: "Invalid OPC template spec binding #2",
  description: "OCD spec namespace bound to APM not allowed to use ____opaque directive.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "197ZsgbfRRGGMWqhwmaBDg",
            ocdTemplateSpec: {
              ____types: "jsObject",
              badNamespace: {
                ____opaque: true,
                ____appdsl: {
                  apm: "197ZsgbfRRGGMWqhwmaBDg"
                } // valid IRUT so we'll check the binding namespace type constraint

              }
            }
          }
        }
      }
    }
  }
}, {
  id: "rxFiX7H-TDG0GsxqtRekoA",
  name: "Invalid OPC template spec binding #3",
  description: "OCD spec namespace bound to unregistered APM tests ability for dev to bind to an ____accept object. Should fail due to missing APM registration.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "rxFiX7H-TDG0GsxqtRekoA",
            ocdTemplateSpec: {
              ____types: "jsObject",
              badNamespace: {
                ____accept: "jsObject",
                ____defaultValue: {},
                ____appdsl: {
                  apm: "rxFiX7H-TDG0GsxqtRekoA"
                }
              }
            }
          }
        }
      }
    }
  }
}, {
  id: "Pe4ks7bQQ9KQee1T8qTRHw",
  name: "Invalid OPC Template sepc binding #4",
  description: "OCD spec namespace bound to APM IS allowed to specify an array of values to ____types directive (w/restrictions not tested here).",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "Pe4ks7bQQ9KQee1T8qTRHw",
            ocdTemplateSpec: {
              ____types: "jsObject",
              badNamespace: {
                ____types: ["jsObject"],
                // array of type constraints allowed
                ____appdsl: {
                  apm: "jDGvZvHASx-U1cV497Oamw"
                },
                // ....so this will be ignored leaving this namespace as-it-is-defined here in the runtime spec
                ____defaultValue: {}
              }
            },
            abstractProcessModelSets: [[apmBindingSuccess]]
          }
        }
      }
    }
  }
}, {
  id: "H2zMrBw4TBie5A2mwH4BRg",
  name: "Invalid OCD template spec binding #5",
  description: "OCD template spec namespace bound to APM must declare ____types: \"jsObject\".",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "H2zMrBw4TBie5A2mwH4BRg",
            ocdTemplateSpec: {
              ____types: "jsObject",
              badNamespace: {
                ____types: "jsArray",
                ____defaultValue: [],
                ____appdsl: {
                  apm: "H2zMrBw4TBie5A2mwH4BRg"
                }
              }
            }
          }
        }
      }
    }
  }
}, {
  id: "VxYuiGoHRfuKRHp7PBik7Q",
  name: "Invalid OCD template spec binding #6",
  description: "OCD template spec namespace bound to APM must not use the ____asMap directive.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "VxYuiGoHRfuKRHp7PBik7Q",
            ocdTemplateSpec: {
              ____types: "jsObject",
              badNamespace: {
                ____types: "jsObject",
                ____defaultValue: {},
                ____asMap: true,
                ____appdsl: {
                  apm: "VxYuiGoHRfuKRHp7PBik7Q"
                },
                mapKey: {
                  ____accept: "jsString"
                }
              }
            }
          }
        }
      }
    }
  }
}, {
  id: "T-apDENPTAO6iQShA-2qBQ",
  name: "Invalid OCD template spec binding #7",
  description: "OCD template spec namespace bound to APM must specify the ID of a registered APM instance to bind.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "T-apDENPTAO6iQShA-2qBQ",
            ocdTemplateSpec: {
              ____types: "jsObject",
              badNamespace: {
                ____types: "jsObject",
                // correct
                ____defaultValue: {},
                // okay
                ____appdsl: {
                  apm: "T-apDENPTAO6iQShA-2qBQ"
                } // not registered

              }
            }
          }
        }
      }
    }
  }
}, {
  id: "bx_3DRETSe6zr-Dz_W-COQ",
  name: "Test OPC options #1",
  description: "Construct an OPC instance specifying override values for constructor options #1.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "bx_3DRETSe6zr-Dz_W-COQ",
            name: "Test OPC options #1",
            description: "Construct an OPC instance specifying override values for constructor options #1 (just test the options passing).",
            options: {
              evaluate: {
                maxFrames: 8,
                firstEvaluation: "action"
              }
            }
          }
        }
      }
    }
  }
}, {
  id: "d7uW2Me4RjqeX3a2NjOodQ",
  name: "Test OPC options #2",
  description: "Construct an OPC instance specifying a zero max frame limit AND constructor evaluate #2 (fail evaluate in constructor).",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "d7uW2Me4RjqeX3a2NjOodQ",
            name: "Test OPC options #2",
            description: "Construct an OPC instance specifying a zero max frame limit AND constructor evaluate #2 (fail evaluate in constructor).",
            options: {
              evaluate: {
                firstEvaluation: "constructor",
                maxFrames: 0
              }
            }
          }
        }
      }
    }
  }
}, {
  id: "l2lMJRfpR7SwIMxriD-pRQ",
  name: "Test OPC options #3",
  description: "Construct an OPC instance specifying a zero max frame limit AND action evaluate #3 (fail on first call to act).",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "l2lMJRfpR7SwIMxriD-pRQ",
            name: "Test OPC options #3",
            description: "Construct an OPC instance specifying a zero max frame limit AND action evaluate #3 (no fail because no act - naked constructed OPC).",
            options: {
              evaluate: {
                firstEvaluation: "action",
                maxFrames: 0
              }
            }
          }
        }
      }
    }
  }
}, {
  id: "fNpBNE0uQ2GJWunuKe3_lA",
  name: "Test OPC options #4",
  description: "Construct an OPC instance specifying a zero max frame limit AND action evaluate #4 (fail on first call to OPC.act).",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "fNpBNE0uQ2GJWunuKe3_lA",
            name: "Test OPC options #4",
            description: "Construct an OPC instance specifying a zero max frame limit AND action evaluate #4 (fail on first call to OPC.act).",
            options: {
              evaluate: {
                maxFrames: 0,
                firstEvaluation: "action"
              }
            },
            controllerActionSets: [fixtureACTExamples]
          },
          actRequests: [{
            actorName: "fNpBNE0uQ2GJWunuKe3_lA",
            actionRequest: {
              noop1: true
            }
          }]
        }
      }
    }
  }
}];