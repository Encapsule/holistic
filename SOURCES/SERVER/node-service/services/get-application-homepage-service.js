"use strict";

var holism = require("@encapsule/holism");

var factoryResponse = holism.service.create({
  id: "jKKuSBmzSGOKcYi1lClhgw",
  name: "Get Homepage Service",
  description: "A simple service filter that is used to test out <ComponentRouter/> infrastructure.",
  constraints: {
    request: {
      content: {
        encoding: 'utf8',
        type: 'text/plain'
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
    // request
    response: {
      content: {
        encoding: 'utf8',
        type: 'text/html'
      },
      error_context_spec: {
        ____opaque: true
      },
      result_spec: {
        ____opaque: true
      }
    } // response

  },
  // constraints
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
              message: "Have some test JSON!"
            },
            content: {
              encoding: 'utf8',
              type: 'text/html'
            },
            data: {
              Page2: {
                text1: "This is text line #1 specified in an object literal in a service filter.",
                text2: " Does eat oats and cows eat oats and little lambs eat ivy. A kidd'l eat ivy too. Wouldn't you?"
              }
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
        var message = errors.join(" "); // Whoops...

        var errorAttempt = request_.response_filters.error.request({
          streams: request_.streams,
          integrations: request_.integrations,
          request_descriptor: request_.request_descriptor,
          error_descriptor: {
            http: {
              code: 500
            },
            content: {
              encoding: 'utf8',
              type: 'text/html'
            },
            data: {
              error_message: message,
              error_context: {
                source_tag: "b9IptgZ-SDOGiZltQakMAA"
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