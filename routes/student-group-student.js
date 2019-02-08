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
           console.log("Error reading StudentGroup : %s ",err );
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

/* Add StudentGroup listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  //req.getConnection(function(err,connection){

        var today = new Date();

        var data = {}

        var values = input
        values.creation_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        values.group_session = req.cookies.session_id;
        values.modified_by = req.cookies.user;

        pool.query("INSERT INTO student_group set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting Student Group : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
          }else{
              data.status = 's';
              data.group_id = rows.insertId;
              res.send(data)
          }
          
        });


   //});

});


/* Edit StudentGroup listing. */
router.post('/edit/:group_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  //req.getConnection(function(err,connection){
        var data = {}

        var values = input
        values.modified_by = req.cookies.user;
        
        pool.query("UPDATE student_group set ? WHERE group_id = ?",[values,req.params.group_id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting Student Group  : %s ",err );
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

/* Delete StudentGroup listing. */
router.get('/delete/student-group/:group_id', function(req, res, next) {
console.log('calling me')

  //req.getConnection(function(err,connection){
        var data = {}

        pool.query("DELETE from student_group WHERE group_id = ?",[req.params.group_id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting Student Group : %s ",err );
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
     var qry = `select a.student_id,first_name, middle_name, last_name,
                enroll_number, group_id,roll_number     
                from student_master a
                join student_current_standing b on (a.student_id = b.student_id and a.current_session_id=${req.cookies.session_id})
                join section_master c on b.section_id = c.section_id
                join standard_master d on c.standard_id = d.standard_id
                where c.standard_id = ${req.params.standard_id}         
                and c.section_id = ${req.params.section_id}
                and b.session_id=${req.cookies.session_id}
                and (a.withdraw='N' || a.withdraw_session > ${req.cookies.session_id})
                and group_id is null
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

     var qry = `select a.student_id,first_name, middle_name, last_name,
                enroll_number, group_id,roll_number     
                from student_master a
                join student_current_standing b on (a.student_id = b.student_id and a.current_session_id=${req.cookies.session_id})
                join section_master c on b.section_id = c.section_id
                join standard_master d on c.standard_id = d.standard_id
                where c.standard_id = ${req.params.standard_id}         
                and c.section_id = ${req.params.section_id}
                and b.session_id=${req.cookies.session_id}
                and (a.withdraw='N' || a.withdraw_session > ${req.cookies.session_id})
                and group_id is not null
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



/*****************************************************subjects************************************************/

/* Read Subjects listing. */
router.get('/subjects/:group_id/:standard_id/:section_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select a.subject_id, subject_name, subject_code, subject_short_name
                from subject_master a,subject_class_map b
                where a.subject_id=b.subject_id
                and b.standard_id=${req.params.standard_id}
                and a.subject_id not in (select c.subject_id from group_subject_map c 
                where group_id=${req.params.group_id} and c.session_id = ${req.cookies.session_id}) 
                order by 2`;

     console.log(qry)
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Free subjects : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.status = 's';
            data.freeSubjects = result;
        }
     
     });

     var qry = `select a.subject_id, subject_name, subject_code,
                subject_short_name,b.order_no
                from subject_master a,group_subject_map b
                where a.subject_id=b.subject_id 
                and b.group_id=${req.params.group_id}
                and b.session_id = ${req.cookies.session_id}
                order by 2`;
     console.log(qry)
     connection.query(qry,[req.params.id],function(err,result)     {
            
        if(err){
           console.log("Error reading Assigned subjects : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.assignedSubjects = result;
            res.send(data)
        }
     
     });
       
  });

});

/*Assign Subjects*/

router.post('/assign-subjects', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

        var today = new Date();
        var dt = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        var data = {}

         var values = [];
        input.subjects.map(c=>{
          values.push([c.subject_id,input.group_id,req.cookies.session_id,dt,req.cookies.user])
        })       

       console.log(values)
       
        var sql = `insert into group_subject_map(subject_id,group_id,session_id, creation_date, modified_by) values ?`;

        connection.query(sql,[values], function(err, rows)
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

// free subjects
router.post('/save-order-number', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
      var data = {}
      
      var sql = ''
      input.subjects.map(c=>{
        var qry = `update group_subject_map set order_no=${c.order_no}
                   where subject_id=${c.subject_id} 
                   and group_id=${input.group_id}
                   and session_id =${req.cookies.session_id};`;
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
          console.log("Error updating order_no : %s ",err );
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

router.post('/free-up-subject', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
      var data = {}
      
      var sql = ''
      input.subjects.map(c=>{
        var qry = `delete from group_subject_map where subject_id=${c.subject_id} and group_id=${input.group_id} and session_id=${req.cookies.session_id};`;
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
          console.log("Error in free subjects : %s ",err );
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


/* copy order number */

router.post('/copy-order-number/:group_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  //req.getConnection(function(err,connection){
        var data = {}

        var qry = `select a.subject_id, subject_name, subject_code,
                   subject_short_name,b.order_no
                   from subject_master a,group_subject_map b
                   where a.subject_id=b.subject_id 
                   and b.group_id=${req.params.group_id}
                   and b.session_id =${req.cookies.session_id}
                   order by 2`;
        console.log(qry)           

        pool.query(qry, function(err, result)
        {
  
          if(err){
           console.log("Error reading subject order number  : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
          }else{
              data.status = 's';
              data.subjects = result;
              res.send(data)
          }
          
        });
   //});

});

router.get('/student-group-details/read/:group_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry1 = `select a.student_id,concat(first_name,' ', middle_name,' ', last_name) as name,
                enroll_number, group_id,roll_number 
                from student_master a
                join student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${req.cookies.session_id})
                join section_master c on b.section_id = c.section_id
                join standard_master d on c.standard_id = d.standard_id
                where b.group_id = ${req.params.group_id}
                and b.session_id= ${req.cookies.session_id}
                and (a.withdraw='N' or a.withdraw_session > ${req.cookies.session_id})
                order by first_name, middle_name, last_name, enroll_number`;

      var qry2 = `select a.subject_id, subject_name, subject_code,subject_short_name,b.order_no
                  from subject_master a,group_subject_map b
                  where a.subject_id=b.subject_id 
                  and b.group_id= ${req.params.group_id}
                  and b.session_id= ${req.cookies.session_id}
                  order by 2`;          
    
      var qry = qry1+';'+qry2;
     console.log(qry)
     connection.query(qry,function(err,result){
            
        if(err){
           console.log("Error reading group details: ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.status = 's';
            data.students = result[0];
            data.subjects = result[1];
            res.send(data)
        }
     
     });

   });

});

router.get('/hide-group/:group_id/:section_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select count(group_id) as total 
                from student_current_standing 
                where group_id = ${req.params.group_id}
                and section_id = ${req.params.section_id}
                and session_id = ${req.cookies.session_id}`;

     console.log(qry)
     connection.query(qry,function(err,result){
            
        if(err){
           console.log("Error hidding group: ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            console.log(result[0].total)
            if(result[0].total>0){
              data.info ='This group has assigned students in current session'
              data.status = 's';
              res.send(data)
            }else{
              var today = new Date();
              var dt= today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              var qry1 = `insert into student_group_hide_map(group_id, section_id, hidden_session, creation_date, modified_by)
                          values(${req.params.group_id}, ${req.params.section_id}, ${req.cookies.session_id}, '${dt}', '${req.cookies.user}')`;
              console.log(qry1)
              connection.query(qry1,function(err,result){
            
                if(err){
                   console.log("Error hidding group: ",err );
                   data.status = 'e';
                   data.error = err
                   data.messaage = err.sqlMessage
                }else{
                    data.status = 's';
                    data.info = ''
                    res.send(data)
                }
             
              });
            }
        }
     
     });

   });

});


router.get('/hidden-group/read-groups/:section_id', function(req, res, next) {

  //req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select  a.group_id, group_name, group_detail
                from student_group_hide_map a
                join student_group b on a.group_id = b.group_id
                where a.section_id=${req.params.section_id}
                and hidden_session<= ${req.cookies.session_id}
                order by group_name`;
     
     console.log(qry)

     pool.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading hidden group : %s ",err );
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

router.get('/delete-hidden-group/delete/:group_id/:section_id', function(req, res, next) {

  //req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `delete from student_group_hide_map 
                where section_id=${req.params.section_id} 
                and group_id=${req.params.group_id}`;
     
     console.log(qry)

     pool.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error deleting hidden group : %s ",err );
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


module.exports = router;
