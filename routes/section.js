var express = require('express');
var router = express.Router();

/* Read Course listing. */

/*router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM section_master',function(err,result)     {
            
        if(err){
           console.log("Error reading standards : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.sections = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});*/
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
      var user=req.cookies.user 
      var session_id=req.cookies.session_id 
      var data = {}
     console.log("+++++")
     console.log(req.cookies.role)

      var condition="";
      if(req.cookies.role== "TEACHER" || req.cookies.role=="Class Teacher"){
           condition =` where d.section_id=(select section_id from section_master 
           where teacher_id=(select emp_id from employee where employee_id='${user}')) `;
      }
      var qry = `select  a.section_id, section, b.standard_id, b.standard, d.room as room_no,
                concat(first_name,' ',middle_name,' ',last_name) as class_teacher
                from section_master  a
                LEFT JOIN class_teacher_section d on (a.section_id=d.section_id and d.session_id = ${session_id})
                LEFT JOIN standard_master b on a.standard_id = b.standard_id
                LEFT JOIN employee c on d.class_teacher = c.emp_id
                 ${condition} 
                order by b.standard_id, section_id `

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading standards : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.sections = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.get('/readStandard', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM standard_master',function(err,result)     {
            
        if(err){
           console.log("Error reading category : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.standards = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Event listing. */
router.get('/read_section', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = 'SELECT e.standard_id, section_id, standard, section FROM section_master e';
         qry = qry + ' LEFT JOIN standard_master c ON e.standard_id = c.standard_id '; 
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading standard : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.sections = result;
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
            section    : input.section,
            standard_id : input.standard_id,
        };
        
        var query = connection.query("INSERT INTO section_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting courses : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              data.section_id = rows.insertId;
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});


/* Edit Event listing. */
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            section    : input.section,
            standard_id : input.standard_id,
        };
        
        var query = connection.query("UPDATE section_master set ? WHERE section_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting courses : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              data.section_id = rows.insertId;
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

        var query = connection.query("DELETE from section_master WHERE section_id = ?",[id], function(err, rows)
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
