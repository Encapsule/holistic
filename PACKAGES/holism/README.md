# [![](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project Homepage")](https://encapsule.io)&nbsp;Encapsule Project

**[ [Homepage](https://encapsule.io "Encapsule Project Homepage...") ] [ [GitHub](https://github.com/Encapsule "Encapsule Project GitHub...") ] [ [Twitter](https://twitter.com/Encapsule "Encapsule Project Twitter...") ] [ [Discussion](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") ]**

Encapsule Project is MIT-licensed libs & tools for building full-stack Node.js/HTML5 apps & services w/React based on System in Cloud (SiC) architecture and runtime libraries.

# ![](ASSETS/encapsule-holistic-48x48.png)&nbsp;Holistic App Platform &bull; holism

## &#x25F0; @encapsule/holism v0.0.33 quatsino (app runtime library) &#x25F0;

```
Package: @encapsule/holism v0.0.33 "quatsino" build ID "oV-Qy6AlScKh58ocHIubQQ"
Sources: Encapsule/holistic-master#18c1e1299d71952d50076431aca307a3a243e4c9
Purpose: library (Node.js)
Created: 2020-01-18T19:43:51.000Z
License: MIT
```

**[ [&#x025C2; Holistic App Platform](../../README.md "Back to the main Holistic App Platform REAMDE...") ]**

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Description

Filter-extensible JSON-configured HTTP 1.1 REST framework for Node.js.

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Distribution

This package is an unpublished _pseudo-package_ that is included in the @encapsule/holistic v0.0.33 quatsino package for distribution via the `appgen` utility.

If you are viewing this README.md in the `./PACKAGES` subdirectory of the @encapsule/holistic package then you're looking at the source package that `appgen` will copy into your designated derived app/service git repo's `./HOLISTIC` directory.

If you are viewing this README.md in the `./HOLISTIC` subdirectory of your derived app/service repo then you're looking at the package that has been registered by _directory path_ (not package registry) in your derived app/service repo's `package.json` for the module require/import namespace `@encapsule/holism`.

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Usage

In the context of your derived app/service repo, `appgen` will install and register `@encapsule/holism` by _directory path_ in your `package.json`.

@encapsule/holism can then be imported/required into any module in your project as follows:

Example script, `holism-example.js`:

```JavaScript
const holism = require('@encapsule/holism');
console.log(JSON.stringify(holism.__meta));
/* ... your derived code here ... */
```

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Issues

Please post bug reports to one of the follow issue queues depending on topic:

- @encapsule/holistic [GitHub Issues](https://github.com/Encapsule/holistic/issues) - Holistic platform RTL + appgen issues.

- @encapsule/arccore [GitHub Issues](https://github.com/Encapsule/ARCcore/issues) - Core data RTL issues.

- @encapsule/arctools [GitHub Issue](https://github.com/Encapsule/ARCtools/issues) - Core data tools and RTL issues.

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Discussion

Join the Holistic App Platform [discussion group](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") to talk about the architecture, design, development, and test of full-stack interactive HTML5 applications and services implemented in JavaScript, derived from [Holistic Platform Runtime](#holistic-platform-runtime), and Facebook [React](https://reactjs.org). And, hosted on [Node.js](https://nodejs.org).

**[ [&#x025C2; Holistic App Platform](../../README.md "Back to the main Holistic App Platform REAMDE...") ] [ [&#x025B4; Top](#encapsule-project "Scroll to the top of the page...") ]**

<hr>

[![Encapsule Project](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project")](https://encapsule.io)

Published under [MIT](LICENSE) license by [Encapsule Project](https://encapsule.io)

Please follow [@Encapsule](https://twitter.com/encapsule) on Twitter for news and updates.

Copyright &copy; 2020 [Christopher D. Russell](https://github.com/ChrisRus) Seattle, Washington USA

<hr>