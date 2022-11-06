const dataMusic = [
    {
      id: '1',
      artist: 'Король и шут',
      track: 'На краю',
      poster: 'images/tracks/korol2.jfif',
      mp3: 'audio/Korol i SHut - Na krayu.mp3',
    },
    {
      id: '2',
      artist: 'Король и шут',
      track: 'Марионетки',
      poster: 'images/tracks/korol1.jfif',
      mp3: 'audio/Korol i SHut - Marionetki.mp3',
    },
    {
      id: '3',
      artist: 'Король и шут',
      track: 'Кукла колдуна',
      poster: 'images/tracks/korol.jfif',
      mp3: 'audio/Korol i SHut - Kukla kolduna.mp3',
    },
    {
      id: '4',
      artist: 'Алиса',
      track: 'Трасса Е-95',
      poster: 'images/tracks/alisa.jfif',
      mp3: 'audio/Alisa - Trassa E-95.mp3',
    },
    {
      id: '5',
      artist: 'Никольский Константин',
      track: 'Музыкант',
      poster: 'images/tracks/nikolskyi.jfif',
      mp3: 'audio/Konstantin Nikolskijj - Muzykant.mp3',
    },
    {
      id: '6',
      artist: 'Сплин',
      track: 'Выхода нет',
      poster: 'images/tracks/splin.jfif',
      mp3: 'audio/Splin - Vykhoda net.mp3',
    },
    {
      id: '7',
      artist: 'Ария',
      track: "Беспечный ангел",
      poster: 'images/tracks/aria.jfif',
      mp3: "audio/Ariya - Bespechnyj angel.mp3",
    },
    {
      id: '8',
      artist: 'Аэлла',
      track: 'Крылья Валькирии',
      poster: 'images/tracks/aella.jfif',
      mp3: 'audio/Ajella - Krylya Valkirii.mp3',
    },
    {
      id: '9',
      artist: 'Nikelback',
      track: 'Hero',
      poster: 'images/tracks/nickelback.jpeg',
      mp3: 'audio/Nikelback - Hero.mp3',
    },
    {
      id: '10',
      artist: 'Смысловые галюцинации',
      track: 'Зачем топтать мою любовь',
      poster: 'images/tracks/smyslovye.jfif',
      mp3: 'audio/Smyslovye Gallyucinacii -Zachem.mp3',
    },
    {
      id: '11',
      artist: 'Эпидемия',
      track: 'Всадник из льда',
      poster: 'images/tracks/vsadnik.jpg',
      mp3: 'audio/JEpidemiya - Vsadnik iz lda.mp3',
    },
    {
      id: '12',
      artist: 'Evanescence',
      track: 'Going Under',
      poster: 'images/tracks/Evanescence.jfif',
      mp3: 'audio/Evanescence - Going Under.mp3',
    },
  ];

let playlist = [];

const favoriteList = localStorage.getItem('favorite')
 ? JSON.parse(localStorage.getItem('favorite'))
 : []

const audio = new Audio();
const headerLogo = document.querySelector('.header__logo');
const favoriteBtn = document.querySelector('.header__favorite-btn');
const tracksCard = document.getElementsByClassName('track')
const catalogContainer = document.querySelector('.catalog__container');
const player = document.querySelector('.player');
const pauseBtn = document.querySelector('.player__controller-pause');
const stopBtn = document.querySelector('.player__controller-stop');
const prewBtn = document.querySelector('.player__controller-prew');
const nextBtn = document.querySelector('.player__controller-next');
const likeBtn = document.querySelector('.player__controller-like');
const muteBtn = document.querySelector('.player__controller-mute');
const playerProgressInput = document.querySelector('.player__progress-input');

const playerTimePassed = document.querySelector('.player__time-passed');
const playerTimeTotal = document.querySelector('.player__time-total');
const playerVolumeInput = document.querySelector('.player__volume-input');

const catalogAddBtn = document.createElement('button');
catalogAddBtn.classList.add('catalog__btn-add');
catalogAddBtn.innerHTML = `
    <span>Увидеть все</span>
    <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.589996 10.59L5.17 6L0.589996 1.41L2 0L8 6L2 12L0.589996 10.59Z"/>
    </svg>
`;

const pausePlayer = () => {
    const trackActive = document.querySelector('.track_active');

    if (audio.paused) {
        audio.play();
        pauseBtn.classList.remove('player__icon_play');
        trackActive.classList.remove('track_pause');
    } else {
        audio.pause();
        pauseBtn.classList.add('player__icon_play');
        trackActive.classList.add('track_pause');
    }
}

