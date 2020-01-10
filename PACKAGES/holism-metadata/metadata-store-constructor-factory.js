// metadata-store-constructor-filter-factory.js

const arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({

    operationID: "6lpBEdAkTwaLjFbLR45yCA",
    operationName: "App Metadata Store Constructor Filter Factory",
    operationDescription: "Manufactures a filter that's used to construct an instance of a specific class of view store digraph model.",

    inputFilterSpec: {
        ____label: "Factory Request",
        ____description: "Input to the view store filter factory.",
        ____types: "jsObject",
        id: { ____types: "jsString" },
        name: { ____types: "jsString" },
        description: { ____types: "jsString" },
        constraints: {
            ____types: "jsObject",
            metadata: {
                ____types: "jsObject",
                org_input_spec: { ____accept: "jsObject" },
                site_input_spec: { ____accept: "jsObject" },
                page_input_spec: { ____accept: "jsObject" },
                page_output_spec: { ____accept: "jsObject" }
            }
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
        while (!inBreakScope) {
            inBreakScope = true;

            var innerResponse = arccore.filter.create({
                operationID: "1c4HlKekSnyFy7st803nUQ",
                operationName: "Page Property Writer",
                operationDescription: "Validates and normalizes a developer-defined page metadata descriptor augmented with information " +
                    "deduced by the view store' (e.g. children and topo sort data) and writes updates the specified digraph vertex property.",
                inputFilterSpec: {
                    ____types: "jsObject",
                    digraph: { ____accept: "jsObject" },
                    vertex: { ____accept: "jsString" },
                    propertyData: factoryRequest.constraints.metadata.page_output_spec
                },
                bodyFunction: function(request_) {
                    request_.digraph.setVertexProperty({ u: request_.vertex, p: request_.propertyData });
                    return { error: null, result: request_.propertyData };
                }
            });
            if (innerResponse.error) {
                errors.unshift(innerResponse.error);
                break;
            }
            var updatePagePropertyFilter = innerResponse.result;

            innerResponse = arccore.filter.create({
                operationID: factoryRequest.id,
                operationName: factoryRequest.name,
                operationDescription: factoryRequest.description,
                inputFilterSpec: {
                    ____label: "Metadata Store Declaration",
                    ____description: "Application metadata declaration object.",
                    ____types: "jsObject",
                    organization: factoryRequest.constraints.metadata.org_input_spec,
                    website: factoryRequest.constraints.metadata.site_input_spec,
                    pages: {
                        ____label: "Page View Metadata Descriptor Map",
                        ____description: "A map of page view URI strings to page view descriptor objects. Note that all page view URI's " +
                            "must start with a leading frontslash '/'.",
                        ____types: "jsObject",
                        ____asMap: true,
                        view_uri: factoryRequest.constraints.metadata.page_input_spec
                    }
                },

                outputFilterSpec: {
                    ____label: "View Store Model",
                    ____description: "An Encapsule/arccore.graph directed graph object containing the application's view store model.",
                    ____accept: "jsObject"
                },

                bodyFunction: function(viewDeclaration_) {
                    var response = { error: null, result: null };
                    var errors = [];
                    var inBreakScope = false;
                    while (!inBreakScope) {
                        inBreakScope = true;
                        var pageViewURIs = Object.keys(viewDeclaration_.pages);
                        if (!pageViewURIs.length) {
                            errors.unshift("You must define at least the root page view, '/', in your page view map declaration.");
                            break;
                        }
                        var graphResponse = arccore.graph.directed.create({
                            name: factoryRequest.name + "::Application Metadata Store Digraph",
                            description: "In-memory DirectedGraph store containing this application's static metadata declarations.",
                        });
                        if (graphResponse.error) {
                            errors.unshift(graphResponse.error);
                            break;
                        }

                        var viewStore = graphResponse.result;
                        viewStore.addVertex({ u: "__organization", p: viewDeclaration_.organization });
                        viewStore.addVertex({ u: "__website", p: viewDeclaration_.website });
                        viewStore.addVertex({ u: "__pageViewHierarchy" });

                        for (var pageViewURI of pageViewURIs) {
                            if (pageViewURI.charAt(0) !== "/") {
                                errors.unshift("Invalid page metadata declaration for URI '" + pageViewURI + "' specified. " +
                                               "Page URI's must begin with a frontslash '/' character.");
                                break;
                            }
                            var rs1 = (pageViewURI.length === 1)?[""]:pageViewURI.split("/");

                            var rs2 = [];
                            var pageViewURILast = "__pageViewHierarchy";
                            // console.log(rs1.length + " '" + JSON.stringify(rs1) + "'");
                            rs1.forEach(function(namespace_) {
                                rs2.push(namespace_);
                                var pageViewURICurrent = (rs2.length > 1)?rs2.join("/"):"/";
                                // console.log("pageViewURILast '" + pageViewURILast + "' pageViewURICurrent: '" + pageViewURICurrent);
                                viewStore.addEdge({ e: { u: pageViewURILast, v: pageViewURICurrent }});
                                pageViewURILast = pageViewURICurrent;
                            });
                            var pageProperties = arccore.util.clone(viewDeclaration_.pages[pageViewURI]);

                            var updateResponse = updatePagePropertyFilter.request({ digraph: viewStore, vertex: pageViewURI, propertyData: pageProperties });
                            if (updateResponse.error) {
                                errors.unshift(updateResponse.error);
                                errors.unshift("While processing page view URI `"  + pageViewURI + "`.");
                                break;
                            }
                        } // end for
                        if (errors.length) {
                            break;
                        }

                        // Topologically sort the pages graph.
                        var sortCount = 0;
                        //var traversalResponse =
                        arccore.graph.directed.depthFirstTraverse({
                            digraph: viewStore,
                            options: {
                                startVector: "/"
                            },
                            visitor: {
                                discoverVertex: function(gcb_) {
                                    // console.log("discoverVertex: " + gcb_.u);
                                    var props = gcb_.g.getVertexProperty(gcb_.u);

                                    // Fail construction of the metadata store if any vertex is missing an attached property object.
                                    if (!props) {
                                        errors.unshift("Missing metadata declaration for parent page view URI `" + gcb_.u + "`. " +
                                                       "Typically this happens if you declare a child view without also declaring its parent(s).");
                                        return false;
                                    }

                                    var page = 1;
                                    var depth = 0;

                                    if (gcb_.g.inDegree(gcb_.u)) {
                                        var parentVertex = gcb_.g.inEdges(gcb_.u)[0].u; // [0] because topology is always a tree
                                        var parentProps = gcb_.g.getVertexProperty(parentVertex);
                                        if (parentProps && parentProps.ts) {
                                            depth = parentProps.ts.d + 1;
                                        }
                                    }
                                    props.ts = { i: sortCount++, d: depth, p: page };
                                    // console.log("setVertexProperty(" + gcb_.u + ", '" + JSON.stringify(props) + "')");
                                    var updateResponse = updatePagePropertyFilter.request({ digraph: gcb_.g, vertex: gcb_.u, propertyData: props });
                                    if (updateResponse.error) {
                                        errors.unshift(updateResponse.error);
                                        errors.unshift("While processing page view URI `" + gcb_.u + "`.");
                                        return false;
                                    }
                                    return true;
                                },
                                finishVertex: function(gcb_) {
                                    var viewStore = gcb_.g;
                                    var uri = gcb_.u;
                                    // console.log("finishVertex: " + uri);
                                    var props = viewStore.getVertexProperty(uri);
                                    props.ts.o = sortCount++;
                                    props.ts.w = (props.ts.o - props.ts.i - 1) / 2;

                                    var childRanks = [];
                                    var children = [];
                                    var outEdges = viewStore.outEdges(uri);
                                    outEdges.forEach(function(outEdge_) {
                                        var childProps = viewStore.getVertexProperty(outEdge_.v);
                                        var childRank = (childProps.rank !== undefined)?childProps.rank:0;
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
                                    var updateResponse = updatePagePropertyFilter.request({ digraph: gcb_.g, vertex: gcb_.u, propertyData: props });
                                    if (updateResponse.error) {
                                        errors.unshift(updateResponse.error);
                                        return false;
                                    }
                                    return true;
                                },
                                finishEdge: function(gcb_) {
                                    var digraph = gcb_.g;
                                    var edge = gcb_.e;
                                    // console.log("finishEdge: " + JSON.stringify(edge));
                                    var sourceProps = digraph.getVertexProperty(edge.u);
                                    if (sourceProps) {
                                        var sinkProps = digraph.getVertexProperty(edge.v);
                                        sourceProps.ts.p = sourceProps.ts.p + sinkProps.ts.p;
                                        var updateResponse = updatePagePropertyFilter.request({ digraph: digraph, vertex: edge.u, propertyData: sourceProps });
                                        if (updateResponse.error) {
                                            errors.unshift(updateResponse.error);
                                            return false;
                                        }
                                    }
                                    return true;
                                }
                            }
                        });

                        if (errors.length) {
                            errors.unshift("Failed to construct the app metadata store.");
                            break;
                        }

                        response.result = viewStore;
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

