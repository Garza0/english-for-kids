
class TrainCards {
  constructor(cardsData, container) {
    this.cardsData = cardsData;
    this.container = container;
    this.trainCardsContainer = document.createElement('div');
    this.trainCardsContainer.classList.add('train-cards', 'cards__container');
  }

  render(categoryIndex) {
    this.container.appendChild(this.trainCardsContainer);
    for (let i = 0; i < this.cardsData[categoryIndex].length; i += 1) {
      this.trainCardsContainer.innerHTML
        += `\
      <div class="train__card" data-id="${i}" data-word="${this.cardsData[categoryIndex][i].word}">\
      <div class="train__card-wrapper">\
      <div class="train__card--front">\
      <img class="cards__image--train" src="./src/data/${this.cardsData[categoryIndex][i].image}">\
      <div class="card__footer">\
      <div class="cards__text--train">${this.cardsData[categoryIndex][i].word}</div>\
      <div class="rotate"></div>\
      </div>\
      </div>\
      <div class="train__card--back">\
      <img class="cards__image--train" src="./src/data/${this.cardsData[categoryIndex][i].image}">\
      <div class="cards__text--train">${this.cardsData[categoryIndex][i].translation}</div>\
      </div>\
      </div>\
      </div>`;
    }
  }


  playMode() {
    this.cardFooter = document.querySelectorAll('.card__footer');
    this.trainCard = document.querySelectorAll('.cards__image--train');
    this.trainCard.forEach((card) => {
      card.classList.remove('cards__image--train');
      card.classList.add('cards__image--play');
    });
    this.cardFooter.forEach((item) => {
      item.classList.add('hidden');
    });
  }

  trainMode() {
    this.cardFooter = document.querySelectorAll('.card__footer');

    this.trainCard = document.querySelectorAll('.cards__image--play');
    this.trainCard.forEach((card) => {
      card.classList.remove('cards__image--play');
      card.classList.add('cards__image--train');
    });
    this.cardFooter.forEach((item) => {
      item.classList.remove('hidden');
    });
  }
}


export { TrainCards };
