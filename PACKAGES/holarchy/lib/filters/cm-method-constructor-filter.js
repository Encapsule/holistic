"use strict";

// scm-method-constructor.js
var arccore = require("@encapsule/arccore");

var ObservableProcessController = require("../ObservableProcessController");

var AbstractProcessModel = require("../AbstractProcessModel");

var TransitionOperator = require("../TransitionOperator");

var ControllerAction = require("../ControllerAction");

var indexVertexRoot = "INDEX_ROOT";
var indexVertices = {
  cm: "INDEX_CM",
  apm: "INDEX_APM",
  top: "INDEX_TOP",
  act: "INDEX_ACT"
};
var factoryResponse = arccore.filter.create({
  operationID: "xbcn-VBLTaC_0GmCuTQ8NA",
  operationName: "CellModel::constructor Filter",
  operationDescription: "Filters request descriptor passed to CellModel::constructor function.",
  inputFilterSpec: {
    ____label: "Cell Model Descriptor",
    ____description: "A request object passed to CellModel ES6 class constructor function.",
    ____types: "jsObject",
    CellModel: {
      ____accept: "jsFunction"
    },
    // We build CM class instances
    CellModelInstance: {
      ____opaque: true
    },
    // Reference to the calling CM instance's this.
    id: {
      ____label: "Model ID",
      ____description: "A unique version-independent IRUT identifier used to identify this CellModel.",
      ____accept: "jsString" // must be an IRUT

    },
    name: {
      ____label: "Model Name",
      ____description: "A short name used to refer to this CellModel.",
      ____accept: "jsString"
    },
    description: {
      ____label: "Model Description",
      ____description: "A short description of this CellModel.",
      ____accept: "jsString"
    },
    apm: {
      ____label: "Cell Model Behaviors",
      ____description: "An optional APM descriptor that if provided will be used to ascribe memory and/or higher-order observable process behaviors to this CellModel.",
      ____accept: ["jsNull", "jsObject"],
      // further processed in bodyFunction
      ____defaultValue: null // If null, then a valid CM defines at least one TOP or ACT.

    },
    operators: {
      ____label: "Cell Model Operators",
      ____description: "An optional array of Transition Operator descriptor objects one for each TransitionOperator defined by this CellModel.",
      ____types: "jsArray",
      ____defaultValue: [],
      TransitionOperator: {
        ____label: "Transition Operator",
        ____description: "Either an TOP descriptor or its corresponding TransitionOperator ES6 class instance.",
        ____accept: "jsObject" // further processed in bodyFunction

      }
    },
    actions: {
      ____label: "Cell Model Actions",
      ____description: "An optional array of controller action descriptor object(s) or equivalent ControllerAction ES6 class instance(s) defined by this CellModel.",
      ____types: "jsArray",
      ____defaultValue: [],
      ControllerAction: {
        ____label: "Controller Action",
        ____description: "Either an ACT descriptor or its corresponding ControllerAction ES6 class instance.",
        ____accept: "jsObject" // further processed in bodyFunction

      }
    },
    subcells: {
      ____label: "Subcell Model Registrations",
      ____description: "An optional array of Cell Model descriptor object(s) and/or CellModel ES6 class instance(s).",
      ____types: "jsArray",
      ____defaultValue: [],
      subcell: {
        ____label: "Subcell Model Registration",
        ____description: "A Cell Model descriptor or equivalent CellModel ES6 class instance.",
        ____accept: "jsObject" // further processed in bodyFunction

      }
    }
  },
  // inputFilterSpec
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
        errors.push("Bad SMR ID specified:");
        errors.push(idResponse.error);
        return "break";
      }

      if (!idResponse.result) {
        errors.push("Bad SMR ID specified:");
        errors.push(idResponse.guidance);
      } // Optimistically initialize the response.result object.


      console.log("CellModel::constructor [".concat(request_.id, "::").concat(request_.name, "]"));
      response.result = {
        "LMFSviNhR8WQoLvtv_YnbQ": true,
        // non-intrusive output type identifier
        id: request_.id,
        name: request_.name,
        description: request_.description,
        cmMap: {},
        apmMap: {},
        topMap: {},
        actMap: {},
        digraph: null
      }; // ================================================================
      // Create DirectedGraph to index all the assets and give us an easy way to look things up.

      var filterResponse = arccore.graph.directed.create({
        name: "[".concat(request_.id, "::").concat(request_.name, " CM Holarchy Digraph"),
        description: "A directed graph model of CM relationships [".concat(request_.id, "::").concat(request_.name, "]."),
        vlist: [{
          u: indexVertexRoot,
          p: {
            type: "INDEX"
          }
        }, {
          u: request_.id,
          p: {
            type: "CM"
          } // This CM. We need to add this is index on exit from this function

        }]
      });

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        return "break";
      }

      var digraph = response.result.digraph = filterResponse.result;
      Object.keys(indexVertices).forEach(function (key_) {
        digraph.addVertex({
          u: indexVertices[key_],
          p: {
            type: "INDEX"
          }
        });
        digraph.addEdge({
          e: {
            u: indexVertexRoot,
            v: indexVertices[key_]
          },
          p: {
            type: "".concat(indexVertexRoot, "::").concat(indexVertices[key_])
          }
        });
      });
      digraph.addEdge({
        e: {
          u: indexVertices.cm,
          v: request_.id
        },
        p: {
          type: "".concat(indexVertices.cm, "::CM")
        }
      }); // ================================================================
      // PROCESS CellModel SUBCELL DEPENDENCIES

      for (var i = 0; i < request_.subcells.length; i++) {
        var subcell_ = request_.subcells[i];
        var cellID = subcell_ instanceof request_.CellModel ? subcell_.getID() : subcell_.id; // potentially this is a constructor error

        var cell = null; // CellModel ES6 class instance

        if (!response.result.cmMap[cellID]) {
          if (digraph.isVertex(cellID)) {
            // We should never be adding any new cached ES6 class instance references
            // to our response.result maps if we have previously encountered this IRUT
            // identifier. We need to ensure that every IRUT identifier presented to
            // CellModel is unique to prevent common developer cut-and-paste errors
            // from manifesting as curious cellular process behavior anomolies that
            // are _very_ hard to diagnose...
            errors.push("Subcell definition ~.subcells[".concat(i, "] specifies an invalid duplicate IRUT identifier id='").concat(cellID, "'."));
            continue;
          }

          cell = subcell_ instanceof request_.CellModel ? subcell_ : new request_.CellModel(subcell_);

          if (!cell.isValid()) {
            errors.push("CellModel definition ~.subcells[".concat(i, "] with id='").concat(cellID, "' is invalid due to constructor error:"));
            errors.push(cell.toJSON());
            continue;
          }

          response.result.cmMap[cellID] = {
            cm: cellID,
            cell: cell
          };
          digraph.addVertex({
            u: cellID,
            p: {
              type: "CM"
            }
          });
          digraph.addEdge({
            e: {
              u: indexVertices.cm,
              v: cellID
            },
            p: {
              type: "".concat(indexVertices.cm, "::CM")
            }
          });
        } else {
          // TODO: Deep inspect the two ES6 class instances for identity.
          cell = response.result.cmMap[cellID];
        }

        if (!cell.isValid()) {
          errors.push("CellModel registration at request path ~.subcells[".concat(i, "] is an invalid instance due to constructor error:"));
          errors.push(cell.toJSON());
          continue;
        }

        digraph.addEdge({
          e: {
            u: request_.id,
            v: cellID
          },
          p: {
            type: "CM::CM"
          }
        }); // u (cell) depends on v (subcell)

        response.result.cmMap = Object.assign(response.result.cmMap, cell._private.cmMap);
        response.result.apmMap = Object.assign(response.result.apmMap, cell._private.apmMap);
        response.result.topMap = Object.assign(response.result.topMap, cell._private.topMap);
        response.result.actMap = Object.assign(response.result.actMap, cell._private.actMap);
        digraph.fromObject(cell._private.digraph.toJSON());
      } // forEach subcell
      // ================================================================
      // PROCESS AbstractProcessModel ASSOCIATION


      if (request_.apm) {
        var apmID = request_.apm instanceof AbstractProcessModel ? request_.apm.getID() : request_.apm.id;
        var apm = null;

        if (!response.result.apmMap[apmID]) {
          if (digraph.isVertex(apmID)) {
            errors.push("AbstractProcessModel definition ~.apm specifies an invalid duplicate IRUT identifier id='".concat(apmID, "'."));
          } else {
            apm = request_.apm instanceof AbstractProcessModel ? request_.apm : new AbstractProcessModel(request_.apm);

            if (!apm.isValid()) {
              errors.push("AbstractProcessModel definition ~.apm with id='".concat(apmID, "' is invalid due to constructor error:"));
              errors.push(apm.toJSON());
            } else {
              response.result.apmMap[apmID] = {
                cm: request_.id,
                apm: apm
              };
              digraph.addVertex({
                u: apmID,
                p: {
                  type: "APM"
                }
              });
              digraph.addEdge({
                e: {
                  u: indexVertices.apm,
                  v: apmID
                },
                p: {
                  type: "".concat(indexVertices.apm, "::APM")
                }
              });
              digraph.addEdge({
                e: {
                  u: request_.id,
                  v: apmID
                },
                p: {
                  type: "CM::APM"
                }
              });
            }
          }
        } else {
          apm = response.result.apmMap[apmID];
          digraph.addEdge({
            e: {
              u: request_.id,
              v: apmID
            },
            p: {
              type: "CM::APM"
            }
          });
        }
      } // ================================================================
      // PROCESS TransitionOperator ASSOCIATIONS


      for (var _i = 0; _i < request_.operators.length; _i++) {
        var entry = request_.operators[_i];
        var entryID = entry instanceof TransitionOperator ? entry.getID() : entry.id; // potentially this is a constructor error

        var top = null; // TransitionOperator ES6 class instance

        if (!response.result.topMap[entryID]) {
          if (digraph.isVertex(entryID)) {
            errors.push("TransitionOperator definition ~.operators[".concat(_i, "] specifies an invalid duplicate IRUT identifier id='").concat(entryID, "'."));
            continue;
          }

          top = entry instanceof TransitionOperator ? entry : new TransitionOperator(entry);

          if (!top.isValid()) {
            errors.push("TransitionOperator definition ~.operators[".concat(_i, "] is invalid due to constructor error:"));
            errors.push(top.toJSON());
            continue;
          }

          response.result.topMap[entryID] = {
            cm: request_.id,
            top: top
          };
          digraph.addVertex({
            u: entryID,
            p: {
              type: "TOP"
            }
          });
          digraph.addEdge({
            e: {
              u: indexVertices.top,
              v: entryID
            },
            p: {
              type: "".concat(indexVertices.top, "::TOP")
            }
          });
          digraph.addEdge({
            e: {
              u: request_.id,
              v: entryID
            },
            p: {
              type: "CM::TOP"
            }
          });
        } else {
          top = response.result.topMap[entryID];
          digraph.addEdge({
            e: {
              u: request_.id,
              v: entryID
            },
            p: {
              type: "CM::TOP"
            }
          });
        }
      } // ================================================================
      // PROCESS ControllerAction ASSOCIATIONS


      for (var _i2 = 0; _i2 < request_.actions.length; _i2++) {
        var _entry = request_.actions[_i2];

        var _entryID = _entry instanceof ControllerAction ? _entry.getID() : _entry.id; // potentially this is a constructor error


        var act = null; // ControllerAction ES6 class instance

        if (!response.result.actMap[_entryID]) {
          if (digraph.isVertex(_entryID)) {
            errors.push("ControllerAction definition ~.actions[".concat(_i2, "] specifies an invalid duplicate IRUT identifier id='").concat(_entryID, "'."));
            continue;
          }

          act = _entry instanceof ControllerAction ? _entry : new ControllerAction(_entry);

          if (!act.isValid()) {
            errors.push("ControllerAction definition ~.actions[".concat(_i2, "] is invalid due to constructor error:"));
            errors.push(act.toJSON());
            continue;
          }

          response.result.actMap[_entryID] = {
            cm: request_.id,
            act: act
          };
          digraph.addVertex({
            u: _entryID,
            p: {
              type: "ACT"
            }
          });
          digraph.addEdge({
            e: {
              u: indexVertices.act,
              v: _entryID
            },
            p: {
              type: "".concat(indexVertices.act, "::ACT")
            }
          });
          digraph.addEdge({
            e: {
              u: request_.id,
              v: _entryID
            },
            p: {
              type: "CM::ACT"
            }
          });
        } else {
          act = response.result.actMap[_entryID];
          digraph.addEdge({
            e: {
              u: request_.id,
              v: _entryID
            },
            p: {
              type: "CM::ACT"
            }
          });
        }
      } // ================================================================
      // EPILOGUE
      // TODO: Downgrade registration errors to warnings that can be optionally
      // used to block construction of CellModel instances (e.g. under in a production
      // test build). Current behavior is to block construction on accumulation of
      // any registration error(s) that may occur during processing of the Cell Model
      // definition descriptor, request_.
      //


      if (!errors.length) {
        var registrations = arccore.util.dictionaryLength(response.result.cmMap) + arccore.util.dictionaryLength(response.result.apmMap) + arccore.util.dictionaryLength(response.result.topMap) + arccore.util.dictionaryLength(response.result.actMap);

        if (!registrations) {
          // LOL...
          errors.push("Heretical attempt to associate IRUT ID '".concat(request_.id, "' with the root of all CellModel's, [0000000000000000000000::Nothingness]."));
        }
      }

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