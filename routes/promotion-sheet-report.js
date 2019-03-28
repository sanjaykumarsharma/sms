var express = require('express');
var router = express.Router();

/* Read Exam Type listing. */
router.get('/exam-type/:standard_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select a.exam_type,a.exam_type_id
                from exam_type a
                join exam_scheme_standard_map b on a.scheme_id=b.scheme_id
                join exam_scheme_master c on a.scheme_id = c.scheme_id 
                where b.standard_id=${req.params.standard_id}
                and c.session_id = (select session_id from session_master where session_id = ${req.cookies.session_id})
                order by 2`;

         console.log(qry)
     
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading category : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
           res.send(JSON.stringify(data))
        }else{
            data.status = 's';
            data.examTypes = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.post('/read-promotion-sheet-report', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  var values_data = input.searchdata
  var exam_type_id =values_data.exam_type_id
  var standard_id =values_data.standard_id
  var section_id =values_data.section_id
  var session_id =req.cookies.session_id

  var data = {}

  req.getConnection(function(err,connection){


      connection.beginTransaction(function(err) {
        if (err) { throw err; }

        var idArray = []
        var etid = exam_type_id.toString()
        if(etid.includes(",")){
           idArray = exam_type_id.split(",")
        }else{
           idArray.push(exam_type_id)
        }

        var examID  = idArray[idArray.length-1]
 
        var lastDate = `select date_format(start_date,'%Y-%m-%d') as start_date, date_format(end_date,'%Y-%m-%d') as end_date 
                     from exam_type a
                     JOIN exam_scheme_master b on a.scheme_id=b.scheme_id 
                     where  exam_type_id =${examID} 
                     and b.session_id=${session_id} limit 1`;

        var studentDetails = `select distinct a.student_id, a.roll_number, enroll_number,session_name, 
                                 concat(first_name,' ',middle_name,' ',last_name)as student_name
                                 from student_master a
                                 join marks_entry_master b on (a.student_id=b.student_id and b.session_id = ${session_id})
                                 join student_current_standing c on (a.student_id=c.student_id and a.current_session_id = ${session_id})
                                 join session_master d on b.session_id = d.session_id
                                 where c.section_id=${section_id}
                                 and c.session_id=${session_id}
                                 and (a.withdraw='N' || a.withdraw_session > ${session_id})        
                                 order by first_name,middle_name, last_name,enroll_number`;              

        var sql =lastDate+';'+studentDetails;

        connection.query(sql, function (error, result1) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          
          var end_date = result1[0][0].end_date

          var attendanceQry=''
          var ids = ''
          result1[1].map(r=>{

            if(ids==''){
               ids = r.student_id
            }else{
               ids = ids+','+r.student_id
            } 

            // var attQry =`select student_id, pr, ab from
            //     (select student_id, count(attendance_date) as pr 
            //       from student_attendance 
            //       where attendance = '1' and student_id = ${r.student_id}
            //       and session_id=${session_id}
            //       and attendance_date <='${end_date}') a,
            //     (select count(attendance_date) as ab 
            //       from student_attendance 
            //       where attendance = '0' and student_id =${r.student_id}
            //       and session_id=${session_id}
            //       and attendance_date <='${end_date}') b`;

            //     if(attendanceQry==''){
            //        attendanceQry = attQry
            //     }else{
            //        attendanceQry = attendanceQry+' UNION '+attQry
            //     }  
           })      

          var subjects =`select distinct a.subject_id, subject_short_name,c.order_no
                   from subject_master a
                   join group_subject_map c on (a.subject_id = c.subject_id and c.session_id=${session_id})
                   join student_group d on(c.group_id = d.group_id and c.session_id=${session_id})
                   where d.section_id=${section_id}
                   order by c.order_no`;
     

           var marks = ''
           idArray.map(exam_id=>{
             var m = `select * from
                      (select distinct roll_number,first_name, middle_name,last_name,b.enroll_number, a.student_id, a.exam_id, a.subject_id, '' as grade,
                      if(marks = -1,'AB',marks)as marks,
                      e.max_marks, e.min_marks,e.grand_total
                      from marks_entry_master a
                      join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                      join student_master b on (a.student_id = b.student_id and b.current_session_id = ${session_id})
                      join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                      join exam_type f on e.exam_id = f.exam_type_id
                      where a.exam_id =${exam_id}
                      and a.section_id =${section_id} 
                      and a.session_id=${session_id}
                      and e.marking_type = 'N'
                      and (b.withdraw='N' || b.withdraw_session > ${session_id})

                      UNION
                      
                      select distinct roll_number,first_name, middle_name,last_name,b.enroll_number, a.student_id, a.exam_id, a.subject_id,
                      '' as grade, if(marks_grade = -1,'AB',marks_grade)as marks,
                      e.max_marks, e.min_marks,e.grand_total
                      from marks_entry_master a
                      join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id )
                      join student_master b on (a.student_id = b.student_id and b.current_session_id = ${session_id})
                      join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                      join exam_type f on e.exam_id = f.exam_type_id 
                      where a.exam_id =${exam_id}
                      and a.section_id =${section_id} 
                      and a.session_id=${session_id}
                      and e.marking_type = 'G'
                      and (b.withdraw='N' || b.withdraw_session > ${session_id})        

                      UNION
                      
                      select distinct roll_number, first_name, middle_name,last_name,b.enroll_number, a.student_id, a.exam_id, a.subject_id, if(i.grade = -1,'AB',i.grade)as grade,
                      if(marks =-1, '-' , marks) as marks,
                      e.max_marks, e.min_marks,e.grand_total
                      from marks_entry_master a
                      join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                      join student_master b on (a.student_id = b.student_id and b.current_session_id = ${session_id})
                      join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                      join exam_type f on e.exam_id = f.exam_type_id
                      left join grade_master i on a.grade_id = i.grade_id
                      where a.exam_id =${exam_id}
                      and a.section_id =${section_id}
                      and a.session_id=${session_id}
                      and e.marking_type = 'NG'
                      and (b.withdraw='N' || b.withdraw_session > ${session_id})        
                      )z
                      order by z.first_name,z.middle_name, z.last_name,z.enroll_number, z.subject_id, z.exam_id`;                                   
             if(marks==''){
               marks = m
             }else{
               marks = m+';'+m
             }

           })             

           var attendanceQry=`select student_id, pr, ab from
                            (select student_id, count(attendance_date) as pr 
                              from student_attendance 
                              where attendance = '1' and student_id in (${ids})
                              and session_id=${session_id}
                              and attendance_date <='${end_date}' group by student_id) a,
                            (select count(attendance_date) as ab 
                              from student_attendance 
                              where attendance = '0' and student_id in (${ids})
                              and session_id=${session_id}
                              and attendance_date <='${end_date}' group by student_id) b`;             

           var qry = subjects+';'+attendanceQry+';'+marks;
          
          connection.query(qry, function(error, result)
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
                
                data.subjects = result[0];
                //data.attendance = result[1];
                
                var attendance = {}
                result[1].map(r=>{
                  var obj = {}
                  obj['total'] =  r.pr+'/'+(Number(r.pr)+Number(r.ab));
                  obj['percent'] =  ( (Number(r.pr) /  (Number(r.pr)+Number(r.ab)))*100 ).toFixed(2);
                  attendance[r.student_id] = obj
                })

                var studentDetails = []
                result1[1].map(r=>{
                  var obj= {}
                  obj['student_name']= 'Name : '+r['student_name']+'  |   Enrol No. : '+r['enroll_number']+'   |   Attendance : ' + attendance[r.student_id].total+'  |  Att.Per :  ' +attendance[r.student_id].percent ;
                  obj['student_id']= r['student_id'];
                  obj['session_name']= r['session_name'];
                  studentDetails.push(obj)

                })
                data.students = studentDetails;

                var arranged_marks1 = []
                var arranged_marks = {}

                result.map((r,index)=>{
                  if(index>1){//getting only marks from all results
                    r.map(m=>{
                      var obj={}
                      obj['subject_id'] = m['subject_id'];
                      obj['exam_id'] = m['exam_id'];
                      obj['student_id'] = m['student_id'];
                      obj['marks'] = m['marks'];
                      obj['grade'] = m['grade'];
                      obj['max_marks'] = m['max_marks']; 
                      obj['min_marks'] = m['min_marks'];
                      obj['grand_total'] = m['grand_total'];  

                      arranged_marks[m['student_id']+'-'+m['exam_id']+'-'+m['subject_id']]=obj;
                      arranged_marks1.push(obj);
                    })
                  }
                })

                data.marks = arranged_marks;
                data.marks1 = arranged_marks1;
                res.send(data)
            

              });
          });

        });//end of ection con
      });
           
  });
  
});


module.exports = router;
