# [![](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project Homepage")](https://encapsule.io)&nbsp;Encapsule Project

> **[Homepage](https://encapsule.io "Encapsule Project Homepage...") &bull; [GitHub](https://github.com/Encapsule "Encapsule Project GitHub...") &bull; [Discussion](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") &bull; [Twitter](https://twitter.com/Encapsule "Encapsule Project Twitter...")**

_Encapsule Project is a quest to define a universal protocol for domain-specific software models + infrastructure to support composition of distributed apps & services._

# ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Holistic App Platform v0.3.1-snowpack

```
Package: @encapsule/holistic v0.3.1-snowpack build ID "vkcKilw4QAKdxkKcouGCrA"
Sources: @encapsule/holodev#9d44c4960bdd7e758f870e30499671719a6f4b67
Created: 2022-02-09T19:58:35.000Z // License: MIT
Purpose: tools // Environment: Node.js
```

_@encapsule/holistic distribution package contains the Holistic App Platform's consituent runtime libraries, and  the 'appgen' command-line tool used to create derived JavaScript projects and keep them up-to-date._

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Contents


- [Introduction](#introduction)
- [&#x029C9; @encapsule/holistic Distribution Package](#encapsuleholistic-distribution-package)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
- [Holistic App Platform](#holistic-app-platform)
    - [Overview](#overview)
    - [appgen CLI Tool](#appgen-cli-tool)
    - [Platform Runtime Libraries](#platform-runtime-libraries)
        - [&#x25F0; d2r2 ](./PACKAGES/d2r2/README.md "Jump to d2r2 README...")
        - [&#x25F0; d2r2-components ](./PACKAGES/d2r2-components/README.md "Jump to d2r2-components README...")
        - [&#x25F0; holarchy ](./PACKAGES/holarchy/README.md "Jump to holarchy README...")
        - [&#x25F0; holarchy-cm ](./PACKAGES/holarchy-cm/README.md "Jump to holarchy-cm README...")
        - [&#x25F0; holism ](./PACKAGES/holism/README.md "Jump to holism README...")
        - [&#x25F0; holism-metadata ](./PACKAGES/holism-metadata/README.md "Jump to holism-metadata README...")
        - [&#x25F0; holism-services ](./PACKAGES/holism-services/README.md "Jump to holism-services README...")
        - [&#x25F0; holistic-app-models ](./PACKAGES/holistic-app-models/README.md "Jump to holistic-app-models README...")
        - [&#x25F0; holistic-html5-service ](./PACKAGES/holistic-html5-service/README.md "Jump to holistic-html5-service README...")
        - [&#x25F0; holistic-nodejs-service ](./PACKAGES/holistic-nodejs-service/README.md "Jump to holistic-nodejs-service README...")
        - [&#x25F0; holistic-service-core ](./PACKAGES/holistic-service-core/README.md "Jump to holistic-service-core README...")
        - [&#x25F0; holodeck ](./PACKAGES/holodeck/README.md "Jump to holodeck README...")
        - [&#x25F0; holodeck-assets ](./PACKAGES/holodeck-assets/README.md "Jump to holodeck-assets README...")
        - [&#x25F0; hrequest ](./PACKAGES/hrequest/README.md "Jump to hrequest README...")
- [Issues](#issues)
- [Discussion](#discussion)


## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;@encapsule/holistic

TODO: Briefly explain the contents of the `@encapsule/holistic` distribution package and explain how it relates to the Holistic App Platform.

### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;Prerequisites

> [&#9652; Top](#encapsule-project "Scroll to the top of the page...")

To get started you will need the following tools installed and available in your development environment:

- [GNU Make](https://www.gnu.org/software/make/)
- [git](https://git-scm.com/)
- [Node.js](https://nodejs.org) >=16.13.1
- [npm](https://www.npmjs.com) >=8.1.2

With these base prerequisites satisfied, you will be able to install the `@encapsule/holistic` distribution package.
And, then leverage the `appgen` command line utility to create/update your Holistic App Platform application service.

### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;Installation

> [&#9652; Top](#encapsule-project "Scroll to the top of the page...")

TODO: Add some notes on installation once the package is published to npm.

### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;Usage

> [&#9652; Top](#encapsule-project "Scroll to the top of the page...")

TODO: Add a brief introduction to how this package is used along with a link to the appgen section of this README.

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Holistic App Platform

> [&#9652; Top](#encapsule-project "Scroll to the top of the page...")

### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;Overview

> [&#9652; Top](#encapsule-project "Scroll to the top of the page...")

A **holistic application service** is a developer-maintained Node.js package git repository initialized and subsequently updated with the `appgen` command-line utility.

All holistic application services maintained with `appgen` have the same basic structure and base-level feature set.

- Base-level directory structure and entry module file naming conventions.
    - Base-level directory structure is prescriptive and required.
    - Developers can extend the directory / file structure:
        - Extend existing directory branches.
        - Create new directory trees rooted in the root directory.
- The `package.json` in derived holistic application packages is code-generated and owned `appgen`.
    - After first `appgen` run developers should edit `holistic-app.json` and not the code-generated `package.json`.
        - `devDependencies` is managed by `appgen` and is developer-extensible via `holistic-app.json`.
        - `scripts` is managed by `appgen` and is developer-extensible via `holistic-app.json`. Platform-defined scripts include:
            - build - build the holistic application by calling `make application`.
            - clean - remove the previous application build.
            - debug-server - build and start the Node.js HTTP app server on localhost under Node.js inspector.
            - holodeck - execute your application's @encapsule/holodeck test runner.
            - iruts - generate a batch of v4 UUID-derived IRUT-format identifier strings.
            - reset - scrub and additionally clear your local npm cache forcing complete re-stage on `npm install`.
            - server - build and start the Node.js HTTP app server on localhost.
            - scrub - clean and additionally delete `node_modules` directory.
            - start - launch a previously built Node.js HTTP app server on localhost.
- Core application build is automated by an `appgen`-generated `Makefile`.
    - Abstracts building a holistic application so that you can launch the Node.js HTTP app server. And, service the bundled client application.
    - Does not abstract the application-specific details required to:
        - Test your holistic application.
        - Package your application for distribution (e.g. further source transformation, Dockerfile generation...).
        - Deploy your application to a cloud service provider.
    - Developers can define application-specific test, packaging, and deployment targets in `Makefile-App`.
    - Holistic application build depends on [eslint], [babel], and [webpack].
        - Configuration for these tools is imposed by `appgen` and is not currently developer-extensible.

### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;appgen CLI Tool

> [&#9652; Top](#encapsule-project "Scroll to the top of the page...")

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
- Merge platform-defined npm integrations (e.g. run targets) with app-specific integrations.
- Merge changes back into `package.json`.
- Rewrite derived app's `package.json`.
- Initialize or recreate core project directory structure.
- Synthesize core GNU Makefile and Makefile-App files.
- Synthesize tool configuration files required by Makefile targets.
- Execute `npm install` to update dependencies per rewritten `package.json`.

### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;Platform Runtime Libraries

> [&#9652; Top](#encapsule-project "Scroll to the top of the page...")

All platform runtime libraries (RTLs) are distributed via the `@encapsule/holistic` distribution package. And are copied into, and registered for use in derived projects via [**appgen**](#appgen-cli-tool).

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;[@encapsule/d2r2](PACKAGES/d2r2/README.md "Jump to d2r2 RTL package README...")

&#x25F0; This package contains the Data-Driven React Router (d2r2) component factory extension for React. And, the ComponentRouter dynamic view compositor packaged as a generic React component. Used to build extensible view templates, and decoupled view libraries.

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;[@encapsule/d2r2-components](PACKAGES/d2r2-components/README.md "Jump to d2r2-components RTL package README...")

&#x25F0; This package contains a collection of re-usable d2r2 React components for use with the d2r2 ComponentRouter dynamic view compositor.

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;[@encapsule/holarchy](PACKAGES/holarchy/README.md "Jump to holarchy RTL package README...")

&#x25F0; Cellular process modeling and runtime engine for Node.js and browser.

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;[@encapsule/holarchy-cm](PACKAGES/holarchy-cm/README.md "Jump to holarchy-cm RTL package README...")

&#x25F0; This package contains the Holistic App Platform's core re-usable CellModel library.

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;[@encapsule/holism](PACKAGES/holism/README.md "Jump to holism RTL package README...")

&#x25F0; This package contains an experimental HTTP 1.1 application server and REST framework derived from the Node.js HTTP API's and the @encapsule/arccore filter RTL. This provides developers with a simple mechanism to define and re-use backend operations as plug-in service filters hosted by the holism server RTL. The package is intended for use in derived applications and services.

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;[@encapsule/holism-metadata](PACKAGES/holism-metadata/README.md "Jump to holism-metadata RTL package README...")

&#x25F0; This package contains an extensible framework for defining application-specific metadata - i.e. data about your app. It is intended for use in derived apps/services and is typically used in conjunction with @encapsule/holism integration plug-in filters to satisfy queries re: publishing organization, application, page, route, hashroute, resource, operation...

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;[@encapsule/holism-services](PACKAGES/holism-services/README.md "Jump to holism-services RTL package README...")

&#x25F0; This package contains re-usable service filter plug-ins for use with the @encapsule/holism app server package.

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;[@encapsule/holistic-app-models](PACKAGES/holistic-app-models/README.md "Jump to holistic-app-models RTL package README...")

&#x25F0; This package contains a collection of optional application and service models that may be resused to build holistic-powered runtimes.

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;[@encapsule/holistic-html5-service](PACKAGES/holistic-html5-service/README.md "Jump to holistic-html5-service RTL package README...")

&#x25F0; Exports the HolisticAppClient CellModel library for use in derived HTML5 applications.

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;[@encapsule/holistic-nodejs-service](PACKAGES/holistic-nodejs-service/README.md "Jump to holistic-nodejs-service RTL package README...")

&#x25F0; Exports the HolisticAppServer CellModel for use in derived @encapsule/holistic applications/services.

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;[@encapsule/holistic-service-core](PACKAGES/holistic-service-core/README.md "Jump to holistic-service-core RTL package README...")

&#x25F0; Exports the HolisticAppCommon CellModel library for use in derived HolisticAppServer and HolisticAppClient CellModels.

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;[@encapsule/holodeck](PACKAGES/holodeck/README.md "Jump to holodeck RTL package README...")

&#x25F0; This package contains the holodeck test runner and test harness plug-in filter factory infrastructure. Holodeck functions like a medical imaging system for your code that bombards it with queries and captures the results to disk. Comparison of git diff's is often all that's required to verify the correct and expected behavior of updated app/service code tracked in this way.

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;[@encapsule/holodeck-assets](PACKAGES/holodeck-assets/README.md "Jump to holodeck-assets RTL package README...")

&#x25F0; This package contains re-usable test runners, harnesses, and vectors for use in conjunction with @encapsule/holodeck test infrastructure package.

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;[@encapsule/hrequest](PACKAGES/hrequest/README.md "Jump to hrequest RTL package README...")

&#x25F0; This package contains arccore.filter wrappers for XMLHttpRequest (browser) and the request module (Node.js server). Provides a mechanism to ensure the runtime fidelity of HTTP GET/POST communication between the client and server. And, between the server and other backend REST service integrations.

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Issues

> [&#9652; Top](#encapsule-project "Scroll to the top of the page...")

Please post bug reports to one of the follow issue queues depending on topic:

- @encapsule/holistic [GitHub Issues](https://github.com/Encapsule/holistic/issues) - Holistic platform RTL + appgen issues.

- @encapsule/arccore [GitHub Issues](https://github.com/Encapsule/ARCcore/issues) - Core data RTL issues.

- @encapsule/arctools [GitHub Issue](https://github.com/Encapsule/ARCtools/issues) - Core data tools and RTL issues.

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Discussion

> [&#9652; Top](#encapsule-project "Scroll to the top of the page...")

Join the [Holistic App Platform Discussion](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Google Group for Holistic App Platform topics...") (Google Group) -- A group for discussion of Holistic App Platform runtime libraries, tools, design patterns, service architecture, and related topics.

<hr>

[![Encapsule Project](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project")](https://encapsule.io)

Copyright &copy; 2022 [Chris Russell](https://github.com/ChrisRus) Seattle, Washington USA

Published under [MIT](LICENSE) license by [Encapsule Project](https://encapsule.io)

Please follow [@Encapsule](https://twitter.com/encapsule) on Twitter for news and updates.