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

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select distinct b.session_id, b.subject_id, subject_name
                from student_group a 
                JOIN group_subject_map b on (a.group_id=b.group_id and b.session_id=?)
                JOIN  subject_master c on b.subject_id=c.subject_id 
                where a.standard_id=? and a.section_id=?  
                order by subject_name`;

         console.log(qry)
     
     connection.query(qry,[req.cookies.session_id,req.params.standard_id,req.params.section_id],function(err,result)     {
            
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

// reade marks settings
router.get('/marks-settings/:section_id/:exam_type_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select marks_id, exam_id, section_id, a.subject_id, subject_name, exam_type,
                date_format(date_of_exam,'%d/%m/%Y') as exam_date, max_marks, min_marks,marking_type, details,
                marking_type, show_in, grand_total
                from marks_setting a, exam_type b, subject_master c 
                where a.exam_id = b.exam_type_id
                and a.subject_id = c.subject_id
                and a.exam_id = ? 
                and a.section_id=?
                order by subject_name`;

         console.log(qry)
     
     connection.query(qry,[req.params.exam_type_id,req.params.section_id],function(err,result)     {
            
        if(err){
           console.log("Error reading marks manager : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.marksSettings = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

// Add marks Settings listing.
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

        var today = new Date();
        var data = {}
        var values = input;
        values['creation_date']= today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        values['modified_by']= req.cookies.user;

        var qry = `insert into marks_setting set ?`;
        
        connection.query(qry,values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting marks_setting : %s ",err );
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


   });

});
 

// Edit Exam Scheme listing. 
router.post('/edit/:marks_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
        var data = {}
        var values = input;
        values['modified_by']= req.cookies.user;
        
        var query = connection.query("UPDATE marks_setting set ? WHERE marks_id = ?",[values,req.params.marks_id], function(err, rows)
        {
  
          if(err){
           console.log("Error updating grade : %s ",err );
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


// Delete Marks Setting listing. 
router.get('/delete/:marks_id', function(req, res, next) {

  req.getConnection(function(err,connection){
        var data = {}

        connection.query("DELETE from marks_setting WHERE marks_id = ?",[req.params.marks_id], function(err, rows)
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
