const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/tweetdb');
const tweet = db.get('tweet');


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        message:'hello twitter'
    });
});

app.get('/tweet', (req, res) => {
    tweet
        .find()
        .then(tweet => { 
            res.json(tweet);
        });
});


function isValidMew(info){
    return info.name && info.name.toString().trim() !=='' &&
    info.content && info.content.toString().trim() !=='';
}

app.post('/tweet', (req, res) => {
    if (isValidMew(req.body)){
        const info ={
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };

        tweet
            .insert(info)
            .then(createdInfo => {
                res.json(createdInfo);
            });

    }else{
        res.status(422);
        res.json({
          message:'name and content are required'  
        });
    }

});


app.listen(8000, ()=>{
    console.log('listening on http://localhost:8000');
 
});