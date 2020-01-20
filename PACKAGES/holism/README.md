# [![](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project Homepage")](https://encapsule.io)&nbsp;Encapsule Project

[ [**GitHub**](https://github.com/Encapsule "Encapsule Project GitHub...") ] [ [**Discussion**](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") ] [ [**Homepage**](https://encapsule.io "Encapsule Project Homepage...") ] [ [**Twitter**](https://twitter.com/Encapsule "Encapsule Project Twitter...") ]

Encapsule Project is MIT-licensed libs & tools for building full-stack Node.js/HTML5 apps & services w/React based on System in Cloud (SiC) architecture.

# ![](ASSETS/encapsule-holistic-48x48.png)&nbsp;[Holistic App Platform](../../README.md#encapsule-project "Back to the Holistic App Platform README...") &bull; holism

## &#x25F0; @encapsule/holism v0.0.33 quatsino &#x25F0;

> Filter-extensible JSON-configured HTTP 1.1 REST framework for Node.js.

```
Package: @encapsule/holism v0.0.33 "quatsino" build ID "P8D-x1lWQj2k9n8rhJpeRA"
Sources: Encapsule/holistic-master#1f376c508e7fc2f14e527e694c592de280e933c2
Purpose: library (Node.js)
Created: 2020-01-20T00:14:31.000Z
License: MIT
```

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Overview

[**RTL's**](../../README.md#holistic-platform-runtime "Jump back to the RTL index...")**::** [ [d2r2](../d2r2/README.md#encapsule-project "Jump to d2r2 README...") &bull; [d2r2-components](../d2r2-components/README.md#encapsule-project "Jump to d2r2-components README...") &bull; [hash-router](../hash-router/README.md#encapsule-project "Jump to hash-router README...") &bull; [holarchy](../holarchy/README.md#encapsule-project "Jump to holarchy README...") &bull; [holarchy-sml](../holarchy-sml/README.md#encapsule-project "Jump to holarchy-sml README...") &bull; **holism** &bull; [holism-metadata](../holism-metadata/README.md#encapsule-project "Jump to holism-metadata README...") &bull; [holism-services](../holism-services/README.md#encapsule-project "Jump to holism-services README...") &bull; [holodeck](../holodeck/README.md#encapsule-project "Jump to holodeck README...") &bull; [holodeck-assets](../holodeck-assets/README.md#encapsule-project "Jump to holodeck-assets README...") &bull; [hrequest](../hrequest/README.md#encapsule-project "Jump to hrequest README...") ]

**MISSING OVERVIEW SECTION FOR PACKAGE!**

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Distribution

The @encapsule/holism package is runtime library (RTL) package bundled in the @encapsule/holistic package for distribution via the `appgen` utility.

Once you have run `appgen` on your derived app/service git repo, `@encapsule/holism ` will be registered and available for [use](#usage) in your app/service implementation.

See also: [appgen](../../README.md#appgen-utility)

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Usage

In the context of your derived app/service repo, `appgen` will install and register `@encapsule/holism` by _directory path_ in your `package.json`.

@encapsule/holism can then be imported/required into any module in your project as follows:

Example script, `holism-example.js`:

```JavaScript
const holism = require('@encapsule/holism');
console.log(JSON.stringify(holism.__meta));
/* ... your derived code here ... */
```

The next section provides additional context and explains how to use this RTL's API.

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Documentation

**MISSING PACKAGE DOCUMENTATION!**

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Issues

Please post bug reports to one of the follow issue queues depending on topic:

- @encapsule/holistic [GitHub Issues](https://github.com/Encapsule/holistic/issues) - Holistic platform RTL + appgen issues.

- @encapsule/arccore [GitHub Issues](https://github.com/Encapsule/ARCcore/issues) - Core data RTL issues.

- @encapsule/arctools [GitHub Issue](https://github.com/Encapsule/ARCtools/issues) - Core data tools and RTL issues.

## ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Discussion

Join the Holistic App Platform [discussion group](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") to talk about the architecture, design, development, and test of full-stack interactive HTML5 applications and services implemented in JavaScript, derived from [Holistic Platform Runtime](#holistic-platform-runtime), and Facebook [React](https://reactjs.org). And, hosted on [Node.js](https://nodejs.org).

**[ [&#9666; Holistic App Platform](../../README.md "Back to the main Holistic App Platform REAMDE...") ] [ [&#9652; Top](#encapsule-project "Scroll to the top of the page...") ]**

<hr>

[![Encapsule Project](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project")](https://encapsule.io)

Published under [MIT](LICENSE) license by [Encapsule Project](https://encapsule.io)

Please follow [@Encapsule](https://twitter.com/encapsule) on Twitter for news and updates.

Copyright &copy; 2020 [Christopher D. Russell](https://github.com/ChrisRus) Seattle, Washington USA

<hr>