const playMusic = (event) => {
    event.preventDefault();
    const trackActive = event.currentTarget;

    if (trackActive.classList.contains('track_active')) {
        pausePlayer();
        return
    }

    let i = 0;
    const id = trackActive.dataset.idTrack;

    const index = favoriteList.indexOf(id)
      if (index !== -1) {
        likeBtn.classList.add('player__icon_like_active')
      } else {
        likeBtn.classList.remove('player__icon_like_active')
      }

    const track = playlist.find((item, index) => {
        i = index;
        return id === item.id;
    });
    audio.src = track.mp3;
    
    audio.play();

    pauseBtn.classList.remove('player__icon_play');
    player.classList.add('player_active');

    const prewTrack = i === 0 ? playlist.length - 1 : i - 1;
    const nextTrack = i + 1 === playlist.length ? 0 : i + 1;
    prewBtn.dataset.idTrack = playlist[prewTrack].id;
    nextBtn.dataset.idTrack = playlist[nextTrack].id;
    likeBtn.dataset.idTrack = id;
    
    for (let i = 0; i < tracksCard.length; i++) {
      if (id === tracksCard[i].dataset.idTrack) {
        tracksCard[i].classList.add('track_active');
      } else {
        tracksCard[i].classList.remove('track_active');
      }
    }    
};

const addHandlerTrack = () => {
    for (let i = 0; i < tracksCard.length; i++) {
        tracksCard[i].addEventListener('click', playMusic);
    }
}

pauseBtn.addEventListener('click', pausePlayer);

stopBtn.addEventListener('click', () => {
    audio.src = '';
    player.classList.remove('player_active')
    document.querySelector('.track_active').classList.remove('track_active');
});

const createCard = (data) => {
    const card = document.createElement('a');
    card.href = '#';
    card.className = 'catalog__item track';
    card.dataset.idTrack = data.id;

    card.innerHTML = `
    <div class="track__img-wrap">
        <img class="track__poster" src="${data.poster}" alt="${data.artist} ${data.track}" width="180" height="180">
    </div>
    <div class="track__info track-info">
        <p class="track-info__title">${data.track}</p>
        <p class="track-info__artist">${data.artist}</p>
    </div>
    `;

    return card
};

const renderCatalog = (dataList) => {
    playlist = [...dataList];
    catalogContainer.textContent = '';
    const listCards = dataList.map(createCard);   
    catalogContainer.append(...listCards);
    addHandlerTrack();
};

const checkCount = (i = 1) => {
    tracksCard[0]
    if (catalogContainer.clientHeight > tracksCard[0].clientHeight * 3) {
        tracksCard[tracksCard.length - i].style.display = 'none';
        checkCount(i + 1);
    } else if (i !== 1) {
            catalogContainer.append(catalogAddBtn);
        }
};

const updateTime = () => {
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  const progress = (currentTime / duration) * playerProgressInput.max;
  playerProgressInput.value = progress ? progress : 0;

  const minutesPassed = Math.floor(currentTime / 60) || '0';
  const secondsPassed = Math.floor(currentTime % 60) || '0';
  
  const minutesDuration = Math.floor(duration / 60) || '0';
  const secondsDuration = Math.floor(duration % 60) || '0';

  playerTimePassed.textContent = `${minutesPassed}:${secondsPassed < 10 ? '0' + secondsPassed : secondsPassed}`;
  playerTimeTotal.textContent = `${minutesDuration}:${secondsDuration < 10 ? '0' + secondsDuration : secondsDuration}`;
}

const init = () => {
    audio.volume = localStorage.getItem('volume') || 1;
    playerVolumeInput.value = audio.volume * 100;
    renderCatalog(dataMusic);
    checkCount();

    catalogAddBtn.addEventListener('click', () => {
        [...tracksCard].forEach((trackCard) => {
            trackCard.style.display = '';
            catalogAddBtn.remove();
        });
    });

    prewBtn.addEventListener('click', playMusic);
    nextBtn.addEventListener('click', playMusic);

    audio.addEventListener('ended', () => {
      nextBtn.dispatchEvent(new Event('click', {bubbles: true}));
    })

    audio.addEventListener('timeupdate', updateTime);

    playerProgressInput.addEventListener('change', () => {
      const progress = playerProgressInput.value;
      audio.currentTime = (progress / playerProgressInput.max) * audio.duration;
    });

    favoriteBtn.addEventListener('click', () => {
      const data = dataMusic.filter((item) => favoriteList.includes(item.id))
      renderCatalog(data);
      checkCount();
    });

    headerLogo.addEventListener('click', () => {
      renderCatalog(dataMusic);
      checkCount();
    });

    likeBtn.addEventListener('click', () => {
      const index = favoriteList.indexOf(likeBtn.dataset.idTrack)
      if (index === -1) {
        favoriteList.push(likeBtn.dataset.idTrack);
        likeBtn.classList.add('player__icon_like_active')
      } else {
        favoriteList.splice(index, 1);
        likeBtn.classList.remove('player__icon_like_active')
      }

      localStorage.setItem('favorite', JSON.stringify(favoriteList))
    });

    playerVolumeInput.addEventListener('input', () => {
      const value = playerVolumeInput.value;
      audio.volume = value / 100;
    })

    muteBtn.addEventListener('click', () => {
      if (audio.volume) {
        localStorage.setItem('volume', audio.volume);
        audio.volume = 0;
        muteBtn.classList.add('player__icon_mute-off');
        playerVolumeInput.value = 0;
      } else {
        audio.volume = localStorage.getItem('volume');
        muteBtn.classList.remove('player__icon_mute-off');
        playerVolumeInput.value = audio.volume * 100;
      }
    })
};

init();