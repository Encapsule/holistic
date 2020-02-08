"use strict";

var holarchyConsoleStylesLUT = {
  error: "color: yellow; background-color: red; font-weight: bold; font-size: larger;",
  opc: {
    constructor: {
      prologue: "border-left: 4px solid #FFCC00; padding-left: 0.5em; background-color: #FFEEDD; color: black; font-weight: bold; font-size: smallest;",
      body: "border-left: 4px solid #FFCC00; padding-left: 0.5em; background-color: #FFEEDD; color: black; font-size: smallest;",
      epilogue: "border-left: 4px solid #FFCC00; padding-left: 0.5em; background-color: #FFEEDD; color: black; font-weight: bold; font-size: smallest;"
    },
    act: {
      prologue: "padding-left: 0.5em; background-color: #DDFFEE; color: black; font-weight: bold; font-size: smallest;",
      body: "padding-left: 0.5em; background-color: #DDFFEE; color: black; font-size: smallest;",
      epilogue: "padding-left: 0.5em; background-color: #DDFFEE; color: black; font-weight: bold; font-size: smallest;"
    },
    evaluate: {
      prologue: "border-left: 8px solid #0099CC; padding-left: 0.5em; background-color: #DDEEFF; color: black; font-weight: bold; font-size-smallest;",
      body: "border-left: 8px solid #0099CC; padding-left: 0.5em; background-color: #DDEEFF; color: black; font-weight: normal; font-size: smallest;",
      epilogue: "border-left: 8px solid #0099CC; padding-left: 0.5em; background-color: #DDEEFF; color: black; font-weight: bold; font-size: smallest;"
    }
  }
};
module.exports = holarchyConsoleStylesLUT;