"use strict";

// sources/common/view/elements/index.js
//
// Export the UX base libraries _common_ (i.e. agnostic to client/server render) data view bindings.
var dataRoutableComponents = [// As of v0.0.47 these are likely to contain bugs due to the deletion of static theme data.
// Just tearing this old stuff out so we can rebuild it correctly w/holistic RTL's and new
// stack...
require("./HolisticPageView.jsx"), require("./HolismHttpServerErrorPageView.jsx"), require("./RUXBase_PageContent_HttpServerError.jsx"), require("./HolisticMarkdownContent.jsx"), require("./HolisticEmptyPlaceholder.jsx") // DISABLED PENDING FURTHER REVIEW against @encapsule/holistic v0.0.47+
// require("./HolisticDebugReactComponentProps.jsx"),
// require("./HolisticDebugOPC.jsx")
]; // Convert the array into a dictionary.

module.exports = dataRoutableComponents.reduce(function (dictionary_, element_) {
  var drcNameKey = element_.filterDescriptor.operationID + "::" + element_.filterDescriptor.operationName;
  dictionary_[drcNameKey] = element_;
  return dictionary_;
}, {});