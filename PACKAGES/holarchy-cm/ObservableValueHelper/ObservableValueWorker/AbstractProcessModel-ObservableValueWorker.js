"use strict";

// AbstractProcessModel-ObservableValueWorker.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cmLabel = require("./cellmodel-label");

  var apm = new holarchy.AbstractProcessModel({
    id: cmasHolarchyCMPackage.mapLabels({
      APM: cmLabel
    }).result.APMID,
    name: "".concat(cmLabel, " Process"),
    description: "Performs work on behalf of a single ObservableValueHelper cell.",
    ocdDataSpec: {
      ____types: "jsObject",
      ____defaultValue: {},
      observableValueHelper: {
        ____label: "ObservableValueHelper Instance",
        ____description: "Data used to track which ObservableValueHelper cell instance this cell is working on behalf of.",
        ____accept: "jsObject" // TODO

      },
      // This is a proxy helper cell that is connected to a specific ObservableValue cell instance.
      // Current thinking is that ObservableValueHelper's step worker action can control this proxy directly w/out the need for custom logic in the worker.
      observableValueProxy: {
        ____types: "jsObject",
        ____defaultValue: {},
        ____appdsl: {
          apm: "CPPU-UPgS8eWiMap3Ixovg"
        } // CPP

      }
    },
    steps: {
      "uninitialized": {
        description: "Default starting step.",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "value-observer-worker-initialize"
        }]
      },
      "value-observer-worker-initialize": {
        description: "The ValueObserverWorker process is initializing."
      }
    }
  });

  if (!apm.isValid()) {
    throw new Error(apm.toJSON());
  }

  module.exports = apm;
})();