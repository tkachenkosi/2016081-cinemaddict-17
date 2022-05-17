import {createElement} from '../render.js';

const createTemplate = (title) => `
  <section class="films-list films-list--extra">
      <h2 class="films-list__title">${title}</h2>

    </section>`;


export default class FilmsLisExtratView {
  #element = null;

  constructor (title) {
    this.title = title;
  }

  get template() {
    return createTemplate(this.title);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
