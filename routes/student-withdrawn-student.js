var express = require('express');
var router = express.Router();
var pool = require('../db');

/*****************************************************subjects************************************************/

/* Read Sections listing. */
router.post('/students', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
       
     var data = {}

     var condition = "";

      if(input.standard_id == -1 && input.section_id==-1)   condition = "";
      if(input.standard_id != -1 && input.section_id==-1)   condition = ` and d.standard_id =${input.standard_id}`;
      if(input.standard_id != -1 && input.section_id!=-1)   condition = ` and d.standard_id=${input.standard_id} and c.section_id=${input.section_id}`;

      var qry =`select a.student_id, c.section_id, section,
               d.standard, a.enroll_number,prev_class, first_name, 
               middle_name, last_name, date_format(withdraw_date, '%d/%m/%Y') as dol,
               date_format(doa, '%d/%m/%y') as dateOfAdmission, withdraw_remarks  as remarks,tc_no
               from student_master a
               join student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${req.cookies.session_id})
               join section_master c on b.section_id = c.section_id
               join standard_master d on c.standard_id = d.standard_id
               where withdraw_date between '${input.fdt}' and '${input.tdt}'
               and withdraw ='Y' 
               ${condition}
               and b.session_id=${req.cookies.session_id}
               order by first_name, middle_name, last_name`;

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

/*Assign Sections*/

router.post('/cancle-withdraw-students', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

      var today = new Date();
      var dt =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      var data = {}
      
      var sql = `update student_master set withdraw='N', withdraw_session = null , withdraw_date=null , 
                 withdraw_remarks='' , modification_date='${dt}', 
                 modified_by='${req.cookies.user}'
                 where student_id =${input.student_id}
                 and current_session_id = withdraw_session`;

      
      console.log(sql);

      connection.query(sql, function(err, rows)
      {

        if(err){
          console.log("Error in cancle withdraw : %s ",err );
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
