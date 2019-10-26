# TriviaGame
Welcome to my UC Berkeley Trivia Game!

## What is this?
This game uses Javascript and jQuery (along with HTML, CSS, and Bootstrap) to create a 10-question long trivia game.  The use of timers was one of the aims of the projects as well.

## How do you play?
After clicking the "start" button, the player has 30 seconds to answer each question. They can either answer the question correctly, incorrectly, or run out of time.  The game keeps a tally of each of these cases over the course of the full game, then displays the tallies as results at the end.

## How does it work?
I've included detailed notes within the code to explain what different parts are doing.  Here's a quick overall breakdown:
- I use Class and Constructor to create my set of 10 questions
- I've built randomizers to make the order of the questions as well as the order of the choices random each time you play
- When each question is displayed, a 30-second timer begins.  The player must answer within that time frame, or else the question is "unanswered"
- Based on which answer you click, the code determines if you are correct or incorrect and increments the respective tally
- After each question, there is a setTimeout where the player learns if they are correct or not (or didn't answer), then displays a relevant image and a fun fact
- Once the player has gone through all the questions, the results are displayed and they can restart the game