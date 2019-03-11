var express = require('express');
var router = express.Router();
var multer = require('multer')
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");
const copyFile = require('fs-copy-file');

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

/* Read Student Profile */

router.get('/read_student_profile/:student_id', function(req, res, next) {

  var student_id = req.params.student_id;
  var session_id = req.cookies.session_id

  req.getConnection(function(err,connection){
       
     var data = {}

     var qry = `select a.student_id, b.standard, b.standard_id, g.section_id, g.section, c.group_id, c.group_name, d.house_id, 
                d.house_name,  title, first_name,middle_name, last_name, enroll_number, reference_enrol, roll_number,
                reg_number,gender, e.category_name, date_format(dob,'%d/%m/%Y') as dob,
                date_format(doa,'%d/%m/%Y') as doa, date_format(doj,'%d/%m/%Y') as doj,
                date_format(old_doa,'%d/%m/%Y') as old_doa, date_format(old_doj,'%d/%m/%Y') as old_doj,
                date_format(withdraw_date,'%d/%m/%Y') as withdraw_date,
                mother_tongue, last_school, last_class, admission_for_class, hobby, a.blood_group, nationality, cast, 
                h.religion_id, h.religion,fax,aadhar_no,
                c_add_l1, c_add_l2, c_city, c_zip, c_state, c_country,
                p_add_l1, p_add_l2, p_city, p_zip, p_state, p_country, is_permanent,
                mobile, residence_phone,staff_child, staff_name, student_type, email,
                f_title, f_name, f_school_name, f_school_exam_passed, f_college_name, f_college_exam_passed, 
                f_occupation, f_add_l1, f_add_l2, f_city, f_zip, f_state, f_country, f_phone, f_mobile, f_fax, f_email, 
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
                g_relation,
                g_office_phone, g_nationality, music, academic,
                sports, community, social,medical, media, hr_training, painting, career, information, communication, med, 
                bed, ttc, montessori,
                sibling_name, sibling_enroll_number,z.emergency_number, session_name,
                first_child_name, first_child_age, first_child_class, first_child_section, first_child_school,
                second_child_name, second_child_age, second_child_class, second_child_section, second_child_school,
                third_child_name, third_child_age, third_child_class, third_child_section, third_child_school,
                fourth_child_name, fourth_child_age, fourth_child_class, fourth_child_section, 
                fourth_child_school,
                first_enrol, second_enrol, third_enrol, fourth_enrol
                from student_master a
                LEFT JOIN student_current_standing i on (a.student_id = i.student_id and a.current_session_id= ${session_id} )
                LEFT JOIN section_master g on i.section_id = g.section_id
                LEFT JOIN standard_master b on g.standard_id = b.standard_id 
                LEFT JOIN student_group c on i.group_id = c.group_id
                LEFT JOIN house_master d on i.house_id = d.house_id
                LEFT JOIN category_master e on a.category_id = e.category_id
                JOIN parent_master f on (a.student_id = f.student_id and f.current_session_id = ${session_id}) 
                LEFT JOIN religion_master h on a.religion_id = h.religion_id
                LEFT JOIN medical z on a.student_id = z.student_id 
                join session_master y on a.current_session_id = y.session_id 
                where a.student_id = ${student_id}
                and i.session_id = ${session_id}
                order by first_name, middle_name, last_name`;

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Student Profile : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.student_profile_details = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Student For First Edit */

router.get('/read_student_first_edit/:read_standard_id/:read_section_id/:first_edit_value', function(req, res, next) {

  var standard_id = req.params.read_standard_id;
  var section_id = req.params.read_section_id;
  var first_edit_value = req.params.first_edit_value;
  var session_id = req.cookies.session_id
  console.log("hiiii");

  req.getConnection(function(err,connection){
       
    var data = {}
    var qry =`select a.student_id, a.current_session_id, b.standard, b.standard_id, 
              c.section_id, c.section,
              first_name, middle_name, last_name,concat(first_name,' ',middle_name, ' ' ,last_name)as name,
              email, enroll_number, 
              f_name, ${first_edit_value} as edit_field
              from student_master a
              LEFT JOIN student_current_standing g on (a.student_id=g.student_id and a.current_session_id= ${session_id})
              LEFT JOIN section_master c on  g.section_id = c.section_id
              LEFT JOIN standard_master b on c.standard_id = b.standard_id
              LEFT JOIN house_master d on g.house_id = d.house_id
              LEFT JOIN student_group e on g.group_id = e.group_id 
              JOIN parent_master f on (a.student_id = f.student_id  and f.current_session_id= ${session_id})
              where b.standard_id= ${standard_id} and c.section_id= ${section_id}  
              and (a.withdraw='N' || a.withdraw_session > ${session_id})
              and g.session_id=${session_id} 
              order by first_name `;

    connection.query(qry,function(err,result)     {
            
      if(err){
        console.log("Error reading Student For First Edit : %s ",err );
        data.status = 'e';

      }else{
        data.status = 's';
        data.student_first_edit = result;
        res.send(JSON.stringify(data))
        }
     });    
  });
});

/* Edit Student First */
router.post('/edit_student_first/:first_edit_value', function(req, res, next) {

  var first_edit_value = req.params.first_edit_value;
  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  var session_id = req.cookies.session_id

  var data = {}

    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }
         
        var qry= '' 

        console.log(input.editValues)

        input.editValues.map(d=>{

          var q ='';

          if((first_edit_value != 'f_email') && (first_edit_value !='f_mobile') && (first_edit_value !='f_fax') &&
          (first_edit_value != 'm_email') && (first_edit_value!='m_mobile') && (first_edit_value !='m_fax')){

            q=`update student_master set ${first_edit_value} = '${d.value}'
                 where student_id = ${d.student_id}
                 and current_session_id = ${session_id}`;
         
          }else{

           q=`update parent_master set ${first_edit_value} = '${d.value}'
                 where student_id = ${d.student_id}
                 and current_session_id = ${session_id}`;
          }

           if(qry==''){
               qry = q;
           }else{
              qry = qry+';'+q;
          }

        })            
        /*console.log(qry)   */ 
        connection.query(qry, function(error, rows)
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

/* Read Student */

router.get('/read_student/:read_standard_id/:read_section_id/:read_enroll_number', function(req, res, next) {

  var standard_id = req.params.read_standard_id;
  var section_id = req.params.read_section_id;
  var enroll_number = req.params.read_enroll_number;
  var session_id = req.cookies.session_id
  var Role=req.cookies.role;
  console.log(Role)
  //var admission_session_id = 8;
  console.log("hiiii");

  req.getConnection(function(err,connection){
       
    var data = {}
    if(Role!="ADMIN"){
      if(enroll_number!="0"){
        var qry =`select a.student_id, b.standard, c.standard_id, c.section_id, c.section, title, first_name,middle_name, last_name,
                  concat(first_name,' ',middle_name, ' ' ,last_name)as name,
                  enroll_number,roll_number, reg_number, mobile, f_title, f_name,house_name as house
                  from student_master a
                  JOIN student_current_standing d on (a.student_id = d.student_id and a.current_session_id= ${session_id} )
                  JOIN section_master c  on d.section_id = c.section_id
                  JOIN standard_master b on c.standard_id = b.standard_id
                  JOIN parent_master f  on (a.student_id = f.student_id  and f.current_session_id= ${session_id} )
                  LEFT JOIN house_master g  on  d.house_id=g.house_id
                  where a.enroll_number in (${enroll_number})
                  and (a.withdraw='N' || a.withdraw_session > ${session_id} )
                  and d.session_id= ${session_id}
                  order by first_name,middle_name,last_name `;
      }else{
        var qry =`select a.student_id, b.standard, c.standard_id, c.section_id, c.section, title, first_name,middle_name, last_name,
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
    }if(Role=="Admission"){
        var qry=`select a.student_id, b.standard, c.standard_id, c.section_id, c.section, title, 
               first_name,middle_name, last_name,
               concat(first_name,' ',middle_name, ' ' ,last_name)as name,
               enroll_number,roll_number, reg_number, mobile, f_title, f_name,house_name as house
               from student_master a
               JOIN student_current_standing d on (a.student_id = d.student_id  and a.current_session_id = ${session_id})
               JOIN section_master c  on d.section_id = c.section_id
               JOIN standard_master b on c.standard_id = b.standard_id
               JOIN parent_master f  on (a.student_id = f.student_id  and f.current_session_id = ${session_id})
               LEFT JOIN house_master g  on  d.house_id=g.house_id
               where a.enroll_number in (${enroll_number})
               and a.withdraw='N'
               and d.session_id= ${session_id}
               order by first_name,middle_name,last_name `;


    }else{

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
                 where a.enroll_number in (${enroll_number})
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

/* Read Student CSV */

router.post('/read_student_csv', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){

    var data = {}
    var std = Array();
    var result = input.data;
    console.log(result)
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {

      for(var i = 0; i < result.length; i++){
        var obj = {};
        obj['Roll Number'] = result[i].roll_number;
        obj['Student Name'] = result[i].name;
        obj['Enrolment Number'] = result[i].enroll_number;
        obj['Registration Number'] = result[i].reg_number;
        obj['Mobile'] = result[i].mobile;
        obj['Father Name'] = result[i].f_name;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Roll Number','Student Name','Enrolment Number','Registration Number','Mobile','Father Name'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/Student.csv'; 
      data.url = '/csv/Student.csv';

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

/* Read Student Details */

router.get('/read_for_edit_student/:student_id', function(req, res, next) {

  var student_id = req.params.student_id;
  var session_id = req.cookies.session_id

  req.getConnection(function(err,connection){
       
    var data = {}

    var qry =` select a.student_id, a.current_session_id, b.standard, b.standard_id, g.section_id, g.section,c.group_id,
               c.group_name, d.house_id, d.house_name, title, first_name, middle_name, last_name, enroll_number, roll_number,
               reg_number,gender, e.category_id, date_format(dob,'%d/%m/%Y') as dob,
               date_format(doa,'%d/%m/%Y') as doa, date_format(doj,'%d/%m/%Y') as doj,
               date_format(old_doj,'%d/%m/%Y') as old_doj, date_format(old_doa,'%d/%m/%Y') as old_doa,
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
router.post('/add_student', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  var data = {} 

      var values_students = input.student
      values_students.creation_date=formatted;
      values_students.current_session_id=req.cookies.session_id;
      values_students.modified_by=req.cookies.user;


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
          console.log(log);

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
        values_student_current_standing.modified_by=req.cookies.user;

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
        values_student_login.modified_by=req.cookies.user;

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
          values_parent.modified_by=req.cookies.user;

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
                console.log(log);
                
                data.status = 's';
                data.student_id=log
                console.log('success!');
                console.log(data);
                res.send(JSON.stringify(data))

              });
          });

        });//end of ection con
      });
    });
  });



/* Edit Student. */
router.post('/edit_student/:student_id', function(req, res, next) {


  var student_id = req.params.student_id;
  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  var data = {} 

      var values_students = input.student
      //values_students.modification_date=formatted;
      values_students.current_session_id=req.cookies.session_id;
      values_students.modified_by=req.cookies.user;


    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        connection.query('UPDATE student_master set ? WHERE student_id = ? and current_session_id = ?', [values_students, student_id,req.cookies.session_id], function (error, rows) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          //var log = rows.insertId;

        //**********Update Student Current Standing  ***************************
        var values_student_current_standing = input.student_current_standing;
        //values_student_current_standing.modification_date=formatted;
        values_student_current_standing.session_id=req.cookies.session_id;
        values_student_current_standing.modified_by=req.cookies.user;

        connection.query("UPDATE student_current_standing set ? WHERE student_id = ? and session_id = ?", [values_student_current_standing, student_id,req.cookies.session_id], function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });

         //**********Update Parent Master  ***************************
          var values_parent = input.parent;
          //values_parent.modification_date=formatted;
          values_parent.current_session_id=req.cookies.session_id;
          values_parent.modified_by=req.cookies.user;

          connection.query("UPDATE parent_master set ? WHERE student_id = ? and current_session_id = ?", [values_parent,student_id,req.cookies.session_id], function(error, rows)
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
                var guardianName = values_parent.is_guardian;
                console.log(guardianName)
                if(guardianName == 'Mother'){
                  if (fs.existsSync('./public/images/'+req.cookies.session_id+'/motherImages/'+req.params.student_id+'.jpg')) {
                    copyFile('./public/images/'+req.cookies.session_id+'/motherImages/'+req.params.student_id+'.jpg', './public/images/'+req.cookies.session_id+'/guardianImages/'+req.params.student_id+'.jpg', (err) => {
                      if (err) throw err; console.log('path/file.txt was deleted');
                    });
                  }
                }
                else if(guardianName == 'Father'){
                  if (fs.existsSync('./public/images/'+req.cookies.session_id+'/fatherImages/'+req.params.student_id+'.jpg')) {
                    copyFile('./public/images/'+req.cookies.session_id+'/fatherImages/'+req.params.student_id+'.jpg', './public/images/'+req.cookies.session_id+'/guardianImages/'+req.params.student_id+'.jpg', (err) => {
                      if (err) throw err; console.log('path/file.txt was deleted');
                    });
                  }
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

/* create_student_withdraw */

router.post('/create_student_withdraw/:student_id', function(req, res, next) {


  var student_id = req.params.student_id;
  var session_id = req.cookies.session_id;
  var modified_by = req.cookies.user;
  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  var modification_date = formatted;

  var data = {} 

      var values_students = input.student
      console.log(values_students)

      req.getConnection(function(err,connection){

            var qry = ` update student_master set withdraw='Y', withdraw_date = '${values_students.withdraw_date}',
                        withdraw_remarks= '${values_students.withdraw_remarks}' , tc_no= '${values_students.tc_no}' , 
                        prev_class= '${values_students.prev_class}' , 
                        withdraw_session= ${session_id},  modified_by= '${modified_by}'
                        where student_id = ${student_id}
                        and current_session_id = ${session_id} `;
            console.log(qry);

            var query = connection.query(qry, function(err, rows)
            {
      
              if(err){
               console.log("Error creating withdraw : %s ",err );
               data.status = 'e';

             }else{
                  data.status = 's';
                  
                  res.send(JSON.stringify(data))
              }
             
              
            });
       });

});



/* Delete Student. */
router.get('/delete_student/:student_id', function(req, res, next) {

  var student_id = req.params.student_id;
  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  var data = {}       
      
      var current_session_id=req.cookies.session_id;
      var modified_by=req.cookies.role;


    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        var qry = ` select count(receipt_id) as total_receive 
                    from fee_received
                    where session_id = ${current_session_id}
                    and student_id = ${student_id} `;
        connection.query(qry, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }

          var fee_received = 0;
          var fee_received = result.total_receive;

        //**********Delete Student Master  ***************************
        if(fee_received==0){//if fees not receivecd
          data.status = 'e';
          data.error = 'Fee recived';
          res.send(data)
        }else{  
        var qry = `delete from student_master 
                   where student_id = ${student_id}
                   and current_session_id = ${current_session_id}`;

        connection.query(qry, function(error, result)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });

          //**********Delete Student Current Standing  ***************************
        
        var qry = `delete from student_current_standing
                   where student_id = ${student_id}
                   and session_id= ${current_session_id} `;

        connection.query(qry, function(error, result)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });

         //**********Delete Parent Master  ***************************
          
          var qry = `delete from parent_master
                     where student_id = ${student_id}
                     and current_session_id= ${current_session_id} `;

          connection.query(qry, function(error, result)
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
                if (fs.existsSync('./public/images/'+req.cookies.session_id+'/studentImages/'+req.params.student_id+'.jpg')) {
                  fs.unlink('./public/images/'+req.cookies.session_id+'/studentImages/'+req.params.student_id+'.jpg', (err) => {
                    if (err) throw err; console.log('path/file.txt was deleted');
                  });
                }
                if (fs.existsSync('./public/images/'+req.cookies.session_id+'/fatherImages/'+req.params.student_id+'.jpg')) {
                  fs.unlink('./public/images/'+req.cookies.session_id+'/fatherImages/'+req.params.student_id+'.jpg', (err) => {
                    if (err) throw err; console.log('path/file.txt was deleted');
                  }); 
                }
                if (fs.existsSync('./public/images/'+req.cookies.session_id+'/motherImages/'+req.params.student_id+'.jpg')) {
                  fs.unlink('./public/images/'+req.cookies.session_id+'/motherImages/'+req.params.student_id+'.jpg', (err) => {
                    if (err) throw err; console.log('path/file.txt was deleted');
                  }); 
                }
                if (fs.existsSync('./public/images/'+req.cookies.session_id+'/guardianImages/'+req.params.student_id+'.jpg')) {
                  fs.unlink('./public/images/'+req.cookies.session_id+'/guardianImages/'+req.params.student_id+'.jpg', (err) => {
                    if (err) throw err; console.log('path/file.txt was deleted');
                  }); 
                }
                data.status = 's';
                data.students = result;
                console.log('success!');
                console.log(data);
                res.send(JSON.stringify(data))

              });
          });

        }//fees recived condition end  

        });//end of ection con

        
      });
    });
  });


