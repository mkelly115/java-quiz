const QUIZ_STORE = [
    {
        question: "What is the starting position of an array?",
        answer: "0",
        options: ["0", "1", "2", "3"]
    },
    {
        question: "An array is stored by using which of the following notation:",
        answer: "[]",
        options: ["{}", "()", "[]", "<>"]

    },
    {
        question: "What does DOM stand for?",
        answer: "Document Object Model",
        options: ["Document Object Magnification", "Dynamic Object Model", "Delisting Orator Model", "Document Object Model"]
    },
    {
        question: "Who invented JavaScript?",
        answer: "Brendan Eich",
        options: ["John Schmidt", "Brendan Eich", "Richard Dragon", "Chris Tefaux"]
    },
    {
        question: "What year was JavaScript developed?",
        answer: "1995",
        options: ["1993", "1991", "1995", "1999"]
    }
]

const metadata = {
    score: 0,
    quizStarted: false,
    currentQuestion: 0,
    questionsAnswered: 0,
    isCorrect: true,
    timeLeft: 60,
};

function initCountDown() {
    const timeEl = document.querySelector(".timer");
    const timer = setInterval(function () {
        metadata.timeLeft--;
        timeEl.innerHTML = `Time Left: ${metadata.timeLeft}`;
        if (metadata.timeLeft <= 0) {
            timeEl.innerHTML = "Time Left: 0";
            clearInterval(timer);
            renderQuizApp();
        }
        if (metadata.questionsAnswered === 5) {
            timeEl.innerHtml = `Time Left: ${metadata.timeLeft}`;
            clearInterval(timer);
            renderQuizApp();
        }
    }, 1000);
};

function generateQuestionPageTemplate() {
    const $quizContainer = document.querySelector(".quiz-container");
    const $questionPageContainer = document.createElement("div");
    $questionPageContainer.className = "flex-centered";
    const currentQuestion = QUIZ_STORE[metadata.currentQuestion].question;
    const answerA = QUIZ_STORE[metadata.currentQuestion].options[0];
    const answerB = QUIZ_STORE[metadata.currentQuestion].options[1];
    const answerC = QUIZ_STORE[metadata.currentQuestion].options[2];
    const answerD = QUIZ_STORE[metadata.currentQuestion].options[3];
  

    emptyPreviousPageContent($quizContainer);
  
    $quizContainer.appendChild($questionPageContainer);
    $questionPageContainer.innerHTML = `
      <h1>Question ${metadata.currentQuestion + 1} of 5</h1>
      <form class="quiz-form">
        <legend class="quiz-question">${currentQuestion}</legend>
        <div class="row">
          <input 
            id="answerA" 
            class="radio"
            name="quiz-answer" 
            type="radio" 
            value="${answerA}"
            required
          >
          <label for="answerA">${answerA}</label>
        </div>
        <br>
        <div class="row">
          <input 
            id="answerB" 
            class="radio"
            name="quiz-answer" 
            type="radio"
            value="${answerB}"
            required
          >
          <label for="answerB">${answerB}</label>
        </div>
        <br>
        <div class="row">
          <input 
            id="answerC" 
            class="radio"
            name="quiz-answer" 
            type="radio" 
            value="${answerC}"
            required
          >
          <label for="answerC">${answerC}</label>
        </div>
        <br>
        <div class="row">
          <input 
            id="answerD" 
            class="radio"
            name="quiz-answer" 
            type="radio" 
            value="${answerD}"
            required
          >
          <label for="answerD">${answerD}</label>
        </div>
        <br>
        <button type="submit" class="button submit-question">Submit</button>
      </form>
    `;
  
    const $formEl = document.querySelector(".quiz-form");
    $formEl.addEventListener("submit", (e) => handleQuestionSubmit(e));
  };


function generateStartPageTemplate() {
    const quizContainer = document.querySelector(".quiz-container");
    const startPageContainer = document.createElement("div");
    startPageContainer.classList = "flex-centered start-page";

    quizContainer.appendChild(startPageContainer);
    startPageContainer.innerHTML = `
      <h1>Coding Quiz Challenge</h1>
      <button type="button" class="button start-quiz">Start Quiz</button>
      <button type="button" class="button view-hi-scores">View Hi-Scores</button>
    `;
};

function renderQuizApp() {
    if (!metadata.quizStarted) {
      generateStartPageTemplate();
    } else if (metadata.questionsAnswered === metadata.currentQuestion + 1 && metadata.timeLeft > 0) {
      generateAnswerPageTemplate();
    } else if (metadata.quizStarted && metadata.currentQuestion + 1 <= QUIZ_STORE.length && metadata.timeLeft > 0) {
      generateQuestionPageTemplate();
    } else {
      generateResultsPageTemplate();
    }
  };
  

function handleQuizStarted() {
    const startBtnEl = document.querySelector(".start-quiz");
    const viewHiScoresBtnEl = document.querySelector(".view-hi-scores");
    startBtnEl.addEventListener("click", function (e) {
        metadata.quizStarted = true;
        renderQuizApp();
        initCountDown();
    });
    // viewHiScoresBtnEl.addEventListener("click", function(e) {
    //   handleViewHiScores();
    // });
};

function generateQuestionPageTemplate() {
    const quizContainer = document.querySelector(".quiz-container");
    const questionPageContainer = document.createElement("div");
    questionPageContainer.className = "flex-centered";
    const currentQuestion = QUIZ_STORE[metadata.currentQuestion].question;
    const answerA = QUIZ_STORE[metadata.currentQuestion].options[0];
    const answerB = QUIZ_STORE[metadata.currentQuestion].options[1];
    const answerC = QUIZ_STORE[metadata.currentQuestion].options[2];
    const answerD = QUIZ_STORE[metadata.currentQuestion].options[3];

    emptyPreviousPageContent(quizContainer);

    quizContainer.appendChild(questionPageContainer);
    questionPageContainer.innerHTML = `
      <h1>Question ${metadata.currentQuestion + 1} of 5</h1>
      <form class="quiz-form">
        <legend class="quiz-question">${currentQuestion}</legend>
        <div class="row">
          <input 
            id="answerA" 
            class="radio"
            name="quiz-answer" 
            type="radio" 
            value="${answerA}"
            required
          >
          <label for="answerA">${answerA}</label>
        </div>
        <br>
        <div class="row">
          <input 
            id="answerB" 
            class="radio"
            name="quiz-answer" 
            type="radio"
            value="${answerB}"
            required
          >
          <label for="answerB">${answerB}</label>
        </div>
        <br>
        <div class="row">
          <input 
            id="answerC" 
            class="radio"
            name="quiz-answer" 
            type="radio" 
            value="${answerC}"
            required
          >
          <label for="answerC">${answerC}</label>
        </div>
        <br>
        <div class="row">
          <input 
            id="answerD" 
            class="radio"
            name="quiz-answer" 
            type="radio" 
            value="${answerD}"
            required
          >
          <label for="answerD">${answerD}</label>
        </div>
        <br>
        <button type="submit" class="button submit-question">Submit</button>
      </form>
    `;
    const formEl = document.querySelector(".quiz-form");
    formEl.addEventListener("submit", (e) => handleQuestionSubmit(e));
};

function emptyPreviousPageContent(parentNode) {
    while (parentNode.lastChild) {
        parentNode.removeChild(parentNode.lastChild);
    }
};

function handleQuizApp() {
    renderQuizApp();
    handleQuizStarted();
};


handleQuizApp()
