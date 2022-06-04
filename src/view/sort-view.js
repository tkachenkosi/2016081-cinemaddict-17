import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../utils/const';

const createTemplate = () => `
  <ul class="sort">
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
  </ul>`;


export default class SortView extends AbstractView {

  get template() {
    return createTemplate();
  }

  #sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

}
