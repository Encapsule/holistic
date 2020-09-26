"use strict";

var holarchy = require("@encapsule/holarchy");

var modelSpace = require("../model-space");

var messengerModel = new holarchy.CellModel({
  id: modelSpace.cmID("CPP Test Messenger"),
  name: "Messenger Model",
  description: "A simple cell model to transport a something between cells.",
  apm: {
    id: modelSpace.apmID("CPP Test Messenger"),
    name: "Messenger Process",
    description: "A simple cell process declaration that models an untyped containter cell intended to be used for testing generic message passing protocols using the CPM as the means of delivery.",
    ocdDataSpec: {
      ____types: "jsObject",
      ____defaultValue: {},
      message: {
        ____opaque: true
      }
    }
  }
});

if (!messengerModel.isValid()) {
  throw new Error(messengerModel.toJSON());
}

module.exports = messengerModel;