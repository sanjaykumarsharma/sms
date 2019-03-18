var express = require('express');
var router = express.Router();


router.post('/read_student_wise_subject_failure_report', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  var data = {}
  var qry = '';
  var session_id=req.cookies.session_id 
  var values_data = input.searchdata
  var exam_id =values_data.exam_type_id
  var standard_id =values_data.standard_id
  var section_id =values_data.section_id
  var subject_marks = [];

    req.getConnection(function(err,connection){
      
      qry =`select a.student_id, subject_name, enroll_number,
            concat(first_name,' ',middle_name,'',last_name) as name,
            min_marks, if(marks = -1,'AB',marks)as marks
            from marks_entry_master a
            join subject_master c on a.subject_id = c.subject_id
            join marks_setting b on (a.exam_id=b.exam_id and b.subject_id = c.subject_id and a.section_id = b.section_id and b.marking_type != 'G')
            join student_master d on (a.student_id = d.student_id and d.current_session_id = ${session_id})
            where a.exam_id = ${exam_id}
            and a.section_id = ${section_id}
            and marks <min_marks
            and a.session_id= ${session_id}
            order by first_name, middle_name, last_name, enroll_number`;
      console.log(qry)
      connection.query(qry,function(err,result)     {      
        if(err){
          console.log("Error reading Student Wise Subject Failure Report : %s ",err );
          data.status = 'e';
        }else{
          data.status = 's';
               
          var students = []
          
          var prev_student_id = ''
          var student_details = {}
          var subjectList = []
          result.map(r=>{
           
           if(prev_student_id==''){//loop runs first time
              prev_student_id=r.student_id
              student_details.name = r.name
              student_details.enroll_number = r.enroll_number

              subjectList.push({'subject_name': r.subject_name, 'marks': r.marks})

           }else if(prev_student_id==r.student_id){ //same student
              subjectList.push({'subject_name': r.subject_name, 'marks': r.marks})
           }else{// student changed
              students.push({'student_details':student_details,'subjectList':subjectList})

              prev_student_id=r.student_id

              student_details = {}
              student_details.name = r.name
              student_details.enroll_number = r.enroll_number

              subjectList = []
              subjectList.push({'subject_name': r.subject_name, 'marks': r.marks})

           }

          })

          students.push({'student_details':student_details,'subjectList':subjectList})


          data.subject_marks = students;
          res.send(data)
        }
      });
    });
  });


module.exports = router;
