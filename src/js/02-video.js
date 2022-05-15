import Player from '@vimeo/player'; 
import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

const timeSetting = (e) => {
    localStorage.setItem(STORAGE_KEY, e.seconds);
}

const currentTime = localStorage.getItem(STORAGE_KEY);

player.setCurrentTime(+currentTime)
    .then(function (seconds) { seconds = +currentTime });

player.on('timeupdate', throttle(timeSetting, 1000));
