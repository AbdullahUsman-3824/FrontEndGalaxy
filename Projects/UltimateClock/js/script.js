// ------------------------ANALOGE CLOCK LOGIC------------------------

let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let second = document.getElementById("second");

setInterval(() => {
  let d = new Date();
  let hr = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();

  let hRotation = 30 * hr + min / 2;
  let mRotation = 6 * min;
  let sRotation = 6 * sec;

  hour.style.transform = `rotate(${hRotation}deg)`;
  minute.style.transform = `rotate(${mRotation}deg)`;
  second.style.transform = `rotate(${sRotation}deg)`;
}, 1000);

// ------------------------DIGITAL CLOCK LOGIC------------------------
setInterval(() => {
  let t = new Date();
  dc.innerHTML = t.toLocaleTimeString();
}, 1000);

// ------------------------SWITCH LOGIC------------------------
const analogClock = document.querySelector(".AnalogeClock");
const digitalClock = document.querySelector(".digiClock");
const analogToggle = document.getElementById("analogToggle");
const digitalToggle = document.getElementById("digitalToggle");
const digital = document.getElementById("digital");
const analoge = document.getElementById("analoge");

analogToggle.addEventListener("change", () => {
  if (analogToggle.checked) {
    analogClock.style.display = "flex";
    digitalClock.style.display = "none";
  }
});

digitalToggle.addEventListener("change", () => {
  if (digitalToggle.checked) {
    analogClock.style.display = "none";
    digitalClock.style.display = "block";
  }
});

