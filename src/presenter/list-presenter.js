
import {render, remove} from '../framework/render';
import HeaderProfileView from '../view/header-profile-view';
import FooterStatusView from '../view/footer-status-view';
import ButtonShowMoreView from '../view/films-list-show-more-view';
import FilmPresenter from './film-presenter';

import FilmsSectionView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import ListEmptyView from '../view/list-empty-view';
import FilmsListExtraView from '../view/films-list-extra';
import FilmsListContainerView from '../view/films-list-container-view';

import NavigationView from '../view/navigation-view';
import SortView from '../view/sort-view';
import {updateItem, sortByDate, sortByRating} from '../utils/utils';
import {SortType} from '../utils/const';

const FILM_COUNT_PER_PAGE = 5;
// const FILM_COUNT_EXTRA = 2;

export default class ListPresenter {
  #commentsModel = null;
  #headerContainer = null;
  #footerContainer = null;
  #mainContainer = null;
  #moviesModel = null;
  #currentSortType= SortType.DEFAULT;

  constructor(mainElement, headerElement, footerElement, movieModel, commentModel) {
    this.#mainContainer = mainElement;
    this.#headerContainer = headerElement;
    this.#footerContainer = footerElement;
    this.#moviesModel = movieModel;
    this.#commentsModel = commentModel;
  }

  #films = [];
  #commens = [];
  #sourceFilms = [];
  #renderCardsCount = FILM_COUNT_PER_PAGE;

  #mapFilmPresentor = new Map();   // ссылоки на карточки, для перерисовки
  #mapTopRatePresentor = new Map();
  #mapTopCommentPresentor = new Map();

  #filmsSection = new FilmsSectionView();
  #listFilms = new FilmsListView();
  #listEmpty = new ListEmptyView();
  #listTopRated = new FilmsListExtraView('Top rated');
  #listTopComment = new FilmsListExtraView('Most commented');

  #containerFilms = new FilmsListContainerView();
  #containerTopRated = new FilmsListContainerView();
  #containerTopComment = new FilmsListContainerView();

  #navComponent = new NavigationView();
  #sortComponent = new SortView(this.#currentSortType);
  #btnShowMoreComponent = new ButtonShowMoreView;


  init = () => {
    this.#films = [...this.#moviesModel.movies];          // список фильмов
    this.#sourceFilms = [...this.#moviesModel.movies];          // список фильмов
    this.#commens = [...this.#commentsModel.comments];    // все коментарии

    this.#renderBoard();
  };


  #renderNav = () => {
    render(this.#navComponent, this.#mainContainer);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderFilmSection = () => {
    // основная секция
    render(this.#filmsSection, this.#mainContainer);
    render(this.#listFilms, this.#filmsSection.element);
    render(this.#containerFilms, this.#listFilms.element);
  };


  #renderTopRated = () => {
    // секция top rated
    render(this.#listTopRated, this.#filmsSection.element);
    render(this.#containerTopRated, this.#listTopRated.element);

    this.#renderTopCommentCard(this.#films[0]);
    this.#renderTopCommentCard(this.#films[1]);
  };

  #renderTopComment = () => {
    // секция most commented
    render(this.#listTopComment, this.#filmsSection.element);
    render(this.#containerTopComment, this.#listTopComment.element);

    this.#renderTopRatedCard(this.#films[0]);
    this.#renderTopRatedCard(this.#films[1]);
  };

  #renderHeaderProfile = () => {
    render(new HeaderProfileView(), this.#headerContainer);
  };

  #renderFooterStatus = () => {
    render(new FooterStatusView(), this.#footerContainer);
  };

  #renderListEmpty = () => {
    render(this.#filmsSection, this.#mainContainer);
    render(this.#listEmpty, this.#filmsSection.element);
  };

  #renderBtnShowMore = () => {
    // кнопка show more
    render(this.#btnShowMoreComponent, this.#listFilms.element);
    // подписка на обработчик кнопки
    this.#btnShowMoreComponent.setClickHandler(this.#handlerButtonShowMoreClick);
  };

  #handlerButtonShowMoreClick = () => {
    this.#films.slice(this.#renderCardsCount, this.#renderCardsCount + FILM_COUNT_PER_PAGE)
      .forEach((film) => this.#renderCard(film, this.#containerFilms.element));

    this.#renderCardsCount += FILM_COUNT_PER_PAGE;

    if (this.#renderCardsCount >= this.#films.length) {
      // удаление обработчика кнопки по достижению конца списка фильмов
      remove(this.#btnShowMoreComponent);
    }
  };


  #renderBoard = () => {
    this.#renderNav();

    if (this.#films.length > 0) {
      this.#renderSort();
      this.#renderFilmSection();
      this.#renderBtnShowMore();

      this.#renderCards();
    } else {
      this.#renderListEmpty();
    }

    this.#renderTopRated();
    this.#renderTopComment();
    this.#renderHeaderProfile();
    this.#renderFooterStatus();
  };


  #renderCards = () => {
    for (let i = 0; i <  Math.min(this.#films.length, FILM_COUNT_PER_PAGE); i++) {
      this.#renderCard(this.#films[i], this.#containerFilms.element);
    }
  };

  #renderCard = (film, container) => {
    const filmPresenter = new FilmPresenter(container, this.#handleCardChange, this.#handleModeChange);
    filmPresenter.init(film, this.#commens);
    this.#mapFilmPresentor.set(film.id, filmPresenter);
  };

  #renderCardsList = () => {
    render(this.#containerFilms, this.#listFilms.element);

    if (this.#renderCardsCount < this.#films.length) {
      this.#renderBtnShowMore();
    }

    this.#films.slice(0, Math.min(this.#renderCardsCount, this.#films.length))
      .forEach((film) => this.#renderCard(film, this.#containerFilms.element));

  };

  #handleCardChange = (updatedCard) => {
    this.#films = updateItem(this.#films, updatedCard);
    this.#sourceFilms = updateItem(this.#sourceFilms, updatedCard);
    this.#mapFilmPresentor.get(updatedCard.id).init(updatedCard, this.#commens);
  };


  #handleModeChange = () => {
    this.#mapFilmPresentor.forEach((presenter) => presenter.resetView());
    this.#mapTopRatePresentor.forEach((presenter) => presenter.resetView());
    this.#mapTopCommentPresentor.forEach((presenter) => presenter.resetView());
  };


  #renderTopRatedCard = (film) => {
    const filmPresenter = new FilmPresenter(this.#containerTopRated.element, this.#handleCardChange, this.#handleModeChange);
    filmPresenter.init(film, this.#commens);
    this.#mapTopRatePresentor.set(film.id, filmPresenter);
  };

  #renderTopCommentCard = (film) => {
    const filmPresenter = new FilmPresenter(this.#containerTopComment.element, this.#handleCardChange, this.#handleModeChange);
    filmPresenter.init(film, this.#commens);
    this.#mapTopCommentPresentor.set(film.id, filmPresenter);
  };


  #sortCards = (sortType) => {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortByDate);
        break;
      case SortType.RATING:
        this.#films.sort(sortByRating);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.#films = [...this.#sourceFilms];
    }

    this.#currentSortType = sortType;
  };

  // очистка для функций сортировки
  #clearCardList = () => {
    this.#mapFilmPresentor.forEach((presenter) => presenter.destory());
    this.#mapFilmPresentor.clear();
    // this.#renderCardsCount = FILM_COUNT_PER_PAGE;
    remove(this.#btnShowMoreComponent);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortCards(sortType);
    this.#clearCardList();
    this.#renderCardsList();
  };

}
