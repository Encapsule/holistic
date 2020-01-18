# [![](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project Homepage")](https://encapsule.io) Encapsule Project

**[ [Homepage](https://encapsule.io "Encapsule Project Homepage...") ] [ [GitHub](https://github.com/Encapsule "Encapsule Project GitHub...") ] [ [Twitter](https://twitter.com/Encapsule "Encapsule Project Twitter...") ] [ [Discussion](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") ]**

# ![](ASSETS/encapsule-holistic-48x48.png) @encapsule/holistic v0.0.33 quatsino

```
Package: @encapsule/holistic v0.0.33 "quatsino" build ID "GetLGRUWSfijQYMxC2VI-Q"
Sources: Encapsule/holistic-master#6d676cdd0a4ea248d1fbc3752e8f4c760020a3cb
Purpose: tools (Node.js)
Created: 2020-01-18T02:56:04.000Z
License: MIT
```

## ![](ASSETS/encapsule-holistic-32x32.png) Description

This package contains the Holistic App Platform runtime libraries (RTL's) and the 'appgen' utility for initializing and maintaining derived application and service git repositories.

## ![](ASSETS/encapsule-holistic-32x32.png) Overview

**Welcome the the Holistic App Platform!**

In this document:

- [appgen](#appgen-utility) command-line utility used to maintain derived app and service git repositories.

- [Holistic Platform Runtime](#holistic-platform-runtime) runtime library packages managed by `appgen`.

## ![](ASSETS/encapsule-holistic-32x32.png) Distribution

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

## ![](ASSETS/encapsule-holistic-32x32.png) Installation

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

## ![](ASSETS/encapsule-holistic-32x32.png) Documentation

The following sections explains the purpose and use of the [appgen](#appgen-utility) utility. And, provides an overview of the [Holistic Platform Runtime](#holistic-platform-runtime) library pseudo-packages copied by `appgen` into derived application and service git repositories.

### ![](ASSETS/encapsule-holistic-24x24.png) appgen Utility

This is some information about the appgen utility.

### ![](ASSETS/encapsule-holistic-24x24.png) Holistic Platform Runtime

The "Holistic App Platform" is a collection of runtime library packages that are used to build full-stack web applications and services using [Node.js](https://nodejs.org) and [React](https://react.org).

#### ![](ASSETS/encapsule-holistic-16x16.png) @encapsule/d2r2

Data-Driven React Render (d2r2) allows you to map JSON data types to React components and affect layout via JSON document composition dynamically at runtime w/type safety.

[README](PACKAGES/d2r2/README.md)

#### ![](ASSETS/encapsule-holistic-16x16.png) @encapsule/d2r2-components

A collection of reusable React components compatible with @encapsule/d2r2 <ComponentRouter/>.

[README](PACKAGES/d2r2-components/README.md)

#### ![](ASSETS/encapsule-holistic-16x16.png) @encapsule/hash-router

A collection of reusable React components compatible with @encapsule/d2r2 <ComponentRouter/>.

[README](PACKAGES/hash-router/README.md)

#### ![](ASSETS/encapsule-holistic-16x16.png) @encapsule/holarchy

Holistic server and client application runtime factories, re-usable plug-in export library.

[README](PACKAGES/holarchy/README.md)

#### ![](ASSETS/encapsule-holistic-16x16.png) @encapsule/holarchy-sml

@encapsule/holarchy standard model library contains reusable ObservableProcessModels, TransitionOperators, ControllerActions, and shared OCD template specs.

[README](PACKAGES/holarchy-sml/README.md)

#### ![](ASSETS/encapsule-holistic-16x16.png) @encapsule/holism

Filter-extensible JSON-configured HTTP 1.1 REST framework for Node.js.

[README](PACKAGES/holism/README.md)

#### ![](ASSETS/encapsule-holistic-16x16.png) @encapsule/holism-metadata

Library of service filter plug-ins for @encapsule/holism HTTP server and REST framework.

[README](PACKAGES/holism-metadata/README.md)

#### ![](ASSETS/encapsule-holistic-16x16.png) @encapsule/holism-services

Library of service filter plug-ins for @encapsule/holism HTTP server and REST framework.

[README](PACKAGES/holism-services/README.md)

#### ![](ASSETS/encapsule-holistic-16x16.png) @encapsule/holodeck

Holdeck is a synchronous test runner and test harness system used to test @encapsule/holistic RTL's and derived apps and services.

[README](PACKAGES/holodeck/README.md)

#### ![](ASSETS/encapsule-holistic-16x16.png) @encapsule/holodeck-assets

Holdeck assets bundles reusable test harnesses, and test vectors useful for testing apps and services derviced from @encapsule/holistic platform RTL's.

[README](PACKAGES/holodeck-assets/README.md)

#### ![](ASSETS/encapsule-holistic-16x16.png) @encapsule/hrequest

HTTP request filters for Node.js and browser clients.

[README](PACKAGES/hrequest/README.md)

## ![](ASSETS/encapsule-holistic-32x32.png) Issues

Please post bug reports to one of the follow issue queues depending on topic:

- @encapsule/holistic [GitHub Issues](https://github.com/Encapsule/holistic/issues) - Holistic platform RTL + appgen issues.

- @encapsule/arccore [GitHub Issues](https://github.com/Encapsule/ARCcore/issues) - Core data RTL issues.

- @encapsule/arctools [GitHub Issue](https://github.com/Encapsule/ARCtools/issues) - Core data tools and RTL issues.

## ![](ASSETS/encapsule-holistic-32x32.png) Discussion

Join the Holistic App Platform [discussion group](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") to talk about the architecture, design, development, and test of full-stack interactive HTML5 applications and services implemented in JavaScript, derived from [Holistic Platform Runtime](#holistic-platform-runtime), and Facebook [React](https://reactjs.org). And, hosted on [Node.js](https://nodejs.org).

**[ [Top](#encapsule-project "Scroll to the top of the page...") ]**

<hr>

[![Encapsule Project](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project")](https://encapsule.io)

Published under [MIT](LICENSE) license by [Encapsule Project](https://encapsule.io)

Please follow [@Encapsule](https://twitter.com/encapsule) on Twitter for news and updates.

Copyright &copy; 2020 [Christopher D. Russell](https://github.com/ChrisRus) Seattle, Washington USA

<hr>