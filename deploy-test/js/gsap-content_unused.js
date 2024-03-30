console.clear();
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {

  window.scroll(0, 0);

  // LOADER
  gsap.to(document.querySelector(".preloader:before"), {
    opacity: 0,
    duration: .4,
    onComplete: () => {
      document.querySelector("body").classList.remove("preloader");
    }
  });



  // INFINITE WINDOW
  
  // copy stripe layer code
  /*for(let i=0; i<8; i++) {
    let newLayer = document.querySelector(".stripe-layer").cloneNode(true);
    document.querySelector(".stripe-content").appendChild(newLayer);
  }*/

  for(let i=0; i<6; i++) {
    let newLayer = document.querySelector(".crown-exe").cloneNode(true);
    document.querySelector(".infinite-section .container").appendChild(newLayer);
  }
  
  // Pin Infinite Section
  gsap.timeline({
    scrollTrigger: {
      trigger: ".infinite-section",
      start: "top top",
      end: "+=500%",
      scrub: 1,
      pin: true,
      markers: true
    }
  });

  // Animate content
  /*gsap.timeline({
    scrollTrigger: {
      trigger: ".infinite-section",
      start: "top 30%",
      end: "+=200%",
      scrub: 1,
      markers: true
    }
  }).fromTo(".crown-exe", {
    scale: 0.05,
    rotate: "15deg"
  }, {
    scale: 1.5,
    rotate: "-5deg",
    duration: 2,
    transformOrigin: "center center"
  })
  .fromTo(".stripe-layer", {
    height: "25%",
    opacity: 1
  }, {
    stagger: -0.1,
    height: "90%",
    opacity: 1,
    transformOrigin: "center center",
    duration: .05
  }, "<")
  .fromTo(".stripe-layer", {
    //height: "25%",
    scale: .08
  }, {
    stagger: -0.1,
    //height: "90%",
    scale: 1.8,
    transformOrigin: "center center",
    duration: 2
  }, "<");*/

  gsap.timeline({
    scrollTrigger: {
      trigger: ".infinite-section",
      start: "top 30%",
      end: "+=200%",
      scrub: 1,
      markers: true
    }
  }).fromTo(".crown-exe", {
    scale: 0.05,
    //rotate: "15deg"
  }, {
    scale: 1.5,
    stagger: .08,
    //rotate: "-5deg",
    duration: 2,
    transformOrigin: "center center"
  });



}); //document onload