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

router.post('/print-feed-back-form', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

      var today = new Date();
      var dt =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      var data = {}
      
      var sql = `select concat(b.first_name,' ',b.middle_name,' ',b.last_name) as name,
                f_name,r_no, date_format(b.dob,'%d/%m/%Y') as dob, 
                date_format(leaving_date, '%d/%m/%Y') as dol,
                date_format(h.doa, '%d/%m/%Y') as doa,
                g.standard,section,
                h.admission_for_class, type,examination_appeared, b.enroll_number,punctuality,
                conduct, attendance, faculty_relationship, peer_group_relationship,
                class_responsibility, house_responsibility, attitude,remarks,house_name 
                from school_leaving a 
                join student_master b on (a.student_id=b.student_id and b.current_session_id=${req.cookies.session_id})
                join student_current_standing d on (a.student_id = d.student_id and d.session_id = ${req.cookies.session_id})
                left join house_master e on d.house_id = e.house_id 
                join parent_master c on (a.student_id = c.student_id  and c.current_session_id=${req.cookies.session_id})
                join section_master f on d.section_id = f.section_id
                join standard_master g on f.standard_id = g.standard_id
                left join student_master h on (b.reference_enrol = h.enroll_number  and b.current_session_id= ${req.cookies.session_id})
                where a.student_id in (${input.student_id})
                and d.session_id=${req.cookies.session_id}
                group by a.student_id`;
      
      console.log(sql);

      connection.query(sql, function(err, result)
      {

        if(err){
          console.log("Error in updating status : %s ",err );
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


module.exports = router;
