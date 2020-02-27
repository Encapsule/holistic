"use strict";

var holarchyConsoleStylesLUT = {
  error: "color: yellow; background-color: red; font-weight: bold; font-size: larger;",
  opc: {
    constructor: {
      prologue: "border-left: 2px solid #FF6600; border-top: 2px solid #FFCC00; padding: 0.25em; padding-left: 0.5em; background-color: #FFFFAA; color: #330000; font-weight: bold; font-size: largest;",
      body: "border-left: 2px solid #FF6600; padding-left: 0.5em; background-color: #FFFFCC; color: #000000;",
      epilogue: "border-left: 2px solid #FF6600; border-bottom: 2px solid #FFCC00; padding: 0.25em; padding-left: 0.5em; background-color: #FFFFAA; color: #330000; font-weight: bold; font-size: largest;"
    },
    act: {
      borderColor: "#009900",
      borderTopColor: "#00FF00",
      borderBottomColor: "#00FF00",
      prologue: "padding-left: 0.5em; background-color: #99FF99; color: #003300; font-weight: bold; font-size: smallest;",
      body: "padding-left: 0.5em; background-color: #CCFFCC; color: #003300; font-size: smallest;",
      epilogue: "padding-left: 0.5em; background-color: #99FF99; color: #003300; font-weight: bold; font-size: smallest;"
    },
    evaluate: {
      prologue: "margin-left: 12px; border-left: 2px solid #0033CC; border-top: 2px solid #0099FF; padding-left: 0.5em; background-color: #99CCFF; color: #000033; font-weight: bold; font-size-smallest;",
      body: "margin-left: 12px; border-left: 2px solid #0033CC; padding-left: 0.5em; background-color: #DDEEFF; color: #000033; font-weight: normal; font-size: smallest;",
      epilogue: "margin-left: 12px; border-left: 2px solid #0033CC; border-bottom: 2px solid #0099FF; padding-left: 0.5em; background-color: #99CCFF; color: #000033; font-weight: bold; font-size: smallest;"
    }
  }
};
module.exports = holarchyConsoleStylesLUT;