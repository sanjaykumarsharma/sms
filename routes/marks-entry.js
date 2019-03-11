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

        }else{
            data.status = 's';
            data.examTypes = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


//read subjects
router.get('/subjects/:standard_id/:section_id', function(req, res, next) {
  var teacher_id = req.cookies.emp_id;
  var standard_id = req.params.standard_id
  var section_id = req.params.section_id
  var session_id = req.cookies.session_id
  req.getConnection(function(err,connection){
    var data = {}
    var condition="";
      if(req.cookies.role== "Teacher" || req.cookies.role=="Class Teacher"){
        var qry =`select  a.subject_id, subject_name
                  from time_table a
                  join subject_master b on a.subject_id = b.subject_id
                  where teacher_id = ${teacher_id}
                  and section_id = ${section_id}
                  and session_id = ${session_id}
                  group by a.subject_id
                  order by subject_name`;
      }else{
        var qry =`select distinct b.session_id, b.subject_id, subject_name
                  from student_group a 
                  JOIN group_subject_map b on (a.group_id=b.group_id and b.session_id= ${session_id})
                  JOIN  subject_master c on b.subject_id=c.subject_id 
                  where a.standard_id= ${standard_id} and a.section_id=${section_id}
                  order by subject_name`;
      }
       

      console.log(qry)
     
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading category : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.subjects = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

// reade marks limit
router.get('/marks-limit/:section_id/:subject_id/:exam_type_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select marks_id, marking_type, max_marks, 
                min_marks, details, exam_group 
                from marks_setting  a  
                join exam_type b on a.exam_id = b.exam_type_id
                where section_id=?
                and subject_id=?
                and exam_id=?
                limit 1`;

         console.log(qry)
     
     connection.query(qry,[req.params.section_id,req.params.subject_id,req.params.exam_type_id],function(err,result)     {
            
        if(err){
           console.log("Error reading marks limit : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
           res.send(JSON.stringify(data))
        }else{
            data.status = 's';
            data.marksLimit = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

// reade marks entries
router.get('/marks-entries/:exam_type_id/:section_id/:subject_id/:marking_type', function(req, res, next) {

  req.getConnection(function(err,connection){
    var data = {}
    var qry ='';
     
    if(req.params.marking_type=='N'){
        qry=`select a.id, b.roll_number,b.enroll_number, b.student_id,if(a.marks = -1,'AB',a.marks)as marks, 
            concat(first_name,' ',middle_name,' ',last_name) as name
            from marks_entry_master a 
            join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
            join student_current_standing d on (b.student_id=d.student_id and b.current_session_id = ${req.cookies.session_id})
            where  a.subject_id= ${req.params.subject_id}
            and a.section_id= ${req.params.section_id}
            and a.exam_id= ${req.params.exam_type_id}
            and d.session_id= ${req.cookies.session_id}
            and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
            ORDER BY first_name, middle_name, last_name,b.enroll_number`;
    }else if(req.params.marking_type=='NG'){
        qry=`select a.id, b.roll_number,b.enroll_number, b.student_id,if(a.marks = -1,'AB',a.marks)as marks,c.grade as marks_grade, 
            concat(first_name,' ',middle_name,' ',last_name) as name
            from marks_entry_master a 
            join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
            left join grade_master c on a.grade_id = c.grade_id
            join student_current_standing d on (b.student_id=d.student_id and b.current_session_id = ${req.cookies.session_id})
            where  a.subject_id=${req.params.subject_id}
            and a.section_id=${req.params.section_id}
            and a.exam_id=${req.params.exam_type_id}
            and d.session_id= ${req.cookies.session_id}
            and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
            ORDER BY  first_name, middle_name, last_name,b.enroll_number`;
    }else{
        qry=`select a.id, b.roll_number,b.enroll_number, b.student_id,if(a.marks_grade = '-1','AB',a.marks_grade)as marks_grade, 
            concat(first_name,' ',middle_name,' ',last_name) as name
            from marks_entry_master a 
            join student_master b on (a.student_id = b.student_id and b.current_session_id = ${req.cookies.session_id})
            join student_current_standing d on (b.student_id=d.student_id and b.current_session_id = ${req.cookies.session_id})
            where  a.subject_id=${req.params.subject_id}
            and a.section_id=${req.params.section_id}
            and a.exam_id=${req.params.exam_type_id}
            and d.session_id= ${req.cookies.session_id}
            and (b.withdraw='N' || b.withdraw_session > ${req.cookies.session_id})
            ORDER BY  first_name, middle_name, last_name,b.enroll_number`;
    }      
    
    
    // console.log(qry)
    var qry1 = `select d.student_id, roll_number, enroll_number, concat(first_name,' ',middle_name,' ',last_name) as name
              from ( select group_id,subject_id from group_subject_map where subject_id=${req.params.subject_id} and session_id=${req.cookies.session_id}) a
              JOIN student_group b on a.group_id=b.group_id
              JOIN student_current_standing c on b.group_id=c.group_id
              JOIN student_master d on (c.student_id=d.student_id and d.current_session_id = ${req.cookies.session_id})
              where c.section_id=${req.params.section_id} 
              and d.student_id not in (select student_id from marks_entry_master 
              where section_id=${req.params.section_id} and exam_id=${req.params.exam_type_id} and subject_id=${req.params.subject_id} )
              and c.session_id= ${req.cookies.session_id}
              and (d.withdraw='N' || d.withdraw_session > ${req.cookies.session_id} )
              order by first_name,middle_name,last_name,enroll_number limit 1`;

    var  query1 = qry+';'+qry1;
    console.log(query1);
     connection.query(query1,function(err,marksEntries)     {
            
        if(err){
           console.log("Error reading marks entries : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.marksEntries = marksEntries[0];
            data.students = marksEntries[1];
            res.send(data)
        }
     
     });

    //reading students
    

    // connection.query(qry,function(err,students)     {
            
    //     if(err){
    //        console.log("Error reading students : %s ",err );
    //        data.status = 'e';

    //     }else{
    //         data.status = 's';
    //         data.students = students;
    //         res.send(JSON.stringify(data))
    //     }
     
    //  }); 
       
  });

});


// Add marks Settings listing.
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

        var today = new Date();
        var data = {}
        var values = {};
        values['marks_id'] = input.marks_id            
        values['student_id'] = input.student_id            
        values['teacher_id'] = req.cookies.user
        values['exam_id'] = input.exam_id            
        values['subject_id'] = input.subject_id
        values['section_id'] = input.section_id
        values['session_id'] = req.cookies.session_id
        values['marks_group'] = input.marks_group
        values['creation_date']= today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        values['modified_by']= req.cookies.user;
        
        var qry = `insert into marks_entry_master set ?`;

        if(input.marking_type =='N'){
          values['marks'] = input.marks
          values['grade_id']= 0;
        }else if(input.marking_type =='G'){
          values['marks_grade'] = input.marks_grade
          values['marks'] = 0
          values['grade_id']= 0;
        }else if(input.marking_type =='NG') {
          values['marks'] = input.marks
          if(input.marks ==-1){   
            values['grade_id']= -1;
            qry = `insert into marks_entry_master(marks_id, student_id, teacher_id, 
                   exam_id, subject_id, section_id, marks_group,
                   marks, grade_id, session_id, creation_date, modified_by)
                   values(${input.marks_id},${input.student_id}, '${req.cookies.user}',
                   ${input.exam_id}, ${input.subject_id}, ${input.section_id}, '${input.marks_group}', ${input.marks},
                   -1,
                   ${req.cookies.session_id}, curdate(), '${req.cookies.user}')`;                   
          }else{
            qry = `insert into marks_entry_master(marks_id, student_id, teacher_id, 
                   exam_id, subject_id, section_id, marks_group,
                   marks, grade_id, session_id, creation_date, modified_by)
                   values(${input.marks_id},${input.student_id}, '${req.cookies.user}',
                   ${input.exam_id}, ${input.subject_id}, ${input.section_id}, '${input.marks_group}', ${input.marks},
                   (SELECT grade_id from grade_master WHERE min_marks<=${input.marks} and max_marks>=${input.marks} and exam_id=${input.exam_id}),
                   ${req.cookies.session_id}, curdate(), '${req.cookies.user}')`;
            console.log(qry)       
          }
      }

      if(input.marking_type =='NG') {

        connection.query(qry, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting marks_entry_master : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
           res.send(JSON.stringify(data))
          }else{
                data.status = 's';
                data.marks_id = rows.insertId;
                res.send(JSON.stringify(data))
          }
          
        });
      }else{
        connection.query(qry,values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting marks_entry_master : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
           res.send(JSON.stringify(data))
          }else{
                data.status = 's';
                data.marks_id = rows.insertId;
                res.send(JSON.stringify(data))
          }
          
        });
      }

   });

});
 

// Edit Exam Scheme listing. 
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var qry = '';

  if(input.marking_type =='N'){
    qry = `UPDATE marks_entry_master set marks= ${input.marks} WHERE id = ?`;
  }
  else if(input.marking_type =='G'){
    qry = `UPDATE marks_entry_master set marks_grade= '${input.marks_grade}' WHERE id = ?`;
  }else if(input.marking_type =='NG') {
    if(input.marks >0){

       qry = `update marks_entry_master set marks=${input.marks},
              grade_id=(SELECT grade_id from grade_master WHERE min_marks<=${input.marks}  and max_marks>=${input.marks} and exam_id=${input.exam_id}) 
              where id = ?`;

      }else if(input.marks ==0){

        qry = `update marks_entry_master set marks=${input.marks},
               grade_id=(SELECT grade_id from grade_master WHERE min_marks=${input.marks}) where id = ?`;
         
      }else if(input.marks ==-1){

        qry = `update marks_entry_master set marks=${input.marks},
               grade_id=${input.marks} where id = ?`;
         
      }
  } 

  req.getConnection(function(err,connection){
        var data = {}
        
        var query = connection.query(qry,[req.params.id], function(err, rows)
        {
  
          if(err){
           console.log("Error updating marks : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
           res.send(JSON.stringify(data))
          }else{
            data.status = 's';
            res.send(JSON.stringify(data))
         }
          
        });
   });

});


// Delete Marks Entries. 
router.get('/delete/:id', function(req, res, next) {

  req.getConnection(function(err,connection){
        var data = {}

        connection.query("DELETE from marks_entry_master WHERE id = ?",[req.params.id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting grade : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
           res.send(JSON.stringify(data))
          }else{
               data.status = 's';
               res.send(JSON.stringify(data))
          }
          
        });
   });

});

module.exports = router;
