

//Button variables
const playButton = document.getElementById('play-btn');
const nextButton =document.getElementById('next-btn');
const answerButtonsElement = document.getElementById('answer-buttons');
const playAgainButton =document.getElementById('play-again-btn');
const alertButton = document.getElementById('alert-btn');
const rulesButton =document.getElementById('rules-btn');
const rulesOkButton =document.getElementById('rules-ok-btn');
//Container variables
const welcomeContainer = document.getElementById('welcome-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const usernameAlertContainer=document.getElementById('username-alert-container');
const usernameContainer =document.getElementById('username-container');
const rulesContainer =document.getElementById('rules-modal-container');
const welcomeMessage =document.getElementById('welcome-message');
//Scores variables
const scoreBoardContainer = document.getElementById('scoreboard-container');
const score = document.getElementById('score');
const incorrect=document.getElementById('incorrect');
const finalScore =document.getElementById('final-score');
const finalScoreName =document.getElementById('final-score-name');
//Timer variables
const timerContainer =document.getElementById('timer-container');
const time=document.getElementById('time');
//Modal variables
const gameOverModal =document.getElementById('gameover-modal-container');
//Username input variable
let userName = document.getElementById('username').focus();
//Questions variables
let shuffledQuestions;
let currentQuestionIndex;
let shuffledAnswers;
let quizTimer;

//Event listeners
playButton.addEventListener('click', checkUsername);
playAgainButton.addEventListener('click',playQuiz);
alertButton.addEventListener('click', resetPage);
rulesButton.addEventListener('click', rules);
rulesOkButton.addEventListener('click',resetPage);

document.getElementById('username').addEventListener('keydown', function(event) {
    if(event.key ==='Enter') {
        checkUsername();
    }
});


nextButton.addEventListener('click' ,() => {
    currentQuestionIndex++;
    getQuestion();
});


//Functions

/**Rules of the quiz*/
function rules (){
    welcomeMessage.style.display = "none";
    usernameContainer.style.display = "none";
    rulesContainer.classList.remove('hide');
}

/**Checks that username entered is valid*/
function checkUsername () {
    userName = document.getElementById('username').value.trim();  
if (userName.length >=2) {
    playQuiz();
}
else {
    usernameAlert();
}

}
/**Alerts user if no username is entered or username is invalid*/
function usernameAlert() {
     usernameContainer.style.display = "none";
     usernameAlertContainer.classList.remove('hide');
}
/**Resets page after username alert message*/
function resetPage () {
    usernameAlertContainer.classList.add('hide');
    usernameContainer.style.display = "flex";
    rulesContainer.classList.add('hide');
    welcomeMessage.style.display = "block";
}


/**
 * Play quiz function starts the quiz after the play button is pressed. It removes the play button and displays the questions and answer section
 */
function playQuiz() {
    usernameContainer.style.display = "none";
    gameOverModal.classList.add('hide');
    welcomeContainer.style.display = "none";
    questionContainer.classList.remove('hide');
    scoreBoardContainer.classList.remove('hide-scoreboard');
    timerContainer.classList.remove('hide-timer');
    // gets a randow question
    shuffledQuestions=questions.sort(() => Math.random() - 0.5) ; 
    //set to 0 as we are starting on first question
    currentQuestionIndex = 0; 
    getQuestion();
    score.innerText=0;
    incorrect.innerText=0;
    countDowntimer ();
    
}

// Get Question and show question and answers concept from tutorial https://www.youtube.com/watch?v=riDzcEQbX6k
/**Gets question from list of questions */
function getQuestion() {
    resetQuestionContainer();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    
}
/**Shows question in question container*/
function showQuestion(quest) {
    questionElement.innerText=quest.quest; 
    //renamed question to quest to make easier to read
    shuffledAnswers=shuffledQuestions[currentQuestionIndex].answers.sort(() => Math.random() - 0.5);  // shuffles the answers
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText=answer.text;
        button.classList.add('answer-btn','btn');
         if (answer.correct) {
         //add data attribute to the correct button
         button.dataset.correct =answer.correct; 
    
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);

    });
    
     }
    
