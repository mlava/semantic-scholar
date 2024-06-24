import iziToast from "izitoast";

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
                fetchSSArtM().then(async (blocks) => {
                    var page, newPageName, newPageUid;
                    newPageName = blocks[0].text.toString();
                    if (newPageName == "Search cancelled") {
                        await window.roamAlphaAPI.updateBlock(
                            { block: { uid: parentUid, string: "You cancelled the search".toString(), open: true } });
                    } else if (newPageName == "Article not found") {
                        await window.roamAlphaAPI.updateBlock(
                            { block: { uid: parentUid, string: "No articles with this identifier were found".toString(), open: true } });
                    } else if (newPageName == "Too many requests") {
                        await window.roamAlphaAPI.updateBlock(
                            { block: { uid: parentUid, string: "There was an error calling the Semantic Scholar API. You might be calling the API too often. Try to space out your requests.".toString(), open: true } });
                    }  else if (newPageName == "Unknown error. Error sent to browser console.") {
                        await window.roamAlphaAPI.updateBlock(
                            { block: { uid: parentUid, string: newPageName.toString(), open: true } });
                    } else {
                        if (newPage) {
                            if (newPageName.includes("**")) {
                                if (newPageTitle == "name") {
                                    newPageName = newPageName.split("**")[1];
                                } else if (newPageTitle == "citekey") {
                                    newPageName = newPageName.split("**")[2];
                                    newPageName = newPageName.split("{")[1];
                                    newPageName = newPageName.split(",")[0];
                                }
                            }

                            page = await window.roamAlphaAPI.q(`
                            [:find ?e
                                :where [?e :node/title "${newPageName}"]]`);
                            newPageUid = roamAlphaAPI.util.generateUID();
                            if (page.length < 1) { // create new page
                                await window.roamAlphaAPI.createPage({ page: { title: newPageName, uid: newPageUid } });
                            } else {
                                const d = new Date();
                                let ms = d.getMilliseconds();
                                newPageName = newPageName + " ~ " + ms;
                                await window.roamAlphaAPI.createPage({ page: { title: newPageName, uid: newPageUid } });
                            }
                            await window.roamAlphaAPI.updateBlock(
                                { block: { uid: parentUid, string: "[[" + newPageName + "]]".toString(), open: true } });
                            parentUid = roamAlphaAPI.util.generateUID();
                            var firstBlock = blocks[0].text.split("**")[1];
                            await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newPageUid, order: 0 }, block: { string: "**" + firstBlock + "**".toString(), uid: parentUid } });
                        } else {
                            var firstBlock = blocks[0].text.split("**")[1];
                            await window.roamAlphaAPI.updateBlock(
                                { block: { uid: parentUid, string: "**" + firstBlock + "**".toString(), open: true } });
                        }
                        await sleep(50); // brief pause
                        blocks = blocks[0].children;
                        blocks.forEach((node, order) => createBlock({
                            parentUid,
                            order,
                            node
                        }));
                        if (newPage) {
                            await window.roamAlphaAPI.ui.mainWindow.openBlock({ block: { uid: newPageUid } });
                        }
                    }
                });
                document.querySelector("body")?.click();
            },
        });

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

        const args = {
            text: "IMPORTARTICLESEMSCHOL",
            help: "Import article from Semantic Scholar",
            handler: (context) => () => {
                buttonTrigger = context.variables.buttonTrigger;
                fetchSSArtM(buttonTrigger);
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

        async function fetchSSArtM() {
            let string = "Please enter an article ID";
            let selectString = "<select><option value=\"\">Select</option><option value=\"DOI\">DOI</option><option value=\"CorpusId\">CorpusId</option><option value=\"ACL\">Association for Computational Linguistics ID</option><option value=\"arXiv\">arXiv ID</option><option value=\"MAG\">Microsoft Academic Graph ID</option><option value=\"PMID\">PubMed ID</option><option value=\"PMCID\">PubMed Central ID</option>";
            selectString += "</select>";
            let searchQuery = await prompt(string, selectString, 3);
            if (searchQuery == "cancelled") {
                return [{ "text": "Search cancelled", }];
            } else {
                searchQuery = searchQuery.split("-");

                // create the API url, only calling data where required 
                let ssUrl = "https://api.semanticscholar.org/graph/v1/paper/" + searchQuery[1] + ":" + searchQuery[0] + "?&fields=paperId,corpusId,url,title,venue,publicationVenue,publicationDate,year,isOpenAccess,openAccessPdf,fieldsOfStudy,s2FieldsOfStudy,citationStyles,embedding,tldr";
                /*
                if (pdfDownload) {
                    ssUrl += ",openAccessPdf"
                }
                    */
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

                return await fetch(ssUrl).then(async (article) => {
                    if (article.status == 404) {
                        return [{ "text": "Article not found", }];
                    } else if (article.ok) {
                        let data = await article.json();
                        console.info(data);
                        var title = data.title.toString();
                        var citekey = data.citationStyles.bibtex;
                        var publicationDate = data.publicationDate.toString();
                        var url = data.url.toString();
                        var isOpenAccess = data.isOpenAccess;
                        var openAccessImage = "";
                        if (isOpenAccess) {
                            openAccessImage += "![](https://github.com/mlava/semantic-scholar/blob/main/oa.png)";
                        }
                        /*
                        if (pdfDownload) {
                            if (data.hasOwnProperty("openAccessPdf") && data.openAccessPdf.hasOwnProperty("url")) {
                                console.info(data.openAccessPdf.url);
                                fetch(data.openAccessPdf.url).then(res => res.blob()).then(blob => saveAs(blob, "test.pdf"));
                            }
                        }
                        */
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
                            var year = publicationDate.split("-")[0];
                            var journalString = "[[" + journalName.toTitleCase() + "]] " + year + "";
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
                        if (authorsOrder != "Hide") {
                            var authors = data.authors;
                            var authorsBlock = [];
                            for (var i = 0; i < authors.length; i++) {
                                authorsBlock.push({ "text": "[[" + authors[i].name + "]]", });
                            }
                            children.splice(authorsOrder, 0, { "text": "**Authors:** (" + authors.length + ")", "children": authorsBlock });
                        }
                        if (referencesOrder != "Hide") {
                            var referenceCount = data.referenceCount;
                            var references = data.references;
                            var referencesBlock = [];
                            for (var i = 0; i < references.length; i++) {
                            }
                            children.splice(referencesOrder, 0, { "text": "**References:** (" + referenceCount + ")", "children": referencesBlock });
                        }
                        if (citationsOrder != "Hide") {
                            var citationCount = data.citationCount;
                            var citations = data.citations;
                            var citationsBlock = [];
                            for (var i = 0; i < citations.length; i++) {
                                citationsBlock.push({ "text": "" + citations[i].title + "  {{get:"+data.citations[i].corpusId+"}}", });
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
                            children.splice(sourcesOrder, 0, { "text": externalLinks, });
                        }
                        if (abstractOrder != "Hide") {
                            if (data.hasOwnProperty("abstract")) {
                                var abstract = data.abstract.toString();
                                if (abstract != undefined) {
                                    children.splice(abstractOrder, 0, { "text": "**Abstract:**", "children": [{ "text": abstract, }] });
                                }
                            }
                        }
    
                        // finally, create the blocks object and send for block creation
                        var blocks = [];
                        blocks.push({ "text": "**" + title + "**" + citekey, "children": children });
                        return blocks;
                    }
                }).catch(error => {
                    return [{ "text": "Too many requests", }];
                });
            }
        }

        async function fetchSSAutM() {
            let author = await fetch("https://api.semanticscholar.org/graph/v1/author/2262347?&fields=affiliations,authorId,citationCount,externalIds,hIndex,homepage,name,paperCount,papers,papers.abstract,papers.authors,papers.citationCount,papers.corpusId,papers.externalIds,papers.fieldsOfStudy,papers.influentialCitationCount,papers.isOpenAccess,papers.journal,papers.openAccessPdf,papers.paperId,papers.publicationDate,papers.publicationTypes,papers.publicationVenue,papers.referenceCount,papers.s2FieldsOfStudy,papers.title,papers.url,papers.venue,papers.year,url");
            console.info(author);

            if (author.ok) {
                let data = await author.json();
                console.info(data);
                /*
                return [
                  {
                    text: "**On this Day...** #rm-hide #rm-horizontal",
                    children: [
                      { text: string },
                      { text: string1 },
                      { text: string2 },
                    ]
                  }
                ];
                */
            } else {
                console.error(data);
                return "error";
            }
        }
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

async function prompt(string, selectString, type) {
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
                inputs: [
                    [selectString, 'change', function (instance, toast, select, e) { }]
                ],
                buttons: [
                    ['<button><b>Confirm</b></button>', function (instance, toast, button, e, inputs) {
                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                        resolve(inputs[0].options[inputs[0].selectedIndex].value);
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
    }
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
