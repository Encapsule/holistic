"use strict";

module.exports = {
  ____label: "Holodeck Runner Output Spec",
  ____description: "Defined the output format for a @encapsule/holodeck runner filter response.result.",
  ____types: "jsObject",
  ____asMap: true,
  holodeckRunnerId: {
    ____types: "jsObject",
    summary: {
      ____types: "jsObject",
      requests: {
        ____types: "jsNumber"
      },
      runnerStats: {
        ____types: "jsObject",
        dispatched: {
          ____types: "jsArray",
          evalIndex: {
            ____types: "jsString"
          }
        },
        rejected: {
          ____types: "jsArray",
          evalIndex: {
            ____types: "jsString"
          }
        },
        errors: {
          ____types: "jsArray",
          evalIndex: {
            ____types: "jsString"
          }
        }
      },
      runnerEval: {
        // TODO: These are placeholders for some TBD analysis stage to be added
        // as a CI/CD quality gate. Minimally, this should check for diffs in
        // idempotent function vector eval logs and reject the build. But, it
        // could actually get quite a lot more sophisticated than that depending
        // on project requirements. Anyway, manual inspection of diffs is holding
        // up pretty well so far. And, this will be simpler to automate later.
        ____types: "jsObject",
        neutral: {
          ____types: "jsArray",
          evalIndex: {
            ____types: "jsString"
          }
        },
        pass: {
          ____types: "jsObject",
          expected: {
            ____types: "jsArray",
            evalIndex: {
              ____types: "jsString"
            }
          },
          actual: {
            ____types: "jsArray",
            evalIndex: {
              ____types: "jsString"
            }
          }
        },
        fail: {
          ____types: "jsObject",
          expected: {
            ____types: "jsArray",
            evalIndex: {
              ____types: "jsString"
            }
          },
          actual: {
            ____types: "jsArray",
            evalIndex: {
              ____types: "jsString"
            }
          }
        }
      }
    },
    harnessEvalDescriptors: {
      ____types: "jsArray",
      harnessEvalDescriptor: {
        ____types: "jsObject",
        ____asMap: true,
        holodeckRunnerEvalReportId: {
          ____types: "jsObject",
          ____asMap: true,
          holodeckHarnessId: {
            ____types: "jsObject",
            ____asMap: true,
            vectorId: {
              ____types: "jsObject",
              harnessRequest: {
                ____accept: "jsObject" // This has already been filtered through the harness filter's output stage

              },
              harnessResponse: {
                ____types: "jsObject",
                error: {
                  ____accept: ["jsNull", "jsString"]
                },
                result: {
                  ____opaque: true
                } // we cannot reasonably predict this value at this level of abstraction

              }
            }
          }
        }
      }
    }
  }
};