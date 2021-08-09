import Player from './player';
import Question from './question';

export default class Game {
    players:Player[] = [];

    score:number = 0;

    questionTimeInSeconds:number = 120;

    questions:Question[] = [];
}