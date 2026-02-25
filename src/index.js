import iziToast from "izitoast";
var sbLoadedHandler = null;

export default {
    onload: ({ extensionAPI }) => {
        // Roam Depot settings config pages
        const config = {
            tabTitle: "Semantic Scholar",
            settings: [
                {
                    id: "ss-config",
                    name: "Import options",
                    description: "Select to set import options",
                    action: {
                        type: "select",
                        items: ["Set here", "Article", "Author", "Recommendations/Relevance"],
                        onChange: (evt) => { setConfig(evt); }
                    }
                },
                {
                    id: "ss-apikey",
                    name: "API key",
                    description: "(Optional) Add an API key from Semantic Scholar to reduce the chances of receiving an error message about too many requests. You can apply for an API key at https://www.semanticscholar.org/product/api#api-key",
                    action: {
                        type: "input", placeholder: "Optional API key",
                        onChange: (evt) => { setAPIKey(evt); }
                    }
                },
            ]
        };
        extensionAPI.settings.set("ss-config", "Set Here");
        extensionAPI.settings.panel.create(config);

        const configArt = {
            tabTitle: "Semantic Scholar",
            settings: [
                {
                    id: "ss-config",
                    name: "Import options",
                    description: "Select to set import options",
                    action: {
                        type: "select",
                        items: ["Article", "Author", "Recommendations/Relevance", "Home"],
                        onChange: (evt) => { setConfig(evt); }
                    }
                },
                {
                    id: "ss-newPage",
                    name: "Don't create a new page",
                    description: "Switch on to embed article in focused block. Leave switched off to create a new page for an imported article",
                    action: {
                        type: "switch",
                        onChange: (evt) => { setNewPage(evt); }
                    },
                },
                {
                    id: "ss-newPageTitle",
                    name: "New Page Title",
                    description: "Switch on to name the new article page using the article name. Leave switched off to default to using the citekey as the page name",
                    action: {
                        type: "switch",
                        onChange: (evt) => { setNewPageTitle(evt); }
                    },
                },
                {
                    id: "ss-journalOrder",
                    name: "Journal reference",
                    description: "Which position to place the journal reference data",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "Hide"],
                        onChange: (evt) => { setJournalOrder(evt); }
                    }
                },
                {
                    id: "ss-articleType",
                    name: "Article type",
                    description: "Which position to place the article type",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "Hide"],
                        onChange: (evt) => { setArtTypeOrder(evt); }
                    }
                },
                {
                    id: "ss-authorsOrder",
                    name: "Authors",
                    description: "Which position to place the Authors",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "Hide"],
                        onChange: (evt) => { setAuthOrder(evt); }
                    }
                },
                {
                    id: "ss-referencesOrder",
                    name: "References",
                    description: "Which position to place the article's references",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "Hide"],
                        onChange: (evt) => { setRefsOrder(evt); }
                    }
                },
                {
                    id: "ss-citationsOrder",
                    name: "Citations",
                    description: "Which position to place the citations",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "Hide"],
                        onChange: (evt) => { setCitOrder(evt); }
                    }
                },
                {
                    id: "ss-infCitationsOrder",
                    name: "Influential citations",
                    description: "Which position to place the influential citations",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "Hide"],
                        onChange: (evt) => { setInfCitOrder(evt); }
                    }
                },
                {
                    id: "ss-sourcesOrder",
                    name: "Article sources",
                    description: "Which position to place the source links",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "Hide"],
                        onChange: (evt) => { setSourcesOrder(evt); }
                    }
                },
                {
                    id: "ss-abstractOrder",
                    name: "Abstract",
                    description: "Which position to place the abstract",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "Hide"],
                        onChange: (evt) => { setAbstractOrder(evt); }
                    }
                },
            ]
        };
        const configAut = {
            tabTitle: "Semantic Scholar",
            settings: [
                {
                    id: "ss-config",
                    name: "Import options",
                    description: "Select to set import options",
                    action: {
                        type: "select",
                        items: ["Author", "Article", "Recommendations/Relevance", "Home"],
                        onChange: (evt) => { setConfig(evt); }
                    }
                },
                {
                    id: "ss-affiliationsOrder",
                    name: "Affiliations",
                    description: "Which position to place the affiliations data",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "Hide"],
                        onChange: (evt) => { setAffiliationsOrder(evt); }
                    }
                },
                {
                    id: "ss-authorsLinksOrder",
                    name: "Author's links",
                    description: "Which position to place the author's links",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "Hide"],
                        onChange: (evt) => { setAuthorsLinksOrder(evt); }
                    }
                },
                {
                    id: "ss-homepageOrder",
                    name: "Homepage",
                    description: "Which position to place the author's homepage (if available)",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "Hide"],
                        onChange: (evt) => { setHomepageOrder(evt); }
                    }
                },
                {
                    id: "ss-citationCountOrder",
                    name: "Citation Count",
                    description: "Which position to place the author's citation count",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "Hide"],
                        onChange: (evt) => { setCitCountOrder(evt); }
                    }
                },
                {
                    id: "ss-hIndexOrder",
                    name: "h-Index",
                    description: "Which position to place the author's h-Index",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "Hide"],
                        onChange: (evt) => { sethIndexOrder(evt); }
                    }
                },
                {
                    id: "ss-papersOrder",
                    name: "Papers",
                    description: "Which position to place the author's papers",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "Hide"],
                        onChange: (evt) => { setPapersOrder(evt); }
                    }
                },
                {
                    id: "ss-authorsNumber",
                    name: "Number of Authors",
                    description: "How many authors do you want when searching by author name?",
                    action: {
                        type: "input", placeholder: "20",
                        onChange: (evt) => { setAuthorsNumber(evt); }
                    }
                },
            ]
        };
        const configRecRel = {
            tabTitle: "Semantic Scholar",
            settings: [
                {
                    id: "ss-config",
                    name: "Import options",
                    description: "Select to set import options",
                    action: {
                        type: "select",
                        items: ["Recommendations/Relevance", "Author", "Article", "Home"],
                        onChange: (evt) => { setConfig(evt); }
                    }
                },
                {
                    id: "ss-recRelNumber",
                    name: "Number of Relevant Papers",
                    description: "How many papers do you want when searching for recommended or relevant papers?",
                    action: {
                        type: "input", placeholder: "20",
                        onChange: (evt) => { setRecRelNumber(evt); }
                    }
                },
                {
                    id: "ss-recRelFOS",
                    name: "Fields of Study",
                    description: "From which fields of study do you want to find relevant papers? Comma-separated list using fields listed under fieldsOfStudy at https://api.semanticscholar.org/api-docs/graph#tag/Paper-Data/operation/get_graph_paper_relevance_search. Note: this is only used for Relevance searches.",
                    action: {
                        type: "input", placeholder: "e.g. Medicine,Education",
                        onChange: (evt) => { setRecRelFOS(evt); }
                    }
                },
            ]
        };

        // onload - API key
        var apiKey;
        if (extensionAPI.settings.get("ss-apikey")) {
            apiKey = extensionAPI.settings.get("ss-apikey");
        }

        // onload - articles
        var newPage, newPageTitle, journalOrder, articleTypeOrder, authorsOrder, referencesOrder, citationsOrder, infCitationsOrder, sourcesOrder, abstractOrder;
        newPage = !extensionAPI.settings.get("ss-newPage");
        if (extensionAPI.settings.get("ss-newPageTitle") == true) {
            newPageTitle = "name";
        } else {
            newPageTitle = "citekey";
        }
        function initOrder(key, fallback) {
            var val = extensionAPI.settings.get(key);
            if (val == null) return fallback;
            return val === "Hide" ? "Hide" : parseInt(val);
        }
        journalOrder = initOrder("ss-journalOrder", 1);
        articleTypeOrder = initOrder("ss-articleTypeOrder", 2);
        authorsOrder = initOrder("ss-authorsOrder", 3);
        referencesOrder = initOrder("ss-referencesOrder", 4);
        citationsOrder = initOrder("ss-citationsOrder", 5);
        infCitationsOrder = initOrder("ss-infCitationsOrder", 6);
        sourcesOrder = initOrder("ss-sourcesOrder", 7);
        abstractOrder = initOrder("ss-abstractOrder", 8);

        // onload - authors
        var affiliationsOrder, authorsLinksOrder, homepageOrder, papersOrder, citationCountOrder, hIndexOrder, authorsNumber;
        affiliationsOrder = initOrder("ss-affiliationsOrder", 1);
        authorsLinksOrder = initOrder("ss-authorsLinksOrder", 2);
        homepageOrder = initOrder("ss-homepageOrder", 3);
        citationCountOrder = initOrder("ss-citationCountOrder", 4);
        hIndexOrder = initOrder("ss-hIndexOrder", 5);
        papersOrder = initOrder("ss-papersOrder", 6);
        if (extensionAPI.settings.get("ss-authorsNumber") != null) {
            authorsNumber = parseInt(extensionAPI.settings.get("ss-authorsNumber"));
        } else {
            authorsNumber = 20;
        }

        // onLoad - recommendations/relevance
        var recRelNumber = 20;
        var recRelFOS;
        if (extensionAPI.settings.get("ss-recRelNumber")) {
            const regex = /^\d{1,3}$/;
            if (extensionAPI.settings.get("ss-recRelNumber").match(regex)) {
                recRelNumber = parseInt(extensionAPI.settings.get("ss-recRelNumber"));
            } else {
                recRelNumber = 20;
            }
        }
        if (extensionAPI.settings.get("ss-recRelFOS")) {
            recRelFOS = extensionAPI.settings.get("ss-recRelFOS");
        }

        // onChange - API Key
        async function setAPIKey(evt) {
            if (evt.target.value != "") {
                apiKey = evt.target.value;
            } else {
                apiKey = null;
            }
        }

        // onChange - articles
        async function setConfig(evt) {
            if (evt == "Article") {
                extensionAPI.settings.panel.create(configArt);
            } else if (evt == "Author") {
                extensionAPI.settings.panel.create(configAut);
            } else if (evt == "Recommendations/Relevance") {
                extensionAPI.settings.panel.create(configRecRel);
            } else if (evt == "Home") {
                extensionAPI.settings.panel.create(config);
            }
        }
        async function setNewPage(evt) {
            newPage = !evt.target.checked;
        }
        async function setNewPageTitle(evt) {
            if (evt.target.checked) {
                newPageTitle = "name";
            } else {
                newPageTitle = "citekey";
            }
        }
        function parseOrder(val) {
            return val === "Hide" ? "Hide" : parseInt(val);
        }
        async function setJournalOrder(evt) {
            journalOrder = parseOrder(evt);
        }
        async function setArtTypeOrder(evt) {
            articleTypeOrder = parseOrder(evt);
        }
        async function setAuthOrder(evt) {
            authorsOrder = parseOrder(evt);
        }
        async function setRefsOrder(evt) {
            referencesOrder = parseOrder(evt);
        }
        async function setCitOrder(evt) {
            citationsOrder = parseOrder(evt);
        }
        async function setInfCitOrder(evt) {
            infCitationsOrder = parseOrder(evt);
        }
        async function setSourcesOrder(evt) {
            sourcesOrder = parseOrder(evt);
        }
        async function setAbstractOrder(evt) {
            abstractOrder = parseOrder(evt);
        }

        // onChange - authors
        async function setAffiliationsOrder(evt) {
            affiliationsOrder = parseOrder(evt);
        }
        async function setAuthorsLinksOrder(evt) {
            authorsLinksOrder = parseOrder(evt);
        }
        async function setHomepageOrder(evt) {
            homepageOrder = parseOrder(evt);
        }
        async function setCitCountOrder(evt) {
            citationCountOrder = parseOrder(evt);
        }
        async function sethIndexOrder(evt) {
            hIndexOrder = parseOrder(evt);
        }
        async function setPapersOrder(evt) {
            papersOrder = parseOrder(evt);
        }
        async function setAuthorsNumber(evt) {
            const regex = /^\d{1,3}$/;
            var authorsNumberString = evt.target.value;
            if (authorsNumberString.match(regex)) {
                authorsNumber = parseInt(authorsNumberString);
            } else {
                authorsNumber = 20;
            }
        }

        // onChange - recommendations/relevance
        async function setRecRelNumber(evt) {
            const regex = /^\d{1,3}$/;
            var recRelNumberString = evt.target.value;
            if (recRelNumberString.match(regex)) {
                recRelNumber = parseInt(recRelNumberString);
            } else {
                recRelNumber = 20;
            }
        }
        async function setRecRelFOS(evt) {
            recRelFOS = evt.target.value;
        }

        // check and create configuration page, with instructions and SmartBlocks
        checkFirstRun();
        async function checkFirstRun() {
            var page = await window.roamAlphaAPI.q(`[:find (pull ?page [:block/string :block/uid {:block/children ...}]) :where [?page :node/title "Semantic Scholar configuration"] ]`);
            if (page.length < 1) { // no config page created, so create one
                let newUid = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createPage({ page: { title: "Semantic Scholar configuration", uid: newUid } });
                let string1 = "Thank you for installing the Semantic Scholar extension for Roam Research. This page has been automatically generated to allow for configuration.";
                let newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 0 }, block: { string: string1, uid: newUid1 } });
                let string2 = "This extension allows you to query and import article and author data from the literature base at Semantic Scholar.";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 1 }, block: { string: string2, uid: newUid1 } });
                let string3 = "It can be used without an API key, although rate limiting applies and you will often see a toast message asking you to wait before trying again. Alternatively, you can apply for an API key at [Semantic Scholar](https://www.semanticscholar.org/product/api#api-key-form).";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 2 }, block: { string: string3, uid: newUid1 } });
                let string3a = "You can configure your preferences in the Roam Depot Settings for this extension. You can determine what data you are interested in seeing for both articles and authors, and the order in which it displays. If you choose Hide for any of the data types, that data will not be requested in the API call to Semantic Scholar. This will save on data transmitted.";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 3 }, block: { string: string3a, uid: newUid1 } });
                let string4 = "If you also have the SmartBlocks extension installed, you will see an Import button after every author, reference and citation in the article view. Clicking the button will import that data as a separate page. If you don't have SmartBlocks installed you will need to install it to have access to this feature.";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 4 }, block: { string: string4, uid: newUid1 } });
                let string5 = "The fields below the horizontal line are the SmartBlock code required to make the buttons work. Please DO NOT change these SmartBlocks as you might break the Import buttons.";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 5 }, block: { string: string5, uid: newUid1 } });
                let string6 = "If you have any issues, please request support in the Roam Research [Slack](https://app.slack.com/client/TNEAEL9QW) or the [GitHub](https://github.com/mlava/semantic-scholar/issues) page for this extension.";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 6 }, block: { string: string6, uid: newUid1 } });
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 7 }, block: { string: "---", uid: newUid1 } });
                let ws_1 = "#SmartBlock SemanticScholarArticle";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 9 }, block: { string: ws_1, uid: newUid1 } });
                let ws_2 = "<%IMPORTARTICLESEMSCHOL%>";
                let newUid2 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid1, order: 0 }, block: { string: ws_2.toString(), uid: newUid2 } });
                let ws_3 = "#SmartBlock SemanticScholarAuthor";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 10 }, block: { string: ws_3, uid: newUid1 } });
                let ws_4 = "<%IMPORTAUTHORSEMSCHOL%>";
                let newUid3 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid1, order: 0 }, block: { string: ws_4.toString(), uid: newUid3 } });
                let ws_5 = "#SmartBlock SemanticScholarRecommended";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 11 }, block: { string: ws_5, uid: newUid1 } });
                let ws_6 = "<%RECOMMENDEDSEMSCHOL%>";
                let newUid4 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid1, order: 0 }, block: { string: ws_6.toString(), uid: newUid4 } });
                let ws_5a = "#SmartBlock RefreshSemanticScholarRecommendations";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 12 }, block: { string: ws_5a, uid: newUid1 } });
                let ws_6a = "<%REFRESHRECOMMENDEDSEMSCHOL%>";
                let newUid4a = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid1, order: 0 }, block: { string: ws_6a.toString(), uid: newUid4a } });
                let ws_7 = "#SmartBlock RefreshSemanticScholarRelevanceSearch";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 13 }, block: { string: ws_7, uid: newUid1 } });
                let ws_8 = "<%REFRESHSEMSCHOLRELEVANCESEARCH%>";
                let newUid5 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid1, order: 0 }, block: { string: ws_8.toString(), uid: newUid5 } });
                let ws_9 = "#SmartBlock MoreSemanticScholarRelevanceSearch";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 14 }, block: { string: ws_9, uid: newUid1 } });
                let ws_10 = "<%MORESEMSCHOLRELEVANCESEARCH%>";
                let newUid6 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid1, order: 0 }, block: { string: ws_10.toString(), uid: newUid6 } });
                let ws_11 = "#SmartBlock RefreshSemanticScholarAuthorSearch";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 15 }, block: { string: ws_11, uid: newUid1 } });
                let ws_12 = "<%REFRESHSEMSCHOLAUTHORSEARCH%>";
                let newUid7 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid1, order: 0 }, block: { string: ws_12.toString(), uid: newUid7 } });
                let ws_13 = "#SmartBlock MoreSemanticScholarAuthorSearch";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 16 }, block: { string: ws_13, uid: newUid1 } });
                let ws_14 = "<%MORESEMSCHOLAUTHORSEARCH%>";
                let newUid8 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid1, order: 0 }, block: { string: ws_14.toString(), uid: newUid8 } });

                await sleep(50);
                await window.roamAlphaAPI.ui.mainWindow.openPage({ page: { uid: newUid } });
            }
        }

        // command palette commands
        extensionAPI.ui.commandPalette.addCommand({
            label: "Semantic Scholar - Get Article Metadata",
            callback: () => {
                var parentUid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
                if (parentUid == undefined) {
                    alert("Please make sure to focus a block before importing from Semantic Scholar");
                    return;
                } else {
                    window.roamAlphaAPI.updateBlock(
                        { block: { uid: parentUid, string: "Loading...".toString(), open: true } });
                }
                fetchSSArtM(false, null, parentUid);
                document.querySelector("body")?.click();
            },
        });
        extensionAPI.ui.commandPalette.addCommand({
            label: "Semantic Scholar - Get Author Metadata",
            callback: () => {
                var parentUid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
                if (parentUid == undefined) {
                    alert("Please make sure to focus a block before importing from Semantic Scholar");
                    return;
                } else {
                    window.roamAlphaAPI.updateBlock(
                        { block: { uid: parentUid, string: "Loading...".toString(), open: true } });
                }
                fetchSSAutM(false, null, parentUid);
                document.querySelector("body")?.click();
            },
        });
        extensionAPI.ui.commandPalette.addCommand({
            label: "Semantic Scholar - Find Recommended Articles by Paper",
            callback: () => {
                var parentUid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
                if (parentUid == undefined) {
                    alert("Please make sure to focus a block before importing from Semantic Scholar");
                    return;
                } else {
                    window.roamAlphaAPI.updateBlock(
                        { block: { uid: parentUid, string: "Loading...".toString(), open: true } });
                }
                searchSSRecommended(false, parentUid, null, false);
                document.querySelector("body")?.click();
            },
        });
        extensionAPI.ui.commandPalette.addCommand({
            label: "Semantic Scholar - Search for Articles by Relevance",
            callback: () => {
                var parentUid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
                if (parentUid == undefined) {
                    alert("Please make sure to focus a block before importing from Semantic Scholar");
                    return;
                } else {
                    window.roamAlphaAPI.updateBlock(
                        { block: { uid: parentUid, string: "Loading...".toString(), open: true } });
                }
                searchSSArtRelevance(false, parentUid, null, false);
                document.querySelector("body")?.click();
            },
        });
        extensionAPI.ui.commandPalette.addCommand({
            label: "Semantic Scholar - Search for an Article by Title",
            callback: () => {
                var parentUid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
                if (parentUid == undefined) {
                    alert("Please make sure to focus a block before importing from Semantic Scholar");
                    return;
                } else {
                    window.roamAlphaAPI.updateBlock(
                        { block: { uid: parentUid, string: "Loading...".toString(), open: true } });
                }
                searchSSArtTitle(parentUid);
                document.querySelector("body")?.click();
            },
        });
        extensionAPI.ui.commandPalette.addCommand({
            label: "Semantic Scholar - Search for Authors by Name",
            callback: () => {
                var parentUid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
                if (parentUid == undefined) {
                    alert("Please make sure to focus a block before importing from Semantic Scholar");
                    return;
                } else {
                    window.roamAlphaAPI.updateBlock(
                        { block: { uid: parentUid, string: "Loading...".toString(), open: true } });
                }
                searchSSAutName(false, parentUid, null, false);
                document.querySelector("body")?.click();
            },
        });

        // SmartBlock definitions
        const args = {
            text: "IMPORTARTICLESEMSCHOL",
            help: "Import an article from Semantic Scholar",
            handler: (context) => () => {
                var corpus = context.variables.corpusId;
                var parentUid = context.triggerUid;
                return fetchSSArtM(true, corpus, parentUid);
            },
        };
        const args1 = {
            text: "IMPORTAUTHORSEMSCHOL",
            help: "Import an author from Semantic Scholar",
            handler: (context) => () => {
                var author = context.variables.authorId;
                var parentUid = context.triggerUid;
                return fetchSSAutM(true, author, parentUid);
            },
        };
        const args2 = {
            text: "RECOMMENDEDSEMSCHOL",
            help: "Import recommended papers from Semantic Scholar",
            handler: (context) => () => {
                var searchParams = context.variables.searchParams;
                var parentUid = context.triggerUid;
                return searchSSRecommended(true, parentUid, searchParams, false);
            },
        };
        const args2a = {
            text: "REFRESHRECOMMENDEDSEMSCHOL",
            help: "Refresh recommended papers from Semantic Scholar",
            handler: (context) => () => {
                var searchParams = context.variables.searchParams;
                var parentUid = context.triggerUid;
                return searchSSRecommended(true, parentUid, searchParams, true);
            },
        };
        const args3 = {
            text: "REFRESHSEMSCHOLRELEVANCESEARCH",
            help: "Refresh relevant paper search results from Semantic Scholar",
            handler: (context) => () => {
                var searchParams = context.variables.searchParams;
                var parentUid = context.triggerUid;
                return searchSSArtRelevance(true, parentUid, searchParams, false);
            },
        };
        const args4 = {
            text: "MORESEMSCHOLRELEVANCESEARCH",
            help: "Import more relevant paper search results from Semantic Scholar",
            handler: (context) => () => {
                var searchParams = context.variables.searchParams;
                var parentUid = context.triggerUid;
                return searchSSArtRelevance(true, parentUid, searchParams, true);
            },
        };
        const args5 = {
            text: "REFRESHSEMSCHOLAUTHORSEARCH",
            help: "Refresh author search results from Semantic Scholar",
            handler: (context) => () => {
                var searchParams = context.variables.searchParams;
                var parentUid = context.triggerUid;
                return searchSSAutName(true, parentUid, searchParams, false);
            },
        };
        const args6 = {
            text: "MORESEMSCHOLAUTHORSEARCH",
            help: "Import more author search results from Semantic Scholar",
            handler: (context) => () => {
                var searchParams = context.variables.searchParams;
                var parentUid = context.triggerUid;
                return searchSSAutName(true, parentUid, searchParams, true);
            },
        };

        if (window.roamjs?.extension?.smartblocks) {
            window.roamjs.extension.smartblocks.registerCommand(args);
            window.roamjs.extension.smartblocks.registerCommand(args1);
            window.roamjs.extension.smartblocks.registerCommand(args2);
            window.roamjs.extension.smartblocks.registerCommand(args2a);
            window.roamjs.extension.smartblocks.registerCommand(args3);
            window.roamjs.extension.smartblocks.registerCommand(args4);
            window.roamjs.extension.smartblocks.registerCommand(args5);
            window.roamjs.extension.smartblocks.registerCommand(args6);
        } else {
            sbLoadedHandler = function () {
                if (window.roamjs?.extension?.smartblocks) {
                    window.roamjs.extension.smartblocks.registerCommand(args);
                    window.roamjs.extension.smartblocks.registerCommand(args1);
                    window.roamjs.extension.smartblocks.registerCommand(args2);
                    window.roamjs.extension.smartblocks.registerCommand(args2a);
                    window.roamjs.extension.smartblocks.registerCommand(args3);
                    window.roamjs.extension.smartblocks.registerCommand(args4);
                    window.roamjs.extension.smartblocks.registerCommand(args5);
                    window.roamjs.extension.smartblocks.registerCommand(args6);
                }
            };
            document.body.addEventListener("roamjs:smartblocks:loaded", sbLoadedHandler);
        }

        window.roamSemScholAPI = {
            fetchArticleMetadata: fetchSSArtM,
            fetchAuthorMetadata: fetchSSAutM,
            searchAuthorName: searchSSAutName,
        }

        // Extension Tools API — exposes Semantic Scholar capabilities to Chief of Staff
        window.RoamExtensionTools = window.RoamExtensionTools || {};
        window.RoamExtensionTools["semantic-scholar"] = {
            name: "Semantic Scholar",
            version: "1.0",
            tools: [
                {
                    name: "ss_search_papers",
                    description: "Search for academic papers by relevance query. Returns paper titles, authors, year, citation counts, abstracts, and identifiers.",
                    readOnly: true,
                    parameters: {
                        type: "object",
                        properties: {
                            query: { type: "string", description: "Search query text." },
                            year: { type: "string", description: "Year or range, e.g. '2020', '2020-2024'." },
                            fields_of_study: { type: "string", description: "Comma-separated fields, e.g. 'Medicine,Education'." },
                            open_access: { type: "boolean", description: "Only return open access papers." },
                            min_citations: { type: "number", description: "Minimum citation count filter." },
                            venue: { type: "string", description: "Filter by venue name, e.g. 'Nature'." },
                            max_results: { type: "number", description: "Max papers to return. Default 10." }
                        },
                        required: ["query"]
                    },
                    execute: async (args) => {
                        var query = args.query;
                        var limit = args.max_results || 10;
                        if (!query) return { error: "query parameter is required." };
                        var url = "https://api.semanticscholar.org/graph/v1/paper/search?query=" + encodeURIComponent(query);
                        if (args.year) url += "&year=" + encodeURIComponent(args.year);
                        if (args.fields_of_study) url += "&fieldsOfStudy=" + encodeURIComponent(args.fields_of_study);
                        if (args.open_access) url += "&openAccessPdf";
                        if (args.min_citations) url += "&minCitationCount=" + args.min_citations;
                        if (args.venue) url += "&venue=" + encodeURIComponent(args.venue);
                        url += "&limit=" + limit;
                        url += "&fields=paperId,corpusId,title,year,authors,authors.authorId,authors.name,venue,journal,abstract,citationCount,referenceCount,influentialCitationCount,isOpenAccess,openAccessPdf,publicationDate,publicationTypes,externalIds,url,citationStyles";
                        var result = await ssApiFetch(url, apiKey);
                        if (!result.ok) return { error: result.error };
                        var papers = (result.data.data || []).map(function (p) {
                            return {
                                paperId: p.paperId,
                                corpusId: p.corpusId,
                                title: p.title,
                                year: p.year,
                                authors: (p.authors || []).map(function (a) { return { authorId: a.authorId, name: a.name }; }),
                                venue: p.venue,
                                journal: p.journal,
                                abstract: p.abstract,
                                citationCount: p.citationCount,
                                referenceCount: p.referenceCount,
                                influentialCitationCount: p.influentialCitationCount,
                                isOpenAccess: p.isOpenAccess,
                                publicationDate: p.publicationDate,
                                publicationTypes: p.publicationTypes,
                                url: p.url,
                                externalIds: p.externalIds
                            };
                        });
                        return { papers: papers, total: result.data.total || 0 };
                    }
                },
                {
                    name: "ss_get_paper",
                    description: "Get detailed metadata for a single academic paper by identifier. Accepts Semantic Scholar PaperId, CorpusId:123, DOI:10.xxx, arXiv:xxx, PMID:xxx, or ACL:xxx.",
                    readOnly: true,
                    parameters: {
                        type: "object",
                        properties: {
                            id: { type: "string", description: "Paper identifier, e.g. 'CorpusId:12345', 'DOI:10.1000/xyz', 'arXiv:2301.00001', or a raw Semantic Scholar PaperId." }
                        },
                        required: ["id"]
                    },
                    execute: async (args) => {
                        var id = args.id;
                        if (!id) return { error: "id parameter is required." };
                        var url = "https://api.semanticscholar.org/graph/v1/paper/" + encodeURIComponent(id) + "?fields=paperId,corpusId,title,year,authors,authors.authorId,authors.name,authors.affiliations,venue,journal,abstract,citationCount,referenceCount,influentialCitationCount,isOpenAccess,openAccessPdf,publicationDate,publicationTypes,externalIds,url,citationStyles,fieldsOfStudy,s2FieldsOfStudy,tldr";
                        var result = await ssApiFetch(url, apiKey);
                        if (!result.ok) return { error: result.error };
                        var p = result.data;
                        return {
                            paperId: p.paperId,
                            corpusId: p.corpusId,
                            title: p.title,
                            year: p.year,
                            authors: (p.authors || []).map(function (a) { return { authorId: a.authorId, name: a.name, affiliations: a.affiliations }; }),
                            venue: p.venue,
                            journal: p.journal,
                            abstract: p.abstract,
                            citationCount: p.citationCount,
                            referenceCount: p.referenceCount,
                            influentialCitationCount: p.influentialCitationCount,
                            isOpenAccess: p.isOpenAccess,
                            openAccessPdf: p.openAccessPdf,
                            publicationDate: p.publicationDate,
                            publicationTypes: p.publicationTypes,
                            externalIds: p.externalIds,
                            url: p.url,
                            fieldsOfStudy: p.fieldsOfStudy,
                            tldr: p.tldr,
                            citationStyles: p.citationStyles
                        };
                    }
                },
                {
                    name: "ss_search_authors",
                    description: "Search for academic authors by name. Returns author names, affiliations, paper counts, citation counts, and h-index.",
                    readOnly: true,
                    parameters: {
                        type: "object",
                        properties: {
                            query: { type: "string", description: "Author name to search for." },
                            max_results: { type: "number", description: "Max authors to return. Default 10." }
                        },
                        required: ["query"]
                    },
                    execute: async (args) => {
                        var query = args.query;
                        var limit = args.max_results || 10;
                        if (!query) return { error: "query parameter is required." };
                        var url = "https://api.semanticscholar.org/graph/v1/author/search?query=" + encodeURIComponent(query);
                        url += "&limit=" + limit;
                        url += "&fields=name,affiliations,homepage,paperCount,citationCount,hIndex,externalIds";
                        var result = await ssApiFetch(url, apiKey);
                        if (!result.ok) return { error: result.error };
                        var authors = (result.data.data || []).map(function (a) {
                            return {
                                authorId: a.authorId,
                                name: a.name,
                                affiliations: a.affiliations,
                                homepage: a.homepage,
                                paperCount: a.paperCount,
                                citationCount: a.citationCount,
                                hIndex: a.hIndex,
                                externalIds: a.externalIds
                            };
                        });
                        return { authors: authors, total: result.data.total || 0 };
                    }
                },
                {
                    name: "ss_get_author",
                    description: "Get detailed metadata for a single academic author by their Semantic Scholar author ID.",
                    readOnly: true,
                    parameters: {
                        type: "object",
                        properties: {
                            author_id: { type: "string", description: "Semantic Scholar author ID." },
                            include_papers: { type: "boolean", description: "Include the author's papers list. Default false." }
                        },
                        required: ["author_id"]
                    },
                    execute: async (args) => {
                        var authorId = args.author_id;
                        if (!authorId) return { error: "author_id parameter is required." };
                        var fields = "name,url,authorId,affiliations,homepage,citationCount,hIndex,externalIds";
                        if (args.include_papers) {
                            fields += ",papers,papers.paperId,papers.corpusId,papers.title,papers.year,papers.authors,papers.citationCount,papers.venue,papers.url";
                        }
                        var url = "https://api.semanticscholar.org/graph/v1/author/" + encodeURIComponent(authorId) + "?fields=" + fields;
                        var result = await ssApiFetch(url, apiKey);
                        if (!result.ok) return { error: result.error };
                        var a = result.data;
                        var output = {
                            authorId: a.authorId,
                            name: a.name,
                            url: a.url,
                            affiliations: a.affiliations,
                            homepage: a.homepage,
                            citationCount: a.citationCount,
                            hIndex: a.hIndex,
                            externalIds: a.externalIds
                        };
                        if (args.include_papers && a.papers) {
                            output.papers = a.papers.map(function (p) {
                                return {
                                    paperId: p.paperId,
                                    corpusId: p.corpusId,
                                    title: p.title,
                                    year: p.year,
                                    authors: (p.authors || []).map(function (au) { return { authorId: au.authorId, name: au.name }; }),
                                    citationCount: p.citationCount,
                                    venue: p.venue,
                                    url: p.url
                                };
                            });
                        }
                        return output;
                    }
                },
                {
                    name: "ss_get_recommendations",
                    description: "Get recommended academic papers based on a given paper. Uses Semantic Scholar's recommendation engine.",
                    readOnly: true,
                    parameters: {
                        type: "object",
                        properties: {
                            paper_id: { type: "string", description: "Semantic Scholar PaperId of the source paper." },
                            max_results: { type: "number", description: "Max recommendations to return. Default 10." }
                        },
                        required: ["paper_id"]
                    },
                    execute: async (args) => {
                        var paperId = args.paper_id;
                        var limit = args.max_results || 10;
                        if (!paperId) return { error: "paper_id parameter is required." };
                        var url = "https://api.semanticscholar.org/recommendations/v1/papers/forpaper/" + encodeURIComponent(paperId) + "?fields=paperId,corpusId,title,year,authors,authors.authorId,authors.name,venue,journal,abstract,citationCount,referenceCount,influentialCitationCount,isOpenAccess,openAccessPdf,publicationDate,publicationTypes,externalIds,url,citationStyles";
                        url += "&limit=" + limit;
                        var result = await ssApiFetch(url, apiKey);
                        if (!result.ok) return { error: result.error };
                        var recs = (result.data.recommendedPapers || []).map(function (p) {
                            return {
                                paperId: p.paperId,
                                corpusId: p.corpusId,
                                title: p.title,
                                year: p.year,
                                authors: (p.authors || []).map(function (a) { return { authorId: a.authorId, name: a.name }; }),
                                venue: p.venue,
                                journal: p.journal,
                                abstract: p.abstract,
                                citationCount: p.citationCount,
                                referenceCount: p.referenceCount,
                                influentialCitationCount: p.influentialCitationCount,
                                isOpenAccess: p.isOpenAccess,
                                publicationDate: p.publicationDate,
                                url: p.url,
                                externalIds: p.externalIds
                            };
                        });
                        return { recommendations: recs };
                    }
                },
                {
                    name: "ss_import_paper",
                    description: "Import an academic paper into the Roam graph. Creates a new page with full article metadata (authors, abstract, references, citations, etc.).",
                    readOnly: false,
                    parameters: {
                        type: "object",
                        properties: {
                            id: { type: "string", description: "Paper identifier — a Semantic Scholar CorpusId (numeric), DOI, arXiv ID, or PaperId." },
                            parent_uid: { type: "string", description: "Block UID to import under. If omitted, creates a block on today's daily page." }
                        },
                        required: ["id"]
                    },
                    execute: async (args) => {
                        var id = args.id;
                        if (!id) return { error: "id parameter is required." };
                        // Determine the corpus ID for duplicate check
                        var corpusIdForCheck = null;
                        if (/^\d+$/.test(id)) {
                            corpusIdForCheck = id;
                        } else {
                            // Fetch paper first to get corpusId
                            var lookupUrl = "https://api.semanticscholar.org/graph/v1/paper/" + encodeURIComponent(id) + "?fields=corpusId";
                            var lookupResult = await ssApiFetch(lookupUrl, apiKey);
                            if (!lookupResult.ok) return { error: lookupResult.error };
                            corpusIdForCheck = lookupResult.data.corpusId;
                        }
                        // Check for existing import
                        if (corpusIdForCheck != null) {
                            var existing = window.roamAlphaAPI.q(
                                '[:find ?e :where [?e :block/string "**Corpus ID:** ' + corpusIdForCheck + '"]]'
                            );
                            if (existing != null && existing.length > 0) {
                                return { error: "Paper already imported (Corpus ID: " + corpusIdForCheck + ").", existing: true };
                            }
                        }
                        // Get or create a parent block
                        var parentUid = args.parent_uid;
                        if (!parentUid) {
                            var today = window.roamAlphaAPI.util.dateToPageUid(new Date());
                            parentUid = window.roamAlphaAPI.util.generateUID();
                            await window.roamAlphaAPI.createBlock({
                                location: { "parent-uid": today, order: "last" },
                                block: { uid: parentUid, string: "Loading...", open: true }
                            });
                        }
                        try {
                            await fetchSSArtM(true, corpusIdForCheck || id, parentUid);
                            return { success: true, message: "Paper imported successfully." };
                        } catch (err) {
                            return { error: "Import failed: " + (err.message || String(err)) };
                        }
                    }
                },
                {
                    name: "ss_import_author",
                    description: "Import an academic author into the Roam graph. Creates a new page with author metadata (affiliations, papers, citation count, h-index, etc.).",
                    readOnly: false,
                    parameters: {
                        type: "object",
                        properties: {
                            author_id: { type: "string", description: "Semantic Scholar author ID." },
                            parent_uid: { type: "string", description: "Block UID to import under. If omitted, creates a block on today's daily page." }
                        },
                        required: ["author_id"]
                    },
                    execute: async (args) => {
                        var authorId = args.author_id;
                        if (!authorId) return { error: "author_id parameter is required." };
                        // Check for existing import
                        var safeAuthorId = String(authorId).replace(/"/g, '\\"');
                        var existing = window.roamAlphaAPI.q(
                            '[:find ?e :where [?e :block/string "**Author ID:** ' + safeAuthorId + '"]]'
                        );
                        if (existing != null && existing.length > 0) {
                            return { error: "Author already imported (Author ID: " + authorId + ").", existing: true };
                        }
                        // Get or create a parent block
                        var parentUid = args.parent_uid;
                        if (!parentUid) {
                            var today = window.roamAlphaAPI.util.dateToPageUid(new Date());
                            parentUid = window.roamAlphaAPI.util.generateUID();
                            await window.roamAlphaAPI.createBlock({
                                location: { "parent-uid": today, order: "last" },
                                block: { uid: parentUid, string: "Loading...", open: true }
                            });
                        }
                        try {
                            await fetchSSAutM(true, authorId, parentUid);
                            return { success: true, message: "Author imported successfully." };
                        } catch (err) {
                            return { error: "Import failed: " + (err.message || String(err)) };
                        }
                    }
                }
            ]
        };

        // the actual functions to get data from Semantic Scholar
        async function fetchSSArtM(sb, corpus, parentUid) {
            var searchQuery, finalSearchQuery;
            var blocks = [];
            if (sb == true) {
                finalSearchQuery = "CorpusId:" + corpus;
            } else {
                let string = "Please enter an article ID";
                let selectString = "<select><option value=\"\">Select</option><option value=\"CorpusId\">Semantic Scholar CorpusId</option><option value=\"PaperId\">Semantic Scholar PaperId</option><option value=\"DOI\">DOI</option><option value=\"ACL\">Association for Computational Linguistics ID</option><option value=\"arXiv\">arXiv ID</option><option value=\"MAG\">Microsoft Academic Graph ID</option><option value=\"PMID\">PubMed ID</option><option value=\"PMCID\">PubMed Central ID</option>";
                selectString += "</select>";
                searchQuery = await prompt(string, selectString, 3);
                if (searchQuery != "cancelled") {
                    searchQuery = searchQuery.split("-");
                    if (searchQuery[1] == "PaperId") {
                        finalSearchQuery = searchQuery[0];
                    } else {
                        finalSearchQuery = searchQuery[1] + ":" + searchQuery[0];
                    }
                }
            }

            if (searchQuery == "cancelled") {
                blocks.push({ "text": "Search cancelled" });
            } else {
                // create the API url, only calling data where required 
                let ssUrl = "https://api.semanticscholar.org/graph/v1/paper/" + finalSearchQuery + "?&fields=paperId,corpusId,url,title,venue,publicationVenue,publicationDate,year,isOpenAccess,openAccessPdf,fieldsOfStudy,s2FieldsOfStudy,citationStyles,embedding,tldr";

                if (journalOrder != "Hide") {
                    ssUrl += ",journal"
                }
                if (articleTypeOrder != "Hide") {
                    ssUrl += ",publicationTypes"
                }
                if (authorsOrder != "Hide") {
                    ssUrl += ",authors,authors.authorId,authors.externalIds,authors.url,authors.name,authors.affiliations,authors.homepage,authors.paperCount,authors.citationCount,authors.hIndex";
                }
                if (referencesOrder != "Hide") {
                    ssUrl += ",referenceCount,references,references.paperId,references.corpusId,references.url,references.title,references.venue,references.publicationVenue,references.year,references.authors,references.externalIds,references.abstract,references.referenceCount,references.citationCount,references.influentialCitationCount,references.isOpenAccess,references.openAccessPdf,references.fieldsOfStudy,references.s2FieldsOfStudy,references.publicationTypes,references.publicationDate,references.journal,references.citationStyles"
                }
                if (citationsOrder != "Hide") {
                    ssUrl += ",citationCount,citations,citations.paperId,citations.corpusId,citations.url,citations.title,citations.venue,citations.publicationVenue,citations.year,citations.authors,citations.externalIds,citations.abstract,citations.referenceCount,citations.citationCount,citations.influentialCitationCount,citations.isOpenAccess,citations.openAccessPdf,citations.fieldsOfStudy,citations.s2FieldsOfStudy,citations.publicationTypes,citations.publicationDate,citations.journal,citations.citationStyles"
                }
                if (infCitationsOrder != "Hide") {
                    ssUrl += ",influentialCitationCount"
                }
                if (abstractOrder != "Hide") {
                    ssUrl += ",abstract"
                }
                if (sourcesOrder != "Hide") {
                    ssUrl += ",externalIds"
                }

                var myHeaders = new Headers();
                var fetchOptions = {};
                if (apiKey != undefined && apiKey != null) {
                    myHeaders.append("x-api-key", apiKey);
                    fetchOptions = {
                        method: 'GET',
                        headers: myHeaders,
                    };
                }

                await fetchRetry(ssUrl, parentUid, 10000, 10, fetchOptions).then(async (article) => {
                    if (!article) { blocks.push({ "text": "Too many requests" }); return; }
                    if (article.status == 200) {
                        let data = await article.json();
                        var title = data.title;
                        var citekey = data.citationStyles.bibtex;
                        var publicationDate;
                        if (data.hasOwnProperty("publicationDate") && data.publicationDate != null) {
                            publicationDate = data.publicationDate;
                        }
                        var url = data.url;
                        var isOpenAccess = data.isOpenAccess;
                        var openAccessPdf;
                        if (data.hasOwnProperty("openAccessPdf") && data.openAccessPdf != null && data.openAccessPdf.hasOwnProperty("url")) {
                            openAccessPdf = data.openAccessPdf.url;
                        }

                        var children = [];
                        if (journalOrder != "Hide") {
                            var journalName, journalVol, journalPage, pages;
                            if (data.journal != null && data.journal.hasOwnProperty("name")) {
                                journalName = data.journal.name;
                                if (data.journal.hasOwnProperty("volume")) {
                                    journalVol = data.journal.volume;
                                    journalVol = journalVol.split(" ");
                                    if (journalVol.length > 1) {
                                        journalVol = journalVol[0] + "(" + journalVol[1] + ")";
                                    }
                                }
                                if (data.journal.hasOwnProperty("pages")) {
                                    journalPage = data.journal.pages;
                                    pages = journalPage.replace(" - ", "-");
                                    pages = journalPage.replace("\n", "");
                                    pages = pages.trim();
                                }
                                var year
                                if (publicationDate != undefined) {
                                    year = publicationDate.split("-")[0];
                                }
                                var journalString = "[[" + toTitleCase(journalName) + "]]";
                                if (year != undefined) {
                                    journalString += " " + year + "";
                                }
                                if (journalVol != undefined) {
                                    journalString += "; " + journalVol + "";
                                }
                                if (pages != undefined) {
                                    journalString += ":" + pages + "";
                                }
                                if (isOpenAccess) {
                                    if (data.externalIds.hasOwnProperty("DOI")) {
                                        journalString += "  ![[](https://raw.githubusercontent.com/mlava/semantic-scholar/main/openAccess.png)[🔗](https://doi.org/" + data.externalIds.DOI + ") #semSchol";
                                    } else {
                                        journalString += "  ![[](https://raw.githubusercontent.com/mlava/semantic-scholar/main/openAccess.png)[🔗](" + url + ") #semSchol";
                                    }
                                    if (openAccessPdf != undefined) {
                                        journalString += "  ![[](https://raw.githubusercontent.com/mlava/semantic-scholar/main/pdf.png)[🔗](" + openAccessPdf + ")";
                                    }
                                }
                                children[journalOrder - 1] = { "text": journalString, };
                            }
                        }
                        if (articleTypeOrder != "Hide") {
                            var publicationTypes = data.publicationTypes;
                            if (publicationTypes != null) {
                                var typeString = "**Type:** ";
                                for (var i = 0; i < publicationTypes.length; i++) {
                                    if (publicationTypes[i] == "JournalArticle") {
                                        typeString += "[[Journal Article]] ";
                                    } else {
                                        typeString += "[[" + publicationTypes[i] + "]] ";
                                    }
                                };
                                children[articleTypeOrder - 1] = { "text": typeString, };
                            }
                        }
                        if (authorsOrder != "Hide") {
                            var authors = data.authors;
                            var authorsBlock = [];
                            var authorLookup = buildAuthorIdLookup();
                            for (var i = 0; i < authors.length; i++) {
                                var authorString = "";
                                var matchedAuthorPage = authorLookup[String(authors[i].authorId)];
                                if (matchedAuthorPage) {
                                    authorString = "[[" + matchedAuthorPage + "]]";
                                } else {
                                    if (window.roamjs?.extension?.smartblocks) {
                                        authorString = "" + authors[i].name + "  {{Import:SmartBlock:SemanticScholarAuthor:authorId=" + authors[i].authorId + "}}";
                                    } else {
                                        authorsBlock.push({ "text": "" + authors[i].name + "" });
                                    }
                                }
                                authorsBlock.push({ "text": authorString, });
                            }
                            children[authorsOrder - 1] = { "text": "**Authors:** (" + authors.length + ")", "children": authorsBlock };
                        }
                        var corpusLookup = (referencesOrder != "Hide" || citationsOrder != "Hide") ? buildCorpusIdLookup() : {};
                        if (referencesOrder != "Hide") {
                            var referenceCount = data.referenceCount;
                            var references = data.references;
                            var referencesBlock = [];
                            for (var i = 0; i < references.length; i++) {
                                var refTitle = "";
                                var matchedRefPage = corpusLookup[String(references[i].corpusId)];
                                if (matchedRefPage) {
                                    refTitle = "[[" + matchedRefPage + "]]";
                                } else {
                                    refTitle = references[i].title;
                                    if (references[i].isOpenAccess) {
                                        refTitle += "  ![](https://raw.githubusercontent.com/mlava/semantic-scholar/main/openAccess.png) #semSchol";
                                    }
                                    if (window.roamjs?.extension?.smartblocks) {
                                        refTitle += "  {{Import:SmartBlock:SemanticScholarArticle:corpusId=" + references[i].corpusId + "}}";
                                    }
                                }
                                referencesBlock.push({ "text": refTitle });
                            }
                            children[referencesOrder - 1] = { "text": "**References:** (" + referenceCount + ")", "children": referencesBlock };
                        }
                        if (citationsOrder != "Hide") {
                            var citationCount = data.citationCount;
                            var citations = data.citations;
                            var citationsBlock = [];
                            for (var i = 0; i < citations.length; i++) {
                                var citTitle = "";
                                var matchedCitPage = corpusLookup[String(citations[i].corpusId)];
                                if (matchedCitPage) {
                                    citTitle = "[[" + matchedCitPage + "]]";
                                } else {
                                    citTitle = citations[i].title;
                                    if (citations[i].isOpenAccess) {
                                        citTitle += "  ![](https://raw.githubusercontent.com/mlava/semantic-scholar/main/openAccess.png) #semSchol";
                                    }
                                    if (window.roamjs?.extension?.smartblocks) {
                                        citTitle += "  {{Import:SmartBlock:SemanticScholarArticle:corpusId=" + citations[i].corpusId + "}}";
                                    }
                                }
                                citationsBlock.push({ "text": citTitle });
                            }
                            children[citationsOrder - 1] = { "text": "**Citations:** (" + citationCount + ")", "children": citationsBlock };
                        }
                        if (infCitationsOrder != "Hide") {
                            var influentialCitationCount = data.influentialCitationCount;
                            children[infCitationsOrder - 1] = { "text": "**Influential Citations:** " + influentialCitationCount + "", };
                        }
                        if (sourcesOrder != "Hide") {
                            var externalLinks = "[Semantic Scholar](" + url + ")";
                            if (data.externalIds.hasOwnProperty("DOI")) {
                                externalLinks += "  ~  [DOI](https://doi.org/" + data.externalIds.DOI + ")";
                            }
                            if (data.externalIds.hasOwnProperty("PubMed")) {
                                externalLinks += "  ~  [PubMed](https://pubmed.ncbi.nlm.nih.gov/" + data.externalIds.PubMed + ")";
                            }
                            if (data.externalIds.hasOwnProperty("ArXiv")) {
                                externalLinks += "  ~  [ArXiv](https://arxiv.org/abs/" + data.externalIds.ArXiv + ")";
                            }
                            children[sourcesOrder - 1] = { "text": externalLinks, };
                        }
                        if (abstractOrder != "Hide") {
                            if (data.hasOwnProperty("abstract") && data.abstract != null) {
                                var abstract = data.abstract;
                                if (abstract != undefined) {
                                    children[abstractOrder - 1] = { "text": "**Abstract:**", "children": [{ "text": abstract, }], };
                                }
                            }
                        }

                        children.splice(97, 0, { "text": "**Paper ID:** " + data.paperId, });
                        children.splice(98, 0, { "text": "**Corpus ID:** " + data.corpusId, });
                        if (window.roamjs?.extension?.smartblocks) {
                            var recsTitle = "**Recommendations:** {{Import Recommendations:SmartBlock:SemanticScholarRecommended:searchParams=" + data.paperId + "}}";
                            children.splice(99, 0, {
                                "text": recsTitle
                            });
                        }

                        // finally, create the blocks object and send for block creation
                        blocks.push({ "text": "**" + title + "**" + citekey + "**" + data.corpusId, "children": children });
                    } else if (article.status == 404) {
                        blocks.push({ "text": "Article not found" });
                    } else {
                        blocks.push({ "text": "Semantic Scholar returned an error (status " + article.status + ")" });
                    }
                });
            }

            var page, newPageName, newPageName1, newPageUid, string, newCorpId;
            newPageName = blocks[0].text.toString();
            newPageName1 = newPageName;

            if (newPageName == "Search cancelled") {
                string = "You cancelled the search";
                prompt(string, null, 5, 2000);
            } else if (newPageName == "Article not found") {
                string = "No articles with this identifier were found";
                prompt(string, null, 5, 3000);
            } else if (newPageName == "Too many requests") {
                if (sb) {
                    var originalBlockString = await window.roamAlphaAPI.data.pull("[:block/string]", [":block/uid", parentUid])[":block/string"];
                    var newString = originalBlockString + "{{Import:SmartBlock:SemanticScholarArticle:corpus=" + corpus + "}}";
                    await window.roamAlphaAPI.updateBlock(
                        { block: { uid: parentUid, string: newString.toString(), open: true } });
                }
                string = "There was an error calling the Semantic Scholar API.\nYou might be calling the API too often.\nTry to space out your requests.";
                prompt(string, null, 5, 5000);
            } else if (newPageName == "Unknown error. Error sent to browser console.") {
                prompt(newPageName, null, 5, 3000);
            } else if (newPageName.startsWith("Semantic Scholar returned an error")) {
                prompt(newPageName, null, 5, 3000);
            } else {
                if (newPage != false || corpus != undefined) { // create (or update) an individual page for the article
                    if (newPageName.includes("**")) {
                        newCorpId = newPageName.split("**")[3];
                        if (newPageTitle == "name") {
                            newPageName = newPageName.split("**")[1];
                        } else if (newPageTitle == "citekey") {
                            newPageName = newPageName.split("**")[2];
                            newPageName = newPageName.split("{")[1];
                            newPageName = newPageName.split(",")[0];
                            newPageName = "@" + newPageName;
                        }
                    }

                    var safePageName = newPageName.replace(/"/g, '\\"');
                    page = await window.roamAlphaAPI.q(`
                    [:find ?e
                        :where [?e :node/title "${safePageName}"]]`);
                    var matchingPages;

                    var corpId, titleUid;
                    var overwrite = false;
                    var firstBlock = blocks[0].text.split("**")[1];
                    newPageUid = roamAlphaAPI.util.generateUID();
                    if (page.length < 1) { // create new page
                        await window.roamAlphaAPI.createPage({ page: { title: newPageName, uid: newPageUid } });
                        await window.roamAlphaAPI.updateBlock(
                            { block: { uid: parentUid, string: "[[" + newPageName + "]]".toString(), open: true } });
                        parentUid = roamAlphaAPI.util.generateUID();
                        await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newPageUid, order: 0 }, block: { string: "**" + firstBlock + "**".toString(), uid: parentUid } });
                        blocks = blocks[0].children;
                        await createBlocks(blocks, parentUid);
                    } else { // there's already a page with that name
                        matchingPages = await window.roamAlphaAPI.data.pull("[:block/string :block/uid {:block/children ...}]", [":node/title", newPageName]);
                        newPageUid = matchingPages[":block/uid"];
                        newPageName1 = newPageName1.split("@")[0];
                        if (matchingPages.hasOwnProperty(":block/children")) { // already some children here
                            for (var i = 0; i < matchingPages[":block/children"].length; i++) {
                                if (matchingPages[":block/children"][i][":block/string"] == newPageName1) {
                                    titleUid = matchingPages[":block/children"][i][":block/uid"].toString();
                                }
                            };
                            for (var i = 0; i < matchingPages[":block/children"][0][":block/children"].length; i++) {
                                let blockString = matchingPages[":block/children"][0][":block/children"][i][":block/string"].toString();
                                if (blockString.startsWith("**Corpus ID:**")) {
                                    corpId = matchingPages[":block/children"][0][":block/children"][i][":block/string"].toString();
                                    corpId = corpId.split("**Corpus ID:**");
                                    corpId = corpId[1].trim();
                                }
                            };
                        } else { // no article data on matching page title
                            await window.roamAlphaAPI.updateBlock(
                                { block: { uid: parentUid, string: "[[" + newPageName + "]]".toString(), open: true } });
                            parentUid = roamAlphaAPI.util.generateUID();
                            await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newPageUid, order: 0 }, block: { string: "**" + firstBlock + "**".toString(), uid: parentUid } });
                            blocks = blocks[0].children;
                            await createBlocks(blocks, parentUid);
                        }

                        if (corpId != undefined) {
                            if (corpId != newCorpId) { // same page name but different corpus ID = new article
                                newPageName = newPageName + " ~ " + newCorpId;
                                newPageUid = roamAlphaAPI.util.generateUID();
                                await window.roamAlphaAPI.createPage({ page: { title: newPageName, uid: newPageUid } });
                                await window.roamAlphaAPI.updateBlock(
                                    { block: { uid: parentUid, string: "[[" + newPageName + "]]".toString(), open: true } });
                                parentUid = roamAlphaAPI.util.generateUID();
                                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newPageUid, order: 0 }, block: { string: "**" + firstBlock + "**".toString(), uid: parentUid } });
                                blocks = blocks[0].children;
                                await createBlocks(blocks, parentUid);
                            } else { // same name, same corpus ID = same article
                                var string = "This article is already in your graph. Would you like to update the data?"
                                overwrite = await prompt(string, null, 1, null);

                                if (overwrite) { // overwrite existing data on the article page
                                    await window.roamAlphaAPI.updateBlock(
                                        { block: { uid: parentUid, string: "[[" + newPageName + "]]".toString(), open: true } });
                                    if (titleUid != undefined) {
                                        parentUid = titleUid;
                                    }
                                    // delete current children and replace with new data
                                    blocks = blocks[0].children;
                                    var headerString = "**Recommendations:**";
                                    var longHeaderString = "**Recommendations:** {{Import Recommendations:SmartBlock";
                                    for (var i = 0; i < matchingPages[":block/children"].length; i++) {
                                        if (matchingPages[":block/children"][i][":block/uid"] == parentUid) {
                                            for (var j = 0; j < matchingPages[":block/children"][i][":block/children"].length; j++) {
                                                if (matchingPages[":block/children"][i][":block/children"][j][":block/string"].startsWith(headerString)) {
                                                    if (matchingPages[":block/children"][i][":block/children"][j][":block/string"].startsWith(longHeaderString)) {
                                                        await window.roamAlphaAPI.deleteBlock({ block: { uid: matchingPages[":block/children"][i][":block/children"][j][":block/uid"] } });
                                                    } else { // we want to keep this block and not put a new Recommendations block and SB button in place
                                                        for (var k = 0; k < blocks.length; k++) {
                                                            var blockString = blocks[k].text.toString();
                                                            if (blockString.startsWith(longHeaderString)) {
                                                                blocks.splice(k, 1);
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    await window.roamAlphaAPI.deleteBlock({ block: { uid: matchingPages[":block/children"][i][":block/children"][j][":block/uid"] } });
                                                }
                                            }
                                        }
                                    }
                                    await createBlocks(blocks, parentUid);
                                    overwrite = false;
                                }
                            }
                        }
                    }
                } else { // import article data in focused block within current page
                    var firstBlock = blocks[0].text.split("**")[1];
                    await window.roamAlphaAPI.updateBlock(
                        { block: { uid: parentUid, string: "**" + firstBlock + "**".toString(), open: true } });
                    blocks = blocks[0].children;
                    await createBlocks(blocks, parentUid);
                }

                if (sb != false) {
                    await window.roamAlphaAPI.ui.rightSidebar.addWindow({ window: { type: 'outline', 'block-uid': newPageUid } });
                } else if (newPage) {
                    await window.roamAlphaAPI.ui.mainWindow.openBlock({ block: { uid: newPageUid } });
                }
            }
            if (sb) {
                return '';
            }
        }

        async function fetchSSAutM(sb, authorId, parentUid) {
            var searchQuery, finalSearchQuery, authorIdString;
            var blocks = [];
            if (sb == true) {
                finalSearchQuery = authorId;
            } else {
                let string = "Please enter a Semantic Scholar author ID";
                searchQuery = await prompt(string, null, 2);
                if (searchQuery != "cancelled") {
                    finalSearchQuery = searchQuery;
                }
            }

            if (searchQuery == "cancelled") {
                blocks.push({ "text": "Search cancelled" });
            } else {
                // create the API url, only calling data where required 
                let ssUrl = "https://api.semanticscholar.org/graph/v1/author/" + finalSearchQuery + "?&fields=name,url,authorId";

                if (affiliationsOrder != "Hide") {
                    ssUrl += ",affiliations";
                }
                if (authorsLinksOrder != "Hide") {
                    ssUrl += ",externalIds";
                }
                if (homepageOrder != "Hide") {
                    ssUrl += ",homepage";
                }
                if (citationCountOrder != "Hide") {
                    ssUrl += ",citationCount";
                }
                if (hIndexOrder != "Hide") {
                    ssUrl += ",hIndex";
                }
                if (papersOrder != "Hide") {
                    ssUrl += ",papers,papers.paperId,papers.corpusId,papers.url,papers.title,papers.venue,papers.publicationVenue,papers.year,papers.authors,papers.externalIds,papers.abstract,papers.referenceCount,papers.citationCount,papers.influentialCitationCount,papers.isOpenAccess,papers.openAccessPdf,papers.fieldsOfStudy,papers.s2FieldsOfStudy,papers.publicationTypes,papers.publicationDate,papers.journal,papers.citationStyles"
                }

                var myHeaders = new Headers();
                var fetchOptions = {};
                if (apiKey != undefined && apiKey != null) {
                    myHeaders.append("x-api-key", apiKey);
                    fetchOptions = {
                        method: 'GET',
                        headers: myHeaders,
                    };
                }

                await fetchRetry(ssUrl, parentUid, 10000, 10, fetchOptions).then(async (author) => {
                    if (!author) { blocks.push({ "text": "Too many requests" }); return; }
                    if (author.status == 200) {
                        let data = await author.json();
                        var name = data.name.toString();
                        var url = data.url;

                        var children = [];
                        if (affiliationsOrder != "Hide") {
                            var affiliations = data.affiliations;
                            if (affiliations.length > 0) {
                                var affiliationsString = "**Affiliations:** ";
                                for (var i = 0; i < affiliations.length; i++) {
                                    affiliationsString += "[[" + affiliations[i] + "]] ";
                                };
                                children[affiliationsOrder - 1] = { "text": affiliationsString, };
                            }
                        }
                        if (authorsLinksOrder != "Hide") {
                            var externalIds = data.externalIds;
                            var externalIdsString = "[Semantic Scholar](" + url + ")";
                            if (externalIds.hasOwnProperty("DBLP")) {
                                for (var i = 0; i < externalIds.DBLP.length; i++) {
                                    var string = encodeURIComponent(externalIds.DBLP[i]);
                                    externalIdsString += " ~ [" + externalIds.DBLP[i] + "](https://dblp.org/search/author?q=" + string + ")";
                                }
                            }
                            if (externalIds.hasOwnProperty("ORCID")) {
                                externalIdsString += " ~ [ORCID](https://orcid.org/" + externalIds.ORCID[0] + ")";
                            }
                            children[authorsLinksOrder - 1] = { "text": externalIdsString, };
                        }
                        if (homepageOrder != "Hide") {
                            var homepage;
                            if (data.homepage != null) {
                                homepage = data.homepage;
                                var homepageString = "**Home Page:** ";
                                homepageString += "![](" + homepage + ") ";
                                children[homepageOrder - 1] = { "text": homepageString, };
                            }
                        }
                        if (citationCountOrder != "Hide") {
                            var citationCount = data.citationCount;
                            var citationCountString = "**Citation Count:** " + citationCount + "";
                            children[citationCountOrder - 1] = { "text": citationCountString, };
                        }
                        if (hIndexOrder != "Hide") {
                            var hIndex = data.hIndex;
                            var hIndexString = "**h-Index:** " + hIndex + "";
                            children[hIndexOrder - 1] = { "text": hIndexString, };
                        }
                        if (papersOrder != "Hide" && data.papers.length > 0) {
                            var papersCount = data.papers.length;
                            var papers = data.papers;
                            var papersBlock = [];
                            var papersCorpusLookup = buildCorpusIdLookup();
                            for (var i = 0; i < papers.length; i++) {
                                var paperTitle = "";
                                var matchedPaperPage = papersCorpusLookup[String(papers[i].corpusId)];
                                if (matchedPaperPage) {
                                    paperTitle = "[[" + matchedPaperPage + "]]";
                                } else {
                                    paperTitle = papers[i].title;
                                    if (papers[i].isOpenAccess) {
                                        paperTitle += "  ![](https://raw.githubusercontent.com/mlava/semantic-scholar/main/openAccess.png) #semSchol";
                                    }
                                    if (window.roamjs?.extension?.smartblocks) {
                                        paperTitle += "  {{Import:SmartBlock:SemanticScholarArticle:corpusId=" + papers[i].corpusId + "}}";
                                    }
                                }
                                papersBlock.push({ "text": paperTitle });
                            }
                            children[papersOrder - 1] = { "text": "**Papers:** (" + papersCount + ")", "children": papersBlock, };
                        }
                        authorIdString = "**Author ID:** " + data.authorId;
                        children.splice(99, 0, { "text": "**Author ID:** " + data.authorId, });

                        // finally, create the blocks object and send for block creation
                        blocks.push({ "text": "**" + name + "**" + data.authorId, "children": children });
                    } else if (author.status == 404) {
                        blocks.push({ "text": "Author not found" });
                    } else {
                        blocks.push({ "text": "Semantic Scholar returned an error (status " + author.status + ")" });
                    }
                })
            }

            var page, newPageName, newPageUid, string, newAuthId;
            newPageName = blocks[0].text.toString();

            if (newPageName == "Search cancelled") {
                string = "You cancelled the search";
                prompt(string, null, 5, 2000);
            } else if (newPageName == "Author not found") {
                string = "No authors with this identifier were found";
                prompt(string, null, 5, 3000);
            } else if (newPageName == "Too many requests") {
                if (sb) {
                    var originalBlockString = await window.roamAlphaAPI.data.pull("[:block/string]", [":block/uid", parentUid])[":block/string"];
                    var newString = originalBlockString + "{{Import:SmartBlock:SemanticScholarAuthor:author=" + authorId + "}}";
                    await window.roamAlphaAPI.updateBlock(
                        { block: { uid: parentUid, string: newString.toString(), open: true } });
                }
                string = "There was an error calling the Semantic Scholar API.\nYou might be calling the API too often.\nTry to space out your requests.";
                prompt(string, null, 5, 5000);
            } else if (newPageName == "Unknown error. Error sent to browser console.") {
                prompt(newPageName, null, 5, 3000);
            } else if (newPageName.startsWith("Semantic Scholar returned an error")) {
                prompt(newPageName, null, 5, 3000);
            } else {
                if (newPageName.includes("**")) {
                    newAuthId = newPageName.split("**")[2];
                    newPageName = newPageName.split("**")[1];
                }

                // create (or update) the author page
                var safePageName = newPageName.replace(/"/g, '\\"');
                page = await window.roamAlphaAPI.q(`
                    [:find ?e
                        :where [?e :node/title "${safePageName}"]]`);
                var matchingPages;
                var authId, titleUid;
                var overwrite = false;
                var firstBlock = newPageName;
                newPageUid = roamAlphaAPI.util.generateUID();
                if (page.length < 1) { // create new page as no current page 
                    await window.roamAlphaAPI.createPage({ page: { title: newPageName, uid: newPageUid } });
                    await window.roamAlphaAPI.updateBlock(
                        { block: { uid: parentUid, string: "[[" + newPageName + "]]".toString(), open: true } });
                    parentUid = roamAlphaAPI.util.generateUID();
                    await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newPageUid, order: 0 }, block: { string: "**" + firstBlock + "**".toString(), uid: parentUid } });
                    blocks = blocks[0].children;
                    await createBlocks(blocks, parentUid);
                } else { // there's already a page with this author name
                    matchingPages = await window.roamAlphaAPI.data.pull("[:block/string :block/uid {:block/children ...}]", [":node/title", newPageName]);
                    newPageUid = matchingPages[":block/uid"];
                    if (matchingPages.hasOwnProperty(":block/children")) { // already some children here, so check if contains author metadata
                        for (var i = 0; i < matchingPages[":block/children"].length; i++) {
                            if (matchingPages[":block/children"][i][":block/string"] == "**" + newPageName + "**") {
                                titleUid = matchingPages[":block/children"][i][":block/uid"].toString();
                            }
                        };
                        for (var i = 0; i < matchingPages[":block/children"][0][":block/children"].length; i++) {
                            let blockString = matchingPages[":block/children"][0][":block/children"][i][":block/string"].toString();
                            if (blockString.startsWith("**Author ID:**")) {
                                authId = matchingPages[":block/children"][0][":block/children"][i][":block/string"].toString();
                                authId = authId.split("**Author ID:**");
                                authId = authId[1].trim();
                            }
                        };
                    } else { // no block data on matching page title, so just write the author metadata
                        await window.roamAlphaAPI.updateBlock(
                            { block: { uid: parentUid, string: "[[" + newPageName + "]]".toString(), open: true } });
                        parentUid = roamAlphaAPI.util.generateUID();
                        await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newPageUid, order: 0 }, block: { string: "**" + firstBlock + "**".toString(), uid: parentUid } });
                        blocks = blocks[0].children;
                        await createBlocks(blocks, parentUid);
                    }

                    if (authId != undefined) {
                        if (authId != newAuthId) { // same page name but different author ID = new author
                            newPageName = newPageName + " ~ " + newAuthId;
                            newPageUid = roamAlphaAPI.util.generateUID();
                            await window.roamAlphaAPI.createPage({ page: { title: newPageName, uid: newPageUid } });
                            await window.roamAlphaAPI.updateBlock(
                                { block: { uid: parentUid, string: "[[" + newPageName + "]]".toString(), open: true } });
                            parentUid = roamAlphaAPI.util.generateUID();
                            await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newPageUid, order: 0 }, block: { string: "**" + firstBlock + "**".toString(), uid: parentUid } });
                            blocks = blocks[0].children;
                            await createBlocks(blocks, parentUid);
                        } else { // same name, same author ID = same author
                            var string = "This author is already in your graph. Would you like to update their data?"
                            overwrite = await prompt(string, null, 1, null);

                            if (overwrite) { // overwrite existing data on the article page
                                await window.roamAlphaAPI.updateBlock(
                                    { block: { uid: parentUid, string: "[[" + newPageName + "]]".toString(), open: true } });
                                if (titleUid != undefined) {
                                    parentUid = titleUid;
                                }
                                // delete current children and replace with new data
                                for (var i = 0; i < matchingPages[":block/children"].length; i++) {
                                    if (matchingPages[":block/children"][i][":block/uid"] == parentUid) {
                                        for (var j = 0; j < matchingPages[":block/children"][i][":block/children"].length; j++) {
                                            await window.roamAlphaAPI.deleteBlock({ block: { uid: matchingPages[":block/children"][i][":block/children"][j][":block/uid"] } });
                                        }
                                    }
                                }
                                blocks = blocks[0].children;
                                await createBlocks(blocks, parentUid);
                                overwrite = false;
                            }
                        }
                    }
                }

                if (sb != false) {
                    await window.roamAlphaAPI.ui.rightSidebar.addWindow({ window: { type: 'outline', 'block-uid': newPageUid } });
                } else {
                    await window.roamAlphaAPI.ui.mainWindow.openBlock({ block: { uid: newPageUid } });
                }
            }
            if (sb) {
                return '';
            }
        }

        async function searchSSRecommended(sb, parentUid, searchParams, refresh) {
            var finalSearchQuery;
            var blocks = [];
            if (sb) {
                finalSearchQuery = searchParams;
            } else {
                let searchPrompt = "Please enter an article's Paper Id from Semantic Scholar";
                finalSearchQuery = await prompt(searchPrompt, null, 2);
            }

            if (finalSearchQuery == "cancelled") {
                blocks.push({ "text": "Search cancelled" });
            } else if (finalSearchQuery.length < 1) {
                blocks.push({ "text": "Empty search string" });
            } else {
                // create the API url
                let ssUrl = "https://api.semanticscholar.org/recommendations/v1/papers/forpaper/" + finalSearchQuery + "?fields=paperId,corpusId,url,title,venue,publicationVenue,year,authors,externalIds,abstract,referenceCount,citationCount,influentialCitationCount,isOpenAccess,openAccessPdf,fieldsOfStudy,s2FieldsOfStudy,publicationTypes,publicationDate,journal,citationStyles";
                ssUrl += "&limit=" + recRelNumber;

                var recBlocks = [];
                var myHeaders = new Headers();
                var fetchOptions = {};
                if (apiKey != undefined && apiKey != null) {
                    myHeaders.append("x-api-key", apiKey);
                    fetchOptions = {
                        method: 'GET',
                        headers: myHeaders,
                    };
                }

                await fetchRetry(ssUrl, parentUid, 10000, 10, fetchOptions).then(async (articles) => {
                    if (!articles) { blocks.push({ "text": "Too many requests" }); return; }
                    if (articles.status == 200) {
                        let data = await articles.json();
                        var recommendations = data.recommendedPapers;
                        var limit = recRelNumber;
                        if (recommendations.length < recRelNumber) {
                            limit = recommendations.length;
                        }
                        var recCorpusLookup = buildCorpusIdLookup();
                        for (var i = 0; i < limit; i++) {
                            var recTitle = "";
                            var matchedRecPage = recCorpusLookup[String(recommendations[i].corpusId)];
                            if (matchedRecPage) {
                                recTitle = "[[" + matchedRecPage + "]]";
                            } else {
                                recTitle = recommendations[i].title;
                                if (recommendations[i].isOpenAccess) {
                                    recTitle += "  ![](https://raw.githubusercontent.com/mlava/semantic-scholar/main/openAccess.png) #semSchol";
                                }
                                if (window.roamjs?.extension?.smartblocks) {
                                    recTitle += "  {{Import:SmartBlock:SemanticScholarArticle:corpusId=" + recommendations[i].corpusId + "}}";
                                }
                            }
                            recBlocks.push({ "text": recTitle });
                        }
                        if (sb) {
                            blocks.push({ "text": "button press", "children": recBlocks });
                        } else {
                            var blockHeader = "**Recommended Papers for Article with PaperId:** " + finalSearchQuery + "";
                            if (window.roamjs?.extension?.smartblocks) {
                                blockHeader += "  {{Refresh:SmartBlock:RefreshSemanticScholarRecommendations:searchParams=" + finalSearchQuery + "}}";
                            }
                            blocks.push({ "text": blockHeader, "children": recBlocks });
                        }
                    } else if (articles.status == 404) {
                        blocks.push({ "text": "Article not found" });
                    } else {
                        blocks.push({ "text": "Semantic Scholar returned an error (status " + articles.status + ")" });
                    }
                });
            }

            var newPageName, string;
            newPageName = blocks[0].text.toString();

            if (newPageName == "Search cancelled") {
                string = "You cancelled the search";
                prompt(string, null, 5, 2000);
            } else if (newPageName == "Article not found") {
                string = "No articles with this identifier were found";
                prompt(string, null, 5, 3000);
            } else if (newPageName == "Too many requests") {
                if (sb) {
                    var originalBlockString = await window.roamAlphaAPI.data.pull("[:block/string]", [":block/uid", parentUid])[":block/string"];
                    var newString = originalBlockString + "  {{Import:SmartBlock:SemanticScholarRecommended:searchParams=" + finalSearchQuery + "}}";
                    await window.roamAlphaAPI.updateBlock(
                        { block: { uid: parentUid, string: newString.toString(), open: true } });
                }
                string = "There was an error calling the Semantic Scholar API.\nYou might be calling the API too often.\nTry to space out your requests.";
                prompt(string, null, 5, 5000);
            } else if (newPageName == "Unknown error. Error sent to browser console.") {
                prompt(newPageName, null, 5, 3000);
            } else if (newPageName.startsWith("Semantic Scholar returned an error")) {
                prompt(newPageName, null, 5, 3000);
            } else if (newPageName.startsWith("**Recommended Papers for Article with PaperId:**")) {
                var header = "**Recommended Papers for Article with PaperId:** " + finalSearchQuery + "";
                if (window.roamjs?.extension?.smartblocks) {
                    header += "  {{Refresh:SmartBlock:RefreshSemanticScholarRecommendations:searchParams=" + finalSearchQuery + "}}";
                }
                await window.roamAlphaAPI.updateBlock(
                    { block: { uid: parentUid, string: header, open: true } });
                // import article data as children of current block
                await createBlocks(blocks[0].children, parentUid);
            } else if (newPageName == "button press") {
                var header = "**Recommended Papers for Article with PaperId:** " + finalSearchQuery + "";
                if (window.roamjs?.extension?.smartblocks) {
                    header += "  {{Refresh:SmartBlock:RefreshSemanticScholarRecommendations:searchParams=" + finalSearchQuery + "}}";
                }
                await window.roamAlphaAPI.updateBlock(
                    { block: { uid: parentUid, string: header, open: true } });
                if (refresh) {
                    // delete current children if refreshing
                    var currentChildren = await window.roamAlphaAPI.data.pull("[:block/string :block/uid {:block/children ...}]", [":block/uid", parentUid]);
                    for (var i = 0; i < currentChildren[":block/children"].length; i++) {
                        await window.roamAlphaAPI.deleteBlock({ block: { uid: currentChildren[":block/children"][i][":block/uid"] } });
                    }
                }
                // import recommendations as children of recommendations block
                await createBlocks(blocks[0].children, parentUid);
            }
            if (sb) {
                return '';
            }
        }

        async function searchSSArtRelevance(sb, parentUid, searchParams, more) {
            var searchQuery, finalSearchQuery, yearsSearch, openAccessSearch, openAccessPDFSearch, offset, minCitationCount, venue;
            var blocks = [];
            if (sb) {
                searchQuery = searchParams.split("++")
                if (searchQuery[1] != undefined) {
                    finalSearchQuery = searchQuery[0];
                    if (searchQuery[1] != "null") {
                        yearsSearch = searchQuery[1];
                    }
                    if (searchQuery[2] != "null") {
                        minCitationCount = searchQuery[2];
                    }
                    if (searchQuery[3] != "null") {
                        venue = searchQuery[3];
                    }
                    if (searchQuery[4] != "null" && searchQuery[4] == "Open Access") {
                        openAccessSearch = true;
                    }
                    if (searchQuery[5] != "null" && searchQuery[5] == "Open Access PDF") {
                        openAccessPDFSearch = true;
                    }
                    if (more) {
                        offset = searchQuery[6];
                    }
                } else {
                    finalSearchQuery = searchQuery;
                }
            } else {
                let promptString = "Please enter a search string";
                searchQuery = await prompt(promptString, null, 6);
                if (searchQuery != "cancelled" && searchQuery[0].length > 0) {
                    finalSearchQuery = searchQuery[0];
                    if (searchQuery[1] != undefined) {
                        yearsSearch = searchQuery[1];
                    }
                    if (searchQuery[2] != undefined) {
                        minCitationCount = searchQuery[2];
                    }
                    if (searchQuery[3] != undefined) {
                        venue = searchQuery[3];
                    }
                    openAccessSearch = searchQuery[4];
                    openAccessPDFSearch = searchQuery[5];
                }
            }
            if (more) {
                var parents = await window.roamAlphaAPI.data.pull("[:block/string :block/uid {:block/parents ...}]", [":block/uid", parentUid]);
                await window.roamAlphaAPI.deleteBlock({ block: { uid: parentUid } });
                for (var i = 0; i < parents[":block/parents"].length; i++) {
                    if (parents[":block/parents"][i][":block/string"] != undefined) {
                        var parentString = parents[":block/parents"][i][":block/string"].toString();
                        if (parentString.startsWith("**Relevant Papers for search:**")) {
                            parentUid = parents[":block/parents"][i][":block/uid"];
                        }
                    }
                }
            }

            if (searchQuery == "cancelled") {
                blocks.push({ "text": "Search cancelled" });
            } else if (searchQuery[0].length < 1) {
                blocks.push({ "text": "Empty search string" });
            } else {
                // create the API url, only calling data where required 
                let ssUrl = "https://api.semanticscholar.org/graph/v1/paper/search?query=" + finalSearchQuery;
                if (yearsSearch != undefined) {
                    ssUrl += "&year=" + yearsSearch;
                }
                if (offset != undefined) {
                    ssUrl += "&offset=" + offset;
                }
                if (minCitationCount != undefined) {
                    ssUrl += "&minCitationCount=" + minCitationCount;
                }
                if (venue != undefined) {
                    ssUrl += "&venue=" + venue;
                }
                if (recRelFOS != undefined) {
                    ssUrl += "&fieldsOfStudy=" + recRelFOS;
                }
                if (openAccessSearch) {
                    ssUrl += "&openAccess";
                }
                if (openAccessPDFSearch) {
                    ssUrl += "&openAccessPdf";
                }
                if (recRelNumber != undefined) {
                    ssUrl += "&limit=" + recRelNumber;
                }
                ssUrl += "&fields=";

                if (journalOrder != "Hide") {
                    ssUrl += "journal,"
                }
                if (articleTypeOrder != "Hide") {
                    ssUrl += "publicationTypes,"
                }
                if (authorsOrder != "Hide") {
                    ssUrl += "authors,authors.authorId,authors.externalIds,authors.url,authors.name,authors.affiliations,authors.homepage,authors.paperCount,authors.citationCount,authors.hIndex,";
                }
                if (infCitationsOrder != "Hide") {
                    ssUrl += "influentialCitationCount,"
                }
                if (abstractOrder != "Hide") {
                    ssUrl += "abstract,"
                }
                if (sourcesOrder != "Hide") {
                    ssUrl += "externalIds,"
                }
                if (ssUrl.charAt(ssUrl.length - 1) === ',') {
                    ssUrl = ssUrl.slice(0, -1);
                }
                ssUrl += ",corpusId,title,year,citationCount";

                var myHeaders = new Headers();
                var fetchOptions = {};
                if (apiKey != undefined && apiKey != null) {
                    myHeaders.append("x-api-key", apiKey);
                    fetchOptions = {
                        method: 'GET',
                        headers: myHeaders,
                    };
                }

                var recBlocks = [];
                await fetchRetry(ssUrl, parentUid, 10000, 10, fetchOptions).then(async (article) => {
                    if (!article) { blocks.push({ "text": "Too many requests" }); return; }
                    if (article.status == 200) {
                        let list = await article.json();
                        var blockHeader = "";
                        var searchParams = "";

                        if (list.total != 0) {
                            var recommendations = list.data;
                            var limit = recRelNumber;
                            if (list.total < recRelNumber) {
                                limit = list.total;
                            }
                            var relCorpusLookup = buildCorpusIdLookup();
                            for (var i = 0; i < limit; i++) {
                                var recTitle = "";
                                var matchedRelPage = relCorpusLookup[String(recommendations[i].corpusId)];
                                if (matchedRelPage) {
                                    recTitle = "[[" + matchedRelPage + "]]";
                                } else {
                                    recTitle = recommendations[i].title;
                                    recTitle += ", " + recommendations[i].year;
                                    if (recommendations[i].journal != null) {
                                        if (recommendations[i].journal.hasOwnProperty("name")) {
                                            recTitle += ", " + recommendations[i].journal.name + "";
                                        }
                                    }
                                    if (recommendations[i].citationCount == 1) {
                                        recTitle += ", " + recommendations[i].citationCount + " citation";
                                    } else {
                                        recTitle += ", " + recommendations[i].citationCount + " citations";
                                    }
                                    if (recommendations[i].influentialCitationCount == 1) {
                                        recTitle += ", " + recommendations[i].influentialCitationCount + " influential citation";
                                    } else {
                                        recTitle += ", " + recommendations[i].influentialCitationCount + " influential citations";
                                    }
                                    if (recommendations[i].isOpenAccess) {
                                        recTitle += "  ![](https://raw.githubusercontent.com/mlava/semantic-scholar/main/openAccess.png) #semSchol";
                                    }
                                    if (window.roamjs?.extension?.smartblocks) {
                                        recTitle += "  {{Import:SmartBlock:SemanticScholarArticle:corpusId=" + recommendations[i].corpusId + "}}";
                                    }
                                }
                                recBlocks.push({ "text": recTitle });
                            }
                            blockHeader += "**Relevant Papers for search:** " + searchQuery[0] + "";
                            searchParams += searchQuery[0];
                            if (yearsSearch != undefined) {
                                blockHeader += "," + yearsSearch;
                                searchParams += "++" + yearsSearch;
                            } else {
                                searchParams += "++null";
                            }
                            if (minCitationCount != undefined) {
                                blockHeader += "," + minCitationCount;
                                searchParams += "++" + minCitationCount;
                            } else {
                                searchParams += "++null";
                            }
                            if (venue != undefined) {
                                blockHeader += "," + venue;
                                searchParams += "++" + venue;
                            } else {
                                searchParams += "++null";
                            }
                            if (openAccessSearch) {
                                blockHeader += ",Open Access";
                                searchParams += "++Open Access";
                            } else {
                                searchParams += "++null";
                            }
                            if (openAccessPDFSearch) {
                                blockHeader += ",Open Access PDF";
                                searchParams += "++Open Access PDF";
                            } else {
                                searchParams += "++null";
                            }
                            if (window.roamjs?.extension?.smartblocks) {
                                blockHeader += "  {{Refresh:SmartBlock:RefreshSemanticScholarRelevanceSearch:searchParams=" + searchParams + "}}";
                            }

                            searchParams += "++" + list.next;
                            recBlocks.push({ "text": "{{Import More:SmartBlock:MoreSemanticScholarRelevanceSearch:searchParams=" + searchParams + "}}" });
                            blocks.push({ "text": blockHeader, "children": recBlocks });
                        } else {
                            blocks.push({ "text": "No relevant papers were found for this search! Consider broadening your Fields of Study in Roam Depot settings, ensuring Fields of Study list in settings is a comma separated list without spaces (e.g. __Medicine,Physics__ NOT __Medicine, Physics__), reducing the minimum citation count, expanding the year range or removing requirements for Open Access or Open Access PDF." });
                        }
                    } else if (article.status == 404) {
                        blocks.push({ "text": "No articles were found" });
                    } else {
                        blocks.push({ "text": "Semantic Scholar returned an error (status " + article.status + ")" });
                    }
                });
            }

            var newPageName, string;
            newPageName = blocks[0].text.toString();

            if (newPageName == "Search cancelled") {
                string = "You cancelled the search";
                prompt(string, null, 5, 2000);
            } else if (newPageName == "Empty search string") {
                string = "Please make sure to enter a search string in the required field";
                prompt(string, null, 5, 3000);
            } else if (newPageName == "No articles were found") {
                string = "No articles were found matching these criteria";
                prompt(string, null, 5, 3000);
            } else if (newPageName == "Too many requests") {
                string = "There was an error calling the Semantic Scholar API.\nYou might be calling the API too often.\nTry to space out your requests.";
                prompt(string, null, 5, 5000);
            } else if (newPageName == "Unknown error. Error sent to browser console.") {
                prompt(newPageName, null, 5, 3000);
            } else {
                await window.roamAlphaAPI.updateBlock(
                    { block: { uid: parentUid, string: blocks[0].text.toString(), open: true } });
                if (sb && !more) {
                    // delete the list below this parent
                    var currentChildren = await window.roamAlphaAPI.data.pull("[:block/string :block/uid {:block/children ...}]", [":block/uid", parentUid]);
                    for (var i = 0; i < currentChildren[":block/children"].length; i++) {
                        await window.roamAlphaAPI.deleteBlock({ block: { uid: currentChildren[":block/children"][i][":block/uid"] } });
                    }
                }
                if (blocks[0].hasOwnProperty("children")) {
                    blocks = blocks[0].children;
                    for (var i = 0; i < blocks.length; i++) {
                        var uid = roamAlphaAPI.util.generateUID();
                        var order = i + (offset != undefined ? parseInt(offset) : 0);
                        await window.roamAlphaAPI.createBlock({
                            location: {
                                "parent-uid": parentUid,
                                "order": order,
                            },
                            block: {
                                uid,
                                string: blocks[i].text
                            }
                        });
                    }
                }
            }

            if (sb) {
                return '';
            }
        }

        async function searchSSArtTitle(parentUid) {
            var searchQuery, finalSearchQuery, yearsSearch, openAccessSearch, openAccessPDFSearch, offset, minCitationCount, venue;
            var blocks = [];

            let promptString = "Please enter a title string to search for";
            searchQuery = await prompt(promptString, null, 6);
            if (searchQuery != "cancelled" && searchQuery[0].length > 0) {
                finalSearchQuery = searchQuery[0];
                if (searchQuery[1] != undefined) {
                    yearsSearch = searchQuery[1];
                }
                if (searchQuery[2] != undefined) {
                    minCitationCount = searchQuery[2];
                }
                if (searchQuery[3] != undefined) {
                    venue = searchQuery[3];
                }
                openAccessSearch = searchQuery[4];
                openAccessPDFSearch = searchQuery[5];
            }

            if (searchQuery == "cancelled") {
                blocks.push({ "text": "Search cancelled" });
            } else if (searchQuery[0].length < 1) {
                blocks.push({ "text": "Empty search string" });
            } else {
                // create the API url, only calling data where required 
                let ssUrl = "https://api.semanticscholar.org/graph/v1/paper/search/match?query=" + finalSearchQuery;
                if (yearsSearch != undefined) {
                    ssUrl += "&year=" + yearsSearch;
                }
                if (offset != undefined) {
                    ssUrl += "&offset=" + offset;
                }
                if (minCitationCount != undefined) {
                    ssUrl += "&minCitationCount=" + minCitationCount;
                }
                if (venue != undefined) {
                    ssUrl += "&venue=" + venue;
                }
                if (recRelFOS != undefined) {
                    ssUrl += "&fieldsOfStudy=" + recRelFOS;
                }
                if (openAccessSearch) {
                    ssUrl += "&openAccess";
                }
                if (openAccessPDFSearch) {
                    ssUrl += "&openAccessPdf";
                }
                ssUrl += "&fields=";

                if (journalOrder != "Hide") {
                    ssUrl += "journal,"
                }
                if (articleTypeOrder != "Hide") {
                    ssUrl += "publicationTypes,"
                }
                if (authorsOrder != "Hide") {
                    ssUrl += "authors,authors.authorId,authors.externalIds,authors.url,authors.name,authors.affiliations,authors.homepage,authors.paperCount,authors.citationCount,authors.hIndex,";
                }
                if (infCitationsOrder != "Hide") {
                    ssUrl += "influentialCitationCount,"
                }
                if (abstractOrder != "Hide") {
                    ssUrl += "abstract,"
                }
                if (sourcesOrder != "Hide") {
                    ssUrl += "externalIds,"
                }
                if (ssUrl.charAt(ssUrl.length - 1) === ',') {
                    ssUrl = ssUrl.slice(0, -1);
                }
                ssUrl += ",corpusId,title,year";

                var myHeaders = new Headers();
                var fetchOptions = {};
                if (apiKey != undefined && apiKey != null) {
                    myHeaders.append("x-api-key", apiKey);
                    fetchOptions = {
                        method: 'GET',
                        headers: myHeaders,
                    };
                }
                var recBlocks = [];
                await fetchRetry(ssUrl, parentUid, 10000, 10, fetchOptions).then(async (article) => {
                    if (!article) { blocks.push({ "text": "Too many requests" }); return; }
                    if (article.status == 200) {
                        let list = await article.json();
                        var blockHeader = "";
                        if (list.data.length > 0) {
                            var recTitle = "";
                            var titleCorpusLookup = buildCorpusIdLookup();
                            var matchedTitlePage = titleCorpusLookup[String(list.data[0].corpusId)];
                            if (matchedTitlePage) {
                                recTitle = "[[" + matchedTitlePage + "]]";
                            } else {
                                recTitle = list.data[0].title;
                                if (list.data[0].isOpenAccess) {
                                    recTitle += "  ![](https://raw.githubusercontent.com/mlava/semantic-scholar/main/openAccess.png) #semSchol";
                                }
                                if (window.roamjs?.extension?.smartblocks) {
                                    recTitle += "  {{Import:SmartBlock:SemanticScholarArticle:corpusId=" + list.data[0].corpusId + "}}";
                                }
                            }
                            recBlocks.push({ "text": recTitle });

                            blockHeader += "**Best title match for search:** " + searchQuery[0] + "";
                            if (yearsSearch != undefined) {
                                blockHeader += "," + yearsSearch;
                            }
                            if (minCitationCount != undefined) {
                                blockHeader += "," + minCitationCount;
                            }
                            if (venue != undefined) {
                                blockHeader += "," + venue;
                            }
                            if (openAccessSearch) {
                                blockHeader += ",Open Access";
                            }
                            if (openAccessPDFSearch) {
                                blockHeader += ",Open Access PDF";
                            }
                            blocks.push({ "text": blockHeader, "children": recBlocks });
                        } else {
                            blocks.push({ "text": "No relevant papers were found for this search! Consider broadening your Fields of Study in Roam Depot settings, ensuring Fields of Study list in settings is a comma separated list without spaces (e.g. __Medicine,Physics__ NOT __Medicine, Physics__), reducing the minimum citation count, expanding the year range or removing requirements for Open Access or Open Access PDF." });
                        }
                    } else if (article.status == 404) {
                        blocks.push({ "text": "No articles were found" });
                    } else {
                        blocks.push({ "text": "Semantic Scholar returned an error (status " + article.status + ")" });
                    }
                });
            }

            var newPageName, string;
            newPageName = blocks[0].text.toString();

            if (newPageName == "Search cancelled") {
                string = "You cancelled the search";
                prompt(string, null, 5, 2000);
            } else if (newPageName == "Empty search string") {
                string = "Please make sure to enter a search string in the required field";
                prompt(string, null, 5, 3000);
            } else if (newPageName == "No articles were found") {
                string = "No articles were found matching these criteria";
                prompt(string, null, 5, 3000);
            } else if (newPageName == "Too many requests") {
                string = "There was an error calling the Semantic Scholar API.\nYou might be calling the API too often.\nTry to space out your requests.";
                prompt(string, null, 5, 5000);
            } else if (newPageName == "Unknown error. Error sent to browser console.") {
                prompt(newPageName, null, 5, 3000);
            } else {
                await window.roamAlphaAPI.updateBlock(
                    { block: { uid: parentUid, string: blocks[0].text.toString(), open: true } });
                if (blocks[0].hasOwnProperty("children")) {
                    await createBlocks(blocks[0].children, parentUid);
                }
            }
        }

        async function searchSSAutName(sb, parentUid, searchParams, more, api, articleTitle) {
            var searchQuery, finalSearchQuery, offset;
            var blocks = [];
            if (sb || api) {
                searchQuery = searchParams.split("++")
                if (searchQuery[1] != undefined) {
                    finalSearchQuery = searchQuery[0];
                    if (more) {
                        offset = searchQuery[1];
                    }
                } else {
                    finalSearchQuery = searchQuery;
                }
            } else {
                let promptString = "Please enter an author name";
                searchQuery = await prompt(promptString, null, 7);
                if (searchQuery != "cancelled" && searchQuery.length > 0) {
                    finalSearchQuery = searchQuery;
                }
            }
            if (more) {
                var parents = await window.roamAlphaAPI.data.pull("[:block/string :block/uid {:block/parents ...}]", [":block/uid", parentUid]);
                await window.roamAlphaAPI.deleteBlock({ block: { uid: parentUid } });
                for (var i = 0; i < parents[":block/parents"].length; i++) {
                    if (parents[":block/parents"][i][":block/string"] != undefined) {
                        var parentString = parents[":block/parents"][i][":block/string"].toString();
                        if (parentString.startsWith("**Authors for search:**")) {
                            parentUid = parents[":block/parents"][i][":block/uid"];
                        }
                    }
                }
            }

            if (searchQuery == "cancelled") {
                blocks.push({ "text": "Search cancelled" });
            } else if (searchQuery[0].length < 1) {
                blocks.push({ "text": "Empty search string" });
            } else {
                // create the API url, only calling data where required 
                let ssUrl = "https://api.semanticscholar.org/graph/v1/author/search?query=" + finalSearchQuery;

                if (offset != undefined) {
                    ssUrl += "&offset=" + offset;
                }
                if (authorsNumber != undefined) {
                    ssUrl += "&limit=" + authorsNumber;
                }
                ssUrl += "&fields=";
                if (api) {
                    ssUrl += "papers.title,";
                }
                if (affiliationsOrder != "Hide") {
                    ssUrl += "affiliations,";
                }
                if (authorsLinksOrder != "Hide") {
                    ssUrl += "externalIds,";
                }
                if (homepageOrder != "Hide") {
                    ssUrl += "homepage,";
                }
                if (citationCountOrder != "Hide") {
                    ssUrl += "citationCount,";
                }
                if (hIndexOrder != "Hide") {
                    ssUrl += "hIndex,";
                }
                if (papersOrder != "Hide") {
                    ssUrl += "papers,papers.paperId,papers.corpusId,papers.url,papers.title,papers.venue,papers.publicationVenue,papers.year,papers.authors,papers.externalIds,papers.abstract,papers.referenceCount,papers.citationCount,papers.influentialCitationCount,papers.isOpenAccess,papers.openAccessPdf,papers.fieldsOfStudy,papers.s2FieldsOfStudy,papers.publicationTypes,papers.publicationDate,papers.journal,papers.citationStyles,"
                }
                if (ssUrl.charAt(ssUrl.length - 1) === ',') {
                    ssUrl = ssUrl.slice(0, -1);
                }
                ssUrl += ",name,paperCount";

                var myHeaders = new Headers();
                var fetchOptions = {};
                if (apiKey != undefined && apiKey != null) {
                    myHeaders.append("x-api-key", apiKey);
                    fetchOptions = {
                        method: 'GET',
                        headers: myHeaders,
                    };
                }
                var recBlocks = [];
                var finalAuthorId;
                await fetchRetry(ssUrl, parentUid, 10000, 10, fetchOptions).then(async (author) => {
                    if (!author) { blocks.push({ "text": "Too many requests" }); return; }
                    if (author.status == 200) {
                        let list = await author.json();
                        var blockHeader = "";
                        var searchParams = "";

                        if (list.total != 0) {
                            var authors = list.data;
                            var limit = authorsNumber;
                            if (list.total < authorsNumber) {
                                limit = list.total;
                            }
                            var searchAuthorLookup = buildAuthorIdLookup();
                            for (var i = 0; i < limit; i++) {
                                if (api) {
                                    for (var j = 0; j < authors[i].papers.length; j++)
                                        if (authors[i].papers[j].title == articleTitle) {
                                            finalAuthorId = authors[i].authorId;
                                        }
                                }
                                var recTitle = "";
                                var matchedSearchAuthor = searchAuthorLookup[String(authors[i].authorId)];
                                if (matchedSearchAuthor) {
                                    recTitle = "[[" + matchedSearchAuthor + "]]";
                                } else {
                                    recTitle = authors[i].name;
                                    if (affiliationsOrder != "Hide" && authors[i].affiliations.length > 0) {
                                        recTitle += " (" + authors[i].affiliations[0];
                                        for (j = 1; j < authors[i].affiliations.length; j++) {
                                            recTitle += ", " + authors[i].affiliations[j];
                                        }
                                        recTitle += ")";
                                    }
                                    recTitle += ", Papers: " + authors[i].paperCount;
                                    if (citationCountOrder != "Hide") {
                                        recTitle += ", Citations: " + authors[i].citationCount;
                                    }
                                    if (hIndexOrder != "Hide") {
                                        recTitle += ", h-Index: " + authors[i].hIndex;
                                    }
                                    if (window.roamjs?.extension?.smartblocks) {
                                        recTitle += "  {{Import:SmartBlock:SemanticScholarAuthor:authorId=" + authors[i].authorId + "}}";
                                    }
                                }
                                recBlocks.push({ "text": recTitle });
                            }
                            blockHeader += "**Authors for search:** " + finalSearchQuery + "";
                            searchParams += finalSearchQuery;

                            if (window.roamjs?.extension?.smartblocks) {
                                blockHeader += "  {{Refresh:SmartBlock:RefreshSemanticScholarAuthorSearch:searchParams=" + searchParams + "}}";
                            }
                            if (list.hasOwnProperty("next")) {
                                searchParams += "++" + list.next;
                                recBlocks.push({ "text": "{{Import More:SmartBlock:MoreSemanticScholarAuthorSearch:searchParams=" + searchParams + "}}" });
                            }
                            blocks.push({ "text": blockHeader, "children": recBlocks });
                        } else {
                            blocks.push({ "text": "No relevant papers were found for this search! Consider broadening your Fields of Study in Roam Depot settings, ensuring Fields of Study list in settings is a comma separated list without spaces (e.g. __Medicine,Physics__ NOT __Medicine, Physics__), reducing the minimum citation count, expanding the year range or removing requirements for Open Access or Open Access PDF." });
                        }
                    } else if (author.status == 404) {
                        blocks.push({ "text": "No authors were found" });
                    } else {
                        blocks.push({ "text": "Semantic Scholar returned an error (status " + author.status + ")" });
                    }
                });
            }

            var newPageName, string;
            newPageName = blocks[0].text.toString();

            if (api) {
                return finalAuthorId;
            } else if (newPageName == "Search cancelled") {
                string = "You cancelled the search";
                prompt(string, null, 5, 2000);
            } else if (newPageName == "Empty search string") {
                string = "Please make sure to enter a search string in the required field";
                prompt(string, null, 5, 3000);
            } else if (newPageName == "No authors were found") {
                string = "No authors were found matching these criteria";
                prompt(string, null, 5, 3000);
            } else if (newPageName == "Too many requests") {
                string = "There was an error calling the Semantic Scholar API.\nYou might be calling the API too often.\nTry to space out your requests.";
                prompt(string, null, 5, 5000);
            } else if (newPageName == "Unknown error. Error sent to browser console.") {
                prompt(newPageName, null, 5, 3000);
            } else {
                await window.roamAlphaAPI.updateBlock(
                    { block: { uid: parentUid, string: blocks[0].text.toString(), open: true } });
                if (sb && !more) {
                    // delete the list below this parent
                    var currentChildren = await window.roamAlphaAPI.data.pull("[:block/string :block/uid {:block/children ...}]", [":block/uid", parentUid]);
                    for (var i = 0; i < currentChildren[":block/children"].length; i++) {
                        await window.roamAlphaAPI.deleteBlock({ block: { uid: currentChildren[":block/children"][i][":block/uid"] } });
                    }
                }
                if (blocks[0].hasOwnProperty("children")) {
                    blocks = blocks[0].children;
                    for (var i = 0; i < blocks.length; i++) {
                        var uid = roamAlphaAPI.util.generateUID();
                        var order = i + (offset != undefined ? parseInt(offset) : 0);
                        await window.roamAlphaAPI.createBlock({
                            location: {
                                "parent-uid": parentUid,
                                "order": order,
                            },
                            block: {
                                uid,
                                string: blocks[i].text
                            }
                        });
                    }
                }
            }

            if (sb) {
                return '';
            }
        }
    },
    onunload: () => {
        delete window.RoamExtensionTools?.["semantic-scholar"];
        delete window.roamSemScholAPI;
        if (sbLoadedHandler) {
            document.body.removeEventListener("roamjs:smartblocks:loaded", sbLoadedHandler);
            sbLoadedHandler = null;
        }
        // remove SmartBlock definitions onunload
        if (window.roamjs?.extension?.smartblocks) {
            window.roamjs.extension.smartblocks.unregisterCommand("IMPORTARTICLESEMSCHOL");
            window.roamjs.extension.smartblocks.unregisterCommand("IMPORTAUTHORSEMSCHOL");
            window.roamjs.extension.smartblocks.unregisterCommand("RECOMMENDEDSEMSCHOL");
            window.roamjs.extension.smartblocks.unregisterCommand("REFRESHRECOMMENDEDSEMSCHOL");
            window.roamjs.extension.smartblocks.unregisterCommand("REFRESHSEMSCHOLRELEVANCESEARCH");
            window.roamjs.extension.smartblocks.unregisterCommand("MORESEMSCHOLRELEVANCESEARCH");
            window.roamjs.extension.smartblocks.unregisterCommand("REFRESHSEMSCHOLAUTHORSEARCH");
            window.roamjs.extension.smartblocks.unregisterCommand("MORESEMSCHOLAUTHORSEARCH");
        };
    }
}

