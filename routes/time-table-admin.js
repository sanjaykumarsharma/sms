var express = require('express');
var router = express.Router();
var pool = require('../db');

router.get('/read-init-class-report', function(req, res, next) {

     var data = {}

      var condition="";
      if(req.cookies.role == "TEACHER"){
        condition = ` and employee_id = ${req.cookies.role} `;
      }

      var teachers = `select emp_id, concat(first_name,' ',middle_name,' ',last_name)as name 
                 from employee
                 where emp_type_id!=5 and is_active='Y' ${condition} 
                 order by name`;     

      var days = `select day_id,day_name 
                 from day_master 
                 where session_id=${req.cookies.session_id} `;   

      var periods = `select period_id, period_name,
                     concat('(',time_format(start_time, '%H:%i'),' - ',time_format(end_time, '%H:%i'),')' ) as period_time,
                     is_break
                     from period_master`;
           

      var rooms = `select room_id,room_name from room_master`;    

      var standards = `select standard_id,standard from standard_master`;    

      var sections = `select  section_id, section, standard_id
                      from section_master  a
                      order by standard_id, section_id`;

      var qry = teachers+';'+days+';'+periods+';'+rooms+';'+standards+';'+sections;

      console.log(qry);

     pool.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading teachers : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
          data.status = 's';
          data.teachers = result[0];
          data.days = result[1];
          data.periods = result[2];
          data.rooms = result[3];
          data.standards = result[4];
          data.sections = result[5];
          res.send(data)
        }
     
     });

});


router.get('/read-periods-class-report/:section_id', function(req, res, next) {

     var data = {}

      var time_table  = `select distinct a.period_id,a.day_id,a.room_id,a.subject_id,subject_short_name,period_type,d.day_name,e.room_name,
                         concat(standard,'  ',section) as standard,g.standard_id,a.section_id,a.teacher_id,h.short_name 
                         from time_table a
                         left join subject_master b on(a.subject_id = b.subject_id)
                         left join period_master c on(a.period_id = c.period_id)
                         left join day_master d on(a.day_id=d.day_id)
                         left join room_master e on (a.room_id= e.room_id)
                         left join section_master f on (a.section_id= f.section_id)
                         left join standard_master g on (f.standard_id= g.standard_id)
                         left join employee h on (a.teacher_id=h.emp_id)
                         where a.section_id=${req.params.section_id}
                         and a.session_id=${req.cookies.session_id}
                         order by a.day_id`;

      console.log(time_table);

     pool.query(time_table,function(err,result)     {
            
        if(err){
           console.log("Error reading time_table : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
          data.status = 's';
          data.time_table = result;
          res.send(data)
        }
     
     });

});


// Room Report

router.get('/read-init-room-report', function(req, res, next) {

     var data = {}

      var condition="";
      if(req.cookies.role == "TEACHER"){
        condition = ` and employee_id = ${req.cookies.role} `;
      }

      var teachers = `select emp_id, concat(first_name,' ',middle_name,' ',last_name)as name 
                 from employee
                 where emp_type_id!=5 and is_active='Y' ${condition} 
                 order by name`;     

      var days = `select day_id,day_name 
                 from day_master 
                 where session_id=${req.cookies.session_id} `;   

      var periods = `select period_id, period_name,
                     concat('(',time_format(start_time, '%H:%i'),' - ',time_format(end_time, '%H:%i'),')' ) as period_time,
                     is_break
                     from period_master`;
           

      var rooms = `select room_id,room_name from room_master`;    

      var standards = `select standard_id,standard from standard_master`;    

      var sections = `select  section_id, section, standard_id
                      from section_master  a
                      order by standard_id, section_id`;

      var qry = teachers+';'+days+';'+periods+';'+rooms+';'+standards+';'+sections;

      console.log(qry);

     pool.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading teachers : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
          data.status = 's';
          data.teachers = result[0];
          data.days = result[1];
          data.periods = result[2];
          data.rooms = result[3];
          data.standards = result[4];
          data.sections = result[5];
          res.send(data)
        }
     
     });

});


