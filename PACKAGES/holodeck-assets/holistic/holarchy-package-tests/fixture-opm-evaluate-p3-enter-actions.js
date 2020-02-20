"use strict";

// fixture-opm-evaluate-p3-enter-actions.js
var holarchy = require("@encapsule/holarchy");

module.exports = [new holarchy.AbstractProcessModel({
  id: "I3ja3B00Rj-PIXnDrzQzNg",
  name: "OPM Eval P3 Test #1",
  description: "A simple OPM (force controller action enter error - bad message)",
  steps: {
    uninitialized: {
      description: "Default starting process step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "goal"
      }]
    },
    goal: {
      description: "Test goal step.",
      actions: {
        enter: [{
          noneSuchControllerAction: true
        }]
      }
    }
  }
}), new holarchy.AbstractProcessModel({
  id: "71VGW5zbRLiDf7E_2tFJ3g",
  name: "OPM Eval P3 Test #2",
  description: "A simple OPM (force controller action enter error - action transport error)",
  steps: {
    uninitialized: {
      description: "Default starting process step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "goal"
      }]
    },
    goal: {
      description: "Test goal step.",
      actions: {
        enter: [{
          badControllerActionResponseError: true
        }]
      }
    }
  }
}), new holarchy.AbstractProcessModel({
  id: "maPNVFgWTduQ5vMiDU2sEw",
  name: "OPM Eval P3 Test #3",
  description: "A simple OPM (force controller action enter error - action exception)",
  steps: {
    uninitialized: {
      description: "Default starting process step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "goal"
      }]
    },
    goal: {
      description: "Test goal step.",
      actions: {
        enter: [{
          badControllerActionThrowError: true
        }]
      }
    }
  }
})];