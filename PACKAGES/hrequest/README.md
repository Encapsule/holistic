# [![](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project Homepage")](https://encapsule.io)&nbsp;Encapsule Project

> **[Homepage](https://encapsule.io "Encapsule Project Homepage...") &bull; [GitHub](https://github.com/Encapsule "Encapsule Project GitHub...") &bull; [Discussion](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") &bull; [Twitter](https://twitter.com/Encapsule "Encapsule Project Twitter...")**

_Encapsule Project is a quest to define a universal protocol for domain-specific software models + infrastructure to support composition of distributed apps & services._

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;[Holistic App Platform v0.3.3-snowpack](../../README.md)

> **[&#9666; Holistic App Platform](../../README.md#encapsule-project "Jump to @encapsule/holistic distribution package README...") Runtime Libraries::** [d2r2](../d2r2/README.md#encapsule-project "Jump to d2r2 README...") &bull; [d2r2-components](../d2r2-components/README.md#encapsule-project "Jump to d2r2-components README...") &bull; [holarchy](../holarchy/README.md#encapsule-project "Jump to holarchy README...") &bull; [holarchy-cm](../holarchy-cm/README.md#encapsule-project "Jump to holarchy-cm README...") &bull; [holism](../holism/README.md#encapsule-project "Jump to holism README...") &bull; [holism-metadata](../holism-metadata/README.md#encapsule-project "Jump to holism-metadata README...") &bull; [holism-services](../holism-services/README.md#encapsule-project "Jump to holism-services README...") &bull; [holistic-app-models](../holistic-app-models/README.md#encapsule-project "Jump to holistic-app-models README...") &bull; [holistic-html5-service](../holistic-html5-service/README.md#encapsule-project "Jump to holistic-html5-service README...") &bull; [holistic-nodejs-service](../holistic-nodejs-service/README.md#encapsule-project "Jump to holistic-nodejs-service README...") &bull; [holistic-service-core](../holistic-service-core/README.md#encapsule-project "Jump to holistic-service-core README...") &bull; [holodeck](../holodeck/README.md#encapsule-project "Jump to holodeck README...") &bull; [holodeck-assets](../holodeck-assets/README.md#encapsule-project "Jump to holodeck-assets README...") &bull; ![](ASSETS/encapsule-holistic-16x16.png)&nbsp;**hrequest**&nbsp;![](ASSETS/encapsule-holistic-16x16.png)

# ![](ASSETS/encapsule-holistic-32x32.png)&nbsp;@encapsule/hrequest

```
Package: @encapsule/hrequest v0.3.3-snowpack build ID "6XoaGnEQQXSxrlm229GY9Q"
Sources: @encapsule/holodev#3482c00e90451aad09732668d0833e152b6e378c
Created: 2022-02-17T16:23:50.000Z // License: MIT
Purpose: library // Environment: Node.js and Browser/HTML5
```

_This package contains arccore.filter wrappers for XMLHttpRequest (browser) and the request module (Node.js server). Provides a mechanism to ensure the runtime fidelity of HTTP GET/POST communication between the client and server. And, between the server and other backend REST service integrations._

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Package Distribution & Use

The `@encapsule/hrequest` runtime library package is included in the `@encapsule/holistic` platform package, and is 
installed and registered in every derived application service project created/maintained the [**appgen**](../../README.md#appgen-cli-tool) command line utility.

From within your application service project, any module that requires access to `@encapsule/hrequest` package API can simpy require/import the module:

```
const hrequest = require("@encapsule/hrequest");
// hrequest is a reference to an object that define the runtime library's API.
// ... your code here
```

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;API Documentation

> [&#9652; Top](#encapsule-project "Scroll to the top of the page...")

**TODO**

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Issues

> [&#9652; Top](#encapsule-project "Scroll to the top of the page...")

Please post bug reports to one of the follow issue queues depending on topic:

- @encapsule/holistic [GitHub Issues](https://github.com/Encapsule/holistic/issues) - Holistic platform RTL + appgen issues.

- @encapsule/arccore [GitHub Issues](https://github.com/Encapsule/ARCcore/issues) - Core data RTL issues.

- @encapsule/arctools [GitHub Issue](https://github.com/Encapsule/ARCtools/issues) - Core data tools and RTL issues.

## ![](ASSETS/encapsule-holistic-24x24.png)&nbsp;Discussion

> [&#9652; Top](#encapsule-project "Scroll to the top of the page...")

Join the [Holistic App Platform Discussion](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Google Group for Holistic App Platform topics...") (Google Group) -- A group for discussion of Holistic App Platform runtime libraries, tools, design patterns, service architecture, and related topics.

> [**&#9666; Holistic App Platform**](../../README.md#encapsule-project "Back to the main Holistic App Platform REAMDE...")

<hr>

[![Encapsule Project](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project")](https://encapsule.io)

Copyright &copy; 2022 [Chris Russell](https://github.com/ChrisRus) Seattle, Washington USA

Published under [MIT](LICENSE) license by [Encapsule Project](https://encapsule.io)

Please follow [@Encapsule](https://twitter.com/encapsule) on Twitter for news and updates.