import HeaderProfileView from '../view/header-profile-view';
import FooterStatusView from '../view/footer-status-view';
import ButtonShowMoreView from '../view/films-list-show-more-view';
import FilmCardView from '../view/film-card-view';
import FilmPopupView from '../view/film-popup-view';

import FilmsSectionView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import ListEmptyView from '../view/list-empty-view';
import FilmsListExtraView from '../view/films-list-extra';
import FilmsListContainerView from '../view/films-list-container-view';

import NavigationView from '../view/navigation-view';
import SortView from '../view/sort-view';
import {render} from '../render';

const FILM_COUNT_PER_PAGE = 5;

export default class FilmPresenter {
  constructor(mainElement, headerElement, footerElement, movieModel, commentModel) {
    this.mainContainer = mainElement;
    this.headerContainer = headerElement;
    this.footerContainer = footerElement;
    this.moviesModel = movieModel;
    this.commentsModel = commentModel;
  }

  #moviesData = [];
  #commentsData = [];
  #renderCardsCount = FILM_COUNT_PER_PAGE;

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
  #buttonComponent = new ButtonShowMoreView;


  init = () => {
    this.#moviesData = [...this.moviesModel.movies];          // список фильмов
    this.#commentsData = [...this.commentsModel.comments];    // все коментарии

    this.#renderListFilms();
  };    // init


  #renderListFilms = () => {
    render(this.#navComponent, this.mainContainer);

    if (this.#moviesData.length > 0) {
      render(this.#sortComponent, this.mainContainer);
      render(this.#filmsSection, this.mainContainer);

      // основная секция
      render(this.#listFilms, this.#filmsSection.element);
      render(this.#containerFilms, this.#listFilms.element);
      // кнопка show more
      if (this.#moviesData.length > FILM_COUNT_PER_PAGE) {
        render(this.#buttonComponent, this.#listFilms.element);
        this.#buttonComponent.element.addEventListener('click', this.#hamdleButtonShowMoreClick);
      }
      // секция top rated
      render(this.#listTopRated, this.#filmsSection.element);
      render(this.#containerTopRated, this.#listTopRated.element);
      // секция most commented
      render(this.#listTopComment, this.#filmsSection.element);
      render(this.#containerTopComment, this.#listTopComment.element);

      render(new HeaderProfileView(), this.headerContainer);
      render(new FooterStatusView(), this.footerContainer);

      for (let i = 0; i <  Math.min(this.#moviesData.length, FILM_COUNT_PER_PAGE); i++) {
        this.#renderCard(this.#moviesData[i], this.#containerFilms.element);
      }

      this.#renderCard(this.#moviesData[0], this.#containerTopRated.element);
      this.#renderCard(this.#moviesData[1], this.#containerTopRated.element);

      this.#renderCard(this.#moviesData[0], this.#containerTopComment.element);
      this.#renderCard(this.#moviesData[1], this.#containerTopComment.element);
    } else {
      render(this.#filmsSection, this.mainContainer);
      render(this.#listEmpty, this.#filmsSection.element);
    }
  };


  #hamdleButtonShowMoreClick = () => {
    this.#moviesData.slice(this.#renderCardsCount, this.#renderCardsCount + FILM_COUNT_PER_PAGE)
      .forEach((film) => this.#renderCard(film, this.#containerFilms.element));

    this.#renderCardsCount += FILM_COUNT_PER_PAGE;

    if (this.#renderCardsCount >= this.#moviesData.length) {
      this.#buttonComponent.element.remove();
      this.#buttonComponent.removeElement();
    }
  };


  // показать карточку фильма
  #renderCard = (film, container) => {
    const cardComponent = new FilmCardView(film);

    // показать popup
    cardComponent.element.querySelector('.film-card__poster').addEventListener('click', () => {
    // cardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      this.#renderPopup(film, this.#commentsData);
    });

    render(cardComponent, container);
  };


  // окно с детальной информацией и коментарииеми
  #renderPopup = (film, comments) => {
    const popupComponent = new FilmPopupView(film, comments);
    const containerBody = document.querySelector('body');

    // закрытие popup
    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      popupComponent.removeElement();
      containerBody.querySelector('.film-details').remove();
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        // evt.preventDefault();
        popupComponent.removeElement();
        containerBody.querySelector('.film-details').remove();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    document.addEventListener('keydown', onEscKeyDown);

    // вывести подробную карточку фильма
    render(popupComponent, containerBody);
  };

}
