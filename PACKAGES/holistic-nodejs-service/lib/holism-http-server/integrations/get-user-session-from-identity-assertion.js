"use strict";

// @viewpath/viewpath5/SOURCES/SERVER/holism/integrations/get-user-session-from-identity-assertion.js
var userSessionAccessor = require("../../storage/user/session/");

module.exports = function (request_) {
  console.log("..... " + this.operationID + "::" + this.operationName);
  var errors = [];
  var inBreakScope = false;

  while (!inBreakScope) {
    inBreakScope = true;

    if (!request_.user_identity || !request_.user_identity.userSessionId) {
      // Delegate back to the result callback function provided by the caller.
      request_.result_handler(); // w/request value undefined -> anonymous session

      break;
    } // Construct a new Promise <pending> to read the user session entity from the storage subsystem.


    var filterResponse = userSessionAccessor.read.request({
      sessionId: request_.user_identity.userSessionId
    });

    if (filterResponse.error) {
      // This is something we want developers to take a look at.
      request_.error_handler(filterResponse.error);
      break;
    }

    var readPromise = filterResponse.result;
    readPromise.then(function (readUserSessionResult_) {
      if (readUserSessionResult_) {
        var requestTime = Math.round(new Date().getTime() / 1000);

        if (requestTime < readUserSessionResult_.expireTime) {
          request_.result_handler(readUserSessionResult_);
        } else {
          request_.result_handler(); // anonymous session
        }
      } else {
        request_.result_handler(); // anonymous session
      }
    })["catch"](function (readUserSessionError_) {
      request_.error_handler(readUserSessionError_.toString());
    });
    break;
  }

  if (errors.length) {
    response.error = errors.join(" ");
  } // The caller should ignore the synchronous call response returned by this filter
  // as its response is always passed forward to the asynchronous response filter
  // provided by the caller.


  return {
    error: null,
    result: undefined
  };
};