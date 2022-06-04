
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
import {updateItem} from '../utils/utils';
import {SortType} from '../utils/const';

const FILM_COUNT_PER_PAGE = 5;

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

  #moviesData = [];
  #commentsData = [];
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
  #sortComponent = new SortView();
  #btnShowMoreComponent = new ButtonShowMoreView;


  init = () => {
    this.#moviesData = [...this.#moviesModel.movies];          // список фильмов
    this.#commentsData = [...this.#commentsModel.comments];    // все коментарии

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

    this.#renderTopCommentCard(this.#moviesData[0]);
    this.#renderTopCommentCard(this.#moviesData[1]);
  };

  #renderTopComment = () => {
    // секция most commented
    render(this.#listTopComment, this.#filmsSection.element);
    render(this.#containerTopComment, this.#listTopComment.element);

    this.#renderTopRatedCard(this.#moviesData[0]);
    this.#renderTopRatedCard(this.#moviesData[1]);
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
    this.#moviesData.slice(this.#renderCardsCount, this.#renderCardsCount + FILM_COUNT_PER_PAGE)
      .forEach((film) => this.#renderCard(film, this.#containerFilms.element));

    this.#renderCardsCount += FILM_COUNT_PER_PAGE;

    if (this.#renderCardsCount >= this.#moviesData.length) {
      // удаление обработчика кнопки по достижению конца списка фильмов
      remove(this.#btnShowMoreComponent);
    }
  };


  #renderBoard = () => {
    this.#renderNav();

    if (this.#moviesData.length > 0) {
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
    for (let i = 0; i <  Math.min(this.#moviesData.length, FILM_COUNT_PER_PAGE); i++) {
      this.#renderCard(this.#moviesData[i], this.#containerFilms.element);
    }
  };

  #renderCard = (film, container) => {
    const filmPresenter = new FilmPresenter(container, this.#handleCardChange, this.#handleModeChange);
    filmPresenter.init(film, this.#commentsData);
    this.#mapFilmPresentor.set(film.id, filmPresenter);
  };

  #handleCardChange = (updatedCard) => {
    this.#moviesData = updateItem(this.#moviesData, updatedCard);
    this.#mapFilmPresentor.get(updatedCard.id).init(updatedCard, this.#commentsData);
  };


  #handleModeChange = () => {
    this.#mapFilmPresentor.forEach((presenter) => presenter.resetView());
    this.#mapTopRatePresentor.forEach((presenter) => presenter.resetView());
    this.#mapTopCommentPresentor.forEach((presenter) => presenter.resetView());
  };


  #renderTopRatedCard = (film) => {
    const filmPresenter = new FilmPresenter(this.#containerTopRated.element, this.#handleCardChange, this.#handleModeChange);
    filmPresenter.init(film, this.#commentsData);
    this.#mapTopRatePresentor.set(film.id, filmPresenter);
  };

  #renderTopCommentCard = (film) => {
    const filmPresenter = new FilmPresenter(this.#containerTopComment.element, this.#handleCardChange, this.#handleModeChange);
    filmPresenter.init(film, this.#commentsData);
    this.#mapTopCommentPresentor.set(film.id, filmPresenter);
  };

  // очистка для функций сортировки
  #clearCardList = () => {
    this.#mapFilmPresentor.forEach((presenter) => presenter.destory());
    this.#mapFilmPresentor.clear();
    this.#renderCardsCount = FILM_COUNT_PER_PAGE;
    remove(this.#btnShowMoreComponent);
  };


  #handleSortTypeChange = (sortType) => {
    // сортитуем
    // очищаем список
    // редерим список заново
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#clearCardList();
  };

}
