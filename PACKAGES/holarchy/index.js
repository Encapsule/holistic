"use strict";

// @encapsule/holarchy package exports.
var packageMeta = require("./package.json");

var CellModel = require("./CellModel");

var CellProcessor = require("./CellProcessor");

var ObservableProcessController = require("./lib/ObservableProcessController");

var AbstractProcessModel = require("./lib/AbstractProcessModel");

var TransitionOperator = require("./lib/TransitionOperator");

var ControllerAction = require("./lib/ControllerAction");

var ObservableControllerData = require("./lib/ObservableControllerData");

module.exports = {
  __meta: {
    author: packageMeta.author,
    name: packageMeta.name,
    version: packageMeta.version,
    codename: packageMeta.codename,
    build: packageMeta.buildID,
    source: packageMeta.buildSource
  },
  // ================================================================
  // DEVELOPER API
  // ================================================================

  /*
    CellModel (CM) is an ES6 class instantiated with operator
    new that represents a specific class of runtime "cell process".
  */
  CellModel: CellModel,

  /*
    AbstractProcessModel (OPM) is an ES6 class instantiated with
    operator new that represents the shared memory and runtime
    behavior(s) of a CellModel (CM).
  */
  AbstractProcessModel: AbstractProcessModel,

  /*
    TransitionOperator (TOP) is an ES6 class instantiated with operator
    new that implements a plug-in Boolean operator function used to
    evaluate cell process transition rules at runtime.
  */
  TransitionOperator: TransitionOperator,

  /*
    ControllerAction (ACT) is an ES6 class instantiated with operator
    new that implements a plug-in data transformation function used to
    evaluate cell process step exit and step enter actions.
  */
  ControllerAction: ControllerAction,

  /*
    CellProcessor (CP) is an ES6 class instantiated with operator new
    that provides a runtime evaluation and execution environment for
    cellular process(es) defined by SoftwareCellModel class instances.
  */
  CellProcessor: CellProcessor,
  // ================================================================
  // IMPLEMENTATION
  // ================================================================

  /*
    ObservableProcessController (OPC) is an ES6 class instantiated with
    operator new that provides memory management, and generic evaluation
    of cellular process(es) (cellular automata). Developers do not
    typically use the OPC class directly but instead rely on CellProcessor
    (CP) to create and manage an OPC runtime instance on their behalf
    based on information derived from an CellModel (CM).
   */
  ObservableProcessController: ObservableProcessController,

  /*
    ObservableControllerData (OCD) is an ES6 class instantiated with
    operator new that encapsulates a shared in-memory store data.
    OCD provides absolute and relative dot-delimited path addressing,
    type introspection, and fully abstracted I/O operations via
    its readNamespace and writeNamespace class API's that enforce
    name/type/value constraints, and provide data normalization
    (cascading default values) for all read and write operations via
    @encapsule/arccore.filter. This ensures that data written into and
    read from an OCD instance is correct at runtime, always.
    OPC uses OCD internally to to manage celluar process(es) runtime data
    on behalf of a CellProcessor (CP) instance. But, you can use it wherever
    you require strong runtime data fidelity, and addressable read/write
    facility. e.g. if you're preparing a network request you can use
    OCD to build the request and then call toJSON.
  */
  ObservableControllerData: ObservableControllerData,
  // DEPRECATED: ApplicationStateController is deprecated. Use OCD.
  ApplicationDataStore: ObservableControllerData
};