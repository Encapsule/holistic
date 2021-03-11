"use strict";

// vector-set-cmas-base-a-vs-b-invariants.js
(function () {
  var vectorSetName = "CellModelArtifactSpace A vs B Instance Comparison";
  module.exports = [{
    id: "i6wO5eyNQvWLlyCjjr_AAA",
    name: "".concat(vectorSetName, ": Harness Smoke Test 1"),
    description: "Test case #1 to check the A vs B harness itself.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace_Compare_A_vs_B: {
            constructorRequestA: {
              spaceLabel: "TestA"
            },
            constructorRequestB: {
              spaceLabel: "TestB"
            },
            assertSameArtifactSpace: false,
            mapLabelsRequest: {
              A: {
                methodRequest: {
                  CM: "test_label_1"
                },
                assertValidRequest: true
              },
              B: {
                methodRequest: {
                  CM: "test_label_1"
                },
                assertValidRequest: true
              },
              assertRequestsIdentical: true
            },
            testAssertion: {
              description: "CellModel ID's for same CM label string in two different CMAS should not be equal.",
              assertionFunction: function assertionFunction(_ref) {
                var testVectorRequest = _ref.testVectorRequest,
                    cmasRefA = _ref.cmasRefA,
                    cmasRefB = _ref.cmasRefB,
                    mapLabelsRequestA = _ref.mapLabelsRequestA,
                    mapLabelsResultA = _ref.mapLabelsResultA,
                    mapLabelsRequestB = _ref.mapLabelsRequestB,
                    mapLabelsResultB = _ref.mapLabelsResultB,
                    assertDescription = _ref.assertDescription;
                return testVectorRequest.chaiAssert.notEqual(mapLabelsResultA.CMID, mapLabelsResultB.CMID, assertDescription);
              }
            }
          }
        }
      }
    }
  }];
})();