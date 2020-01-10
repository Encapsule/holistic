"use strict";

// sources/common/view/elements/component/RUXBase_PageContent_Spinner.jsx
//
var React = require('react');

var reactComponentBindingFilterFactory = require('../binding-factory');

var spinnerPackage = require('spin.js');

var factoryResponse = reactComponentBindingFilterFactory.create({
  id: "-7xYSFhjTWuyOSqiVZsfsw",
  name: "RUXBase_PageContent_Spinner",
  description: "<RUXBase_PageContent_Spinner/> React component data binding filter.",
  renderDataBindingSpec: {
    ____types: "jsObject",
    RUXBase_PageContent_Spinner: {
      ____types: "jsObject",
      spinnerOptions: {
        ____types: "jsObject",
        // see spinner docs http://spin.js.org/
        ____defaultValue: {},
        color: {
          ____accept: "jsString",
          ____defaultValue: "#6AF"
        },
        corners: {
          ____accept: "jsNumber",
          ____defaultValue: 0.25
        },
        direction: {
          ____accept: "jsNumber",
          ____inValueSet: [-1, 1],
          ____defaultValue: 1
        },
        fps: {
          ____accept: "jsNumber",
          ____defaultValue: 30
        },
        left: {
          ____accept: "jsString",
          ____defaultValue: "50%"
        },
        length: {
          ____accept: "jsNumber",
          ____defaultValue: 0
        },
        lines: {
          ____accept: "jsNumber",
          ____defaultValue: 6
        },
        opacity: {
          ____accept: "jsNumber",
          ____defaultValue: 0.2
        },
        posisition: {
          ____accept: "jsString",
          ____defaultValue: "absolute"
        },
        radius: {
          ____accept: "jsNumber",
          ____defaultValue: 2
        },
        rotate: {
          ____accept: "jsNumber",
          ____defaultValue: 0.0
        },
        scale: {
          ____accept: "jsNumber",
          ____defaultValue: 1
        },
        shadow: {
          ____accept: "jsBoolean",
          ____defaultValue: false
        },
        speed: {
          ____accept: "jsNumber",
          ____defaultValue: 0.25
        },
        top: {
          ____accept: "jsString",
          ____defaultValue: "50%"
        },
        trail: {
          ____accept: "jsNumber",
          ____defaultValue: 33
        },
        width: {
          ____accept: "jsNumber",
          ____defaultValue: 32
        },
        zIndex: {
          ____accept: "jsNumber",
          ____defaultValue: 0
        }
      },
      viewOptions: {
        ____types: "jsObject",
        ____defaultValue: {},
        containerStyles: {
          ____accept: 'jsObject',
          ____description: "React styles object",
          ____defaultValue: {}
        }
      }
    }
  },
  reactComponent: React.createClass({
    displayName: "RUXBase_PageContent_Spinner",
    targetElement: null,
    spinnerInstance: null,
    componentDidMount: function componentDidMount() {
      var renderData = this.props.renderData.RUXBase_PageContent_Spinner;
      console.log("Starting <Spinner/> with options '" + JSON.stringify(renderData.spinnerOptions) + "'");
      this.spinnerInstance = new spinnerPackage.Spinner(renderData.spinnerOptions);
      this.spinnerInstance.spin(this.targetElement);
    },
    componentWillUnmount: function componentWillUnmount() {
      this.spinnerInstance.stop();
    },
    render: function render() {
      var self = this;
      return React.createElement("div", {
        ref: function ref(input) {
          self.targetElement = input;
        },
        style: this.props.renderData.RUXBase_PageContent_Spinner.viewOptions.containerStyles
      });
    }
  })
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;