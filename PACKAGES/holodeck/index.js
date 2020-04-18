"use strict";

var packageMeta = require("./package.json");

module.exports = {
  __meta: {
    author: packageMeta.author,
    name: packageMeta.name,
    version: packageMeta.version,
    codename: packageMeta.codename,
    build: packageMeta.buildID,
    source: packageMeta.buildSource
  },
  // Holodeck runner is an arccore.filter that accepts a standardized
  // request descriptor object that models a sequence of "vectors"
  // (i.e. descriptor objects) that are dispatched through "harness"
  // filters. The runner filter dispatches each developer-defined
  // "vector" (descriptor object) through an internal arccore.discriminator
  // that the runner initializes using a set of developer-provided
  // holdeck harness filters (described below).
  //
  // The runner ensures correctness and stability of each test
  // run using arccore.filter and arccore.discrminator throughout.
  // Execution of a set of "vectors" through the runner creates
  // JSON log files that capture the details of the runner's evaluation
  // (i.e. execution and response logging) for each developer-defined
  // vector.
  //
  // Typically these JSON-format evaluation logs are commited to git.
  // Fundamentally, if you execute the same set of vectors through code that
  // has not changed, then the induced logs should not differ from those
  // commited. Whereas, if the behavior of the code under test has changed
  // the induced affects of this (even through pathologically-complex logic
  // can be tracked rather easily using git diff and git difftool.
  //
  runnerFilter: require("./lib/holodeck-runner"),
  // Holodeck harness factory is an arccore.filter that constructs
  // a holodeck filter plug-in that is provided as input to holodeck
  // runner.
  //
  // A harness filter plug-in represents a test "scenario". There is
  // actually no restriction whatsoever on what you think a scenario
  // actually is.
  //
  // Inherently, holodeck runner is synchronous. It is not obvious
  // how one would test asynchronous JavaScript code with it. But,
  // the answer is very simple: use @encapsule/holarchy external
  // system actor model to abstract your async test.
  //
  // The external system actor model states that any async operation
  // can be decomposed into three synchronous functions and an
  // external system actor.
  //
  // An external system actor is something that accepts a request
  // via a function call. And, then at some point later calls one
  // of two possible completion functions corresponding to error
  // or result.
  //
  // So just write three harnesses to handle each of the three
  // functional components of any async pattern. And, then call
  // the runner with a vector that initiates the call to the external
  // system (e.g. XMLHttpRequest). And, register completions by
  // again calling the runner with a vector that invokes either
  // of your error or result handlers.
  //
  // See... there's just one model for all async code and for
  // testing all async code that makes sense.
  //
  harnessFactory: require("./lib/holodeck-harness-factory"),
  // v2
  Holodeck: require("./v2/Holodeck"),
  HolodeckHarness: require("./v2/HolodeckHarness"),
  // v2 hack (temporary)
  generateFilterMarkdownString: require("./lib/helpers/helper-generate-filter-markdown-string")
};