// helper functions
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function fetchRetry(url, parentUid, delay, tries, fetchOptions) {
    await window.roamAlphaAPI.updateBlock(
        { block: { uid: parentUid, string: "Contacting Semantic Scholar", open: true } });
    async function onError(err) {
        var remaining = tries - 1;
        if (remaining <= 0) {
            await window.roamAlphaAPI.updateBlock(
                { block: { uid: parentUid, string: "Multiple calls to Semantic Scholar failed. Perhaps you have made too many calls in a short time? Maybe try waiting before trying again.", open: true } });
            return;
        }
        await window.roamAlphaAPI.updateBlock(
            { block: { uid: parentUid, string: "Call to Semantic Scholar API failed. Trying again soon...", open: true } });
        return sleep(delay).then(() => fetchRetry(url, parentUid, delay, remaining, fetchOptions));
    }
    return fetch(url, fetchOptions).catch(onError);
}
async function ssApiFetch(url, apiKey, maxRetries = 3, delay = 5000) {
    var headers = new Headers();
    var fetchOptions = {};
    if (apiKey != undefined && apiKey != null) {
        headers.append("x-api-key", apiKey);
        fetchOptions = { method: "GET", headers: headers };
    }
    for (var attempt = 0; attempt < maxRetries; attempt++) {
        try {
            var response = await fetch(url, fetchOptions);
            if (response.status === 200) {
                var data = await response.json();
                return { ok: true, data: data };
            }
            if (response.status === 429) {
                if (attempt < maxRetries - 1) {
                    await sleep(delay);
                    continue;
                }
                return { ok: false, status: 429, error: "Rate limited — too many requests to Semantic Scholar API." };
            }
            return { ok: false, status: response.status, error: "Semantic Scholar API returned status " + response.status };
        } catch (err) {
            if (attempt < maxRetries - 1) {
                await sleep(delay);
                continue;
            }
            return { ok: false, status: 0, error: "Network error contacting Semantic Scholar API." };
        }
    }
    return { ok: false, status: 0, error: "Failed after " + maxRetries + " attempts." };
}
// Batch-lookup helpers: run one Roam query instead of N per-item queries.
// Returns a Map of id → page title for items already imported in the graph.
function buildCorpusIdLookup() {
    var results = window.roamAlphaAPI.q(`
        [:find ?str ?ptitle
         :where
         [?b :block/string ?str]
         [(clojure.string/starts-with? ?str "**Corpus ID:** ")]
         [?b :block/parents ?p]
         [?p :node/title ?ptitle]]`);
    var map = {};
    if (results) {
        for (var i = 0; i < results.length; i++) {
            var idStr = results[i][0].replace("**Corpus ID:** ", "").trim();
            map[idStr] = results[i][1];
        }
    }
    return map;
}
function buildAuthorIdLookup() {
    var results = window.roamAlphaAPI.q(`
        [:find ?str ?ptitle
         :where
         [?b :block/string ?str]
         [(clojure.string/starts-with? ?str "**Author ID:** ")]
         [?b :block/parents ?p]
         [?p :node/title ?ptitle]]`);
    var map = {};
    if (results) {
        for (var i = 0; i < results.length; i++) {
            var idStr = results[i][0].replace("**Author ID:** ", "").trim();
            map[idStr] = results[i][1];
        }
    }
    return map;
}
async function prompt(string, selectString, type, duration) {
    if (type == 1) {
        return new Promise((resolve) => {
            iziToast.question({
                theme: 'light',
                color: 'black',
                layout: 2,
                class: 'semantic-scholar',
                drag: false,
                timeout: false,
                close: false,
                overlay: true,
                title: "Semantic Scholar",
                message: string,
                position: 'center',
                buttons: [
                    ['<button>Yes</button>', function (instance, toast, button, e, inputs) {
                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                        resolve(true);
                    }, false], // true to focus
                    [
                        "<button>No</button>",
                        function (instance, toast, button, e) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve(false);
                        },
                    ],
                ]
            });
        })
    } else if (type == 2) {
        return new Promise((resolve) => {
            iziToast.question({
                theme: 'light',
                color: 'black',
                layout: 2,
                class: 'semantic-scholar',
                drag: false,
                timeout: false,
                close: false,
                overlay: true,
                displayMode: 2,
                id: "question",
                title: "Semantic Scholar",
                message: string,
                position: "center",
                onClosed: function () { resolve("cancelled") },
                inputs: [
                    [
                        '<input type="text" placeholder="">',
                        "keyup",
                        function (instance, toast, input, e) {
                            if (e.code === "Enter") {
                                instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                                resolve(e.srcElement.value);
                            }
                        },
                        true,
                    ],
                ],
                buttons: [
                    [
                        "<button><b>Confirm</b></button>",
                        async function (instance, toast, button, e, inputs) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve(inputs[0].value);
                        },
                        false,
                    ],
                    [
                        "<button>Cancel</button>",
                        async function (instance, toast, button, e) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve("cancelled");
                        },
                    ],
                ],
            });
        })
    } else if (type == 3) {
        return new Promise((resolve) => {
            iziToast.question({
                theme: 'light',
                color: 'black',
                layout: 2,
                class: 'semantic-scholar',
                drag: false,
                timeout: false,
                close: true,
                overlay: true,
                title: "Semantic Scholar",
                message: string,
                position: 'center',
                onClosed: function () { resolve("cancelled") },
                closeOnEscape: true,
                inputs: [
                    [
                        '<input type="text" placeholder="">',
                        "keyup",
                        function (instance, toast, input, e) {
                        },
                        true,
                    ],
                    [selectString, 'change', function (instance, toast, select, e) { }]
                ],
                buttons: [
                    ['<button><b>Confirm</b></button>', function (instance, toast, button, e, inputs) {
                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                        resolve(inputs[0].value + "-" + inputs[1].options[inputs[1].selectedIndex].value);
                    }, false], // true to focus
                    [
                        "<button>Cancel</button>",
                        function (instance, toast, button, e) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve("cancelled");
                        },
                    ],
                ]
            });
        })
    } else if (type == 5) {
        iziToast.show({
            theme: 'dark',
            message: string,
            class: 'semantic-scholar-info',
            position: 'center',
            close: false,
            timeout: duration,
            closeOnClick: true,
            closeOnEscape: true,
            displayMode: 2
        });
    } else if (type == 6) {
        return new Promise((resolve) => {
            var searchString, yearString, minCitationCountString, venueString;
            var openAccessChecked = false;
            var openAccessPdfChecked = false;
            iziToast.question({
                theme: 'light',
                color: 'black',
                layout: 2,
                class: 'semantic-scholar',
                drag: false,
                timeout: false,
                close: false,
                overlay: true,
                displayMode: 2,
                id: "question",
                title: "Semantic Scholar",
                message: string,
                position: "center",
                onClosed: function () { resolve("cancelled") },
                inputs: [
                    [
                        '<label>Search String *<input type="text" placeholder="string"></label>', 'change', function (instance, toast, input, e) {
                            searchString = e.target.value;
                        }, true
                    ],
                    [
                        '<label>Year Range<input type="text" placeholder="eg. 2020-2023"></label>', 'change', function (instance, toast, input, e) {
                            yearString = e.target.value;
                        }
                    ],
                    [
                        '<label>Minimum Citation Count<input type="text" placeholder="eg. 40"></label>', 'change', function (instance, toast, input, e) {
                            minCitationCountString = e.target.value;
                        }
                    ],
                    [
                        '<label>Venue<input type="text" placeholder="eg. Nature"></label>', 'change', function (instance, toast, input, e) {
                            venueString = e.target.value;
                        }
                    ],
                    [
                        '<label>Open Access<input id="openAccess" type="checkbox"></label>', 'change', function (instance, toast, input, e) {
                            openAccessChecked = !openAccessChecked;
                        }
                    ],
                    [
                        '<Label>Open Access PDF<input id="openAccessPDF" type="checkbox"></label>', 'change', function (instance, toast, input, e) {
                            openAccessPdfChecked = !openAccessPdfChecked;
                        }
                    ],
                ],
                buttons: [
                    [
                        "<button><b>Confirm</b></button>",
                        async function (instance, toast, button, e, inputs) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve([searchString, yearString, minCitationCountString, venueString, openAccessChecked, openAccessPdfChecked]);
                        },
                        false,
                    ],
                    [
                        "<button>Cancel</button>",
                        async function (instance, toast, button, e) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve("cancelled");
                        },
                    ],
                ],
            });
        })
    } else if (type == 7) {
        return new Promise((resolve) => {
            iziToast.question({
                theme: 'light',
                color: 'black',
                layout: 2,
                class: 'semantic-scholar',
                drag: false,
                timeout: false,
                close: false,
                overlay: true,
                displayMode: 2,
                id: "question",
                title: "Semantic Scholar",
                message: string,
                position: "center",
                onClosed: function () { resolve("cancelled") },
                inputs: [
                    [
                        '<input type="text" placeholder="">',
                        "change",
                        function (instance, toast, input, e) {
                        },
                        true,
                    ],
                ],
                buttons: [
                    [
                        "<button><b>Confirm</b></button>",
                        async function (instance, toast, button, e, inputs) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve(inputs[0].value);
                        },
                        false,
                    ],
                    [
                        "<button>Cancel</button>",
                        async function (instance, toast, button, e) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve("cancelled");
                        },
                    ],
                ],
            });
        })
    }
}
async function createBlocks(blocks, parentUid) {
    await sleep(50); // brief pause
    var filtered = blocks.filter(function (b) { return b != null; });
    for (var i = 0; i < filtered.length; i++) {
        await createBlock({
            parentUid,
            order: i,
            node: filtered[i]
        });
    }
}
// adapted from https://github.com/dvargas92495/roamjs-components/blob/main/src/writes/createBlock.ts
const createBlock = async (params) => {
    const uid = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: {
            "parent-uid": params.parentUid,
            order: params.order,
        },
        block: {
            uid,
            string: params.node.text
        }
    });
    var children = params.node.children || [];
    for (var i = 0; i < children.length; i++) {
        await createBlock({ parentUid: uid, order: i, node: children[i] });
    }
};
// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(input) {
    var i, j, str, lowers, uppers;
    str = input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
        'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
            function (txt) {
                return txt.toLowerCase();
            });

    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Id', 'Tv'];
    for (i = 0, j = uppers.length; i < j; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
            uppers[i].toUpperCase());

    return str;
}