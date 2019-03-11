var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");

/* Read Course listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
      var user=req.cookies.user 
      var data = {}
      console.log("+++++")
      console.log(req.cookies.role)

      var condition="";
      if(req.cookies.role== "TEACHER" || req.cookies.role=="Class Teacher"){
           condition =`where standard_id=(select standard_id from section_master 
              where teacher_id=(select emp_id from employee where employee_id='${user}')) `;
      }
      var qry = `select standard_id,standard 
                from standard_master 
                ${condition} `

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading standards : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.standards = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


router.get('/csv_export_standard', function(req, res, next) {
  req.getConnection(function(err,connection){
      var user=req.cookies.user 
      var data = {}
      console.log("+++++")
      console.log(req.cookies.role)

      var condition="";
      if(req.cookies.role== "TEACHER" || req.cookies.role=="Class Teacher"){
           condition =`where standard_id=(select standard_id from section_master 
              where teacher_id=(select emp_id from employee where employee_id='${user}')) `;
      }
     var qry = `select standard as 'Standard' 
                from standard_master 
                 ${condition} `;
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {
      connection.query(qry,function(err,result)     {
            
        if(err){
          console.log("Error reading Standard : %s ",err );
          data.status = 'e';

        }else{
          const fields = ['Standard']; 
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);
          var path='./public/csv/Standard.csv'; 
          data.url = '/csv/Standard.csv';

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

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            standard    : input.standard,
        };
        
        var query = connection.query("INSERT INTO standard_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting cuntry : %s ",err );
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
  console.log(input.id);
  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            standard    : input.standard,
        };
        
        var query = connection.query("UPDATE standard_master set ? WHERE standard_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error editing standard : %s ",err );
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

        var query = connection.query("DELETE from standard_master WHERE standard_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting standard : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

module.exports = router;
