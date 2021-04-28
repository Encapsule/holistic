"use strict";

// These options are registered w/HolisticNodeService via its constructor request at ~.appModels.httpRequestProcessor.holismConfig.lifecycle.renderHTML5Options
var appBuild = require("../../../app-build");

module.exports = {
  documentPrologueComments: "  <!-- App-specific prologue comment: Replace this comment with comments specific to your application in the SOURCES/SERVER/node-service/config/render-html5-options.js module. -->\n",
  documentHeadSectionLinksMeta: "    <!-- App-specific document head section links & metadata: Replace this comment with your application-specific HTML5 resource declarations in the SOURCES/SERVER/noder-service/render-html5-options.js module. -->\n",
  documentEpilogueComments: "    <!-- App specific epilogue comment: Replace this comment with comments specific to your application in the SOURCES/SERVER/node-service/render-html5-options.js module. -->\n"
};