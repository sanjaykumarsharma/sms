var express = require('express');
var router = express.Router();
var multer = require('multer')
var fs = require('fs');


/* Read Standard */

router.get('/read_standard', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT standard_id, standard FROM standard_master',function(err,result)     {
            
        if(err){
           console.log("Error reading Standard : %s ",err );
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

/* Read Section */

router.get('/read_section', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT standard_id, section_id, section FROM section_master',function(err,result)     {
            
        if(err){
           console.log("Error reading Section : %s ",err );
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

/* Read Student */

router.get('/read_student/:standard_id/:section_id', function(req, res, next) {

  var standard_id = req.params.standard_id;
  var section_id = req.params.section_id;  
  var session_id = req.cookies.session_id
  console.log("hiiii");

  req.getConnection(function(err,connection){
       
    var data = {}

      var qry =` select a.student_id, first_name, middle_name, last_name,
                 concat(first_name,' ',middle_name, ' ' ,last_name)as name,enroll_number, roll_number
                 from student_master a
                 JOIN student_current_standing b on (a.student_id=b.student_id and a.current_session_id =${session_id})
                 LEFT JOIN section_master c on  b.section_id = c.section_id
                 where c.standard_id=${standard_id} and c.section_id= ${section_id}
                 and (a.withdraw='N' or a.withdraw_session > ${session_id}) 
                 and session_id = ${session_id}
                 order by first_name `;
    connection.query(qry,function(err,result)     {
            
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.students = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Student ID Card */

router.get('/read_id_card/:student_id', function(req, res, next) {

  var student_id = req.params.student_id;
  var session_id = req.cookies.session_id
  console.log("hiiii");

  req.getConnection(function(err,connection){
       
    var data = {}

    var qry =` select a.student_id,enroll_number, concat(first_name,' ',middle_name,' ',last_name)as student_name,
               gender, standard, section,blood_group, if(transport_mode = 'None','',transport_mode)as transport_mode, 
               f_name, session_name,
               c_add_l1, c_add_l2, c_city, c_zip, c_state, c_country, mobile
               from student_master a  
               join student_current_standing b on (a.student_id = b.student_id  and a.current_session_id = ${session_id})        
               join section_master c on b.section_id = c.section_id
               join standard_master d on c.standard_id = d.standard_id
               join parent_master f on (a.student_id = f.student_id  and f.current_session_id = ${session_id})
               join session_master g on b.session_id =g.session_id
               where a.student_id in (${student_id})
               and a.withdraw ='N'
               and b.session_id= ${session_id}
               order by first_name, middle_name, last_name`;
    connection.query(qry,function(err,result)     {
            
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.students_id_card_details = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

module.exports = router;
