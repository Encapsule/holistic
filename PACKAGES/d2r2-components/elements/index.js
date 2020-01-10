"use strict";

// sources/common/view/elements/index.js
//
// Export the UX base libraries _common_ (i.e. agnostic to client/server render) data view bindings.
var dataRoutableComponents = [require("./component/HolisticPageView.jsx"), require("./component/HolismHttpServerErrorPageView.jsx"), require("./component/RUXBase_PageContent_HttpServerError.jsx"), require("./component/HolisticMarkdownContent.jsx"), require("./component/HolisticEmptyPlaceholder.jsx"), require("./component/HolisticDebugReactComponentProps.jsx"), require("./component/HolisticDebugOPC.jsx")]; // Convert the array into a dictionary.

module.exports = dataRoutableComponents.reduce(function (dictionary_, element_) {
  var drcNameKey = element_.filterDescriptor.operationID + "::" + element_.filterDescriptor.operationName;
  dictionary_[drcNameKey] = element_;
  return dictionary_;
}, {});