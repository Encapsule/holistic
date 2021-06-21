"use strict";

module.exports = function (request_) {
  // console.log("..... " + this.operationID + "::" + this.operationName);
  // const headers = request_.request_descriptor.headers;
  // NO UNILATERAL REDIRECT BY DEFAULT
  return {
    error: null
  }; // no redirection

  /*
  // We assume that every holistic-nodejs-service will be deployed in the cloud behind a load balancer
  // and/or proxy that terminates HTTPS from the public Internet and forwards requests via HTTP.
  // Some cloud environments make it difficult to automatically upgrade incoming HTTP to HTTPS.
  // The example below shows how to affect a redirect if the incoming HTTP request has been proxied
  // AND the protocol is not already HTTPS.
   if (!headers["x-forwarded-proto"] || (headers["x-forwarded-proto"] === "https")) {
      return { error: null }; // no redirection
  }
   const locationURL = `https://${headers.host}${request_.request_descriptor.url_parse.href}`;
   console.log(`..... redirecting to '${locationURL}'...`);
   return ({
      error: null,
      result: {
          locationURL: locationURL,
          httpCode: 308 // Moved permanently
      }
  });
   */
};