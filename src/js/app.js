// Dark mode
const buttonDark = document.getElementById("dark-mode-button");
let darkModeActive = false;

function darkMode() {
  var element = document.body;
  darkModeActive = !darkModeActive;

  if (darkModeActive) {
    element.classList.add("dark-mode");
    anime({
      targets: ".morph .mode",
      d: [
        {
          value:
            "M20.5 30.8647C20.4253 47.9854 35 61.9997 30.8647 61.9997C13.7441 61.9249 -0.0744019 47.9854 0.000301466 30.8647C0.0750049 13.7441 14.0146 -0.0744019 31.1352 0.000301466C35 0.000301466 20.5747 13.7441 20.5 30.8647Z",
        },
      ],
      easing: "easeOutQuad",
      fill: "#FFD87B",
      duration: 700,
    });
  } else {
    element.classList.remove("dark-mode");
    anime({
      targets: ".morph .mode",
      d: [
        {
          value:
            "M62.1344 31.2703C62.0597 48.3909 48.1201 62.2094 30.9995 62.1347C13.8788 62.06 0.0603637 48.1204 0.135067 30.9997C0.20977 13.8791 14.1494 0.0606078 31.27 0.135311C48.3907 0.210015 62.2091 14.1496 62.1344 31.2703Z",
        },
      ],
      easing: "easeOutQuad",
      fill: "#FDB813",
      duration: 700,
    });
  }
}

buttonDark.removeEventListener("click", darkMode);
buttonDark.addEventListener("click", darkMode);



// CLOCK
let currentCity = "America/Toronto";
document.getElementById("city").addEventListener("click", function () {
  if (currentCity === "America/Toronto") {
    currentCity = "Europe/Paris";
    document.getElementById("city").textContent = "Paris";
  } else {
    currentCity = "America/Toronto";
    document.getElementById("city").textContent = "Montréal";
  }
});

let clockF = async function () {
  try {
    let response = await fetch(
      `http://worldtimeapi.org/api/timezone/${currentCity}`
    );
    let data = await response.json();

    let h = data.datetime.slice(11, 13);
    let m = data.datetime.slice(14, 16);
    let s = data.datetime.slice(17, 19);

    document.getElementById("clock_hours").innerHTML = h;
    document.getElementById("clock_minutes").innerHTML = m;
    document.getElementById("clock_seconds").innerHTML = s;

    let M = parseInt(s) + data.datetime.slice(20, 23) * 0.001;
    document.getElementById("svg_s").style.transform = `rotate(${M * 6}deg)`;
    document.getElementById("svg_m").style.transform = `rotate(${m * 6}deg)`;
    document.getElementById("svg_h").style.transform = `rotate(${h * 30}deg)`;
  } catch (error) {
    console.error("Error fetching the time:", error);
  }
};

window.setInterval(clockF, 1000);



// TIMER
document.addEventListener("DOMContentLoaded", function () {
  const minutesInput = document.getElementById("minutes");
  const secondsInput = document.getElementById("seconds");
  const startTimerButton = document.getElementById("startTimer");
  const stopTimerButton = document.getElementById("stopTimer");
  const timerSVG = document.getElementById("timer");
  const rectangles = timerSVG.querySelectorAll("rect");

  let animationTimeout;
  let animationPaused = false;
  let remainingTime = 0;


  function updateTimeRemainingDisplay(remainingTime) {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    minutesInput.value = String(minutes).padStart(2, "0");
    secondsInput.value = String(seconds).padStart(2, "0");
  }

  function startOrResumeColorChangeAnimation() {
    if (animationPaused) {
      remainingTime = parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);
    } else {
      const minutesInputValue = parseInt(minutesInput.value);
      const secondsInputValue = parseInt(secondsInput.value);
      remainingTime = minutesInputValue * 60 + secondsInputValue;
    }

    const delayIncrement = (remainingTime * 1000) / rectangles.length;

    if (animationPaused || remainingTime > 0) {
      rectangles.forEach((rect, index) => {
        rect.style.animationPlayState = "running";
      });
      minutesInput.disabled = false;
      secondsInput.disabled = false;
      animationPaused = false;
    }

    rectangles.forEach((rect, index) => {
      rect.style.animation = "none";
      rect.getBoundingClientRect();
    });

    rectangles.forEach((rect, index) => {
      rect.style.animation = `colorChangeAnimation ${remainingTime}s linear forwards ${
        index * delayIncrement
      }ms`;
    });

    animationTimeout = setInterval(function () {
      if (remainingTime > 0) {
        remainingTime--;
        updateTimeRemainingDisplay(remainingTime);
      } else {
        clearInterval(animationTimeout);
        stopColorChangeAnimation();
      }
    }, 1000);
  }

  function stopColorChangeAnimation() {
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    startTimerButton.disabled = false;
    stopTimerButton.disabled = false;
    rectangles.forEach((rect) => {
      rect.style.animationPlayState = "paused";
    });

    clearInterval(animationTimeout);
    animationPaused = true;
  }

  startTimerButton.addEventListener("click", startOrResumeColorChangeAnimation);
  stopTimerButton.addEventListener("click", stopColorChangeAnimation);
});



//STOP WATCH
let watch = function () {
  let s = document.getElementById("watch_s").value;
  let m = document.getElementById("watch_m").value;
  let h = document.getElementById("watch_h").value;
  let i;

  let tick = function () {
    s = document.getElementById("watch_s").value;
    m = document.getElementById("watch_m").value;
    h = document.getElementById("watch_h").value;
    if (s == 59) {
      s = 0;
      m++;
    } else if (m == 59) {
      m = 0;
      h++;
    } else {
      s++;
    }
    document.getElementById("watch_s").value = s;
    document.getElementById("watch_m").value = m;
    document.getElementById("watch_h").value = h;
  };

  document.getElementById("watch_start").addEventListener("click", function () {
    i = setInterval(tick, 1000);
  });
  document.getElementById("watch_stop").addEventListener("click", function () {
    clearInterval(i);
  });
  document.getElementById("watch_reset").addEventListener("click", function () {
    document.getElementById("watch_s").value = 0;
    document.getElementById("watch_m").value = 0;
    document.getElementById("watch_h").value = 0;
  });
};
watch();


function ui() {
  let c = document.getElementById("clock");
  let d = document.getElementById("countdown");
  let w = document.getElementById("stopwatch");

  let buttonClock = document.getElementById("buttonClock");
  let buttonTimer = document.getElementById("buttonTimer");
  let buttonStop = document.getElementById("buttonStop");

  let C = document.getElementById("nav_clock");
  let D = document.getElementById("nav_down");
  let W = document.getElementById("nav_watch");

  c.style.display = "flex";
  buttonClock.classList.add("active");
  c.classList.add("show");
  d.style.display = "none";
  w.style.display = "none";

  function setActiveButton(activeButton) {

    buttonClock.classList.remove("active");
    buttonTimer.classList.remove("active");
    buttonStop.classList.remove("active");

    activeButton.classList.add("active");
  }

  C.addEventListener("click", function () {
    c.style.display = "flex";
    d.style.display = "none";
    w.style.display = "none";
    setActiveButton(buttonClock);
  });
  D.addEventListener("click", function () {
    c.style.display = "none";
    d.style.display = "flex";
    w.style.display = "none";
    setActiveButton(buttonTimer);
  });
  W.addEventListener("click", function () {
    c.style.display = "none";
    d.style.display = "none";
    w.style.display = "flex";
    setActiveButton(buttonStop);
  });
}

ui();