/**Removes next betton until answer is selected**/
function resetQuestionContainer  () {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {  
         //Loop through all the children for answer button elements and remove first child
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }

}

/**Selects answer in question container, get the button we clicked on**/
function selectAnswer(e) {
    const selectedButton = e.target; 
    selectedButton.classList.add('selected');
    const correct = selectedButton.dataset.correct;
    
    if (correct) {
        incrementScore ();
    }
    else {
        updateIncorrectScore ();
    }
    //set the status for all four buttons
    Array.from(answerButtonsElement.children).forEach(button => {
        setAnswerStatus(button,button.dataset.correct);
        // diables answer button to prevent user from incremeting the score by selecting the correct answer multiple times
        button.disabled=true; 
    });
    //check that we are not on last question
    if (shuffledQuestions.length > currentQuestionIndex + 1 ){ 
        nextButton.classList.remove('hide');
    } else {
        // add timeout to allow the final answer selected to be seen before calling modal
        setTimeout(gameOver, 1000); 
        timerContainer.classList.add('hide-timer');
    }    
   
    }


/**Color code correct and incorrect answers**/
function setAnswerStatus (element, correct) {
    clearAnswerStatus (element);
    if (correct) {
        element.classList.add('blink');
        element.classList.remove('selected');
        element.classList.add('correct');
        
    }
    else {
        //not needed as selected button is set to incorrect as default, and changed to correct if it is correct
   
 }
    }

