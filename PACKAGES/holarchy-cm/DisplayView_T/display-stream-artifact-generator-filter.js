"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// display-stream-artifact-generator-filter.js
// OMG ... this module ...
(function () {
  var arccore = require("@encapsule/arccore");

  var holarchy = require("@encapsule/holarchy");

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
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      var _loop = function _loop() {
        inBreakScope = true;
        var synthResponse = cmtDisplayView.synthesizeCellModel(request_.displayViewSynthesizeRequest); // Just the request in and see what happens.

        if (synthResponse.error) {
          errors.push("The actual call to DisplayView_T::synthesizeCellModel failed with error:");
          errors.push(synthResponse.error);
          return "break";
        }

        var cellModelConstructorRequest = synthResponse.result;
        var cellModel = new holarchy.CellModel(cellModelConstructorRequest);

        if (!cellModel.isValid()) {
          errors.push("The CellModel::constructor request we received back from DisplayView_T::synthesizeCellModel is DOA due to error:");
          errors.push(cellModel.toJSON());
          return "break";
        }

        var apmID = cellModelConstructorRequest.apm.ocdDataSpec.outputs.displayView.____appdsl.apm; // Must be kept in sync w/VDDV artifact generator.

        var viewDisplayClassName = "".concat(request_.displayViewSynthesizeRequest.cellModelLabel, "_ViewDisplay_").concat(Buffer.from(apmID, "base64").toString("hex"));
        var displayLayoutNamespace = viewDisplayClassName;
        var renderDataSpec = {
          ____label: "".concat(request_.displayViewSynthesizeRequest.cellModelLabel, " Render Data Spec"),
          ____types: "jsObject"
        };
        renderDataSpec[displayLayoutNamespace] = _objectSpread(_objectSpread({}, request_.displayViewSynthesizeRequest.specializationData.displayElement.displayLayoutSpec), {}, {
          ____defaultValue: undefined
        });
        console.log("RENDER DATA SPEC FOR NEW d2r2 COMPONENT = \"".concat(JSON.stringify(renderDataSpec, undefined, 4), "\"")); // ****************************************************************
        // ****************************************************************
        // SYNTHESIZE THE DISPLAY PROCESS REACT.COMPONENT
        // ****************************************************************
        // ****************************************************************

        var ViewDisplayProcess = /*#__PURE__*/function (_request_$reactCompon) {
          _inherits(ViewDisplayProcess, _request_$reactCompon);

          var _super = _createSuper(ViewDisplayProcess);

          function ViewDisplayProcess(props_) {
            var _this;

            _classCallCheck(this, ViewDisplayProcess);

            console.log("ViewDisplayProcess::constructor on behalf of ".concat(viewDisplayClassName));
            _this = _super.call(this, props_);
            _this.displayName = viewDisplayClassName;
            return _this;
          }

          _createClass(ViewDisplayProcess, [{
            key: "componentDidMount",
            value: function componentDidMount() {
              console.log("ViewDisplayProcess::componentDidMount on behalf of ".concat(viewDisplayClassName));
              var actResponse = this.props.renderContext.act({
                actorName: this.displayName,
                actorTaskDescription: "This is new a new instance of React.Element ".concat(this.displayName, " process notifying its backing DisplayView cell that it has been mounted and is now activated."),
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
                if (_get(_getPrototypeOf(ViewDisplayProcess.prototype), "componentDidMount", this)) {
                  _get(_getPrototypeOf(ViewDisplayProcess.prototype), "componentDidMount", this).call(this);
                }
              } catch (wtaf_) {
                console.warn(wtaf_.message);
                console.error(wtaf_.stack);
              }
            }
          }, {
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
          }]);

          return ViewDisplayProcess;
        }(request_.reactComponentClass); // class DisplayProcess extends request_.reactComponentClass extends React.Component (presumably)
        // ****************************************************************
        // ****************************************************************
        // SYNTHESIZE THE DISPLAY PROCESS REACT.COMPONENT
        // ****************************************************************
        // ****************************************************************
        // WILL THIS WORK? :) MAGIC! (♥_♥)


        function makeMagicClass(magicClassName_) {
          var classConstructor = eval("(function() { return (class ".concat(magicClassName_, " extends ViewDisplayProcess {}); })();"));
          return classConstructor;
        } // Now jam the synthesized class into a d2r2-generated filter that accepts data according to renderSpec and returns a bound React.Element via its response.result.
        // This is what we call a d2r2Component for lack a better short-hand for refering to it. In reality it's a data-to-display process transducer function (w/data filtering).


        var magicClass = makeMagicClass(viewDisplayClassName);
        synthResponse = d2r2.ComponentFactory.request({
          id: cmtDisplayView.mapLabels({
            OTHER: "".concat(cellModelConstructorRequest.id, ":d2r2Component")
          }).result.OTHERID,
          name: "".concat(request_.displayViewSynthesizeRequest.cellModelLabel, " Display Process"),
          description: "A filter that generates a React.Element instance created via React.createElement API from the reactComponentClass specified here bound to the request data.",
          renderDataBindingSpec: _objectSpread({}, renderDataSpec),
          reactComponent: magicClass // `${request_.displayViewSynthesizeRequest.cellModelLabel}_ViewDisplay_${apmID}`) // ᕕ( ᐛ )ᕗ

        });

        if (synthResponse.error) {
          errors.push("Oh snap. Things were going so well... Unfortunately, we cannot synthesize a d2r2 React.Element synthesizer filter (d2r2Component) due to error:");
          errors.push(synthResponse.error);
          return "break";
        }

        var d2r2Component = synthResponse.result;
        console.log("RESULT d2r2 COMPONENT:");
        console.log(d2r2Component); // And, we're good?

        response.result = {
          CellModel: cellModel,
          d2r2Component: d2r2Component
        };
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

      return response;
    }
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result; // @encapsule/arccore.filter object
})();