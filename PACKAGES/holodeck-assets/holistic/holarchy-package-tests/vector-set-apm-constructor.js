"use strict";

module.exports = [{
  id: "ErHlg9R3SSaonNJr4mBi-g",
  name: "AbstractProcessModel constructor #1",
  description: "AbstractProcessModel constructor test #1 (undefined constructor request)",
  vectorRequest: {
    holistic: {
      holarchy: {
        AbstractProcessModel: {}
      }
    }
  }
}, {
  id: "VwWYI4ReSTSfqSnoVXXC-w",
  name: "AbstractProcessModel constructor #2",
  description: "AbstractProcessModel constructor test #2 (minimal constructor request)",
  vectorRequest: {
    holistic: {
      holarchy: {
        AbstractProcessModel: {
          constructorRequest: {
            id: "VwWYI4ReSTSfqSnoVXXC-w",
            name: "APM #2",
            description: "APM instance test #2 (minimal constructor request)"
          }
        }
      }
    }
  }
}, {
  id: "HwB8EphzRkSG7AeoISMctQ",
  name: "ObsevableProcessModel constructor #3",
  description: "AbstractProcessModel constructor test #3 (OCD test #1)",
  vectorRequest: {
    holistic: {
      holarchy: {
        AbstractProcessModel: {
          constructorRequest: {
            id: "HwB8EphzRkSG7AeoISMctQ",
            name: "ObsevableProcessModel constructor #3",
            description: "AbstractProcessModel constructor test #3 (OCD test #1)",
            ocdDataSpec: {
              ____bullshit: true
            }
          }
        }
      }
    }
  }
}, {
  id: "YdzP0ZKMTme24BBJcyKevA",
  name: "AbstractProcessModel constructor #4",
  description: "AbstractProcessModel constructor test #4 (invalid id)",
  vectorRequest: {
    holistic: {
      holarchy: {
        AbstractProcessModel: {
          constructorRequest: {
            id: "invalid",
            name: "AbstractProcessModel constructor #4",
            description: "AbstractProcessModel constructor test #4 (invalid id)"
          }
        }
      }
    }
  }
}];