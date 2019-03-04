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
     var endDateQryH = `select date_format(max(end_date), '%Y-%m-%d')  as end_date
                      from marks_entry_master c
                      join exam_type a on c.exam_id = a.exam_type_id
                      JOIN exam_scheme_master b on a.scheme_id=b.scheme_id 
                      where assessment='H' 
                      and b.session_id=${req.cookies.session_id}`;
     
     var endDateQryF = `select date_format(max(end_date), '%Y-%m-%d')  as end_date
                      from marks_entry_master c
                      join exam_type a on c.exam_id = a.exam_type_id
                      JOIN exam_scheme_master b on a.scheme_id=b.scheme_id 
                      where assessment='F' 
                      and b.session_id=${req.cookies.session_id}`;

     var qry = standardQry+';'+sectionQry+';'+endDateQryH+';'+endDateQryF;
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
            data.end_date_final = result[3][0]['end_date'];
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


router.post('/read_final_assessment_report_card_one_to_four/', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log("HERE")
  console.log(input);

  req.getConnection(function(err,connection){
       
    var data = {}
    var groupByQry = `SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`; 

    var marksQryViewH =`CREATE OR REPLACE VIEW final_assessment_report_card_one_to_four_h AS 
                      select roll_number, a.student_id, a.exam_id, a.subject_id, subject_name,
                      if( marks_grade = -1,'Ab', marks_grade) as marks,
                      show_in,marking_type, scheme_id
                      from marks_entry_master a
                      join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                      join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                      join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                      join exam_type f on e.exam_id = f.exam_type_id
                      join subject_master g on a.subject_id = g.subject_id
                      where a.student_id in (${input.student_id})
                      and f.assessment='H'
                      and a.session_id=${req.cookies.session_id}
                      and e.marking_type = 'G'
                      and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                      UNION
                      
                      select roll_number, a.student_id, a.exam_id, a.subject_id, subject_name,
                      sum(if(a.marks = -1,'Ab', a.marks)) as  marks,
                      show_in, marking_type, scheme_id
                      from marks_entry_master a
                      join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                      join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                      join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                      join exam_type f on e.exam_id = f.exam_type_id
                      join subject_master g on a.subject_id = g.subject_id
                      where a.student_id in (${input.student_id})
                      and f.assessment='H'
                      and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
                      and a.session_id=${req.cookies.session_id}
                      and e.marking_type = 'N'
                      group by a.student_id, a.subject_id, f.assessment`;
    
    var marksQryViewF =`CREATE OR REPLACE VIEW final_assessment_report_card_one_to_four_f AS 
                      select roll_number, a.student_id, a.exam_id, a.subject_id, subject_name,
                      if( marks_grade = -1,'Ab', marks_grade) as marks,
                      show_in,marking_type, scheme_id
                      from marks_entry_master a
                      join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                      join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                      join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                      join exam_type f on e.exam_id = f.exam_type_id
                      join subject_master g on a.subject_id = g.subject_id
                      where a.student_id in (${input.student_id})
                      and f.assessment='F'
                      and a.session_id=${req.cookies.session_id}
                      and e.marking_type = 'G'
                      and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                      UNION
                      
                      select roll_number, a.student_id, a.exam_id, a.subject_id, subject_name,
                      sum(if(a.marks = -1,'Ab', a.marks)) as  marks,
                      show_in, marking_type, scheme_id
                      from marks_entry_master a
                      join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                      join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                      join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                      join exam_type f on e.exam_id = f.exam_type_id
                      join subject_master g on a.subject_id = g.subject_id
                      where a.student_id in (${input.student_id})
                      and f.assessment='F'
                      and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
                      and a.session_id=${req.cookies.session_id}
                      and e.marking_type = 'N'
                      group by a.student_id, a.subject_id, f.assessment`;                      
    
    
    var marksQry = `select f.roll_number, f.student_id, f.subject_id, f.subject_name,
                    final_assessment_marks, first_assessment_marks, final_marks,
                    f.show_in, f.marking_type
                    from
                    
                    
                    (select  roll_number, student_id, exam_id, subject_id, subject_name,
                            final_assessment_marks,
                            show_in,marking_type, scheme_id
                    from
                    (select roll_number, student_id, exam_id, subject_id, subject_name,
                    marks as final_assessment_marks,show_in,marking_type, scheme_id
                    from final_assessment_report_card_one_to_four_f
                    where marking_type='G'

                    UNION

                    select roll_number, student_id, exam_id, subject_id, subject_name,
                    (SELECT grade FROM grade_master 
                    where min_marks<=marks  and max_marks>=marks
                    and scheme_id=scheme_id and exam_id=exam_id limit 1) as final_assessment_marks,
                    show_in,marking_type, scheme_id
                    from final_assessment_report_card_one_to_four_f
                    where marking_type='N') ff) f

                    left join

                    (select student_id, exam_id, subject_id, subject_name, first_assessment_marks
                    from
                    (select student_id, exam_id, subject_id, subject_name,
                    marks as first_assessment_marks
                    from final_assessment_report_card_one_to_four_h
                    where marking_type='G'

                    UNION

                    select student_id, exam_id, subject_id, subject_name,
                    (SELECT grade FROM grade_master 
                    where min_marks<=marks  and max_marks>=marks
                    and scheme_id=scheme_id and exam_id=exam_id limit 1) as first_assessment_marks
                    from final_assessment_report_card_one_to_four_h
                    where marking_type='N') hh)h on (f.student_id=h.student_id and f.subject_id=h.subject_id) 

                    left join

                    (select student_id, subject_id, (SELECT grade FROM grade_master  where min_marks<=marks  and max_marks>=marks and scheme_id=scheme_id limit 1) as final_marks
                    from
                    (SELECT a.student_id,a.subject_id, subject_name, 
                    round((sum(if(marks = -1,'0',marks))/2)) as  marks,scheme_id
                    FROM marks_entry_master a
                    join subject_master b on a.subject_id = b.subject_id
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    where e.marking_type ='N'
                    and a.section_id=${input.section_id}
                    and a.session_id=${req.cookies.session_id}
                    group by a.student_id, a.subject_id
                    order by a.subject_id,a.student_id
                    ) kk) k on (f.student_id=k.student_id and f.subject_id=k.subject_id) 

                    order by roll_number, student_id, show_in, subject_id`;              

    var maxMarksQryH = `select subject_id, (SELECT grade FROM grade_master  where min_marks<=m_marks  and max_marks>=m_marks and scheme_id=scheme_id limit 1) as max_marks
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

    var maturityDevelopmentFirstQry = `select  student_id, exam_term, initiative_first, initiative_second,
                                  initiative_third, initiative_fourth, interest_first, interest_second,
                                  interest_third, interest_fourth, use_time_first, use_time_second,
                                  use_time_third, use_time_fourth, work_habit_first, work_habit_second,
                                  work_habit_third, work_habit_fourth, participation_first, participation_second,
                                  participation_third, participation_fourth, responsibility_first, 
                                  responsibility_second, responsibility_third, responsibility_fourth
                                  from student_maturity_development
                                  where student_id in (${input.student_id})
                                  and session_id = ${req.cookies.session_id}    
                                  and exam_term = 'First'    
                                  order by 1,2`; 

    var maturityDevelopmentFinalQry = `select  student_id, exam_term, initiative_first, initiative_second,
                                  initiative_third, initiative_fourth, interest_first, interest_second,
                                  interest_third, interest_fourth, use_time_first, use_time_second,
                                  use_time_third, use_time_fourth, work_habit_first, work_habit_second,
                                  work_habit_third, work_habit_fourth, participation_first, participation_second,
                                  participation_third, participation_fourth, responsibility_first, 
                                  responsibility_second, responsibility_third, responsibility_fourth
                                  from student_maturity_development
                                  where student_id in (${input.student_id})
                                  and session_id = ${req.cookies.session_id}    
                                  and exam_term = 'Final'    
                                  order by 1,2`;                               

    var physicalFitnessFirstQry =`select student_id, exam_term, first_skill, first_description, second_skill, 
                            second_description, third_skill, third_description, fourth_skill,
                            fourth_description, fifth_skill, fifth_description
                            from student_fitness a
                            where a.student_id in (${input.student_id})
                            and session_id = ${req.cookies.session_id} 
                            and exam_term = 'First'    
                            order by student_id`;

    var physicalFitnessFinalQry =`select student_id, exam_term, first_skill, first_description, second_skill, 
                            second_description, third_skill, third_description, fourth_skill,
                            fourth_description, fifth_skill, fifth_description
                            from student_fitness a
                            where a.student_id in (${input.student_id})
                            and session_id = ${req.cookies.session_id} 
                            and exam_term = 'Final'    
                            order by student_id`;                        

    var attendanceQry = `select a.student_id, 'Attendance' as subject_name,
                         concat( (concat(pr, '/')),(COALESCE(ab,0)+pr)) as max_marks, 'At' as show_in,
                         concat( (concat(pr1, '/')),(COALESCE(ab1,0)+pr1)) as max_marks_final,
                         concat( (concat((pr+pr1), '/')),(COALESCE(ab,0)+pr+COALESCE(ab1,0)+pr1)) as final_marks,
                         FORMAT(((pr+pr1)*100)/(COALESCE(ab,0)+pr+COALESCE(ab1,0)+pr1),2) as final_att_percentage from
                        
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
                         and attendance_date <='${input.end_date}' group by student_id) b on a.student_id=b.student_id
                        
                        left join

                         (select student_id, count(attendance_date) as pr1
                         from student_attendance 
                         where attendance = '1' and student_id in (${input.student_id})
                         and session_id=${req.cookies.session_id}
                         and attendance_date <='${input.end_date_final}' group by student_id) a1 on a.student_id = a1.student_id
                        
                        left join

                        (select student_id, count(attendance_date) as ab1
                         from student_attendance 
                         where attendance = '0' and student_id in(${input.student_id})
                         and session_id=${req.cookies.session_id}
                         and attendance_date <='${input.end_date_final}' group by student_id) b1 on a.student_id=b1.student_id`;
     
    var maxMarksQryF = `select subject_id, (SELECT grade FROM grade_master  where min_marks<=m_marks  and max_marks>=m_marks and scheme_id=scheme_id limit 1) as max_marks
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
                      and f.assessment='F'
                      and a.section_id=${input.section_id}
                      and a.session_id=${req.cookies.session_id}
                      group by a.student_id, a.subject_id, f.assessment
                      order by a.subject_id,a.student_id
                      ) zz
                      group by zz.subject_id) kk`; 
    
    var studentDetailsQry = `select distinct a.student_id, enroll_number, a.session_id,
                            concat(first_name,' ',middle_name,' ',last_name)as student_name,
                            date_format(dob, '%d/%m/%Y') as  dob, house_name, session_name,
                            date_format(doa, '%d/%m/%Y') as doa,
                            concat(concat(date_format(doa, '%Y'),'-'),(date_format(doa, '%Y')+1)) as year
                            from marks_entry_master a
                            join student_master b on (a.student_id=b.student_id and b.current_session_id = ${req.cookies.session_id})
                            join student_current_standing c on (b.student_id=c.student_id and a.session_id=c.session_id and b.current_session_id = ${req.cookies.session_id}) 
                            join session_master d on a.session_id = d.session_id
                            left join house_master e on c.house_id = e.house_id
                            where a.student_id in (${input.student_id})
                            and a.session_id=${req.cookies.session_id}
                            order by 1`;

     var qry = groupByQry+';'+marksQryViewH+';'+marksQryViewF+';'+marksQry+';'+maxMarksQryH+';'+maturityDevelopmentFirstQry+';'+physicalFitnessFirstQry+';'+attendanceQry+';'+maxMarksQryF+';'+studentDetailsQry+';'+maturityDevelopmentFinalQry+';'+physicalFitnessFinalQry;

     console.log(maturityDevelopmentFirstQry);

     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';
        }else{
          data.status = 's';
          
          //converting max_marks as onject by subject_id
          var maxMarks={}
          result[4].map(r=>{
              maxMarks[r.subject_id]=r.max_marks
          })

          //converting max_marks_final as onject by subject_id
          var maxMarksF={}
          result[8].map(r=>{
              maxMarksF[r.subject_id]=r.max_marks
          })

          //maturity development
          var maturityDevelopment={}
          result[5].map(r=>{
              maturityDevelopment[r.student_id]=r
          })

          var maturityDevelopmentFinal={}
          result[10].map(r=>{
              maturityDevelopmentFinal[r.student_id]=r
          })

          //physicalFitness
          var physicalFitness={}
          result[6].map(r=>{
              physicalFitness[r.student_id]=r
          })

          var physicalFitnessFinal={}
          result[6].map(r=>{
              physicalFitnessFinal[r.student_id]=r
          })

          //attendance
          var attendance={}
          result[7].map(r=>{
              attendance[r.student_id]=r
          })

          //converting student_details as onject by stident_id
          var studentDetails={}
          result[9].map(r=>{
              studentDetails[r.student_id]=r
          })

          //data according to student_id
          var student_id=''
          var marks_data=[]
          var obj=[]
          result[3].map(r=>{
            if(student_id==''){ //loop runs the first time
              student_id=r.student_id
              r.max_marks=maxMarks[r.subject_id]
              r.max_marks_final=maxMarksF[r.subject_id]
              obj.push(r)
            }else if(r.student_id==student_id){
              r.max_marks=maxMarks[r.subject_id]
              r.max_marks_final=maxMarksF[r.subject_id]
              obj.push(r)
            }else{
              obj.push(attendance[student_id])
              var row={}
              row[student_id]=student_id
              row['marks']=obj
              row['md']=maturityDevelopment[student_id]
              row['md_final']=maturityDevelopmentFinal[student_id]
              row['pf']=physicalFitness[student_id]
              row['pf_final']=physicalFitnessFinal[student_id]
              row['details']=studentDetails[student_id]
              marks_data.push(row)
              student_id=r.student_id
              obj=[]
              r.max_marks=maxMarks[r.subject_id]
              r.max_marks_final=maxMarksF[r.subject_id]
              obj.push(r)
            }
          })

          obj.push(attendance[student_id])
          var row={}
          row[student_id]=student_id
          row['marks']=obj
          row['md']=maturityDevelopment[student_id]
          row['md_final']=maturityDevelopmentFinal[student_id]
          row['pf']=physicalFitness[student_id]
          row['pf_final']=physicalFitnessFinal[student_id]
          row['details']=studentDetails[student_id]
          marks_data.push(row) 


          data.marks = marks_data // marks
          //data.maxMarks= maxMarks // max_marks of subject_id
          //data.maturityDevelopmentQry=maturityDevelopment
          //data.physicalFitness=result[4]
          //data.physicalFitness=physicalFitness
          //data.attendance=attendance
       
          res.send(data)
        }
     });    
  });

});


router.post('/read_final_assessment_report_card_five_to_eight/', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log("HERE");
  console.log(input);

  req.getConnection(function(err,connection){
       
    var data = {}

    var groupByQry = `SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`; 
    
    var studentDetailsQuery = `select distinct a.student_id, enroll_number, a.session_id,
                            concat(first_name,' ',middle_name,' ',last_name)as student_name,
                            date_format(dob, '%d/%m/%Y') as  dob, house_name, session_name,
                            date_format(doa, '%d/%m/%Y') as doa,
                            concat(concat(date_format(doa, '%Y'),'-'),(date_format(doa, '%Y')+1)) as year
                            from marks_entry_master a
                            join student_master b on (a.student_id=b.student_id and b.current_session_id = ${req.cookies.session_id})
                            join student_current_standing c on (b.student_id=c.student_id and a.session_id=c.session_id and b.current_session_id = ${req.cookies.session_id}) 
                            join session_master d on a.session_id = d.session_id
                            left join house_master e on c.house_id = e.house_id
                            where a.student_id in (${input.student_id})
                            and a.session_id=${req.cookies.session_id}
                            order by 1`;                          
    
    var marksQry = `select xx.roll_number, xx.student_id, xx.subject_id,
                  xx.first_marks as first_marks_final,
                  xx.second_marks as second_marks_final,
                  xx.mo_marks as mo_marks_final, 
                  xx.subject_name, xx.order_no,
                  xx.first_min_marks as first_min_marks_final, xx.second_min_marks as second_min_marks_final, 
                  xx.show_in, xx.marking_type,
                  xx.first_marks_limit as first_marks_limit_final,xx.second_marks_limit as second_marks_limit_final,
                  yy.first_marks,
                  yy.second_marks,
                  yy.mo_marks, 
                  yy.subject_name,
                  yy.first_min_marks, yy.second_min_marks,
                  yy.first_marks_limit,yy.second_marks_limit

                  from 

                  (select q.roll_number, q.student_id, q.subject_id,
                  if((p.marks=-1),'Ab',p.marks) as first_marks,
                  if((q.marks=-1),'Ab',q.marks) as second_marks,
                  (coalesce(p.marks,0)+coalesce(q.marks,0)) as mo_marks, q.subject_name, q.order_no,
                  CAST(p.min_marks AS UNSIGNED) as first_min_marks, (q.min_marks/2) as second_min_marks, q.show_in, q.marking_type,
                  if((p.marks<p.min_marks and q.marking_type ='N'),'error','normal') as first_marks_limit,
                  if((q.marks<(q.min_marks/2) and q.marking_type ='N'),'error','normal') as second_marks_limit from

                  (select roll_number, student_id, exam_id, subject_id, marks, subject_name, exam_group, order_no, min_marks, show_in, marking_type from

                  (select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks, subject_name, exam_group, h.order_no,
                  e.min_marks, show_in, marking_type
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  join subject_master g on a.subject_id = g.subject_id
                  join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                  where a.student_id in (${input.student_id})
                  and f.assessment='F'
                  and a.session_id=${req.cookies.session_id}
                  and e.grand_total='Y'
                  and exam_group='First'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                  UNION

                  select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks_grade as marks, subject_name, exam_group,
                  h.order_no, 0 as min_marks, show_in, marking_type
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  join subject_master g on a.subject_id = g.subject_id
                  join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                  where a.student_id in (${input.student_id})
                  and f.assessment='F'
                  and a.session_id=${req.cookies.session_id}
                  and e.grand_total='N'
                  and e.marking_type = 'G'
                  and exam_group='First'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                  UNION

                  select distinct roll_number, a.student_id, a.exam_id, a.subject_id, i.grade as  marks, subject_name, exam_group, h.order_no,
                  e.min_marks, show_in, marking_type
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  left join grade_master i on a.grade_id = i.grade_id
                  join subject_master g on a.subject_id = g.subject_id
                  join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                  where a.student_id in (${input.student_id})
                  and f.assessment='F'
                  and a.session_id=${req.cookies.session_id}
                  and e.grand_total='N'
                  and e.marking_type = 'NG'
                  and exam_group='First'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
                  ) z

                  group by z.student_id, z.subject_id, z.exam_group
                  order by z.roll_number, z.student_id, z.exam_id, z.subject_id) p

                  right join

                  (select roll_number, student_id, exam_id, subject_id, if(marking_type = 'N',sum(marks), marks) as marks, subject_name,
                   exam_group, order_no, if(marking_type = 'N',sum(min_marks), min_marks) as min_marks, show_in, marking_type from

                  (select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks, subject_name, exam_group,marking_type, h.order_no,
                  e.min_marks, show_in
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  join subject_master g on a.subject_id = g.subject_id
                  join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                  where a.student_id in (${input.student_id})
                  and f.assessment='F'
                  and a.session_id=${req.cookies.session_id}
                  and e.grand_total='Y'
                  and exam_group='Second'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                  UNION

                  select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks_grade as marks, subject_name,
                  exam_group, marking_type, h.order_no, 0 as min_marks, show_in
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  join subject_master g on a.subject_id = g.subject_id
                  join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                  where a.student_id in (${input.student_id})
                  and f.assessment='F'
                  and a.session_id=${req.cookies.session_id}
                  and e.grand_total='N'
                  and e.marking_type = 'G'
                  and exam_group='Second'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                  UNION

                  select distinct roll_number, a.student_id, a.exam_id, a.subject_id, i.grade as  marks, subject_name,
                  exam_group, marking_type, h.order_no, e.min_marks, show_in
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  left join grade_master i on a.grade_id = i.grade_id
                  join subject_master g on a.subject_id = g.subject_id
                  join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                  where a.student_id in (${input.student_id})
                  and f.assessment='F'
                  and a.session_id=${req.cookies.session_id}
                  and e.grand_total='N'
                  and e.marking_type = 'NG'
                  and exam_group='Second'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
                  ) z

                  group by z.student_id, z.subject_id, z.exam_group
                  order by z.roll_number, z.student_id, z.exam_id, z.order_no) q on (p.student_id=q.student_id and p.subject_id=q.subject_id) ) xx

                  left join 

                  (select q.roll_number, q.student_id, q.subject_id,
                  if((p.marks=-1),'Ab',p.marks) as first_marks,
                  if((q.marks=-1),'Ab',q.marks) as second_marks,
                  (coalesce(p.marks,0)+coalesce(q.marks,0)) as mo_marks, q.subject_name, q.order_no,
                  CAST(p.min_marks AS UNSIGNED) as first_min_marks, (q.min_marks/2) as second_min_marks, q.show_in, q.marking_type,
                  if((p.marks<p.min_marks and q.marking_type ='N'),'error','normal') as first_marks_limit,
                  if((q.marks<(q.min_marks/2) and q.marking_type ='N'),'error','normal') as second_marks_limit from

                  (select roll_number, student_id, exam_id, subject_id, marks, subject_name, exam_group, order_no, min_marks, show_in, marking_type from

                  (select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks, subject_name, exam_group, h.order_no,
                  e.min_marks, show_in, marking_type
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  join subject_master g on a.subject_id = g.subject_id
                  join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                  where a.student_id in (${input.student_id})
                  and f.assessment='H'
                  and a.session_id=${req.cookies.session_id}
                  and e.grand_total='Y'
                  and exam_group='First'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                  UNION

                  select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks_grade as marks, subject_name, exam_group,
                  h.order_no, 0 as min_marks, show_in, marking_type
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  join subject_master g on a.subject_id = g.subject_id
                  join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                  where a.student_id in (${input.student_id})
                  and f.assessment='H'
                  and a.session_id=${req.cookies.session_id}
                  and e.grand_total='N'
                  and e.marking_type = 'G'
                  and exam_group='First'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                  UNION

                  select distinct roll_number, a.student_id, a.exam_id, a.subject_id, i.grade as  marks, subject_name, exam_group, h.order_no,
                  e.min_marks, show_in, marking_type
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  left join grade_master i on a.grade_id = i.grade_id
                  join subject_master g on a.subject_id = g.subject_id
                  join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                  where a.student_id in (${input.student_id})
                  and f.assessment='H'
                  and a.session_id=${req.cookies.session_id}
                  and e.grand_total='N'
                  and e.marking_type = 'NG'
                  and exam_group='First'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
                  ) z

                  group by z.student_id, z.subject_id, z.exam_group
                  order by z.roll_number, z.student_id, z.exam_id, z.subject_id) p

                  right join

                  (select roll_number, student_id, exam_id, subject_id, if(marking_type = 'N',sum(marks), marks) as marks, subject_name,
                   exam_group, order_no, if(marking_type = 'N',sum(min_marks), min_marks) as min_marks, show_in, marking_type from

                  (select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks, subject_name, exam_group,marking_type, h.order_no,
                  e.min_marks, show_in
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  join subject_master g on a.subject_id = g.subject_id
                  join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                  where a.student_id in (${input.student_id})
                  and f.assessment='H'
                  and a.session_id=${req.cookies.session_id}
                  and e.grand_total='Y'
                  and exam_group='Second'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                  UNION

                  select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks_grade as marks, subject_name,
                  exam_group, marking_type, h.order_no, 0 as min_marks, show_in
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  join subject_master g on a.subject_id = g.subject_id
                  join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                  where a.student_id in (${input.student_id})
                  and f.assessment='H'
                  and a.session_id=${req.cookies.session_id}
                  and e.grand_total='N'
                  and e.marking_type = 'G'
                  and exam_group='Second'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                  UNION

                  select distinct roll_number, a.student_id, a.exam_id, a.subject_id, i.grade as  marks, subject_name,
                  exam_group, marking_type, h.order_no, e.min_marks, show_in
                  from marks_entry_master a
                  join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                  join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                  join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                  join exam_type f on e.exam_id = f.exam_type_id
                  left join grade_master i on a.grade_id = i.grade_id
                  join subject_master g on a.subject_id = g.subject_id
                  join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                  where a.student_id in (${input.student_id})
                  and f.assessment='H'
                  and a.session_id=${req.cookies.session_id}
                  and e.grand_total='N'
                  and e.marking_type = 'NG'
                  and exam_group='Second'
                  and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
                  ) z

                  group by z.student_id, z.subject_id, z.exam_group
                  order by z.roll_number, z.student_id, z.exam_id, z.order_no) q on (p.student_id=q.student_id and p.subject_id=q.subject_id) ) yy on (xx.student_id=yy.student_id and xx.subject_id=yy.subject_id)`;



    var maxMarksQry = `select subject_id, subject_name, max(marks) as max_marks from 
                     (SELECT a.student_id,a.subject_id, subject_name, sum(marks) as marks 
                     FROM marks_entry_master a
                     join subject_master b on a.subject_id = b.subject_id
                     join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                     join exam_type f on e.exam_id = f.exam_type_id
                     where e.marking_type='N'
                     and f.assessment='H'
                     and a.section_id=${input.section_id}
                     and a.session_id=${req.cookies.session_id}
                     group by a.subject_id,a.student_id) p
                     group by subject_id`;

    var maxMarksQryFinal = `select subject_id, subject_name, max(marks) as max_marks from 
                     (SELECT a.student_id,a.subject_id, subject_name, sum(marks) as marks 
                     FROM marks_entry_master a
                     join subject_master b on a.subject_id = b.subject_id
                     join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                     join exam_type f on e.exam_id = f.exam_type_id
                     where e.marking_type='N'
                     and f.assessment='F'
                     and a.section_id=${input.section_id}
                     and a.session_id=${req.cookies.session_id}
                     group by a.subject_id,a.student_id) p
                     group by subject_id`;                 

    var avgMarksQry = `select subject_id, round(avg(marks)) as avg_marks
                       from
                       (SELECT a.student_id,a.subject_id, sum(if(marks=-1,0,marks)) as marks
                       FROM marks_entry_master a
                       join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                       join exam_type f on e.exam_id = f.exam_type_id
                       where e.marking_type='N'
                       and a.section_id=${input.section_id}
                       and a.session_id=${req.cookies.session_id}
                       group by a.subject_id, a.student_id) x
                       group by subject_id`;

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

    var maturityDevelopmentFinalQry = `select  student_id, exam_term, initiative_first, initiative_second,
                                  initiative_third, initiative_fourth, interest_first, interest_second,
                                  interest_third, interest_fourth, use_time_first, use_time_second,
                                  use_time_third, use_time_fourth, work_habit_first, work_habit_second,
                                  work_habit_third, work_habit_fourth, participation_first, participation_second,
                                  participation_third, participation_fourth, responsibility_first, 
                                  responsibility_second, responsibility_third, responsibility_fourth
                                  from student_maturity_development
                                  where student_id in (${input.student_id})
                                  and exam_term='Final'
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

    var physicalFitnessFinalQry =`select student_id, first_skill, first_description, second_skill, 
                            second_description, third_skill, third_description, fourth_skill,
                            fourth_description, fifth_skill, fifth_description
                            from student_fitness a
                            where a.student_id in (${input.student_id})
                            and exam_term = 'First'
                            and session_id = ${req.cookies.session_id} 
                            order by student_id`;                        

    var attendanceQry = `select a.student_id, 'Attendance' as subject_name,
                         concat( (concat(pr, '/')),(COALESCE(ab,0)+pr)) as second_marks, 'At' as show_in,
                         concat( (concat(pr1, '/')),(COALESCE(ab1,0)+pr1)) as second_marks_final,
                         concat( (concat((pr+pr1), '/')),(COALESCE(ab,0)+pr+COALESCE(ab1,0)+pr1)) as final_att,
                         FORMAT(((pr+pr1)*100)/(COALESCE(ab,0)+pr+COALESCE(ab1,0)+pr1),2) as final_att_percentage from
                        
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
                         and attendance_date <='${input.end_date}' group by student_id) b on a.student_id=b.student_id
                        
                        left join

                         (select student_id, count(attendance_date) as pr1
                         from student_attendance 
                         where attendance = '1' and student_id in (${input.student_id})
                         and session_id=${req.cookies.session_id}
                         and attendance_date <='${input.end_date_final}' group by student_id) a1 on a.student_id = a1.student_id
                        
                        left join

                        (select student_id, count(attendance_date) as ab1
                         from student_attendance 
                         where attendance = '0' and student_id in(${input.student_id})
                         and session_id=${req.cookies.session_id}
                         and attendance_date <='${input.end_date_final}' group by student_id) b1 on a.student_id=b1.student_id`;

     var qry = groupByQry+';'+marksQry+';'+studentDetailsQuery+';'+maxMarksQry+';'+avgMarksQry+';'+maturityDevelopmentQry+';'+physicalFitnessQry+';'+attendanceQry+';'+maxMarksQryFinal+';'+maturityDevelopmentFinalQry+';'+physicalFitnessFinalQry;
      console.log(avgMarksQry);

     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';
        }else{
          data.status = 's';

          //student details
          var studentDetails = {};
          result[2].map(r=>{
              studentDetails[r.student_id]=r
          })
          
          //converting max_marks as onject by subject_id
          var maxMarks={}
          result[3].map(r=>{
              maxMarks[r.subject_id]=r.max_marks
          })

          var maxMarksFinal={}
          result[8].map(r=>{
              maxMarksFinal[r.subject_id]=r.max_marks
          })

          //converting avg_marks as onject by subject_id
          var avgMarks={}
          result[4].map(r=>{
              avgMarks[r.subject_id]=r.avg_marks
          })

          //maturity development
          var maturityDevelopment={}
          result[5].map(r=>{
              maturityDevelopment[r.student_id]=r
          })

          var maturityDevelopmentFinal={}
          result[9].map(r=>{
              maturityDevelopmentFinal[r.student_id]=r
          })

          //physicalFitness
          var physicalFitness={}
          result[6].map(r=>{
              physicalFitness[r.student_id]=r
          })

          var physicalFitnessFinal={}
          result[10].map(r=>{
              physicalFitnessFinal[r.student_id]=r
          })

          //attendance
          var attendance={}
          result[7].map(r=>{
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
              r.max_marks_final=maxMarksFinal[r.subject_id]
              r.avg_marks=avgMarks[r.subject_id]
              obj.push(r)
            }else if(r.student_id==student_id){
              r.max_marks=maxMarks[r.subject_id]
              r.max_marks_final=maxMarksFinal[r.subject_id]
              r.avg_marks=avgMarks[r.subject_id]
              obj.push(r)
            }else{
              obj.push(attendance[student_id])
              var row={}
              row[student_id]=student_id
              row['marks']=obj
              row['details']=studentDetails[student_id]
              row['md']=maturityDevelopment[student_id]
              row['mdf']=maturityDevelopmentFinal[student_id]
              row['pf']=physicalFitness[student_id]
              row['pf_final']=physicalFitnessFinal[student_id]
              marks_data.push(row)
              student_id=r.student_id
              obj=[]
              r.max_marks=maxMarks[r.subject_id]
              r.max_marks_final=maxMarksFinal[r.subject_id]
              r.avg_marks=avgMarks[r.subject_id]
              obj.push(r)
            }
          })

          obj.push(attendance[student_id])
          var row={}
          row[student_id]=student_id
          row['marks']=obj
          row['details']=studentDetails[student_id]
          row['md']=maturityDevelopment[student_id]
          row['mdf']=maturityDevelopmentFinal[student_id]
          row['pf']=physicalFitness[student_id]
          row['pf_final']=physicalFitnessFinal[student_id]
          marks_data.push(row)


          marks_data.map(r=>{
              var first_marks_total=0
              var second_marks_total=0
              var mo_marks_total=0

              var first_marks_final_total=0
              var second_marks_final_total=0
              var mo_marks_final_total=0

              var last_index=0
            r.marks.map((r1,index)=>{
              if(r1.marking_type=='N'){
                if(r1.first_marks!=-1){
                  first_marks_total = Number(first_marks_total) + Number(r1.first_marks)
                }
                if(r1.second_marks!=-1){
                  second_marks_total = Number(second_marks_total) +  Number(r1.second_marks)
                }
                mo_marks_total = Number(mo_marks_total) +  Number(r1.mo_marks)

                if(r1.first_marks_final!=-1){
                  first_marks_final_total = Number(first_marks_final_total) + Number(r1.first_marks_final)
                }
                if(r1.second_marks_final!=-1){
                  second_marks_final_total = Number(second_marks_final_total) +  Number(r1.second_marks_final)
                }
                mo_marks_final_total = Number(mo_marks_final_total) +  Number(r1.mo_marks_final)


                last_index=index
              }
            })

            var fm_t_p = first_marks_total + ' ' + ((first_marks_total/(30*(last_index+1)))*100).toFixed(2)+'%'
            var sm_t_p = second_marks_total + ' ' + ((second_marks_total/(120*(last_index+1)))*100).toFixed(2)+'%'
            var mo_t_p = mo_marks_total + ' ' + ((mo_marks_total/(150*(last_index+1)))*100).toFixed(2)+'%'

            var fm_t_p_final = first_marks_final_total + ' ' + ((first_marks_final_total/(30*(last_index+1)))*100).toFixed(2)+'%'
            var sm_t_p_final = second_marks_final_total + ' ' + ((second_marks_final_total/(120*(last_index+1)))*100).toFixed(2)+'%'
            var mo_t_p_final = mo_marks_final_total + ' ' + ((mo_marks_final_total/(150*(last_index+1)))*100).toFixed(2)+'%'

            var final_p = (Number(mo_marks_total) + Number(mo_marks_final_total))

            var show_final_p = final_p + ' ' + ((final_p/(150*(last_index+1)))*100).toFixed(2)+'%'

            r.marks.splice((last_index+1), 0, {'subject_name':'Total','first_marks':fm_t_p,'second_marks':sm_t_p, 'mo_marks':mo_t_p,'first_marks_final':fm_t_p_final,'second_marks_final':sm_t_p_final, 'mo_marks_final':mo_t_p_final,'final_mo':show_final_p, 'class':'total', 'marking_type':'T'});

          })

          data.marks = marks_data // marks
          data.avgMarks= avgMarks // max_marks of subject_id
          //data.maturityDevelopmentQry=maturityDevelopment
          // data.physicalFitness=result[4]
          data.physicalFitness=physicalFitness
          data.attendance=attendance
          
          res.send(data)
        }
     });    
  });

});

