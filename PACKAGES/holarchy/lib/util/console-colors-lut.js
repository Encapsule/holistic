"use strict";

var holarchyConsoleStylesLUT = {
  error: "color: yellow; background-color: red; font-weight: bold; font-size: larger;",
  opc: {
    constructor: {
      prologue: "border-left: 8px solid #AAFF99; border-top: 6px solid #99EE88; padding: 0.25em; padding-left: 0.5em; background-color: #CCFFCC; color: #000000; font-weight: bold; font-size: largest;",
      body: "border-left: 8px solid #AAFF99; padding-left: 0.5em; background-color: #EEFFDD; color: #000000;",
      epilogue: "border-left: 8px solid #AAFF99; border-bottom: 6px solid #99EE88; padding: 0.25em; padding-left: 0.5em; background-color: #CCFFCC; color: #000000; font-weight: bold; font-size: largest;"
    },
    act: {
      borderColor: "#BBEEFF",
      borderTopColor: "#AADDEE",
      borderBottomColor: "#AADDEE",
      prologue: "padding-left: 0.5em; background-color: #D7F0F7; color: #000000; font-weight: bold; font-size: smallest;",
      body: "padding-left: 0.5em; background-color: #E0F7FF; color: #000000; font-size: smallest;",
      epilogue: "padding-left: 0.5em; background-color: #D7F0F7; color: #000000; font-weight: bold; font-size: smallest;"
    },
    evaluate: {
      prologue: "margin-left: 12px; border-left: 8px solid #99FFCC; border-top: 6px solid #88EEBB; padding-left: 0.5em; background-color: #DDFFEE; color: #000033; font-weight: bold; font-size-smallest;",
      body: "margin-left: 12px; border-left: 8px solid #99FFCC; padding-left: 0.5em; background-color: #CCFFDD; color: #000033; font-weight: normal; font-size: smallest;",
      epilogue: "margin-left: 12px; border-left: 8px solid #99FFCC; border-bottom: 6px solid #88EEBB; padding-left: 0.5em; background-color: #DDFFEE; color: #000033; font-weight: bold; font-size: smallest;"
    }
  }
};
module.exports = holarchyConsoleStylesLUT;