import {generateMove} from '../mock/move-mock.js';

export default class MoveModel {
  #movies = Array.from({length: 13}, generateMove);

  get movies() {
    return this.#movies;
  }
}
