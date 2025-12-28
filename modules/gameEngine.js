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

function applyGuess(game,letter){
    if (game.status !== "in-progress"){
        return
    };
    if (!game.guesses.has(letter)){
        game.guesses.add(letter);
        if (!game.word.includes(letter)){
            game.remaining--
        };
    };

    const word = game.word
    const remaining = game.remaining

    if (word.includes("_") && remaining <= 0){
        game.status = "lost"
    }else if(!word.includes("_")) {
        game.status = "won"
    }

    return game
}

module.exports = {createGame, applyGuess, getMaskedWord};