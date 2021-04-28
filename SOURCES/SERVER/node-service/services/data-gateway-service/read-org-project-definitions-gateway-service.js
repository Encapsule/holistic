"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// read-org-project-definitions-gateway-service.js
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
  id: "2JRzT-dBRUi0SPr_UPizrA",
  name: "Read Org Project Definitions Gateway Service",
  description: "Returns replicated copy(ies) of project definition(s) created by members of the requesting user's organization.",
  constraints: {
    request: {
      content: {
        encoding: "utf8",
        type: "application/json"
      },
      query_spec: {
        ____types: "jsUndefined"
      },
      request_spec: iospecs.requests.readOrgProjectDefinitions,
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
      result_spec: iospecs.results.readOrgProjectDefinitions,
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
        var message = request_.request_descriptor.data.body;
        var responseAttempt = void 0; // Quick check to immediately return if no IDs supplied.

        if (message.readOrgProjectDefinitions.projects.length === 0) {
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
              data: {
                serverVersion: {
                  version: appBuild.app.version,
                  buildID: appBuild.app.buildID
                }
              }
            }
          }));

          if (responseAttempt.error) {
            console.log(responseAttempt.error);
            errors.push("Failed to write to the response stream.");
            return "break";
          }

          return {
            v: {
              result: null,
              error: null
            }
          };
        } // Deduplicate projectIDs so we can check for an expected number of responses from the query.


        var projectIDs = _toConsumableArray(new Set(message.readOrgProjectDefinitions.projects));

        var readOrgProjectsResponse = void 0;

        try {
          readOrgProjectsResponse = new Promise(function (resolve_, reject_) {
            var appErrors = [];

            try {
              var orgID = request_.request_descriptor.session.organizationId;
              var transaction = datastore.transaction();
              transaction.run(function (error_, transaction_) {
                try {
                  var keys = [];
                  projectIDs.forEach(function (projectID) {
                    var entityKeyRequest = makeDatastoreKey({
                      kind: entityKinds.project,
                      entityID: projectID,
                      orgID: orgID
                    });

                    if (entityKeyRequest.error) {
                      appErrors.push(entityKeyRequest.error);
                      return;
                    } else {
                      keys.push(entityKeyRequest.result);
                    }
                  });
                  transaction_.get(keys).then(function (queryResult_) {
                    try {
                      if (projectIDs.length !== queryResult_[0].length) {
                        var queryResultIDs = queryResult_[0].map(function (projectEntity) {
                          return projectEntity.id;
                        });
                        projectIDs.forEach(function (projectID) {
                          if (!queryResultIDs.includes(projectID)) {
                            appErrors.push({
                              errorCodeID: "aydZHTmCQaKjom379W2idw",
                              // "Entity does not exist."
                              errorCodeSource: "RXsfjr8mR4yVM5NQhS44Pw",
                              errorContext: {
                                id: projectID
                              }
                            });
                          }
                        });
                        resolve_({
                          appErrors: {
                            appErrors: appErrors
                          }
                        });
                      } else {
                        var projects = queryResult_[0].map(function (project) {
                          return {
                            "pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica": {
                              replicaVersion: project.version,
                              replicaVDID: project.VDID,
                              definition: project.definition
                            }
                          };
                        });
                        resolve_({
                          replicas: projects
                        });
                      }
                    } catch (queryResultProcessingError_) {
                      console.log(queryResultProcessingError_);
                      appErrors.push({
                        errorCodeID: "JSb4Jvh1TBeSPWpIwsHSqQ",
                        // "Unexpected error while processing the query result."
                        errorCodeSource: "L1lsCrNWT6ulCrxQZybdCA",
                        errorContext: {
                          errorMessage: queryResultProcessingError_.message
                        }
                      });
                      resolve_({
                        appErrors: {
                          appErrors: appErrors
                        }
                      });
                    }

                    try {
                      transaction_.rollback();
                    } catch (err) {
                      console.log(err);
                    }

                    return;
                  })["catch"](function (queryError_) {
                    console.log(queryError_);
                    appErrors.push({
                      errorCodeID: "vsWLtzJFRlCEsEYAU8fwNw",
                      // "Unexpected error during the query request."
                      errorCodeSource: "ZRJwR0etQXGHpmiglTul2Q",
                      errorContext: {
                        errorMessage: queryError_.message
                      }
                    });

                    try {
                      transaction_.rollback();
                    } catch (err) {
                      console.log(err);
                      appErrors.push({
                        errorCodeID: "uKupEQsgTqeKmY9R2dfFQw",
                        // "Unable to rollback Datastore transaction."
                        errorCodeSource: "2bwbnupFRWKSrvSLxhP5tw",
                        errorContext: {
                          errorMessage: err.message
                        }
                      });
                    }

                    resolve_({
                      appErrors: {
                        appErrors: appErrors
                      }
                    });
                    return;
                  });
                } catch (transactionRunError_) {
                  console.log(transactionRunError_);
                  appErrors.push({
                    errorCodeID: "Qlvj1M4xQS6dXjBjYjzJMg",
                    // "Unexpected error during the database transaction."
                    errorCodeSource: "cQTq8ZgvT9G9zuv-233xDg",
                    errorContext: {
                      errorMessage: transactionRunError_.message
                    }
                  });

                  try {
                    transaction_.rollback();
                  } catch (err) {
                    console.log(err);
                    appErrors.push({
                      errorCodeID: "uKupEQsgTqeKmY9R2dfFQw",
                      // "Unable to rollback Datastore transaction."
                      errorCodeSource: "hKyOf2-nQRGC_k4qO6xJ8Q",
                      errorContext: {
                        errorMessage: err.message
                      }
                    });
                  }

                  resolve_({
                    appErrors: {
                      appErrors: appErrors
                    }
                  });
                  return;
                }
              });
            } catch (transactionError_) {
              console.log(transactionError_);
              appErrors.push({
                errorCodeID: "50SgDnYpRCGEZ3p93fxlsg",
                // "Unexpected error trying to instantiate the Datastore transaction."
                errorCodeSource: "7-pQ4oSdRsK7keHvNJqlJg",
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
        } catch (entityAccessorAttemptError_) {
          console.log(entityAccessorAttemptError_);
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
                    source_tag: "IBisdl4WQxyW9sti6DsHMQ"
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
                  source_tag: "jYJcGEBZSKqj7N9R4QkT1Q"
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
        if (_typeof(_ret) === "object") return _ret.v;
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
                source_tag: "dBA5C6dnRfmreUFeqA58bQ"
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