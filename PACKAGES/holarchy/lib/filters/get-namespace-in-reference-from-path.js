"use strict";

// sources/common/data/get-namespace-in-reference-from-path.js
var arccore = require("@encapsule/arccore");

(function () {
  var factoryResponse = arccore.filter.create({
    operationID: "Z7Z7OvwnQL-bRrOGfEy-ZQ",
    operationName: "OCD Get Namespace Data In Reference From Path",
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

      },
      cellProxyOptions: {
        ____label: "Proxy Resolution Option",
        ____description: "Options descriptor object considered only when both dataRef and specRef are specified (i.e. this filter is attempting to resolve a data namespace reference from namespacePath).",
        ____types: "jsObject",
        ____defaultValue: {},
        resolveMode: {
          ____label: "Proxy Resolve Mode",
          ____description: "The only OCD client that should ever override the default value is CellProcessProxy CellModel implementation. Everyone else should always take the default value.",
          ____accept: "jsString",
          ____inValueSet: ["disable-proxy-resolution", // Ignore CellProcessProxy helper cell instances and perform low-level mechanical resolution of the requested data namespace reference from namespacePath.
          "resolve-intermediate-proxies", // Detect CellProcessProxy helper cell instances and resolve through intermediate-level proxies (i.e. encountered during the search) iff connected. Disable proxy resolution on last path token of the search.
          "resolve-entire-proxy-chain" // Detect CellProcessProxy helper cell instances and resolve through all encountered proxy instances discovered in "connected" state (including the last path token in a search iff it's a connected proxy).
          ],
          ____defaultValue: "resolve-entire-proxy-chain" // WARNING: This override is provided explicitly for CellProcessProxy CellModel artifacts. No other client of OCD (direct or otherwise) should ever override this value.

        },
        indirectionCount: {
          ____label: "Proxy Indirection Count",
          ____description: "Never touch this. Not ever. It's only used by this filter itself to call itself when resolving a proxy.",
          ____accept: "jsNumber",
          ____defaultValue: 0
        },
        maxIndirections: {
          ____label: "Max Proxy Indirections",
          ____description: "The maximum number of connected CellProcessProxy instances that may be resolved in a single request. In general, it's rare to use more than 2-3 levels of proxy indirection. So, hitting the max limit typically indicates an unresolvable cycle in proxy connections.",
          ____accept: "jsNumber",
          ____inRangeInclusive: {
            begin: 0,
            end: 16
          },
          ____defaultValue: 8
        }
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
        var proxyIndirectCount = 0;
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
        var dataRefQuery = dataRef ? true : false; // console.log(`> OCD.getNamespaceInReferenceFromPath ${dataRefQuery?"store data":"store specification"} search on OCD namespace path '${request_.namespacePath}' starting...`);

        while (pathTokens.length) {
          var resolveFilterSpecContainerElementDescriptor = false;

          if (specRef
          /*may be undefined if last specPath token is invalid per spec*/
          ) {
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
              errors.push("Expected namespace '" + resolvedPath + "' to be either an array or object value type.");
              errors.push("But, '" + resolvedPath + "' is actually an \"" + actualType + "\" value type.");
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
                errors.push("Expected namespace '" + _resolvedPath + "' to be either an array or object value type.");
                errors.push("But, '" + _resolvedPath + "' is actually an \"" + _actualType + "\" value type.");
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

            if (request_.cellProxyOptions.resolveMode !== "disable-proxy-resolution") {
              // Determine if the current namespace has an ____appdsl.apm === CellProcessProxy APM ID.
              if (specRef.____appdsl && specRef.____appdsl.apm && specRef.____appdsl.apm === "CPPU-UPgS8eWiMap3Ixovg"
              /*"Holarchy Cell Process Proxy Helper Process"*/
              ) {
                // console.log(`> OCD::getNamespaceInReferenceFromPath is currently examining specRef path '${resolvedSpecPathTokens.join(".")}' that is declared as a CellProcessProxy helpers cell instance.`);
                var endOfSearch = pathTokens.length === 0;

                if (endOfSearch) {
                  // The search has ended on a CellProcessProxy helper cell. Figure out how to respond.
                  if (request_.cellProxyOptions.resolveModel === "resolve-intermediate-proxies") {// We're done. dataRef is what the caller has asked for.
                    // console.log(`..... Returning data reference to CellProcessProxy instance memory at path '${resolvedPathTokens.join(".")}'.`);
                  } else {// console.log(`..... We think we should now complete this request by attempting to resolve through the proxy '${resolvedPathTokens.join(".")}' in order to return a reference to the connected cell process.`);
                    }
                } else {// The search has encounted a CellProcessProxy helper cell while the search is in progress.
                    // console.log(`..... We think we should now attempt to resolve through the proxy '${resolvedPathTokens.join(".")}' and then complete the search using remain path tokens applied to updated dataRef and specRef.`);
                  } // end if !endOfSearch

              } // if current data namespace is a CellProcessProxy helper cell.

            } // if !resolveMode !== "disable-proxy-resolution"

          } else {
            // Keep the resolvedPathTokens up-to-date even if we're resolving a filter spec descriptor; we need this to report error in terms of the namespacePath value supplied by the caller.
            resolvedPathTokens.push(token);
          }
        } // while pathTokens.length


        if (errors.length) {
          break;
        }

        if (!request_.dataRef && Object.prototype.toString.call(specRef) !== "[object Object]") {
          errors.push("Cannot resolve the specified OCD path '".concat(request_.namespacePath, "' to the namespace's corresponding filter specification because"));
          errors.push("the last namespace in the path '".concat(resolvedPathTokens.join("."), "' is not declared in this OCD instance's filter specification."));
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