"use strict";

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
      this.mapLabels = this.mapLabels.bind(this);
      this.makeSubspaceInstance = this.makeSubspaceInstance.bind(this);
      this.getArtifactSpaceLabel = this.getArtifactSpaceLabel.bind(this);
    }

    _createClass(CellModelArtifactSpace, [{
      key: "isValid",
      value: function isValid() {
        return this._private.constructorError ? false : true;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return this.isValid() ? this._private : this._private.constructorError;
      }
    }, {
      key: "mapLabels",
      value: function mapLabels(request_) {
        return this.isValid() ? this._private.mapLabelsMethodFilter.request(request_) : {
          error: this.toJSON()
        };
      }
    }, {
      key: "makeSubspaceInstance",
      value: function makeSubspaceInstance(request_) {
        if (!this.isValid()) {
          return {
            error: this.toJSON()
          };
        }

        var filterResponse = this._private.makeSubspaceInstanceMethodFilter.request(request_);

        if (filterResponse.error) {
          return filterResponse;
        }

        return new CellModelArtifactSpace(filterResponse.result);
      }
    }, {
      key: "getArtifactSpaceLabel",
      value: function getArtifactSpaceLabel() {
        return this.isValid() ? this._private.artifactSpaceLabel : this._private.constructorError;
      }
    }]);

    return CellModelArtifactSpace;
  }();

  module.exports = CellModelArtifactSpace;
})();