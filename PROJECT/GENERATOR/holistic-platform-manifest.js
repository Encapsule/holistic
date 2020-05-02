// holistic-platform-manifest.js

const arccore = require("@encapsule/arccore");
const holisticAppPlatformManifestFilter = require('./LIB/holistic-platform-manifest-filter');

const filterResponse = holisticAppPlatformManifestFilter.request({

    applicationPackageManifest: {
        engines: { node: ">=12.16.1 <13", yarn: ">=1.22.0 <=1.22.4" },

        scripts: {
            install: "# Installation complete. Enjoy the holistic platform 8>",
            clean: "make clean",
            scrub: "make scrub",
            reset: "make reset",
            build: "make application",
            start: "node ./BUILD/runtime-phase3/SERVER/server.js",
            server: "yarn build && yarn start",
            "debug-server": "yarn build && node --inspect-brk ./BUILD/runtime-phase3/SERVER/server.js",
            iruts: "./node_modules/.bin/arc_generateIRUT",
            appinfo: 'echo "\nHOLISTIC APP MANIFEST (created by developer) ===" && cat ./holistic-app.json && echo "\nHOLISTIC APP PACKAGE (created by appgen) ===" && cat ./package.json && "HOLISTIC APP PLATFORM JSON (Tools and RTL\'s installed by appgen) ===" && cat ./HOLISTIC/PACKAGES/holistic.json &&',
            holodeck: "./TESTS/holodeck/run-test-program.js"
        }
    },

    platformDependencies: {

        // Holistic platform build and test library dependencies.
        "@babel/cli": "^7.8.4",
        "@babel/core": "^7.8.7",
        "@babel/plugin-transform-react-jsx": "^7.8.3",
        "@babel/preset-env": "^7.8.7",
        "chai": "^4.2.0",
        "eslint": "^5.10.0",
        "mockery": "^2.1.0",
        "webpack": "4.42.0",
        "webpack-cli": "3.3.11",
        "css-loader": "3.0.0",
        "style-loader": "0.23.1",
        "handlebars": "^4.7.6",

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
        "@encapsule/holistic-app-client-cm": "file:./HOLISTIC/PACKAGES/holistic-app-client-cm",
        "@encapsule/holistic-app-common-cm": "file:./HOLISTIC/PACKAGES/holistic-app-common-cm",
        "@encapsule/holistic-app-server-cm": "file:./HOLISTIC/PACKAGES/holistic-app-server-cm",
        "@encapsule/holodeck": "file:./HOLISTIC/PACKAGES/holodeck",
        "@encapsule/holodeck-assets": "file:./HOLISTIC/PACKAGES/holodeck-assets",
        "@encapsule/hrequest": "file:./HOLISTIC/PACKAGES/hrequest",

        // Third-party runtime library dependencies.
        "color": "^3.1.0",
        "color-string": "^1.5.3",
        "commander": "^2.19.0",
        "query-string": "^6.2.0",
        "mkdirp": "^1.0.4",
        "query-string": "^6.2.0",
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
