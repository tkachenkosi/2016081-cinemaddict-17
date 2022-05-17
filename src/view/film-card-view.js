import {createElement} from '../render.js';
import {getYearDate, getDescript, runTime} from '../utils/utils.js';

const createTemplate = (move) => {

  const {comments, film_info: {title, total_rating: totalRating, poster, release: {date}, runtime, genre, description}} = move;

  return (`
  <article class="film-card">
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

export default class FilmCardView {
  #element = null;

  constructor(move) {
    this.move = move;
  }

  get template() {
    return createTemplate(this.move);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
