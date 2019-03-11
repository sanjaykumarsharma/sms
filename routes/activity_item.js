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
     connection.query('SELECT * FROM item_master',function(err,result)     {
            
        if(err){
           console.log("Error reading items : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.items = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.get('/csv_export_activity_item', function(req, res, next) {

  req.getConnection(function(err,connection){
    var data = {}
    var qry =`select item_name as 'Item Name'
              from item_master item_name`;

   var slips = [1];

   async.forEachOf(slips, function (value, key, callback) {              

      connection.query(qry,function(err,result){
        if(err){
          console.log("Error reading Department Staff : %s ",err );
          data.status = 'e';
        }else{
          
          const fields = ['Item Name'];
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);
          var path='./public/csv/Item.csv'; 
          data.url = '/csv/Item.csv';

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
            item_name    : input.item_name,
            creation_date : formatted,
            modified_by : req.cookies.user,
            
        };
        
        var query = connection.query("INSERT INTO item_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting item : %s ",err );
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
router.post('/edit/:item_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var item_id = input.item_id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
          item_name    : input.item_name,
          modified_by    : req.cookies.role,
        };
        
        var query = connection.query("UPDATE item_master set ? WHERE item_id = ?",[values,item_id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting item : %s ",err );
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
router.get('/delete/:item_id', function(req, res, next) {

  var item_id = req.params.item_id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from item_master WHERE item_id = ?",[item_id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting item : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

module.exports = router;
