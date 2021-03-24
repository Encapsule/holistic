"use strict";

var arccore = require("@encapsule/arccore");

var opcActorStackEntrySpec = require("../filters/iospecs/opc-actor-stack-entry-spec");

var consoleColorsLUT = require("./console-colors-lut");

var logLevelLUT = {
  info: console.info,
  diagnostc: console.log,
  warn: console.warn,
  error: console.error
};
var factoryResponse = arccore.filter.create({
  operationID: "h7lnSqFxSgma0qvNdZqOZg",
  operationName: "Holarchy Logger",
  operationDescription: "Abstracts logging of @encapsule/holarchy diagnostic and error logging.",
  outputFilterSpec: {
    ____accept: "jsUndefined"
    /*response.result is always undefined*/

  },
  inputFilterSpec: {
    ____label: "Holarchy Logger Request",
    ____types: "jsObject",
    opc: {
      ____label: "OPC Info",
      ____types: "jsObject",
      ____defaultValue: {},
      id: {
        ____label: "OPC ID",
        ____accept: "jsString",
        ____defaultValue: "not specified"
      },
      iid: {
        ____label: "OPC IID",
        ____accept: "jsString",
        ____defaultValue: "not specified"
      },
      name: {
        ____label: "OPC Name",
        ____accept: "jsString",
        ____defaultValue: "not specified"
      },
      evalCount: {
        ____label: "Evaluation Count",
        ____description: "The current OPC evaluation count.",
        ____accept: "jsNumber",
        ____defaultValue: 0
      },
      frameCount: {
        ____label: "Frame Count",
        ____description: "The current OPC evaluation frame count.",
        ____accept: "jsNumber",
        ____defaultValue: 0
      },
      actorStack: {
        ____label: "OPC Actor Stack",
        ____description: "A reference to the OPC's private actor stack (may be undefined).",
        ____types: "jsArray",
        ____defaultValue: [],
        element: opcActorStackEntrySpec
      }
    },
    logLevel: {
      ____label: "Log Level",
      ____description: "A flag indicating a severity of message.",
      ____accept: "jsString",
      ____inValueSet: ["info", "diagnostic", "warn", "error"],
      ____defaultValue: "info"
    },
    subsystem: {
      ____label: "Subsystem Name",
      ____description: "Name of the @encapsule/holarchy subsystem (oftentimes ES6 class name).",
      ____accept: "jsString",
      ____inValueSet: ["opc"],
      ____defaultValue: "opc"
    },
    method: {
      ____label: "Method Name",
      ____description: "Subsystem method name (oftentimes an ES6 class method name).",
      ____accept: "jsString",
      ____inValueSet: ["constructor", "act", "evaluate"]
    },
    phase: {
      ____label: "Method Phase",
      ____description: "Subsystem method phase (e.g. prologue, body, epilogue).",
      ____accept: "jsString"
    },
    message: {
      ____label: "Message String",
      ____description: "The message string to log.",
      ____accept: "jsString"
    }
  },
  // inputFilterSpec
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true; // console.log(JSON.stringify(request_));  // This should probably be the default option.
      // Locate the subsystem.

      var subsystemStyles = consoleColorsLUT[request_.subsystem];

      if (!subsystemStyles) {
        errors.push("Unhandled subsystem value '".concat(request_.subsystem, "'."));
        break;
      } // Locate the method.


      var methodStyles = subsystemStyles[request_.method];

      if (!methodStyles) {
        errors.push("Unhandled subsystem method value '".concat(request_.method, "'."));
        break;
      } // Locate the phase.


      var styles = methodStyles[request_.phase];

      if (!styles) {
        errors.push("Unhandled subsystem method phase value '".concat(request_.phase, "'."));
        break;
      } // Send the output to selected console method.


      var consoleMethod = logLevelLUT[request_.logLevel];

      if (!consoleMethod) {
        errors.push("Unhandled logLevel value '".concat(request_.logLevel, "'."));
        break;
      }

      styles += "border-radius: 3px;"; // TODO: Parameterize this.

      switch (request_.logLevel) {
        case "error":
          styles += "background-color: #FF6633; font-weight: bold;";
          break;

        case "warning":
          styles += "background-color: #FFCC66;";
          break;

        default:
          break;
      }

      var message = null;
      var actorStack = null;

      switch (request_.subsystem) {
        case "opc":
          switch (request_.method) {
            case "constructor":
              message = ["%cOPC::constructor <".concat(request_.opc.iid, ">[").concat(request_.opc.id, "::").concat(request_.opc.name, "]"), request_.message].join(" ");
              consoleMethod(message, styles);
              break;

            case "act":
              actorStack = request_.opc.actorStack.map(function (stackEntry_) {
                return "(".concat(stackEntry_.actorName, ")");
              }).join(" > ");
              message = ["%cOPC::act <".concat(request_.opc.iid.substr(0, 4), "...> actor stack: ").concat(actorStack)];
              var border = "8px solid ".concat(consoleColorsLUT.opc.act.borderColor);
              var marginLeft = "".concat(12 * (request_.opc.actorStack.length - 1), "px");
              styles += "border-left: ".concat(border, "; margin-left: ").concat(marginLeft, ";");

              switch (request_.phase) {
                case "prologue":
                  styles += "border-top: 4px solid ".concat(consoleColorsLUT.opc.act.borderTopColor, ";");

                  if (request_.opc.actorStack.length === 1) {
                    styles += "margin-top: 1em";
                  }

                  message.push(request_.message);
                  break;

                case "body":
                  message = ["%cOPC::act <".concat(request_.opc.iid.substr(0, 4), "...>")];
                  message.push(request_.message);
                  break;

                case "epilogue":
                  styles += "border-bottom: 4px solid ".concat(consoleColorsLUT.opc.act.borderBottomColor, ";");
                  message.push(request_.message);
                  break;

                default:
                  errors.push("Unhandled subsystem method phase '".concat(request_.phase, "'."));
                  break;
              }

              if (!errors.length) {
                consoleMethod(message.join(" "), styles);
              }

              break;

            case "evaluate":
              message = ["%cOPC::evaluate <".concat(request_.opc.iid.substr(0, 4), "...> [").concat(request_.opc.evalCount, ":").concat(request_.opc.frameCount, "] ").concat(request_.message)].join(" ");
              consoleMethod(message, styles);
              break;

            default:
              errors.push("Unhandled method '".concat(request_.method, "' specified on subsystem '").concat(request_.subsystem, "'."));
              break;
          }

          break;

        default:
          errors.push("Unhandled subsystem '".concat(request_.subsystem, "' value."));
          break;
      } // end switch


      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  } // bodyFunction

});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

var loggerFilter = factoryResponse.result; // THROWS ON BAD REQUEST

module.exports = {
  filterDescriptor: loggerFilter.filterDescriptor,
  request: function request(request_) {
    var loggerResponse = loggerFilter.request(request_);

    if (loggerResponse.error) {
      var message = ["Invalid logger request '".concat(JSON.stringify(request_), "':"), loggerResponse.error].join(" ");
      throw new Error(message);
    }

    return loggerResponse;
  }
};