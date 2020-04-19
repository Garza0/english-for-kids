import { TrainCards } from './Train-cards.js';
import cards from './data/cards.js';
import Game from './Game.js';

const categoryIndex = sessionStorage.getItem('categoryIndex') ? sessionStorage.getItem('categoryIndex') : '1';
let trainMode = sessionStorage.getItem('trainMode') ? !!sessionStorage.getItem('trainMode') : true;

const container = document.querySelector('.category-container');

const trainCards = new TrainCards(cards, container);
let gameStarted = false;

trainCards.render(categoryIndex);

function playSound(categoryIndex, cardIndex) {
  const audioToPlay = new Audio(`./src/data/${cards[categoryIndex][cardIndex].audioSrc}`);
  audioToPlay.play();
}

const cardsArray = document.querySelectorAll('.train__card');
cardsArray.forEach((card) => card.onclick = (event) => {
  const targetParent = event.target.closest('.train__card');
  if (targetParent.classList.contains('train__card--inactive') === false) {
    if (trainMode === false && gameStarted === true) {
      game.checkAnswer(targetParent.dataset.word, targetParent);
    }
    if (trainMode === true) {
      playSound(categoryIndex, targetParent.dataset.id);
    }
  }
});

const rotateBtn = document.querySelectorAll('.rotate');

rotateBtn.forEach((btn) => btn.onclick = (event) => {
  const cardItem = event.target.closest('.train__card-wrapper');

  cardItem.classList.add('is-flipped');
  cardItem.onmouseout = () => {
    cardItem.classList.remove('is-flipped');
  };
});


const trainPlaySwitch = document.querySelectorAll('.radio-container')

const playBtn = document.querySelector('.play-btn');

trainPlaySwitch.forEach(element => element.onclick = (event) => {
  trainPlaySwitch.forEach(e => e.classList.remove('radio-container--selected'))
  event.target.closest('.radio-container').classList.add('radio-container--selected')


  if (trainMode === true) {
    trainCards.playMode();
    playBtn.classList.remove('hidden');
  } else {
    trainCards.trainMode();
    playBtn.classList.add('hidden');
  }
  trainMode = !trainMode;
  sessionStorage.setItem('trainMode', trainMode);
})

const arrayOfCards = [...cards[categoryIndex]];
const shuffledArray = shuffleArray(arrayOfCards);

const game = new Game(shuffledArray);

function shuffleArray(arrayToShuffle) {
  for (let i = arrayToShuffle.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayToShuffle[i], arrayToShuffle[j]] = [arrayToShuffle[j], arrayToShuffle[i]];
  }
  return arrayToShuffle;
}

playBtn.onclick = () => {
  if (gameStarted === true) {
    game.playCurrentAudioWord();
  } else {
    game.startGame();
    gameStarted = !gameStarted;
  }
};

const sideMenuList = document.querySelector('.side-menu__list');

function renderSideMenuItems(cardsInformation) {
  for (let i = 1; i <= cardsInformation[0].length; i += 1) {
    sideMenuList.innerHTML += `<li class="side-menu__item" data-id="${i}">${cardsInformation[0][i - 1]}</li>`;
  }
}

renderSideMenuItems(cards);

const sideMenuListItems = document.querySelectorAll('.side-menu__item');


function clickToCardOrSideMenuHandler(targetOfEvent) {
  targetOfEvent.forEach((card) => card.onclick = (event) => {
    sessionStorage.setItem('categoryIndex', event.target.closest('li').dataset.id);
    location.assign('./category.html');
  });
}

clickToCardOrSideMenuHandler(sideMenuListItems);


