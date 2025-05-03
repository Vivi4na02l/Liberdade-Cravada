let content = [
    { /** pos // yearArray */
        year: 1928,
        title: "Salazar Assume o Poder",
        allText: [ /** posPage */
            { page: 1,
                active: true,
                text: "texto1" },
            { page: 2,
                active: false,
                text: "texto2" },
            { page: 3,
                active: false,
                text: "texto3" },
        ]
    },
    { /** pos // yearArray */
        year: 1933,
        title: "Aprovação do Estado Novo",
        allText: [ /** posPage */
            { page: 1,
                active: true,
                text: "texto1" },
            { page: 2,
                active: false,
                text: "texto2" },
            { page: 3,
                active: false,
                text: "texto3" },
        ]
    },
    { /** pos // yearArray */
        year: 1945,
        title: "Fim da II Guerra Mundial",
        allText: [ /** posPage */
            { page: 1,
                active: true,
                text: "texto1" },
            { page: 2,
                active: false,
                text: "texto2" },
            { page: 3,
                active: false,
                text: "texto3" },
        ]
    },
    { /** pos // yearArray */
        year: 1958,
        title: "Humberto Delgado Exilado",
        allText: [ /** posPage */
            { page: 1,
                active: true,
                text: "texto1" },
            { page: 2,
                active: false,
                text: "texto2" },
            { page: 3,
                active: false,
                text: "texto3" },
        ]
    },
    { /** pos // yearArray */
        year: 1961,
        title: "Início das Guerras Coloniais",
        allText: [ /** posPage */
            { page: 1,
                active: true,
                text: "texto1" },
            { page: 2,
                active: false,
                text: "texto2" },
            { page: 3,
                active: false,
                text: "texto3" },
        ]
    },
    { /** pos // yearArray */
        year: 1968,
        title: "Salazar Sai do Poder",
        allText: [ /** posPage */
            { page: 1,
                active: true,
                text: "texto1" },
            { page: 2,
                active: false,
                text: "texto2" },
            { page: 3,
                active: false,
                text: "texto3" },
        ]
    },
    { /** pos // yearArray */
        year: 1974,
        title: "Dia da Liberdade",
        allText: [ /** posPage */
            { page: 1,
                active: true,
                text: "texto1" },
            { page: 2,
                active: false,
                text: "texto2" },
            { page: 3,
                active: false,
                text: "texto3" },
        ]
    },
];

let contentActivated = content[0];

changeContent("1928", 0);
pagesClickListenner();

/** RESPONSABLE FOR VISUALLY CHANGING THE COLORS OF THE BARS(divs) AND THE BALLS OF THE TIMELINE WHENEVER THE USER CLICKS IN A BALL */
for (const btnBall of document.querySelectorAll(".btnBall")) {
    btnBall.addEventListener("click", () => {
        let clickedYear = btnBall.id.slice(0, -1);
        let device = btnBall.id[btnBall.id.length-1]; /* finds out which html is being used since it changes depending on the device */

        let pos = content.findIndex(year => year.year == clickedYear); /** finds out which position is related to the year the user clicked in, in the array "content" */
        changeContent(clickedYear, pos);

        contentActivated = content[pos];

        btnBall.classList.remove("inactiveBall");
        btnBall.classList.add("activeBall");
        btnBall.parentElement.classList.add("bgRed");
        btnBall.parentElement.classList.remove("bgBeige");

        let buttons = ["1928", "1933", "1945", "1958", "1961", "1968", "1974"];
        let year = buttons.findIndex(year => year == clickedYear);
        
        //* "marks" any button preceding the one clicked */
        if (buttons[year] != buttons[0]) {
            let previousYears = year;
            
            for (let i = 0; i < year; i++) {
                previousYears--
                
                document.getElementById(`${buttons[year-previousYears]}${device}`).classList.remove("inactiveBall");
                document.getElementById(`${buttons[year-previousYears]}${device}`).classList.add("activeBall");
                document.getElementById(`${buttons[year-previousYears]}${device}`).parentElement.classList.add("bgRed");
                document.getElementById(`${buttons[year-previousYears]}${device}`).parentElement.classList.remove("bgBeige");
            }
        }
        
        //* "unmarks" any button following the one clicked */
        if (buttons[year] != buttons[buttons.length-1]) {
            let followingYears = 0

            for (let i = 0; i < buttons.length-1-year; i++) {
                followingYears++

                document.getElementById(`${buttons[year+followingYears]}${device}`).classList.remove("activeBall");
                document.getElementById(`${buttons[year+followingYears]}${device}`).classList.add("inactiveBall");
                document.getElementById(`${buttons[year+followingYears]}${device}`).parentElement.classList.add("bgBeige");
                document.getElementById(`${buttons[year+followingYears]}${device}`).parentElement.classList.remove("bgRed");
            }
        }
    });
}

