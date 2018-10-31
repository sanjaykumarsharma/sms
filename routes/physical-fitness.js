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
     connection.query(qry,[req.cookies.session_id,req.params.standard_id],function(err,result){
            
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


// reade maturity development
router.get('/students/:section_id/:exam_term', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select a.student_id, concat(standard,'-',section) as standard, 
                concat(first_name,' ',middle_name, ' ' ,last_name)as student_name,
                enroll_number,if((exam_term = 'First' || exam_term = 'Final'), 'Y', 'N') as exam_term
                from student_master a
                JOIN student_current_standing d on (a.student_id = d.student_id and a.current_session_id =${req.cookies.session_id})
                JOIN section_master c  on d.section_id = c.section_id
                JOIN standard_master b on c.standard_id = b.standard_id
                Left join  student_fitness e on (a.student_id = e.student_id and e.session_id=${req.cookies.session_id} and e.exam_term='${req.params.exam_term}')
                where c.section_id=${req.params.section_id}
                and (a.withdraw='N' || a.withdraw_session > ${req.cookies.session_id})
                and d.session_id=${req.cookies.session_id}
                order by first_name,middle_name,last_name,enroll_number`;

         console.log(qry)
     
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading maturity development : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.physicalFitness = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

// read details
router.get('/details/:student_id/:exam_term', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select id, initiative_first, initiative_second, initiative_third, initiative_fourth,
                interest_first, interest_second, interest_third, interest_fourth,
                use_time_first, use_time_second, use_time_third, use_time_fourth,
                work_habit_first, work_habit_second, work_habit_third, work_habit_fourth,
                participation_first, participation_second, participation_third, participation_fourth,
                responsibility_first, responsibility_second, responsibility_third, responsibility_fourth
                from  student_maturity_development
                where student_id =${req.params.student_id}
                and exam_term ='${req.params.exam_term}'
                and session_id=${req.cookies.session_id}`;

         console.log(qry)
     
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading maturity development details : ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.status = 's';
            data.details = result;
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
        values['session_id']= req.cookies.session_id;

        var qry = `insert into student_maturity_development set ?`;
        
        connection.query(qry,values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting student_maturity_development : ",err );
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
 

// Edit maturity development listing. 
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
        var data = {}
        var values = input;
        values['modified_by']= req.cookies.user;
        
        var query = connection.query("UPDATE student_maturity_development set ? WHERE id = ?",[values,req.params.id], function(err, rows)
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
router.get('/delete/:student_id/:exam_term', function(req, res, next) {

  req.getConnection(function(err,connection){
        var data = {}
        var qry = `delete from student_maturity_development
                   where student_id =${req.params.student_id}
                   and exam_term ='${req.params.exam_term}'
                   and session_id =${req.cookies.session_id}`;

        connection.query(qry, function(err, rows)
        {
  
          if(err){
           console.log("Error deleting maturity development : %s ",err );
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
