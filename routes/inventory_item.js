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
        var user='';
        var session_id=req.cookies.session_id
        var user=req.cookies.user
        var condition = "";
        if(req.cookies.role!= 'ADMIN'){
            condition =`where a.department in (select a.department
            from inventory_store_department a
            join inventory_department_staff b on a.department = b.department
            where employee_id ='${user}') `;
        }
      
     var qry = `select a.item_id, a.category_id,a.department, sub_category, subcategory_id, category_name, 
          item_name
        from inventory_item_master a
        join inventory_category_master b on a.category_id=b.category_id
        left join inventory_subcategory_master f on a.subcategory_id = f.sub_category_id
         ${condition}
        order by item_name`; 
      console.log(qry)  
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading item : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.inventoryItems = result;
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
            category_id    : input.category_id,
            department : input.department,
            item_name : input.item_name,
            subcategory_id : input.sub_category_id,
            creation_date    : formatted,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO inventory_item_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting subcategory : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.item_id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


/* Edit Event listing. */
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);
  var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            subcategory_id    : input.sub_category_id,
            department : input.department,
            category_id : input.category_id,
            item_name : input.item_name,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("UPDATE inventory_item_master set ? WHERE item_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting item : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.item_id = id;
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

        var query = connection.query("DELETE from inventory_item_master WHERE item_id = ?",[id], function(err, rows)
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
