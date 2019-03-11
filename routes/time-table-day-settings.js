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
     var qry = `SELECT * FROM day_master where session_id=${req.cookies.session_id}`;
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading days : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.days = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Discipline listing for CSV */
router.post('/csv_export_day', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
       
    var data = {}
    var std = Array();
    var result = input.data;
    console.log(result)
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {

      for(var i = 0; i < result.length; i++){
        console.log(result[i].referred_by)
        var obj = {};
        obj['Day'] = result[i].day_name;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Day'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/Day.csv'; 
      data.url = '/csv/Day.csv';

      fs.writeFile(path, csv, function(err,data) {
        if (err) {
          throw err;
        }else{ 
          callback() 
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
    
  });
       
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
            day_name    : input.day_name,
            session_id    : req.cookies.session_id,
            creation_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO day_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting days : %s ",err );
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

  req.getConnection(function(err,connection){
        var data = {}

        var qry =  `UPDATE day_master set day_name ='${input.day_name}',modified_by = '${req.cookies.user}' where day_id=${input.day_id} `;

        console.log(qry)

        connection.query(qry, function(err, rows)
        {
  
          if(err){
           console.log("Error editing day : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
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

        var query = connection.query("DELETE from day_master WHERE day_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting period : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

module.exports = router;
