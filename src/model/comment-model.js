import {generateComment} from '../mock/comment-mock.js';

export default class CommentModel {
  comment = Array.from({length: 3}, generateComment);

  getComment = () => this.comment;
}
