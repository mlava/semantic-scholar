import iziToast from "izitoast";
var corpus;

export default {
    onload: ({ extensionAPI }) => {
        const config = {
            tabTitle: "Semantic Scholar",
            settings: [
                {
                    id: "ss-config",
                    name: "Import options",
                    description: "Select to set import options",
                    action: {
                        type: "select",
                        items: ["Set here", "Article", "Author"],
                        onChange: (evt) => { setConfig(evt); }
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
                        items: ["Article", "Author", "Home"],
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
                },/*
                {
                    id: "ss-pdfDownload",
                    name: "Download PDF",
                    description: "If an open access pdf is available, download and embed in graph",
                    action: {
                        type: "switch",
                        onChange: (evt) => { setPdfDownload(evt); }
                    },
                },
                {
                    id: "ss-pdfDownloadOrder",
                    name: "PDF",
                    description: "Which position to place the pdf",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Hide"],
                        onChange: (evt) => { setPdfDownloadOrder(evt); }
                    }
                },*/
                {
                    id: "ss-journalOrder",
                    name: "Journal reference",
                    description: "Which position to place the journal reference data",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Hide"],
                        onChange: (evt) => { setJournalOrder(evt); }
                    }
                },
                {
                    id: "ss-articleType",
                    name: "Article type",
                    description: "Which position to place the article type",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Hide"],
                        onChange: (evt) => { setArtTypeOrder(evt); }
                    }
                },
                {
                    id: "ss-authorsOrder",
                    name: "Authors",
                    description: "Which position to place the Authors",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Hide"],
                        onChange: (evt) => { setAuthOrder(evt); }
                    }
                },
                {
                    id: "ss-referencesOrder",
                    name: "References",
                    description: "Which position to place the article's references",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Hide"],
                        onChange: (evt) => { setRefsOrder(evt); }
                    }
                },
                {
                    id: "ss-citationsOrder",
                    name: "Citations",
                    description: "Which position to place the citations",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Hide"],
                        onChange: (evt) => { setCitOrder(evt); }
                    }
                },
                {
                    id: "ss-infCitationsOrder",
                    name: "Influential citations",
                    description: "Which position to place the influential citations",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Hide"],
                        onChange: (evt) => { setInfCitOrder(evt); }
                    }
                },
                {
                    id: "ss-sourcesOrder",
                    name: "Article sources",
                    description: "Which position to place the source links",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Hide"],
                        onChange: (evt) => { setSourcesOrder(evt); }
                    }
                },
                {
                    id: "ss-abstractOrder",
                    name: "Abstract",
                    description: "Which position to place the abstract",
                    action: {
                        type: "select",
                        items: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Hide"],
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
                        items: ["Author", "Article", "Home"],
                        onChange: (evt) => { setConfig(evt); }
                    }
                },
            ]
        };

        // onload - articles
        var newPage, newPageTitle, journalOrder, articleTypeOrder, authorsOrder, referencesOrder, citationsOrder, infCitationsOrder, sourcesOrder, abstractOrder;

        newPage = !extensionAPI.settings.get("ss-newPage");
        if (extensionAPI.settings.get("ss-newPageTitle") == true) {
            newPageTitle = "name";
        } else {
            newPageTitle = "citekey";
        }
        if (extensionAPI.settings.get("ss-journalOrder") != null) {
            journalOrder = extensionAPI.settings.get("ss-journalOrder");
        } else {
            journalOrder = 1;
        }
        if (extensionAPI.settings.get("ss-articleTypeOrder") != null) {
            articleTypeOrder = extensionAPI.settings.get("ss-articleTypeOrder");
        } else {
            articleTypeOrder = 2;
        }
        if (extensionAPI.settings.get("ss-authorsOrder") != null) {
            authorsOrder = extensionAPI.settings.get("ss-authorsOrder");
        } else {
            authorsOrder = 3;
        }
        if (extensionAPI.settings.get("ss-referencesOrder") != null) {
            referencesOrder = extensionAPI.settings.get("ss-referencesOrder");
        } else {
            referencesOrder = 4;
        }
        if (extensionAPI.settings.get("ss-citationsOrder") != null) {
            citationsOrder = extensionAPI.settings.get("ss-citationsOrder");
        } else {
            citationsOrder = 5;
        }
        if (extensionAPI.settings.get("ss-infCitationsOrder") != null) {
            infCitationsOrder = extensionAPI.settings.get("ss-infCitationsOrder");
        } else {
            infCitationsOrder = 6;
        }
        if (extensionAPI.settings.get("ss-sourcesOrder") != null) {
            sourcesOrder = extensionAPI.settings.get("ss-sourcesOrder");
        } else {
            sourcesOrder = 7;
        }
        if (extensionAPI.settings.get("ss-abstractOrder") != null) {
            abstractOrder = extensionAPI.settings.get("ss-abstractOrder");
        } else {
            abstractOrder = 8;
        }

        // onChange - articles
        async function setConfig(evt) {
            if (evt == "Article") {
                extensionAPI.settings.panel.create(configArt);
            } else if (evt == "Author") {
                extensionAPI.settings.panel.create(configAut);
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
        async function setJournalOrder(evt) {
            journalOrder = evt;
        }
        async function setArtTypeOrder(evt) {
            articleTypeOrder = evt;
        }
        async function setAuthOrder(evt) {
            authorsOrder = evt;
        }
        async function setRefsOrder(evt) {
            referencesOrder = evt;
        }
        async function setCitOrder(evt) {
            citationsOrder = evt;
        }
        async function setInfCitOrder(evt) {
            infCitationsOrder = evt;
        }
        async function setSourcesOrder(evt) {
            sourcesOrder = evt;
        }
        async function setAbstractOrder(evt) {
            abstractOrder = evt;
        }

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
                let string3 = "It can be used without an API key, although rate limiting applies and you will often see a toast message asking you to wait before trying again. Alternatively, you can apply fhttps://www.semanticscholar.org/product/api#api-key-formor an API key at [Semantic Scholar](https://www.semanticscholar.org/product/api#api-key-form).";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 2 }, block: { string: string3, uid: newUid1 } });
                let string3a = "You can configure your preferences in the Roam Depot Settings for this extension. You can determine what data you are interested in seeing for both articles and authors, and the order in which it displays. If you choose Hide for any of the data types, that data will not be requested in the API call to Semantic Scholar. This will save on data transmitted.";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 3 }, block: { string: string3a, uid: newUid1 } });
                let string4 = "If you also have the SmartBlocks extension installed, you will see an Import button after every author, reference and citation in the article view. Clicking the button will import that data as a separate page. If you don't have SmartBlocks installed you will need to install it to have access to this feature.";
                newUid1 = roamAlphaAPI.util.generateUID();
                await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newUid, order: 4 }, block: { string: string4, uid: newUid1 } });
                let string5 = "The fields below the horizontal line are the SmartBlock code required to make the bottons work. Please DO NOT change these SmartBlocks as you might break the Import buttons.";
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

                await sleep(50);
                await window.roamAlphaAPI.ui.mainWindow.openPage({ page: { uid: newUid } });
            }
        }

        extensionAPI.ui.commandPalette.addCommand({
            label: "Semantic Scholar - Article Metadata",
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

        /*
        extensionAPI.ui.commandPalette.addCommand({
            label: "Semantic Scholar - Author Metadata",
            callback: () => {
                const parentUid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
                if (parentUid == undefined) {
                    alert("Please make sure to focus a block before importing from Semantic Scholar");
                    return;
                } else {
                    window.roamAlphaAPI.updateBlock(
                        { block: { uid: parentUid, string: "Loading...".toString(), open: true } });
                }
                fetchSSAutM().then(async (blocks) => {
                    window.roamAlphaAPI.updateBlock(
                        { block: { uid: parentUid, string: blocks[0].text.toString(), open: true } });

                    await sleep(50); // brief pause
                    blocks = blocks[0].children;
                    blocks.forEach((node, order) => createBlock({
                        parentUid,
                        order,
                        node
                    }));
                });
            },
        });
        */

        const args = {
            text: "IMPORTARTICLESEMSCHOL",
            help: "Import article from Semantic Scholar",
            handler: (context) => () => {
                corpus = context.variables.corpus;
                var parentUid = context.triggerUid;
                return fetchSSArtM(true, corpus, parentUid);
            },
        };

        if (window.roamjs?.extension?.smartblocks) {
            window.roamjs.extension.smartblocks.registerCommand(args);
        } else {
            document.body.addEventListener(
                `roamjs:smartblocks:loaded`,
                () =>
                    window.roamjs?.extension.smartblocks &&
                    window.roamjs.extension.smartblocks.registerCommand(args)
            );
        }

        async function fetchSSArtM(sb, corpus, parentUid) {
            var searchQuery, finalSearchQuery;
            var blocks = [];
            if (sb == true) {
                finalSearchQuery = "CorpusId:" + corpus;
            } else {
                let string = "Please enter an article ID";
                let selectString = "<select><option value=\"\">Select</option><option value=\"DOI\">DOI</option><option value=\"CorpusId\">CorpusId</option><option value=\"ACL\">Association for Computational Linguistics ID</option><option value=\"arXiv\">arXiv ID</option><option value=\"MAG\">Microsoft Academic Graph ID</option><option value=\"PMID\">PubMed ID</option><option value=\"PMCID\">PubMed Central ID</option>";
                selectString += "</select>";
                searchQuery = await prompt(string, selectString, 3);
                if (searchQuery != "cancelled") {
                    searchQuery = searchQuery.split("-");
                    finalSearchQuery = searchQuery[1] + ":" + searchQuery[0];
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

                await fetch(ssUrl)
                    .then(async (article) => {
                        if (article.status == 404) {
                            blocks.push({ "text": "Article not found" });
                        } else if (article.ok) {
                            let data = await article.json();
                            console.info(data);
                            var title = data.title.toString();
                            var citekey = data.citationStyles.bibtex;
                            var publicationDate;
                            if (data.hasOwnProperty("publicationDate") && data.publicationDate != null) {
                                publicationDate = data.publicationDate.toString();
                            }
                            var url = data.url.toString();
                            var isOpenAccess = data.isOpenAccess;
                            var openAccessPdf;
                            if (data.hasOwnProperty("openAccessPdf") && data.openAccessPdf.hasOwnProperty("url")) {
                                openAccessPdf = data.openAccessPdf.url;
                            }

                            var children = [];
                            if (journalOrder != "Hide") {
                                var journalName = data.journal.name.toString();
                                var journalVol, journalPage, pages;
                                if (data.journal.hasOwnProperty("volume")) {
                                    journalVol = data.journal.volume.toString();
                                    journalVol = journalVol.split(" ");
                                    if (journalVol.length > 1) {
                                        journalVol = journalVol[0] + "(" + journalVol[1] + ")";
                                    }
                                }
                                if (data.journal.hasOwnProperty("pages")) {
                                    journalPage = data.journal.pages.toString();
                                    pages = journalPage.replace(" - ", "-");
                                    pages = journalPage.replace("\n", "");
                                    pages = pages.trim();
                                }
                                var year
                                if (publicationDate != undefined) {
                                    year = publicationDate.split("-")[0];
                                }
                                var journalString = "[[" + journalName.toTitleCase() + "]]";
                                if (year != undefined) {
                                    journalString += " " + year + "";
                                }
                                if (journalVol != undefined) {
                                    journalString += "; " + journalVol + "";
                                }
                                if (pages != undefined) {
                                    journalString += ":" + pages + "";
                                }
                                children.splice(journalOrder, 0, { "text": journalString, });
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
                                    children.splice(articleTypeOrder, 0, { "text": typeString, });
                                }
                            }
                            if (authorsOrder != "Hide") {
                                var authors = data.authors;
                                var authorsBlock = [];
                                for (var i = 0; i < authors.length; i++) {
                                    if (window.roamjs?.extension?.smartblocks) {
                                        authorsBlock.push({ "text": "[[" + authors[i].name + "]]", }); // TODO: update with button once author import function is working
                                        // e.g. {{Import:SmartBlock:SemanticScholarAuthor:authorId=" + authors[i].authorId + "}}
                                    } else {
                                        authorsBlock.push({ "text": "[[" + authors[i].name + "]]", });
                                    }
                                }
                                children.splice(authorsOrder, 0, { "text": "**Authors:** (" + authors.length + ")", "children": authorsBlock });
                            }
                            if (referencesOrder != "Hide") {
                                var referenceCount = data.referenceCount;
                                var references = data.references;
                                var referencesBlock = [];
                                for (var i = 0; i < references.length; i++) {
                                    if (window.roamjs?.extension?.smartblocks) {
                                        referencesBlock.push({ "text": "" + references[i].title + "  {{Import:SmartBlock:SemanticScholarArticle:corpus=" + references[i].corpusId + "}}" });
                                    } else {
                                        referencesBlock.push({ "text": "" + references[i].title + "" });
                                    }
                                }
                                children.splice(referencesOrder, 0, { "text": "**References:** (" + referenceCount + ")", "children": referencesBlock });
                            }
                            if (citationsOrder != "Hide") {
                                var citationCount = data.citationCount;
                                var citations = data.citations;
                                var citationsBlock = [];
                                for (var i = 0; i < citations.length; i++) {
                                    if (window.roamjs?.extension?.smartblocks) {
                                        citationsBlock.push({ "text": "" + citations[i].title + "  {{Import:SmartBlock:SemanticScholarArticle:corpus=" + citations[i].corpusId + "}}" });
                                    } else {
                                        citationsBlock.push({ "text": "" + citations[i].title + "" });
                                    }
                                }
                                children.splice(citationsOrder, 0, { "text": "**Citations:** (" + citationCount + ")", "children": citationsBlock });
                            }
                            if (infCitationsOrder != "Hide") {
                                var influentialCitationCount = data.influentialCitationCount;
                                children.splice(infCitationsOrder, 0, { "text": "**Influential Citations:** " + influentialCitationCount + "", });
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
                                if (openAccessPdf != undefined) {
                                    externalLinks += "  ~  ![](/OA.png)[🔗](" + openAccessPdf + ")";
                                }
                                children.splice(sourcesOrder, 0, { "text": externalLinks, });
                            }
                            if (abstractOrder != "Hide") {
                                if (data.hasOwnProperty("abstract") && data.abstract != null) {
                                    var abstract = data.abstract.toString();
                                    if (abstract != undefined) {
                                        children.splice(abstractOrder, 0, { "text": "**Abstract:**", "children": [{ "text": abstract, }] });
                                    }
                                }
                            }
                            /*
                            if (isOpenAccess) {
                                children.splice(10, 0, { "text": openAccessImage });
                            }
                            */

                            children.splice(99, 0, { "text": "**Corpus ID:** " + data.corpusId, });

                            // finally, create the blocks object and send for block creation
                            blocks.push({ "text": "**" + title + "**" + citekey + "**" + data.corpusId, "children": children });
                        }
                    })
                    .catch(error => {
                        blocks.push({ "text": "Too many requests" });
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
                prompt(newPageName, null, 3000);
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

                    page = await window.roamAlphaAPI.q(`
                    [:find ?e
                        :where [?e :node/title "${newPageName}"]]`);
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
                                    if (titleUid != undefined) {
                                        parentUid = titleUid;
                                    }
                                    // delete current children and replace with new data
                                    for (var i = 0; i < matchingPages[":block/children"].length; i++) {
                                        if (matchingPages[":block/children"][i][":block/uid"] == parentUid) {
                                            for (var j = 0; j < matchingPages[":block/children"][i][":block/children"].length; j++) {
                                                window.roamAlphaAPI.deleteBlock({ block: { uid: matchingPages[":block/children"][i][":block/children"][j][":block/uid"] } });
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

        /*
        async function fetchSSAutM() {
            let author = await fetch("https://api.semanticscholar.org/graph/v1/author/2262347?&fields=affiliations,authorId,citationCount,externalIds,hIndex,homepage,name,paperCount,papers,papers.abstract,papers.authors,papers.citationCount,papers.corpusId,papers.externalIds,papers.fieldsOfStudy,papers.influentialCitationCount,papers.isOpenAccess,papers.journal,papers.openAccessPdf,papers.paperId,papers.publicationDate,papers.publicationTypes,papers.publicationVenue,papers.referenceCount,papers.s2FieldsOfStudy,papers.title,papers.url,papers.venue,papers.year,url");
            console.info(author);

            if (author.ok) {
                let data = await author.json();
                console.info(data);
            } else {
                console.error(data);
                return "error";
            }
        }
        */
    },
    onunload: () => {
        if (window.roamjs?.extension?.smartblocks) {
            window.roamjs.extension.smartblocks.unregisterCommand("IMPORTARTICLESEMSCHOL");
        };
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
                        },
                    ],
                ],
                onClosing: function (instance, toast, closedBy) { },
                onClosed: function (instance, toast, closedBy) { },
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
    } else if (type == 4) {
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
                inputs: [
                    [
                        '<input type="text" placeholder="">',
                        "keyup",
                        function (instance, toast, input, e) {
                        },
                        true,
                    ],
                    [selectString, 'change', function (instance, toast, select, e) { }],
                    [
                        '<input type="text" placeholder="">',
                        "keyup",
                        function (instance, toast, input, e) {
                        },
                        false,
                    ],
                ],
                buttons: [
                    ['<button><b>Confirm</b></button>', function (instance, toast, button, e, inputs) {
                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                        resolve(inputs[0].value + "-" + inputs[1].options[inputs[1].selectedIndex].value + "-" + inputs[2].value);
                    }, false], // true to focus
                    [
                        "<button>Cancel</button>",
                        function (instance, toast, button, e) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                        },
                    ],
                ]
            });
        })
    } else if (type == 5) {
        iziToast.show({
            theme: 'dark',
            message: string,
            class: 'semantic-scholar',
            position: 'center',
            close: false,
            timeout: duration,
            closeOnClick: true,
            closeOnEscape: true,
            displayMode: 2
        });
    }
}

async function createBlocks(blocks, parentUid) {
    await sleep(50); // brief pause
    blocks.forEach((node, order) => createBlock({
        parentUid,
        order,
        node
    }));
}

// copied and adapted from https://github.com/dvargas92495/roamjs-components/blob/main/src/writes/createBlock.ts
const createBlock = (params) => {
    const uid = window.roamAlphaAPI.util.generateUID();
    return Promise.all([
        window.roamAlphaAPI.createBlock({
            location: {
                "parent-uid": params.parentUid,
                order: params.order,
            },
            block: {
                uid,
                string: params.node.text
            }
        })
    ].concat((params.node.children || []).map((node, order) =>
        createBlock({ parentUid: uid, order, node })
    )))
};

// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
String.prototype.toTitleCase = function () {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
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