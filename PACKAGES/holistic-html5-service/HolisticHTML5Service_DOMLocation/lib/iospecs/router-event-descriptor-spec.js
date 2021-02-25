"use strict";

// router-event-descriptor-spec.js
module.exports = {
  ____label: "HolisticHTML5Service_DOMLocation Router Event Descriptor",
  ____description: "Updated whenever the current window.location.href value changes.",
  ____types: ["jsObject"],
  actor: {
    ____accept: "jsString",
    ____inValueSet: ["server", // href value set by the app server actor (usually a copy of HTTP request URL from the user actor's agent, the browser).
    "user", // User actor set the current href value via browser user agent forward/back navigation. Or, explicit modification of browser location bar input value.
    "app" // Application actor set the current href value by calling a DOM Location Processor controller action.
    ]
  },
  hrefParse: {
    ____accept: "jsObject"
  },
  hashrouteString: {
    ____accept: ["jsNull", // there is no hashroute fragment present in location.href.
    "jsString" // the unparsed hashroute fragment obtained from location.href by DOM Location processor.
    ],
    ____defaultValue: null // no hashroute component present by default

  },
  // This is the string beginning with the # character as we specified in the user request. Or, was added by the app client kernel during boot.
  hashrouteParse: {
    ____types: ["jsNull", // there is no hashroute fragment present in location.href
    "jsObject" // the parsed hashroute fragment obtained from hashrouteString by DOM Location processor.
    ],
    ____defaultValue: null,
    pathname: {
      ____label: "Secondary Resource Request Pathname",
      ____description: "Use this string as the primary key to query app metadata for hashroute descriptor.",
      ____accept: "jsString"
    },
    path: {
      ____label: "Secondary Resource Request Path",
      ____description: "Same as above except that it includes any URL-encoded query params. In for debugging only but not really useful vs hashrouteQueryParse.",
      ____accept: "jsString"
    },
    search: {
      ____label: "Secondary Resource Reqeust Search Params String",
      ____accept: ["jsString", "jsNull"]
    },
    query: {
      ____label: "Secondary Resource Request Query Params String",
      ____accept: ["jsString", "jsNull"]
    }
  },
  hashrouteQueryParse: {
    ____types: ["jsNull", // no hashroute fragment in location.href parsed -> no query pararms
    "jsObject"],
    ____defaultValue: null,
    ____asMap: true,
    paramName: {
      ____accept: ["jsString", "jsNull"
      /*e.g. #x?foo --> foo: null */
      ]
    }
  }
};