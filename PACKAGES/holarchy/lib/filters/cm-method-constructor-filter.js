"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// cm-method-constructor.js
var arccore = require("@encapsule/arccore");

var ObservableProcessController = require("../ObservableProcessController");

var AbstractProcessModel = require("../../AbstractProcessModel");

var TransitionOperator = require("../../TransitionOperator");

var ControllerAction = require("../../ControllerAction");

var indexVertices = {
  CM: "INDEX_CM",
  APM: "INDEX_APM",
  TOP: "INDEX_TOP",
  ACT: "INDEX_ACT"
};

var inputFilterSpec = require("./iospecs/cm-method-constructor-input-spec");

var outputFilterSpec = require("./iospecs/cm-method-constructor-output-spec");

var factoryResponse = arccore.filter.create({
  operationID: "xbcn-VBLTaC_0GmCuTQ8NA",
  operationName: "CellModel::constructor Filter",
  operationDescription: "Filters request descriptor passed to CellModel::constructor function.",
  inputFilterSpec: _objectSpread(_objectSpread({}, inputFilterSpec), {}, {
    CellModel: {
      ____accept: "jsFunction"
    },
    // We build CM class instances
    CellModelInstance: {
      ____opaque: true
    } // Reference to the calling CM instance's this.

  }),
  outputFilterSpec: outputFilterSpec,
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      inBreakScope = true;
      var idResponse = arccore.identifier.irut.isIRUT(request_.id);

      if (idResponse.error) {
        errors.push("Invalid IRUT specified for id. '".concat(request_.id, " is not an IRUT string."));
        errors.push(idResponse.error);
        return "break";
      }

      if (!idResponse.result) {
        errors.push("Bad CellModel ID IRUT specified:");
        errors.push(idResponse.guidance);
      } // Optimistically initialize the response.result object.


      console.log("CellModel::constructor [".concat(request_.id, "::").concat(request_.name, "]"));
      response.result = {
        id: request_.id,
        name: request_.name,
        description: request_.description,
        digraph: null
      }; // ================================================================
      // Create DirectedGraph to index all the assets and give us an easy way to look things up.

      var filterResponse = arccore.graph.directed.create({
        name: "[".concat(request_.id, "::").concat(request_.name, "] CellModel Artifact Tree"),
        description: "A directed graph model of CM relationships for CellModel [".concat(request_.id, "::").concat(request_.name, "]."),
        vlist: Object.keys(indexVertices).map(function (key_) {
          return {
            u: indexVertices[key_],
            p: {
              type: "INDEX"
            }
          };
        })
      });

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        return "break";
      }

      var digraph = response.result.digraph = filterResponse.result; // WARNING: NOT OBVIOUS --- A CellModel instance's _private namesapce contains a digraph model
      // of all the artifacts it defines (i.e. it's AbstractProcessModel, ControllerAction, TransitionOperator).
      // Plus, all the artifacts defined by all the other CellModels that this CellModel requires at
      // runtime to operator correctly. This is modeled as each CellModel's digraph containing its
      // own CM (CellModel) vertex (for itself) + N other CM-type vertices that model the cells it
      // requires at runtime. Each of the CM digraphs is self-similar and as described they form a
      // tree with linked CM vertices as the trunk and APM, ACT, TOP vertices as leaf vertices.
      // This allows any CellModel to serve as a complete and self-contained in-memory database.
      // BUT, CellModel digraph vertex that models _ITSELF_ cannot ever have an artifact prop value!

      digraph.addVertex({
        u: request_.id,
        p: {
          type: "CM"
        }
      }); // Add this CellModel to the digraph.

      digraph.addEdge({
        e: {
          u: indexVertices.CM,
          v: request_.id
        },
        p: {
          type: "".concat(indexVertices.CM, "::CM")
        }
      }); // Link the CellModel to the CellModel index.
      // ****************************************************************
      // ****************************************************************
      // ****************************************************************
      // ****************************************************************
      // Generic function to process CellModel registrations

      /*
        request = {
            type: string enum flag indicating one of APM, TOP, ACT, CM
            registration: reference to constructor request object or ES6 class - validity unknown
        }
      */

      function processCellModelRegistration(pcmr_) {
        var response = {
          error: null
        };
        var errors = [];
        var inBreakScope = false;

        while (!inBreakScope) {
          inBreakScope = true;
          var artifact = {
            APM: function APM(registration_) {
              return registration_ instanceof AbstractProcessModel ? registration_ : new AbstractProcessModel(registration_);
            },
            TOP: function TOP(registration_) {
              return registration_ instanceof TransitionOperator ? registration_ : new TransitionOperator(registration_);
            },
            ACT: function ACT(registration_) {
              return registration_ instanceof ControllerAction ? registration_ : new ControllerAction(registration_);
            },
            CM: function CM(registration_) {
              return registration_ instanceof request_.CellModel ? registration_ : new request_.CellModel(registration_);
            }
          }[pcmr_.type](pcmr_.registration);

          if (!artifact.isValid()) {
            errors.push("Bad ".concat(pcmr_.type, " registration: The ").concat(pcmr_.type, " instance is invalid."));
            errors.push(artifact.toJSON());
            break;
          }

          var artifactID = artifact.getID();

          switch (pcmr_.type) {
            default:
              /*
                Enforce the rule that a CM can register any APM, TOP, ACT it wishes. However, if the desire is to combine CM's (e.g. via a parent CM that declares subcell(s))
                then the restriction is that only one CM in the sub-CM tree is allowed to directly register any specific APM, TOP, ACT. Because CellProcessor accepts only a single
                CellModel, this restriction ensures/ that the entirety of any specific celluar process runtime is based on a self-consistent and verified set of APM, TOP, and ACT
                artifact registrations. In practice this almost never comes up until you start building CM's that associate an already in-use APM with some other set of APM, TOP, ACT
                registrations. For example, one might define an APM for a "process" that models the lifespan of a JavaScript client application. A portion of this process actually
                executes on the app server in response to an HTTP request. And, the remainder of the process executes on the client in the browser after the HTML5 page created by
                the server (a serialization of the process) is reconstituted. Here we would like to be able to use one APM to define the lifespan of the client app and define two
                CellModel's to provide the runtime TOP and ACT registrations required by the APM to correctly evaluate in the two respective environments. This is fine - no problem.
                But, you can't subsequently compose these two CellModel's together for simultaneous evaluation in a single CellProcessor instance; they're designed to be used in
                distinctly different celluar process instances that remap the APM's "behavior" to the process environment. In this example, providing runtime evaluation bindings
                for the APM so that it can evaluate in different phases of the HTML5 client app lifecycle it models over the two environments in which its cellur process
                evaluates...
              */
              // Ensure we haven't processed this IRUT previously as per above.
              // artifactID is the ID of the artifact that we are attempting to process
              // digraph is the CellModel artifact tree of the CellModel we're currently building
              if (digraph.isVertex(artifactID)) {
                // If the vertex already exists in the digraph, then this registration specifies a duplicate IRUT ID.
                errors.push("Bad ".concat(pcmr_.type, " registration: The ").concat(pcmr_.type, " instance specifies a duplicate IRUT id='").concat(artifactID, "' that is illegal in this context."));
                errors.push("IRUT id='".concat(artifactID, "' was previously registered by this CellModel instance as a '").concat(digraph.getVertexProperty(artifactID).type, "' artifact."));
                break;
              } // Add the artifact to the graph.


              digraph.addVertex({
                u: artifactID,
                p: {
                  type: pcmr_.type,
                  artifact: artifact
                }
              }); // Link the artifact to its index.

              digraph.addEdge({
                e: {
                  u: indexVertices[pcmr_.type],
                  v: artifactID
                },
                p: {
                  type: "".concat(indexVertices[pcmr_.type], ":").concat(pcmr_.type)
                }
              }); // Link the artifact to this CellModel.

              digraph.addEdge({
                e: {
                  u: request_.id,
                  v: artifactID
                },
                p: {
                  type: "CM:".concat(pcmr_.type)
                }
              });
              break;

            case "CM":
              // We are attempting to register a subcell model as a dependency of a CellModel.
              // Here, artifact is reference to a CellModel instance.
              var subcellVertices = artifact._private.digraph.getVertices();

              for (var i = 0; i < subcellVertices.length; i++) {
                var subcellVertex = subcellVertices[i];

                if (digraph.isVertex(subcellVertex)) {
                  var aProps = digraph.getVertexProperty(subcellVertex); // The property descriptor of the artifact vertex in the CellModel we're building.

                  var bProps = artifact._private.digraph.getVertexProperty(subcellVertex); // The property descriptor of the artifact vertex in the CellModel we're processing for merge


                  if (aProps.type !== bProps.type) {
                    errors.push("Bad ".concat(pcmr_.type, " registration. Unable to merge CellModel id='").concat(artifactID, "' into CellModel id='").concat(request_.id, "' due to conflict."));
                    errors.push("CellModel id='".concat(artifactID, "' ").concat(bProps.type, " registration id='").concat(bProps.artifact.getID(), "' specifies illegal duplicate IRUT ID."));
                    errors.push("CellModel id='".concat(request_.id, "' has previously registered id='").concat(subcellVertex, "' as a ").concat(aProps.type, " artifact."));
                    continue;
                  } // if the developer is confused, sloppy w/cut-n-paste, or just trying to be overly clever


                  if (aProps.type !== "INDEX") {
                    if (subcellVertex === request_.id) {
                      errors.push("Bad ".concat(pcmr_.type, " registration. Unable to merge CellModel id='").concat(artifactID, "' into CellModel id='").concat(request_.id, "' due to conflict."));
                      errors.push("CellModel id='".concat(artifactID, "' includes a prior definition of CellModel id='").concat(request_.id, "' that we're currently trying to define."));
                      continue;
                    } // if the developer is confused, sloppy w/cut-and-paste, or has just made a simple coding mistake w/require/import that introduces a definition cycle in the CellModel artifact tree


                    var aVDID = aProps.artifact.getVDID(); // CAREFUL! arccore.DirectedGraph edge and vertex props are tricky...
                    // DirectedGraph.getVertexProperty returns a live reference to a vertex's attached property (opaque to DirectedGraph).
                    // To users of DirectedGraph if a vertex (or edge) has a property attached is significant information that cannot be deduced
                    // directly from the property value (without ambiguity). So DirectedGraph maintains an internal Boolean flag per vertex and per
                    // edge that is set when any property value is attached to a vertex or edge. And, cleared when the property is explicitly
                    // deleted. Users of a DirectedGraph container can then query DirectedGraph.hasVertex/EdgeProperty to determine if the property
                    // set flag is true/false. It's tricky. This is why it a really bad idea to try to use a vertex/edge property as a temporary
                    // scratch pad in an algorithm like this. Previously, I was attaching artifact to bprops for the sole purpose of avoiding the
                    // following conditional evaluation of the artifact reference on which to call getVDID. It's not obvious but this little mistake
                    // causes a stack overflow to occur loading a CellModel that includes various shape trees of CM's that themselves include
                    // dependencies of CM's that have already been incorporated into the tree. Yea... >:/

                    var bVDID = (bProps.artifact ? bProps.artifact : artifact).getVDID();

                    if (aVDID !== bVDID) {
                      errors.push("Bad ".concat(pcmr_.type, " registration. Unable to merge CellModel id='").concat(artifactID, "' into CellModel id='").concat(request_.id, "' due to conflict."));
                      errors.push("CellModel id='".concat(artifactID, "' ").concat(bProps.type, " registration id='").concat(bProps.artifact.getID(), "' has an invalid/unexpected runtime version."));
                      errors.push("Expected runtime VDID='".concat(aVDID, "' but instead found runtime version VDID='").concat(bVDID, "'."));
                      errors.push("Verified artifact=\"".concat(JSON.stringify(aProps), "\" <-- merge conflict <-- merge artifact=\"").concat(JSON.stringify(bProps), "\"."));
                    } // if the developer is confused, sloppy with their code oranization, unclear in their thinking wrt CellModel's it will likely be sorted here

                  } // end if subcell intersection vertex is not an index (i.e. it has an artifact class attached to its vertex property)

                } // end if intersection

              } // end for vertices in subcell graph


              if (!errors.length) {
                digraph.fromObject(artifact._private.digraph.toJSON());
                var props = digraph.getVertexProperty(artifactID);
                digraph.setVertexProperty({
                  u: artifactID,
                  p: _objectSpread(_objectSpread({}, props), {}, {
                    artifact: artifact
                  })
                });
                digraph.addEdge({
                  e: {
                    u: request_.id,
                    v: artifactID
                  },
                  p: {
                    type: "CM:CM"
                  }
                });
              }

              break;
          }

          break;
        } // end while(!inBreakScope);


        if (errors.length) {
          response.error = errors.join(" ");
        }

        return response;
      }

      ; // end processCellModelRegistration
      // ================================================================
      // PROCESS AbstractProcessModel ASSOCIATION

      if (request_.apm) {
        var pcmrResponse = processCellModelRegistration({
          type: "APM",
          registration: request_.apm
        });

        if (pcmrResponse.error) {
          errors.push("At request path ~.apm:");
          errors.push(pcmrResponse.error);
        }
      }

      if (errors.length) {
        return "break";
      } // ================================================================
      // PROCESS TransitionOperator ASSOCIATIONS


      for (var i = 0; i < request_.operators.length; i++) {
        var registration = request_.operators[i];

        var _pcmrResponse = processCellModelRegistration({
          type: "TOP",
          registration: registration
        });

        if (_pcmrResponse.error) {
          errors.push("At request path ~.operators[".concat(i, "]:"));
          errors.push(_pcmrResponse.error);
        }
      }

      if (errors.length) {
        return "break";
      } // ================================================================
      // PROCESS ControllerAction ASSOCIATIONS


      for (var _i = 0; _i < request_.actions.length; _i++) {
        var _registration = request_.actions[_i];

        var _pcmrResponse2 = processCellModelRegistration({
          type: "ACT",
          registration: _registration
        });

        if (_pcmrResponse2.error) {
          errors.push("At request path ~.actions[".concat(_i, "]:"));
          errors.push(_pcmrResponse2.error);
        }
      }

      if (errors.length) {
        return "break";
      } // ================================================================
      // PROCESS SUB-CellModel DEPENDENCIES


      for (var _i2 = 0; _i2 < request_.subcells.length; _i2++) {
        var _registration2 = request_.subcells[_i2];

        var _pcmrResponse3 = processCellModelRegistration({
          type: "CM",
          registration: _registration2
        });

        if (_pcmrResponse3.error) {
          errors.push("At request path ~.subcells[".concat(_i2, "]:"));
          errors.push(_pcmrResponse3.error);
        }
      } // forEach subcell


      if (errors.length) {
        return "break";
      } // ================================================================
      // EPILOGUE
      // TODO: Downgrade registration errors to warnings that can be optionally
      // used to block construction of CellModel instances (e.g. under in a production
      // test build). Current behavior is to block construction on accumulation of
      // any registration error(s) that may occur during processing of the Cell Model
      // definition descriptor, request_.
      //


      return "break";
    };

    while (!inBreakScope) {
      var _ret = _loop();

      if (_ret === "break") break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;