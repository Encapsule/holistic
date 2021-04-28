"use strict";

// SOURCES/SERVER/holism/services/get-html-view-admin-control-panel.js
//
var holism = require("@encapsule/holism");

var userProfileAccessors = require("../../storage/user/profile");

var userProfileVariantReadSpec = require("../../storage/user/profile/filters/user-profile-variant-read-spec");

var userSessionAccessors = require("../../storage/user/session");

var userSessionVariantReadSpec = require("../../storage/user/session/filters/user-session-variant-read-spec");

function zeroPaddedMonthDayString(monthDayNumber_) {
  return monthDayNumber_ > 9 ? "".concat(monthDayNumber_) : "0".concat(monthDayNumber_);
}

function getAlphaSortableTimeString(epochTimestamp_) {
  var date = new Date(epochTimestamp_ * 1000);
  return "".concat(date.getFullYear(), "/").concat(zeroPaddedMonthDayString(date.getMonth() + 1), "/").concat(zeroPaddedMonthDayString(date.getDate()), " ").concat(date.toTimeString());
} ////////////////////////////////////////////////////////////////
// Analyze the user profile descriptor format by inspecting its filter spec.


var userProfileColumns = [];

for (var key_ in userProfileVariantReadSpec) {
  if (key_.startsWith("____")) {
    continue;
  }

  userProfileColumns.push({
    header: key_
  });
}

var columnWidthPercentage = 100.0 / userProfileColumns.length;
userProfileColumns.forEach(function (columnDescriptor_) {
  columnDescriptor_.width = columnWidthPercentage;
});
var userSessionColumns = [];

for (var _key_ in userSessionVariantReadSpec) {
  if (_key_.startsWith("____")) {
    continue;
  }

  userSessionColumns.push({
    header: _key_
  });
}

columnWidthPercentage = 100.0 / userSessionColumns.length;
userSessionColumns.forEach(function (columnDescriptor_) {
  columnDescriptor_.width = columnWidthPercentage;
}); ////////////////////////////////////////////////////////////////

