document.addEventListener("DOMContentLoaded", function() {

console.log("Page is LOADED");

// fetch local data
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();}
// fetch api call json data
document.querySelector("#submit-btn").addEventListener('click', function(e){
    e.preventDefault();
    //make url
    var endPoint = "https://api.themoviedb.org/3/movie/"
    var userInput = document.getElementById('mydropdown1').value + "?api_key=de40ed8ad2ee7f6ced4aba14c513ab23&language=en-US&page=1"
    var composedUrl = endPoint + userInput
    //fetch the data
    fetchJSONFile(composedUrl, function(data){
      var overviewsAndTitles = [];
      var questions = [];
      var choices = [];
      var poster = [];
      //sorts array from higest vote to lowest vote avg
      var sortedjsonData = data.results.sort(function (a, b) {
            return b.vote_average - a.vote_average;
            })
      var jsonData = sortedjsonData.slice(0,4)
      //loops the object to make new objects
      jsonData.forEach(function(movie){
        if (movie.overview.length) {
          choices.push(movie.title)
          poster.push(movie.poster_path)
          overviewsAndTitles.push({
            overview: movie.overview,
            title: movie.title,
            choices: ""
          })
        }
      })

      //make choices
      overviewsAndTitles.forEach(function(e){
        e.choices = choices
      })
      //make questions
      overviewsAndTitles.forEach(function(e){
        questions.push(new Question(e.overview, e.choices, e.title))
      })



      //console.log(overviewsAndTitles[1].choices);



      // functionality of the quiz
      function populate() {

        if(quiz.isEnded()){
            //show scores
            showScores()
        }
        else {
          //show questions
          showQuestions()
          //show choices
          var choices = quiz.getQuestionIndex().choices;
          for(var i = 0; i < choices.length; i++) {
              var element = document.getElementById("choice" + i);
              var imgElement = document.getElementById("image" + i);
              imgElement.innerHTML = "<img src=" + "https://image.tmdb.org/t/p/w500/" + poster[i] + ">";
              element.innerHTML = choices[i]
              guess("btn" + i, choices[i]);
          }

          showProgress();
        }
      };


      function showProgress() {
        var currentQuestionNumber = quiz.questionIndex + 1;
        var element = document.getElementById("progress");
        element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
      }

      function guess(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
          quiz.guess(guess);

          populate();
        }
      };

      function showScores() {
        var gameOverHtml = "<h1> Result </h1>"
        gameOverHtml += "<center><h2 id='score'>  Your score is " + quiz.score + "</h2>"
        gameOverHtml += "<input type='button' class='sm_btn' onClick='window.location.reload()' value='Play Again'>"

        var element = document.getElementById("quiz");
        element.innerHTML = gameOverHtml
      }

      function showQuestions() {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

      }
      //make new quizes
      var quiz = new Quiz(questions);

      populate()


    })
  })
// fetch local data and make quizes and questions
fetchJSONFile('themoviedb_data.json', function(data){
      var overviewsAndTitles = [];
      var questions = [];
      var choices = [];
      var poster = [];
      var sortedjsonData = data.results.sort(function (a, b) {
            return b.vote_average - a.vote_average;
            })
      var jsonData = sortedjsonData.slice(0,4)
      console.log();
      console.log(jsonData);
      jsonData.forEach(function(movie){
        if (movie.overview.length) {
          choices.push(movie.title)
          poster.push(movie.poster_path)
          overviewsAndTitles.push({
            overview: movie.overview,
            title: movie.title,
            choices: ""
          })
          console.log(movie.vote_average);
        }
      })
      //make choices
      overviewsAndTitles.forEach(function(e){
        e.choices = choices
      })
      //make questions
      overviewsAndTitles.forEach(function(e){
        questions.push(new Question(e.overview, e.choices, e.title))
      })
      // functionality of the quiz
      function populate() {

        if(quiz.isEnded()){
            //show scores
            showScores()
        }
        else {
          //show questions
          showQuestions()
          //show choices
          var choices = quiz.getQuestionIndex().choices;
          for(var i = 0; i < choices.length; i++) {
              var element = document.getElementById("choice" + i);
              var imgElement = document.getElementById("image" + i);
              imgElement.innerHTML = "<img src=" + "https://image.tmdb.org/t/p/w500/" + poster[i] + ">";
              element.innerHTML = choices[i]
              guess("btn" + i, choices[i]);
          }

          showProgress();
        }
      };

      function showProgress() {
        var currentQuestionNumber = quiz.questionIndex + 1;
        var element = document.getElementById("progress");
        element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
      }

      function guess(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
          quiz.guess(guess);

          populate();
        }
      };

      function showScores() {
        var gameOverHtml = "<h1> Result </h1>"
        gameOverHtml += "<center><h2 id='score'>  Your score is " + quiz.score + "</h2>"
        gameOverHtml += "<input type='button' class='sm_btn' onClick='window.location.reload()' value='Play Again'>"
        var element = document.getElementById("quiz");
        element.innerHTML = gameOverHtml
      }

      function showQuestions() {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

      }

      var quiz = new Quiz(questions);

      populate()

    });

})
