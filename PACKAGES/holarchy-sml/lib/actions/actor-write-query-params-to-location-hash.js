"use strict";

// sources/client/app-state-controller/actors/actor-write-query-params-to-hash-location.js
var buildTag = require("../../../../../../build/_build-tag");

var userAgent = [buildTag.packageAuthor, buildTag.packageName, buildTag.packageVersion].join("_"); // eslint

/* global location */

module.exports = {
  id: "rVOEEm2lS--ZMp7VmIemlg",
  name: "Write query params to location hash",
  description: "Writes a serialized object containing query parameters to the location hash",
  commandSpec: {
    ____types: "jsObject",
    actorWriteQueryParamsToLocationHash: {
      ____types: "jsObject"
    }
  },
  namespaces: {
    read: [{
      storePath: "~.derived.runtime.client.subsystems.rainier.clientSession.data.queryBuilder.querySpecification",
      filterBinding: {
        id: "p9rxuSLeR_mXn-d5Y_w4Rw",
        alias: "querySpecificationReader"
      }
    }, {
      storePath: "~.derived.runtime.client.subsystems.rainier.clientSession.data.queryBuilder.queryOptions.dateSelector.selectedDateRange",
      filterBinding: {
        id: "dLcnNu90Q6a8aWzw2UmAIQ",
        alias: "selectedDateRangeReader"
      }
    }, {
      storePath: "~.derived.runtime.client.subsystems.rainier.clientSession.data.selectedAdvertiser",
      filterBinding: {
        id: "dLcnNu90Q6a8aWzw2UmAIQ",
        alias: "advertiserReader"
      }
    }, {
      storePath: "~.derived.runtime.client.subsystems.rainier.clientSession.data.queryBuilder.queryOptions.characteristics.selectedCountry",
      filterBinding: {
        id: "cLBpnc2FTQuOdMBLGt-owQ",
        alias: "demographicsCountryReader"
      }
    }],
    write: [{
      storePath: "~.derived.runtime.client.subsystems.rainier.clientSession.data.queryBuilder.queryParamSerializer.needsUpdate",
      filterBinding: {
        id: "MVlQxPvZRpaJ5_hYHtAIKQ",
        alias: "needsUpdate"
      }
    }, {
      storePath: "~.derived.runtime.client.subsystems.rainier.clientSession.data.queryBuilder.queryParamSerializer.currentValue",
      filterBinding: {
        id: "MVlQxPvZRpaJ5_hYHtAIKQ",
        alias: "writeCurrentValue"
      }
    }]
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null,
      result: false
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var innerResponse = request_.namespaces.read.querySpecificationReader.request();

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      var querySpecification = innerResponse.result;
      innerResponse = request_.namespaces.read.selectedDateRangeReader.request();

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      var selectedDateRange = innerResponse.result;
      innerResponse = request_.namespaces.read.advertiserReader.request();

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      var advertiser = innerResponse.result;
      innerResponse = request_.namespaces.read.demographicsCountryReader.request();

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      var demographicsCountry = innerResponse.result;
      var queryParams = {
        pcode: advertiser.pcode,
        selectedDateRange: selectedDateRange,
        targetAudienceSegments: querySpecification.targetAudience.selectedSegments.slice(),
        baselineAudienceSegments: querySpecification.baselineAudience.selectedSegments.slice(),
        demographicsCountry: demographicsCountry,
        selectedCharacteristics: querySpecification.characteristicsOfInterest.selectedCharacteristics,
        userAgent: userAgent
      };
      var serialized = void 0;

      try {
        (function () {
          var json = JSON.stringify(queryParams);
          console.log("..... ..... internal app state to be serialized to hashroute='" + json + "'");
          var buf = Buffer.from(json);
          var base64 = buf.toString("base64");

          while (base64.indexOf("+") >= 0) {
            base64 = base64.replace("+", "_");
          }

          while (base64.indexOf("/") >= 0) {
            base64 = base64.replace("/", "-");
          }

          var hash = location.hash;
          hash = hash.replace("#", "");
          var hashList = [];
          var key = "queryParams";

          if (hash.indexOf(key + "=") > 0) {
            hashList = hash.split("&");
            hashList = hashList.filter(function (element) {
              element.indexOf(key + "=") < 0;
            });
          }

          location.hash = hashList.join("") + "&" + key + "=" + base64;
          serialized = base64;
        })();
      } catch (exception) {
        errors.push(exception);
        break;
      }

      innerResponse = request_.namespaces.write.writeCurrentValue.request({
        appDataStore: request_.runtimeContext.appStateContext.appDataStore,
        writeData: serialized
      });

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      innerResponse = request_.namespaces.write.needsUpdate.request({
        appDataStore: request_.runtimeContext.appStateContext.appDataStore,
        writeData: false
      });

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      break;
    }

    if (errors.length) response.error = errors.join(" ");
    return response;
  }
};