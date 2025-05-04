let characters = [
    {
        char: "girl",
        img: "../../images/website/images/char_girl.png",
        title: "Criança - sexo feminino",
        info: ["1","2","3"],
        text: ["oaosdkoekqwdoas"]
    },
    {
        char: "boy",
        img: "../../images/website/images/char_boy.png",
        title: "Criança - sexo masculino",
        info: ["1","2","3"],
        text: ["oaosdkoekqwdoas"]
    },
    {
        char: "woman",
        img: "../../images/website/images/char_woman.png",
        title: "Mulher",
        info: ['"Cuidadora e educadora, subordinada ao marido";',"O regime promovia a ideia de que o lugar da mulher era em casa;","Apenas mulheres chefes de família (sem marido presente) podiam votar."],
        text: ['Dia 16 de março de 1933, num discurso, Salazar disse que "o trabalho da mulher fora do lar desagrega este, separa os membros da família, torna-os um pouco estranhos uns aos outros. Desaparece a vida comum, sofre a obra educativa das crianças, diminui o número delas. E com o mau ou impossível funcionamento da alimentação e do vestuário verifica-se uma perda importante, raro, materialmente compensado pelo salário recebido". Salazar acreditava que a <i>missão natural</i> de uma mulher era procriar e apresentar submissão à sua cara metade.',
            "Apesar de a Constituição de 1933 proclamar igualdade, na práticas as mulheres enfrentavam muitas restrições: <li id='charInfo' class='m0 IBM fontNormalSize'>Necessitavam do marido para trabalhar, viajar ou abrir contas bancárias;</li><li id='charInfo' class='m0 IBM fontNormalSize'>Eram excluídas de profissões como juíza, diplomata ou militar;</li><li id='charInfo' class='m0 IBM fontNormalSize'>Ganhavam menos que os homens pelo mesmo trabalho;</li><li id='charInfo' class='m0 IBM fontNormalSize'>O Código Cívil de 1867, em vigor até 1967, estabelecia que a mulher devia obediência ao marido e não podia gerir os seus bens sem consentimento.</li>",
            "Para moldar as mulheres segundos os ideais conservadores do Estado, em 1937, foi criada a Mocidade Portuguesa Feminina (MPF), uma organização obrigatória para jovens raparigas, que ensinava a importância do lar, da moral e da obediência.",
            "O direito de voto era concedido a mulheres chefes de família, ou solteiras independentes com curso secundário ou superior (a educação naquela altura era cara, e, para mulheres, desencorajada).<br><br>A prostituição era considerada, em certas circunstâncias, um crime, tal como a questão ao aborto."
        ]
    },
    {
        char: "poorMan",
        img: "../../images/website/images/char_man_poor.png",
        title: "Homem pobre / camponês",
        info: ["1","2","3"],
        text: ["oaosdkoekqwdoas"]
    },
    {
        char: "humberto",
        img: "../../images/website/images/char_humberto_delgado.png",
        title: "Humberto Delgado",
        info: ["1","2","3"],
        text: ["oaosdkoekqwdoas"]
    },
    {
        char: "military",
        img: "../../images/website/images/char_military_MFA.png",
        title: "Militares MFA",
        info: ["1","2","3"],
        text: ["oaosdkoekqwdoas"]
    },
    {
        char: "richMan",
        img: "../../images/website/images/char_man_rich.png",
        title: "Homem rico",
        info: ["1","2","3","4"],
        text: ["oaosdkoekqwdoas"]
    },
    {
        char: "PIDE",
        img: "../../images/website/images/char_agent_PIDE.png",
        title: "D.G.S. / P.I.D.E.",
        info: ["1","2","3"],
        text: ["oaosdkoekqwdoas"]
    },
    {
        char: "marcello",
        img: "../../images/website/images/char_marcello.png",
        title: "Marcello Caetano",
        info: ["1","2","3"],
        text: ["oaosdkoekqwdoas"]
    },
    {
        char: "salazar",
        img: "../../images/website/images/char_salazar.png",
        title: "António de Oliveira Salazar",
        info: ["Nasceu dia 28 de abril de 1889;", "Tornou-se a personagem política mais marcante do século XX português;","Foi chefe do governo português entre 1932 e 1968;","Morreu dia 27 de julho de 1970."],
        text: ["Salazar era uma pessoa com ideais conservadores, católicos e autoritários. Estudou e conclui o curso de Direito na Universidade de Coimbra, onde mais tarde se tornou professor de Economia Política e Finanças. Em 1921, foi eleito deputado pelo Centro Católico Português (CCP), partido que ajudou a fundar. No entanto, renunciou ao cargo poucos dias depois.",
            'A sua participação no CCP e os seus conhecimentos económicos levaram-no a ser chamado pelo governo em 1926 para o cargo de Ministro das Finanças. No entanto, renunciou após poucos dias por não lhe serem concedidos os poderes necessários para implementar as reformas que considerava essenciais. Em 1928, foi novamente convidado para o mesmo cargo, desta vez com plenos poderes sobre as finanças públicas. Conseguiu equilibrar as contas do Estado, sendo apelidado pelo público como "Salvador da Pátria".',
            "Com o prestígio adquirido, em 1932, foi nomeado Presidente do Conselho de Ministros (equivalente a Primeiro-Ministro). Em 1933, instituiu uma nova Constituição que estabeleceu o Estado Novo, um regime autoritário que defendi valores como Deus, Pátria e Autoridade. Implementou leis opressivas e controladoras, acreditando que a liberdade de expresão poderia ser perigosa e uma menor valia para o país. Estabeleceu a censura, criou a polícia política com autoridade para prender e torturar qualquer atividade considerada suspeita, e controlou o sistema de ensino.",
            "Governou até 1968, quando uma queda que lhe provocou derrame cerebral o afastou do poder. Faleceu dois nos depois, em 1970."
        ]
    },
];

