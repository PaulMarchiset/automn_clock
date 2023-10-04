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

let clockF = async function () {
  try {
    // Fetch the current time from the WorldTimeAPI
    let response = await fetch(
      "http://worldtimeapi.org/api/timezone/Etc/GMT-4"
    );
    let data = await response.json();

    // Extract hours, minutes, and seconds from the API response
    let h = data.datetime.slice(11, 13);
    let m = data.datetime.slice(14, 16);
    let s = data.datetime.slice(17, 19);

    // Update the HTML elements with the fetched time
    document.getElementById("clock_hours").innerHTML = h;
    document.getElementById("clock_minutes").innerHTML = m;
    document.getElementById("clock_seconds").innerHTML = s;

    // Calculate the rotation angles for the clock hands
    let M = parseInt(s) + data.datetime.slice(20, 23) * 0.001;
    document.getElementById("svg_s").style.transform =
      "rotate(" + M * 6 + "deg)";
    document.getElementById("svg_m").style.transform =
      "rotate(" + m * 6 + "deg)";
    document.getElementById("svg_h").style.transform =
      "rotate(" + h * 30 + "deg)";
  } catch (error) {
    console.error("Error fetching the time:", error);
  }
};

// Refresh the clock every 1000 milliseconds (1 second)
window.setInterval(clockF, 1000);

//    window.setInterval(clockF,1000);

//COUNT DOWN
let countdown = function () {
  let s = document.getElementById("down_s").value;
  let m = document.getElementById("down_m").value;
  let i;

  let tick = function () {
    s = document.getElementById("down_s").value;
    m = document.getElementById("down_m").value;
    if (s == 0) {
      s = 59;
      m--;
    } else {
      s--;
    }
    document.getElementById("down_s").value = s;
    document.getElementById("down_m").value = m;

    if (s == 0 && m == 0) {
      clearInterval(i);
      setTimeout(function () {
        document.getElementById("down_s").value = 10;
      }, 2000);
      document.getElementById("blip").play();
    }
  };

  document.getElementById("down_start").addEventListener("click", function () {
    i = setInterval(tick, 1000);
  });
  document.getElementById("down_stop").addEventListener("click", function () {
    clearInterval(i);
  });
};
countdown();

//STOP WATCH
let watch = function () {
  let s = document.getElementById("watch_s").value;
  let m = document.getElementById("watch_m").value;
  let i;

  let tick = function () {
    s = document.getElementById("watch_s").value;
    m = document.getElementById("watch_m").value;
    if (s == 59) {
      s = 0;
      m++;
    } else {
      s++;
    }
    document.getElementById("watch_s").value = s;
    document.getElementById("watch_m").value = m;
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
      
