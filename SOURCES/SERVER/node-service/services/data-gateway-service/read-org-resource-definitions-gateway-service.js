"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// read-org-resource-deifnitions-gateway-service.js
var holism = require("@encapsule/holism");

var _require = require("../../../../COMMON/rest-api"),
    iospecs = _require.iospecs;

var serviceCore = require("../../../../COMMON/service-core");

var appBuild = serviceCore.getAppBuild();

var datastore = require("../../../storage/google-datastore");

var entityKinds = require("../../../storage/data/constants").datastore.entities.kinds;

var _require2 = require("./utils"),
    makeDatastoreKey = _require2.makeDatastoreKey,
    calcOrgResourceId = _require2.calcOrgResourceId; // This service will be made available only to members of the Viewpath organization.
// i.e. external users will not be allowed to create, read, update, delete an organization profile.


var factoryResponse = holism.service.create({
  id: "yPyU207hRXWONL-Qcx46bw",
  name: "Read Org Resource Definitions Gateway Service",
  description: "Returns a replicated copy of the user's organization resource definitions document.",
  constraints: {
    request: {
      content: {
        encoding: "utf8",
        type: "application/json"
      },
      query_spec: {
        ____types: "jsUndefined"
      },
      request_spec: iospecs.requests.readOrgResourceDefinitions,
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
      result_spec: iospecs.results.readOrgResourceDefinitions,
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
        var readOrgResourceResponse = void 0;

        try {
          readOrgResourceResponse = new Promise(function (resolve_, reject_) {
            var appErrors = [];

            try {
              var orgID = request_.request_descriptor.session.organizationId;
              var entityID = calcOrgResourceId(orgID);
              var transaction = datastore.transaction();
              transaction.run(function (error_, transaction_) {
                try {
                  var key;
                  var entityKeyRequest = makeDatastoreKey({
                    kind: entityKinds.orgResource,
                    entityID: entityID,
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
                    key = entityKeyRequest.result;
                  }

                  transaction_.get(key).then(function (queryResult_) {
                    try {
                      if (!queryResult_[0]) {
                        appErrors.push({
                          errorCodeID: "aydZHTmCQaKjom379W2idw",
                          // "Entity does not exist."
                          errorCodeSource: "Mm5Stf0DTji6oFwiyWEfSg",
                          errorContext: {
                            id: entityID
                          }
                        });
                        resolve_({
                          appErrors: {
                            appErrors: appErrors
                          }
                        });
                      } else {
                        var entity = queryResult_[0];
                        var pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica = {
                          replicaVersion: entity.version,
                          replicaVDID: entity.VDID,
                          definition: entity.definition
                        };
                        resolve_({
                          replicas: [{
                            pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica: pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica
                          }]
                        });
                      }
                    } catch (queryResultProcessingError_) {
                      console.log(queryResultProcessingError_);
                      appErrors.push({
                        errorCodeID: "JSb4Jvh1TBeSPWpIwsHSqQ",
                        // "Unexpected error while processing the query result."
                        errorCodeSource: "MaFVwtxVSxCWbP2Oet81Cg",
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
                      errorCodeSource: "zP1fXRW-QOOCBvLv3kYpkQ",
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
                        errorCodeSource: "84NnPAE2QyuWNaWE96zEbA",
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
                    errorCodeSource: "J2BcQ6BjQjGfiNpQIxXF5g",
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
                      errorCodeSource: "XkP78fxcRMSIq-XrYOisXg",
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
                errorCodeSource: "cFWxLgMQQl22T5xGaCXwXA",
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

        readOrgResourceResponse.then(function (readOrgResourceResult_) {
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
              }, readOrgResourceResult_)
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
                    source_tag: "-92VXRwuR6asB_4YvSKcpw"
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
                  source_tag: "id4R5NeISuiXJAp2wdg34Q"
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
                source_tag: "Tu4UQUuBT8SK8khWR3-5oA"
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