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


//=========== read monthly attendance data ========
/*router.post('/read_monthly_attendance_data', function(req, res, next) {
    var obj = JSON.parse(JSON.stringify(req.body));
    var section_id =  obj.section_id;
    var standard_id =  obj.standard_id;
    var month_id = obj.month_id
    var session_id = req.cookies.session_id
    var sdate;
    var edate;
    var school_holiday="";
    var year =0;
    var c_month;
    var arr = [];
    var student = []
    var data = {}
  req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        var qry=`select year(session_start_date)as syear, year(session_end_date) as eyear
                     from session_master where session_id = ${session_id}`;

        connection.query(qry, function (error, rows) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          var sdate=rows[0].syear; 
          var edate=rows[0].eyear;
          if(month_id<=12 && month_id>=4){
            year=sdate;
          }else if(month_id<=3 && month_id>=1){
            year=edate;
          }
          console.log(year)
          var arr = [];
          function getMonthArray(month_id,year){
            var days = new Date(year, month_id, 0).getDate();
            for(var i=1; i<=days; i++){
              arr.push(i);
            }
            return arr;           
          }
          c_month=getMonthArray(month_id,year);
          c_month = arr.length;
          var last_date_of_month = year + "-" + month_id + "-" + c_month;
          var first_date_of_month = year + "-" + month_id + "-" + arr[0];

  
          var get_month_array_sh = '';
          var attendance='';

          var days = new Date(year, month_id, 0).getDate();
            for(var i=1; i<=days; i++){
              var attendance=year +"-"+ month_id +"-" +i ;
              if(get_month_array_sh == ''){
                get_month_array_sh =`select '${attendance}' as date, holiday from new_event 
                          where start_date between "${attendance}" and "${attendance}"
                          or end_date  between "${attendance}" and "${attendance}"`;
              }else{
                get_month_array_sh = get_month_array_sh+` union select '${attendance}' as date, holiday from new_event 
                          where start_date  between "${attendance}" and "${attendance}"
                          or end_date  between "${attendance}" and "${attendance}"`;
              }
            }
          get_month_array_sh = get_month_array_sh+';';
          console.log(get_month_array_sh);
          connection.query(get_month_array_sh, function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
            data.get_month_array_sh=rows;
          });

        var get_month_array_ch = '';
          var attendance='';
          var days = new Date(year, month_id, 0).getDate();
            for(var i=1; i<=days; i++){
              var attendance=year +"-"+ month_id +"-" +i ;
              
              if(get_month_array_ch == ''){
                get_month_array_ch =`select '${attendance}' as date,  holiday 
                            from class_holiday 
                            where start_date between "${attendance}" and "${attendance}"
                            or end_date  between "${attendance}" and "${attendance}"
                            and section_id = ${section_id}`;
              }else{
                get_month_array_ch = get_month_array_ch+` union  select '${attendance}' as date, holiday 
                            from class_holiday 
                            where start_date between "${attendance}" and "${attendance}"
                            or end_date  between "${attendance}" and "${attendance}"
                            and section_id = ${section_id}`;
              }
            }
          
          get_month_array_ch = get_month_array_ch+';';
          console.log(get_month_array_ch);

          connection.query(get_month_array_ch, function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
            data.get_month_array_ch = rows;
            data.status= 's';
            res.send(data)

          });

        });
      });
    });

});*/

//========== read Year =====================

