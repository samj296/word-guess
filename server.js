const express = require("express");
const {v4: uuidv4} = require("uuid");
const games ={}
const {createGame, applyGuess, getMaskedWord} = require("./modules/gameEngine");

const app = express();
app.use(express.json());

const port = 3000;

app.listen(port,()=>{
    console.log(`server running on local host port ${port}`);
});



app.post("/api/wordgame",(req, res)=>{
    const id = uuidv4();
    const game = createGame();
    games[id] = game;

    res.json(id);
});

app.post("/api/wordgame/:id/guess",(req, res)=>{
    const {id} = req.params;
    if (!games[id]){
        res.status(400).json({"error": "Id does not exists"});
        return;
    };
    const {letter} = req.body;
    if(!letter){
        res.status(400).json({error: "Body cannot be empty"});
    };
    if (body.length !== 1){
        return res.status(400).json({error: "Body must be 1 character"});
    };
    const game = games[id];
    applyGuess(game, body);
res.json({
    "Word: " : getMaskedWord(game),
    "Remaining: ": game.remaining,
    "Status: " : game.status
        })
})

app.get("/api/wordgame/:id",(req, res) =>{
    const {id} = req.params;
    if(!games[id]){
        res.status(400).json({"error": "Id does not exists"});
        return
    }
    const game = games[id];
    let maskedWord = getMaskedWord(game);
    const remainingGuesses = game.remaining;
    const status = game.status;
    res.json({
        "Word: ": maskedWord,
        "Remaining: ": remainingGuesses,
        "Status: ": status
    })
})