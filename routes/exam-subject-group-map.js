var express = require('express');
var router = express.Router();


/* Read Course listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select id, subject_group
                from subject_group_master
                order by 1`;

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Subject Group : %s ",err );
           data.status = 'e';
        }else{
          data.status = 's';
          data.subjectGroupMaps = result;
          res.send(data)
        }
     
     });
       
  });

});

/* Add Subject Group listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

        var today = new Date();

        var data = {}

        var values = {
            subject_group    : input.subject_group,
            creation_date    : today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
            modified_by    : req.cookies.user,
        };
        
        connection.query("INSERT INTO subject_group_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting Subject Group : %s ",err );
           data.status = 'e';

          }else{
              data.status = 's';
              data.id = rows.insertId;
              res.send(data)
          }
          
        });


   });

});


/* Edit Subject Group listing. */
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            subject_group    : input.subject_group,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("UPDATE subject_group_master set ? WHERE id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting category : %s ",err );
           data.status = 'e';

          }else{
              data.status = 's';
              res.send(data)
          }
          
        });
   });

});

/* Delete Subject Group listing. */
router.get('/delete/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        connection.query("DELETE from subject_group_master WHERE id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting Subject Group : %s ",err );
           data.status = 'e';

          }else{
              data.status = 's';
              res.send(data)
          }
          
        });
   });

});


/*****************************************************subjects************************************************/

/* Read Exams listing. */
router.get('/subjects/:id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select subject_id, subject_name, subject_code, subject_short_name
                from subject_master 
                where subject_id not in (select subject_id from subject_group_subject_map where session_id =${req.cookies.session_id}) 
                order by 2`;
     console.log(qry)
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Free subjects : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.freeSubjects = result;
        }
     
     });

     var qry = `select a.subject_id, subject_name, subject_code,
                subject_short_name
                from subject_master a,subject_group_subject_map b
                where a.subject_id=b.subject_id 
                and b.subject_group='${req.params.id}'
                and b.session_id = ${req.cookies.session_id}
                order by 2`;
     console.log(qry)
     connection.query(qry,[req.params.id],function(err,result)     {
            
        if(err){
           console.log("Error reading Assigned subjects : %s ",err );
           data.status = 'e';

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
        var data = {}

        var today = new Date();
        dt = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

        var values = []
        
        //subject_id,id,creation_date,modified_by
        input.subjects.map(c=>{
          values.push([c.subject_id, input.id, req.cookies.session_id, dt, req.cookies.user])
        })        
       
        var sql = `insert into subject_group_subject_map(subject_id, subject_group, session_id,
                   creation_date, modified_by) values ?`;

        connection.query(sql,[values], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting subject group map : %s ",err );
           data.status = 'e';

          }else{
              data.status = 's';
              res.send(data)
          }
          
        });
   });

});

// free subjects
router.post('/free-up-subject', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  var today = new Date();
  dt = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

  req.getConnection(function(err,connection){
      var data = {}
      
      var values = ''
      input.subjects.map(c=>{
        if(values==''){
          values = c.subject_id
        }else{
          values = values +","+c.subject_id
        }
      })        

      var sql = `delete from subject_group_subject_map 
             where subject_id IN (${values}) 
             and session_id=${req.cookies.session_id}`;
      console.log(sql);
      connection.query(sql, function(err, rows)
      {

        if(err){
          console.log("Error in free subjects : %s ",err );
          data.status = 'e';
        }else{
          data.status = 's';
          res.send(data)
        }
        
      });


   });

});
module.exports = router;
