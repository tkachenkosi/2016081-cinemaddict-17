import ListPresenter from './presenter/list-presenter';
import MovieModel from './model/movie-model';
import CommentModel from './model/comment-model';

const bodyElement = document.querySelector('body');
const mainElement = bodyElement.querySelector('.main');
const headerElement = bodyElement.querySelector('.header');
const footerElement = bodyElement.querySelector('.footer__statistics');

const movieModel = new MovieModel();
const commentModel = new CommentModel();


new ListPresenter(mainElement, headerElement, footerElement, movieModel, commentModel).init();
