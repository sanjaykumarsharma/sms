var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var download = require('download-file')

router.get('/csv_export_discipline_category', function(req, res, next) {

  req.getConnection(function(err,connection){

    var data = {}
    var qry = `select category_id,category_name from discipline_category_master order by 2`;

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

          var path='./public/csv/DisciplineCategory.csv'; 
          fs.writeFile(path, csv, function(err,data) {
            if (err) {throw err;}
            else{ 
              res.send(data)
              var url='http://localhost:4000/csv/DisciplineCategory.csv';
              var open = require("open","");
              open(url);  
            }
          });    
        }
     });      
    });
});

/* Read discipline listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('select category_id,category_name from discipline_category_master order by 2',function(err,result)     {
            
        if(err){
           console.log("Error reading discipline : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.discipline_categories = result;
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
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO discipline_category_master set ? ",values, function(err, rows)
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
        
        var query = connection.query("UPDATE discipline_category_master set ? WHERE category_id = ?",[values,category_id], function(err, rows)
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

        var query = connection.query("DELETE from discipline_category_master WHERE category_id = ?",[category_id], function(err, rows)
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
