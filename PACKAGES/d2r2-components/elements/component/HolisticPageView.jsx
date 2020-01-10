"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// sources/common/view/elements/page/HolisticPageView.jsx
//
var React = require('react');

var reactComponentBindingFilterFactory = require('../binding-factory');

var factoryResponse = reactComponentBindingFilterFactory.create({
  id: "hCuVI2B6TbumErHrzPQjfQ",
  name: "<HolisticPageView/>",
  description: "Common single-page HTML5 page view template for use with D2R2.",
  renderDataBindingSpec: {
    ____types: "jsObject",
    HolisticPageView: {
      ____label: "RUXBase_Page HTML View Render Request",
      ____description: "HTML render request format for <RUXBase_Page/> React component.",
      ____types: "jsObject",
      // the caller must literally specify this subnamespace
      pageHeaderEP: {
        ____label: "Page Header Extension Point (EP)",
        ____description: "The contents of this namespace is created dynamically via <ComponentRouter/>.",
        ____accept: "jsObject",
        ____defaultValue: {
          ApplicationPageHeader: {}
        }
      },
      pageContentEP: {
        ____label: "Page Content Extension Point (EP)",
        ____description: "The contents of this namespace is created dynamically via <ComponentRouter/>.",
        ____accept: "jsArray",
        ____defaultValue: [{
          ApplicationPageMissingContent: {}
        }]
      },
      pageFooterEP: {
        ____label: "Page Footer Extension Point (EP)",
        ____description: "The contents of this namespace is created dynamically via <ComponentRouter/>.",
        ____accept: "jsObject",
        ____defaultValue: {
          ApplicationPageFooter: {}
        }
      },
      pageDebugEP: {
        ____label: "Page Debug Extenion Point (EP)",
        ____description: "The contents of this namespace is created dynamically via <ComponentRouter/>.",
        ____accept: "jsArray",
        ____defaultValue: [{
          HolisticDebugReactComponentProps: {}
        }]
      }
    },
    // HolisticPageView
    styles: {
      ____label: "Styles",
      ____description: "Programmatic CSS for use with React.",
      ____types: "jsObject",
      ____defaultValue: {},
      container: {
        ____types: "jsObject",
        ____defaultValue: {},
        margin: {
          ____accept: "jsString",
          ____defaultValue: "0px"
        },
        // margin
        padding: {
          ____accept: "jsString",
          ____defaultValue: "0px"
        },
        // padding
        backgroundColor: {
          ____accept: "jsString",
          ____defaultValue: "white"
        }
      } // container

    }
  },
  // Renderdatabindingspec
  reactComponent:
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(HolisticPageView, _React$Component);

    function HolisticPageView() {
      _classCallCheck(this, HolisticPageView);

      return _possibleConstructorReturn(this, _getPrototypeOf(HolisticPageView).apply(this, arguments));
    }

    _createClass(HolisticPageView, [{
      key: "render",
      value: function render() {
        var self = this;
        var ComponentRouter = this.props.appStateContext.ComponentRouter;
        var metadata = this.props.document.metadata;
        var theme = metadata.site.theme;
        var renderData = this.props.renderData;
        var renderMessage = renderData.HolisticPageView;
        var renderStyles = renderData.styles;
        var index = 0;

        function makeKey() {
          return "HolisticPageView" + index++;
        }

        var content = [];
        content.push(React.createElement(ComponentRouter, _extends({
          key: makeKey()
        }, this.props, {
          renderData: renderMessage.pageHeaderEP
        })));
        renderMessage.pageContentEP.forEach(function (contentRenderData_) {
          content.push(React.createElement(ComponentRouter, _extends({
            key: makeKey()
          }, self.props, {
            renderData: contentRenderData_
          })));
        });
        content.push(React.createElement(ComponentRouter, _extends({
          key: makeKey()
        }, this.props, {
          renderData: renderMessage.pageFooterEP
        })));
        renderMessage.pageDebugEP.forEach(function (contentRenderData_) {
          content.push(React.createElement(ComponentRouter, _extends({
            key: makeKey()
          }, self.props, {
            renderData: contentRenderData_
          })));
        });
        return React.createElement("div", {
          id: "idHolisticPageView",
          style: theme.HolisticPageView.container
        }, content, React.createElement("br", null));
      }
    }]);

    return HolisticPageView;
  }(React.Component)
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;