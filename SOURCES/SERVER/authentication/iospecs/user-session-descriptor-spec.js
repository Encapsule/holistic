"use strict";

// user-session-descriptor-spec.js

/*
  This module exports a filter spec object that is used to normalize/verify
  a descriptor object value obtained by @encapsule/holism HTTP 1.1 process
  given a "User Identity Assertion Descriptor" value  (exports from the module
  user-identity-assertion-descriptor-spec.js).
*/
(function () {
  module.exports = {
    ____label: "User Session Descriptor",
    ____description: "Object containing the current requesting user's login session data.",
    ____types: "jsObject",
    ____defaultValue: {},
    whatever: {
      ____types: "jsString",
      ____defaultValue: "whatever"
    }
  };
})();