"use strict";

var holarchyConsoleStylesLUT = {
  error: "color: yellow; background-color: red; font-weight: bold; font-size: larger;",
  opc: {
    constructor: {
      prologue: "border-left: 6px solid #FF6600; border-top: 6px solid #FFCC00; padding: 0.25em; padding-left: 0.5em; background-color: #FF9900; color: #330000; font-weight: bold;",
      body: "border-left: 6px solid #FF6600; padding-left: 0.5em; background-color: #FFCC99; color: #330000;",
      epilogue: "border-left: 6px solid #FF6600; border-bottom: 6px solid #FFCC00; padding: 0.25em; padding-left: 0.5em; background-color: #FF9900; color: #330000; font-weight: bold;"
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
      prologue: "margin-left: 12px; border-left: 6px solid #0033CC; border-top: 6px solid #0099FF; padding-left: 0.5em; background-color: #99CCFF; color: #000033; font-weight: bold; font-size-smallest;",
      body: "margin-left: 12px; border-left: 6px solid #0033CC; padding-left: 0.5em; background-color: #DDEEFF; color: #000033; font-weight: normal; font-size: smallest;",
      epilogue: "margin-left: 12px; border-left: 6px solid #0033CC; border-bottom: 6px solid #0099FF; padding-left: 0.5em; background-color: #99CCFF; color: #000033; font-weight: bold; font-size: smallest;"
    }
  }
};
module.exports = holarchyConsoleStylesLUT;