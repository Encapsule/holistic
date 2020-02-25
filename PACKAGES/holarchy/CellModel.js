"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// CellModel.js
var arccore = require("@encapsule/arccore");

var constructorFilter = require("./lib/filters/cm-method-constructor-filter");

module.exports =
/*#__PURE__*/
function () {
  function CellModel(request_) {
    _classCallCheck(this, CellModel);

    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true; // Allocate private per-class-instance state.

      this._private = {
        constructorError: null
      };
      this.vdid = null;
      this.isValid = this.isValid.bind(this);
      this.toJSON = this.toJSON.bind(this);
      this.getID = this.getID.bind(this);
      this.getVDID = this.getVDID.bind(this);
      this.getName = this.getName.bind(this);
      this.getDescription = this.getDescription.bind(this);
      this.getOPCConfig = this.getOPCConfig.bind(this); // These are primarily for support of low-level holodeck test harnesses.

      this.getArtifact = this.getArtifact.bind(this);
      this.getCMConfig = this.getCMConfig.bind(this);
      var filterResponse = void 0; // If the caller didn't pass an object, just pass it through to the constructor filter which will fail w/correct error message.

      if (!request_ || Object.prototype.toString.call(request_) !== "[object Object]") {
        filterResponse = constructorFilter.request(request_);
      } else {
        filterResponse = constructorFilter.request(_objectSpread({
          CellModel: CellModel,
          CellModelInstance: this
        }, request_));
      }

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        break;
      }

      this._private = filterResponse.result;
      break;
    }

    if (errors.length) {
      errors.unshift("CellModel::constructor for [".concat(request_ && request_.id ? request_.id : "unspecified", "::").concat(request_ && request_.name ? request_.name : "unspecified", "] failed yielding a zombie instance."));
      this._private.constructorError = errors.join(" ");
    }
  } // Returns a Boolean


  _createClass(CellModel, [{
    key: "isValid",
    value: function isValid() {
      return !this._private.constructorError;
    } // If isValid then serializable object. Otherwise, constructor error string.

  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.isValid() ? this._private : this._private.constructorError;
    } // If isValid() then IRUT string. Otherwise, constructor error string.

  }, {
    key: "getID",
    value: function getID() {
      return this.isValid() ? this._private.id : this.toJSON();
    } // Always returns an IRUT string. Should not be used if !isValid().

  }, {
    key: "getVDID",
    value: function getVDID() {
      if (!this.vdid) {
        this.vdid = arccore.identifier.irut.fromReference(this._private).result;
      }

      return this.vdid;
    } // If isValid() then name string returned. Otherwise, constructor error string.

  }, {
    key: "getName",
    value: function getName() {
      return this.isValid() ? this._private.name : this.toJSON();
    } // If isValid() then descriptor string returned. Otherwise, constructor error string.

  }, {
    key: "getDescription",
    value: function getDescription() {
      return this.isValid() ? this._private.description : this.toJSON();
    } // Returns a filter response object.

  }, {
    key: "getOPCConfig",
    value: function getOPCConfig() {
      var _this = this;

      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;

        if (!this.isValid()) {
          errors.push(this.toJSON());
          break;
        }

        response.result = {};
        response.result.apm = this._private.digraph.outEdges("INDEX_APM").map(function (edge_) {
          return _this._private.digraph.getVertexProperty(edge_.v).artifact;
        });
        response.result.top = this._private.digraph.outEdges("INDEX_TOP").map(function (edge_) {
          return _this._private.digraph.getVertexProperty(edge_.v).artifact;
        });
        response.result.act = this._private.digraph.outEdges("INDEX_ACT").map(function (edge_) {
          return _this._private.digraph.getVertexProperty(edge_.v).artifact;
        });
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    } // getOPCConfig
    // Returns a filter response object.

  }, {
    key: "getArtifact",
    value: function getArtifact(request_) {
      // request = { id: optional, type: optional }
      // TODO: Turn this into a method filter
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;

        if (!this.isValid()) {
          errors.push(this.toJSON());
          break;
        }

        if (!request_.type) {
          request_.type = "CM";
        }

        if (request_.type === "CM" && (!request_.id || request_.id === this._private.id)) {
          response.result = this;
          break;
        }

        if (!this._private.digraph.isVertex(request_.id)) {
          errors.push("Unknown ".concat(request_.type, " id='").concat(request_.id, "'. No artifact found."));
          break;
        }

        var props = this._private.digraph.getVertexProperty(request_.id);

        if (props.type !== request_.type) {
          errors.push("Invalid id='".concat(request_.id, "' for type ").concat(request_.type, ". This ID is registered to a ").concat(props.type, " artifact, not a ").concat(request_.type, "."));
          break;
        }

        response.result = props.artifact;
        break;
      }

      if (errors.length) {
        errors.unshift("CellModel::getArtifact method error:");
        response.error = errors.join(" ");
      }

      return response;
    } // getArtifact
    // Returns a filter response object.

  }, {
    key: "getCMConfig",
    value: function getCMConfig(request_) {
      var _this2 = this;

      // request = { id: optional CM ID, configType: optional }
      // TODO: Turn this into a method filter.
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      var _loop = function _loop() {
        inBreakScope = true;

        if (!_this2.isValid()) {
          errors.push(_this2.toJSON());
          return "break";
        }

        if (!request_) {
          request_ = {};
        }

        var innerResponse = _this2.getArtifact({
          id: request_.id,
          type: "CM"
        });

        if (innerResponse.error) {
          errors.push(innerResponse.error);
          return "break";
        }

        var artifact = innerResponse.result;

        switch (request_.type) {
          case undefined:
          case "CM":
            response.result = {};

            var _innerResponse = _this2.getCMConfig({
              type: "APM"
            });

            if (_innerResponse.error) {
              errors.push(_innerResponse.error);
              break;
            }

            response.result.apm = _innerResponse.result;
            _innerResponse = _this2.getCMConfig({
              type: "TOP"
            });

            if (_innerResponse.error) {
              errors.push(_innerResponse.error);
              break;
            }

            response.result.top = _innerResponse.result;
            _innerResponse = _this2.getCMConfig({
              type: "ACT"
            });

            if (_innerResponse.error) {
              errors.push(_innerResponse.error);
              break;
            }

            response.result.act = _innerResponse.result;
            break;

          case "SCM":
            var context = {
              refStack: [],
              result: {}
            };
            arccore.graph.directed.depthFirstTraverse({
              digraph: artifact._private.digraph,
              context: context,
              options: {
                startVector: ["INDEX_CM"]
              },
              visitor: {
                getEdgeWeight: function getEdgeWeight(request_) {
                  var props = request_.g.getVertexProperty(request_.e.u);
                  var edgeWeight = null;

                  switch (props.type) {
                    case "INDEX":
                      edgeWeight = "INDEX";
                      break;

                    case "APM":
                      edgeWeight = "0_".concat(props.artifact.getName());
                      break;

                    case "TOP":
                      edgeWeight = "1_".concat(props.artifact.getName());
                      break;

                    case "ACT":
                      edgeWeight = "2_".concat(props.artifact.getName());
                      break;

                    case "CM":
                      var _artifact = props.artifact ? props.artifact : _this2;

                      edgeWeight = "3_".concat(_artifact.getName());
                      break;
                  }

                  return edgeWeight;
                },
                compareEdgeWeights: function compareEdgeWeights(request_) {
                  return request_.a < request_.b ? -1 : request_.a > request_.b ? 1 : 0;
                },
                discoverVertex: function discoverVertex(request_) {
                  if (!request_.context.refStack.length) {
                    request_.context.refStack.push(request_.context.result);
                  }

                  var descriptor = request_.context.refStack[request_.context.refStack.length - 1][request_.u] = {};
                  var props = request_.g.getVertexProperty(request_.u);

                  switch (props.type) {
                    case "INDEX":
                      descriptor.type = props.type;
                      break;

                    default:
                      var _artifact2 = props.artifact ? props.artifact : _this2;

                      descriptor.id = _artifact2.getID();
                      descriptor.vdid = _artifact2.getVDID();
                      descriptor.name = _artifact2.getName();
                      descriptor.description = _artifact2.getDescription();
                      descriptor.type = props.type;
                      break;
                  }

                  request_.context.refStack.push(descriptor);
                  return true;
                },
                finishVertex: function finishVertex(request_) {
                  request_.context.refStack.pop();
                  return true;
                }
              }
            });
            response.result = context.result;
            break;

          case "APM":
          case "TOP":
          case "ACT":
            response.result = artifact._private.digraph.outEdges("INDEX_".concat(request_.type)).map(function (edge_) {
              return artifact._private.digraph.getVertexProperty(edge_.v).artifact;
            }).sort(function (a_, b_) {
              a_.getName() < b_.getName() ? -1 : a_.getName() > b_.getName() ? 1 : 0;
            });
            break;

          default:
            errors.push("Value of '".concat(request_.type, "' specified for ~.type is invalid. Must be undefined, CM, APM, TOP, or ACT."));
            break;
        }

        return "break";
      };

      while (!inBreakScope) {
        var _ret = _loop();

        if (_ret === "break") break;
      }

      if (errors.length) {
        errors.unshift("CellModel::getCMConfigAPM method error:");
        response.error = errors.join(" ");
      }

      return response;
    }
  }]);

  return CellModel;
}();