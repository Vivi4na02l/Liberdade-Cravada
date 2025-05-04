let characters = [
    {
        char: "girl",
        img: "../../images/website/images/char_girl.png",
        title: "Criança - sexo feminino",
        info: ["1","2","3"],
        text: "oaosdkoekqwdoas"
    },
    {
        char: "boy",
        img: "../../images/website/images/char_boy.png",
        title: "Criança - sexo masculino",
        info: ["1","2","3"],
        text: "oaosdkoekqwdoas"
    },
    {
        char: "woman",
        img: "../../images/website/images/char_woman.png",
        title: "Mulher",
        info: ["1","2","3"],
        text: "oaosdkoekqwdoas"
    },
    {
        char: "poorMan",
        img: "../../images/website/images/char_man_poor.png",
        title: "Homem pobre / camponês",
        info: ["1","2","3"],
        text: "oaosdkoekqwdoas"
    },
    {
        char: "humberto",
        img: "../../images/website/images/char_humberto_delgado.png",
        title: "Humberto Delgado",
        info: ["1","2","3"],
        text: "oaosdkoekqwdoas"
    },
    {
        char: "military",
        img: "../../images/website/images/char_military_MFA.png",
        title: "Militares MFA",
        info: ["1","2","3"],
        text: "oaosdkoekqwdoas"
    },
    {
        char: "richMan",
        img: "../../images/website/images/char_man_rich.png",
        title: "Homem rico",
        info: ["1","2","3","4"],
        text: "oaosdkoekqwdoas"
    },
    {
        char: "PIDE",
        img: "../../images/website/images/char_agent_PIDE.png",
        title: "D.G.S. / P.I.D.E.",
        info: ["1","2","3"],
        text: "oaosdkoekqwdoas"
    },
    {
        char: "marcello",
        img: "../../images/website/images/char_girl.png",
        title: "Marcello Caetano",
        info: ["1","2","3"],
        text: "oaosdkoekqwdoas"
    },
    {
        char: "salazar",
        img: "../../images/website/images/char_girl.png",
        title: "Salazar",
        info: ["1","2","3"],
        text: "oaosdkoekqwdoas"
    },
];

document.querySelector("#charGoBack").addEventListener("click", () => {
    window.location.href = "./MateriaisEducativos.html";
});

fillRightInfo()

function fillRightInfo() {
    let char = sessionStorage.getItem("char");
    let pos = characters.findIndex(character => character.char == char);

    let chosenChar = characters[pos];

    document.querySelector('#charImgSrc').src = chosenChar.img;
    document.querySelector('#charTitle').innerHTML = chosenChar.title;
    document.querySelector('#charText').innerHTML = chosenChar.text;

    let info = '';
    for (let i = 0; i < chosenChar.info.length; i++) {
        info += `<li id="charInfo" class="m0 IBM fontNormalSize">
                    ${chosenChar.info[i]}
                </li>`;
    }

    document.querySelector('#charInfoDiv').innerHTML = info;
}