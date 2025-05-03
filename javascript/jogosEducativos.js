//* Detects which game was chosen and redirects user to the page with such game
for (const gameClicked of document.querySelectorAll(".divGame")) {
    // let gameTitle = gameClicked.id
    // gameClicked.children[0].innerHTML = gameTitle /** dá o nome  */

    gameClicked.addEventListener("click", () => {
        let game = gameClicked.id;
        sessionStorage.setItem("game", game);
        window.location.href = "./Jogo.html";
    });
};