document.querySelector("#charGoBack").addEventListener("click", () => {
    window.location.href = "./MateriaisEducativos.html";
});

document.querySelector("#page1").addEventListener("click", () => {
    fillRightInfo(true, 1);
});

document.querySelector("#page2").addEventListener("click", () => {
    fillRightInfo(true, 2);
});

fillRightInfo(false, 0)

function fillRightInfo(clicked, page) {
    let char = sessionStorage.getItem("char");
    let pos = characters.findIndex(character => character.char == char);

    let chosenChar = characters[pos];

    // document.querySelector('#charImgSrc').src = chosenChar.img;
    document.querySelector('#charImg').style.backgroundImage = `url(${chosenChar.img})`;
    document.querySelector('#charImg').style.backgroundSize = "contain";
    document.querySelector('#charImg').style.backgroundRepeat = "no-repeat";
    document.querySelector('#charImg').style.backgroundPosition = "50%, 50%";

    document.querySelector('#charTitle').innerHTML = chosenChar.title;

    fillInfo(chosenChar);
    fillText(chosenChar, clicked, page);
}

function fillInfo(chosenChar) {
    let info = '';
    for (let i = 0; i < chosenChar.info.length; i++) {
        info += `<li id="charInfo" class="m0 IBM fontNormalSize">
                    ${chosenChar.info[i]}
                </li>`;
    }
    document.querySelector('#charInfoDiv').innerHTML = info;
}

function fillText(chosenChar, pageClicked, page) {
    let info = '';

    if (chosenChar.text.length == 1) {
        document.querySelector('#charText').innerHTML = chosenChar.text[0];

        document.querySelector('#pages').style.display = "none";
        document.querySelector('#charAbout').classList.remove("jcsb");

    } else if (chosenChar.text.length == 2) {
        for (let i = 0; i < chosenChar.text.length; i++) {
            if (i != chosenChar.text.length-1) {
                info += `<p id="charInfo" class="m0 IBM fontNormalSize">
                            ${chosenChar.text[i]}
                        </p><br>`;
            } else {
                info += `<p id="charInfo" class="m0 IBM fontNormalSize">
                            ${chosenChar.text[i]}
                        </p>`;
            }
        }
        document.querySelector('#pages').style.display = "none";
        document.querySelector('#charText').innerHTML = info;
    } else {
        if (pageClicked) {
            if (page == 1) {
                for (let i = 0; i < 2; i++) {
                    if (i != chosenChar.text.length-1) {
                        info += `<p id="charInfo" class="m0 IBM fontNormalSize">
                                    ${chosenChar.text[i]}
                                </p><br>`;
                    } else {
                        info += `<p id="charInfo" class="m0 IBM fontNormalSize">
                                    ${chosenChar.text[i]}
                                </p>`;
                    }
                }

                document.querySelector('#charText').innerHTML = info;
                document.querySelector("#page2").classList.remove("active");
                document.querySelector("#page2").classList.add("inactive");

                document.querySelector("#page1").classList.remove("inactive");
                document.querySelector("#page1").classList.add("active");
            } else {
                for (let i = 2; i < chosenChar.text.length; i++) {
                    if (i != chosenChar.text.length-1) {
                        info += `<p id="charInfo" class="m0 IBM fontNormalSize">
                                    ${chosenChar.text[i]}
                                </p><br>`;
                    } else {
                        info += `<p id="charInfo" class="m0 IBM fontNormalSize">
                                    ${chosenChar.text[i]}
                                </p>`;
                    }
                }

                document.querySelector('#charText').innerHTML = info;
                document.querySelector("#page1").classList.remove("active");
                document.querySelector("#page1").classList.add("inactive");

                document.querySelector("#page2").classList.remove("inactive");
                document.querySelector("#page2").classList.add("active");
            }
        } else {
            for (let i = 0; i < 2; i++) {
                if (i != chosenChar.text.length-1) {
                    info += `<p id="charInfo" class="m0 IBM fontNormalSize">
                                ${chosenChar.text[i]}
                            </p><br>`;
                } else {
                    info += `<p id="charInfo" class="m0 IBM fontNormalSize">
                                ${chosenChar.text[i]}
                            </p>`;
                }
            }

            document.querySelector('#charText').innerHTML = info;
        }
    }
}