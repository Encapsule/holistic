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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// display-stream-artifact-generator-filter.js
// OMG ... this module ... IS NAMED POORLY
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
        console.log("[".concat(_this.operationID, "::").concat(_this.operationName, "] Building a new DisplayView <-> ViewDisplay process bus (DVVD Bus) cellModelLabel=\"").concat(request_.displayViewSynthesizeRequest.cellModelLabel, "\"...")); // ****************************************************************
        // ****************************************************************
        // SYNTHESIZE A SPECIALIZED "DISPLAY VIEW" CellModel ARTIFACT
        // ****************************************************************
        // ****************************************************************

        console.log("> Attempting to synthesize a specialized DisplayView CellModel for cellModelLabel=\"".concat(request_.displayViewSynthesizeRequest.cellModelLabel, "\"..."));
        var synthResponse = cmtDisplayView.synthesizeCellModel(request_.displayViewSynthesizeRequest); // Just the request in and see what happens.

        if (synthResponse.error) {
          errors.push("The actual call to DisplayView_T::synthesizeCellModel failed with error:");
          errors.push(synthResponse.error);
          return "break";
        }

        var cellModelConstructorRequest = synthResponse.result;
        var cellModel = new holarchy.CellModel(cellModelConstructorRequest);

        if (!cellModel.isValid()) {
          errors.push("The CellModel::constructor request we received back from DisplayView_T::synthesizeCellModel is not a valid CellModel:");
          errors.push(cellModel.toJSON());
          return "break";
        }

        console.log("> DisplayView CellModel for cellModelLabel=\"".concat(request_.displayViewSynthesizeRequest.cellModelLabel, "\" synthesized!")); // This is the ID of of the newly-synthesized DisplayView family CellModel's APM.

        var apmID = cellModelConstructorRequest.apm.ocdDataSpec.outputs.displayView.____appdsl.apm; // Must be kept in sync w/DVVD artifact generator.

        var viewDisplayClassName = "".concat(request_.displayViewSynthesizeRequest.cellModelLabel, "_ViewDisplay_").concat(Buffer.from(apmID, "base64").toString("hex"));
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

              if (!_this2.displayName) {
                throw new Error("Um, yea. We're going to have to have you go ahead and get your class \"".concat(friendlyClassMoniker, "\" that extends React.Component to define a constructor function, and then assign this.displayName in the body of that constructor function so that \"").concat(viewDisplayClassName, "\" that extends your \"").concat(friendlyClassMoniker, "\" class can correctly deduce where it is in the display tree when it's time to link to its backing DisplayView cell process. Thanks."));
              }

              _this2.displayPath = "".concat(props_.renderContext.displayPath, ".").concat(_this2.displayName); // TRY

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
                                  notifyEvent: "display-process-activated",
                                  reactElement: {
                                    displayName: _this2.displayName,
                                    displayPath: _this2.displayPath,
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
              _this2.foo = _this2.foo.bind(_assertThisInitialized(_this2));
              return _this2;
            }
            /*
            componentDidMount() {
                 console.log(`ViewDisplayProcess::componentDidMount on behalf of ${viewDisplayClassName}`);
                let actResponse = this.props.renderContext.act({
                    actorName: this.displayName,
                    actorTaskDescription: `This is new a new instance of React.Element ${this.displayName} process notifying its backing DisplayView cell that it has been mounted and is now activated.`,
                    actionRequest: { holistic: { common: { actions: { service: { html5: { display: { view: { linkDisplayProcess: { notifyEvent: "display-process-activated", reactElement: { displayName: this.displayName, displayPath: this.displayPath, thisRef: this } } } } } } } } } },
                    apmBindingPath: this.props.renderContext.apmBindingPath
                });
                try {
                    if (super.componentDidMount) {
                        super.componentDidMount();
                    }
                } catch (wtaf_) {
                    console.warn(wtaf_.message);
                    console.error(wtaf_.stack);
                }
             }
            */


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
                console.log("Hello, foo here!");
                return /*#__PURE__*/React.createElement("div", null, "FOO");
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
          id: cmtDisplayView.mapLabels({
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