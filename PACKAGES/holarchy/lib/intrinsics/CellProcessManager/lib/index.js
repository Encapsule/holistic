"use strict";

// cpm-lib.js (index.js)
//
// These functions have request/response semantics like an arccore.filter.
// But, are just really the bodyFunction's - they're called from deeply filtered
// code so we just assume all the types are correct at this level.
module.exports = {
  resolveCellCoordinates: require("./cpm-resolve-cell-coordinates"),
  resolveCellProcessCoordinates: require("./cpm-resolve-cell-process-coordinates"),
  getProcessManagerData: require("./cpm-get-cell-process-manager-data"),
  getProcessAncestorDescriptors: require("./cpm-get-cell-process-ancestor-descriptors"),
  getProcessChildrenDescriptors: require("./cpm-get-cell-process-children-descriptors"),
  getProcessDescendantDescriptors: require("./cpm-get-cell-process-descendant-descriptors"),
  getProcessParentDescriptor: require("./cpm-get-cell-process-parent-descriptor"),
  getProcessDescriptor: require("./cpm-get-cell-process-descriptor"),
  getProcessOwnershipReportDescriptor: require("./cpm-get-cell-process-ownership-report-descriptor"),
  cellProcessFamilyOperatorPrologue: require("./cpm-cell-process-family-operator-prologue")
};