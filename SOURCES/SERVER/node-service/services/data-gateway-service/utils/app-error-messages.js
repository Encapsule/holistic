"use strict";

// TODO: For now, this just serves as a placeholder file for what the app error codes referenced in the gateway services mean.
// Nothing currently uses theses codes so storing them here for now. This should be moved later.
var appErrorMessages = {
  "tad89s22SsG64BpPT3IU4A": "Unexpected error attempting to instantiate transaction query.",
  "50SgDnYpRCGEZ3p93fxlsg": "Unexpected error trying to instantiate the Datastore transaction.",
  "vsWLtzJFRlCEsEYAU8fwNw": "Unexpected error during the query request.",
  "Qlvj1M4xQS6dXjBjYjzJMg": "Unexpected error during the database transaction.",
  "uKupEQsgTqeKmY9R2dfFQw": "Unable to rollback Datastore transaction.",
  "aydZHTmCQaKjom379W2idw": "Entity does not exist.",
  "ZUlWVhVQRU2VRiqAemS15w": "Unable to create new entity. That ID is already in use.",
  "IdIyL6GQToOS0jD1R9WWZw": "Unable to write request data. VDIDs don't match.",
  "iBGQtikxTGGaMsSk7GLQsA": "Error, unable to construct valid Datastore entity.",
  "bEPyhoxWQmimJXlrjepM6Q": "Unexpected error while trying to save the entity.",
  "BT2VZ2MDQwG2M4XCQJ0kkA": "Unexpected error trying to commit the database transaction.",
  "4DSg35CMTwSqW9RRlDVJYg": "Operation request is missing the required baseline descriptor.",
  "O1lQLvbVTDKUnMnjYoebMQ": "Unexpected error trying to construct Datastore key.",
  "JSb4Jvh1TBeSPWpIwsHSqQ": "Unexpected error while processing the query result.",
  "Nypx8PrWTLqffQO7QtXHGA": "Unexpected error trying to process update request.",
  "Ik39BDASQDWapoeTNxW4mw": "Error, unable to construct validation filter."
};
module.exports = appErrorMessages;