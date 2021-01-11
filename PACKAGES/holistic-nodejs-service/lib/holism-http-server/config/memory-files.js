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
module.exports = function (_ref) {
  var appBuild = _ref.appBuild,
      deploymentEnvironment = _ref.deploymentEnvironment;
  return {
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
  };
};