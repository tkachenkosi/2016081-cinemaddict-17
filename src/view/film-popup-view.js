import AbstractView from '../framework/view/abstract-view';
import {getFormatDate, getNowDateTime, runTime, getListFromArray} from '../utils/utils';

// шаблон одного коментария
const createCommentTemplate = (commentItem = {}) => {
  const {id, author, comment, date, emotion} = commentItem;

  return (
    `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">
            ${getNowDateTime(date)}
          </span>
          <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
        </p>
      </div>
    </li>`);
};


const createPopupTemplate = (movieData = {}, commentsData = {}) => {

  const {film_info: {title, alternative_title: alternativeTitle, total_rating: totalRating, poster, ageRating, director, writers, actors, release: {date, release_country: releaseCountry}, runtime, genre, description}} = movieData;

  // создаем шаблон всех коментариев
  const commentItemsTemplate = commentsData ? commentsData.map((item) => createCommentTemplate(item)).join('') : '';

  // список жанров
  const genreItemsTemplate = genre.map((item) => `<span class="film-details__genre">${item}</span>`).join('');

  return (
    `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tbody><tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${getListFromArray(writers)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${getListFromArray(actors)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${getFormatDate(date, 'DD MMMM YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runTime(runtime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${genreItemsTemplate}
              </td>
            </tr>
          </tbody></table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

        <ul class="film-details__comments-list">
        ${commentItemsTemplate}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" alt="emoji" width="30" height="30">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" alt="emoji" width="30" height="30">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" alt="emoji" width="30" height="30">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" alt="emoji" width="30" height="30">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
  </section>`);
};


export default class FilmPopupView extends AbstractView {

  constructor(movie, commentItems) {
    super();
    this.movie = movie;
    this.commentItems = commentItems;
  }

  get template() {
    return createPopupTemplate(this.movie, this.commentItems);
  }

  // обработчик кнопки
  setCloseClickHandler = (callback) => {
    this._callback.clickClose = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickCloseHandler);
  };

  #clickCloseHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickClose();
  };

  
  setCloseKeyHandler = (callback) => {
    this._callback.keyDown = callback;
    document.addEventListener('keydown', this.#keyDownHandler);
  };

  #keyDownHandler = (evt) => {
    evt.preventDefault();
    this._callback.keyDown(evt);
  };


  setClickFavoriteHandler = (callback) => {
    this._callback.clickFavorite = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#clickFavoriteHandler);
  };

  #clickFavoriteHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickFavorite();
  };

  setClickWatchedHandler = (callback) => {
    this._callback.clickWatched = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#clickWatchedHandler);
  };

  #clickWatchedHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickWatched();
  };

  setClickWatchlistHandler = (callback) => {
    this._callback.clickWatchlist = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#clickWatchlistHandler);
  };

  #clickWatchlistHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickWatchlist();
  };




}

