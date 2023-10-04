anime({
    targets: '.leaf_hero .leaf_orange',
    translateX: -20,
    rotate: -20,
    duration: 750,
    opacity: 1,
    direction: 'alternate',
    ease: 'easeInOutSine',
}) 

const buttonDark = document.getElementById("dark-mode-button");
let darkModeActive = false;

function darkMode() {
    var element = document.body;
    darkModeActive = !darkModeActive;

    if (darkModeActive) {
        element.classList.add("dark-mode");
        anime({
            targets: '.morph .mode',
            d: [{ value: 'M20.5 30.8647C20.4253 47.9854 35 61.9997 30.8647 61.9997C13.7441 61.9249 -0.0744019 47.9854 0.000301466 30.8647C0.0750049 13.7441 14.0146 -0.0744019 31.1352 0.000301466C35 0.000301466 20.5747 13.7441 20.5 30.8647Z' }],
            easing: 'easeOutQuad',
            fill: '#FFD87B',
            duration: 700,
        });
    } else {
        element.classList.remove("dark-mode");
        anime({
            targets: '.morph .mode',
            d: [{ value: 'M62.1344 31.2703C62.0597 48.3909 48.1201 62.2094 30.9995 62.1347C13.8788 62.06 0.0603637 48.1204 0.135067 30.9997C0.20977 13.8791 14.1494 0.0606078 31.27 0.135311C48.3907 0.210015 62.2091 14.1496 62.1344 31.2703Z' }],
            easing: 'easeOutQuad',
            fill: '#FDB813',
            duration: 700,
        });
    }
}

buttonDark.removeEventListener("click", darkMode);
buttonDark.addEventListener("click", darkMode);

const buttonLeaf = document.getElementById("buttonLeaf");
const elements = document.querySelectorAll('.staggering-axis-grid .leaf');

var isFDC209 = true;

function startAnimation() {
    isFDC209 = !isFDC209;

  // Define two colors
  var color1 = '#FDC209';
  var color2 = '#C36030';

  // Use a ternary operator to select the appropriate color based on the state
  var color = isFDC209 ? color1 : color2;

  console.log(color);

console.log(color);
    anime({
  targets: '.staggering-axis-grid .leaf',
  translateX: anime.stagger(15, {grid: [7, 2], from: 'center', axis: 'x'}),
  translateY: anime.stagger(15, {grid: [7, 2], from: 'center', axis: 'y'}),
  rotateZ: anime.stagger([0, 12], {grid: [7, 2], from: 'center', axis: 'x'}),
  delay: anime.stagger(50, {grid: [3, 2], from: 'center'}),
  easing: 'easeInOutQuad',
  opacity: [0, 1],
  endDelay: 200,
  direction: 'alternate'
  
});
anime({
      targets: '.buttonLeaf',
  fill: color,
  duration: 1000,  
  easing: 'easeInOutQuad',
});
}

buttonLeaf.removeEventListener("click", startAnimation);

buttonLeaf.addEventListener("click", startAnimation);

let clockF = async function () {
    try {
        // Fetch the current time from the WorldTimeAPI
        let response = await fetch('http://worldtimeapi.org/api/timezone/Europe/Paris');
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
        let M = parseInt(s) + (data.datetime.slice(20, 23) * 0.001);
        document.getElementById("svg_s").style.transform = "rotate(" + M * 6 + "deg)";
        document.getElementById("svg_m").style.transform = "rotate(" + m * 6 + "deg)";
        document.getElementById("svg_h").style.transform = "rotate(" + h * 30 + "deg)";
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
            }
            else {
                s--;
            }
            document.getElementById("down_s").value = s;
            document.getElementById("down_m").value = m;

            if (s == 0 && m == 0) {
                clearInterval(i);
                setTimeout(function() { document.getElementById("down_s").value = 10; }, 2000);
                document.getElementById("blip").play();
            }

        };

        document.getElementById("down_start").addEventListener("click", function() {
            i = setInterval(tick, 1000);
        });
        document.getElementById("down_stop").addEventListener("click", function() {
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
            }
            else {
                s++;
            }
            document.getElementById("watch_s").value = s;
            document.getElementById("watch_m").value = m;

        };

        document.getElementById("watch_start").addEventListener("click", function() {
            i = setInterval(tick, 1000);
        });
        document.getElementById("watch_stop").addEventListener("click", function() {
            clearInterval(i);
        });
        document.getElementById("watch_reset").addEventListener("click", function() {
            document.getElementById("watch_s").value = 0;
            document.getElementById("watch_m").value = 0;
            //clearInterval(i);
        });

    };
    watch();


    //NAVIGATION
    let ui = function () {
        let c = document.getElementById("clock");
        let d = document.getElementById("countdown");
        let w = document.getElementById("stopwatch");

        let C = document.getElementById("nav_clock");
        let D = document.getElementById("nav_down");
        let W = document.getElementById("nav_watch");

        c.style.display = "block";
        d.style.display = "none";
        w.style.display = "none";

        C.addEventListener("click", function () {
            c.style.display = "block";
            d.style.display = "none";
            w.style.display = "none";
        });
        D.addEventListener("click", function () {
            c.style.display = "none";
            d.style.display = "block";
            w.style.display = "none";
        });
        W.addEventListener("click", function () {
            c.style.display = "none";
            d.style.display = "none";
            w.style.display = "block";
        });
    };
    ui();
