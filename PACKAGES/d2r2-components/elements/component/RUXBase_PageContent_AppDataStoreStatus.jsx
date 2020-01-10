"use strict";

// SOURCES/common/view/elements/component/RUXBase_PageContent_AppDataStoreStatus.jsx
//
var React = require('react');

var reactComponentBindingFilterFactory = require('../binding-factory');

var factoryResponse = reactComponentBindingFilterFactory.create({
  id: "EqXm-855SGCqc-lQ5NccLQ",
  name: "RUXBase_PageContent_AppDataStoreStatus",
  description: "<RUXBase_PageContent_AppDataStoreStatus/> React component data binding filter.",
  renderDataBindingSpec: {
    ____types: "jsObject",
    RUXBase_PageContent_AppDataStoreStatus: {
      ____accept: "jsObject" // RUXBase_PageContent_AppDataStoreStatus

    }
  },
  reactComponent: React.createClass({
    displayName: "RUXBase_PageContent_AppDataStoreStatus",
    getInitialState: function getInitialState() {
      return {
        showRawResponse: false
      };
    },
    onClickToggleDetail: function onClickToggleDetail() {
      this.setState({
        showRawResponse: !this.state.showRawResponse
      });
    },
    render: function render() {
      try {
        var makeKey = function makeKey() {
          return "RUXBase_PageContent_AppDataStoreStatus" + keyIndex++;
        };

        var keyIndex = 0;
        var ComponentRouter = this.props.appStateContext.reactComponentRouter;
        var metadata = this.props.document.metadata;
        var theme = metadata.site.theme;
        var renderData = this.props.renderData['RUXBase_PageContent_AppDataStoreStatus'];
        var appDataStore = this.props.appStateContext.appDataStore;
        var content = [];
        content.push(React.createElement("h1", {
          key: makeKey()
        }, "Application Data Store Status"));
        content.push(React.createElement("pre", {
          key: makeKey(),
          style: theme.classPRE
        }, "appData.base.runtime.context ........................................................................", ' ', appDataStore.base.runtime.context, React.createElement("br", null), "appData.base.runtime.client.state ...................................................................", ' ', appDataStore.base.runtime.client.state, React.createElement("br", null), "appData.base.runtime.client.errors ..................................................................", ' ', appDataStore.base.runtime.client.errors.length, " (in queue)", React.createElement("br", null), "appData.base.runtime.client.subsystems.network.scoreboard ...........................................", ' ', Object.keys(appDataStore.base.runtime.client.subsystems.network.scoreboard).length, " (requests)", React.createElement("br", null), "appData.base.runtime.client.subsystems.authentication ...............................................", ' ', appDataStore.base.runtime.client.subsystems.authentication.state, React.createElement("br", null), "appData.base.runtime.client.subsystems.authorization ................................................", ' ', appDataStore.base.runtime.client.subsystems.authorization.state, React.createElement("br", null), "appData.base.runtime.client.subsystems.rainier.state ................................................", ' ', appDataStore.base.runtime.client.subsystems.rainier.state, React.createElement("br", null), "appData.base.runtime.client.subsystems.rainier.clientSession.state ..................................", ' ', appDataStore.base.runtime.client.subsystems.rainier.clientSession.state, React.createElement("br", null), "appData.base.runtime.client.subsystems.rainier.clientSession.data.advertisers.state .................", ' ', appDataStore.base.runtime.client.subsystems.rainier.clientSession.data.advertisers.state, React.createElement("br", null), "appData.base.runtime.client.subsystems.rainier.clientSession.data.availability.state ................", ' ', appDataStore.base.runtime.client.subsystems.rainier.clientSession.data.availability.state, React.createElement("br", null), "appData.base.runtime.client.subsystems.rainier.clientSession.data.queryDateRange.state ..............", ' ', appDataStore.base.runtime.client.subsystems.rainier.clientSession.data.queryDateRange.state, React.createElement("br", null), "appData.base.runtime.client.subsystems.rainier.clientSession.metadata ...............................", ' ', JSON.stringify(appDataStore.base.runtime.client.subsystems.rainier.clientSession.metadata), React.createElement("br", null)));
        return React.createElement("div", {
          style: theme.base.RUXBase_PageContent_AppDataStoreStatus.container
        }, content);
      } catch (exception_) {
        return React.createElement("div", null, "Fatal exception in <RUXBase_PageContent_AppDataStoreStatus/>: ", exception_.toString());
      }
    }
  })
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;