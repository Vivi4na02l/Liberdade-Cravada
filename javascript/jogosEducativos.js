//* Detects which game was chosen and redirects user to the page with such game
for (const gameClicked of document.querySelectorAll(".divGame")) {
    gameClicked.addEventListener("click", () => {
        let game = gameClicked.id;
        sessionStorage.setItem("game", game);
        window.location.href = "./Jogo.html";
    });
};