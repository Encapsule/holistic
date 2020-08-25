"use strict";

// apm-timeout-timer
module.exports = {
  id: "vWteGvhLQZq5C_OXd4p7Ig",
  name: "Timeout Timer Process Model",
  description: "Starts an timeout timer and tracks its async completion state.",
  ocdDataSpec: {
    ____types: "jsObject",
    construction: {
      ____types: "jsObject",
      timeoutMs: {
        ____types: "jsNumber"
      }
    },
    "private": {
      ____types: "jsObject",
      ____defaultValue: {},
      toJSON: {
        ____accept: "jsFunction",
        ____defaultValue: function ____defaultValue() {
          return {
            timeoutTimer: {
              status: "running"
            }
          };
        }
      },
      timeoutTimer: {
        ____accept: ["jsNull", "jsObject"],
        ____defaultValue: null
      }
    },
    outputs: {
      ____types: "jsObject",
      ____defaultValue: {},
      timeoutEllapsed: {
        ____accept: ["jsNull", "jsNumber"],
        ____defaultValue: null
      }
    }
  },
  // timeout timer OCD spec
  steps: {
    // ----------------------------------------------------------------
    uninitialized: {
      description: "Default step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "wait_timeout_timer"
      }],
      actions: {
        exit: [{
          startTimeoutTimer: {}
        }]
      }
    },
    // uninitialized
    // ----------------------------------------------------------------
    wait_timeout_timer: {
      description: "Waiting for the timeout timer to complete.",
      transitions: [{
        transitionIf: {
          holarchy: {
            cm: {
              operators: {
                ocd: {
                  isNamespaceTruthy: {
                    path: "#.outputs.timeoutEllapsed"
                  }
                }
              }
            }
          }
        },
        nextStep: "timeout_timer_expired"
      }]
    },
    // wait_timeout_timer
    // ----------------------------------------------------------------
    timeout_timer_expired: {
      description: "The specified timeout has ellapsed."
    } // timeout_timer_expired

  } // timeout timer steps

}; // timeout timer apm