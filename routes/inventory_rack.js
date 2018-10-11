var express = require('express');
var router = express.Router();

/* Read Course listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM rack_master',function(err,result)     {
            
        if(err){
           console.log("Error reading rack : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.inventoryRacks = result;
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
            rack_name    : input.rack_name,
        };
        
        var query = connection.query("INSERT INTO rack_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting rack : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.rack_id = rows.insertId;
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
            rack_name    : input.rack_name,
        };
        
        var query = connection.query("UPDATE rack_master set ? WHERE rack_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting rack : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.rack_id = rows.insertId;
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

        var query = connection.query("DELETE from rack_master WHERE rack_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting rack : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

module.exports = router;
