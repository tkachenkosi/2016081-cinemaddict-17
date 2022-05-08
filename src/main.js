import FilmPresenter from './presenter/film-presenter.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

new FilmPresenter(siteMainElement, siteHeaderElement, siteFooterElement).init();
