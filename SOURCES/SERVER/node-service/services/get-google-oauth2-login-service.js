"use strict";

var appBuild = require("../../../app-build"); // TODO: SERVICE FILTERS can not get appBuild info from request_ data prepared by @encapsule/holism (or they should be able to).


var arccore = require("@encapsule/arccore");

var vp5Deployment = require("../../deployment");

var config = vp5Deployment.getGoogleOAuth2ClientConfig();

var _require = require("google-auth-library"),
    OAuth2Client = _require.OAuth2Client;

var extractOAuth2TokenFromResponseFilter = require("./google-oauth2/extract-token-data-from-google-oauth2-api-response-filter");

var extractUserDataFromResponseFilter = require("./google-oauth2/extract-user-data-from-google-people-api-response-filter");

var userProfileAccessor = require("../../storage/user/profile/");

var userSessionAccessor = require("../../storage/user/session/");

var userStorageConstants = require("../../storage/user/constants");

var holism = require("@encapsule/holism");

var factoryResponse = holism.service.create({
  id: "0jdgQUwiRE2lU2IAow7qMQ",
  name: "Google OAuth2 Login Service",
  description: "Redirect the browser to Google OAuth2 account login and scope consent form. And, handle the browser's subsequent redirect back to our origin server.",
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
        ____accept: "jsObject",
        ____defaultValue: {}
      }
    },
    // request
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
    } // response

  },
  // constraints
  handlers: {
    request_handler: function request_handler(request_) {
      var response = {
        error: null,
        result: null
      };
      var errors = [];
      var inBreakScope = false;
      var responseAttempt; // request = { message: string, source: string (IRUT) }
      // Writes to the error HTTP response filter closing the HTTP response stream.

      function http500Error(errorRequest_) {
        // ================================================================
        // HTTP 500 INTERNAL SERVICE ERROR
        var errorMessage = ["Oh dear...", errorRequest_.message].join(" ");
        request_.response_filters.error.request({
          streams: request_.streams,
          integrations: request_.integrations,
          request_descriptor: request_.request_descriptor,
          error_descriptor: {
            http: {
              code: 500,
              message: "Internal Service Error During Login"
            },
            content: {
              encoding: "utf8",
              type: "text/html"
            },
            data: {
              error_message: errorMessage,
              error_context: {
                source_tag: errorRequest_.source
              }
            }
          }
        }); // response_filter

        return;
      } // end function http500Error


      var _loop = function _loop() {
        inBreakScope = true; // Create an Google OAuth2 client instance that we'll need regardless of
        // if we're generating a redirect (use case #1). Or, generating a user
        // session cookie (use case #2).

        var oAuth2Client = new OAuth2Client(config.secrets.client_id, config.secrets.client_secret, config.redirectURI);

        if (!request_.request_descriptor.url_parse.query.code) {
          // USE CASE #1: Redirect the client to Google OAuth2 login/consent form hosted by Google, Corp.
          // TODO: Restrict access to the redirect functionality to only requestors that we reasonably believe to be our HTML5 client application.
          // e.g. require challenge name/value via query parameter known only to the client application and otherwise not documented.
          // Generate the Google OAuth2 account login and scope consent form dialog redirect URL
          // using our google-auth-library OAuth2Client instance. This URL will be returned to
          // the requestor (presumably a browser) with an appropriate HTTP redirect code.
          //
          // TODO: Use the OAuth2 'state' feature to send a challenge handshake to Google that it will return back to us along with OAuth2 code.
          // See: https://developers.google.com/identity/protocols/googlescopes
          var scopes = ["https://www.googleapis.com/auth/userinfo.profile", // See your personal info, including any personal info you've made publicly available
          "https://www.googleapis.com/auth/userinfo.email" // View your email address
          // "https://www.googleapis.com/auth/user.emails.read"  // View your email addresses (empirically we don't need this for primary e-mail address)
          ];
          var authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: scopes,
            // See discussion here re: prompt, consent, etc: https://stackoverflow.com/questions/14384354/force-google-account-chooser
            prompt: "consent"
          }); // Call the response filter to write data to the outbound httpServerResponse stream and complete the HTTP request.

          responseAttempt = request_.response_filters.result.request({
            streams: request_.streams,
            integrations: request_.integrations,
            request_descriptor: request_.request_descriptor,
            response_descriptor: {
              // Tell the browser to always perform a GET (HTTP 1.1 303) ...
              http: {
                code: 303,
                message: "Google OAuth2 Redirect"
              },
              content: {
                encoding: "utf8",
                type: "text/plain"
              },
              // ... on the URL specified by the value of the Location response header.
              headers: {
                Location: authorizeUrl
              },
              data: "Okay. Redirecting to Google OAuth2 service to confirm your identity..."
            }
          }); // If the response filter rejects the request...

          if (responseAttempt.error) {
            // Report unfortunately mishap via @encapsule/holism
            errors.unshift(responseAttempt.error);
            return "break";
          }

          return "break";
        } else {
          // USER CASE #2: Process HTTP redirect back from Google after user logs into their Google account and grants our scoped access.
          // Note that we redirect the user's browser's to Google (above use case #1). And, Google redirects the user's browser back to
          // to this same URL on our origin server. This second request from the user's browser is differentiated from the first by
          // the presence of URL-encoded query parameters. Specifically, the request contains a Google-issued OAuth2 code that we use
          // combine with our private server-only keys to obtain a Google OAuth2 token. The OAuth2 token is what is ultimately required
          // to gain scoped access to our user's data stored on Google. In this case we have asked only for scoped access to the user's
          // basic profile information on Google.
          // TODO: Perform additional error checking on OAuth2 'state' to ensure that the requestor is likely to be a copy
          // of our HTML5 client application processing a valid redirect back from Google (as opposed to an attacker attempting
          // to tie up our Node.js servers with a whole lot of superfluous traffic to Google OAuth2
          var oAuth2Code = request_.request_descriptor.url_parse.query.code;
          console.log(">>>> RECEIVED GOOGLE OAUTH2 CODE '" + oAuth2Code + "'");
          console.log("..... Validating OAuth2 code with Google using our private server-only credentials."); // ================================================================
          // GET GOOGLE OAUTH2 TOKEN GIVEN CODE & OUR SERVICE SECRETS

          oAuth2Client.getToken(oAuth2Code).then(function (getTokensResponse_) {
            console.log("OAuth2 tokens acquired from Google!"); // Set the credentials on the OAuth2 client.

            oAuth2Client.setCredentials(getTokensResponse_.tokens);
            var filterResponse = extractOAuth2TokenFromResponseFilter.request(getTokensResponse_);

            if (filterResponse.error) {
              // ================================================================
              // HTTP 500 INTERNAL SERVICE ERROR
              return http500Error({
                message: "While filtering Google OAuth2 token get response: ".concat(filterResponse.error),
                source: "24p6D_ZQRwa4c00POAf0pw"
              });
            } // end if


            var tokenData = filterResponse.result;

            if (config.deploymentModel === "development") {
              console.log("================================================================");
              console.log("================================================================");
              console.log("GOOGLE OAUTH2 TOKEN RESPONSE JSON:");
              console.log("================================================================");
              console.log(JSON.stringify(tokenData));
              console.log("================================================================");
              console.log("================================================================");
            } else {
              console.log("Successfully obtained Google OAuth2 token for user given Google-issued authentication code...");
            } // end else


            oAuth2Client.request({
              url: "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos"
            }).then(function (getPeopleResponse_) {
              var filterResponse = extractUserDataFromResponseFilter.request(getPeopleResponse_);

              if (filterResponse.error) {
                // ================================================================
                // HTTP 500 INTERNAL SERVICE ERROR
                return http500Error({
                  message: "While filtering Google People API query response: ".concat(filterResponse.error),
                  source: "DTc7Y1isQWeFl6AIUwO-cw"
                });
              } // end if


              var userData = filterResponse.result;

              if (config.deploymentMode === "development") {
                console.log("================================================================");
                console.log("================================================================");
                console.log("GOOGLE PEOPLE API TOKEN RESPONSE JSON:");
                console.log(JSON.stringify(userData));
                console.log("================================================================");
                console.log("================================================================");
              } else {
                console.log("Successful query of Google People API using Google OAuth2 token for user...");
              } // end else

              /*
                At this point we have obtained OAuth2 token data from Google for the user.
                And, we have used that token to obtain some basic profile information from
                Google about the user. So, the user has proven to us who they are. And, we
                have obtained some information about them (e.g. their name and e-mail address).
                 The fact that we successfully obtained 'userData' from Google using the previoiusly-obtained
                OAuth2 token indicates, primarily, that the client agent we're dealing with is acting on behalf
                of someone who Google has authenticated. And, we know some basic information about them. Most
                importantly, we have obtained Google's unique ID for the user that we use to locate
                the user's account (represented as an HTML5NodeService user profile entity in DataStore).
              */
              // ================================================================
              // GET THE USER'S PROFILE ENTITY DATA GIVEN THEIR GOOGLE IDENTITY
              // Construct a Promise to read the user profile entity given the user's Google-issued OpenID (profile URI identifier).


              var profileOperation = "open"; // "open" is "read" iff profile exists and "new" if it does not

              var profileWriteData = {
                appUserId: arccore.identifier.irut.fromEther(),
                createAgent: userStorageConstants.login.agents.googleOAuth2,
                createAgentVersion: appBuild.app.version,
                createTime: arccore.util.getEpochTime(),
                userGivenName: userData.givenName,
                userFamilyName: userData.familyName,
                userEmailAddress: userData.emailAddress,
                userPhotoUrl: userData.photoUrl,
                googleProfileUri: userData.profileUri
              };
              filterResponse = userProfileAccessor.access.request({
                operation: profileOperation,
                query: {
                  key: "googleProfileUri",
                  value: userData.profileUri
                },
                data: profileWriteData
              });

              if (filterResponse.error) {
                // ================================================================
                // HTTP 500 INTERNAL SERVICE ERROR
                return http500Error({
                  message: "Failed to construct storage access Promise for user profile: ".concat(filterResponse.error),
                  source: "FP10DybCQSKE9qbeS2KABA"
                });
              } // end if


              var accessUserProfilePromise = filterResponse.result; // Apply the Promise to obtain the user profile.

              accessUserProfilePromise.then(function (accessUserProfileResult_) {
                // ================================================================
                // FILTER BY E-MAIL DOMAIN (we trust this because we got it from Google via OAuth and not from the user).
                if (!userData.emailAddress.endsWith("example-app.com")) {
                  filterResponse = request_.integrations.appStateContext.vp5GroupAuthorizer.getUserPermissions({
                    appUserId: accessUserProfileResult_.appUserId,
                    subsystemName: "authentication",
                    resourceName: "userSession",
                    operationName: "allow-login"
                  });

                  if (filterResponse.error || !filterResponse.result.authz.operation) {
                    var errorMessage = ["Hello, ".concat(userData.givenName, " ").concat(userData.familyName, "."), "We were able to confirm your identity with Google but were not able to log you into ".concat(appBuild.app.name, " because this server is restricted to example-app organization members only."), "We have taken note of your interest in our engineering workbench ;-)"].join(" ");
                    request_.response_filters.error.request({
                      streams: request_.streams,
                      integrations: request_.integrations,
                      request_descriptor: request_.request_descriptor,
                      error_descriptor: {
                        http: {
                          code: 401,
                          message: "User Login Failed"
                        },
                        content: {
                          encoding: "utf8",
                          type: "text/html"
                        },
                        data: {
                          error_message: errorMessage,
                          error_context: {
                            source_tag: "Wc-maZ_mSAKBwLL_JThWow"
                          }
                        }
                      }
                    }); // response_filter

                    return;
                  }
                } // end if user profile not found.
                // PROCESS USER BLACKLIST EXCLUSIONS


                filterResponse = request_.integrations.appStateContext.vp5GroupAuthorizer.getUserPermissions({
                  appUserId: accessUserProfileResult_.appUserId,
                  subsystemName: "authentication",
                  resourceName: "userSession",
                  operationName: "blacklist-block-login"
                });
                console.log(filterResponse);

                if (filterResponse.error || filterResponse.result.authz.operation) {
                  var _errorMessage = ["Hello, ".concat(userData.givenName, " ").concat(userData.familyName, "."), "We were able to confirm your identity with Google but were not able to log you into ".concat(appBuild.app.name, " because your account has been suspended.")].join(" ");

                  request_.response_filters.error.request({
                    streams: request_.streams,
                    integrations: request_.integrations,
                    request_descriptor: request_.request_descriptor,
                    error_descriptor: {
                      http: {
                        code: 401,
                        message: "User Login Failed"
                      },
                      content: {
                        encoding: "utf8",
                        type: "text/html"
                      },
                      data: {
                        error_message: _errorMessage,
                        error_context: {
                          source_tag: "kt0HZmCaRriJ2VJdWbMysA"
                        }
                      }
                    }
                  }); // response_filter

                  return;
                } // end user blacklist
                // ================================================================
                // USER ACCOUNT LOCATED
                // ================================================================
                // REMOVE EXPIRED PER-USER SESSION(S)
                // Create new storage Promise.


                var filterResponse = userSessionAccessor.deleteExpired.request({
                  appUserId: accessUserProfileResult_.appUserId
                });

                if (filterResponse.error) {
                  // ================================================================
                  // HTTP 500 INTERNAL SERVICE ERROR
                  return http500Error({
                    message: "Failed to construct storage Promise for expired user sessions: ".concat(filterResponse.error),
                    source: "ZvWR1Hj2TMiBX1SXYGeL7A"
                  });
                }

                var deleteExpiredUserSessionsPromise = filterResponse.result; // Apply the storage Promise to remove the user's expired session entities.

                deleteExpiredUserSessionsPromise.then(function (deleteExpiredUserSessionsResult_) {
                  var userSessionCreate = {
                    createAgent: userStorageConstants.login.agents.googleOAuth2,
                    createAgentVersion: appBuild.app.version,
                    userGivenName: accessUserProfileResult_.userGivenName,
                    userFamilyName: accessUserProfileResult_.userFamilyName,
                    userEmailAddress: accessUserProfileResult_.userEmailAddress,
                    userPhotoUrl: accessUserProfileResult_.userPhotoUrl,
                    appUserId: accessUserProfileResult_.appUserId,
                    sessionTokens: Buffer.from(JSON.stringify(tokenData), "utf8").toString("base64"),
                    userSettings: accessUserProfileResult_.userSettings
                  };
                  var filterResponse = userSessionAccessor.write.request({
                    createAgent: userStorageConstants.login.agents.googleOAuth2,
                    data: userSessionCreate
                  });

                  if (filterResponse.error) {
                    // ================================================================
                    // HTTP 500 INTERNAL SERVICE ERROR
                    return http500Error({
                      message: "Failed to construct storage writer Promise for user session: ".concat(filterResponse.error),
                      source: "uHKaRVxzR0uOLPN-bOBH7A"
                    });
                  }

                  var writeUserSessionPromise = filterResponse.result;
                  writeUserSessionPromise.then(function (writeUserSessionResult_) {
                    // CREATE NEW USER SESSION COOKIE TO SET IN HTTP RESPONSE HEADER 'Set-Cookie'.
                    // All about cookies:
                    // https://www.nczonline.net/blog/2009/05/05/http-cookies-explained/
                    // https://scotthelme.co.uk/csrf-is-dead/ <--- not yet widely implemented
                    // https://www.owasp.org/index.php/SameSite
                    var expires = new Date(writeUserSessionResult_.expireTime * 1000).toGMTString();
                    var setCookieTokens = ["vp5-user-session=".concat(writeUserSessionResult_.sessionId), "expires=".concat(expires), "SameSite=Lax"];

                    if (config.deploymentMode !== "development") {
                      setCookieTokens.push("secure");
                      setCookieTokens.push("HttpOnly");
                    }

                    var setCookieValue = setCookieTokens.join("; ");
                    request_.response_filters.result.request({
                      streams: request_.streams,
                      integrations: request_.integrations,
                      request_descriptor: request_.request_descriptor,
                      response_descriptor: {
                        http: {
                          code: 303,
                          message: "Retrieved User Profile - Redirecting Home"
                        },
                        content: {
                          encoding: "utf8",
                          type: "text/plain"
                        },
                        // **** SET THE NEW USER SESSION COOKIE ****
                        headers: {
                          // TODO: This should get set dynamically based on a request header, cookie, or something set
                          // by the application when it initiated the login process. But, for now just reload the homepage.
                          "Location": "/",
                          "Set-Cookie": setCookieValue
                        },
                        data: "Okay - you are logged in. Redirecting home..."
                      }
                    });
                    return;
                  })["catch"](function (writeUserSessionPromiseError_) {
                    // THIS NEEDS TO GET CLEANED UP.
                    return http500Error({
                      message: "Seems to have FAILED creating a session?",
                      source: "Za949-mNSXOV7xXMdeRpOw"
                    });
                    return;
                  });
                  return;
                } // deleteExpiredUserSessions callback
                )["catch"](function (deleteExpiredUserSessionsError_) {
                  var errorMessage = ["User login failed due to an unexpected error removing past-expired user session data.", deleteExpiredUserSessionsError_.toString()].join(" ");
                  request_.response_filters.error.request({
                    streams: request_.streams,
                    integrations: request_.integrations,
                    request_descriptor: request_.request_descriptor,
                    error_descriptor: {
                      http: {
                        code: 503,
                        message: "User Login Failed"
                      },
                      content: {
                        encoding: "utf8",
                        type: "text/html"
                      },
                      data: {
                        error_message: errorMessage,
                        error_context: {
                          source_tag: "cyCfCcUoQ86dEd6W0Tj8OQ"
                        }
                      }
                    }
                  }); // response_filter
                } // callback
                ); // catch
              } // read user profile result callback function
              )["catch"](function (readUserProfileError_) {
                var errorMessage = ["User login failed due to an unexpected error reading the user profile data.", readUserProfileError_].join(" ");
                request_.response_filters.error.request({
                  streams: request_.streams,
                  integrations: request_.integrations,
                  request_descriptor: request_.request_descriptor,
                  error_descriptor: {
                    http: {
                      code: 503,
                      message: "User Login Failed"
                    },
                    content: {
                      encoding: "utf8",
                      type: "text/html"
                    },
                    data: {
                      error_message: errorMessage,
                      error_context: {
                        source_tag: "ha-cb5QoQri_-ze1Kp83fA"
                      }
                    }
                  }
                }); // response_filter
              } // read user profile error callback function
              ); // end accessUserProfilePromise.then.catch

              return;
            } // function(getPeopleResponse_)
            )["catch"](function (getPeopleError_) {
              console.log("Attempt to retrieve basic user profile data from Google People API failed!");
              console.log(getPeopleError_);
              request_.response_filters.error.request({
                streams: request_.streams,
                integrations: request_.integrations,
                request_descriptor: request_.request_descriptor,
                error_descriptor: {
                  http: {
                    code: 503,
                    message: "Failed User Identity Check"
                  },
                  content: {
                    encoding: "utf8",
                    type: "text/html"
                  },
                  data: {
                    error_message: getPeopleError_.toString(),
                    error_context: {
                      source_tag: "t52vZgq1Rye5nr3OzQWCkg"
                    }
                  }
                }
              }); // response_filter
            }); // catch
          } // function(getTokensResponse_)
          )["catch"](function (getTokenError_) {
            console.log("Attempt to retrieve OAuth2 token from Google using authentication code failed!");
            console.log(getTokenError_);
            request_.response_filters.error.request({
              streams: request_.streams,
              integrations: request_.integrations,
              request_descriptor: request_.request_descriptor,
              error_descriptor: {
                http: {
                  code: 401,
                  message: "Not Authenticated"
                },
                content: {
                  encoding: "utf8",
                  type: "text/html"
                },
                data: {
                  error_message: getTokenError_.toString(),
                  error_context: {
                    source_tag: "L6c3xj0wQCCvxIJw0X8Ncg"
                  }
                }
              }
            }); // response_filter
          } // function
          ); // catch

          return "break";
        } // else

      };

      while (!inBreakScope) {
        var _ret = _loop();

        if (_ret === "break") break;
      } // inbreakScope


      if (errors.length) {
        var message = errors.join(" "); // Whoops...

        var errorAttempt = request_.response_filters.error.request({
          streams: request_.streams,
          integrations: request_.integrations,
          request_descriptor: request_.request_descriptor,
          error_descriptor: {
            http: {
              code: 500,
              message: "Developer Mishap"
            },
            content: {
              encoding: "utf8",
              type: "text/html"
            },
            data: {
              error_message: message,
              error_context: {
                source_tag: "l5JodSxsRIiy_LLDy2aZBA"
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