router.get('/read-periods-room-report/:room_id', function(req, res, next) {

     var data = {}

      var time_table  = `select a.period_id,a.day_id,a.room_id,a.subject_id,subject_short_name,period_type,d.day_name,e.room_name,
                         concat(standard,'  ',section) as standard,g.standard_id,a.section_id,a.teacher_id,h.short_name 
                         from time_table a
                         left join subject_master b on(a.subject_id = b.subject_id)
                         left join period_master c on(a.period_id = c.period_id)
                         left join day_master d on(a.day_id=d.day_id)
                         left join room_master e on (a.room_id= e.room_id)
                         left join section_master f on (a.section_id= f.section_id)
                         left join standard_master g on (f.standard_id= g.standard_id)
                         left join employee h on (a.teacher_id=h.emp_id)
                         where a.room_id=${req.params.room_id}
                         and a.session_id=${req.cookies.session_id}
                         order by a.day_id`;

      console.log(time_table);

     pool.query(time_table,function(err,result)     {
            
        if(err){
           console.log("Error reading time_table : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
          data.status = 's';
          data.time_table = result;
          res.send(data)
        }
     
     });

});


// Teacher Report

router.get('/read-init-teacher-report', function(req, res, next) {

     var data = {}

      var condition="";
      if(req.cookies.role == "TEACHER"){
        condition = ` and employee_id = ${req.cookies.role} `;
      }

      var teachers = `select emp_id, concat(first_name,' ',middle_name,' ',last_name)as name 
                 from employee
                 where emp_type_id!=5 and is_active='Y' ${condition} 
                 order by name`;     

      var days = `select day_id,day_name 
                 from day_master 
                 where session_id=${req.cookies.session_id} `;   

      var periods = `select period_id, period_name,
                     concat('(',time_format(start_time, '%H:%i'),' - ',time_format(end_time, '%H:%i'),')' ) as period_time,
                     is_break
                     from period_master`;
           

      var rooms = `select room_id,room_name from room_master`;    

      var standards = `select standard_id,standard from standard_master`;    

      var sections = `select  section_id, section, standard_id
                      from section_master  a
                      order by standard_id, section_id`;

      var qry = teachers+';'+days+';'+periods+';'+rooms+';'+standards+';'+sections;

      console.log(qry);

     pool.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading teachers : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
          data.status = 's';
          data.teachers = result[0];
          data.days = result[1];
          data.periods = result[2];
          data.rooms = result[3];
          data.standards = result[4];
          data.sections = result[5];
          res.send(data)
        }
     
     });

});


router.get('/read-periods-teacher-report/', function(req, res, next) {

     var data = {}

      var time_table  = `select distinct c.period_name,a.day_id,subject_short_name,period_type,d.day_name,
                         concat(standard,'  ',section) as standard,a.teacher_id,
                         concat(h.first_name,' ',middle_name,' ',last_name) as teacher 
                         from time_table a
                         left join subject_master b on(a.subject_id = b.subject_id)
                         left join period_master c on(a.period_id = c.period_id)
                         left join day_master d on(a.day_id=d.day_id)
                         left join room_master e on (a.room_id= e.room_id)
                         left join section_master f on (a.section_id= f.section_id)
                         left join standard_master g on (f.standard_id= g.standard_id)
                         left join employee h on (a.teacher_id=h.emp_id)
                         where a.session_id=${req.cookies.session_id}
                         order by a.teacher_id,a.day_id`;

      console.log(time_table);

     pool.query(time_table,function(err,result)     {
            
        if(err){
           console.log("Error reading time_table : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
          data.status = 's';
          // data.time_table = result;

          var prev_teacher_id="";
          var prev_day_id;
          // $prev_teacher = "";
          var teacher=0
          var error_val=0
          var obj={}

          var newData = []
          
          result.map(r=>{
               error_val=1;
               if(r.teacher_id!=prev_teacher_id){ // CONDITION FOR TEACHER CHANGE
                    if(teacher==2){
                       obj["d"+prev_day_id]= prev_subject;
                       newData.push(obj);
                     }
                     if(teacher==1){
                       var objChanged={};
                       objChanged['teacher']= prevr_teacher;
                       objChanged["d"+prev_day_id]= prev_subject;
                       newData.push(objChanged);
                     }
                     prev_teacher_id=r.teacher_id;
                     prevr_teacher= r.teacher;
                     prev_day_id=r.day_id;           
                     prev_subject= r.period_name + ". " +r.standard+ " : " +r.subject_short_name;
                     teacher=1;
               }else{                               // for same teacher
                    if(r.day_id!=prev_day_id ){
                      //picking old values
                      teacher=2;
                      obj['teacher']= r.teacher;
                      obj["d"+prev_day_id]= prev_subject;
                    
                      //picking new values
                      prev_teacher_id=r.teacher_id;
                      prev_day_id=r.day_id;            
                      prev_subject= r.period_name + ". " +r.standard+ " : " +r.subject_short_name;
                    }else if(r.day_id==prev_day_id){
                      prev_teacher_id=r.teacher_id;
                      prev_day_id=r.day_id;   
                      prev_subject= prev_subject+ r.period_name + ". " +r.standard+ " : " +r.subject_short_name;
                    }
               }
          }) 
          
          data.time_table = newData;
          res.send(data)
        }
     
     });

});



module.exports = router;
