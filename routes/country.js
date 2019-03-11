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
     connection.query('SELECT * FROM isd_codes',function(err,result)     {
            
        if(err){
           console.log("Error reading countries : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.countries = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.get('/csv_export_country', function(req, res, next) {
  req.getConnection(function(err,connection){

     var data = {}
     var qry = `select  country as 'Country', code as 'Code' 
      from isd_codes
      order by country`;
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {
      connection.query(qry,function(err,result)     {
            
        if(err){
          console.log("Error reading Country : %s ",err );
          data.status = 'e';

        }else{
          const fields = ['Country','Code']; 
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);
          var path='./public/csv/Country.csv'; 
          data.url = '/csv/Country.csv';

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
            country    : input.country,
            code    : input.code,
        };
        
        var query = connection.query("INSERT INTO isd_codes set ? ",values, function(err, rows)
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
    var now = new Date();
    var jsonDate = now.toJSON();
    var formatted = new Date(jsonDate);
    var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            country    : input.country,
            code    : input.code,
        };
        
        var query = connection.query("UPDATE isd_codes set ? WHERE country = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error editing country : %s ",err );
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

        var query = connection.query("DELETE from isd_codes WHERE country = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting country : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

module.exports = router;
