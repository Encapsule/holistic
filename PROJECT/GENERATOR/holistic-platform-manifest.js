// holistic-platform-manifest.js

const arccore = require("@encapsule/arccore");
const holisticAppPlatformManifestFilter = require('./LIB/holistic-platform-manifest-filter');

const filterResponse = holisticAppPlatformManifestFilter.request({

    applicationPackageManifest: {
        engines: { node: "14.15.5", yarn: ">=1.22.0 <=1.22.5" },

        scripts: {
            install: "# Installation complete. Enjoy the holistic platform 8>",
            clean: "make clean",
            scrub: "make scrub",
            reset: "make reset",
            build: "make application",
            start: "node ./BUILD/runtime-phase3/SERVER/server.js",
            server: "yarn build && yarn start",
            "debug-server": "node --inspect-brk ./BUILD/runtime-phase3/SERVER/server.js",
            iruts: "./node_modules/.bin/arc_generateIRUT",
            appinfo: 'echo "\nHOLISTIC APP MANIFEST (created by developer) ===" && cat ./holistic-app.json && echo "\nHOLISTIC APP PACKAGE (created by appgen) ===" && cat ./package.json && "HOLISTIC APP PLATFORM JSON (Tools and RTL\'s installed by appgen) ===" && cat ./HOLISTIC/PACKAGES/holistic.json &&',
            holodeck: "./TESTS/holodeck/run-test-program.js"
        }
    },

    platformDependencies: {

        // Holistic platform build and test library dependencies.
        "@babel/cli": "7.10.5",
        "@babel/core": "7.10.5",
        "@babel/plugin-transform-react-jsx": "7.10.4",
        "@babel/preset-env": "7.10.4",
        "chai": "^4.2.0",
        "eslint": "7.4.0",
        "mockery": "^2.1.0",
        "webpack": "4.43.0",
        "webpack-cli": "3.3.12",
        "css-loader": "3.6.0",
        "style-loader": "1.2.1",
        "handlebars": "^4.7.6", // TODO: exorcise this codebase of handlebars

        // Holistic platform runtime library dependencies.
        "@encapsule/arccore": arccore.__meta.version,
        "@encapsule/arctools": arccore.__meta.version,
        "@encapsule/d2r2": "file:./HOLISTIC/PACKAGES/d2r2",
        "@encapsule/d2r2-components": "file:./HOLISTIC/PACKAGES/d2r2-components",
        "@encapsule/holarchy": "file:./HOLISTIC/PACKAGES/holarchy",
        "@encapsule/holarchy-cm": "file:./HOLISTIC/PACKAGES/holarchy-cm",
        "@encapsule/holism": "file:./HOLISTIC/PACKAGES/holism",
        "@encapsule/holism-metadata": "file:./HOLISTIC/PACKAGES/holism-metadata",
        "@encapsule/holism-services": "file:./HOLISTIC/PACKAGES/holism-services",
        "@encapsule/holistic-html5-service": "file:./HOLISTIC/PACKAGES/holistic-html5-service",
        "@encapsule/holistic-service-core": "file:./HOLISTIC/PACKAGES/holistic-service-core",
        "@encapsule/holistic-nodejs-service": "file:./HOLISTIC/PACKAGES/holistic-nodejs-service",
        "@encapsule/holodeck": "file:./HOLISTIC/PACKAGES/holodeck",
        "@encapsule/holodeck-assets": "file:./HOLISTIC/PACKAGES/holodeck-assets",
        "@encapsule/hrequest": "file:./HOLISTIC/PACKAGES/hrequest",

        // Third-party runtime library dependencies.
        "color": "^3.1.0",
        "color-string": "^1.5.3",
        "commander": "^2.19.0",
        "query-string": "^6.2.0",
        "mkdirp": "^1.0.4",
        "react": "16.12.0",
        "react-dom": "16.12.0",
        "react-markdown": "^2.5.0",
        "request": "^2.88.0"

    } // devDependencies

});

if (filterResponse.error) {
    throw new Error(filterResponse.error);
}

module.exports = filterResponse.result;
