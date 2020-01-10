// http-request-filter-factory-user-spec.js
//
// ARCcore.filter specification contract for input that a developer must supply to construct either a
// server-side or client-side hrequest object.
//

module.exports = {
    ____types: "jsObject",
    name: {
        ____label: "HTTP Request Operation Name",
        ____description: "A short descriptive name to assign to the generated HTTP request filter object.",
        ____accept: "jsString"
    },
    description: {
        ____label: "HTTP Request Operation Description",
        ____description: "A longer description of the purpose and functionality to assign to the generated HTTP request filter object.",
        ____accept: "jsString"
    },
    url: {
        ____label: "HTTP Request URL",
        ____description: "Full URL of the remote endpoint to query including the leading HTTP protocol designation.",
        ____accept: "jsString"
    },
    method: {
        ____label: "HTTP Request Method",
        ____description: "The specific HTTP request method to make requests with.",
        ____accept: "jsString",
        ____inValueSet: [ "GET", "POST" ] // on client we wrap XMLHttpRequest, on server `request` module.
    },
    querySpec: {
        ____label: "HTTP Request Query Params Object Filter Spec",
        ____description: "An Encapsule/ARCcore.filter-format JavaScript object descriptor specifying the schema " +
            "of the query specification object that may be optionally specified at request time.",
        ____accept: "jsObject",
        ____defaultValue: { ____opaque: true }
    },
    requestSpec: {
        ____label: "HTTP Request Body Params Object Filter Spec",
        ____description: "An Encapsule/ARCcore.filter-format JavaScript object descriptor specifying the schema " +
            "of the main request object to pass as the body of the HTTP request.",
        ____accept: "jsObject",
        ____defaultValue: { ____opaque: true }
    },
    resultSpec: {
        ____label: "HTTP Result Object Filter Spec",
        ____description: "An Encapsule/ARCcore.filter-format JavaScript object descriptor specifiying the schema " +
            "of the result data that the remote endpoint is expected/required to return in response to the HTTP request.",
        ____accept: [ "jsUndefined", "jsObject" ]
    },
    resultHandler: {
        ____label: "HTTP Result Handler",
        ____description: "A JavaScript function to be called by the generated HTTP request filter when the request completes successfully. This function is always passed a single in-parameter, request, that is filtered by the resultSpec.",
        ____accept: [ "jsUndefined", "jsFunction" ]
    },
    errorHandler: {
        ____label: "HTTP Response Error Handler",
        ____description: "A JavaScript function to be called by the generated HTTP request filter if the request fails. This function is always passed a single in-parameter of type string that explains what went wrong.",
        ____accept: [ "jsUndefined", "jsFunction" ]
    }
};
