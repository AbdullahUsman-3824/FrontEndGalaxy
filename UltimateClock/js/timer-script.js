// -----------------Variable declearation---------------------------->

let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

let hourInc = document.getElementById("hi");
let hourDec = document.getElementById("hd");
let MinInc = document.getElementById("mi");
let MinDec = document.getElementById("md");
let SecInc = document.getElementById("si");
let SecDec = document.getElementById("sd");

//------------------Increase/Decrease functionality------------------>
const hrCtrl = (change) => {
  let currentHour = parseInt(hours.value);
  currentHour += change;
  if (currentHour < 0) {
    return;
  }
  hours.value = currentHour.toString().padStart(2, "0");
};
const MSCtrl = (change, unit) => {
  let currentUnit = parseInt(unit.value);
  currentUnit += change;

  if (currentUnit > 59) {
    currentUnit = 0;
  } else if (currentUnit < 0) {
    currentUnit = 59;
  }
  unit.value = currentUnit.toString().padStart(2, "0");
};

hourInc.addEventListener("click", () => hrCtrl(+1));
hourDec.addEventListener("click", () => hrCtrl(-1));
MinInc.addEventListener("click", () => MSCtrl(+1, minutes));
MinDec.addEventListener("click", () => MSCtrl(-1, minutes));
SecInc.addEventListener("click", () => MSCtrl(+1, seconds));
SecDec.addEventListener("click", () => MSCtrl(-1, seconds));

let timer;
const setTimer = () => {
  let hoursValue = parseInt(hours.value);
  let minutesValue = parseInt(minutes.value);
  let secondsValue = parseInt(seconds.value);

  timer = (hoursValue * 60 + minutesValue) * 60 + secondsValue;
  console.log(timer);
};

const playAudio = () => {
  let audio = new Audio("../mediaFiles/alarmSound.mp3");
  audio.play();
};

setBtn.addEventListener("click", () => {
  setTimer();
  setTimeout(() => {
    console.log("set");
    playAudio();
  }, timer * 1000);
});
