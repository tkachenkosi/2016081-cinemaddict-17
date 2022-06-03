import {render, replace, remove} from '../framework/render';
import FilmCardView from '../view/film-card-view';
import FilmPopupView from '../view/film-popup-view';
// import PopupPresenter from './popup-presenter';
import {isEscape, updateItem} from '../utils/utils';

const Mode = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
};


export default class FilmPresenter {
  #film = null;
  #comments = null;
  #cardComponent = null;
  #popupComponent = null;
  #container = null;
  #bodyContainer = document.querySelector('body');
  
  #changeData = null;
  #changeMode = null;
  // mode = null;
  mode = Mode.CLOSE;

  #popupPresenter = null;


  constructor(container, changeData, changeMode) {
    this.#container = container
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;

    const prevCardComponent = this.#cardComponent;

    this.#cardComponent = new FilmCardView(film);
    this.#cardComponent.setClickPopupHandler(this.#renderPopup);
    this.#cardComponent.setClickFavoriteHandler(this.#handleFavoriteClick);
    this.#cardComponent.setClickWatchedHandler(this.#handleWatchedClick);
    this.#cardComponent.setClickWatchlistHandler(this.#handleWatchlistClick);

    if (prevCardComponent === null) {
      render(this.#cardComponent, this.#container);
      return
    }

    if (this.#container.contains(prevCardComponent.element)) {
    // if (this.#mode === Mode.EDITING) {
      replace(this.#cardComponent, prevCardComponent);
    }

    remove(prevCardComponent);
  };

  get valueMode() {
    return this.mode;
  }

  destory = () => {
    remove(this.#cardComponent);
  };


  resetView = () => {
console.log('1 restView', this.mode, this.#film.id, 'value', this.valueMode);
    if (this.mode === Mode.OPEN) {
// console.log('2 restView', this.mode, this.#film.id);
      this.destoryPopup();
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData({... this.#film, isFavorite: !this.#film.isFavorite});
  };

  #handleWatchedClick = () => {
    this.#changeData({... this.#film, isWatched: !this.#film.isWatched});
  };

  #handleWatchlistClick = () => {
    this.#changeData({... this.#film, isWatchlist: !this.#film.isWatchlist});
  };


// *********** popup *************

  // окно с детальной информацией и коментарииеми
  #renderPopup = () => {
    this.#popupComponent = new FilmPopupView(this.#film, this.#comments);
    this.#popupComponent.setCloseClickHandler(this.destoryPopup);
    // this.#popupComponent.setCloseKeyHandler(this.#onEscKeyDown);
    this.#popupComponent.setClickFavoriteHandler(this.#handleFavoriteClick);
    this.#popupComponent.setClickWatchedHandler(this.#handleWatchedClick);
    this.#popupComponent.setClickWatchlistHandler(this.#handleWatchlistClick);
    this.#initPopup();
  }

  #initPopup = () => {
    render(this.#popupComponent, this.#bodyContainer);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.mode = Mode.OPEN;
console.log('initPopup', this.mode, this.#film.id);
  };

  #onEscKeyDown = (evt) => {
    if (isEscape(evt)) {
      // evt.preventDefault();
      this.destoryPopup();
    }
  };

  destoryPopup = () => {
console.log('distoryPopup', this.mode, this.#film.id);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    remove(this.#popupComponent);
    this.mode = Mode.CLOSE;
  };


  // очистка для функций сортировки
  /* #clearCardList = () => {
    this.#cards.forEach((card) => remove(card));
    this.#cards.clear();
    this.#renderCardsCount = FILM_COUNT_PER_PAGE;
    remove(this.#btnShowMoreComponent);
  }


  #handleModeChange = () => {
    this.#cards.forEach((film) => film.reserView)
  }; */

}
