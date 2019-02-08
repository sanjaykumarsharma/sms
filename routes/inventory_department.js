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

router.get('/readAssignStaff', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
        
           /* var user_condition=req.cookies.user;
            console.log(user_condition)
            $user_condition = "";
           if(req.cookies.role=='ADMIN'){
              var qry = `select department
            from inventory_store_department`;
           }else{*/
          var qry = `select id, a.employee_id , department,  
                concat(first_name, '', middle_name, '', last_name) as staff_name
            from inventory_department_staff a 
            join employee b on a.employee_id = b.employee_id
            order by first_name`;
         //  } 
      

     connection.query(qry,function(err,result){
            
        if(err){
           console.log("Error reading department : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.assignedStaffs = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.get('/readFreeStaff/:id', function(req, res, next) {

  req.getConnection(function(err,connection){
         var department = req.params.id;
         var data = {}
        
          var qry = `select a.employee_id, concat(first_name, '', middle_name, '', last_name) as staff_name
            from employee_role a 
            join employee b on a.employee_id = b.employee_id
            where a.role = 'Store'
            and a.employee_id not in (select employee_id 
              from inventory_department_staff
            where department = '${department}')
            order by first_name`;
      
     connection.query(qry,function(err,result){
            
        if(err){
           console.log("Error reading assign staff : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.freeStaffs = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

// Assign Staff To Department


/*Assign Sections*/

router.post('/assign_staff', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

          var data = {}
          var now = new Date();
          var jsonDate = now.toJSON();
          var formatted = new Date(jsonDate);

          var staffValues =[];
          var staffs = input.staffs
          for(var i=0; i<staffs.length; i++){
             var obj= []
             console.log("inside Assign")
             console.log(staffs[i])
              obj.push(staffs[i].employee_id)
              obj.push(input.department)
              obj.push(formatted)
              obj.push(req.cookies.user)
              staffValues.push(obj)
          }
        var sql =`insert into inventory_department_staff(employee_id,
              department, creation_date, modified_by) VALUES ?`;
         console.log(sql)
        connection.query(sql,[staffValues], function(err, result) 
        {
            if(err){
              console.log("Error in Assign Staff : %s ",err );
              data.status = 'e';
              data.error = err
              data.messaage = err.sqlMessage
            }else{
              data.status = 's';
              res.send(data)
            }
        });
          
        });
   });

/*router.post('/free-up-staff', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
      var data = {}
      
      var sql = ''
      input.staffs.map(c=>{
        var qry = `Update inventory_department_staff set section_id =${input.section_id} where student_id=${c.student_id};`;
        if(sql==''){
          sql = qry;
        }else{
          sql = sql + qry;
        }
      })        

      
      console.log(sql);

      connection.query(sql, function(err, rows)
      {

        if(err){
          console.log("Error in free students : %s ",err );
          data.status = 'e';
          data.error = err
          data.messaage = err.sqlMessage
        }else{
          data.status = 's';
          res.send(data)
        }
        
      });


   });

});*/

router.post('/free_up_staff', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
     var staffs=input.staffs
     var session_id = req.cookies.session_id
     var department = input.department
     var user = req.cookies.user
     var now = new Date();
     var jsonDate = now.toJSON(); 
     var formatted = new Date(jsonDate);
     req.getConnection(function(err,connection){
       
      var data = {}
      var staffValues = [];
      var staff_ids = [];
      //var staffValues = [];
      for(var i=0; i<staffs.length; i++){
          //staffValues.push([session_id,attendance_date,staffs[i].student_id,staffs[i].attendance,attendance_date,user])
          staff_ids.push([staffs[i].id])
        };
           var staffids = staff_ids;
           var staffIDS= staffids.toString();
           console.log(staffIDS)
         //  return  

          var qry=`Delete from inventory_department_staff
           where id in (${staffIDS})`
          connection.query(qry, function (error, rows) {
            console.log(qry)
          if(error) {
             data.status='e'
             data.messaage = error.sqlMessage
          }else{
              data.status = 's';
              res.send(JSON.stringify(data))
               } 
           });      
      })
})
      



/* Add Course listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);


  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            department    : input.department,
            creation_date    : formatted,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
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
   var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);

  var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            department    : input.department,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
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
