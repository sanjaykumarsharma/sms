var express = require('express');
var router = express.Router();

/* Read Course listing. */
/*router.get('/readEmployee', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM employees',function(err,result)     {
            
        if(err){
           console.log("Error reading category : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.employees = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});*/

/* Read Event listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = 'SELECT e.department, e.category_id, sub_category,sub_category_id, category_name FROM inventory_subcategory_master e';
         qry = qry + ' LEFT JOIN inventory_store_department c ON e.department = c.department '; 
         qry = qry + ' LEFT JOIN inventory_category_master d ON e.category_id = d.category_id '; 
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.inventorySubcategories = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Add Event listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            category_id    : input.category_id,
            department : input.department,
            sub_category : input.sub_category,
        };
        
        var query = connection.query("INSERT INTO inventory_subcategory_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting subcategory : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.sub_category_id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


/* Edit Event listing. */
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            sub_category    : input.sub_category,
            department : input.department,
            category_id : input.category_id,
        };
        
        var query = connection.query("UPDATE inventory_subcategory_master set ? WHERE sub_category_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting subcategory : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.sub_category_id = id;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

/* Delete Event listing. */
router.get('/delete/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from inventory_subcategory_master WHERE sub_category_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting subcategory : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

module.exports = router;
