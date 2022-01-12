"use strict";

module.exports = [// ----------------------------------------------------------------
// CellProcessor constructor instance validity check tests.
{
  id: "ZbzwN2woTim3PLBDitJsBg",
  name: "CellProcessor Test Harness Validation: CP Instance Validity #1",
  description: "Invalid CellProcessor instance w/validity option set to ignore-never-fail",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          // INVALID INSTANCE
          constructorRequest: {},
          // IGNORE EVERYTHING
          options: {
            failTestIf: {
              CellProcessor: {
                instanceValidity: "ignore-never-fail"
              }
            }
          }
        }
      }
    }
  }
}, {
  id: "dGIQED1kTSOnOG0czgVdrg",
  name: "CellProcessor Test Harness Validation: CP Instance Validity #2",
  description: "Valid CellProcessor instance w/validity option set to fail-if-instance-invalid.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          // VALID INSTANCE
          constructorRequest: {
            id: "jkFqt42KQNmArvuMk3gwoA",
            name: "Useless CP",
            description: "A CP w/an empty CellModel artifact container.",
            cellmodel: {
              id: "KhTbbWgCSVGG1YyW0QOylw",
              name: "Empty artifact container",
              description: "Empty artifact container."
            }
          },
          // FAIL IF INSTANCE INVALID
          options: {
            failTestIf: {
              CellProcessor: {
                instanceValidity: "fail-if-instance-invalid"
              }
            }
          }
        }
      }
    }
  }
}, {
  id: "TkqAmiF8TR-S70xy2BTW6g",
  name: "CellProcessor Test Harness Validation: CP Instance Validity #3",
  description: "Invalid CellProcessor instance w/validity option set to fail-if-instance-valid",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          // INVALID INSTANCE
          constructorRequest: {},
          options: {
            failTestIf: {
              CellProcessor: {
                instanceValidity: "fail-if-instance-valid"
              }
            }
          }
        }
      }
    }
  }
}, // ----------------------------------------------------------------
// CellProcessor constructor instance OPC warnings check tests.
{
  id: "HUsKwZgXS2eEwXBA543ETQ",
  name: "Cell Processor Test Harness Validation: CP Instance OPC Warnings #1",
  description: "Valid CellProcessor instance w/OPC construction warnings w/option set to ignore-never-fail.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          constructorRequest: {
            id: "jkFqt42KQNmArvuMk3gwoA",
            name: "Useless CP",
            description: "A CP w/an empty CellModel artifact container.",
            cellmodel: {
              id: "KhTbbWgCSVGG1YyW0QOylw",
              name: "Empty artifact container",
              description: "Empty artifact container.",
              apm: {
                id: "8lO-N2bGSWCvTLSQ6qjuDA",
                name: "Test",
                description: "Test",
                ocdDataSpec: {
                  ____types: "jsObject",
                  missingAPMBinding: {
                    ____types: "jsObject",
                    ____appdsl: {
                      apm: "gPJo-75-TeqQqycMBUOl4g"
                    }
                  }
                }
              }
            }
          },
          options: {
            failTestIf: {
              CellProcessor: {
                validInstanceHasOPCWarnings: "ignore-never-fail"
              }
            }
          }
        }
      }
    }
  }
}, {
  id: "nFbr0AznSVSVtlkvEMI_oQ",
  name: "Cell Processor Test Harness Validation: CP Instance OPC Warnings #2",
  description: "Valid CellProcessor instance w/out OPC construction warnings w/option set to fail-if-opc-has-warnings.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          // VALID INSTANCE
          constructorRequest: {
            id: "jkFqt42KQNmArvuMk3gwoA",
            name: "Useless CP",
            description: "A CP w/an empty CellModel artifact container.",
            cellmodel: {
              id: "KhTbbWgCSVGG1YyW0QOylw",
              name: "Empty artifact container",
              description: "Empty artifact container."
            }
          },
          // FAIL IF INSTANCE INVALID
          options: {
            failTestIf: {
              CellProcessor: {
                validInstanceHasOPCWarnings: "fail-if-opc-has-warnings"
              }
            }
          }
        }
      }
    }
  }
}, {
  id: "dFolq4AkR7KKXpPHCv1xxA",
  name: "Cell Processor Test Harness Validation: CP Instance OPC Warnings #3",
  description: "Valid CellProcessor instance w/out OPC constuction warnings w/option set to fail-if-opc-no-warnings.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          constructorRequest: {
            id: "jkFqt42KQNmArvuMk3gwoA",
            name: "Useless CP",
            description: "A CP w/an empty CellModel artifact container.",
            cellmodel: {
              id: "KhTbbWgCSVGG1YyW0QOylw",
              name: "Empty artifact container",
              description: "Empty artifact container.",
              apm: {
                id: "8lO-N2bGSWCvTLSQ6qjuDA",
                name: "Test",
                description: "Test",
                ocdDataSpec: {
                  ____types: "jsObject",
                  missingAPMBinding: {
                    ____types: "jsObject",
                    ____appdsl: {
                      apm: "gPJo-75-TeqQqycMBUOl4g"
                    }
                  }
                }
              }
            }
          },
          options: {
            failTestIf: {
              CellProcessor: {
                validInstanceHasOPCWarnings: "fail-if-opc-no-warnings"
              }
            }
          }
        }
      }
    }
  }
}, // ----------------------------------------------------------------
// CellProcessor constructor instance OPC evaluation error check tests.
// CellProcessor constructor wholely controls its contained OPC instance which is configured
// to boot the Cell Process Manager on first post-OCD-construction cell evaluation. So, effectively
// this check ensures that CPM init is error free (and is mostly for me as I get CPM to 100%.
{
  id: "jstoFsQASMiDUod4cWi7ng",
  name: "Cell Processor Test Harness Validation: CP Instance OPC Eval Errors #1",
  description: "Valid CellProcessor instance w/out OPC eval errors w/option set to ignore-never-fail.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          constructorRequest: {
            id: "XJvdfr3rSMGQqBouaokSyw",
            name: "Test",
            description: "test",
            cellmodel: {
              id: "qfIRmPgiTDO9-wILP-sJ9w",
              name: "Test",
              description: "test"
            }
          },
          options: {
            failTestIf: {
              CellProcessor: {
                validInstanceHasOPCErrors: "ignore-never-fail"
              }
            }
          }
        }
      }
    }
  }
}, {
  id: "x_xwDVChTj-t37Aj6uKqhA",
  name: "Cell Processor Test Harness Validation: CP Instance OPC Eval Errors #2",
  description: "Valid CellProcessor instance w/out OPC eval errors w/option set to fail-if-opc-has-errors.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          constructorRequest: {
            id: "XJvdfr3rSMGQqBouaokSyw",
            name: "Test",
            description: "test",
            cellmodel: {
              id: "qfIRmPgiTDO9-wILP-sJ9w",
              name: "Test",
              description: "test"
            }
          },
          options: {
            failTestIf: {
              CellProcessor: {
                validInstanceHasOPCErrors: "fail-if-opc-has-errors"
              }
            }
          }
        }
      }
    }
  }
}
/*
{
id: "LU3zc_bESi-BTSffMSd1Ig",
name: "Cell Processor Test Harness Validation: CP Instance OPC Eval Errors #3",
description: "Valid CellProcessor instance w/out OPC eval errors w/option set to fail-if-opc-no-errors.",
},
{
id: "r3Pd4z1rT_CoxkKwS8OWMw",
name: "CellProcessor Test Harness Validation: CP Instance OPC Eval Errors #4",
description: "Valid CellProcessor instance w/OPC eval errors w/option set to ignore-never-fail.",
},
{
id: "7_g8XPTkSmWrZtBC8isDnQ",
name: "CellProcessor Test Harness Validation: CP Instance OPC Eval Errors #5",
description: "Valid CellProcessor instance w/OPC eval errors w/option set to fail-if-opc-errors.",
},
{
id: "dKLcKfm4Ss-obNBg48j4SA",
name: "CellProcessor Test Harness Validation: CP Instance OPC Eval Errors #6",
description: "Valid CellProcessor instance w/OPC eval errors w/option set to fail-if-opc-no-errors.",
},
*/

/*
  "yyDE9znfSJW_T6TrzfXzgA",
  "xvb0c-VzSiuKAnngcRBJ5Q",
  "WeyHLLC0RxWgh-VsYw4L3Q",
  "jYnG6ecqQ_qlUcmOQ4fQ0w",
  "HR_wBdI_SyisTUsyw5K1Xw",
  "QwIjMPlOQCiaEI8PupatGQ",
  "euMr76hISky4UOuKElHgvQ"
*/
];