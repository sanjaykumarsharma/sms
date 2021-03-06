var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");

/* Read Course listing. */
router.get('/readEmployee', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query("SELECT employee_id, emp_id, concat(first_name,' ',middle_name,' ',last_name) as name FROM employee",function(err,result)     {
            
        if(err){
           console.log("Error reading employee : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.employees = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

// Down Load CSV

router.get('/csv_export_Role', function(req, res, next) {
  req.getConnection(function(err,connection){

     var data = {}
     var qry = `select  a.employee_id as 'EMPLOYEE ID', 
      concat(first_name,' ', middle_name,' ',last_name) as 'NAME' , role as 'ROLE'
      from employee_role a
      join employee b on a.employee_id = b.employee_id
      order by first_name`;
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {
      connection.query(qry,function(err,result)     {
            
        if(err){
          console.log("Error reading Employee Role : %s ",err );
          data.status = 'e';

        }else{
          const fields = ['EMPLOYEE ID','NAME','ROLE']; 
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);
          var path='./public/csv/Employee Role.csv'; 
          data.url = '/csv/Employee Role.csv';

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

/* Read Event listing. */
router.get('/read_employee_roles', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select role_id, a.employee_id, concat(first_name,' ', middle_name,' ',last_name) as employee_name, role
      from employee_role a
      join employee b on a.employee_id = b.employee_id
      order by first_name`;
         
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Employee Role : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.employeeRoles = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Add Event listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
   var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);
  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            role    : input.role,
            employee_id : input.employee_id,
            creation_date    : formatted,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO employee_role set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting courses : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.employee_id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


/* Edit Event listing. */
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var id = input.id;
   var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);
  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            role    : input.role,
            employee_id : input.employee_id,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("UPDATE employee_role set ? WHERE role_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting courses : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.role_id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

/* Delete Event listing. */
router.get('/delete/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from employee_role WHERE role_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting employee Role : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

module.exports = router;
