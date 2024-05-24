// Variables
let request = new XMLHttpRequest();
let randomWord;                     //API sent object
let word;                           //random word from API object
let life = 5;                       //Number of tries left 
let guessWord=[];                   //Word guessed by the user
let pressedChar=[];                 //Keys pressed by user
let flag = false;                   //To ckeck if keyPressed is in word or not

// Requesting API for random word
request.open("GET", "https://random-word-api.herokuapp.com/word?number=1");
request.send();

// Loading when the API sends response
request.onload = () => {
    //Turning data sent into a object
    randomWord = JSON.parse(request.response);
    word = randomWord[0];
    //Adding blanks to guessWord
    for (let i=0;i<word.length;i++) {
        guessWord[i] = "_";
    }
    
    //Printing word on HTML
    wordId.innerHTML = guessWord.join(' ');
    
    window.addEventListener('keydown', e => {
        //Pushing the pressed key
        pressedChar.push(e.key);
        // Checking for correct character
        for(let i=0;i<word.length;i++) {
            if (e.key === word[i]) {
                guessWord[i] = word[i];
                flag = true;
            }
            guessChar.innerHTML = "You Guessed - " + pressedChar.join('  ');
        }
        if (flag == true) {
            wordId.innerHTML = guessWord.join(' ');
        }
        else {
            life--;
            document.getElementById("heart").remove();
            switch(life) {
                case 1: 
                    image.innerHTML = "<img src='images/life1.png' alt='Life Image'>";
                        break;
                case 2: 
                    image.innerHTML = "<img src='images/life2.png' alt='Life Image'>";
                        break;
                case 3: 
                    image.innerHTML = "<img src='images/life3.png' alt='Life Image'>";
                        break;
                case 4: 
                    image.innerHTML = "<img src='images/life4.png' alt='Life Image'>";
                        break;
            }
        }
        flag = false;

        //If user guesses wrong
        if (life <= 0) {
            //alert("Game Over");
            guessWord = word;
            wordId.innerHTML = word;
            image.innerHTML = "<img src='images/dead.png' alt='Dead Image'>";
            correct.innerHTML = "Game Over";
        }
        //If user guesses correct
        if(guessWord.join('') === word) {
            image.innerHTML = "<img src='images/winner.png' alt='Winner Image'>";  
            correct.innerHTML = "Correct Word";
        }
    });

    //Reset Button
    reset.addEventListener('click', () => {
        window.location.reload();
    });

    //Hint Button
    hint.addEventListener('click', () => {
        let len = word.length-1;
        for(let i=0;i<word.length;i++) {
            switch(word[i]) {
                case 'a' :
                case 'e' :
                case 'i' :
                case 'o' :
                case 'u' : guessWord[i] = word[i]; 
                            break;
            }
        }
        // guessWord[0] = word[0];
        // guessWord[len/2] = word[len/2];
        // guessWord[len] = word[len];
        wordId.innerHTML = guessWord.join(' ');
    });
}
