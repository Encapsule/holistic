"use strict";

var holarchyConsoleStylesLUT = {
  error: "color: yellow; background-color: red; font-weight: bold; font-size: larger;",
  opc: {
    constructor: {
      prologue: "border-left: 4px solid red; padding-left: 0.5em; background-color: #FFCC99; color: black; font-weight: bold; font-size: larger;",
      body: "border-left: 4px solid red; padding-left: 0.5em; background-color: #FFEEDD; color: black;",
      epilogue: "border-left: 4px solid red; padding-left: 0.5em; background-color: #FFCC99; color: black; font-weight: bold; font-size: larger;"
    },
    act: {
      prologue: "padding-left: 0.5em; background-color: #BBFFCC; color: black; font-weight: bold; font-size: larger;",
      body: "padding-left: 0.5em; background-color: #DDFFEE; color: black;",
      epilogue: "padding-left: 0.5em; background-color: #BBFFCC; color: black; font-weight: bold; font-size: larger;"
    },
    evaluate: {
      prologue: "border-left: 8px solid #0099CC; padding-left: 0.5em; background-color: #BBDDFF; color: black; font-weight: bold; font-size: larger;",
      body: "border-left: 8px solid #0099CC; padding-left: 0.5em; background-color: #DDEEFF; color: black; font-weight: normal;",
      epilogue: "border-left: 8px solid #0099CC; padding-left: 0.5em; background-color: #BBDDFF; color: black; font-weight: bold; font-size: larger;"
    }
  }
};
module.exports = holarchyConsoleStylesLUT;