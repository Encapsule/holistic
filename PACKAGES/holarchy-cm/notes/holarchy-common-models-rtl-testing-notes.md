# @encapsule/holarchy-cm RTL Testing Notes

Notes on @encapsule/holarcy-cm (common models) RTL test backlog.

## ObservableValueHelper

### Activation

ObservableValueHelper is an exported CellModel used to "observe" a value that is written by another cell.

It will typically be used as a helper cell. In other words, it will be included inside the OCD data spec via ____appdsl: { apm: IRUT } annotation.

When used as a helper, the cell will be activated when its parent cell process is activated. Or, when the parent cell process decides to activate it.

However, it's important that ObservableValueHelper also work and be stable for the less typical situation(s) where we might want to activate a specific ObservableValueHelper cell at some instanceID as an owned cell process (i.e. what you get with CPM activate action).

And, similarly we should be able to activate an ObservableValueHelper as a sshared process (i.e. it gets activated as a consequence of a CellProcessProxy connecting to it, and is deactivated when the last CellProcessProxy disconnects).

All of these cases need test coverage.

#### Default Activation

e.g.
```
{ CellProcessor: { process: { processCoordinates: { apmID, instanceName }, activate: {} } } }
```

> Cell should block and wait for configuration data

#### "Linked" Activation

e.g.
```
{ CellProcessor: { process: { processCoordinates: { apmID, instanceName }, activate: { processData: { config: { /* CONFIG DATA */ } } } } } }
```

> Cell should attempt to link upon activation (i.e. nobody will need to call the configure action)


#### Helper Activation

_Note the above discussion also applies to ObservableValueHelper cell's expected behavior when activated as a helper cell (i.e. it's lifespan is tied to or determined by some container CellModel's APM).


