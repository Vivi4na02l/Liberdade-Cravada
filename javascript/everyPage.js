document.querySelector("#iconHamburger").addEventListener("click", () => {
    document.querySelector("#menuHamburgerBg").style.display = "flex";
    document.querySelector("#menuHamburger").style.right = "0%";
})

document.querySelector("#btnCloseHamburger").addEventListener("click", closeMenuHamburger);
document.querySelector("#menuHamburgerBg").addEventListener("click", closeMenuHamburger);

function closeMenuHamburger() {
    document.querySelector("#menuHamburgerBg").style.display = "none";

    if (window.innerWidth > 767) {
        document.querySelector("#menuHamburger").style.right = "-45%";
    } else {
        document.querySelector("#menuHamburger").style.right = "-70%";
    }
};