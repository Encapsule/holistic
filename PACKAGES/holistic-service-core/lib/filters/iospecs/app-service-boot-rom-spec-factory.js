"use strict";

// app-service-bootROM-spec-factory.js
var arccore = require("@encapsule/arccore");

(function () {
  var factoryResponse = arccore.filter.create({
    operationID: "aCorbGkCQOiRMJKQ6aax9g",
    operationName: "HolisticServiceCore bootROM Spec Synthesizer",
    operationDescription: "Synthesizes a specialized bootROM filter spec for HolisticServiceCore for use by derived HolisticNodeService and HolisticHTML5Service instances to communicate boot-time data and directives from HolisticNodeService to HolisticHTML5Service's kernel upon receipt of an HTTP request for an interactive app view.",
    inputFilterSpec: {
      ____label: "HolisticServiceCore bootROM Spec Sync Request",
      ____description: "Inputs required to synthesize the shared runtime type contract for the contents of the HolisticHTML5Service serialized bootROM (part of the information contained in a serialized HolisticHTML5Service aka HTML5 document created by HolisticNodeService).",
      ____types: "jsObject",
      httpResponseDispositionSpec: {
        ____label: "HTTP Response Disposition Spec",
        ____description: "A copy of HolisticNodeService HTTP response disposition descriptor spec. These values are set by HolisticNodeService when it serializes an HTML5 document.",
        ____accept: "jsObject"
      },
      pageMetadataSpec: {
        ____label: "HTTP Error Page Metadata Spec",
        ____description: "If httpResponseDisposition.code !== 200 then HolisticNodeService will override standard fields in page X metadata w/error information and use these values to populate standard values in HTML5, bootROM, etc. If HTTP response code 200, then these values are simply copies of X's build-time static page metadata field values.",
        ____accept: "jsObject"
      },
      serverAgentSpec: {
        ____label: "Server Agent Info Spec",
        ____description: "A copy of the HolisticNodeService instance's agent descriptor values spec that provides detailed software versioning information. And, a copy of the client-safe holistic service deployment environment feature flag (informational in the context of a HolisticHTML5Service instance (but useful)).",
        ____accept: "jsObject"
      },
      userLoginSessionDataSpec: {
        ____label: "User Login Session Data Spec",
        ____description: "A copy of the client-safe public (i.e. no sensitve data, no access keys, scrubbed and filtered) user login session data that is serialized into a new HolisticHTML5Service instance.",
        ____accept: "jsObject"
      }
    },
    outputFilterSpec: {
      ____accept: "jsObject" // This is an @encapsule/arccore.filter spec object tree

    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true; // Splice together what we think should be the final filter spec for the shared bootROM data.

        var serviceBootROMSpec = {
          ____label: "HolisticServiceCore Boot ROM Spec",
          ____description: "Values written by HolisticNodeService instance into the body of a HTML5 document as base64-encoded JSON data called the \"bootROM\" are used by HolisticHTML5Service kernel process to re-activate the service when it is booted during DOM load / parse of the HTML5 document.",
          ____types: "jsObject",
          initialDisplayData: {
            ____types: "jsObject",
            httpResponseDisposition: request_.httpResponseDispositionSpec,
            pageMetadata: request_.pageMetadataSpec,
            renderData: {
              ____label: "@encapsule/d2r2/React renderData Request",
              ____description: "The initial display process request passed to @encapsule/d2r2 in HolisticNodeService to synthesize the HTML5 document's initial user-visible content (what they see prior to HolisticHTML5Service boot).",
              ____accept: "jsObject" // This is a @encapsule/d2r2 renderData request synthesized by HolisticNodeService when it synthesized the HTML5 document. It is used to re-activate the display and enable React.Components to mount.

            }
          },
          serverAgent: request_.serverAgentSpec,
          userLoginSessionData: request_.userLoginSessionDataSpec
        }; // Confirm that the synthesized bootROM data filter spec is valid per filter's picky rules.

        var testResponse = arccore.filter.create({
          operationID: "DOx6BIUuRwaxT5yjpmIYfw",
          inputFilterSpec: serviceBootROMSpec
        });

        if (testResponse.error) {
          errors.push("Unable to synthesize required holistic service bootROM data filter specification due to error:");
          errors.push(testResponse.error);
          break;
        } // Return the validated bootROM spec to the caller.


        response.result = testResponse.result.filterDescriptor.inputFilterSpec;
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result; // This is an @encapsule/arccore.filter that synthesizes the bootROM spec for HolisticServiceCore given app-specific type and behavioral specialization parameters via request input.
})();