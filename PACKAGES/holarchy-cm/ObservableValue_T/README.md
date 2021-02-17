# ObservableValue_T

An instance of CellModelTemplate specialized for building member(s) of the ObservableValue CellModel family.

Specific family members are synthesized via ObservableValue_T.synthesizeCellModel method.

Each synthesized family member is a unique CellModel that provides a counted read/write mailbox over a specific data type (typically an object but we actually don't care).

Members of the ObservableValue family of CellModel are typically activated as helper cells that define input and output mailboxes of some containing cell.

But, we could theoretically use an ObservableValue cell as an owned or shared process (this hasn't been tested but it should be fine).

## ObservableValueBase

A CellModel instance the implements specialization-agnostic base behaviors for all members of the ObservableValue family of CellModel.

ObservableValueBase is registered as a subcell of every specialized ObservableValue family member.

## ObservableValueWorker_T

An instance of CellModelTemplate specialized for building member(s) of the ObservableValueWorker CellModel family.

Specific family members are synthesized via ObsevableValueWorker_T.synthesizeCellModel method.

Each synthesized family member is a unique CellModel designed to be used as an owned or shared cell process (not as a helper).

The purpose of each specialized member of the ObservableValueWorker family of CellModel is:

- Provide access to shared cell process resources in the cellplane via CellProcessor's intrinsic CellProcessProxy CellModel.
- Extend the functionality of the generic ObservableValueHelper CellModel.

## ObservableValueHelper

A CellModel instance that implements a generic means of linking to a shared ObservableValue family cell of some or another specialization type. And, obtaining its status, reading its value, and observing it for update.

Internally, ObservableValueHelper relies on specialized members of the ObservableValueWorker family of CellModel to affect resource sharing via CellProcessor's intrintrinc CellProcessManager process (~).

ObservableValueHelper cells are typically activated as helper cells that define and represent a virtual link to the shared ObservableValue cell.

