"use strict";

var arccore = require("@encapsule/arccore");

var googlePeopleQueryResponseSpec = require("./google-people-query-response-spec");

var googlePeopleProfileDataSpec = require("./google-people-profile-data-spec");

var factoryResponse = arccore.filter.create({
  operationID: "SdidCrYiSwqgUJ2K2ekpkw",
  operationName: "Google User Data Extractor",
  operationDescription: "Extracts Google user profile data from reponse JSON obtained by calling the Google People API with a previously-obtained OAuth2 token.",
  inputFilterSpec: googlePeopleQueryResponseSpec,
  outputFilterSpec: googlePeopleProfileDataSpec,
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null,
      result: undefined
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var selectedName = null;
      var selectedEmail = null;
      var selectedPhoto = null;

      while (request_.data.names.length) {
        var nameDescriptor = request_.data.names.shift();

        if (nameDescriptor.metadata.primary) {
          selectedName = nameDescriptor;
          break;
        }
      }

      if (!selectedName) {
        errors.push("Unable to locate the primary name record in user profile data.");
        break;
      }

      while (request_.data.emailAddresses.length) {
        var emailDescriptor = request_.data.emailAddresses.shift();

        if (emailDescriptor.metadata.primary) {
          selectedEmail = emailDescriptor;
          break;
        }
      }

      if (!selectedEmail) {
        errors.push("Unable to locate the primary email record in user profile data.");
        break;
      }

      while (request_.data.photos.length) {
        var photoDescriptor = request_.data.photos.shift();

        if (photoDescriptor.metadata.primary) {
          selectedPhoto = photoDescriptor;
          break;
        }
      }

      if (!selectedPhoto) {
        errors.push("Unable to locate the primary avatar image in user profile data.");
        break;
      }

      response.result = {
        profileUri: request_.data.resourceName,
        givenName: selectedName.givenName,
        familyName: selectedName.familyName,
        emailAddress: selectedEmail.value,
        photoUrl: selectedPhoto.url
      };
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  } // bodyFunction

});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;