var express = require('express');
var router = express.Router();
var pool = require('../db');

/*****************************************************subjects************************************************/

/* Read Sections listing. */
router.post('/students', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
       
     var data = {}

      var qry =`select a.student_id,a.enroll_number, roll_number,d.enroll_number as login, d.is_active,
                concat(first_name,' ',middle_name,' ',last_name) as student,f_name
                from student_master a
                join student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${req.cookies.session_id})
                join section_master c on b.section_id = c.section_id
                join parent_master e on (a.student_id = e.student_id  and e.current_session_id = ${req.cookies.session_id})
                left join student_login  d on a.enroll_number=d.enroll_number             
                where c.standard_id=${input.standard_id}
                and c.section_id=${input.section_id}
                and (a.withdraw='N' || a.withdraw_session > ${req.cookies.session_id})
                and b.session_id=${req.cookies.session_id}
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

router.post('/update-login-status', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log(input);

  req.getConnection(function(err,connection){

      var today = new Date();
      var dt =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      var data = {}
      var sql = '';

      input.map(c=>{
        if(sql == ''){
          sql = `update student_login set is_active='${c.is_active}'
                 where enroll_number='${c.enroll_number}' `;
        }else{
          sql = sql+';'+`update student_login set is_active='${c.is_active}'
                 where enroll_number='${c.enroll_number}' `;
        }
      })  
      
      
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

router.post('/print-login-slip', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

      var data = {}
      
      var sql = `select a.enroll_number, roll_number,d.enroll_number as login, standard, section,
                 concat(first_name,' ',middle_name,' ',last_name) as student,f_name,password,parent_password
                 from student_master a
                 join student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${req.cookies.session_id})
                 join section_master c on b.section_id = c.section_id
                 join standard_master f on c.standard_id = f.standard_id
                 join parent_master e on (a.student_id = e.student_id and e.current_session_id = ${req.cookies.session_id})
                 left join student_login  d on a.enroll_number=d.enroll_number             
                 where c.standard_id = ${input.standard_id}
                 and c.section_id = ${input.section_id}
                 and (a.withdraw='N' or a.withdraw_session > ${req.cookies.session_id})
                 and b.session_id = ${req.cookies.session_id}
                 and a.student_id = ${input.student_id}
                 order by first_name,middle_name,last_name`;
      
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
          data.students = rows;
          res.send(data)
        }
        
      });


   });

});

router.post('/print-login-slip-all', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

      var data = {}
      
      var sql = `select a.enroll_number, roll_number,d.enroll_number as login, standard, section,
                 concat(first_name,' ',middle_name,' ',last_name) as student,f_name,password,parent_password
                 from student_master a
                 join student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${req.cookies.session_id})
                 join section_master c on b.section_id = c.section_id
                 join standard_master f on c.standard_id = f.standard_id
                 join parent_master e on (a.student_id = e.student_id and e.current_session_id = ${req.cookies.session_id})
                 left join student_login  d on a.enroll_number=d.enroll_number             
                 where c.standard_id = ${input.standard_id}
                 and c.section_id = ${input.section_id}
                 and (a.withdraw='N' or a.withdraw_session > ${req.cookies.session_id})
                 and b.session_id = ${req.cookies.session_id}
                 order by first_name,middle_name,last_name`;
      
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
          data.students = rows;
          res.send(data)
        }
        
      });


   });

});

router.post('/reset-password', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

      var data = {}
      

      var qry = `(select date_format(dob, "%d/%m/%Y")as dob from student_master a where enroll_number='${input.enroll_number}'
                 and current_session_id =${req.cookies.session_id})`;

      var sql = `update student_login set password=${qry}, parent_password='123456'
                 where  enroll_number='${input.enroll_number}'`;
      
      console.log(sql);

      connection.query(sql, function(err, rows)
      {

        if(err){
          console.log("Error in updating password : %s ",err );
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

router.post('/generate-id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

      var today = new Date();
      var dt =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      var data = {}

      var sql = `select enroll_number, date_format(dob, '%d/%m/%Y')as dob 
                 from student_master a
                 join student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${req.cookies.session_id})
                 join section_master c on b.section_id = c.section_id            
                 where c.standard_id=${input.standard_id}
                 and c.section_id=${input.section_id}
                 and (a.withdraw='N' || a.withdraw_session > ${req.cookies.session_id})
                 and b.session_id=(select session_id from session_master where session_id = ${req.cookies.session_id})
                 and a.enroll_number not in(select enroll_number from student_login)
                 order by 1`;
      
      console.log(sql);

      connection.query(sql, function(err, result)
      {

        if(err){
          console.log("Error in reading students : %s ",err );
          data.status = 'e';
          data.error = err
          data.messaage = err.sqlMessage
        }else{

           var sql1 = ''
           result.map(c=>{

              var qry = `insert into student_login(enroll_number, password, parent_password, is_active, creation_date, modified_by)
                         values('${c.enroll_number}', '${c.dob}', '123456', 'Y', ${dt}, '${req.cookies.session_id}');`;

              if(sql1==''){
                sql1 = qry;
              }else{
                sql1 = sql1 + qry;
              }
           })   
             
           console.log(sql1)  

           connection.query(sql1, function(err, rows)
           {

              if(err){
                console.log("Error in generating ID : %s ",err );
                data.status = 'e';
                data.error = err
                data.messaage = err.sqlMessage
              }else{
                data.status = 's';
                res.send(data)
              }
              
           });
        }
        
      });


   });

});


module.exports = router;
