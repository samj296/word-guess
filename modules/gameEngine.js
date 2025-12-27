const WORDS = ["apple", "banana", "server", "express", "module", "router", "ticket"];

function pickWord(){
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function createGame(){
    return{
        word: pickWord(),
        guesses: new Set(),
        remaining: 6,
        status: "in-progress"
    };
}

// Returns a masked word "_ a _ _ _"

function getMaskedWord(game){
    const letters = game.word.split("");
    const maskedLetters = [];

    for(let ch of letters){
        if(game.guesses.has(ch)){
            maskedLetters.push(ch);
        }else {
            maskedLetters.push("_");
        };
    };

    return maskedLetters.join(" ");

};

