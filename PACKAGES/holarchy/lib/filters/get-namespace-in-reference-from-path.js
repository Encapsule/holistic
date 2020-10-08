"use strict";

// sources/common/data/get-namespace-in-reference-from-path.js
var arccore = require("@encapsule/arccore");

(function () {
  var factoryResponse = arccore.filter.create({
    operationID: "Z7Z7OvwnQL-bRrOGfEy-ZQ",
    operationName: "Get Namespace Data In Reference From Path",
    operationDescription: "Retrieve data in namespace within memory-resident data indicated by sourceRef.",
    inputFilterSpec: {
      ____label: "Get Namespace In Reference From Path Request",
      ____types: "jsObject",
      namespacePath: {
        ____label: "Filter-Format Namespace Path",
        ____description: "A dot-delimited namespace path beginning with `~` (indicates anonymous root namespace).",
        ____accept: "jsString"
      },
      dataRef: {
        ____label: "Source Data Reference",
        ____description: "A reference to the source data in which to locate the specified namespace. ",
        ____accept: ["jsNumber", "jsString", "jsBoolean", "jsObject", "jsArray", // Always one of these UNLESS the intent is to retrieve a filter spec namespace descriptor object by namespacePath from specRef.
        "jsUndefined" // Ignore dataRef and parse only specRef.
        ]
      },
      specRef: {
        ____label: "Source Spec Reference",
        ____description: "A reference to the source filter specification descriptor object. Iff dataRef === undefined, then this filter returns the filter spec namespace descriptor object reference corresponding to namespacePath.",
        ____accept: "jsObject" // This filter presumes specRef to be a reference to a valid filter spec namespace descriptor object (or object tree). But, it does not itself validate this presumption.
        // ____defaultValue: {} // TODO: Remove this --- it's not optional that the caller specify specRef. We're just not quite there yet.

      }
    },
    outputFilterSpec: {
      ____opaque: true // whatever it is, accept it as a valid response.result

    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null,
        result: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var proxyIndirects = 0;
        var resolvedPathTokens = [];
        var resolvedSpecPathTokens = [];
        var pathTokens = request_.namespacePath.split(".");

        if (pathTokens[0] !== "~") {
          errors.push("Invalid request.namespacePath value '".concat(request_.namespacePath, "' specified."));
          errors.push("Path must be a an ARCcore.filter-style dot-delimited path beginning with ~ that is taken to represent the value passed via request.dataRef.");
          break;
        }

        if (pathTokens.length === 1) {
          // Path specifies the entirety of dataRef.
          response.result = request_.dataRef ? request_.dataRef : request_.specRef;
          break;
        }

        var currentToken = pathTokens.shift();
        resolvedPathTokens.push(currentToken);
        resolvedSpecPathTokens.push(currentToken);
        var dataRef = request_.dataRef;
        var specRef = request_.specRef;
        var dataRefQuery = dataRef ? true : false;

        while (pathTokens.length) {
          var resolveFilterSpecContainerElementDescriptor = false;

          if (specRef.____asMap) {
            resolveFilterSpecContainerElementDescriptor = true;
          } else {
            if (specRef.____types) {
              if (Object.prototype.toString.call(specRef.____types) === "[object String]") {
                if (specRef.____types === "jsArray") {
                  resolveFilterSpecContainerElementDescriptor = true;
                }
              } else {
                if (-1 < specRef.____types.indexOf("jsArray")) {
                  resolveFilterSpecContainerElementDescriptor = true;
                }
              }
            }
          }

          var innerResponse = arccore.types.check.inTypeSet({
            types: ["jsObject"
            /*, "jsArray" */
            ],
            value: specRef
          });

          if (innerResponse.error) {
            errors.unshift(innerResponse.error);
            break;
          }

          if (!innerResponse.result
          /* false iff not in type set. otherwise jsMoniker string of match. */
          ) {
              var actualType = arccore.types.convert({
                from: "jsReference",
                to: "jsMoniker",
                value: specRef
              }).result;
              var resolvedPath = resolvedPathTokens.join(".");
              errors.push("Failed to resolve namespace path '" + request_.namespacePath + "':");
              errors.push("Expected namespace '" + resolvedPath + "' to be either an array or object so that we can dereference the next namespace token '" + token + "'.");
              errors.push("But, '" + resolvedPath + "' is actually an \"" + actualType + "\" entity type that does not have subnamespaces.");
              break;
            }

          if (dataRefQuery) {
            innerResponse = arccore.types.check.inTypeSet({
              types: ["jsObject", "jsArray"],
              value: dataRef
            });

            if (innerResponse.error) {
              errors.unshift(innerResponse.error);
              break;
            }

            if (!innerResponse.result
            /* false iff not in type set. otherwise jsMoniker string of match. */
            ) {
                var _actualType = arccore.types.convert({
                  from: "jsReference",
                  to: "jsMoniker",
                  value: dataRef
                }).result;

                var _resolvedPath = resolvedPathTokens.join(".");

                errors.push("Failed to resolve namespace path '" + request_.namespacePath + "':");
                errors.push("Expected namespace '" + _resolvedPath + "' to be either an array or object so that we can dereference the next namespace token '" + token + "'.");
                errors.push("But, '" + _resolvedPath + "' is actually an \"" + _actualType + "\" entity type that does not have subnamespaces.");
                break;
              }
          }

          var token = pathTokens.shift();
          var specToken = token;

          if (resolveFilterSpecContainerElementDescriptor) {
            for (var name_ in specRef) {
              if (!name_.startsWith("____")) {
                specToken = name_;
                break;
              }
            }
          } // Update the specRef and resolvedSpecPathTokens (at least for now).


          specRef = specRef[specToken];
          resolvedSpecPathTokens.push(specToken); // If we executing a query for a data reference...

          if (dataRefQuery) {
            dataRef = dataRef[token];
            resolvedPathTokens.push(token); // Special-case handling for data reference resolution via CellProcessProxy (APM) bound helper cells encountered in the data.

            if (specRef.____appdsl && specRef.____appdsl.apm && specRef.____appdsl.apm === "CPPU-UPgS8eWiMap3Ixovg"
            /*"Holarchy Cell Process Proxy Helper Process"*/
            ) {
              console.log("> Currently examining specRef path '".concat(resolvedSpecPathTokens.join("."), "' that declared as a CellProcessProxy helpers cell."));
              var currentNamespaceIsQueryTarget = false;
              var nextTokenInProxySpec = false;
              var proxyIsConnected = false;
            }
          }
        } // while pathTokens.length


        if (errors.length) {
          break;
        }

        if (!request_.dataRef && Object.prototype.toString.call(specRef) !== "[object Object]") {
          errors.push("Cannot resolve the specified OCD path '".concat(request_.namespacePath, "' to the namespace's corresponding filter specification because the data path you provided is wrong."));
          errors.push("Specifically, the last namespace in the path '".concat(resolvedPathTokens.join("."), "' is not declared in this OCD instance's controlling filter specification."));
          break;
        }

        response.result = request_.dataRef ? dataRef : specRef;
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    } // bodyFunciton

  }); // filter factory request

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  var resolveNamespaceReference = factoryResponse.result;
  module.exports = resolveNamespaceReference;
})();