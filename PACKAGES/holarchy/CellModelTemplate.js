"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// CellModelTemplate.js
(function () {
  var constructorFilter = require("./lib/filters/cmt-method-constructor-filter");

  var CellModelTemplate = /*#__PURE__*/function () {
    function CellModelTemplate(request_) {
      _classCallCheck(this, CellModelTemplate);

      var filterResponse = constructorFilter.request(request_);
      this._private = !filterResponse.error ? _objectSpread(_objectSpread({}, this._private), filterResponse.result) : {
        constructorError: filterResponse.error
      };
      this.isValid = this.isValid.bind(this);
      this.toJSON = this.toJSON.bind(this);
      this.synthesizeCellModel = this.synthesizeCellModel.bind(this);
    }

    _createClass(CellModelTemplate, [{
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
      key: "synthesizeCellModel",
      value: function synthesizeCellModel(request_) {
        return this.isValid() ? this._private.cellModelGeneratorFilter.request(_objectSpread(_objectSpread({}, request_), {}, {
          cmtClass: CellModelTemplate,
          cmtInstance: this
        })) : {
          error: this.toJSON()
        };
      }
    }]);

    return CellModelTemplate;
  }();

  module.exports = CellModelTemplate;
})();