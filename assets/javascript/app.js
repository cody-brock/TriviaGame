class TriviaCards {
    constructor (question, correct, incorrect, img) {
        Object.assign(this,{question, correct, incorrect, img});
    }
}

let questions = [
    questionOne = new TriviaCards (
        'Who wrote "Crazy in Love"?',
        'Beyonce',
        ['Rihanna', 'Celine Deon', 'Alanis Morsette'],
        './assets/images/figrin-dan.jpg'
    ),
    questionTwo = new TriviaCards (
        'Who wrote "Thubwumper"?',
        'Chumbawumba',
        ['Blink-182', 'Third Eye Blind', 'Red Hot Chili Peppers'],
        './assets/images/porkins.jpg'
    ),
    questionThree = new TriviaCards (
        'Who wrote "something"',
        'someone',
        ['one', 'two', 'three'],
        './assets/images/willrow-hood.jpg'
    )
]

//global variables
var correctAnswers = 0;
var incorrectAnswers = 0;
var unAnswered = 0;

//creates a randomizer to use in the future
function randomize (value) {
    return (Math.floor(Math.random() * value));
}

function buildPlaylist (value) {
    value.randomize();
}



//FUNCTIONS
//initialize is run for each time we have a new question to show
function initialize () {
    //TIMER
    let intervalId;
    clearInterval(intervalId);
    let number = 10;
    $("#timer").html(`Time Remaining: ${number} Seconds`);
    intervalId = setInterval(decrement, 1000);
    function decrement () {
        number--;
        $("#timer").html(`Time Remaining: ${number} Seconds`);

        if (number <= 0) {
            clearInterval(intervalId);
            setTimeout(function() {initialize(); }, 3000);
            let message = `Time is Up!<br>The answer was ${correct}`;
            let html = `<div>
                            <div>${message}</div>
                            <img src="${img}">
                        </div>`
            $("#multiple-choice").empty();
            $("#question").html(html);

            //removes current question from questions array, so can't be repeated
            // console.log("questions before", questions)
            unAnswered++;
            console.log(unAnswered);
            questions.splice(randIndex, 1);
            // console.log("questions after", questions)
            
        }
    }
    //END TIMER

    if (questions.length <= 0) {
        clearInterval(intervalId);
        // $("#start").innerHTML = 'Start Over?';
        // $("#start").style.display = 'block';
        // $("#start").show();
        // $("#start").css( "display", "block" );

        $("#question").html('All done, here\'s how you did');
        let html =  `<div>
                        <div>Correct Answers: ${correctAnswers}</div>
                        <div>Incorrect Answers: ${incorrectAnswers}</div>
                        <div>Unanswered: ${unAnswered}</div>
                    </div>`
        $("#multiple-choice").html(html);
        

        // return
        
    }

    //
    let objArr = Object.values(questions);
    console.log(objArr);

    let randIndex = randomize(objArr.length);
    let [question, correct, incorrect, img] = Object.values(objArr[randIndex]);
    console.log(objArr[randIndex]);

    incorrect.push(correct);
    for (let i = 0; i < 3; i++) {
        if (randomize(100) > 50) {
            let temp = incorrect[i];
            incorrect[i] = incorrect[i+1];
            incorrect[i+1] = temp;
        }
    }

    //turns choices into a list on DOM
    let html = `<ul>`;
    incorrect.map(function(choice) {
        html += `<li class="choice">${choice}</li>`;
    });

    //Checks if answer is correct and displays results accordingly with image
    function isCorrect() {

        //dtermines if answer is correct, gives info for message and increments counter
        if ($(this).html() === correct) {
            var message = "Correct!";
            correctAnswers++;
        } else {
            var message = `Incorrect! The answer was ${correct}`;
            incorrectAnswers++;
        }
        console.log(correctAnswers, incorrectAnswers);

        // let message = $(this).html() === correct ? "Correct!" : `Incorrect! The answer was ${correct}`;
        let html = `<div>
                        <div>${message}</div>
                        <img src="${img}">
                    </div>`
        $("#multiple-choice").empty();
        $("#question").html(html);

        clearInterval(intervalId);
        setTimeout(function() {initialize(); }, 3000);
        
        

        //removes current question from questions array, so can't be repeated
        //  console.log("questions before", questions);
         questions.splice(randIndex, 1);
        //  console.log("questions after", questions);

    }
    
    $("#question").html(question);
    $("#multiple-choice").html(html + "</ul>");

    $(".choice").on("click", isCorrect);

    

}

//CLICK HANDLERS
$("#start").on("click", initialize);


