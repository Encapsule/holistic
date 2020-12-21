"use strict";

// metadata-page-get.js
var arccore = require('@encapsule/arccore');

module.exports = function (request_) {
  console.log("..... " + this.operationID + "::" + this.operationName);
  var response = {
    error: null,
    result: null
  };
  var errors = [];
  var inBreakScope = false;

  while (!inBreakScope) {
    inBreakScope = true; // Dereference the application metadata store subsystem in the application context namespace.

    var appMetadataStore = request_.appStateContext.appMetadataStore;

    if (!appMetadataStore) {
      errors.unshift("Unable to dereference the application metadata store!");
      break;
    } // Dereference the site metadata (we need this to get the app name).


    if (!appMetadataStore.isVertex("__app")) {
      errors.push("Cannot find the expected website metadata record in the metadata store.");
      break;
    }

    var siteMetadata = appMetadataStore.getVertexProperty("__app"); // We have received some arbitrary resource request by URI which may or may
    // not have a corresponding vertex in the application data store.
    // We must always return page metadata; if the URI doesn't exist we tokenize
    // and attempt to locate a parent page.

    var viewPageURI = request_.resource_uri;
    var viewPageURITokens = viewPageURI.split('/');

    while (!appMetadataStore.isVertex(viewPageURI)) {
      viewPageURITokens.pop();
      viewPageURI = viewPageURITokens.join('/');

      if (viewPageURI.length === 0) {
        viewPageURI = '/';
        break;
      }

      console.log("Searching next to " + viewPageURI);
    }

    console.log("Selecting view page URI '" + viewPageURI + "'.");
    var pageProperty = appMetadataStore.getVertexProperty(viewPageURI); // Never hand-off a live copy of view store data.

    var result = arccore.util.clone(pageProperty); // Set the `uri` value to the _original_ request URI.
    // The `uri` value is used by HolisticPage to determine the state of menu items displayed.
    // Here we set the page metadata's `uri` to the actual request URI even though that URI
    // may not actually have a vertex in the view store. We do this so that the menu item
    // that corresponds to the page we did select is rendered as active so that the user
    // can click-through.

    result.uri = request_.resource_uri; // If we're dealing with an HTTP error, overwrite the page title, label, and description with error information.

    if (request_.http_code !== 200) {
      result.title = siteMetadata.name + " Application Error " + request_.http_code;
      result.name = result.title;
      result.description = siteMetadata.name + " application could not access the requested resource(s) due to HTTP error " + request_.http_code + ".";
    }

    response.result = result;
    break;
  }

  if (errors.length) {
    response.error = errors.join(" ");
  }

  return response;
};