[![Encapsule Project](https://encapsule.io/images/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project")](https://encapsule.io)

### Encapsule Project

# @encapsule/holodeck v0.0.31 "portalice"

```
Package: @encapsule/holodeck v0.0.31 "portalice" build ID "Hbzc16vTRfmwof_xcWBVCw"
Sources: Encapsule/holistic#20f87e612d306e57e402d8b1f8a15eb187c1367d
Purpose: library (Node.js)
Created: 2020-01-10T05:35:19.000Z
License: MIT
```

# Summary

Holdeck is a synchronous test runner and test harness system used to test @encapsule/holistic RTL's and derived apps and services.

## Usage

This package's contained library functionality is intended for use in derived projects.

For example:

1. Create simple test project, declare a dependency and install `@encapsule/holodeck` package:

```
$ mkdir testProject && cd testProject
$ yarn init
$ yarn add @encapsule/holodeck --dev
```

2. Create a simple script `index.js`:

```JavaScript
const holodeck = require('@encapsule/holodeck');
console.log(JSON.stringify(holodeck.__meta));
/* ... your derived code here ... */
```

## Documentation

## Distribution

The `@encapsule/holodeck` library package is published on [npmjs](https://npmjs.com).

- [@encapsule/holodeck Package Distribution](https://npmjs.com/package/@encapsule/holodeck/v/0.0.31) ([@encapsule on npmjs.com](https://www.npmjs.com/org/encapsule))
- [Encapsule/holodeck git Repository](https://github.com/Encapsule/holodeck) ([GitHub](https://github.com/Encapsule))

<hr>

Published under [MIT](LICENSE) license by [Encapsule Project](https://encapsule.io) Seattle, Washington

Copyright &copy; 2020 [Christopher D. Russell](https://github.com/ChrisRus)