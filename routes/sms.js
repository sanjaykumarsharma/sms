var express = require('express');
var router = express.Router();
const request = require('request');



/* Send SMS to student. */
router.post('/', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));

  var username = 'ezy-mittin';
  var password = 'tin357';
  var type = input.type;
  var mobile_nos = '8820260073,8910832121';
  //var mobile_nos = input.mobile_no;
  var message = input.message;
  var url = ' http://103.16.101.52:8080/bulksms/bulksms?username='+username+'&password='+password+'&type=0&dlr=1&destination='+mobile_nos+'&source=MITTIN&message='+message;
  

  var data = {}
  var error='' 
  request(url, { json: true }, (err, res, body) => {
    if (err) { 
      // return console.log(err); 
      error = err
    }else{
      console.log(body);

      var values = []

      if (body.includes(",") == false) {//for sending sms to only one mobile no
          var m = body.split('|');
          var n =  m[1].split(':');

          var values1 = [type,m[0],n[0],n[1],message];

          values.push(values1);
      }else{

        var mobile_logs = body.split(",");

        for(i=0;i<mobile_logs.length;i++){
          var m = mobile_logs[i].split('|');
          var n =  m[1].split(':');
          var values1 = [type,m[0],n[0],n[1],message];

          values.push(values1);

        }  
      }
    }  
  });
  
  var data = {}
  var error=''
  data.status = 's';
  res.send(data)

});


module.exports = router;