anime({
  targets: ".scrolling-arrow",
  translateY: [-2, 3],
  duration: 750,
  easing: "easeInOutQuad",
  direction: "alternate",
  loop: true
});

const resetBtn = document.getElementById("watch_reset");

let rotation = 0; 

resetBtn.addEventListener("click", () => {
  rotation -= 360;
  resetBtn.style.transform = `rotate(${rotation}deg)`;
  resetBtn.style.transition = `transform 1s ease-in-out`;
});



anime({
  targets: ".leaf_hero .leaf_orange",
  translateX: -20,
  rotate: -20,
  duration: 750,
  opacity: 1,
  direction: "alternate",
  ease: "easeInOutSine",
});

const buttonClock = document.getElementById("nav_clock");

function startAnimationClock() {
  anime({
    targets: ".staggering-axis-grid-clock .leaf",
    translateX: anime.stagger(15, { grid: [7, 2], from: "center", axis: "x" }),
    translateY: anime.stagger(15, { grid: [7, 2], from: "center", axis: "y" }),
    rotateZ: anime.stagger([0, 10], {
      grid: [7, 2],
      from: "center",
      axis: "x",
    }),
    delay: anime.stagger(50, { grid: [3, 2], from: "center" }),
    easing: "easeInOutQuad",
    opacity: [0, 1],
    endDelay: 200,
    direction: "alternate",
  });

  anime({
    targets: ".buttonLeaf",
    fill: color,
    duration: 1000,
    easing: "easeInOutQuad",
  });
}

buttonClock.removeEventListener("click", startAnimationClock);

buttonClock.addEventListener("click", startAnimationClock);

const buttonTimer = document.getElementById("nav_down");

function startAnimationTimer() {
  anime({
    targets: ".staggering-axis-grid-timer .leaf",
    translateX: anime.stagger(15, { grid: [7, 2], from: "center", axis: "x" }),
    translateY: anime.stagger(15, { grid: [7, 2], from: "center", axis: "y" }),
    rotateZ: anime.stagger([0, 10], {
      grid: [7, 2],
      from: "center",
      axis: "x",
    }),
    delay: anime.stagger(50, { grid: [3, 2], from: "center" }),
    easing: "easeInOutQuad",
    opacity: [0, 1],
    endDelay: 200,
    direction: "alternate",
  });

  anime({
    targets: ".buttonLeaf",
    fill: color,
    duration: 1000,
    easing: "easeInOutQuad",
  });
}

buttonTimer.removeEventListener("click", startAnimationTimer);

buttonTimer.addEventListener("click", startAnimationTimer);

const buttonStop = document.getElementById("nav_watch");

function startAnimationStop() {
  anime({
    targets: ".staggering-axis-grid-stop .leaf",
    translateX: anime.stagger(15, { grid: [7, 2], from: "center", axis: "x" }),
    translateY: anime.stagger(15, { grid: [7, 2], from: "center", axis: "y" }),
    rotateZ: anime.stagger([0, 10], {
      grid: [7, 2],
      from: "center",
      axis: "x",
    }),
    delay: anime.stagger(50, { grid: [3, 2], from: "center" }),
    easing: "easeInOutQuad",
    opacity: [0, 1],
    endDelay: 200,
    direction: "alternate",
  });

  anime({
    targets: ".buttonLeaf",
    fill: color,
    duration: 1000,
    easing: "easeInOutQuad",
  });
}

buttonStop.removeEventListener("click", startAnimationStop);

buttonStop.addEventListener("click", startAnimationStop);
