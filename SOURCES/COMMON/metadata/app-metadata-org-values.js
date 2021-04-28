"use strict";

// app-metadata-org-values.js
var appBuildManifest = require("../../app-build");

module.exports = {
  name: appBuildManifest.app.author,
  location: "Seattle, WA USA",
  url: "https://viewpath.com",
  social: {
    twitterUrl: "https://twitter.com/viewpath",
    githubUrl: "https://github.com/viewpath"
  },
  copyrightHolder: {
    name: appBuildManifest.app.author
  }
};