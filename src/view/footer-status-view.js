
import {createElement} from '../render.js';

const createTemplate = () => `<p>130 291 movies inside</p>`


export default class FooterStatusView {
  getTemplate() {
    return createTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
