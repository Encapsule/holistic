"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// read-org-summary-report-gateway-service.js
var holism = require("@encapsule/holism");

var _require = require("../../../../COMMON/rest-api"),
    iospecs = _require.iospecs;

var serviceCore = require("../../../../COMMON/service-core");

var appBuild = serviceCore.getAppBuild();

var datastore = require("../../../storage/google-datastore");

var entityKinds = require("../../../storage/data/constants").datastore.entities.kinds;

var _require2 = require("./utils"),
    makeDatastoreKey = _require2.makeDatastoreKey,
    calcOrgProfileMembersMapId = _require2.calcOrgProfileMembersMapId;

var factoryResponse = holism.service.create({
  id: "ACV_TQX2SjmcaQ5JQafDgg",
  name: "Read Org Summary Report Gateway Service",
  description: "Returns a summary of the user's organization including membership and organization member metadata.",
  constraints: {
    request: {
      content: {
        encoding: "utf8",
        type: "application/json"
      },
      query_spec: {
        ____types: "jsUndefined"
      },
      request_spec: iospecs.requests.readOrgSummaryReport,
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
      result_spec: iospecs.results.readOrgSummaryReport,
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
        var getOrgSummaryReportResponse = void 0;
        var appErrors = [];

        try {
          var orgID = request_.request_descriptor.session.organizationId;
          getOrgSummaryReportResponse = new Promise(function (resolve_, reject_) {
            try {
              var transaction = datastore.transaction();
              transaction.run(function (error_, transaction_) {
                // Generate key for OrgProfile and OrgProfileUserMap
                var keys = [];
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
                  keys.push(entityKeyRequest.result);
                }

                var entityID = calcOrgProfileMembersMapId(orgID);
                entityKeyRequest = makeDatastoreKey({
                  kind: entityKinds.orgProfileMembersMap,
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
                  keys.push(entityKeyRequest.result);
                }

                transaction_.get(keys).then(function (queryResult_) {
                  try {
                    var queryResults = queryResult_[0];
                    var orgProfile, orgProfileMembersMap;
                    queryResults.forEach(function (entity) {
                      if (entity.definition["R6DTqieiQ8Wr5wo9tI0lJA_OrgProfile"]) {
                        orgProfile = entity.definition["R6DTqieiQ8Wr5wo9tI0lJA_OrgProfile"];
                      }

                      if (entity.definition["IBHNBO8tTFWClypVtn3kaA_OrgProfileMembersMap"]) {
                        orgProfileMembersMap = entity.definition["IBHNBO8tTFWClypVtn3kaA_OrgProfileMembersMap"];
                      }
                    });

                    if (queryResults.length !== 2) {
                      appErrors.push({
                        errorCodeID: "aydZHTmCQaKjom379W2idw",
                        // "Entity does not exist."
                        errorCodeSource: "KkcspXOwToeHmYlw_30suw",
                        errorContext: {
                          id: orgProfile ? entityID : orgID
                        }
                      });
                      resolve_({
                        appErrors: {
                          appErrors: appErrors
                        }
                      });
                      return;
                    } else {
                      var report = {
                        name: orgProfile.name,
                        description: orgProfile.description || "",
                        memberIds: [],
                        memberEmails: orgProfile.members,
                        memberSummaries: {}
                      }; // Make User Profile keys

                      var _keys = [];
                      Object.values(orgProfileMembersMap.membersMap).forEach(function (userId) {
                        _keys.push(datastore.key([entityKinds.userProfile, userId]));
                      });

                      try {
                        transaction_.get(_keys).then(function (queryResult_) {
                          try {
                            var _queryResults = queryResult_[0];

                            _queryResults.forEach(function (userProfileEntity) {
                              var viewpathUserId = userProfileEntity.viewpathUserId,
                                  userEmailAddress = userProfileEntity.userEmailAddress,
                                  userGivenName = userProfileEntity.userGivenName,
                                  userFamilyName = userProfileEntity.userFamilyName,
                                  userPhotoUrl = userProfileEntity.userPhotoUrl;
                              report.memberIds.push(viewpathUserId);
                              report.memberSummaries[viewpathUserId] = {
                                viewpathUserId: viewpathUserId,
                                userEmailAddress: userEmailAddress,
                                userGivenName: userGivenName,
                                userFamilyName: userFamilyName,
                                userPhotoUrl: userPhotoUrl
                              };
                            });

                            resolve_({
                              report: report
                            });
                          } catch (queryResultProcessingError_) {
                            console.log(queryResultProcessingError_);
                            appErrors.push({
                              errorCodeID: "JSb4Jvh1TBeSPWpIwsHSqQ",
                              // "Unexpected error while processing the query result."
                              errorCodeSource: "cPtaIAaAQIySWXUpAdtNiQ",
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
                        })["catch"](function (queryError_) {
                          console.log(queryError_);
                          appErrors.push({
                            errorCodeID: "vsWLtzJFRlCEsEYAU8fwNw",
                            // "Unexpected error during the query request."
                            errorCodeSource: "J2s1AO52T26BDhIpFmOAbw",
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
                              errorCodeSource: "hmttWi4FQ3SMZzSnwUCAhg",
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
                      } catch (queryError_) {
                        console.log(queryError_);
                        appErrors.push({
                          errorCodeID: "vsWLtzJFRlCEsEYAU8fwNw",
                          // "Unexpected error during the query request.",
                          errorCodeSource: "hJEuAsS7QuGOUS6hF5aQvw",
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
                      }
                    }
                  } catch (queryResultProcessingError_) {
                    console.log(queryResultProcessingError_);
                    appErrors.push({
                      errorCodeID: "JSb4Jvh1TBeSPWpIwsHSqQ",
                      // "Unexpected error while processing the query result."
                      errorCodeSource: "GTMmYcatQlWOB08dvFkG6w",
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
                    errorCodeSource: "lq782eORT7idVmG1z6zwEg",
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
                errorCodeSource: "OVCGwNfUR0Suxdjb5Wggaw",
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

        getOrgSummaryReportResponse.then(function (getOrgSummaryReportResult_) {
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
              }, getOrgSummaryReportResult_)
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
                    source_tag: "LQOLM1McRCilmKg283NU1A"
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
                  source_tag: "kTOavt6pSyieURXnUfjlGg"
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
                source_tag: "k1mk_INtRJGs4swA1O19HQ"
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