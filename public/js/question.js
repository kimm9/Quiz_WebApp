//making a constructor function that has attributes of questions

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;

}

// making a prototype for question

Question.prototype.correctAnswer = function (choice) {
    return choice === this.answer
};
