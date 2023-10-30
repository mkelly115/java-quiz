let prompts = [
    {
        question: "What is the starting position of an array?",
        answer: "0",
        options: ["0","1","2","3"]
    },
    {
        question: "An array is stored by using which of the following notation:",
        answer: "[]",
        options: ["{}","()","[]","<>"]

    },
    {
        question: "What does DOM stand for?",
        answer: "Document Object Model",
        options: ["Document Object Magnification","Dynamic Object Model","Delisting Orator qModel","Document Object Model"]
    },
    {
        question: "Who invented JavaScript?",
        answer: "Brendan Eich",
        options: ["John Schmidt","Brendan Eich","Richard Dragon","Chris Tefaux"]
    },
    {
        question: "What year was JavaScript developed?",
        answer: "1995",
        options: ["1993","1991","1995","1999"]
    }
]
function initializeTimer(){
const timeEl = document.querySelector(".timer")
let count = 60;
timeEl.innerHTML=count;
setInterval(function() {
      count--;
      timeEl.innerHTML=count;
      if (count === 0) {
        clearInterval(timer);
      }
    }, 1000);
//  const timer = setInterval(function() {
//   count--;
//   if (count === 0) {
//     clearInterval(timer);
//   }
// }, 1000);

}

function initializeQuiz(){
    const startBtnEl = document.querySelector(".start-quiz")
    console.log(startBtnEl)
    startBtnEl.addEventListener("click", function(event) {
       console.log (event)
       initializeTimer()
      });     
}


initializeQuiz()
// I HAVE ZERO CLUE IF THIS WORKS CAUSE NOTHING ELSE DOES
// let count = 75;
// const timer = setInterval(function() {
//   count--;
//   if (count === 0) {
//     clearInterval(timer);
//   }
// }, 1000);

// let questionsEl = document.querySelector("#question")
// let answerEl = document.querySelector("answer")
// let startBTN = document.querySelector("#start")
// let timeEL = document.querySelector("#time")
// let resultEL = document.querySelector("#results")

// let Score = 0
// let currentQuestion = 0

// function showQuestion () {

//     const questionData = prompts [questionsEl];

//     const questionElement = document.createElement("div");
//     questionElement.className = "question";
//     questionElement.innerHTML = questionData.questionElement;

//  for (let i = 0; i < prompts.length; i++) {
//     text += prompts[i]
  
//     const radio = document.createElement("input");
//     radio.type = "radio";
//     radio.name = "quiz"
//     radio.value = "answer";

//     option.appendChild(radio);
//     option.appendChild(optionText);
//     optionsElement.appendChild(option);
// }

//   quizContainer.innerHTML = '';
//   quizContainer.appendChild(questionElement);
//   quizContainer.appendChild(optionsElement);
// }

// showQuestion()



