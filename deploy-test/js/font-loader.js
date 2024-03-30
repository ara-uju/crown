console.clear();
document.addEventListener('DOMContentLoaded', function () {

    const fontName = ["DM Serif Display", "Jost", "Rubik Glitch Pop", "Climate Crisis", "Dancing Script", "Pixelify Sans", "Oswald", "Paytone One", "Passion One", "Noto Sans Display", "Noto Sans KR"];

    imagesLoaded(document.querySelectorAll('img'), function () {

        // load fonts after loading all imgs
        var fontLoader = new FontLoader(fontName, {
            "fontLoaded": function (font) {
                // One of the fonts was loaded
                console.log("font loaded: " + font.family);
            },
            "complete": function (error) {
                if (error !== null) {
                    // Reached the timeout but not all fonts were loaded
                    console.log(error.message);
                    console.log(error.notLoadedFonts);
                } else {
                    // All fonts were loaded
                    console.log("all fonts were loaded - removing preloader");

                    window.scrollTo(0, 0);

                    // LOADER
                    gsap.timeline().to(".preloader", {
                        opacity: 0,
                        delay: 1.5,
                        duration: 2,
                        onComplete: () => {
                            document.querySelector(".preloader").remove();
                        }
                    }).fromTo(".popup-container .popup-el", {
                        yPercent: 100,
                        opacity: 0
                    }, {
                        yPercent: 0,
                        opacity: 1,
                        delay: .5,
                        stagger: .2,
                        duration: .4,
                        ease: "power3.out"
                    }).to(".popup-container .popup-el", {
                        delay: 2,
                        yPercent: 100,
                        opacity: 0,
                        stagger: .08,
                        duration: .4,
                        ease: "power3.out"
                    });

                }
            }
        }, 5000);
        fontLoader.loadFonts();

    });

}); // Doc loaded