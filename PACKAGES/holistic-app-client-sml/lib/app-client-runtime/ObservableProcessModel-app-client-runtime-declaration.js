"use strict";

// ObservableProcessModel-app-client-kernel-declaration.js
module.exports = {
  id: "PPL45jw5RDWSMNsB97WIWg",
  name: "Holistic Client App Runtime",
  description: "Encapsulates the lifecycle and management of core holistic client application features on behalf of the derived app.",
  opmDataSpec: {
    ____types: "jsObject",
    ____defaultValue: {},
    "PPL45jw5RDWSMNsB97WIWg": {
      ____types: "jsObject",
      ____defaultValue: {},
      inputs: {
        ____types: "jsObject",
        ____defaultValue: {}
      },
      _private: {
        ____types: "jsObject",
        ____defaultValue: {}
      },
      outputs: {
        ____types: "jsObject",
        ____defaultValue: {}
      }
    }
  },
  steps: {
    uninitialized: {
      description: "Default starting process step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "boot0_start_app_kernel"
      }]
    },
    boot0_start_app_kernel: {
      description: "Start core client app kernel subsystems.",
      actions: {
        enter: []
      },
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "boot1_query_derived_app_config"
      }]
    },
    boot1_query_derived_app_config: {
      description: "Query the derived client app for information required to initialize the core client app runtime.",
      actions: {
        enter: []
      },
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "boot2_wait_kernel_start"
      }]
    },
    boot2_wait_kernel_start: {
      description: "Wait for the core client app kernel subsystems to become available.",
      transitions: []
    },
    boot3_configure_derived_app: {
      description: "Configure the derived application runtime.",
      actions: {
        enter: []
      },
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "boot4_wait_app_resources"
      }]
    },
    boot4_wait_app_resources: {
      description: "Wait for the browser to finish loading the HTML document and its referenced external resources (scripts, CSS, images, fonts, JSON, ...",
      transitions: [{
        transitionIf: {},
        nextStep: "boot5_deserialize_suspended_app"
      }]
    },
    boot5_deserialize_suspended_app: {
      description: "Access the boot ROM embedded in the hosting HTML document to get the suspended process state of the derived application.",
      actions: {
        enter: []
      },
      transitions: []
    },
    boot6_resume_suspended_app: {
      description: "Restore the derived application's process state and resume the application process.",
      actions: {
        enter: []
      },
      transitions: []
    },
    boot7_wait_app_client: {
      description: "Wait for the derived application to resume and signal back that its subsystems are ready to accept input from external actors.",
      transitions: []
    },
    runtime0_app_client_running: {
      description: "Derived application runtime is online and ready to respond to external actors.",
      transitions: []
    },
    error_process_boot_failure: {
      description: "Client application process boot failed due to unrecoverable error(s)."
    },
    error_process_resume_failure: {
      description: "Client application process resume failured due to unrecoverable error(s)."
    },
    error_process_runtime_failure: {
      description: "Client application process crashed at runtime due to unexpected and unrecoverable error(s)."
    }
  }
};