# Catch One Million

This project has been created for the Checkout Area Gathering by:
* Game development: Héctor Espí <hector.espi@edreamsodigeo.com>
* Questions: Gonçalo Garrido <gonzalo.garrido@edreamsodigeo.com>

## Available Scripts

In order to run the the game do the following

### `npm install`

This will download game dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Game screens

The game is divided into 3 main screens:

### Player Selection

You can add up to 8 players to each game. Although this doesn't have any effect on the game, as it is facilitated by only one person, this information is important to determine the final winners of the area gathering.

#### Keyboard actions

* Press '+' to add a user
* Press '-' to remove a user

Once you have filled the information of all game players, you must press 'ENTER' and confirm. Then the game will be started.

### Game Questions

This is the main game screen in which questions will be asked to the players, whose have 2 min (this can be configured) to set the amount of 'Primes' they want to bet in each answer. You can set as much as the money left shown in "Pending" score. It's is not necessary that you put money in every possible answer. Nonetheless, it's highly recommended to spend ALL your pending Primes into the different options to avoid loosing non played Primes when the timer reaches zero.

Once the question appears, the timer will be restarted, giving 2 min to answer each game question. It's up to the facilitator to pause the game if the team needs clarification, but don't count with that.

Everytime a question is solved, either by solving each answer independently or by solving the whole question showing all invalid and valid options, the score will be set to the amount played in the right answer, the rest will be lost. Then you can pass to the next question by pressing any key.

#### Keyboard actions

It's important to click/focus on question board to have keyboard actions executed.

* Press 'p' to pause
* Press 'd' to discover a random not valid answer
* Press 's' to fully solve the question

### Game Results

The game finishes when the team completes all the questions or when they reach zero in their score, meaning that they lost ALL the Primes.

Then you will get redirected to the game results, were your final score and rank will be shown. The facilitator must download the game results to merge with the other teams, so that we can determine the winner of the area gathering game.

## Configuration

Game can be configured by properly filling the file 'assets/game-data.ts'. Simply set your questions and other configurations before starting the game, so it's compiled. 

ENJOY! ;)