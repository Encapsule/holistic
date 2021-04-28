"use strict";

// get-html-render-homepage.js
var httpServiceFilterFactory = require("@encapsule/holism").service; // TODO: Preserving this comment although it doesn't apply to this revision of the source it does capture something I want to look at when there's time.
// Check holism service factory to ensure the generated filter's input filter spec (synthesized) correctly transfer request.options_spec. Others check too. Under debugger it looks opaque which is wrong.
// I want to be able to dereference markdownRenderOptions from holismServiceLib export service filter for the downstream render markdown service call. But, it's hopeless currently it seems.


var factoryResponse = httpServiceFilterFactory.create({
  id: "GLwKkBTXRzqYHHr9Gdak-Q",
  name: "Homepage HTML Render Service",
  description: "Custom service to display different markdown documents depending on authentication status.",
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
        ____types: "jsObject",
        d2r2RequestAuthenticated: {
          ____accept: "jsObject"
        },
        d2r2RequestNotAuthenticated: {
          ____accept: "jsObject"
        }
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
        var serializerResponse = request_.response_filters.result.request({
          streams: request_.streams,
          integrations: request_.integrations,
          request_descriptor: request_.request_descriptor,
          response_descriptor: {
            http: {
              code: 200
            },
            content: {
              encoding: "utf8",
              type: "text/html"
            },
            headers: {
              "Cache-Control": "no-store, max-age=0"
            },
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
            data: request_.request_descriptor.session ? request_.options.d2r2RequestAuthenticated : request_.options.d2r2RequestNotAuthenticated
          }
        });

        if (serializerResponse.error) {
          errors.push(serializerResponse.error);
          break;
        }

        break;
      } // while(inBreakScope)


      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  }
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;