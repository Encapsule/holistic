"use strict";

var holarchy = require("@encapsule/holarchy");

module.exports = [new holarchy.ControllerAction({
  id: "BO184bcvSzmr9oF4KJynSA",
  name: "Bogus Controller Test Action #1",
  description: "Do nothing nothing test controller action plug-in filter #2.",
  actionRequestSpec: {
    ____types: "jsObject",
    noop0: {
      ____accept: "jsBoolean",
      ____inValueSet: [true]
    }
  }
}), new holarchy.ControllerAction({
  id: "93_stDeORb-9W_0d69fswg",
  name: "NOOP Controller Test Action #2",
  description: "Do nothing test controller action plug-in filter #2.",
  actionRequestSpec: {
    ____types: "jsObject",
    noop1: {
      ____accept: "jsBoolean",
      ____inValueSet: [true]
    }
  },
  bodyFunction: function bodyFunction(request_) {
    return {
      error: null
    };
  }
}), new holarchy.ControllerAction({
  id: "BO184bcvSzmr9oF4KJynSA",
  name: "NOOP Controller Test Action #3",
  description: "Do nothing nothing test controller action plug-in filter #3.",
  actionRequestSpec: {
    ____types: "jsObject",
    noop2: {
      ____accept: "jsBoolean",
      ____inValueSet: [true]
    }
  },
  bodyFunction: function bodyFunction(request_) {
    return {
      error: null
    };
  }
}), new holarchy.ControllerAction({
  id: "xhOHH7qqQCira4Cz3ZVG_Q",
  name: "NOOP Controller Action #4 (w/result)",
  description: "Do nothing test controller action plug-in filter #4 returns a result.",
  actionRequestSpec: {
    ____types: "jsObject",
    noop3: {
      ____accept: "jsObject" // any object that we're going to return as our result

    }
  },
  actionResultSpec: {
    ____types: "jsObject",
    CONSPICUOUS_TEST_LABEL: {
      ____accept: "jsObject" // we want to return the object sent via actionRequest.noop3

    }
  },
  bodyFunction: function bodyFunction(request_) {
    return {
      error: null,
      result: {
        CONSPICUOUS_TEST_LABEL: request_.actionRequest.noop3
      }
    };
  }
}), new holarchy.ControllerAction({
  id: "Zll03EOdQ-G6Q7UEEuAycg",
  name: "Chain Action Call #1",
  description: "A simple ControllerAction that calls another ControllerAction to ensure that nested calls to OPC.act correctly return results.",
  actionRequestSpec: {
    ____types: "jsObject",
    chainer1: {
      ____accept: "jsBoolean"
    }
  },
  actionResultSpec: {
    ____accept: "jsObject" // We'll return whatever the inner call to OPC.act returns.

  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;
    var innerResponse;

    while (!inBreakScope) {
      inBreakScope = true;
      innerResponse = request_.context.act({
        actorName: "Inner Test Actor",
        actorTaskDescription: "Dispatch another call to OPC.act inside of another ControllerAction to ensure result gets returned correctly through OPC.act.",
        actionRequest: {
          noop3: {
            MESSAGE_FROM_CHAIN_ACTION_CALL: {
              test: "whatever"
            }
          }
        }
      });

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      response.result = innerResponse.result;
      break;
    }

    return innerResponse;
  }
})];