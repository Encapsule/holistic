"use strict"; // AbstractProcessModel-frame-latch-declaration.js
// DON'T USE THIS FOR ANYTHING YET! DO NOT DERIVE FROM THIS...

var apmFrameLatchDeclaration = module.exports = {
  id: "z_mTe02hSWmaM1iRO1pBeA",
  name: "Abstract Frame Latch",
  description: "Frame latch provides a way to create a value and attach a model that transitions between waiting and updated process steps whenever the value is written. This allows consumers of the value (other OPM typically) to monitor frame latch process to know when the value is updated so that they can read the new value and do whatever they need to with it.",
  ocdDataSpec: {
    ____label: "Abstract Frame Latch",
    ____types: "jsObject",
    ____defaultValue: {},

    /*
      This is an interesting subproblem I am not going to solve right now.
      There are controller actions associated with this OPM that reference value.
      The intent is to let whoever binds this OPM to define value. But, we have
      no good way at present to distinguish between precedent. And, the merge
      semantics become considerably less trivial. So for now, I'm just removing
      the definition and will see how bad it is for developers to deal with
      the error that will occur when, for example, the controller actions
      that attempts to write value fails because it's not defined in the OCD
      runtime spec.
             value: {
             ____opaque: true
             },
    */
    clock: {
      ____accept: "jsBoolean",
      ____defaultValue: false
    }
  },
  steps: {
    uninitialized: {
      description: "Default starting process step.",
      transitions: [{
        nextStep: "updated",
        transitionIf: {
          always: true
        }
      }],
      actions: {
        exit: [{
          holarchy: {
            cm: {
              actions: {
                ocd: {
                  setBooleanFlag: {
                    path: "#.clock"
                  }
                }
              }
            }
          }
        }]
      }
    },
    updated: {
      description: "The value managed by the frame latch has been written.",
      transitions: [{
        nextStep: "waiting",
        transitionIf: {
          always: true
        }
      }],
      actions: {
        exit: [{
          holarchy: {
            cm: {
              actions: {
                ocd: {
                  clearBooleanFlag: {
                    path: "#.clock"
                  }
                }
              }
            }
          }
        }]
      }
    },
    waiting: {
      description: "Frame latch value has not changed since last signalled update.",
      transitions: [{
        nextStep: "updated",
        transitionIf: {
          holarchy: {
            cm: {
              operators: {
                ocd: {
                  isBooleanFlagSet: {
                    path: "#.clock"
                  }
                }
              }
            }
          }
        }
      }]
    }
  }
};