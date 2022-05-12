import {generateMove} from '../mock/move-mock.js';

export default class MoveModel {
  move = Array.from({length: 3}, generateMove);

  getMove = () => this.move;
}
