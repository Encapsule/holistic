"use strict";

var holarchy = require("@encapsule/holarchy");

var kernelConsoleStyles = {
  outerContainerDiv: ["position: absolute", "top: 0px", "bottom: -0px", "left: 0px", "right: -0px", "opacity: 0", "overflow: hidden", "padding: 1em", "font-family: Play", "font-size: 12pt", "color: #0099FF", "z-index: -1"].join("; "),
  logMessageContainerDiv: ["margin-left: 0.5em", "margin-right: 0.5em", "margin-top: 0.25em", "margin-bottom: 0.25em", "padding: 0.25em", "padding-left: 0.5em", "font-family: 'Share Tech Mono'", "font-weight: semibold", "color: #0066CC", "border-left: 0.5em solid rgba(0,0,0,0.025)", "border-radius: 0.33em", "background-color: rgba(0,0,0,0.0125)"].join("; ")
};
var documentTitle = null;
var controllerAction = new holarchy.ControllerAction({
  id: "Aw4XWmZGSn2TM8XWJr642g",
  name: "Holistic App Client Kernel: Root Display Command Processor",
  description: "Provides low-level access to the \"root display\" which is active during kernel boot. And, subsequently only if catastrophic error occurs in the derived app client process or its subprocesses that are not handled by the derived app.",
  actionRequestSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      app: {
        ____types: "jsObject",
        client: {
          ____types: "jsObject",
          kernel: {
            ____types: "jsObject",
            _private: {
              ____types: "jsObject",
              rootDisplayCommand: {
                ____types: "jsObject",
                command: {
                  ____accept: "jsString",
                  ____inValueSet: ["initialize", "show", "hide", "log"],
                  ____defaultValue: "log"
                },
                message: {
                  ____accept: "jsString",
                  ____defaultValue: "N/A"
                }
              }
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____accept: "jsString",
    ____defaultValue: "okay"
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var messageBody = request_.actionRequest.holistic.app.client.kernel._private.rootDisplayCommand;
      var rootDisplayDOMElement = document.getElementById("idAppClientKernelConsoleDisplay");

      if (!rootDisplayDOMElement) {
        errors.push("Unable to initialize the root display because document.getElementById('idAppClientKernelConsoleDisplay') failed to return a DOM element.");
        errors.push("This indicates that the holistic app server process did not render the HTML5 document as we expected. What is up w/that?");
        break;
      }

      switch (messageBody.command) {
        case "initialize":
          documentTitle = document.title;
          document.title = "Booting...";
          rootDisplayDOMElement.setAttribute("style", kernelConsoleStyles.outerContainerDiv);
          var innerHTML = "\n<h2>Holistic App Client Kernel Boot</h2>\n<h3>@encapsule/holistic-app-client-cm v".concat(holarchy.__meta.version, "-").concat(holarchy.__meta.codename, " buildID ").concat(holarchy.__meta.build, "</h3>\n<p>One moment please...</p>\n");
          rootDisplayDOMElement.innerHTML = innerHTML;
          break;

        case "show":
          rootDisplayDOMElement.animate([{
            opacity: 1
          }], {
            duration: 250,
            fill: "forwards"
          });
          break;

        case "hide":
          var style = rootDisplayDOMElement.getAttribute("style");
          rootDisplayDOMElement.setAttribute("style", "".concat(style, " background-color: #66CCFF; opacity: 0.75"));
          rootDisplayDOMElement.animate([{
            opacity: 0
          }], {
            delay: 1000,
            duration: 500,
            fill: "forwards"
          });
          document.title = documentTitle;
          break;

        case "log":
          var newLogMessageElement = document.createElement("div");
          newLogMessageElement.setAttribute("style", kernelConsoleStyles.logMessageContainerDiv);
          var newLogContent = document.createTextNode(messageBody.message);
          newLogMessageElement.appendChild(newLogContent);
          rootDisplayDOMElement.appendChild(newLogMessageElement);
          document.title = request_.context.ocdi.readNamespace({
            apmBindingPath: request_.context.apmBindingPath,
            dataPath: "#.__apmiStep"
          }).result;
          break;

        default:
          errors.push("Internal error: unhandled switch case.");
          break;
      }

      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (!controllerAction.isValid()) {
  throw new Error(controllerAction.toJSON());
}

module.exports = controllerAction;