function pagesClickListenner() {
    for (const pageBtn of document.querySelectorAll('.pages')) {
        pageBtn.addEventListener('click', () => {
            console.log(document.querySelectorAll('.pages'));
            
            changeContentPages(pageBtn);
        }
    )}
}

function changeContent(clickedYear, pos) {
    //* YEAR */
    document.querySelector("#timelineTxtYear").innerHTML = clickedYear;

    //* TITLE */
    document.querySelector("#timelineTxtTitle").innerHTML = content[pos].title;

    //* TEXT */
    document.querySelector("#timelineTxt").innerHTML = content[pos].allText[0].text;

    //* HOW MANY PAGES */
    /** checks how many "pages" the content of the year the user clicked on has and writes them in the HTML for the html buttons */
    changeContentPagesHTML(content[pos]);

    // for (const pageBtn of document.querySelectorAll('.pages')) {
    //     pageBtn.addEventListener('click', () => {
            // if (isNaN(pageBtn.innerHTML)) { /** if button clicked in pages is one of the arrows ("<" nd ">") */
                
            // } else { /** if button clicked in pages is a number */

            //     /* checks which page was last "activated" and deactivates it */
            //     let posOldPage = content[pos].allText.findIndex(page => page.active == true);
            //     content[pos].allText[posOldPage].active = false;

            //     /* "activates" the page that the user clicked on */
            //     let posNewPage = content[pos].allText.findIndex(page => page.page == pageBtn.innerHTML);
            //     content[pos].allText[posNewPage].active = true;

            //     console.log(content[pos]);
                

            //     changeContentPagesHTML(content[pos]);

            //     changeContentText(content[pos], pageBtn.innerHTML);
            // }
    //     })
    // }
}

function changeContentPages(pageClicked) {
    
    if (isNaN(pageClicked.innerHTML)) { /** if button clicked in pages is one of the arrows ("<" nd ">") */
        console.log('aaaaa');
                
    } else { /** if button clicked in pages is a number */

        /* checks which page was last "activated" and deactivates it */
        let posOldPage = contentActivated.allText.findIndex(page => page.active == true);
        contentActivated.allText[posOldPage].active = false;

        /* "activates" the page that the user clicked on */
        let posNewPage = contentActivated.allText.findIndex(page => page.page == pageClicked.innerHTML);
        contentActivated.allText[posNewPage].active = true;

        console.log(contentActivated);
        

        changeContentPagesHTML(contentActivated);

        changeContentText(contentActivated, pageClicked.innerHTML);
    }
}

/**
 * checks how many "pages" the content of the year the user clicked on has and writes them in the HTML for the html buttons
 * @param {*} yearArray [this variable is represented in the array at the top what it should be]
 */
function changeContentPagesHTML(yearArray) {
    let pagesHTML = '<p id="arrow" class="pages m0 p0 IBM fontNormalSize2 beige"><</p>';

    for (let i = 0; i < yearArray.allText.length; i++) {
        if (yearArray.allText[i].active) {            
            pagesHTML += `<p id="${yearArray.allText[i].page}" class="pages m0 p0 IBM fontNormalSize2 red">${yearArray.allText[i].page}</p>`
        } else {
            pagesHTML += `<p id="${yearArray.allText[i].page}" class="pages m0 p0 IBM fontNormalSize2 beige">${yearArray.allText[i].page}</p>`
        }
    }
    pagesHTML += '<p id="arrow" class="pages m0 p0 IBM fontNormalSize2 beige">></p>';

    document.querySelector(".timelineDescriptionPagesP").innerHTML = pagesHTML;

    /* the HTML is rewritten and the listenner was associated to it,
    since the code already ran once through the it, the code won't re-associate with the new HTML that was re-written through the javascript.
    This forces the code to re-run the listenners, re-associating them with the new HTML */
    pagesClickListenner();
}

function changeContentText(yearArray, page) {
    document.querySelector("#timelineTxt").innerHTML = yearArray.allText[page-1].text;
}