
import {render, remove} from '../framework/render';
import HeaderProfileView from '../view/header-profile-view';
import FooterStatusView from '../view/footer-status-view';
import ButtonShowMoreView from '../view/films-list-show-more-view';
import FilmPresenter from './film-presenter';
// import PopupPresenter from './popup-presenter';
// import FilmCardView from '../view/film-card-view';
// import FilmPopupView from '../view/film-popup-view';

import FilmsSectionView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import ListEmptyView from '../view/list-empty-view';
import FilmsListExtraView from '../view/films-list-extra';
import FilmsListContainerView from '../view/films-list-container-view';

import NavigationView from '../view/navigation-view';
import SortView from '../view/sort-view';
import {isEscape, updateItem} from '../utils/utils';

const FILM_COUNT_PER_PAGE = 5;
let test2 = null;
let id = null

export default class ListPresenter {
  #commentsModel = null;
  #headerContainer = null;
  #footerContainer = null;
  #mainContainer = null;
  #moviesModel = null;

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

    this.#renderCard(this.#moviesData[0], this.#containerTopRated.element);
    this.#renderCard(this.#moviesData[1], this.#containerTopRated.element);
  };

  #renderTopComment = () => {
    // секция most commented
    render(this.#listTopComment, this.#filmsSection.element);
    render(this.#containerTopComment, this.#listTopComment.element);

    this.#renderCard(this.#moviesData[0], this.#containerTopComment.element);
    this.#renderCard(this.#moviesData[1], this.#containerTopComment.element);
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

  #clearCardList = () => {
    this.#mapFilmPresentor.forEach((presenter) => presenter.destory());
    this.#mapFilmPresentor.clear();
    this.#renderCardsCount = FILM_COUNT_PER_PAGE;
    remove(this.#btnShowMoreComponent);
  };


  #handleCardChange = (updatedCard) => {
    this.#moviesData = updateItem(this.#moviesData, updatedCard);
    this.#mapFilmPresentor.get(updatedCard.id).init(updatedCard, this.#commentsData);
  };


  #handleModeChange = () => {


    this.#mapFilmPresentor.forEach((presenter) => presenter.resetView());
    
    // this.#mapFilmPresentor.forEach((presenter) => {
      // id = presenter.id;
    // test2 = presenter.mode;
// console.log('mode change', test2, id, presenter.test1);
// console.log(presenter);
      // presenter.resetView()
    // }
    // );



    // this.#mapTopRatePresentor.forEach((presenter) => presenter.resetView());
    // this.#mapTopCommentPresentor.forEach((presenter) => presenter.resetView());
  };


  // показать карточку фильма
  /* #renderCard = (film, container) => {
    const cardComponent = new FilmCardView(film);
    cardComponent.setEditClickHandler(() => {this.#renderPopup(film, this.#commentsData);});
    render(cardComponent, container);
    this.#cards.set(film.id, cardComponent);  // запоминаем отрисованную карточку в массиве
  }; */



  // очистка для функций сортировки
  /* #clearCardList = () => {
    this.#cards.forEach((card) => remove(card));
    this.#cards.clear();
    this.#renderCardsCount = FILM_COUNT_PER_PAGE;
    remove(this.#btnShowMoreComponent);
  }

  #handleCardChange = (updatedCard) => {
    this.#moviesData = updateItem(this.#moviesData, updateCard);
    this.#cards.get(updateCard.id);
    this.#renderCards();

  }

  #handleModeChange = () => {
    this.#cards.forEach((film) => film.reserView)
  }; */

}
