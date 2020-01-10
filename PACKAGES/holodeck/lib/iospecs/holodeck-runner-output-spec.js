"use strict";

module.exports = {
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
                ____accept: "jsObject" // TODO: I think we rely on the harness dispatcher to discriminate this? Yea - I think that the harness factory provides strong gaurantees. Confirm, and remove this todo.

              },
              harnessResponse: {
                ____types: "jsObject",
                error: {
                  ____accept: ["jsNull", "jsString"]
                },
                result: {
                  ____opaque: true // we cannot reasonably predict this value at this level of abstraction

                }
              }
            }
          }
        }
      }
    }
  }
};