var express = require('express');
var router = express.Router();
var multer = require('multer')



// read Class Event
router.get('/read_holiday_list', function(req, res, next) {
  req.getConnection(function(err,connection){
       var session_id=req.cookies.session_id
     var data = {}
     var  qry=`select event_id, event_name,a.section_id,concat(standard, ' ', section) as class, date_format(start_date, '%d/%m/%Y') as start_date,
                date_format(end_date, '%d/%m/%Y') as end_date, holiday, description 
                from class_holiday a
                join section_master b on a.section_id=b.section_id
                join standard_master c on b.standard_id=c.standard_id
                where a.session_id = ${session_id}
                order by 3`;
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading holiday list : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.holidayLists = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.post('/read_attendance_data', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
     var standard_id=input.standard_id
     var section_id=input.section_id
     var start_date=input.start_date
     var session_id = req.cookies.session_id
     console.log(req.cookies.user)
    // var user = req.cookies.user
     var user = req.cookies.user
     var event=''   
     var class_event=''   
     var force_class=''
     var data={}

       /*var date1 = new Date(start_date)
       var date2 = new Date()

      // time difference
         var timeDiff = (date2.getTime() - date1.getTime());

         // days difference
         var diffDays =Math.ceil(timeDiff / (1000 * 3600 * 24));

         if(diffDays>0){
            console.log(diffDays)
          
         }else{
           console.log("No attendance in Advance date")
         }
       return*/

    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
       // if (err) { throw err; }

        var qury=`select event_name from new_event 
            where start_date<='${start_date}' and end_date>='${start_date}' and holiday='Y'`;
        connection.query(qury, function (error, rows) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
           console.log("1")
            if(rows[0]!=undefined){
                  event = rows.event_name;
            }
       
        
          var qury1=`select event_name from class_holiday 
                        where start_date<='${start_date}' and end_date>='${start_date}' and holiday='Y'
                        and section_id=${section_id}`;
                          
        connection.query(qury1, function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
            console.log(class_event)
            console.log("2")
            if(rows[0]!=undefined){
              class_event=rows[0].event_name
            }
          
        //  });

      
         var qury2=`select event_name from class_holiday 
                    where start_date<='${start_date}' and end_date>='${start_date}' and holiday='N'
                    and section_id=${section_id}`;

        connection.query(qury2, function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
              console.log("3")
              if(rows[0]!=undefined){
              force_class=rows[0].event_name
               console.log(force_class)
              }
          
        //  });
          console.log("++++++force_class++++++++++++++++")
          console.log(force_class)
            
          console.log("++++++class_event++++++++++++++++")
          console.log(class_event)

           console.log("++++++event++++++++++++++++")
           console.log(event)
            var qry =''
        if((event =="" && class_event=="") || (force_class!="")) {    
            console.log("inside")
            if(user=='admin'){
         var qry =`select a.student_id, concat(first_name, ' ', middle_name, ' ', last_name) as name, enroll_number, 
               roll_number, coalesce(attendance, 1) as attendance
               from student_master a
               JOIN student_current_standing b on (a.student_id = b.student_id and a.current_session_id =${session_id})
               JOIN section_master d on b.section_id = d.section_id 
               left JOIN student_attendance c on (a.student_id = c.student_id and c.attendance_date='${start_date}')
               where b.session_id=${session_id}
               and (a.withdraw_date IS NULL 
               OR (a.withdraw_date IS NOT NULL AND a.withdraw_date >'${start_date}'))
               and a.doj<='${start_date}'
               and b.section_id = ${section_id}
               order by roll_number, 2`;
          
                }else{
                      var qry =`select a.student_id, concat(first_name, ' ', middle_name, ' ', last_name) as name, enroll_number, 
                                   roll_number,standard, section, coalesce(attendance, 1) as attendance
                                   from student_master a
                                   JOIN student_current_standing b on (a.student_id = b.student_id and a.current_session_id =${session_id})
                                   JOIN section_master d on b.section_id = d.section_id
                                   JOIN class_teacher_section i on(b.section_id = i.section_id and i.session_id = ${session_id} 
                                   and i.class_teacher = (select emp_id from employee where employee_id = '${user}'))
                                   JOIN standard_master e on d.standard_id = e.standard_id
                                   LEFT JOIN student_attendance c on (a.student_id = c.student_id and c.attendance_date='${start_date}')
                                   where b.session_id= ${session_id}
                                   and (a.withdraw_date IS NULL 
                                   OR (a.withdraw_date IS NOT NULL AND a.withdraw_date >'${start_date}'))
                                   and a.doj<='${start_date}'
                                   order by roll_number, enroll_number`;
                    }  
        //console.log(qry)       
      
          }
       
          console.log(qry)
         if(qry!=''){
          connection.query(qry, function(error, rows)
             {
              if (error) {
                return connection.rollback(function() {
                  throw error;
                });
              }

          
              connection.commit(function(err) {
                if (err) {
                  return connection.rollback(function() {
                    throw err;
                  });
                }
                data.status = 's';
                data.attendanceData = rows;
                res.send(JSON.stringify(data))

              });
            });
          }else{
                data.status = 's';
                data.attendanceData = 'No Data Found';
                res.send(JSON.stringify(data))
          }
        })
        })
        });//end of ection con
      });
    });
  });

