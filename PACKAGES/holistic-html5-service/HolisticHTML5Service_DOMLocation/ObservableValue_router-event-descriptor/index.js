"use strict";

(function () {
  var arccore = require("@encapsule/arccore");

  var holarchyCM = require("@encapsule/holarchy-cm");

  var routerEventDescriptorSpec = require("../lib/iospecs/router-event-descriptor-spec");

  var routerEventDescriptor_ObservableValueCMID = arccore.identifier.irut.fromReference("HolisticHTML5Service_DOMLocation.ObservableValue.CellModel.routerEventDescriptor").result;
  var routerEventDescriptor_ObservableValueAPMID = arccore.identifier.irut.fromReference("HolisticHTML5Service_DOMLocation.ObservableValue.AbstractProcessModel.routerEventDescriptor").result;
  var factoryResponse = holarchyCM.factories.makeObservableValueCellModel.request({
    cellID: routerEventDescriptor_ObservableValueCMID,
    apmID: routerEventDescriptor_ObservableValueAPMID,
    valueTypeLabel: routerEventDescriptorSpec.____label,
    valueTypeDescription: routerEventDescriptorSpec.____description,
    valueTypeSpec: routerEventDescriptorSpec
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  var observableValueCellModel = factoryResponse.result;
  var routerEventDescriptor_ValueObserverCMID = arccore.identifier.irut.fromReference("HolisticHTML5Service_DOMLocation.ValueObserver.CellModel.routerEventDescriptor").result;
  var routerEventDescriptor_ValueObserverAPMID = arccore.identifier.irut.fromReference("HolisticHTML5Service_DOMLocation.ValueObserver.AbstractProcessModel.routerEventDescriptor").result;
  factoryResponse = holarchyCM.factories.makeValueObserverWorkerCellModel.request({
    cellID: routerEventDescriptor_ValueObserverCMID,
    apmID: routerEventDescriptor_ValueObserverAPMID,
    valueTypeLabel: routerEventDescriptorSpec.____label,
    valueTypeDescription: routerEventDescriptorSpec.____description,
    valueTypeSpec: routerEventDescriptorSpec
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  var valueObserverWorkerCellModel = factoryResponse.result;
  module.exports = {
    cellmodels: [observableValueCellModel, valueObserverWorkerCellModel]
  };
})();