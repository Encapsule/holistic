"use strict";

// ControllerAction-react-render-client-view.js
var React = require("react");

var ReactDOM = require("react-dom"); // Get the DOM element selector of the DIV whose contents will be replaced/updated
// by client-side React render requests.


var targetDomElement = document.getElementById("idViewpath5Client"); // See: https://reactjs.org/docs/react-dom.html#render

appStateContext.renderPageContent = function () {
  var DataRoutableComponent = React.createElement(appStateContext.ComponentRouter, reactDataContext);
  ReactDOM.render(DataRoutableComponent, targetDomElement);
};