/**Clears the answer status after each question**/
function clearAnswerStatus (element)  {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


// Concept from Love Maths project
/**Increments correct answers in scoreboard*/
function incrementScore () {
    let oldScore=parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++oldScore;

}
/**Increments incorrect answers in scoreboard*/
function updateIncorrectScore () {
    let oldScore=parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore;
 }


 // Concept from turorial https://www.youtube.com/watch?v=GhePFBkdNYk
 /**countdown timer*/
 function countDowntimer () {
        let currentTime=90;
        quizTimer =setInterval(function () {
            currentTime--;

            if (currentTime >= 0) {
            time.textContent=currentTime;
            }
            else if (currentTime === -1) {
                clearInterval(quizTimer);
                questionContainer.classList.add('hide');
                gameOver () ;
            }
        },
            1000);
        }
 
    
        
  /**Hides question container and displays game over modal*/   
 function gameOver () {
    questionContainer.classList.add('hide');
    gameOverModal.classList.remove('hide');
    finalScoreMessage ();
    playAgainButton.classList.remove('hide');
 }


  /**Gamover modal messages*/
function finalScoreMessage () {
if (score.innerHTML < 8) {
    finalScoreName.innerHTML = `Hard luck ${userName}`;
    finalScore.innerHTML = `Your final score is ${score.innerText} out of ${parseInt(score.innerText) + parseInt(incorrect.innerText)}`;
}
else if (score.innerHTML >= 8) {
    finalScoreName.innerHTML = `Congratulations ${userName}`;
    finalScore.innerHTML = `Your final score is ${score.innerText} out of ${parseInt(score.innerText) + parseInt(incorrect.innerText)}`;
}
else {
    alert("unknown score");
}
}



// Lits of 50 questions with four answers per question
const questions = [
    {
        quest: 'Which state is know as "The Cotton State"',
        answers: [{
            text: "Alabama",
            correct: true
        },
        {
            text: "Illinois",
            correct: false
        },
        {
            text: "Hawaii",
            correct: false
        },
        {
            text: "Louisiana",
            correct: false
        }
    
        ]
    },
    
    {
        quest: 'Which state is know as "The Last Frontier state"',
        answers: [{
            text: "Alaska",
            correct: true
        },
        {
            text: "Maryland",
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
        quest: 'Which state is know as "The Grand Canyon State"',
        answers: [{
            text: "Arizona ",
            correct: true
        },
        {
            text: "Arkansas",
            correct: false
        },
        {
            text: "Oklahoma",
            correct: false
        },
        {
            text: "Alabama",
            correct: false
        }
    
        ]
    },
    

    {
        quest: 'Which state is know as "The Natural State"',
        answers: [{
            text: "Arkansas ",
            correct: true
        },
        {
            text: "Idaho",
            correct: false
        },
        {
            text: "Wyoming",
            correct: false
        },
        {
            text: "Vermont",
            correct: false
        }
    
        ]
    },

    {

        quest: '"Which state is know as "The golden State"',
        answers: [{
            text: "California",
            correct: true
        },
        {
            text: "South Carolina",
            correct: false
        },
        {
            text: "Florida",
            correct: false
        },
        {
            text: "New Jersey",
            correct: false
        }
    
        ]
    },
    


    {
        quest: 'Which state is know as "Centennial State"',
        answers: [{
            text: "Colorado ",
            correct: true
        },
        {
            text: "Illinois",
            correct: false
        },
        {
            text: "North Carolina",
            correct: false
        },
        {
            text: "Wyoming",
            correct: false
        }
    
        ]
    },

    {
        quest: 'Which state is know as "Nutmeg State"',
        answers: [{
            text: "Connecticut",
            correct: true
        },
        {
            text: "New Hampshire",
            correct: false
        },
        {
            text: "Maryland",
            correct: false
        },
        {
            text: "New Mexico",
            correct: false
        }
    
        ]
    },

    {
        quest: 'Which state is know as "The First State"',
        answers: [{
            text: "Delaware",
            correct: true
        },
        {
            text: "Indiana",
            correct: false
        },
        {
            text: "Nebraska",
            correct: false
        },
        {
            text: "Minnesota",
            correct: false
        }
    
        ]
    },


    {
        quest: 'Which state is know as "The Sunshine State"',
        answers: [{
            text: "Florida",
            correct: true
        },
        {
            text: "Hawaii",
            correct: false
        },
        {
            text: "California",
            correct: false
        },
        {
            text: "Kentucky",
            correct: false
        }
    
        ]
    },

    {
        quest: 'Which state is know as "The Peach State"',
        answers: [{
            text: "Georgia",
            correct: true
        },
        {
            text: "Kentucky",
            correct: false
        },
        {
            text: "Montana",
            correct: false
        },
        {
            text: "Oklahoma",
            correct: false
        }
    
        ]
    },



    {
        quest: 'Which state is know as "The Aloha State"',
        answers: [{
            text: "Hawaii",
            correct: true
        },
        {
            text: "Missouri",
            correct: false
        },
        {
            text: "Rhode Island",
            correct: false
        },
        {
            text: "Vermont",
            correct: false
        }
    
        ]
    },


    {
        quest: 'Which state is know as "The Gem State"',
        answers: [{
            text: "Idaho",
            correct: true
        },
        {
            text: "Delaware",
            correct: false
        },
        {
            text: "Arkansas",
            correct: false
        },
        {
            text: "Massachusetts",
            correct: false
        },
    
        ]
    },


    {
        quest: 'Which state is know as "The Prairie State"',
        answers: [{
            text: "Illinois",
            correct: true
        },
        {
            text: "Kansas",
            correct: false
        },
        {
            text: "Iowa",
            correct: false
        },
        {
            text: "Nevada",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Hoosier State"',
        answers: [{
            text: "Indiana",
            correct: true
        },
        {
            text: "Minnesota",
            correct: false
        },
        {
            text: "Arizona",
            correct: false
        },
        {
            text: "Connecticut",
            correct: false
        },
    
        ]
    },


    {
        quest: 'Which state is know as "The Hawkeye State"',
        answers: [{
            text: "Iowa",
            correct: true
        },
        {
            text: "Florida",
            correct: false
        },
        {
            text: "Colorado",
            correct: false
        },
        {
            text: "Arkansas",
            correct: false
        },
    
        ]
    },


    {
        quest: 'Which state is know as "The Sunflower State"',
        answers: [{
            text: "Kansas",
            correct: true
        },
        {
            text: "Florida",
            correct: false
        },
        {
            text: "New Hampshire",
            correct: false
        },
        {
            text: "Connecticut",
            correct: false
        },
    
        ]
    },



    {
        quest: 'Which state is know as "The Bluegrass State"',
        answers: [{
            text: "Kentucky",
            correct: true
        },
        {
            text: "Pennsylvania",
            correct: false
        },
        {
            text: "Missouri",
            correct: false
        },
        {
            text: "Michigan",
            correct: false
        },
    
        ]
    },


    {
        quest: 'Which state is know as "The Pelican State"',
        answers: [{
            text: "Louisiana",
            correct: true
        },
        {
            text: "Michigan",
            correct: false
        },
        {
            text: "Oregon",
            correct: false
        },
        {
            text: "South Dakota",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Pine Tree State"',
        answers: [{
            text: "Maine",
            correct: true
        },
        {
            text: "Virginia",
            correct: false
        },
        {
            text: "Wisconsin",
            correct: false
        },
        {
            text: "Wyoming",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Free State"',
        answers: [{
            text: "Maryland",
            correct: true
        },
        {
            text: "Louisiana",
            correct: false
        },
        {
            text: "Colorado",
            correct: false
        },
        {
            text: "Kansas",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Bay State"',
        answers: [{
            text: "Massachusetts",
            correct: true
        },
        {
            text: "Kansas",
            correct: false
        },
        {
            text: "Georgia",
            correct: false
        },
        {
            text: "Alabama",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Wolverine State"',
        answers: [{
            text: "Michigan",
            correct: true
        },
        {
            text: "Delaware",
            correct: false
        },
        {
            text: "Louisiana",
            correct: false
        },
        {
            text: "Nebraska",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The North Star State"',
        answers: [{
            text: "Minnesota",
            correct: true
        },
        {
            text: "Nebraska",
            correct: false
        },
        {
            text: "New Mexico",
            correct: false
        },
        {
            text: "North Carolina",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Magnolia State"',
        answers: [{
            text: "Mississippi",
            correct: true
        },
        {
            text: "North Carolina",
            correct: false
        },
        {
            text: "Utah",
            correct: false
        },
        {
            text: "Texas",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Show Me State"',
        answers: [{
            text: "Missouri",
            correct: true
        },
        {
            text: "Texas",
            correct: false
        },
        {
            text: "Ohio",
            correct: false
        },
        {
            text: "Mississippi",
            correct: false
        },
    
        ]
    },


    {
        quest: 'Which state is know as "The Treasure State"',
        answers: [{
            text: "Montana",
            correct: true
        },
        {
            text: "Mississippi",
            correct: false
        },
        {
            text: "Massachusetts",
            correct: false
        },
        {
            text: "Kansas",
            correct: false
        },
    
        ]
    },


    {
        quest: 'Which state is know as "The Cornhusker State"',
        answers: [{
            text: "Nebraska",
            correct: true
        },
        {
            text: "Kansas",
            correct: false
        },
        {
            text: "Arkansas",
            correct: false
        },
        {
            text: "Idaho",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Silver State"',
        answers: [{
            text: "Nevada",
            correct: true
        },
        {
            text: "Idaho",
            correct: false
        },
        {
            text: "Louisiana",
            correct: false
        },
        {
            text: "Connecticut",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Granite State"',
        answers: [{
            text: "New Hampshire",
            correct: true
        },
        {
            text: "Louisiana",
            correct: false
        },
        {
            text: "Minnesota",
            correct: false
        },
        {
            text: "Mississippi",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Garden State"',
        answers: [{
            text: "New Jersey",
            correct: true
        },
        {
            text: "Mississippi",
            correct: false
        },
        {
            text: "Nebraska",
            correct: false
        },
        {
            text: "Rhode Island",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "Land of Enchantment"',
        answers: [{
            text: "New Mexico",
            correct: true
        },
        {
            text: "Rhode Island",
            correct: false
        },
        {
            text: "Montana",
            correct: false
        },
        {
            text: "Massachusetts",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Empire State"',
        answers: [{
            text: "New York",
            correct: true
        },
        {
            text: "Massachusetts",
            correct: false
        },
        {
            text: "Iowa",
            correct: false
        },
        {
            text: "Indiana",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Tar Heel State"',
        answers: [{
            text: "North Carolina",
            correct: true
        },
        {
            text: "Indiana",
            correct: false
        },
        {
            text: "Colorado",
            correct: false
        },
        {
            text: "Maryland",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Flickertail State"',
        answers: [{
            text: "North Dakota",
            correct: true
        },
        {
            text: "Maryland",
            correct: false
        },
        {
            text: "Alabama",
            correct: false
        },
        {
            text: "Colorado",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Buckeye State"',
        answers: [{
            text: "Ohio",
            correct: true
        },
        {
            text: "Arizona",
            correct: false
        },
        {
            text: "Alaska",
            correct: false
        },
        {
            text: "New Jersey",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Sooner State"',
        answers: [{
            text: "Oklahoma",
            correct: true
        },
        {
            text: "New Jersey",
            correct: false
        },
        {
            text: "North Dakota",
            correct: false
        },
        {
            text: "Tennessee",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Beaver State"',
        answers: [{
            text: "Oregon",
            correct: true
        },
        {
            text: "Tennessee",
            correct: false
        },
        {
            text: "Pennsylvania",
            correct: false
        },
        {
            text: "Ohio",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Keystone State"',
        answers: [{
            text: "Pennsylvania",
            correct: true
        },
        {
            text: "Ohio",
            correct: false
        },
        {
            text: "Michigan",
            correct: false
        },
        {
            text: "Nevada",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Ocean State"',
        answers: [{
            text: "Rhode Island",
            correct: true
        },
        {
            text: "Michigan",
            correct: false
        },
        {
            text: "Utah",
            correct: false
        },
        {
            text: "California",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Palmetto State"',
        answers: [{
            text: "South Carolina",
            correct: true
        },
        {
            text: "California",
            correct: false
        },
        {
            text: "Massachusetts",
            correct: false
        },
        {
            text: "Nebraska",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The The Mount Rushmore State"',
        answers: [{
            text: "South Dakota",
            correct: true
        },
        {
            text: "Nebraska",
            correct: false
        },
        {
            text: "Vermont",
            correct: false
        },
        {
            text: "Wisconsin",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Volunteer State"',
        answers: [{
            text: "Tennessee",
            correct: true
        },
        {
            text: "Vermont",
            correct: false
        },
        {
            text: "Wyoming",
            correct: false
        },
        {
            text: "Connecticut",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Lone Star State"',
        answers: [{
            text: "Texas",
            correct: true
        },
        {
            text: "South Carolina",
            correct: false
        },
        {
            text: "Oklahoma",
            correct: false
        },
        {
            text: "Montana",
            correct: false
        },
    
        ]
    },


    {
        quest: 'Which state is know as "The Beehive State"',
        answers: [{
            text: "Utah",
            correct: true
        },
        {
            text: "Montana",
            correct: false
        },
        {
            text: "Maryland",
            correct: false
        },
        {
            text: "Maine",
            correct: false
        },
    
        ]
    },


    {
        quest: 'Which state is know as "The Green Mountain State"',
        answers: [{
            text: "Vermont",
            correct: true
        },
        {
            text: "Maine",
            correct: false
        },
        {
            text: "Kentucky",
            correct: false
        },
        {
            text: "Kansas",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The The Old Dominion State"',
        answers: [{
            text: "Virginia",
            correct: true
        },
        {
            text: "Iowa",
            correct: false
        },
        {
            text: "Indiana",
            correct: false
        },
        {
            text: "Illinois",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Evergreen State"',
        answers: [{
            text: "Washington",
            correct: true
        },
        {
            text: "Illinois",
            correct: false
        },
        {
            text: "Mississippi",
            correct: false
        },
        {
            text: "Nebraska",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Mountain State"',
        answers: [{
            text: "West Virginia",
            correct: true
        },
        {
            text: "Nebraska",
            correct: false
        },
        {
            text: "Louisiana",
            correct: false
        },
        {
            text: "Connecticut",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Badger State"',
        answers: [{
            text: "Wisconsin",
            correct: true
        },
        {
            text: "Louisiana",
            correct: false
        },
        {
            text: "Indiana",
            correct: false
        },
        {
            text: "Georgia",
            correct: false
        },
    
        ]
    },

    {
        quest: 'Which state is know as "The Equality State"',
        answers: [{
            text: "Wyoming",
            correct: true
        },
        {
            text: "Georgia",
            correct: false
        },
        {
            text: "Idaho",
            correct: false
        },
        {
            text: "Michigan",
            correct: false
        },
    
        ]
    },



];




