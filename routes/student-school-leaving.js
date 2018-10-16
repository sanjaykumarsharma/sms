var express = require('express');
var router = express.Router();
var pool = require('../db');

/*****************************************************subjects************************************************/

/* Read Sections listing. */
router.post('/students', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
       
     var data = {}

      var qry ="";

      var condition = "";
      if(input.standard_id == -1 && input.section_id==-1)   condition = "";
      if(input.standard_id != -1 && input.section_id==-1)   condition = ` and d.standard_id =${input.standard_id}`;
      if(input.standard_id != -1 && input.section_id!=-1)   condition = ` and d.standard_id=${input.standard_id} and c.section_id=${input.section_id}`;          

      if(input.type=='TC'){

        qry = `select a.student_id, c.section, d.standard, a.enroll_number,prev_class,
              first_name, middle_name, last_name, date_format(withdraw_date, '%d/%m/%Y') as dol,
              date_format(doa, '%d/%m/%y') as dateOfAdmission, withdraw_remarks  as remarks, type
              from student_master a
              join student_current_standing b on (a.student_id = b.student_id and a.current_session_id =${req.cookies.session_id})
              join section_master c on b.section_id = c.section_id
              join standard_master d on c.standard_id = d.standard_id
              left join school_leaving e on a.student_id = e.student_id 
              where withdraw='Y' ${condition}
              and b.session_id= ${req.cookies.session_id}
              order by first_name`;

      }else if(input.type=='Normal'){
        
        qry = `select a.student_id, c.section, d.standard, a.enroll_number,prev_class,
              first_name, middle_name, last_name, date_format(withdraw_date, '%d/%m/%Y') as dol,
              date_format(doa, '%d/%m/%y') as dateOfAdmission, withdraw_remarks  as remarks, type
              from student_master a
              join student_current_standing b on (a.student_id = b.student_id  and a.current_session_id =${req.cookies.session_id})
              join section_master c on b.section_id = c.section_id
              join standard_master d on c.standard_id = d.standard_id
              left join school_leaving e on a.student_id = e.student_id 
              where (withdraw='N' || withdraw_session > ${req.cookies.session_id}) ${condition}
              and b.session_id= ${req.cookies.session_id}
              order by first_name`;

      }          

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
