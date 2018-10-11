var express = require('express');
var router = express.Router();

/* Read Category listing. */
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

     var qry = 'SELECT case_id, a.category_id, case_name, category_name FROM mentor_case_master a';
         qry = qry + ' JOIN mentor_category_master b ON a.category_id = b.category_id ';
         qry = qry + ' order by category_name, case_name '; 
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading case : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.mentor_case = result;
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
            modified_by    : req.cookies.role,
        };
        
        var query = connection.query("INSERT INTO mentor_case_master set ? ",values, function(err, rows)
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
        
        var query = connection.query("UPDATE mentor_case_master set ? WHERE case_id = ?",[values,case_id], function(err, rows)
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

/* Delete Case  */
router.get('/delete/:case_id', function(req, res, next) {

  var case_id = req.params.case_id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from mentor_case_master WHERE case_id = ?",[case_id], function(err, rows)
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
