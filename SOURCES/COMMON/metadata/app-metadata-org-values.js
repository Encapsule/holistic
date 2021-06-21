"use strict";

// app-metadata-org-values.js
var appBuildManifest = require("../../app-build");

module.exports = {
  name: appBuildManifest.app.author,
  location: "Seattle, WA USA",
  url: "https://encapsule.io",
  social: {
    twitterUrl: "https://twitter.com/encapsule",
    githubUrl: "https://github.com/encapsule"
  },
  copyrightHolder: {
    name: appBuildManifest.app.author
  }
};