"use strict";

var arcccore = require("@encapsule/arccore");

var getOrgResourceReservationsId = function getOrgResourceReservationsId(orgId) {
  return arcccore.identifier.irut.fromReference(orgId.concat(".", "v6_UYAIDSFOzawfP0EYdQQ_OrgResourceReservationsId")).result;
};

module.exports = getOrgResourceReservationsId;