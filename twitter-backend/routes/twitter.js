var express = require('express');
var router = express.Router();

const Twitter = require('twitter');

require('dotenv').config();

const config = {
  consumer_key: `${process.env.CONSUMER_KEY}`,
  consumer_secret: `${process.env.CONSUMER_SECRET}`,
  access_token_key: `${process.env.ACCESS_TOKEN_KEY}`,
  access_token_secret: `${process.env.ACCESS_TOKEN_SECRET}`
}

const T = new Twitter(config); //set up twiiter configuration

router.get('/users',(req, res, next) => { //fetch user timeline with option to filter tweets based on keywords
  try {
    const params = {
      screen_name: req.query.name,
      count: req.query.limit
    };
    T.get('statuses/user_timeline', params, (err, data, response) => { //fetch from twiiter api
      if(err){
        res.send({
          error:'yes'
        })
      }
      if (req.query.keyword !== undefined) { //filtered search through keyword in tweet
        let newData = [];
        for(let i = 0 ; i < data.length ; i++ ) {
          if(data[i].text.toLowerCase().indexOf(decodeURIComponent(req.query.keyword.toLowerCase())) !== -1) {
            newData.push(data[i]);
          }
        }
        res.send(newData);
      } else {
        res.send(data);
      }
    })
  } catch (err) {
    console.log(err);
    res.send({
      error:'yes'
    })
  }
});

router.get('/timeline',(req, res, next) => { //fetch timeline
  try {
    const params = {
      count: req.query.limit
    };
    T.get('statuses/home_timeline', params, (err, data, response) => {
      if(err){
        res.send({
          error:'yes'
        })
      }
      res.send(data);
    })
  } catch(err) {
    console.log(err);
    res.send({
      error:'yes'
    });
  }
});

module.exports = router;
