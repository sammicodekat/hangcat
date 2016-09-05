var answer = '';
var guesses = [];
var maxLives = 6;
var wordlist = ["Abandoned", "Abilities", "Affection","Aggressive", "Agility", "Archedback", "Balance", "Beauty","Chase", "Claws", "Clean", "Climb", "Companionship", "Crossbred","Curiosity", "Curlup","Dewclaw","Domestic","Energetic","Grooming","Hairball","Hide","Insecure","Fish","Instinct","Jaw","Jump","Joy","Catnip","Whiskers","Whine","Wild"];

function checkLetter() {
    var crWord = '';
    for (var i = 0; i < answer.length; i++) {
        if (guesses.indexOf(answer[i].toLowerCase(), 0) == -1) {
            crWord += '_ ';
        } else {
            crWord += answer[i];
        }
    }
    return crWord;
}

function newWord() {
    while (answer === '') {
        answer = wordlist[Math.floor(Math.random() * wordlist.length)];
    }
    $('#answer').html(checkLetter());
}



function addGuess() {
    var guess = $('#userInput').val().toLowerCase();
    if (/^[a-z]*$/.test(guess) && typeof guess !== "undefined") {
        guesses.push(guess);
        $('#pre').html("");
    } else {
        $('#pre').html("Please enter a LETTER! Meow!");
    }
    $('#userInput').val('');
}

function checkIfUsed() {
    var c = [];
    $.each(guesses, function(index, element) {
        if (element.length > 0 && $.inArray(element, c) == -1) {
            c.push(element);
        } else {
            $('#pre').html("Letter already guessed!");
        }
    });
    guesses = c;
}

function remainingLives() {
    var livesRemaining = maxLives,
        string = answer.toLowerCase();

    for (var i = 0; i < guesses.length; i++) {
        if (string.indexOf(guesses[i], 0) == -1) {
            livesRemaining--;
        }
    }
    if (livesRemaining <= 0) {
        setImage(6);
        result(false);
        return;
    }
    var lives = livesRemaining - 1;
    setImage(maxLives - livesRemaining);
    $('#alert').html('You have ' + lives + ' lives remaining. You have guessed letter(s) '+guesses);
}

function result(win) {
    if (win) {
        $('#alert').html('You saved the cat! You guessed ' + answer + ' in ' + guesses.length + ' attempts.');
    } else {
        $('#alert').html('Meow....... The word was ' + answer);
        $("#userInput").hide();
    }
}

function setImage(number) {
    $('img').attr('id', 'image' + number);
}

function statusCheck() {
    if (checkLetter() == answer) {
        result(true);
      $('#btn').html("Play Again");
    }
}

function resetGame() {
    setImage(0);
    answer = '';
    guesses = [];
    newWord();
    $('#alert').html('Save the cat! Hint:Anything about cats.');
    $('#pre').html('');
    $('#btn').html('Restart');
    $("#userInput").show();
}

function update() {
    addGuess();
    checkIfUsed();
    newWord();
    remainingLives();
    statusCheck();
}


$(document).ready(function() {
    newWord();
    $('#userInput').attr('onkeyup', 'update();');
    $("#btn").click(function() {
        resetGame();
    });
});
