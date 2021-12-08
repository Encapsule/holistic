"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
  O       o O       o O       o
  | O   o | | O   o | | O   o |
  | | O | | | | O | | | | O | |
  | o   O | | o   O | | o   O |
  o       O o       O o       O
*/
// @encapsule/holarchy - the keystone of holistic app platform
// Copyright (C) 2020 Christopher D. Russell for Encapsule Project
var arccore = require("@encapsule/arccore");

var ObservableControllerData = require("../ObservableControllerData");

var ocdRuntimeSpecAspects = require("./iospecs/ocd-runtime-spec-aspects");

var opcMethodConstructorInputSpec = require("./iospecs/opc-method-constructor-input-spec");

var opcMethodConstructorOutputSpec = require("./iospecs/opc-method-constructor-output-spec");

var intrinsics = require("../intrinsics/OPC");

var factoryResponse = arccore.filter.create({
  operationID: "XXile9azSHO39alE6mMKsg",
  operationName: "OPC Constructor Request Processor",
  operationDescription: "Filter used to normalize the request descriptor object passed to ObservableProcessController constructor function.",
  inputFilterSpec: opcMethodConstructorInputSpec,
  outputFilterSpec: opcMethodConstructorOutputSpec,
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;
    var filterResponse;

    var _loop = function _loop() {
      inBreakScope = true;
      console.log("OPC::constructor [".concat(request_.id, "::").concat(request_.name, "] enter..."));
      console.log("> Processing cellular service class definition..."); // Note that if no failure occurs in this filter then response.result
      // will be assigned to OPCI this._private namespace.

      var result = {
        // meta
        id: null,
        iid: null,
        name: null,
        description: null,
        options: null,
        apmMap: {},
        ocdTemplateSpec: null,
        ocdRuntimeSpec: {},
        opmiSpecPaths: [],
        ocdi: null,
        transitionDispatcherFilterMap: {},
        transitionDispatcher: null,
        actionDispatcherFilterMap: {},
        actionDispatcher: null,
        evalCount: 0,
        lastEvalResponse: null,
        opcActorStack: [],
        constructionWarnings: []
      }; // Populate as we go and assign to response.result iff !response.error.
      // ================================================================
      // Before we even get started, confirm that that the ID is valid.
      // And, take care of defaulting name and description (that depends on id
      // so that's why we don't use ____defaultValue)

      if (request_.id === "demo") {
        result.id = arccore.identifier.irut.fromEther();
      } else {
        filterResponse = arccore.identifier.irut.isIRUT(request_.id);

        if (filterResponse.error) {
          errors.push(filterResponse.error);
          return "break";
        }

        if (!filterResponse.result) {
          errors.push("Please supply a valid IRUT. Or, use the special 'demo' keyword to have a one-time-use random IRUT assigned.");
          errors.push(filterResponse.guidance);
          return "break";
        }

        result.id = request_.id;
      } // ================================================================
      // Keep copies of normalized and validated metadata entries.


      result.iid = arccore.identifier.irut.fromEther(); // Considered unlikey to fail so just returns the IRUT string.

      result.name = request_.name ? request_.name : "Unnamed OPC";
      result.description = request_.description ? request_.description : "Undescribed OPC";
      result.options = request_.options; // ================================================================
      // Build a map of AbstractControllerModel instances.
      // Note that there's a 1:N relationship between an APM declaration and binding instances of an APM.
      // This is because a single APM declaration may be bound to an arbitrary number of OCD namespaces.

      console.log("> Registering AbstractProcessModel instances...");
      request_.abstractProcessModelSets.push(intrinsics.models);

      for (var index0 = 0; index0 < request_.abstractProcessModelSets.length; index0++) {
        var modelSet = request_.abstractProcessModelSets[index0];

        for (var index1 = 0; index1 < modelSet.length; index1++) {
          var apm = modelSet[index1];
          var apmID = apm.getID();

          if (result.apmMap[apmID]) {
            errors.push("While processing AbstractProcessModel instance registrations:");
            errors.push("Illegal duplicate APM identifier '".concat(apmID, "' for model name '").concat(apm.getName(), "' with description '").concat(apm.getDescription(), "'."));
            break;
          }

          result.apmMap[apmID] = apm;
        } // for model in array


        if (errors.length) {
          break;
        }
      } // for array of models in array


      if (errors.length) {
        return "break";
      }

      if (!Object.keys(result.apmMap).length) {
        var message = "WARNING: No AbstractProcessModel class instances registered!";
        console.warn(message);
        result.constructionWarnings.push(message);
      }

      console.log("> Processing cell runtime plane memory specification..."); // ================================================================
      // Instantiate a temporary filter for the purposes of validating and normalizing the developer-specified OCD template spec.

      var factoryResponse = arccore.filter.create({
        operationID: "demo",
        inputFilterSpec: request_.ocdTemplateSpec
      });

      if (factoryResponse.error) {
        errors.push("While attempting to verify and normalize developer-defined request.ocdTemplateSpec:");
        errors.push(factoryResponse.error);
        return "break";
      } // Save the normalized copy of the dev-specified ocdTemplateSpec. This is useful to developers.


      result.ocdTemplateSpec = JSON.parse(JSON.stringify(factoryResponse.result.filterDescriptor.inputFilterSpec)); // ================================================================
      // Find all the APM-bound namespaces in the developer-defined OCD template spec
      // and synthesize the OCD's runtime filter spec from template + APM-provided template + OPC overlay aspects.
      // Traverse the controller data filter specification and find all namespace declarations containing an APM binding.

      var errorRootNamespace = "Rejecting OCD spec template. The root namespace must be declared with literally just the ____types: \"jsObject\" quanderscore directive; no other directives are allowed in ~ namespace.";
      console.log("> Locating cell activation coordinates in cell runtime plane memory specification..."); // Analyze the type constraint on the root namespace, ~, of the ocdTemplateSpec.

      if (result.ocdTemplateSpec.____opaque || result.ocdTemplateSpec.____accept || Array.isArray(result.ocdTemplateSpec.____types) || result.ocdTemplateSpec.____types !== "jsObject") {
        errors.push(errorRootNamespace);
        return "break";
      }

      var ocdRuntimeBaseSpec = _objectSpread({
        ____label: "OPC [".concat(result.id, "::").concat(result.name, "] Observable Controller Data Store"),
        ____description: "OPC [".concat(result.id, "::").concat(result.name, "] system process runtime state data managed by OPC instance.")
      }, ocdRuntimeSpecAspects.aspects.opcProcessStateRootOverlaySpec);

      var keys = Object.keys(result.ocdTemplateSpec);
      var quanderscoreCount = 0;

      while (keys.length) {
        var key = keys.shift();

        if (key.startsWith("____")) {
          quanderscoreCount++;
          continue;
        } // TODO: We need a comprehensive break-down of concerns when affecting this sort
        // of transformation generally over filter specs (we do a lot of this and it should
        // be very efficient). This reliance on JSON.stringify is BS... And arccore.clone
        // is not general purpose. Perhaps it is possible to use filter spec annotations of
        // intent and judicious conditional application of clever spread operator tricks?


        ocdRuntimeBaseSpec[key] = JSON.parse(JSON.stringify(request_.ocdTemplateSpec[key]));
      } // while keys


      if (quanderscoreCount > 1) {
        errors.push(errorRootNamespace);
        return "break";
      } // if quanderscoreCount > 1


      var namespaceQueue = [{
        lastSpecPath: null,
        specPath: "~",
        specRef: ocdRuntimeBaseSpec,
        newSpecRef: result.ocdRuntimeSpec
      }];

      while (namespaceQueue.length) {
        // Retrieve the next record from the queue.
        var record = namespaceQueue.shift(); // Determine if the current spec namespace has an APM binding annotation.

        var provisionalSpecRef = null;

        if (record.specRef.____appdsl && record.specRef.____appdsl.apm) {
          // Extract the APM IRUT identifer from the developer-defined OCD spec namespace descriptor ____appdsl annotation.
          var _apmID = record.specRef.____appdsl.apm; // Verify that it's actually an IRUT.

          if (arccore.identifier.irut.isIRUT(_apmID).result) {
            //
            // Found a dev-specific template spec namespace with an APM binding annoation...
            // Do not take action on namespaces that are declared to be anything other than
            // a descriptor object; as with the root OCD namespace,~, beyond the requirement
            // that the binding namespace be a descriptor object, any other developer-specified
            // filter spec qunderscore directives are stripped by OPC during OCD runtime spec
            // synthesis. The remainder of the APM's descriptor object definition is then
            // merged over bound namespace. Namespace name collisions are resolved in favor
            // of the bound APM's descriptor object filter spec W/OUT WARNING.
            //
            var acceptBinding = false; // presume bad APM binding

            var optionalNamespace = false;
            var nsTypesArray = null;

            if (record.specRef.____accept) {
              nsTypesArray = Array.isArray(record.specRef.____accept) ? record.specRef.____accept : [record.specRef.____accept];
            }

            if (record.specRef.____types) {
              nsTypesArray = Array.isArray(record.specRef.____types) ? record.specRef.____types : [record.specRef.____types];
            }

            if (nsTypesArray && nsTypesArray.length < 3) {
              if (-1 < nsTypesArray.indexOf("jsObject")) {
                if (!record.specRef.____asMap) {
                  if (nsTypesArray.length === 1) {
                    acceptBinding = true;
                  } else {
                    if (-1 < nsTypesArray.indexOf("jsUndefined")) {
                      acceptBinding = true;
                      optionalNamespace = true;
                    }
                  }
                }
              }
            }

            if (!acceptBinding) {
              // Issue a warning and move on. No binding.
              var warningMessage = "WARNING: OCD runtime spec path '".concat(record.specPath, "' will not be bound to APM ID '").concat(_apmID, "'. Namespace must be a descriptor object (i.e. not a map) declared as ____types: \"jsObject\".");
              result.constructionWarnings.push(warningMessage);
              console.warn(warningMessage);
              console.log({
                specRef: record.specRef,
                specPath: record.specPath
              });
              provisionalSpecRef = _objectSpread({}, record.specRef);
              delete provisionalSpecRef.____appdsl.apm;
              provisionalSpecRef.____appdsl.opcWarning = warningMessage;
            } // if namespace binding ignored due to spec problem
            else {
                // determine if there's a corresponding APM registration.
                var _apm = result.apmMap[_apmID];

                if (_apm) {
                  // BINDING TO REGISTERED APM
                  // Yes - There is a registered APM with this ID. Perform the requisite filter spec merge into the OCD runtime spec.
                  // Save the spec path and apmRef in an array. This allows us to see all the live bindings in the OCD runtime spec.
                  result.opmiSpecPaths.push({
                    specPath: record.specPath,
                    opmiRef: _apm
                  }); // TODO: This should probably just be the OPM ID

                  var opcSpecOverlay = ocdRuntimeSpecAspects.aspects.opcProcessModelBindingRootOverlaySpec;

                  var apmSpecOverlay = _apm.getDataSpec();

                  provisionalSpecRef = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, record.specRef), apmSpecOverlay), opcSpecOverlay), {}, {
                    ____types: optionalNamespace ? ["jsObject", "jsUndefined"] : "jsObject"
                  });
                } else {
                  // No - this is a perfectly valid APM binding annotation. However, there is no such model registered. So, take no action.
                  var _warningMessage = "WARNING: OCD runtime spec path '".concat(record.specPath, "' will not be bound to APM ID '").concat(_apmID, "'. Unknown/unregistered APM specified.");

                  result.constructionWarnings.push(_warningMessage);
                  console.warn(_warningMessage);
                  provisionalSpecRef = _objectSpread({}, record.specRef);
                  provisionalSpecRef.____appdsl.opcWarning = _warningMessage;
                  delete provisionalSpecRef.____appdsl.apm;
                } // else no apm registered to complete this binding with

              } // else the binding is on a valid namespace descriptor and we'll consider it

          } // if apm binding
          else {
              var _warningMessage2 = "WARNING: OCD runtime spec path '".concat(record.specPath, "' will not be bound to APM ID '").concat(_apmID, "'. Invalid ID IRUT specified.");

              result.constructionWarnings.push(_warningMessage2);
              console.warn(_warningMessage2);
              provisionalSpecRef = _objectSpread({}, record.specRef);
              provisionalSpecRef.____appdsl.opcWarning = _warningMessage2;
              delete provisionalSpecRef.____appdsl.apm;
            }
        } // if apm-bound instance
        // Use the provision spec if defined. Otherwise, continue to process the spec from the queue record.


        var workingSpecRef = provisionalSpecRef ? provisionalSpecRef : record.specRef; // Evaluate the properties of the current namespace descriptor in the workingSpec.

        var _keys = Object.keys(workingSpecRef);

        while (_keys.length) {
          var _key = _keys.shift();

          if (_key.startsWith("____")) {
            record.newSpecRef[_key] = workingSpecRef[_key];
          } else {
            record.newSpecRef[_key] = {};
            namespaceQueue.push({
              lastSpecPath: record.specPath,
              specPath: "".concat(record.specPath, ".").concat(_key),
              specRef: workingSpecRef[_key],
              newSpecRef: record.newSpecRef[_key]
            });
          }
        }
      } // while namespaceQueue.length


      if (errors.length) {
        errros.unshift("While synthesizing OCD runtime spec:");
        return "break";
      } // ================================================================
      // Construct the contained Observable Controller Data that the OPC instance uses to manage the state associated with APM instances.


      console.log("> Configuring cell runtime plane memory controller...");
      var ocdInstance = new ObservableControllerData({
        spec: result.ocdRuntimeSpec,
        data: request_.ocdInitData
      });

      if (!ocdInstance.isValid()) {
        errors.push("Unable to initialize the OPC instance's shared OCD store due to constructor failure:");
        errors.push(ocdInstance.toJSON());
        return "break";
      }

      result.ocdi = ocdInstance;
      console.log("+ Cell plane memory controller configured; read/write access to cellplane enabled."); // ================================================================
      // Build an arccore.discrimintor filter instance to route controller
      // action request messages to a registitered controller action filter
      // for processing. This is an application of the Discriminated Message
      // Routing (DMR) pattern.

      var controllerActionFilters = []; // Flatten the array of array of ControllerAction classes and extract their arccore.filter references.

      console.log("> Configuring cell runtime plane action request bus...");
      request_.controllerActionSets.push(intrinsics.actions);
      request_.controllerActionSets.forEach(function (controllerActionSet_) {
        controllerActionSet_.forEach(function (controllerActionInstance_) {
          if (!controllerActionInstance_.isValid()) {
            var _warningMessage3 = "WARNING: Ignoring invalid ControllerAction class instance: ".concat(controllerActionInstance_.toJSON());

            result.constructionWarnings.push(_warningMessage3);
          } else {
            var filter = controllerActionInstance_.getFilter();
            var id = filter.filterDescriptor.operationID; // Silently de-duplicate.

            if (!result.actionDispatcherFilterMap[id]) {
              result.actionDispatcherFilterMap[id] = filter;
              controllerActionFilters.push(filter);
            }
          }
        });
      });

      if (controllerActionFilters.length >= 2) {
        filterResponse = arccore.discriminator.create({
          // TODO: At some point we will probably switch this is force resolution of the target filter ID
          // add another layer of detail to the evaluation algorithm. (we would like to know the ID of the
          // controller action filters that are called and we otherwise do not know this because it's
          // not encoded obviously in a controller action's request.
          id: "m5zuWIlrS9CZksZJ3RcJ8g",
          name: "Controller Action Discriminator",
          description: "Routes controller action requests to an appropriate ControllerAction filter for processing with the context of an OPC instance.",
          options: {
            action: "getFilter"
          },
          filters: controllerActionFilters
        });

        if (filterResponse.error) {
          errors.push(filterResponse.error);
          return "break";
        }

        result.actionDispatcher = filterResponse.result;
        console.log("+ Action request bus configured to route arbitrary request object to 1 of ".concat(controllerActionFilters.length, " registered ControllerAction plug-in filters."));
      } else {
        var _warningMessage4 = "WARNING: No ControllerAction class instances have been registered!";
        result.constructionWarnings.push(_warningMessage4);
        console.warn(_warningMessage4);
        result.actionDispatcher = {
          request: function request() {
            return {
              error: "No ControllerAction class instances registered!"
            };
          }
        };
      } // ================================================================
      // Build an arccore.discriminator filter instance to route transition
      // operatror request messages to a registered transition operator
      // filter for processing. This is an application of the Discriminated
      // Message Routing (DMR) pattern.


      var transitionOperatorFilters = []; // Flatten the array of array of TransitionOperator classes and extract their arccore.filter references.

      console.log("> Configuring cell runtime plane operator request bus...");
      request_.transitionOperatorSets.push(intrinsics.operators);
      request_.transitionOperatorSets.forEach(function (transitionOperatorSet_) {
        transitionOperatorSet_.forEach(function (transitionOperatorInstance_) {
          if (!transitionOperatorInstance_.isValid()) {
            var _warningMessage5 = "WARNING: Ignoring invalid TransitionOperator class instance: ".concat(transitionOperatorInstance_.toJSON());

            result.constructionWarnings.push(_warningMessage5);
          } else {
            var filter = transitionOperatorInstance_.getFilter();
            var id = filter.filterDescriptor.operationID; // Silently de-duplicate.

            if (!result.transitionDispatcherFilterMap[id]) {
              result.transitionDispatcherFilterMap[id] = filter;
              transitionOperatorFilters.push(filter);
            }
          }
        });
      });

      if (transitionOperatorFilters.length >= 2) {
        filterResponse = arccore.discriminator.create({
          // TODO: At some point we will probably switch this is force resolution of the target filter ID
          // add another layer of detail to the evaluation algorithm. (we would like to know the ID of the
          // transition operator filters that are called and we otherwise do not know this because it's
          // not encoded obviously in a transition operator's request.
          id: "H2IIkM5ZTfW_G-JxJgsOdg",
          name: "Transition Operator Discriminator",
          description: "Routes transition operator requests to an appropriate TransitionOperator filter for processing within the context of an OPC instance.",
          options: {
            action: "getFilter"
          },
          filters: transitionOperatorFilters
        });

        if (filterResponse.error) {
          errors.push(filterResponse.error);
          return "break";
        }

        result.transitionDispatcher = filterResponse.result;
        console.log("+ Operator request bus configured to route arbitrary request object to 1 of ".concat(transitionOperatorFilters.length, " registered TransitionOperator plug-in filters."));
      } else {
        var _warningMessage6 = "WARNING: No TransitionOperator class instances have been registered!";
        result.constructionWarnings.push(_warningMessage6);
        console.warn(_warningMessage6); // Register a dummy discriminator.

        result.transitionDispatcher = {
          request: function request() {
            return {
              error: "No TransitionOperator class instances registered!"
            };
          }
        };
      } // ================================================================
      // Finish up if no error(s).


      if (!errors.length) {
        console.log("> Cellular service class definition accepted. Cell runtime plane is now ACTIVE.");
        response.result = _objectSpread({
          request_: request_
        }, result); // validated+normalized request_ overwritten with ...result
      }
    };

    while (!inBreakScope) {
      var _ret = _loop();

      if (_ret === "break") break;
    } // !inBreakScope


    if (errors.length) {
      response.error = errors.join(" ");
    }

    console.log("OPC::constructor [".concat(request_.id, "::").concat(request_.name, "] exit."));
    return response;
  } // bodyFunction

} // request descriptor object
);

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;