router.post('/read_final_assessment_report_card_nine/', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log("HERE");
  console.log(input);

  req.getConnection(function(err,connection){
       
    var data = {}

    var groupByQry = `SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`; 

    var studentDetailsQuery = `select distinct a.student_id, enroll_number, a.session_id,
                            concat(first_name,' ',middle_name,' ',last_name)as student_name,
                            date_format(dob, '%d/%m/%Y') as  dob, house_name, session_name,
                            date_format(doa, '%d/%m/%Y') as doa,
                            concat(concat(date_format(doa, '%Y'),'-'),(date_format(doa, '%Y')+1)) as year
                            from marks_entry_master a
                            join student_master b on (a.student_id=b.student_id and b.current_session_id = ${req.cookies.session_id})
                            join student_current_standing c on (b.student_id=c.student_id and a.session_id=c.session_id and b.current_session_id = ${req.cookies.session_id}) 
                            join session_master d on a.session_id = d.session_id
                            left join house_master e on c.house_id = e.house_id
                            where a.student_id in (${input.student_id})
                            and a.session_id=${req.cookies.session_id}
                            order by 1`; 

    var marksQry = `select yy.roll_number, yy.student_id, yy.subject_id,
                    xx.first_marks, xx.second_marks,
                    (xx.mo_marks+yy.mo_marks) as mo_marks,
                    xx.first_marks_limit,xx.second_marks_limit,
                    xx.first_min_marks, xx.second_min_marks,
                    yy.first_marks as first_marks_final, yy.second_marks as second_marks_final,
                    yy.mo_marks as mo_marks_final,
                    yy.first_marks_limit as first_marks_limit_final, yy.second_marks_limit as second_marks_limit_final,
                    yy.first_min_marks as first_min_marks_final, yy.second_min_marks as second_min_marks_final,
                    yy.show_in, yy.marking_type, yy.subject_group, yy.subject_name, yy.order_no
                    from 
                    

                    (select q.roll_number, q.student_id, q.subject_id,
                    if((p.marks=-1),'Ab',p.marks) as first_marks,
                    if((q.marks=-1),'Ab',q.marks) as second_marks,
                    (coalesce(p.marks,0)+coalesce(q.marks,0)) as mo_marks,
                    q.subject_name, q.order_no,
                    CAST(p.min_marks AS UNSIGNED) as first_min_marks, (q.min_marks) as second_min_marks, q.show_in, q.marking_type,
                    if((p.marks<p.min_marks and q.marking_type ='N'),'error','normal') as first_marks_limit,
                    if((q.marks<(q.min_marks) and q.marking_type ='N'),'error','normal') as second_marks_limit, q.subject_group from

                    (select roll_number, student_id, exam_id, subject_id, subject_name, marks, exam_group, order_no,
                     min_marks, show_in, marking_type from
                    (select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    where a.student_id in (${input.student_id})
                    and f.assessment='F'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='Y'
                    and exam_group='First'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                    UNION

                    select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks_grade as marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    where a.student_id in (${input.student_id})
                    and f.assessment='F'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='N'
                    and e.marking_type = 'G'
                    and exam_group='First'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                    UNION

                    select distinct roll_number, a.student_id, a.exam_id, a.subject_id, i.grade as  marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    left join grade_master i on a.grade_id = i.grade_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    where a.student_id in (${input.student_id})
                    and f.assessment='F'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='N'
                    and e.marking_type = 'NG'
                    and exam_group='First'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
                    ) z

                    group by z.student_id, z.subject_id
                    order by z.roll_number, z.student_id, z.exam_id, z.subject_id) p

                    right join

                    (select roll_number, student_id, exam_id, subject_id, subject_name, marks, exam_group, order_no, min_marks,
                     show_in, marking_type, subject_group from
                    (select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type, subject_group
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    left join (select x.subject_id, x.session_id, subject_group
                          from subject_group_subject_map x
                          where session_id = ${req.cookies.session_id}) z on (a.subject_id = z.subject_id and a.session_id = z.session_id)
                    where a.student_id in (${input.student_id})
                    and f.assessment='F'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='Y'
                    and exam_group='Second'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                    UNION

                    select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks_grade as marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type, subject_group
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    left join (select x.subject_id, x.session_id, subject_group
                          from subject_group_subject_map x
                          where session_id = ${req.cookies.session_id}) z on (a.subject_id = z.subject_id and a.session_id = z.session_id)
                    where a.student_id in (${input.student_id})
                    and f.assessment='F'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='N'
                    and e.marking_type = 'G'
                    and exam_group='Second'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                    UNION

                    select distinct roll_number, a.student_id, a.exam_id, a.subject_id, i.grade as  marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type, subject_group
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    left join grade_master i on a.grade_id = i.grade_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    left join (select x.subject_id, x.session_id, subject_group
                          from subject_group_subject_map x
                          where session_id = ${req.cookies.session_id}) z on (a.subject_id = z.subject_id and a.session_id = z.session_id)
                    where a.student_id in (${input.student_id})
                    and f.assessment='F'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='N'
                    and e.marking_type = 'NG'
                    and exam_group='Second'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
                    ) z

                    group by z.student_id, z.subject_id
                    order by z.roll_number, z.student_id, z.exam_id, z.subject_id) q on (p.student_id=q.student_id and p.subject_id=q.subject_id)
                    order by q.student_id, q.order_no) yy

                    left join

                    (select q.roll_number, q.student_id, q.subject_id,
                    if((p.marks=-1),'Ab',p.marks) as first_marks,
                    if((q.marks=-1),'Ab',q.marks) as second_marks,
                    (coalesce(p.marks,0)+coalesce(q.marks,0)) as mo_marks,
                    q.subject_name, q.order_no,
                    CAST(p.min_marks AS UNSIGNED) as first_min_marks, (q.min_marks) as second_min_marks, q.show_in, q.marking_type,
                    if((p.marks<p.min_marks and q.marking_type ='N'),'error','normal') as first_marks_limit,
                    if((q.marks<(q.min_marks) and q.marking_type ='N'),'error','normal') as second_marks_limit, q.subject_group from

                    (select roll_number, student_id, exam_id, subject_id, subject_name, marks, exam_group, order_no,
                     min_marks, show_in, marking_type from
                    (select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    where a.student_id in (${input.student_id})
                    and f.assessment='H'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='Y'
                    and exam_group='First'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                    UNION

                    select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks_grade as marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    where a.student_id in (${input.student_id})
                    and f.assessment='H'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='N'
                    and e.marking_type = 'G'
                    and exam_group='First'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                    UNION

                    select distinct roll_number, a.student_id, a.exam_id, a.subject_id, i.grade as  marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    left join grade_master i on a.grade_id = i.grade_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    where a.student_id in (${input.student_id})
                    and f.assessment='H'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='N'
                    and e.marking_type = 'NG'
                    and exam_group='First'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
                    ) z

                    group by z.student_id, z.subject_id
                    order by z.roll_number, z.student_id, z.exam_id, z.subject_id) p

                    right join

                    (select roll_number, student_id, exam_id, subject_id, subject_name, marks, exam_group, order_no, min_marks,
                     show_in, marking_type, subject_group from
                    (select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type, subject_group
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    left join (select x.subject_id, x.session_id, subject_group
                          from subject_group_subject_map x
                          where session_id = ${req.cookies.session_id}) z on (a.subject_id = z.subject_id and a.session_id = z.session_id)
                    where a.student_id in (${input.student_id})
                    and f.assessment='H'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='Y'
                    and exam_group='Second'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                    UNION

                    select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks_grade as marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type, subject_group
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    left join (select x.subject_id, x.session_id, subject_group
                          from subject_group_subject_map x
                          where session_id = ${req.cookies.session_id}) z on (a.subject_id = z.subject_id and a.session_id = z.session_id)
                    where a.student_id in (${input.student_id})
                    and f.assessment='H'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='N'
                    and e.marking_type = 'G'
                    and exam_group='Second'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                    UNION

                    select distinct roll_number, a.student_id, a.exam_id, a.subject_id, i.grade as  marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type, subject_group
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    left join grade_master i on a.grade_id = i.grade_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    left join (select x.subject_id, x.session_id, subject_group
                          from subject_group_subject_map x
                          where session_id = ${req.cookies.session_id}) z on (a.subject_id = z.subject_id and a.session_id = z.session_id)
                    where a.student_id in (${input.student_id})
                    and f.assessment='H'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='N'
                    and e.marking_type = 'NG'
                    and exam_group='Second'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
                    ) z

                    group by z.student_id, z.subject_id
                    order by z.roll_number, z.student_id, z.exam_id, z.subject_id) q on (p.student_id=q.student_id and p.subject_id=q.subject_id)
                    order by q.student_id, q.order_no) xx on (yy.student_id=xx.student_id and yy.subject_id=xx.subject_id)
                    order by yy.student_id, yy.order_no`;

    var avgMarksQry = `select subject_id, round(avg(marks)) as avg_marks
                       from
                       (SELECT a.student_id,a.subject_id, sum(if(marks=-1,0,marks)) as marks
                       FROM marks_entry_master a
                       join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                       join exam_type f on e.exam_id = f.exam_type_id
                       where e.marking_type='N'
                       and a.section_id=${input.section_id}
                       and a.session_id=${req.cookies.session_id}
                       group by a.subject_id, a.student_id) x
                       group by subject_id`;

    var groupSubjectCountQry = `select count(subject_group) as group_count, subject_group
                                from subject_group_subject_map 
                                where session_id = ${req.cookies.session_id}
                                group by subject_group`;

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
    var maturityDevelopmentFinalQry = `select  student_id, exam_term, initiative_first, initiative_second,
                                  initiative_third, initiative_fourth, interest_first, interest_second,
                                  interest_third, interest_fourth, use_time_first, use_time_second,
                                  use_time_third, use_time_fourth, work_habit_first, work_habit_second,
                                  work_habit_third, work_habit_fourth, participation_first, participation_second,
                                  participation_third, participation_fourth, responsibility_first, 
                                  responsibility_second, responsibility_third, responsibility_fourth
                                  from student_maturity_development
                                  where student_id in (${input.student_id})
                                  and exam_term='Final'
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

    var physicalFitnessFinalQry =`select student_id, first_skill, first_description, second_skill, 
                            second_description, third_skill, third_description, fourth_skill,
                            fourth_description, fifth_skill, fifth_description
                            from student_fitness a
                            where a.student_id in (${input.student_id})
                            and exam_term = 'Final'
                            and session_id = ${req.cookies.session_id} 
                            order by student_id`;                        

    var attendanceQry = `select a.student_id, 'Attendance' as subject_name,
                         concat( (concat(pr, '/')),(COALESCE(ab,0)+pr)) as second_marks, 'At' as show_in,
                         concat( (concat(pr1-pr, '/')),(-(COALESCE(ab,0)+pr)+(COALESCE((ab1),0)+pr1))) as second_marks_final,
                         concat( (concat((pr1), '/')),(COALESCE(ab1,0)+pr1)) as final_att,
                         FORMAT(((pr1)*100)/(COALESCE(ab1,0)+pr1),2) as final_att_percentage from
                        
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
                         and attendance_date <='${input.end_date}' group by student_id) b on a.student_id=b.student_id
                        
                        left join

                         (select student_id, count(attendance_date) as pr1
                         from student_attendance 
                         where attendance = '1' and student_id in (${input.student_id})
                         and session_id=${req.cookies.session_id}
                         and attendance_date <='${input.end_date_final}' group by student_id) a1 on a.student_id = a1.student_id
                        
                        left join

                        (select student_id, count(attendance_date) as ab1
                         from student_attendance 
                         where attendance = '0' and student_id in(${input.student_id})
                         and session_id=${req.cookies.session_id}
                         and attendance_date <='${input.end_date_final}' group by student_id) b1 on a.student_id=b1.student_id`;


     var qry = groupByQry+';'+marksQry+';'+studentDetailsQuery+';'+avgMarksQry+';'+groupSubjectCountQry+';'+maturityDevelopmentQry+';'+physicalFitnessQry+';'+attendanceQry+';'+maturityDevelopmentFinalQry+';'+physicalFitnessFinalQry;
     console.log(maturityDevelopmentFinalQry)

     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';
        }else{
          data.status = 's';

          //student details
          var studentDetails = {};
          result[2].map(r=>{
              studentDetails[r.student_id]=r
          })
          
          //converting avg_marks as onject by subject_id
          var avgMarks={}
          result[3].map(r=>{
              avgMarks[r.subject_id]=r.avg_marks
          })

          //converting group_count as onject by subject_id
          var subjectCount={}
          result[4].map(r=>{
              subjectCount[r.subject_group]=r.group_count
          })

          //maturity development
          var maturityDevelopment={}
          result[5].map(r=>{
              maturityDevelopment[r.student_id]=r
          })

          var maturityDevelopmentFinal={}
          result[8].map(r=>{
              maturityDevelopmentFinal[r.student_id]=r
          })

          //physicalFitness
          var physicalFitness={}
          result[6].map(r=>{
              physicalFitness[r.student_id]=r
          })

          var physicalFitnessFinal={}
          result[9].map(r=>{
              physicalFitnessFinal[r.student_id]=r
          })

          //attendance
          var attendance={}
          result[7].map(r=>{
              attendance[r.student_id]=r
          })

          //data according to student_id
          var student_id=''
          var marks_data=[]
          var obj=[]
          result[1].map(r=>{
            if(student_id==''){ //loop runs the first time
              student_id=r.student_id
              r.avg_marks=avgMarks[r.subject_id]
              //r.subject_group_count=subjectCount[r.subject_group] 
              obj.push(r)
            }else if(r.student_id==student_id){
              r.avg_marks=avgMarks[r.subject_id]
              //r.subject_group_count=subjectCount[r.subject_group]
              obj.push(r)
            }else{
              obj.push(attendance[student_id])
              var row={}
              row[student_id]=student_id
              row['marks']=obj
              row['details']=studentDetails[student_id]
              row['sd']=studentDetails[student_id]
              row['md']=maturityDevelopment[student_id]
              row['mdf']=maturityDevelopmentFinal[student_id]
              row['pf']=physicalFitness[student_id]
              row['pf_final']=physicalFitnessFinal[student_id]
              marks_data.push(row)
              student_id=r.student_id
              obj=[]
              r.avg_marks=avgMarks[r.subject_id]
              //r.subject_group_count=subjectCount[r.subject_group]
              obj.push(r)
            }
          })

          obj.push(attendance[student_id])
          var row={}
          row[student_id]=student_id
          row['marks']=obj
          row['details']=studentDetails[student_id]
          row['sd']=studentDetails[student_id]
          row['md']=maturityDevelopment[student_id]
          row['mdf']=maturityDevelopmentFinal[student_id]
          row['pf']=physicalFitness[student_id]
          row['pf_final']=physicalFitnessFinal[student_id]
          marks_data.push(row)
         


          marks_data.map(r=>{
              var first_marks_total=0
              var second_marks_total=0

              var first_marks_final_total=0
              var second_marks_final_total=0

              var mo_marks_total=0
              var last_index=0

              var first_marks_count = 0
              var second_marks_count = 0
              var first_marks_final_count = 0
              var second_marks_final_count = 0

            r.marks.map((r1,index)=>{
              if(r1.marking_type=='N'){
                if(r1.first_marks!=-1 && r1.first_marks!=null){
                  first_marks_total = Number(first_marks_total) + Number(r1.first_marks)
                  first_marks_count = Number(first_marks_count) + 1
                }
                if(r1.second_marks!=-1 && r1.second_marks!=null){
                  second_marks_total = Number(second_marks_total) +  Number(r1.second_marks)
                  second_marks_count = Number(second_marks_count) + 1
                }

                if(r1.first_marks_final!=-1 && r1.first_marks_final!=null){
                  first_marks_final_total = Number(first_marks_final_total) + Number(r1.first_marks_final)
                  first_marks_final_count = Number(first_marks_final_count) + 1
                }
                if(r1.second_marks_final!=-1 && r1.second_marks_final!=null){
                  second_marks_final_total = Number(second_marks_final_total) +  Number(r1.second_marks_final)
                  second_marks_final_count = Number(second_marks_final_count) + 1
                }

                mo_marks_total = Number(mo_marks_total) +  Number(r1.mo_marks)
                last_index=index
              }
            })
            console.log(first_marks_count)

            var fm_t_p = first_marks_total + '(' + ((first_marks_total/(50*(first_marks_count)))*100).toFixed(2) + '%)'
            var sm_t_p = second_marks_total + '(' + ((second_marks_total/(100*(second_marks_count)))*100).toFixed(2) + '%)'

            var fm_t_p_final = first_marks_final_total + '(' + ((first_marks_final_total/(50*(first_marks_final_count)))*100).toFixed(2) + '%)'
            var sm_t_p_final = second_marks_final_total + '(' + ((second_marks_final_total/(100*(second_marks_final_count)))*100).toFixed(2) + '%)'
             
            var final_p = Number(first_marks_total) + Number(second_marks_total) + Number(first_marks_final_total) + Number(second_marks_final_total)
            var ttp= (50*(first_marks_count)) + (100*(second_marks_count)) +  (50*(first_marks_final_count)) + (100*(second_marks_final_count))
            var final_percentage =  final_p + ' ' + ((final_p/(ttp))*100).toFixed(2) + '%'

            var mo_t_p = mo_marks_total + '/' + ((mo_marks_total/(150*(last_index+1)))*100).toFixed(2)

            r.marks.splice((last_index+1), 0, {'subject_name':'Total','first_marks':fm_t_p,'second_marks':sm_t_p, 'first_marks_final':fm_t_p_final,'second_marks_final':sm_t_p_final, 'mo_marks':mo_t_p, 'final_per':final_percentage, 'class':'total', 'marking_type':'T'});

          })


          //avg_marks

          marks_data.map(r=>{
            var prev_subject_group = ''
            
            var prev_subject_total = 0;
            var prev_subject_total_2 = 0;

            var prev_subject_final_total = 0;
            var prev_subject_final_total_2 = 0;

            var prev_subject_count = 0;
            var first_index = 0;// used for rowspan and show avg data
            var last_index = 0;// used to drwa line

            var data_inserted = false;
           
            r.marks.map((r1,index)=>{
              
              if(r1.marking_type=='N' && r1.subject_group !=null){
                if(prev_subject_group == ''){//loop runs first time
                  prev_subject_group = r1.subject_group

                  prev_subject_total_2 = Number(r1.second_marks)
                  prev_subject_total = Number(r1.first_marks)

                  prev_subject_final_total_2 = Number(r1.second_marks_final)
                  prev_subject_final_total = Number(r1.first_marks_final)

                  prev_subject_count = 1
                  first_index=index
                  last_index=index
                  data_inserted = false
                }else if(prev_subject_group == r1.subject_group){
                  prev_subject_total = Number(prev_subject_total) + Number(r1.first_marks)
                  prev_subject_total_2 = Number(prev_subject_total_2) + Number(r1.second_marks)

                  prev_subject_final_total = Number(prev_subject_final_total) + Number(r1.first_marks_final)
                  prev_subject_final_total_2 = Number(prev_subject_final_total_2) + Number(r1.second_marks_final)


                  prev_subject_count = Number(prev_subject_count) + 1
                  last_index=index
                  data_inserted = false
                }else{
                  r.marks[first_index].first_avg_marks = (Number(prev_subject_total)/Number(prev_subject_count)).toFixed(2)
                  r.marks[first_index].second_avg_marks = (Number(prev_subject_total_2)/Number(prev_subject_count)).toFixed(2)

                  r.marks[first_index].first_avg_marks_final = (Number(prev_subject_final_total)/Number(prev_subject_count)).toFixed(2)
                  r.marks[first_index].second_avg_marks_final = (Number(prev_subject_final_total_2)/Number(prev_subject_count)).toFixed(2)

                  r.marks[first_index].subject_group_count = prev_subject_count
                  r.marks[last_index].subject_group_class = 'draw-line'
                  //prevent extra td in next rows
                  var rows = Number(prev_subject_count) - 1
                  var next_index=Number(first_index) + 1
                  while(rows>0){
                    r.marks[next_index].hide_avg_td = true
                    rows = Number(rows) - 1
                    next_index = Number(next_index) + 1
                  }

                  data_inserted = true
                  prev_subject_group = r1.subject_group

                  prev_subject_total = Number(r1.first_marks)
                  prev_subject_total_2 = Number(r1.second_marks)

                  prev_subject_final_total_2 = Number(r1.second_marks_final)
                  prev_subject_final_total = Number(r1.first_marks_final)

                  prev_subject_count = 1
                  first_index=index
                  last_index=index
                  data_inserted = false
                }
              }

            })

            if(data_inserted==false){
                r.marks[first_index].first_avg_marks = (Number(prev_subject_total)/Number(prev_subject_count)).toFixed(2)
                r.marks[first_index].second_avg_marks = (Number(prev_subject_total_2)/Number(prev_subject_count)).toFixed(2)

                r.marks[first_index].first_avg_marks_final = (Number(prev_subject_final_total)/Number(prev_subject_count)).toFixed(2)
                r.marks[first_index].second_avg_marks_final = (Number(prev_subject_final_total_2)/Number(prev_subject_count)).toFixed(2)

                r.marks[first_index].subject_group_count = prev_subject_count
                r.marks[last_index].subject_group_class = 'draw-line'
                //prevent extra td in next rows
                var rows = Number(prev_subject_count) - 1
                var next_index=Number(first_index) + 1
                while(rows>0){
                  r.marks[next_index].hide_avg_td = true
                  rows = Number(rows) - 1
                  next_index = Number(next_index) + 1
                }
              }

          })

          data.marks = marks_data // marks
          //data.subjectCount= subjectCount 
          // data.physicalFitness=result[4]
          // data.physicalFitness=physicalFitness
          data.avgMarks=avgMarks
          
          res.send(data)
        }
     });    
  });

});


router.post('/read_final_assessment_report_card_eleven/', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log("HERE");
  console.log(input);

  req.getConnection(function(err,connection){
       
    var data = {}

    var groupByQry = `SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`; 

    var studentDetailsQuery = `select distinct a.student_id, enroll_number, a.session_id,
                            concat(first_name,' ',middle_name,' ',last_name)as student_name,
                            date_format(dob, '%d/%m/%Y') as  dob, house_name, session_name,
                            date_format(doa, '%d/%m/%Y') as doa,
                            concat(concat(date_format(doa, '%Y'),'-'),(date_format(doa, '%Y')+1)) as year
                            from marks_entry_master a
                            join student_master b on (a.student_id=b.student_id and b.current_session_id = ${req.cookies.session_id})
                            join student_current_standing c on (b.student_id=c.student_id and a.session_id=c.session_id and b.current_session_id = ${req.cookies.session_id}) 
                            join session_master d on a.session_id = d.session_id
                            left join house_master e on c.house_id = e.house_id
                            where a.student_id in (${input.student_id})
                            and a.session_id=${req.cookies.session_id}
                            order by 1`;

    var marksQry = `select q.roll_number, q.student_id, q.subject_id,
                    if((p.marks=-1),'Ab',p.marks) as first_marks,
                    if((q.marks=-1),'Ab',q.marks) as second_marks,
                    (coalesce(p.marks,0)+coalesce(q.marks,0)) as mo_marks,
                    q.subject_name, q.order_no, 
                    CAST(p.min_marks AS UNSIGNED) as first_min_marks, (q.min_marks) as second_min_marks, q.show_in, q.marking_type,
                    if((p.marks<p.min_marks and q.marking_type ='N'),'error','normal') as first_marks_limit,
                    if((q.marks<(q.min_marks) and q.marking_type ='N'),'error','normal') as second_marks_limit, q.subject_group from

                    (select roll_number, student_id, exam_id, subject_id, subject_name, marks, exam_group, order_no,
                     min_marks, show_in, marking_type from
                    (select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    where a.student_id in (${input.student_id})
                    and f.assessment='H'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='Y'
                    and exam_group='First'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                    UNION

                    select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks_grade as marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    where a.student_id in (${input.student_id})
                    and f.assessment='H'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='N'
                    and e.marking_type = 'G'
                    and exam_group='First'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                    UNION

                    select distinct roll_number, a.student_id, a.exam_id, a.subject_id, i.grade as  marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    left join grade_master i on a.grade_id = i.grade_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    where a.student_id in (${input.student_id})
                    and f.assessment='H'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='N'
                    and e.marking_type = 'NG'
                    and exam_group='First'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
                    ) z

                    group by z.student_id, z.subject_id
                    order by z.roll_number, z.student_id, z.exam_id, z.subject_id) p

                    right join

                    (select roll_number, student_id, exam_id, subject_id, subject_name, marks, exam_group, order_no, min_marks,
                     show_in, marking_type, subject_group from
                    (select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type, subject_group
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    left join (select x.subject_id, x.session_id, subject_group
                          from subject_group_subject_map x
                          where session_id = ${req.cookies.session_id}) z on (a.subject_id = z.subject_id and a.session_id = z.session_id)
                    where a.student_id in (${input.student_id})
                    and f.assessment='H'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='Y'
                    and exam_group='Second'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                    UNION

                    select distinct roll_number, a.student_id, a.exam_id, a.subject_id, marks_grade as marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type, subject_group
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    left join (select x.subject_id, x.session_id, subject_group
                          from subject_group_subject_map x
                          where session_id = ${req.cookies.session_id}) z on (a.subject_id = z.subject_id and a.session_id = z.session_id)
                    where a.student_id in (${input.student_id})
                    and f.assessment='H'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='N'
                    and e.marking_type = 'G'
                    and exam_group='Second'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})

                    UNION

                    select distinct roll_number, a.student_id, a.exam_id, a.subject_id, i.grade as  marks,
                    subject_name, exam_group, h.order_no, e.min_marks, show_in, marking_type, subject_group
                    from marks_entry_master a
                    join student_current_standing c on (a.student_id=c.student_id and a.session_id=c.session_id)
                    join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
                    join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                    join exam_type f on e.exam_id = f.exam_type_id
                    left join grade_master i on a.grade_id = i.grade_id
                    join subject_master g on a.subject_id = g.subject_id
                    join group_subject_map h on (c.group_id=h.group_id and a.subject_id = h.subject_id and h.session_id=${req.cookies.session_id})
                    left join (select x.subject_id, x.session_id, subject_group
                          from subject_group_subject_map x
                          where session_id = ${req.cookies.session_id}) z on (a.subject_id = z.subject_id and a.session_id = z.session_id)
                    where a.student_id in (${input.student_id})
                    and f.assessment='H'
                    and a.session_id=${req.cookies.session_id}
                    and e.grand_total='N'
                    and e.marking_type = 'NG'
                    and exam_group='Second'
                    and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
                    ) z

                    group by z.student_id, z.subject_id
                    order by z.roll_number, z.student_id, z.exam_id, z.subject_id) q on (p.student_id=q.student_id and p.subject_id=q.subject_id)
                    order by q.student_id, q.order_no`;

    var avgMarksQry = `select subject_id, subject_name, max(marks) as avg_marks from 

                     (SELECT a.student_id,a.subject_id, subject_name, round(sum(marks)/count(a.student_id)) as marks 
                     FROM marks_entry_master a
                     join subject_master b on a.subject_id = b.subject_id
                     join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                     join exam_type f on e.exam_id = f.exam_type_id
                     where e.marking_type='N'
                     and f.assessment='H'
                     and a.section_id=${input.section_id}
                     and a.session_id=${req.cookies.session_id}
                     group by a.subject_id,a.student_id) p

                     group by subject_id`;

    var firstMaxMarksQry = `select subject_id, max(marks) as max_marks
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
                            and exam_group='first'
                            group by a.student_id, a.subject_id, f.assessment
                            order by a.subject_id,a.student_id
                            ) zz
                            group by zz.subject_id`;

    var secondMaxMarksQry = `select subject_id, max(marks) as max_marks
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
                            and exam_group='Second'
                            group by a.student_id, a.subject_id, f.assessment
                            order by a.subject_id,a.student_id
                            ) zz
                            group by zz.subject_id`;                  



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
                         concat( (concat(pr, '/')),(COALESCE(ab,0)+pr)) as second_marks, 'At' as show_in from
                        (select student_id, count(attendance_date) as pr 
                         from student_attendance 
                         where attendance = '1' and student_id in (${input.student_id})
                         and session_id=${req.cookies.session_id}
                         and attendance_date <='${input.end_date}' group by student_id) a
                        
                        left join

                        (select student_id, count(attendance_date) as ab 
                         from student_attendance 
                         where attendance = '0' and student_id in (${input.student_id})
                         and session_id=${req.cookies.session_id}
                         and attendance_date <='${input.end_date}' group by student_id) b on a.student_id=b.student_id`;

     var qry = groupByQry+';'+marksQry+';'+studentDetailsQuery+';'+avgMarksQry+';'+firstMaxMarksQry+';'+maturityDevelopmentQry+';'+physicalFitnessQry+';'+attendanceQry+';'+secondMaxMarksQry;


     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';
        }else{
          data.status = 's';

          //student details
          var studentDetails = {};
          result[2].map(r=>{
              studentDetails[r.student_id]=r
          })

          //avg
          var avgMarks={}
          result[3].map(r=>{
              avgMarks[r.subject_id]=r.avg_marks
          })
          
          //converting firstMaxMarks as onject by subject_id
          var firstMaxMarks={}
          result[4].map(r=>{
              firstMaxMarks[r.subject_id]=r.max_marks
          })

          var secondMaxMarks={}
          result[8].map(r=>{
              secondMaxMarks[r.subject_id]=r.max_marks
          })

          //maturity development
          var maturityDevelopment={}
          result[5].map(r=>{
              maturityDevelopment[r.student_id]=r
          })

          //physicalFitness
          var physicalFitness={}
          result[6].map(r=>{
              physicalFitness[r.student_id]=r
          })

          //attendance
          var attendance={}
          result[7].map(r=>{
              attendance[r.student_id]=r
          })

          //data according to student_id
          var student_id=''
          var marks_data=[]
          var obj=[]
          result[1].map(r=>{
            if(student_id==''){ //loop runs the first time
              student_id=r.student_id
              r.avg_marks=avgMarks[r.subject_id]
              r.first_max_marks=firstMaxMarks[r.subject_id]
              r.second_max_marks=secondMaxMarks[r.subject_id]
              obj.push(r)
            }else if(r.student_id==student_id){
              r.avg_marks=avgMarks[r.subject_id]
              r.first_max_marks=firstMaxMarks[r.subject_id]
              r.second_max_marks=secondMaxMarks[r.subject_id]
              obj.push(r)
            }else{
              obj.push(attendance[student_id])
              var row={}
              row[student_id]=student_id
              row['marks']=obj
              row['details']=studentDetails[student_id]
              row['sd']=studentDetails[student_id]
              row['md']=maturityDevelopment[student_id]
              row['pf']=physicalFitness[student_id]
              marks_data.push(row)
              student_id=r.student_id
              obj=[]
              r.avg_marks=avgMarks[r.subject_id]
              r.first_max_marks=firstMaxMarks[r.subject_id]
              r.second_max_marks=secondMaxMarks[r.subject_id]
              obj.push(r)
            }
          })

          obj.push(attendance[student_id])
          var row={}
          row[student_id]=student_id
          row['marks']=obj
          row['details']=studentDetails[student_id]
          row['sd']=studentDetails[student_id]
          row['md']=maturityDevelopment[student_id]
          row['pf']=physicalFitness[student_id]
          marks_data.push(row)
         

          data.marks = marks_data // marks
          //data.subjectCount= subjectCount 
          // data.physicalFitness=result[4]
          // data.physicalFitness=physicalFitness
          
          res.send(data)
        }
     });    
  });

});

module.exports = router;
