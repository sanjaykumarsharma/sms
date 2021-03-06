var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");

router.get('/csv_export_activity_event', function(req, res, next) {

  req.getConnection(function(err,connection){

     var data = {}
     var qry = `select event_name as 'Event Name', category_name as 'Category Name'
                from activity_event_master a
                join activity_category_master b on a.category_id=b.category_id
                order by 1,2`;
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {
      connection.query(qry,function(err,result)     {
            
        if(err){
          console.log("Error reading Activity Event : %s ",err );
          data.status = 'e';

        }else{
          const fields = ['Category Name','Event Name']; 
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);
          var path='./public/csv/Event.csv'; 
          data.url = '/csv/Event.csv';

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


router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM activity_category_master',function(err,result)     {
            
        if(err){
           console.log("Error reading category : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.categories = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Event listing. */
router.get('/read_event', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select event_id, a.category_id, event_name, category_name
                from activity_event_master a
                join activity_category_master b on a.category_id=b.category_id
                order by 2,3`;
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.events = result;
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
            event_name    : input.event_name,
            category_id : input.category_id,
            creation_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO activity_event_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting event : %s ",err );
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
router.post('/edit/:event_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var event_id = input.event_id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            event_name    : input.event_name,
            category_id : input.category_id,
            modified_by    : req.cookies.role,
        };
        
        var query = connection.query("UPDATE activity_event_master set ? WHERE event_id = ?",[values,event_id], function(err, rows)
        {
  
          if(err){
           console.log("Error editing event : %s ",err );
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
router.get('/delete/:event_id', function(req, res, next) {

  var event_id = req.params.event_id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from activity_event_master WHERE event_id = ?",[event_id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting event : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

module.exports = router;
