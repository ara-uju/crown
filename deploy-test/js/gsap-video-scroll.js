
document.addEventListener('DOMContentLoaded', function () {
    // GSAP and ScrollTrigger setup for video control based on scroll position
    const video = document.querySelector(".video-test");

    // Utilize the current source of the video for potential future operations
    let src = video.currentSrc || video.src;

    console.log(video);

    // Function to handle one-time event listeners
    // Used here to ensure video playback compatibility on iOS devices
    function once(el, event, fn, opts) {
        var onceFn = function (e) {
            el.removeEventListener(event, onceFn);
            fn.apply(this, arguments);
        };
        el.addEventListener(event, onceFn, opts);
        return onceFn;
    }

    // iOS devices require the video to be played & paused to be 'activated'
    once(document.documentElement, "touchstart", function (e) {
        video.play();
        video.pause();
    });

    // Creating a GSAP timeline with ScrollTrigger configuration
    // This timeline controls the current time of the video based on scroll position
    let tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
            trigger: "#container", // The element that triggers the scroll animation
            start: "top top",     // Animation starts when the top of trigger hits the top of viewport
            end: "+=500vh", // Animation ends when the bottom of trigger hits the bottom of viewport
            pin: true,
            scrub: true           // Makes the animation scrub (stick) with the scroll bar
        }
    });

    // Setting the video's current time based on the scroll position
    once(video, "loadedmetadata", () => {
        tl.fromTo(video,{ 
            currentTime: 0 
        },{ 
            currentTime: video.duration || 1 
        }
        );
    });

    // Re-enable the Blob loading mechanism for the video
    // This approach might be useful for specific playback issues or data handling
    setTimeout(function () {
        if (window["fetch"]) {
            fetch(src)
                .then((response) => response.blob())
                .then((response) => {
                    var blobURL = URL.createObjectURL(response);
                    var t = video.currentTime;
                    video.setAttribute("src", blobURL);
                    video.currentTime = t + 0.01;
                });
        }
    }, 1000);

});