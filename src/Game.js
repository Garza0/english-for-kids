import cards from './data/cards.js';
class Game {
  constructor(array) {
    this.scoreLine = document.querySelector('.score-line');
    this.wrongStar = '<img class="score__star" src="./src/data/img/star.svg" alt="Wrong answer" height="42" width="42">';
    this.rightStar = '<img class="score__star" src="./src/data/img/star-win.svg" alt="Right answer" height="42" width="42">';
    this.itemCounter = 0;
    this.shufledArray = array;
    this.playedAudioWord;
    this.finishScore = {};
    this.successSmile = '<img class="finish-smile" src="./src/data/img/success.jpg" alt="Success">';
    this.failureSmile = '<img class="finish-smile" src="./src/data/img/failure.jpg" alt="Failue">';
    this.playBtn = document.querySelector('.play-btn');

  }

  renderWrongStar() {
    this.scoreLine.innerHTML += this.wrongStar;
  }

  renderRightStar() {
    this.scoreLine.innerHTML += this.rightStar;
  }

  startGame() {
    new Audio(`./src/data/${this.shufledArray[0].audioSrc}`).play();
    this.playedAudioWord = this.shufledArray[0].word;
    this.playBtn.innerHTML = '';
    this.playBtn.classList.add('play-btn--repeat-mode')
    this.scoreLine.classList.remove('hidden')
    this.playBtn.classList.remove('hidden')
  }

  finishHandler() {
    let wrongAnswers = 0;
    let rightAnswers = 0;
    for (const key in this.finishScore) {
      if (this.finishScore[key] === false) {
        wrongAnswers += 1;
      } else {
        rightAnswers += 1;
      }
    }
    const finishScoreContainer = document.createElement('div');
    finishScoreContainer.classList.add('finish-score-container');
    this.scoreLine.classList.add('hidden')
    this.playBtn.classList.add('hidden')
    const wrapper = document.querySelector('.wrapper');
    if (wrongAnswers > 0) {
      finishScoreContainer.innerHTML += `Oh no. You made ${wrongAnswers} mistakes ${this.failureSmile}`;
      new Audio('./src/data/audio/failure.mp3').play();
      setTimeout(() => location.assign('./index.html'), 4000)

    } else {
      finishScoreContainer.innerHTML += `Good job. ${rightAnswers} correct answers ${this.successSmile}`;
      new Audio('./src/data/audio/success.mp3').play();
      setTimeout(() => location.assign('./index.html'), 3000)

    }

    const cardsContainer = document.querySelector('.category-container');
    cardsContainer.classList.add('hidden');
    wrapper.append(finishScoreContainer);
  }

  playCurrentAudioWord() {
    new Audio(`./src/data/${this.shufledArray[this.itemCounter].audioSrc}`).play();
  }

  playNextGameAudio(array) {
    if (this.itemCounter < array.length - 1) {
      this.itemCounter += 1;
      new Audio(`./src/data/${array[this.itemCounter].audioSrc}`).play();
      this.playedAudioWord = array[this.itemCounter].word;
    } else {
      this.finishHandler();
    }
  }

  checkAnswer(cardWord, clickedCard) {
    if (this.playedAudioWord === cardWord) {
      this.rightAnswerHandler();
      clickedCard.classList.add('train__card--inactive');
      if (!this.finishScore.hasOwnProperty(this.playedAudioWord)) {
        this.finishScore[this.playedAudioWord] = true;
      }
      this.playNextGameAudio(this.shufledArray);
    } else {
      this.wrongAnswerHandler();
      this.finishScore[this.playedAudioWord] = false;
    }
  }

  wrongAnswerHandler() {
    new Audio('./src/data/audio/error.mp3').play();
    this.renderWrongStar();
  }

  rightAnswerHandler() {
    new Audio('./src/data/audio/correct.mp3').play();
    this.renderRightStar();
  }
}

export default Game;
