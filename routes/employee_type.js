var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");

/* Read Item listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
     var data = {}
     connection.query('SELECT * FROM emp_type_master',function(err,result)     {
            
        if(err){
           console.log("Error reading employeeTypes : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.employeeTypes = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.get('/csv_export_EmployeeType', function(req, res, next) {

  req.getConnection(function(err,connection){

     var data = {}
     var qry = `select emp_type as 'Employee Type'
                from emp_type_master 
                order by 1`;
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {
      connection.query(qry,function(err,result)     {
            
        if(err){
          console.log("Error reading Emolyee Type : %s ",err );
          data.status = 'e';

        }else{
          const fields = ['Employee Type']; 
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);
          var path='./public/csv/Employee Type.csv'; 
          data.url = '/csv/Employee Type.csv';

          fs.writeFile(path, csv, function(err,data) {
            if (err) {
              throw err;
            }else{ 
              callback() 
            }
          });
        }
      });  
    },function (err) {
      if (err) {
        console.error(err.message);
        data.status = 'e';
        res.send(data)
      }
        data.status = 's';
        res.send(data)
    });//end of async loop  

  });// get connection
});



/* Add Item listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            emp_type    : input.employee_type,
            creation_date    : formatted,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO emp_type_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting employee_type : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


/* Edit Item listing. */
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var id = input.id;
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            emp_type    : input.employee_type,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("UPDATE emp_type_master set ? WHERE emp_type_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting employee_type : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

/* Delete Item listing. */
router.get('/delete/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from emp_type_master WHERE emp_type_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting employee_type : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

module.exports = router;
