// http-server-agent-result-spec.js

module.exports = {
    ____label: "Holism Application Agent Descriptor",
    ____description: "Application stack components and version information.",
    ____types: "jsObject",
    app: {
        ____label: "Application Information",
        ____description: "Developer-specified information about the derived application.",
        ____types: "jsObject",
        name: {
            ____label: "Application Name",
            ____description: "The name of the derived application.",
            ____accept: "jsString"
        },
        version: {
            ____label: "Application Version",
            ____description: "The semantic version string of the application.",
            ____accept: "jsString"
        },
        build: {
            ____label: "HTTP Server Build Info",
            ____description: "Metadata used to diagnose deployments of this application.",
            ____types: "jsObject",
            timestamp: {
                ____label: "HTTP Server Built Time",
                ____description: "The ISO-format time that this application server was built.",
                ____accept: "jsString",
            },
            commit: {
                ____label: "HTTP Server Sources Commit",
                ____description: "The git commit hash containing the source code used to build this application server.",
                ____accept: "jsString",
            }
        }
    },
    integrations: {
        ____label: "Integration Filters Information",
        ____description: "Information about the Encapsule/holism integration filter set leveraged by this application.",
        ____types: "jsObject",
        name: {
            ____label: "Integrations Name",
            ____description: "The name of Encapsule/holism integration filter set.",
            ____accept: "jsString"
        },
        version: {
            ____label: "Integrations Version",
            ____description: "A semantic version string of the integration filter set.",
            ____accept: "jsString"
        }
    },
    server: {
        ____label: "HTTP Server Information",
        ____description: "Information about the Encapsule/holism HTTP server package this application derives from.",
        ____types: "jsObject",
        name: {
            ____label: "HTTP Server Name",
            ____description: "The name of Encapsule/holism packge leveraged by this application.",
            ____accept: "jsString"
        },
        version: {
            ____label: "HTTP Server Version",
            ____description: "A semantic version string of the Encapsule/holism package.",
            ____accept: "jsString"
        }
    },
    platform: {
        ____label: "Runtime Platform",
        ____description: "Information about the platform infrastructure packages leveraged by this application.",
        ____types: "jsObject",
        data: {
            ____label: "Data Processing Subsystem",
            ____description: "Information about the build of Encapsule/ARCcore package leveraged by this application.",
            ____types: "jsObject",
            name: {
                ____label: "Data Processor Name",
                ____description: "The name of Encapsule/ARCcore package leveraged by this application.",
                ____accept: "jsString"
            },
            version: {
                ____label: "Data Processor Version",
                ____description: "A semantic version string of the Encapsule/ARCcore package leveraged by this application.",
                ____accept: "jsString"
            },
            codename: {
                ____label: "Data Processor Codename",
                ____description: "The build codename of the Encapsule/ARCcore package leveraged by this application.",
                ____accept: "jsString"
            },
            buildID: {
                ____label: "Data Processor Build",
                ____description: "This build identifier of the Encapsule/ARCcore package leveraged by this applicaiton.",
                ____accept: "jsString"
            }
        },
        document: {
            ____label: "Document Rendering Subsystem",
            ____description: "Information about the HTML document rendering subsystem leveraged by this application.",
            ____types: "jsObject",
            name: {
                ____label: "Document Renderer Name",
                ____description: "The name of the HTML document rendering subsystem leveraged by this applicaiton.",
                ____accept: "jsString"
            },
            version: {
                ____label: "Document Renderer Version",
                ____description: "A semantic version string of the HTML document rendering subsystem leveraged by this application.",
                ____accept: "jsString"
            }
        },
        runtime: {
            ____label: "Node.js Runtime Environment",
            ____description: "Node.js process runtime environment information",
            ____accept: "jsObject"
        }
    }, // platform
    instance: {
        ____label: "Application Instance",
        ____description: "Information about this specific runtime instance of the application server process.",
        ____types: "jsObject",
        id: {
            ____label: "Server Instance ID",
            ____description: "A unique 22-character IRUT identifier assigned to the application server at process startup.",
            ____accept: "jsString"
        },
        ts: {
            ____label: "Instance Start Time",
            ____description: "The time that this application server instance was started.",
            ____accept: "jsString"
        },
        fy: {
            ____label: "Instance Start Year",
            ____description: "The full current year that the server was started.",
            ____accept: "jsNumber"
        }
    } // instance
};
