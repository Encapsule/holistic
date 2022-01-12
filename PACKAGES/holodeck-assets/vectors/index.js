"use strict";

(function () {
  module.exports = {
    //        holarchy_cm: require("./holarchy-cm-package-tests/vector-sets"),
    holarchy: require("./holarchy-package-tests/vector-sets"),
    //         holistic_app_client_cm: require("./holistic-app-client-cm-package-tests/vector-sets"),
    holistic_app_common_cm: require("./holistic-app-common-cm-package-tests/vector-sets"),
    holistic_app_server_cm: require("./holistic-app-server-cm-package-tests/vector-sets"),
    holodeck: require("./holodeck-package-tests/vector-sets")
  };
})();