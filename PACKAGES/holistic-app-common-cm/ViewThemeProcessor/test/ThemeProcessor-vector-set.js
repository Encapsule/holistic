"use strict";

// ThemeProcess-vector-set.js
var ThemeProcessor = require("../");

module.exports = [{
  id: "xkUHMJeDSGqhyug4g6YtHQ",
  name: "Instantiate ThemeProcessor Cell Process #1",
  description: "Just a very basic test of just ThemeProcess all by itself.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "xkUHMJeDSGqhyug4g6YtHQ",
            name: "Instantiate ThemeProcessor Cell Process #1",
            description: "Just a very basic test of a ThemeProcessor cell process all by itself.",
            // TODO: update
            ocdTemplateSpec: {
              ____types: "jsObject",
              // We're just going to bind our APMs to here for testing purposes.
              themeProcessor: {
                ____types: "jsObject",
                ____defaultValue: {},
                ____appdsl: {
                  apm: "zzvzLbm2RTyQN1lWFcjpVA"
                  /* ThemeProcessor APM ID */

                }
              }
            },
            // In the future, OPC constructor will be called by CellProcessor's constructor
            // as an implementation detail of creating a CellProcessor instance. CellProcessor
            // will accept a single CellModel that represents your application or service.
            // It combs through that CellModel and builds a bunch of other stuff that integrates
            // with your CellModel, wraps it in another CellModel, and then queries the graph as
            // follows to get the effective OPC configuration. There's a lot happening in these
            // three lines of code. Part of that process will involve synthesizing the ocdTemplateSpec
            // defined manually above. That's what we need at massive scale. But, this is just fine
            // for wiring up a test harness for ThemeProcessor. Actually, helps to see how these
            // things will get wired up at a basic level inside CellProcessor.
            abstractProcessModelSets: [ThemeProcessor.getCMConfig({
              type: "APM"
            }).result],
            transitionOperatorSets: [ThemeProcessor.getCMConfig({
              type: "TOP"
            }).result],
            controllerActionSets: [ThemeProcessor.getCMConfig({
              type: "ACT"
            }).result]
          },
          actRequests: [{
            actorName: "External Test Actor #1",
            actorTaskDescription: "Change buttonNormal color.",
            actionRequest: {
              vp5: {
                view: {
                  styles: {
                    themeProcessor: {
                      config: {
                        colors: {
                          buttonNormal: "red"
                        }
                      }
                    }
                  }
                }
              }
            },
            apmBindingPath: "~.themeProcessor"
          }, {
            actorName: "External Test Actor #2",
            actorTaskDescription: "Try to make the ThemeProcessor update its outputs.",
            actionRequest: {
              vp5: {
                view: {
                  styles: {
                    themeProcessor: {
                      get: {}
                    }
                  }
                }
              }
            },
            apmBindingPath: "~.themeProcessor"
          }]
        }
      }
    }
  }
}];