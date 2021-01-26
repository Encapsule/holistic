"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// HolisticServiceCore.js

/*(

  PLEASE DO ONLY:

  [ SOURCES/SERVER ] <=== import/require <==== [ SOURCES/COMMON ]          TRUSTED

  ----- app service line of trust ------HTTPS----------PUBLIC INTERNET -----------

  [ SOURCES/CLIENT ] <=== import/require <==== [ SOURCES/COMMON ]        UNTRUSTED

  PLEASE DO NOT:

  [ SOURCES/CLIENT ] <==== import/require <==== [ SOURCES/SERVER ]    BAD PRACTICE: You should not need to ever import/require client code on the server. Shared behavior and/or data needs to live in SOURCES/COMMON.
  [ SOURCES/SERVER ] <==== import/require <==== [ SOURCES/CLIENT ]    POOR PRACTICE: Although there's really no trust issue here it's kind of lazy when you can keep everthing symetric w/pre-build steps in the few cases that you are likely to ever actually need.

  [ SOURCES/COMMON ] <==== import/require <==== [ SOURCES/SERVER ]    BAD PRACTICE: import/require going in the wrong direction - you're just asking for trouble here. take the time to keep your pre-build up-to-date and synthesize sources across trust zones at build-time.
  [ SOURCES/COMMON ] <==== import/require <==== [ SOURCES/CLIENT ]    BAD PRACTICE: import/require going in the wrong direction - code in COMMON is agnostic to Node.js vs Browser tab, and your client code is likely not. If it is, move it to common.

)*/
var path = require("path");

console.log("> \"".concat(path.resolve(__filename), "\" module loading..."));

var constructorFilter = require("./lib/filters/HolisticServiceCore-method-constructor-filter"); // This is a developer-facing API packaged as an ES6 class. The vast majority of the work is done by
// the constructor filter that is responsible for validating, normalizing, and processing the developer-
// specified constructor function inputs into what we call the "holistic cell nucleus".
//
// The "nucleus" is actually an immutable runtime database of usual-suspect artifacts (i.e. data,
// filter specs, filters, actions, operators, apm's, and cell models) that is required by both
// HolisticAppServer and HolisticAppClient ES6 class constructor functions.
//


var HolisticServiceCore = /*#__PURE__*/function () {
  function HolisticServiceCore(request_) {
    _classCallCheck(this, HolisticServiceCore);

    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      this._private = {
        constructorError: null
      };
      this.isValid = this.isValid.bind(this);
      this.toJSON = this.toJSON.bind(this);
      this.getAppBuild = this.getAppBuild.bind(this);
      this.getAppMetadataTypeSpecs = this.getAppMetadataTypeSpecs.bind(this);
      this.getAppMetadataDigraph = this.getAppMetadataDigraph.bind(this);
      this.getAppMetadataOrg = this.getAppMetadataOrg.bind(this);
      this.getAppMetadataApp = this.getAppMetadataApp.bind(this);
      this.getAppMetadataPage = this.getAppMetadataPage.bind(this);
      this.getAppMetadataHashroute = this.getAppMetadataHashroute.bind(this);
      this.getClientUserLoginSessionSpec = this.getClientUserLoginSessionSpec.bind(this);
      this.getDisplayComponents = this.getDisplayComponents.bind(this);
      this.getCellModels = this.getCellModels.bind(this);
      this.getTargetDOMElementID = this.getTargetDOMElementID.bind(this);
      this.getServiceBootROMSpec = this.getServiceBootROMSpec.bind(this);
      var filterResponse = constructorFilter.request(request_);

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        break;
      }

      this._private = filterResponse.result;
      break;
    }

    if (errors.length) {
      errors.unshift("HolisticAppCommonService::constructor failed yielding a zombie instance.");
      this._private.constructorError = errors.join(" ");
    }
  }

  _createClass(HolisticServiceCore, [{
    key: "isValid",
    value: function isValid() {
      return !this._private.constructorError;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.isValid() ? this._private : this._private.constructorError;
    }
  }, {
    key: "getAppBuild",
    value: function getAppBuild() {
      return this.isValid() ? this._private.nonvolatile.appCommonDefinition.appData.appBuild : this.toJSON();
    }
  }, {
    key: "getAppMetadataTypeSpecs",
    value: function getAppMetadataTypeSpecs() {
      return this.isValid() ? this._private.nonvolatile.appMetadata.specs : this.toJSON();
    }
  }, {
    key: "getAppMetadataDigraph",
    value: function getAppMetadataDigraph() {
      return this.isValid() ? this._private.nonvolatile.appMetadata.accessors.getAppMetadataDigraph() : this.toJSON();
    }
  }, {
    key: "getAppMetadataOrg",
    value: function getAppMetadataOrg() {
      return this.isValid() ? this._private.nonvolatile.appMetadata.accessors.getAppMetadataOrg() : this.toJSON();
    }
  }, {
    key: "getAppMetadataApp",
    value: function getAppMetadataApp() {
      return this.isValid() ? this._private.nonvolatile.appMetadata.accessors.getAppMetadataApp() : this.toJSON();
    } // Returns filter response object.

  }, {
    key: "getAppMetadataPage",
    value: function getAppMetadataPage(pageURI_) {
      if (!this.isValid()) {
        return {
          error: this.toJSON()
        };
      }

      var pageMetadataValue = this._private.nonvolatile.appMetadata.accessors.getAppMetadataPage(pageURI_);

      if (!pageMetadataValue) {
        return {
          error: "No page metadata found for URI \"".concat(pageURI_, "\".")
        };
      }

      return {
        error: null,
        result: pageMetadataValue
      };
    } // Returns filter response object.

  }, {
    key: "getAppMetadataHashroute",
    value: function getAppMetadataHashroute(hashroutePathname_) {
      if (!this.isValid()) {
        return {
          error: this.toJSON()
        };
      }

      var hashrouteMetadataValue = this._private.nonvolatile.appMetadata.acessors.getAppMetadataHashroute(hashroutePathname_);

      if (!hashrouteMetadataValue) {
        return {
          error: "No hashroute metadata found for URI \"".concat(hashroutePathname_, "\".")
        };
      }

      return {
        error: null,
        result: hashrouteMetadataValue
      };
    }
  }, {
    key: "getClientUserLoginSessionSpec",
    value: function getClientUserLoginSessionSpec() {
      return this.isValid() ? this._private.nonvolatile.appCommonDefinition.appTypes.userLoginSession.untrusted.clientUserLoginSessionSpec : this.toJSON();
    }
  }, {
    key: "getDisplayComponents",
    value: function getDisplayComponents() {
      // returns array of @encapsule/d2r2 component wrapper filters for <ComponentRouter/>
      return this.isValid() ? this._private.nonvolatile.coreDisplayComponents : this.toJSON();
    }
  }, {
    key: "getCellModels",
    value: function getCellModels() {
      // returns array of @encapsule/holarchy CellModel instances.
      return this.isValid() ? this._private.nonvolatile.coreCellModels : this.toJSON();
    }
  }, {
    key: "getTargetDOMElementID",
    value: function getTargetDOMElementID() {
      return this.isValid() ? this._private.nonvolatile.appCommonDefinition.appData.appConfig.display.targetDOMElementID : this.toJSON();
    }
  }, {
    key: "getServiceBootROMSpec",
    value: function getServiceBootROMSpec() {
      return this.isValid() ? this._private.nonvolatile.serviceBootROMSpec : this.toJSON();
    }
  }]);

  return HolisticServiceCore;
}();

module.exports = HolisticServiceCore;