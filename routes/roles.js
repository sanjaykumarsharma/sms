var express = require('express');
var router = express.Router();

/* Read Course listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM roles',function(err,result)     {
            
        if(err){
           console.log("Error reading roles : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.roles = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Add Course listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            role    : input.role,
        };
        
        var query = connection.query("INSERT INTO roles set ? ",values, function(err, rows)
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
  var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            role    : input.role,
        };
        
        var query = connection.query("UPDATE roles set ? WHERE id = ?",[values,id], function(err, rows)
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

/* Delete Course listing. */
router.get('/delete/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from roles WHERE id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting role : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

module.exports = router;
