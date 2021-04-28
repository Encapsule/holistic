"use strict";

// get-html-view-MS2_Projects.js
// This is an @encapsule/holism HTTP server/REST framework service plug-in filter.
var httpServiceFilterFactory = require("@encapsule/holism").service;

var factoryResponse = httpServiceFilterFactory.create({
  id: "obRbRqV-SOeXR_-om4xhnA",
  name: "Projects HTML Render Service",
  description: "Routes URL-encoded query parameter(s) through to the underlying d2r2/React render.",
  constraints: {
    request: {
      content: {
        encoding: "utf8",
        type: "text/plain"
      },
      query_spec: {
        ____types: "jsObject",
        ____defaultValue: {},
        projects: {
          ____accept: ["jsNull", "jsString"],
          ____defaultValue: null
        }
      },
      request_spec: {
        ____opaque: true
      },
      options_spec: {
        ____opaque: true
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
  // constraints
  handlers: {
    request_handler: function request_handler(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var queryProjectsParam = request_.request_descriptor.data.query.projects; // e.g. https://vp5.viewpath.com/organization/projects/editor?projects=IRUT[, IRUT, IRUT ... ]

        var projectsViewInitOptions = {
          projects: !queryProjectsParam ? [] : queryProjectsParam.split(",").map(function (projectId_) {
            return projectId_.trim();
          })
        };
        request_.response_filters.result.request({
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
            data: {
              HolisticPageView: {
                pageContentEP: [{
                  MS2_AppNavBar: {}
                }, {
                  MyProjects: {
                    initOptions: projectsViewInitOptions
                  }
                }],
                pageDebugEP: []
              }
            }
          }
        });
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    } // request_handler

  } // handlers

});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;