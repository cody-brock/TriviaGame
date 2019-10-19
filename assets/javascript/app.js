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
    questionThree : new TriviaCards
}

//FUNCTIONS
function initialize () {

    let keyArr = Object.keys(questions);
    console.log(keyArr);

    let randIndex = Math.floor(Math.random() * (keyArr.length));
    console.log(randIndex);
    
}

//CLICK HANDLERS
$("#start").on("click", initialize);
