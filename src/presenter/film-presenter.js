import HeaderProfileView from '../view/header-profile-view.js';
import FooterStatusView from '../view/footer-status-view.js';
import ButtonShowMoreView from '../view/films-list-show-more-view.js';
import FilmCardView from '../view/film-card-view.js';

import FilmsSectionView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListExtraView from '../view/films-list-extra.js';
import FilmsListContainerView from '../view/films-list-container-view.js';

import NavigationView from '../view/navigation-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';


export default class FilmPresenter {
  constructor(mainElement, headerElement, footerElement) {
    this.mainContainer = mainElement;
    this.headerContainer = headerElement;
    this.footerContainer = footerElement;
  }

  filmsSection = new FilmsSectionView();  // films
  listFilms = new FilmsListView();
  listRated = new FilmsListExtraView();
  listComment = new FilmsListExtraView();

  containerFilms = new FilmsListContainerView();
  containerRated = new FilmsListContainerView();
  containerComment = new FilmsListContainerView();

  navigationComponent = new NavigationView();
  sortComponent = new SortView();

  init = () => {

    render(this.navigationComponent, this.mainContainer);
    render(this.sortComponent, this.mainContainer);
    render(this.filmsSection, this.mainContainer);

    // основная секция
    render(this.listFilms, this.filmsSection.getElement());
    render(this.containerFilms, this.listFilms.getElement());
    render(new ButtonShowMoreView, this.listFilms.getElement());

    // секция top rated
    render(this.listRated, this.filmsSection.getElement());
    render(this.containerRated, this.listRated.getElement());

    // секция most commented
    render(this.listComment, this.filmsSection.getElement());
    render(this.containerComment, this.listComment.getElement());


    render(new HeaderProfileView(), this.headerContainer);
    render(new FooterStatusView(), this.footerContainer);

    for (let i = 0; i < 8; i++) {
      render(new FilmCardView(), this.containerFilms.getElement());
    }

    render(new FilmCardView(), this.containerRated.getElement());
    render(new FilmCardView(), this.containerRated.getElement());

    render(new FilmCardView(), this.containerComment.getElement());
    render(new FilmCardView(), this.containerComment.getElement());

  };
}
