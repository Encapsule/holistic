"use strict";

/*
  holistic v0.0.49-spectrolite
  // This info is now passed via callback request in-parameter.
  const vp5DeploymentMode = process.env.VP5_DEPLOYMENT_MODE || "development";
  const isDevelopmentDeployment = (vp5DeploymentMode === "development");
  console.log(`> Configuring @encapsule/holism app server service plug-in registrations for VP5_DEPLOYMENT_MODE=${vp5DeploymentMode}`);
  const appBuildManifest = require("../../../app-build");
  const path = require("path"); // ?
  const arccore = require("@encapsule/arccore"); // ?
  const holism = require("@encapsule/holism"); // ?
  const ASSETS_DIR = path.resolve(path.join(__dirname, "../../../ASSETS"));

*/
(function () {
  var path = require("path"); // @encapsule/holism-services exports a small collection of building block @encapsule/holism HTTP server service filter plug-ins that you can re-use in your application.


  var holismServicesLib = require("@encapsule/holism-services").services; // KEEP FOR MS4 (will need some work)
  // const getUserLogoutService = require("../services/get-user-logout-service");
  // const getGoogleOAuth2LoginService = require("../services/get-google-oauth2-login-service");
  // DISABLE TEMPORAILY IN MS4
  // const getHtmlViewAdminControlPanel = require("../services/get-html-view-admin-control-panel-service");
  // const getHolismServiceFilterRequestEchoService = require("../services/get-holism-service-filter-request-echo-service");
  // OKAY FOR MS4


  var getHtmlHomepageService = require("../services/get-html-view-homepage");

  module.exports = function (_ref) {
    var appBuild = _ref.appBuild,
        deploymentEnvironment = _ref.deploymentEnvironment;
    console.log("> \"".concat(path.resolve(__filename), "\" Preparing deploymentEnvironment=").concat(deploymentEnvironment, " @encapsule/holism-format service filter plug-in registration map for ").concat(appBuild.app.name, " to return back to @encapsule/holism config orchestrator."));
    var holismServiceFilterRegistrationMap = [// PLEASE TRY TO KEEP THESE SERVICE REGISTRATIONS IN ALPHANUMERIC ORDER.
    // This makes it simpler to track changes over time. And, helps in ensuring
    // that all GET routes the produce HTML pages have appropriate page metadata
    // definitions defined.
    // ============================================================
    // GET ROUTE SERVICE FILTER REGISTRATIONS
    //
    {
      // HTML GET:/
      // Default entry view for Viewpath5.
      // Currently, we are not doing much with server-side
      // rendering at all; we will focus on HTML5 client
      // dynamic experience and use the app server primarily
      // for authentication, storage, and development.
      // Later, we will convert the app server to CellProcessor
      // and be able to leverage server-side HTML5 app rendering
      // for reports (there are a large number of use cases for
      // server rendering but nothing that we need immediately for
      // short-term MS4 customer-facing UX.
      authentication: {
        required: false
      },
      filter: getHtmlHomepageService,
      request_bindings: {
        method: "GET",
        uris: ["/"]
      },
      response_properties: {
        contentEncoding: "utf8",
        contentType: "text/html"
      },
      options: {
        d2r2RequestAuthenticated: {
          HolisticHTML5Service_Loader: {
            authenticated: true,
            appStarted: false,
            appBuild: appBuild,
            deploymentEnvironment: deploymentEnvironment
          }
        },
        d2r2RequestNotAuthenticated: {
          HolisticHTML5Service_Loader: {
            authenticated: false,
            appStarted: false,
            appBuild: appBuild,
            deploymentEnvironment: deploymentEnvironment
          }
        }
      }
    }, {
      // JSON GET:/health
      // Data route used by cloud providers to determine basic availability of the HTTP server application.
      authentication: {
        required: false
      },
      filter: holismServicesLib.HealthCheck,
      request_bindings: {
        method: "GET",
        uris: ["/agent", "/health"]
      },
      response_properties: {
        contentEncoding: "utf8",
        contentType: "application/json"
      }
    } // Disabling the GET:/login HTML5 resource route. For now, it seems fine to use GET:/login-oauth2 route directly.
    // Later, we may elect to resurrect this route if/when we need to add custom UX to support additional authentication
    // workflows.

    /*
    { // HTML GET:/login
        // Display user login options allowing user to create a user session.
        // TODO: Specify URL params that allow a client to specify post authentication redirect location and possibly other information.
        authentication: { required: false },
        // TODO: We need a custom service filter to deal with URL-encoded params, possibly reading a challenge cookie value,
        // setting secure cookie on the the response to affect post-authn redirect etc.
        filter: holismServicesLib.OptionsAsHtmlContent,
        request_bindings: { method: "GET", uris: [ "/login" ] },
        response_properties: { contentEncoding: "utf8", contentType: "text/html" },
        options: { Login: {} }
    },
     { // HTML GET:/login-oauth2
        // Authenicate the user using a Google OAuth2 authorization flow to gain access to the their Google-managed profile data.
        authentication: { required: false },
        filter: getGoogleOAuth2LoginService,
        request_bindings: { method: "GET", uris: [ "/login-oauth2" ] },
        response_properties: { contentEncoding: "utf8", contentType: "text/html" },
    },
     { // HTML GET:/logout
        // Close user session, delete the user session cookie, and redirect.
        // TODO: Figure out how to make this route completely ignore a session cookie iff attached to the HTTP request.
        // Oftentimes we're trying to log out because we've gone offline while running the app server in development environment.
        // And, without more work on in app server layers above @encapsule/holism it's not really feasible to gate proxies
        // to the storage layer based on current network status without adding a lot of code that belongs at a higher level
        // (e.g. in a CellModel).
        authentication: { required: false },
        filter: getUserLogoutService,
        request_bindings: { method: "GET", uris: [ "/logout" ] },
        response_properties: { contentEncoding: "utf8", contentType: "text/html" },
    },
    */
    // ============================================================
    // POST ROUTE SERVICE FILTER REGISTRATIONS
    // require("../services/data-gateway-service")
    ]; // holismServiceFilterRegistrationMap

    return {
      error: null,
      result: holismServiceFilterRegistrationMap
    };
  }; // end callback from HolisticAppServer::constructor filter

})();