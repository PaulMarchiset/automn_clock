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
let currentCity = "America/Toronto"; // Initial city
document.getElementById("city").addEventListener("click", function () {
  // Toggle city
  if (currentCity === "America/Toronto") {
    currentCity = "Europe/Paris";
    document.getElementById("city").textContent = "Paris";
  } else {
    currentCity = "America/Toronto";
    document.getElementById("city").textContent = "Toronto";
  }
});

let clockF = async function () {
  try {
    let response = await fetch(`http://worldtimeapi.org/api/timezone/${currentCity}`);
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
  const timerRectangles = document.querySelectorAll('#timer rect');

  let totalSeconds = 0;
  let animationInterval;
  let animationPaused = false;

  function updateTimerDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    minutesInput.value = String(minutes).padStart(2, '0');
    secondsInput.value = String(seconds).padStart(2, '0');
  }

  function resetRectangles() {
    timerRectangles.forEach((rect) => {
      rect.style.animation = 'none';
      rect.style.animationPlayState = 'paused';
      rect.style.fill = 'white'; // Reset rectangle fill to white
    });
  }

  function startColorChangeAnimation() {
    resetRectangles();
    timerRectangles.forEach((rect, index) => {
      const delay = (totalSeconds * 1000 / timerRectangles.length) * index;
      rect.style.animation = `colorChangeAnimation ${totalSeconds}s linear ${delay}ms forwards`;
      rect.style.animationPlayState = 'running';
    });
  }

  function startTimer() {
    const minutesInputValue = parseInt(minutesInput.value);
    const secondsInputValue = parseInt(secondsInput.value);
    totalSeconds = minutesInputValue * 60 + secondsInputValue;
    updateTimerDisplay();
    startColorChangeAnimation();
    minutesInput.disabled = true;
    secondsInput.disabled = true;
    startTimerButton.disabled = true;
    stopTimerButton.disabled = false;

    if (animationInterval) {
      clearInterval(animationInterval);
    }

    animationInterval = setInterval(function () {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimerDisplay();
      } else {
        clearInterval(animationInterval);
        stopTimerButton.disabled = true;
        minutesInput.disabled = false;
        secondsInput.disabled = false;
        startTimerButton.disabled = false;
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(animationInterval);
    timerRectangles.forEach((rect, index) => {
      rect.style.animationPlayState = 'paused';
    });
    animationPaused = true;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    startTimerButton.disabled = false;
  }

  startTimerButton.addEventListener("click", startTimer);
  stopTimerButton.addEventListener("click", stopTimer);
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
        s++; }
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
    //clearInterval(i);
  });
};
watch();

//NAVIGATION
    // let ui = function () {
    // let c = document.getElementById("clock");
    // let d = document.getElementById("countdown");
    // let w = document.getElementById("stopwatch");

    // let buttonClock = document.getElementById("buttonClock");
    // let buttonTimer = document.getElementById("buttonTimer");
    // let buttonStop = document.getElementById("buttonStop");
    
    // let C = document.getElementById("nav_clock");
    // let D = document.getElementById("nav_down");
    // let W = document.getElementById("nav_watch");

    // c.style.display = "flex";
    // d.style.display = "none";
    // w.style.display = "none";

    // C.addEventListener("click", function () {
    //     c.style.display = "flex";
    //     d.style.display = "none";
    //     w.style.display = "none";
    //     buttonClock.style.fill = "#FDC209";
    //     buttonTimer.style.fill = "#C36030";
    //     buttonStop.style.fill = "#C36030";
    //     c.style.transition = "display 0.5s ease-in-out";
    // });
    // D.addEventListener("click", function () {
    //     c.style.display = "none";
    //     d.style.display = "flex";
    //     w.style.display = "none";
    //     buttonClock.style.fill = "#C36030";
    //     buttonTimer.style.fill = "#FDC209";
    //     buttonStop.style.fill = "#C36030";
    //     d.style.transition = "display 0.5s ease-in-out";
    // });
    // W.addEventListener("click", function () {
    //     c.style.display = "none";
    //     d.style.display = "none";
    //     w.style.display = "flex";
    //     buttonClock.style.fill = "#C36030";
    //     buttonTimer.style.fill = "#C36030";
    //     buttonStop.style.fill = "#FDC209";
    //     w.style.transition = "display 0.5s ease-in-out";
    // });
    // };
    // ui();

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
          // Remove the "active" class from all buttons
          buttonClock.classList.remove("active");
          buttonTimer.classList.remove("active");
          buttonStop.classList.remove("active");
      
          // Add the "active" class to the active button
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
