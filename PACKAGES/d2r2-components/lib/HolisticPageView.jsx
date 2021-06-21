"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

// sources/common/view/elements/page/HolisticPageView.jsx
//
var React = require('react');

var reactComponentBindingFilterFactory = require('./binding-factory');

var factoryResponse = reactComponentBindingFilterFactory.create({
  id: "hCuVI2B6TbumErHrzPQjfQ",
  name: "<HolisticPageView/>",
  description: "Common single-page HTML5 page view template for use with D2R2.",
  renderDataBindingSpec: {
    ____types: "jsObject",
    HolisticPageView: {
      ____label: "HolisticPageView Render Request Message",
      ____description: "@encapsule/d2r2 renderData request format used to dynamically bind a <HolisticPageView/> React element.",
      ____types: "jsObject",
      // Caller must explicitly specify the HolisticPageView namespace...
      pageHeaderEP: {
        ____label: "Page Header Extension Point (EP)",
        ____description: "The contents of this namespace is created dynamically via <ComponentRouter/>.",
        ____accept: ["jsNull", "jsObject"],
        ____defaultValue: {
          AppServiceDisplayExtenstion_PageHeader: {}
        }
      },
      pageContentEP: {
        ____label: "Page Content Extension Point (EP)",
        ____description: "The contents of this namespace is created dynamically via <ComponentRouter/>.",
        ____accept: "jsArray",
        ____defaultValue: []
      },
      pageFooterEP: {
        ____label: "Page Footer Extension Point (EP)",
        ____description: "The contents of this namespace is created dynamically via <ComponentRouter/>.",
        ____accept: ["jsNull", "jsObject"],
        ____defaultValue: {
          AppServiceDisplayExtension_PageFooter: {}
        }
      },
      pageDebugEP: {
        ____label: "Page Debug Extenion Point (EP)",
        ____description: "The contents of this namespace is created dynamically via <ComponentRouter/>.",
        ____accept: "jsArray",
        ____defaultValue: []
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
        } // padding

      } // container

    }
  },
  // Renderdatabindingspec
  reactComponent: /*#__PURE__*/function (_React$Component) {
    _inherits(HolisticPageView, _React$Component);

    var _super = _createSuper(HolisticPageView);

    function HolisticPageView() {
      _classCallCheck(this, HolisticPageView);

      return _super.apply(this, arguments);
    }

    _createClass(HolisticPageView, [{
      key: "render",
      value: function render() {
        try {
          var makeKey = function makeKey() {
            return "HolisticPageView" + index++;
          };

          var self = this;
          var ComponentRouter = this.props.renderContext.ComponentRouter;
          var renderData = this.props.renderData;
          var renderMessage = renderData.HolisticPageView;
          var index = 0;
          var content = []; // Optionally inject custom page header element.

          if (renderMessage.pageHeaderEP) {
            content.push( /*#__PURE__*/React.createElement(ComponentRouter, _extends({
              key: makeKey()
            }, self.props, {
              renderData: renderMessage.pageHeaderEP
            })));
          } // Inject the page view's content element(s).


          if (renderMessage.pageContentEP.length) {
            renderMessage.pageContentEP.forEach(function (contentRenderData_) {
              content.push( /*#__PURE__*/React.createElement(ComponentRouter, _extends({
                key: makeKey()
              }, self.props, {
                renderData: contentRenderData_
              })));
            });
          } else {
            content.push( /*#__PURE__*/React.createElement("div", {
              key: makeKey()
            }, "No page view content elements were specified. Nothing to display..."));
          } // Optionally inject custom page footer element.


          if (renderMessage.pageFooterEP) {
            content.push( /*#__PURE__*/React.createElement(ComponentRouter, _extends({
              key: makeKey()
            }, self.props, {
              renderData: renderMessage.pageFooterEP
            })));
          } // Optionally inject developer tooling element(s).


          renderMessage.pageDebugEP.forEach(function (contentRenderData_) {
            content.push( /*#__PURE__*/React.createElement(ComponentRouter, _extends({
              key: makeKey()
            }, self.props, {
              renderData: contentRenderData_
            })));
          });
          return /*#__PURE__*/React.createElement("div", null, content);
        } catch (exception_) {
          return /*#__PURE__*/React.createElement("div", null, "An unhandled exception occurred inside HolisticPageView::render method: ", exception_.message);
        }
      }
    }]);

    return HolisticPageView;
  }(React.Component)
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;