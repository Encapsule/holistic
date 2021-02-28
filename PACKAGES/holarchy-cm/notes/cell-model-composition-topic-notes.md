# CellModel Composition Notes

## v0.0.54-citrine

I am not satisfied with @encapsule/holarchy CellModelTemplate's handling of CellModelArtifactSpace quite yet.

In @encapsule/holarchy-cm

cmasHolarchyCMPackage is a CMAS that anchors all the artifacts exports from @encapsule/holarchy-cm

For CellModel, this is pretty straight forward; within a CMAS you need to ensure that CellModel labels are unique. And, if you control the CMAS (i.e. you created it) then this is not difficult.

And, if you forget CellModel will sort you out because it will not let you merge CellModel's that register artifacts with the same IRUT ID's but different declarations.

For CellModelTemplate things get trickier. Suppose:

```
const cmSynth_WebsiteViews = new holarchy.CellModelTemplate({ cmasScope: { spaceLabel: "@acmesoft/website" }, templateLabel: "WebsiteViews", cellModelGenerator: {...} });
```

So, because CellModelTemplate extends CellModelArtifactSpace we'll find that `cmSynth_WebsiteViews._private.spaceLabel` === `@acmesoft/website∂WebsiteViews`.


that we'll call `cmSynth_WebsiteViews` in this example.

Recall that CellModelTemplate extends CellModelArtifactSpace. So, you can call CellModelArtifactSpace class methods on `cmSynth_WebsiteViews`.


