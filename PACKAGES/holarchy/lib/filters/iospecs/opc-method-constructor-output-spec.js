"use strict";

// @encapsule/holistic/SOURCES/LIB/holarchy/opc/filters/iospecs/opc-method-constructor-output-spec.js
var opcMethodConstructorInputSpec = require("./opc-method-constructor-input-spec");

module.exports = {
  ____types: "jsObject",
  // Generated by opc constructor filter using conditional algorithm.
  id: opcMethodConstructorInputSpec.id,
  // Generated by opc constructor filter using IRUT-encoded v4 UUID.
  iid: {
    ____label: "OCP System Instance ID",
    ____description: "Random v4 UUID-derived IRUT used to identify this specific OPC instance.",
    ____accept: "jsString"
  },
  // Generated by opc constructor filter using conditional algorithm.
  name: opcMethodConstructorInputSpec.name,
  // Generated by opc constructor filter using conditional algorithm.
  description: opcMethodConstructorInputSpec.description,
  options: opcMethodConstructorInputSpec.options,
  // Generated by opc constructor filter by flattening dev-specified opm sets.
  opmMap: {
    ____label: "OPM Map",
    ____description: "A flattend map of the OPM instances passed into the OPC constructor method.",
    ____types: "jsObject",
    ____asMap: true,
    opmId: {
      // ObservableProcessModel ES6 class instance reference
      ____label: "OPM Class Instance Reference",
      ____description: "Reference to an OPM class instance passed to the OPC constructor method.",
      ____accept: "jsObject" // We do not validate ES6 classes w/filter. They're designed to be valid by construction. Or, in zombie state.

    }
  },
  // Generated by opc constructor filter by analyzing the dev-specified ocd template spec's opm bindings and the opm currently registered in opmMap.
  opmiSpecPaths: {
    ____label: "OPMI Spec Paths",
    ____description: "Array of abstract OPM to OCD data namespace binding descriptors created by the OPC constructor. There will be one element per dev-defined OCD spec namespace w/registered OPM binding appdsl annotation.",
    ____types: "jsArray",
    opmiBindingDescriptor: {
      ____label: "OPMI Binding Descriptor",
      ____description: "Descriptor object that relates a developer-defined OCD namespace path with its registered OPM instance.",
      ____types: "jsObject",
      specPath: {
        ____label: "OCD Spec Path",
        ____description: "Filter-style dot-delimited path to the OCD spec namespace with ____appdsl: { opm: IRUT } } annotation.",
        ____accept: "jsString"
      },
      opmiRef: {
        // ObservableProcessModel ES6 class instance reference
        ____label: "OPM Class Instance Reference",
        ____description: "Reference to an OPM class instance passed to the OPC constructor method.",
        ____accept: "jsObject" // We do not validate ES6 classes w/filter. They're designed to be valid by construction. Or, in zombie state.

      }
    }
  },
  // Copied in opc contructor filter after verification of dev-specified ocd template spec.
  ocdTemplateSpec: {
    ____label: "OCD Template Filter Spec",
    ____description: "Copy of the developer-defined OCD template spec passed to OCP constructor.",
    ____accept: "jsObject" // You can't filter a filter spec w/a filter spec. But you can accept an opaque object and validate the incoming spec by building a filter which is what we do here.

  },
  // Generated by opc constructor by merging bound namespace specs in dev-specified ocd template spec w/the corresponding opm data spec.
  // The significance of this little trick is quite profound I think. It will require some more thought to fully exploit this mechanism to its full affect.
  // NOTE: If you find yourself dreaming up clever ways to build your OCD template or OPM data specs please let me know...
  // I have planned another holistic platform lib called @encapsule/holarchy-aspects-kit intended to address many higher-level
  // programming model conerns that will become apparent when people start applying @encapsule/holarchy to build large system models.
  ocdRuntimeSpec: {
    ____label: "OCD Runtime Filter Spec",
    ____description: "OCP constructor synthesizes the OCD runtime spec from the dev-defined OCD template spec, its specific OPM bindings, and the set of registered OPM instances passed to the constructor.",
    ____accept: "jsObject" // You can't filter a filter spec w/a filter spec. But you can accept an opaque object and validate the incoming spec by building a filter which is what we do here.

  },
  // Created by ocp constructor filter. This object represents the runtime state of the hierarchical system of OPM managed by this OCP instance.
  ocdi: {
    ____label: "OCD Runtime Instance",
    ____description: "OPC instance's contained OCD shared process data runtime store. This is an instance of ObservableControllerData ES6 class constrained by ocdRuntimeSpec, and initialized w/ocdInitData.",
    ____accept: "jsObject" // We do not validate ES6 classes w/filter. They're designed to be valid by construction. Or, in zombie state.

  },
  // Created by the opc constructor filter. Used to implement OPC's plug-and-play runtime type-safe logical transition operator expression grammar and evaluation engine.
  transitionDispatcher: {
    ____label: "Transition Operator MR Dispatcher",
    ____description: "Filter that accepts an arbitrary request message that is routed to 1:N registered TransitionOperator class instances based on the request message signature.",
    ____accept: "jsObject" // this is an arcccore.discriminator filter instance reference that we do not further validate here

  },
  // Created by the opc constructor filter. Used to implement OPC's plug-and-play runtime type-safe controller action command grammar and evaluation engine.
  actionDispatcher: {
    ____label: "Controller Action MR Dispatcher",
    ____description: "Filter that accepts an arbitrary request message this routed to 1:N registered ControllerAction class instances based on the request message signature.",
    ____accept: "jsObject" // this is an arccore.discriminator filter instance reference that we do not furhter validate here

  },
  // Created by the opc constructor filter. Post-construction this value is managed by the public OPC.act method.
  opcActorStack: {
    ____label: "Actor Stack",
    ____description: "Actor stack tracks the depth of calls through the public OPC.act method in order to automatically trigger re-evaluation of the OPC's hosted system model upon completion of every external invocation.",
    ____accept: "jsArray",
    ____defaultValue: []
  },
  // Created by the opc constructor filter. Post-construction this value is managed by the OPC evalaution filter.
  evalCount: {
    ____label: "OPC Instance Eval Count",
    ____description: "The total number of times this OPC instance's hosted system definition has been evaluated. This is a useful high-level metric for determining if and how much an OPC instance is being used.",
    ____accept: "jsNumber",
    ____defaultValue: 0
  },
  // Created by the opc constructor filter. Post-construction this value is managed by the OPC evaluation filter.
  lastEvalResponse: {
    ____label: "OPC Evaluation Report Descriptor",
    ____description: "A complex descriptor object containing a hierarchical audit of the execution of OPC's evaluation filter algorithm.",
    ____accept: ["jsObject", "jsNull"],
    ____defaultValue: null // null indicates that initial post-construction evaluation of the OPC's system model has not yet been completed.

  },
  constructionWarnings: {
    ____label: "Construction Warnings",
    ____description: "Keep track of warnings issued during OPC construction. Primarily for testing purposes now. Later, we can expose as part of developer toolset somehow.",
    ____types: "jsArray",
    ____defaultValue: [],
    warning: {
      ____label: "Warning String",
      ____description: "A non-critical advisory message for devleopers. Used to track nuanced behavior during OPC constructor.",
      ____accept: "jsString"
    }
  }
}; // OPC constructor filter response.result --> OPC this._private in the OPC::constructor function