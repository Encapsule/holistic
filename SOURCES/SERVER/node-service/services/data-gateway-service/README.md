# SOURCES/SERVER/holism-http-server/services/data-gateway-service/README.md

Data gateway is a re-usable service plug-in available from the @encapsule/holism package. We register this shared plug-in on the `POST:/data` URI route and configure it do dispatch to 1:N sub-service plug-ins based the signature of the JSON document contained in the POST request body.

Here we construct the actual message discriminating router object that routes requests to specific Viewpath5 service plug-ins (based on request JSON signature).

And, this is passed to the shared data gateway service-plug registered in `SOURCE/SERVER/holism-http-server/config/service-filters.js`


## Org Projects Report
```javascript
const gatewayRequest = {
    userAgent: {version: appBuild.app.version, buildID: appBuild.app.buildID},
    readOrgProjectsReport: {},
}

const readOrgProjectsReport = {
    readOrgProjectsReport: {
        appErrors: {appErrors: []},
        report: {
            projectSummaries: {AAA0vCvWRZ2O6vdb7ray0Q: {}},
            projects: ["AAA0vCvWRZ2O6vdb7ray0Q"],
            taskSummaries: {dft0vCvWRZ2O6vwxpray0Q: {}, SQA047bWRZ2O6vwxpray0Q: {}},
            tasks: ["dft0vCvWRZ2O6vwxpray0Q", "SQA047bWRZ2O6vwxpray0Q"]
        },
        serverVersion: {version: "0.5.02", buildID: "qoZMrQkrQNW4HOgRdQActA"}
    }
}
```

## Org Summary Report
```javascript
const gatewayRequest = {
    userAgent: {version: appBuild.app.version, buildID: appBuild.app.buildID},
    readOrgSummaryReport: {},
}

const readOrgSummaryReport = {
    appErrors: {appErrors: []},
    report: {
        name: "Default Test Org",
        description: "",
        memberEmails: ["someone@viewpath.com", "anotherone@viewpath.com"],
        memberIds: ["TBMhY1BqTg-sXwLmJB57Pg", "TwuR6jceSrWzrwqhegkOmQ", "V_RlCoreSVSIjNE5F6pPJA", "mSrkQlNqQZinlRtq2EVUAA"],
        memberSummaries: {
            "TBMhY1BqTg-sXwLmJB57Pg": {userGivenName: "given name", userFamilyName: "first name", userPhotoUrl: "https://img.png", userEmailAddress: "someone@viewpath.com", viewpathUserId: "TBMhY1BqTg-sXwLmJB57Pg"},
            TwuR6jceSrWzrwqhegkOmQ: {},
            V_RlCoreSVSIjNE5F6pPJA: {},
            mSrkQlNqQZinlRtq2EVUAA: {},
        }
    },
    serverVersion: {version: "0.5.02", buildID: "kjSvtWkOQbuoV7CM2LpVuA"}
}
```

## Org Project Definitions
```javascript
const gatewayRequest = {
    userAgent: {version: appBuild.app.version, buildID: appBuild.app.buildID},
    readOrgProjectDefinitions: {projects: ["AAA0vCvWRZ2O6vdb7ray0Q"]}
}

const readOrgProjectDefinitions = {
    appErrors: {appErrors: []},
    projects: [
        {
            pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica: {
                replicaVDID: "Tnyp5J8yRPOspuGc6srVwA",
                replicaVersion: 1,
                definition: {
                    YXLAvU1ZSlmO4rGgETOxFQ_OrgProject: {
                        description: null,
                        id: "AAA0vCvWRZ2O6vdb7ray0Q",
                        name: "Test Project",
                        taskOrders: [],
                        tasks: [{}, {}]
                    }
                }
            }
        }
    ]
    
    serverVersion: {version: "0.5.02", buildID: "ucXoSPpzQbyzTa1AuNpwYA"}
}
```

## Org Resource Definitions
```javascript
const gatewayRequest = {
    userAgent: {version: appBuild.app.version, buildID: appBuild.app.buildID},
    readOrgResourceDefinitions: {}
}

const readOrgResourceDefinitions = {
    appErrors: {appErrors: []},
    orgResource: [
        {
            pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica: {
                replicaVDID: "3MHsvDazQeqWHaBL4wR7Xw",
                replicaVersion: 1,
                definition: {
                    mr9u4VeBR5KoVIATgnsMJA_OrgResource: {
                        id: "2_uv8XhVhF7xJKVjbSRXxw",
                        resources: {
                            "resourceID_iruts": {
                                id: "resourceID_iruts",
                                name: "resource name",
                                description: "",
                                tags: [],
                                type: "equipment" // or person
                            }
                        }
                    }
                }
            }
        }
    ],
    serverVersion: {version: "0.5.02", buildID: "vjpUsVkzSiOPj6OCkMkMIg"}
}
```

## Org Resource Reservations
```javascript
const gatewayRequest = {
    userAgent: {version: appBuild.app.version, buildID: appBuild.app.buildID},
    readOrgResourceReservations: {}
}

const readOrgResourceReservations = {
    appErrors: {appErrors: []},
    orgResourceReservations: [
        {
            pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica: {
                replicaVDID: "3MHsvDazQeqWHaBL4wR7Xw",
                replicaVersion: 1,
                definition: {
                    RmiuIiW9Ssak7v9J7ZzaeA_OrgResourceReservations: {
                        //TBD
                    }
                }
            }
        }
    ],
    serverVersion: {version: "0.5.02", buildID: "vjpUsVkzSiOPj6OCkMkMIg"}
}
```

