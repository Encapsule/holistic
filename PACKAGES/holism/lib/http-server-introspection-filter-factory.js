// http-server-introspection-filter-factory.js

const arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
    operationID: "V-Q1L8M8SDeS8FHF-cnxhQ",
    operationName: "HTTP Server Introspection Filter Factory",
    operationDescription: "Generates a filter that returns information about the HTTP server and its registered " +
        "service and integration filter configurations.",
    inputFilterSpec: {
        ____label: "HTTP Server Context Descriptor",
        ____accept: "jsObject"
    },
    outputFilterSpec: {
        ____label: "HTTP Server Introspection Integration Filter",
        ____accept: "jsObject"
    },

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            var serverContext = request_;
            var operationName = serverContext.name + " Server Introspection Filter";
            var operationID = arccore.identifier.irut.fromReference(operationName).result;
            var innerFactoryResponse = arccore.filter.create({
                operationID: operationID,
                operationName: operationName,
                operationDescription: "Provides access to HTTP service filter's private server context namespace.",
                inputFilterSpec: { ____types: "jsUndefined" },
                outputFilterSpec: {
                    ____label: "HTTP Server Context Descriptor",
                    ____accept: "jsObject"
                },
                bodyFunction: function() { // no in-params
                    var response = { error: null, result: null };
                    var innerResponse = serverContext.integrations.filters.get_server_agent_info.request();
                    if (innerResponse.error) {
                        response.error = innerResponse.error;
                    } else {
                        response.result = {
                            agent: innerResponse.result,
                            context: serverContext
                        };
                    }
                    return response;
                }
            });
            if (innerFactoryResponse.error) {
                errors.unshift(innerFactoryResponse.error);
                break;
            }
            response.result = innerFactoryResponse.result;
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
