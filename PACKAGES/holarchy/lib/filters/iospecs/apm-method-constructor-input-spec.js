"use strict";

// apm-method-constructor-input-spec.js
module.exports = {
  ____label: "Abstract Process Model Descriptor",
  ____description: "Declaration of an Abstract Process Model passed as input to AbstractProcessModel::constructor function.",
  ____types: "jsObject",
  id: {
    ____label: "Controller ID",
    ____description: "A unique developer-assigned IRUT identifier. This value is used to bind controller data namespaces to observable process models.",
    ____accept: "jsString"
  },
  name: {
    ____label: "Controller Name",
    ____description: "A pascal-cased string name to be used to reference this specific controller in the context of the application state system model.",
    ____accept: "jsString"
  },
  description: {
    ____label: "Controller Description",
    ____description: "A short description of the function or subsystem that this controller models to help developers understand the application state system model partitioning.",
    ____accept: "jsString"
  },
  ocdDataSpec: {
    ____label: "Runtime Data Spec",
    ____description: "A filter spec that defines this APM's required base properties. At runtime, OCP merges this information w/developer defined props and uses this merge to constrain OCDI.",
    ____accept: "jsObject",
    ____defaultValue: {
      ____types: "jsObject"
    }
  },
  steps: {
    ____label: "Controller Steps Declaration",
    ____description: "An array of controller step descriptors that declare this controller's supported steps, transition conditions, and transition actions.",
    ____types: "jsObject",
    ____defaultValue: {},
    ____asMap: true,
    stepName: {
      ____label: "Controller Step Declaration",
      ____description: "Declaration of a specific controller step.",
      ____types: "jsObject",
      description: {
        ____label: "Step Description (optional)",
        ____description: "Optional short description of the purpose, significance, role, and/or semantic(s) of this step in this controller model.",
        ____accept: "jsString",
        ____defaultValue: "Missing description!"
      },
      actions: {
        ____label: "Step Transition Actions (optional)",
        ____description: "Optional action requests to execute when this APM transitions in and out of this process step.",
        ____types: "jsObject",
        ____defaultValue: {},
        // ~.steps.stepName.actions.enter is a queue of messages that models a sequence of deferred procedure calls (DPC) dispatched when the Observable Process Mode (APM) transitions from one step to another at runtime.
        enter: {
          ____label: "Step Enter Actions Vector (optional)",
          ____description: "Optional array of action request objects to be dispatched in the order of declaration by the OPC upon entry into this process step.",
          ____types: "jsArray",
          ____defaultValue: [],
          enterActionRequestObject: {
            ____label: "Step Enter Action Request Object",
            ____description: "An OPC action request object to be dispatched by the OPC upon entry into this process step.",
            ____accept: "jsObject"
          }
        },
        // enter
        // ~.steps.stepName.actions.exit is a queue of messages that models a sequence of deferred procedure calls (DPC) dispatched when the Observable Process Model (APM) transitions from one step to another at runtime.
        exit: {
          ____label: "Step Exit Actions Vector (optional)",
          ____description: "Optional array of action request objects to be dispatched in the order of declaration by the OPC upon exit from this process step.",
          ____types: "jsArray",
          ____defaultValue: [],
          exitActionRequestObject: {
            ____label: "Step Exit Action Request Object",
            ____description: "An OPC action request object to be dispatched by the OPC upon exit from this process step.",
            ____accept: "jsObject" // exitActionRequestObject

          } // exit

        }
      },
      // ~.step.stepName.actions
      // ~.steps.stepName.transitions is a queue of messages that models a sequence of deferred proceedure calls (DPC) dispatched when the Observable Process Model (APM) is evaluated at runtime.
      transitions: {
        ____label: "Controller Step Transition Rules (optional)",
        ____description: "An optional array of transition rules for this process step to be evaluated by the OPC during action processing.",
        ____types: "jsArray",
        ____defaultValue: [],
        transition: {
          ____label: "Controller Step Transition Rule",
          ____description: "Declaration of the conditions under which the controller should transition from this step to another.",
          ____types: "jsObject",
          transitionIf: {
            ____label: "Transition Operator Request Object",
            ____description: "A transition operator request object dispatched by the OPC to determine if this APM should transition between process steps.",
            ____accept: "jsObject"
          },
          nextStep: {
            ____label: "Target Step",
            ____description: "The name of the controller step that the controller should transition to iff the transition operator returns Boolean true.",
            ____accept: "jsString"
          } // transitionModel

        } // transitionsModel

      } // step

    } // steps

  }
}; // apm-method-constructor-input-spec