"use strict";

// Holistic platform RTL packages injected into a derived service repo by appgen
// may inject additional static resource files into the application's SOURCES/ASSETS
// directory upon RTL package installation within the scope of the derived service repo.
// e.g. `yarn install` will refresh your contents of your locally synchronized package.json
// depenendencies into your local .gitignore'd node_modules directory invoking post-install
// npm package registration on holistic platform RTL packages that carry static ASSET(s)
// into the app's SOURCES/ASSETS directory.
//
// Anyway, in those few cases where we actually do this (errors, load page, a little CSS,
// a few fonts...) the memory file registration required to serve those resources via HTTP
// GET are maintained here for merge into app-defined memory-file registrations.
(function () {
  module.exports = function (_ref) {
    var appBuild = _ref.appBuild,
        deploymentEnvironment = _ref.deploymentEnvironment;
    // v0.0.52-tourmaline
    // I have updated most of the memory file resources here to return "forever" Cache-Control header.
    // Currently, the @encapsule/holism RTL is too stupid to understand this and also is calculating and
    // sending the ETag header along w/the "forever" Cache-Control header. This is okay I think; the
    // browser will ignore the ETag. But, really it's a logical contradiction to assert "cache this forever"
    // and then provide an ETag value the semantics of which are "if you check and we say okay, then read
    // what you have cached". In all liklihood this will not get fixed until @encapsule/holism is converted
    // into a collection of CellModel and we go through the whole matrix of things that it should and
    // definitely should not be doing again.
    var responseHeaders = {
      cache: {
        forever: {
          "Cache-Control": "immutable, public, max-age=".concat(45
          /*days*/
          * 24
          /*hours/day*/
          * 60
          /*mins/hour*/
          * 60
          /*secs/min*/
          )
        }
      }
    };
    var clientAppBundleURI = "/javascript/html5-service-runtime-bundle-".concat(appBuild.app.buildID, ".js");
    var clientAppBundleMapURI = "/javascript/html5-service-runtime-bundle-".concat(appBuild.app.buildID, ".js.map");
    var memoryFileRegistrationMap = {
      ////
      // HOLISTIC HTML5 SERVICE JAVASCRIPT BUNDLE / DEBUG MAP RESOURCES
      // Every HolisticNodeService instance is able to "serve" a HolisticHTML5Service instance
      // via an HTML5 document containing a reference to the html5-service-runtime-bundle.js
      "html5-service-runtime-bundle.js": {
        request_bindings: {
          method: "GET",
          uris: [clientAppBundleURI]
        },
        response_properties: {
          contentEncoding: "utf8",
          contentType: "application/javascript",
          responseHeaders: responseHeaders.cache.forever
        }
      },
      ////
      // CSS RESOURCES
      "ASSETS/css/holistic-html5-service-fonts.css": {
        request_bindings: {
          method: "GET",
          uris: ["/css/holistic-html5-service-fonts.css"]
        },
        response_properties: {
          contentEncoding: "utf8",
          contentType: "text/css",
          responseHeaders: responseHeaders.cache.forever
        }
      },
      ////
      // STANDARD HTML5 SERVICE BOOT DISPLAY RESOURCES
      "ASSETS/css/spinners.css": {
        request_bindings: {
          method: "GET",
          uris: ["/css/spinners.css"]
        },
        response_properties: {
          contentEncoding: "utf8",
          contentType: "text/css",
          responseHeaders: responseHeaders.cache.forever
        }
      },
      "ASSETS/css/spinner-test-1.css": {
        request_bindings: {
          method: "GET",
          uris: ["/css/spinner-test-1.css"]
        },
        response_properties: {
          contentEncoding: "utf8",
          contentType: "text/css",
          responseHeaders: responseHeaders.cache.forever
        }
      },
      // ---------------------------------------------------------------------------
      // Static Font resources
      // ---------------------------------------------------------------------------
      'ASSETS/fonts/SKK6Nusyv8QPNMtI4j9J2wsYbbCjybiHxArTLjt7FRU.woff2': {
        request_bindings: {
          method: 'GET',
          uris: ['/fonts/SKK6Nusyv8QPNMtI4j9J2wsYbbCjybiHxArTLjt7FRU.woff2']
        },
        response_properties: {
          contentEncoding: 'binary',
          contentType: 'application/font-woff2',
          responseHeaders: responseHeaders.cache.forever
        }
      },
      'ASSETS/fonts/gFXtEMCp1m_YzxsBpKl68gsYbbCjybiHxArTLjt7FRU.woff2': {
        request_bindings: {
          method: 'GET',
          uris: ['/fonts/gFXtEMCp1m_YzxsBpKl68gsYbbCjybiHxArTLjt7FRU.woff2']
        },
        response_properties: {
          contentEncoding: 'binary',
          contentType: 'application/font-woff2',
          responseHeaders: responseHeaders.cache.forever
        }
      },
      'ASSETS/fonts/zhcz-_WihjSQC0oHJ9TCYAzyDMXhdD8sAj6OAJTFsBI.woff2': {
        request_bindings: {
          method: 'GET',
          uris: ['/fonts/zhcz-_WihjSQC0oHJ9TCYAzyDMXhdD8sAj6OAJTFsBI.woff2']
        },
        response_properties: {
          contentEncoding: 'binary',
          contentType: 'application/font-woff2',
          responseHeaders: responseHeaders.cache.forever
        }
      },
      'ASSETS/fonts/DbmoEiLFv2l2THgnoltNxn-_kf6ByYO6CLYdB4HQE-Y.woff2': {
        request_bindings: {
          method: 'GET',
          uris: ['/fonts/DbmoEiLFv2l2THgnoltNxn-_kf6ByYO6CLYdB4HQE-Y.woff2']
        },
        response_properties: {
          contentEncoding: 'binary',
          contentType: 'application/font-woff2',
          responseHeaders: responseHeaders.cache.forever
        }
      },
      'ASSETS/fonts/Ja-W2r1mUFvMx9Mn05mLi3-_kf6ByYO6CLYdB4HQE-Y.woff2': {
        request_bindings: {
          method: 'GET',
          uris: ['/fonts/Ja-W2r1mUFvMx9Mn05mLi3-_kf6ByYO6CLYdB4HQE-Y.woff2']
        },
        response_properties: {
          contentEncoding: 'binary',
          contentType: 'application/font-woff2',
          responseHeaders: responseHeaders.cache.forever
        }
      },
      'ASSETS/fonts/6TbRXKWJjpj6V2v_WyRbMevvDin1pK8aKteLpeZ5c0A.woff2': {
        request_bindings: {
          method: 'GET',
          uris: ['/fonts/6TbRXKWJjpj6V2v_WyRbMevvDin1pK8aKteLpeZ5c0A.woff2']
        },
        response_properties: {
          contentEncoding: 'binary',
          contentType: 'application/font-woff2',
          responseHeaders: responseHeaders.cache.forever
        }
      },
      'ASSETS/fonts/pRwQShtu0DpIJxaghUjyThTbgVql8nDJpwnrE27mub0.woff2': {
        request_bindings: {
          method: 'GET',
          uris: ['/fonts/pRwQShtu0DpIJxaghUjyThTbgVql8nDJpwnrE27mub0.woff2']
        },
        response_properties: {
          contentEncoding: 'binary',
          contentType: 'application/font-woff2',
          responseHeaders: responseHeaders.cache.forever
        }
      },
      'ASSETS/fonts/vag-4zh7veZxuXQd3EqJ8RTbgVql8nDJpwnrE27mub0.woff2': {
        request_bindings: {
          method: 'GET',
          uris: ['/fonts/vag-4zh7veZxuXQd3EqJ8RTbgVql8nDJpwnrE27mub0.woff2']
        },
        response_properties: {
          contentEncoding: 'binary',
          contentType: 'application/font-woff2',
          responseHeaders: responseHeaders.cache.forever
        }
      },
      'ASSETS/fonts/kEQ0PMpkuDY-ekJA13N_lxTbgVql8nDJpwnrE27mub0.woff2': {
        request_bindings: {
          method: 'GET',
          uris: ['/fonts/kEQ0PMpkuDY-ekJA13N_lxTbgVql8nDJpwnrE27mub0.woff2']
        },
        response_properties: {
          contentEncoding: 'binary',
          contentType: 'application/font-woff2',
          responseHeaders: responseHeaders.cache.forever
        }
      },
      'ASSETS/fonts/V7J2dBs3_g80-KE4D0R0whTbgVql8nDJpwnrE27mub0.woff2': {
        request_bindings: {
          method: 'GET',
          uris: ['/fonts/V7J2dBs3_g80-KE4D0R0whTbgVql8nDJpwnrE27mub0.woff2']
        },
        response_properties: {
          contentEncoding: 'binary',
          contentType: 'application/font-woff2',
          responseHeaders: responseHeaders.cache.forever
        }
      },
      'ASSETS/fonts/7FOHgXzNXtomMvoUz-Mv4xTbgVql8nDJpwnrE27mub0.woff2': {
        request_bindings: {
          method: 'GET',
          uris: ['/fonts/7FOHgXzNXtomMvoUz-Mv4xTbgVql8nDJpwnrE27mub0.woff2']
        },
        response_properties: {
          contentEncoding: 'binary',
          contentType: 'application/font-woff2',
          responseHeaders: responseHeaders.cache.forever
        }
      },
      'ASSETS/fonts/ldG7L03dPLLtYDea50KtQfesZW2xOQ-xsNqO47m55DA.woff2': {
        request_bindings: {
          method: 'GET',
          uris: ['/fonts/ldG7L03dPLLtYDea50KtQfesZW2xOQ-xsNqO47m55DA.woff2']
        },
        response_properties: {
          contentEncoding: 'binary',
          contentType: 'application/font-woff2',
          responseHeaders: responseHeaders.cache.forever
        }
      },
      'ASSETS/fonts/RQxK-3RA0Lnf3gnnnNrAsVlgUn8GogvcKKzoM9Dh-4E.woff2': {
        request_bindings: {
          method: 'GET',
          uris: ['/fonts/RQxK-3RA0Lnf3gnnnNrAsVlgUn8GogvcKKzoM9Dh-4E.woff2']
        },
        response_properties: {
          contentEncoding: 'binary',
          contentType: 'application/font-woff2',
          responseHeaders: responseHeaders.cache.forever
        }
      },
      ////
      // COMMON UNCLASSIFIED RESOURCES
      "ASSETS/text/robots.txt": {
        request_bindings: {
          method: "GET",
          uris: ["/robots.txt"]
        },
        response_properties: {
          contentEncoding: "utf8",
          contentType: "text/plain"
        }
      }
    }; // Let's not serve our webpack map to the world in production or staging environments (neither sets VP5_DEPLOYMENT_MODE at all).

    if (deploymentEnvironment === "development") {
      memoryFileRegistrationMap["html5-service-runtime-bundle.js.map"] = {
        request_bindings: {
          method: "GET",
          uris: ["/javascript/html5-service-runtime-bundle.js.map"]
        },
        response_properties: {
          contentEncoding: "utf8",
          contentType: "text/plain"
        }
      };
    }

    return {
      error: null,
      result: memoryFileRegistrationMap
    };
  };
})();