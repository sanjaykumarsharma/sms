var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");

/* Read Course listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM employment_status_master',function(err,result)     {
            
        if(err){
           console.log("Error reading levels : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.employmentStatus = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


router.get('/csv_export_employmentStatus', function(req, res, next) {

  req.getConnection(function(err,connection){

     var data = {}
     var qry = `select employment_status as 'Employment Status'
               from employment_status_master 
                order by employment_status`;
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {
      connection.query(qry,function(err,result)     {
            
        if(err){
          console.log("Error reading Employment Status : %s ",err );
          data.status = 'e';

        }else{
          const fields = ['Employment Status']; 
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);
          var path='./public/csv/Employment Status.csv'; 
          data.url = '/csv/Employment Status.csv';

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
            employment_status    : input.employment_status,
              creation_date    : formatted,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO employment_status_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting levels : %s ",err );
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
            employment_status    : input.employment_status,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("UPDATE employment_status_master set ? WHERE employment_status_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error editing levels : %s ",err );
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

        var query = connection.query("DELETE from employment_status_master WHERE employment_status = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting level : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

module.exports = router;
