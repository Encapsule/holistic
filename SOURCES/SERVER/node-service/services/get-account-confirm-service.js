"use strict";

var holism = require("@encapsule/holism");

var factoryResponse = holism.service.create({
  id: "zzsAm72FTAKEeVAZg-VvYg",
  name: "Get Account Confirm Page Service",
  description: "A service filter used to create the account confirm page.",
  constraints: {
    request: {
      content: {
        encoding: "utf8",
        type: "text/plain"
      },
      query_spec: {
        ____types: "jsObject",
        user: {
          ____accept: "jsString"
        },
        pwd: {
          ____accept: "jsString"
        }
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
        type: "text/html"
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
              message: "Success"
            },
            content: {
              encoding: "utf8",
              type: "text/html"
            },
            data: {
              AccountConfirm: {
                user: request_.request_descriptor.url_parse.query.user,
                password: request_.request_descriptor.url_parse.query.pwd // hashed password received in query string

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
                source_tag: "NNZ4CaMiT8GILhwAWDPdSg"
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