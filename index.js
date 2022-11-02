import getCurrentTime from './modules/time.js';
import spaNavigation from './modules/spa-navigation.js';
import displayBooks from './modules/booksCrud.js';

const timeDisplay = document.getElementById('time-display');

function showTime() {
  timeDisplay.textContent = getCurrentTime();
}

setInterval(showTime, 1000);

displayBooks();
spaNavigation();
