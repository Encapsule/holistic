"use strict";

var holarchy = require("@encapsule/holarchy");

module.exports = {
  id: "U5iIpgd8SHCk7pvaciVLTQ",
  name: "Holarchy Base Memory Mailbox Flag",
  description: "A primitive cell process that signals (via process step transition) when some actor has put a message in the mailbox namespace.",
  apm: require("./AbstractProcessModel-frame-latch"),
  actions: [require("./ControllerAction-ocd-write-frame-latch")],
  subcells: [holarchy.HolarchyCore]
};