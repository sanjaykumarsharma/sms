var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");

/* Read Course listing. */
router.get('/read_hod', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query("select emp_id, concat(first_name,' ',middle_name,' ',last_name) as name from employee a join emp_type_master b on a.emp_type_id=b.emp_type_id where emp_type='Teaching Staff'",function(err,result)     {
            
        if(err){
           console.log("Error reading Teaching Staff : %s ",err );
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


router.get('/read_department', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query("select a.department_id,department_name, hod, b.first_name as name from department_master a LEFT JOIN employee b on a.hod= b.emp_id order by department_name",function(err,result)     {
            
        if(err){
           console.log("Error reading Department Staff : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.departments = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.get('/csv_export_Department', function(req, res, next) {

  req.getConnection(function(err,connection){

     var data = {}
     var qry = `select department_name as 'Department Name', hod as 'HOD'
               from department_master a 
               LEFT JOIN employee b on a.hod= b.emp_id
                order by department_name`;
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {
      connection.query(qry,function(err,result)     {
            
        if(err){
          console.log("Error reading Department : %s ",err );
          data.status = 'e';

        }else{
          const fields = ['Department Name','HOD']; 
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);
          var path='./public/csv/Department.csv'; 
          data.url = '/csv/Department.csv';

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

/* Add Course listing. */
router.post('/add', function(req, res, next) {

   var input = JSON.parse(JSON.stringify(req.body));
   var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);
  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            department_name    : input.department_name,
            hod : input.employee_name,
            creation_date    : formatted,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO department_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting department : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              data.id = rows.insertId;
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});


/* Edit Course listing. */
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var id = input.id;
   var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);
  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            department_name    : input.department_name,
            hod : input.employee_name,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("UPDATE department_master set ? WHERE department_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error editing department : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              data.id = rows.insertId;
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

/* Delete Course listing. */
router.get('/delete/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from designation_master WHERE designation_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting designation : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

module.exports = router;
