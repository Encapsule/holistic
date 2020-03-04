"use strict";

module.exports = [{
  id: "ILfH_hfQSM-ZOohMgpYU8A",
  name: "CellProcessor Constructor #1",
  description: "Default construct CellProcessor ES6 class. Should fail.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          constructorRequest: undefined // explicitly

        }
      }
    }
  }
}, {
  id: "NPN6z4aOTqOOO60wLVKOcg",
  name: "CellProcessor Constructor #2",
  description: "A minamally-configured CellProcessor instance.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          constructorRequest: {
            id: "NPN6z4aOTqOOO60wLVKOcg",
            name: "CellProcessor Constructor #2",
            description: "A minamally-configured CellProcessor instance.",
            cellmodel: {
              id: "cJQGRL5sTSqk02JiEaM06g",
              name: "Test CM",
              description: "Test CellModel",
              apm: {
                id: "6OPnhgR9QWyEFaBpaZNb1A",
                name: "Test CM APM",
                description: "Test AbstractProcessModel",
                ocdDataSpec: {
                  ____label: "Test APM Root",
                  ____types: "jsObject",
                  ____defaultValue: {},
                  testProperty: {
                    ____label: "Test Property",
                    ____accept: ["jsNull", "jsString"],
                    ____defaultValue: null
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}];