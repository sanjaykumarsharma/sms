var express = require('express');
var router = express.Router();

/* Read Course listing. */
router.get('/read_inventorydepartment', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
        
            var user_condition=req.cookies.user;
            console.log(user_condition)
           $user_condition = "";
           if(req.cookies.role=='ADMIN'){
              var qry = `select department
            from inventory_store_department`;
           }else{
            var qry = `select a.department
                from inventory_store_department a
                join inventory_department_staff b on a.department = b.department
                where employee_id ='${user_condition}' `;
           } 
      

     connection.query(qry,function(err,result){
            
        if(err){
           console.log("Error reading department : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.inventoryDepartments = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Add Course listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            department    : input.department,
        };
        
        var query = connection.query("INSERT INTO inventory_store_department set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting department : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              data.id = rows.insertId;
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});


/* Edit Course listing. */
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            department    : input.department,
        };
        
        var query = connection.query("UPDATE inventory_store_department set ? WHERE department = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error editing department : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              data.id = rows.insertId;
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

/* Delete Course listing. */
router.get('/delete/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from inventory_store_department WHERE department = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting department : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

module.exports = router;
