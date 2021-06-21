"use strict";

(function () {
  var path = require("path"); // used only for logging here - leave path manipulation to the HolisticNodeService implementation to deal w/
  // As of holistic v0.0.49-spectrolite this is now a callback function dispatched inside a filter.


  module.exports = function (_ref) {
    var appBuild = _ref.appBuild,
        deploymentEnvironment = _ref.deploymentEnvironment;
    console.log("> \"".concat(path.resolve(__filename), "\" Preparing deploymentEnvironment=").concat(deploymentEnvironment, " @encapsule/holism-format memory-cached cached file resource route map for ").concat(appBuild.app.name, " to return back to @encapsule/holism config orchestrator."));
    var cacheControlOverride = "immutable, public, max-age=".concat(45
    /*days*/
    * 24
    /*hours/day*/
    * 60
    /*mins/hour*/
    * 60
    /*secs/min*/
    ); // infinite-cache

    var clientAppCSSURI = "/css/viewpath5-".concat(appBuild.app.buildID, ".css");
    var memoryFileRegistrationMap = {
      /*
      "ASSETS/css/viewpath5.css": {
          request_bindings: { method: "GET", uris: [ clientAppCSSURI ] },
          response_properties: {
              contentEncoding: "utf8",
              contentType: "text/css",
          }
      },
       // browserconfig.xml
      "ASSETS/images/browserconfig.xml": {
          request_bindings: { method: "GET", uris: [ "/browserconfig.xml" ] },
          response_properties: { contentEncoding: "utf8", contentType: "application/xml" }
      },
       // manifest.json
      "ASSETS/images/manifest.json": {
          request_bindings: { method: "GET", uris: [ "manifest.json", "/manifest.json" ] },
          response_properties: { contentEncoding: "utf8", contentType: "application/json" }
      },
        "ASSETS/images/g-logo.png": {
          request_bindings: { method: "GET", uris: [ "/images/g-logo.png"] },
          response_properties: { contentEncoding: "binary", contentType: "image/png" }
      },
       "ASSETS/images/favicon-16x16.png": {
          request_bindings: { method: "GET", uris: [ "/favicon-16x16.png"] },
          response_properties: { contentEncoding: "binary", contentType: "image/png" }
      },
       "ASSETS/images/favicon-32x32.png": {
          request_bindings: { method: "GET", uris: ["/favicon-32x32.png"] },
          response_properties: { contentEncoding: "binary", contentType: "image/png"  }
      },
       "ASSETS/images/favicon-48x48.png": {
          request_bindings: { method: "GET", uris: ["/favicon-48x48.png"] },
          response_properties: { contentEncoding: "binary", contentType: "image/png"  }
      },
       "ASSETS/images/favicon-96x96.png": {
          request_bindings: { method: "GET", uris: ["/favicon-96x96.png"] },
          response_properties: { contentEncoding: "binary", contentType: "image/png"  }
      },
       "ASSETS/images/favicon.ico": {
          request_bindings: { method: "GET", uris: ["/favicon.ico"] },
          response_properties: { contentEncoding: "binary", contentType: "image/x-icon"  }
      },
       "ASSETS/images/favicon.svg": {
          request_bindings: { method: "GET", uris: ["/images/favicon.svg"] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/images/encapsule-arccore.svg": {
          request_bindings: { method: "GET", uris: ["/images/encapsule-arccore.svg"] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml"  }
      },
       "ASSETS/images/encapsule-holistic.svg": {
          request_bindings: { method: "GET", uris: ["/images/encapsule-holistic.svg"] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml"  }
      },
       "ASSETS/images/react-logo.svg": {
          request_bindings: { method: "GET", uris: [ "/images/react-logo.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/images/warning-error-icon.svg": {
          request_bindings: { method: "GET", uris: [ "/images/warning-error-icon.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       // Android icons
      "ASSETS/images/android-icon-192x192.png": {
          request_bindings: { method: "GET", uris: ["/android-chrome-192x192.png"] },
          response_properties: { contentEncoding: "binary", contentType: "image/png" }
      },
       "ASSETS/images/android-icon-512x512.png": {
          request_bindings: { method: "GET", uris: ["/android-chrome-512x512.png", "/android-chrome.png" ] },
          response_properties: { contentEncoding: "binary", contentType: "image/png" }
      },
       // Apple icons
      "ASSETS/images/apple-icon-114x114.png": {
          request_bindings: { method: "GET", uris: [ "/apple-touch-icon-114x114.png" ] },
          response_properties: { contentEncoding: "binary", contentType: "image/png" }
      },
      "ASSETS/images/apple-icon-144x144.png": {
          request_bindings: { method: "GET", uris: [ "/apple-icon-144x144.png" ] },
          response_properties: { contentEncoding: "binary", contentType: "image/png" }
      },
       "ASSETS/images/apple-icon-120x120.png": {
          request_bindings: { method: "GET", uris: [ "/apple-icon-120x120.png" ] },
          response_properties: { contentEncoding: "binary", contentType: "image/png" }
      },
       "ASSETS/images/apple-icon-152x152.png": {
          request_bindings: { method: "GET", uris: [ "/apple-icon-152x152.png" ] },
          response_properties: { contentEncoding: "binary", contentType: "image/png" }
      },
       "ASSETS/images/apple-icon-180x180.png": {
          request_bindings: { method: "GET", uris: [ "/apple-icon-180x180.png",  "/apple-touch-icon.png" ] },
          response_properties: { contentEncoding: "binary", contentType: "image/png" }
      },
       "ASSETS/images/apple-icon-57x57.png": {
          request_bindings: { method: "GET", uris: [ "/apple-icon-57x57.png" ] },
          response_properties: { contentEncoding: "binary", contentType: "image/png" }
      },
       "ASSETS/images/apple-icon-60x60.png": {
          request_bindings: { method: "GET", uris: [ "/apple-icon-60x60.png" ] },
          response_properties: { contentEncoding: "binary", contentType: "image/png" }
      },
       "ASSETS/images/apple-icon-72x72.png": {
          request_bindings: { method: "GET", uris: [ "/apple-icon-72x72.png" ] },
          response_properties: { contentEncoding: "binary", contentType: "image/png" }
      },
       "ASSETS/images/apple-icon-76x76.png": {
          request_bindings: { method: "GET", uris: [ "/apple-icon-76x76.png" ] },
          response_properties: { contentEncoding: "binary", contentType: "image/png" }
      },
       //Microsoft icons and config
      "ASSETS/images/ms-icon-144x144.png": {
          request_bindings: { method: "GET", uris: [ "/images/ms-icon-144x144.png" ] },
          response_properties: { contentEncoding: "binary", contentType: "image/png" }
      },
       "ASSETS/images/mstile-150x150.png": {
          request_bindings: { method: "GET", uris: [ "/images/mstile-150x150.png" ] },
          response_properties: { contentEncoding: "binary", contentType: "image/png" }
      },
        // Icons
      "ASSETS/icons/link.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/link.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/add.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/add.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/garbage.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/garbage.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/save.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/save.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/broken-link.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/broken-link.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/unschedule.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/unschedule.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/schedule.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/schedule.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/settings.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/settings.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/zoom-in.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/zoom-in.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/zoom-out.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/zoom-out.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/cancel.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/cancel.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/launch.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/launch.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/arrow-thick-bottom.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/arrow-down.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/arrow-thick-top.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/arrow-up.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/arrow-thick-right.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/arrow-right.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/arrow-thick-left.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/arrow-left.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/file_copy.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/copy.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/table_chart.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/table-chart.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/email.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/email.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/phone.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/phone.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/triangle-down.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/triangle-down.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/triangle-right.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/triangle-right.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/question.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/question.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       "ASSETS/icons/exclamation.svg": {
          request_bindings: { method: "GET", uris: [ "/icons/exclamation.svg" ] },
          response_properties: { contentEncoding: "utf8", contentType: "image/svg+xml" }
      },
       */
    };
    return {
      error: null,
      result: memoryFileRegistrationMap
    };
  }; // end HolisticAppServer::constructor function callback

})();