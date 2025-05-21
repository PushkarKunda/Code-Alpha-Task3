const playlist = [
    { title: "Sample Song 1", artist: "Artist 1", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Sample Song 2", artist: "Artist 2", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Sample Song 3", artist: "Artist 3", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
  ];
  
  let currentTrackIndex = 0;
  const audioPlayer = document.getElementById('audio-player');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressBar = document.getElementById('progress-bar');
  const currentTimeDisplay = document.getElementById('current-time');
  const durationDisplay = document.getElementById('duration');
  const volumeBar = document.getElementById('volume-bar');
  const songTitle = document.getElementById('song-title');
  const songArtist = document.getElementById('song-artist');
  
  function loadTrack(index) {
    const track = playlist[index];
    audioPlayer.src = track.src;
    songTitle.textContent = track.title;
    songArtist.textContent = track.artist;
    progressBar.value = 0;
    currentTimeDisplay.textContent = '0:00';
    durationDisplay.textContent = '0:00';
    playPauseBtn.textContent = '▶️';
  }
  
  function playPauseTrack() {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseBtn.textContent = '⏸';
    } else {
      audioPlayer.pause();
      playPauseBtn.textContent = '▶️';
    }
  }
  
  function updateProgress() {
    if (audioPlayer.duration) {
      const currentTime = audioPlayer.currentTime;
      const duration = audioPlayer.duration;
      progressBar.value = (currentTime / duration) * 100;
      currentTimeDisplay.textContent = formatTime(currentTime);
      durationDisplay.textContent = formatTime(duration);
    }
  }
  
  function setProgress(e) {
    const duration = audioPlayer.duration;
    const newTime = (e.target.value / 100) * duration;
    audioPlayer.currentTime = newTime;
  }
  
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
  playPauseBtn.addEventListener('click', playPauseTrack);
  prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    playPauseBtn.textContent = '⏸';
  });
  nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    playPauseBtn.textContent = '⏸';
  });
  audioPlayer.addEventListener('timeupdate', updateProgress);
  progressBar.addEventListener('input', setProgress);
  volumeBar.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value;
  });
  audioPlayer.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    playPauseBtn.textContent = '⏸';
  });
  
  // Initialize first track
  loadTrack(currentTrackIndex);