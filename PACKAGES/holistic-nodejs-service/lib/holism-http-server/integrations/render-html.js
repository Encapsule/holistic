"use strict";

// render-html.js
var React = require("react");

var ReactDOMServer = require("react-dom/server"); // v0.0.49-spectrolite
// There are mission-critical details of how the holistic Node.js service kernel abstraction
// dynamically synthesizes the holistic tab service process within the context of an
// HTTP request and then serializes it out to an HTML5 document that boots the tab service kernel
// when it is loaded in the browser that require that we affect the actual final HTML5 document
// rendering in holistic platform code.
// TODO: Make this sufficiently extensible so that developers do not complain. Without breaking
// any invariant assumptions we might want to be able to make inside tab service about what's in
// the document and where/how to find it.
// TODO: Being lazy and not bothering to pick up the targetDOMElementID from HolisticServiceCore instance yet.
// Just assuming the developer takes the default and plugging in the value here seems okay for short-term.


function renderHtmlDocument(request_) {
  var response = {
    error: null,
    result: null
  };
  var errors = [];
  var inBreakScope = false;

  while (!inBreakScope) {
    inBreakScope = true;
    console.log("..... " + this.operationID + "::" + this.operationName);
    var htmlContent = "";

    try {
      // Render the HTML5 document content via d2r2/React server-side rendering.
      var boundReactComponent = React.createElement(request_.appStateContext.ComponentRouter, {
        // <ComponentRouter/> (a React Component) becomes <X/> React Component
        // when bound to an object containing a renderData sub-object with a
        // a naming and value type-derived signature matching the filter spec
        // declared by one of N registered d2r2 Components.
        renderData: request_.appServiceRequest.renderData,
        renderContext: {
          serverRender: true,
          // We inject this into renderContext on the server. And, perform initial client rehydration w/the flag set accordingly. And, then remove it and perform a full render during client boot. This allows an app's loading page view to switch states before the app is initialized.
          ComponentRouter: request_.appStateContext.ComponentRouter,
          act: function act(displayActRequest_) {
            throw new Error("We do not expect this.props.renderContext.act function to be called by any d2r2-managed React component that is rendered by the app server process.");
          },
          apmBindingPath: "~" // FOR NOW... v0.0.49-spectrolite is fine - tab service kernel takes over during boot.

        }
      }); // See: https://reactjs.org/docs/react-dom-server.html

      htmlContent = ReactDOMServer.renderToString(boundReactComponent);
    } catch (exception_) {
      errors.unshift("'" + exception_.toString() + "'.");
      errors.unshift("Stack: " + exception_.stack);
      errors.unshift("While attempting to render app-specific body content via developer-defined React component(s).");
      break;
    }

    try {
      // Prepare a "Boot ROM" that contains data that will be read by the client
      // HTML5 JavaScript application, client-app-bundle.js, when the HTML document
      // we're rendering here is loaded in the user's browser. This data is inline
      // serialized in the HTML document body so as to be immediately available
      // to client JavaScript. The client JavaScript then deserializes it and uses
      // it to establish its own copy of the data in memory.
      var clientAppBootJSON = JSON.stringify({
        initialDisplayData: {
          renderData: request_.appServiceRequest.renderData,
          httpResponseDisposition: request_.appServiceContext.httpContext.httpResponse.disposition,
          pageMetadata: request_.appServiceContext.metadataContext.common.page
        },
        userLoginSessionData: request_.appServiceRequest.userLoginSessionData,
        serverAgent: request_.appServiceContext.metadataContext.server.agent
      });
      var bootROM = Buffer.from(clientAppBootJSON, "utf8").toString("base64");
      var appAgentMetadata = request_.appServiceContext.metadataContext.server.agent.build.app;
      var appRuntimeMetadata = request_.appServiceContext.metadataContext.common; // ================================================================
      // The favicons below were generated with: http://www.favicon-generator.org/
      // ================================================================
      // Synthesize the actual HTML5 document to be returned to the client via HTTP.

      var htmlDocumentLines = [];
      htmlDocumentLines.push("<!DOCTYPE html>\n  <html lang=\"en\">\n  <!-- @".concat(appAgentMetadata.author, "/").concat(appAgentMetadata.name, " v").concat(appAgentMetadata.version, "-").concat(appAgentMetadata.codename, " buildID \"").concat(appAgentMetadata.buildID, "\" [").concat(request_.appServiceContext.metadataContext.server.environment, "] Copyright (C) ").concat(appAgentMetadata.copyright.year, " ").concat(appAgentMetadata.copyright.holder, " -->\n"));

      if (request_.appServiceRequest.renderOptions.documentPrologueComments) {
        htmlDocumentLines.push(request_.appServiceRequest.renderOptions.documentPrologueComments);
      }

      htmlDocumentLines.push("  <head>\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n    <meta charset=\"utf-8\" />\n    <title>".concat(appRuntimeMetadata.page.title, "</title>\n    <meta name=\"description\" content=\"").concat(appRuntimeMetadata.page.description, "\" />\n    <link rel='stylesheet' href=\"/css/holistic-html5-service-fonts.css\">\n    <link rel='stylesheet' href=\"/css/spinners.css\">\n"));

      if (request_.appServiceRequest.renderOptions.documentHeadSectionLinksMeta) {
        htmlDocumentLines.push(request_.appServiceRequest.renderOptions.documentHeadSectionLinksMeta);
      }

      htmlDocumentLines.push("  </head>\n  <body>\n    <div id=\"idServiceDisplay\">".concat(htmlContent, "</div>\n    <script type=\"text/javascript\" src=\"/javascript/html5-service-runtime-bundle-").concat(appAgentMetadata.buildID, ".js\"></script>\n    <script id=\"idClientBootROM\" type=\"text/plain\">").concat(bootROM, "</script>\n"));

      if (request_.appServiceRequest.renderOptions.documentEpilogueComments) {
        htmlDocumentLines.push(request_.appServiceRequest.renderOptions.documentEpilogueComments);
      }

      htmlDocumentLines.push("</body>\n"); // Send the string back to @encapsule/holism.

      response.result = htmlDocumentLines.join("");
    } catch (exception_) {
      errors.push("Unexpected exception while attempting to synthesize HTML5 document: ".concat(exception_.stack));
    }

    break;
  }

  if (errors.length) {
    response.error = errors.join(" ");
  }

  return response;
} // Export the custom bodyFunction of the HTML render integration filter required by http-server-filter-factory.


module.exports = renderHtmlDocument;