"use strict";

// sources/common/view/elements/page/RUX_PageContent.jsx
//
var reactComponentBindingFilterFactory = require('../binding-factory');

var React = require('react');

var factoryResponse = reactComponentBindingFilterFactory.create({
  id: "aEV3VWjNS_60Xb_q33o-kA",
  name: "<RUXBase_PageContent/>",
  description: "<RUXBase_PageContent/> React component data binding filter.",
  renderDataBindingSpec: {
    ____types: "jsObject",
    RUXBase_PageContent: {
      ____accept: "jsObject"
    }
  },
  reactComponent: React.createClass({
    displayName: "RUXBase_PageContent",
    render: function render() {
      var metadata = this.props.document.metadata;
      var theme = metadata.site.theme;
      return React.createElement("div", {
        style: theme.base.RUXBase_PageContent.container
      }, React.createElement("h1", null, "<RUXBase_PageContent/>"), React.createElement("h2", null, "<RUXBase_Page/> found no content to render."), React.createElement("h3", null, React.createElement("code", null, "RUXBase_Page.pageContentEP === undefined")));
    }
  })
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;