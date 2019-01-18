var express = require('express');
var router = express.Router();

/* Read Course listing. */
router.get('/read_subject', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
    var qry=`select subject_id,subject_name,subject_short_name,order_no,department_name,a.department_id
        from subject_master a
        LEFT JOIN department_master b on a.department_id=b.department_id order by 2`
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Subject : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.subjects = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Add Course listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
    var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            subject_name    : input.subject_name,
            subject_short_name    : input.subject_short_name,
            department_id    : input.department_id,
            creation_date    : formatted,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO subject_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting roles : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


/* Edit Course listing. */
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
    var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);
  var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}

       
        var values = {
            subject_name    : input.subject_name,
            subject_short_name    : input.subject_short_name,
            department_id    : input.department_id,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("UPDATE subject_master set ? WHERE subject_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting subjects : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

/* Delete Course listing. */
router.get('/delete/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from subject_master WHERE subject_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting subject : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

module.exports = router;