var factoryResponse = holism.service.create({
  id: "2NwHGW_JQv-Er71k2r4TVw",
  name: "Administrator Control Panel",
  description: "Provides access to application administrative functions for authenticated users on an authorized whitelist.",
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
        var filterResponse = void 0; // To access the admin control panel you must be logged in a Viewpath employee.

        if (!request_.request_descriptor.session.userEmailAddress.endsWith("@viewpath.com")) {
          // NOT AUTHORIZED TO ACCESS THE APP ADMIN CP!
          request_.response_filters.error.request({
            streams: request_.streams,
            integrations: request_.integrations,
            request_descriptor: request_.request_descriptor,
            error_descriptor: {
              http: {
                code: 403,
                message: "Not Authorized"
              },
              content: {
                encoding: "utf8",
                type: "text/html"
              },
              data: {
                error_message: "Sorry. Only employees of Viewpath are authorized to access this control panel.",
                error_context: {
                  source_tag: "tWZ3gNe1SIiOZulaWvXIhQ"
                }
              }
            }
          });
          break;
        } // Not all Viewpath employees have access to the admin control.


        filterResponse = request_.integrations.appStateContext.appGroupAuthorizer.getUserPermissions({
          viewpathUserId: request_.request_descriptor.session.viewpathUserId,
          subsystemName: "adminControlPanel",
          resourceName: "allResources",
          operationName: "all-operations"
        });

        if (filterResponse.error) {
          errors.push(filterResponse.error);
          break;
        }

        if (!filterResponse.result.authz.operation) {
          // NOT AUTHORIZED TO ACCESS THE APP ADMIN CP!
          request_.response_filters.error.request({
            streams: request_.streams,
            integrations: request_.integrations,
            request_descriptor: request_.request_descriptor,
            error_descriptor: {
              http: {
                code: 403,
                message: "Not Authorized"
              },
              content: {
                encoding: "utf8",
                type: "text/html"
              },
              data: {
                error_message: "Sorry. Only Viewpath employees that have been explicitly added to the Viewpath5 administrators group are authorized to access this control panel.",
                error_context: {
                  source_tag: "rzYqpM08S1i7yYPP6XiMIQ"
                }
              }
            }
          });
          break;
        } // end if
        // Build the authorized response.
        // Get a Promise to read all current user profile descriptors from the backend's storage subsystem.


        filterResponse = userProfileAccessors.getAll.request();

        if (filterResponse.error) {
          errors.push(filterResponse.error);
          break;
        }

        var getAllUserProfilesPromise = filterResponse.result; // Get a Promise to read all the current user session descriptors from the backend's storage subsytem.

        filterResponse = userSessionAccessors.getAll.request();

        if (filterResponse.error) {
          errors.push(filterResponse.error);
          break;
        }

        var getAllUserSessionsPromise = filterResponse.result; // Execute the two queries in parallel blocking on completion of both.

        Promise.all([getAllUserProfilesPromise, getAllUserSessionsPromise]).then(function (values_) {
          var userProfilesResult = values_[0];
          var userSessionsResult = values_[1];
          var profileData = [];
          var sessionData = [];
          userProfilesResult.forEach(function (userProfile_) {
            var rowContent = [];
            userProfileColumns.forEach(function (column_) {
              var dataValue = userProfile_[column_.header];

              switch (column_.header) {
                case "createTime":
                  rowContent.push(getAlphaSortableTimeString(dataValue));
                  break;

                default:
                  rowContent.push(dataValue instanceof Object ? JSON.stringify(dataValue) : dataValue);
                  break;
              }
            });
            profileData.push({
              rowId: userProfile_.viewpathUserId,
              rowContent: rowContent
            });
          }); // <ComponentRouter/> render data request descriptor.

          var userProfilesTable = {
            Table: {
              tableId: "User Accounts Table",
              columns: userProfileColumns,
              data: profileData
            }
          };
          userSessionsResult.forEach(function (userSession_) {
            var rowContent = [];
            userSessionColumns.forEach(function (column_) {
              var dataValue = userSession_[column_.header];

              switch (column_.header) {
                case "createTime":
                case "expireTime":
                  rowContent.push(getAlphaSortableTimeString(dataValue));
                  break;

                default:
                  rowContent.push(dataValue instanceof Object ? JSON.stringify(dataValue) : dataValue);
                  break;
              }
            });
            sessionData.push({
              rowId: userSession_.sessionId,
              rowContent: rowContent
            });
          });
          var userSessionsTable = {
            Table: {
              tableId: "User Sessions Table",
              columns: userSessionColumns,
              data: sessionData
            }
          };
          var tabbedContentRenderRequest = {
            TabbedContent: {
              labels: ["Sessions", "Users", "Specs"],
              views: [userSessionsTable, userProfilesTable, {
                HolisticMarkdownContent_AonatdsFRQmv6SgeqvJIQw: {
                  markdownContent: ["# Admin Control Panel JSON\n", "\n", "## User Profiles\n", "\n", "### User Profile Variant Read Filter Spec JSON\n", "This is a JSON serialization of an [arccore.filter spec](https://encapsule.io/docs/ARCcore/filter/specs) that defines ", " the `user profile` descriptor object format. One `user profile` object is maintained by the application server's storage layer for every registered user of the application.\n", "\n", "```Javascript\n", JSON.stringify(userProfileVariantReadSpec, undefined, 4), "\n\n", "```\n", "### Current User Profiles JSON\n", "This is a JSON serialization of the `user profile` descriptor objects currently maintained by the application server's storage layer (for all users).\n", "\n", "```JavaScript\n", JSON.stringify(userProfilesResult, undefined, 4), "\n\n", "```\n", "## User Sessions\n", "\n", "### User Session Variant Read Filter Spec JSON\n", "This is a JSON serialization of an [arccore.filter spec](https://encapsule.io/docs/ARCcore/filter/specs) that defines", " the `user session` descriptor object format. One `user session` object is created every time a registered user of the application logs into the application.", " And, user session object(s) previously created for a specific user that have expired are also deleted at this time.\n", "\n", "```JavaScript\n", JSON.stringify(userSessionVariantReadSpec, undefined, 4), "\n\n", "```\n", "### Current User Sessions JSON\n", "This is a JSON serialization of the `user session` descriptor objects currently maintained by the application server's storage layer (for all users).\n", "```JavaScript\n", JSON.stringify(userSessionsResult, undefined, 4), "\n\n", "```\n"]
                },
                styles: {
                  marginTop: "1em"
                }
              } // markdown content
              ]
            }
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
                    DIV: {
                      styles: {
                        container: {
                          margin: "0px",
                          padding: "1em"
                        }
                      },
                      contentEP: [tabbedContentRenderRequest]
                    }
                  }]
                }
              }
            }
          });
        })["catch"](function (userProfilesError_) {
          var message = ["Unable to read user profiles from the storage layer!", userProfilesError_].join(" ");
          request_.response_filters.error.request({
            streams: request_.streams,
            integrations: request_.integrations,
            request_descriptor: request_.request_descriptor,
            error_descriptor: {
              http: {
                code: 500
              },
              content: {
                encoding: "utf8",
                type: "text/html"
              },
              data: {
                error_message: message,
                error_context: {
                  source_tag: "9fGP6K60TeWy96CArXw6mw"
                }
              }
            }
          });
        });
      } // inBreakScope


      if (errors.length) {
        var message = errors.join(" ");
        request_.response_filters.error.request({
          streams: request_.streams,
          integrations: request_.integrations,
          request_descriptor: request_.request_descriptor,
          error_descriptor: {
            http: {
              code: 500
            },
            content: {
              encoding: "utf8",
              type: "text/html"
            },
            data: {
              error_message: message,
              error_context: {
                source_tag: "ZV91rEWDR66JPBdiWKz1Jg"
              }
            }
          }
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