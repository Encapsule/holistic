"use strict";

var holarchyConsoleStylesLUT = {
  error: "color: yellow; background-color: red; font-weight: bold; font-size: larger;",
  opc: {
    constructor: {
      prologue: "border-left: 4px solid red; padding-left: 0.5em; background-color: #FFCC00; color: black; font-weight: bold;",
      body: "border-left: 4px solid red; padding-left: 0.5em; background-color: #FFCC99; color: black; font-size: smaller;",
      epilogue: "border-left: 4px solid red; padding-left: 0.5em; background-color: #FFCC00; color: black; font-weight: bold;"
    },
    act: {
      prologue: "padding-left: 0.5em; background-color: #FFFF00; color: black; font-weight: bold;",
      body: "padding-left: 0.5em; background-color: #FFFFCC; color: black; font-size: smaller;",
      epilogue: "padding-left: 0.5em; background-color: #FFFF00; color: black; font-weight: bold;"
    },
    evaluate: {
      prologue: "border-left: 8px solid #00CCCC; padding-left: 0.5em; background-color: #00FFFF; color: black; font-weight: bold;",
      body: "border-left: 8px solid #00CCCC; padding-left: 0.5em; background-color: #CCFFFF; color: black; font-weight: normal; font-size: smaller;",
      epilogue: "border-left: 8px solid #00CCCC; padding-left: 0.5em; background-color: #00FFFF; color: black; font-weight: bold;"
    }
  }
};
module.exports = holarchyConsoleStylesLUT;