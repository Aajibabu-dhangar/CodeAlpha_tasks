const songs = [
  {
    title: "namo namo shankara",
    artist: "Artist A",
    src: "songs/namo namo shankara.mp3"
  },
  {
    title: "maine royaan",
    artist: "Artist B",
    src: "songs/maine royaan.mp3"
  },
  {
    title: "suniyan suniyan",
    artist: "Artist C",
    src: "songs/suniyan suniyan.mp3"
  }
];

let currentSongIndex = 0;
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlist = document.getElementById('playlist');

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.innerHTML = '&#10074;&#10074;'; // pause icon
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = '&#9654;'; // play icon
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

audio.addEventListener('ended', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong(); // autoplay
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Populate playlist
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener('click', () => {
    currentSongIndex = index;
    loadSong(index);
    playSong();
  });
  playlist.appendChild(li);
});

loadSong(currentSongIndex);
