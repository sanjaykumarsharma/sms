var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");

/* Read Course listing. */
router.get('/readstandard', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query("select section_id, concat(standard, ' ', section) as class from standard_master a join section_master b on a.standard_id=b.standard_id",function(err,result)     {
            
        if(err){
           console.log("Error reading event type : %s ",err );
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
router.get('/read_class_holiday', function(req, res, next) {

  req.getConnection(function(err,connection){
   //  console.log(res.cookies)
      // var session_id=res.cookies.session_id
      // console.log(res.cookie)
     var role=req.cookies.role
     var session_id=req.cookies.session_id
     var section_id=req.cookies.section_id
     console.log("section_id")
     console.log(section_id)
     console.log("session_id")
     console.log(session_id)
     var classCondition=``
     if(role!=='ADMIN'){
       classCondition=` and a.section_id=${section_id} `
     }
     var data = {}
     var qry = `select event_id, event_name,a.section_id,concat(standard, ' ', section) as class, 
     date_format(start_date, '%d/%m/%Y') as s_date,date_format(end_date, '%d/%m/%Y') as e_date, 
     date_format(start_date, '%Y-%m-%d') as start_date,date_format(end_date, '%Y-%m-%d') as end_date,
      holiday, description 
      from class_holiday a 
      join section_master b on a.section_id=b.section_id
      join standard_master c on b.standard_id=c.standard_id 
      where session_id=${session_id}
      ${classCondition} 
      order by 3 `; 

      console.log(qry)
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.classHolidays = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.get('/csv_export_class_holiday', function(req, res, next) {
  req.getConnection(function(err,connection){

     var role=req.cookies.role
     var session_id=req.cookies.session_id
     var section_id=req.cookies.section_id
     console.log("section_id")
     console.log(section_id)
     console.log("session_id")
     console.log(session_id)
     var classCondition=``
     if(role!=='ADMIN'){
       classCondition=` and a.section_id=${section_id} `
     }
     var data = {}
     var qry = `select event_name as 'Event Name',concat(standard, ' ', section) as 'Class', 
     date_format(start_date, '%Y-%m-%d') as 'Start Date', date_format(end_date, '%Y-%m-%d') as 'End Date',
      holiday as 'Holiday', description  as 'Description'
      from class_holiday a 
      join section_master b on a.section_id=b.section_id
      join standard_master c on b.standard_id=c.standard_id 
      where session_id=${session_id}
      ${classCondition} 
      order by 3 `;
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {
      connection.query(qry,function(err,result)     {
            
        if(err){
          console.log("Error reading Holiday : %s ",err );
          data.status = 'e';

        }else{
          const fields = ['Event Name','Class','Start Date','End Date','Holiday','Description']; 
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);
          var path='./public/csv/Holiday.csv'; 
          data.url = '/csv/Holiday.csv';

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

/* Add Event listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
    var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            section_id    : input.section_id,
            event_name : input.event_name,
            start_date : input.start_date,
            end_date : input.end_date,
            description : input.description,
            holiday : input.holiday,
            session_id : req.cookies.session_id,
            creation_date    : formatted,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO class_holiday set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting events : %s ",err );
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
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
    var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);
  var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            section_id    : input.section_id,
            event_name : input.event_name,
            start_date : input.start_date,
            end_date : input.end_date,
            description : input.description,
            holiday : input.holiday,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("UPDATE class_holiday set ? WHERE event_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error updating event : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.id = rows.insertId;
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

        var query = connection.query("DELETE from class_holiday WHERE event_id = ?",[id], function(err, rows)
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
