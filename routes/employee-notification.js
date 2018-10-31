var express = require('express');
var router = express.Router();

/* Read Staff Departments listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT emp_type_id, emp_type FROM emp_type_master',function(err,result)     {
            
        if(err){
           console.log("Error reading Departments : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.staff_departments = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Employee listing. */
router.get('/:emp_type_id', function(req, res, next) {

  var emp_type_id = req.params.emp_type_id;

  req.getConnection(function(err,connection){

    var condition = "";
        if(emp_type_id != -1) var condition = " and a.emp_type_id = " + emp_type_id;
       
     var data = {};
     var qry = ` select employee_id, a.emp_id,concat(first_name,' ',middle_name,' ',last_name) as employee_name,   
                 b.department_name ,c.designation,mobile , email
                 from employee a
                 LEFT JOIN department_master b on a.department_id = b.department_id 
                 LEFT JOIN designation_master c on a.designation_id = c.designation_id
                 LEFT JOIN emp_type_master d on a.emp_type_id = d.emp_type_id
                 where a.is_active='Y' ${condition }  
                 order by 3`;

         console.log(qry);

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading employees : %s ",err );
           data.status = 'e';
           data.error = err;

        }else{
            data.status = 's';
            data.employees = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


module.exports = router;
