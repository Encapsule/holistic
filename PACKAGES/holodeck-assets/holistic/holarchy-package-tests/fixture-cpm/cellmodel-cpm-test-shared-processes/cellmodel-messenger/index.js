"use strict";

var holarchy = require("@encapsule/holarchy");

var messengerModel = new holarchy.CellModel({
  id: "YBH28RLOTqG5jb6mkLBNKQ",
  name: "Messenger Model",
  description: "A simple cell model to transport a something between cells.",
  apm: {
    id: "Kh2lTQHGT9qG0j1omkJmAg",
    name: "Messenger Process",
    description: "A simple cell process declaration that models an untyped containter cell intended to be used for testing generic message passing protocols using the CPM as the means of delivery.",
    ocdDataSpec: {
      ____types: "jsObject",
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