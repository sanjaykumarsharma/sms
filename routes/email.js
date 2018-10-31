var express = require('express');
var router = express.Router();
const request = require('request');
var nodemailer = require('nodemailer');



/* Send Email to student. */


router.post('/', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));

  //var username = 'ezy-mittin';
  //var password = 'tin357';
  var type = input.type;
  //var mobile_nos = '8820260073';
  var emails = 'bodhisattwabarua@gmail.com';
  //var emails = input.email;
  var subject = input.subject;
  var message = input.message;
  //var url = ' http://103.16.101.52:8080/bulksms/bulksms?username='+username+'&password='+password+'&type=0&dlr=1&destination='+mobile_nos+'&source=MITTIN&message='+message;
  
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bodhisattwabarua@gmail.com',
    pass: '8820260073$@'
    }
  });

  var mailOptions = {
    from: 'saanjaakumar@gmail.com',
    to: 'bodhisattwabarua@gmail.com,saanjaaykumaar@gmail.com',
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  var data = {}
  var error='' 
  data.status = 's';
  res.send(data)

});


module.exports = router;
