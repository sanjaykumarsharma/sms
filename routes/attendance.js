var express = require('express');
var router = express.Router();
var multer = require('multer')



/* Search Student */

router.post('/read_attendance_data', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
     var standard_id=input.standard_id
     var section_id=input.section_id
     var start_date=input.start_date
     var session_id = req.cookies.session_id
     console.log(req.cookies.user)
    // var user = req.cookies.user
     var user = 'S0357'
     var event=''   
     var class_event=''   
     var force_class=''
  req.getConnection(function(err,connection){
       
    var data = {}

      var qury=`select event_name from new_event 
            where start_date<='${start_date}' and end_date>='${start_date}' and holiday='Y'`;
          connection.query(qury,function(err,result){
          if(err){
              return connection.rollback(function() {
              throw err;
              
             })
          }else{
            console.log("event" + result.length)
            if(result.length>0){
              event=result[0].event_name
              console.log("EVent")
              console.log(event)
            }
          }
      })

      var qury=`select event_name from class_holiday 
            where start_date<='${start_date}' and end_date>='${start_date}' and holiday='Y'
            and section_id=${section_id}`;
          connection.query(qury,function(err,result){
          if(err){
              return connection.rollback(function() {
              throw err;
              
             })
          }else{
             console.log("holiday" + result.length)
            if(result.length>0){
              class_event=result[0].event_name
              console.log("holiday")
              console.log(class_event)
            }
          }
      })

      var qury=`select event_name from class_holiday 
            where start_date<='${start_date}' and end_date>='${start_date}' and holiday='N'
            and section_id=${section_id}`;
          connection.query(qury,function(err,result){
          if(err){
              return connection.rollback(function() {
              throw err;
               
             })
          }else{
             console.log("force_class" + result.length)
          if(result.length>0){
             force_class=result[0].event_name
             console.log("force_class")
             console.log(force_class)
            }
          }
      })
       console.log("last Query")               
      if((event =="" && class_event=="") || (force_class!="")) {    
      var qry =`select a.student_id, concat(first_name, ' ', middle_name, ' ', last_name) as name, enroll_number, 
               roll_number,standard, section, coalesce(attendance, 1) as attendance
               from student_master a
               JOIN student_current_standing b on (a.student_id = b.student_id and a.current_session_id =${session_id})
               JOIN section_master d on b.section_id = d.section_id
               JOIN class_teacher_section i on(b.section_id = i.section_id and i.session_id = ${session_id} and i.class_teacher = (select emp_id from employee where employee_id = '${user}'))
               JOIN standard_master e on d.standard_id = e.standard_id
               LEFT JOIN student_attendance c on (a.student_id = c.student_id and c.attendance_date='${start_date}')
               where b.session_id= ${session_id}
               and (a.withdraw_date IS NULL 
               OR (a.withdraw_date IS NOT NULL AND a.withdraw_date >'${start_date}'))
               and a.doj<='${start_date}'
               order by roll_number, enroll_number`;
        //console.log(qry)       
        }
      //(add at join class_teacher_section) and i.class_teacher = (select emp_id from employee where employee_id = '" . $_SESSION['user'] . "'))
    connection.query(qry,function(err,result)     {
      //   console.log(qry)   
      if(err){
        console.log("Error readingstudent Data for attendance : %s ",err );
        console.log(err)
        data.status = 'e';

      }else{
        //console.log(result)
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.attendanceData = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


// read daily_aatendance data


router.post('/read_daily_attendance_data', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
     var attendance_date=input.start_date
     var session_id = req.cookies.session_id
     console.log(req.cookies.user)
    // var user = req.cookies.user
  req.getConnection(function(err,connection){
       
    var data = {}
  
      var qry =`select * from
        (
        select * from 
           (select c.standard_id, standard, c.section_id, section,
                        count(attendance_date) as pr, '' as ab,
                        concat(first_name,' ',middle_name,' ',last_name)  as teacher_name,
                        date_format(a.modification_date,'%d/%m/%Y %r') as time

                        from student_attendance a 
                        join student_current_standing b on (a.student_id = b.student_id and a.session_id=b.session_id)
                        join section_master c on b.section_id = c.section_id
                        join standard_master d on c.standard_id = d.standard_id
                        join employee e on a.modified_by=e.employee_id
                        where attendance = '1' 
                        and attendance_date = '${attendance_date}'
                        and a.session_id=${session_id}
                          group by b.section_id) a

                          UNION

                          select * from 
                          (select c.standard_id, standard, c.section_id, section,
                        '' as pr, count(attendance_date) as ab,
                        concat(first_name,' ',middle_name,' ',last_name)  as teacher_name,
                        date_format(a.modification_date,'%d/%m/%Y %r') as time 
                        from student_attendance a 
                        join student_current_standing b on (a.student_id = b.student_id and a.session_id=b.session_id)
                        join section_master c on b.section_id = c.section_id
                        join standard_master d on c.standard_id = d.standard_id
                        join employee e on a.modified_by=e.employee_id
                        where attendance = '0' 
                        and attendance_date = '${attendance_date}'
                        and a.session_id=${session_id}
                          group by b.section_id) b
          ) z
          order by z.standard_id, z.section_id`;
        //console.log(qry)       
        
      //(add at join class_teacher_section) and i.class_teacher = (select emp_id from employee where employee_id = '" . $_SESSION['user'] . "'))
    connection.query(qry,function(err,result)     {
      //   console.log(qry)   
      if(err){
        console.log("Error readingstudent Data for attendance : %s ",err );
        console.log(err)
        data.status = 'e';

      }else{
        //console.log(result)
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.dailyAttendanceData = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

// add Attendance Data

router.post('/add_attendance_data', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
     var studentData=input.studentData
     var session_id = req.cookies.session_id
     var attendance_date = input.start_date
    // console.log(req.cookies.user)
     //var user = req.cookies.user
      var user = 'S0357'
     var now = new Date();
     var jsonDate = now.toJSON(); 
     var formatted = new Date(jsonDate);
  req.getConnection(function(err,connection){
       
       var data = {}
     /*for(var i=0; i<studentData.length; i++){
        console.log(studentData[i])
        var student_id=studentData[i].student_id
        var qury=`Delete from student_attendance 
          where student_id =${student_id} and attendance_date = '${attendance_date}`;
          connection.query(qury,function(err,result){
          if(err){
              return connection.rollback(function() {
              throw err;
              
             })
          }else{
              data.status='s'
            }
      })
    }  */    

   // var multiValue=Array();
      var studentValues = [];
    for(var i=0; i<studentData.length; i++){
        /*var student_id=studentData[i].student_id
        var attendance=studentData[i].attendance*/
        //console.log("insert")

          studentValues.push([session_id,attendance_date,studentData[i].student_id,studentData[i].attendance,user])
        };
          console.log("=============");
          console.log(studentValues);

        var sql = `insert into student_attendance(session_id,attendance_date,student_id,attendance,modified_by) VALUES ?`;
        console.log(sql)
        connection.query(sql,[studentValues], function(err, result) 
        {
  
          if(err){
           console.log("Error inserting student : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              //console.log("insert")
             // data.student_id = result.insertId;
              res.send(JSON.stringify(data))
          } 
        });
      
  });

});



module.exports = router;
