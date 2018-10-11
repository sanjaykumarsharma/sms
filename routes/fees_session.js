var express = require('express');
var router = express.Router();


/* Read Session listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     
     var qry = 'SELECT session_id, session_name, date_format(session_start_date, "%d/%m/%Y") as session_start_date,'; 
         qry = qry + ' date_format(session_end_date, "%d/%m/%Y") as session_end_date,is_current, ';
         qry = qry + ' date_format(session_end_date, "%Y-%m-%d") as u_session_end_date, ';
         qry = qry + ' date_format(session_start_date, "%Y-%m-%d") as u_session_start_date';
         qry = qry + ' from session_master order by 1 desc '; 

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading session : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.sessions = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Add Event listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  console.log(formatted)


  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            session_name    : input.session_name,
            session_start_date : input.session_start_date,
            session_end_date : input.session_end_date,
            creation_date : formatted,
            modified_by : req.cookies.role,

        };
        
        var query = connection.query("INSERT INTO session_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting courses : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


/* Edit Event listing. */
router.post('/edit/:session_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var session_id = input.session_id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            session_name    : input.session_name,
            session_start_date : input.session_start_date,
            session_end_date : input.session_end_date,
        };
        
        var query = connection.query("UPDATE session_master set ? WHERE session_id = ?",[values,session_id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting session : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

/* Delete Event listing. */
router.get('/delete/:session_id', function(req, res, next) {

  var session_id = req.params.session_id;

  req.getConnection(function(err,connection){
        var data = {}
      
        var query = connection.query("DELETE from session_master WHERE session_id = ?",[session_id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting session : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

/* Marked as current session*/
router.get('/markCurrent/:session_id', function(req, res, next) {

  var session_id = req.params.session_id;

  req.getConnection(function(err,connection){
        var data = {}
        var old_session=0;
        var current=1;
        var query = connection.query("UPDATE session_master set is_current= ?",[old_session], function(err, rows)
        {
          if(err){
           console.log("Error updating session : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              //res.send(JSON.stringify(data))
          }
        });

          var query1 =connection.query("UPDATE session_master set is_current= ? WHERE session_id = ?",[current,session_id], function(err, rows)
            {
          console.log(query1);
          if(err){
           console.log("Error updating session : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
        });


       


   });

});


module.exports = router;
