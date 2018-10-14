var express = require('express');
var router = express.Router();
var pool = require('../db');

/*****************************************************subjects************************************************/

/* Read Subjects listing. */
router.get('/subjects/:standard_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select subject_id, subject_name,subject_code,subject_short_name
                from subject_master
                where subject_id not in (select subject_id from subject_class_map where standard_id=${req.params.standard_id})
                order by 2`;

     console.log(qry)
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Free subjects : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.status = 's';
            data.freeSubjects = result;
        }
     
     });

     var qry = `select id, subject_name,subject_code,subject_short_name
                from subject_master a
                left join subject_class_map b on a.subject_id=b.subject_id
                where b.standard_id=${req.params.standard_id}
                order by 2`;
     console.log(qry)
     connection.query(qry,[req.params.id],function(err,result)     {
            
        if(err){
           console.log("Error reading Assigned subjects : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.assignedSubjects = result;
            res.send(data)
        }
     
     });
       
  });

});

/*Assign Subjects*/

router.post('/assign-subjects', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

        var today = new Date();
        var dt = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        var data = {}

         var values = [];
        input.subjects.map(c=>{
          values.push([input.standard_id, c.subject_id, dt, req.cookies.user])
        })       

       console.log(values)
       
        var sql = `insert into subject_class_map(standard_id, subject_id, creation_date, modified_by) values ?`;

        connection.query(sql,[values], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting subject class map : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
          }else{
              data.status = 's';
              res.send(data)
          }
          
        });
   });

});

router.post('/free-up-subject', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
      var data = {}
      
      var sql = ''
      input.subjects.map(c=>{
        var qry = `delete from subject_class_map where id=${c.id};`;
        if(sql==''){
          sql = qry;
        }else{
          sql = sql + qry;
        }
      })        

      
      console.log(sql);

      connection.query(sql, function(err, rows)
      {

        if(err){
          console.log("Error in free subjects : %s ",err );
          data.status = 'e';
          data.error = err
          data.messaage = err.sqlMessage
        }else{
          data.status = 's';
          res.send(data)
        }
        
      });


   });

});


module.exports = router;
