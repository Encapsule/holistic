// http-server-config-filter.js

const fs = require("fs");

const arccore = require("@encapsule/arccore");

const packageMeta = require("../package.json");

var factoryResponse = arccore.filter.create({
    operationID: "XLec0u2wRwiCt1N46wHBkg",
    operationName: "HTTP Server Routing Model Generator",
    operationDescription: "HTTP server routing model construction filter.",

    // This filter is instantiated by the HTTP server filter factory and is
    // leveraged at runtime by the factory to process the configuration request
    // object passed to the factory. As the filter factory (itself a filter)
    // as already validated/normalized the input, we skip this step here.

    inputFilterSpec: {
        ____label: "HTTP Server Filter Factory Request Copy",
        ____description: "Pre-validated/normalized HTTP server filter factory request descriptor object.",
        ____opaque: true
    },
    outputFilterSpec: {
        ____label: "HTTP Server Routing Model",
        ____description: "Reference to an Encapsule/jsgraph DirectedGraph container.",
        ____accept: "jsObject"
    },

    bodyFunction: function(request_) {

        var response = { error: null, result: null };
        var errors = [];
        const serverContext = request_;

        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            var factoryResponse = arccore.graph.directed.create({
                name: serverContext.name,
                description: serverContext.description,
            });
            if (factoryResponse.error) {
                errors.unshift(factoryResponse.error);
                errors.unshift("Unable to instantiate digraph model.");
                break;
            }
            var routingModel = factoryResponse.result;

            var memoryFileBytesTotal = 0;

            for (var filename in serverContext.config.files) {

                if (!fs.existsSync(filename)) {
                    errors.unshift("Unable to locate static file resource '" + filename + "'.");
                    break;
                }

                var resourceStats = fs.statSync(filename);
                var resourceSizeBytes = resourceStats.size;
                memoryFileBytesTotal += resourceSizeBytes;

                // console.log(JSON.stringify(resourceStats));

                var resource = fs.readFileSync(filename);
                const resourceETag = `${packageMeta.name}::${arccore.identifier.irut.fromReference(resource.toString("utf8")).result}`;

                console.log("> '" + filename + "': ETag='" + resourceETag + "' " + resourceStats.size + " (bytes)");

                var resourceDeclaration = serverContext.config.files[filename];
                var resourceDescriptor = {
                    authentication: resourceDeclaration.authentication,
                    contentEncoding: resourceDeclaration.response_properties.contentEncoding,
                    contentType: resourceDeclaration.response_properties.contentType,
                    responseHeaders: resourceDeclaration.response_properties.responseHeaders,
                    data: (resourceDeclaration.response_properties.contentEncoding === "binary")?resource:resource.toString("utf8"),
                    sizeBytes: resourceSizeBytes,
                    ETag: resourceETag,
                    id: filename
                };
                for (var uri of resourceDeclaration.request_bindings.uris) {
                    var routeMethodName = resourceDeclaration.request_bindings.method+ ":" + uri;
                    if (routingModel.isVertex(routeMethodName)) {
                        errors.unshift("Illegal duplicate URI '" + uri + "' specified for static file resource '" + filename + "'.");
                        break;
                    }
                    routingModel.addVertex({
                        u: routeMethodName,
                        p: {
                            type: "memory_file",
                            resource: resourceDescriptor
                        }
                    });
                } // end for
                if (errors.length)
                    break;
            } // end for memory files

            if (errors.length)
                break;

            console.log(`MEMORY-CACHED FILES: ${memoryFileBytesTotal} (bytes)`);

            for (var serviceDescriptor of serverContext.config.services) {
                resourceDescriptor = {
                    authentication: serviceDescriptor.authentication,
                    contentEncoding: serviceDescriptor.response_properties.contentEncoding,
                    contentType: serviceDescriptor.response_properties.contentType,
                    method: serviceDescriptor.request_bindings.method,
                    filter: serviceDescriptor.filter,
                    options: serviceDescriptor.options,
                    id: [
                        serviceDescriptor.filter.filterDescriptor.operationID,
                        serviceDescriptor.filter.filterDescriptor.operationVDID,
                        serviceDescriptor.filter.filterDescriptor.operationName
                    ].join("::")
                };
                for (uri of serviceDescriptor.request_bindings.uris) {
                    routeMethodName = serviceDescriptor.request_bindings.method + ":" + uri;
                    if (routingModel.isVertex(routeMethodName)) {
                        errors.unshift("Illegal duplicate URI '" + uri + "' specified for service resource filter '" +
                                       serviceDescriptor.filter.filterDescriptor.operationName + "' (" +
                                       serviceDescriptor.filter.filterDescriptor.operationID + ")");
                        break;
                    }
                    routingModel.addVertex({
                        u: routeMethodName,
                        p: {
                            type: "service_filter",
                            resource: resourceDescriptor
                        }
                    });
                }
            } // end for services
            response.result = routingModel;
            break;
        }
        if (errors.length) {
            response.error = errors.join(" ");
        }
        return response;
    }
});

if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;
