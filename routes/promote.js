var express = require('express');
var router = express.Router();
var async = require("async");
var multer = require('multer')
var fs = require('fs');
const { COPYFILE_FICLONE_FORCE } = fs.constants;
const path = require('path');
const fse = require('fs-extra')


/*======= read promoted students =======*/

router.get('/read_promoted/:standard_id/:section_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var session_id = req.cookies.session_id
     var qry = `select a.student_id, concat(first_name,' ',middle_name, ' ' ,last_name)as name,
                enroll_number,roll_number
                from student_master a
                JOIN student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${session_id})
                JOIN section_master c on c.section_id= b.section_id
                JOIN standard_master d on d.standard_id = c.standard_id
              where d.standard_id=${req.params.standard_id}
                and c.section_id= ${req.params.section_id}
              and (a.withdraw='N' || a.withdraw_session > ${session_id})
              and b.session_id= ${session_id}
              order by a.first_name,a.middle_name,a.last_name`;
     console.log(qry)
     connection.query(qry,function(err,result)     {            
        if(err){
           console.log("Error reading Promoted students : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.status = 's';
            console.log(result);
            data.promotedStudents = result;
            res.send(data)
        }
     
     });     
       
  });

});

/* Read Students listing. */

router.get('/students/:standard_id/:section_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var session_id = req.cookies.session_id
     var qry = `select a.student_id, concat(first_name,' ',middle_name, ' ' ,last_name)as name,
                enroll_number,roll_number, house_id
              from student_master a
                JOIN student_current_standing b on a.student_id = b.student_id
                JOIN section_master c on c.section_id= b.section_id
                JOIN standard_master d on d.standard_id = c.standard_id
              where d.standard_id=${req.params.standard_id}
                and c.section_id= ${req.params.section_id}
              and (a.withdraw='N' && a.current_session_id = (${session_id} - 1)) 
              and b.session_id=(${session_id} - 1)
              and a.student_id NOT IN(select student_id  from student_current_standing 
                                         where session_id=${session_id})
              order by a.first_name,a.middle_name,a.last_name`;

     console.log(qry)
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Free students : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.status = 's';
            data.freeStudents = result;
            res.send(data)
        }
     
     });
       
  });

});



/* Read Students listing. */

router.get('/freeStudents/:standard_id/:section_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var session_id = req.cookies.session_id
     var qry =`select a.student_id, concat(first_name,' ',middle_name, ' ' ,last_name)as name,
                enroll_number,roll_number, house_id
              from student_master a
                JOIN student_current_standing b on a.student_id = b.student_id
                JOIN section_master c on c.section_id= b.section_id
                JOIN standard_master d on d.standard_id = c.standard_id
              where d.standard_id=${req.params.standard_id}
                and c.section_id= ${req.params.section_id}
              and (a.withdraw='N' && a.current_session_id = (${session_id} - 1)) 
              and b.session_id=(${session_id} - 1)
              and a.student_id NOT IN(select student_id  from student_current_standing 
                                         where session_id=${session_id})
              order by a.first_name,a.middle_name,a.last_name`;

     console.log(qry)
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Free students : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.status = 's';
            data.freeStudents = result;
        }
     
     });
       
  });

});

/*Assign Students*/

