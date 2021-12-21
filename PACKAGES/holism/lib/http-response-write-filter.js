// http-response-write-filter.js
//
// All result and error messages are routed through to
// to this single generic response filter that is responsible
// for writing headers and optional body data to the response
// stream. And, closing the response stream.

const packageMeta = require("../package.json");

const http = require("http");
const arccore = require("@encapsule/arccore");

const httpResponseWriteRequestSpec = require("./iospecs/http-response-write-request-spec");

var factoryResponse = arccore.filter.create({
    operationID: "4YtpbUT-Su-J4DgTdeOBpQ",
    operationName: "HTTP Response Writer",
    operationDescription: "Writes HTTP 1.1 response to output stream and ends the stream.",
    inputFilterSpec: httpResponseWriteRequestSpec,
    bodyFunction: function(request_) {
        console.log("..... " + this.filterDescriptor.operationID + "::" + this.filterDescriptor.operationName);
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            // Inspect the input data type in more detail than is currently possible with the Encapsule/filter library.

            const responseDescriptor = request_.response_descriptor;
            const responseDataType = Object.prototype.toString.call(responseDescriptor.data);
            const contentEncoding = responseDescriptor.content.encoding;
            const contentType = responseDescriptor.content.type;
            var contentLength = null;

            // Determine the content length.
            switch (contentEncoding) {
            case "binary":
                switch (responseDataType) {
                case "[object Uint8Array]":
                    contentLength = new Buffer(responseDescriptor.data).length;
                    break;
                default:
                    break;
                }
                break;
            case "utf8":
                switch (responseDataType) {
                case "[object String]":
                    contentLength = Buffer.byteLength(responseDescriptor.data, "utf8");
                    break;
                default:
                    break;
                }
                break;
            default:
                break;
            }

            // Reject requests for which we cannot deduce content length.
            if (contentLength === null) {
                errors.unshift("Cannot write response data of JavaScript type '" + responseDataType + "' " +
                               "to HTTP ServerResponse stream with declared content encoding '" + contentEncoding + "' " +
                               "and content type '" + contentType + "'.");
                break;
            }

            // Commit the response to the HTTP ServerResponse stream.
            var headers = responseDescriptor.headers;
            headers["Content-Type"] = contentType;
            headers["Content-Length"] = contentLength;
            headers["Server"] = packageMeta.name + " v" + packageMeta.version;

            request_.streams.response.writeHead(
                responseDescriptor.http.code,
                responseDescriptor.http.message?responseDescriptor.http.message:http.STATUS_CODES[responseDescriptor.http.code],
                headers
            );
            // Write data to the HTTP response stream iff there's data AND we're not responding to an HTTP 1.1 HEAD method request.
            if (contentLength && (request_.streams.request.method !== "HEAD")) {
                request_.streams.response.write(responseDescriptor.data, contentEncoding);
            }
            request_.streams.response.end();
            console.log("<==== [code: " + responseDescriptor.http.code + "] " + request_.streams.request.method);
            break;
        }

        if (errors.length) {
            // ERROR 500:
            // Redirect all errors at this level directly to a low-level error 500 HTML page.
            var message = errors.join(" ");
            console.log("Unrecoverable server error in generic response filter!");
            console.error(message);
            request_.streams.response.writeHead(
                500,
                {
                    "Content-Type": "text/html"
                }
            );
            var html = [
                "<html>",
                "<head>",
                "<title>",
                "Encapsule/holism Error 500 - Internal Server Error",
                "</title>",
                "</head>",
                "<body>",
                "<h1>Encapsule/holism Internal Server Error</h1>",
                "<p>" + message + "</p>",
                "</body>",
                "</html>"
            ].join("");

            request_.streams.response.write(html);
            request_.streams.response.end();
            console.log("<==== [code: 500] " + request_.request_descriptor.route_method_name);
        }

        return response;
    }
});

if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;



