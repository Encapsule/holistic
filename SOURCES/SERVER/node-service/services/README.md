# SOURCES/SERVER/holism-http-server/services README

This directory contains @encapsule/holism "service plug-ins" that are specialized async filter assemblies that define HTTP request/response processor blocks that can be plugged into @encapsule/holism HTTP server and registered for dispatch upon receipt of HTTP GET/POST requests on specific URI's.

The service plug-ins themselves are defined here in this directory.

The main `SOURCES/SERVER/server.js` script, the entry point for a Viewpath5 app server process, is responsible for instantiating the actual @encapsule/holism HTTP server and providing the service plug-in registrations via configuration options specified here:

`SOURCES/SERVER/holism-http-server/config/service-filters.js`
