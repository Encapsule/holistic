// http-server-agent-result-spec.js

const httpServerFilterFactoryRequestSpec = require("./http-server-filter-factory-request-spec");

module.exports = {
    ____label: "Holism Application Agent Descriptor",
    ____description: "Application stack components and version information.",
    ____types: "jsObject",
    build: httpServerFilterFactoryRequestSpec.holisticAppBuildManifest,
    instance: {
        ____label: "Holistic App Server Instance Data",
        ____description: "Information about this specific holistic app server instance deployment.",
        ____types: "jsObject",
        id: { ____accept: "jsString" },
        environment: httpServerFilterFactoryRequestSpec.appServerRuntimeEnvironment,
        startTime: { ____accept: "jsNumber" },
        currentTime: { ____accept: "jsNumber" },
        host: { ____accept: "jsObject" } // Node.js environment metadata
    }
};
