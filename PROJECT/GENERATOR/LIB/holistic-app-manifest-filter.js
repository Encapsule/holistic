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
	    applicationDependencies: packageMapSpec
    }
});

if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;
