"use strict";

// user-identity-assertion-descriptor-spec.js

/*
  This module exports a filter spec object that is used to normalize/verify
  a descriptor object value that represents some external agents unverified
  assertion of prior authentication by a holistic Node.js service process.
*/
(function () {
  module.exports = {
    ____label: "User Identity Assertion Descriptor",
    ____description: "Object containing information asserting the identity of a user.",
    ____types: "jsObject",
    ____defaultValue: {},
    userSessionId: {
      ____label: "User Session ID",
      ____description: "The user session identifier the user asserts was given to them on their last successful login.",
      ____accept: ["jsNull", "jsString"],
      ____defaultValue: null // No assertion of user identity

    }
  };
})();