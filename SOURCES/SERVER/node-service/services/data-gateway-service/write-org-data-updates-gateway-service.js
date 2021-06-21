"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// write-org-data-udpates-gateway-service.js
var arccore = require("@encapsule/arccore");

var holism = require("@encapsule/holism");

var _require = require("../../../../COMMON/rest-api"),
    iospecs = _require.iospecs;

var serviceCore = require("../../../../COMMON/service-core");

var serviceCommon = require("../../../../COMMON/service-common");

var apiSpecs = serviceCommon.dataGateway;
var appBuild = serviceCore.getAppBuild();

var datastore = require("../../../storage/google-datastore");

var entityKinds = require("../../../storage/data/constants").datastore.entities.kinds;

var validateClientDocumentEntity = require("../../../storage/data/filters").validate.clientDocument;

var _require2 = require("./utils"),
    makeDatastoreKey = _require2.makeDatastoreKey,
    calcOrgResourceId = _require2.calcOrgResourceId,
    calcOrgResourceReservationsId = _require2.calcOrgResourceReservationsId,
    calcOrgProfileMembersMapId = _require2.calcOrgProfileMembersMapId;

var factoryResponse = holism.service.create({
  id: "7hPWHvOxQ2GnrpdCchX8Iw",
  name: "Write Org Data Updates Gateway Service",
  description: "Accepts a set of shared organization documents from a user (via our HTML5 client application code) that have been written since the client last replicated the document(s). These documents are transactionally committed iff no documents in the set have since been updated. Otherwise, the gateway service responds by sending the HTML5 client updated replicas of any out-of-date document that the user is attempting to edit. And, the HTML5 client app is then responsible for resolving conficts and trying again.",
  constraints: {
    request: {
      // Interpret the HTTP request body as UTF8 JSON.
      content: {
        encoding: "utf8",
        type: "application/json"
      },
      // This service does not support URL-encoded query parameters; the entire request is specified in the HTTP POST request body as serialized JSON.
      query_spec: {
        ____accept: "jsUndefined"
      },
      // This is the filter spec of the request JSON document that's serialized to the HTTP POST request body.
      request_spec: iospecs.requests.writeOrgDataUpdates,
      options_spec: {
        ____types: "jsObject",
        ____defaultValue: {}
      }
    },
    // #.constraints.request
    response: {
      content: {
        encoding: "utf8",
        type: "application/json"
      },
      result_spec: iospecs.results.writeOrgDataUpdates,
      error_context_spec: {
        ____types: "jsObject",
        source_tag: {
          ____accept: "jsString"
        }
      }
    } // #.constraints.response

  },
  // #.constraints
  handlers: {
    request_handler: function request_handler(request_) {
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var updateOrgDataResponse = void 0;

        try {
          (function () {
            var orgID = request_.request_descriptor.session.organizationId;
            var message = request_.request_descriptor.data.body;
            var writeOrgDataUpdates = message.writeOrgDataUpdates; // The Promise will resolve_ one of these (writeOrgDataResponses or appErrors).

            var writeOrgDataResponses = {};
            var appErrors = [];
            updateOrgDataResponse = new Promise(function (resolve_, reject_) {
              try {
                /*
                    The body of this Promise can be broken into the following main parts:
                        1. Entity key generation.
                        2. Batch 'get' lookup of all entity keys.
                        3. Processing of each update request.
                        4. Batch 'save' (create, update) and 'delete' of requests to DB.
                     NOTE: Writing OrgProfiles deviates from this slightly as an extra query for UserProfiles needs to take place, but
                    otherwise follows this general pattern.
                */

                /***** START: Entity Key Generation *****/

                /*
                    Here we generate the Datastore key for each write request we received. This service can support writing many entity
                    kinds in a single request. It uses utility functions to consistently generate entity kind specific keys. OrgProfileMemembersMap,
                    OrgResources, and OrgResourceReservations have their key calculated by concatenating the OrgProfile ID, which can always be
                    found on the user's session, with a string (unique by entity kind). This allows us to easily get the IDs of these entity kinds
                    and use 'get' operations rather than 'query'.
                */
                var keys = []; // Array to store entity keys for a batch read database operation.
                // Project key generation.

                if (writeOrgDataUpdates.orgProjectDefinitionUpdates.length) {
                  writeOrgDataUpdates.orgProjectDefinitionUpdates.forEach(function (projectUpdateRequest) {
                    var entityID = projectUpdateRequest["SQA0vCvWRZ2O6vwxpray0Q_AppDefinitionUpdate"].updateDescriptor.definition["YXLAvU1ZSlmO4rGgETOxFQ_OrgProject"].id;
                    var entityKeyRequest = makeDatastoreKey({
                      kind: entityKinds.project,
                      entityID: entityID,
                      orgID: orgID
                    });

                    if (entityKeyRequest.error) {
                      appErrors.push(entityKeyRequest.error);
                      return;
                    }

                    keys.push(entityKeyRequest.result);
                  });
                } // Organization profile key.
                // NOTE: You can only update your own org.


                if (writeOrgDataUpdates.orgProfileDefinitionUpdate) {
                  var entityKeyRequest = makeDatastoreKey({
                    kind: entityKinds.orgProfile,
                    orgID: orgID
                  });

                  if (entityKeyRequest.error) {
                    appErrors.push(entityKeyRequest.error);
                  } else {
                    keys.push(entityKeyRequest.result);
                  }
                } // Organization profile members map key. (This always gets rewritten when an OrgProfile is updated too.)


                if (writeOrgDataUpdates.orgProfileMembersMapDefinitionUpdate || writeOrgDataUpdates.orgProfileDefinitionUpdate) {
                  var entityID = calcOrgProfileMembersMapId(orgID);

                  var _entityKeyRequest = makeDatastoreKey({
                    kind: entityKinds.orgProfileMembersMap,
                    entityID: entityID,
                    orgID: orgID
                  });

                  if (_entityKeyRequest.error) {
                    appErrors.push(_entityKeyRequest.error);
                  } else {
                    keys.push(_entityKeyRequest.result);
                  }
                } // OrgResource key.


                if (writeOrgDataUpdates.orgResourceDefinitionUpdate) {
                  var _entityID = calcOrgResourceId(orgID);

                  var _entityKeyRequest2 = makeDatastoreKey({
                    kind: entityKinds.orgResource,
                    entityID: _entityID,
                    orgID: orgID
                  });

                  if (_entityKeyRequest2.error) {
                    appErrors.push(_entityKeyRequest2.error);
                  } else {
                    keys.push(_entityKeyRequest2.result);
                  }
                } // OrgResourceReservations key.


                if (writeOrgDataUpdates.orgResourceReservationsDefinitionUpdate) {
                  var _entityID2 = calcOrgResourceReservationsId(orgID);

                  var _entityKeyRequest3 = makeDatastoreKey({
                    kind: entityKinds.orgResourceReservations,
                    entityID: _entityID2,
                    orgID: orgID
                  });

                  if (_entityKeyRequest3.error) {
                    appErrors.push(_entityKeyRequest3.error);
                  } else {
                    keys.push(_entityKeyRequest3.result);
                  }
                } // Add other entity kind update requests keys here.
                // If we have any errors at this point we can resolve the promise now and return the errors.


                if (appErrors.length) {
                  resolve_({
                    appErrors: {
                      appErrors: appErrors
                    }
                  });
                  return;
                }
                /***** END: Entity Key Generation *****/

                /***** START: Database Transaction *****/


                var transaction = datastore.transaction();
                transaction.run(function (error_, transaction_) {
                  try {
                    transaction_.get(keys).then(function (queryResult_) {
                      var queryResults = queryResult_[0]; // Helper function that accepts an entity ID and searches through the query results for that entity.

                      var searchQueryResults = function searchQueryResults(entityID) {
                        for (var i = 0; i < queryResults.length; i++) {
                          var queryResult = queryResults[i];
                          if (queryResult.id === entityID) return queryResult;
                        }

                        return undefined;
                      };

                      var entityUpdates = []; // Array for storing entities (added in processUpdateRequest) to be written to the DB in a batch save operation.

                      var entityDeletes = []; // Array for storing entities to be deleted in a batch operation.
                      // Helper function for processing a single update request.

                      var processUpdateRequest = function processUpdateRequest(_ref) {
                        var updateRequest = _ref.updateRequest,
                            queryResult = _ref.queryResult,
                            entityID = _ref.entityID,
                            entityKey = _ref.entityKey;

                        try {
                          var _updateRequest$SQA0vC = updateRequest["SQA0vCvWRZ2O6vwxpray0Q_AppDefinitionUpdate"],
                              operation = _updateRequest$SQA0vC.operation,
                              baselineDescriptor = _updateRequest$SQA0vC.baselineDescriptor,
                              updateDescriptor = _updateRequest$SQA0vC.updateDescriptor; // Create operation specific checks.

                          if (operation === "create") {
                            if (queryResult !== undefined) {
                              appErrors.push({
                                errorCodeID: "ZUlWVhVQRU2VRiqAemS15w",
                                // "Unable to create new entity. That ID is already in use."
                                errorCodeSource: "SfnP_tTXQ2yBcuXZe9whXQ",
                                errorContext: {
                                  id: entityID
                                }
                              });
                              return;
                            }
                          } // Update and delete operation specific checks.


                          if (operation === "update" || operation === "delete") {
                            if (queryResult === undefined) {
                              appErrors.push({
                                errorCodeID: "aydZHTmCQaKjom379W2idw",
                                // "Entity does not exist."
                                errorCodeSource: "RtuTr77ZRa2T7ufiYz4CdQ",
                                errorContext: {
                                  id: entityID
                                }
                              });
                              return;
                            }

                            if (baselineDescriptor === null) {
                              appErrors.push({
                                errorCodeID: "4DSg35CMTwSqW9RRlDVJYg",
                                // "Operation request is missing the required baseline descriptor."
                                errorCodeSource: "O7Lk-racTTKvMgrvWt06qg"
                              });
                              return;
                            }

                            if (queryResult.VDID !== baselineDescriptor.replicaVDID) {
                              appErrors.push({
                                errorCodeID: "IdIyL6GQToOS0jD1R9WWZw",
                                // "Unable to write request data. VDIDs don't match."
                                errorCodeSource: "EJtPobHkSmyCt728GZV_xA",
                                errorContext: {
                                  id: entityID,
                                  VDID: queryResult.VDID,
                                  replicaVDID: baselineDescriptor.replicaVDID
                                }
                              });
                              return;
                            }
                          } // Handle delete operation


                          if (operation === "delete") {
                            entityDeletes.push(entityKey);
                            return;
                          } // Handle create or update operations


                          var candidateData = {
                            id: entityID,
                            version: queryResult && queryResult.version ? queryResult.version + 1 : 1,
                            VDID: arccore.identifier.irut.fromEther(),
                            definition: updateDescriptor.definition
                          }; // This validation filter is ____opaque when it comes to the definition property. We trust that the
                          // input filter spec of this gateway service validated it.

                          var validationFilterResponse = validateClientDocumentEntity.request(candidateData);

                          if (validationFilterResponse.error) {
                            console.log(validationFilterResponse.error);
                            appErrors.push({
                              errorCodeID: "iBGQtikxTGGaMsSk7GLQsA",
                              // "Error, unable to construct valid Datastore entity."
                              errorCodeSource: "SpfD0bmHSdyjJD2SrH_0KA",
                              errorContext: {
                                message: validationFilterResponse.error
                              }
                            });
                            return;
                          }

                          var excludeFromIndexes = ["version", "VDID", "definition"]; // Only index the id (primary key).

                          var entity = {
                            key: entityKey,
                            data: validationFilterResponse.result,
                            excludeFromIndexes: excludeFromIndexes
                          }; // Store entity for batch save later.

                          entityUpdates.push(entity);
                          return validationFilterResponse.result;
                        } catch (error_) {
                          console.log(error_);
                          appErrors.push({
                            errorCodeID: "Nypx8PrWTLqffQO7QtXHGA",
                            // "Unexpected error trying to process update request."
                            errorCodeSource: "7oCLweCwRnyw4sKfxFBpsg",
                            errorContext: {
                              id: entityID,
                              updateRequest: updateRequest
                            }
                          });
                          return;
                        }
                      };
                      /*
                          Here we use the helper functions defined above to process each updateRequest using if statements to scope the
                          details of the logic to a specific entity kind. We wait until all the requests have been processed before checking
                          if we found any appErrors along the way and return all the issues in a single response if any or continue on
                          and commit the writes to the database.
                      */

                      /***** Process Project Update Requests *****/


                      if (writeOrgDataUpdates.orgProjectDefinitionUpdates.length) {
                        writeOrgDataUpdates.orgProjectDefinitionUpdates.forEach(function (projectUpdateRequest) {
                          var entityID = projectUpdateRequest["SQA0vCvWRZ2O6vwxpray0Q_AppDefinitionUpdate"].updateDescriptor.definition["YXLAvU1ZSlmO4rGgETOxFQ_OrgProject"].id;
                          var queryResult = searchQueryResults(entityID);
                          var entityKeyRequest = makeDatastoreKey({
                            kind: entityKinds.project,
                            entityID: entityID,
                            orgID: orgID
                          });

                          if (entityKeyRequest.error) {
                            appErrors.push(entityKeyRequest.error);
                            return;
                          }

                          var entityKey = entityKeyRequest.result;
                          var updateResult = processUpdateRequest({
                            updateRequest: projectUpdateRequest,
                            queryResult: queryResult,
                            entityID: entityID,
                            entityKey: entityKey
                          }); // If we got a result after processing the request it means it was valid so we store it in the result object (writeOrgDataResponses).

                          if (updateResult) {
                            var projectReplica = {
                              "pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica": {
                                replicaVersion: updateResult.version,
                                replicaVDID: updateResult.VDID,
                                definition: updateResult.definition
                              }
                            };

                            if (writeOrgDataResponses.orgProjectDefinitionUpdatesResponse) {
                              writeOrgDataResponses.orgProjectDefinitionUpdatesResponse.push(projectReplica);
                            } else {
                              writeOrgDataResponses.orgProjectDefinitionUpdatesResponse = [projectReplica];
                            }
                          } // NOTE: We could add an else block here that resolves_({appErrors}) and returns, but I am purposely not doing that
                          // here so we can wait until all the updateRequests are processed and return all the errors found at once.

                        });
                      }
                      /***** Process Organization Profile Members Map Update Requests *****/


                      if (writeOrgDataUpdates.orgProfileMembersMapDefinitionUpdate) {
                        var _entityID3 = calcOrgProfileMembersMapId(orgID);

                        var queryResult = searchQueryResults(_entityID3);

                        var _entityKeyRequest4 = makeDatastoreKey({
                          kind: entityKinds.orgProfileMembersMap,
                          entityID: _entityID3,
                          orgID: orgID
                        });

                        if (_entityKeyRequest4.error) {
                          appErrors.push(_entityKeyRequest4.error);
                        } else {
                          var entityKey = _entityKeyRequest4.result;
                          var updateResult = processUpdateRequest({
                            updateRequest: writeOrgDataUpdates.orgProfileMembersMapDefinitionUpdate,
                            queryResult: queryResult,
                            entityID: _entityID3,
                            entityKey: entityKey
                          });

                          if (updateResult) {
                            writeOrgDataResponses.orgProfileMembersMapDefinitionUpdateResponse = {
                              "pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica": {
                                replicaVersion: updateResult.version,
                                replicaVDID: updateResult.VDID,
                                definition: updateResult.definition
                              }
                            };
                          }
                        }
                      }
                      /***** Process OrgResource Update Requests *****/


                      if (writeOrgDataUpdates.orgResourceDefinitionUpdate) {
                        var _entityID4 = calcOrgResourceId(orgID);

                        var _queryResult = searchQueryResults(_entityID4);

                        var _entityKeyRequest5 = makeDatastoreKey({
                          kind: entityKinds.orgResource,
                          entityID: _entityID4,
                          orgID: orgID
                        });

                        if (_entityKeyRequest5.error) {
                          appErrors.push(_entityKeyRequest5.error);
                        } else {
                          var _entityKey = _entityKeyRequest5.result;

                          var _updateResult = processUpdateRequest({
                            updateRequest: writeOrgDataUpdates.orgResourceDefinitionUpdate,
                            queryResult: _queryResult,
                            entityID: _entityID4,
                            entityKey: _entityKey
                          });

                          if (_updateResult) {
                            writeOrgDataResponses.orgResourceDefinitionUpdateResponse = {
                              "pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica": {
                                replicaVersion: _updateResult.version,
                                replicaVDID: _updateResult.VDID,
                                definition: _updateResult.definition
                              }
                            };
                          }
                        }
                      }
                      /***** Process OrgResourceReservations Update Requests *****/


                      if (writeOrgDataUpdates.orgResourceReservationsDefinitionUpdate) {
                        var _entityID5 = calcOrgResourceReservationsId(orgID);

                        var _queryResult2 = searchQueryResults(_entityID5);

                        var _entityKeyRequest6 = makeDatastoreKey({
                          kind: entityKinds.orgResourceReservations,
                          entityID: _entityID5,
                          orgID: orgID
                        });

                        if (_entityKeyRequest6.error) {
                          appErrors.push(_entityKeyRequest6.error);
                        } else {
                          var _entityKey2 = _entityKeyRequest6.result;

                          var _updateResult2 = processUpdateRequest({
                            updateRequest: writeOrgDataUpdates.orgResourceReservationsDefinitionUpdate,
                            queryResult: _queryResult2,
                            entityID: _entityID5,
                            entityKey: _entityKey2
                          });

                          if (_updateResult2) {
                            writeOrgDataResponses.orgResourceReservationsDefinitionUpdateResponse = {
                              "pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica": {
                                replicaVersion: _updateResult2.version,
                                replicaVDID: _updateResult2.VDID,
                                definition: _updateResult2.definition
                              }
                            };
                          }
                        }
                      } // Add more kind updates here.

                      /***** Process Organization Update Requests *****/


                      if (writeOrgDataUpdates.orgProfileDefinitionUpdate) {
                        var _entityID6 = orgID;

                        var _queryResult3 = searchQueryResults(orgID);

                        var _entityKeyRequest7 = makeDatastoreKey({
                          kind: entityKinds.orgProfile,
                          orgID: orgID
                        });

                        if (_entityKeyRequest7.error) {
                          appErrors.push(_entityKeyRequest7.error);
                        } else {
                          var _entityKey3 = _entityKeyRequest7.result;

                          var _updateResult3 = processUpdateRequest({
                            updateRequest: writeOrgDataUpdates.orgProfileDefinitionUpdate,
                            queryResult: _queryResult3,
                            entityID: _entityID6,
                            entityKey: _entityKey3
                          });

                          if (_updateResult3) {
                            writeOrgDataResponses.orgProfileDefinitionUpdateResponse = {
                              "pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica": {
                                replicaVersion: _updateResult3.version,
                                replicaVDID: _updateResult3.VDID,
                                definition: _updateResult3.definition
                              }
                            };
                            /*
                                NOTE: What happens here is a special consequence of writing an OrgProfile. For MS3 at least, we will always create a new
                                orgProfileMembersMap when writing an orgProfile entity as an easy way to guarantee that we always have an up to date
                                orgProfileMembersMap entity as well. If one doesn't exist for an OrgProfile for some reason, one will be created for it.
                            */
                            // Update OrgProfile Members Map

                            var orgProfileMembersMapID = calcOrgProfileMembersMapId(orgID);
                            var orgProfileMembersMapResult = searchQueryResults(orgProfileMembersMapID); // If this finds a result, we use the version number only.
                            // Construct a Promise to create a map of userEmailAddresses to viewpathUserIds for an org by streaming all UserProfile entities.

                            var userProfileQueryStreamPromise = new Promise(function (resolve, reject) {
                              var query;

                              try {
                                query = transaction_.createQuery(entityKinds.userProfile);
                              } catch (queryInitError_) {
                                console.log(queryInitError_);
                                appErrors.push({
                                  errorCodeID: "tad89s22SsG64BpPT3IU4A",
                                  // "Unexpected error attempting to instantiate transaction query.",
                                  errorCodeSource: "m0rQILkHSJ2WWQmfylodfg",
                                  errorContext: {
                                    errorMessage: queryInitError_.message
                                  }
                                });
                                resolve({
                                  appErrors: {
                                    appErrors: appErrors
                                  }
                                });
                                return;
                              }

                              var membersMap = {};

                              try {
                                transaction_.runQueryStream(query).on("data", function (userProfileEntity) {
                                  if (_updateResult3.definition["R6DTqieiQ8Wr5wo9tI0lJA_OrgProfile"].members.includes(userProfileEntity.userEmailAddress)) {
                                    membersMap[userProfileEntity.userEmailAddress] = userProfileEntity.viewpathUserId;
                                  }
                                }).on("end", function () {
                                  return resolve(membersMap);
                                });
                              } catch (transactionQueryError_) {
                                console.log(transactionQueryError_);
                                appErrors.push({
                                  errorCodeID: "vsWLtzJFRlCEsEYAU8fwNw",
                                  // "Unexpected error during the query request."
                                  errorCodeSource: "1iYNFAV8RuWf5I7whB_Nkg",
                                  errorContext: {
                                    errorMessage: transactionQueryError_.message
                                  }
                                });
                                resolve({
                                  appErrors: {
                                    appErrors: appErrors
                                  }
                                });
                              }
                            });
                            userProfileQueryStreamPromise.then(function (candidateMembersMap) {
                              /*
                                  Here we create/update the orgProfileMembersMap to be saved to the DB and resolve the outer Promise too.
                                  The resolution process that culminates in the commit and ending of the transaction is duplicated outside the scope
                                  of the orgProfileDefinitionUpdate if statement scope as well. We have to handle it in both places because we in incur an additional
                                  async operation with the userProfileQueryStreamPromise here.
                              */
                              var definition = {
                                "IBHNBO8tTFWClypVtn3kaA_OrgProfileMembersMap": {
                                  id: orgProfileMembersMapID,
                                  membersMap: candidateMembersMap
                                }
                              }; // We still need to validate the OrgProfileMembersMap definition data before saving it to DB so we construct a simple filter here to do that.
                              // Other definitions get processed by the input filter of this file, but this is a special case we are handling here.

                              var factoryResponse = arccore.filter.create({
                                operationID: "meHjrUbbQcmi9OjUw8WCkw",
                                operationName: "Org Profile Members Map Validation Filter",
                                operationDescription: "Validates that data matches the defined spec for an Org Profile Members Map definition.",
                                inputFilterSpec: apiSpecs.iospecs.definitions.orgProfileMembersMapDefinition
                              });
                              var validationFilterResponse;

                              if (factoryResponse.error) {
                                console.log(factoryResponse.error);
                                appErrors.push({
                                  errorCodeID: "Ik39BDASQDWapoeTNxW4mw",
                                  // "Error, unable to construct validation filter."
                                  errorCodeSource: "ZZ2xKmDiSsStoctjqhQZKg",
                                  errorContext: {
                                    message: factoryResponse.error
                                  }
                                });
                              } else {
                                var definitionValidationResponse = factoryResponse.result.request(definition);

                                if (definitionValidationResponse.error) {
                                  console.log(validationFilterResponse.error);
                                  appErrors.push({
                                    errorCodeID: "iBGQtikxTGGaMsSk7GLQsA",
                                    // "Error, unable to construct valid Datastore entity."
                                    errorCodeSource: "qdidOfe8QriKeDbKEhBA5w",
                                    errorContext: {
                                      message: definitionValidationResponse.error
                                    }
                                  });
                                } else {
                                  var candidateData = {
                                    id: orgProfileMembersMapID,
                                    version: orgProfileMembersMapResult ? orgProfileMembersMapResult.version + 1 : 1,
                                    // Handles case where we need to create the entity for the first time.
                                    VDID: arccore.identifier.irut.fromEther(),
                                    definition: definitionValidationResponse.result
                                  };
                                  validationFilterResponse = validateClientDocumentEntity.request(candidateData);

                                  if (validationFilterResponse.error) {
                                    console.log(validationFilterResponse.error);
                                    appErrors.push({
                                      errorCodeID: "iBGQtikxTGGaMsSk7GLQsA",
                                      // "Error, unable to construct valid Datastore entity."
                                      errorCodeSource: "Fo4DYULtRomtg1jj0Xf_FA",
                                      errorContext: {
                                        message: validationFilterResponse.error
                                      }
                                    });
                                  }
                                }
                              }

                              if (!appErrors.length) {
                                var _entityKeyRequest8 = makeDatastoreKey({
                                  kind: entityKinds.orgProfileMembersMap,
                                  entityID: orgProfileMembersMapID,
                                  orgID: orgID
                                });

                                if (_entityKeyRequest8.error) {
                                  appErrors.push(_entityKeyRequest8.error);
                                } else {
                                  var excludeFromIndexes = ["version", "VDID", "definition"]; // Only index the id.

                                  var entity = {
                                    key: _entityKeyRequest8.result,
                                    data: validationFilterResponse.result,
                                    excludeFromIndexes: excludeFromIndexes
                                  }; // Store entity for batch save.

                                  entityUpdates.push(entity); // Save the result for the gateway response.

                                  writeOrgDataResponses.orgProfileMembersMapDefinitionUpdateResponse = {
                                    "pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica": {
                                      replicaVersion: validationFilterResponse.result.version,
                                      replicaVDID: validationFilterResponse.result.VDID,
                                      definition: validationFilterResponse.result.definition
                                    }
                                  };
                                }
                              } else {
                                // If any errors so far, rollback the transaction and resolve the appErrors.
                                try {
                                  transaction_.rollback();
                                } catch (err) {
                                  console.log(err);
                                  appErrors.push({
                                    errorCodeID: "uKupEQsgTqeKmY9R2dfFQw",
                                    // "Unable to rollback Datastore transaction."
                                    errorCodeSource: "G8thRtH1TmCK8s3lpdQssQ",
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
                              } // Perform a batch operation for the requests we received.


                              if (entityUpdates.length) transaction_.save(entityUpdates);
                              if (entityDeletes.length) transaction_["delete"](entityDeletes);
                              transaction_.commit().then(function (commitResult_) {
                                resolve_({
                                  writeOrgDataResponses: writeOrgDataResponses
                                });
                              })["catch"](function (commitError_) {
                                console.log(commitError_);
                                appErrors.push({
                                  errorCodeID: "BT2VZ2MDQwG2M4XCQJ0kkA",
                                  // "Unexpected error trying to commit the database transaction."
                                  errorCodeSource: "hRdSxiLXQvGCNV3t0QBMoQ",
                                  errorContext: {
                                    errorMessage: commitError_.message
                                  }
                                });
                                resolve_({
                                  appErrors: {
                                    appErrors: appErrors
                                  }
                                });
                              });
                            })["catch"](function (transactionError_) {
                              console.log(transactionError_);
                              appErrors.push({
                                errorCodeID: "Qlvj1M4xQS6dXjBjYjzJMg",
                                // "Unexpected error during the database transaction.",
                                errorCodeSource: "fwyOBucwTHKI-HtNoGGW9w",
                                errorContext: {
                                  errorMessage: transactionError_.message
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
                            }); // This is a special case we are handling with this early return. If we entered this code block we need to
                            // resolve the original Promise in the then or catch block of the above userProfileQueryPromise.

                            return;
                          }
                        }
                      } // All update requests have been processed at this point so we do a final error check to see if we commit or rollback the transaction.


                      if (appErrors.length) {
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
                      } // Perform a batch operation for the requests we received.


                      if (entityUpdates.length) transaction_.save(entityUpdates);
                      if (entityDeletes.length) transaction_["delete"](entityDeletes);
                      transaction_.commit().then(function (commitResult_) {
                        resolve_({
                          writeOrgDataResponses: writeOrgDataResponses
                        });
                      })["catch"](function (commitError_) {
                        console.log(commitError_);
                        appErrors.push({
                          errorCodeID: "BT2VZ2MDQwG2M4XCQJ0kkA",
                          // "Unexpected error trying to commit the database transaction."
                          errorCodeSource: "lrI6RQBZQTumzyLtIomSpA",
                          errorContext: {
                            errorMessage: commitError_.message
                          }
                        });
                        resolve_({
                          appErrors: {
                            appErrors: appErrors
                          }
                        });
                      });
                    })["catch"](function (queryError_) {
                      console.log(queryError_);
                      appErrors.push({
                        errorCodeID: "vsWLtzJFRlCEsEYAU8fwNw",
                        // "Unexpected error during the query request.",
                        errorCodeSource: "vRKb10ytQmCLKuzgCEHiRg",
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
                  } catch (transactionGetError_) {
                    console.log();
                    appErrors.push({
                      errorCodeID: "Qlvj1M4xQS6dXjBjYjzJMg",
                      // "Unexpected error during the database transaction."
                      errorCodeSource: "QNJH8C5aREmbb7CwPOFGPA",
                      errorContext: {
                        errorMessage: transactionGetError_.message
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
                /***** END: Database Transaction *****/
              } catch (transactionError_) {
                console.log(transactionError_);
                appErrors.push({
                  errorCodeID: "50SgDnYpRCGEZ3p93fxlsg",
                  // "Unexpected error trying to instantiate the Database transaction.",
                  errorCodeSource: "sOYOJztBTc-xJU79q2INkw",
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
          })();
        } catch (updateOrgDataAttemptError_) {
          console.log(updateOrgDataAttemptError_);
          errors.unshift("Error attemping to instantiate database access Promise.");
          break;
        }

        updateOrgDataResponse.then(function (updateOrgDataResult_) {
          var responseAttempt = request_.response_filters.result.request(_objectSpread(_objectSpread({}, request_), {}, {
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
              }, updateOrgDataResult_)
            }
          }));

          if (responseAttempt.error) {
            console.log(responseAttempt.error);
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
                  error_message: "Failed to write to the result response stream.",
                  error_context: {
                    source_tag: "EVeH5CBGTDS60VZOq30Hhg"
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
                error_message: "An error occured while trying to write to the database.",
                error_context: {
                  source_tag: "BsdziZw9TV6sPJ3PjU8ceQ"
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
                source_tag: "J4EeKJfaSdadsCCfNtm66Q"
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
    }
  } // #.handlers

});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;