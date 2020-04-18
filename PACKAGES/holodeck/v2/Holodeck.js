"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Holodeck.js (v2)
var constructorFilter = require("./filters/holodeck-method-constructor-filter");

var runProgramFilter = require("./filters/holodeck-method-run-program-filter");

module.exports = /*#__PURE__*/function () {
  function Holodeck(constructorRequest_) {
    _classCallCheck(this, Holodeck);

    this._private = {};
    this.isValid = this.isValid.bind(this);
    this.toJSON = this.toJSON.bind(this);
    this.runProgram = this.runProgram.bind(this);
    this._getHarnessDiscriminator = this._getHarnessDiscriminator.bind(this);
    this._getID = this._getID.bind(this);
    this._getName = this._getName.bind(this);
    this._getDescription = this._getDescription.bind(this);
    var constructorResponse = constructorFilter.request(constructorRequest_);

    if (constructorResponse.error) {
      this._private.constructorError = constructorResponse.error;
      return;
    }

    this._private = constructorResponse.result;
  }

  _createClass(Holodeck, [{
    key: "isValid",
    value: function isValid() {
      return !this._private.constructorError;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this._private.constructorError ? this._private.constructorError : this._private;
    }
  }, {
    key: "runProgram",
    value: function runProgram(programRequest_) {
      if (!this.isValid()) {
        return {
          error: this.toJSON()
        };
      }

      return runProgramFilter.request({
        HolodeckInstance: this,
        programRequest: programRequest_
      });
    } // Private method used by plug-in harnesses to obtain an reference to the harness discriminator filter.

  }, {
    key: "_getHarnessDiscriminator",
    value: function _getHarnessDiscriminator() {
      if (!this.isValid()) {
        return {
          error: this.toJSON()
        };
      }

      return {
        error: null,
        result: this._private.harnessDiscriminator
      };
    }
  }, {
    key: "_getID",
    value: function _getID() {
      if (!this.isValid()) {
        return {
          error: this.toJSON()
        };
      }

      return {
        error: null,
        result: this._private.id
      };
    }
  }, {
    key: "_getName",
    value: function _getName() {
      if (!this.isValid()) {
        return {
          error: this.toJSON()
        };
      }

      return {
        error: null,
        result: this._private.name
      };
    }
  }, {
    key: "_getDescription",
    value: function _getDescription() {
      if (!this.isValid()) {
        return {
          error: this.toJSON()
        };
      }

      return {
        error: null,
        result: this._private.description
      };
    }
  }]);

  return Holodeck;
}();