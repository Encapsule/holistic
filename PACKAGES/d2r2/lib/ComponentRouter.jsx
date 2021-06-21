"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

// sources/common/view/component-router/ComponentRouter.jsx
// Looking for this module inside a large webpack bundle? Search for "SmNzf5U0RXSSyXe06mTRCg".
var React = require("react");

var arccore = require("@encapsule/arccore");

module.exports = function (dataViewBindingDiscriminator_, dataViewBindingFilters_) {
  var ComponentRouter = /*#__PURE__*/function (_React$Component) {
    _inherits(ComponentRouter, _React$Component);

    var _super = _createSuper(ComponentRouter);

    function ComponentRouter(props_) {
      var _this;

      _classCallCheck(this, ComponentRouter);

      _this = _super.call(this, props_);
      _this.displayName = "ComponentRouter";
      return _this;
    } // constructor


    _createClass(ComponentRouter, [{
      key: "render",
      value: function render() {
        try {
          var self = this;
          var errors = [];
          var inBreakScope = false;

          while (!inBreakScope) {
            inBreakScope = true;
            var routingDataContext = {
              reactContext: this.props,
              renderData: this.props.renderData
            }; //////////////////////////////////////////////////////////////////////////
            // SELECT: Match the namespace:type-derived signature of routingDataContext.renderData to 1:N registered React component data binding filters.

            var discriminatorResponse = dataViewBindingDiscriminator_.request(routingDataContext);

            if (discriminatorResponse.error) {
              errors.push("Failed to find a suitable d2r2 component based on type signature analysis of this.props.renderData. Check your d2r2 component registrations and d2r2 renderData request signature.");
              break;
            }

            var targetViewBindingFilter = discriminatorResponse.result; //////////////////////////////////////////////////////////////////////////
            // DISPATCH: Call the React component data binding filter to generate an instance of its encapsulated React component that is bound to this input data.

            var targetFilterResponse = targetViewBindingFilter.request(routingDataContext);

            if (targetFilterResponse.error) {
              errors.push("The selected d2r2 component failed during delegation:");
              errors.push(targetFilterResponse.error);
              break;
            }

            return targetFilterResponse.result;
            break;
          } // end while


          var errorMessage = errors.join(" "); //////////////////////////////////////////////////////////////////////////
          // ERROR: The input data does not have an acceptable namespace:type format.

          console.error("!!!!! -b8oizqHS3iz_57Q6Ci4TA <ComponentRouter/> ERROR: " + errorMessage);
          console.log(this.props ? this.props.renderData : "RENDER DATA IS UNDEFINED?!");
          console.warn("^--- this is the rejected this.props.renderData"); // Pre-render a JSON-format copy of the specific `this.props.renderData` we cannot identify. Note that we only print out this.props.renderData because typically this all that matters to developers.

          var renderDataJSON = this.props.renderData === undefined ? "this.props.renderData === undefined" : "this.props.renderData === \"".concat(JSON.stringify({
            renderData: this.props.renderData
          }, undefined, 4), "\"");
          return /*#__PURE__*/React.createElement("div", {
            style: {
              backgroundColor: "red",
              fontFamily: "Play",
              padding: "1em",
              overflow: "auto"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              fontSize: "largest",
              fontWeight: "bold"
            }
          }, "<ComponentRouter/> Error"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", null, "<ComponentRouter/> cannot render ", /*#__PURE__*/React.createElement("code", null, "this.props.renderData"), " due to delegation errror.", /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
            style: {
              marginTop: "1em",
              marginBottom: "1em"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              fontFamily: "monospace",
              padding: "1em",
              backgroundColor: "rgba(255,255,255,0.4)",
              overflow: "auto"
            }
          }, renderDataJSON)), /*#__PURE__*/React.createElement("div", {
            style: {
              marginTop: "1em",
              marginBottom: "1em"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              fontFamily: "monospace",
              padding: "1em",
              backgroundColor: "rgba(255,255,255,0.4)",
              overflow: "auto"
            }
          }, "response.error === \"".concat(errorMessage, "\""))));
        } catch (exception_) {
          return /*#__PURE__*/React.createElement("div", {
            style: {
              backgroundColor: "#FFCC00",
              fontFamily: "Play",
              padding: "1em",
              overflow: "auto"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              fontSize: "largest",
              fontWeight: "bold"
            }
          }, "<ComponentRouter/> INTERNAL ERROR"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", null, "Unfortunately, there has been an internal error inside the <ComponentRouter> error handling logic that is preventing us from correctly displaying the our standard error and diagnostic view."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
            style: {
              marginTop: "1em",
              marginBottom: "1em"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              fontFamily: "monospace",
              whiteSpace: "pre",
              padding: "1em",
              backgroundColor: "rgba(255,255,255,0.4)"
            }
          }, exception_.stack)));
        } // end catch

      } // end method render

    }]);

    return ComponentRouter;
  }(React.Component); // Return the React.Component-derived ComponentRouter class that's specialized for this applicaiton's registered DataRoutableComponent definitions.


  return ComponentRouter;
}; // end module.exports = function(dataViewBindingDiscriminator_, dataViewBindingFilters_)