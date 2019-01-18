var express = require('express');
var router = express.Router();


/* Read Exam Type listing. */
router.get('/exam-type/:standard_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select a.exam_type,a.exam_type_id
                from exam_type a
                join exam_scheme_standard_map b on a.scheme_id=b.scheme_id
                join exam_scheme_master c on (b.scheme_id = c.scheme_id and c.session_id =?)
                where b.standard_id=?
                and last_login_date >= curdate()`;

         console.log(qry)
     
     connection.query(qry,[req.cookies.session_id,req.params.standard_id],function(err,result)     {
            
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


// reade marks entries
router.get('/marks-entries/:exam_type_id/:section_id', function(req, res, next) {

  req.getConnection(function(err,connection){
    var data = {}
    var qry = `select * from
              (select d.subject_id,a.student_id, roll_number, enroll_number,
              concat(b.first_name,' ',b.middle_name,' ',b.last_name)as student_name,
              subject_short_name,if(marks = -1,'AB',marks)as marks ,''as grade, e.max_marks,e.min_marks, marking_type,grand_total
              from marks_entry_master a
              join student_master b on (a.student_id=b.student_id and b.current_session_id = ${req.cookies.session_id})
              join student_current_standing c on (b.student_id=c.student_id and a.session_id=c.session_id and b.current_session_id =${req.cookies.session_id}) 
              join subject_master d on a.subject_id=d.subject_id
              join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
              where a.section_id=${req.params.section_id}
              and a.exam_id=${req.params.exam_type_id}
              and e.marking_type='N'
              and a.session_id= ${req.cookies.session_id}

              UNION

              select d.subject_id,a.student_id, roll_number, enroll_number,
              concat(b.first_name,' ',b.middle_name,' ',b.last_name)as student_name,
              subject_short_name,'' as marks, marks_grade as grade, e.max_marks,e.min_marks, marking_type,grand_total
              from marks_entry_master a
              join student_master b on (a.student_id=b.student_id and b.current_session_id = ${req.cookies.session_id})
              join student_current_standing c on (b.student_id=c.student_id and a.session_id=c.session_id and b.current_session_id = ${req.cookies.session_id}) 
              join subject_master d on a.subject_id=d.subject_id
              join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
              where a.section_id=${req.params.section_id}
              and a.exam_id=${req.params.exam_type_id}
              and e.marking_type='G'
              and a.session_id= ${req.cookies.session_id}

              UNION

              select d.subject_id,a.student_id, roll_number, enroll_number,
              concat(b.first_name,' ',b.middle_name,' ',b.last_name)as student_name,
              subject_short_name,if(marks = -1,'AB',marks)as marks , i.grade as grade,e.max_marks,e.min_marks, marking_type,grand_total
              from marks_entry_master a
              join student_master b on (a.student_id=b.student_id and b.current_session_id = ${req.cookies.session_id})
              join student_current_standing c on (b.student_id=c.student_id and a.session_id=c.session_id and b.current_session_id=${req.cookies.session_id})
              join subject_master d on a.subject_id=d.subject_id
              join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
              join grade_master i on a.grade_id = i.grade_id
              where a.section_id=${req.params.section_id}
              and a.exam_id=${req.params.exam_type_id}
              and e.marking_type='NG'
              and a.session_id= ${req.cookies.session_id}) z  
              order by z.student_id`;

        connection.query(qry,function(err,results)     {
                
            if(err){
               console.log("Error reading report : %s ",err );
               data.status = 'e';

            }else{
                data.status = 's';
                data.reports = results;
                res.send(JSON.stringify(data))
            }
         
         }); 
       
  });

});


router.get('/merit-list/:exam_type_id/:section_id', function(req, res, next) {

  req.getConnection(function(err,connection){
    var data = {}

    var qry = `select  a.student_id, roll_number, enroll_number,
               concat(b.first_name,' ',b.middle_name,' ',b.last_name)as student_name,
               subject_short_name, marks,'' as grade, e.max_marks,e.min_marks, marking_type
               from marks_entry_master a
               join student_master b on (a.student_id=b.student_id and b.current_session_id = ${req.cookies.session_id})
               join student_current_standing c on (b.student_id=c.student_id and c.session_id = ${req.cookies.session_id}) 
               join subject_master d on a.subject_id=d.subject_id
               join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id and a.session_id= ${req.cookies.session_id})    
               where a.section_id=${req.params.section_id}
               and b.current_session_id =${req.cookies.session_id}
               and e.grand_total='Y'
               order by student_id`;    

               console.log(qry);

        connection.query(qry,function(err,results)     {
                
            if(err){
               console.log("Error reading report : %s ",err );
               data.status = 'e';

            }else{
              console.log(results);
              count=0;
              prev_student_id = "";
              prev_subject_name="";
              maxMarks=0;
              marksObtained=0;
              var j=1;
              var obj = {};
              var marksData = []

              results.map(r=>{
                 
                if(prev_student_id != r.student_id){ //check for different student

                   if(prev_student_id == ""){      // loop runs first time only
                      prev_student_id= r.student_id;
                      
                      obj['roll_number']=r.roll_number;
                      obj['enroll_number']=r.enroll_number;
                      obj['student_name']=r.student_name;

                      maxMarks= maxMarks + r.max_marks;
                      marksObtained= marksObtained + r.marks;
                   }else{
                      count=1;
                      obj['max_marks']=maxMarks;
                      obj['marks_obtained']=marksObtained;
                      obj['percentage']= ((marksObtained *100)/maxMarks).toFixed(2) + " %";
                      marksData.push(obj);
                      maxMarks=0;
                      marksObtained=0;
                      prev_student_id= r.student_id;
                      obj = {};
                      obj['roll_number']=r.roll_number;
                      obj['enroll_number']=r.enroll_number;
                      obj['student_name']=r.student_name;

                      maxMarks= maxMarks + r.max_marks;
                      marksObtained= marksObtained + r.marks;
                   }
                }else{
                  prev_student_id= r.student_id;
                  maxMarks= maxMarks + r.max_marks;
                  marksObtained= marksObtained + r.marks;
                }

              })

                 obj['max_marks']=maxMarks;
                 obj['marks_obtained']=marksObtained;
                 obj['percentage']= ((marksObtained *100)/maxMarks).toFixed(2) + " %";
                 marksData.push(obj);            

              data.status = 's';
              data.reports = marksData.sort(function(a, b){return b.marks_obtained - a.marks_obtained});;
              res.send(JSON.stringify(data))
            }
         
         }); 
       
  });

});




module.exports = router;
