var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var keys = require('./keys');

// var methodOverride = require('method-override');
// var request = require("request");

//allow sessions
// app.use(require("morgan")("combined"));
// app.use(require("cookie-parser")());
app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require("express-session")({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
//
//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));
// override with POST having ?_method=DELETE
// app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.render('index');
});

require('./routes/hroutes.js')(app);

app.post('/sendemail', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var number = req.body.number;
  var message = req.body.message;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: keys.gmailUser,
      pass: keys.gmailPass
    }
  });

  var mailOptions = {
    from: 'TheTechTurtles',
    to:
      'jeffreyyourman@gmail.com, william.a.vasquez@gmail.com, djacks@udel.edu, hello@thetechturtles.com',
    subject: name,
    html:
      'Name: ' +
      name +
      ' ' +
      '<br><br>' +
      'Email: ' +
      email +
      ' ' +
      '<br><br>' +
      'Phone Number: ' +
      number +
      '<br><br>' +
      'Message: ' +
      message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: godbless ' + info.response);
    }
  });
  res.redirect('/');
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('App listening on PORT: ' + PORT);
});
