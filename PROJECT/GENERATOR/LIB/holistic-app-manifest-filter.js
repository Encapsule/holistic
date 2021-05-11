// holisitic-app-manifest-filter.js
//

const arccore = require('@encapsule/arccore');
const packageMapSpec = require('./package-map-spec');

const factoryResponse = arccore.filter.create({
    operationID: "7_bO5OlRRVmas06fQy0Jzg",
    operationName: "Holistic Application Manifest",
    operationDescription: "Used to verify and normalize a holistic application manifest deserialized from developer-specified `holistic-app.json` document.",
    inputFilterSpec: {
	    ____label: "Holistic Application Manifest Object",
	    ____description: "Describes a specific full-stack Node.js/HTML5 application derived from Encapsule/holistic framework. Used as input to the Encapsule/holistic code generator utility.",
	    ____types: "jsObject",
        ____defaultValue: {},
        author: {
            ____label: "Application Author",
            ____description: "The author / owner / operator of this application service.",
            ____accept: "jsString",
            ____defaultValue: "Vaporwarz, Inc.",
            ____appdsl: { copyValue: true }
        },
	    name: {
	        ____label: "Application Name",
	        ____description: "The short name of the application. Used in the application's package.json as the value of the `name` field.",
	        ____accept: "jsString",
            ____defaultValue: "your-package-name",
            ____appdsl: { copyValue: true }

	    },
	    description: {
	        ____label: "Application Description",
	        ____description: "A short description of the application. Used in the application's package.json as the value of the `description` field.",
	        ____accept: "jsString",
            ____defaultValue: "Your package description.",
            ____appdsl: { copyValue: true }
	    },
	    version: {
	        ____label: "Application Version",
	        ____description: "The semantic version string of the application. Used in the application's package.json as the value of the `version` field.",
	        ____accept: "jsString",
            ____defaultValue: "0.0.1",
            ____appdsl: { copyValue: true }
	    },
	    codename: {
	        ____label: "Application Codename",
	        ____description: "The application's \"codename\" - a short string label typically changed whenever the version changes. Used to refer to specific versions/builds.",
	        ____accept: "jsString",
            ____defaultValue: "HelloWorld!",
            ____appdsl: { copyValue: true }
	    },

	    dependencies: {
            ____label: "Application Service Dependencies",
            ____description: "Application-specific npm package dependencies.",
            ____types: "jsObject",
            ____defaultValue: {},
            common: {
                ...packageMapSpec,
                ____label: "Application Service Shared Build/Runtime Dependencies",
                ____description: "3rd-party npm packages that are required at both buildtime and runtime."
            },
            buildtime: {
                ...packageMapSpec,
                ____label: "Application Service Buildtime Dependencies",
                ____description: "3rd-party npm packages that are required to build, test, package, deploy... the runtime package produced by the sources package build.",
            },
            runtime: {
                ...packageMapSpec,
                ____label: "Application Service Runtime Dependencies",
                ____description: "3rd-party npm packages that are required to execute the derived app's Node.js service image."
            }
        },

        scripts: {
            ____label: "Application Sources Package Scripts",
            ____description: "Application-specific script entries to be added to the app's package.json scripts dictionary by appgen.",
            ____types: "jsObject",
            ____defaultValue: {},
            buildtime: {
                ____types: "jsObject",
                ____asMap: true,
                ____defaultValue: {},
                scriptName: {
                    ____label: "Script Command Line",
                    ____description: "Application-specific script command line string.",
                    ____accept: "jsString"
                }
            }
        }

    }

});

if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;
