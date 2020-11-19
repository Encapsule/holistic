// http-server-filter-factory.js
//
/*
  An experimental HTTP 1.1 server built atop the low-level Node.js
  network socket, and HTTP API's (https://nodejs.org/api/http.html
  https://www.ietf.org/rfc/rfc2616.txt) using Encapsule Project
  ARCcore.filter and ARCcore.graph libraries.

  Features:

  - Configured with ARCcore.filter-derived plugin objects and JSON declarations.
  - Automated data validation/normalization/error reporting for superior developer experience.
  - Automated generation of human-readable API specifications and developer documentation.
  - Extended via ARCcore.filter-derived plugins:
  --- "Service filter" factory API provides developers w/a mechanism to define custom HTTP request logic.
  --- "Integration filter" factory API allows developers integrate HTTP server filters into their application.
  - Designed to work well with Encapsule/http-request-filter-factory (also based on ARCcore.filter).

  References:

  - Nodejs.org Anatomy of an HTTP Transaction: https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
  - Nodejs.org Streams: https://nodejs.org/api/stream.html
  - Wikipedia List of HTTP header fields: https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
  - Wikipedia list of HTTP status codes: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

*/
//

const process = require("process");
const packageMeta = require("../package.json");

const url = require("url");
const http = require("http");
const arccore = require("@encapsule/arccore");

// Low level response filters used directly by the HTTP server's listening thread.
const errorResponseFilter = require("./http-response-error-filter");
const writeResponseFilter = require("./http-response-write-filter");

// The format of the data required to call this filter.
const httpServerGeneratorRequestSpec = require("./iospecs/http-server-filter-factory-request-spec");

// The format of the data that this filter returns if the operation succeeds.
const httpServerGeneratorResultSpec = require("./iospecs/http-server-filter-factory-result-spec");

// Used internally to parse the request object and derive the representation used by the server.
const httpServerConfigProcessor = require("./http-server-config-filter");
const httpServerIntrospectionFilterFactory = require("./http-server-introspection-filter-factory");
const httpServerAgentInfoFilterFactory = require("./http-server-agent-info-filter-factory");

