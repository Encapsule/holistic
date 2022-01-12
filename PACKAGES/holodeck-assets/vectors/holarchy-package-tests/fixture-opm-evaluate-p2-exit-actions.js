"use strict";

// fixture-opm-evaluate-p2-exit-actions.js
var holarchy = require("@encapsule/holarchy");

module.exports = [new holarchy.AbstractProcessModel({
  id: "Rgt3dz-6Ra-zqpbnpBrJDg",
  name: "OPM Eval P2 Test #1",
  description: "A simple test OPM (force controller action exit error - bad message)",
  steps: {
    uninitialized: {
      description: "Default starting process step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "goal"
      }],
      actions: {
        exit: [{
          noneSuchControllerAction: true
        }]
      }
    },
    goal: {
      description: "Test goal step (never reached)."
    }
  }
}), new holarchy.AbstractProcessModel({
  id: "P-uhpNlrTseMNDG3D9ahRA",
  name: "OPM Eval P2 Test #2",
  description: "A simple test OPM (force controller action exit error - action transport error)",
  steps: {
    uninitialized: {
      description: "Default starting process step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "goal"
      }],
      actions: {
        exit: [{
          badControllerActionResponseError: true
        }]
      }
    },
    goal: {
      description: "Test goal step (never reached)."
    }
  }
}), new holarchy.AbstractProcessModel({
  id: "alBMdhnYSbijGj64jxm92g",
  name: "OPM Eval P2 Test #3",
  description: "A simple test OPM (force controller action exit - action exception)",
  steps: {
    uninitialized: {
      description: "Default starting process step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "goal"
      }],
      actions: {
        exit: [{
          badControllerActionThrowError: true
        }]
      }
    },
    goal: {
      description: "Test goal step (never reached)."
    }
  }
})];