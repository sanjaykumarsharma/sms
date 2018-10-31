var express = require('express');
var router = express.Router();

/* Read Course listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM activity_category_master',function(err,result)     {
            
        if(err){
           console.log("Error reading category : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.categories = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Event listing. */
router.get('/read_event', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `SELECT event_id, event_name FROM activity_event_master e `;
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.events = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Add Event listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            event_name    : input.event_name,
            category_id : input.category_id,
        };
        
        var query = connection.query("INSERT INTO activity_event_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting event : %s ",err );
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
router.post('/edit/:event_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var event_id = input.event_id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            event_name    : input.event_name,
            category_id : input.category_id,
        };
        
        var query = connection.query("UPDATE activity_event_master set ? WHERE event_id = ?",[values,event_id], function(err, rows)
        {
  
          if(err){
           console.log("Error editing event : %s ",err );
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
router.get('/delete/:event_id', function(req, res, next) {

  var event_id = req.params.event_id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from activity_event_master WHERE event_id = ?",[event_id], function(err, rows)
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
