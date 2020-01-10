module.exports = {
    ____label: "Packages Map",
    ____description: "A map of package names to semantic version strings. Used to specify build, test, deployment and runtime dependencies of a holistic application.",
    ____types: "jsObject",
    ____asMap: true,
    ____defaultValue: {},
    packageNameKey: {
	    ____label: "Package Semantic Version",
	    ____description: "The semantic version string or git repo specification used to resolve the specific package version required.",
	    ____accept: "jsString"
    }
};
