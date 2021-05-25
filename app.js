const express = require ("express");
const logger = require ("morgan");
const path = require ('path');

const app = express ();

const indexRouter = require ("./router/indexRouter");
const gameRouter = require ("./router/gameRouter");

app.use (logger('dev'));
app.use (express.json());
app.use ("/game", indexRouter);
app.use ("/api/game", gameRouter)

app.listen (3000, function (){
    console.log (`Server started at PORT ${3000}`)
})