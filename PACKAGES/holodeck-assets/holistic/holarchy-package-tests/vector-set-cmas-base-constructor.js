"use strict";

// vector-set-cmas-base-constructor.js
// These are test vectors to confirm the basic functionality of the @encapsule/holarchy CellModelArtifactSpace class.
(function () {
  var holarchy = require("@encapsule/holarchy");

  var vectorSetName = "CellModelArtifactSpace Constructor/Method";
  module.exports = [{
    id: "6T9b-OukTF6wGWqNgqb_8Q",
    name: "".concat(vectorSetName, ": Bad Constructor Request Undefined"),
    description: "Attempt to construct a CMAS instance w/undefined constructor request.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {}
        }
      }
    }
  }, {
    id: "eQ5T-rDDTOa3YjlDhsAc6A",
    name: "".concat(vectorSetName, ": Bad Constructor Request Missing Space Label"),
    description: "Attempt to construct CMAS instance w/bad request object.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            constructorRequest: {}
          }
        }
      }
    }
  }, {
    id: "PpgtBOCYTNKN3EZTE2RgxQ",
    name: "".concat(vectorSetName, ": Bad Constructor Request Zero-Length Space Label"),
    description: "Attempt to construct CMAS instance w/a zero-length spaceLabel string.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            constructorRequest: {
              spaceLabel: ""
            }
          }
        }
      }
    }
  }, {
    id: "3uscUmZjQYimppjDK5YUTw",
    name: "".concat(vectorSetName, ": Good Constructor From Valid Request Descriptor"),
    description: "Attempt to construct a CMAS instance w/a valid spaceLabel string value.",
    vectorRequest: {
      holistic: {
        holarchy: {
          CellModelArtifactSpace: {
            constructorRequest: {
              spaceLabel: "Whatever >0 string I want..."
            }
          }
        }
      }
    }
  }];
})();