"use strict";

// sources/common/view/elements/index.js
//
// Export the UX base libraries _common_ (i.e. agnostic to client/server render) data view bindings.
var d2r2Components = [// As of v0.0.47 these are likely to contain bugs due to the deletion of static theme data.
// Just tearing this old stuff out so we can rebuild it correctly w/holistic RTL's and new
// stack...
require("./HolisticPageView.jsx"), require("./HolismHttpServerErrorPageView.jsx"), require("./RUXBase_PageContent_HttpServerError.jsx"), require("./HolisticMarkdownContent.jsx"), require("./HolisticEmptyPlaceholder.jsx") // DISABLED PENDING FURTHER REVIEW against @encapsule/holistic v0.0.47+
// v0.0.49-spectrolite keeping for reference but unlikey to survive - this code was written originally in 2016?
// require("./HolisticDebugReactComponentProps.jsx"),
// require("./HolisticDebugOPC.jsx")
];
module.exports = d2r2Components;