import Game from "./classes/game";

export enum GameActionType {
    SET_PLAYERS = "SET_PLAYERS",
    SET_SCORE = "SET_SCORE",
}

interface GameAction {
    type: GameActionType,
    data: any
}

export default function GameReducer(state:Game, action:GameAction) {
    switch(action.type) {
        case GameActionType.SET_PLAYERS:
            return {
                ...state,
                players: action.data
            }
            case GameActionType.SET_SCORE:
                return {
                    ...state,
                    score: action.data.score,
                    lastAnsweredQuestion: action.data.lastQuestion
                }
        default:
            return state;
    }
}