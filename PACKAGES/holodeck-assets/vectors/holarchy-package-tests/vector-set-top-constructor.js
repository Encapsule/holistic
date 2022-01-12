"use strict";

module.exports = [{
  id: "6TPB7tz4TQaGJYaRAhl_gQ",
  name: "TransitionOperator constructor #1",
  description: "TransitionOperator constructor test #1 (undefined constructor request)",
  vectorRequest: {
    holistic: {
      holarchy: {
        TransitionOperator: {}
      }
    }
  }
}, {
  id: "8167V4JrSc-47BMNONdxvQ",
  name: "TransitionOperator constructor #2",
  description: "TransitionOperator constructor test #2 (minimally defined contructor)",
  vectorRequest: {
    holistic: {
      holarchy: {
        TransitionOperator: {
          constructorRequest: {
            id: "8167V4JrSc-47BMNONdxvQ",
            name: "TransitionOperator Test #2",
            description: "A simple test transition operator plug-in filter.",
            operatorRequestSpec: {
              ____types: "jsObject",
              test: {
                ____types: "jsObject",
                TransitionOperator1: {
                  ____accept: "jsObject"
                }
              }
            },
            bodyFunction: function bodyFunction(request_) {
              return {
                error: null
              };
            }
          }
        }
      }
    }
  }
}];