"use strict";

var arcccore = require("@encapsule/arccore");

var getOrgResourceId = function getOrgResourceId(orgId) {
  return arcccore.identifier.irut.fromReference(orgId.concat(".", "VkcTlGq3RiOaGqOdEkMgag_OrgResourceId")).result;
};

module.exports = getOrgResourceId;