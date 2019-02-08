var express = require('express');
var router = express.Router();
var multer = require('multer')
var fs = require('fs');


/* Read Standard */

router.get('/read_standard', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var standardQry = `SELECT standard_id, standard FROM standard_master`;
     var sectionQry = `SELECT standard_id, section_id, section FROM section_master`;
     var endDateQry = `select date_format(max(end_date), '%Y-%m-%d')  as end_date
                      from marks_entry_master c
                      join exam_type a on c.exam_id = a.exam_type_id
                      JOIN exam_scheme_master b on a.scheme_id=b.scheme_id 
                      where assessment='H' 
                      and b.session_id=${req.cookies.session_id}`;

     var qry = standardQry+';'+sectionQry+';'+endDateQry;
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Standard and Sections : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.standards = result[0];
            data.sections = result[1];
            data.end_date = result[2][0]['end_date'];
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Section */

router.get('/read_section', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT standard_id, section_id, section FROM section_master',function(err,result)     {
            
        if(err){
           console.log("Error reading Section : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.sections = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Student */

router.get('/read_student/:standard_id/:section_id', function(req, res, next) {

  var standard_id = req.params.standard_id;
  var section_id = req.params.section_id;
  var session_id = req.cookies.session_id
  console.log("hiiii");

  req.getConnection(function(err,connection){
       
    var data = {}
      var qry =`select a.student_id, first_name, middle_name, last_name,
                concat(first_name,' ',middle_name, ' ' ,last_name)as name,enroll_number, roll_number
                from student_master a
                JOIN student_current_standing b on (a.student_id=b.student_id and a.current_session_id =${session_id})
                LEFT JOIN section_master c on  b.section_id = c.section_id
                where c.standard_id=${standard_id} and c.section_id= ${section_id}
                and (a.withdraw='N' or a.withdraw_session > ${session_id}) 
                and session_id = ${session_id}
                order by first_name,roll_number`;

    connection.query(qry,function(err,result)     {
            
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
        data.status = 's';
        data.students = result;
        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


router.post('/read_first_assessment_report_card_one_to_four/', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log("HERE")
  console.log(input);

  req.getConnection(function(err,connection){
       
    var data = {}

    var marksQryView =`CREATE OR REPLACE VIEW first_assessment_report_card_one_to_four AS 
                  select roll_number, a.student_id, a.exam_id, a.subject_id, subject_name,
                  if( marks_grade = -1,'Ab', marks_grade) as marks,
                  show_in,marking_type, scheme_id, 
                  concat(first_name,' ',middle_name,' ',last_name)as student_name,
                  date_format(dob, '%d/%m/%Y') as  dob, enroll_number, house_name
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  join subject_master g on a.subject_id = g.subject_id
                  left join house_master h on c.house_id = h.house_id
                  where a.student_id in (${input.student_id})
                  and f.assessment='H'
                  and a.session_id=${req.cookies.session_id}
                  and e.marking_type = 'G'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                  UNION
                  
                  select roll_number, a.student_id, a.exam_id, a.subject_id, subject_name,
                  sum(if(a.marks = -1,'Ab', a.marks)) as  marks,
                  show_in, marking_type, scheme_id,
                  concat(first_name,' ',middle_name,' ',last_name)as student_name,
                  date_format(dob, '%d/%m/%Y') as  dob, enroll_number, house_name
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  join subject_master g on a.subject_id = g.subject_id
                  left join house_master h on c.house_id = h.house_id
                  where a.student_id in (${input.student_id})
                  and f.assessment='H'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
                  and a.session_id=${req.cookies.session_id}
                  and e.marking_type = 'N'
                  group by a.student_id, a.subject_id, f.assessment`;

    var marksQry = `select * from
                  (select roll_number, student_id, exam_id, subject_id, subject_name,
                  marks,
                  show_in,marking_type, scheme_id, student_name, dob, enroll_number, house_name
                  from first_assessment_report_card_one_to_four
                  where marking_type='G'

                  UNION

                  select roll_number, student_id, exam_id, subject_id, subject_name,
                  (SELECT grade FROM grade_master 
                   where min_marks<=marks  and max_marks>=marks
                   and scheme_id=scheme_id and exam_id=exam_id limit 1) as marks,
                  show_in,marking_type, scheme_id, student_name, dob, enroll_number, house_name
                  from first_assessment_report_card_one_to_four
                  where marking_type='N') z
                  order by roll_number, student_id, exam_id, show_in, subject_id`;              

    var maxMarksQry = `select subject_id, (SELECT grade FROM grade_master  where min_marks<=m_marks  and max_marks>=m_marks and scheme_id=scheme_id limit 1) as max_marks
                      from
                      (select subject_id, max(marks) as m_marks
                      from (
                      SELECT a.student_id,a.subject_id, subject_name, 
                      sum(if(a.marks = -1,0, a.marks)) as  marks,scheme_id
                      FROM marks_entry_master a
                      join subject_master b on a.subject_id = b.subject_id
                      join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                      join exam_type f on e.exam_id = f.exam_type_id
                      where e.marking_type ='N'
                      and f.assessment='H'
                      and a.section_id=${input.section_id}
                      and a.session_id=${req.cookies.session_id}
                      group by a.student_id, a.subject_id, f.assessment
                      order by a.subject_id,a.student_id
                      ) zz
                      group by zz.subject_id) kk`;

    var maturityDevelopmentQry = `select  student_id, exam_term, initiative_first, initiative_second,
                                  initiative_third, initiative_fourth, interest_first, interest_second,
                                  interest_third, interest_fourth, use_time_first, use_time_second,
                                  use_time_third, use_time_fourth, work_habit_first, work_habit_second,
                                  work_habit_third, work_habit_fourth, participation_first, participation_second,
                                  participation_third, participation_fourth, responsibility_first, 
                                  responsibility_second, responsibility_third, responsibility_fourth
                                  from student_maturity_development
                                  where student_id in (${input.student_id})
                                  and exam_term='First'
                                  and session_id = ${req.cookies.session_id}        
                                  order by 1,2`; 
    
    var physicalFitnessQry =`select student_id, first_skill, first_description, second_skill, 
                            second_description, third_skill, third_description, fourth_skill,
                            fourth_description, fifth_skill, fifth_description
                            from student_fitness a
                            where a.student_id in (${input.student_id})
                            and exam_term = 'First'
                            and session_id = ${req.cookies.session_id} 
                            order by student_id`;

    var attendanceQry = `select a.student_id, 'Attendance' as subject_name,
                         concat( (concat(pr, '/')),(COALESCE(ab,0)+pr)) as marks, 'At' as show_in from
                        (select student_id, count(attendance_date) as pr 
                         from student_attendance 
                         where attendance = '1' and student_id in (${input.student_id})
                         and session_id=${req.cookies.session_id}
                         and attendance_date <='${input.end_date}' group by student_id) a
                        
                        left join

                        (select student_id, count(attendance_date) as ab 
                         from student_attendance 
                         where attendance = '0' and student_id in(${input.student_id})
                         and session_id=${req.cookies.session_id}
                         and attendance_date <='${input.end_date}' group by student_id) b on a.student_id=b.student_id`;

     var qry = marksQryView+';'+marksQry+';'+maxMarksQry+';'+maturityDevelopmentQry+';'+physicalFitnessQry+';'+attendanceQry;

     console.log(attendanceQry);

     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';
        }else{
          data.status = 's';
          
          //converting max_marks as onject by subject_id
          var maxMarks={}
          result[2].map(r=>{
              maxMarks[r.subject_id]=r.max_marks
          })

          //maturity development
          var maturityDevelopment={}
          result[3].map(r=>{
              maturityDevelopment[r.student_id]=r
          })

          //physicalFitness
          var physicalFitness={}
          result[4].map(r=>{
              physicalFitness[r.student_id]=r
          })

          //attendance
          var attendance={}
          result[5].map(r=>{
              attendance[r.student_id]=r
          })

          //data according to student_id
          var student_id=''
          var marks_data=[]
          var obj=[]
          result[1].map(r=>{
            if(student_id==''){ //loop runs the first time
              student_id=r.student_id
              r.max_marks=maxMarks[r.subject_id]
              obj.push(r)
            }else if(r.student_id==student_id){
              r.max_marks=maxMarks[r.subject_id]
              obj.push(r)
            }else{
              obj.push(attendance[student_id])
              var row={}
              row[student_id]=student_id
              row['marks']=obj
              row['md']=maturityDevelopment[student_id]
              row['pf']=physicalFitness[student_id]
              marks_data.push(row)
              student_id=r.student_id
              obj=[]
              r.max_marks=maxMarks[r.subject_id]
              obj.push(r)
            }
          })

          obj.push(attendance[student_id])
          var row={}
          row[student_id]=student_id
          row['marks']=obj
          row['md']=maturityDevelopment[student_id]
          row['pf']=physicalFitness[student_id]
          marks_data.push(row)

          data.marks = marks_data // marks
          //data.maxMarks= maxMarks // max_marks of subject_id
          //data.maturityDevelopmentQry=maturityDevelopment
          // data.physicalFitness=result[4]
          // data.physicalFitness=physicalFitness
          // data.attendance=attendance

          res.send(data)
        }
     });    
  });

});


router.post('/read_first_assessment_report_card_five_to_eight/', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log("HERE")
  console.log(input);

  req.getConnection(function(err,connection){
       
    var data = {}
    
    var marksQryView =`CREATE OR REPLACE VIEW first_assessment_report_card_one_to_four AS 
                  select roll_number, a.student_id, a.exam_id, a.subject_id, subject_name,
                  if( marks_grade = -1,'Ab', marks_grade) as marks,
                  show_in,marking_type, scheme_id, 
                  concat(first_name,' ',middle_name,' ',last_name)as student_name,
                  date_format(dob, '%d/%m/%Y') as  dob, enroll_number, house_name
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  join subject_master g on a.subject_id = g.subject_id
                  left join house_master h on c.house_id = h.house_id
                  where a.student_id in (${input.student_id})
                  and f.assessment='H'
                  and a.session_id=${req.cookies.session_id}
                  and e.marking_type = 'G'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                  UNION
                  
                  select roll_number, a.student_id, a.exam_id, a.subject_id, subject_name,
                  sum(if(a.marks = -1,'Ab', a.marks)) as  marks,
                  show_in, marking_type, scheme_id,
                  concat(first_name,' ',middle_name,' ',last_name)as student_name,
                  date_format(dob, '%d/%m/%Y') as  dob, enroll_number, house_name
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  join subject_master g on a.subject_id = g.subject_id
                  left join house_master h on c.house_id = h.house_id
                  where a.student_id in (${input.student_id})
                  and f.assessment='H'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
                  and a.session_id=${req.cookies.session_id}
                  and e.marking_type = 'N'
                  group by a.student_id, a.subject_id, f.assessment`;

    var marksQryView1 = `select * from
                      (select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks
                      from marks_entry_master a
                      join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                      join student_master b on a.student_id = b.student_id
                      join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                      join exam_type f on e.exam_id = f.exam_type_id
                      where a.student_id in (${input.student_id})
                      and f.assessment='H'
                      and a.session_id=${req.cookies.session_id}
                      and e.grand_total='Y'
                      and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})        
                                  
                      UNION
                      
                      select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks_grade as marks
                      from marks_entry_master a
                      join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                      join student_master b on a.student_id = b.student_id
                      join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                      join exam_type f on e.exam_id = f.exam_type_id
                      where a.student_id in (${input.student_id})
                      and f.assessment='H'
                      and a.session_id=${req.cookies.session_id}
                      and e.grand_total='N'
                      and e.marking_type = 'G'
                      and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})        
                      
                      UNION
                      
                      select distinct roll_number, a.student_id, a.exam_id, a.subject_id, i.grade as  marks
                      from marks_entry_master a
                      join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                      join student_master b on a.student_id = b.student_id
                      join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                      join exam_type f on e.exam_id = f.exam_type_id
                      left join grade_master i on a.grade_id = i.grade_id
                      where a.student_id in (${input.student_id})
                      and f.assessment='H'
                      and a.session_id=${req.cookies.session_id}
                      and e.grand_total='N'
                      and e.marking_type = 'NG'
                      and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})        
                      ) z 
                      
                      order by z.roll_number, z.student_id,z.exam_id, z.subject_id`;

     console.log(marksQryView1)                      ;

    var marksQry = `select * from
                  (select roll_number, student_id, exam_id, subject_id, subject_name,
                  marks,
                  show_in,marking_type, scheme_id, student_name, dob, enroll_number, house_name
                  from first_assessment_report_card_one_to_four
                  where marking_type='G'

                  UNION

                  select roll_number, student_id, exam_id, subject_id, subject_name,
                  (SELECT grade FROM grade_master 
                   where min_marks<=marks  and max_marks>=marks
                   and scheme_id=scheme_id and exam_id=exam_id limit 1) as marks,
                  show_in,marking_type, scheme_id, student_name, dob, enroll_number, house_name
                  from first_assessment_report_card_one_to_four
                  where marking_type='N') z
                  order by roll_number, student_id, exam_id, show_in, subject_id`;              

    var maxMarksQry = `select subject_id, (SELECT grade FROM grade_master  where min_marks<=m_marks  and max_marks>=m_marks and scheme_id=scheme_id limit 1) as max_marks
                      from
                      (select subject_id, max(marks) as m_marks
                      from (
                      SELECT a.student_id,a.subject_id, subject_name, 
                      sum(if(a.marks = -1,0, a.marks)) as  marks,scheme_id
                      FROM marks_entry_master a
                      join subject_master b on a.subject_id = b.subject_id
                      join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                      join exam_type f on e.exam_id = f.exam_type_id
                      where e.marking_type ='N'
                      and f.assessment='H'
                      and a.section_id=${input.section_id}
                      and a.session_id=${req.cookies.session_id}
                      group by a.student_id, a.subject_id, f.assessment
                      order by a.subject_id,a.student_id
                      ) zz
                      group by zz.subject_id) kk`;

    var maturityDevelopmentQry = `select  student_id, exam_term, initiative_first, initiative_second,
                                  initiative_third, initiative_fourth, interest_first, interest_second,
                                  interest_third, interest_fourth, use_time_first, use_time_second,
                                  use_time_third, use_time_fourth, work_habit_first, work_habit_second,
                                  work_habit_third, work_habit_fourth, participation_first, participation_second,
                                  participation_third, participation_fourth, responsibility_first, 
                                  responsibility_second, responsibility_third, responsibility_fourth
                                  from student_maturity_development
                                  where student_id in (${input.student_id})
                                  and exam_term='First'
                                  and session_id = ${req.cookies.session_id}        
                                  order by 1,2`; 
    
    var physicalFitnessQry =`select student_id, first_skill, first_description, second_skill, 
                            second_description, third_skill, third_description, fourth_skill,
                            fourth_description, fifth_skill, fifth_description
                            from student_fitness a
                            where a.student_id in (${input.student_id})
                            and exam_term = 'First'
                            and session_id = ${req.cookies.session_id} 
                            order by student_id`;

    var attendanceQry = `select a.student_id, 'Attendance' as subject_name,
                         concat( (concat(pr, '/')),(COALESCE(ab,0)+pr)) as marks, 'At' as show_in from
                        (select student_id, count(attendance_date) as pr 
                         from student_attendance 
                         where attendance = '1' and student_id in (${input.student_id})
                         and session_id=${req.cookies.session_id}
                         and attendance_date <='${input.end_date}' group by student_id) a
                        
                        left join

                        (select student_id, count(attendance_date) as ab 
                         from student_attendance 
                         where attendance = '0' and student_id in(${input.student_id})
                         and session_id=${req.cookies.session_id}
                         and attendance_date <='${input.end_date}' group by student_id) b on a.student_id=b.student_id`;

     var qry = marksQryView+';'+marksQry+';'+maxMarksQry+';'+maturityDevelopmentQry+';'+physicalFitnessQry+';'+attendanceQry;

     console.log(attendanceQry);

     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';
        }else{
          data.status = 's';
          
          //converting max_marks as onject by subject_id
          var maxMarks={}
          result[2].map(r=>{
              maxMarks[r.subject_id]=r.max_marks
          })

          //maturity development
          var maturityDevelopment={}
          result[3].map(r=>{
              maturityDevelopment[r.student_id]=r
          })

          //physicalFitness
          var physicalFitness={}
          result[4].map(r=>{
              physicalFitness[r.student_id]=r
          })

          //attendance
          var attendance={}
          result[5].map(r=>{
              attendance[r.student_id]=r
          })

          //data according to student_id
          var student_id=''
          var marks_data=[]
          var obj=[]
          result[1].map(r=>{
            if(student_id==''){ //loop runs the first time
              student_id=r.student_id
              r.max_marks=maxMarks[r.subject_id]
              obj.push(r)
            }else if(r.student_id==student_id){
              r.max_marks=maxMarks[r.subject_id]
              obj.push(r)
            }else{
              obj.push(attendance[student_id])
              var row={}
              row[student_id]=student_id
              row['marks']=obj
              row['md']=maturityDevelopment[student_id]
              row['pf']=physicalFitness[student_id]
              marks_data.push(row)
              student_id=r.student_id
              obj=[]
              r.max_marks=maxMarks[r.subject_id]
              obj.push(r)
            }
          })

          obj.push(attendance[student_id])
          var row={}
          row[student_id]=student_id
          row['marks']=obj
          row['md']=maturityDevelopment[student_id]
          row['pf']=physicalFitness[student_id]
          marks_data.push(row)

          data.marks = marks_data // marks
          //data.maxMarks= maxMarks // max_marks of subject_id
          //data.maturityDevelopmentQry=maturityDevelopment
          // data.physicalFitness=result[4]
          // data.physicalFitness=physicalFitness
          // data.attendance=attendance

          res.send(data)
        }
     });    
  });

});

module.exports = router;
