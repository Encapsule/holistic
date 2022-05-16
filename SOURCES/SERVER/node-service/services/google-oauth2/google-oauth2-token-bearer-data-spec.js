"use strict";

// Filters that use this filter specification:
// extract-token-data-from-google-oauth2-api-response-filter.js (output filter specification)
module.exports = {
  ____label: "Google OAuth2 Token Descriptor",
  ____description: "Google OAuth2 token data obtained from successful login/signup w/Google request.",
  ____types: "jsObject",
  expiry_date: {
    ____accept: "jsNumber"
  },
  id_token: {
    ____accept: "jsString"
  },
  token_type: {
    ____accept: "jsString",
    ____inValueSet: ["Bearer"]
  },
  scope: {
    ____accept: "jsString"
  },
  refresh_token: {
    ____accept: "jsString"
  },
  access_token: {
    ____accept: "jsString"
  }
};