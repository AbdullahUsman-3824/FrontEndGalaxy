// -----------------Variable declearation---------------------------->

let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");

let hourInc = document.getElementById("hi");
let hourDec = document.getElementById("hd");
let MinInc = document.getElementById("mi");
let MinDec = document.getElementById("md");

let AM = document.getElementById("am");
let PM = document.getElementById("pm");

let alarmBox = document.getElementById("alarmBox");

//--------------------Current Time----------------------------------->
let currentTime = document.getElementById("currentTime");
setInterval(() => {
  let d = new Date();
  let time = d.toLocaleTimeString();
  currentTime.innerHTML = time;
}, 1000);

//-------------------Time Controls----------------------------------->
const hrCtrl = (change) => {
  let currentHour = parseInt(hours.value);
  currentHour += change;

  if (currentHour > 12) {
    currentHour = 1;
  } else if (currentHour < 1) {
    currentHour = 12;
  }

  hours.value = currentHour.toString().padStart(2, "0");
};

const minCtrl = (change) => {
  let currentMinute = parseInt(minutes.value);
  currentMinute += change;

  if (currentMinute > 59) {
    currentMinute = 0;
  } else if (currentMinute < 0) {
    currentMinute = 59;
  }
  minutes.value = currentMinute.toString().padStart(2, "0");
};

hourInc.addEventListener("click", () => hrCtrl(+1));
hourDec.addEventListener("click", () => hrCtrl(-1));
MinInc.addEventListener("click", () => minCtrl(+1));
MinDec.addEventListener("click", () => minCtrl(-1));

//-----------------------------Add Alarm-------------------------------->
let alarmTime;

let toggleBox = document.getElementById("toggleBox");
let removeBtn = document.getElementById("removeBtn");
let setAlarm = document.getElementById("setBtn");

let alarm = document.getElementById("alarm");

const add = (index) => {
  let hoursValue = parseInt(hours.value);
  if (PM.checked && hoursValue !== 12) {
    hoursValue += 12;
  } else if (AM.checked && hoursValue == 12) {
    hoursValue += 12;
  }

  let setTime = `${hoursValue}:${minutes.value}`;
  alarmTime = new Date(new Date().toDateString() + " " + setTime);

  alarm.innerHTML = `${hours.value}:${minutes.value} 
  ${AM.checked ? "AM" : "PM"}`;

  // adding animation
  toggleBox.style.height = "25px";

  //adding functionality to alarm toggle
  const toggleButton = document.getElementById("toggleButton");
  toggleButton.addEventListener("click", () => {
    if (toggleButton.checked) {
      set();
    } else {
      clear();
    }
  });
};
setAlarm.addEventListener("click", add);

//-------------------------Set Alarm--------------------------------->
let alarmId;
const playAudio = () => {
  let audio = new Audio("../mediaFiles/alarmSound.mp3");
  audio.play();
};

const set = () => {
  let timeLeft = alarmTime - new Date();

  if (timeLeft < 0) {
    alarmTime.setDate(alarmTime.getDate() + 1);
    timeLeft = alarmTime - new Date();
  }
  console.log(timeLeft);

  let alarmId = setTimeout(() => {
    playAudio();
  }, timeLeft);
};

//-------------------------Off the Alarm------------------------------>
const clear = () => {
  clearTimeout(alarmId);
  console.log("alarm cnaceled");
};

//-------------------------Remove Alarm------------------------------>
const remove = () => {
  alarm.innerHTML = "";
  clear();
  toggleBox.style.height = "0";
};
removeBtn.addEventListener("click", remove);
