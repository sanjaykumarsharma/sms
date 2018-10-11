var express = require('express');
var router = express.Router();


/* Read Session listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     
     var qry = 'select head_id,head from fee_head_master order by 1'; 

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading heads : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.heads = result;
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
        var group_id = 14;
        var values = {
            head_group_id : group_id,
            head : input.head,
            creation_date : formatted,
            modified_by : req.cookies.role,

        };
        
        var query = connection.query("INSERT INTO fee_head_master set ? ",values, function(err, rows)
        {
          console.log(query);
          if(err){
           console.log("Error inserting head : %s ",err );
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
router.post('/edit/:head_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var head_id = input.head_id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            head    : input.head,
        };
        
        var query = connection.query("UPDATE fee_head_master set ? WHERE head_id = ?",[values,head_id], function(err, rows)
        {
  
          if(err){
           console.log("Error updating head : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

/* Delete Event listing. */
router.get('/delete/:head_id', function(req, res, next) {
 console.log("heads delete");
  var head_id = req.params.head_id;

  req.getConnection(function(err,connection){
        var data = {}
      
        var query = connection.query("DELETE from fee_head_master WHERE head_id = ?",[head_id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting head : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


module.exports = router;