/*router.post('/read_attendance_data', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
     var standard_id=input.standard_id
     var section_id=input.section_id
     var start_date=input.start_date
     var session_id = req.cookies.session_id
     console.log(req.cookies.user)
    // var user = req.cookies.user
     var user = req.cookies.user
     var event=''   
     var class_event=''   
     var force_class=''
         
  req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {  
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
              console.log("event name")
              console.log(event)
            }

            //  read class evennt

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
                          console.log("class_event")
                          console.log(class_event)
                        }
                      }
                  })



                // read      console.log("force_class")

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




          console.log("check event")
          console.log(event)  
      if((event =="" && class_event=="") || (force_class!="" && force_class!=0)) {    
            console.log("inside")
            if(user=='admin'){
                    var qry =`select a.student_id, concat(first_name, ' ', middle_name, ' ', last_name) as name, enroll_number, 
               roll_number, coalesce(attendance, 1) as attendance
               from student_master a
               JOIN student_current_standing b on (a.student_id = b.student_id and a.current_session_id =${session_id})
               JOIN section_master d on b.section_id = d.section_id 
               left JOIN student_attendance c on (a.student_id = c.student_id and c.attendance_date='${start_date}')
               where b.session_id=${session_id}
               and (a.withdraw_date IS NULL 
               OR (a.withdraw_date IS NOT NULL AND a.withdraw_date >'${start_date}'))
               and a.doj<='${start_date}'
               and b.section_id = ${section_id}
               order by roll_number, 2`;
          
                }else{
                      var qry =`select a.student_id, concat(first_name, ' ', middle_name, ' ', last_name) as name, enroll_number, 
                                   roll_number,standard, section, coalesce(attendance, 1) as attendance
                                   from student_master a
                                   JOIN student_current_standing b on (a.student_id = b.student_id and a.current_session_id =${session_id})
                                   JOIN section_master d on b.section_id = d.section_id
                                   JOIN class_teacher_section i on(b.section_id = i.section_id and i.session_id = ${session_id} 
                                   and i.class_teacher = (select emp_id from employee where employee_id = '${user}'))
                                   JOIN standard_master e on d.standard_id = e.standard_id
                                   LEFT JOIN student_attendance c on (a.student_id = c.student_id and c.attendance_date='${start_date}')
                                   where b.session_id= ${session_id}
                                   and (a.withdraw_date IS NULL 
                                   OR (a.withdraw_date IS NOT NULL AND a.withdraw_date >'${start_date}'))
                                   and a.doj<='${start_date}'
                                   order by roll_number, enroll_number`;
                    }  
        //console.log(qry)       
        }
      //(add at join class_teacher_section) and i.class_teacher = (select emp_id from employee where employee_id = '" . $_SESSION['user'] . "'))
    connection.query(qry,function(err,result)     {
     console.log(qry)   
      if(err){
        return connection.rollback(function() {
              throw err;
               
         })
      }else{
        //console.log(result)
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.attendanceData = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });   


          }
      })

      

    
       
  });

 })

});

*/
// read daily_aatendance data


