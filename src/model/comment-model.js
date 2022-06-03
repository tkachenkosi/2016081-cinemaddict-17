import {generateComment, generateCommentDust} from '../mock/comment-mock';

export default class CommentModel {
  constructor (dust = true) {
    this._dust = dust;
  }

  // #comments = null;

  getComments = () => {
    if (this._dust) {
      return generateCommentDust();
    } else {
      return Array.from({length: 3}, generateComment);
    }
  };

  get comments() {
    // return this.#comments;
    return this.getComments();
  }
}

