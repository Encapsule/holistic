"use strict";

var arccore = require("@encapsule/arccore");

var holodeck = require("@encapsule/holodeck");

var holarchy = require("@encapsule/holarchy");

(function () {
  var testActorRequestSpec = {
    ____types: "jsObject",
    ____defaultValue: {},
    actRequest: {
      ____opaque: true
    },
    options: {
      ____types: "jsObject",
      ____defaultValue: {},
      failTestIf: {
        ____types: "jsObject",
        ____defaultValue: {},
        CellProcessor: {
          ____types: "jsObject",
          ____defaultValue: {},
          actionError: {
            ____types: "jsString",
            ____inValueSet: ["ignore-never-fail", "fail-if-action-error", "fail-if-action-result"],
            ____defaultValue: "fail-if-action-error"
          },
          evaluateError: {
            ____types: "jsString",
            ____inValueSet: ["ignore-never-fail", "fail-if-opc-has-errors", "fail-if-opc-no-errors"],
            ____defaultValue: "fail-if-opc-has-errors"
          }
        }
      }
    }
  };
  var factoryResponse = arccore.filter.create({
    operationID: "9gUMmp5ASferLwmp23OSZQ",
    operationName: "Make testActorRequest Filter",
    operationDescription: "A filter used to create a testActorRequest object.",
    inputFilterSpec: testActorRequestSpec
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  var makeTestActorRequestFilter = factoryResponse.result;
  factoryResponse = holodeck.harnessFactory.request({
    id: "UBSclp3gSqCCmSvoG3W4tw",
    name: "CellProcessor Harness",
    description: "Constructs an instance of ES6 class CellProcessor and serializes it for inspection. There's a lot more we plan to do with this later.",
    harnessOptions: {
      idempotent: true
    },
    testVectorRequestInputSpec: {
      ____types: "jsObject",
      holistic: {
        ____types: "jsObject",
        holarchy: {
          ____types: "jsObject",
          CellProcessor: {
            ____types: "jsObject",
            constructorRequest: {
              // CellProcessor constructor request object or pre-constructed CellProcessor class instance reference.
              ____opaque: true // accept any request and let CellModel sort it out

            },
            // NEW: Use instead of actRequest as needed to gain access to test failure overrides.
            // If you're writing your tests correctly w/both positive and negative test cases
            // (i.e. you're checking that what should succeed does. And, what should return an error does)
            // then you'll need to adjust the test failure options in order avoid a build-breaking non-zero exit
            // code from holodeck OS process.
            testActorRequests: {
              ____types: "jsArray",
              ____defaultValue: [],
              testActorRequest: testActorRequestSpec
            },
            // Deprecated in favor of new testActorRequests.
            // actRequests is left as-is so as not to destabilize existing tests.
            // However, all legacy tests are executed w/default (i.e. very strict)
            // test failure check options. To relax these, you must use testActorRequests
            // that allows you to override the test failure default options per-request.
            actRequests: {
              ____types: "jsArray",
              ____defaultValue: [],
              actRequest: {
                ____opaque: true // accept any request and let OPC sort it out

              }
            },
            // ^--- Deprecated. Migrate to testActorRequests.
            options: {
              ____types: "jsObject",
              ____defaultValue: {},
              failTestIf: {
                ____label: "Fail Test If...",
                ____description: "Flags that override the default behaviors of the CellProcessor test harness.",
                ____types: "jsObject",
                ____defaultValue: {},
                CellProcessor: {
                  ____types: "jsObject",
                  ____defaultValue: {},
                  instanceValidity: {
                    ____types: "jsString",
                    ____inValueSet: ["ignore-never-fail", "fail-if-instance-invalid", "fail-if-instance-valid"],
                    ____defaultValue: "fail-if-instance-invalid"
                  },
                  validInstanceHasOPCWarnings: {
                    ____accept: "jsString",
                    ____inValueSet: ["ignore-never-fail", "fail-if-opc-has-warnings", "fail-if-opc-no-warnings"],
                    ____defaultValue: "fail-if-opc-has-warnings"
                  },
                  // opcWarning
                  validInstanceHasOPCErrors: {
                    ____accept: "jsString",
                    ____inValueSet: ["ignore-never-fail", "fail-if-opc-has-errors", "fail-if-opc-no-errors"],
                    ____defaultValue: "fail-if-opc-has-errors"
                  } // cellEvaluation

                },
                postTestAnalysis: {
                  ____types: "jsObject",
                  ____defaultValue: {},
                  CellProcessManager: {
                    ____types: "jsObject",
                    ____defaultValue: {},
                    ownedProcessTableEmpty: {
                      ____accept: "jsString",
                      ____inValueSet: ["ignore-never-fail", "fail-if-any-owned-processes", "fail-if-no-owned-processes"],
                      ____defaultValue: "fail-if-any-owned-processes"
                    },
                    sharedProcessTableEmpty: {
                      ____accept: "jsString",
                      ____inValueSet: ["ignore-never-fail", "fail-if-any-shared-processes", "fail-if-no-shared-processes"],
                      ____defaultValue: "fail-if-any-shared-processes"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    testVectorResultOutputSpec: {
      ____types: "jsObject",
      vectorOptions: {
        ____accept: "jsObject"
      },
      vectorFailed: {
        // the CellProcessor harness sets this true if it decides that this vector has gone vectored off the rail based on default options and overrides if specified in vectorRequest
        ____accept: "jsBoolean",
        ____defaultValue: false
      },
      vectorFailedReason: {
        ____accept: ["jsUndefined", "jsString"]
      },
      construction: {
        ____types: "jsObject",
        ____defaultValue: {},
        isValid: {
          ____accept: "jsBoolean"
        },
        postConstructionToJSON: {
          ____accept: ["jsString", // The instance is invalid and this is this._private.constructorError string.
          "jsObject" // The instance is valid and this is this._private object.
          ]
        }
      },
      testActionLog: {
        ____label: "CellProcessor.act Calls Performed by the Test",
        ____types: "jsArray",
        ____defaultValue: [],
        testActionSummary: {
          ____types: "jsObject",
          testHarnessActionOptions: {
            ____accept: "jsObject"
          },
          testHarnessActionSummary: {
            ____types: "jsObject",
            testDisposition: {
              ____accept: "jsString",
              ____inValueSet: ["TEST PASS", "TEST FAIL"]
            },
            actionRequest: {
              ____accept: "jsString",
              ____inValueSet: ["PASS", "FAIL"]
            },
            postActionCellProcessorEval: {
              ____accept: "jsString",
              ____inValueSet: ["SKIPPED", "PASS", "FAIL"]
            }
          },
          testHarnessActionDispatch: {
            ____types: "jsObject",
            actRequest: {
              ____accept: "jsObject"
            },
            actResponse: {
              ____types: "jsObject",
              error: {
                ____accept: ["jsNull", "jsString"]
              },
              result: {
                ____opaque: true
              }
            }
          },
          postActionToJSON: {
            ____accept: "jsObject"
          }
        } // testActionSummary

      }
    },
    harnessBodyFunction: function harnessBodyFunction(vectorRequest_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      var _loop = function _loop() {
        inBreakScope = true;
        response.result = {
          phase1: []
        };
        var messageBody = vectorRequest_.vectorRequest.holistic.holarchy.CellProcessor;
        var cpInstance = messageBody.constructorRequest instanceof holarchy.CellProcessor ? messageBody.constructorRequest : new holarchy.CellProcessor(messageBody.constructorRequest);
        var serialized = JSON.parse(JSON.stringify(cpInstance)); // Remove non-idempotent information from the serialized OPC object.

        if (cpInstance.isValid()) {
          delete serialized.opc.iid;

          if (serialized.opc.lastEvalResponse && serialized.opc.lastEvalResponse.result) {
            delete serialized.opc.lastEvalResponse.result.summary.evalStopwatch;
          }
        }

        response.result = {
          vectorOptions: messageBody.options,
          vectorFailed: false,
          // ?
          construction: {
            isValid: cpInstance.isValid(),
            postConstructionToJSON: serialized
          },
          testActionLog: []
        };

        switch (messageBody.options.failTestIf.CellProcessor.instanceValidity) {
          case "ignore-never-fail":
            break;

          case "fail-if-instance-invalid":
            if (!cpInstance.isValid()) {
              response.result.vectorFailed = true;
              response.result.vectorFailedReason = "Test setup invariant violation: CellProcessor constructor returned an unexpected zombie instance.";
            }

            break;

          case "fail-if-instance-valid":
            if (cpInstance.isValid()) {
              response.result.vectorFailed = true;
              response.result.vectorFailedReason = "Test setup invariant violation: CellProcessor constructor returned a valid instance when we expected a zombie.";
            }

            break;
        }

        if (cpInstance.isValid()) {
          switch (messageBody.options.failTestIf.CellProcessor.validInstanceHasOPCWarnings) {
            case "ignore-never-fail":
              break;

            case "fail-if-opc-has-warnings":
              if (cpInstance.toJSON().opc.toJSON().constructionWarnings.length !== 0) {
                response.result.vectorFailed = true;
                response.result.vectorFailedReason = "Test setup invariant violation: CellProcessor constructur returned valid instance w/unexpected OPC construction warnings count > 0.";
              }

              break;

            case "fail-if-opc-no-warnings":
              if (cpInstance.toJSON().opc.toJSON().constructionWarnings.length === 0) {
                response.result.vectorFailed = true;
                response.result.vectorFailedReason = "Test setup invariant violation: CellProcessor constructor returned valid instance w/unexpected OPC construction warnings count of zero.";
              }

              break;
          }

          switch (messageBody.options.failTestIf.CellProcessor.validInstanceHasOPCErrors) {
            case "ignore-never-fail":
              break;

            case "fail-if-opc-has-errors":
              var lastEvalResponse = cpInstance.toJSON().opc.toJSON().lastEvalResponse;

              if (lastEvalResponse.error || lastEvalResponse.result.summary.counts.errors !== 0) {
                response.result.vectorFailed = true;
                response.result.vectorFailedReason = "Test setup invariant violation: CellProcessor constructor returned valid instance w/unexpected OPC evaluation errors count > 0.";
              }

              break;

            case "fail-if-opc-no-errors":
              lastEvalResponse = cpInstance.toJSON().opc.toJSON().lastEvalResponse;

              if (!lastEvalResponse.error && lastEvalResponse.result.summary.counts.errors === 0) {
                response.result.vectorFailed = true;
                response.result.vectorFailedReason = "Test setup invariant violation: CellProcessor constructor returned valid instance w/unexpected OPC evaluation errors count of zero.";
              }

              break;
          }
        }

        if (errors.length) {
          return "break";
        } // Merge the actRequest queues (old/new) into a single new queue of testActorRequests that we can deal with identically.


        var testActorRequests = [];
        messageBody.testActorRequests.forEach(function (testActorRequest_) {
          testActorRequests.push(testActorRequest_);
        });
        messageBody.actRequests.forEach(function (actRequest_) {
          testActorRequests.push(makeTestActorRequestFilter.request({
            actRequest: actRequest_
          }).result);
        });

        if (!cpInstance.isValid()) {
          return "break";
        }

        while (testActorRequests.length) {
          var testActorRequest = testActorRequests.shift(); // FIFO the test actor requests.

          delete cpInstance._private.opc._private.lastEvaluationResponse; // TODO: Figure out why this delete is necessary? Or, is it. I do not remember the details at this point. Seems harmless, so just a TODO.

          var actRequest = testActorRequest.actRequest;
          var actResponse = cpInstance.act(actRequest); // Filter non-idempotent information out of the actResponse object.

          if (!actResponse.error) {
            // Might be nice to dump this information to stdout...
            console.log(actResponse.result.lastEvaluation.summary.evalStopwatch);
            delete actResponse.result.lastEvaluation.summary.evalStopwatch;
          }

          var failTestDueToTestActorRequest = false; // Test actor request failure analysis.

          switch (testActorRequest.options.failTestIf.CellProcessor.actionError) {
            case "ignore-never-fail":
              break;

            case "fail-if-action-error":
              if (actResponse.error) {
                response.result.vectorFailed = true;
                response.result.vectorFailedReason = "Test execution analysis violation: CellProcessor.act returned an unexpected error instead of expected result.";
                failTestDueToTestActorRequest = true;
              }

              break;

            case "fail-if-action-result":
              if (!actResponse.error) {
                response.result.vectorFailed = true;
                response.result.vectorFailedReason = "Test execution analysis violation: CellProcessor.act returned an unexpected result instead of expected error.";
                failTestDueToTestActorRequest = true;
              }

              break;
          }

          switch (testActorRequest.options.failTestIf.CellProcessor.evaluateError) {
            case "ignore-never-fail":
              break;

            case "fail-if-opc-has-errors":
              var _lastEvalResponse = cpInstance.toJSON().opc.toJSON().lastEvalResponse;

              if (_lastEvalResponse.error || _lastEvalResponse.result.summary.counts.errors !== 0) {
                response.result.vectorFailed = true;
                response.result.vectorFailedReason = "Test execution analysis violation: CellProcessor.act call induced OPC cell evaluation w/unexpected OPC transport errors.";
              }

              break;

            case "fail-if-opc-no-errors":
              _lastEvalResponse = cpInstance.toJSON().opc.toJSON().lastEvalResponse;

              if (!_lastEvalResponse.error && _lastEvalResponse.result.summary.counts.errors === 0) {
                response.result.vectorFailed = true;
                response.result.vectorFailedReason = "Test execution analysis violation: CellProcessor.act call induced OPC cell evaluation w/out expected OPC transport errors.";
              }

              break;
          }

          response.result.testActionLog.push({
            testHarnessActionOptions: testActorRequest.options,
            testHarnessActionSummary: {
              testDisposition: failTestDueToTestActorRequest ? "TEST FAIL" : "TEST PASS",
              actionRequest: actResponse.error ? "FAIL" : "PASS",
              postActionCellProcessorEval: actResponse.error ? "SKIPPED" : actResponse.result.lastEvaluation.summary.counts.errors ? "FAIL" : "PASS"
            },
            testHarnessActionDispatch: {
              actRequest: actRequest,
              actResponse: actResponse
            },
            postActionToJSON: JSON.parse(JSON.stringify(cpInstance.toJSON().opc.toJSON().ocdi.toJSON()))
          });
        }

        ; // while testActorRequests.length
        // POST testActorRequests have been dispatched.
        // If we're already going to fail the test, don't bother w/the analysis; it provides no extra value.

        if (cpInstance.isValid() && !response.result.vectorFailed) {
          var cellMemoryDump = cpInstance.toJSON().opc.toJSON().ocdi.toJSON();
          var cpmMemoryDump = cellMemoryDump["x7pM9bwcReupSRh0fcYTgw_CellProcessor"];

          switch (messageBody.options.failTestIf.postTestAnalysis.CellProcessManager.ownedProcessTableEmpty) {
            case "ignore-never-fail":
              break;

            case "fail-if-any-owned-processes":
              if (cpmMemoryDump.ownedCellProcesses.digraph.verticesCount() !== 1 || cpmMemoryDump.ownedCellProcesses.digraph.edgesCount()) {
                response.result.vectorFailed = true;
                response.result.vectorFailedReason = "Post-test execution analysis violation: CellProcessManager owned process table is not empty as expected.";
              }

              break;

            case "fail-if-no-owned-processes":
              if (cpmMemoryDump.ownedCellProcesses.digraph.verticesCount() < 2 || !cpmMemoryDump.ownedCellProcesses.digraph.edgesCount()) {
                response.result.vectorFailed = true;
                response.result.vectorFailedReason = "Post-test execution analysis violation: CellProcessManager owned process table is unexpectedly empty.";
              }

              break;
          }

          switch (messageBody.options.failTestIf.postTestAnalysis.CellProcessManager.sharedProcessTableEmpty) {
            case "ignore-never-fail":
              break;

            case "fail-if-any-shared-processes":
              if (cpmMemoryDump.sharedCellProcesses.digraph.verticesCount() || cpmMemoryDump.sharedCellProcesses.digraph.edgesCount()) {
                response.result.vectorFailed = true;
                response.result.vectorFailedReason = "Post-test execution analysis violation: CellProcessManager shared process table is not empty as expected.";
              }

              break;

            case "fail-if-no-shared-processes":
              if (cpmMemoryDump.sharedCellProcesses.digraph.verticesCount() < 1 || cpmMemoryDump.ownedCellProcesses.digraph.edgesCount() < 1) {
                response.result.vectorFailed = true;
                response.result.vectorFailedReason = "Post-test execution analysis violation: CellProcessManager owned process table is unexpectedly empty.";
              }

              break;
          }
        }

        return "break";
      };

      while (!inBreakScope) {
        var _ret = _loop();

        if (_ret === "break") break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();