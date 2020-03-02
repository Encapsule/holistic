// holistic-app-framework-manifest-filter.js

const arccore = require('@encapsule/arccore');
const packageMapSpec = require('./package-map-spec');

const factoryResponse = arccore.filter.create({
    operationID: "XzQWD4ivQLK6ycjwN2cFSQ",
    operationName: "Holistic Framework Manifest",
    operationDescription: "Used to verify and normalize a holistic framework manifest object that defines information pertinent to the creation of a holistic application's package.json manifest.",
    inputFilterSpec: {
	    ____label: "Holistic Framework Manifest",
	    ____description: "Describes information pertinent to the build, test, and packaging of web applications derived from the Encapsule/holistic framework.",
	    ____types: "jsObject",

        applicationPackageManifest: {
            ____label: "App Package Manifest Data",
            ____description: "Values specified by the holistic platform that are written into a derived application's package.json",
            ____types: "jsObject",

            engines: {
                ____types: "jsObject",
                node: {
                    ____accept: "jsString" // semver range
                }
            },

            scripts: {
                ____types: "jsObject",
                ____asMap: true,
                scriptName: { ____accept: "jsString" }
            }

        }, // appPackageManifest

	    platformDependencies: packageMapSpec

    } // inputFilterSpec

});

if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;

