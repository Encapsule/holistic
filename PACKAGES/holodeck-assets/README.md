[![Encapsule Project](https://encapsule.io/images/blue-burst-encapsule.io-icon-72x72.png "Encapsule Project")](https://encapsule.io)

### Encapsule Project

# @encapsule/holodeck-assets v0.0.31 "portalice"

```
Package: @encapsule/holodeck-assets v0.0.31 "portalice" build ID "6kWEF-LsRwWuMH_vrySWjw"
Sources: Encapsule/holistic#042d84a4051b88c83b3473e5ed4d3d114facda9a
Purpose: library (Node.js)
Created: 2020-01-10T02:51:15.000Z
License: MIT
```

# Summary

Holdeck assets bundles reusable test harnesses, and test vectors useful for testing apps and services derviced from @encapsule/holistic platform RTL's.

## Usage

This package's contained library functionality is intended for use in derived projects.

For example:

1. Create simple test project, declare a dependency and install `@encapsule/holodeck-assets` package:

```
$ mkdir testProject && cd testProject
$ yarn init
$ yarn add @encapsule/holodeck-assets --dev
```

2. Create a simple script `index.js`:

```JavaScript
const holodeck-assets = require('@encapsule/holodeck-assets');
console.log(JSON.stringify(holodeck-assets.__meta));
/* ... your derived code here ... */
```

## Documentation

## Distribution

The `@encapsule/holodeck-assets` library package is published on [npmjs](https://npmjs.com).

- [@encapsule/holodeck-assets Package Distribution](https://npmjs.com/package/@encapsule/holodeck-assets/v/0.0.31) ([@encapsule on npmjs.com](https://www.npmjs.com/org/encapsule))
- [Encapsule/holodeck-assets git Repository](https://github.com/Encapsule/holodeck-assets) ([GitHub](https://github.com/Encapsule))

<hr>

Published under [MIT](LICENSE) license by [Encapsule Project](https://encapsule.io) Seattle, Washington

Copyright &copy; 2020 [Christopher D. Russell](https://github.com/ChrisRus)