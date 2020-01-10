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

// sources/common/view/component-router/ComponentRouter.jsx
// Looking for this module inside a large webpack bundle? Search for "SmNzf5U0RXSSyXe06mTRCg".
var React = require("react");

var arccore = require("@encapsule/arccore");

module.exports = function (dataViewBindingDiscriminator_, dataViewBindingFilters_) {
  var keyIndex = 500;

  function makeKey() {
    return "ComponentRouter" + keyIndex++;
  }

  var dataViewBindingDiscriminator = dataViewBindingDiscriminator_;
  var dataViewBindingFilters = dataViewBindingFilters_;
  var filterNameList = [];
  var filterNameMap = {};
  var filterIDMap = {};
  dataViewBindingFilters.forEach(function (dataViewBindingFilter_) {
    var filterName = dataViewBindingFilter_.filterDescriptor.operationID + '::' + dataViewBindingFilter_.filterDescriptor.operationName;
    filterNameList.push(filterName);
    filterNameMap[filterName] = dataViewBindingFilter_;
    filterIDMap[dataViewBindingFilter_.filterDescriptor.operationID] = dataViewBindingFilter_;
  });
  filterNameList.sort(function (a, b) {
    var aName = a.split('::')[1];
    var bName = b.split('::')[1];
    var disposition = aName > bName ? 1 : aName === bName ? 0 : -1;
    return disposition;
  });

  var ComponentRouter =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(ComponentRouter, _React$Component);

    function ComponentRouter(props_) {
      var _this;

      _classCallCheck(this, ComponentRouter);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ComponentRouter).call(this, props_));
      _this.state = {};
      _this.onToggleInspectViewBindingFilter = _this.onToggleInspectViewBindingFilter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onMouseOverBindingFilter = _this.onMouseOverBindingFilter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onMouseOutBindingFinder = _this.onMouseOutBindingFilter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    } // constructor


    _createClass(ComponentRouter, [{
      key: "onToggleInspectViewBindingFilter",
      value: function onToggleInspectViewBindingFilter(filterName_) {
        var state = this.state;
        if (!state[filterName_]) state[filterName_] = {};
        if (state[filterName_].inspect) delete state[filterName_].inspect;else state[filterName_].inspect = filterNameMap[filterName_];
        this.setState(state);
      }
    }, {
      key: "onMouseOverBindingFilter",
      value: function onMouseOverBindingFilter(filterName_) {
        var state = this.state;
        state.mouseOver = filterName_;
        this.setState(state);
      }
    }, {
      key: "onMouseOutBindingFilter",
      value: function onMouseOutBindingFilter(filterName_) {
        var state = this.state;
        delete state.mouseOver;
        this.setState(state);
      }
    }, {
      key: "render",
      value: function render() {
        try {
          var self = this;
          keyIndex = 0;
          var error = null;
          var routingDataContext = {
            reactContext: this.props,
            renderData: this.props.renderData
          }; //////////////////////////////////////////////////////////////////////////
          // SELECT: Match the namespace:type-derived signature of routingDataContext.renderData to 1:N registered React component data binding filters.

          var discriminatorResponse = dataViewBindingDiscriminator.request(routingDataContext);

          if (!discriminatorResponse.error) {
            var targetFilterID = discriminatorResponse.result;
            var targetViewBindingFilter = filterIDMap[targetFilterID];
            /*
            console.log([
                "..... <ComponentRouter/> dispatching to [",
                targetViewBindingFilter.filterDescriptor.operationID,
                "::",
                targetViewBindingFilter.filterDescriptor.operationName,
                "]"
            ].join(''));
            */
            //////////////////////////////////////////////////////////////////////////
            // DISPATCH: Call the React component data binding filter to generate an instance of its encapsulated React component that is bound to this input data.

            var targetFilterResponse = targetViewBindingFilter.request(routingDataContext);
            if (!targetFilterResponse.error) // Data-bound React component produced by calling the selected React component data binding filter.
              return targetFilterResponse.result;else // ARCcore.discriminator rejects requests that it can not plausibly match to 1:N registered filters
              // while simultaneously eliminating the other N-1 filters. But, it does this by performing as few
              // operations as possible. This means that the selected filter is selected because all the others
              // will definitely reject this request. And, as it turns out it doesn't much like this request.
              error = targetFilterResponse.error;
          } else {
            error = discriminatorResponse.error;
          } //////////////////////////////////////////////////////////////////////////
          // ERROR: The input data does not have an acceptable namespace:type format.


          console.error("!!!!! <ComponentRouter/> ERROR: " + error);
          var theme = this.props.document.metadata.site.theme; // Pre-render a JSON-format copy of the specific `this.props.renderData` we cannot identify.

          var renderDataJSON = this.props.renderData === undefined ? React.createElement("span", {
            key: makeKey()
          }, "undefined") : React.createElement("span", {
            key: makeKey()
          }, "'", JSON.stringify(this.props.renderData, undefined, 4), "'");
          var supportedFilterListItems = [];
          filterNameList.forEach(function (filterName_) {
            var filterName = filterName_;
            var listItemContent = [];

            var clickHandler = function clickHandler() {
              self.onToggleInspectViewBindingFilter(filterName);
            };

            var onMouseOverHandler = function onMouseOverHandler() {
              self.onMouseOverBindingFilter(filterName);
            };

            var onMouseOutHandler = function onMouseOutHandler() {
              self.onMouseOutBindingFilter(filterName);
            };

            var filterNameStyles = {};

            if (self.state.mouseOver === filterName) {
              filterNameStyles = arccore.util.clone(theme.ComponentRouterError.filterListItemMouseOver);
            } else {
              if (self.state[filterName_] && self.state[filterName_].inspect) {
                filterNameStyles = arccore.util.clone(theme.ComponentRouterError.filterListItemInspect);
              } else {
                filterNameStyles = arccore.util.clone(theme.ComponentRouterError.filterListItem);
              }
            }

            if (!self.state[filterName_] || !self.state[filterName_].inspect) {
              filterNameStyles.cursor = 'zoom-in';
              listItemContent.push(React.createElement("span", {
                key: makeKey(),
                style: filterNameStyles,
                onClick: clickHandler,
                onMouseOver: onMouseOverHandler,
                onMouseOut: onMouseOutHandler
              }, "[", filterName_, "]"));
            } else {
              filterNameStyles.cursor = 'zoom-out';
              listItemContent.push(React.createElement("span", {
                key: makeKey()
              }, React.createElement("span", {
                style: filterNameStyles,
                onClick: clickHandler,
                onMouseOver: onMouseOverHandler,
                onMouseOut: onMouseOutHandler
              }, "[", filterName_, "]"), React.createElement("br", null), React.createElement("br", null), React.createElement("pre", {
                style: theme.classPRE,
                onMouseOver: onMouseOutHandler,
                onMouseOut: onMouseOutHandler
              }, JSON.stringify(filterNameMap[filterName_], undefined, 4)), React.createElement("br", null)));
            }

            supportedFilterListItems.push(React.createElement("li", {
              key: makeKey()
            }, listItemContent));
          });
          return React.createElement("div", {
            style: theme.ComponentRouterError.container
          }, React.createElement("h1", null, "<ComponentRouter/> Error"), React.createElement("p", null, "<ComponentRouter/> cannot render the value of ", React.createElement("code", null, "this.props.renderData"), " it received because its", ' ', React.createElement("strong", null, "namespace::type"), "-derived data signature does not meet the input filter specification criteria of any of the React", ' ', "component data binding filters registered by this application."), React.createElement("h2", null, "Unrecognized this.props.renderData (JSON):"), React.createElement("pre", {
            style: theme.classPRE
          }, "this.props.renderData === ", renderDataJSON), React.createElement("h2", null, "Underlying ARCcore.discriminator Error"), React.createElement("pre", {
            style: theme.classPRE
          }, error), React.createElement("h2", null, "Registered React Components:"), React.createElement("p", null, "To correct this problem, please ensure that the value passed to <ComponentRouter/> via its ", React.createElement("code", null, "renderData"), " property has", ' ', "a ", React.createElement("strong", null, "namespace::type"), "-derived signature accepted by one of the following data-bound React components:"), React.createElement("ol", {
            style: theme.ComponentRouterError.filterList
          }, supportedFilterListItems));
        } catch (exception_) {
          var _theme = this.props.document.metadata.site.theme; // .ComponentRouterError.container;

          return React.createElement("div", {
            style: _theme.ComponentRouterError.container
          }, React.createElement("h1", null, "<ComponentRouter/> INTERNAL ERROR"), React.createElement("p", null, "Unfortunately, there has been an internal error inside the <ComponentRouter> error handling logic that is preventing us from correctly displaying the our standard error and diagnostic view."), React.createElement("pre", {
            style: _theme.classPRE
          }, exception_.stack));
        } // end catch

      } // end method render

    }]);

    return ComponentRouter;
  }(React.Component); // Return the React.Component-derived ComponentRouter class that's specialized for this applicaiton's registered DataRoutableComponent definitions.


  return ComponentRouter;
}; // end module.exports = function(dataViewBindingDiscriminator_, dataViewBindingFilters_)