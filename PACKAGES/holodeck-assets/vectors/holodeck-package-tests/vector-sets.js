"use strict";

// HOLODECK RUNNER TESTS
module.exports = [[{
  id: "zxKqk_YOTme-e0AExJUhmg",
  name: "Bad message test #0",
  description: "Send a message that we know there's no harness registered to handle.",
  vectorRequest: {
    bogusMessage: {
      message: "Hello, is anyone there?"
    }
  }
}, {
  id: "IRyR4YazRuWiZp9Rzj6-WA",
  name: "Call test harness #1",
  description: "Attempt to call the harness-filter-1 test harness plug-in.",
  vectorRequest: {
    testMessage1: "This request should get routed to harness-filter-1."
  }
}, {
  id: "sBB6rshGQu2f7S5rA2x9eg",
  name: "Call test harness #2",
  description: "Attempt to call the harness-filter-2 test harness plug-in.",
  vectorRequest: {
    testMessage2: "This request should get routed to harness-filter-2."
  }
}, {
  id: "ak8rhTiORTWXueau74RlHA",
  name: "Call test harness #3 (incomplete message)",
  description: "Attempt to call the harness-filter-3 test harness plug-in w/incomplete request mesage.",
  vectorRequest: {
    testMessage3: {
      superflous: ["This array is not included in the harness-filter-3 test harness input spec so it's simply clipped off by the harness input filter stage and never passed to the harness bodyFunction.", "We know that our harness filter test examples all have a fairly predictable harnessRequest signature. Here we use knowledge of how arccore.discriminator works inside to craft a", "a test that routes through discriminator to select the harness. But, when called the harness rejects the harnessRequest because although it was sufficient to get through arccore.discrminator,", "(because after seeing testMessage3 discrminator knows it can only be harness-filter-3) it was nonetheless insufficiently complete to pass harness input spec."]
    }
  }
}, {
  id: "cQ3Z1fhsTICqkY3uKQXaFQ",
  name: "Call test harness #3A (complete message signalling force error)",
  description: "Attempt to call harness-filter-3 signalling that its implementation should return a response.error.",
  vectorRequest: {
    testMessage3: {
      message: "error"
    }
  }
}, {
  id: "LC56jkxeQJ2mgWfwGklLEQ",
  name: "Call test harness #3B (valid message)",
  description: "Attempt to call harness-filter-3 with a valid message.",
  vectorRequest: {
    testMessage3: {
      message: "This message should be delivered and returned by harness-filter-3."
    }
  }
}, {
  id: "UHqiKKLkTMmLBGXI4lRxEA",
  name: "Call test harness #4",
  description: "Call test harness #4 which is hardwired to throw an exception. This confirms baseline for holodeck's harness factory's handling of bad developer input.",
  vectorRequest: {
    testMessage4: {
      thisIsOpqaue: "so i can do wahtever i want... and it doesn't matter anyway. the harness is hard-wired to explode."
    }
  }
}, {
  id: "tiB1moF_SkWteHeOoCe96g",
  name: "Call test harness #5",
  description: "Call test harness #5 that splits its incoming request into two subrequests that it dispatches via MDR to test harness #6 and test harness #7",
  vectorRequest: {
    testMessage5: {
      subVectorRequestA: {
        id: "QXyfBDzTQ4Gi53b9x0Fd7w",
        name: "Subvector Request A",
        description: "A request made to another holodeck harness from within a harness via MDR pattern.",
        vectorRequest: {
          testMessage5A: {
            message: "Hello, this ia a test of subVectorRequestA dispathc via MDR that we expect to get routed to test harness #5A."
          }
        }
      },
      subVectorRequestB: {
        id: "CRssCOzbQD2luB1gAq_k8w",
        name: "Subvector Request B",
        description: "A request made to another holodeck harness from within a harness via MDR pattern.",
        vectorRequest: {
          testMessage5B: {
            message: "hello, this is a test of subVectorRequestB dispatch via MDR that we expect to get routed to test harness #5B."
          }
        }
      }
    }
  }
}, {
  id: "veo_BAhrQxuNhyL4mF66IA",
  name: "Call test harness #6",
  description: "Call test harness #6 that executes two subvector requests in a separate holodec runner.",
  vectorRequest: {
    testMessage6: {
      subRunnerID: "3OKNkkrBTY6NmUXwjeLUDg",
      subVectorRequestA: {
        id: "QXyfBDzTQ4Gi53b9x0Fd7w",
        name: "Subvector Request A",
        description: "A request made to another holodeck harness from within a harness via MDR pattern.",
        vectorRequest: {
          testMessage5A: {
            message: "Hello, this ia a test of subVectorRequestA dispathc via MDR that we expect to get routed to test harness #5A."
          }
        }
      },
      subVectorRequestB: {
        id: "CRssCOzbQD2luB1gAq_k8w",
        name: "Subvector Request B",
        description: "A request made to another holodeck harness from within a harness via MDR pattern.",
        vectorRequest: {
          testMessage5B: {
            message: "hello, this is a test of subVectorRequestB dispatch via MDR that we expect to get routed to test harness #5B."
          }
        }
      }
    }
  }
}
/* DISABLE - Coming back in here after some time away. Holodeck works well. But, w/out additional thought doesn't scale for non-idempotent functions.
   I think there's a reasonable argument to be made for NOT supporting non-idempotent functions categorically. And, not just because I don't want to
   design yet-another-fucking-subsystem from scratch when my goal is actually way up the stack. My reasoning is that any non-idempotent function can
   be decomposed into some set of idempotent and non-idempotent function components. Most of the time you really don't care all that much about
   the non-idempotent variables (things likes random keys, wall-clock time, or anthing derived from the like...). And when you do if you design your
   code to isolate the non-idempotent functions then you can either (a) ignore them easily (b) build a more suitable and sophisticated test instead
   of / with / atop holodeck? But, holodeck should stay not more complicated than it already is in order to remain stable and generally userful
   for what we're using it for now which is very broad and deep code examination and via git, tight control over accepted baseline behaviors of
   increasingly complex pieces of stateful logic....
{
    id: "yHBXQnMzTc-uD67HICQx-g",
    name: "Call test harness #?",
    description: "Call test harness #? that is declared a non-idempotent, with a gif diff hunk size to test holodeck runner's handling of the post-harness-dispatch evaluation step performed currently by the runner filter.",
    vectorRequest: { testMessage5: { thisIsOpaque: "this message is entirely ignored by the harness" } }
}
*/
]];