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

// sources/common/view/elements/page/HolismHttpServerErrorPageView.jsx
//
var React = require("react");

var reactComponentBindingFilterFactory = require("../binding-factory");

var holismHttpResponseErrorResultSpec = require("@encapsule/holism/lib/iospecs/http-response-error-result-spec");

var holismHttpErrorDataSpec = holismHttpResponseErrorResultSpec.error_descriptor.data;
var factoryResponse = reactComponentBindingFilterFactory.create({
  id: "dzAy_Q-9SYauqxeeO0EIEQ",
  name: "<HolismHttpServerErrorPageView/>",
  description: "Responsible for rendering HTTP request errors produced by the @encapsule/holism server package.",
  // This is the format of an HTML render request to be routed to the React component specified below.
  renderDataBindingSpec: holismHttpErrorDataSpec,
  // When <ComponentRouter/> receives a render request whose signature matches our dataBindingSpec, bind the request to this.props and render via the React component specified here.
  reactComponent:
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(HolismHttpServerErrorPageView, _React$Component);

    function HolismHttpServerErrorPageView() {
      _classCallCheck(this, HolismHttpServerErrorPageView);

      return _possibleConstructorReturn(this, _getPrototypeOf(HolismHttpServerErrorPageView).apply(this, arguments));
    }

    _createClass(HolismHttpServerErrorPageView, [{
      key: "render",
      value: function render() {
        var ComponentRouter = this.props.appStateContext.ComponentRouter;
        var pageContentEP = {
          HolisticPageView: {
            pageContentEP: [{
              HolismHttpServerErrorPageContent: this.props.renderData['ESCW71rwTz24meWiZpJb4A']
            }]
          }
        };
        return React.createElement(ComponentRouter, _extends({}, this.props, {
          renderData: pageContentEP
        }));
      }
    }]);

    return HolismHttpServerErrorPageView;
  }(React.Component)
});
if (factoryResponse.error) throw new Error(factoryResponse.error); // Export the React component binding filter.

module.exports = factoryResponse.result;