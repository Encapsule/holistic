// sources/server/services/service-rainier-ux-data/data-gateway-router-factory.js

const arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
    operationID: "8q8sOAYyT5K9oviGZumYgQ",
    operationName: "Data Gateway Router Factory",
    operationDescription: "Constructs a filter that routes its request to an appropriate holism service filter for further processing.",
    inputFilterSpec: {
        ____label: "Data Gateway Router Factory Request",
        ____types: "jsObject",
        serviceFilters: {
            ____label: "Service Filter Array",
            ____types: "jsArray",
            serviceFilter: {
                ____label: "Data Gateway Filter Object",
                ____accept: "jsObject"
            }
        }
    }, // inputFilterSpec
    bodyFunction: function(factoryRequest_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            let serviceFilterMap = {};
            let routingFilters = [];
            let ids = [];

            factoryRequest_.serviceFilters.forEach((serviceFilter_) => {
                const innerRequestFilter = serviceFilter_.implementation.innerRequestFilter;
                const innerRequestFilterId = innerRequestFilter.filterDescriptor.operationID;
                if (serviceFilterMap[innerRequestFilterId]) {
                    errors.push(`Duplicate service filter ID '${serviceFilter_.filterDescriptor.operationID}'.`);
                } else {
                    serviceFilterMap[innerRequestFilterId] = serviceFilter_;
                    routingFilters.push(innerRequestFilter);
                    ids.push(innerRequestFilterId);
                }
            });
            if (errors.length) {
                break;
            }

            let innerFactoryResponse = arccore.discriminator.create({
                id: "Hu9_XEAeTWO-CiDhgiqEPA",
                name: "Holistic Node.js Service Data Gateway Discriminator",
                description: "Used to route incoming GET/POST requests to appropriate backend handler for processing.",
                filters: routingFilters,
                options: { action: "getFilterID" }
            });
            if (innerFactoryResponse.error) {
                errors.push(innerFactoryResponse.error);
                break;
            }

            const discriminator = innerFactoryResponse.result;

            const routerId = arccore.identifier.irut.fromReference(ids.sort().join("")).result;

            innerFactoryResponse = arccore.filter.create({
                operationID: routerId,
                operationName: "Data Gateway Message Router",
                operationDescription: `1:N routing to [${ids.join(", ")}]...`,
                bodyFunction: (request_) => {

                    console.log(`..... ${routerId}::Data Gateway Message Router`);

                    // Pass the incoming request into our specialized arccore.discriminator instance.
                    // It will either reject the request message. Or, it will tell us the IRUT identifier
                    // of the target service's inner request processor filter which is responsible for
                    // validating/normalizing the incoming HTTP request...
                    const discriminatorResponse = discriminator.request(request_);
                    // Did the discriminator reject the request message?
                    if (discriminatorResponse.error) {
                        return discriminatorResponse;
                    }
                    const targetServiceInnerRequestFilterId = discriminatorResponse.result;
                    const targetServiceFilter = serviceFilterMap[targetServiceInnerRequestFilterId];
                    const delegationResponse = targetServiceFilter.request(request_);
                    return delegationResponse;
                }
            });
            if (innerFactoryResponse.error) {
                errors.push(innerFactoryResponse.error);
                break;
            }

            response.result = {
                ...innerFactoryResponse.result,
                routedServices: factoryRequest_.serviceFilters
            };


            break;
        }
        if (errors.length) {
            response.error = errors.join(" ");
        }
        return response;
    }, // bodyFunction
    outputFilterSpec: {
        ____label: "Data Gateway Router Filter",
        ____description: "An arccore.discriminator filter instance used to route incoming data gateway request messages from the HTTP layer to a specific request handler for servicing.",
        ____accept: "jsObject"
    }
});

if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;
