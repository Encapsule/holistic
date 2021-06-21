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

// HolisticHTML5Service_Loader.jsx
var d2r2 = require("@encapsule/d2r2");

var React = require("react");

var color = require("color");

var factoryResponse = d2r2.ComponentFactory.request({
  id: "jrxl_rGcQvKRCc0PpWqbtg",
  name: "HolisticHTML5Service_Loader",
  description: "Used to server render a generic HolisticHTML5Service loading page and perform dynamic updates during HolisticHTML5Service boot in the browser tab prior to dispatch of the service kernel's start lifecycle action.",
  renderDataBindingSpec: {
    ____types: "jsObject",
    HolisticHTML5Service_Loader: {
      ____types: "jsObject",
      authenticated: {
        ____types: "jsBoolean",
        ____defaultValue: false
      },
      appStarted: {
        ____accept: "jsBoolean",
        ____defaultValue: false // false when rendered on the server. set to true when the HTML5 service kernel re-activates the display process in the browser tab

      },
      appBuild: {
        ____accept: "jsObject"
      },
      deploymentEnvironment: {
        ____accept: "jsString",
        ____inValueSet: ["development", "test", "staging", "production"]
      }
    }
  },
  reactComponent: /*#__PURE__*/function (_React$Component) {
    _inherits(HolisticHTML5Service_Loader, _React$Component);

    var _super = _createSuper(HolisticHTML5Service_Loader);

    function HolisticHTML5Service_Loader() {
      _classCallCheck(this, HolisticHTML5Service_Loader);

      return _super.apply(this, arguments);
    }

    _createClass(HolisticHTML5Service_Loader, [{
      key: "render",
      value: function render() {
        try {
          var makeKey = function makeKey() {
            return "HolisticHTML5Service_Loader".concat(key++);
          };

          var messageBody = this.props.renderData.HolisticHTML5Service_Loader;
          var key = 0;
          var content = [];
          var flexContent = [];
          var statusMessage = this.props.renderContext.serverRender ? "L O A D I N G" : !messageBody.appStarted ? "S T A R T I N G" : "W E L C O M E !";
          var backgroundColor = {
            development: "lightslategray",
            test: "palevioletred",
            staging: "yellowgreen",
            production: "skyblue"
          }[messageBody.deploymentEnvironment];
          var textColorMain = color(backgroundColor).darken(0.1).hex();
          var textColorMessage = "white";
          var textColorEnvironment = color(backgroundColor).darken(0.03).hex();
          var textColorVersion = color(backgroundColor).lighten(0.1).hex();
          var textColorVersionShadow = color(backgroundColor).darken(0.1).hex();
          flexContent.push( /*#__PURE__*/React.createElement("div", {
            key: makeKey(),
            style: {
              fontFamily: "Play",
              fontSize: "8vw",
              fontWeight: "bold",
              color: textColorMain,
              paddingBottom: "1.3vw"
            }
          }, messageBody.appBuild.app.name));

          if (this.props.renderContext.serverRender) {
            flexContent.push( /*#__PURE__*/React.createElement("div", {
              key: makeKey(),
              className: "spinner-fast"
            }));
          } else {
            if (!messageBody.appStarted) {
              // This occurs when the HTML5 service kernel tells the display adapter cell to hydrate the server-rendered-via-React contents of the DOM via ReactDOM.hydrate API.
              flexContent.push( /*#__PURE__*/React.createElement("div", {
                key: makeKey()
              }, /*#__PURE__*/React.createElement("div", {
                className: "spinner-fast"
              }, /*#__PURE__*/React.createElement("div", {
                className: "spinner-fast"
              }, /*#__PURE__*/React.createElement("div", {
                className: "spinner-fast"
              }, /*#__PURE__*/React.createElement("div", {
                className: "spinner-fast"
              }))))));
            } else {
              // This occurs when the HTML5 service kernel tells the display adapter cell to render the now re-activated HTML5 service display process.
              flexContent.push( /*#__PURE__*/React.createElement("div", {
                key: makeKey()
              }, /*#__PURE__*/React.createElement("div", {
                className: "spinner-triple"
              }, /*#__PURE__*/React.createElement("div", {
                className: "spinner-triple"
              }, /*#__PURE__*/React.createElement("div", {
                className: "spinner-triple"
              })))));
            }
          }

          flexContent.push( /*#__PURE__*/React.createElement("div", {
            key: makeKey(),
            style: {
              fontFamily: "Nunito",
              fontSize: "3vw",
              fontWeight: "bold",
              color: textColorMessage,
              textShadow: "0px 0px 0.5vw ".concat(color(backgroundColor).darken(0.25).hex())
            }
          }, statusMessage)); // Environment

          content.push( /*#__PURE__*/React.createElement("div", {
            key: makeKey(),
            style: {
              position: "fixed",
              top: "0px",
              left: "0px"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
              backgroundColor: backgroundColor
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              fontFamily: "Play",
              fontSize: "10vw",
              color: textColorEnvironment
            }
          }, /*#__PURE__*/React.createElement("strong", null, messageBody.deploymentEnvironment))))); // App name / message / spinner

          content.push( /*#__PURE__*/React.createElement("div", {
            key: makeKey(),
            style: {
              position: "fixed",
              top: "0px",
              left: "0px"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw"
            }
          }, flexContent))); // App version

          content.push( /*#__PURE__*/React.createElement("div", {
            key: makeKey(),
            style: {
              position: "fixed",
              top: "0px",
              left: "0px"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              height: "100vh",
              width: "100vw"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              fontFamily: "Play",
              fontSize: "2.5vw",
              color: textColorVersion,
              padding: "1vw",
              textShadow: "-1px -1px 0px ".concat(textColorVersionShadow)
            }
          }, /*#__PURE__*/React.createElement("strong", null, "@", messageBody.appBuild.app.author, "/", messageBody.appBuild.app.name, " v", messageBody.appBuild.app.version, "-", messageBody.appBuild.app.codename), /*#__PURE__*/React.createElement("br", null), messageBody.appBuild.app.buildSource, /*#__PURE__*/React.createElement("br", null), messageBody.appBuild.app.buildID)))); // Platform version

          content.push( /*#__PURE__*/React.createElement("div", {
            key: makeKey(),
            style: {
              position: "fixed",
              top: "0px",
              left: "0px"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              height: "100vh",
              width: "100vw",
              textAlign: "right"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              fontFamily: "Play",
              fontSize: "2.5vw",
              color: textColorVersion,
              padding: "1vw",
              textShadow: "-1px -1px 0px ".concat(textColorVersionShadow)
            }
          }, /*#__PURE__*/React.createElement("strong", null, "@", messageBody.appBuild.platform.app.author, "/", messageBody.appBuild.platform.app.name, " v", messageBody.appBuild.platform.app.version, "-", messageBody.appBuild.platform.app.codename), /*#__PURE__*/React.createElement("br", null), messageBody.appBuild.platform.app.buildSource, /*#__PURE__*/React.createElement("br", null), messageBody.appBuild.platform.app.buildID))));
          return /*#__PURE__*/React.createElement("div", {
            key: makeKey()
          }, content); // ================================================================
          // EXPERIMENTAL CODE (please keep).

          /* DISABLE FOR DEMO PURPOSES.
           if (messageBody.appStarted) {
               content.push(<div key={makeKey()} style={{ position: "absolute", top: "0px", left: "0px", padding: "1em", fontFamily: "monospace", overflow: "auto", height: "auto", width: "100%", backgroundColor: "skyblue", zIndex: -1 }}>
                            <h1>Hello, CellProcessor!</h1>
                            <h2>Cell Process Manaager Query</h2>
                            <pre style={{ width: "100%", height: "100%" }} >{JSON.stringify(this.props.renderContext.act({ actorName: "loadingApp", actionRequest: { CellProcessor: { cell: { query: {} } } } }), undefined, 4)}</pre>
                            <h2>App Metadata Queries</h2>
                            <pre style={{ width: "100%", height: "100%" }}>{JSON.stringify(this.props.renderContext.act({ actorName: "loadingApp", actionRequest: { holistic: { app: { metadata: { query: { type: "digraph" } } } } } }), undefined, 4)}</pre>
                             </div>
                           );
           }
           /*
            /*
              <div>S P I N N E R - E X A M P L E S</div>
             <div>spinner <div class="spinner"></div> </div>
             <div>spinner-dual <div class="spinner-dual"></div> </div>
             <div>spinner-fast <div class="spinner-fast"></div> </div>
             <div>spinner-tripple <div class="spinner-triple"></div> </div>
              <div>spinner-spinner-spinner
             <div class="spinner">
             <div class="spinner">
             <div class="spinner"></div>
             </div>
             </div>
             </div>
              <div>spinner-dual-spinner-dual
             <div class="spinner-dual">
             <div class="spinner-dual"></div>
             </div>
             </div>
              <div>spinner-fast-fast-fast-fast
             <div class="spinner-fast">
             <div class="spinner-fast">
             <div class="spinner-fast">
             <div class="spinner-fast"></div>
             </div>
             </div>
             </div>
             </div>
              <div>spinner-tripple-tripple-tripple
             <div class="spinner-triple">
             <div class="spinner-triple">
             <div class="spinner-triple"></div>
             </div>
             </div>
             </div>
           */

          /*
             // This is just some silliness that we'll remove later.
            const actResponse = this.props.renderContext.act({
            actorName: "loadingApp",
            actionRequest: { CellProcessor: { cell: { query: {} } } }
            });
             return (
            <div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div className="loaderRocket"></div>
              </div>
              <div style={{ position: "absolute", top: "0px", left: "0px", margin: "0px", padding: "16px" }}>
                <h1>Blah blah</h1>
                <p>Blah blah. Blah blah blah blah..</p>
                <pre>{JSON.stringify(actResponse, undefined, 4)}</pre>
              </div>
            </div>
            );
           */
        } catch (exception_) {
          return /*#__PURE__*/React.createElement("div", null, "Unhandled exception in HolisticHTML5Service_Loader React.Element: $", exception_.stack);
        } // end catch

      } // render

    }]);

    return HolisticHTML5Service_Loader;
  }(React.Component) // PageView_LoadingApp extends React.Component

});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;