/* Regenerate Roll No */
router.get('/regenerate_roll_no/:read_section_id', function(req, res, next) {

  var read_section_id = req.params.read_section_id;
  var input = JSON.parse(JSON.stringify(req.body));
  var current_session_id=req.cookies.session_id;
   
    var data = {}

    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }

        var qry = `select a.student_id, roll_number, enroll_number
                   from student_master a
                   join student_current_standing b on a.student_id=b.student_id
                   where b.section_id= ${read_section_id}
                   and (a.withdraw='N' || a.withdraw_session > ${current_session_id} )
                   and b.session_id= ${current_session_id} 
                   and a.current_session_id = ${current_session_id}
                   order by first_name,middle_name,last_name,enroll_number `;

        connection.query(qry, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          
          var sql = ''
          var slNo=1;
          console.log(result)
          result.map(c=>{
            var qry = `update student_master set roll_number= ${slNo}
                       where student_id= ${c.student_id}
                       and current_session_id = ${req.cookies.session_id};`;
            if(sql==''){
              sql = qry;
            }else{
              sql = sql + qry;
            }
            slNo++;
          })     
          
          console.log(qry)
          
          connection.query(sql, function(error, result)
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

/* Student List */
router.get('/student_list/:read_section_id', function(req, res, next) {

  var read_section_id = req.params.read_section_id;
  var input = JSON.parse(JSON.stringify(req.body));
  var current_session_id=req.cookies.session_id;
  var data = {}


    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }

        var qry = ` select count(*) as total
                    from student_master a
                    JOIN student_current_standing b on a.student_id=b.student_id
                    where b.section_id = ${read_section_id}
                    and (a.withdraw='N' or a.withdraw_session > ${current_session_id})
                    and b.session_id=${current_session_id}
                    and a.current_session_id = ${current_session_id} 
                    order by first_name,middle_name,last_name `;

        connection.query(qry, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          
          var total_student=result[0].total;

          var qry = `select  enroll_number,concat(first_name,' ',middle_name, ' ' ,last_name)as name,
                     d.standard, d.standard_id, c.section_id, c.section
                     from student_master a
                     JOIN student_current_standing b on a.student_id=b.student_id
                     JOIN section_master c on b.section_id = c.section_id
                     JOIN standard_master d on c.standard_id = d.standard_id
                     where b.section_id = ${read_section_id}
                     and (a.withdraw='N' or a.withdraw_session > ${current_session_id})
                     and b.session_id=${current_session_id}
                     and a.current_session_id = ${current_session_id}
                     order by first_name,middle_name,last_name `;
          

          connection.query(qry, function(error, result)
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
                data.total= total_student;
                data.student_list = result;
                console.log('success!');
                console.log(data);
                res.send(JSON.stringify(data))

              });
          });

        });
      });
    });
  });


