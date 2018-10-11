var express = require('express');
var router = express.Router();

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

/* Read House */

router.get('/read_house', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT house_id, house_name FROM house_master order by house_name',function(err,result)     {
            
        if(err){
           console.log("Error reading House : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.houses = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Cast Category */

router.get('/read_cast', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT category_id, category_name FROM category_master order by category_name',function(err,result)     {
            
        if(err){
           console.log("Error reading House : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.cast = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Religion */

router.get('/read_religion', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT religion_id, religion FROM religion_master order by religion',function(err,result)     {
            
        if(err){
           console.log("Error reading Religion : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.religion = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Student */

router.get('/read_student/:read_standard_id/:read_section_id/:read_enroll_number', function(req, res, next) {

  var standard_id = req.params.read_standard_id;
  var section_id = req.params.read_section_id;
  var enroll_number = req.params.read_enroll_number;
  var session_id = req.cookies.session_id
  console.log("hiiii");

  req.getConnection(function(err,connection){
       
    var data = {}
    if(enroll_number!="0"){
      var qry =` select a.student_id, b.standard, c.standard_id, c.section_id, c.section, title, first_name,middle_name, last_name,
                 concat(first_name,' ',middle_name, ' ' ,last_name)as name,
                 enroll_number,roll_number, reg_number, mobile, f_title, f_name,house_name as house
                 from student_master a
                 JOIN student_current_standing d on (a.student_id = d.student_id and a.current_session_id= ${session_id} )
                 JOIN section_master c  on d.section_id = c.section_id
                 JOIN standard_master b on c.standard_id = b.standard_id
                 JOIN parent_master f  on (a.student_id = f.student_id  and f.current_session_id= ${session_id} )
                 LEFT JOIN house_master g  on  d.house_id=g.house_id
                 where a.enroll_number = ${enroll_number}
                 and (a.withdraw='N' || a.withdraw_session > ${session_id} )
                 and d.session_id= ${session_id}
                 order by first_name,middle_name,last_name `;
    }else{
      var qry =` select a.student_id, b.standard, c.standard_id, c.section_id, c.section, title, first_name,middle_name, last_name,
                 concat(first_name,' ',middle_name, ' ' ,last_name)as name,
                 enroll_number,roll_number, reg_number, mobile, f_title, f_name,house_name as house
                 from student_master a
                 JOIN student_current_standing d on (a.student_id = d.student_id and a.current_session_id= ${session_id} )
                 JOIN section_master c  on d.section_id = c.section_id
                 JOIN standard_master b on c.standard_id = b.standard_id
                 JOIN parent_master f  on (a.student_id = f.student_id and f.current_session_id= ${session_id} )
                 LEFT JOIN house_master g  on  d.house_id=g.house_id
                 where c.standard_id= ${standard_id} and c.section_id= ${section_id}
                 and (a.withdraw='N' || a.withdraw_session > ${session_id} )
                 and d.session_id= ${session_id}
                 order by first_name,middle_name,last_name,enroll_number `;
    }
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

/* Read Student Details */

router.get('/read_for_edit_student/:student_id', function(req, res, next) {

  var student_id = req.params.student_id;
  var session_id = req.cookies.session_id

  req.getConnection(function(err,connection){
       
    var data = {}

    var qry =` select a.student_id, a.current_session_id, b.standard, b.standard_id, g.section_id, g.section,c.group_id,
               c.group_name, d.house_id, d.house_name, title, first_name, middle_name, last_name, enroll_number, roll_number,
               reg_number,gender, e.category_id, date_format(dob,'%d/%m/%Y') as dob, date_format(dob, "%Y-%m-%d") as edit_dob,
               date_format(doa,'%d/%m/%Y') as doa, date_format(doa, "%Y-%m-%d") as edit_doa,
               date_format(doj,'%d/%m/%Y') as doj, date_format(doj, "%Y-%m-%d") as edit_doj,
               date_format(old_doj,'%d/%m/%Y') as old_doj, date_format(old_doj, "%Y-%m-%d") as edit_old_doj,
               date_format(old_doa,'%d/%m/%Y') as old_doa, date_format(old_doa, "%Y-%m-%d") as edit_old_doa,
               mother_tongue, last_school, last_class, admission_for_class, hobby, blood_group, nationality, 
               cast, h.religion_id, h.religion, c_add_l1, c_add_l2, c_city, c_zip, c_state, c_country,
               p_add_l1, p_add_l2, p_city, p_zip, p_state, p_country, is_permanent,
               mobile, residence_phone, fax, staff_child, staff_name, student_type, email,transport_mode,       
               school_distance, differently_abled,aadhar_no,
               f_title, f_name, f_school_name, f_school_exam_passed, f_college_name, f_college_exam_passed, f_occupation,
               is_caddress, f_add_l1, f_add_l2, f_city, f_zip, f_state, f_country, f_phone, f_mobile, f_fax, f_email, 
               f_organisation_type, f_annual_income, f_work_profile, f_organisation_name, f_designation, f_department,
               f_office_add_l1, f_office_add_l2, f_office_city, f_office_zip, f_office_state, f_office_country, 
               f_office_phone, f_nationality,  
               m_title, m_name, m_school_name, m_school_exam_passed, m_college_name, m_college_exam_passed, m_occupation, 
               is_motherAdd, m_add_l1, m_add_l2, m_city, m_zip, m_state, m_country, m_phone, m_mobile, m_fax, m_email, 
               m_organisation_type, m_annual_income, m_work_profile, m_organisation_name, m_designation, m_department,
               m_office_add_l1, m_office_add_l2, m_office_city, m_office_zip, m_office_state, m_office_country,
               m_office_phone, m_nationality, 
               is_guardian, g_title, g_name, g_school_name, g_school_exam_passed, g_college_name, g_college_exam_passed, 
               g_occupation, g_add_l1, g_add_l2, g_city, g_zip, g_state, g_country, g_phone, g_mobile, g_fax, g_email, 
               g_organisation_type, g_annual_income, g_work_profile, g_organisation_name, g_designation, g_department, 
               g_office_add_l1, g_office_add_l2, g_office_city, g_office_zip, g_office_state, g_office_country, 
               g_relation,g_office_phone, g_nationality, music, academic,
               sports, community, social,medical, media, hr_training, painting, career, information, communication, med, 
               bed, ttc, montessori, sibling_name, sibling_enroll_number,
               first_child_name, first_child_age, first_child_class, first_child_section, first_child_school,
               second_child_name, second_child_age, second_child_class, second_child_section, second_child_school,
               third_child_name, third_child_age, third_child_class, third_child_section, third_child_school,
               fourth_child_name, fourth_child_age, fourth_child_class, fourth_child_section, fourth_child_school,
               first_enrol, second_enrol, third_enrol, fourth_enrol
               from student_master a
               JOIN student_current_standing i on (a.student_id = i.student_id and a.current_session_id= ${session_id} )
               LEFT JOIN section_master g on i.section_id = g.section_id
               LEFT JOIN standard_master b on g.standard_id = b.standard_id 
               LEFT JOIN student_group c on i.group_id = c.group_id
               LEFT JOIN house_master d on i.house_id = d.house_id
               LEFT JOIN category_master e on a.category_id = e.category_id
               JOIN parent_master f on (a.student_id = f.student_id and f.current_session_id= ${session_id} )
               LEFT JOIN religion_master h on a.religion_id = h.religion_id
               where a.student_id = ${student_id} and i.session_id= ${session_id}
               order by 9 `;
    
    connection.query(qry,function(err,result)     {
            
      if(err){
        console.log("Error reading Student Details : %s ",err );
        data.status = 'e';

      }else{
        data.status = 's';
        data.student_details = result;

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Add Student. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  var data = {} 

      var values_students = input.student
      values_students.creation_date=formatted;
      values_students.current_session_id=req.cookies.session_id;
      values_students.modified_by=req.cookies.role;


    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        connection.query('INSERT INTO student_master set ?', values_students, function (error, rows) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          var log = rows.insertId;

        connection.query("Update student_master set student_id= ? where std_id= ? and current_session_id = ? ",[log,log,req.cookies.session_id], function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });

        //**********insert into Student Current Standing  ***************************
        var values_student_current_standing = input.student_current_standing;
        values_student_current_standing.student_id=log;
        values_student_current_standing.creation_date=formatted;
        values_student_current_standing.session_id=req.cookies.session_id;
        values_student_current_standing.modified_by=req.cookies.role;

        connection.query("INSERT INTO student_current_standing set ? ", values_student_current_standing, function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });

        //**********insert into Student Login  ***************************
        var values_student_login = input.student_login;
        values_student_login.creation_date=formatted;
        values_student_login.modification_date=formatted;
        values_student_login.modified_by=req.cookies.role;

        connection.query("INSERT INTO student_login set ? ", values_student_login, function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });

         //**********insert into Parent Data  ***************************
          var values_parent = input.parent;
          values_parent.student_id=log;
          values_parent.creation_date=formatted;
          values_parent.current_session_id=req.cookies.session_id;
          values_parent.modified_by=req.cookies.role;

          connection.query("INSERT INTO parent_master set ? ", values_parent, function(error, rows)
          {
              if (error) {
                return connection.rollback(function() {
                  throw error;
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
          });

        });//end of ection con
      });
    });
  });  


module.exports = router;
