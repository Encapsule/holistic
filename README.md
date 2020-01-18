# [![](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project Homepage")](https://encapsule.io)&nbsp;Encapsule Project

**[ [Homepage](https://encapsule.io "Encapsule Project Homepage...") ] [ [GitHub](https://github.com/Encapsule "Encapsule Project GitHub...") ] [ [Twitter](https://twitter.com/Encapsule "Encapsule Project Twitter...") ] [ [Discussion](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") ]**

Encapsule Project is MIT-licensed libs & tools for building full-stack Node.js/HTML5 apps & services w/React based on System in Cloud (SiC) architecture and runtime libraries.

# ![](ASSETS/encapsule-holistic-48x48.png)&nbsp;Holistic App Platform

## &#x029C9; @encapsule/holistic v0.0.33 quatsino (distribution package) &#x029C9;

```
Package: @encapsule/holistic v0.0.33 "quatsino" build ID "oV-Qy6AlScKh58ocHIubQQ"
Sources: Encapsule/holistic-master#18c1e1299d71952d50076431aca307a3a243e4c9
Purpose: tools (Node.js)
Created: 2020-01-18T19:43:51.000Z
License: MIT
```

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Description

This package contains the Holistic App Platform runtime libraries (RTL's) and the 'appgen' utility for initializing and maintaining derived application and service git repositories.

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Overview

**Welcome the the Holistic App Platform!**

In this document:

- [appgen](#appgen-utility) command-line utility used to maintain derived app and service git repositories.

- [Holistic Platform Runtime](#holistic-platform-runtime) runtime library packages managed by `appgen`.

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Distribution

The @encapsule/holistic package (this package) is not published.

It is only available from the [@Encapsule](https://github.com/Encapsule) GitHub.

To get started you need to have a small collection of core tools installed on your host OS:

- [git](https://git-scm.com/)

- [Node.js](https://nodejs.org)

- [yarn](https://yarnpkg.com)

Presuming you already have these installed, clone the @encapsule/holistic git repo:

```
$ cd ~/code # or, wherever...
$ git clone git@github.com:Encapsule/holistic.git
```

You will generally only need to clone the repo once.

Subsequently, retrieve updates via `git fetch` and `git pull`.

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Installation

Once you have a local clone of the @encapsule/holistic git repo, you will need to ensure you're using the latest release version, and reinstall its dependencies before using `appgen` to update your derived app/service repo's.

```
$ cd ~/code/holistic
$ git pull origin master
$ yarn install
```

By convention, the latest supported release of @encapsule/holistic is available on the #master branch.

Other topic branches are used for testing updates prior to general release.

Be very aware the disconnect between git versioning and yarn (we don't automate that).

Always `yarn install` whenever you pull updates from GitHub. And, whenever switching topic branches.

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Documentation

The following sections explains the purpose and use of the [appgen](#appgen-utility) utility. And, provides an overview of the [Holistic Platform Runtime](#holistic-platform-runtime) library pseudo-packages copied by `appgen` into derived application and service git repositories.

### ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;appgen Utility

This is some information about the appgen utility.

### ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Holistic Platform Runtime

The "Holistic App Platform" is a collection of runtime library packages that are used to build full-stack web applications and services using [Node.js](https://nodejs.org) and [React](https://react.org).

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;&#x25F0; @encapsule/d2r2 &#x25F0;

Data-Driven React Render (d2r2) allows you to map JSON data types to React components and affect layout via JSON document composition dynamically at runtime w/type safety.

[README &#x25BA;](PACKAGES/d2r2/README.md "Jump to d2r2 RTL package README...")

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;&#x25F0; @encapsule/d2r2-components &#x25F0;

A collection of reusable React components compatible with @encapsule/d2r2 <ComponentRouter/>.

[README &#x25BA;](PACKAGES/d2r2-components/README.md "Jump to d2r2-components RTL package README...")

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;&#x25F0; @encapsule/hash-router &#x25F0;

A collection of reusable React components compatible with @encapsule/d2r2 <ComponentRouter/>.

[README &#x25BA;](PACKAGES/hash-router/README.md "Jump to hash-router RTL package README...")

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;&#x25F0; @encapsule/holarchy &#x25F0;

Holistic server and client application runtime factories, re-usable plug-in export library.

[README &#x25BA;](PACKAGES/holarchy/README.md "Jump to holarchy RTL package README...")

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;&#x25F0; @encapsule/holarchy-sml &#x25F0;

@encapsule/holarchy standard model library contains reusable ObservableProcessModels, TransitionOperators, ControllerActions, and shared OCD template specs.

[README &#x25BA;](PACKAGES/holarchy-sml/README.md "Jump to holarchy-sml RTL package README...")

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;&#x25F0; @encapsule/holism &#x25F0;

Filter-extensible JSON-configured HTTP 1.1 REST framework for Node.js.

[README &#x25BA;](PACKAGES/holism/README.md "Jump to holism RTL package README...")

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;&#x25F0; @encapsule/holism-metadata &#x25F0;

Library of service filter plug-ins for @encapsule/holism HTTP server and REST framework.

[README &#x25BA;](PACKAGES/holism-metadata/README.md "Jump to holism-metadata RTL package README...")

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;&#x25F0; @encapsule/holism-services &#x25F0;

Library of service filter plug-ins for @encapsule/holism HTTP server and REST framework.

[README &#x25BA;](PACKAGES/holism-services/README.md "Jump to holism-services RTL package README...")

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;&#x25F0; @encapsule/holodeck &#x25F0;

Holdeck is a synchronous test runner and test harness system used to test @encapsule/holistic RTL's and derived apps and services.

[README &#x25BA;](PACKAGES/holodeck/README.md "Jump to holodeck RTL package README...")

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;&#x25F0; @encapsule/holodeck-assets &#x25F0;

Holdeck assets bundles reusable test harnesses, and test vectors useful for testing apps and services derviced from @encapsule/holistic platform RTL's.

[README &#x25BA;](PACKAGES/holodeck-assets/README.md "Jump to holodeck-assets RTL package README...")

#### ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;&#x25F0; @encapsule/hrequest &#x25F0;

HTTP request filters for Node.js and browser clients.

[README &#x25BA;](PACKAGES/hrequest/README.md "Jump to hrequest RTL package README...")

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Issues

Please post bug reports to one of the follow issue queues depending on topic:

- @encapsule/holistic [GitHub Issues](https://github.com/Encapsule/holistic/issues) - Holistic platform RTL + appgen issues.

- @encapsule/arccore [GitHub Issues](https://github.com/Encapsule/ARCcore/issues) - Core data RTL issues.

- @encapsule/arctools [GitHub Issue](https://github.com/Encapsule/ARCtools/issues) - Core data tools and RTL issues.

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Discussion

Join the Holistic App Platform [discussion group](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") to talk about the architecture, design, development, and test of full-stack interactive HTML5 applications and services implemented in JavaScript, derived from [Holistic Platform Runtime](#holistic-platform-runtime), and Facebook [React](https://reactjs.org). And, hosted on [Node.js](https://nodejs.org).

**[ [&#x025B4; Top](#encapsule-project "Scroll to the top of the page...") ]**

<hr>

[![Encapsule Project](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project")](https://encapsule.io)

Published under [MIT](LICENSE) license by [Encapsule Project](https://encapsule.io)

Please follow [@Encapsule](https://twitter.com/encapsule) on Twitter for news and updates.

Copyright &copy; 2020 [Christopher D. Russell](https://github.com/ChrisRus) Seattle, Washington USA

<hr>