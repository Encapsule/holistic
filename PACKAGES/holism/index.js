// index.js

const packageMeta = require("./package.json");

const httpServerFilterFactory = require("./lib/http-server-filter-factory");
const httpServerIntegrationFiltersFactory = require("./lib/http-integration-filters-factory");
const httpServerServiceFilterFactory = require("./lib/http-service-filter-factory");

const writeResponseFilter = require("./lib/http-response-write-filter");
const serializeResponseFilter = require("./lib/http-response-serialize-filter");
const errorResponseFilter = require("./lib/http-response-error-filter");

const serviceDataGateway = require("./lib/service-data-gateway");
const dataGatewayRouterFactory = require("./lib/data-gateway-router-factory");

module.exports = {
    __meta: {
        author: packageMeta.author,
        name: packageMeta.name,
        version: packageMeta.version,
        codename: packageMeta.codename,
        build: packageMeta.buildID,
        source: packageMeta.buildSource
    },
    server: {
        create: httpServerFilterFactory.request
    },
    service: {
        create: httpServerServiceFilterFactory.request,
        library: {
            dataGateway: serviceDataGateway
        }
    },
    integrations: {
        create: httpServerIntegrationFiltersFactory.request
    },
    filters: {
        factories: {
            integrations: httpServerIntegrationFiltersFactory,
            service: httpServerServiceFilterFactory,
            serviceRouter: dataGatewayRouterFactory,
            server: httpServerFilterFactory
        },
        responders: {
            error: errorResponseFilter,
            serialize: serializeResponseFilter,
            writer: writeResponseFilter,
        }
    }
};

