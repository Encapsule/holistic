// http-server-render-html5-options-spec.js
// Added in v0.0.49-spectrolite to allow a dervied app service
// to customize the @encapsule/holistic-nodejs-service's built-in
// HTML5 document rendering template used to render all HTML5 documents
// synthesized by an @encapsule/holistic-nodejs-service derived runtime.

module.exports = {
    ____label: "HTML5 Document Synth Options",
    ____description: "Options and overrides to apply to the @encapsule/holistic-nodejs-service's HTML5 document rendering subsystem.",
    ____types: "jsObject",
    ____defaultValue: {},

    documentPrologueComments: {
        ____label: "Document Prologue Comments",
        ____description: "Optional app-specific HTML5 comment string to insert at the top of every HTML5 document produced by the Node.js service.",
        ____accept: [ "jsNull", "jsString" ],
        ____defaultValue: null
    },

    documentHeadSectionLinksMeta: {
        ____label: "Document Header Meta and Link Extensions",
        ____description: "Optional app-specific HTML5 HEAD section content. This is not carefully merged so be careful not to override any of the tags HolisticNodeService specifies (and are required to be in specific format(s) by HolisticHTML5Service).",
        ____types: [ "jsNull", "jsString", "jsArray" ],
        ____defaultValue: null,
        oneLine: { ____accept: "jsString" } // iff specified as an array strings, each is assumed to be preformatted HTML string that we insert w/a newline character into HEAD in the order specified
    },

    documentEpilogueComments: {
        ____label: "Document Epilogue Comments",
        ____description: "Optional app-specific comment string to insert at the bottom of every HTML5 document produced by the Node.js service.",
        ____accept: [ "jsNull", "jsString" ],
        ____defaultValue: null
    }

};

