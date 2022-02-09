"use strict";

(function () {
  // const userSessionAccessor = require("../../storage/user/session/");
  var isReachable = require("is-reachable"); // https://github.com/sindresorhus/is-reachable


  var serviceOnline = null;
  var lastLogTime = new Date().getTime();

  function checkOnline() {
    var startCheckTime = new Date().getTime();
    isReachable("https://google.com", {
      timeout: 10000
    }).then(function (result_) {
      var endCheckTime = new Date().getTime();
      var checkDelayTime = endCheckTime - startCheckTime; // console.log(`... ellapsed check start to check end delay is ${checkDelayTime} (${endCheckTime - lastLogTime}ms)`);

      lastLogTime = endCheckTime;
      var delayToNextCheck = Math.max(0, startCheckTime + 10000 - endCheckTime);
      var toggleOnlineState = serviceOnline !== result_;
      serviceOnline = result_;

      if (toggleOnlineState) {
        console.log("****************************************************************");
        console.log("Viewpath5 HolisticNodeService backend storage subsystem status:");
        console.log("".concat(serviceOnline ? "ONLINE" : "OFFLINE", " at ").concat(new Date().toString()));
        console.log("****************************************************************");
      }

      setTimeout(checkOnline, delayToNextCheck);
    });
  }

  checkOnline();

  module.exports = function (request_) {
    console.log("..... " + this.filterDescriptor.operationID + "::" + this.filterDescriptor.operationName);
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;

      if (!request_.user_identity || !request_.user_identity.userSessionId) {
        // Delegate back to the result callback function provided by the caller.
        console.log("> No user identity assertion. Returning default anonymous user login session data.");
        request_.result_handler(); // w/request value undefined -> anonymous session

        break;
      }

      if (!serviceOnline) {
        // Here we presume that access to whatever persistence store (e.g. database)
        // is used for authentication and authorization policy is cloud based and that
        // if our HolisticNodeService instance cannot reach DNS server that it will also
        // not be able to make authentication or authorization decisssions. And, should
        // always return the anonymous user identity because of this.
        console.log("!!!!! HolisticNodeService user authentication service is currently offline. Login is blocked for all users.");
        request_.result_handler(); // w/request value undefined -> anonymous session

        break;
      } // TEMPORARY HACK


      request_.result_handler(); // w/request value undefined -> anonymous session

      /*
      // Construct a new Promise <pending> to read the user session entity from the storage subsystem.
      let filterResponse = userSessionAccessor.read.request({
          sessionId: request_.user_identity.userSessionId
      });
      if (filterResponse.error) {
          // This is something we want developers to take a look at.
          request_.error_handler(filterResponse.error);
          break;
      }
      let readPromise = filterResponse.result;
      readPromise.then(
          (readUserSessionResult_) => {
              if (readUserSessionResult_) {
                  const requestTime = Math.round(new Date().getTime() / 1000);
                  if (requestTime < readUserSessionResult_.expireTime) {
                      request_.result_handler(readUserSessionResult_);
                  } else {
                      request_.result_handler(); // anonymous session
                  }
              } else {
                  request_.result_handler(); // anonymous session
              }
          }
      ).catch(
          (readUserSessionError_) => {
              request_.error_handler(readUserSessionError_.toString());
          }
      )
      break;
      */
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
})();