"use strict";

// holodeck-harness-filter-base-context-spec.js
module.exports = {
  ____label: "Holodeck Harness Dispatch Context",
  ____description: "A structure passed down through the holodeck harness filters selected to execute a holodeck program that tracks configuration and log locations.",
  ____types: "jsObject",
  logRootDir: {
    ____label: "Log Root Directory",
    ____description: "The local filesystem directory path set as the root of this holodeck environment's program evaluation logs structure. Does not change.",
    ____accept: "jsString"
  },
  logCurrentDirPath: {
    ____label: "Current Log Directory Tokens",
    ____description: "An array of directory name(s) to be joined w/logRootDir to deduce the directory path into which test harness evaluation logs from the sub-program request should be written.",
    ____types: "jsArray",
    ____defaultValue: [],
    directoryName: {
      ____label: "Subdirectory Name",
      ____description: "The name of a subdirectory in which tests that occur in the subprogram should be written when they are evaluated.",
      ____accept: "jsString"
    }
  },
  programRequestPath: {
    ____label: "Program Request Path",
    ____description: "An array of tokens derived from parsing a programRequest tree that is used to report diagnostic and error messages (e.g. the path in a programRequest that contains a syntax error).",
    ____types: "jsArray",
    ____defaultValue: [],
    requestPathToken: {
      ____label: "Program Request Token",
      ____description: "Start always with ~ indicating the programRequest itself. Additional tokens follow arccore.filter path conventions for logs and errors messages.",
      ____accept: "jsString"
    }
  },
  config: {
    ____label: "Program Configuration",
    ____description: "A structure passed down though the holodeck harness tree selected to process a programRequest tree that tracks configuration information used to inform specific details and customizations of the sub-program request.",
    ____types: "jsObject",
    ____asMap: true,
    ____defaultValue: {},
    configName: {
      ____label: "Configuration Data",
      ____description: "Either an object or a string set by a holodeck configuration harness. There is not pre-specified schema for holodeck options; this detail is up to holodeck config harness authors.",
      ____opaque: true
    }
  }
};