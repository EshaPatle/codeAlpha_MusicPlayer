const songs = [
  {
    title: "Song 1",
    artist: "Artist 1",
    src: "songs/song1.mp3",
    cover: "cover1.jpg"
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    src: "songs/song2.mp3",
    cover: "cover2.jpg"
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    src: "songs/song3.mp3",
    cover: "cover3.jpg"
  }
];

let currentSong = 0;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistItems = document.querySelectorAll("#playlist li");

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  highlightActive(index);
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}

function togglePlay() {
  audio.paused ? playSong() : pauseSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
}

function updateProgress() {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
}

function setProgress() {
  audio.currentTime = (progress.value * audio.duration) / 100;
}

function formatTime(time) {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function setVolume() {
  audio.volume = volume.value;
}

function highlightActive(index) {
  playlistItems.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

playlistItems.forEach(item => {
  item.addEventListener("click", () => {
    currentSong = parseInt(item.getAttribute("data-index"));
    loadSong(currentSong);
    playSong();
  });
});

playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
progress.addEventListener("input", setProgress);
volume.addEventListener("input", setVolume);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

// Initial load
loadSong(currentSong);
