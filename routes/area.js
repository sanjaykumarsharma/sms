var express = require('express');
var router = express.Router();

/* Read Course listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM area_master',function(err,result)     {
            
        if(err){
           console.log("Error reading areas : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.areas = result;
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
            area    : input.area,
             creation_date    : formatted,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO area_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting area : %s ",err );
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
   var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);
  var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            area    : input.area,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("UPDATE area_master set ? WHERE area = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error editing area : %s ",err );
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

        var query = connection.query("DELETE from area_master WHERE area = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting area : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

module.exports = router;
