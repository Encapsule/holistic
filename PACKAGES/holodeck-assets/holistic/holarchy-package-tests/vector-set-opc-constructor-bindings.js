"use strict";

var opmSetExamples = require("./fixture-opm-evaluate-p1-transition-operators");

module.exports = [{
  id: "4nw2B9oVQYm1ZspZqotrRA",
  name: "OCD template spec OPM binding #1",
  description: "OPM binding test #1: Baseline - registered OPM's but no declared bindigs.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "4nw2B9oVQYm1ZspZqotrRA",
            abstractProcessModelSets: [opmSetExamples]
          }
        }
      }
    }
  }
}];