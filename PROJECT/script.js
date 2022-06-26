console.log("Welcome to Listeniory");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let progbar = document.getElementById('progBar');
let gif = document.getElementById('gifs');
let mastersongname = document.getElementById('mastersongname')
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Blinding Lights", filePath: "songs/1.mp3", coverPath:"song_covers/Blinding Lights.jpg"},
    {songName: "Yellow", filePath: "songs/2.mp3", coverPath:"song_covers/Yellow.jpg"},
    {songName: "Wonder", filePath: "songs/3.mp3", coverPath:"song_covers/Wonder.jpg"},
    {songName: "Tom's Diner", filePath: "songs/4.mp3", coverPath:"song_covers/Tom's Diner.jpg"},
    {songName: "Power Over Me", filePath: "songs/5.mp3", coverPath:"song_covers/Power Over Me.jpg"},
    
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progbar.value = progress;
})

progbar.addEventListener('change', ()=>{
    audioElement.currentTime = progbar.value*audioElement.duration/100;
})

const makeallplays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeallplays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        mastersongname.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 4;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})



