"use strict";

module.exports = {
  ____label: "Google User Info Descriptor",
  ____description: "Google user information obtained from a call to the Google People API using the user's OAuth2 token.",
  ____types: "jsObject",
  profileUri: {
    ____accept: "jsString"
  },
  // e.g. "people/110037967500954395595"
  givenName: {
    ____accept: "jsString"
  },
  // i.e. first name
  familyName: {
    ____accept: "jsString"
  },
  // i.e. last name
  emailAddress: {
    ____accept: "jsString"
  },
  photoUrl: {
    ____accept: "jsString"
  }
};