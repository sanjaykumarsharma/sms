var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");


/* Read Course listing. */
router.get('/read_teaching_staff', function(req, res, next) {
  var session_id=req.cookies.session_id
  req.getConnection(function(err,connection){
       
     var data = {}
    var qry=`select emp_id, concat(first_name,' ',middle_name, ' ' ,last_name) as teacher_name
                from employee
                where emp_id not in(select class_teacher from class_teacher_section where session_id=${session_id})
                and emp_id not in(select assistant_teacher from class_teacher_section where session_id=${session_id}) 
                and is_active='Y'
                and emp_type_id = 14
              order by first_name,middle_name,last_name`;
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Teaching Satff : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.employees = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.get('/read_class_teacher', function(req, res, next) {
 var session_id=req.cookies.session_id
  req.getConnection(function(err,connection){
       
     var data = {}
    var qry=`select  ts_id, d.standard_id,d.section_id,room,
                class_teacher as c_id, assistant_teacher as a_id, standard, section, 
                concat(b.first_name,' ',b.middle_name,' ',b.last_name) as class_teacher,
                concat(c.first_name,' ',c.middle_name,' ',c.last_name) as assistant_teacher
                from class_teacher_section  a
                LEFT JOIN employee b on a.class_teacher = b.emp_id 
                LEFT JOIN employee c on a.assistant_teacher = c.emp_id
                
                LEFT JOIN section_master d on a.section_id = d.section_id
                LEFT JOIN standard_master e on d.standard_id = e.standard_id
                where a.session_id=${session_id}
                order by d.section_id`;
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading CLass Teacher : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.classTeachers = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.get('/csv_export_class_teacher', function(req, res, next) {
  req.getConnection(function(err,connection){
     var session_id=req.cookies.session_id
     var data = {}
     var qry = `select  room as 'Room',
                standard as 'Standard', section as 'Section', 
                concat(b.first_name,' ',b.middle_name,' ',b.last_name) as 'Class Teacher',
                concat(c.first_name,' ',c.middle_name,' ',c.last_name) as 'Assistant Teacher'
                from class_teacher_section  a
                LEFT JOIN employee b on a.class_teacher = b.emp_id 
                LEFT JOIN employee c on a.assistant_teacher = c.emp_id
                
                LEFT JOIN section_master d on a.section_id = d.section_id
                LEFT JOIN standard_master e on d.standard_id = e.standard_id
                where a.session_id=${session_id}
                order by d.section_id`;
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {
      connection.query(qry,function(err,result)     {
            
        if(err){
          console.log("Error reading Class Teacher : %s ",err );
          data.status = 'e';

        }else{
          const fields = ['Standard','Section','Room','Class Teacher','Assistant Teacher']; 
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);
          var path='./public/csv/Class Teacher.csv'; 
          data.url = '/csv/Class Teacher.csv';

          fs.writeFile(path, csv, function(err,data) {
            if (err) {
              throw err;
            }else{ 
              callback() 
            }
          });
        }
      });  
    },function (err) {
      if (err) {
        console.error(err.message);
        data.status = 'e';
        res.send(data)
      }
        data.status = 's';
        res.send(data)
    });//end of async loop  

  });// get connection
});

/* Add Course listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
    var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);
  var session_id=req.cookies.session_id
  req.getConnection(function(err,connection){
        var data = {}

        var values = {
           section_id : input.section_id,
           room : input.room_no,
           class_teacher : input.class_teacher,
           assistant_teacher : input.asst_class_teacher,
           session_id : session_id,
           creation_date    : formatted,
           modification_date    : formatted,
           modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO class_teacher_section set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting Class teacher : %s ",err );
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
           section_id : input.section_id,
           room : input.room_no,
           class_teacher : input.class_teacher,
           assistant_teacher : input.asst_class_teacher,
           modification_date    : formatted,
           modified_by    : req.cookies.user,
        };
        
        var query = connection.query("UPDATE class_teacher_section set ? WHERE ts_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting subjects : %s ",err );
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

        var query = connection.query("DELETE from class_teacher_section WHERE ts_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting class_teacher : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

module.exports = router;
