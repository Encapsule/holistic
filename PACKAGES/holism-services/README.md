# [![](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project Homepage")](https://encapsule.io)&nbsp;Encapsule Project

> [Homepage](https://encapsule.io "Encapsule Project Homepage...") &bull; [GitHub](https://github.com/Encapsule "Encapsule Project GitHub...") &bull; [Discussion](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") &bull; [Twitter](https://twitter.com/Encapsule "Encapsule Project Twitter...")

Encapsule Project is MIT-licensed libs & tools for building full-stack Node.js/HTML5 apps & services w/React based on System in Cloud (SiC) architecture.

# ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;[Holistic App Platform](../../README.md#encapsule-project "Back to the Holistic App Platform README...") v0.0.33 quatsino

## &#x25F0; Runtime library: @encapsule/holism-services

> [RTL index](../../README.md#holistic-platform-runtime "Jump back to the RTL index..."): [d2r2](../d2r2/README.md#encapsule-project "Jump to d2r2 README...") &bull; [d2r2-components](../d2r2-components/README.md#encapsule-project "Jump to d2r2-components README...") &bull; [hash-router](../hash-router/README.md#encapsule-project "Jump to hash-router README...") &bull; [holarchy](../holarchy/README.md#encapsule-project "Jump to holarchy README...") &bull; [holarchy-sml](../holarchy-sml/README.md#encapsule-project "Jump to holarchy-sml README...") &bull; [holism](../holism/README.md#encapsule-project "Jump to holism README...") &bull; [holism-metadata](../holism-metadata/README.md#encapsule-project "Jump to holism-metadata README...") &bull; &#x25F0; **holism-services** &#x25F0; &bull; [holodeck](../holodeck/README.md#encapsule-project "Jump to holodeck README...") &bull; [holodeck-assets](../holodeck-assets/README.md#encapsule-project "Jump to holodeck-assets README...") &bull; [hrequest](../hrequest/README.md#encapsule-project "Jump to hrequest README...")

This package contains re-usable service filter plug-ins for use with the @encapsule/holism app server package.

```
Package: @encapsule/holism-services v0.0.33 "quatsino" build ID "TEON1GhXSVmdCDUy9KyuWQ"
Sources: Encapsule/holistic-master#812fe479c0e4ac903a4376bfc6ce236fcfbb9ed9
Purpose: library (Node.js)
Created: 2020-01-20T23:39:12.000Z
License: MIT
```

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Overview

_Replace with holism-services overview._

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Distribution

The @encapsule/holism-services package is a runtime library (RTL) distributed in the @encapsule/holistic package:

```
@encapsule/holistic/PACKAGES/holism-services
```

The `appgen` utility is used to create a copy of this RTL package inside your derived app/service git repo:

```
@AcmeCo/SampleApp/HOLISTIC/PACKAGES/holism-services
```

... and to modifying `@AcmeCo/SampleApp/package.json` to include:

```
"devDependencies": {
    "@encapsule/holism-services": "./HOLISTIC/PACKAGES/holism-services"
}
```

> See also: [appgen](../../README.md#appgen-utility "Jump to appgen documentation...")

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Usage

In your derived app/service implementation code:

Example script, `holism-services-example.js`:

```JavaScript
const holism-services = require('@encapsule/holism-services');
console.log(JSON.stringify(holism-services.__meta));
/* ... your derived code here ... */
```

Authoring `/* ... your derived code ... */` is discussed in the next section.

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Documentation

_Replace with holism-services package documentation._

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Issues

Please post bug reports to one of the follow issue queues depending on topic:

- @encapsule/holistic [GitHub Issues](https://github.com/Encapsule/holistic/issues) - Holistic platform RTL + appgen issues.

- @encapsule/arccore [GitHub Issues](https://github.com/Encapsule/ARCcore/issues) - Core data RTL issues.

- @encapsule/arctools [GitHub Issue](https://github.com/Encapsule/ARCtools/issues) - Core data tools and RTL issues.

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Discussion

Join the Holistic App Platform [discussion group](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") to talk about the architecture, design, development, and test of full-stack interactive HTML5 applications and services implemented in JavaScript, derived from [Holistic Platform Runtime](#holistic-platform-runtime), and Facebook [React](https://reactjs.org). And, hosted on [Node.js](https://nodejs.org).

> [&#9666; Holistic App Platform](../../README.md "Back to the main Holistic App Platform REAMDE...") &bull; [&#9652; Top](#encapsule-project "Scroll to the top of the page...")

<hr>

[![Encapsule Project](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project")](https://encapsule.io)

Published under [MIT](LICENSE) license by [Encapsule Project](https://encapsule.io)

Please follow [@Encapsule](https://twitter.com/encapsule) on Twitter for news and updates.

Copyright &copy; 2020 [Christopher D. Russell](https://github.com/ChrisRus) Seattle, Washington USA

<hr>