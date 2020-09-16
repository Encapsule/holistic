"use strict";

// Defines the format of response.result returned by ObservableProcessController::_evaluate filter.
var opcEvalResultSpec = {
  ____label: "OPC Evaluation Result",
  ____description: "Descriptor object that models the response result output of the OPC evaluation filter. This information is used to analyze and test the inner workings of an OPC instance.",
  ____types: "jsObject",
  evalNumber: {
    ____label: "OPC Evaluation Number",
    ____description: "Monotonically increasing count of evaluations since this OPC class instance was constructed.",
    ____accept: "jsNumber"
  },
  // TOP LEVEL SUMMARY OF THE EVALUATION.
  summary: {
    ____label: "OPC Evaluation Summary",
    ____description: "A descriptor object containing OPC evaluation summary metrics.",
    ____types: "jsObject",
    ____defaultValue: {},
    evalStopwatch: {
      ____label: "OPC Evaluation Timing Data",
      ____description: "A descriptor object that models a microsecond-precision time series of labeled evaluation events that allow accurate measurment of all phases of OPC evaluation.",
      ____accept: "jsObject" // TODO: Keep going down the tree... This is important which is why we're passing this data through a filter ;-)

    },
    counts: {
      ____types: "jsObject",
      bindings: {
        ____label: "Total Bindings",
        ____description: "Total number of bindings processed for all frames evaluated.",
        ____accept: "jsNumber"
      },
      frames: {
        ____label: "Total Frames",
        ____description: "Total number of frames evaluated.",
        ____accept: "jsNumber"
      },
      errors: {
        ____label: "Total Errors",
        ____description: "Total number of errors that occured.",
        ____accept: "jsNumber"
      },
      transitions: {
        ____label: "Total Transitions",
        ____description: "Total number of APM instances.",
        ____accept: "jsNumber"
      }
    } // counts

  },
  // summary
  evalFrames: {
    ____label: "OPC Evaluation Frames",
    ____description: "The evaluation frames array is an ordered list of one or more evaluation frames.",
    ____types: "jsArray",
    evalFrame: {
      ____label: "OPC Evaluation Frame",
      ____description: "An evaluation frame comprises some outer summary information. And, a map of APM instances evaluated during the frame.",
      ____types: "jsObject",
      summary: {
        ____types: "jsObject",
        counts: {
          ____types: "jsObject",
          bindings: {
            ____label: "Total Bindings",
            ____description: "Total number of APM instances discovered and bound for evaluation.",
            ____accept: "jsNumber"
          },
          transitions: {
            ____label: "Total Transitions",
            ____description: "Total number of bound APM instances that transitioned from one process step to another in this frame.",
            ____accept: "jsNumber"
          },
          errors: {
            ____label: "Total Errors",
            ____description: "Total number of error(s) that occurred during the evaluation of this frame.",
            ____accept: "jsNumber"
          }
        },
        reports: {
          ____types: "jsObject",
          transitions: {
            ____label: "Transitioned APM Instances",
            ____description: "An array of the APM instances that transitioned in this frame.",
            ____types: "jsArray",
            element: {
              ____label: "APM Instance IRUT",
              ____accept: "jsString"
            }
          },
          errors: {
            ____label: "Failed APM Instances",
            ____description: "An array of the APM instances that reported an error in this frame.",
            ____types: "jsArray",
            element: {
              ____label: "APM Instance IRUT",
              ____accept: "jsString"
            }
          }
        }
      },
      // summary
      bindings: {
        ____label: "APM Instance Binding Map",
        ____description: "A map that relates the OCD pathnames to bound APM instances evaluated during this frame.",
        ____types: "jsObject",
        ____asMap: true,
        // This is the filter-style dot-delimited absolute path to the APM instance's backing data in the OCD.
        ocdDataPathIRUT: {
          ____label: "APM Instance Frame",
          ____description: "A descriptor object that models the output of the APM instance frame.",
          ____types: "jsObject",
          evalRequest: {
            ____label: "APM Instance Evaluation Context",
            ____description: "A descriptor object that models the input to the APM instance evaluation algorithm.",
            ____types: "jsObject",
            dataBinding: {
              ____label: "APM Instance Binding",
              ____description: "A descriptor object that models that information required to evaluate the APM instance against it's binding namespace in the OCD.",
              ____types: "jsObject",
              dataPath: {
                ____label: "Data Binding Path",
                ____description: "A filter-style dot-delimited namespace path URI referencing this APM instance's shared data object in the OCD.",
                ____accept: "jsString"
              },

              /* Clip this reference into the CDS out of the response.result
              dataRef: {
                  ____label: "Data Binding Reference",
                  ____description: "A reference to the CDS data namespace bound to this APM instance (always a descriptor object).",
                  ____accept: "jsObject" // This will always be an object because APM instances may only be bound to objects used has descriptors (as opposed to a dictionary/map/associative array)
              },
              */
              specPath: {
                ____label: "Data Binding Spec Path",
                ____description: "A filter-style dot-delimited namespace path URI referencing the filter spec namespace descriptor associated with dataPath.",
                ____accept: "jsString"
              }
              /* Clip this reference into the CDS out of the response.result
              specRef: {
                  ____label: "Data Binding Spec Reference",
                  ____description: "A reference to the filter spec namespace descriptor associated with dataRef.",
                  ____accept: "jsObject" // This will always be an object because filter specs are always objects.
              }
              */

            },
            initialStep: {
              ____label: "Initial Step",
              ____description: "The initial process step this APM instance was found to be in at the beginning of the evaluation frame.",
              ____accept: "jsString"
            },
            apmRef: {
              ____label: "APM Reference",
              ____description: "A reference to the ObservableProcessModel instance bound to this data namespace in the CDS.",
              ____accept: "jsObject"
            }
          },
          evalResponse: {
            ____label: "APM Instance Evaluation Response",
            ____description: "A descriptor object that models the detailed output of the APM instance evaluation frame algorithm suitable for use in development tools.",
            ____types: "jsObject",
            status: {
              ____label: "APM Frame Status",
              ____description: "A string enumeration similar to a process step name indicating the status of this specific APM instance evaluation in the context of this evaluation frame.",
              ____accept: "jsString",
              ____inValueSet: ["pending", "analyzing", "noop", "transitioning", "transitioned", "cell-deleted", "error"]
            },
            // status
            finishStep: {
              ____label: "Finish Step",
              ____description: "The final process step this APM instance was left in at the end of the evaluation frame.",
              ____accept: "jsString"
            },
            // finishStep
            phases: {
              ____types: "jsObject",
              p1_toperator: {
                // APM step transition operator request message dispatch response sequence
                ____types: "jsArray",
                evalDescriptor: {
                  ____accept: "jsObject" // TODO complete this

                }
              },
              // p1
              p2_exit: {
                // APM step exit action request message dispatch response sequence
                ____types: "jsArray",
                evalDescriptor: {
                  ____accept: "jsObject" // TODO complete this

                }
              },
              // p2
              p3_enter: {
                // APM step enter action request message dispatch response sequence
                ____types: "jsArray",
                evalDescriptor: {
                  ____accept: "jsObject" // TODO complete this

                }
              },
              // p3
              p4_finalize: {
                // APM step transition finalize response
                ____accept: ["jsObject", "jsNull"] // TODO: Finish this filter response spec

              } // p4

            },
            errors: {
              ____types: "jsObject",
              ____defaultValue: {},
              p1_toperator: {
                ____types: "jsNumber"
              },
              p2_exit: {
                // exit action dispatch
                ____types: "jsNumber"
              },
              p3_enter: {
                // enter action dispatch
                ____types: "jsNumber"
              },
              p4_finalize: {
                // finalize
                ____types: "jsNumber"
              },
              total: {
                // total
                ____types: "jsNumber"
              }
            } // errors

          } // evaluationResponse

        } // cdsDataPathIRUT

      } // bindings

    } // evalFrame

  } // evaluationFrames

}; // opcEvalResultSpec

module.exports = opcEvalResultSpec;