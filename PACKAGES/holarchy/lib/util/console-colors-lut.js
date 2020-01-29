"use strict";

module.exports = {
  error: "color: yellow; background-color: red; font-weight: bold;",
  opc: {
    constructor: {
      entry: "color: blue; background-color: white; font-weight: bold; font-size: smaller;",
      success: "color: black; background-color: #99CCFF; font-weight: bold; font-size: smaller;"
    },
    act: {
      entry: "color: blue; background-color: white; font-weight: bold; font-size: smaller;",
      levelN: "color: #000000; background-color: #88CCFF; font-weight: bold; font-size: smaller;",
      success: "color: #000000; background-color: #FFCC66; font-weight: bold; font-size: smaller;"
    },
    evaluate: {
      entry: "color: blue; background-color: white; font-weight: bold; font-size: smaller;",
      entryDetails: "color: #999999; background-color: white; font-weight: normal; font-size: smaller; font-style: italic; padding-left: 1em;",
      transition: "color: #000000; background-color: #CCCCFF; font-weight: normal; font-size: smaller;",
      success: "color: blue; background-color: white; font-weight: bold; font-size: smaller;"
    }
  }
};