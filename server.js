var express = require('express');
var app = express();
var nodemailer = require('nodemailer');



// var methodOverride = require('method-override');
// var request = require("request");

//allow sessions
// app.use(require("morgan")("combined"));
// app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
// app.use(require("express-session")({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
//
//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));
// override with POST having ?_method=DELETE
// app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.get('/', function(req,res){
  res.render('index');
});

app.post('/sendemail', function(req,res){
  var firstname = req.body.firstname
  var lastname = req.body.lastname
  var number = req.body.number
  var email = req.body.email
  var budgetmessage = req.body.budgetmessage
  var additionalinfomessage = req.body.additionalinfomessage

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '@gmail.com',
      pass: ''
    }
  });

  var mailOptions = {
    from: "",
    to: "",
    subject: firstname + " " + lastname,
    html: 'Name' + firstname + lastname + ' ' + '<br><br>' + 'Phone Number: ' + number + '<br><br>' + 'Do you have a budget: ' + budgetmessage + '<br><br>' + 'Additional Message: ' + additionalinfomessage
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.redirect('/')
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('App listening on PORT: ' + PORT);
})
