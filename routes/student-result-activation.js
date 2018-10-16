var express = require('express');
var router = express.Router();
var pool = require('../db');

/*****************************************************subjects************************************************/

/* Read Sections listing. */
router.post('/students', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
       
     var data = {}

      var qry =`select a.student_id,a.enroll_number, roll_number,  
                enroll_number, active_result,concat(first_name,' ',middle_name,' ',last_name) as student,f_name
                from student_master a
                join student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${req.cookies.session_id})
                join section_master c on b.section_id = c.section_id
                join parent_master e on (a.student_id = e.student_id and e.current_session_id = ${req.cookies.session_id})
                where c.section_id= ${input.section_id}
                and b.session_id  = ${req.cookies.session_id}
                and (a.withdraw='N' || a.withdraw_session > ${req.cookies.session_id})
                order by first_name,middle_name,last_name`;

     console.log(qry)
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading students : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.status = 's';
            data.students = result;
            res.send(data)
        }
     
     });

  });

});

/*update-login-status*/

router.post('/update-result-status', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

      var today = new Date();
      var dt =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      var data = {}
      
      var sql = `update student_master set active_result='${input.active_result}'
                 where enroll_number='${input.enroll_number}'
                 and current_session_id=${req.cookies.session_id}`;
      
      console.log(sql);

      connection.query(sql, function(err, rows)
      {

        if(err){
          console.log("Error in updating status : %s ",err );
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


module.exports = router;
