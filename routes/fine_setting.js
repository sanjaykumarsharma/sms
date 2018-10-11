var express = require('express');
var router = express.Router();


/* Read Session listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
    var session_id = req.cookies.session_id;
       
     var data = {}

     var qry = `SELECT fine_type, fine_grace_preiod, fine_amount  
               from fine_master where session_id =${session_id} `; 
               console.log(qry);

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading fines : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.fines = result;
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
        var session_id = req.cookies.session_id;
        var values = {
            session_id : session_id, 
            fine_type    : input.fine_type,
            fine_grace_preiod : input.fine_grace_preiod,
            fine_amount : input.fine_amount,
            creation_date : formatted,
            modified_by : req.cookies.role,
        };
        
        var query = connection.query("DELETE from fine_master WHERE session_id = ?",[session_id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting fine : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
             // res.send(JSON.stringify(data))
          }
         
          
        });
        var query = connection.query("INSERT INTO fine_master set ? ",values, function(err, rows)
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


/* Edit Event listing. */
router.post('/edit/:bank_ac', function(req, res, next) {});

/* Delete Event listing. */
router.get('/delete/:bank_ac', function(req, res, next) {});


module.exports = router;