router.post('/read_daily_attendance_data', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
     var attendance_date=input.start_date
     var session_id = req.cookies.session_id
     console.log(req.cookies.user)
    // var user = req.cookies.user
  req.getConnection(function(err,connection){
       
    var data = {}
  
      var qry =`select standard_id, standard, section_id, section,
                        teacher_name, time, pr, ab from
        (
                        select standard_id, standard, a.section_id, section,
                        teacher_name, time, pr, ab from 
                        
                        (select p.standard_id, p.standard, p.section_id, p.section,
                        teacher_name, time, pr from

                        (select distinct c.standard_id, standard, c.section_id, section,
                        concat(first_name,' ',middle_name,' ',last_name)  as teacher_name,
                        date_format(a.modification_date,'%d/%m/%Y %r') as time
                        from student_attendance a 
                        join student_current_standing b on (a.student_id = b.student_id and a.session_id=b.session_id)
                        join section_master c on b.section_id = c.section_id
                        join standard_master d on c.standard_id = d.standard_id
                        join employee e on a.modified_by=e.employee_id
                        where attendance = '1' 
                        and attendance_date = '${attendance_date}'
                        and a.session_id=${session_id}) p
                         
                        join 

                        (select c.section_id, count(attendance_date) as pr
                        from student_attendance a 
                        join student_current_standing b on (a.student_id = b.student_id and a.session_id=b.session_id)
                        join section_master c on b.section_id = c.section_id
                        join standard_master d on c.standard_id = d.standard_id
                        join employee e on a.modified_by=e.employee_id
                        where attendance = '1' 
                        and attendance_date = '${attendance_date}'
                        and a.session_id=${session_id}
                        group by c.section_id) q on p.section_id=q.section_id) a

                        join 


                        (select c.section_id, count(attendance_date) as ab
                        from student_attendance a 
                        join student_current_standing b on (a.student_id = b.student_id and a.session_id=b.session_id)
                        join section_master c on b.section_id = c.section_id
                        join standard_master d on c.standard_id = d.standard_id
                        join employee e on a.modified_by=e.employee_id
                        where attendance = '0' 
                        and attendance_date = '${attendance_date}'
                        and a.session_id=${session_id}
                        group by c.section_id) b on a.section_id = b.section_id
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
      var user = req.cookies.user
     var now = new Date();
     var jsonDate = now.toJSON(); 
     var formatted = new Date(jsonDate);
     req.getConnection(function(err,connection){
       
      var data = {}
      var studentValues = [];
      var student_ids = [];
      var studentValues = [];
      for(var i=0; i<studentData.length; i++){
          studentValues.push([session_id,attendance_date,studentData[i].student_id,studentData[i].attendance,attendance_date,user])
          student_ids.push([studentData[i].student_id])
        };
           var studentids = student_ids;
           var studentIDS= studentids.toString();
           console.log(studentIDS)
         //  return  

          var qry=`Delete from student_attendance
           where student_id in (${studentIDS})
           and attendance_date = '${attendance_date}' 
           and session_id=${session_id}`
          connection.query(qry, [student_ids], function (error, rows) {
            console.log(qry)
          if(error) {
             data.status='e'
          }else{
                  console.log("inside Else")
                var sql = `insert into student_attendance(session_id,attendance_date,student_id,attendance, creation_date, modified_by) VALUES ?`;
                console.log(sql)
                connection.query(sql,[studentValues], function(err, result) 
                   {
          
                  if(err){
                   console.log("Error inserting student Attendance : %s ",err );
                   data.status = 'e';

                 }else{
                      data.status = 's';
                      res.send(JSON.stringify(data))
                  } 
                });
            
          }
        })
      
  });

});

// add Attendance Data

router.post('/delete_attendance', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
     var studentData=input.studentData
     var session_id = req.cookies.session_id
     var attendance_date = input.start_date
      var user = req.cookies.user
      var now = new Date();
      var jsonDate = now.toJSON(); 
      var formatted = new Date(jsonDate);
      req.getConnection(function(err,connection){
      var data = {}
      var student_ids = [];
      var studentValues = [];
      for(var i=0; i<studentData.length; i++){
          student_ids.push([studentData[i].student_id])
        };

          var studentids = student_ids;
          var studentIDS= studentids.toString();
           console.log(studentIDS)
          var qry=`Delete from student_attendance
           where student_id in (${studentIDS})
           and attendance_date = '${attendance_date}' 
           and session_id=${session_id}`
          connection.query(qry, [student_ids], function (error, rows) {
          if(error) {
            data.status='e'
          }else{
               data.status = 's';
               res.send(JSON.stringify(data))
          }
        })
      
  });

});



module.exports = router;
