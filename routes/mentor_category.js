var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");

router.post('/csv_export_mentor_category', function(req, res, next) {
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
        obj['Category Name'] = result[i].category_name;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Category Name'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/MentorCategory.csv'; 
      data.url = '/csv/MentorCategory.csv';

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
    });

    });
});

router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM mentor_category_master',function(err,result)     {
            
        if(err){
           console.log("Error reading category : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.mentor_categories = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
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
            category_name    : input.category_name,
            creation_date    : formatted,
            modified_by    : req.cookies.role,
        };
        
        var query = connection.query("INSERT INTO mentor_category_master set ? ",values, function(err, rows)
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
        
        var query = connection.query("UPDATE mentor_category_master set ? WHERE category_id = ?",[values,category_id], function(err, rows)
        {
  
          if(err){
           console.log("Error Updateing category : %s ",err );
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

        var query = connection.query("DELETE from mentor_category_master WHERE category_id = ?",[category_id], function(err, rows)
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
