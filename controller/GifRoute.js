var express = require("express");
var router = express.Router();
var request = require("request");
require('dotenv').config();

router.get('/api/getGF',function(req,res){
   if(!req.query.title){
    res.json({});
    return;
   };
   let title = req.query.title;

   let gkey = process.env.GIFFY;
   let offset = Math.floor(Math.random()*125);
         
    request("https://api.giphy.com/v1/gifs/search?rating=pg-13&api_key=" + gkey + "&q='" + title + "'&offset=" + offset + "&limit=15", 
            function(err, resp, body) {
                              res.json(body);
              });
});

router.get('/api/getOB',function(req,res){
  if(!req.query.title){
    res.json({});
    return;
   };
   let inSrch = req.query.title;
   let mykey = process.env.OMDB;   
       request("https://www.omdbapi.com/?apikey=" + mykey + "&t=" + inSrch, 
            function(err, resp, body) {
                              res.json(body);
              });
});


module.exports=router;