router.post('/assign_students', function(req, res, next) {

  var data = {}
  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  var creation_date = formatted;
  var modified_by=req.cookies.role;
  var session_id = req.cookies.session_id;
  var section_id = input.section_id;
  var query_array = []
    
  req.getConnection(function(err, connection) {

   connection.beginTransaction(function(err) {
    if (err) { throw err; }
    
    async.forEachOf(input.students, function (value, key, callback) {
        
        
        // insert into student master
        var qry_student =`insert into student_master(student_id, current_session_id, title, first_name, middle_name, last_name, enroll_number, roll_number,
                          reg_number, gender, category_id, dob, doa, doj, mother_tongue, second_language, last_school, last_class,
                          admission_for_class, hobby, blood_group, nationality, cast, religion_id, 
                          c_add_l1, c_add_l2, c_city, c_zip, c_state, c_country, 
                          is_permanent, 
                          p_add_l1, p_add_l2, p_city, p_zip, p_state, p_country, 
                          mobile, residence_phone, fax, student_type, staff_child, staff_name, email, transport_mode, school_distance,
                          differently_abled, aadhar_no,  creation_date,modification_date, modified_by)
                          select ${value.student_id} as student_id, ${session_id} as current_session_id, title, first_name, middle_name, last_name, enroll_number, roll_number,
                          reg_number, gender, category_id, dob, doa, doj, mother_tongue, second_language, last_school, last_class,
                          admission_for_class, hobby, blood_group, nationality, cast, religion_id, 
                          c_add_l1, c_add_l2, c_city, c_zip, c_state, c_country, 
                          is_permanent, 
                          p_add_l1, p_add_l2, p_city, p_zip, p_state, p_country, 
                          mobile, residence_phone, fax, student_type, staff_child, staff_name, email, transport_mode, school_distance,
                          differently_abled, aadhar_no,  curdate(),curdate(), '${modified_by}' as modified_by
                          from student_master
                          where current_session_id=(${session_id}-1)
                          and student_id =  ${value.student_id}`;

       
        console.log(qry_student);
        // connection.query(qry_student, function (error, result, fields) {
        // if (error) {
        //     return connection.rollback(function() {
        //       console.log('error student')
        //       throw error;
        //     });
        //   }

        // })

      // insert into parent master
      var qry_parent = `insert into parent_master(student_id, current_session_id,  f_title, f_name, f_school_name,f_school_exam_passed,
                        f_college_name, f_college_exam_passed, f_occupation, 
                        is_caddress, f_add_l1, f_add_l2, f_city, f_zip, f_state, f_country,
                        f_phone, f_mobile, f_fax, f_email, 
                        f_organisation_type, f_annual_income, f_work_profile,
                        f_organisation_name, f_designation, f_department,
                        f_office_add_l1, f_office_add_l2, f_office_city, f_office_zip, f_office_state, f_office_country,
                        f_office_phone, f_nationality, 
                        m_title, m_name,m_school_name, m_school_exam_passed, 
                        m_college_name, m_college_exam_passed, m_occupation,
                        is_motherAdd, m_add_l1, m_add_l2, m_city, m_zip, m_state, m_country, 
                        m_phone, m_mobile, m_fax, m_email,
                        m_organisation_type, m_annual_income, m_work_profile, 
                        m_organisation_name, m_designation, m_department,
                        m_office_add_l1, m_office_add_l2, m_office_city, m_office_zip, m_office_state, m_office_country,
                        m_office_phone, m_nationality, 
                        is_guardian, g_title, g_name,g_school_name,g_school_exam_passed, 
                        g_college_name, g_college_exam_passed, g_occupation,
                        g_add_l1, g_add_l2, g_city, g_zip, g_state, g_country, 
                        g_phone, g_mobile, g_fax, g_email,
                        g_organisation_type, g_annual_income, g_work_profile, 
                        g_organisation_name, g_designation, g_department,
                        g_office_add_l1, g_office_add_l2, g_office_city, g_office_zip, g_office_state, g_office_country,
                        g_office_phone, g_nationality, g_relation,
                        music, academic, sports, community, social, medical, media, hr_training, 
                        painting, career, information, communication, med, bed, ttc, montessori, 
                        sibling_name, sibling_enroll_number,
                        first_child_name, first_child_age, first_child_class, first_child_section, first_child_school,first_enrol, 
                        second_child_name, second_child_age, second_child_class, second_child_section, second_child_school, second_enrol,
                        third_child_name, third_child_age, third_child_class, third_child_section, third_child_school, third_enrol,
                        fourth_child_name, fourth_child_age, fourth_child_class, fourth_child_section, fourth_child_school,  fourth_enrol,
                        creation_date, modification_date, modified_by)

                        select  ${value.student_id} as student_id, ${session_id} as current_session_id,  f_title, f_name, f_school_name,f_school_exam_passed,
                        f_college_name, f_college_exam_passed, f_occupation, 
                        is_caddress, f_add_l1, f_add_l2, f_city, f_zip, f_state, f_country,
                        f_phone, f_mobile, f_fax, f_email, 
                        f_organisation_type, f_annual_income, f_work_profile,
                        f_organisation_name, f_designation, f_department,
                        f_office_add_l1, f_office_add_l2, f_office_city, f_office_zip, f_office_state, f_office_country,
                        f_office_phone, f_nationality, 
                        m_title, m_name,m_school_name, m_school_exam_passed, 
                        m_college_name, m_college_exam_passed, m_occupation,
                        is_motherAdd, m_add_l1, m_add_l2, m_city, m_zip, m_state, m_country, 
                        m_phone, m_mobile, m_fax, m_email,
                        m_organisation_type, m_annual_income, m_work_profile, 
                        m_organisation_name, m_designation, m_department,
                        m_office_add_l1, m_office_add_l2, m_office_city, m_office_zip, m_office_state, m_office_country,
                        m_office_phone, m_nationality, 
                        is_guardian, g_title, g_name,g_school_name,g_school_exam_passed, 
                        g_college_name, g_college_exam_passed, g_occupation,
                        g_add_l1, g_add_l2, g_city, g_zip, g_state, g_country, 
                        g_phone, g_mobile, g_fax, g_email,
                        g_organisation_type, g_annual_income, g_work_profile, 
                        g_organisation_name, g_designation, g_department,
                        g_office_add_l1, g_office_add_l2, g_office_city, g_office_zip, g_office_state, g_office_country,
                        g_office_phone, g_nationality, g_relation,
                        music, academic, sports, community, social, medical, media, hr_training, 
                        painting, career, information, communication, med, bed, ttc, montessori, 
                        sibling_name, sibling_enroll_number,
                        first_child_name, first_child_age, first_child_class, first_child_section, first_child_school,first_enrol, 
                        second_child_name, second_child_age, second_child_class, second_child_section, second_child_school, second_enrol,
                        third_child_name, third_child_age, third_child_class, third_child_section, third_child_school, third_enrol,
                        fourth_child_name, fourth_child_age, fourth_child_class, fourth_child_section, fourth_child_school,  fourth_enrol,
                        curdate(), curdate(), '${modified_by}' as modified_by
                        from parent_master
                        where current_session_id=(${session_id}-1)
                        and student_id =  ${value.student_id}`;

      // console.log(qry_parent)    
      // connection.query(qry_parent, function (error, result, fields) {
      //   if (error) {
      //     return connection.rollback(function() {
      //     console.log('error parent')
      //     console.log(error)
      //       throw error;
      //     });
      //   }
      // })


      var qry = `insert into student_current_standing(student_id,section_id,session_id,house_id,creation_date,modified_by)
                 values(${value.student_id},${section_id},${session_id}, ${value.house_id}, curdate(),'${modified_by}')`;
              
      query_array.push(qry_student) 
      query_array.push(qry_parent) 
      query_array.push(qry) 
      callback()

    }, function (err) {
        if (err) {
          console.error(err.message);
          data.status = 'e';
          res.send(data)
        }

        //console.log(query_array)
        var q = '';
        query_array.map(c=>{
          if (q==''){
            q = c +';';
          }else{
            q = q + c +';';
          }
        })
        /*console.log(q)*/

        if(q!=''){

            connection.query(q, function(error, rows)
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

                  //var old_session_id = session_id-1 ;

                  /*input.students.map(s=>{

                    fs.copyFile('./public/images/'+old_session_id+'/student/17646.jpg', './public/images/'+session_id+'/student/123.jpg', function(err) {
                     if ( err ) console.log('ERROR: ' + err);
                     console.log("Image Copyed");
                    });*/

                    /*fs.rename('./public/images/7/student/17618.jpg', './public/images/7/student/123.jpg', function(err) {
                   if ( err ) console.log('ERROR: ' + err);
                });*/

                    /*let readStream = fs.createReadStream('./public/images/7/student/17618.jpg');

                    readStream.once('error', (err) => {
                      console.log(err);
                    });

                    readStream.once('end', () => {
                      console.log('done copying');
                    });*/

                    //readStream.pipe(fs.createWriteStream('./public/images/8/student/17618.jpg'));

                    // fs.readFile('./public/images/'+ old_session_id+'/student/'+s.student_id+'.jpg', function (err, data) {
                    //     if (err) throw err;
                    //     fs.writeFile('./public/images/'+ session_id+'/student/'+s.student_id+'.jpg', data, function (err) {
                    //         if (err) throw err;
                    //         console.log('It\'s saved!');
                    //     });
                    // });
                    
                  })
                  data.status = 's';
                  console.log('success!');
                  res.send(data)
                  

                });
            

        }else{
          data.status = 's';
          res.send(data)
        }

    });//end of async loop  

  });//beginTransaction 

});

});


