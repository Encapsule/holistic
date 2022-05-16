"use strict";

var holism = require("@encapsule/holism");

var factoryResponse = holism.service.create({
  id: "-yFaFBfMRYqf0YtmoVEGeQ",
  name: "Holism Service Filter Request Echo Service",
  description: ["This service filter forwards the data that it receives (echo) from an @encapsule/holism app server instance to the app's HTML rendering subsystem.", "THIS SERVICE SHOULD NOT BE USED IN PRODUCTION APPLICATIONS AND SHOULD NEVER BE DEPLOYED ON THE INTERNET!", "Its purpose to solely to help developers understand the format of an @encapsule/holism service filter request object."].join(" "),
  constraints: {
    request: {
      content: {
        encoding: "utf8",
        type: "text/plain"
      },
      query_spec: {
        ____opaque: true
      },
      request_spec: {
        ____opaque: true
      },
      options_spec: {
        ____accept: "jsObject",
        ____defaultValue: {}
      }
    },
    response: {
      content: {
        encoding: "utf8",
        type: "application/json"
      },
      error_context_spec: {
        ____opaque: true
      },
      result_spec: {
        ____opaque: true
      }
    }
  },
  handlers: {
    request_handler: function request_handler(request_) {
      var response = {
        error: null,
        result: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var responseAttempt = request_.response_filters.result.request({
          streams: request_.streams,
          integrations: request_.integrations,
          request_descriptor: request_.request_descriptor,
          response_descriptor: {
            http: {
              code: 200,
              message: "Request Echo"
            },
            content: {
              encoding: "utf8",
              type: "application/json"
            },
            data: {
              filter_request_descriptor: request_.request_descriptor
            }
          }
        });

        if (responseAttempt.error) {
          // Report unfortunately mishap via @encapsule/holism
          errors.unshift(responseAttempt.error);
          break;
        }

        break;
      }

      if (errors.length) {
        var message = errors.join(" ");
        var errorAttempt = request_.response_filters.error.request({
          streams: request_.streams,
          integrations: request_.integrations,
          request_descriptor: request_.request_descriptor,
          error_descriptor: {
            http: {
              code: 500
            },
            content: {
              encoding: "utf8",
              type: "text/html"
            },
            data: {
              error_message: message,
              error_context: {
                source_tag: "0UHmN0eET0OE5NppyUDTYQ"
              }
            }
          }
        });

        if (errorAttempt.error) {
          return {
            error: errorAttempt.error
          };
        }
      }

      return {
        error: null,
        result: null
      };
    }
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;