var express = require('express');
var router = express.Router();
var pool = require('../db');

/*****************************************************subjects************************************************/

/* Read Sections listing. */
router.get('/students/:standard_id/:section_id/:second_section_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select a.student_id,first_name, middle_name, last_name,roll_number,
                enroll_number, b.section_id     
                from student_master a
                join student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${req.cookies.session_id})
                join section_master c on b.section_id = c.section_id
                join standard_master d on c.standard_id = d.standard_id
                where c.standard_id = ${req.params.standard_id}
                and c.section_id = ${req.params.section_id}
                and (a.withdraw='N' || a.withdraw_session > ${req.cookies.session_id})
                and b.session_id=${req.cookies.session_id}
                order by 2, 3, 4`;

     console.log(qry)
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Free students : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.status = 's';
            data.freeStudents = result;
        }
     
     });

     var qry = `select a.student_id,first_name, middle_name, last_name,roll_number,
                enroll_number, b.section_id     
                from student_master a
                join student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${req.cookies.session_id})
                join section_master c on b.section_id = c.section_id
                join standard_master d on c.standard_id = d.standard_id
                where c.standard_id = ${req.params.standard_id}
                and c.section_id = ${req.params.second_section_id}
                and (a.withdraw='N' || a.withdraw_session > ${req.cookies.session_id})
                and b.session_id=${req.cookies.session_id}
                order by 2, 3, 4`;
     console.log(qry)
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Assigned students : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.assignedStudents = result;
            res.send(data)
        }
     
     });
       
  });

});

/*Assign Sections*/

router.post('/assign-students', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

        var data = {}

         var sql = ''
        input.students.map(c=>{
          var qry = `Update student_current_standing set section_id =${input.section_id} where student_id=${c.student_id};`;
          if(sql==''){
            sql = qry;
          }else{
            sql = sql + qry;
          }
        })   

        connection.query(sql, function(err, rows)
        {
  
          if(err){
           console.log("Error assigning students : %s ",err );
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

router.post('/free-up-students', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
      var data = {}
      
      var sql = ''
      input.students.map(c=>{
        var qry = `Update student_current_standing set section_id =${input.section_id} where student_id=${c.student_id};`;
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

});


module.exports = router;
