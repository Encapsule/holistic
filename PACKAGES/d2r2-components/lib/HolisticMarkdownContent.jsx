"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// HolisticMarkdownContent.jsx
//
// A think wrapper around the `react-markdown` package.
//
var React = require('react');

var reactComponentBindingFilterFactory = require('./binding-factory');

var ReactMarkdown = require('react-markdown');

var factoryResponse = reactComponentBindingFilterFactory.create({
  id: "O4p4w9-cTAuhDP-oJG14bA",
  name: "<HolisticMarkdownContent/>",
  description: "Renders markdown data as HTLM content via the react-markdown library.",
  renderDataBindingSpec: {
    ____types: "jsObject",
    HolisticMarkdownContent_AonatdsFRQmv6SgeqvJIQw: {
      ____label: "Markdown Content HTML Render Request",
      ____description: "Renders an array of markdown-encoded strings as HTML content.",
      ____types: "jsObject",
      markdownContent: {
        ____label: "Markdown Content Array",
        ____description: "An array of markdown-encoded strings joined with space delimiters.",
        ____types: "jsArray",
        ____defaultValue: ["## Missing Content\n\n", "Sorry, no markdown-encoded content was specified.\n\n"],
        markdownLine: {
          ____label: "Markdown Line",
          ____description: "A markdown-encoded string taken as a markdown section.",
          ____accept: "jsString"
        }
      },
      markdownOptions: {
        ____label: "Markdown Options",
        ____description: "An options object to pass through to the underlying <ReactMarkdown/> component.",
        ____accept: "jsObject",
        ____defaultValue: {}
      }
    },
    styles: {
      ____label: "Container Styles",
      ____description: "Styles applied to the DIV container around the rendered markdown content.",
      ____accept: "jsObject",
      ____defaultValue: {
        background: "yellow"
      } // this is to alert developers that they should style their markdown

    }
  },
  reactComponent: /*#__PURE__*/function (_React$Component) {
    _inherits(HolisticMarkdownContent, _React$Component);

    var _super = _createSuper(HolisticMarkdownContent);

    function HolisticMarkdownContent() {
      _classCallCheck(this, HolisticMarkdownContent);

      return _super.apply(this, arguments);
    }

    _createClass(HolisticMarkdownContent, [{
      key: "render",
      value: function render() {
        try {
          var renderRequest = this.props.renderData['HolisticMarkdownContent_AonatdsFRQmv6SgeqvJIQw'];
          var markdownSource = renderRequest.markdownContent.join(' ');
          return /*#__PURE__*/React.createElement("div", {
            style: this.props.renderData.styles
          }, /*#__PURE__*/React.createElement(ReactMarkdown, {
            options: renderRequest.markdownOptions,
            source: markdownSource
          }));
        } catch (exception_) {
          return /*#__PURE__*/React.createElement("div", null, "HolisticMarkdownContent exception: ", exception_.toString());
        }
      }
    }]);

    return HolisticMarkdownContent;
  }(React.Component)
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;