/* Print List */
router.get('/print_list/:read_standard_id/:read_section_id', function(req, res, next) {
 
  var standard_id = req.params.read_standard_id;
  var section_id = req.params.read_section_id;
  var input = JSON.parse(JSON.stringify(req.body));
  var session_id=req.cookies.session_id;
  var data = {}


    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }

          var qry = `select a.student_id, b.standard, c.standard_id, c.section_id, c.section, title, first_name,middle_name, last_name,
                     concat(first_name,' ',middle_name, ' ' ,last_name)as name,session_name,
                     enroll_number,roll_number, reg_number, mobile, f_title, f_name,house_name as house
                     from student_master a
                     JOIN student_current_standing d on (a.student_id = d.student_id and a.current_session_id= ${session_id} )
                     JOIN section_master c  on d.section_id = c.section_id
                     JOIN standard_master b on c.standard_id = b.standard_id
                     JOIN parent_master f  on (a.student_id = f.student_id and f.current_session_id= ${session_id} )
                     LEFT JOIN house_master g  on  d.house_id=g.house_id
                     join session_master y on a.current_session_id = y.session_id 
                     where c.standard_id= ${standard_id} and c.section_id= ${section_id}
                     and (a.withdraw='N' || a.withdraw_session > ${session_id} )
                     and d.session_id= ${session_id}
                     order by first_name,middle_name,last_name,enroll_number `;

          /*var qry = `select a.student_id, b.standard, c.standard_id, c.section_id, c.section, title,
                     first_name,middle_name, last_name,
                     concat(first_name,' ',middle_name, ' ' ,last_name)as name,
                     enroll_number,roll_number, reg_number, mobile, f_title, f_name,house_name as house
                     from student_master a
                     JOIN student_current_standing d on (a.student_id = d.student_id and a.current_session_id= ${session_id} )
                     JOIN section_master c  on d.section_id = c.section_id
                     JOIN standard_master b on c.standard_id = b.standard_id
                     JOIN parent_master f  on (a.student_id = f.student_id and f.current_session_id= ${session_id} )
                     LEFT JOIN house_master g  on  d.house_id = g.house_id
                     where c.standard_id= ${standard_id} and c.section_id= ${section_id}
                     and (a.withdraw='N' || a.withdraw_session > ${session_id} )
                     and d.session_id= ${session_id}
                     order by first_name,middle_name,last_name,enroll_number `;*/
          

          connection.query(qry, function(error, result)
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
                data.print_list = result;
                console.log('success!');
                console.log(data);
                res.send(JSON.stringify(data))

              });
          });
      });
    });
  });

  // image upload start******************************************************
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Student Image Upload
const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/'+req.cookies.session_id+'/'+req.params.folder_name);
    },
    filename: function(req, file, cb) {
      image_name= req.params.image_name+'.jpg';
      cb(null, image_name);
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post('/upload_student_image/:folder_name/:image_name', upload.single('student_profile_picture'), function(req, res, next) {
  console.log('inside uploading images');
  res.send(200)
});

// Student Image Delete

router.post('/delete_upload_student_image/:student_id', function(req, res, next) {

  if(fs.existsSync('./public/images/'+req.cookies.session_id+'/studentImages/'+req.params.student_id+'.jpg')) {
    fs.unlink('./public/images/'+req.cookies.session_id+'/studentImages/'+req.params.student_id+'.jpg', (err) => {
      if (err) throw err; console.log('path/file.txt was deleted');
    }); 
  }
  res.send(200)
});

// Father Image Upload

const upload_father = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/'+req.cookies.session_id+'/'+req.params.folder_name);
    },
    filename: function(req, file, cb) {
      image_name= req.params.image_name+'.jpg';
      cb(null, image_name);
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


router.post('/upload_father_image/:folder_name/:image_name', upload_father.single('father_profile_picture'), function(req, res, next) {
  console.log('inside uploading images');
  res.send(200)
});

// Father Image Delete

router.post('/delete_upload_father_image/:student_id', function(req, res, next) {

  if(fs.existsSync('./public/images/'+req.cookies.session_id+'/fatherImages/'+req.params.student_id+'.jpg')) {
    fs.unlink('./public/images/'+req.cookies.session_id+'/fatherImages/'+req.params.student_id+'.jpg', (err) => {
      if (err) throw err; console.log('path/file.txt was deleted');
      }); 
  }
  res.send(200)
});

// Mother Image Upload
const upload_mother = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/'+req.cookies.session_id+'/'+req.params.folder_name);
    },
    filename: function(req, file, cb) {
      image_name= req.params.image_name+'.jpg';
      cb(null, image_name);
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


router.post('/upload_mother_image/:folder_name/:image_name', upload_mother.single('mother_profile_picture'), function(req, res, next) {
  console.log('inside uploading images');
  res.send(200)
});

// Mother Image Delete
router.post('/delete_upload_mother_image/:student_id', function(req, res, next) {

  if(fs.existsSync('./public/images/'+req.cookies.session_id+'/motherImages/'+req.params.student_id+'.jpg')) {
    fs.unlink('./public/images/'+req.cookies.session_id+'/motherImages/'+req.params.student_id+'.jpg', (err) => {
      if (err) throw err; console.log('path/file.txt was deleted');
    }); 
  }
  res.send(200)
});

// Guardian Image Upload
const upload_guardian = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/'+req.cookies.session_id+'/'+req.params.folder_name);
    },
    filename: function(req, file, cb) {
      image_name= req.params.image_name+'.jpg';
      cb(null, image_name);
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 5
    },
  fileFilter: fileFilter
});

