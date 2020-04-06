"use strict";

// Intrinisic holodeck v2 plug-in harness filters are included in every holodeck v2 environment instance automatically.
module.exports = [require("./holodeck-intrinsic-config-harness-class"), // handles programRequest to configure tests for a specific class
require("./holodeck-intrinsic-config-harness-filter"), // handles programRequest to congifure tests for a specific filter
require("./holodeck-intrinsic-config-harness-method"), // handles programRequest to configure tests for a specific class method
require("./holodeck-intrinsic-config-harness-package"), // handles programRequest to configure tests for specific distribution package
require("./holodeck-intrinsic-config-harness-program"), // handles programRequest to configure tests for a specific program (aka app, service...) TODO: rename service I think
require("./holodeck-intrinsic-config-harness-subsystem"), // handles programRequest to configure tests for a specific service subsystem
require("./holodeck-intrinsic-config-harness-test-set") // handles programRequest to congfigure a set of tests to evaluate in the current holodeck program
];