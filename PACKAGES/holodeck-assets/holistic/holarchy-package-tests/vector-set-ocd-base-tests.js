"use strict";

module.exports = [{
  id: "in2UzfF3QiG3_NJHRPEhag",
  name: "OCD Test #1",
  description: "A simple test of the OCD ES6 class.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableControllerData: {
          constructorRequest: {
            id: "in2UzfF3QiG3_NJHRPEhag",
            name: "OCD Test #1",
            description: "A simple test of the OCD ES6 class.",
            spec: {
              ____types: "jsObject",
              ____defaultValue: {},
              testMap: {
                ____types: "jsObject",
                ____asMap: true,
                ____defaultValue: {},
                element: {
                  ____accept: "jsObject"
                }
              }
            }
          },
          // constructorRequest
          methodCalls: [{
            methodName: "readNamespace",
            argv: ["~.foo.bar"] // should fail gracefully

          }, {
            methodName: "readNamespace",
            argv: ["~.testMap"]
          }, {
            methodName: "writeNamespace",
            argv: ["~.testMap.testKey", {
              testMessage: "This seems to work?"
            }]
          }, {
            methodName: "writeNamespace",
            argv: ["~.testMap.notakey", {
              similarly: "This also seems to work."
            }]
          }]
        }
      }
    }
  }
}];