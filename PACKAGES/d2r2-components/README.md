# [![](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project Homepage")](https://encapsule.io)&nbsp;Encapsule Project

> [Homepage](https://encapsule.io "Encapsule Project Homepage...") &bull; [GitHub](https://github.com/Encapsule "Encapsule Project GitHub...") &bull; [Discussion](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") &bull; [Twitter](https://twitter.com/Encapsule "Encapsule Project Twitter...")

Encapsule Project is MIT-licensed libs & tools for building full-stack Node.js/HTML5 apps & services w/React based on System in Cloud (SiC) architecture.

# ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;[Holistic App Platform](../../README.md#encapsule-project "Back to the Holistic App Platform README...") v0.1.06 phoenix06

## &#x25F0; Runtime library: @encapsule/d2r2-components

> [**RTL index**](../../README.md#holistic-platform-runtime "Jump back to the RTL index..."): [d2r2](../d2r2/README.md#encapsule-project "Jump to d2r2 README...") &bull; &#x25F0; **d2r2-components** &bull; [holarchy](../holarchy/README.md#encapsule-project "Jump to holarchy README...") &bull; [holarchy-cm](../holarchy-cm/README.md#encapsule-project "Jump to holarchy-cm README...") &bull; [holism](../holism/README.md#encapsule-project "Jump to holism README...") &bull; [holism-metadata](../holism-metadata/README.md#encapsule-project "Jump to holism-metadata README...") &bull; [holism-services](../holism-services/README.md#encapsule-project "Jump to holism-services README...") &bull; [holistic-app-models](../holistic-app-models/README.md#encapsule-project "Jump to holistic-app-models README...") &bull; [holistic-html5-service](../holistic-html5-service/README.md#encapsule-project "Jump to holistic-html5-service README...") &bull; [holistic-nodejs-service](../holistic-nodejs-service/README.md#encapsule-project "Jump to holistic-nodejs-service README...") &bull; [holistic-service-core](../holistic-service-core/README.md#encapsule-project "Jump to holistic-service-core README...") &bull; [holodeck](../holodeck/README.md#encapsule-project "Jump to holodeck README...") &bull; [holodeck-assets](../holodeck-assets/README.md#encapsule-project "Jump to holodeck-assets README...") &bull; [hrequest](../hrequest/README.md#encapsule-project "Jump to hrequest README...")

This package contains a collection of re-usable d2r2 React components for use with the d2r2 ComponentRouter dynamic view compositor.

```
Package: @encapsule/d2r2-components v0.1.06 "phoenix06" build ID "l3y2VyGXQSKB6jFVaXazQQ"
Sources: @encapsule/holodev#0bd8f660463c2cb6acc9edd459e6d4bd031d7323
Created: 2021-06-21T15:49:02.000Z Purpose: library (Node.js) License: MIT
```

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Overview

**TODO**

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Distribution

The `@encapsule/d2r2-components` RTL package is installed in derived app/service projects by running [appgen](../../README#appgen-utility "Jump to appgen documentation...").

#### Detail

The @encapsule/d2r2-components package is a runtime library (RTL) distributed in the @encapsule/holistic package:

```
@encapsule/holistic/PACKAGES/d2r2-components
```

The `appgen` utility is used to create a copy of this RTL package inside your derived app/service project...

```
@AcmeCo/SampleApp/HOLISTIC/PACKAGES/d2r2-components
```

... and modify its `package.json` file to include the following package registration:

```
"devDependencies": {
    "@encapsule/d2r2-components": "file:./HOLISTIC/PACKAGES/d2r2-components"
}
```

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Usage

In your derived app/service implementation code:

Example script, `d2r2-components-example.js`:

```JavaScript
const d2r2-components = require('@encapsule/d2r2-components');
console.log(JSON.stringify(d2r2-components.__meta));
/* ... your derived code here ... */
```

Authoring `/* ... your derived code ... */` is discussed in the next section.

# ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;Documentation

**TODO**

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

Copyright &copy; 2021 [Christopher D. Russell](https://github.com/ChrisRus) Seattle, Washington USA

Published under [MIT](LICENSE) license by [Encapsule Project](https://encapsule.io)

Please follow [@Encapsule](https://twitter.com/encapsule) on Twitter for news and updates.

<hr>