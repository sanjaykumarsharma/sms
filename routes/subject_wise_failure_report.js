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

router.post('/read_subject_wise_failure_report', function(req, res, next) {

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
  var subject_id =values_data.subject_id
  var report_data = [];
  var min_marks="";

    req.getConnection(function(err,connection){
      var sql =`select distinct min_marks from marks_setting a
                join marks_entry_master b on a.exam_id=b.exam_id
                where a.exam_id = ${exam_id}
                and a.subject_id = ${subject_id}
                and a.section_id = ${section_id}
                and b.session_id= ${session_id}`;
      console.log(sql)
      connection.query(sql, function (error, result) {
        if (error) {
          return connection.rollback(function() {
            throw error;
          });
        }
      console.log(result)
      if(result.length!=0){
        min_marks = result[0].min_marks;
      }
        qry =`select enroll_number, concat(first_name,' ',middle_name,'',last_name) as name,
              if(marks = -1,'AB',marks)as marks
              from marks_entry_master a
              join student_master b on (a.student_id = b.student_id and b.current_session_id = ${session_id})
              where a.exam_id = ${exam_id}
              and a.subject_id = ${subject_id}
              and a.section_id = ${section_id}
              and marks < ${min_marks}
              and a.session_id=${session_id}
              order by name`;
      console.log(qry)
      connection.query(qry,function(err,result)     {      
        if(err){
          console.log("Error reading Student : %s ",err );
          data.status = 'e';
        }else{
          data.status = 's';
          data.report_data = result;
          res.send(data)
        }
      });
    });
    });
  });


module.exports = router;
