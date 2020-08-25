"use strict";

// cpm-lib.js (index.js)
//
// These functions have request/response semantics like an arccore.filter.
// But, are just really the bodyFunction's - they're called from deeply filtered
// code so we just assume all the types are correct at this level.
module.exports = {
  getProcessTreeData: require("./cpm-get-cell-process-tree-data"),
  getProcessDescriptor: require("./cpm-get-cell-process-descriptor"),
  getProcessParentDescriptor: require("./cpm-get-cell-process-parent-descriptor"),
  getProcessAncestorDescriptors: require("./cpm-get-cell-process-ancestor-descriptors"),
  getProcessChildrenDescriptors: require("./cpm-get-cell-process-children-descriptors"),
  getProcessDescendantDescriptors: require("./cpm-get-cell-process-descendant-descriptors")
};