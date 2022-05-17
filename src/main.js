import FilmPresenter from './presenter/film-presenter';
import MoveModel from './model/move-model';
import CommentModel from './model/comment-model';

const bodyElement = document.querySelector('body');
const mainElement = bodyElement.querySelector('.main');
const headerElement = bodyElement.querySelector('.header');
const footerElement = bodyElement.querySelector('.footer__statistics');

const movieModel = new MoveModel();
const commentModel = new CommentModel();


// new FilmPresenter(siteMainElement, siteHeaderElement, siteFooterElement).init();
new FilmPresenter(mainElement, headerElement, footerElement, movieModel, commentModel).init();
