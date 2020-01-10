"use strict";

module.exports = [{
  id: "ErHlg9R3SSaonNJr4mBi-g",
  name: "ObservableProcessModel constructor #1",
  description: "ObservableProcessModel constructor test #1 (undefined constructor request)",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessModel: {}
      }
    }
  }
}, {
  id: "VwWYI4ReSTSfqSnoVXXC-w",
  name: "ObservableProcessModel constructor #2",
  description: "ObservableProcessModel constructor test #2 (minimal constructor request)",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessModel: {
          constructorRequest: {
            id: "VwWYI4ReSTSfqSnoVXXC-w",
            name: "OPM #2",
            description: "OPM instance test #2 (minimal constructor request)"
          }
        }
      }
    }
  }
}, {
  id: "HwB8EphzRkSG7AeoISMctQ",
  name: "ObsevableProcessModel constructor #3",
  description: "ObservableProcessModel constructor test #3 (OCD test #1)",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessModel: {
          constructorRequest: {
            id: "HwB8EphzRkSG7AeoISMctQ",
            name: "ObsevableProcessModel constructor #3",
            description: "ObservableProcessModel constructor test #3 (OCD test #1)",
            opmDataSpec: {
              ____bullshit: true
            }
          }
        }
      }
    }
  }
}, {
  id: "YdzP0ZKMTme24BBJcyKevA",
  name: "ObservableProcessModel constructor #4",
  description: "ObservableProcessModel constructor test #4 (invalid id)",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessModel: {
          constructorRequest: {
            id: "invalid",
            name: "ObservableProcessModel constructor #4",
            description: "ObservableProcessModel constructor test #4 (invalid id)"
          }
        }
      }
    }
  }
}];