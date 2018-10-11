var express = require('express');
var router = express.Router();
var pool = require('../db');

/* Read Session listing. */
router.get('/', function(req, res, next) {

  var data = {}
     
  var qry = 'SELECT bank_account_no, bank_name, branch '; 
   
   qry = qry + ' from bank_account_master order by 1 desc '; 

  pool.query(qry,function(err,result)     {
      
  if(err){
     console.log("Error reading banks : %s ",err );
     data.status = 'e';

  }else{
    // res.render('customers',{page_title:"Customers - Node.js",data:rows});
      data.status = 's';
      data.banks = result;
     //connection.end()

      res.send(JSON.stringify(data))
  }

  });

});

/* Add Event listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  console.log(formatted)


  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            bank_account_no    : input.bank_account_no,
            bank_name : input.bank_name,
            branch : input.branch,
            creation_date : formatted,
            modified_by : req.cookies.role,

        };
        
        var query = connection.query("INSERT INTO bank_account_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting banks : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


/* Edit Event listing. */
router.post('/edit/:bank_ac', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var bank_ac = input.bank_ac;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            bank_account_no    : input.bank_account_no,
            bank_name : input.bank_name,
            branch : input.branch,
        };
        
        var query = connection.query("UPDATE bank_account_master set ? WHERE bank_account_no = ?",[values,bank_ac], function(err, rows)
        {
  
          if(err){
           console.log("Error updating bank : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

/* Delete Event listing. */
router.get('/delete/:bank_ac', function(req, res, next) {

  var bank_ac = req.params.bank_ac;

  req.getConnection(function(err,connection){
        var data = {}
      
        var query = connection.query("DELETE from bank_account_master WHERE bank_account_no = ?",[bank_ac], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting bank : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


module.exports = router;
