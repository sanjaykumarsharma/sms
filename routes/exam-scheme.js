var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");


/* Read Course listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = "select scheme_id, scheme_name from exam_scheme_master where ";
         qry = qry + " session_id =(select session_id from session_master where session_id = " + req.cookies.session_id + ")";

         console.log(qry)
     
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading category : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.examSchemes = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.post('/read_exam_csv', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var session_name = req.cookies.session_name
  req.getConnection(function(err,connection){

    var data = {}
    var std = Array();
    var result = input.data;
    console.log(result)
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {

      for(var i = 0; i < result.length; i++){
        var obj = {};
        obj['Exam Scheme'+session_name] = result[i].scheme_name;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Exam Scheme'+session_name];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/ExamScheme.csv'; 
      data.url = '/csv/ExamScheme.csv';

      fs.writeFile(path, csv, function(err,data) {
        if (err) {
          throw err;
        }else{ 
          callback() 
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
    });   
  });

});

/* Add Exam Scheme listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

        var today = new Date();

        var data = {}

        var values = {
            scheme_name    : input.scheme_name,
            session_id    : req.cookies.session_id,
            creation_date    : today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
            modified_by    : req.cookies.user,
        };
        
        connection.query("INSERT INTO exam_scheme_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting Exam Scheme : %s ",err );
           data.status = 'e';

	        }else{
	            data.status = 's';
	            data.scheme_id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
          
        });


   });

});


/* Edit Exam Scheme listing. */
router.post('/edit/:scheme_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var scheme_id = input.scheme_id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            scheme_name    : input.scheme_name,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("UPDATE exam_scheme_master set ? WHERE scheme_id = ?",[values,scheme_id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting category : %s ",err );
           data.status = 'e';

	        }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
          
        });
   });

});

/* Delete Exam Scheme listing. */
router.get('/delete/:scheme_id', function(req, res, next) {

  var scheme_id = req.params.scheme_id;

  req.getConnection(function(err,connection){
        var data = {}

        connection.query("DELETE from exam_scheme_master WHERE scheme_id = ?",[scheme_id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting Exam Scheme : %s ",err );
           data.status = 'e';

	        }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
          
        });
   });

});



/* Read Exams listing. */
router.get('/exams/:scheme_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select exam_type_id, exam_type, 
                date_format(start_date, '%d/%m/%Y') as start_date,
                date_format(end_date, '%d/%m/%Y') as end_date,
                date_format(last_login_date,'%d/%m/%Y') as last_login_date,
                assessment,exam_group
                from exam_type where scheme_id=?`;

         console.log(qry)
     
     connection.query(qry,[req.params.scheme_id],function(err,result)     {
            
        if(err){
           console.log("Error reading Exams : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.exams = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


/* Add Exam */
router.post('/add-exam', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

        var today = new Date();

        var data = {}

        var values = {}
        values = input
        values['creation_date'] = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        values['modified_by'] = req.cookies.user

        connection.query("INSERT INTO exam_type set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting Exam : %s ",err );
           data.status = 'e';

          }else{
              data.status = 's';
              data.exam_type_id = rows.exam_type_id;
              res.send(JSON.stringify(data))
          }
          
        });


   });

});

/* Delete Exam */
router.get('/delete-exam/:exam_type_id', function(req, res, next) {

  var exam_type_id = req.params.exam_type_id;

  req.getConnection(function(err,connection){
        var data = {}

        connection.query("DELETE from exam_type WHERE exam_type_id = ?",[exam_type_id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting Exam Scheme : %s ",err );
           data.status = 'e';

          }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
          
        });
   });

});

/* Edit Exam  listing. */
router.post('/edit-exam/:exam_type_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
        var data = {}

        var q = `UPDATE exam_type set assessment='${input.assessment}',
                 end_date='${input.end_date}',
                 exam_group='${input.exam_group}',
                 exam_type='${input.exam_type}',
                 last_login_date='${input.last_login_date}',
                 start_date='${input.start_date}',
                 modified_by='${req.cookies.user}'
                 WHERE exam_type_id =${req.params.exam_type_id}`;

        
        var query = connection.query(q, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting exam_type : %s ",err );
           data.status = 'e';

          }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
          
        });
   });

});

/*****************************************************classes************************************************/

/* Read Exams listing. */
router.get('/classes/:scheme_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select standard,standard_id  
                from standard_master where standard_id not in(select standard_id 
                from  exam_scheme_standard_map a
                join exam_scheme_master b on a.scheme_id = b.scheme_id
                where b.session_id = ?)`;
     console.log(qry)
     connection.query(qry,[req.cookies.session_id],function(err,result)     {
            
        if(err){
           console.log("Error reading Free classes : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.freeClasses = result;
        }
     
     });

     var qry = `select a.standard_id,b.standard  
                from exam_scheme_standard_map a,standard_master b 
                where a.standard_id=b.standard_id and
                a.scheme_id=?`;
     console.log(qry)
     connection.query(qry,[req.params.scheme_id],function(err,result)     {
            
        if(err){
           console.log("Error reading Assigned classes : %s ",err );
           data.status = 'e';

        }else{
            data.assignedClasses = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/*Assign Classes*/

router.post('/assign-standard', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
        var data = {}

        var today = new Date();
        dt = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

        var values = []
        
        //standard_id,scheme_id,creation_date,modified_by
        input.standards.map(c=>{
          values.push([c.standard_id,input.scheme_id,dt,req.cookies.user])
        })        
       
        var sql = "INSERT INTO exam_scheme_standard_map (standard_id,scheme_id,creation_date,modified_by) VALUES ?";
        connection.query(sql,[values], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting category : %s ",err );
           data.status = 'e';

          }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
          
        });
   });

});

// free classes
router.post('/free-up-standard', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  var today = new Date();
  dt = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

  var sql = `delete from exam_scheme_standard_map
             where standard_id IN(?) and scheme_id=?`;

  req.getConnection(function(err,connection){
      var data = {}
      
      var values = ''
      input.standards.map(c=>{
        if(values==''){
          values = c.standard_id
        }else{
          values = values +","+c.standard_id
        }
      })        

      connection.query(sql,[values,input.scheme_id], function(err, rows)
      {

        if(err){
          console.log("Error in free classes : %s ",err );
          data.status = 'e';
        }else{
          data.status = 's';
          res.send(JSON.stringify(data))
        }
        
      });


   });

});
module.exports = router;