// free students
router.post('/free_up_student', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var data = {}
    
    var session_id = req.cookies.session_id;
    var section_id = input.section_id;
    var query_array = []
    
  req.getConnection(function(err, connection) {

   connection.beginTransaction(function(err) {
    if (err) { throw err; }
    
    async.forEachOf(input.students, function (value, key, callback) {

      var qry_one= `select count(receipt_id) as total_receive 
                    from fee_received
                    where session_id =${session_id}
                    and student_id = ${value.student_id} `;
      connection.query(qry_one, function (error, result1, fields) {
        if (error) {
          return connection.rollback(function() {
            throw error;
          });
        }
      var receipt_id = result1[0].total_receive;

      console.log(result1[0])
      console.log(result1[0].total_receive)
      if(receipt_id>0){
        data.error_msg="You Can't delete this student. His fees has been received in this session";
      }else{             // insert
        
        var  qry_two =`delete from student_current_standing
                       where student_id = ${value.student_id}
                       and section_id=${section_id}
                       and session_id=${session_id }`;

        var qry_three = `delete from student_master
                         where student_id = ${value.student_id}
                         and current_session_id= ${session_id} `;

        var qry_four = `delete from parent_master
                        where student_id = ${value.student_id}
                        and current_session_id= ${session_id} `;                 
      

      query_array.push(qry_two)
      query_array.push(qry_three)
      query_array.push(qry_four)
      } 
    
      callback()
      }); //main connection query

    }, function (err) {
        if (err) {
          console.error(err.message);
          data.status = 'e';
          res.send(data)
        }

        console.log(query_array)
        var q = '';
        query_array.map(c=>{
          if (q==''){
            q = c +';';
          }else{
            q = q + c +';';
          }
        })
        console.log(q)

        if(q!=''){

            connection.query(q, function(error, rows)
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
                  res.send(data)
                  

                });
            });

        }else{
          data.status = 's';
          res.send(data)
        }

    });//end of async loop  

  });//beginTransaction 

});

});

module.exports = router;
