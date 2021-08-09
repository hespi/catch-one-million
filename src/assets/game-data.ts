import Game from '../classes/game';

export const INITIAL_GAMEDATA:Game = {
    "players": [],
    "score": 1000000,
    "questionTimeInSeconds": 120,
    "questions": [
        {
            "id": 1,
            "question": "Is this a test?",
            "presenter": "dana",
            "options": ["Option 1", "Option 2", "Option 3"],
            "answerIx": 1
        }, 
        {
            "id": 2,
            "question": "Is this a second test?",
            "presenter": "dana",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
            "answerIx": 5
        }
    ]
}