"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

// sources/common/view/elements/page/RUX_PagePanel_ReactDebug.jsx
//
var React = require('react');

var reactComponentBindingFilterFactory = require('../binding-factory');

var factoryResponse = reactComponentBindingFilterFactory.create({
  id: "Zp6gd5TLRWm-a-2kb3qu2w",
  name: "<HolisticDebugReactComponentProps/>",
  description: "<HolisticDebugReactComponentProps/> allows developers to view raw this.props data.",
  renderDataBindingSpec: {
    ____types: "jsObject",
    HolisticDebugReactComponentProps: {
      ____accept: "jsObject"
    }
  },
  reactComponent:
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(HolisticDebugReactComponentProps, _React$Component);

    function HolisticDebugReactComponentProps(props_) {
      var _this;

      _classCallCheck(this, HolisticDebugReactComponentProps);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(HolisticDebugReactComponentProps).call(this, props_));
      _this.state = {
        showDetails: false,
        showDocumentData: false,
        showAppDataStore: false,
        showAppStateController: false,
        showMetadataStore: false
      };
      _this.onClickToggleDetails = _this.onClickToggleDetails.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onClikcToggleDetailsSection = _this.onClickToggleDetailsSection.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    _createClass(HolisticDebugReactComponentProps, [{
      key: "onClickToggleDetails",
      value: function onClickToggleDetails() {
        this.setState({
          showDetails: !this.state.showDetails
        });
      }
    }, {
      key: "onClickToggleDetailsSection",
      value: function onClickToggleDetailsSection(sectionName) {
        var state = this.state;
        state[sectionName] = !state[sectionName];
        this.setState(state);
      }
    }, {
      key: "render",
      value: function render() {
        var self = this;
        var ComponentRouter = this.props.appStateContext.ComponentRouter;
        var metadata = this.props.document.metadata;
        var theme = metadata.site.theme;
        var keyIndex = 0;

        function makeKey() {
          return "HolisticDebugReactComponentProps" + keyIndex++;
        }

        var content = [];

        if (!this.state.showDetails) {
          content.push(React.createElement("div", {
            key: makeKey(),
            style: theme.base.PagePanel_ReactDebug.closed.container
          }, React.createElement("img", {
            src: "/images/react-logo.svg",
            style: theme.base.PagePanel_ReactDebug.closed.icon,
            onClick: this.onClickToggleDetails,
            title: "Show React JSON..."
          })));
        } else {
          content.push(React.createElement("div", {
            key: makeKey(),
            style: theme.base.PagePanel_ReactDebug.closed.container
          }, React.createElement("img", {
            src: "/images/react-logo.svg",
            style: theme.base.PagePanel_ReactDebug.closed.iconDisabled,
            onClick: this.onClickToggleDetails,
            title: "Hide React JSON..."
          })));
          var details = [];
          details.push(React.createElement("div", {
            key: makeKey(),
            style: theme.base.PagePanel_ReactDebug.open.hideDetails,
            onClick: this.onClickToggleDetails,
            title: "Hide React JSON..."
          }, React.createElement("img", {
            src: "/images/react-logo.svg",
            style: theme.base.PagePanel_ReactDebug.open.icon
          }), "In-Page React Data Viewer :: ", metadata.page.name));
          details.push(React.createElement("div", {
            key: makeKey(),
            style: theme.base.PagePanel_ReactDebug.open.guidance
          }, React.createElement("p", null, "To debug a rendering issue with a specific React component, set a breakpoint in its render method (or possibly lifecycle method(s)). Step through your view rendering logic to find errors handling input(s). Check your subcomponent delegations and specific values passed."), React.createElement("p", null, "To debug page-level layout rendering problems, set a breakpoint in the render method of ", React.createElement("strong", null, "<ComponentRouter/>"), ". Inspect the React component selected and specific data value(s) bound to the selected component before the call is delegated.")));
          details.push(React.createElement("p", {
            key: makeKey()
          }, React.createElement("strong", null, "Click each section title below to toggle JSON view...")));
          details.push(React.createElement("h3", {
            key: makeKey(),
            onClick: function onClick() {
              self.onClickToggleDetailsSection('showDocumentData');
            },
            style: {
              cursor: 'pointer'
            }
          }, this.state.showDocumentData ? '-' : '+', ' ', "this.props.document"));
          if (this.state.showDocumentData) details.push(React.createElement("pre", {
            key: makeKey(),
            style: theme.classPRE
          }, "this.props.document === '", JSON.stringify(this.props.document, undefined, 4), "'"));
          details.push(React.createElement("h3", {
            key: makeKey(),
            onClick: function onClick() {
              self.onClickToggleDetailsSection('showAppDataStore');
            },
            style: {
              cursor: 'pointer'
            }
          }, this.state.showAppDataStore ? '-' : '+', ' ', "this.props.appStateContext.appDataStore"));
          if (this.state.showAppDataStore) details.push(React.createElement("pre", {
            key: makeKey(),
            style: theme.classPRE
          }, "this.props.appStateContext.appDataStore === '", JSON.stringify(this.props.appStateContext.appDataStore, undefined, 4), "'"));
          details.push(React.createElement("h3", {
            key: makeKey(),
            onClick: function onClick() {
              self.onClickToggleDetailsSection('showMetadataStore');
            },
            style: {
              cursor: 'pointer'
            }
          }, this.state.showMetadataStore ? '-' : '+', ' ', "this.props.appStateContext.appMetadataStore"));
          if (this.state.showMetadataStore) details.push(React.createElement("pre", {
            key: makeKey(),
            style: theme.classPRE
          }, "this.props.appStateContext.appMetadataStore === '", this.props.appStateContext.appMetadataStore.stringify(undefined, 4), "'"));
          details.push(React.createElement("h3", {
            key: makeKey(),
            onClick: function onClick() {
              self.onClickToggleDetailsSection('showAppStateController');
            },
            style: {
              cursor: 'pointer'
            }
          }, this.state.showAppStateController ? '-' : '+', ' ', "this.props.appStateContext.appStateController"));
          if (this.state.showAppStateController) details.push(React.createElement("pre", {
            key: makeKey(),
            style: theme.classPRE
          }, "this.props.appStateContext.appStateController === '", JSON.stringify(this.props.appStateContext.appStateController, undefined, 4)));
          content.push(React.createElement("div", {
            key: makeKey(),
            style: theme.base.PagePanel_ReactDebug.open.container
          }, details));
        }

        return React.createElement("div", null, content);
      }
    }]);

    return HolisticDebugReactComponentProps;
  }(React.Component)
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;