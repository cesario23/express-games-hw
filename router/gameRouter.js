const express = require ("express");
const router = express.Router ();
const uuidv4 = require ("uuid").v4;
let games = [
    {
    id: "adowb1b3bb",
    game: "League of Legends",
    description: "League of Legends is a team-based game with over 140 champions to make epic plays with."
    },
    {
    id: "kd7b9ks2nda",
    game: "PlayerUnknown's Battlegrounds",
    description: "PLAYERUNKNOWN'S BATTLEGROUNDS is a last-man-standing shooter being developed with community feedback."
    }
    ];

router.get ('/get-all-games', function (req, res){
    res.json ({payload: games})
});

router.get ('/get-game-by-id/:id', function (req, res){
    let foundGamesIndex = games.findIndex ((item)=>{
        return item.id === req.params.id;
    })
    if (foundGamesIndex === -1){
        res.status(404).json ({message: 'The game with the id does not exist, please check id'})
    }else{
        res.json ({payload: games[foundGamesIndex]})
    }
});

router.post ('/create-new-game', function (req, res){
    let {game , description} = req.body;
    if (game.length === 0 || description.length === 0){
        res.json ({ message: "you cannot leave the text blank"})
    }
   let foundGameIndex = games.findIndex((item)=> item.game === req.body.game);
   if (foundGameIndex > -1){
       res.status(500).json({message: "sorry, game already exists!"});
   }else{
       let newGameObj ={
           id: uuidv4(),
           game, 
           description,
       };
      games.push (newGameObj);
      res.json ({payload: games});
   };

   router.put ("/update-game/:id", function (req, res){
       const {game, description} = req.body;
       if (game.length === 0 || description.length === 0){
           res.status(500).json ({
            message: "fields cannot be empty"   
           })
       }
       const {id} = req.params;
       let foundGameIndex = games.findIndex((itme)=> itme.id === id);
       
       if (foundGamesIndex === -1){
           res.json ({message: "Game does not exits!!"})
       }else{
           games[foundGameIndex].game = game;
           games[foundGameIndex].description = description;
           res.json ({payload: games});
       }
   });

   router.delete ("/delete-game/:id", function(req,res){
       let foundGameIndex = games.findIndex((item)=> itme.id === req.params.id);
       if (foundGameindex === -1){
           res.json ({message: "game does not exits, can not delete!"})
       }else{
           games.splice(foundGameIndex, 1);
           res.json({ payload: games});
       }
   });

module.exports = router;