// http-request-transport-for-browser.js
//

const arccore = require("@encapsule/arccore");
const queryString = require("query-string");
const httpRequestTransportSpecs = require("./http-request-transport-iospecs");

var filterFactoryResponse = arccore.filter.create({

    operationName: "HTTP Request Transport For Browser",
    operationDescription: "Filter wrapper around XMLHttpRequest for use in browser clients.",
    operationID: "EL4bPlQIRWy2zJ148nQXBQ",
    inputFilterSpec: httpRequestTransportSpecs.inputFilterSpec,
    outputFilterSpec: httpRequestTransportSpecs.outputFilterSpec,
    bodyFunction: function(request_) {
        var requestContext = request_;

        var requestURL = requestContext.url;
        if (requestContext.query !== undefined) {
            const queryStringSuffix = queryString.stringify(requestContext.query);
            requestURL += "?" + queryStringSuffix;
        }

        /*eslint no-undef: "error"*/
        /*eslint-env browser*/
        var httpRequest = new XMLHttpRequest();
        httpRequest.open(request_.method, requestURL, true /*async*/);
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    var deserializedJSON = null;
                    try {
                        deserializedJSON = JSON.parse(httpRequest.responseText);
                        requestContext.resultHandler(deserializedJSON);
                    } catch (exception_) {
                        var errorDescriptor = {
                            httpStatus: 200,
                            appStatus: 500,
                            message: ("Exception attempting to deserialize response JSON: '" + exception_.toString() + "'")
                        };
                        requestContext.errorHandler(JSON.stringify(errorDescriptor));
                    } // end catch

                } else {
                    errorDescriptor = {
                        httpStatus: httpRequest.status,
                        appStatus: 0,
                        message: httpRequest.responseText
                    };
                    requestContext.errorHandler(JSON.stringify(errorDescriptor));
                }
            }
        };

        httpRequest.onerror = function() {
            var errorDescriptor = {
                httpStatus: httpRequest.status,
                appStatus: 0,
                message: httpRequest.responseText
            };
            requestContext.errorHandler(JSON.stringify(errorDescriptor));
        };

        httpRequest.send(JSON.stringify(requestContext.request));
        return { error: null, result: undefined };
    }
});

if (filterFactoryResponse.error) {
    throw new Error(filterFactoryResponse.error);
}

module.exports = filterFactoryResponse.result;
