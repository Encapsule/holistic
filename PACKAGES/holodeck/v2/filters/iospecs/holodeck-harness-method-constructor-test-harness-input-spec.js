"use strict";

// holodeck-harness-method-constructor-test-harness-input-spec.js
module.exports = {
  ____types: "jsObject",
  // This is 1 of N possible harness types that may be created.
  createTestHarness: {
    ____types: "jsObject",
    id: {
      ____accept: "jsString"
    },
    name: {
      ____accept: "jsString"
    },
    description: {
      ____accept: "jsString"
    },
    testCommandSpec: {
      ____accept: "jsObject" // this is a filter specification

    },
    testHarnessOptions: {
      ____types: "jsObject",
      ____defaultValue: {},
      idempotent: {
        ____accept: "jsBoolean",
        ____defaultValue: true
      },
      gitDiffHunkSize: {
        ____accept: "jsNumber",
        ____defaultValue: 0,
        ____inRangeInclusive: {
          begin: 0,
          end: 64
        }
      }
    },
    testBodyFunction: {
      ____label: "Test Harness Plug-In Filter bodyFunction",
      ____description: "Developer-defined bodyFunction used to contruct a holodeck plug-in harness filter capable of processing test vectors through a holodeck runner filter instance.",
      ____accept: "jsFunction"
    },
    testResultSpec: {
      ____label: "Test Harness Result Spec",
      ____description: "Developer-defined filter spec used to normalize the response.result of a test harness filter. Note that this value is logged. It is not passed between harnesses.",
      ____accept: "jsObject",
      // this is a filter specification
      ____defaultValue: {
        ____opaque: true
      }
    }
  }
};