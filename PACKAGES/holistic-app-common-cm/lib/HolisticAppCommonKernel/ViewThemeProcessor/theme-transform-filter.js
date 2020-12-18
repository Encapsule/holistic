"use strict";

// theme-transform-filter.js
//

/*
  A simple arrccore.filter that implements a transformation between the
  the values presented in Holistic App Display Theme Settings document
  into final Holistic App Display Theme document values using colorspace
  conversations and various other small bits of logic to set the final
  theme values (of which there are many) consistenty so that display elements
  implemented by React components can simply use a set of this.state-based
  flags to dereference the current programmatic styles to be used for pretty
  all the common use cases/interactions/modes controls etc.
*/
var arccore = require("@encapsule/arccore");

var color = require("color"); // https://www.npmjs.com/package/color


var holisticThemeSettingsSpec = require("./iospecs/holistic-view-theme-settings-spec");

var holisticThemeObjectSpecs = require("./iospecs/holistic-view-theme-object-specs");

var themeTransformFunction = require("./theme-transform-function");

var factoryResponse = arccore.filter.create({
  operationID: "8L3wd25AR9687poByyuDbw",
  operationName: "Holistic View Theme Generator",
  operationDescription: "Produces a Holistic View Theme document containing detailed programmatic style information sorted by common display element type, mode, interaction, state etc.",
  inputFilterSpec: holisticThemeSettingsSpec,
  outputFilterSpec: holisticThemeObjectSpecs.holisticAppThemeSpec,
  bodyFunction: themeTransformFunction
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;