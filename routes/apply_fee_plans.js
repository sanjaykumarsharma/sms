var express = require('express');
var router = express.Router();


/* Read Session listing. */
router.get('/readStudents/:section_id', function(req, res, next) {
  var section_id = req.params.section_id;
  req.getConnection(function(err,connection){
       
     var data = {}
     var session_id = req.cookies.session_id;
     var qry =`select concat(first_name,' ',middle_name,' ',last_name) as student_name ,
               a.enroll_number , a.student_id, d.fee_plan_id, fee_plan_name 
                  from student_master a
                  LEFT JOIN student_current_standing b on (a.student_id = b.student_id and a.current_session_id =${session_id})
                  LEFT JOIN section_master c on c.section_id = b.section_id
                  LEFT JOIN fee_plan_student_map d on (a.student_id = d.student_id and d.session_id =${session_id})
                  LEFT JOIN fee_plan_master  e on e.fee_plan_id= d.fee_plan_id 
                  where c.section_id= ? 
                  and (a.withdraw='N' || a.withdraw_session > ${session_id})
                  and b.session_id=(select session_id from session_master where session_id = ${session_id})
                  order by first_name`;
    

     connection.query(qry,[section_id],function(err,result)     {
            
        if(err){
           console.log("Error reading students : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.students = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

// ===========Read Fee Plan By Standard ==========
router.get('/readPlanByStandard/:id', function(req, res, next) {
  var standard_id = req.params.id;
  req.getConnection(function(err,connection){
       
     var data = {}
     var session_id = req.cookies.session_id;
     var qry =`select a.fee_plan_id, fee_plan_name
               from fee_plan_standard_map a
               join fee_plan_master b on (a.fee_plan_id= b.fee_plan_id and b.session_id = ${session_id})
               where a.standard_id=?
               order by 1`;
    

     connection.query(qry,[standard_id],function(err,result)     {
            
        if(err){
           console.log("Error reading plans : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.plans = result;
           //connection.end()
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.get('/readStandards', function(req, res, next) {

  req.getConnection(function(err,connection){
    var user=req.cookies.user 
    var data = {}

    var condition="";
      if(req.cookies.role== "TEACHER" || req.cookies.role=="Class Teacher"){
          condition =`where standard_id=(select standard_id from section_master 
                      where teacher_id=(select emp_id from employee where employee_id='${user}')) `;
      }
       
     var data = {}
     var qry = `select standard_id,standard 
                from standard_master 
                ${condition}`; 

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading standard : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.standards = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/*==== read sections ===*/
router.get('/readSections', function(req, res, next) {

  req.getConnection(function(err,connection){
    var user=req.cookies.user 
    var session_id=req.cookies.session_id 
    var data = {}
    var condition="";
      if(req.cookies.role== "TEACHER" || req.cookies.role=="Class Teacher"){
           condition =` where d.section_id=(select section_id from section_master 
           where teacher_id=(select emp_id from employee where employee_id='${user}')) `;
      }
    var qry =`select  a.section_id, section, b.standard_id, b.standard, d.room as room_no,
              concat(first_name,' ',middle_name,' ',last_name) as class_teacher
              from section_master  a
              LEFT JOIN class_teacher_section d on (a.section_id=d.section_id and d.session_id = ${session_id})
              LEFT JOIN standard_master b on a.standard_id = b.standard_id
              LEFT JOIN employee c on d.class_teacher = c.emp_id
              ${condition} 
              order by b.standard_id, section_id`; 

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading section : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.sections = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/*======= Apply Fee Plan */
router.post('/add', function(req, res, next){
  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  console.log(formatted)


  req.getConnection(function(err,connection){
        var data = {}

        var session_id = req.cookies.session_id;
        var fee_plan_id = input.fee_plan_id;
        var students = input.students
        var studentValues = [];

        for(i=0;i<students.length;i++){
         studentValues.push([fee_plan_id,students[i],session_id,formatted,req.cookies.role])
        };
          console.log("=============");
          console.log(studentValues);

        var sql = "insert into fee_plan_student_map(fee_plan_id,student_id,session_id,creation_date,modified_by) VALUES ?";
        console.log(sql)
        connection.query(sql,[studentValues], function(err, result) 
        {
  
          if(err){
           console.log("Error in inserting values : %s ",err );
           data.status = 'e';

          }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });
});


// remove Plan
router.post('/remove', function(req, res, next){
  var input = JSON.parse(JSON.stringify(req.body));
  console.log("===========")
  console.log(input)

  req.getConnection(function(err,connection){
        var data = {}

        var session_id = req.cookies.session_id
        var students = input.students
        var studentValues = [];
    
        for(i=0;i<students.length;i++){
           studentValues.push([students[i].fee_plan_id,students[i].student_id])
        };
          
          
        var sql = `delete from fee_plan_student_map
                    where fee_plan_id =?
                    and student_id=?
                    session_id=${session_id}
                    and fee_plan_id not in(select fee_plan_id from fee_received 
                      where student_id =?
                      and session_id== ${session_id})`;
        console.log(sql)
        connection.query(sql,[studentValues], function(err, result) 
        {
  
          if(err){
           console.log("Error in deleting values : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });
});

/* Delete Event listing. */
router.get('/delete/:fee_plan_id', function(req, res, next) {
 
  var fee_plan_id = req.params.fee_plan_id;

  req.getConnection(function(err,connection){
        var data = {}
      
        var query = connection.query("DELETE from fee_plan_master WHERE fee_plan_id = ?",[fee_plan_id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting plans : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


module.exports = router;
