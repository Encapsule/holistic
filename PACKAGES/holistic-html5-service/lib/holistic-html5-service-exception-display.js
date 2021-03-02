"use strict";

// holistic-tab-service-exception-display.js
var arccore = require("@encapsule/arccore");

(function () {
  var containerStyles = ["margin: 64px", "padding: 2em", "border-radius: 0.5em", "border: 1em solid #999999", "background-color: red", "font-family: Play", "font-size: 14pt", "box-shadow: 0.1em 0.1em 1em 0.05em rgba(0,0,0,0.3)", "background-image: url(/images/warning-error-icon.svg)", "background-position: center", "background-repeat: no-repeat", "color: black"].join("; ");
  var headingIconStyles = ["width: 64px", "height: 64px", "position: relative", "bottom: -13px", "margin-right: 0.33em"].join("; ");
  var initPhaseStyles = ["border-radius: 0.33em", "border-left: 1em solid #FF9F19", "padding: 1em", "margin: 0em", "font-size: larger", "font-family: Roboto", "font-weight: bold", "background-color: rgba(255,255,255 , 0.6)"].join(";");
  var exceptionPaneStyles = ["border: 1px solid rgba(0,0,0,0.1)", "border-radius: 0.25em", "margin-top: 1em", "padding: 1em", "box-shadow: 2px 2px 4px 1px rgba(0,0,0,0.33) inset", "overflow: auto"].join("; ");
  var exceptionPanePREStyles = ["font-family: 'Share Tech Mono'", "font-size: 14pt", "font-weight: bold"].join("; ");
  var versionContainerAStyles = ["display: flex", "justify-content: right"].join("; ");
  var versionContainerBStyles = ["width: 100%"].join("; ");
  var versionContainerCStyles = ["white-space: nowrap", "text-align: right", "margin-top: 1em", "padding: 1em", "border-radius: 0.25em", "border: 1px solid rgba(0,0,0,0.1)", "font-size: 10pt", "opacity: 0.6;"].join("; ");
  var factoryResponse = arccore.filter.create({
    operationID: "cln6SPH5RWWI-HzaCcTYXA",
    operationName: "Display Holistic Tab Service Exception",
    operationDescription: "Takes over the tab service's display adapter and uses DOM API's to re-render a fatal tab service exception error message (hopefuly to a developer).",
    inputFilterSpec: {
      ____label: "Tab Service Exception Display Request",
      ____description: "A request sent to override the tab service's display adapter and take direct control of the DOM to display a fatal tab service exception error to the user.",
      ____types: "jsObject",
      appBuild: {
        ____accept: "jsObject"
      },
      // TODO - we could I guess schematize this but it's okay for now I think.
      headerText: {
        ____accept: "jsString"
      },
      errorText: {
        ____accept: "jsString"
      }
    },
    outputFilterSpec: {
      ____accept: "jsUndefined"
    },
    // No response.result - this is fatal EOL. Browser page reload is only option if this filter is called at any phase of the tab service lifecycle.
    bodyFunction: function bodyFunction(request_) {
      console.warn(request_.headerText);
      console.error("TAB SERVICE FATAL EXCEPTION: ".concat(request_.errorText));
      var targetDomElement = document.getElementById("idServiceDisplay");

      if (targetDomElement === null) {
        throw new Error("Internal error: document.getElementById('idServiceDisplay') returned null value.");
      } // targetDomElement.innerHTML = "";


      var componentR = 255;
      var componentG = 255;
      var componentB = 255;
      var opacity = 1;
      var interval1 = setInterval(function () {
        componentR -= 1.4;
        componentG -= 3;
        componentB -= 2;
        opacity -= 0.03;
        document.body.style.backgroundColor = "rgb(".concat(Math.max(0, componentR), ",").concat(Math.max(0, componentG), ",").concat(Math.max(0, componentB), ")");
        targetDomElement.setAttribute("style", "opacity: ".concat(Math.max(0, opacity)));

        if (componentR <= 0 && componentG <= 0 && componentB <= 0 && opacity <= 0) {
          clearInterval(interval1);
          var innerHTML = "\n<div style=\"".concat(containerStyles, "\" id=\"client-app-error\">\n  <h1><img src=\"/images/warning-error-icon.svg\" style=\"").concat(headingIconStyles, "\"></img>").concat(request_.appBuild.app.name, " v").concat(request_.appBuild.app.version, "-").concat(request_.appBuild.app.codename, "</h1>\n  <h2>Fatal Exception in ").concat(request_.appBuild.app.name, " Tab Service Process</h2>\n  <p>Sorry to report that the ").concat(request_.appBuild.app.name, " tab service has crashed due to a fatal exception.</p>\n  <p>To get to the bottom of this:\n  <ul><li>Read the error carefully.</li><li>Set breakpoints.</li><li>Then, <a href=\"/\"><h3>reboot</h3></a> the tab service.</li></ul>\n  </p>\n  <div style=\"").concat(initPhaseStyles, "\">\n  <p>").concat(request_.headerText, "</p>\n  <div style=\"").concat(exceptionPaneStyles, "\">\n    <div style=\"").concat(exceptionPanePREStyles, "\">").concat(request_.errorText, "</div>\n  </div>\n\n</div>\n  <div style=\"").concat(versionContainerAStyles, "\">\n    <div style=\"").concat(versionContainerBStyles, "\"></div>\n      <div style=\"").concat(versionContainerCStyles, "\">\n        ").concat(request_.appBuild.app.name, " v").concat(request_.appBuild.app.name, "-").concat(request_.appBuild.app.codename, "<br/>\n        ").concat(request_.appBuild.app.buildID, " ").concat(request_.appBuild.app.buildDateISO, "<br/>\n        ").concat(request_.appBuild.app.buildSource, "<br/>\n      </div>\n    </div>\n  </div>\n</div>\n");
          targetDomElement.innerHTML = innerHTML;
          document.body.style.backgroundColor = "black";
          componentR = componentG = componentB = opacity = 0;
          var interval2 = setInterval(function () {
            componentR += 3;
            componentG += 2;
            componentB += 4;
            opacity += 0.2;
            document.body.style.backgroundColor = "rgb(".concat(Math.min(255, componentR), ",").concat(Math.min(255, componentG), ",").concat(Math.min(255, componentB), ")");
            targetDomElement.setAttribute("style", "opacity: ".concat(Math.min(1, opacity)));

            if (componentR >= 255 && componentG >= 255 && componentB >= 255 && opacity >= 1) {
              console.log("Okay... done screwing around w/the DOM styles. Go fix your bug(s) :-)");
              clearInterval(interval2);
            }
          }, 5);
        }
      }, 5);
      return {
        error: null
      };
    } // bodyFunction

  }); // filter factory

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();