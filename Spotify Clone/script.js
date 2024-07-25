console.log("Welcome to Spotify");

//Variable Decleration
let masterPlay = document.getElementById("masterPlay");
let back = document.getElementById("back");
let next = document.getElementById("next");
let seekBar = document.getElementById("seekBar");

let gif = Array.from(document.getElementsByClassName("gif"));

let songIndex = 0;

let masterSongName = document.getElementById("masterSongName");
let masterSongImage = document.getElementById("masterSongImage");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
  {
    songName: "Do Gallan (Let's Talk)",
    filePath: "songs/Do-Gallan.mp3",
    coverPath: "covers/1.jpeg",
    songLenght: "04:17",
  },
  {
    songName: "Malang Sajna",
    filePath: "songs/Malang-Sajna.mp3",
    coverPath: "covers/2.jpeg",
    songLenght: "02:37",
  },
  {
    songName: "Still Rollin - Shubb",
    filePath: "songs/Still-Rollin.mp3",
    coverPath: "covers/3.jpeg",
    songLenght: "02:51",
  },
  {
    songName: "Tu Chahiye - Atif Aslam",
    filePath: "songs/Tu-Chahiye.mp3",
    coverPath: "covers/4.jpeg",
    songLenght: "03:50",
  },
  {
    songName: "Apna Bana Le",
    filePath: "songs/Apna-Bana-Le.mp3",
    coverPath: "covers/5.jpeg",
    songLenght: "03:24",
  },
  {
    songName: "Mi Amor - Nova Miller",
    filePath: "songs/Mi-Amor.mp3",
    coverPath: "covers/6.jpeg",
    songLenght: "03:23",
  },
  {
    songName: "Rafta Rafta - Atif Aslam",
    filePath: "songs/Rafta-Rafta.mp3",
    coverPath: "covers/7.jpg",
    songLenght: "03:33",
  },
  {
    songName: "Hail - by Byg Byrd",
    filePath: "songs/Hail.mp3",
    coverPath: "covers/8.jpeg",
    songLenght: "02:10",
  },
  {
    songName: "Chaand Baaliyan",
    filePath: "songs/Chaand-Baaliyan.mp3",
    coverPath: "covers/9.jpeg",
    songLenght: "01:43",
  },
  {
    songName: " No Love - Shubb",
    filePath: "songs/No-Love.mp3",
    coverPath: "covers/10.jpeg",
    songLenght: "02:32",
  },
];

let audioElement = new Audio("songs/Do-Gallan.mp3");
masterSongName.textContent = songs[songIndex].songName;
masterSongImage.src = songs[songIndex].coverPath;

//play/pause
function play() {
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  masterSongName.textContent = songs[songIndex].songName;
  masterSongImage.src = songs[songIndex].coverPath;
  gif.forEach((element) => {
    element.style.opacity = 0;
  });
  gif[songIndex].style.opacity = 1;
}
function pause() {
  audioElement.pause();
  masterPlay.classList.remove("fa-circle-pause");
  masterPlay.classList.add("fa-circle-play");
  gif[songIndex].style.opacity = 0;
}
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    play();
  } else {
    pause();
  }
});

//seek bar
audioElement.addEventListener("timeupdate", () => {
  progress = (audioElement.currentTime / audioElement.duration) * 100;
  seekBar.value = progress;
  if (progress >= 99.5) {
    playNext();
  }
});
seekBar.addEventListener("change", () => {
  audioElement.currentTime = (seekBar.value * audioElement.duration) / 100;
});

//song list titles
songItems.forEach((element, i) => {
  element.getElementsByClassName("songImage")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songTitle")[0].textContent =
    songs[i].songName;
  element.getElementsByClassName("timeStamp")[0].textContent =
    songs[i].songLenght;
});

//update song
const updateSong = () => {
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
};

//songList control
songItems.forEach((element) => {
  element.addEventListener("click", () => {
    songIndex = parseInt(element.id);
    updateSong();
    play();
  });
});

//next/back
function playNext() {
  if (songIndex == 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  updateSong();
  play();
}
function playPrev() {
  if (songIndex == 0) {
    songIndex = 9;
  } else {
    songIndex -= 1;
  }
  updateSong();
  play();
}
next.addEventListener("click", playNext);
back.addEventListener("click", playPrev);
