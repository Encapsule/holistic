# @encapsule/holarchy abbreviations

## Primitives

OPC - ObservableProcessController

APM - AbstractProcessModel defines memory requirements and/or FSM-modeled stateful process behaviors abstractly as a declarative JSON document.

TOP - TransitionOperator plug-ins are used to read data from the OCD, perform some Boolean operator, and return true/false. They are always called by OPC during the process of celluar process evalution using process step transition operator declarations embedded in a cell's OPM.

ACT - ControllerAction plug-ins are used to read and write data to the OCD. Registered w/OPC, dispatched by OPC.act to process external actor requests. And, OPC requests made during cellular process evaluation using process step exit and enter action declarations embedded in a cell's OPM.

OCD - ObservableControllerData is a data storage container used by OPC for storing and managing cellular process runtime state. Ultimately, the contents of the OCD at runtime is the current runtime state (in total) of a cellular process "evaluating" inside of an OPC instance. The schema of this information derives from the CM passed to CP. Or, more specifically, from the CM's specific OPM declared OCD memory map which defines data and bindings between data and specific APM's.

## Higher-order abstractions

CM - CellModel - defines an association between a group of APM, TOP, ACT, and subCM's.

CP - Processor - accepts a single CM that aggregates all the holarchy artifacts required to deduce OPC configuration, instantiate it, and launch the cellular process.









