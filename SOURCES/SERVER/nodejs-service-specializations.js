"use strict";

// nodejs-service-runtime-specialization.js
// This is the main configuration declaration for the application's Node.js HTTP 1.1 service process.
// Written once by @encapsule/holistic/appgen during initialization of a new derived app workspace.
(function () {
  // DETERMINE WHICH DEPLOYMENT ENVIRONMENT THE NODEJS SERVICE INSTANCE WILL EXECUTE IN.
  var process = require("process");

  var HOLISTIC_NODEJS_ENV = process.env["HOLISTIC_NODEJS_ENV"] || "development";

  switch (HOLISTIC_NODEJS_ENV) {
    case "production":
    case "staging":
    case "test":
    case "development":
      break;

    default:
      HOLISTIC_NODEJS_ENV = "development"; // default value iff unspecified or unrecognized value set

      break;
  } // end switch envValue


  module.exports = {
    appServiceCore: require("../COMMON/app-service-core"),
    appTypes: {
      userLoginSession: {
        trusted: {
          userIdentityAssertionSpec: require("./authentication/iospecs/user-identity-assertion-descriptor-spec"),
          userLoginSessionReplicaDataSpec: require("./authentication/iospecs/user-session-descriptor-spec")
        }
      }
    },
    appModels: {
      httpRequestProcessor: {
        holismConfig: {
          deploymentEnvironmentFlag: HOLISTIC_NODEJS_ENV,
          registrations: {
            resources: {
              getMemoryFileRegistrationMap: require("./node-service/config/memory-files"),
              getServiceFilterRegistrationMap: require("./node-service/config/service-filters")
            }
          },
          lifecycle: {
            redirectPreprocessor: require("./node-service/integrations/http-request-redirector"),
            getUserIdentityAssertion: require("./node-service/integrations/get-user-identity-from-http-request"),
            getUserLoginSession: require("./node-service/integrations/get-user-session-from-identity-assertion"),
            renderHTML5Options: require("./node-service/config/render-html5-options")
          },
          appStateContext: {// vp5GroupAuthorizer: require("./authorization/vp5-group-authorizer")
          }
        }
      }
    },
    cellModels: undefined,
    // v0.0.49-spectrolite does not support extensibility of the Node.js service via CellModel yet.
    display: {
      d2r2: undefined // This is only used in rare circumstances. For the most part, Node.js service inherits from appServiceCore.

    }
  };
})();