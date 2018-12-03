var express = require('express');
var router = express.Router();
var multer = require('multer')




/* Student Strength report */

router.get('/read_certificate', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  
  req.getConnection(function(err,connection){
       
    var data = {}
      var qry =`select c_id,certificate_name, certificate_text
        from certificate_master 
        order by 2`;
    connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
            data.status='s'
            data.certificates = result;
       res.send(JSON.stringify(data))
      }
     
     });
       
  });

});


/* Student Data */

router.get('/read_student/:standard_id/:section_id', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  var standard_id=req.params.standard_id
  var section_id=req.params.section_id
  req.getConnection(function(err,connection){
       
    var data = {}
    var condition = "";

  /*if(standard_id == -1 && section_id==-1)   condition = ``;

  if(standard_id != -1 && section_id==-1)   condition = ` and c.standard_id =${standard_id}`;

  if(standard_id != -1 && section_id!=-1)   condition = ` and c.standard_id=${standard_id} and d.section_id=${section_id}`;
     */
      var qry =`select a.student_id, b.standard, b.standard_id, c.section_id,
      c.section, concat(first_name,' ',middle_name,' ',last_name) as student_name,
      enroll_number, roll_number, session_name,exam_term
      from student_master a
      JOIN student_current_standing d on (a.student_id=d.student_id and d.session_id = ${session_id} and a.current_session_id = ${session_id})
      JOIN section_master c on  d.section_id = c.section_id
      JOIN standard_master b on c.standard_id = b.standard_id
            left join  student_maturity_development e on (a.student_id = e.student_id and e.session_id =${session_id})
            JOIN session_master g on d.session_id = g.session_id 
            where b.standard_id=${standard_id} and c.section_id= ${section_id}
            and (a.withdraw='N' || a.withdraw_session > ${session_id})
            order by first_name, middle_name, last_name, enroll_number`;
          connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
            data.status='s'
            data.students = result
             res.send(JSON.stringify(data))

      }
     
     });
       
  });

});


/* Issued Certificate */

router.get('/read_issued_certificate/:standard_id/:section_id', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
 // var session_id = req.cookies.session_id
  var session_id = req.cookies.session_id
  var standard_id=req.params.standard_id
  var section_id=req.params.section_id
  req.getConnection(function(err,connection){
      // and b.current_session_id = ${session_id})
    var data = {}
    var condition = "";
      var qry =`select b.student_id, concat(first_name, ' ' ,middle_name, ' ',last_name) as name, 
              c_key, c.c_id, certificate_name, 
              concat(standard,' ',section) as standard, type
        from student_certificate a
        LEFT JOIN student_master b on a.student_id = b.student_id 
        LEFT JOIN certificate_master c on a.c_id = c.c_id
        LEFT JOIN standard_master d on a.std_id = d.standard_id
            LEFT JOIN section_master e on a.sec_id = e.section_id
        where a.std_id=${standard_id} and sec_id=${section_id}
              order by first_name, middle_name, last_name`;
          connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error Issued Certificate : %s ",err );
        data.status = 'e';

      }else{
            data.status='s'
            data.issuedCertificates = result
             res.send(JSON.stringify(data))

      }
     
     });
       
  });

});

//Add Issue Certificate Data

router.post('/add_issue_certificate', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
    var session_id = req.cookies.session_id
    var studentData=input.studentData
    var c_id=input.c_id
    var std_id=input.standard_id
    var sec_id=input.section_id
    var type=input.type
    var cer_key=input.c_key
    var user=req.cookies.user
    
     var now = new Date();
     var jsonDate = now.toJSON(); 
     var formatted = new Date(jsonDate);

     req.getConnection(function(err,connection){

      connection.beginTransaction(function(err) {

        if (err) { throw err; } 
        //for(var i=0; i<studentData.length; i++){

         

       var data = {}
       var studentValues = [];

    for(var i=0; i<studentData.length; i++){
      var count=''
      var student_id=studentData[i].student_id
       var sql=`select count(*) as count from student_certificate where student_id = ${student_id} and c_id =${c_id} and type='${type}'`
         connection.query(sql, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }else{
          
             count = result;
             console.log("check Count")
             console.log(count[0].count)

              if(count[0].count>0){
                 console.log("All Ready Certificate Issue")
                 // throw error;
              }
          }
        })
       
  //  else{
            //if(count[0].count==0){
            var c_key= cer_key + i
              studentValues.push([c_id,std_id,sec_id,studentData[i].student_id,type,c_key,formatted,formatted,user])
            //}
           
     // }
    }
         

        var sql = `insert into student_certificate(c_id,std_id,sec_id,student_id,type,c_key,creation_date,modification_date,modified_by) VALUES ?`;
        console.log(sql)
        connection.query(sql,[studentValues], function(err, result) 
        {

           if (err) {
                return connection.rollback(function() {
                  throw err;
                });
              }

          
              connection.commit(function(err) {
                if (err) {
                  return connection.rollback(function() {
                    throw err;
                  });
                }
                data.status = 's';
                console.log('success!');
                console.log(data);
                res.send(JSON.stringify(data))

              });
  
          /*if(err){
           console.log("Error inserting student : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              //console.log("insert")
             // data.student_id = result.insertId;
              res.send(JSON.stringify(data))
          } 
        });*/
      
  });

});

})
})


router.post('/add_certificate', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            certificate_name    : input.certificate_name,
            certificate_text    : input.certificate_text,
        };
        
        var query = connection.query("INSERT INTO certificate_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting cuntry : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              data.id = rows.insertId;
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});




module.exports = router;
