"use strict";

var holarchyConsoleStylesLUT = {
  error: "color: yellow; background-color: red; font-weight: bold; font-size: larger;",
  opc: {
    constructor: {
      prologue: "border-left: 2px solid #CCFFCC; border-top: 2px solid #CCFFCC; padding: 0.25em; padding-left: 0.5em; background-color: #DDFFDD; color: #000000; font-weight: bold; font-size: largest;",
      body: "border-left: 2px solid #CCFFCC; padding-left: 0.5em; background-color: #EEFFEE; color: #000000;",
      epilogue: "border-left: 2px solid #CCFFCC; border-bottom: 2px solid #CCFFCC; padding: 0.25em; padding-left: 0.5em; background-color: #DDFFDD; color: #000000; font-weight: bold; font-size: largest;"
    },
    act: {
      borderColor: "#FFFFDD",
      borderTopColor: "#FFFFDD",
      borderBottomColor: "#FFFFDD",
      prologue: "padding-left: 0.5em; background-color: #FFFFCC; color: #000000; font-weight: bold; font-size: smallest;",
      body: "padding-left: 0.5em; background-color: #FFFFEE; color: #000000; font-size: smallest;",
      epilogue: "padding-left: 0.5em; background-color: #FFFFCC; color: #000000; font-weight: bold; font-size: smallest;"
    },
    evaluate: {
      prologue: "margin-left: 12px; border-left: 2px solid #99CCFF; border-top: 2px solid #99CCFF; padding-left: 0.5em; background-color: #CCDDEE; color: #000033; font-weight: bold; font-size-smallest;",
      body: "margin-left: 12px; border-left: 2px solid #99CCFF; padding-left: 0.5em; background-color: #DDEEFF; color: #000033; font-weight: normal; font-size: smallest;",
      epilogue: "margin-left: 12px; border-left: 2px solid #99CCFF; border-bottom: 2px solid #D7E7F7; padding-left: 0.5em; background-color: #CCDDEE; color: #000033; font-weight: bold; font-size: smallest;"
    }
  }
};
module.exports = holarchyConsoleStylesLUT;