"use strict";

var holarchyConsoleStylesLUT = {
  error: "color: yellow; background-color: red; font-weight: bold; font-size: larger;",
  opc: {
    constructor: {
      prologue: "border-left: 8px solid #FFCC00; border-top: 4px solid #FF9900; padding: 0.25em; padding-left: 0.5em; background-color: #FFFFCC; color: #000000; font-weight: bold; font-size: largest;",
      body: "border-left: 8px solid #FFCC00; padding-left: 0.5em; background-color: #FFFFCC; color: #000000;",
      epilogue: "border-left: 8px solid #FFCC00; border-bottom: 4px solid #FF9900; padding: 0.25em; padding-left: 0.5em; background-color: #FFFFCC; color: #000000; font-weight: bold; font-size: largest;"
    },
    act: {
      borderColor: "#99FFCC",
      borderTopColor: "#66CC99",
      borderBottomColor: "#66CC99",
      prologue: "padding-left: 0.5em; background-color: #DDFFEE; color: #000000; font-weight: bold; font-size: smallest;",
      body: "padding-left: 0.5em; background-color: #DDFFEE; color: #000000; font-size: smallest;",
      epilogue: "padding-left: 0.5em; background-color: #DDFFEE; color: #000000; font-weight: bold; font-size: smallest;"
    },
    evaluate: {
      prologue: "margin-left: 12px; border-left: 8px solid #99CCFF; border-top: 4px solid #6699CC; padding-left: 0.5em; background-color: #DDEEFF; color: #000033; font-weight: bold; font-size-smallest;",
      body: "margin-left: 12px; border-left: 8px solid #99CCFF; padding-left: 0.5em; background-color: #CCDDFF; color: #000033; font-weight: normal; font-size: smallest;",
      epilogue: "margin-left: 12px; border-left: 8px solid #99CCFF; border-bottom: 4px solid #6699CC; padding-left: 0.5em; background-color: #DDEEFF; color: #000033; font-weight: bold; font-size: smallest;"
    }
  }
};
module.exports = holarchyConsoleStylesLUT;