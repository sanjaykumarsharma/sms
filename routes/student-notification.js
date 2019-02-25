var express = require('express');
var router = express.Router();

/* Read Standard */

/*router.get('/read_standard', function(req, res, next) {

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

});*/
router.get('/read_standard', function(req, res, next) {

  req.getConnection(function(err,connection){
      var user=req.cookies.user 
      var data = {}
     console.log("+++++")
     console.log(req.cookies.role)

      var condition="";
      if(req.cookies.role== "TEACHER" || req.cookies.role=="Class Teacher"){
           condition =`where standard_id=(select standard_id from section_master 
              where teacher_id=(select emp_id from employee where employee_id='${user}')) `;
      }
      var qry = `select standard_id,standard 
                from standard_master 
                ${condition} `

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading standards : %s ",err );
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

/*router.get('/read_section', function(req, res, next) {

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

});*/
router.get('/read_section', function(req, res, next) {

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

/* Read Course listing. */
router.get('/read_student/:standard_id/:section_id', function(req, res, next) {

  var session_id = req.cookies.session_id
  var section_id = req.params.section_id
  var standard_id = req.params.standard_id

  req.getConnection(function(err,connection){
       
    var data = {}
    

    var whereSection = "";
    var whereStandard = "";
      if(section_id != '-1') var whereSection = " and d.section_id = " + section_id;
      if(standard_id != '-1') var whereStandard = " and e.standard_id = " + standard_id;


    var qry = ` select  a.student_id, mobile, email, if(f_email='', m_email, f_email) as p_email,
                if(f_mobile='', if(m_mobile = '', g_mobile, m_mobile), f_mobile) as p_mobile,
                concat(standard,' ',section) as standard, concat(first_name,' ',middle_name,' ',last_name) as name
                from student_master a
                JOIN student_current_standing b on (a.student_id=b.student_id and b.session_id = ${session_id} )
                JOIN parent_master c on (a.student_id=c.student_id and c.current_session_id =${session_id})
                JOIN section_master d on b.section_id=d.section_id
                JOIN standard_master e on d.standard_id=e.standard_id
                where  (withdraw = 'N' || withdraw_session > ${session_id})
                ${whereSection}
                and a.current_session_id = ${session_id}
                ${whereStandard} `;
        
        connection.query(qry,function(err,result)     {
            console.log(qry)
        if(err){
           console.log("Error reading students : %s ",err );
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


module.exports = router;
