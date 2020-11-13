// http-server-agent-info-factory.js

const process = require("process");
const arccore = require("@encapsule/arccore");
const httpServerAgentResultSpec = require("./iospecs/http-server-agent-result-spec");

var factoryResponse = arccore.filter.create({
    operationID: "ePqJLVgWSBKHegexl5Pxfg",
    operationName: "HTTP Server Agent Info Filter Factory",
    operationDescription: "Generates an HTTP server filter agent descriptor object identifying components in the application server stack.",
    inputFilterSpec: {
        ____label: "HTTP Server Context Descriptor",
        ____accept: "jsObject"
    },
    outputFilterSpec: {
        ____label: "HTTP Server Agent Info Integration Filter",
        ____accept: "jsObject"
    },
    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;
            var serverContext = request_;
            var operationName = serverContext.name + " Server Agent Filter";
            var operationID = arccore.identifier.irut.fromReference(operationName).result;
            var innerFactoryResponse = arccore.filter.create({
                operationID: operationID,
                operationName: operationName,
                operationDescription: "Generates an HTTP server filter agent descriptor identifying application server software components.",
                inputFilterSpec: { ____types: "jsUndefined" },
                outputFilterSpec: httpServerAgentResultSpec,
                bodyFunction: function() { // no in-parameters
                    var response = {
                        error: null,
                        result: {
                            build: serverContext.holisticAppBuildManifest,
                            instance: {
                                id: serverContext.instanceID,
                                environment: serverContext.appServerRuntimeEnvironment,
                                startTime: Math.round(serverContext.stats.started.getTime() / 1000),
                                currentTime: Math.round((new Date()).getTime() / 1000),
                                host: process.versions
                            }
                        }
                    };
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
