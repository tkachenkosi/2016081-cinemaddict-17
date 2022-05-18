import AbstractView from '../framework/view/abstract-view';

const createTemplate = (title) => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">${title}</h2>
  </section>`);


export default class FilmsLisExtratView extends AbstractView {
  constructor (title) {
    super();
    this.title = title;
  }

  get template() {
    return createTemplate(this.title);
  }

}
