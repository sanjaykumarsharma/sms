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

router.post('/read_consolidate_tabulation_sheet_report', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  var data = {}
  var qry = '';
  var values_data = input.searchdata
  var exam_type_id =values_data.exam_type_id
  console.log(exam_type_id)
  var standard_id =values_data.standard_id
  var section_id =values_data.section_id
  var session_id =req.cookies.session_id

    req.getConnection(function(err,connection){
    var data = {}

    // var headers =`select distinct b.subject_id,subject_short_name, min_marks,max_marks
    //             from marks_entry_master a
    //             join subject_master b on a.subject_id=b.subject_id 
    //             join marks_setting c on (a.subject_id=c.subject_id and a.exam_id=c.exam_id and a.section_id=c.section_id
    //             and c.marking_type!='G')
    //             where a.section_id=${section_id}
    //             and a.exam_id in (${exam_type_id})
    //             and a.session_id=${session_id}
    //             order by subject_short_name`;

    var headers =`select a.subject_id, subject_short_name
                  from marks_entry_master a
                  join subject_master d on a.subject_id=d.subject_id
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id and e.marking_type!='G')
                  where a.section_id=${section_id}
                  and a.session_id=${session_id}
                  and a.exam_id in (${exam_type_id})
                  group by a.subject_id
                  order by a.subject_id`;

    var marks = `select * from
              (select a.subject_id,a.student_id, roll_number, enroll_number,
              concat(b.first_name,' ',b.middle_name,' ',b.last_name)as student_name,
              subject_short_name,if(marks = -1,'AB',marks)as marks , e.max_marks,e.min_marks, marking_type,grand_total
              from marks_entry_master a
              join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
              join student_master b on (a.student_id = b.student_id and b.current_session_id = ${session_id})
              join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
              join exam_type f on e.exam_id = f.exam_type_id
              join subject_master g on a.subject_id = g.subject_id
              where a.exam_id in (${exam_type_id})
              and a.section_id =${section_id}
              and a.session_id=${session_id}
              and e.marking_type = 'N'
              and (b.withdraw='N' || b.withdraw_session >${session_id})
              group by a.subject_id,a.student_id

              UNION

              select a.subject_id,a.student_id, roll_number, enroll_number,
              concat(b.first_name,' ',b.middle_name,' ',b.last_name)as student_name,
              subject_short_name,if(marks = -1,'AB',marks)as marks ,e.max_marks,e.min_marks, marking_type,grand_total
              from marks_entry_master a
              join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
              join student_master b on (a.student_id = b.student_id and b.current_session_id = ${session_id})
              join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
              join exam_type f on e.exam_id = f.exam_type_id
              join subject_master g on a.subject_id = g.subject_id
              where a.exam_id in (${exam_type_id})
              and a.section_id =${section_id}
              and a.session_id=${session_id}
              and e.marking_type = 'NG'
              and (b.withdraw='N' || b.withdraw_session > ${session_id})
              group by a.subject_id,a.student_id) z  
              order by z.roll_number+0 , z.student_id`;

    var clasTeacher = `select concat(first_name,' ',middle_name,' ',last_name)as class_teacher
                      from employee a
                      join class_teacher_section b on a.emp_id = b.class_teacher
                      where section_id=${section_id}
                      and b.session_id = ${session_id} limit 1`;
    console.log(marks);

    var qry = headers+';'+marks+';'+clasTeacher;          

        connection.query(qry,function(err,results){
                
            if(err){
               console.log("Error reading report : %s ",err );
               data.status = 'e';

            }else{
                data.status = 's';
                
                //creating headers according to subject
                var headers={}
                results[0].map(r=>{
                  headers[r.subject_id] = r.subject_short_name 
                })
                   
                //creating marks according to student and subject
                var prev_student_id = "";
                var maxMarks=0;
                var marksObtained=0;
                var obj = {}
                var subjects = {} //subjects_marks
                var marksData = []


                results[1].map(r=>{

                  if(prev_student_id != r.student_id){ //check for different student

                     if(prev_student_id == ""){      // loop runs first time only
                        prev_student_id= r.student_id;
                        obj['roll_number']=r.roll_number;
                        obj['enroll_number']=r.enroll_number;
                        obj['student_name']=r.student_name;
                        
                        if(r.marking_type == 'N') subjects[r.subject_id]= r.marks;
                        //if(r.marking_type == 'G') subjects[r.subject_id]= r.grade;
                        if(r.marking_type == 'NG') subjects[r.subject_id]= r.marks;//+"(" +r.grade +")";

                        if(r.grand_total=='Y'){
                          maxMarks= Number(maxMarks) + Number(r.max_marks);
                          marksObtained= Number(marksObtained) + Number(r.marks);
                        }

                     }else{

                        obj['total']= marksObtained + "/" + maxMarks;
                        obj['percentage']= ((Number(marksObtained)*100)/Number(maxMarks)).toFixed(2)+"%"
                        obj['subjects']=subjects
                        marksData.push(obj);

                        maxMarks=0;
                        marksObtained=0;
                        prev_student_id= r.student_id;
                        obj = {};
                        obj['roll_number']=r.roll_number;
                        obj['enroll_number']=r.enroll_number;
                        obj['student_name']=r.student_name;
                        
                        subjects = {}
                        if(r.marking_type == 'N') subjects[r.subject_id]= r.marks;
                        //if(r.marking_type == 'G') subjects[r.subject_id]= r.grade;
                        if(r.marking_type == 'NG') subjects[r.subject_id]= r.marks;//+"(" +r.grade +")";        
                        if(r.grand_total=='Y'){
                          maxMarks= Number(maxMarks) + Number(r.max_marks);
                          marksObtained= Number(marksObtained) + Number(r.marks);
                        }

                     }

                  }else{

                    prev_student_id= r.student_id;
                    if(r.marking_type == 'N') subjects[r.subject_id]= r.marks;
                    //if(r.marking_type == 'G') subjects[r.subject_id]= r.grade;
                    if(r.marking_type == 'NG') subjects[r.subject_id]= r.marks;//+"(" +r.grade +")";
                    if(r.grand_total=='Y'){
                      maxMarks= Number(maxMarks) + Number(r.max_marks);
                      marksObtained= Number(marksObtained) + Number(r.marks);
                    }

                  }

                })//loop ends here

                obj['total']= marksObtained + "/" + maxMarks;
                obj['percentage']= ((Number(marksObtained)*100)/Number(maxMarks)).toFixed(2)+"%"
                obj['subjects']=subjects
                marksData.push(obj);      

                //arranging subjects marks in same order as header

                
                marksData.map(r=>{

                  var orderedSubjects={}
                  Object.keys(headers).map(h=>{

                    var flag = true;
                    Object.keys(r.subjects).map(s=>{

                      if(Number(h)==Number(s)){
                        orderedSubjects[Number(h)]=r.subjects[Number(h)]
                        flag = false;
                      }

                    })

                    if(flag == true){
                      orderedSubjects[h]= ''
                    }

                  })

                  r['orderedSubjects'] = orderedSubjects;


                })


                data.headers = headers;
                data.reports = marksData;
                data.class_teacher = results[2][0]['class_teacher'];
                res.send(JSON.stringify(data))
            }
         
         }); 
       
  });
  });


module.exports = router;
