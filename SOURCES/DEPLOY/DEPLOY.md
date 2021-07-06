# @encapsule/holistic/SOURCES/DEPLOY/DEPLOY.md

When `@encapsule/holistic/appgen` CLI is executed on a git repository containing a bare-bones `npm-init`-created `package.json` manifest, it blindly copies the contents of the `@encapsule/holistic/SOURCES/*` directory tree into the new app service sources repository in order to initialize a baseline holistic app service build, test, and deployment environment.

When a developer executes `make appServiceDeployment` inside the newly generated app service sources repo, the Makefile rule:

    - Recursively copies the most recent app service runtime package build created via `make appServiceRuntime` from the `./BUILD/runtime-phase3/*` directory into `./DISTS/X-service-deploy/*` the directory.
    - Recursively copies the most recently-committed `./SOURCES/DEPLOY/*` directory into `./DISTS/X-service-deploy/*` directory.

You should replace the contents of this document with specific intructions to include in your `./DISTS/X-service-deploy/DEPLOY.md` document.

As well, resources commited into this app service's `./SOURCES/DEPLOY/*` directory will be published inside every `X-service-deploy` deployment package.

