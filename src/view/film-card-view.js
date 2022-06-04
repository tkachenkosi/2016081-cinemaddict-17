import AbstractView from '../framework/view/abstract-view';
import {getYearDate, getDescript, runTime} from '../utils/utils';

const createTemplate = (movie) => {

  const {comments, film_info: {title, total_rating: totalRating, poster, release: {date}, runtime, genre, description}} = movie;

  return (
    `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${getYearDate(date)}</span>
        <span class="film-card__duration">${runTime(runtime)}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${getDescript(description)}</p>
        <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
    </article>`);
};

export default class FilmCardView extends AbstractView {
  constructor(movie) {
    super();
    this.movie = movie;
  }

  get template() {
    return createTemplate(this.movie);
  }

  setClickPopupHandler = (callback) => {
    this._callback.clickPopup = callback;

    this.element.querySelector('.film-card__poster').addEventListener('click', this.#clickPopupHandler);
  };

  #clickPopupHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickPopup();
  };


  setClickFavoriteHandler = (callback) => {
    this._callback.clickFavorite = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#clickFavoriteHandler);
  };

  #clickFavoriteHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickFavorite();
  };

  setClickWatchedHandler = (callback) => {
    this._callback.clickWatched = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#clickWatchedHandler);
  };

  #clickWatchedHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickWatched();
  };

  setClickWatchlistHandler = (callback) => {
    this._callback.clickWatchlist = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#clickWatchlistHandler);
  };

  #clickWatchlistHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickWatchlist();
  };

}
