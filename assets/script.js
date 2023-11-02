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

function generateAnswerPageTemplate() {
  const quizContainer = document.querySelector(".quiz-container");
  const answerPageContainer = document.createElement("div");
  const correctAnswer = QUIZ_STORE[metadata.currentQuestion].answer;
  answerPageContainer.classList = "flex-centered answer-page";

  //before appending new elements, empty quiz container
  emptyPreviousPageContent(quizContainer);

  quizContainer.appendChild(answerPageContainer);

  answerPageContainer.innerHTML = `
    <h1>${metadata.isCorrect ? "Correct!" : "Incorrect!"}</h1>
    <p>The answer was: ${correctAnswer}</p>
    <button type="button" class="button next-question">Next</button>
  `;

  const nextBtnEl = document.querySelector(".next-question");
  nextBtnEl.addEventListener("click", handleNextQuestion);

  if (metadata.questionsAnswered === 5) {
    nextBtnEl.innerHTML = "Finish Quiz";
  }
};

function generateResultsPageTemplate() {
  const quizContainer = document.querySelector(".quiz-container");
  const resultsPageContainer = document.createElement("div");
  resultsPageContainer.classList = "flex-centered results-page";

  //before appending new elements, empty quiz container
  emptyPreviousPageContent(quizContainer);

  quizContainer.appendChild(resultsPageContainer);
  resultsPageContainer.innerHTML = `
    <h1>${metadata.timeLeft <= 0 ? "Time's Up!" : "Congratulations!"}</h1>
    <p>You've answered ${metadata.score} out of 5 questions correctly!</p>
    <p>Your remaining time was: ${metadata.timeLeft} seconds</p>
    <div class="results-controls">
      <button type="button" class="button hiscore">Add to Hi-Scores</button>
      <button type="button" class="button restart-quiz">Try Again</button>
    </div>
  `;

  const hiScoresBtnEl = document.querySelector(".hiscore");
  const restartBtnEl = document.querySelector(".restart-quiz");
  hiScoresBtnEl.addEventListener("click", generateHiScoresTemplate);
  restartBtnEl.addEventListener("click", handleResetQuiz);
};

function generateHiScoresTemplate() {
  const quizContainer = document.querySelector(".quiz-container");
  const timerContainer = document.querySelector(".timer");

  
  emptyPreviousPageContent(quizContainer);
  emptyPreviousPageContent(timerContainer);

  const hiScoresForm = document.createElement("form");
  hiScoresForm.classList = "hi-scores-form";

  quizContainer.appendChild(hiScoresForm);
  hiScoresForm.innerHTML = `
    <label for="initials">Enter Your Initials:</label>
    <input id="initials" type="text" required>
    <button 
      type="submit" 
      class="button submit-hiscores margin-top"
    >
      Submit
    </button>
  `;

  const formEl = document.querySelector(".hi-scores-form");
  formEl.addEventListener("submit", (e) => handleAddToHiScores(e));
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
    viewHiScoresBtnEl.addEventListener("click", function(e) {
      handleViewHiScores();
    });
};

function handleQuestionSubmit(e) {
  e.preventDefault();
  metadata.questionsAnswered++;
  handleCorrectAnswer();
  renderQuizApp();
};

function handleCorrectAnswer() {
  const userAnswer = document.querySelector(".radio:checked").value;

  if (userAnswer && userAnswer !== QUIZ_STORE[metadata.currentQuestion].answer) {
    metadata.isCorrect = false;
    metadata.timeLeft -= 5;
  } else {
    metadata.isCorrect = true;
    metadata.score++;
  }
};

function handleNextQuestion() {
  metadata.currentQuestion++;
  renderQuizApp();
};

function handleResetQuiz() {
  const quizContainer = document.querySelector(".quiz-container");
  const timerContainer = document.querySelector(".timer");
  metadata.quizStarted = false;
  metadata.questionsAnswered = 0;
  metadata.currentQuestion = 0;
  metadata.score = 0;
  metadata.timeLeft = 60;
  emptyPreviousPageContent(quizContainer);
  emptyPreviousPageContent(timerContainer);
  handleQuizApp();
};

function handleAddToHiScores(e) {
  e.preventDefault();
  const initials = document.querySelector("input#initials").value;
  const newHiScore = {
    initials: initials,
    score: metadata.score,
    time: 60 - metadata.timeLeft,
  };

  const savedScores = localStorage.getItem("hiscores") || "[]"; //get the previously saved hi-scores, or the initial value if empty

  const highScores = [...JSON.parse(savedScores), newHiScore]
    .sort((a, b) => a.time - b.time) //sort ASC (fastest times first)
    .slice(0, 10) //take highest 10

  localStorage.setItem("hiscores", JSON.stringify(highScores)); //store the scores

  handleResetQuiz();
};

function handleViewHiScores() {
  const hiScores = JSON.parse(localStorage.getItem("hiscores"));
  const hiScoresModalEl = document.querySelector(".hi-scores-modal")

  if (!hiScores) {
    window.alert("No Hi-Scores available");
  } else {
    hiScoresModalEl.innerHTML = `
      <h1>Hi-Scores</h1>
      <ol class="scores-list"></ol>
      <button class="close">Close</button>
    `;
    hiScores.forEach(score => {
      const list = document.querySelector(".scores-list");
      list.innerHTML += `
        <li><span>${score.initials} - Completed in ${score.time} seconds</span></li>
      `;
    });
    hiScoresModalEl.open = true;
    const closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", function() {
      hiScoresModalEl.open = false;
    });
  }
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
