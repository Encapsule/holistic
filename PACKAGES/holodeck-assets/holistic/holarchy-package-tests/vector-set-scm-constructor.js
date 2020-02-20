"use strict";

module.exports = [{
  id: "VcFs1BSZTLCb8nlIwW3Pmg",
  name: "CellModel Constructor #1",
  description: "Default construct holarchy/CellModel ES6 class. Should fail.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: undefined // explicitly

        }
      }
    }
  }
}, {
  id: "vzmMGynKTy2uu6W8R-1rvQ",
  name: "SoftewareCellModel Constructor #2",
  description: "Try to construct a minimally configured CellModel with a single TransitionOperator plug-in.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: {
            id: "vzmMGynKTy2uu6W8R-1rvQ",
            name: "SoftewareCellModel Constructor #2",
            description: "Try to construct a minimally configured CellModel with a mimimally-defined OPM association.",
            apm: {
              id: "cJSBP90NTcu1bJMhCOjbQg",
              name: "Placeholder APM",
              description: "A minimally-configured placeholder."
            }
          }
        }
      }
    }
  }
}, {
  id: "AE_pEJ7LTdSvohEBZl_Bfw",
  name: "CellModel Constructor #3",
  description: "Try to construct a minimally configured CellModel with a single TransitionOperator plug-in.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: {
            id: "AE_pEJ7LTdSvohEBZl_Bfw",
            name: "CellModel Constructor #3",
            description: "Try to construct a minimally configured CellModel with a single TransitionOperator plug-in.",
            operators: [{
              id: "o3Q4YKI_SLOus82xE7Gaag",
              name: "Placeholder TOP",
              description: "A minimally configured placeholder.",
              operatorRequestSpec: {
                ____accept: "jsObject"
              },
              bodyFunction: function bodyFunction(request_) {
                return {
                  error: null,
                  result: false
                };
              }
            }]
          }
        }
      }
    }
  }
}, {
  id: "rShJ0riLSiOxLt0OpFJLJA",
  name: "SoftewareCellModel Constructor #4",
  description: "Try to construct a full (but-ultimately fake) CellModel including subcell definitions.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: {
            id: "rShJ0riLSiOxLt0OpFJLJA",
            name: "SoftewareCellModel Constructor #4",
            description: "Try to construct a full (but-ultimately fake) CellModel including subcell definitions."
          }
        }
      }
    }
  }
}];