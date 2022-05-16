"use strict";

var holism = require("@encapsule/holism");

var userSessionAccessor = require("../../storage/user/session/");

var factoryResponse = holism.service.create({
  id: "zfEcCj1bQq6SG9Jqo9rstg",
  name: "User Logout Service",
  description: "Logs a user out by deleting their session cookie and redirecting them",
  constraints: {
    request: {
      content: {
        encoding: "utf8",
        type: "text/plain"
      },
      query_spec: {
        ____types: "jsObject",
        ____defaultValue: {},
        redirect: {
          ____accept: "jsString",
          ____defaultValue: "/"
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
      // We call this in several places. But, always do exactly the same thing.
      var respond = function respond() {
        request_.response_filters.result.request({
          streams: request_.streams,
          integrations: request_.integrations,
          request_descriptor: request_.request_descriptor,
          response_descriptor: {
            http: {
              code: 307,
              message: "User Session Closed - Redirecting..."
            },
            content: {
              encoding: 'utf8',
              type: "text/plain"
            },
            // **** CLEARS THE USER SESSION COOKIE ****
            headers: {
              "Location": request_.request_descriptor.data.query.redirect,
              "Set-Cookie": "vp5-user-session=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
            },
            data: "Okay - you have been logged out. Redirecting..."
          }
        });
      };

      if (!request_.request_descriptor.session) {
        // There are several reasons why the requestor might not have a valid user session object.
        // We do not care; clear their user session cookie and proceed w/redirect.
        respond();
      } else {
        // Delete the requestors current session in the application storage layer. And, then clear their user session cookie and redirect them.
        var filterResponse = userSessionAccessor["delete"].request({
          sessionId: request_.request_descriptor.session.sessionId
        });

        if (filterResponse.error) {
          // Report promise construction error synchronously.
          return {
            error: filterResponse.error
          };
        }

        var deleteUserSessionPromise = filterResponse.result; // Evaluate the promise to delete the user session entity in the application storage layer.

        deleteUserSessionPromise.then(function (result_) {
          // Done. Now clear the user session cookie and redirect.
          respond();
        })["catch"](function (exception_) {
          // Disaster. Report the unhandled application error.
          request_.response_filters.error.request({
            streams: request_.streams,
            integrations: request_.integrations,
            request_descriptor: request_.request_descriptor,
            error_descriptor: {
              http: {
                code: 500,
                message: "User Session Delete Error"
              },
              content: {
                encoding: 'utf8',
                type: 'text/html'
              },
              data: {
                error_message: exception_.message,
                error_content: {
                  source_tag: "wx3YPrwKSwOCdw4MV3SiLw"
                }
              }
            }
          });
        });
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