var express = require('express');
var router = express.Router();
var pool = require('../db');

/*****************************************************subjects************************************************/

router.get('/standard', function(req, res, next) {

  req.getConnection(function(err,connection){
      var user=req.cookies.user 
      var data = {}
     console.log("+++++")
     console.log(req.cookies.role)

      var condition="";
      if(req.cookies.role== "TEACHER" || req.cookies.role=="Class Teacher"){
           condition =`where standard_id=(select standard_id from section_master 
              where teacher_id=(select emp_id from employee where employee_id='${user}')) `;
      }
      var qry = `select standard_id,standard 
                from standard_master 
                ${condition} `

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading standards : %s ",err );
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

router.get('/section', function(req, res, next) {

  req.getConnection(function(err,connection){
      var user=req.cookies.user 
      var session_id=req.cookies.session_id 
      var data = {}
     console.log("+++++")
     console.log(req.cookies.role)

      var condition="";
      if(req.cookies.role== "TEACHER" || req.cookies.role=="Class Teacher"){
           condition =` where d.section_id=(select section_id from section_master 
           where teacher_id=(select emp_id from employee where employee_id='${user}')) `;
      }
      var qry = `select  a.section_id, section, b.standard_id, b.standard, d.room as room_no,
                concat(first_name,' ',middle_name,' ',last_name) as class_teacher
                from section_master  a
                LEFT JOIN class_teacher_section d on (a.section_id=d.section_id and d.session_id = ${session_id})
                LEFT JOIN standard_master b on a.standard_id = b.standard_id
                LEFT JOIN employee c on d.class_teacher = c.emp_id
                 ${condition} 
                order by b.standard_id, section_id `

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading standards : %s ",err );
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

router.post('/create_certificate', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  req.getConnection(function(err,connection){
    var data = {}

      var values = {
        type    : input.type,
        student_id    : input.student_id,
        examination_appeared    : input.examination_appeared,
        leaving_date    : input.leaving_date,
        conduct    : input.conduct,
        attendance    : input.attendance,
        faculty_relationship    : input.faculty_relationship,
        peer_group_relationship    : input.peer_group_relationship,
        class_responsibility    : input.class_responsibility,
        house_responsibility    : input.house_responsibility,
        attitude    : input.attitude,
        punctuality    : input.punctuality,
        remarks    : input.remarks,
        modified_by    : req.cookies.user,
        creation_date    : formatted,
      };
      if(input.examination_appeared =='TEN') values.examination_appeared ='ICSE';

      if(input.examination_appeared =='TWELVE') values.examination_appeared ='ISC - ' + input.isc_stream;

      var query = connection.query("INSERT INTO school_leaving set ? ",values, function(err, rows)
      {

        if(err){
         console.log("Error Creating Certificate : %s ",err );
         data.status = 'e';

       }else{
            data.status = 's';
            data.id = rows.insertId;
            res.send(JSON.stringify(data))
        }
        
      });
   });

});

/*update-login-status*/

router.post('/print-feed-back-form', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var student_id = input.student_id;
  console.log(student_id)

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
                and d.session_id=${req.cookies.session_id} `;
      
      console.log(sql);
      /*group by a.student_id*/

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


/*Print Feedback */

router.get('/print_feed_back_form/:student_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var student_id = req.params.student_id;
  console.log(student_id)

  req.getConnection(function(err,connection){

      var today = new Date();
      var dt =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      var data = {}
      
      var sql =`select distinct a.student_id, concat(a.first_name,' ',a.middle_name,' ',a.last_name) as name,
                f_name, standard, section,a.roll_number,
                date_format(a.dob,'%d/%m/%Y') as dob,
                date_format(doa, '%d/%m/%Y') as doa,
                admission_for_class,a.enroll_number,house_name 
                from student_master a 
                join student_current_standing b on (a.student_id=b.student_id and a.current_session_id =${req.cookies.session_id})
                join section_master e on b.section_id = e.section_id
                join standard_master f on e.standard_id = f.standard_id
                left join house_master c on b.house_id = c.house_id 
                join parent_master d on (a.student_id = d.student_id and d.current_session_id =${req.cookies.session_id})
                where a.student_id in (${student_id})
                and b.session_id=${req.cookies.session_id}
                order by a.roll_number `;
      
      console.log(sql);
      /*group by a.student_id*/

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

/*Print Certificate */

router.get('/print_certificate/:student_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var student_id = req.params.student_id;
  console.log(student_id)

  req.getConnection(function(err,connection){

      var today = new Date();
      var dt =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      var data = {}
      
      /*var sql =`select distinct a.student_id, concat(b.first_name,' ',b.middle_name,' ',b.last_name) as name,
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
                where a.student_id in (${student_id})
                and d.session_id=${req.cookies.session_id} `;*/
      var sql= `select distinct a.student_id, concat(b.first_name,' ',b.middle_name,' ',b.last_name) as name,f_name,
                r_no, date_format(b.dob,'%d/%m/%Y') as dob, 
                date_format(leaving_date, '%d/%m/%Y') as dol, house_name, 
                date_format(b.doa, '%d/%m/%Y') as doa,
                g.standard,section,
                b.admission_for_class, 
                type,examination_appeared, b.enroll_number,punctuality,
                conduct, attendance, faculty_relationship, peer_group_relationship,
                class_responsibility, house_responsibility, attitude,remarks
                from school_leaving a 
                join student_master b on (a.student_id=b.student_id and b.current_session_id=${req.cookies.session_id})
                join student_current_standing d on (a.student_id = d.student_id and d.session_id = ${req.cookies.session_id})
                join parent_master e on (a.student_id = e.student_id  and e.current_session_id=${req.cookies.session_id})
                join section_master f on d.section_id = f.section_id
                join standard_master g on f.standard_id = g.standard_id
                join house_master c on d.house_id = c.house_id
                where a.student_id in (${student_id})
                and b.current_session_id= ${req.cookies.session_id}`;
      
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

/* Delete Student Certificte. */
router.get('/delete_student_certificte/:student_id', function(req, res, next) {

  var student_id = req.params.student_id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from school_leaving WHERE student_id = ?",[student_id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting student certificte : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});


module.exports = router;
