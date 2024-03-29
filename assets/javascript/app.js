//puts everything into one overall function, so can restart more easily
function startGame () {
    //contstucts questions using class
    class TriviaCards {
        constructor (question, correct, incorrect, img, fact) {
            Object.assign(this,{question, correct, incorrect, img, fact});
        }
    }

    //feeds information into constructor
    let questions = [
        questionOne = new TriviaCards (
            'Completed in 1873, what is the oldest building on campus?',
            'South Hall',
            ['Doe Library', 'Valley Life Science Building', 'Wheeler Hall'],
            './assets/images/south_hall.png',
            'South Hall is on the left in this photo from 1873, one of UC Berkeley\'s original two buildings'
        ),
        questionTwo = new TriviaCards (
            'In 1905, UC Berkeley\'s established their "University Farm," which later became what University today?',
            'UC Davis',
            ['Stanford University', 'UC Merced', 'CSU East Bay'],
            './assets/images/UC_Davis.png',
            'One of the early Picnic Days on UC Davis\' campus'
        ),
        questionThree = new TriviaCards (
            'Unbeknownst to the original founders, what fault line runs through UC Berkeley?',
            'Hayward Fault',
            ['Elsinore Fault Zone', 'San Andreas Fault', 'Elysian Park Fault'],
            './assets/images/hayward_fault.png',
            'The red line shows the Hayward fault, which runs right through Memorial Stadium and the Greek Theater'
        ),
        questionFour = new TriviaCards (
            'In 1941, the university debuted Oski as the official mascot, replacing what?',
            'Actual live bear cubs',
            ['Salmon', 'Strawberry Canyon Strawberries', 'Bulldogs'],
            './assets/images/oski_bear.png',
            'The jury is still out in regards to which one is scarier for the audience...'
        ), 
        questionFive = new TriviaCards (
            'How many Nobel laureates are there among UC Berkeley\'s alumni, faculty, and researchers?',
            '107',
            ['76', '14', '36'],
            './assets/images/nobel_laureate.png',
            'Spots reserved for Nobel Laureates on campus pictured above. Winning the Prize is still cosidered one of the easiest ways to find parking in Berkeley'
        ),
        questionSix = new TriviaCards (
            'Prior to EBMUD\'s aqueduct delivering running water to Berkeley starting in the 1930\'s, what was Strawberry Creek used for?',
            'All of these answers',
            ['Drinking water', 'Open sewer', 'Irrigation'],
            './assets/images/strawberry_creek.png',
            'Luckily, the creek has been cared for and is much cleaner today than the campus\' early days'
        ),
        questionSeven = new TriviaCards (
            'In addition to being a symbol of the university and keeping time, what other function does Sather Tower (the Campanile) perform?',
            'Stores fossils',
            ['Houses a number of professors', 'Preserves the world\'s largest record collection', 'Exclusive bar and lounge for professors'],
            './assets/images/campanile.png',
            'At 307 feet tall, this is the 3rd tallest bell tower in the world'
        ),
        questionEight = new TriviaCards (
            'Nearly all UC\'s once had cannons for football games.  UC Berkeley is the only one still using their cannon after they were banned in the 1960\'s.  Why is this?',
            'Students built a platform on the hill, technically outside of the stadium',
            ['There is a special exception to the rule for Berkeley', 'The cannon does not actually fire, it is a recording', 'UC Berkeley has no cannon'],
            './assets/images/victory_cannon.png',
            'The cannon was gifted by the Class of 1964 - the wheels are from an old San Francisco fire wagon and the barrel from an Oakland foundry owned by a Cal alum'
        ),
        questionNine = new TriviaCards (
            'What latin phrase is the motto of UC Berkeley?',
            'Fiat Lux',
            ['Carpe Diem', 'Alma Mater', 'Quid Pro Quo'],
            './assets/images/fiat_lux.png',
            'Pictured above, the motto is front, top, and center on Sather Gate'
        ),
        questionTen = new TriviaCards (
            'What is the trophy given to the winner of the Cal vs. Stanford Big Game each year?',
            'The Axe',
            ['The Cannon', 'The Hammer and Sickle', 'The Scythe'],
            './assets/images/axe.png',
            'The Axe made its first appearance on Aril 13, 1899 and has been changing hands between the schools ever since'
        ),
    ]

    //Results tallies
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unAnswered = 0;

    //creates a randomizer method to use in the future for choosing the question
    function randomize (value) {
        return (Math.floor(Math.random() * value));
    }

    //this method is used to display "Correct/Incorrect/TimeUp" + picture + fact to DOM
    function answerAndPicture (messageVar, imgVar, factVar) {
        let content = `<div>
                        <div style="font-weight: heavy;">${messageVar}</div>
                        <img style="height: 300px; width: 450px;" src="${imgVar}" class="img-thumbnail"><br>
                        <span style"font-weight: heavy;">Fun Fact:</span> <span style="font-style: italic;">${factVar}</span>
                    </div>`
        return content;
    }

    initialize();

    //FUNCTIONS
    //initialize is run for each time we have a new question to show
    function initialize () {
        //TIMER code
        let intervalId;
        clearInterval(intervalId);
        let number = 30;
        $("#timer").html(`Time Remaining: <strong>${number}</strong>`);
        intervalId = setInterval(decrement, 1000);
        function decrement () {
            number--;
            $("#timer").html(`Time Remaining: <strong>${number}</strong>`);

            //if runs out of time, stop clock and show answer, then move on
            if (number <= 0) {
                clearInterval(intervalId);
                setTimeout(function() {initialize(); }, 6000);
                let message = `Time is Up!<br>The answer was: ${correct}`;
                let html = answerAndPicture (message, img, fact);
                $("#multiple-choice").empty();
                $("#question").html(html);

                //tallies unanswered count, removes current question from questions array
                unAnswered++;
                questions.splice(randIndex, 1);
            }
        }

        //If we go through all questions...
        if (questions.length <= 0) {
            clearInterval(intervalId);

            //start button reappears to restart the game
            $("#start").html("Restart?");
            $("#start").show();

            //shows summary of player's performance
            $("#question").html('All done, here\'s how you did:');
            let html =  `<div>
                            <div>Correct Answers: ${correctAnswers}</div>
                            <div>Incorrect Answers: ${incorrectAnswers}</div>
                            <div>Unanswered: ${unAnswered}</div>
                        </div>`
            $("#multiple-choice").html(html);
            
            return
        }

        //QUESTION/ANSWER RANDOMIZER
        //uses randomize method to get a random number of current questions array length
        let randIndex = randomize(questions.length);

        //puts relevant values into these variables, so they're easier to work with
        let [question, correct, incorrect, img, fact] = Object.values(questions[randIndex]);

        //pushes the correct answer into the same array as the incorrect answers, so they can be shuffled
        incorrect.push(correct);

        //shuffles the 4 possible answers.  Similar to Fisher-Yates.
        for (let i = 0; i < 3; i++) {
            if (randomize(100) > 50) {
                let temp = incorrect[i];
                incorrect[i] = incorrect[i+1];
                incorrect[i+1] = temp;
            }
        }

        //puts those 4 possible answers (choices) into a list on DOM
        let html = `<ul>`;
        incorrect.map(function(choice) {
            html += `<li class="choice">${choice}</li>`;
        });

    
        //Checks if answer is correct and displays results accordingly with image
        function isCorrect() {

            //determines if answer is correct, gives info for on-screen message and increments counter
            if ($(this).html() === correct) {
                var message = "Correct!";
                correctAnswers++;
            } else {
                var message = `Incorrect! The answer was: <br>${correct}<br>`;
                incorrectAnswers++;
            }

            $("#multiple-choice").empty();
            let html = answerAndPicture (message, img, fact);
            $("#question").html(html);

            clearInterval(intervalId);
            setTimeout(function() {initialize(); }, 6000);
            
            //removes current question from questions array, so can't be repeated
            questions.splice(randIndex, 1);
        }
        
        //feeds content to the DOM
        $("#question").html(question);
        $("#multiple-choice").html(html + "</ul>");
        $(".choice").on("click", isCorrect);
    }
}

//CLICK HANDLERS
$("#start").on("click", function() {
    $(this).hide();
    startGame();
    console.log(this);
});



