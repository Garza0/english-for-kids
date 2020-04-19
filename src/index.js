/* eslint-disable import/extensions */
import cards from './data/cards.js';

let trainMode = true;
class CategoriesCards {
  constructor(cardsData) {
    this.cardsData = cardsData;
    this.categoriesContainer = document.createElement('ul');
    this.categoriesContainer.classList.add('categories', 'cards__container');
    this.sideMenuList = document.querySelector('.side-menu__list');
    this.mainContainer = document.querySelector('.main-container');
  }

  render() {
    this.mainContainer.appendChild(this.categoriesContainer);
    for (let i = 1; i <= this.cardsData[0].length; i += 1) {
      this.categoriesContainer.innerHTML += `<li class="categories__card cards__item" data-id="${i}"><div class="card__header ${trainMode ? 'card__header--train-mode' : 'card__header--play-mode'}"></div><div class="categories__avatar"><img class="categories__image" src="./src/data/${this.cardsData[i][0].image}"></div><div class="categories__text">${this.cardsData[0][i - 1]}</div></li>`;
      this.sideMenuList.innerHTML += `<li class="side-menu__item" data-id="${i}">${this.cardsData[0][i - 1]}</li>`;
    }
  }

  get sideMenu() {
    return this.sideMenuList;
  }

  show() {
    this.categoriesContainer.classList.remove('hidden');
  }

  hide() {
    this.categoriesContainer.classList.add('hidden');
  }

  playMode() {
    this.cardsHeader = document.querySelectorAll('.card__header');
    this.cardsHeader.forEach((cardHeader) => {
      cardHeader.classList.remove('card__header--train-mode');
      cardHeader.classList.add('card__header--play-mode');
    });
  }

  trainMode() {
    this.cardsHeader = document.querySelectorAll('.card__header');
    this.cardsHeader.forEach((cardHeader) => {
      cardHeader.classList.remove('card__header--play-mode');
      cardHeader.classList.add('card__header--train-mode');
    });
  }
}

const categoriesCards = new CategoriesCards(cards);

categoriesCards.render();


const cardsArray = document.querySelectorAll('.categories__card');


const sideMenuListItems = document.querySelectorAll('.side-menu__item');


function clickToCardOrSideMenuHandler(targetOfEvent) {
  targetOfEvent.forEach((card) => card.onclick = (event) => {
    sessionStorage.setItem('categoryIndex', event.target.closest('li').dataset.id);
    location.assign('./category.html');
  });
}

clickToCardOrSideMenuHandler(cardsArray);
clickToCardOrSideMenuHandler(sideMenuListItems);

const trainPlaySwitch = document.querySelectorAll('.radio-container')

trainPlaySwitch.forEach(element => element.onclick = (event) => {
  if (!event.target.classList.contains('radio-container--selected')) {

    trainPlaySwitch.forEach(e => e.classList.remove('radio-container--selected'))
    event.target.closest('.radio-container').classList.add('radio-container--selected')

    if (trainMode === true) {
      categoriesCards.playMode();
    } else {
      categoriesCards.trainMode();
    }
    trainMode = !trainMode;
    sessionStorage.setItem('trainMode', trainMode);
  }
}
)





// const HAMBURGER = document.querySelector('.side-menu__toggle')
// const SIDEMENU = document.querySelector('.side-menu')
// const LOGO = document.querySelector('.logo')
// const OVERLAY = document.querySelector('.side-menu__overlay')

// HAMBURGER.onclick = () => {
//   OVERLAY.classList.toggle('overlay--active')
//   HAMBURGER.classList.toggle('hamburger--active')
//   SIDEMENU.classList.toggle('side-menu--active')




// }

// const SIDEMENUITEM = document.querySelectorAll('.side-menu__list-item')

// SIDEMENUITEM.forEach(e => e.onclick = () => {
//   SIDEMENUITEM.forEach(e => e.classList.remove('side-menu__list-item--active'))
//   e.classList.add('side-menu__list-item--active')
//   hideSideMenu()

// })

// function hideSideMenu() {
//   SIDEMENU.classList.remove('side-menu--active')
//   HAMBURGER.classList.remove('hamburger--active')

//   OVERLAY.classList.remove('overlay--active')
// }

// OVERLAY.onclick = () => {
//   hideSideMenu()
// }