"use strict";

// sources/common/view/theme/index.js
//
// CSS3 styles as an in-memory object that's used to style React components
// programmatically. The advantage of this approach vs. stylesheets is that
// it provides a very fine degree of runtime control (e.g. for dynamic
// overrides based on app state changes) that is cumbersome to implement
// using CSS. It is not however always practical to use this technique as
// programmatically-applied styles in React currently do not cascade.
// Given the manner in which styles are applied per-React component, this
// turns out to be a bit of a red herring; in most situations the re-use
// of React components has the same effect as a cascading stylesheet.
// In some situations you just have to use CSS (e.g. for pseudo-elements
// link A:hover that are not currently supported by React). So, we use
// a hybrid approach preferring programmatic as possible and using CSS as
// pragmatic (or just plain required).
//
// TODO: Consider replacing this literal object with a filter that is invoked
// (possibly with application-specified override value(s)) to produce the export
// value. This simultaneously forces some level of documentation and provides
// a way for an application to override base styles w/out needing to patch
// rainier-ux-base.
//
// TODO: Ha - okay all of these should be imported into their respective
// React data bound components (e.g. renderOptions.styles w/defaults).
// That would be much much simpler and realize the main benefit of using
// programmatic styles - overriding everything at runtime for various
// reasons. This would additionally allow even greater control of layout
// via <ComponentRouter/> as well.
module.exports = {
  HolisticPageView: {
    container: {
      fontFamily: "Nunito, Arial, Helvetica" // via Google Fonts

    }
  },
  base: {
    PageContent: {
      container: {
        margin: "1em",
        padding: "1em",
        border: "10px solid #0CF",
        borderRadius: "0.5em",
        color: "#0CF",
        fontSize: "14pt",
        fontFamily: "Play, Arial, Helvetica",
        textAlign: "center",
        textShadow: "0.1em 0.1em 1em #6F6",
        backgroundImage: "url(\"/images/warp-factor-one.gif\")",
        backgroundSize: "cover",
        backgroundOrigin: "bound-box",
        backgroundPosition: "center"
      }
    },
    // Track this one down.
    PageContent_AdminStatus: {
      container: {
        padding: "1em"
      }
    },
    PageContent_AppDataStoreStatus: {
      container: {
        padding: "1em",
        backgroundColor: "#DFE"
      }
    },
    PageContent_AppError: {
      container: {
        border: "10px solid #EEE",
        borderRadius: "0.5em",
        fontFamily: "Nunito, Arial, Helvetica",
        // via Google Fonts
        fontSize: "16pt",
        margin: "1em",
        padding: "1em"
      },
      errorMessage: {
        fontSize: "16pt"
      }
    },
    PageContent_HttpServerError: {
      container: {
        border: "10px solid #EEE",
        borderRadius: "0.5em",
        fontFamily: "Nunito, Arial, Helvetica",
        // via Google Fonts
        margin: "1em",
        padding: "1em"
      },
      errorMessage: {
        fontWeight: "bold",
        fontSize: "14pt"
      },
      detailsSummary: {
        cursor: "zoom-in"
      },
      hideDetails: {
        color: "#09C",
        fontSize: "14pt",
        fontWeight: "bold",
        textAlign: "center",
        border: "1px solid #EEE",
        padding: "0.25em",
        marginBottom: "1em",
        borderRadius: "0.25em",
        cursor: "zoom-out",
        backgroundColor: "#FFC"
      }
    },
    PageContent_Markdown: {
      container: {
        padding: "1em",
        margin: "1em"
      }
    },
    // KILL

    /*
    PageContent_QueryBuilderFrame: {
        container: {
            padding: "1em",
            backgroundColor: "#DEF"
        }
    },
     PageContent_QueryResultsFrame: {
        container: {
            padding: "1em",
            backgroundColor: "#FED"
        }
    },
     PageContent_RainierCategories: {
        container: {
            margin: "1em",
            padding: "1em",
            border: "5px solid #09C",
            borderRadius: "0.5em",
            background: "#BFD"
        }
    },
     PageContent_RainierSegments: {
        container: {
            margin: "1em",
            padding: "1em",
            border: "5px solid #09C",
            borderRadius: "0.5em",
            background: "#BFD"
        }
    },
     */
    PageContent_Sitemap: {
      container: {
        boxShadow: "1px 1px 0.25em 0px #F0F0F0 inset",
        backgroundColor: "#F7F7F7",
        margin: "1em",
        padding: "1em",
        borderRadius: "0.5em"
      },
      pageContainer: {
        border: "1px solid rgba(0,0,0,0.05)",
        margin: "0em",
        padding: "0.5em",
        paddingLeft: "1em",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: "0.25em",
        fontSize: "10pt"
      }
    },
    // Confirm what this is all about...
    PageContent_SubviewSummary: {
      container: {
        margin: "1em",
        padding: "1em",
        border: "10px solid #EEE",
        borderRadius: "0.5em"
      },
      breadcrumbsContainer: {
        fontSize: "x-large"
      },
      breadcrumbsNonLinkText: {
        fontFamily: "Share Tech Mono, Courier",
        fontSize: "large",
        fontWeight: "bold",
        color: "#CCC",
        paddingLeft: "0.25em",
        paddingRight: "0.25em"
      },
      breadcrumbsNonLinkTextHighlight: {
        fontFamily: "Play, Arial, Helvetica",
        fontWeight: "bold",
        color: "#999"
      },
      childViewListShort: {
        paddingLeft: "0px",
        padding: "0.25em"
      },
      childViewListShortNonLinkTextLabel: {
        fontFamily: "Share Tech Mono, Courier",
        fontSize: "small",
        fontWeight: "bold",
        color: "#999"
      },
      childViewListShortNonLinkText: {
        fontFamily: "Share Tech Mono, Courier",
        fontSize: "small",
        color: "#CCC",
        paddingLeft: "0.25em",
        paddingRight: "0.25em"
      },
      description: {
        fontFamily: "Montserrat, Arial, Helvetica",
        fontWeight: "normal",
        color: "#999",
        marginTop: "0.66em",
        marginBottom: "0.66em",
        paddingLeft: "2em",
        padding: "0.33em",
        borderLeft: "1em solid #EEE",
        borderRadius: "0.5em",
        backgroundColor: "#F7F7F7"
      }
    },
    // KILL ?

    /*
    PageContent_User: {
        container: {
            margin: "1em",
            padding: "1em",
            border: "10px solid #EEE",
            borderRadius: "0.5em"
        }
    },
    */
    PageHeader: {
      container: {
        fontFamily: "Montserrat, Arial, Helvetica",
        borderBottom: "5px solid #EEE",
        width: "100%",
        backgroundColor: "#CCC",
        paddingTop: "0.5em",
        paddingBottom: "0.5em",
        boxShadow: "0em 1em 2em 0.125em #DDD inset",
        whiteSpace: "nowrap",
        opacity: "0.7"
      },
      containerShadow: {
        boxShadow: "0px 0px 0.25em 0.1em #BBB"
      },
      titleBar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "1em",
        marginRight: "1em"
      },
      titleBlock: {
        marginLeft: "4px",
        lineHeight: "10pt",
        paddingTop: "0.4em",
        fontSize: "20pt",
        fontWeight: "bold",
        textShadow: "1px 1px 1px #EEE"
      },
      titleBlockIcon: {
        marginTop: "2px",
        height: "40px",
        opacity: "0.15",
        fill: "#F00"
      },
      titleBlockCompany: {
        color: "#666"
      },
      titleBlockTitle: {
        color: "#999"
      },
      titleBlockSubtitle: {
        fontSize: "8pt",
        fontWeight: "normal",
        color: "#333",
        padding: "2em"
      },
      descriptionBar: {
        fontSize: "8pt",
        fontFamily: "Nunito, Arial, Helvetica",
        color: "#333",
        position: "relative",
        left: "51px"
      }
    },
    // KILL

    /*
    PageHeader_QCGlobalNavWrapper: {
        server: {
            container: {
                backgroundColor: "#212934",
                height: "60px",
                fontSize: "15px",
                fontWeight: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#777",
            }
        }
    },
    */
    PageFooter: {
      container: {
        fontFamily: "Montserrat, Arial, Helvetica",
        fontSize: "8pt",
        textAlign: "center",
        position: "fixed",
        bottom: "0px",
        left: "0px",
        borderTop: "1px solid #AAA",
        width: "100%",
        backgroundColor: "#CCC",
        color: "#999",
        textShadow: "1px 1px 1px #DDD",
        fontWeight: "bold",
        boxShadow: "0px 0.5em 1em 0px #FFF inset",
        padding: "0.2em",
        opacity: "0.9",
        zIndex: 10
      },
      versionText: {
        fontFamily: "Play, Arial",
        color: "#777",
        marginLeft: "1em",
        marginRight: "1em",
        marginBottom: "1em",
        marginTop: "0.25em",
        padding: "0.25em",
        textShadow: "1px 1px 1px #DDD",
        border: "1px solid #AAA",
        borderRadius: "0.25em",
        backgroundColor: "#BCBCBC"
      }
    },
    PagePanel_Errors: {
      closed: {
        container: {
          textAlign: "center",
          position: "fixed",
          right: "4px",
          top: "64px",
          zIndex: 500
        },
        icon: {
          cursor: "zoom-in",
          height: "24px",
          width: "24px",
          padding: "0.25em",
          border: "1px solid #333",
          borderRadius: "0.25em",
          backgroundColor: "#F00",
          fontSize: "10pt"
        },
        iconDisabled: {
          cursor: "zoom-out",
          height: "24px",
          width: "24px",
          padding: "0.25em",
          border: "1px solid #000",
          borderRadius: "0.25em",
          backgroundColor: "#FA0",
          opacity: "0.5",
          fontSize: "10pt"
        }
      },
      open: {
        container: {
          position: "fixed",
          width: "80vw",
          marginLeft: "10vw",
          marginRight: "10vw",
          height: "80vh",
          marginTop: "10vh",
          marginBottom: "10vh",
          textAlign: "left",
          border: "5px solid red",
          borderRadius: "0.5em",
          backgroundColor: "white",
          zIndex: 500,
          top: "0px",
          left: "0px",
          minWidth: "800px",
          minHeight: "460px",
          boxShadow: "16px 16px 64px 8px rgba(119, 119, 119, 0.75)",
          overflow: "scroll"
        },
        containerInner: {
          padding: "0.5em",
          overflow: "auto",
          backgroundColor: "#FCC"
        },
        guidance: {
          fontWeight: "normal",
          fontSize: "8pt"
        },
        errorListContainer: {
          border: "2px solid red",
          padding: "4px",
          borderRadius: "0.5em"
        },
        hideDetails: {
          fontFamily: "Play, Arial, Helvetica",
          color: "#939",
          fontSize: "24pt",
          fontWeight: "bold",
          cursor: "zoom-out",
          paddingLeft: "0.25em",
          paddingBottom: "0.065em",
          borderBottom: "5px solid red",
          backgroundColor: "#F93",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          alignItems: "center"
        },
        icon: {
          height: "32px",
          width: "32px",
          padding: "0.25em",
          border: "2px solid #939",
          borderRadius: "0.25em",
          backgroundColor: "#FA0",
          verticalAlign: "middle",
          marginRight: "0.5em",
          fontSize: "10pt"
        }
      }
    },
    PagePanel_ReactDebug: {
      closed: {
        container: {
          textAlign: "center",
          position: "fixed",
          right: "4px",
          top: "92px",
          zIndex: 701
        },
        icon: {
          cursor: "zoom-in",
          height: "24px",
          width: "24px",
          padding: "0.25em",
          border: "1px solid #333",
          borderRadius: "0.25em",
          backgroundColor: "#FA0",
          fontSize: "10pt"
        },
        iconDisabled: {
          cursor: "zoom-out",
          height: "24px",
          width: "24px",
          padding: "0.25em",
          border: "2px solid #C6C",
          borderRadius: "0.25em",
          backgroundColor: "#FF0",
          opacity: "0.5",
          fontSize: "10pt"
        }
      },
      open: {
        container: {
          textAlign: "left",
          border: "1px solid #CCC",
          borderRadius: "0.5em",
          backgroundColor: "#F7F7F7",
          margin: "0.5em",
          padding: "1em",
          zIndex: 700,
          position: "relative"
        },
        guidance: {
          fontWeight: "normal",
          fontSize: "8pt"
        },
        hideDetails: {
          fontFamily: "Play, Arial, Helvetica",
          color: "#F90",
          fontSize: "24pt",
          fontWeight: "bold",
          cursor: "zoom-out",
          paddingBottom: "0.25em",
          paddingLeft: "0.25em",
          paddingTop: "0.5em",
          backgroundColor: "rgba(0,0,0,0.02)",
          borderRadius: "0.25em",
          marginBottom: "0.5em",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          alignItems: "center"
        },
        icon: {
          height: "32px",
          width: "32px",
          padding: "0.25em",
          border: "2px solid #939",
          borderRadius: "0.25em",
          backgroundColor: "#FA0",
          verticalAlign: "middle",
          position: "relative",
          top: "-0.2em",
          marginRight: "0.5em",
          fontSize: "10pt"
        }
      }
    },
    PageWidget_ASC: {
      container: {
        position: "fixed",
        bottom: "2px",
        right: "2px",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "2px",
        boxShadow: "1px 1px 0px #CCC inset",
        zIndex: 11,
        backgroundColor: "#DDD",
        display: "flex"
      },
      loadingTextContainer: {
        fontSize: "8px",
        minHeight: "8px",
        height: "8px",
        margin: "2px"
      },
      stateBoxContainer: {
        minWidth: "16px",
        width: "16px",
        minHeight: "8px",
        height: "8px",
        borderRadius: "2px",
        boxShadow: "1px 1px 1px rgba(0,0,0,0.4) inset",
        margin: "2px"
      }
    }
  },
  // base
  classPRE: {
    backgroundColor: "rgba(0,0,0,0.03)",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "0.5em",
    fontFamily: "Share Tech Mono, Courier",
    // via Google Fonts
    margin: "0px",
    padding: "1em",
    overflow: "auto"
  },
  ComponentRouterError: {
    container: {
      fontFamily: "Play, Arial, Helvetica",
      fontSize: "10pt",
      padding: "1em",
      margin: "1px",
      border: "1em solid rgba(0,0,0,0.2)",
      borderRadius: "1em",
      backgroundColor: "rgba(0,0,0,0.1)"
    },
    filterList: {
      fontFamily: "Share Tech Mono, Courier",
      color: "black"
    },
    filterListItem: {
      color: "rgba(0,0,0,0.5)",
      borderBottom: "1px solid rgba(0,0,0,0.15)"
    },
    filterListItemMouseOver: {
      color: "#F60",
      fontWeight: "bold",
      textDecoration: "underline"
    },
    filterListItemInspect: {
      color: "#C00",
      fontWeight: "bold",
      textDecoration: "underline"
    }
  },
  BODY: {
    margin: "0em",
    padding: "0em",
    backgroundColor: "rgb(231,231,231)"
  }
};