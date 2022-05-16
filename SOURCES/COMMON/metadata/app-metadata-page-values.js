"use strict";

// app-metadata-page-values.js
var appBuildManifest = require("../../app-build");

module.exports = {
  "/": {
    title: appBuildManifest.app.name,
    description: appBuildManifest.app.description,
    name: appBuildManifest.app.name,
    tooltip: "".concat(appBuildManifest.app.name, "...")
  },
  "/login-oauth2": {
    title: "${appBuildManifest.app.name} Login",
    description: "Integration w/Google OAuth2 requesting server-side programmatic access to a Google user's name, e-mail, and Google user ID metadata. We can leverage this information e.g. to securely authenticate the user's identity.",
    name: "${appBUildManifest.appName} Login",
    tooltip: "Log in ".concat(appBuildManifest.app.name, "...")
  }
};