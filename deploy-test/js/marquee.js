document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    let textWidthOffset = document.querySelectorAll(".window-layer .marquee .text")[0].offsetWidth + 10;
    let loopDuration = 10;

    ScrollTrigger.create({
        trigger: ".vertical-scroller-section",
        start: "top bottom",
        onEnter: () => {
            gsap.fromTo(".scroller-container .text", {
                x: document.querySelectorAll(".scroller-container .text")[0].offsetWidth + 10
            },
                {
                    duration: 60,
                    ease: "none",
                    x: -document.querySelectorAll(".scroller-container .text")[0].offsetWidth + 10,
                    repeat: -1
                });
        }
    });


    ScrollTrigger.create({
        trigger: ".footer-section-upper",
        start: "top bottom",
        onEnter: () => {
            gsap.timeline().fromTo(".horizontal .marquee .text", {
                x: -textWidthOffset
            },
                {
                    duration: loopDuration,
                    ease: "none",
                    x: "+=" + textWidthOffset,
                    /*modifiers: {
                        x: gsap.utils.unitize(x => parseFloat(x) % textWidthOffset) // reset x, reposition element seamlessly
                    },*/
                    repeat: -1
                }).fromTo(".vertical .marquee .text", {
                    x: -textWidthOffset
                },
                    {
                        duration: loopDuration + 1,
                        ease: "none",
                        x: "+=" + textWidthOffset,
                        /*modifiers: {
                            x: gsap.utils.unitize(x => parseFloat(x) % textWidthOffset) // reset x, reposition element seamlessly
                        },*/
                        repeat: -1
                    }, "<");
        }
    });
});