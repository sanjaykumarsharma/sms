var express = require('express');
var router = express.Router();


/* Read Session listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     
     var qry = 'select fee_slip_name from fee_slip_master order by slip_order'; 

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading slips : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.slips = result;
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
            fee_slip_name : input.fee_slip_name,
        };
        
        var query = connection.query("INSERT INTO fee_slip_master set ? ",values, function(err, rows)
        {
          console.log(query);
          if(err){
           console.log("Error inserting fee slip : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


/* Edit Event listing. */
router.post('/edit', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var old_fee_slip_name = input.old_fee_slip_name;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            fee_slip_name   : input.fee_slip_name,
        };
        
        var query = connection.query("UPDATE fee_slip_master set ? WHERE fee_slip_name = ?",[values,old_fee_slip_name], function(err, rows)
        {
  
          if(err){
           console.log("Error updating fee_slip : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

/* Delete Event listing. */
router.get('/delete/:id', function(req, res, next) {
 console.log("slip delete");
  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}
      
        var query = connection.query("DELETE from fee_slip_master WHERE fee_slip_name = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting slip : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


module.exports = router;
