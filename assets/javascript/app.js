class TriviaCards {
    constructor (question, correct, incorrect, img) {
        Object.assign(this,{question, correct, incorrect, img});
    }
}

let questions = {
    questionOne : new TriviaCards (
        'Who wrote "Crazy in Love"?',
        'Beyonce',
        ['Rihanna', 'Celine Deon', 'Alanis Morsette'],
        './assets/images/figrin-dan.jpg'
    ),
    questionTwo : new TriviaCards (
        'Who wrote "Thubwumper"?',
        'Chumbawumba',
        ['Blink-182', 'Third Eye Blind', 'Red Hot Chili Peppers'],
        './assets/images/porkins.jpg'
    ),
    questionThree : new TriviaCards (
        'Who wrote "something"',
        'someone',
        ['one', 'two', 'three'],
        './assets/images/willrow-hood.jpg'
    )
}


//creates a randomizer to use in the future
function randomize (value) {
    return (Math.floor(Math.random() * value));
}

//FUNCTIONS
//initialize is run for each time we have a new question to show
function initialize () {

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

    console.log(incorrect);

    let html = `<ul>`;
    incorrect.map(function(choice) {
        html += `<li>${choice}</li>`
    });
    
    $("#question").html(question);
    $("#multiple-choice").html(html + "</ul>");

}

//CLICK HANDLERS
$("#start").on("click", initialize);