router.get('/read_year/:month_id', function(req, res, next) {
  var session_id = req.cookies.session_id
  var month_id = req.params.month_id;
  var year =0;
  req.getConnection(function(err,connection){
       
     var data = {}
     var session_id = req.cookies.session_id;
     var qry=`select year(session_start_date)as syear, year(session_end_date) as eyear
              from session_master where session_id = ${session_id}`;
    

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading plans : %s ",err );
           data.status = 'e';

        }else{
          data.status = 's';
          var sdate=result[0].syear; 
          var edate=result[0].eyear;
          if(month_id<=12 && month_id>=4){
            year=sdate;
          }else if(month_id<=3 && month_id>=1){
            year=edate;
          }
          console.log(year)
          data.year = year;
          res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

//=========== read monthly attendance data ========
router.post('/read_monthly_attendance_data', function(req, res, next) {
  var obj = JSON.parse(JSON.stringify(req.body));
  var section_id =  obj.section_id;
  var standard_id =  obj.standard_id;
  var month_id = obj.month_id;
  var year = obj.year;
  var session_id = req.cookies.session_id
  var sdate;
  var edate;
  var school_holiday="";
  var c_month;
  var arr = [];
  var student = []
  var data = {}
  var attendance_date='';

  req.getConnection(function(err,connection){


    var headers = [];
    function getMonthArray(month_id,year){
      var days = new Date(year, month_id, 0).getDate();
      for(var i=1; i<=days; i++){
        headers.push(i);
      }
    }

    getMonthArray(month_id,year);

  

    var last_date_of_month = year + "-" + month_id + "-" + headers[(headers.length-1)];
    //var first_date_of_month = year + "-" + month_id + "-" + arr[0];
    

    var data = {}

    var student_details  = `select a.student_id, enroll_number, roll_number, 
                            concat(first_name, ' ', middle_name, ' ', last_name) as name,
                            day(attendance_date) as day, 
                            IF(attendance='1', 'P', 'Ab') as attendance
                            from student_attendance a
                            JOIN student_master b on (a.student_id = b.student_id and b.current_session_id = ${session_id})
                            JOIN student_current_standing c on (a.student_id = c.student_id and b.current_session_id=c.session_id)
                            JOIN section_master d on c.section_id = d.section_id
                            where  month(attendance_date) = ${month_id}
                            and standard_id =${standard_id}
                            and d.section_id=${section_id}
                            and a.session_id= ${session_id}
                            order by roll_number+0, enroll_number`;

    var get_month_array_ch = '';
    var get_month_array_sh = '';
    var attendance='';
    var days = new Date(year, month_id, 0).getDate();
      for(var i=1; i<=days; i++){
        attendance=year +"-"+ month_id +"-" +i ;
        
        if(get_month_array_ch == ''){
          get_month_array_ch =`select '${i}' as day,  holiday 
                      from class_holiday 
                      where (start_date between "${attendance}" and "${attendance}"
                      or end_date  between "${attendance}" and "${attendance}")
                      and section_id = ${section_id}
                      and holiday='Y'`;
        }else{
          get_month_array_ch = get_month_array_ch+` union  select '${i}' as day, holiday 
                      from class_holiday 
                      where (start_date between "${attendance}" and "${attendance}"
                      or end_date  between "${attendance}" and "${attendance}")
                      and section_id = ${section_id}
                      and holiday='Y'`;
        }

        if(get_month_array_sh == ''){
          get_month_array_sh =`select '${i}' as day, holiday from new_event 
                    where (start_date between "${attendance}" and "${attendance}"
                    or end_date  between "${attendance}" and "${attendance}")
                    and holiday='Y'`;
        }else{
          get_month_array_sh = get_month_array_sh+` union select '${i}' as day, holiday from new_event 
                    where (start_date  between "${attendance}" and "${attendance}"
                    or end_date  between "${attendance}" and "${attendance}")
                    and holiday='Y'`;
        }

      }
    

    var total_attendance = `select total_attendance_session, total_attendance_month from
                            (select count(distinct attendance_date) as total_attendance_session 
                            from student_attendance a 
                            JOIN student_current_standing b
                            where a.session_id=(select session_id from session_master where session_id = ${session_id}) 
                            and a.student_id = b.student_id
                            and a.session_id=b.session_id and b.section_id = ${section_id} 
                            and attendance_date <=${last_date_of_month }
                            and a.student_id=:student_id) a,
                            (select count(distinct attendance_date) as total_attendance_month 
                            from student_attendance a
                            JOIN student_current_standing b 
                            where month(attendance_date) = ${month_id}
                            and a.session_id=(select session_id from session_master where session_id = ${session_id})
                            and a.student_id = b.student_id
                            and a.session_id=b.session_id and b.section_id = ${section_id}
                            and a.student_id=:student_id) b `;


    var total_attendance = `select p.student_id, total_attendance_session, total_attendance_month,
                            total_pr_session, total_pr_month, 
                            (total_attendance_month-total_pr_month) as total_ab_month, 
                            concat( concat((total_attendance_month-(total_attendance_month-total_pr_month)),'/'), total_attendance_month ) as attn,
                            FORMAT((((total_attendance_month-(total_attendance_month-total_pr_month))*100)/total_attendance_month),2) as mnth,
                            concat( concat((total_pr_session),'/'), total_attendance_session ) as total_attn,
                            FORMAT((((total_pr_session)*100)/total_attendance_session),2) as total_percentage
                            from

                            (select a.student_id,count(attendance_date) as total_attendance_session 
                            from student_attendance a 
                            join student_current_standing b on (a.student_id=b.student_id and b.session_id = ${session_id})
                            where a.session_id = ${session_id}
                            and section_id = ${section_id}
                            and attendance_date <='${last_date_of_month}'
                            group by a.student_id) p

                            left join 

                            (select a.student_id,count(attendance_date) as total_attendance_month 
                            from student_attendance a 
                            join student_current_standing b on (a.student_id=b.student_id and b.session_id = ${session_id})
                            where month(attendance_date) = ${month_id}
                            and a.session_id = ${session_id}
                            and section_id = ${section_id}
                            group by a.student_id) q on p.student_id=q.student_id

                            left join                            

                            (select a.student_id,count(attendance_date) as total_pr_session 
                            from student_attendance a
                            join student_current_standing b on (a.student_id=b.student_id and b.session_id = ${session_id})
                            where attendance = '1' 
                            and a.session_id= ${session_id}
                            and attendance_date <='${last_date_of_month}'
                            and section_id = ${section_id}
                            group by a.student_id) r on p.student_id=r.student_id

                            left join

                            (select a.student_id, count(attendance_date) as total_pr_month
                            from student_attendance a
                            join student_current_standing b on (a.student_id=b.student_id and b.session_id = ${session_id})
                            where attendance = '1' 
                            and a.session_id= ${session_id}
                            and month(attendance_date)=${month_id}
                            and section_id = ${section_id}
                            group by a.student_id) s on p.student_id=s.student_id`;                            
    

    var qry = student_details+';'+get_month_array_ch+';'+get_month_array_sh+';'+total_attendance;    

    console.log(total_attendance)

    connection.query(qry,function(err,results){
            
        if(err){
           console.log("Error reading report : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.headers = headers;
            
            //converting data student wise
            var prev_student_id = ''
            var studentData = []
            var studentObj = {}
            var attendance = {}

            results[0].map(r=>{
               
               if(prev_student_id == ''){ //loop runs first time
                  prev_student_id = r.student_id
                  studentObj['student_id'] = r.student_id
                  studentObj['enroll_number'] = r.enroll_number
                  studentObj['roll_number'] = r.roll_number
                  studentObj['student_name'] = r.name
                  attendance[r.day] = r.attendance
               }else if(prev_student_id == r.student_id){
                  attendance[r.day] = r.attendance
               }else{
                studentObj['attendance'] = attendance
                studentData.push(studentObj)

                studentObj = {}
                attendance = {}
                prev_student_id = r.student_id
                studentObj['student_id'] = r.student_id
                studentObj['enroll_number'] = r.enroll_number
                studentObj['roll_number'] = r.roll_number
                studentObj['student_name'] = r.name
                attendance[r.day] = r.attendance
                attendance[r.day] = r.attendance
               }

            }) 

            studentObj['attendance'] = attendance
            studentData.push(studentObj)


            //arranging attendance according to header
            studentData.map(r=>{

               //applying student_wise total_attendance
               r['total_attendance_session']='tere'
               
                results[3].map(s=>{

                  if(Number(r.student_id)==Number(s.student_id)){
                    r['total_attendance_session'] = s.total_attendance_session
                    r['total_attendance_month'] = s.total_attendance_month
                    r['total_pr_session'] = s.total_pr_session
                    r['total_ab_month'] = s.total_ab_month
                    r['attn'] = s.attn
                    r['mnth'] = s.mnth+ '%'
                    r['total_attn'] = s.total_attn
                    r['total_percentage'] = s.total_percentage+ '%'
                  }

                })
               
               var orderedAttendance={}
               var absent =0

               headers.map(h=>{

                  var flag = true;
                  Object.keys(r.attendance).map(a=>{
                      if(Number(h)==Number(a)){
                        orderedAttendance[Number(h)]=r.attendance[Number(h)]
                        flag = false;
                      }
                  })

                  if(flag == true){
                    orderedAttendance[h]= ''
                  }


                  //assigning school holiday
                  results[2].map(sh=>{
                      if(Number(h)==Number(sh.day)){
                        orderedAttendance[h]= 'SH'
                      }
                  })

                  //assigning class holiday
                  results[1].map(ch=>{
                      if(Number(h)==Number(ch.day)){
                        orderedAttendance[h]= 'CH'
                      }
                  })

                  //checking for sat and sunday
                  var d = new Date(year, month_id, h);
                  
                  if(d.getDay()==0){//sunday
                    orderedAttendance[h]= 'X'
                  }

                  if(d.getDay()==6){//sat
                    if(orderedAttendance[h]==''){
                      orderedAttendance[h]= 'SH'
                    }
                  }

               })
               
               r['orderedAttendance'] = orderedAttendance;

            })


            //count total columnwies


            var row_one = {'student_name':'Total No. of Students','bold':'X'}
            var row_one_obj = {}

            var row_pr = {'student_name':'Total No. of Students Persent','bold':'X'}
            var row_pr_obj = {}

            var row_ab = {'student_name':'Total No. of Students Absent','bold':'X'}
            var row_ab_obj = {}


            headers.map(h=>{
              
              var total_no_of_students = 0
              var total_no_of_students_pr = 0
              var total_no_of_students_ab = 0

              studentData.map(r=>{
                total_no_of_students = Number(total_no_of_students) + 1

                if(r.orderedAttendance[h]=='P'){
                  total_no_of_students_pr = Number(total_no_of_students_pr) + 1
                }else if(r.orderedAttendance[h]=='Ab'){
                  total_no_of_students_ab = Number(total_no_of_students_ab) + 1
                }



              })
              

              if(studentData[0].orderedAttendance[h]=='SH' || studentData[0].orderedAttendance[h] == 'CH' || studentData[0].orderedAttendance[h] =='X'){
                row_one_obj[h] = ''
                row_pr_obj[h] = ''
                row_ab_obj[h] = ''
              }else{
                row_one_obj[h] = total_no_of_students
                row_pr_obj[h] = total_no_of_students_pr
                row_ab_obj[h] = total_no_of_students_ab
              } 
            })
            
            //console.log(r.orderedAttendance[h])
            row_one['orderedAttendance']=row_one_obj
            row_pr['orderedAttendance']=row_pr_obj
            row_ab['orderedAttendance']=row_ab_obj
            studentData.push(row_one)
            studentData.push(row_pr)
            studentData.push(row_ab)
            
            data.student_list = studentData;
            data.ch = results[1];
            data.sh = results[2];
            data.student_list = studentData;

            res.send(JSON.stringify(data))
        }
     
     }); 
       
  });
});



module.exports = router;
