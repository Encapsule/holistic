"use strict";

// test.js
var themeTransformFilter = require("./theme-transform-filter");

var response = themeTransformFilter.request();
console.log("================================================================");
console.log("RESULT =");
console.log(JSON.stringify(response.result, undefined, 2));
console.log("================================================================");
console.log("ERROR = " + response.error);
console.log("================================================================");