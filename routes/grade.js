var express = require('express');
var router = express.Router();


/* Read Exam Type listing. */
router.get('/exam-type/:scheme_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select exam_type,exam_type_id
                from exam_type
                where scheme_id = ?
                order by 1`;

         console.log(qry)
     
     connection.query(qry,[req.params.scheme_id],function(err,result)     {
            
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

// reade grades
router.get('/exam-type/:scheme_id/:exam_type_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select grade_id,min_marks,max_marks,grade
                from grade_master
                where scheme_id =? and exam_id=?
                order by grade`;

         console.log(qry)
     
     connection.query(qry,[req.params.scheme_id,req.params.exam_type_id],function(err,result)     {
            
        if(err){
           console.log("Error reading category : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.grades = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

// Add Exam Scheme listing.
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

        var today = new Date();
        var data = {}
        var values = input;
        values['creation_date']= today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        values['modified_by']= req.cookies.user;

        var qry = `insert into grade_master set ?`;
        
        connection.query(qry,values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting grade : %s ",err );
           data.status = 'e';

	        }else{
	            data.status = 's';
	            data.grade_id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
          
        });


   });

});
 

// Edit Exam Scheme listing. 
router.post('/edit/:grade_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
        var data = {}
        var values = input;
        values['modified_by']= req.cookies.user;
        
        var query = connection.query("UPDATE grade_master set ? WHERE grade_id = ?",[values,req.params.grade_id], function(err, rows)
        {
  
          if(err){
           console.log("Error updating grade : %s ",err );
           data.status = 'e';

	        }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
          
        });
   });

});


// Delete Exam Scheme listing. 
router.get('/delete/:grade_id', function(req, res, next) {

  req.getConnection(function(err,connection){
        var data = {}

        connection.query("DELETE from grade_master WHERE grade_id = ?",[req.params.grade_id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting grade : %s ",err );
           data.status = 'e';

	        }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
          
        });
   });

});

module.exports = router;
