//making a constructor function for quiz

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

//getting the index
Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

// to know when question has endd
Quiz.prototype.isEnded = function() {
  return this.questions.length === this.questionIndex;
}

// guess function to track user choice and answers
Quiz.prototype.guess = function(answer) {

  if(this.getQuestionIndex().correctAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
}
