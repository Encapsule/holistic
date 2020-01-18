# [![](ASSETS/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project Homepage")](https://encapsule.io) Encapsule Project

**[ [Homepage](https://encapsule.io "Encapsule Project Homepage...") ] [ [GitHub](https://github.com/Encapsule "Encapsule Project GitHub...") ] [ [Twitter](https://twitter.com/Encapsule "Encapsule Project Twitter...") ] [ [Discussion](https://groups.google.com/a/encapsule.io/forum/#!forum/holistic-app-platform-discussion-group "Holistic app platform discussion group...") ]**

# ![](ASSETS/encapsule-holistic-48x48.png) @encapsule/d2r2 v0.0.33 quatsino

```
Package: @encapsule/d2r2 v0.0.33 "quatsino" build ID "GetLGRUWSfijQYMxC2VI-Q"
Sources: Encapsule/holistic-master#6d676cdd0a4ea248d1fbc3752e8f4c760020a3cb
Purpose: library (Node.js)
Created: 2020-01-18T02:56:04.000Z
License: MIT
```

## ![](ASSETS/encapsule-holistic-32x32.png) Description

Data-Driven React Render (d2r2) allows you to map JSON data types to React components and affect layout via JSON document composition dynamically at runtime w/type safety.

## ![](ASSETS/encapsule-holistic-32x32.png) Distribution

This package is an unpublished _pseudo-package_ that is included in the @encapsule/holistic v0.0.33 quatsino package for distribution via the `appgen` utility.

If you are viewing this README.md in the `./PACKAGES` subdirectory of the @encapsule/holistic package then you're looking at the source package that `appgen` will copy into your designated derived app/service git repo's `./HOLISTIC` directory.

If you are viewing this README.md in the `./HOLISTIC` subdirectory of your derived app/service repository then you're looking at the package that has been registered by _directory path_ (not package registry) in your derived app/service repo's `package.json` for the module require/import namespace `@encapsule/d2r2`.

## ![](ASSETS/encapsule-holistic-32x32.png) Usage

In the context of your derived app/service repo, `appgen` will install and register `@encapsule/d2r2` by _directory path_ in your `package.json`.

@encapsule/d2r2 can then be imported/required into any module in your project as follows:

Example script, `d2r2-example.js`:

```JavaScript
const d2r2 = require('@encapsule/d2r2');
console.log(JSON.stringify(d2r2.__meta));
/* ... your derived code here ... */
```

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