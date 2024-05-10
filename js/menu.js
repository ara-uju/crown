document.addEventListener('DOMContentLoaded', function () {

    let aboutBtn = document.querySelector(".about");
    let menuOpen = false;

    // Click event listener
    aboutBtn.addEventListener('click', function () {
        if(!menuOpen) {
            showMenu();
        } else {
            hideMenu();
        }
    });

    function showMenu() {
        document.querySelector("body").classList.add("show-menu");

        document.querySelectorAll(".info-about .svg-container").forEach((square)=> {
            square.classList.add("grow");
        });

        menuOpen = true;
    }

    function hideMenu() {
        document.querySelector("body").classList.remove("show-menu");

        document.querySelectorAll(".info-about .svg-container").forEach((square)=> {
            square.classList.remove("grow");
        });

        menuOpen = false;
    }
});