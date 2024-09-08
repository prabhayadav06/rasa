console.log("Welcome to Spotify");

let songs = [
    {songName: "The Moon Will Sing", filePath: "audios/The Crane Wives - The Moon Will Sing (Lyric Video).mp3", coverPath: "https://images.genius.com/52097633c62c008a2f126969670cbe3c.1000x909x1.jpg"},
    {songName: "Curses", filePath: "audios/The_Crane_Wives_-_Curses_Lyric_Video_(youconvert.net).mp3", coverPath: "https://images.genius.com/6d05e8fe52e35f1e85d1c226803773fd.683x683x1.png"},
    {songName: "Tongues & Teeth", filePath: "audios/Tongues_Teeth_(youconvert.net).mp3", coverPath: "https://images.genius.com/82838e03e5e48c27004b7023ee2fcc5a.1000x1000x1.jpg"},
    {songName: "Never Love an Anchor", filePath: "audios/The_Crane_Wives_-_Never_Love_an_Anchor_Lyric_Video_(youconvert.net).mp3", coverPath: "https://images.genius.com/52097633c62c008a2f126969670cbe3c.1000x909x1.jpg"},
    {songName: "Allies or Enemies", filePath: "audios/The_Crane_Wives_-_Allies_Or_Enemies_Lyric_Video_(youconvert.net).mp3", coverPath: "https://images.genius.com/52097633c62c008a2f126969670cbe3c.1000x909x1.jpg"},
];

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio(songs[0].filePath);
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));



// Set the initial song details
function loadSong(index) {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
}

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle main play/pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Listen to events and update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Handle play/pause button for each song
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', () => {
        if (audioElement.src.includes(songs[i].filePath)) {
            if (audioElement.paused) {
                audioElement.play();
                element.classList.remove('fa-circle-play');
                element.classList.add('fa-circle-pause');
                gif.style.opacity = 1;
            } else {
                audioElement.pause();
                element.classList.remove('fa-circle-pause');
                element.classList.add('fa-circle-play');
                gif.style.opacity = 0;
            }
        } else {
            loadSong(i);
            makeAllPlays();
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
        }
    });
});

// Reset all play icons to "play" state
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Handle next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-circle-play');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-pause');
});

// Handle previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-circle-play');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-pause');
});
