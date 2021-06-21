# @encapsule/holistic/SOURCES/README.md

The `@encapsule/holistic/appgen` CLI utility is used to initialize and subsequently update developer-owned-and-maintained "holistic app service project" monorepo(s) w/the latest version of the @encapsule/holistic platform build, test, packaging, and deployment infrastructure + the platform's constituent runtime libraries.

When `appgen` is executed for the first time on a git repo that contains only a skeletal (e.g. created trivially w/`npm init`) npm `package.json` manifest but no `holistic-app.json` manifest, it default initializes the new app service project repo w/the contents of the `./SOURCES/*` directory included in the @encapsule/holistic package distribution. This allows developers to quickly create and configure a baseline holistic app service project w/predictable baseline functionality and behaviors.

This initialization process occurs once only; once `holistic-app.json` has been written `appgen` ignores its own `./SOURCES/*` directory and makes no further updates whatsoever to the `./SOURCES/*` directory of a developer-owned-and-maintained "holistic app service project" monorepo.

In other words, once a developer has created a new holistic app service project monorepo with `appgen` then they own the `./SOURCES/*` tree inside that project monorepo; appgen doesn't mess with those files any further.

