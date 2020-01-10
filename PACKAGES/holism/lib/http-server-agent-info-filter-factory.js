// http-server-agent-info-factory.js

const process = require("process");

const packageMeta = require("../package.json");
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
                    var now = new Date();
                    var response = {
                        error: null,
                        result: {
                            app: {
                                name: serverContext.name,
                                version: serverContext.version,
                                build: serverContext.build
                            },
                            integrations: {
                                name: serverContext.integrations.name,
                                version: serverContext.integrations.version,
                            },
                            server: {
                                name: packageMeta.name,
                                version: packageMeta.version,
                            },
                            platform: {
                                data: {
                                    name: arccore.__meta.author + "/" + arccore.__meta.name,
                                    version: arccore.__meta.version,
                                    codename: arccore.__meta.codename,
                                    buildID: arccore.__meta.buildID
                                },
                                document: {
                                    name: serverContext.integrations.platform.document.name,
                                    version: serverContext.integrations.platform.document.version,
                                },
                                runtime: process.versions
                            },
                            instance: {
                                id: serverContext.instanceID,
                                ts: now.toISOString(),
                                fy: now.getFullYear()
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
