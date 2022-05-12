import FilmPresenter from './presenter/film-presenter.js';
import MoveModel from './model/move-model.js';
import CommentModel from './model/comment-model.js';

const bodyElement = document.querySelector('body');
const mainElement = bodyElement.querySelector('.main');
const headerElement = bodyElement.querySelector('.header');
const footerElement = bodyElement.querySelector('.footer__statistics');

const moveModel = new MoveModel();
const commentModel = new CommentModel();


// new FilmPresenter(siteMainElement, siteHeaderElement, siteFooterElement).init();
new FilmPresenter(bodyElement, mainElement, headerElement, footerElement).init(moveModel, commentModel);
