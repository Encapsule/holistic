// metadata-store-constructor-filter-factory.js

const arccore = require("@encapsule/arccore");

// v0.0.48-kyanite
// This is fine because it is fully-specialized on ____accept filter specs. i.e. it has no specific
// knowledge of how these filter specs are composed meaning we can leave it as it is and worry about
// that in the layer that actually calls this factory filter.

// v0.0.49-spectrolite
// Okay - the above comment makes sense. This the layer above is going to be the HolonServiceCore::constructor filter (or one of its delegates)


var factoryResponse = arccore.filter.create({

    operationID: "6lpBEdAkTwaLjFbLR45yCA",
    operationName: "Holistic App Metadata Digraph Builder Factory.",
    operationDescription: "This filter synthesizes and returns a new filter that the derived holistic app uses to contruct a normalized holistic app metadata digraph instance.",

    inputFilterSpec: {
        ____label: "Factory Request",
        ____description: "Input to the view store filter factory.",
        ____types: "jsObject",
        id: { ____types: "jsString" },
        name: { ____types: "jsString" },
        description: { ____types: "jsString" },
        metadataInputSpec: {
            ____label: "Derived App Service Metadata Input Spec",
            ____description: "This filter specification is synthesized by HolisticAppCommon::constructor filter. It is used to specify the format of the values that the developer must pass to the digraph builder filter produced by this factory.",
            ____types: "jsObject",
            org: { ____accept: "jsObject" },
            app: { ____accept: "jsObject" },
            pages: { ____accept: "jsObject" },
            hashroutes: { ____accept: "jsObject" }
        },
        metadataOutputSpec: {
            ____label: "Derived App Service Metadata Output Spec",
            ____description: "This filter specification is synthesized by HolisticAppCommon::constructor filter. It is used to specify the format of metadata digraph query result values.",
            ____types: "jsObject",
            org: { ____accept: "jsObject" },
            app: { ____accept: "jsObject" },
            pages: { ____accept: "jsObject" },
            hashroutes: { ____accept: "jsObject" }
        }
    },

    outputFilterSpec: {
        ____label: "View Store Graph Factory",
        ____description: "A filter factory object configured to construct a view store digraph model with specific constraints on view property data.",
        ____types: "jsObject",
        filterDescriptor: { ____accept: "jsObject" },
        request: { ____accept: "jsFunction" }
    },

    bodyFunction: function(factoryRequest_) {
        var factoryRequest = factoryRequest_;
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;

        // TODO: This is something I built for generating menus in @encapsule/polytely (a test app based on @encapsule/holism from 2014-15).
        // There's a bunch of interesting use case for UX. But, it's not explained here or anywhere really. I've left out the similar
        // generation of topological sort and menu metadata for hashroutes until it's clearer if and how we use this metadata to generate
        // any sort of menus/navigation and/or styling aids in the UX.

        // Returns a response


        while (!inBreakScope) {
            inBreakScope = true;

            let innerResponse = arccore.filter.create({
                operationID: "7ChwWZaTTAOKuScC6sW1vg",
                operationName: "View Metadata Topological Sort",
                operationDescription: "Performs a topological sort to deduce vertex time marks and depth indicators useful for deducing display layout for e.g. menus.",
                inputFilterSpec: {
                    ____types: "jsObject",
                    digraph: { ____accept: "jsObject" }, // arccore.graph DirectedGraph instance
                    indexVertex: { ____accept: "jsString" }, // arccore.graph vertex name string
                    propWriter: { ____accept: "jsObject" } // arccore.filter instance
                },
                bodyFunction: function(request_) {

                    let response = { error: null };
                    let errors = [];
                    let inBreakScope = false;
                    while (!inBreakScope) {
                        inBreakScope = true;

                        // function topologicallySortViews(digraph_, indexVertex_, propWriter_) {

                        // Topologically sort the pages graph.

                        let sortCount = 0;

                        //let traversalResponse =
                        arccore.graph.directed.depthFirstTraverse({
                            digraph: request_.digraph,
                            options: {
                                // TODO: This should be a sorted traversal w/custom comparator on rank then name I think.
                                startVector: request_.indexVertex
                            },
                            visitor: {
                                discoverVertex: function(gcb_) {
                                    // console.log("discoverVertex: " + gcb_.u);
                                    let props = gcb_.g.getVertexProperty(gcb_.u);

                                    // Fail construction of the metadata store if any vertex is missing an attached property object.
                                    if (!props) {
                                        errors.unshift(`Missing metadata declaration for parent page view URI '${gcb_.u}'. Typically, this happens if and when you declare a child view without also declaring its parent(s). Or, delete the parent w/out also dealing with its children.`);
                                        return false;
                                    }
                                    let page = 1;
                                    let depth = 0;
                                    if (gcb_.g.inDegree(gcb_.u)) {
                                        let parentVertex = gcb_.g.inEdges(gcb_.u)[0].u; // [0] because topology is always a tree
                                        let parentProps = gcb_.g.getVertexProperty(parentVertex);
                                        if (parentProps && parentProps.ts) {
                                            depth = parentProps.ts.d + 1;
                                        }
                                    }
                                    props.ts = { i: sortCount++, d: depth, p: page };
                                    // console.log("setVertexProperty(" + gcb_.u + ", '" + JSON.stringify(props) + "')");
                                    let propWriterResponse = request_.propWriter.request({ digraph: gcb_.g, vertex: gcb_.u, propertyData: props });
                                    if (propWriterResponse.error) {
                                        errors.push(propWriterResponse.error);
                                        return false;
                                    }
                                    return true;
                                },
                                finishVertex: function(gcb_) {
                                    let uri = gcb_.u;
                                    // console.log("finishVertex: " + uri);
                                    let props = gcb_.g.getVertexProperty(uri);
                                    props.ts.o = sortCount++;
                                    props.ts.w = (props.ts.o - props.ts.i - 1) / 2;
                                    let childRanks = [];
                                    let children = [];
                                    let outEdges = gcb_.g.outEdges(uri);
                                    outEdges.forEach(function(outEdge_) {
                                        let childProps = gcb_.g.getVertexProperty(outEdge_.v);
                                        let childRank = (childProps.rank !== undefined)?childProps.rank:0;
                                        if (childRanks[childRank] === undefined) {
                                            childRanks[childRank] = [];
                                        }
                                        childRanks[childRank].push(outEdge_.v);
                                    });
                                    childRanks.forEach(function(rankArray_) {
                                        rankArray_.sort().forEach(function(uri_) {
                                            children.push(uri_);
                                        });
                                    });
                                    props.children = children;
                                    let propWriterResponse = request_.propWriter.request({ digraph: gcb_.g, vertex: gcb_.u, propertyData: props });
                                    if (propWriterResponse.error) {
                                        errors.push(propWriterResponse.error);
                                        return false;
                                    }
                                    return true;
                                },
                                finishEdge: function(gcb_) {
                                    let edge = gcb_.e;
                                    // console.log("finishEdge: " + JSON.stringify(edge));
                                    let sourceProps = gcb_.g.getVertexProperty(edge.u);
                                    if (sourceProps) {
                                        let sinkProps = gcb_.g.getVertexProperty(edge.v);
                                        sourceProps.ts.p = sourceProps.ts.p + sinkProps.ts.p;
                                        let propWriterResponse = request_.propWriter.request({ digraph: gcb_.g, vertex: edge.u, propertyData: sourceProps });
                                        if (propWriterResponse.error) {
                                            errors.push(propWriterResponse.error);
                                            return false;
                                        }
                                    }
                                    return true;
                                }
                            }
                        });

                        break;

                    } // while (!inBreakScope)
                    if (errors.length) {
                        response.error = errors.join(" ");
                    }
                    return response;
                } // bodyFunction (toplogicallySortViews)
            });
            if (innerResponse.error) {
                errors.push(innerResponse.error);
                break;
            }
            const topologicalSort = innerResponse.result;

            // v0.0.49-spectrolite modified and kept mainly for earlier reporting of bad input values.
            innerResponse = arccore.filter.create({
                operationID: "_2uR2ri8Qyy4l6e-3bDbeg",
                operationName: "Page Metadata Definition Property Writer",
                operationDescription: "Validates/normalizes a page metadata descriptor and updates the vertex in the app metadata digraph.",
                inputFilterSpec: {
                    ____types: "jsObject",
                    digraph: { ____accept: "jsObject" },
                    vertex: { ____accept: "jsString" },
                    propertyData: {
                        ...factoryRequest_.metadataInputSpec.pages.pageURI,
                        children: {
                            ____label: "Children View URIs",
                            ____description: "An orderred array of this page's subpage URI's.",
                            ____types: "jsArray",
                            ____defaultValue: [],
                            childURI: {
                                ____label: "Child View URI",
                                ____description: "The view URI of the child page.",
                                ____accept: "jsString"
                            }
                        },
                        ts: {
                            ____label: "Menu Magic",
                            ____description: "Topological sort timestamp and derived weight information. Used to automate UX menu layout.",
                            ____types: "jsObject",
                            ____defaultValue: {},
                            d: { ____accept: "jsNumber", ____defaultValue: 0 },
                            i: { ____accept: "jsNumber", ____defaultValue: 0 },
                            o: { ____accept: "jsNumber", ____defaultValue: 0 },
                            p: { ____accept: "jsNumber", ____defaultValue: 0 },
                            w: { ____accept: "jsNumber", ____defaultValue: 0 }
                        }
                    }
                },
                outputFilterSpec: factoryRequest_.metadataOutputSpec.pages.pageURI,
                bodyFunction: function(request_) {
                    request_.digraph.setVertexProperty({ u: request_.vertex, p: request_.propertyData });
                    return { error: null, result: request_.propertyData };
                }
            });
            if (innerResponse.error) {
                errors.push(innerResponse.error);
                break;
            }
            const pagePropWriter = innerResponse.result;

            // v0.0.49-spectrolite modified and kept mainly for earlier reporting of bad input values.
            innerResponse = arccore.filter.create({
                operationID: "LAVpp6JMRg-RZaDhZogmWw",
                operationName: "Hashroute Metadata Definition Property Writer",
                operationDescription: "Validates/normalizes a hashroute metadata descriptor and updates the vertex in the app metadata digraph.",
                inputFilterSpec: {
                    ____types: "jsObject",
                    digraph: { ____accept: "jsObject" },
                    vertex: { ____accept: "jsString" },
                    propertyData: {
                        ...factoryRequest.metadataInputSpec.hashroutes.hashroutePathname,
                        children: {
                            ____label: "Children View URIs",
                            ____description: "An orderred array of this page's subpage URI's.",
                            ____types: "jsArray",
                            ____defaultValue: [],
                            childURI: {
                                ____label: "Child View URI",
                                ____description: "The view URI of the child page.",
                                ____accept: "jsString"
                            }
                        },
                        ts: {
                            ____label: "Menu Magic",
                            ____description: "Topological sort timestamp and derived weight information. Used to automate UX menu layout.",
                            ____types: "jsObject",
                            ____defaultValue: {},
                            d: { ____accept: "jsNumber", ____defaultValue: 0 },
                            i: { ____accept: "jsNumber", ____defaultValue: 0 },
                            o: { ____accept: "jsNumber", ____defaultValue: 0 },
                            p: { ____accept: "jsNumber", ____defaultValue: 0 },
                            w: { ____accept: "jsNumber", ____defaultValue: 0 }
                        }
                    }
                },
                outputFilterSpec: factoryRequest_.metadataOutputSpec.hashroutes.hashroutePathname,
                bodyFunction: function(request_) {
                    request_.digraph.setVertexProperty({ u: request_.vertex, p: request_.propertyData });
                    return { error: null, result: request_.propertyData };
                }
            });
            if (innerResponse.error) {
                errors.push(innerResponse.error);
                break;
            }
            const hashroutePropWriter = innerResponse.result;

            innerResponse = arccore.filter.create({
                operationID: factoryRequest.id,
                operationName: factoryRequest.name,
                operationDescription: factoryRequest.description,
                inputFilterSpec: {
                    ...factoryRequest_.metadataInputSpec,
                    ____label: "Holistic App Metadata Digraph Builder Request",
                    ____description: "Application metadata declaration object from the developer of the derived holistic application.",
                    ____types: "jsObject"
                },
                outputFilterSpec: {
                    ____label: "Holistic App Metadata Definition Digraph Model",
                    ____description: "An Encapsule/arccore.graph directed graph object that model the derived holistic application's organizational, site (aka application), page, and hashroute metadata as a small in-memory database.",
                    ____accept: "jsObject"
                },

                bodyFunction: function(digraphBuilderRequest_) {
                    var response = { error: null, result: null };
                    var errors = [];
                    var inBreakScope = false;

                    while (!inBreakScope) {
                        inBreakScope = true;

                        let propWriterResponse;

                        let pageViewURIs = Object.keys(digraphBuilderRequest_.pages);
                        if (!pageViewURIs.length) {
                            errors.unshift("You must define at least the root page view, '/', in your page view map declaration.");
                            break;
                        }
                        let graphResponse = arccore.graph.directed.create({
                            name: factoryRequest.name + "::Application Metadata Store Digraph",
                            description: "In-memory DirectedGraph store containing this application's static metadata declarations.",
                        });
                        if (graphResponse.error) {
                            errors.unshift(graphResponse.error);
                            break;
                        }

                        let appMetadataDigraph = graphResponse.result;
                        appMetadataDigraph.addVertex({ u: "__org", p: digraphBuilderRequest_.org });
                        appMetadataDigraph.addVertex({ u: "__app", p: digraphBuilderRequest_.app });
                        appMetadataDigraph.addVertex({ u: "__pages" });
                        appMetadataDigraph.addVertex({ u: "__hashroutes" });

                        // Add page vertices to the digraph.

                        for (var pageViewURI of pageViewURIs) {
                            if (pageViewURI.charAt(0) !== "/") {
                                errors.unshift("Invalid page metadata declaration for URI '" + pageViewURI + "' specified. " +
                                               "Page URI's must begin with a frontslash '/' character.");
                                break;
                            }
                            var rs1 = (pageViewURI.length === 1)?[""]:pageViewURI.split("/");

                            var rs2 = [];
                            var pageViewURILast = "__pages";
                            // console.log(rs1.length + " '" + JSON.stringify(rs1) + "'");
                            rs1.forEach(function(namespace_) {
                                rs2.push(namespace_);
                                var pageViewURICurrent = (rs2.length > 1)?rs2.join("/"):"/";
                                // console.log("pageViewURILast '" + pageViewURILast + "' pageViewURICurrent: '" + pageViewURICurrent);
                                appMetadataDigraph.addEdge({ e: { u: pageViewURILast, v: pageViewURICurrent }});
                                pageViewURILast = pageViewURICurrent;
                            });
                            var pageProperties = arccore.util.clone(digraphBuilderRequest_.pages[pageViewURI]);
                            propWriterResponse = pagePropWriter.request({ digraph: appMetadataDigraph, vertex: pageViewURI, propertyData: pageProperties });
                            if (propWriterResponse.error) {
                                errors.push(propWriterResponse.error);
                                break;
                            }
                        } // end for
                        if (errors.length) {
                            break;
                        }

                        // Add hashroute vertices to the digraph.

                        pageViewURIs = Object.keys(digraphBuilderRequest_.hashroutes);

                        for (let pageViewURI of pageViewURIs) {
                            if (pageViewURI.charAt(0) !== "#") {
                                errors.unshift(`Invalid hashroute metadata declaration for URI '${pageViewURI}' specified. Hashroute URI's must begin with a frontslash '#' character.`);
                                break;
                            }

                            // My read of the relevant specifications leads me to believe the string after the # is basically anything.
                            // So, how we decide to parse the tokens is here is guided by the principle of least suprise as opposed to an RFC from W3 or something official.
                            // # <- default starting client page view (by holistic platform convention)
                            // #subview1 -> [ #, subview1 ]
                            // #subview2 -> [ #, subview2 ]
                            // #subview2/y -> [ #, subview2, y ]
                            // #subview2/y/z -> [ #, subview2, y, z ]
                            // etc.

                            const pathTokens = (pageViewURI === "#")?[]:pageViewURI.slice(1).split("/"); // We will use / to delimit path tokens like everybody else.

                            let rs1 = [ "#", ...pathTokens ]; // pageViewURI.split("/"); // initial tokenization
                            let rs2 = [];
                            let pageViewURILast = "__hashroutes";
                            // console.log(rs1.length + " '" + JSON.stringify(rs1) + "'");
                            rs1.forEach(function(namespace_) {
                                rs2.push(namespace_);
                                let pageViewURICurrent = "#" + rs2.slice(1).join("/");
                                // console.log("pageViewURILast '" + pageViewURILast + "' pageViewURICurrent: '" + pageViewURICurrent);
                                appMetadataDigraph.addEdge({ e: { u: pageViewURILast, v: pageViewURICurrent }});
                                pageViewURILast = pageViewURICurrent;
                            });
                            let hashrouteProperties = arccore.util.clone(digraphBuilderRequest_.hashroutes[pageViewURI]);
                            propWriterResponse = hashroutePropWriter.request({ digraph: appMetadataDigraph, vertex: pageViewURI, propertyData: hashrouteProperties });
                            if (propWriterResponse.error) {
                                errors.push(propWriterResponse.error);
                                break;
                            }
                        } // end for
                        if (errors.length) {
                            break;
                        }

                        innerResponse = topologicalSort.request({ digraph: appMetadataDigraph, indexVertex: "/", propWriter: pagePropWriter });
                        if (innerResponse.error) {
                            errors.push(innerResponse.error);
                            break;
                        }

                        innerResponse = topologicalSort.request({ digraph: appMetadataDigraph, indexVertex: "#", propWriter: hashroutePropWriter });
                        if (innerResponse.error) {
                            errors.push(innerResponse.error);
                            break;
                        }

                        response.result = appMetadataDigraph;

                        break;
                    }
                    if (errors.length) {
                        response.error = errors.join(" ");
                    }
                    return response;
                }
            });
            if (innerResponse.error) {
                errors.unshift(innerResponse.error);
                break;
            }
            response.result = innerResponse.result;
            break;
        }
        if (errors.length) {
            response.error = errors.join(" ");
        }
        return response;
    }
});
if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}
module.exports = factoryResponse.result;

