var express = require('express');
var router = express.Router();

/* Read Course listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM level_master',function(err,result)     {
            
        if(err){
           console.log("Error reading levels : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.levels = result;
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
            level    : input.level,
        };
        
        var query = connection.query("INSERT INTO level_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting levels : %s ",err );
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
            level    : input.level,
        };
        
        var query = connection.query("UPDATE level_master set ? WHERE level_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error editing levels : %s ",err );
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

        var query = connection.query("DELETE from level_master WHERE level_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting level : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

module.exports = router;
