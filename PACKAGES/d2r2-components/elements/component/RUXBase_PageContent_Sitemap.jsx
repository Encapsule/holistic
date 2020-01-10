"use strict";

////
//
// RUXBase_PageContent_Sitemap.jsx - renders a simple sitemap indicating the currently selected page
// if a route hash is specified via React props. This is a very simple example of accessing
// the application metadata store that is made available to server-side 'service' filter
// plug-ins, client-side application logic, and React components via this.props on both
// client and server.
//
var path = require('path');

var arccore = require('@encapsule/arccore');

var React = require('react');

var reactComponentBindingFilterFactory = require('../binding-factory');

var color = require('color'); // TODO OCT 2019 --- The primary value of keeping this around right now seems to be that it's
// a reasonable example of accessing the app metadata store.


var factoryResponse = reactComponentBindingFilterFactory.create({
  id: "_JY7rlS2R3u-oBHS8K-dCg",
  name: "<RUXBase_PageContent_Sitemap/>",
  description: "Data binding filter for <RUXBase_PageContent_Sitemap/> React component.",
  renderDataBindingSpec: {
    ____types: "jsObject",
    "RUXBase_PageContent_Sitemap": {
      ____accept: "jsObject"
    }
  },
  reactComponent: React.createClass({
    displayName: "RUXBase_PageContent_Sitemap",
    render: function render() {
      try {
        var makeKey = function makeKey() {
          return "RUXBase_PageContent_Sitemap" + keyIndex++;
        };

        var makeAbsoluteURI = function makeAbsoluteURI(uriSuffix_) {
          return path.join(deployConfig.appBasePath, uriSuffix_);
        };

        var self = this;
        var ComponentRouter = this.props.appStateContext.reactComponentRouter;
        var metadata = this.props.document.metadata;
        var theme = metadata.site.theme;
        var renderData = this.props.renderData['RUXBase_PageContent_Sitemap'];
        var keyIndex = 0;
        var appMetadataStore = this.props.appStateContext.appMetadataStore;
        var thisPageMetadata = this.props.document.metadata.page;
        var thisPageURI = thisPageMetadata.uri;
        var siteMetadata = appMetadataStore.getVertexProperty('__website');
        var deployConfig = siteMetadata.build.buildConfig.deployConfig;
        var totalPages = 0;

        var renderPageLinkAndDescription = function renderPageLinkAndDescription(pageURI_, numberX_, ofY_) {
          var pageMetadata = appMetadataStore.getVertexProperty(pageURI_);
          var x = 0;
          var y = pageMetadata.children.length;
          var childPageLinksAndDescriptions = [];
          pageMetadata.children.forEach(function (childPageURI_) {
            var childPageMetadata = appMetadataStore.getVertexProperty(childPageURI_);
            if (childPageMetadata.view_options.show_in_sitemap) childPageLinksAndDescriptions.push(React.createElement("span", {
              key: makeKey()
            }, renderPageLinkAndDescription(childPageURI_, x++, y)));
          });
          var marginTop = numberX_ ? '0.5em' : '0em';
          var marginLeft = pageMetadata.ts.d ? '1em' : '0em';
          var iconStyles = {
            position: 'relative',
            top: '-2px',
            width: '24px',
            height: '24px',
            verticalAlign: 'middle'
          };
          totalPages++;
          var descriptionStyles = {
            paddingTop: '0.0em'
          };
          var pageContainerStyles = arccore.util.clone(theme.base.RUXBase_PageContent_Sitemap.pageContainer);
          pageContainerStyles.marginTop = marginTop;
          pageContainerStyles.marginLeft = marginLeft;

          if (pageMetadata.children.length) {
            return React.createElement("div", {
              key: "Sitemap" + pageURI_,
              style: pageContainerStyles
            }, React.createElement("div", {
              style: {
                marginBottom: '0.75em'
              }
            }, React.createElement("span", {
              style: {
                verticalAlign: 'middle'
              }
            }, "-", ' ', React.createElement("a", {
              href: makeAbsoluteURI(pageURI_),
              title: pageMetadata.tooltip
            }, React.createElement("strong", null, pageMetadata.name), " - ", pageMetadata.description))), React.createElement("div", {
              style: descriptionStyles
            }, pageMetadata.pageDescription), childPageLinksAndDescriptions.length ? childPageLinksAndDescriptions : '');
          } else {
            return React.createElement("div", {
              key: "Sitemap" + pageURI_,
              style: pageContainerStyles
            }, React.createElement("div", null, React.createElement("span", {
              style: {
                verticalAlign: 'middle'
              }
            }, "\u2022", ' ', React.createElement("a", {
              href: makeAbsoluteURI(pageURI_),
              title: pageMetadata.tooltip
            }, React.createElement("strong", null, pageMetadata.name), " - ", pageMetadata.description))), React.createElement("div", {
              style: descriptionStyles
            }, pageMetadata.pageDescription));
          }
        };

        return React.createElement("div", {
          style: theme.base.RUXBase_PageContent_Sitemap.container
        }, renderPageLinkAndDescription('/', 0, 1));
      } catch (exception_) {
        return React.createElement("div", null, "Fatal exception in <RUXBase_PageContent_Sitemap>: + ", exception_.toString());
      }
    } // render()

  }) // React.createClass

}); // reactComponentBindingFilterFactory.create

if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;