var express = require('express');
var router = express.Router();

/* Read Course listing. */
router.get('/readEmployee', function(req, res, next) {

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

});

/* Read Event listing. */
router.get('/read_employee_roles', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = 'SELECT e.employee_id, role_id, name, role FROM employee_role e';
         qry = qry + ' LEFT JOIN employees c ON e.employee_id = c.username '; 
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.employeeRoles = result;
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
            role    : input.role,
            employee_id : input.employee_id,
        };
        
        var query = connection.query("INSERT INTO employee_role set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting courses : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.employee_id = rows.insertId;
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
            role    : input.role,
            employee_id : input.employee_id,
        };
        
        var query = connection.query("UPDATE employee_role set ? WHERE role_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting courses : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.role_id = rows.insertId;
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

        var query = connection.query("DELETE from employee_role WHERE role_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting employee Role : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

module.exports = router;
