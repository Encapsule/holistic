# [![](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project Homepage")](https://encapsule.io)&nbsp;Encapsule Project

> [Homepage](https://encapsule.io "Encapsule Project Homepage...") &bull; [GitHub](https://github.com/Encapsule "Encapsule Project GitHub...") &bull; [Discussion](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") &bull; [Twitter](https://twitter.com/Encapsule "Encapsule Project Twitter...")

Encapsule Project is MIT-licensed libs & tools for building full-stack Node.js/HTML5 apps & services w/React based on System in Cloud (SiC) architecture.

# ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Holistic App Platform v0.0.38 calvert-rc4

##  &#x029C9; Distribution:  @encapsule/holistic

> [appgen](#appgen-utility) &bull; [Holistic Platform Runtime](#holistic-platform-runtime)

Full-stack component engineering platform for building complex stateful webs apps and services with software models.

```
Package: @encapsule/holistic v0.0.38 "calvert-rc4" build ID "xVMelTFpRSmMS7faXh6MWQ"
Sources: Encapsule/holistic-master#9aeb4b84798f9e67c9e6513e6890fa354a4fb6db
Created: 2020-03-02T23:03:21.000Z Purpose: tools (Node.js) License: MIT
```

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Overview

### Welcome the the Holistic App Platform

Holistic app platform is a collection of modular JavaScript runtime libraries (RTL) used to build full-stack client/server applications from plug-and-play software models.

Work on is project is quite active right now as it's being used to re-design and re-implement an existing commercial SaaS product.

**PRE-RELEASE STATUS**

Holistic app platform is becoming quite stable. But, lacks examples (required) and API documentation (required). Unless you're one of a small handful of insane people (thank you insane people!) who are working with this codebase every day then you probably should just make a bookmark and come back a little later in 2020 ;-)

### Contents

- [**appgen**](#appgen-utility) - A command-line utility used to initialize & maintain derived app/service git repos.

- [**Holistic Platform Runtime**](#holistic-platform-runtime "Jump to RTL package index...") - Core runtime app/service runtime libraries (RTL) packages.

    - &#x25F0; [@encapsule/d2r2](PACKAGES/d2r2/README.md "Jump to d2r2 RTL package README...")

    - &#x25F0; [@encapsule/d2r2-components](PACKAGES/d2r2-components/README.md "Jump to d2r2-components RTL package README...")

    - &#x25F0; [@encapsule/hash-router](PACKAGES/hash-router/README.md "Jump to hash-router RTL package README...")

    - &#x25F0; [@encapsule/holarchy](PACKAGES/holarchy/README.md "Jump to holarchy RTL package README...")

    - &#x25F0; [@encapsule/holarchy-cm](PACKAGES/holarchy-cm/README.md "Jump to holarchy-cm RTL package README...")

    - &#x25F0; [@encapsule/holism](PACKAGES/holism/README.md "Jump to holism RTL package README...")

    - &#x25F0; [@encapsule/holism-metadata](PACKAGES/holism-metadata/README.md "Jump to holism-metadata RTL package README...")

    - &#x25F0; [@encapsule/holism-services](PACKAGES/holism-services/README.md "Jump to holism-services RTL package README...")

    - &#x25F0; [@encapsule/holistic-app-client-cm](PACKAGES/holistic-app-client-cm/README.md "Jump to holistic-app-client-cm RTL package README...")

    - &#x25F0; [@encapsule/holistic-app-server-cm](PACKAGES/holistic-app-server-cm/README.md "Jump to holistic-app-server-cm RTL package README...")

    - &#x25F0; [@encapsule/holodeck](PACKAGES/holodeck/README.md "Jump to holodeck RTL package README...")

    - &#x25F0; [@encapsule/holodeck-assets](PACKAGES/holodeck-assets/README.md "Jump to holodeck-assets RTL package README...")

    - &#x25F0; [@encapsule/hrequest](PACKAGES/hrequest/README.md "Jump to hrequest RTL package README...")

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Distribution

The @encapsule/holistic package is not currently published on npmjs.com or any other package registry.

Currently, you need to obtain the @encapsule/holistic package via `git clone` as below.

### Prerequisites

To get started you need a small set of core tools installed on your host OS:

- [GNU Make](https://www.gnu.org/software/make/)

- [git](https://git-scm.com/)

- [Node.js](https://nodejs.org)

- [yarn](https://yarnpkg.com) (depends on Node.js)

Most of you will likely already have all of these tool installed.

If not, then they are readily available for all major platforms at the links above.

### Clone

Execute `git clone` to obtain a copy of the @encapsule/holistic package repo from [@Encapsule](https://github.com/Encapsule) GitHub organization.

You will typically only need to clone the @encapsule/holistic package repo once.

```
$ cd ~/code # or, wherever...
$ git clone git@github.com:Encapsule/holistic.git
```

After one-time `git clone`, follow the steps outlined in the [Installation](#installation) section below.

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Installation

Installation of the @encapsule/holistic package from git repo source is a per-version process that should be re-executed every time you update your local clone of the repo. This includes changing branches.

- Ensure you have the latest version of @encapsule/holistic repo.

- Update your local `node_modules` directory. **IMPORTANT**

```
$ cd ~/code/holistic
$ git pull origin master
$ yarn install
```

> Be aware of the disconnect between what is present in your `node_modules` directory (managed by `yarn`). And, the state of critical `package.json` and `yarn.lock` files (managed by `git`).

- Latest supported version is available on #master branch.

- Other topic branches are used for testing features prior to release.

After you have executed `yarn install`, the [appgen](#appgen-utility) utility is ready to use.

# ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Documentation

## Holistic Applications

A **holistic application** is a developer-maintained Node.js package git repository initialized and subsequently updated with the `appgen` command-line utility.

All holistic applications maintained with `appgen` have the same basic structure and base-level feature set:

- Base-level directory structure and entry module file naming conventions.

    - Base-level directory structure is prescriptive and required.

    - Developers can extend the directory / fire structure:

        - Extend existing branches.

        - Create new directory trees rooted in the root directory.

- The `package.json` in derived holistic application packages is code-generated and owned `appgen`.

    - At inception there is only `package.json`.

    - After first `appgen` run developers should edit `holistic-app.json`.

    - `devDependencies` is managed by `appgen` and is developer-extensible via `holistic-app.json`.

    - `scripts` is managed by `appgen` and is developer-extensible via `holistic-app.json`. Platform-defined scripts include:

        - install - executed after `yarn install`.

        - clean - remove the previous application build.

        - scrub - clean and additionally delete `node_modules` directory.

        - reset - scrub and additionally clear your local yarn cache forcing complete re-stage on `yarn install`.

        - build - build the holistic application by calling `make application`.

        - server - build and start the Node.js HTTP app server on localhost.

        - debug-server - build and start the Node.js HTTP app server on localhost under Node.js inspector.

        - start - launch a previously built Node.js HTTP app server on localhost.

        - holodeck - execute your application's @encapsule/holodeck test runner.

        - appinfo - print holistic application and platform metadata.

        - platform - print holistic app platform metadata.

        - iruts - generate a batch of v4 UUID-derived IRUT-format identifier strings.

- Core application build is automated by an `appgen`-generated `Makefile`.

    - Abstracts building a holistic application so that you can launch the Node.js HTTP app server. And, service the bundled client application.

    - Does not abstract the application-specific details required to:

        - Test your holistic application.

        - Package your application for distribution (e.g. further source transformation, Dockerfile generation...).

        - Deploy your application to a cloud service provider.

    - Developers can define application-specific test, packaging, and deployment targets in `Makefile-App`.

    - Holistic application build depends on [eslint], [babel], and [webpack].

        - Configuration for these tools is imposed by `appgen` and is not currently developer-extensible.

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;appgen Utility

### Overview

The `appgen` utility is a code generation tool used by developers to initialize and maintain **holistic applications**.

Both initialization and maintenance operations are performed using the same simple command line:

```
$ path_to_holistic/appgen --appRepoDir path_to_your_app_repo
```

Here is what happens when you execute `appgen` on your_app_repo:

- Reads or creates a default `holistic-app.json` file.

- Read your project's `package.json`.

- Remove previously installed platform runtime libraries (RTL's).

- Install new platform RTL's.

- Register platform RTL dependencies.

- Merge application and platform-defined package dependencies.

- De-duplicate and error check finalized dependencies.

- Merge platform-defined yarn integrations (e.g. run targets) with app-specific integrations.

- Merge changes back into `package.json`.

- Rewrite derived app's `package.json`.

- Initialize or recreate core project directory structure.

- Synthesize core GNU Makefile and Makefile-App files.

- Synthesize tool configuration files required by Makefile targets.

- Execute `yarn install --check-files`.

Once `appgen` has completed, 

### Usage

#### Prerequisites

#### Initial Project Setup

- Create a directory for your new holistic application.

- Turn your directory into a git repository with `git init`.

- Turn your git repo into a Node.js package with `yarn init`.

- Commit your empty application package with `git commit -a`.

#### Project Update

E E Dksjks l lksdf

#### Update Verification

sf l llsdkfj wl kwksxcnsl

#### Update Commit

fs j lkclkxs lwpo ns

### Derived Projects

Some introductory text.

#### yarn Integrations

 sdkjfsdfs whole list blah blah

#### Project Directory Structure

Some initial discussion of the `appgen`-created directory structure.

#### Holistic App Build: Makefile

An explanation of the `appgen`-generated Makefile created in the root of derived projects.

#### App-Specific Build: Makefile-App

jdhf  fkjhsdfkj s

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Holistic Platform Runtime

The "Holistic App Platform" is a collection of runtime library packages that are used to build full-stack web applications and services using [Node.js](https://nodejs.org) and [React](https://react.org).

### &#x25F0; [@encapsule/d2r2](PACKAGES/d2r2/README.md "Jump to d2r2 RTL package README...")

This package contains the Data-Driven React Router (d2r2) component factory extension for React. And, the ComponentRouter dynamic view compositor packaged as a generic React component. Used to build extensible view templates, and decoupled view libraries.

> [README &#9656;](PACKAGES/d2r2/README.md "Jump to d2r2 RTL package README...")

### &#x25F0; [@encapsule/d2r2-components](PACKAGES/d2r2-components/README.md "Jump to d2r2-components RTL package README...")

This package contains a collection of re-usable d2r2 React components for use with the d2r2 ComponentRouter dynamic view compositor.

> [README &#9656;](PACKAGES/d2r2-components/README.md "Jump to d2r2-components RTL package README...")

### &#x25F0; [@encapsule/hash-router](PACKAGES/hash-router/README.md "Jump to hash-router RTL package README...")

This package contains a minimal client-side hash router implementation that is designed to be integrated into higher-level abstractions. For example, a re-usable ObservableProcessModel (OPM).

> [README &#9656;](PACKAGES/hash-router/README.md "Jump to hash-router RTL package README...")

### &#x25F0; [@encapsule/holarchy](PACKAGES/holarchy/README.md "Jump to holarchy RTL package README...")

Cellular process modeling and runtime engine for Node.js and browser.

> [README &#9656;](PACKAGES/holarchy/README.md "Jump to holarchy RTL package README...")

### &#x25F0; [@encapsule/holarchy-cm](PACKAGES/holarchy-cm/README.md "Jump to holarchy-cm RTL package README...")

This package contains the Holistic App Platform's core re-usable CellModel library.

> [README &#9656;](PACKAGES/holarchy-cm/README.md "Jump to holarchy-cm RTL package README...")

### &#x25F0; [@encapsule/holism](PACKAGES/holism/README.md "Jump to holism RTL package README...")

This package contains an experimental HTTP 1.1 application server and REST framework derived from the Node.js HTTP API's and the @encapsule/arccore filter RTL. This provides developers with a simple mechanism to define and re-use backend operations as plug-in service filters hosted by the holism server RTL. The package is intended for use in derived applications and services.

> [README &#9656;](PACKAGES/holism/README.md "Jump to holism RTL package README...")

### &#x25F0; [@encapsule/holism-metadata](PACKAGES/holism-metadata/README.md "Jump to holism-metadata RTL package README...")

This package contains an extensible framework for defining application-specific metadata - i.e. data about your app. It is intended for use in derived apps/services and is typically used in conjunction with @encapsule/holism integration plug-in filters to satisfy queries re: publishing organization, application, page, route, hashroute, resource, operation...

> [README &#9656;](PACKAGES/holism-metadata/README.md "Jump to holism-metadata RTL package README...")

### &#x25F0; [@encapsule/holism-services](PACKAGES/holism-services/README.md "Jump to holism-services RTL package README...")

This package contains re-usable service filter plug-ins for use with the @encapsule/holism app server package.

> [README &#9656;](PACKAGES/holism-services/README.md "Jump to holism-services RTL package README...")

### &#x25F0; [@encapsule/holistic-app-client-cm](PACKAGES/holistic-app-client-cm/README.md "Jump to holistic-app-client-cm RTL package README...")

Exports the HolisticAppClient CellModel library for use in derived HTML5 applications.

> [README &#9656;](PACKAGES/holistic-app-client-cm/README.md "Jump to holistic-app-client-cm RTL package README...")

### &#x25F0; [@encapsule/holistic-app-server-cm](PACKAGES/holistic-app-server-cm/README.md "Jump to holistic-app-server-cm RTL package README...")

Exports the HolisticAppServer CellModel for use in derived @encapsule/holistic applications/services.

> [README &#9656;](PACKAGES/holistic-app-server-cm/README.md "Jump to holistic-app-server-cm RTL package README...")

### &#x25F0; [@encapsule/holodeck](PACKAGES/holodeck/README.md "Jump to holodeck RTL package README...")

This package contains the holodeck test runner and test harness plug-in filter factory infrastructure. Holodeck functions like a medical imaging system for your code that bombards it with queries and captures the results to disk. Comparison of git diff's is often all that's required to verify the correct and expected behavior of updated app/service code tracked in this way.

> [README &#9656;](PACKAGES/holodeck/README.md "Jump to holodeck RTL package README...")

### &#x25F0; [@encapsule/holodeck-assets](PACKAGES/holodeck-assets/README.md "Jump to holodeck-assets RTL package README...")

This package contains re-usable test runners, harnesses, and vectors for use in conjunction with @encapsule/holodeck test infrastructure package.

> [README &#9656;](PACKAGES/holodeck-assets/README.md "Jump to holodeck-assets RTL package README...")

### &#x25F0; [@encapsule/hrequest](PACKAGES/hrequest/README.md "Jump to hrequest RTL package README...")

This package contains arccore.filter wrappers for XMLHttpRequest (browser) and the request module (Node.js server). Provides a mechanism to ensure the runtime fidelity of HTTP GET/POST communication between the client and server. And, between the server and other backend REST service integrations.

> [README &#9656;](PACKAGES/hrequest/README.md "Jump to hrequest RTL package README...")

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Issues

Please post bug reports to one of the follow issue queues depending on topic:

- @encapsule/holistic [GitHub Issues](https://github.com/Encapsule/holistic/issues) - Holistic platform RTL + appgen issues.

- @encapsule/arccore [GitHub Issues](https://github.com/Encapsule/ARCcore/issues) - Core data RTL issues.

- @encapsule/arctools [GitHub Issue](https://github.com/Encapsule/ARCtools/issues) - Core data tools and RTL issues.

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Discussion

Join the Holistic App Platform [discussion group](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") to talk about the architecture, design, development, and test of full-stack interactive HTML5 applications and services implemented in JavaScript, derived from [Holistic Platform Runtime](#holistic-platform-runtime), and Facebook [React](https://reactjs.org). And, hosted on [Node.js](https://nodejs.org).

> [&#9652; Top](#encapsule-project "Scroll to the top of the page...")

<hr>

[![Encapsule Project](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project")](https://encapsule.io)

Copyright &copy; 2020 [Christopher D. Russell](https://github.com/ChrisRus) Seattle, Washington USA

Published under [MIT](LICENSE) license by [Encapsule Project](https://encapsule.io)

Please follow [@Encapsule](https://twitter.com/encapsule) on Twitter for news and updates.

<hr>