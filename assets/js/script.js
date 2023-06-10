
const playButton = document.getElementById('play-btn')
const welcomeContainer = document.getElementById('welcome-container')
const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const nextButton =document.getElementById('next-btn')

let shuffledQuestions
let currentQuestionIndex


playButton.addEventListener('click', playQuiz)

/**
 * Play quiz function starts the quiz after the play button is pressed. It removes the play button and add the questions and answer section
 */
function playQuiz() {
    playButton.classList.add('hide')
    welcomeContainer.classList.add('hide')
    questionContainer.classList.remove('hide')

   //shuffledQuestions=questions[Math.floor(Math.random()*questions.length)];
   shuffledQuestions=questions.sort(() => Math.random() - .5)  // gets a randow question
    currentQuestionIndex = 0  //set to 0 as we are starting on first question
    getQuestion();
}

// Get Question and show question concept from tutorial https://www.youtube.com/watch?v=riDzcEQbX6k

function getQuestion() {
    resetQuestionContainer()
    showQuestion(shuffledQuestions[currentQuestionIndex]);

}

function showQuestion(question) {
    questionElement.innerText=question.question
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText=answer.text;
        button.classList.add('answer-btn','btn');
         if (answer.correct) {
         button.dataset.correct =answer.correct //add data attribute of correct on to the button
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
        
    })
     }
    

function resetQuestionContainer  () {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer() {

}





// Questions and answers

const questions = [{

    question: "What state is know as The golden State",
    answers: [{
        text: "California",
        correct: true
    },
    {
        text: "Arizona",
        correct: false
    },
    {
        text: "Florida",
        correct: false
    },
    {
        text: "Hawaii",
        correct: false
    }

    ]
},

{
    question: 'What state is know as "The Grand Canyon State"',
    answers: [{
        text: "Arizona ",
        correct: true
    },
    {
        text: "Arkansas",
        correct: false
    },
    {
        text: "Alaska",
        correct: false
    },
    {
        text: "Alabama",
        correct: false
    }

    ]
},

{
    question: 'What state is know as "The Last Frontier state"',
    answers: [{
        text: "Alaska",
        correct: true
    },
    {
        text: "Hawaii",
        correct: false
    },
    {
        text: "Kentucky",
        correct: false
    },
    {
        text: "Missouri",
        correct: false
    }

    ]
},

{
    question: 'What state is know as "The Empire State"',
    answers: [{
        text: "New York",
        correct: true
    },
    {
        text: "Rhoe Island",
        correct: false
    },
    {
        text: "Tennessee",
        correct: false
    },
    {
        text: "Utah",
        correct: false
    },

    ]
},
];




