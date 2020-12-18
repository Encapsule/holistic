"use strict";

// Exports a "vector set" (an array of arrays of holodeck vectors).
module.exports = [// d2r2/React Client Output Processor OPM encapsulates the details
// of initial client-side rehydration (i.e. event handler binding
// on top of server-pre-rendered HTML) and subsequent dynamic updates
// to the client view via d2r2 and React RTL's.
require("./vector-set-d2r2-react-client-display-adaptor"), // TODO: v0.0.49-spectrolite disabling temporarily - is this needed at all? I mean really?
require("./vector-set-dom-location-processor"), require("./vector-set-app-client-runtime"), require("./vector-set-app-client-view"), require("./vector-set-app-client")];