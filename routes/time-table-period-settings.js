var express = require('express');
var router = express.Router();

/* Read Course listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM period_master',function(err,result)     {
            
        if(err){
           console.log("Error reading periods : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.periods = result;
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
            period_name    : input.period_name,
            session_id    : req.cookies.session_id,
            start_time    : input.start_time,
            end_time    : input.end_time,
            is_break    : input.is_break,
            remarks    : input.remarks,
            creation_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO period_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting periods : %s ",err );
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
            period_name    : input.period_name,
            session_id    : req.cookies.session_id,
            start_time    : input.start_time,
            end_time    : input.end_time,
            is_break    : input.is_break,
            remarks    : input.remarks,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("UPDATE period_master set ? WHERE period_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error editing period : %s ",err );
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

        var query = connection.query("DELETE from period_master WHERE period_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting period : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

module.exports = router;
