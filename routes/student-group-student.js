var express = require('express');
var router = express.Router();
var pool = require('../db');


/* Read Course listing. */
router.get('/:standard_id/:section_id', function(req, res, next) {

  //req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select a.group_id,group_name, group_detail 
                from student_group a
                where standard_id=${req.params.standard_id} 
                and a.section_id=${req.params.section_id}
                and (group_session<= ${req.cookies.session_id} or group_session is null or group_session=0)
                and a.group_id not in(select group_id from 
                            student_group_hide_map 
                            where hidden_session = ${req.cookies.session_id}
                            and section_id = ${req.params.section_id})
                order by group_name`;

     pool.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading House : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
          data.status = 's';
          data.studentGroups = result;
          res.send(data)
        }
     
     });
       
  //});

});

/* Add House listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  //req.getConnection(function(err,connection){

        var today = new Date();

        var data = {}

        var values = {
            house_name    : input.house,
            detail    : '',
        };

        pool.query("INSERT INTO house_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting House : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
          }else{
              data.status = 's';
              data.id = rows.insertId;
              res.send(data)
          }
          
        });


   //});

});


/* Edit House listing. */
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var id = input.id;

  //req.getConnection(function(err,connection){
        var data = {}

        var values = {
            house_name    : input.house,
        };
        
        pool.query("UPDATE house_master set ? WHERE group_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting House  : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
          }else{
              data.status = 's';
              res.send(data)
          }
          
        });
   //});

});

/* Delete House listing. */
router.get('/delete/:id', function(req, res, next) {

  var id = req.params.id;

  //req.getConnection(function(err,connection){
        var data = {}

        pool.query("DELETE from house_master WHERE group_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting House : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
          }else{
              data.status = 's';
              res.send(data)
          }
          
        });
  //});

});


/*****************************************************students************************************************/

/* Read Students listing. */
router.get('/students/:group_id/:standard_id/:section_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select a.student_id,first_name, middle_name, last_name,roll_number,
                enroll_number, group_id     
                from student_master a
                join student_current_standing b on (a.student_id = b.student_id and a.current_session_id =${req.cookies.session_id})
                join section_master c on b.section_id = c.section_id
                join standard_master d on c.standard_id = d.standard_id
                where d.standard_id = ${req.params.standard_id}
                and c.section_id = ${req.params.section_id}
                and (a.withdraw='N' || a.withdraw_session > ${req.cookies.session_id})
                and (b.group_id is null or b.group_id=-1)  
                and b.session_id= ${req.cookies.session_id}
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
                enroll_number, group_id     
                from student_master a
                join student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${req.cookies.session_id})
                join section_master c on b.section_id = c.section_id
                join standard_master d on c.standard_id = d.standard_id 
                where d.standard_id = ${req.params.standard_id}
                and c.section_id = ${req.params.section_id}
                and (a.withdraw='N' || a.withdraw_session > ${req.cookies.session_id})
                and b.session_id= ${req.cookies.session_id}
                and b.group_id=${req.params.group_id}
                order by 2, 3, 4`;
     console.log(qry)
     connection.query(qry,[req.params.id],function(err,result)     {
            
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

/*Assign Students*/

router.post('/assign-students', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
        var data = {}

        var values = ''
        input.students.map(c=>{
          if(values==''){
            values = c.student_id
          }else{
            values = values +","+c.student_id
          }
        })       
       
        var sql = `Update student_current_standing set group_id = ${input.group_id}
                   where student_id in (${values})`;

        connection.query(sql, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting student group map : %s ",err );
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

// free students
router.post('/free-up-student', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
      var data = {}
      
      var values = ''
      input.students.map(c=>{
        if(values==''){
          values = c.student_id
        }else{
          values = values +","+c.student_id
        }
      })        

      var sql = `Update student_current_standing set group_id = null
                 where student_id in (${values})`;
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


/* Read Students listing. */
router.get('/students_by_house/:group_id', function(req, res, next) {

  // req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select first_name,middle_name,last_name,enroll_number,a.student_id,reg_number,
                concat(first_name,' ',middle_name, ' ' ,last_name) as name,
                concat(standard,' ',section) as standard, f_name,mobile
                from student_master a
                JOIN parent_master b on (a.student_id=b.student_id  and b.current_session_id = ${req.cookies.session_id})
                JOIN student_current_standing c on (a.student_id = c.student_id and a.current_session_id = ${req.cookies.session_id})
                JOIN section_master d on c.section_id = d.section_id
                JOIN standard_master e on d.standard_id = e.standard_id 
                where c.group_id=${req.params.group_id}
                and (a.withdraw='N' || a.withdraw_session > ${req.cookies.session_id})
                and c.session_id= ${req.cookies.session_id}
                order by d.section_id, 1,2,3`;

     console.log(qry)
     pool.query(qry,function(err,result){
            
        if(err){
           console.log("Error reading students by house: ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.status = 's';
            data.students = result;
            res.send(data)
        }
     
     });

  // });

});


router.post('/update-captain/:group_id/:captain_id/:vice_captain_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var id = input.id;

  //req.getConnection(function(err,connection){
        var data = {}

        var values = {
            house_name    : input.house,
        };
        var qry = `update house_master set captain=${req.params.captain_id}, vice_captain=${req.params.vice_captain_id}
                   where group_id=${req.params.group_id}`;

        pool.query(qry, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting House  : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
          }else{
              data.status = 's';
              res.send(data)
          }
          
        });
   //});

});

router.get('/students_by_house_details/:group_id', function(req, res, next) {

  // req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select first_name,middle_name,last_name,enroll_number,a.student_id,reg_number,
                concat(first_name,' ',middle_name, ' ' ,last_name) as name,
                concat(standard,' ',section) as standard, f_name,mobile
                from student_master a
                JOIN parent_master b on (a.student_id=b.student_id  and b.current_session_id = ${req.cookies.session_id})
                JOIN student_current_standing c on (a.student_id = c.student_id and a.current_session_id = ${req.cookies.session_id})
                JOIN section_master d on c.section_id = d.section_id
                JOIN standard_master e on d.standard_id = e.standard_id 
                where c.group_id=${req.params.group_id}
                and (a.withdraw='N' || a.withdraw_session > ${req.cookies.session_id})
                and c.session_id= ${req.cookies.session_id}
                order by d.section_id, 1,2,3`;

     console.log(qry)
     pool.query(qry,function(err,result){
            
        if(err){
           console.log("Error reading students by house: ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.status = 's';
            data.students = result;
            res.send(data)
        }
     
     });

  // });

});
module.exports = router;
