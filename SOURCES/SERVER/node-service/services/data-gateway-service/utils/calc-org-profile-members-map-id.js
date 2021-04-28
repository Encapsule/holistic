"use strict";

var arcccore = require("@encapsule/arccore");

var getOrgProfileMembersMapId = function getOrgProfileMembersMapId(orgId) {
  return arcccore.identifier.irut.fromReference(orgId.concat(".", "1venRla2StKcLUWOD3YgFw_OrgProfileMembersMap")).result;
};

module.exports = getOrgProfileMembersMapId;