// Create the factory filter.
var factoryResponse = arccore.filter.create({
    operationID: "b46LcK7ORNu-lD_yUOsAuw",
    operationName: "HTTP Server Filter Factory",
    operationDescription: "Construct and initialize HTTP server infrastructure per configuration object.",
    inputFilterSpec: httpServerGeneratorRequestSpec,
    outputFilterSpec: httpServerGeneratorResultSpec,

    bodyFunction: function(request_) {

        var response = { error: null, result: null };
        var errors = [];

        var serverContext = request_;
        serverContext.instanceID = arccore.identifier.irut.fromEther(); // every new @encapsule/holism server instance gets an IRUT for use in tracking deployments
        serverContext.stats = {
            created: new Date(),
            started: null,
            requests: 0,
            responses: 0,
            errors: 0
        };

        console.log("****************************************************************");
        console.log("****************************************************************");
        console.log("****************************************************************");
        console.log("****************************************************************");
        console.log("****************************************************************");
        console.log(`>>>>> Configuring ${serverContext.holisticAppBuildManifest.app.name} v${serverContext.holisticAppBuildManifest.app.version}-${serverContext.holisticAppBuildManifest.app.codename} buildID "${serverContext.holisticAppBuildManifest.app.buildID}".`);
        console.log(`..... Creating new app server instance ID "${serverContext.instanceID}" configured to run in "${request_.appServerRuntimeEnvironment}" environment mode.`);
        console.log(`..... Configuring @encapsule/holism v${packageMeta.version} ${packageMeta.codename} HTTP 1.1 server on Node.js v${process.versions.node} ...`);

        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;
            console.log("\nProcessing server configuration:");
            var innerResponse = httpServerConfigProcessor.request(request_);
            if (innerResponse.error) {
                errors.unshift(innerResponse.error);
                errors.unshift("Unable to process HTTP server configuration object.");
                break;
            }

            var routingModel = innerResponse.result;

            serverContext.http_server_routes = {};

            var routeMethodNames = routingModel.getVertices().sort();
            routeMethodNames.forEach(function(route_) {
                var config = routingModel.getVertexProperty(route_);
                serverContext.http_server_routes[route_] = {};
                serverContext.http_server_routes[route_][config.type] = config.resource.id;
                var message = "> " + route_ + " ";
                var messageStartLength = message.length;
                for (var i=0 ; i < (75 - messageStartLength) ; i++) { message += "."; }
                message += ` ${(config.resource.authentication.required?"private":"public")} `;
                messageStartLength = message.length;
                for (i=0 ; i < (90 - messageStartLength) ; i++) { message += "."; }
                message += " " + config.type + " ";
                console.log(message);
            });

            // Allocate a default user session object for the 'anonymous' user.
            innerResponse = request_.integrations.filters.normalize_user_session_result.request();
            if (innerResponse.error) {
                errors.unshift(innerResponse.error);
                errors.unshift("Unable to create a default session descriptor for anonymous user.");
                break;
            }
            var anonymousUserSession = innerResponse.result;

            // ======================================================================
            // ======================================================================
            // ======================================================================
            // Define the generic server request handler callback function.

            const httpServer = http.createServer(

                // After the HTTP server starts listening on the designated port,
                // inbound HTTP requests will be dispatched to this callback for processing.
                //

                function(httpRequest_, httpResponse_) {

                    // Parse the request URL.
                    var parseUrl = url.parse(httpRequest_.url, true);

                    var httpMethod = (httpRequest_.method === "HEAD")?"GET":httpRequest_.method;
                    var routeMethodName = httpMethod + ":" + parseUrl.pathname;

                    // Deep copy the default user session data for anonymous user.
                    var anonymousUserSessionData = arccore.util.clone(anonymousUserSession);

                    // Initialize the request descriptor used to store request-derived state.
                    var requestDescriptor = {
                        url_parse: parseUrl,
                        route_method_name: routeMethodName,
                        headers: httpRequest_.headers,
                        session: anonymousUserSessionData,
                        data: {
                            query: (parseUrl && parseUrl.search && parseUrl.search.length > 0)?parseUrl.query:undefined,
                            body: "", // <-- empty UTF8 string populated as IncomingStream data events fire. See httpRequest_.on('data'). Set to null if message body length exceeded.
                            overrun: 0, // iff body === null this is a tally of dropped characters received from the client request stream
                            hangup: false // iff overrun > 0 then hangup indicates if the incoming request has been destroyed for abuse. iff overrun > 0 && !hangup send a 413 on("end, fn). Otherwise on("end", fn) is a noop.
                        }
                    };

                    // Increment the global request count.
                    serverContext.stats.requests++;

                    // ======================================================================
                    // Start: HORRIBLE MISHAP RESPONSE FUNCTION
                    // ----------------------------------------------------------------------
                    // If we can not otherwise reasonably report an important application server failure,
                    // we resort to the "horrible mishap response function" that displays a crude, low-level
                    // error report to ensure that whatever the problem is doesn't slip through the cracks.
                    //
                    function reportHorribleMishap(whatHappened_) {
                        console.error("REPORTING HORRIBLE SERVER MISHAP...");
                        console.log("----------------------------------------------------------------------");
                        console.log(whatHappened_);
                        console.log("----------------------------------------------------------------------");

                        const appMetadata = serverContext.holisticAppBuildManifest.app;

                        var html = [
                            "<!DOCTYPE html>",
                            "<html lang=\"en\">",
                            "<head>",
                            "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />",
                            "<meta charset=\"utf-8\" />",
                            `<title>${appMetadata.name} Internal Server Error</title>`,
                            "<style type='text/css'>",
                            "body { margin: 0em; padding: 1em; background-color: red }",
                            "#idTitle1 { font-family: Arial; font-size: 32pt; font-weight: bold; color: #FC0; padding-bottom: 0.1em; }",
                            "#idAppVersion { font-family: Arial; font-size: 24pt; padding-top: 0.5em; padding-bottom: 0.5em; }",
                            "#idErrorHeader { font-family: Arial; font-size: 14pt; font-weight: bold; padding-bottom: 1em; }",
                            "#idError { font-family: monospace; font-size: 14pt; font-weight: normal; border: 2px solid #FC0; border-radius: 0.5em; margin-top: 0.5em; margin-bottom: 0.5em; padding: 1em; }",
                            "#idFooter { text-align: right; color: #FC0; font-family: Courier; font-weight: bold; padding-top: 0.5em; }",
                            "</style>",
                            "</head>",
                            "<body>",
                            "<div id='idContent'>",
                            `<div id='idTitle1'>${appMetadata.name} Internal Server Error</div>`,
                            `<div id='idAppVersion'>${appMetadata.name} v${appMetadata.version}-${appMetadata.codename} build "${appMetadata.buildID}"</div>`,
                            `<div id='idErrorHeader'>An internal error in the ${appMetadata.name} application server process is preventing us from displaying the application view you requested.</div>`,
                            `<div id='idError'>${whatHappened_}</div>`,
                            "</div>",
                            "<div id='idFooter'>",
                            "<strong>@encapsule/holistic v",
                            packageMeta.version,
                            "-",
                            packageMeta.codename,
                            " \"",
                            packageMeta.buildID,
                            "\"</div>",
                            "</body>",
                            "</html>"
                        ].join("");

                        var lastResponse = writeResponseFilter.request({
                            streams: { request: httpRequest_, response: httpResponse_ },
                            request_descriptor: requestDescriptor,
                            response_descriptor: {
                                http: { code: 500, message: "Fatal app server process errorl server error" },
                                content: {
                                    encoding: "utf8",
                                    type: "text/html"
                                },
                                data: html
                            }
                        });
                        if (lastResponse.error) {
                            console.error("Okay... Everything (and we mean everything) is broken. Please code responsibly!");
                            throw new Error(lastResponse.error);
                        }
                    }
                    // End: HORRIBLE MISHAP RESPONSE
                    // ======================================================================

                    console.log("====> " + routeMethodName + " (request: " + serverContext.stats.requests + ")");

                    /* TODO:
                       This is a simplisitic lowest-common-denominator implementation that could be better.
                       - Do not hook the data event if we have no expectation of data beyond headers / URL-encoded queries from the client.
                       - Allow developer-defined override behavor
                       - Direct raw access to underlying streams
                       - Handle non-UTF8-encoded payloads (e.g. binary file uploads)
                       - Handle long-running chunked POST/PUT from client (e.g. a sensor)
                       - Should also be predicated on resource authentication flags
                    */
                    httpRequest_.on("data", function(data_) {

                        // Handle the case where we have already determined that we're not going to accept this request.

                        if (requestDescriptor.data.body === null) {

                            // Incoming request has exceeded max allowed request body length.
                            requestDescriptor.data.overrun += data_.length; // tally their continued attempts to buffer while dropping the data.
                            console.warn(`!---> ${routeMethodName}::data MAX BUFFER exceeded by ${requestDescriptor.data.overrun} characters. Monitoring request for abuse to determine how/if to respond...`);

                            // Determine if we consider the continued attempts to buffer abusive or not.
                            const abuseThreshold = Math.ceil(serverContext.config.options.max_input_characters * serverContext.config.options.request_data_abuse_factor);

                            if (requestDescriptor.data.overrun > abuseThreshold) {
                                // We consider this an abuse of our app server and simply close the socket connection to the client w/no HTTP response.
                                httpRequest_.destroy("server terminated connection due to abuse policy");
                                requestDescriptor.data.hangup = true;
                                console.warn(`!!!!> ${routeMethodName}::data ABUSE DEFENSE ACTIVATED. Destroying socket w/out further response.`);
                            }

                            // At this point the client has not yet exceeded the abuse threshold. Allow continued attempts to buffer (but drop the data)
                            return;

                        } // end we are not going to accept this request because it is too large

                        const dataOverrun = requestDescriptor.data.body.length + data_.length - serverContext.config.options.max_input_characters;

                        if (dataOverrun > 0) {
                            // Per policy - we now transition to "no we will not take this request but will wait to see if you're abusive" mode.
                            requestDescriptor.data.body = null; // tell on("end", fn) DO NOT DISPATCH this request. We are not accepting it.
                            requestDescriptor.data.overrun = dataOverrun; // start to track the extent to which the request violates our limit
                            console.warn(`!---> ${routeMethodName}::data MAX BUFFER exceeded by ${dataOverrun} characters. Monitoring request for abuse to determine how/if to respond...`);
                            return;
                        }

                        // OKAY: Buffer the data transmitted via the incoming request stream.
                        requestDescriptor.data.body += data_;
                        console.log(`----> ${routeMethodName}::data ${requestDescriptor.data.body.length} continue buffering...`);
                        return;

                    });

                    httpRequest_.on("error", function(error_) {
                        // TODO: not even sure under what conditions this event fires so we're obviously
                        // not doing the right thing currently. Probably should close the socket?
                        console.error("!!!!> " + routeMethodName + "::error " + error_);
                    });

                    // ----------------------------------------------------------------------
                    // Everything that has come before is effectively an HttpRequest pre-processor
                    // that hooks the stream's events and prepares derived state context to pass off
                    // to various plug-ins (filters that we classify by role: integration, service).

                    httpRequest_.on("end", function() {

                        // If we hungup on the request, do nothing at all.
                        if (requestDescriptor.data.hangup) {
                            // Do nothing. The socket has been closed. Empirically, we do not always get on("end", fn) callback after destroying the request stream socket.
                            // Docs are scant on this behavior at this level of detail that I could understand. This seems to work fine by catching the case where we
                            // do receive this callback after hanging up. So explicitly do nothing because there's nothing to respond to at this point.
                            return;
                        }

                        // If we do not have a Buffer AND we did not hangup then overrun > 0 and we want to respond with a friendly HTTP 413 error.
                        if (requestDescriptor.data.body === null) {

                            const message = `Per HTTP request data buffer limit of ${serverContext.config.options.max_input_characters} exceeded. Request body data length overrun by ${requestDescriptor.data.overrun} characters.`;


                            var innerResponse = errorResponseFilter.request({
                                integrations: serverContext.integrations,
                                streams: { request: httpRequest_, response: httpResponse_ },
                                request_descriptor: requestDescriptor,
                                error_descriptor: {
                                    http: { code: 413 },
                                    content: { encoding: "utf8", type: "application/json" },
                                    data: {
                                        error_message: message,
                                        error_context: { source_tag: "Le50YXPTR8i0TgstT4RUGg" }
                                    }
                                }
                            });

                            if (innerResponse.error) {
                                var problem = "During server attempt to respond to client request with error 413: " + innerResponse.error;
                                reportHorribleMishap(problem);
                            }

                            return;
                        }

                        // Determine if the application has registered an HTTP request redirector
                        // service filter. If so, call it and affect conditional redirect of incoming request.
                        if (serverContext.integrations.filters.http_request_redirector) {

                            innerResponse = serverContext.integrations.filters.http_request_redirector.request({
                                request_descriptor: requestDescriptor,
                                appStateContext: serverContext.integrations.appStateContext
                            });
                            if (innerResponse.error) {
                                const problem = "During evaluation of need to redirect HTTP request:" + innerResponse.error;
                                reportHorribleMishap(problem);
                                return;
                            }
                            const redirectResult = innerResponse.result;
                            if (redirectResult) {

                                innerResponse = writeResponseFilter.request({
                                    streams: { request: httpRequest_, response: httpResponse_ },
                                    request_descriptor: requestDescriptor,
                                    response_descriptor: {
                                        http: { code: redirectResult.httpCode },
                                        headers: {
                                            "Cache-Control": "must-revalidate",
                                            "Location": redirectResult.locationURL
                                        },
                                        content: { encoding: "utf8", type: "text/plain" },
                                        data: ""
                                    }
                                });
                                if (innerResponse.error) {
                                    const problem = "During server attempt to redirect incoming HTTP request: " + innerResponse.error;
                                    reportHorribleMishap(problem);
                                }
                                return;

                            } // if (redirectResult)

                        } // if app-defined HTTP request redirectory defined

                        // Dereference normalized property object associated with recognized
                        // HTTP-method:pathname "route". Use the 'type' property to route top-level
                        // dispatch to route-specific subroutines.
                        var resourceDescriptor = routingModel.getVertexProperty(routeMethodName);

                        // OBTAIN IDENTITY ASSERTION
                        // Deserialize and extract the user's assertion of their identity (if they made one).
                        innerResponse = serverContext.integrations.filters.get_user_identity.request({
                            request_descriptor: requestDescriptor,
                            appStateContext: serverContext.integrations.appStateContext
                        });
                        if (innerResponse.error) {
                            const problem = "During server attempt get user identity from HTTP request: " + innerResponse.error;
                            reportHorribleMishap(problem);
                            return;
                        }
                        var userIdentity = innerResponse.result;
                        console.log("----> Asserted user identity: " + JSON.stringify(userIdentity));

                        // AUTHENTICATE IDENTITY ASSERTION
                        // Attempt to authenticate the user and retrieve their user session object.
                        innerResponse = serverContext.integrations.filters.get_user_session.request({
                            appStateContext: serverContext.integrations.appStateContext,
                            user_identity: userIdentity,
                            result_handler: function(userSession_) {

                                var normalizeResponse =
                                    serverContext.integrations.filters.normalize_user_session_result.request(userSession_);
                                if (normalizeResponse.error) {
                                    reportHorribleMishap(normalizeResponse.error);
                                    return;
                                }
                                var userSession = normalizeResponse.result;

                                requestDescriptor.session = userSession;

                                // Reject unrecognized requests with error 404.
                                if (!routingModel.isVertex(routeMethodName)) {
                                    // ERROR 404: Unrecognized METHOD:pathname (routeMethodName)
                                    var innerResponse = errorResponseFilter.request({
                                        integrations: serverContext.integrations,
                                        streams: { request: httpRequest_, response: httpResponse_ },
                                        request_descriptor: requestDescriptor,
                                        error_descriptor: {
                                            http: { code: 404 },
                                            content: { encoding: "utf8", type: "text/html" },
                                            data: {
                                                error_message: "Invalid resource URL or access method.",
                                                error_context: { source_tag: "fjVt_DytRvGBbEWilKjr3w" }
                                            }
                                        }
                                    });
                                    if (innerResponse.error) {
                                        const problem = "During server attempt to respond to client request with error 404: " + innerResponse.error;
                                        reportHorribleMishap(problem);
                                    }
                                    return;
                                }

                                switch (resourceDescriptor.type) {

                                // ----------------------------------------------------------------------
                                // Static resources cached in-process memory.
                                // ----------------------------------------------------------------------
                                case "memory_file":
                                    // Dispatch for memory-resident file resources is trivial so affect
                                    // transfer of the static resource bits and close the response stream
                                    // inline below. Note that this implementation does not consider request
                                    // query, headers, or body whatsoever; it simply returns the resource
                                    // with the specified content type and encoding declared in the server
                                    // config descriptor.

                                    // Block access to authentication-required resources iff not authenticated.
                                    var responseType = (resourceDescriptor.resource.contentType !== "text/html")?"application/json":"text/html";

                                    if (resourceDescriptor.resource.authentication.required && ! requestDescriptor.session) {
                                        // ERROR 401: Not Authenticated
                                        var errorResponse = errorResponseFilter.request({
                                            integrations: serverContext.integrations,
                                            streams: { request: httpRequest_, response: httpResponse_ },
                                            request_descriptor: requestDescriptor,
                                            error_descriptor: {
                                                http: { code: 401, message: "Not Authenticated" },
                                                content: { encoding: "utf8", type: responseType },
                                                headers: { "WWW-Authenticate": "Bearer" },
                                                data: {
                                                    error_message: "You must be signed in (authenticated) to access this resource.",
                                                    error_context: {
                                                        source_tag: "WdjXjILCRRiJFIVLLo2IXA"

                                                    }
                                                }
                                            }
                                        });
                                        if (errorResponse.error) {
                                            const problem = "During server attempt to report an unauthenticated access exception. " + errorResponse.error;
                                            reportHorribleMishap(problem);
                                        }
                                        return;

                                    } // end if no user session AND authentication required to access this resource

                                    var lastETag =
                                        requestDescriptor.headers["if-none-match"] ||
                                        requestDescriptor.headers["If-None-Match"] ||
                                        requestDescriptor.headers["if-match"] ||
                                        requestDescriptor.headers["If-Match"];

                                    if (!lastETag) {
                                        console.log("----> If-None-Match not specified.");
                                    }
                                    if (lastETag === resourceDescriptor.resource.ETag) {
                                        // Resource has not changed since last request! Respond w/HTTP code 304
                                        // informing the user agent that it's okay to use its cached copy of the resource.
                                        console.log("----> If-None-Match assertion '" + lastETag + "' matches expected value! Responding w/304");
                                        innerResponse = writeResponseFilter.request({
                                            streams: { request: httpRequest_, response: httpResponse_ },
                                            request_descriptor: requestDescriptor,
                                            response_descriptor: {
                                                http: { code: 304, message: "Good to go!" },
                                                headers: {
                                                    ETag: resourceDescriptor.resource.ETag,
                                                    "Cache-Control": "must-revalidate"
                                                },
                                                content: { encoding: "utf8", type: "text/plain" },
                                                data: ""
                                            }
                                        });
                                        if (innerResponse.error) {
                                            const problem = "During server attempt to return HTTP code 304 response to client: " + innerResponse.error;
                                            reportHorribleMishap(problem);
                                        }
                                        break;
                                    }

                                    // Send the user agent an updated copy of the resource with an up-to-date ETag
                                    console.log("----> If-None-Match assertion '" + lastETag + "' is not current value. Responding w/resource + 200");
                                    innerResponse = writeResponseFilter.request({
                                        streams: { request: httpRequest_, response: httpResponse_ },
                                        request_descriptor: requestDescriptor,
                                        response_descriptor: {
                                            http: { code: 200 },
                                            headers: {
                                                ETag: resourceDescriptor.resource.ETag,
                                                "Cache-Control": "must-revalidate",
                                                ...resourceDescriptor.resource.responseHeaders
                                            },
                                            content: {
                                                encoding: resourceDescriptor.resource.contentEncoding,
                                                type: resourceDescriptor.resource.contentType
                                            },
                                            data: resourceDescriptor.resource.data
                                        }
                                    });
                                    if (innerResponse.error) {
                                        const problem = "During server attempt to return in-memory file resource to client " +
                                              "w/expected status 200: " + innerResponse.error;
                                        reportHorribleMishap(problem);
                                    }
                                    break;

                                    // ----------------------------------------------------------------------
                                    // Dynamically composed resources accessed via plugin service filter request.
                                    // ----------------------------------------------------------------------
                                case "service_filter":
                                    // Delegate to the registered plug-in service filter.
                                    // Note that because plug-in service filters include unknown foreign code,
                                    // we make the filter call within a try/catch block and redirect exceptions
                                    // to an HTTP 500 response so that the server process continues listening
                                    // for subsequent requests.

                                    // Block access to authentication-required resources iff not authenticated.
                                    responseType = (resourceDescriptor.resource.contentType !== "text/html")?"application/json":"text/html";
                                    if (resourceDescriptor.resource.authentication.required && ! requestDescriptor.session) {
                                        // ERROR 401: Not Authenticated
                                        errorResponse = errorResponseFilter.request({
                                            integrations: serverContext.integrations,
                                            streams: { request: httpRequest_, response: httpResponse_ },
                                            request_descriptor: requestDescriptor,
                                            error_descriptor: {
                                                http: { code: 401, message: "Not Authenticated" },
                                                content: { encoding: "utf8", type: responseType },
                                                headers: { "WWW-Authenticate": "Bearer" },
                                                data: {
                                                    error_message: "Please login to access this resource.",
                                                    error_context: {
                                                        source_tag: "ailqNeMpRvOYXvFZNBVVGw",
                                                    }
                                                }
                                            }
                                        });
                                        if (errorResponse.error) {
                                            const problem = "During server attempt to report an unauthenticated access exception. " + errorResponse.error;
                                            reportHorribleMishap(problem);
                                        }
                                        return;

                                    } // end if no user session AND authentication required to access this resource

                                    var serviceResponse = null;
                                    var options = arccore.util.clone(resourceDescriptor.resource.options);
                                    try {
                                        serviceResponse = resourceDescriptor.resource.filter.request({
                                            integrations: serverContext.integrations,
                                            request_descriptor: requestDescriptor,
                                            options: options,
                                            streams: { request: httpRequest_, response: httpResponse_ }
                                        });
                                    } catch (exception_) {
                                        console.log(exception_.stack);
                                        var detail = "Exception attempting to dispatch " + routeMethodName + ": '" + exception_.toString() + "'.";

                                        // Use the service filter's declared response content type;
                                        // We want an HTML render of the error if the service is intended to produce an HTML document.
                                        // Or, JSON in the typical case that the service implements an AJAX endpoint.
                                        responseType = (resourceDescriptor.resource.contentType !== "text/html")?"application/json":"text/html";

                                        // ERROR 500: Runtime exception in plugin service filter.
                                        errorResponse = errorResponseFilter.request({
                                            integrations: serverContext.integrations,
                                            streams: { request: httpRequest_, response: httpResponse_ },
                                            request_descriptor: requestDescriptor,
                                            error_descriptor: {
                                                http: { code: 500 },
                                                content: { encoding: "utf8", type: /*'text/html'*/responseType },
                                                data: {
                                                    error_message: detail,
                                                    error_context: {
                                                        source_tag: "IZWbFG3yRfqdgkBqS_Apaw"
                                                    }
                                                }
                                            }
                                        });
                                        if (errorResponse.error) {
                                            const problem = "During server attempt to report an unhandled application exception. " + errorResponse.error +
                                                  "<br><br>The original message was: " + detail;
                                            reportHorribleMishap(problem);
                                        }
                                        return;
                                    } // end catch
                                    if (serviceResponse.error) {
                                        // ERROR 400: Bad or invalid resource request.
                                        errorResponse = errorResponseFilter.request({
                                            integrations: serverContext.integrations,
                                            streams: { request: httpRequest_, response: httpResponse_ },
                                            request_descriptor: requestDescriptor,
                                            error_descriptor: {
                                                http: { code: 400 },
                                                content: { encoding: "utf8", type: "text/html" },
                                                data: {
                                                    error_message: serviceResponse.error,
                                                    error_context: { source_tag: "Kw65-1MVTuKgTS711UYYGQ" }
                                                }
                                            }
                                        });
                                        if (errorResponse.error) {
                                            const problem = "During server attempt to report a handled application error. " + errorResponse.error +
                                                  "<br><br>The original error was: " + serviceResponse.error;
                                            reportHorribleMishap(problem);
                                        }
                                    }
                                    break;

                                default:
                                    var message =  "Resource descriptor type '" + resourceDescriptor.type + "' is not yet implemented by the server.";
                                    // ERROR 405: Unknown/unsupported server resource registration.
                                    errorResponse = errorResponseFilter.request({
                                        integrations: serverContext.integrations,
                                        streams: { request: httpRequest_, response: httpResponse_ },
                                        request_descriptor: requestDescriptor,
                                        error_descriptor: {
                                            http: { code: 405 },
                                            content: { encoding: "utf8", type: "text/html" },
                                            data: {
                                                error_message: message,
                                                error_context: { source_tag: "vloqaQoWQd-w2TPr3N1WLg" }
                                            }
                                        }
                                    });
                                    if (errorResponse.error) {
                                        const problem = "While the server was attempting to reject the client request with error 405: " + errorResponse.error;
                                        reportHorribleMishap(problem);
                                    }

                                    break;
                                } // end switch
                            }, // integrations.get_user_session.result_handler
                            error_handler: function(error_) {
                                var normalizeError = serverContext.integrations.filters.normalize_user_session_error.request(error_);
                                if (normalizeError.error) {
                                    reportHorribleMishap(normalizeError.error);
                                    return;
                                }
                                const problem = "While processing request for user session: " + normalizeError.result;
                                reportHorribleMishap(problem);
                            } // integrations.get_user_session.error_handler
                        });
                        if (innerResponse.error) {
                            const problem = "During server attempt to get user session: " + innerResponse.error;
                            reportHorribleMishap(problem);
                            return;
                        }

                    }); // httpRequest_.on('end'...)
                }
            ); // httpRequestHandler function

            serverContext.common_filters = {
                error: errorResponseFilter,
                write: writeResponseFilter
            };

            // Introspection integration filter
            var innerFactoryResponse = httpServerIntrospectionFilterFactory.request(serverContext);
            if (innerFactoryResponse.error) {
                errors.unshift(innerFactoryResponse.error);
                break;
            }
            serverContext.integrations.filters.get_server_context = innerFactoryResponse.result;

            // Server agent info integration filter.
            innerFactoryResponse = httpServerAgentInfoFilterFactory.request(serverContext);
            if (innerFactoryResponse.error) {
                errors.unshift(innerFactoryResponse.error);
                break;
            }
            serverContext.integrations.filters.get_server_agent_info = innerFactoryResponse.result;

            response.result = {
                http_server_context: serverContext,
                http_server: httpServer,
                listen: function(port_) {
                    serverContext.stats.started = new Date();
                    httpServer.listen(port_, function() {
                        console.log("****************************************************************");
                        console.log("****************************************************************");
                        console.log("****************************************************************");
                        console.log("****************************************************************");
                        console.log("****************************************************************");
                        console.log(`>>>>> Launching ${serverContext.holisticAppBuildManifest.app.name} v${serverContext.holisticAppBuildManifest.app.version}-${serverContext.holisticAppBuildManifest.app.codename} buildID "${serverContext.holisticAppBuildManifest.app.buildID}"`);
                        console.log(`..... App server process instance ID "${serverContext.instanceID}" started at ${serverContext.stats.started.toString()} in "${request_.appServerRuntimeEnvironment}" environment mode.`);
                        console.log(`..... @encapsule/holism v${packageMeta.version} HTTP 1.1 server on Node.js v${process.versions.node} listening at http://localhost:${port_} ...`);
                    });
                }
            };
            break;
        }
        if (errors.length) {
            response.error = errors.join(" ");
        }
        return response;
    }

});

// Handle any error that occurred in arccore.filter.create
if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

// Export the result filter object.
module.exports = factoryResponse.result;
