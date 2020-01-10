"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// sources/common/view/elements/page/RUXBase_PagePanel_Errors.jsx
//
var React = require('react');

var reactComponentBindingFilterFactory = require('../binding-factory');

var factoryResponse = reactComponentBindingFilterFactory.create({
  id: "oHH8k_WYQrKE4eoeaT_C5g",
  name: "RUXBase_PagePanel_Errors",
  description: "<RUXBase_PagePanel_Errors/> React Component Binding",
  renderDataBindingSpec: {
    ____types: "jsObject",
    RUXBase_PagePanel_Errors: {
      ____types: "jsObject",
      renderOptions: {
        ____accept: "jsObject",
        ____defaultValue: {}
      }
    }
  },
  reactComponent: React.createClass({
    displayName: "RUXBase_PagePanel_Errors",
    componentWillReceiveProps: function componentWillReceiveProps(nextProps_) {
      var currentErrorCount = this.props.appStateContext.appDataStore.base.runtime.client.errors.length;
      var componentErrorCount = this.state.errorCount;

      if (componentErrorCount !== currentErrorCount) {
        this.setState({
          showDetails: true,
          errorCount: currentErrorCount
        });
      }
    },
    getInitialState: function getInitialState() {
      var initialErrorCount = this.props.appStateContext.appDataStore.base.runtime.client.errors.length;
      var initialShowDetails = initialErrorCount ? true : false; // If there are error(s) in the queued

      return {
        showDetails: initialShowDetails,
        errorCount: initialErrorCount
      };
    },
    onClickToggleDetails: function onClickToggleDetails() {
      this.setState({
        showDetails: !this.state.showDetails,
        errorCount: this.props.appStateContext.appDataStore.base.runtime.client.errors.length
      });
    },
    render: function render() {
      try {
        var makeKey = function makeKey() {
          return "RUXBase_PagePanel_Errors" + keyIndex++;
        };

        var self = this;
        var ComponentRouter = this.props.appStateContext.reactComponentRouter;
        var metadata = this.props.document.metadata;
        var theme = metadata.site.theme;
        var renderData = this.props.renderData['RUXBase_PagePanel_Errors'];
        var appData = this.props.appStateContext.appDataStore;
        var keyIndex = 0;
        var content = [];

        if (!this.state.showDetails) {
          content.push(React.createElement("div", {
            key: makeKey(),
            style: theme.base.RUXBase_PagePanel_Errors.closed.container
          }, React.createElement("img", {
            src: "/advertise/rainier/images/json-doc.svg",
            style: theme.base.RUXBase_PagePanel_Errors.closed.icon,
            onClick: this.onClickToggleDetails,
            title: "Show error console..."
          })));
        } else {
          content.push(React.createElement("div", {
            key: makeKey(),
            style: theme.base.RUXBase_PagePanel_Errors.closed.container
          }, React.createElement("img", {
            src: "/advertise/rainier/images/json-doc.svg",
            style: theme.base.RUXBase_PagePanel_Errors.closed.iconDisabled,
            onClick: this.onClickToggleDetails,
            title: "Hide error console..."
          })));
          var openPanelContent = [];
          openPanelContent.push(React.createElement("div", {
            key: makeKey(),
            style: theme.base.RUXBase_PagePanel_Errors.open.hideDetails,
            onClick: this.onClickToggleDetails,
            title: "Hide error console..."
          }, React.createElement("img", {
            src: "/advertise/rainier/images/json-doc.svg",
            style: theme.base.RUXBase_PagePanel_Errors.open.icon
          }), metadata.site.name, " Runtime Error Console"));
          var openPanelContentInner = [];
          openPanelContentInner.push(React.createElement("div", {
            key: makeKey(),
            style: theme.base.RUXBase_PagePanel_Errors.open.guidance
          }, React.createElement("p", null, "Errors reported here are ", React.createElement("strong", null, "fatal"), ", non-recoverable, errors typically caused by error(s) in new feature code...")));
          var errors = [];

          if (!appData.base.runtime.client.errors.length) {
            errors.push(React.createElement("p", {
              key: makeKey()
            }, "Error queue is empty."));
          } else {
            appData.base.runtime.client.errors.forEach(function (error_) {
              errors.push(React.createElement(ComponentRouter, _extends({
                key: makeKey()
              }, self.props, {
                renderData: error_
              })));
            });
          }

          openPanelContentInner.push(React.createElement("div", {
            key: makeKey(),
            style: theme.base.RUXBase_PagePanel_Errors.open.errorListContainer
          }, errors));
          openPanelContent.push(React.createElement("div", {
            key: makeKey(),
            style: theme.base.RUXBase_PagePanel_Errors.open.containerInner
          }, openPanelContentInner));
          content.push(React.createElement("div", {
            key: makeKey(),
            style: theme.base.RUXBase_PagePanel_Errors.open.container
          }, openPanelContent));
        }

        return React.createElement("div", null, content);
      } catch (exception_) {
        return React.createElement("div", null, "Fatal exception in <RUXBase_PagePanel_Errors/>: ", exception_.toString());
      }
    }
  })
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;