"use strict";

// @viewpath/viewpath5/SOURCES/SERVER/holism/services/google-oauth2/google-oauth2-token-response-spec.js
// Filters that use this filter specification:
// extract-token-data-from-google-oauth2-api-response-filter.js (input filter specification)
module.exports = {
  ____label: "Google OAuth2 API Response",
  ____description: "A partial specification of response data received from Google OAuth2 endpoint upon successful login/signup with Google.",
  ____types: "jsObject",
  res: {
    ____types: "jsObject",
    status: {
      ____accept: "jsNumber",
      ____inValueSet: [200]
    }
  },
  tokens: {
    ____accept: "jsObject"
  }
};