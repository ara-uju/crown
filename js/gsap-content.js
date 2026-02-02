gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });

  ScrollTrigger.refresh();


  // helper function to load and play video
  function loadAndPlayVideo(videoEl) {
    if (!videoEl) return;

    console.log("loading and playing ", videoEl);
    if (videoEl.dataset.loaded === 'true') {
      videoEl?.play().catch(() => {
        console.log("video failed to play");
      });
      return;
    }

    const sources = videoEl.querySelectorAll('source');
    sources.forEach((source) => {
      const src = source.dataset.src;
      if (src && !source.src) {
        source.setAttribute('src', src);
      }
      console.log("video SRC", source.src);
    });

    videoEl.load();
    videoEl.dataset.loaded = 'true';
    videoEl.play().catch(() => {
      console.log("video failed to play");
    });
  }

  // helper function to pause video
  function pauseVideo(videoEl) {
    if (videoEl) {
      videoEl.pause();
      // videoEl.loop = false;
    }
  }


  // DESKTOP
  const folder = document.querySelector(".folder-container");
  let windowHeight = window.innerHeight;

  folder.addEventListener("click", () => {
    folder.classList.add("selected");
    document.querySelector("#desktop").classList.add("ootd");

    let selectTimeout = setTimeout(() => {
      window.scroll({
        top: windowHeight,
        behavior: "smooth",
      });

      clearTimeout(selectTimeout);
    }, 1800);
  });

  // INTRO TYPE
  const ootd = document.querySelector(".ootd");
  let ootdFontList = ["dm-serif", "pixelify-sans", "rubik-glitch", "jost-nine", "oswald", "dancing-script", "climate-crisis"];
  let currentClass = null;

  // OOTD
  ScrollTrigger.create({
    trigger: ".ootd-section",
    start: "top 5%",
    end: "+=300%",
    toggleActions: "play reverse play reverse",
    anticipatePin: 1,
    scrub: 1,
    pin: true,
    onEnter: () => {
      if (docReady) {
        document.querySelector("#desktop").classList.add("hide");
        ScrollTrigger.refresh();
      }
    },
    onUpdate: (self) => {
      let index = Math.floor(self.progress * (ootdFontList.length - 1));

      if (currentClass) {
        ootd.classList.remove(currentClass);
      }
      ootd.classList.add(ootdFontList[index]);

      currentClass = ootdFontList[index];
    }
  });

  // THIS MY
  gsap.timeline({
    scrollTrigger: {
      trigger: ".this-my-section",
      start: "top top",
      //end: "+=250%",
      toggleActions: "play reverse play reverse",
      scrub: 1,
      pin: true,
      //pinSpacing: false
    }
  })
    .from(".this-my-section", {
      opacity: 0,
      duration: 0
    })
    .from(".this-my-section .container > h2 span", { // show first frame
      display: "none",
      stagger: 0.5
    }, "<")
    .to(".this-my-section .container > h2 span", { // hide
      display: "none"
    })
    .fromTo(".this-my-section .this-my-container", { // show second frame
      display: "none"
    }, {
      display: "flex",
      stagger: 1
    })
    .to(".this-my-section .this-my-container", { // hide
      display: "none"
    })
    .fromTo(".this-my-section .this-my-container-two", { // show second frame
      display: "none"
    }, {
      display: "flex",
      stagger: 1
    })
    .to(".this-my-section .this-my-container-two", { // hide
      display: "none"
    });

  // THIS MY FASHION
  gsap.timeline({
    scrollTrigger: {
      trigger: ".this-my-fashion-section",
      start: "top top",
      end: "+=500%",
      toggleActions: "play reverse play reverse",
      scrub: 1,
      pin: ".this-my-fashion-section .window-container",
      pinSpacing: true,
      //pinSpacing: false,
      markers: false
    }
  })
    .from(".panel-container .window-container", {
      opacity: 0,
      duration: .1
    })
    .to(".this-my-section .this-my-container-two", {
      delay: .25,
      opacity: 0,
      duration: 0.01
    }, "<")
    .from(".this-my-fashion-section h2", { // show first frame
      display: "none",
      stagger: 0.5,
      onComplete: () => {
        document.querySelector(".this-my-fashion-section h2").classList.add("regular");
        document.querySelector(".this-my-fashion-section").classList.add("white-bg");
      }
    })
    .to(".this-my-fashion-section h2", { // hide
      display: "none",
      onComplete: () => {
        document.querySelector(".this-my-fashion-section h2").classList.remove("regular");
      }
    })
    .fromTo(".this-my-fashion-section p", { // show second frame
      display: "none",
      scale: 3
    }, {
      display: "flex",
      scale: 1,
      stagger: 1
    })
    .fromTo(".this-my-fashion-section .this-my-fashion-container>div", { // show second frame
      display: "none"
    }, {
      display: "flex"
    })
    .from(".this-my-fashion-section .this-my-fashion-container>div.left", {
      xPercent: -50,
      ease: "power2.out"
    }, "<")
    .from(".this-my-fashion-section .this-my-fashion-container>div.right", {
      xPercent: 100,
      ease: "power2.out"
    }, "<")
    .to(".panel-container .window-container", {
      scale: 1,
      duration: .6,
      ease: "power2.out"
    }, "<")
    .to(".panel-container .window-container", {
      delay: 1,
      scale: 0,
      xPercent: 80,
      yPercent: 200,
      duration: .4,
      ease: "power3.out",
      onComplete: () => {
        document.querySelector(".this-my-fashion-section").classList.remove("white-bg");
      }
    })
    .to(".this-my-fashion-section .this-my-fashion-container>div", { // hide
      display: "none"
    });

  // progress bar for the above animation section
  gsap.timeline({
    scrollTrigger: {
      trigger: ".panel-container",
      start: "top top",
      end: "bottom top",
      pin: ".horizontal-progress-bar",
      toggleActions: "play reverse play reverse",
      scrub: 1
    }
  })
    .to(".horizontal-progress-bar .progress-bar-inner", {
      width: "100%"
    });


  const dongieBleh = document.querySelector(".bleh");
  const introVideos = document.querySelectorAll('.single-word-section.left video');

  // SHUT UP - NO - MORE - QUESTIONS
  gsap.timeline({
    scrollTrigger: {
      trigger: ".single-word-section",
      start: "top top",
      end: "+=600%",
      pin: true,
      toggleActions: "play resume play reverse",
      scrub: true,
      markers: false,
      onEnter: () => {
        introVideos.forEach((video) => {
          loadAndPlayVideo(video);
        });
      },
      onEnterBack: () => {
        introVideos.forEach((video) => {
          loadAndPlayVideo(video);
        });
      },
      onLeave: () => {
        introVideos.forEach((video) => {
          pauseVideo(video);
        });
      },
      onLeaveBack: () => {
        introVideos.forEach((video) => {
          pauseVideo(video);
        });
      }
    }
  })
    .from(".horizontal-progress-bar .progress-bar-inner", {
      width: "0%"
    })
    .from(".shut-up", {
      opacity: 0,
      x: "25%",
      duration: .1,
      ease: "power3.out"
    }, "<")
    .fromTo(".shut-up span", {
      opacity: 0,
      x: "25%"
    }, {
      opacity: 1,
      x: "0%",
      stagger: .5,
      ease: "power1.out"
    }, "<")
    .to(".shut-up", { //shut up
      opacity: 0,
      x: "-25%",
      ease: "power3.out"
    })
    .from(".no", {
      opacity: 0,
      x: "25%",
      ease: "power3.out"
    }, "<")
    .to(".no", { //no
      opacity: 0,
      x: "-25%",
      ease: "power3.out"
    })
    .from(".more", {
      opacity: 0,
      x: "25%",
      ease: "power3.out"
    }, "<")
    .to(".more", { //more
      opacity: 0,
      x: "-25%",
      ease: "power3.out"
    })
    .from(".questions", {
      opacity: 0,
      x: "25%",
      duration: .1,
      ease: "power3.out"
    }, "<")
    .fromTo(".questions span", {
      opacity: 0,
      x: "25%"
    }, {
      opacity: 1,
      x: "0%",
      stagger: .5,
      ease: "power1.out"
    }, "<")
    .to(".questions", { //questions
      opacity: 0,
      x: "-25%",
      ease: "power3.out",
      onComplete: () => {
        gsap.fromTo(".window-container.handong-exe",
          {
            height: "0%",
            opacity: 0
          },
          {
            height: "auto",
            opacity: 1,
            delay: .25,
            duration: .15,
            ease: "power2.out",
            onStart: () => {
              loadAndPlayVideo(dongieBleh);
            },
            onComplete: () => {
              let timeout = setTimeout(() => {
                gsap.to(".window-container.handong-exe",
                  {
                    height: "0%",
                    opacity: 0,
                    duration: .25,
                    ease: "power2.out"
                  });
                clearTimeout(timeout);
              }, 1000);
            }
          })
      }
    });

  let scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".single-word-section",
      start: "top top",
      end: "+=850%",
      toggleActions: "play resume play reverse",
      scrub: true
    }
  })
    .fromTo(".bg-img-container", {
      xPercent: 100
    }, {
      xPercent: 0,
      stagger: .5,
      duration: 1
    }, "<")
    .fromTo(".bg-img-container video", {
      xPercent: -150
    },
      {
        xPercent: 0,
        //stagger: .25,
      }, "<");

  // VERTICAL SCROLLER
  // Content enter - stripes - popup - bg video
  const bgVideo = document.querySelector("video.ootd-background");
  gsap.timeline({
    scrollTrigger: {
      trigger: ".vertical-scroller-section",
      start: "top top",
      end: "bottom top",
      pin: ".vertical-scroller-section .container-fixed",
      pinSpacing: true,
      toggleActions: "play resume play reverse",
      scrub: false,
      onEnter: () => {
        loadAndPlayVideo(bgVideo);
        bgVideo.loop = true;
      },
      onEnterBack: () => {
        loadAndPlayVideo(bgVideo);
        bgVideo.loop = true;
      },
      onLeave: () => {
        //bgVideo.pause();
        bgVideo.loop = false;
      },
      onLeaveBack: () => {
        //bgVideo.pause();
        bgVideo.loop = false;
      }
    }
  })
    .from(".vertical-scroller-section .stripe:nth-child(1)", {
      yPercent: -100,
      opacity: 0,
      duration: .45,
      ease: "power1.out",
      onStart: () => {
        gsap.to(".window-container.handong-exe", {
          delay: 0.1,
          height: "0%",
          opacity: 0,
          duration: .25,
          ease: "power2.out"
        });
      }
    }, "+=0%")
    .from(".vertical-scroller-section .stripe:nth-child(2)", {
      yPercent: 100,
      opacity: 0,
      duration: .45,
      ease: "power1.out"
    }, "<")
    .to(".vertical-scroller-section .background-video-container", {
      opacity: 1,
      delay: .4,
      ease: "power2.out"
    });

  // popups - window containers
  const windowContainer = document.querySelectorAll(".vertical-scroller-section .window-scroll-reveal");
  windowContainer.forEach((windowEl) => {
    //let windowParent = windowEl.parentElement;
    let windowVideo = windowEl.querySelector("video");

    gsap.timeline({
      scrollTrigger: {
        trigger: windowEl,
        start: "top 80%",
        end: "+=200%",
        //pin: windowParent,
        toggleActions: "play reverse play reverse",
        scrub: false,
        onEnter: () => {
          if (windowVideo) {
            loadAndPlayVideo(windowVideo);
            windowVideo.loop = true;
          }
        },
        onEnterBack: () => {
          if (windowVideo) {
            loadAndPlayVideo(windowVideo);
            windowVideo.loop = true;
          }
        },
        onLeave: () => pauseVideo(windowVideo),
        onLeaveBack: () => pauseVideo(windowVideo)
      }
    }).fromTo(windowEl, {
      scale: 0
    }, {
      scale: 1,
      stagger: .5,
      duration: .45,
      ease: "power2.out"
    });
  });


  const clapBg = document.querySelector(".clap-bg");
  const clapVideo = document.querySelector(".window-container.ready-action video");

  // ready - action
  gsap.timeline({
    scrollTrigger: {
      trigger: ".container-inner-action",
      start: "top center",
      end: "+=300%",
      pin: ".container-inner-action",
      toggleActions: "play resume play resume",
      scrub: true,
      onLeave: () => {
        clapBg.classList.remove("show");
      },
      onLeaveBack: () => {
        gsap.to(".window-container.ready-action", {
          height: 0,
          opacity: 0,
          duration: 0
        });
        clapBg.classList.remove("show");
      }
    }
  })
    .from(".text-ready", {
      xPercent: -100,
      opacity: 0,
      duration: .2,
      ease: "power2.inout"
    }).to(".container-fixed", {
      delay: .2,
      opacity: 0,
      duration: .4,
      ease: "power1.out"
    }, "<").to(".text-ready", {
      delay: .05,
      xPercent: 200,
      opacity: 0,
      duration: .1,
      ease: "power2.inout",
      onComplete: () => {
        gsap.fromTo(".window-container.ready-action", {
          height: "0%",
          opacity: 0
        }, {
          height: "auto",
          opacity: 1,
          duration: .2,
          ease: "power2.out",
          onStart: () => {
            loadAndPlayVideo(clapVideo);
            clapBg.classList.add("show");
          }
        });
      }
    })
    .from(".text-action", {
      xPercent: -100,
      opacity: 0,
      duration: .2,
      ease: "power2.inout"
    }, "<")
    .to(".text-action", {
      delay: .3,
      xPercent: 200,
      opacity: 0,
      duration: .15,
      ease: "power2.inout",
      onComplete: () => {
        gsap.to(".window-container.ready-action", {
          height: 0,
          opacity: 0
        });
        document.querySelector(".clap-bg").classList.remove("show");
      }
    });

  // scrolling - progress bar (scrub)
  gsap.timeline({
    scrollTrigger: {
      trigger: ".vertical-scroller-section .container",
      start: "top top",
      end: "bottom bottom",
      toggleActions: "play resume play reverse",
      scrub: true
    }
  })
    .from(".progress-bar .progress-bar-inner", {
      height: "0%"
    });


  // INFINITE WINDOW

  // copy stripe layer code
  let nStripeLayers = 8;
  if (window.innerWidth <= 767) {
    nStripeLayers = 5;
  }

  for (let i = 0; i < nStripeLayers; i++) {
    let newLayer = document.querySelector(".stripe-layer").cloneNode(true);
    newLayer.style.zIndex = 8 - i;
    document.querySelector(".stripe-content").appendChild(newLayer);
  }

  const damiLastVideo = document.querySelector(".crown-exe video");

  // Window.exe - do you believe in the power of the crown?
  gsap.timeline({
    scrollTrigger: {
      trigger: ".footer-section-wrapper", // previously infinite-section
      start: "top top",
      //end: "+=250%",
      pin: ".footer-section-upper",
      anticipatePin: 1,
      toggleActions: "play reverse play reverse",
      scrub: 1,
      onEnter: () => {
        loadAndPlayVideo(damiLastVideo);
      },
      onLeaveBack: () => {
        pauseVideo(damiLastVideo);
      }
    }
  }).from(".crown-exe", {
    opacity: 0,
    duration: .5
  })
    .fromTo(".crown-exe", {
      scale: 0.01,
      rotate: "15deg"
    }, {
      scale: 1,
      rotate: "0deg",
      duration: 1.5
    }, "<")
    .from(".stripe-layer", {
      height: "0vh",
      scale: "initial"
    }, "<")
    .to(".stripe-layer", {
      stagger: 0.05,
      //height: "90%",
      scale: 1.5,
      //width: "100vw",
      height: "100vh",
      duration: 2
    })
    .to(".crown-exe", {
      delay: .2,
      rotate: "-5deg",
      duration: 2.5,
      scale: 2.25,
      width: "100vw",
      height: "100vh",
      opacity: 0
    }, "<")
    .fromTo(".crown-exe .absolute", {
      height: "0%",
      scale: 1
    }, {
      height: "auto",
      scale: 2.2,
      duration: 1,
      onStart: () => {
        loadAndPlayVideo(crownExeVideo);
      }
    }, .99)
    .to(".crown-exe .absolute:after", {
      opacity: 1
    }, ">");

  const crownVidContainer = document.querySelector(".crown-video-container");
  const crownVideoMsg = document.querySelector(".crown-video-message");
  const crownS = document.querySelector(".crown-video-section");
  const crownExeVideo = document.querySelector(".crown-video");

  // Crown reveal
  gsap.timeline({
    scrollTrigger: {
      trigger: ".footer-section-wrapper",
      start: "30% top",
      end: "bottom bottom",
      pin: crownVidContainer,
      toggleActions: "play reverse play reverse",
      scrub: 1,
      onUpdate: function (self) {
        if (self.progress <= .42) {
          crownVideoMsg.innerHTML = "only the crown";
        } else if (self.progress > .42 && self.progress <= .56) {
          crownVideoMsg.innerHTML = "can determine";
        } else {
          crownVideoMsg.innerHTML = "fate";
        }
      },
      onEnter: () => {
        loadAndPlayVideo(crownExeVideo);
      },
      onLeaveBack: () => {
        pauseVideo(crownExeVideo);
      }
    }
  }).fromTo(crownS, {
    opacity: 0
  }, {
    opacity: 1,
    duration: .5,
    onUpdate: () => {
      let randomN = Math.random(1);

      if (randomN > 1 && randomN < 3) {
        crownS.setAttribute('style', 'mix-blend-mode: difference');
      } else if (randomN >= 3 && randomN < 8) {
        crownS.setAttribute('style', 'mix-blend-mode: multiply');
      } else {
        crownS.setAttribute('style', 'mix-blend-mode: lighten');
      }
    }
  }, "<")
    .fromTo(crownVidContainer, {
      yPercent: 0,
      scale: 3,
      opacity: 0
    }, {
      yPercent: 18,
      scale: 2.5,
      opacity: 1,
      ease: "power3.out"
    }, "<")
    .fromTo(crownVideoMsg, {
      display: "none"
    }, {
      display: "flex",
      duration: .5
    })
    .to(crownVideoMsg, {
      display: "none",
      duration: 0
    })
    .to(".interface-overlay-container", {
      opacity: 0,
      duration: .5
    }, "<")
    .fromTo(crownVidContainer, {
      scale: 2.5
    }, {
      scale: .5,
      yPercent: 10,
      ease: "power3.inout",
      duration: .45,
      onComplete: () => {
        gsap.to(".footer-text-container", {
          delay: .25,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out"
        });
      }
    }, "<");

}); // Doc loaded