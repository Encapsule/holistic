"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var holodeck = require("@encapsule/holodeck");

var holarchy = require("@encapsule/holarchy");

var factoryResponse = holodeck.harnessFactory.request({
  id: "7JFMyzm-T9aUv-ULeN_3FQ",
  name: "ObservableControllerData Harness",
  description: "Constructs an instance of ES6 class ObservableControllerData upon which a test author can subsequently execute method calls to test low-level OCD functionality.",
  testVectorRequestInputSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        ObservableControllerData: {
          ____types: "jsObject",
          constructorRequest: {
            ____opaque: true
          },
          methodCalls: {
            ____types: "jsArray",
            ____defaultValue: [],
            methodCallDescriptor: {
              ____types: "jsObject",
              methodName: {
                ____accept: "jsString"
              },
              argv: {
                ____accept: "jsArray",
                ____defaultValue: []
              }
            }
          }
        }
      }
    }
  },
  testVectorResultOutputSpec: {
    ____accept: "jsObject" // TODO

  },
  harnessBodyFunction: function harnessBodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var messageBody = request_.vectorRequest.holistic.holarchy.ObservableControllerData;
      var ocdi = messageBody.constructorRequest instanceof holarchy.ObservableControllerData ? messageBody.constructorRequest : new holarchy.ObservableControllerData(messageBody.constructorRequest);
      response.result = {
        construction: {
          isValid: ocdi.isValid(),
          toJSON: ocdi.toJSON()
        },
        methodCallDispatchDescriptors: []
      };

      if (!ocdi.isValid()) {
        break;
      }

      while (messageBody.methodCalls.length) {
        var messageCallDescriptor = messageBody.methodCalls.shift();
        var methodResponse = ocdi[messageCallDescriptor.methodName].apply(ocdi, _toConsumableArray(messageCallDescriptor.argv));
        var methodCallDispatchDescriptor = {
          request: messageCallDescriptor,
          response: methodResponse,
          toJSON: ocdi.toJSON()
        };
        response.result.methodCallDispatchDescriptors.push(methodCallDispatchDescriptor);
      }

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