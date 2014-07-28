(function(){

  var PresentationUI = function() {
    // =====================================
    //     UI handled with event handlers
    // =====================================
    //
    // Event Handler for the "guess" button
    // run the program when you click the submit button
    // log appropriate response based off the error message 
    $('#submit-button').on('click', function (e) {
      if (!bl.gameOver) {
        var userInput = +$('#user-input').val();
        var response = bl.numberEvaluator(userInput);

        if (response) {
          $('#response').text('You guessed the number correctly!  Game Over. Click "Start Game" to begin a new game.');
          bl.gameOver = true;
        } else if (response === "message1") {
          $('#response').text('Your number is greater than secret number.');
        } else if (response === "message2") {
          $('#response').text('Your number is less than secret number.');
        } else if (response === "error1") {
          $('#response').text('Your number was NOT valid. Please try again.');
        } else {
          // this is your unknown error - we will probably not hit this
          $('#response').text('There may have been an error with your input.');
        }
      } else {
        $('#response').text('Game Over.  Click "Start Game" to begin a new game.');
      }
    });

    // Event Handler for the START GAME button
    // sets game over to false
    // generates a randome number 
    // tells user the game began
    $('#start-game').on('click', function(){
      var response = bl.resetGame();
      if (response) {
        $('#response').text('A New Game has begun! Guess a number.');
      } else {
        $('#response').text('A Game is already running. Submit a guess.');
      }
    });

    // Event Handler for end the game button 
    // sets game over to true if a came is in progress
    // clears the secret number - slightly unnecessarily
    // outputs response that game ended or already over
    $('#end-game').on('click', function(){
      var response = bl.endGame();
      if (response) {
        $('#response').text('You ended the game thanks for playing.');
      } else {
        $('#response').text('You already had Game Over.  Click "Start Game" to begin a new game.');
      }
    });

    // this is a utility button handler to clear the input
    // I don't need to evalute anything about the game's state to run it
    $('#clear-input').on('click', function() {
      $('#user-input').val('');
      $('#response').text('');
    });

    // ---------------------------------------
    // some functions to keep your game centered in the window
    var keepGameCentered = function() {
      var h = $(window).height(), 
          w = $(window).width();
      if ( h > 380 ) {
        console.log("width -> ", w);
        console.log("height -> ", h);
        $('.main').css({'margin-top': h / 4 });
      } else {
        $('.main').css({'margin-top': "10px" });
      }
    };
    // run on load - but will also use on resize event
    keepGameCentered();
    // keep window in the middle of the dom
    $(window).on('resize', function() {
      keepGameCentered();
    });

  };

  window.presentationUI = PresentationUI;
  presentationUI();

})();