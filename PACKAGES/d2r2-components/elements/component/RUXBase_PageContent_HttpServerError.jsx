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

// sources/common/view/elements/component/PageContent_HttpServerError.jsx.jsx
//
var arccore = require("@encapsule/arccore");

var React = require("react");

var reactComponentBindingFilterFactory = require("../binding-factory");

var holismHttpResponseErrorResultSpec = require("@encapsule/holism/lib/iospecs/http-response-error-result-spec");

var holismHttpErrorDataSpec = holismHttpResponseErrorResultSpec.error_descriptor.data;
var holismHttpErrorMessageSpec = arccore.util.clone(holismHttpResponseErrorResultSpec.error_descriptor.data['ESCW71rwTz24meWiZpJb4A']); // snips off the routing namespace & deep copies

var factoryResponse = reactComponentBindingFilterFactory.create({
  id: "hO7kzwr3SmmnWFJQ6mUEiQ",
  name: "<HolismHttpServerErrorPageContent/>",
  description: "Renders the inner page content of @encapsule/holism-produced HTTP server error message.",
  renderDataBindingSpec: {
    ____types: "jsObject",
    HolismHttpServerErrorPageContent: holismHttpErrorMessageSpec
  },
  reactComponent:
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(HolismHttpServerErrorPageContent, _React$Component);

    function HolismHttpServerErrorPageContent(props_) {
      var _this;

      _classCallCheck(this, HolismHttpServerErrorPageContent);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(HolismHttpServerErrorPageContent).call(this, props_));
      _this.state = {
        showRawResponse: false
      };
      return _this;
    }

    _createClass(HolismHttpServerErrorPageContent, [{
      key: "render",
      value: function render() {
        var ComponentRouter = this.props.appStateContext.ComponentRouter;
        var metadata = this.props.document.metadata;
        var theme = metadata.site.theme;
        var renderData = this.props.renderData["HolismHttpServerErrorPageContent"];
        var keyIndex = 0;

        function makeKey() {
          return "HolismHttpServerErrorPageContent" + keyIndex++;
        }

        var content = [];

        switch (renderData.http.code) {
          default:
            content.push(React.createElement("h1", {
              key: makeKey()
            }, metadata.site.name, " Error ", renderData.http.code, ': ', renderData.http.message));
            content.push(React.createElement("div", {
              key: makeKey()
            }, React.createElement("p", null, React.createElement("span", {
              style: {
                fontSize: "larger"
              }
            }, "The ", metadata.site.name, " application server cannot process your request.")), React.createElement("p", {
              style: theme.base.PageContent_HttpServerError.errorMessage
            }, renderData.error_message)));
            content.push(React.createElement("pre", {
              key: makeKey()
            }, JSON.stringify(renderData, undefined, 4)));
            content.push(React.createElement("div", {
              key: makeKey(),
              style: {
                marginTop: "1em",
                fontWeight: "bold",
                textAlign: "right"
              }
            }, "[ ", React.createElement("a", {
              href: "/",
              title: "Go home..."
            }, "Home"), " ] [ ", React.createElement("a", {
              href: "/login",
              title: "Login..."
            }, "Login"), " ] [ ", React.createElement("a", {
              href: "/logout",
              title: "Logout..."
            }, "Logout"), " ] [ ", React.createElement("a", {
              href: "/user",
              title: "User settings..."
            }, "User"), " ]"));
            break;
        }

        return React.createElement("div", {
          style: theme.base.PageContent_HttpServerError.container
        }, content);
      }
    }]);

    return HolismHttpServerErrorPageContent;
  }(React.Component)
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;