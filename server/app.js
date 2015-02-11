var emailExistence = require('email-existence');
var auth = require('./auth.json');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mailgun = require('mailgun-js')({apiKey: auth.api_key, domain: auth.domain});


var app = express();

app.set("view options", {layout: false});

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 // app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'public')));
 app.use(function(err, req, res, next) {
    //console.error(err.stack);
    if(!err) return next(err);
    res.status(err.status || 500).send('error', {
                                        message: err.message
                                    });
});



app.post('/email', function(req, res, next) {
  if(!req.body.hasOwnProperty('from') || !req.body.hasOwnProperty('to') || !req.body.hasOwnProperty('subject') || !req.body.hasOwnProperty('deliverytime')) 
   {

    res.statusCode = 400;
    return res.status(400).send('Error 400: Post syntax incorrect.');
   } 

   var doesFromEmailExist = false, doesToEmailExist = false;
   emailExistence.check(req.body.from, function(err,res){
        if(!err)
        {
          doesFromEmailExist = true;
        }
    });

   if(!doesFromEmailExist)
   {
      res.statusCode = 400;
      return res.status(400).send('Error 400: from email doesn\'t exist.');
   }

   emailExistence.check(req.body.to, function(err,res){
        if(!err)
        {
          doesToEmailExist = true
          
        }
    });

   if(!doesToEmailExist)
   {
      res.statusCode = 400;
      return res.status(400).send('Error 400: to email doesn\'t exist.');
   }

    var data = {
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.text,
      'o:deliverytime': req.body.deliverytime
    };
 
    mailgun.messages().send(data, function (error, body) {
      if (error) 
      {
        console.log(error.stack);
        return next(error);
      } 
      else
        return res.status(200).send('200 OK');
    });



});



if (app.get('env') === 'development') {
 app.listen(process.env.PORT || 3000);
 console.log('local server started at port ' + (process.env.PORT || 3000));
}

//module.exports = app;