"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// display-stream-artifact-generator-filter.js
// OMG ... Sorry, this module is likely to melt your brain.
// It is very terse given lack of time. We will expand it later and write tests
// for all the little pieces and try to ensure that all the names and labels etc.
// all get documented clearly etc. Lots of work to change the entire manner in
// which we build distributed information systems...
(function () {
  var arccore = require("@encapsule/arccore");

  var holarchy = require("@encapsule/holarchy");

  var React = require("react");

  var d2r2 = require("@encapsule/d2r2");

  var cmtDisplayView = require("./"); // Currently, we're co-resident w/the DisplayView_T definition.


  var factoryResponse = arccore.filter.create({
    operationID: "A04R9PeERUatNtwHZ_cjkw",
    operationName: "DVVD Models Generator",
    operationDescription: "A filter that generates a DisplayView family CellModel (DV) and a ViewDisplay family d2r2Component (VD) as a matching pair using the specialization data you provide via request in-parameter.",
    inputFilterSpec: {
      ____label: "DVVD Models Generator Request",
      ____types: "jsObject",
      displayViewSynthesizeRequest: {
        ____label: "DisplayView_T::synthesizeCellModel Request",
        ____description: "The full request descriptor to be passed to DisplayView_T::synthesizeCellModel method.",
        ____accept: "jsObject" // We let DisplayView_T do the work of validating the contents of this namespace in the request.

      },
      reactComponentClass: {
        ____accept: "jsFunction" // This is a reference to class X's constructor function where X extends React.Component.

      }
    },
    outputFilterSpec: {
      ____types: "jsObject",
      CellModel: {
        ____accept: "jsObject"
      },
      // This will be a CellModel class instance or constructor function request object for the same.
      d2r2Component: {
        ____accept: "jsObject"
      } // This will be a d2r2Component (whatever they are --- I forget how we pass them around; I think just a specialized filter at this point?)

    },
    bodyFunction: function bodyFunction(request_) {
      var _this = this;

      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      var _loop = function _loop() {
        inBreakScope = true;
        console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
        console.log("[".concat(_this.operationID, "::").concat(_this.operationName, "] Synthesizing new DisplayView <- d2r2 -> ViewDisplay process bus (d2r2 Bus) transceiver artifacts for cellModelLabel=\"").concat(request_.displayViewSynthesizeRequest.cellModelLabel, "\"...")); // ****************************************************************
        // ****************************************************************
        // SYNTHESIZE A SPECIALIZED "DISPLAY VIEW" CellModel ARTIFACT
        // ****************************************************************
        // ****************************************************************
        // Part #1: Synthesize the CellModel constructor request descriptor.

        console.log("> Attempting to synthesize a specialized DisplayView CellModel for cellModelLabel=\"".concat(request_.displayViewSynthesizeRequest.cellModelLabel, "\"..."));
        var synthResponse = cmtDisplayView.synthesizeCellModel(request_.displayViewSynthesizeRequest);

        if (synthResponse.error) {
          errors.push("The actual call to DisplayView_T::synthesizeCellModel failed with error:");
          errors.push(synthResponse.error);
          return "break";
        }

        var cellModelConstructorRequest = synthResponse.result; // Part #2: Construct a new CellModel class instance using the synthesized constructor request.

        var cellModel = new holarchy.CellModel(cellModelConstructorRequest);

        if (!cellModel.isValid()) {
          errors.push("The CellModel::constructor request we received back from DisplayView_T::synthesizeCellModel is not a valid CellModel:");
          errors.push(cellModel.toJSON());
          return "break";
        }

        console.log("> DisplayView CellModel for cellModelLabel=\"".concat(request_.displayViewSynthesizeRequest.cellModelLabel, "\" synthesized!"));
        var apmIDDisplayView = cellModel.getAPM().getID(); // cellModelConstructorRequest.apm.ocdDataSpec.outputs.displayView.____appdsl.apm;
        // Must be kept in sync w/DVVD artifact generator. // ? Isn't this the artifact generator? I confuse myself here. // **** Check DisplayStreamMessage_T implementation re: this.renderData[X] OCD namespace details? I think this is what I was talking about here earlier.
        // I don't think this is perfect because I think you cannot go from this hex back to the IRUT due to IRUT performing char subst on base64. But, I do think it's idempotent and unique and that's likely good enough for our current use cases.

        var viewDisplayClassName = "".concat(request_.displayViewSynthesizeRequest.cellModelLabel, "_ViewDisplay_").concat(Buffer.from(apmIDDisplayView, "base64").toString("hex"));
        var displayLayoutNamespace = viewDisplayClassName;
        var renderDataSpec = {
          ____label: "".concat(request_.displayViewSynthesizeRequest.cellModelLabel, " Render Data Spec"),
          ____types: "jsObject"
        };
        renderDataSpec[displayLayoutNamespace] = _objectSpread(_objectSpread({}, request_.displayViewSynthesizeRequest.specializationData.displayElement.displayLayoutSpec), {}, {
          ____defaultValue: undefined
        }); // console.log(`RENDER DATA SPEC FOR NEW d2r2 COMPONENT = "${JSON.stringify(renderDataSpec, undefined, 4)}"`);

        var fascadeClass = void 0; // "creative" synthesis done below.

        (function () {
          // This is the short cellModelLabel used to synthesize the newly-synthesized DisplayView family CellModel.
          var friendlyClassMoniker = request_.displayViewSynthesizeRequest.cellModelLabel; // viewDisplayClassName;
          // ****************************************************************
          // ****************************************************************
          // SYNTHESIZE A SPECIALIZED "VIEW DISPLAY" d2r2Component ARTIFACT
          // ****************************************************************
          // ****************************************************************

          var ViewDisplayProcess = /*#__PURE__*/function (_request_$reactCompon) {
            _inherits(ViewDisplayProcess, _request_$reactCompon);

            var _super = _createSuper(ViewDisplayProcess);

            function ViewDisplayProcess(props_) {
              var _thisSuper, _thisSuper2, _this2;

              _classCallCheck(this, ViewDisplayProcess);

              console.log("ViewDisplayProcess::constructor on behalf of ".concat(viewDisplayClassName));
              _this2 = _super.call(this, props_);

              if (!_this2.displayName || Object.prototype.toString.call(_this2.displayName) !== "[object String]" || !_this2.displayName.length) {
                throw new Error("Please set 'this.displayName' to a non-zero-length string value in your \"".concat(friendlyClassMoniker, "::constructor\" function.")); // Because the base class constructs and starts its lifecycle before we gain control back from super(props_).
              }

              _this2.displayPath = _this2.props.renderContext.displayPath; // ? `${this.props.renderContext.displayPath}.${this.props.renderContext.displayInstance}`;

              _this2.xyzzy = "this is a test property"; // TRY - THE IMPLICATION OF THIS IS THAT WE CANNOT CONSTRUCT THIS D2R2 COMPONENT ON THE SERVER UNLESS/UNTIL WE ALSO SUPPORT SYMETRIC CELLPLANE CONFIG INSIDE NODEJS SERVICES.
              // For now this is not a large problem; what needs to be demonstrated and what needs to work 100% is HTML5 service support for advanced layout and display update. The whole
              // story will have to wait until there's time & resources to build a NodeJS service kernel that supports these + many other needed subservices for backend.

              console.log("ViewDisplayProcess::constructor attempting to register ViewDisplay instance w/backing DisplayView cell on behalf of ".concat(viewDisplayClassName));

              var actResponse = _this2.props.renderContext.act({
                actorName: _this2.displayName,
                actorTaskDescription: "This is new a new instance of React.Element ".concat(_this2.displayName, " process notifying its backing DisplayView cell that it has been mounted and is now activated."),
                actionRequest: {
                  holistic: {
                    common: {
                      actions: {
                        service: {
                          html5: {
                            display: {
                              view: {
                                linkDisplayProcess: {
                                  notifyEvent: _this2.props.renderContext.d2r2BusState === "dv-root-active-vd-root-pending" ? "vd-root-activated" : "vd-child-activated",
                                  reactElement: {
                                    displayName: _this2.displayName,
                                    displayPath: props_.renderContext.d2r2BusState === "dv-root-active-vd-root-pending" ? _this2.displayPath : props_.renderContext.displayPath,
                                    displayInstance: props_.renderContext.displayInstance,
                                    d2r2BusState: "ipc-link-pending",
                                    displayViewAPMID: props_.renderContext.displayViewAPMID,
                                    thisRef: _assertThisInitialized(_this2)
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                apmBindingPath: _this2.props.renderContext.apmBindingPath
              });

              try {
                if (_get((_thisSuper = _assertThisInitialized(_this2), _getPrototypeOf(ViewDisplayProcess.prototype)), "componentDidMount", _thisSuper)) {
                  _get((_thisSuper2 = _assertThisInitialized(_this2), _getPrototypeOf(ViewDisplayProcess.prototype)), "componentDidMount", _thisSuper2).call(_thisSuper2);
                }
              } catch (wtaf_) {
                console.warn(wtaf_.message);
                console.error(wtaf_.stack);
              } // ? Expect it to be fine for now as it's not being called yet.


              _this2.componentWillUnmount = _this2.componentWillUnmount.bind(_assertThisInitialized(_this2));
              _this2.mountSubViewDisplay = _this2.mountSubViewDisplay.bind(_assertThisInitialized(_this2));
              _this2.foo = _this2.foo.bind(_assertThisInitialized(_this2));
              return _this2;
            }

            _createClass(ViewDisplayProcess, [{
              key: "componentWillUnmount",
              value: function componentWillUnmount() {
                console.log("ViewDisplayProcess::componentWillUnmount on behalf of ".concat(viewDisplayClassName));
                var actResponse = this.props.renderContext.act({
                  actorName: this.displayName,
                  actorTaskDescription: "This is a previously-linked React.Element ".concat(this.displayName, " process notifying its backing DisplayView cell that is is going to unmount and deactivate."),
                  actionRequest: {
                    holistic: {
                      common: {
                        actions: {
                          service: {
                            html5: {
                              display: {
                                view: {
                                  linkDisplayProcess: {
                                    notifyEvent: "display-process-deactivating",
                                    reactElement: {
                                      displayName: this.displayName,
                                      thisRef: this
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  apmBindingPath: this.props.renderContext.apmBindingPath
                });

                try {
                  if (_get(_getPrototypeOf(ViewDisplayProcess.prototype), "componentWillUnmount", this)) {
                    _get(_getPrototypeOf(ViewDisplayProcess.prototype), "componentWillUnmount", this).call(this);
                  }
                } catch (wtaf_) {
                  console.warn(wtaf_.message);
                  console.error(wtaf_.stack);
                }
              }
            }, {
              key: "foo",
              value: function foo() {
                // This is an experiment to see if the class we extend w/the fascade can successfully resolve our methods in their render() implementation etc.
                return /*#__PURE__*/React.createElement("div", null, this.xyzzy);
              }
            }, {
              key: "mountSubViewDisplay",
              value: function mountSubViewDisplay(_ref) {
                var cmasScope = _ref.cmasScope,
                    displayViewCellModelLabel = _ref.displayViewCellModelLabel,
                    displayInstance = _ref.displayInstance,
                    displayLayout = _ref.displayLayout;
                var apmID_DisplayViewCell = request_.displayViewSynthesizeRequest.cmasScope.mapLabels({
                  APM: displayViewCellModelLabel
                }).result.APMID;
                var hexifiedAPMID = Buffer.from(apmID_DisplayViewCell, "base64").toString("hex");
                var layoutNamespace = "".concat(displayViewCellModelLabel, "_ViewDisplay_").concat(hexifiedAPMID);
                var renderData = {};
                renderData[layoutNamespace] = displayLayout;
                var ComponentRouter = this.props.renderContext.ComponentRouter;
                return /*#__PURE__*/React.createElement(ComponentRouter, _extends({}, this.props, {
                  renderContext: _objectSpread(_objectSpread({}, this.props.renderContext), {}, {
                    d2r2BusState: "vd-process-dynamic-mount",
                    displayPath: "".concat(this.displayPath, ".").concat(displayInstance),
                    // this.props.renderContext.displayPath,
                    displayInstance: displayInstance,
                    displayViewAPMID: apmID_DisplayViewCell
                  }),
                  renderData: renderData
                }));
              }
            }]);

            return ViewDisplayProcess;
          }(request_.reactComponentClass); // class DisplayProcess extends request_.reactComponentClass extends React.Component (presumably)
          // ****************************************************************
          // ****************************************************************
          // SYNTHESIZE THE DISPLAY PROCESS REACT.COMPONENT
          // ****************************************************************
          // ****************************************************************
          // WILL THIS WORK? :) MAGIC! (♥_♥)


          function makeFascadeClass(fascadeClassName_) {
            var fascadeClassConstructor = eval("(function() { return (class ".concat(fascadeClassName_, " extends ViewDisplayProcess {}); })();"));
            return fascadeClassConstructor;
          } // Syntheszie the fascade class.


          fascadeClass = makeFascadeClass(viewDisplayClassName);
        })(); // Now jam the synthesized fascade class into a a DisplayView cell process to ViewDisplay React.Element process transducer (aka d2r2Component ;)-~


        synthResponse = d2r2.ComponentFactory.request({
          id: request_.displayViewSynthesizeRequest.cmasScope.mapLabels({
            OTHER: "".concat(request_.displayViewSynthesizeRequest.cellModelLabel, "::ViewDisplay")
          }).result.OTHERID,
          name: "".concat(request_.displayViewSynthesizeRequest.cellModelLabel, " ViewDisplay Process"),
          description: "A filter that generates a React.Element instance created via React.createElement API from the reactComponentClass specified here bound to the request data.",
          renderDataBindingSpec: _objectSpread({}, renderDataSpec),
          reactComponent: fascadeClass // ᕕ( ᐛ )ᕗ

        });

        if (synthResponse.error) {
          errors.push("Oh snap. Things were going so well... Unfortunately, we cannot synthesize a d2r2 React.Element synthesizer filter (d2r2Component) due to error:");
          errors.push(synthResponse.error);
          return "break";
        }

        var d2r2Component = synthResponse.result;
        console.log("> Specialized ViewDisplay d2r2Component (React.Element factor filter) for cellModelLabel=\"".concat(request_.displayViewSynthesizeRequest.cellModelLabel, "\" synthesized!")); // And, we're good?

        response.result = {
          CellModel: cellModel,
          d2r2Component: d2r2Component
        };
        console.log("----------------------------------------------------------------");
        console.log("> NEW DVVD BUS ARTIFACTS for cellModelLabel=\"".concat(request_.displayViewSynthesizeRequest.cellModelLabel, "\":"));
        var displayViewAPMRef = response.result.CellModel.getAPM();
        console.log("[".concat(response.result.CellModel.getID(), "::").concat(response.result.CellModel.getName(), "] APM ID = \"").concat(response.result.CellModel.getAPM().getID(), "\""));
        console.log("response===");
        console.log(response);
        console.log("----------------------------------------------------------------");
        return "break";
      };

      while (!inBreakScope) {
        var _ret = _loop();

        if (_ret === "break") break;
      }

      if (errors.length) {
        errors.unshift("Unable to synthesize DisplayStream models due to fatal error:");
        response.error = errors.join(" ");
      }

      console.log("[".concat(this.operationID, "::").concat(this.operationName, "] DVVD Bus generator request for cellModelLabel=\"").concat(request_.displayViewSynthesizeRequest.cellModelLabel, "\" ").concat(response.error ? "FAILED WITH ERROR!" : "completed without errror", "."));
      console.log("////////////////////////////////////////////////////////////////");
      return response;
    }
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result; // @encapsule/arccore.filter object
})();