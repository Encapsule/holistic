// package-map-filter.js

const arccore = require('@encapsule/arccore');
const packageMapSpec = require('./package-map-spec');

const factoryResponse = arccore.filter.create({
    operationID: "kHkp4rgFSciQecriF4LglQ",
    operationName: "Package Map",
    operationDescription: "Used to verify and normalize a map of package names to semantic version strings.",
    outputFilterSpec: packageMapSpec
});

if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;


