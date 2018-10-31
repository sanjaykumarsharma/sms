var express = require('express');
var router = express.Router();

/* Read Course listing. */
router.get('/read_teaching_staff', function(req, res, next) {
  var session_id=req.cookies.session_id
  req.getConnection(function(err,connection){
       
     var data = {}
    var qry=`select emp_id, concat(first_name,' ',middle_name, ' ' ,last_name) as teacher_name
                from employee
                where emp_id not in(select class_teacher from class_teacher_section where session_id=${session_id})
                and emp_id not in(select assistant_teacher from class_teacher_section where session_id=${session_id}) 
                and is_active='Y'
                and emp_type_id = 14
              order by first_name,middle_name,last_name`;
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Teaching Satff : %s ",err );
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

router.get('/read_class_teacher', function(req, res, next) {
 var session_id=req.cookies.session_id
  req.getConnection(function(err,connection){
       
     var data = {}
    var qry=`select  ts_id, d.standard_id,d.section_id,room,
                class_teacher as c_id, assistant_teacher as a_id, standard, section, 
                concat(b.first_name,' ',b.middle_name,' ',b.last_name) as class_teacher,
                concat(c.first_name,' ',c.middle_name,' ',c.last_name) as assistant_teacher
                from class_teacher_section  a
                LEFT JOIN employee b on a.class_teacher = b.emp_id 
                LEFT JOIN employee c on a.assistant_teacher = c.emp_id
                
                LEFT JOIN section_master d on a.section_id = d.section_id
                LEFT JOIN standard_master e on d.standard_id = e.standard_id
                where a.session_id=${session_id}
                order by d.section_id`;
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading CLass Teacher : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.classTeachers = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Add Course listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
 var session_id=req.cookies.session_id
  req.getConnection(function(err,connection){
        var data = {}

        var values = {
           section_id : input.section_id,
           room : input.room_no,
           class_teacher : input.class_teacher,
           assistant_teacher : input.asst_class_teacher,
           session_id : session_id
        };
        
        var query = connection.query("INSERT INTO class_teacher_section set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting Class teacher : %s ",err );
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
           section_id : input.section_id,
           room : input.room_no,
           class_teacher : input.class_teacher,
           assistant_teacher : input.asst_class_teacher,
        };
        
        var query = connection.query("UPDATE class_teacher_section set ? WHERE ts_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting subjects : %s ",err );
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

        var query = connection.query("DELETE from class_teacher_section WHERE ts_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting class_teacher : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

module.exports = router;
