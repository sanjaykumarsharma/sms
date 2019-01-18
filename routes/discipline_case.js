var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var download = require('download-file')

router.get('/csv_export_discipline_case', function(req, res, next) {

  req.getConnection(function(err,connection){

     var data = {}
     var qry=`SELECT case_id, a.category_id, case_name as 'Case Name', category_name as 'Category Name' 
              FROM discipline_case_master a
              JOIN discipline_category_master b ON a.category_id = b.category_id 
              order by category_name, case_name`;

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Discipline Case : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.discipline_case = result;

            // console.log(result)

            const fields = ['Category Name','Case Name'];
            
             
            const json2csvParser = new Json2csvParser({ fields });
            const csv = json2csvParser.parse(result);

            var path='./public/csv/DisciplineCase.csv'; 
            fs.writeFile(path, csv, function(err,data) {
              if (err) {throw err;}
              else{ 
                // res.download(path); // This is what you need
                res.send(data)
                var url='http://localhost:4000/csv/DisciplineCase.csv';
                var open = require("open","");
                open(url);  
              }
            });    
            //console.log(csv);
        }
     
     });
       
  });

});

/* Read Category listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('select category_id,category_name from discipline_category_master order by 2',function(err,result)     {
            
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

/* Read Case listing. */
router.get('/read_case', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}

     var qry = ` SELECT case_id, a.category_id, case_name, category_name FROM discipline_case_master a
                 JOIN discipline_category_master b ON a.category_id = b.category_id 
                 order by category_name, case_name `; 
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading case : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.discipline_case = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Add Case. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            case_name    : input.case_name,
            category_id : input.category_id,
            creation_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO discipline_case_master set ? ",values, function(err, rows)
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


/* Edit Case . */
router.post('/edit/:case_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var case_id = input.case_id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            case_name    : input.case_name,
            category_id : input.category_id,
            modified_by    : req.cookies.role,
        };
        
        var query = connection.query("UPDATE discipline_case_master set ? WHERE case_id = ?",[values,case_id], function(err, rows)
        {
  
          if(err){
           console.log("Error editing case : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

/* Delete Case  */
router.get('/delete/:case_id', function(req, res, next) {

  var case_id = req.params.case_id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from discipline_case_master WHERE case_id = ?",[case_id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting case : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

module.exports = router;
