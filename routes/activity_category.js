var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var download = require('download-file')

router.get('/csv_export_activity_category', function(req, res, next) {

  req.getConnection(function(err,connection){

    var data = {}
    var qry = `select category_name as 'Category Name'
               from activity_category_master`;

      connection.query(qry,function(err,result)     {    
        if(err){
          console.log("Error reading Category : %s ",err );
          data.status = 'e';
        }else{
          data.status = 's';
          data.categories = result;

          const fields = ['Category Name'];
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);

          var path='./public/csv/ActivityCategory.csv'; 
          fs.writeFile(path, csv, function(err,data) {
            if (err) {throw err;}
            else{ 
              // res.download(path); // This is what you need
              res.send(data)
              var url='http://localhost:4000/csv/ActivityCategory.csv';
              var open = require("open","");
              open(url);  
            }
          });    
        }
     });      
    });
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

/* Add Category . */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var modified_by=req.cookies.user;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            category_name    : input.category_name,
            modified_by : modified_by,
        };
        
        var query = connection.query("INSERT INTO activity_category_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting category : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.category_id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


/* Edit Course listing. */
router.post('/edit/:category_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var category_id = input.category_id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            category_name    : input.category_name,
        };
        
        var query = connection.query("UPDATE activity_category_master set ? WHERE category_id = ?",[values,category_id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting category : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.category_id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

/* Delete Course listing. */
router.get('/delete/:category_id', function(req, res, next) {

  var category_id = req.params.category_id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from activity_category_master WHERE category_id = ?",[category_id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting category : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

module.exports = router;
