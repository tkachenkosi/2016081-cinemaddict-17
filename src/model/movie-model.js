import {generateMove} from '../mock/movie-mock';

export default class MovieModel {
  #movies = Array.from({length: 13}, generateMove);

  get movies() {
    return this.#movies;
  }
}
