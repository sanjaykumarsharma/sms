var express = require('express');
var router = express.Router();

/* Read Course listing. */
router.get('/readEventType', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM event_type_master',function(err,result)     {
            
        if(err){
           console.log("Error reading event type : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.eventTypes = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


/* Read Event listing. */
router.get('/read_new_event', function(req, res, next) {

  req.getConnection(function(err,connection){
     // var session_id=res.cookies.session_id 
     var data = {}
     var qry = 'SELECT e.event_id, e.event_type_id, event_name,event_type , date_format(start_date, "%d/%m/%Y") as s_date,date_format(end_date, "%d/%m/%Y") as e_date, date_format(start_date, "%Y-%m-%d") as start_date,date_format(end_date, "%Y-%m-%d") as end_date,description,holiday FROM new_event e';
         qry = qry + ' LEFT JOIN event_type_master c ON e.event_type_id = c.event_type_id'; 
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.newEvents = result;
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

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            event_type_id    : input.event_type_id,
            event_name : input.event_name,
            start_date : input.start_date,
            end_date : input.end_date,
            description : input.detail,
            holiday : input.holiday,
            event_session : req.cookies.session_id,
            creation_date    : formatted,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO new_event set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting events : %s ",err );
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
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
   var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);
  var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            event_type_id    : input.event_type_id,
            event_name : input.event_name,
            start_date : input.start_date,
            end_date : input.end_date,
            description : input.detail,
            holiday : input.holiday,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("UPDATE new_event set ? WHERE event_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error updating event : %s ",err );
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
router.get('/delete/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from new_event WHERE event_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting event : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

module.exports = router;
