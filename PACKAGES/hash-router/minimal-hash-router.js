// minimal-hash-router.js
//
// Chris Russell 2016 for Encapsule Project
// Inspired by http://joakimbeng.eu01.aws.af.cm/a-javascript-router-in-20-lines/
//

// eslint
/* global window, location */

var MinimalHashRouter = (function() {

    function MinimalHashRouter() {

        var router = this;
        router.history = [];
        router.hashChangeCallback = null;

        function getCurrentRouteDescriptor() {
            return router.history[router.history.length - 1];
        }

        function recordRouterEvent(source_, hash_) {
            var routeDescriptor = {
                source: source_,
                hash: hash_,
                id: router.history.length
            };
            router.history.push(routeDescriptor);
            return routeDescriptor;
        }

        window.addEventListener("hashchange", function () {
            var routeDescriptor = recordRouterEvent("browser-event", location.hash);
            if (router.hashChangeCallback) {
                // console.log("> hashchange callback: '" + JSON.stringify(routeDescriptor) + "'");
                router.hashChangeCallback(getCurrentRouteDescriptor());
            } else {
                console.log("> hashchange observered (no registered callback): '" + JSON.stringify(routeDescriptor) + "'");
            }
        });

        router.registerChangeCallback = function(callback_) {
            router.hashChangeCallback = callback_;
            var routeDescriptor = recordRouterEvent("router-init", location.hash);
            callback_(routeDescriptor);
            return routeDescriptor;
        };

        router.resetHistory = function () {
            while (router.history.length > 1) {
                router.history.pop();
            }
        };
    }

    return MinimalHashRouter;

})();

module.exports = MinimalHashRouter;