## Org Profile Definition
```javascript
const gatewayRequest = {
    userAgent: {version: appBuild.app.version, buildID: appBuild.app.buildID},
    readOrgProfileDefinition: {},
}
const readOrgProfileDefinition = {
    appErrors: {appErrors: []},
    orgProfile: [
        {
            pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica: {
                replicaVersion: 10, 
                replicaVDID: "pbIvPunYRu2bcDbxeuHR4w", 
                definition: {
                    R6DTqieiQ8Wr5wo9tI0lJA_OrgProfile: {
                        id: "aGCrbwXXR3Ck9QZBXNwEAw",
                        members: ["someone@viewpath.com"],
                        name: "Default Test Org"
                    }
                }
            }
        }
    ],
    serverVersion: {version: "0.5.02", buildID: "0wb9zM-nRg2R9F5QuJduHA"}
}
```

## Definition Update

### create new definition (project)
```javascript
const gatewayRequest = {
    userAgent: {version: appBuild.app.version, buildID: appBuild.app.buildID},
    writeOrgDataUpdates: {
        orgProjectDefinitionUpdates: [
            {
                SQA0vCvWRZ2O6vwxpray0Q_AppDefinitionUpdate: {
                    operation: "create",
                    updateDescriptor: {
                        definition: {
                            YXLAvU1ZSlmO4rGgETOxFQ_OrgProject: {
                                description: "Mock Project",
                                id: "AfQ4oD_RSPSAq0AtuHPEFQ",
                                name: "Cell Process Test Project",
                                taskOrders: [],
                                tasks: [],
                            }
                        }
                    }
                }   
            }
        ]
    }
}

const definitionCreateResponse = {
    appErrors: {appErrors: []},
    writeOrgDataResponses: {
        orgProfileDefinitionUpdateResponse: null,
        orgProfileMembersMapDefinitionUpdateResponse: null,
        orgProjectDefinitionUpdatesResponse: [
            {
                pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica: {
                    replicaVDID: "NU6LfX5IRJ-MBcszDbWNAQ",
                    replicaVersion: 1,
                    definition: {
                        YXLAvU1ZSlmO4rGgETOxFQ_OrgProject: {}
                    }
                }
            }
        ],
        orgResourceDefinitionUpdateResponse: null,
        orgResourceReservationsDefinitionUpdateResponse: null
    },
    serverVersion: {version: "0.5.02", buildID: "ucXoSPpzQbyzTa1AuNpwYA"}
}
```

### update definition (project)
```javascript
const gatewayRequest = {
    userAgent: {version: appBuild.app.version, buildID: appBuild.app.buildID},
    writeOrgDataUpdates: {
        orgProjectDefinitionUpdates: [
            {
                SQA0vCvWRZ2O6vwxpray0Q_AppDefinitionUpdate: {
                    operation: "update",
                    baselineDescriptor: {
                        replicaVDID: "NU6LfX5IRJ-MBcszDbWNAQ"
                    },
                    updateDescriptor: {
                        definition: {
                            YXLAvU1ZSlmO4rGgETOxFQ_OrgProject: {
                                description: "Mock Project with description update",
                                id: "AfQ4oD_RSPSAq0AtuHPEFQ",
                                name: "Cell Process Test Project",
                                taskOrders: [],
                                tasks: [],
                            }
                        }
                    }
                }   
            }
        ]
    }
}

const definitionUpdateResponse = {
    appErrors: {appErrors: []},
    writeOrgDataResponses: {
        orgProfileDefinitionUpdateResponse: null,
        orgProfileMembersMapDefinitionUpdateResponse: null,
        orgProjectDefinitionUpdatesResponse: [
            {
                pAxNjBfRR1OOsaEoloBhbQ_AppDefinitionReplica: {
                    replicaVDID: "FsUyDmvZRVmcCGRRc0zLww"
                    replicaVersion: 2
                    definition: {
                        YXLAvU1ZSlmO4rGgETOxFQ_OrgProject: {...}
                    }
                }
            }
        ],
        orgResourceDefinitionUpdateResponse: null,
        orgResourceReservationsDefinitionUpdateResponse: null
    },
    serverVersion: {version: "0.5.02", buildID: "ucXoSPpzQbyzTa1AuNpwYA"}
}
```

### delete definition (project)
```javascript
const gatewayRequest = {
    userAgent: {version: appBuild.app.version, buildID: appBuild.app.buildID},
    writeOrgDataUpdates: {
        orgProjectDefinitionUpdates: [
            {
                SQA0vCvWRZ2O6vwxpray0Q_AppDefinitionUpdate: {
                    operation: "delete",
                    baselineDescriptor: {
                        replicaVDID: "must match current VDID in datastore"
                    },
                    updateDescriptor: {
                        definition: {
                            YXLAvU1ZSlmO4rGgETOxFQ_OrgProject: {
                                description: "Mock Project with description update",
                                id: "AfQ4oD_RSPSAq0AtuHPEFQ",
                                name: "Cell Process Test Project",
                                taskOrders: [],
                                tasks: [],
                            }
                        }
                    }
                }   
            }
        ]
    }
}

const definitionUpdateResponse = {
    appErrors: {appErrors: []},
    writeOrgDataResponses: {
        orgProfileDefinitionUpdateResponse: null,
        orgProfileMembersMapDefinitionUpdateResponse: null,
        orgProjectDefinitionUpdatesResponse: [],
        orgResourceDefinitionUpdateResponse: null,
        orgResourceReservationsDefinitionUpdateResponse: null
    }
    serverVersion: {version: "0.5.02", buildID: "ucXoSPpzQbyzTa1AuNpwYA"}
}
```

## Questions
1. Must id be provided during the definition create service?
2. How do we know a deletion is successful from the gateway response?