"use strict";

var holism = require("@encapsule/holism");

var factoryResponse = holism.service.create({
  id: "JFd1AbGkSmmZ2yu8swKiJg",
  name: "Get Service Filter Spec Developer Service",
  description: "A service filter that is used to query service filter input/output specs. Should only be used in development and test deployments.",
  constraints: {
    request: {
      content: {
        encoding: "utf8",
        type: "application/json"
      },
      query_spec: {
        ____types: "jsObject",
        name: {
          ____accept: ["jsString", "jsUndefined"]
        },
        id: {
          ____accept: ["jsString", "jsUndefined"]
        }
      },
      request_spec: {
        ____accept: "jsUndefined"
      },
      options_spec: {
        ____accept: "jsUndefined"
      }
    },
    // request
    response: {
      content: {
        encoding: "utf8",
        type: "application/json"
      },
      error_context_spec: {
        ____opaque: true
      },
      result_spec: {
        ____types: "jsObject",
        operationID: {
          ____accept: "jsString"
        },
        operationName: {
          ____accept: "jsString"
        },
        inputFilterSpec: {
          ____accept: "jsObject"
        },
        outputFilterSpec: {
          ____accept: "jsObject"
        }
      }
    } // response

  },
  // constraints
  handlers: {
    request_handler: function request_handler(request_) {
      var errors = [];
      var inBreakScope = false;

      var _loop = function _loop() {
        inBreakScope = true;
        var queryObject = request_.request_descriptor.data.query;

        if (!queryObject.id && !queryObject.name) {
          // TODO: Can we return the list of supported service ID's and their names here?
          errors.push("You must specify either ?id=IRUT or ?name=replace_space_with_underscore via URL-encoded query parameters in the URI.");
          return "break";
        } // Try to default to using id as the query param. If undefined then fall back on name. Return error if neither provided.


        var queryValue = queryObject.id;

        if (!queryValue) {
          queryValue = queryObject.name.split("_").join(" ").trim();
        }

        var serviceFilters = request_.integrations.filters.get_server_context.request().result.context.config.services;
        var queryParam = request_.request_descriptor.data.query.id ? "operationID" : "operationName";
        var dataGatewayFilterDescriptor = serviceFilters.filter(function (serviceFilterDescriptor) {
          // Hard coding datagateway id for convenience here.
          if (serviceFilterDescriptor.filter.filterDescriptor.operationID === "5GJ8LaKGShCXySL1OvA2Qw") return true;
          return false;
        });
        var queryFilterResults = dataGatewayFilterDescriptor[0].options.router.routedServices.filter(function (serviceFilterDescriptor) {
          if (serviceFilterDescriptor.filterDescriptor[queryParam] === queryValue) return true;
          return false;
        });

        if (!queryFilterResults.length) {
          errors.push("No Service Filter with that Name/ID is registered with DataGateway.");
          return "break";
        }

        var queryResult = queryFilterResults[0];
        responseAttempt = request_.response_filters.result.request({
          streams: request_.streams,
          integrations: request_.integrations,
          request_descriptor: request_.request_descriptor,
          response_descriptor: {
            http: {
              code: 200,
              message: "Success!"
            },
            content: {
              encoding: "utf8",
              type: "application/json"
            },
            data: {
              operationID: queryResult.filterDescriptor.operationID,
              operationName: queryResult.filterDescriptor.operationName,
              inputFilterSpec: queryResult.implementation.innerRequestFilter.filterDescriptor.inputFilterSpec.request_descriptor.data.body,
              outputFilterSpec: queryResult.implementation.innerResultResponseFilter.filterDescriptor.inputFilterSpec.response_descriptor.data
            }
          }
        });

        if (responseAttempt.error) {
          // Report unfortunately mishap via @encapsule/holism
          errors.unshift(responseAttempt.error);
          return "break";
        }

        return "break";
      };

      while (!inBreakScope) {
        var responseAttempt;

        var _ret = _loop();

        if (_ret === "break") break;
      }

      if (errors.length) {
        var message = errors.join(" "); // Whoops...

        var errorAttempt = request_.response_filters.error.request({
          streams: request_.streams,
          integrations: request_.integrations,
          request_descriptor: request_.request_descriptor,
          error_descriptor: {
            http: {
              code: 400
            },
            content: {
              encoding: "utf8",
              type: "text/html"
            },
            data: {
              error_message: message,
              error_context: {
                source_tag: "GkPZKbGIReqsc7I8PhEL8g"
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