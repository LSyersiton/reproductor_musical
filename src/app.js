const backward = document.getElementById('backward');
const play = document.getElementById('play');
const forward = document.getElementById('forward');
const pause = document.getElementById('pause');
const volumeControl = document.getElementById('volume');
const progressBar = document.getElementById('progressBar');
const volume_high = document.getElementById('volume-high');
const volume_low = document.getElementById('volume-low');
const volume_mute = document.getElementById('volume-mute');
let spinning = true;
let n = 0;

function toggleMenu() {
    const navbar = document.querySelector('.navbar-I');
    navbar.classList.toggle('active');
}

function listSongs() {
    let songs = [
        {id: 1, title: 'And I Love Her', artist: 'The beatles', image: 'src/img/beatles.jpg', music: 'src/music/And I love her.mp3'},
        {id: 2, title: '11 Y 6', artist: 'Fito Paez', image: 'src/img/fito_paez.jpg', music: 'src/music/11 y 6.mp3'},
        {id: 3, title: 'Oye Gato', artist: 'Los Benders', image: 'src/img/benders.jpg', music: 'src/music/Oye Gato.mp3'},
        {id: 4, title: 'Somebody to Love', artist: 'Jefferson Airplane', image: 'src/img/jefferson_airplane.jpg', music: 'src/music/Somebody to Love.mp3'},
        {id: 5, title: 'Whatd I Say', artist: 'Ray Charles' , image: 'src/img/whatd-i-say-01.jpg', music: 'src/music/Whatd I Say.mp3'}       
    ];
    return songs;
}

function getFullSong(item){
    return`<img src="${item.image}" alt="${item.title}">
    <div class="text-container">
        <span>${item.title}</span>
        <span>${item.artist}</span>
    </div>`
    ;
}

function getImageMainSong(item){
    return`<img src="${item.image}" alt="${item.title}">`;
}

function getTitleMainSong(item){
    return `<h4>${item.title}</h4>`;
}

function getVariable(){
    const audio = document.getElementById('music');
    return audio
}

function volumeIcon(volume_icon){
    if(volume_icon == 0){
        volume_high.style.display = 'none';
        volume_low.style.display = 'none';
        volume_mute.style.display = 'inline-block';
    }else if(volume_icon > 0 && volume_icon < 0.5){
        volume_high.style.display = 'none';
        volume_low.style.display = 'inline-block';
        volume_mute.style.display = 'none';
    } else if(volume_icon >= 0.5){
        volume_high.style.display = 'inline-block';
        volume_low.style.display = 'none';
        volume_mute.style.display = 'none';
    } 

}

function pauseMain(){
    const audio = getVariable();
    audio.pause();
    play.style.display = 'inline-block';
    pause.style.display = 'none';

    volume.addEventListener('input',function(){
        audio.volume = volumeControl.value;   
        volumeIcon(volumeControl.value);
    });

    audio.ontimeupdate = function() {
        const audio = getVariable();
        const progress = (audio.currentTime / audio.duration) * 100;
        document.getElementById('progressBar').value = progress;
    };

    progressBar.addEventListener('input', function() {
        const audio = getVariable();
        const newTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = newTime;
    });
    let disk = document.querySelector('.image-div img');
    disk.style.animationPlayState = 'paused';
    console.log(disk);
}

function playMain(){
    const audio = getVariable();
    audio.play();
    play.style.display = 'none';
    pause.style.display = 'inline-block';
    volume.addEventListener('input',function(){
        audio.volume = volumeControl.value;   
        volumeIcon(volumeControl.value);
    });

    audio.ontimeupdate = function() {
        const audio = getVariable();
        const progress = (audio.currentTime / audio.duration) * 100;
        document.getElementById('progressBar').value = progress;
    };

    progressBar.addEventListener('input', function() {
        const audio = getVariable();
        const newTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = newTime;
    });
    let disk = document.querySelector('.image-div img');
    disk.style.animationPlayState = 'running';
    console.log(disk);
}

function loadSong(n) {
    let songs = listSongs();
    let audio = document.getElementById('music'); 

        if (audio) {
            audio.src = songs[n].music; 
           return audio.load(); // Asegúrate de cargar el nuevo audio
        } else {
            console.error('El elemento <audio> no existe.');
        }

}

function renderList(){
    let songs = listSongs();
    document.getElementById('list').innerHTML = songs.map((song) => {
        return `<li id='song-${song.id}'>${ getFullSong(song)}</li>`;
    }).join('');
}

function renderMainSong(){
    let songs = listSongs();
    let count = songs.length - 1;
    document.getElementById('image').innerHTML = getImageMainSong(songs[n]);
    document.getElementById('title').innerHTML = getTitleMainSong(songs[n]);
    renderList();

    
    forward.addEventListener('click', function(){
        if(n == count){
            n = -1;
        }
        n = n + 1; 
        document.getElementById('image').innerHTML = getImageMainSong(songs[n]);
        document.getElementById('title').innerHTML = getTitleMainSong(songs[n]);
        loadSong(n);
        playMain();
    });

    backward.addEventListener('click', function(){
        if(n == 0){
            n = count + 1;
        }
        n = n -1;
        document.getElementById('image').innerHTML = getImageMainSong(songs[n]);
        document.getElementById('title').innerHTML = getTitleMainSong(songs[n]);
        loadSong(n);
        playMain();
    });

    songs.forEach(song => {
        document.getElementById('song-'+ song.id).addEventListener('click', function(){
            n = song.id;
            n = n - 1;
            document.getElementById('image').innerHTML = getImageMainSong(songs[n]);
            document.getElementById('title').innerHTML = getTitleMainSong(songs[n]);
            loadSong(n);
            playMain();
        });
    });

    loadSong(n);

    let audio = document.getElementById('music');
    audio.addEventListener('ended', function () {
        if(n == count){
            n = -1;
        }
        n++;
        loadSong(n);
        document.getElementById('image').innerHTML = getImageMainSong(songs[n]);
        document.getElementById('title').innerHTML = getTitleMainSong(songs[n]);
        playMain();
    });

    play.addEventListener('click', playMain);
    pause.addEventListener('click', pauseMain);
    
}

function render(){
    renderMainSong();
    toggleMenu();
}
