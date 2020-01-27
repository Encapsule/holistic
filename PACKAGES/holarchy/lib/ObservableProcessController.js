"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var arccore = require("@encapsule/arccore");

var constructorFilter = require("./filters/opc-method-constructor-filter");

var actInputFilter = require("./filters/opc-method-act-input-filter");

var actOutputFilter = require("./filters/opc-method-act-output-filter");

var evaluateFilter = require("./filters/opc-method-evaluate-filter");

var ObservableProcessController =
/*#__PURE__*/
function () {
  function ObservableProcessController(request_) {
    _classCallCheck(this, ObservableProcessController);

    // #### sourceTag: Gql9wS2STNmuD5vvbQJ3xA
    try {
      var errors = [];
      var inBreakScope = false; // Allocate private per-class-instance state.

      this._private = {};

      while (!inBreakScope) {
        inBreakScope = true; // ----------------------------------------------------------------
        // Bind instance methods.
        // public

        this.isValid = this.isValid.bind(this);
        this.toJSON = this.toJSON.bind(this);
        this.act = this.act.bind(this); // private

        this._evaluate = this._evaluate.bind(this); // ----------------------------------------------------------------
        // Normalize the incoming request descriptor object.

        var filterResponse = constructorFilter.request(request_);

        if (filterResponse.error) {
          errors.push("Failed while processing constructor request.");
          errors.push(filterResponse.error);
          break;
        } // ****************************************************************
        // ****************************************************************
        // KEEP A COPY OF THE NORMALIZED OUTPUT OF THE CONSTRUCTION FILTER
        // We no longer care about the request input; internal methods
        // should only access this._private. Clients of this class should
        // not deference data in an OPC instance's _private namespace.
        // The names, types, and semantics of this information can change
        // release to release as an implementation of this library. Only
        // ever rely on public methods which we will try to keep stable.
        //


        this._private = filterResponse.result; // Perform the first post-construction evaluation of the OPC system model
        // if the instance was constructed in "automatic" evaluate mode.

        if (this._private.options.evaluate.firstEvaluation === "constructor") {
          // Wake the beast up... Perform the initial post-construction evaluation.
          filterResponse = this._evaluate();

          if (filterResponse.error) {
            errors.push("Failed while executing the first post-construction system evaluation:");
            errors.push(filterResponse.error);
            break;
          }
        }

        break;
      } // while(!inBreakScope)


      if (errors.length) {
        errors.unshift("ObservableProcessController::constructor for [".concat(request_ && request_.id ? request_.id : "unspecified", "::").concat(request_ && request_.name ? request_.name : "unspecified", "] failed yielding a zombie instance."));
        this._private.constructionError = {
          error: errors.join(" ")
        };
      }

      if (this._private.constructionError) {
        console.error("ObservableProcessController::constructor failed: ".concat(this._private.constructionError.error));
      } else {
        console.log("ObservableProcessController::constructor complete.");
      }

      console.log("opci=");
      console.log(this);
      console.log("================================================================");
    } catch (exception_) {
      var message = ["ObserverableProcessController::constructor (no-throw) caught an unexpected runtime exception: ", exception_.message].join(" ");
      this._private.constructionError = message;
      console.error(message);
      console.error(exception_.stack);
    }
  } // end constructor function
  // ================================================================
  // PUBLIC API METHODS
  // All external interactions with an ObservableProcessController class instance
  // should be via public API methods. Do not dereference the _private data
  // namespace or call underscore-prefixed private class methods.
  // Determines if the OPMI is valid or not.
  // Called w/no options_, returns Boolean true iff ObservableProcessController::constructor succeeded. Otherwise false.


  _createClass(ObservableProcessController, [{
    key: "isValid",
    value: function isValid(options_) {
      try {
        if (!options_ || !options_.getError) {
          return this._private.constructionError ? false : true;
        }

        return {
          error: this._private.constructionError ? this._private.constructionError.error : null,
          result: this._private
        };
      } catch (exception_) {
        var message = ["ObservableProcessController::isValid (no-throw) caught an unexpected runtime exception: ", exception_.message].join(" ");
        console.error(message);
        console.error(exception_.stack);
        return {
          error: message
        };
      }
    } // Produces a serializable object representing the internal state of this OPCI.

  }, {
    key: "toJSON",
    value: function toJSON() {
      try {
        if (!this.isValid()) {
          return this.isValid({
            getError: true
          });
        }

        return this._private;
      } catch (exception_) {
        var message = ["ObservableProcessController.toJSON (no-throw) caught an unexpected runtime exception: ", exception_.message].join(" ");
        console.error(message);
        console.error(exception_.stack);
        return {
          error: message
        };
      }
    } // toJSON method

  }, {
    key: "act",
    value: function act(request_) {
      try {
        var response = {
          error: null
        };
        var errors = [];
        var inBreakScope = false;

        while (!inBreakScope) {
          inBreakScope = true;

          if (!this.isValid()) {
            // Retrieve just the error string, not the entire response.
            errors.push("Zombie instance:");
            errors.push(this.toJSON());
            break;
          }

          var filterResponse = actInputFilter.request(request_);

          if (filterResponse.error) {
            errors.push("Bad request:");
            errors.push(filterResponse.error);
            break;
          }

          var request = filterResponse.result; // Push the actor stack.

          this._private.opcActorStack.push({
            actorName: request.actorName,
            actionDescription: request.actionDescription
          }); // Prepare the controller action plug-in filter request descriptor object.


          var controllerActionRequest = {
            context: {
              opmBindingPath: request.opmBindingPath,
              ocdi: this._private.ocdi,
              act: this.act
            },
            actionRequest: request.actionRequest
          }; // Dispatch the actor's requested action.

          var actionResponse = this._private.actionDispatcher.request(controllerActionRequest); // If a transport error occurred dispatching the controller action,
          // skip any futher processing (including a possible evaluation)
          // and return. Transport errors represent serious flaws in a derived
          // app/service that must be corrected. We skip possible evaluation
          // that would normally occur to make it simpler for developers to diagnose
          // the transport error.


          if (actionResponse.error) {
            errors.push("Error dispatching controller action filter. Skipping any further evaluation.");
            errors.push(actionResponse.error);
            break;
          } // If no errors have occurred then there's by definition at least
          // one pending action on the actor stack. This is so because
          // controller actions may delegate to other controller actions via
          // re-entrant calls to ObservableProcessController.act method.
          // Such delegations are non-observable, i.e. they are atomic
          // with respect to OPC evaluation. So, we only re-evaluate when
          // we have finished the last of >= 1 controller action plug-in
          // filter delegations. And, this propogates the net effects of
          // the controller action as observed in the contained ocdi according


          if (this._private.opcActorStack.length === 1) {
            var evaluateResponse = this._evaluate();

            if (evaluateResponse.error) {
              errors.push("Unable to evaluate OPC state after executing controller action due to error:");
              errors.push(evaluateResponse.error);
              break;
            }

            response.result = {
              actionResult: actionResponse.result,
              lastEvaluation: evaluateResponse.result
            };
          }

          break;
        }

        if (errors.length) {
          response.error = errors.join(" ");
          console.error("OPC.act transport error: ".concat(response.error));
        } // Pop the actor stack.


        this._private.opcActorStack.pop();

        return response;
      } catch (exception_) {
        var message = ["ObservableProcessController.act (no-throw) caught an unexpected exception: ", exception_.message].join(" ");
        console.error(message);
        console.error(exception_.stack);
        return {
          error: message
        };
      }
    } // act method
    // ================================================================
    // PRIVATE IMPLEMENTATION METHODS
    // By convention underscore-prefixed class methods should never be called
    // outside of the implementation of public and private methods in this class.
    //

  }, {
    key: "_evaluate",
    value: function _evaluate() {
      try {
        // #### sourceTag: A7QjQ3FbSBaBmkjk_F8AMw
        // Deletegate to the evaluation filter.
        var evalFilterResponse = evaluateFilter.request({
          opcRef: this
        });
        this._private.lastEvalResponse = evalFilterResponse;
        this._private.evalCount++;
        console.log("================================================================");
        console.log("ObservableProcessController::_evaluate complete.");
        console.log("evalResponse=");
        console.log(evalFilterResponse);
        console.log("================================================================");
        return evalFilterResponse;
      } catch (evaluateException_) {
        var message = ["ObservableProcessController:_evaluate (no-throw) caught an unexpected runtime exception: ", evaluateException_.message].join(" ");
        console.error(message);
        console.error(exception_.stack);
        return {
          error: message
        };
      }
    } // _evaluate method

  }]);

  return ObservableProcessController;
}();

module.exports = ObservableProcessController;