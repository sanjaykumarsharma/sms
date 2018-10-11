var express = require('express');
var router = express.Router();

/* Read Course listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM standard_master',function(err,result)     {
            
        if(err){
           console.log("Error reading standard : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.standard = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

//* Read Section listing. */
router.get('/read_section/:standard_id', function(req, res, next) {
  var standard_id = req.params.standard_id;
  console.log("HERE")
  console.log(standard_id)

  req.getConnection(function(err,connection){
       
     var data = {}
     var query = connection.query("SELECT * FROM section_master WHERE standard_id = ?",[standard_id], function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.section = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

module.exports = router;
