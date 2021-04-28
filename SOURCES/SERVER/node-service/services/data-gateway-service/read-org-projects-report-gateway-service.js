"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// read-org-projects-report-gateway-service.js
var holism = require("@encapsule/holism");

var _require = require("../../../../COMMON/rest-api"),
    iospecs = _require.iospecs;

var serviceCore = require("../../../../COMMON/service-core");

var appBuild = serviceCore.getAppBuild();

var datastore = require("../../../storage/google-datastore");

var entityKinds = require("../../../storage/data/constants").datastore.entities.kinds;

var _require2 = require("./utils"),
    makeDatastoreKey = _require2.makeDatastoreKey; // This service will be made available only to members of the Viewpath organization.
// i.e. external users will not be allowed to create, read, update, delete an organization profile.


var factoryResponse = holism.service.create({
  id: "WeW4sQxmRXqofCgwTRymNA",
  name: "Read Org Projects Report Gateway Service",
  description: "Returns a generated report summarizing all the projects owned by the requesting user's organization.",
  constraints: {
    request: {
      content: {
        encoding: "utf8",
        type: "application/json"
      },
      query_spec: {
        ____types: "jsUndefined"
      },
      request_spec: iospecs.requests.readOrgProjectsReport,
      options_spec: {
        ____types: "jsObject",
        ____defaultValue: {}
      }
    },
    // #.request
    response: {
      content: {
        encoding: "utf8",
        type: "application/json"
      },
      result_spec: iospecs.results.readOrgProjectsReport,
      error_context_spec: {
        ____opaque: true
      } // #.constraints.response.error_content_spec

    } // #.constraints.response

  },
  // #.constraints
  handlers: {
    request_handler: function request_handler(request_) {
      var errors = [];
      var inBreakScope = false;

      var _loop = function _loop() {
        inBreakScope = true;
        var responseAttempt = void 0;
        var readOrgProjectsResponse = void 0;
        var appErrors = [];

        try {
          var orgID = request_.request_descriptor.session.organizationId;
          readOrgProjectsResponse = new Promise(function (resolve_, reject_) {
            try {
              var transaction = datastore.transaction();
              transaction.run(function (error_, transaction_) {
                // Generate key for OrgProfile
                var ancestorKey;
                var entityKeyRequest = makeDatastoreKey({
                  kind: entityKinds.orgProfile,
                  orgID: orgID
                });

                if (entityKeyRequest.error) {
                  appErrors.push(entityKeyRequest.error);
                  resolve_({
                    appErrors: {
                      appErrors: appErrors
                    }
                  });
                  return;
                } else {
                  ancestorKey = entityKeyRequest.result;
                }

                var query;

                try {
                  query = transaction_.createQuery(entityKinds.project).hasAncestor(ancestorKey);
                } catch (queryInitError_) {
                  console.log(queryInitError_);
                  appErrors.push({
                    errorCodeID: "tad89s22SsG64BpPT3IU4A",
                    // "Unexpected error attempting to instantiate transaction query.",
                    errorCodeSource: "UoVA54NeT8uxXHEZI5KGfw",
                    errorContext: {
                      errorMessage: queryInitError_.message
                    }
                  });
                  resolve_({
                    appErrors: {
                      appErrors: appErrors
                    }
                  });
                  return;
                }

                transaction_.runQuery(query).then(function (queryResult_) {
                  try {
                    // TODO: We can get paginated results here, but currently aren't handling them. See if we need to do anything.
                    var queryResults = queryResult_[0];
                    var report = {
                      projects: [],
                      tasks: [],
                      projectSummaries: {},
                      taskSummaries: {}
                    }; // Generate replicas for each query result.

                    queryResults.forEach(function (projectEntity) {
                      var project = projectEntity.definition["YXLAvU1ZSlmO4rGgETOxFQ_OrgProject"];
                      var projectId = project.id; // Generate project specific report fields

                      report.projects.push(projectId);
                      report.projectSummaries[projectId] = {
                        projectId: projectId,
                        name: project.name || "",
                        description: project.description || "",
                        taskIds: []
                      }; // Generate task specific report fields

                      project.tasks.forEach(function (taskDefinition) {
                        var task = taskDefinition["LvreI3yIQHS8vhoPuBdLLA_ProjectTask"];
                        report.tasks.push(task.id);
                        report.projectSummaries[projectId].taskIds.push(task.id);
                        report.taskSummaries[task.id] = {
                          taskId: task.id,
                          projectId: projectId,
                          name: task.name || "",
                          description: task.description || "",
                          startTime: task.constraints && task.constraints.startTime ? task.constraints.startTime.epochTime : null,
                          endTime: task.constraints && task.constraints.endTime ? task.constraints.endTime.epochTime : null
                        };
                      });
                    });

                    try {
                      transaction_.rollback();
                    } catch (err) {
                      // No need to use appError here. It's fine to still return the data I think.
                      // TODO: Transaction failing could mean it's hanging and could mean that subsequent reads may not happen
                      // and it will report that 'contention' error message instead. Do we report this in addition to returning
                      // the project replicas??? The read was fine so the data is good, but also say hey don't try to read
                      // again for 10 sec or something like that.
                      console.log(err);
                    }

                    resolve_({
                      report: report
                    });
                    return;
                  } catch (queryResultProcessingError_) {
                    console.log(queryResultProcessingError_);
                    appErrors.push({
                      errorCodeID: "JSb4Jvh1TBeSPWpIwsHSqQ",
                      // "Unexpected error while processing the query result."
                      errorCodeSource: "ZMsYIHFaQ0a4XD_3pNWtbg",
                      errorContext: {
                        errorMessage: queryResultProcessingError_.message
                      }
                    });
                    resolve_({
                      appErrors: {
                        appErrors: appErrors
                      }
                    });
                    return;
                  }
                })["catch"](function (queryError_) {
                  console.log(queryError_);
                  appErrors.push({
                    errorCodeID: "vsWLtzJFRlCEsEYAU8fwNw",
                    // "Unexpected error during the query request.",
                    errorCodeSource: "A013iWzDRieK2eond6w0FA",
                    errorContext: {
                      errorMessage: queryError_.message
                    }
                  });
                  resolve_({
                    appErrors: {
                      appErrors: appErrors
                    }
                  });
                  return;
                });
              });
            } catch (transactionError_) {
              console.log(transactionError_);
              appErrors.push({
                errorCodeID: "50SgDnYpRCGEZ3p93fxlsg",
                // "Unexpected error trying to instantiate the Datastore transaction."
                errorCodeSource: "3iSVwkV-RWGiEtAVBlfh5A",
                errorContext: {
                  errorMessage: transactionError_.message
                }
              });
              resolve_({
                appErrors: {
                  appErrors: appErrors
                }
              });
              return;
            }
          });
        } catch (entityAccessAttemptError_) {
          console.log(entityAccessAttemptError_);
          errors.unshift("Failed to construct storage access promise.");
          return "break";
        }

        readOrgProjectsResponse.then(function (readOrgProjectsResult_) {
          responseAttempt = request_.response_filters.result.request(_objectSpread(_objectSpread({}, request_), {}, {
            response_descriptor: {
              http: {
                code: 200,
                message: "Success"
              },
              content: {
                encoding: "utf8",
                type: "application/json"
              },
              data: _objectSpread({
                serverVersion: {
                  version: appBuild.app.version,
                  buildID: appBuild.app.buildID
                }
              }, readOrgProjectsResult_)
            }
          }));

          if (responseAttempt.error) {
            console.log(responseAttempt.error);

            var _errorAttempt = request_.response_filters.error.request({
              streams: request_.streams,
              integrations: request_.integrations,
              request_descriptor: request_.request_descriptor,
              error_descriptor: {
                http: {
                  code: 500
                },
                content: {
                  encoding: "utf8",
                  type: "application/json"
                },
                data: {
                  error_message: "Failed to write to the result response stream.",
                  error_context: {
                    source_tag: "2WXqqlPFQR2zTmwJGlNX4w"
                  }
                }
              }
            });

            if (_errorAttempt.error) {
              console.log(_errorAttempt.error);
              return {
                error: "Failed to write to the error response stream."
              };
            }

            return _errorAttempt;
          }

          return responseAttempt;
        })["catch"](function (err) {
          console.log(err);
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
                type: "application/json"
              },
              data: {
                error_message: "An error occured while trying to read to the database entity.",
                error_context: {
                  source_tag: "D3ORXCo4RD2kCzEi26O-yA"
                }
              }
            }
          });

          if (errorAttempt.error) {
            console.log(errorAttempt.error);
            return {
              error: "Failed to write to the error response stream."
            };
          }

          return errorAttempt;
        });
      };

      while (!inBreakScope) {
        var _ret = _loop();

        if (_ret === "break") break;
      }

      if (errors.length) {
        var message = errors.join(" ");
        console.log("Errors!", message);
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
              type: "application/json"
            },
            data: {
              error_message: message,
              error_context: {
                source_tag: "IP3RvLnES06q-wYEEKBN4A"
              }
            }
          }
        });

        if (errorAttempt.error) {
          console.log(errorAttempt.error);
          return {
            error: "Failed to write to the error response stream."
          };
        }
      }

      return {
        error: null,
        result: null
      };
    } // request_handler

  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;