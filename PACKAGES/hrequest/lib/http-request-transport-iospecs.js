// http-request-transport-iospecs.js
//

module.exports = {
    inputFilterSpec: {
        ____label: "HTTP Request Transport Request",
        ____types: "jsObject",
        url: {
            ____accept: "jsString"
        },
        method: {
            ____accept: "jsString",
            ____inValueSet: [ "GET", "POST" ]
        },
        query: {
            ____accept: [ "jsUndefined", "jsObject" ]
        },
        request: {
            ____opaque: true
        },
        options: {
            ____opaque: true
        },
        resultHandler: {
            ____accept: "jsFunction"
        },
        errorHandler: {
            ____accept: "jsFunction"
        }
    },
    outputFilterSpec: {
        ____accept: "jsUndefined"
    }
};