router.post('/upload_guardian_image/:folder_name/:image_name', upload_guardian.single('guardian_profile_picture'), function(req, res, next) {
  console.log('inside uploading images');
  res.send(200)
});

// Guardian Image Delete
router.post('/delete_upload_guardian_image/:student_id', function(req, res, next) {

  if(fs.existsSync('./public/images/'+req.cookies.session_id+'/guardianImages/'+req.params.student_id+'.jpg')) {
    fs.unlink('./public/images/'+req.cookies.session_id+'/guardianImages/'+req.params.student_id+'.jpg', (err) => {
      if (err) throw err; console.log('path/file.txt was deleted');
    }); 
  }
  res.send(200)
});

router.post('/upload_copy_father_image/:student_id', function(req, res, next) {

  if (fs.existsSync('./public/images/'+req.cookies.session_id+'/fatherImages/'+req.params.student_id+'.jpg')) {
    copyFile('./public/images/'+req.cookies.session_id+'/fatherImages/'+req.params.student_id+'.jpg', './public/images/'+req.cookies.session_id+'/guardianImages/'+req.params.student_id+'.jpg', (err) => {
    if (err)
      throw err;
      console.log('source.txt was copied to destination.txt');
    });
  }
  
  res.send(200)

});

router.post('/upload_copy_mother_image/:student_id', function(req, res, next) {
  
  if (fs.existsSync('./public/images/'+req.cookies.session_id+'/motherImages/'+req.params.student_id+'.jpg')) { 
    copyFile('./public/images/'+req.cookies.session_id+'/motherImages/'+req.params.student_id+'.jpg', './public/images/'+req.cookies.session_id+'/guardianImages/'+req.params.student_id+'.jpg', (err) => {
    if (err)
      throw err;
      console.log('source.txt was copied to destination.txt');
    });
  }
  res.send(200)

});


// image upload end *******************************************************


module.exports = router;
