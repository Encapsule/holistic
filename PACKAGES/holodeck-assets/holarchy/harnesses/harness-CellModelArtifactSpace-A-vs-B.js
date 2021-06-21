"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// harness-CellModelArtifactSpace-A-vs-B.js
(function () {
  var arccore = require("@encapsule/arccore");

  var holodeck = require("@encapsule/holodeck");

  var factoryResponse = holodeck.harnessFactory.request({
    id: "z_8vu0EWQniw0qdLcUbJPA",
    name: "CellModelArtifact A vs B Compare Harness",
    description: "Used to compare two CellModelArtifactSpace instances, A and B.",
    testVectorRequestInputSpec: {
      ____types: "jsObject",
      holistic: {
        ____types: "jsObject",
        holarchy: {
          ____types: "jsObject",
          CellModelArtifactSpace_Compare_A_vs_B: {
            ____types: "jsObject",
            // Test will fail if either A or B instance is invalid.
            constructorRequestA: {
              ____opaque: true
            },
            // CellModelArtifactSpace test instance A
            constructorRequestB: {
              ____opaque: true
            },
            // CellModelArtifactSpace test instance B
            // A and B should resolve to same artifactSpaceID or not?
            assertSameArtifactSpace: {
              ____accept: "jsBoolean"
            },
            // Provided
            // - A and B are both valid instances
            // - (assertSameArtifactSpace && (A.artifactSpaceID === B.artifactSpaceID)) || (!assertSameArtifactSpace && (A.artifactSpaceID !== B.artifactSpaceID))
            // ... then the the harness should make the following mapLabels method calls to obtain two method responses to compare.
            mapLabelsRequest: {
              ____types: "jsObject",
              A: {
                ____types: "jsObject",
                methodRequest: {
                  ____opaque: true
                },
                assertValidRequest: {
                  ____accept: "jsBoolean",
                  ____defaultValue: true
                }
              },
              B: {
                ____types: "jsObject",
                methodRequest: {
                  ____opaque: true
                },
                assertValidRequest: {
                  ____accept: "jsBoolean",
                  ____defaultValue: true
                }
              },
              assertRequestsIdentical: {
                ____types: "jsBoolean"
              }
            },

            /*
              The harness will call your test vector's comparisonFunction as follows:
               const assertFnResponse = assertionFunction({ testVectorRequest, cmasRefA, cmasRefB, mapLabelsRequestA, mapLabelsRequestB, mapLabelsResultA, mapLabelsResultB })
               You should return a standard arccore.filter response descriptor object.
               If you return response.error the harness will mark the current test vector evaluation as FAILED.
               If you return response.result then it is expected to be a chaiAssert result descriptor object.
             */
            testAssertion: {
              ____types: "jsObject",
              description: {
                ____accept: "jsString"
              },
              assertionFunction: {
                ____accept: "jsFunction"
              }
            }
          }
        }
      }
    },
    testVectorResultOutputSpec: {
      ____types: "jsObject",
      vectorFailed: {
        ____accept: "jsBoolean",
        ____defaultValue: false
      },
      subtestVectorResponseA: {
        ____accept: "jsObject"
      },
      subtestVectorResponseB: {
        ____accept: "jsObject"
      },
      assertions: {
        ____types: "jsArray",
        ____defaultValue: [],
        chaiAssertResult: {
          ____accept: "jsObject"
        } // TODO spec this out --- I think it's stable? At least as much of the structure that we specify in the fascade wrapper.

      },
      assertFailures: {
        ____types: "jsArray",
        ____defaultValue: [],
        failureIndex: {
          ____accept: "jsNumber"
        } // When we call chaiAssert we push the result (a result not a filter response) to assertions array. If the result indicates the assertion failed, then we also push the index of the failed assertion in assertions array into assertFailures array.

      }
    },
    harnessBodyFunction: function harnessBodyFunction(request_) {
      var response = {
        error: null,
        result: {
          assertions: [],
          assertFailures: []
        }
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var messageBody = request_.vectorRequest.holistic.holarchy.CellModelArtifactSpace_Compare_A_vs_B;

        var testVectorA = _objectSpread(_objectSpread({}, request_), {}, {
          id: arccore.identifier.irut.fromReference("".concat(request_.id, "_subtest_A")).result,
          name: "Test Vector ".concat(request_.id, " ").concat(request_.name, " Subvector A"),
          description: "Attempt to instantiate test CMAS test instance A.",
          vectorRequest: {
            holistic: {
              holarchy: {
                CellModelArtifactSpace: {
                  assertValidInstance: true,
                  constructorRequest: messageBody.constructorRequestA
                }
              }
            }
          }
        });

        var testVectorB = _objectSpread(_objectSpread({}, request_), {}, {
          id: arccore.identifier.irut.fromReference("".concat(request_.id, "_subtest_B")).result,
          name: "Test Vector ".concat(request_.id, " ").concat(request_.name, " Subvector B"),
          description: "Attempt to instantiate test CMAS test instance B.",
          vectorRequest: {
            holistic: {
              holarchy: {
                CellModelArtifactSpace: {
                  assertValidInstance: true,
                  constructorRequest: messageBody.constructorRequestB
                }
              }
            }
          }
        });

        var harnessResponse = request_.harnessDispatcher.request(testVectorA);

        if (harnessResponse.error) {
          // Harness error because this indicates that the test request can not be routed (so this is a harness bug).
          errors.push(harnessResponse.error);
          break;
        }

        var harnessFilter = harnessResponse.result;
        var testVectorResponseA = response.result.subtestVectorResponseA = harnessFilter.request(testVectorA);
        harnessResponse = request_.harnessDispatcher.request(testVectorB);

        if (harnessResponse.error) {
          // Harness error because this indicates that the test request can not be routed (so this is a harness bug).
          errors.push(harnessResponse.error);
          break;
        }

        harnessFilter = harnessResponse.result;
        var testVectorResponseB = response.result.subtestVectorResponseB = harnessFilter.request(testVectorB); // What happened in the subtests is largely a function of our test vector request data.
        // As long as we dispatched the subtest vectors w/out error, then our harness has done its job.
        // But, if dispatching either of the subtest vectors didn't return a valid vector result, we
        // consider that a precondition violation that precludes any attempt to redereference CMAS
        // instances A and B. Or, compare them in any way.

        while (!response.result.assertFailures.length) {
          // Okay, so now we need CMAS ref's A and B to play with...
          // This is a bit cumbersome. The structure is designed to allow us to take all the holodeck log eval files and easily build a 2-level map where
          // the primary keys correspond to registered test harnesses, and the secondary keys correspond to the test vector ID's processed by each harness.
          // Here we're dealing only with a single vector response.result (because here we want the CMAS ref from sub test result payload).
          var cmasRefUnbox = function cmasRefUnbox(testVectorResponse_) {
            var harnessDispatch = testVectorResponse_.result.harnessDispatch;
            var unbox1 = harnessDispatch[Object.keys(harnessDispatch)[0]];
            var unbox2 = unbox1[Object.keys(unbox1)[0]];
            return unbox2.cmasRef;
          };

          // Before we do anything, verify our base-level preconditions.
          var assertResult = request_.chaiAssert.isTrue(testVectorResponseA && !testVectorResponseA.error && testVectorResponseA.result && testVectorResponseA.result.harnessDispatch && testVectorResponseB && !testVectorResponseB.error && testVectorResponseB.result && testVectorResponseB.result.harnessDispatch ? true : false, "We expect constructorRequestA and constructorRequestB to yield valid subtest vector responses from which we can get A and B cmasRef for comparison?");
          response.result.assertions.push(assertResult);

          if (assertResult.assertion) {
            // Record the index of the failed chaiAssert result in assertions array
            response.result.assertFailures.push(response.result.assertions.length - 1);
          } // If our base-level preconditions aren't met, we can't actually do the comparison. So, skip the rest of the harness logic and fail the test vector.


          if (response.result.assertFailures.length) {
            break;
          }

          var cmasRefA = cmasRefUnbox(testVectorResponseA);
          var cmasRefB = cmasRefUnbox(testVectorResponseB); // LEAVE THIS AS INTENTIONAL FAILURE TO MAKE SURE THE HARNESS CORRECTLY REPORT TEST FAILURE BACK TO THE HOLODECK RUNNER.

          assertResult = response.result.assertions.push(request_.chaiAssert.isFalse(cmasRefA.isValid() && cmasRefB.isValid(), "We expect that constructorRequestA and constructorRequestB to yield valid CMAS instances to compare. But, that's not the case."));

          if (assertResult.assertion) {
            response.result.assertFailures.push(response.result.assertions.length - 1);
          }

          break;
        }

        response.result.vectorFailed = response.result.assertFailures.length ? true : false;
        break;
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