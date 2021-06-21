"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// HolarchyArtifactSpaceMapper.js
//
(function () {
  var constructorFilter = require("./lib/filters/cmas-method-constructor-filter");

  var CellModelArtifactSpace = /*#__PURE__*/function () {
    function CellModelArtifactSpace(request_) {
      _classCallCheck(this, CellModelArtifactSpace);

      var filterResponse = constructorFilter.request(request_);
      this._private = !filterResponse.error ? filterResponse.result : {
        constructorError: filterResponse.error
      };
      this.isValid = this.isValid.bind(this);
      this.toJSON = this.toJSON.bind(this);
      this.getArtifactPath = this.getArtifactPath.bind(this);
      this.getArtifactSpaceID = this.getArtifactSpaceID.bind(this);
      this.mapLabels = this.mapLabels.bind(this);
      this.makeSubspaceInstance = this.makeSubspaceInstance.bind(this); // deprecate this.getArtifactSpaceLabel = this.getArtifactSpaceLabel.bind(this);
    } // Returns Boolean true/false


    _createClass(CellModelArtifactSpace, [{
      key: "isValid",
      value: function isValid() {
        return this._private.constructorError ? false : true;
      } // Mostly for testing.

    }, {
      key: "toJSON",
      value: function toJSON() {
        return this.isValid() ? {
          spaceLabel: this._private.spaceLabel,
          spaceID: this._private.spaceID
        } : this._private.constructorError;
      } // Returns a string (that might be a constructor error string)

    }, {
      key: "getArtifactPath",
      value: function getArtifactPath() {
        return this.isValid() ? this._private.spaceLabel : this._private.constructorError;
      } // Returns a string (that might be a constructor error string)

    }, {
      key: "getArtifactSpaceID",
      value: function getArtifactSpaceID() {
        return this.isValid() ? this._private.spaceID : this._private.constructorError;
      } // Returns a filter response.

    }, {
      key: "mapLabels",
      value: function mapLabels(request_) {
        return this.isValid() ? this._private.mapLabelsMethodFilter.request(_objectSpread(_objectSpread({}, request_), {}, {
          cmasInstance: this
        })) : {
          error: this.toJSON()
        };
      } // Returns a filter response.

    }, {
      key: "makeSubspaceInstance",
      value: function makeSubspaceInstance(request_) {
        if (!this.isValid()) {
          return {
            error: this.toJSON()
          };
        }

        var filterResponse = this._private.makeSubspaceInstanceMethodFilter.request(_objectSpread(_objectSpread({}, request_), {}, {
          cmasInstance: this
        }));

        if (filterResponse.error) {
          return filterResponse;
        } // v0.0.62-titanite --- This should be returning response.result


        var cmasInstance = new CellModelArtifactSpace(filterResponse.result);
        return cmasInstance.isValid() ? {
          error: null,
          result: cmasInstance
        } : {
          error: cmasInstance.toJSON()
        };
      } // deprecate?

      /*
      getArtifactSpaceLabel() {
          return (this.isValid()?this._private.artifactSpaceLabel:this._private.constructorError);
      }
      */

    }, {
      key: "spaceLabel",
      get: function get() {
        return this.isValid() ? this._private.spaceLabel : this._private.constructorError;
      }
    }]);

    return CellModelArtifactSpace;
  }();

  module.exports = CellModelArtifactSpace;
})();