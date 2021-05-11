// holistic-app-framework-manifest-filter.js


(function() {

    const arccore = require('@encapsule/arccore');
    const packageMapSpec = require('./package-map-spec');

    const factoryResponse = arccore.filter.create({
        operationID: "XzQWD4ivQLK6ycjwN2cFSQ",
        operationName: "Holistic Platform Manifest",
        operationDescription: "Used to verify and normalize a holistic framework manifest object that defines information pertinent to the creation of a holistic application's package.json manifest.",
        inputFilterSpec: {
	        ____label: "Holistic Platform Manifest Descriptor",
	        ____description: "Describes information pertinent to the build, test, and packaging of web applications derived from the Encapsule/holistic framework.",
	        ____types: "jsObject",

            dependencies: {
                ____label: "Holistic Platform Package Dependencies",
                ____types: "jsObject",
                ____defaultValue: {},
                common: {
                    ...packageMapSpec,
                    ____label: "App Platform Shared Build/Runtime Dependencies",
                    ____description: "Holistic platform dependencies that are required at both buildtime and runtime."
                },
                buildtime: {
                    ...packageMapSpec,
                    ____label: "App Service Build Sources Dependencies",
                    ____description: "Holistic platform dependencies required to build, test, and package a derived application service runtime pacakge suitable for deployment."
                },
                runtime: {
                    ...packageMapSpec,
                    ____label: "App Service Runtime Deployment Dependencies",
                    ____description: "Holistic platform dependencies required to execute the derived app's Node.js service image."
                }
            },
            engines: {
                ____label: "Holistic Platform Global Engines Contraints",
                ____description: "Contrains the Node.js host and npm versions used to build a derived app service. And, to subsequently install and execute the generated runtime package's Node.js service.",
                ____types: "jsObject",
                node: { ____accept: "jsString" /* semver (typically a range) */ },
                npm: { ____accept: "jsString" /* semver (typically a range) */ }
            },
            scripts: {
                ____types: "jsObject",
                ____defaultValue: {},
                buildtime: {
                    ____types: "jsObject",
                    ____asMap: true,
                    ____defaultValue: {},
                    scriptName: { ____accept: "jsString" }
                },
                runtime: {
                    ____types: "jsObject",
                    ____asMap: true,
                    ____defaultValue: {},
                    scriptName: { ____accept: "jsString" }
                }
            }
        } // inputFilterSpec
    });

    if (factoryResponse.error) {
        throw new Error(factoryResponse.error);
    }

    module.exports = factoryResponse.result;

})();

