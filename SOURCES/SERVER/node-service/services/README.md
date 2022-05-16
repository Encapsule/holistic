# SOURCES/SERVER/node-service/services/README.md

This directory contains @encapsule/holism "service plug-ins" that encapsulate developer-defiend HTTP request/response result/error processing as a set of @encapsule/arccore.filter instances.

The service plug-ins themselves are defined here in this directory.

The main `SOURCES/SERVER/server.js` script is the entry point for a runtime instance of HolisticNodeService process.

It is responsible for instantiating the actual @encapsule/holism HTTP server and providing the service plug-in registrations via configuration options specified here:

`SOURCES/SERVER/holism-http-server/config/service-filters.js`
