"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// HolisticEmptyPlaceholder.jsx
//
// An empty <span/> rendered via <ComponentRouter/> in cases where we need a temporary placeholder.
//
var React = require('react');

var reactComponentBindingFilterFactory = require('../binding-factory');

var ReactMarkdown = require('react-markdown');

var factoryResponse = reactComponentBindingFilterFactory.create({
  id: "8AdCdPImQB-wE7z7nzXS5Q",
  name: "<HolisticEmptyPlaceholder/>",
  description: "Renders an empty <span/>.",
  renderDataBindingSpec: {
    ____types: "jsObject",
    "HolisticEmptyPlaceholder_8AdCdPImQB-wE7z7nzXS5Q": {
      ____label: "Empty Placeholder Render Request",
      ____description: "Renders an empty <span/>.",
      ____accept: "jsObject"
    }
  },
  reactComponent:
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(HolisticMarkdownContent, _React$Component);

    function HolisticMarkdownContent() {
      _classCallCheck(this, HolisticMarkdownContent);

      return _possibleConstructorReturn(this, _getPrototypeOf(HolisticMarkdownContent).apply(this, arguments));
    }

    _createClass(HolisticMarkdownContent, [{
      key: "render",
      value: function render() {
        return React.createElement("span", null);
      }
    }]);

    return HolisticMarkdownContent;
  }(React.Component)
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;