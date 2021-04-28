"use strict";

module.exports = {
  ____label: "Google People API Response",
  ____description: "A partial specification of response data received from the Google People endpoint upon successful query for an authenticated user's basic profile data.",
  ____types: "jsObject",
  status: {
    ____accept: "jsNumber",
    ____inValueSet: [200]
  },
  data: {
    ____types: "jsObject",
    resourceName: {
      // The Google OpenID string for the user. e.g. 'people/110037967500954395595'
      ____accept: "jsString"
    },
    names: {
      ____types: "jsArray",
      nameDescriptor: {
        ____types: "jsObject",
        displayNameLastFirst: {
          ____accept: "jsString"
        },
        givenName: {
          ____accept: "jsString"
        },
        familyName: {
          ____accept: "jsString"
        },
        displayName: {
          ____accept: "jsString"
        },
        metadata: {
          ____types: "jsObject",
          primary: {
            ____accept: "jsBoolean",
            ____defaultValue: false
          }
        }
      }
    },
    emailAddresses: {
      ____types: "jsArray",
      emailAddressDescriptor: {
        ____types: "jsObject",
        value: {
          ____accept: "jsString"
        },
        metadata: {
          ____types: "jsObject",
          primary: {
            ____accept: "jsBoolean",
            ____defaultValue: false
          }
        }
      }
    },
    photos: {
      ____types: "jsArray",
      photoDescriptor: {
        ____types: "jsObject",
        url: {
          ____accept: "jsString"
        },
        metadata: {
          ____types: "jsObject",
          primary: {
            ____accept: "jsBoolean",
            ____defaultValue: false
          }
        }
      }
    }
  }
};