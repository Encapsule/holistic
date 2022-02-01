"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// cellspace.js
// 2022.01.13 chrisrus - This is a small little bit of code written to make it simpler
// to address various test artifacts. This was written prior to CellModelArtifactSpace
// class. Coming back to this, it's not 100% clear to me that the simplicity of this
// approach is inferior. In the general case, this is a mathematical manifold problem
// that is I think I should personally avoid working on unless I am getting paid.
var arccore = require("@encapsule/arccore");

var space = {
  name: "Cell Proxy / Shared Process Test Space",
  id: "j450oO5FRF6GOiYYcuh6cw"
};
module.exports = {
  cmID: function cmID(name_) {
    var coordinate = _objectSpread(_objectSpread({}, space), {}, {
      axis: "form",
      instance: name_
    });

    return arccore.identifier.irut.fromReference(coordinate).result;
  },
  apmID: function apmID(name_) {
    var coordinate = _objectSpread(_objectSpread({}, space), {}, {
      axix: "function",
      instance: name_
    });

    return arccore.identifier.irut.fromReference(coordinate).result;
  }
};