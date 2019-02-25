var express = require('express');
var router = express.Router();
var multer = require('multer')




//staff Type Report

router.get('/read_employee_type_report', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  //var emp_type_id=req.params.emp_type_id
  req.getConnection(function(err,connection){
       
    var data = {}
   /* var condition = "";
     if(emp_type_id != -1) condition = ` and a.emp_type_id =${emp_type_id}`;*/
     
      var qry =`select a.emp_type_id,emp_type,count(*) as total 
                from employee a
                JOIN emp_type_master b on a.emp_type_id = b.emp_type_id
                where a.is_active='Y'
                group by a.emp_type_id`;
          connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading employee type report : %s ",err );
        data.status = 'e';

      }else{
            data.status='s'
            data.employeeTypeReports = result
            res.send(JSON.stringify(data))

      }
     
     });
       
  });

});

//staff Gender Report

router.get('/read_employee_gender_report/:id', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  req.getConnection(function(err,connection){
       
    var data = {}
      var emp_type_id=req.params.id
      var condition = "";
     if(emp_type_id != -1) condition = ` and emp_type_id =${emp_type_id}`;
     
      var qry =`select gender, count(*) as total 
            from employee  
            where is_active='Y'
            ${condition}
            group by gender`;
          connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading employee gender report : %s ",err );
        data.status = 'e';

      }else{
            data.status='s'
            data.employeeGenderReports = result
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

/* Read Department */

router.get('/read_department', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT department_id, department_name FROM department_master order by department_name',function(err,result)     {
            
        if(err){
           console.log("Error reading Department : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.departments = result;
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

/* Read Ex Staff */

router.get('/read_ex_staff/:emp_type_id', function(req, res, next) {

  req.getConnection(function(err,connection){   
    var emp_type_id = req.params.emp_type_id;
     var data = {}
      var condition="";
      if(emp_type_id == -1)   condition = ``;
      if(emp_type_id != -1)   condition = `and emp_type_id = ${emp_type_id} `;
      var qry =`select emp_id,employee_id, first_name,middle_name, last_name, mobile, email, 
                date_format(leaving_date, '%d/%m/%Y') as dol,leaving_remarks as remarks,
                date_format(doj, '%d/%m/%Y') as doj
                from employee where  is_active='N' 
                ${condition} 
                order by leaving_date desc`
   
    connection.query(qry,function(err,result)     {
            
      if(err){
        console.log("Error reading Satff : %s ",err );
        data.status = 'e';

      }else{
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.exStaffs = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Browse Staff */

router.get('/read_browse_staff/:emp_type_id', function(req, res, next) {

  req.getConnection(function(err,connection){   
    var emp_type_id = req.params.emp_type_id;
     var data = {}
      var condition="";
      if(emp_type_id == -1)   condition = ``;
      if(emp_type_id != -1)   condition = `and a.emp_type_id = ${emp_type_id} `;
      var qry =`select employee_id, a.emp_id,title,first_name,middle_name,last_name, short_name,gender,marital_status,father_name,father_occupation,spouse,spouse_occupation,
        date_format(anniversary, '%d/%m/%Y') as anniversary,id_mark,blood_group,qualification,a.emp_type_id,e.emp_type,a.category_id,  
        a.department_id, b.department_name, a.subject_id, d.subject_name,  
        a.designation_id, c.designation,date_format(dob, '%d/%m/%Y') as dob,date_format(doj, '%d/%m/%Y') as doj,
        add_l1,add_l2,city,zip,state,country,c_add_l1,c_add_l2,c_city,c_zip,c_state,c_country, 
        place_of_birth, nationality, a.religion_id, language,
        residence_phone,office_phone,mobile,email,
        child1_first_name,child1_last_name,child1_sex,date_format(child1_dob, '%d/%m/%Y') as child1_dob,child1_school,
        child2_first_name,child2_last_name,child2_sex,date_format(child2_dob, '%d/%m/%Y') as child2_dob,child2_school,
        child3_first_name,child3_last_name,child3_sex,date_format(child3_dob, '%d/%m/%Y') as child3_dob,child3_school,
        x_subject , x_institution, x_board, x_yop, x_marks, x_div,
        xii_subject, xii_institution, xii_board, xii_yop, xii_marks, xii_div,
        ug_course, ug_institution, ug_university, ug_yop, ug_marks, ug_div,
        pg_course, pg_institution, pg_university, pg_yop, pg_marks, pg_div,
        bed_stream, bed_institution, bed_university, bed_yop, bed_marks, bed_div,
        bt_stream, bt_institution, bt_university, bt_yop, bt_marks, bt_div,
        bped_stream, bped_institution, bped_university, bped_yop, bped_marks,bped_div ,
        dped_stream, dped_institution, dped_university, dped_yop, dped_marks, dped_div,
        mped_stream, mped_institution, mped_university, mped_yop, mped_marks, mped_div,
        med_stream, med_institution, med_university, med_yop, med_marks, med_div,
        mphil_stream, mphil_institution, mphil_university, mphil_yop, mphil_marks, mphil_div,
        phd_stream, phd_institution, phd_university, phd_yop, phd_marks, phd_div,
        other_stream, other_institution, other_university, other_yop, other_marks, other_div,
        details_scholarship, details_awards, details_honours, details_publication ,details_curricular_activities, details_sport,
        organization_of_previous_job,add_l1_of_previous_job,add_l2_of_previous_job,
        city_of_previous_job,zip_of_previous_job,state_of_previous_job,country_of_previous_job,
        designation_of_previous_job,date_format(doj_of_previous_job, '%d/%m/%Y') as doj_of_previous_job,salary_of_previous_job,basic_of_previous_job,
        allowances_of_previous_job,other_benefits_of_previous_job,bond_details_of_previous_job,
        category_name,
        religion
        from employee a
        LEFT JOIN department_master b on a.department_id = b.department_id 
        LEFT JOIN designation_master c on a.designation_id = c.designation_id
        LEFT JOIN subject_master d on a.subject_id = d.subject_id
        LEFT JOIN emp_type_master e on a.emp_type_id = e.emp_type_id
        LEFT JOIN employee_qualification f on a.emp_id = f.emp_id
        LEFT JOIN previous_job g on a.emp_id=g.emp_id
        LEFT JOIN employee_children h on a.emp_id=h.emp_id   
        LEFT JOIN category_master i on a.category_id=i.category_id
        LEFT JOIN religion_master j on a.religion_id=j.religion_id
        where a.is_active='Y' 
        ${condition} 
        order by first_name, middle_name, last_name desc`
   
    connection.query(qry,function(err,result)     {
            
      if(err){
        console.log("Error reading Satff : %s ",err );
        data.status = 'e';

      }else{
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.browseStaffs = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Staff */

router.get('/read_staff/:emp_type_id/:department_id/:designation_id/:level_id', function(req, res, next) {

  var emp_type_id = req.params.emp_type_id;
  var department_id = req.params.department_id;
  var designation_id = req.params.designation_id;
  var level_id = req.params.level_id;
 // var session_id = req.cookies.session_id

     var emp_type_condition = "";
     var department_condition = "";
     var designation_condition = "";
     var level_condition = "";
      if(emp_type_id != -1 || emp_type_id !=-2) emp_type_condition =  ` and a.emp_type_id = ${emp_type_id}`;
      if(designation_id != -1 || designation_id != -2) designation_condition = `and a.designation_id = ${designation_id}`;
      if(level_id != -1 || level_id !=-2) level_condition =` and a.level_id = ${level_id}`;
      if(department_id != -1 || department_id !=-2) department_condition = `and a.department_id =${department_id}`;

  req.getConnection(function(err,connection){
       
    var data = {}
      var qry =` select  a.status, a.emp_id, employee_id, first_name, middle_name, last_name,
         office_phone, mobile, email,
        a.department_id, b.department_name, is_active,
        a.designation_id, c.designation,employment_status
        from employee a
        LEFT JOIN department_master b on a.department_id = b.department_id 
        LEFT JOIN designation_master c on a.designation_id = c.designation_id
        LEFT JOIN emp_type_master e on a.emp_type_id = e.emp_type_id
        LEFT JOIN employment_status_master f on a.employment_status_id = f.employment_status_id
      
         ${emp_type_condition} ${department_condition} ${designation_condition} ${level_condition}
        order by first_name, middle_name, last_name`;
   
    connection.query(qry,function(err,result)     {
            
      if(err){
        console.log("Error reading Satff : %s ",err );
        data.status = 'e';

      }else{
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.staffs = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

// read Temp Staff

/* Read Staff */

router.get('/read_temp_staff/:emp_type_id', function(req, res, next) {

  var emp_type_id = req.params.emp_type_id;

     var emp_type_condition = "";
      if(emp_type_id != -1) emp_type_condition =  ` where a.emp_type_id = ${emp_type_id}`;
     /* if(designation_id != -1 || designation_id != -2) designation_condition = `and a.designation_id = ${designation_id}`;
      if(level_id != -1 || level_id !=-2) level_condition =` and a.level_id = ${level_id}`;
      if(department_id != -1 || department_id !=-2) department_condition = `and a.department_id =${department_id}`;*/

  req.getConnection(function(err,connection){
       
    var data = {}
      var qry =` select  a.emp_id, employee_id, first_name, middle_name, last_name, 
        office_phone, mobile, email,b.department_name,
        a.designation_id, c.designation
        from employee_temp a
        LEFT JOIN department_master b on a.department_id = b.department_id 
        LEFT JOIN designation_master c on a.designation_id = c.designation_id
        LEFT JOIN emp_type_master e on a.emp_type_id = e.emp_type_id
         ${emp_type_condition}
        order by first_name, middle_name, last_name`;
   
    connection.query(qry,function(err,result)     {
            
      if(err){
        console.log("Error reading Satff : %s ",err );
        data.status = 'e';

      }else{
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.staffs = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read staff Details */

router.get('/read_for_edit_staff/:emp_id', function(req, res, next) {

  var emp_id = req.params.emp_id;
 // var session_id = req.cookies.session_id

  req.getConnection(function(err,connection){
       
    var data = {}
    var workExperienceArray=''
   
    var qry =` select a.employee_id, a.emp_id,title,first_name, middle_name, last_name, short_name,gender,marital_status,father_name,father_occupation,spouse,spouse_occupation,
        date_format(anniversary, '%d/%m/%Y') as anniversary,id_mark,blood_group,qualification,a.emp_type_id,e.emp_type,a.category_id,  
        a.department_id, b.department_name, a.subject_id, d.subject_name,  
        a.designation_id, designation, a.level_id,a.employment_status_id,c.designation,date_format(dob, '%d/%m/%Y') as dob,date_format(doj, '%d/%m/%Y') as doj,
        add_l1,add_l2,city,zip,state,country,same_as_p_add,c_add_l1,c_add_l2,c_city,c_zip,c_state,c_country, 
        place_of_birth, nationality, religion_id, language, category_name,
        residence_phone,office_phone,mobile,email,level,
        child1_first_name,child1_last_name,child1_sex,date_format(child1_dob, '%d/%m/%Y') as child1_dob,child1_school,
        child2_first_name,child2_last_name,child2_sex,date_format(child2_dob, '%d/%m/%Y') as child2_dob,child2_school,
        child3_first_name,child3_last_name,child3_sex,date_format(child3_dob, '%d/%m/%Y') as child3_dob,child3_school,
        x_subject , x_institution, x_board, x_yop, x_marks, x_div,
        xii_subject, xii_institution, xii_board, xii_yop, xii_marks, xii_div,
        ug_course, ug_institution, ug_university, ug_yop, ug_marks, ug_div,
        pg_course, pg_institution, pg_university, pg_yop, pg_marks, pg_div,
        bed_stream, bed_institution, bed_university, bed_yop, bed_marks, bed_div,
        bt_stream, bt_institution, bt_university, bt_yop, bt_marks, bt_div,
        bped_stream, bped_institution, bped_university, bped_yop, bped_marks,bped_div ,
        dped_stream, dped_institution, dped_university, dped_yop, dped_marks, dped_div,
        mped_stream, mped_institution, mped_university, mped_yop, mped_marks, mped_div,
        med_stream, med_institution, med_university, med_yop, med_marks, med_div,
        mphil_stream, mphil_institution, mphil_university, mphil_yop, mphil_marks, mphil_div,
        phd_stream, phd_institution, phd_university, phd_yop, phd_marks, phd_div,
        other_stream, other_institution, other_university, other_yop, other_marks, other_div,
        details_scholarship, details_awards, details_honours, details_publication ,details_curricular_activities, details_sport,
        organization_of_previous_job,add_l1_of_previous_job,add_l2_of_previous_job,
        city_of_previous_job,zip_of_previous_job,state_of_previous_job,country_of_previous_job,
        designation_of_previous_job,date_format(doj_of_previous_job, '%d/%m/%Y') as doj_of_previous_job,salary_of_previous_job,basic_of_previous_job,
        allowances_of_previous_job,other_benefits_of_previous_job,bond_details_of_previous_job
        from employee a
        LEFT JOIN department_master b on a.department_id = b.department_id 
        LEFT JOIN category_master k on a.category_id = k.category_id 
        LEFT JOIN level_master l on a.level_id = l.level_id 
        LEFT JOIN designation_master c on a.designation_id = c.designation_id
        LEFT JOIN subject_master d on a.subject_id = d.subject_id
        LEFT JOIN emp_type_master e on a.emp_type_id = e.emp_type_id
        LEFT JOIN employee_qualification f on a.emp_id = f.emp_id
        LEFT JOIN previous_job g on a.emp_id=g.emp_id
        LEFT JOIN employee_children h on a.emp_id=h.emp_id    
        where a.is_active='Y'            
        and a.emp_id=${emp_id}
        order by 3`;

      var query_one = `select institution,date_format(date_of_joining, '%d/%m/%Y') as  date_of_joining,
            date_format(date_of_leaving, '%d/%m/%Y') as  date_of_leaving, position, subjects_taught
            from work_experience
            where emp_id=${emp_id}`;  

        connection.query(query_one, function (error, result1) {
          if (error) {
             data.status = 'e';
          }

    
    
      connection.query(qry,function(err,result) {
            
      if(err){
        console.log("Error reading Staff Details : %s ",err );
        data.status = 'e';

      }

        data.status = 's';
        data.staff_details = result;
        data.workExperienceArray = result1;
        res.send(JSON.stringify(data))
    
   });

    
   })
 
  })

});


/* Read for temp staff Details */

router.get('/read_for_edit_temp_staff/:emp_id', function(req, res, next) {

  var emp_id = req.params.emp_id;
 // var session_id = req.cookies.session_id

  req.getConnection(function(err,connection){
       
    var data = {}
    var qry =` select a.employee_id, a.emp_id,title,first_name, middle_name, last_name, short_name,
        gender,marital_status,father_name,father_occupation,spouse,spouse_occupation,
        date_format(anniversary, '%d/%m/%Y') as anniversary,id_mark,blood_group,qualification,a.emp_type_id,
        e.emp_type,a.category_id,  category_name, level,
        a.department_id, b.department_name, a.subject_id, d.subject_name,  
        a.designation_id,c.designation,date_format(dob, '%d/%m/%Y') as dob,date_format(doj, '%d/%m/%Y') as doj,
        add_l1,add_l2,city,zip,state,country,same_as_p_add,c_add_l1,c_add_l2,c_city,c_zip,c_state,c_country, 
        place_of_birth, nationality, religion_id, language,
        residence_phone,office_phone,mobile,email,
        child1_first_name,child1_last_name,child1_sex,date_format(child1_dob, '%d/%m/%Y') as child1_dob,child1_school,
        child2_first_name,child2_last_name,child2_sex,date_format(child2_dob, '%d/%m/%Y') as child2_dob,child2_school,
        child3_first_name,child3_last_name,child3_sex,date_format(child3_dob, '%d/%m/%Y') as child3_dob,child3_school,
        x_subject , x_institution, x_board, x_yop, x_marks, x_div,
        xii_subject, xii_institution, xii_board, xii_yop, xii_marks, xii_div,
        ug_course, ug_institution, ug_university, ug_yop, ug_marks, ug_div,
        pg_course, pg_institution, pg_university, pg_yop, pg_marks, pg_div,
        bed_stream, bed_institution, bed_university, bed_yop, bed_marks, bed_div,
        bt_stream, bt_institution, bt_university, bt_yop, bt_marks, bt_div,
        bped_stream, bped_institution, bped_university, bped_yop, bped_marks,bped_div ,
        dped_stream, dped_institution, dped_university, dped_yop, dped_marks, dped_div,
        mped_stream, mped_institution, mped_university, mped_yop, mped_marks, mped_div,
        med_stream, med_institution, med_university, med_yop, med_marks, med_div,
        mphil_stream, mphil_institution, mphil_university, mphil_yop, mphil_marks, mphil_div,
        phd_stream, phd_institution, phd_university, phd_yop, phd_marks, phd_div,
        other_stream, other_institution, other_university, other_yop, other_marks, other_div,
        details_scholarship, details_awards, details_honours, details_publication ,details_curricular_activities, details_sport,
        organization_of_previous_job,add_l1_of_previous_job,add_l2_of_previous_job,
        city_of_previous_job,zip_of_previous_job,state_of_previous_job,country_of_previous_job,
        designation_of_previous_job,date_format(doj_of_previous_job, '%d/%m/%Y') as doj_of_previous_job,salary_of_previous_job,basic_of_previous_job,
        allowances_of_previous_job,other_benefits_of_previous_job,bond_details_of_previous_job
        from employee_temp a
        LEFT JOIN department_master b on a.department_id = b.department_id 
        LEFT JOIN category_master k on a.category_id = k.category_id 
        LEFT JOIN designation_master c on a.designation_id = c.designation_id
        LEFT JOIN subject_master d on a.subject_id = d.subject_id
        LEFT JOIN emp_type_master e on a.emp_type_id = e.emp_type_id
        LEFT JOIN employee_temp_qualification f on a.emp_id = f.emp_id
        LEFT JOIN employee_temp_previous_job g on a.emp_id=g.emp_id
        LEFT JOIN employee_temp_children h on a.emp_id=h.emp_id              
        and a.emp_id=${emp_id}
        order by 3`;


      var query_one = `select institution,date_format(date_of_joining, '%d/%m/%Y') as  date_of_joining,
            date_format(date_of_leaving, '%d/%m/%Y') as  date_of_leaving, position, subjects_taught
            from work_experience
            where emp_id=${emp_id}`;  

        connection.query(query_one, function (error, result1){
          if (error) {
             data.status = 'e';
          }   
    
       connection.query(qry,function(err,result)     {
            
        if(err){
          console.log("Error reading work experience details : %s ",err );
          data.status = 'e';
        }

      data.status = 's';
      data.staff_details = result;
      data.workExperienceArray = result1;
      res.send(JSON.stringify(data))
     });
    })     
  });
});

/* Add staff. */
router.post('/add_staff', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  var data = {} 

      var values_staffs = input.staff
      values_staffs.creation_date=formatted;
      //values_staffs.current_session_id=req.cookies.session_id;
      values_staffs.modified_by=req.cookies.user;
      var user=req.cookies.user;

    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        connection.query('INSERT INTO employee set ?', values_staffs, function (error, rows) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          var log = rows.insertId;

        var qry =`update employee set password=md5(12345)
          where emp_id=${log}`;
          connection.query(qry,function(err,result){
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
        

        var values_family = input.family;
        values_family.creation_date=formatted;
        values_family.emp_id=log;
        values_family.modification_date=formatted;
        values_family.modified_by=req.cookies.user;

        connection.query("INSERT INTO employee_children set ? ", values_family, function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });

        var values_previous_job = input.previous_job;
        values_previous_job.creation_date=formatted;
        values_previous_job.emp_id=log;
        values_previous_job.modification_date=formatted;
        values_previous_job.modified_by=req.cookies.user;

        connection.query("INSERT INTO previous_job set ? ", values_previous_job, function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });

        console.log("inser into work experience")

        // work Experience 
          var workExperienceValues =[];
          var workExperienceArray = input.workExperienceArray
          for(var i=0; i<workExperienceArray.length; i++){
             var obj= []
              obj.push(log)
              obj.push(workExperienceArray[i].institution)
              obj.push(workExperienceArray[i].date_of_joining)
              obj.push(workExperienceArray[i].date_of_leaving)
              obj.push(workExperienceArray[i].position)
              obj.push(workExperienceArray[i].subjects_taught)
              obj.push(formatted)
              obj.push(formatted)
              obj.push(req.cookies.user)
              workExperienceValues.push(obj)
          }

        console.log("VALUES")
        console.log(workExperienceValues)


        var sql =`insert into work_experience(emp_id,institution,date_of_joining, date_of_leaving, 
        position,subjects_taught,creation_date,modification_date,modified_by) VALUES ?`;
         console.log(sql)
        connection.query(sql,[workExperienceValues], function(err, result) 
        {
          if(err){
           return connection.rollback(function() {
                throw error;
              });

          }
        });

         //**********insert into Parent Data  ***************************
          var values_qualification = input.qualification;
          values_qualification.emp_id=log;
          values_qualification.creation_date=formatted;
          values_qualification.modified_by=req.cookies.user;

          connection.query("INSERT INTO employee_qualification set ? ", values_qualification, function(error, rows)
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
                data.staff_id=log
                console.log('success!');
                console.log(data);
                res.send(JSON.stringify(data))

              });
            });
          })
        });//end of ection con
      });
    });
  });

/* Update Staff. */
router.post('/edit_staff/:emp_id/:editType', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  var emp_id = req.params.emp_id;

  console.log("emp_id")
  console.log(emp_id)
  var editType=req.params.editType
  var data = {} 

      var values_staffs = input.staff
      values_staffs.creation_date=formatted;
      values_staffs.modified_by=req.cookies.user;

      if(editType=='tempEditProfile'){
            req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {

        if (err) { throw err; }
            connection.query('delete from employee_temp WHERE emp_id = ?', [emp_id], function (error, rows) {
              if (error) {
                return connection.rollback(function() {
                  throw error;
                });
              }

        if (err) { throw err; }
        connection.query('INSERT INTO employee_temp set ?', values_staffs, function (error, rows) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
        //  var log = rows.insertId;

      

        var values_family = input.family;
        values_family.creation_date=formatted;
        values_family.emp_id=emp_id;
        values_family.modification_date=formatted;
        values_family.modified_by=req.cookies.user;

        connection.query("INSERT INTO employee_temp_children set ? ", values_family, function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });

        var values_previous_job = input.previous_job;
        values_previous_job.creation_date=formatted;
        values_previous_job.emp_id=emp_id;
        values_previous_job.modification_date=formatted;
        values_previous_job.modified_by=req.cookies.user;

        connection.query("INSERT INTO employee_temp_previous_job set ? ", values_previous_job, function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });


        console.log("inser into work experience")

        // work Experience 
        
          var workExperienceValues =[];
          var workExperienceArray = input.workExperienceArray
          for(var i=0; i<workExperienceArray.length; i++){
             var obj= []
              obj.push(emp_id)
              obj.push(workExperienceArray[i].institution)
              obj.push(workExperienceArray[i].date_of_joining)
              obj.push(workExperienceArray[i].date_of_leaving)
              obj.push(workExperienceArray[i].position)
              obj.push(workExperienceArray[i].subjects_taught)
              obj.push(formatted)
              obj.push(formatted)
              obj.push(req.cookies.user)
              workExperienceValues.push(obj)
          }

        console.log("VALUES")
        console.log(workExperienceValues)


        var sql = "insert into employee_temp_work_experience(emp_id,institution,date_of_joining, date_of_leaving, position,subjects_taught,creation_date,modification_date,modified_by) VALUES ?";
        connection.query(sql,[workExperienceValues], function(err, result) 
        {
           console.log(sql)
          if(err){
           return connection.rollback(function() {
                throw error;
              });

          }
        });


         //**********insert into Parent Data  ***************************
          var values_qualification = input.qualification;
          values_qualification.emp_id=emp_id;
          values_qualification.creation_date=formatted;
          //values_qualification.current_session_id=req.cookies.session_id;
          values_qualification.modified_by=req.cookies.user;

          connection.query("INSERT INTO employee_temp_qualification set ? ", values_qualification, function(error, rows)
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
                data.staff_id=emp_id
                console.log('success!');
                console.log(data);
                res.send(JSON.stringify(data))

              });
            });
          //})//update password
        });//end of ection con
        })
      });
    });
  }else{

    console.log("inside else")

    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        connection.query('update employee set ? WHERE emp_id = ?', [values_staffs, emp_id], function (error, rows) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }

        var values_family = input.family;
        values_family.creation_date=formatted;
        //values_family.emp_id=log;
        values_family.modification_date=formatted;
        values_family.modified_by=req.cookies.user;

        connection.query("update employee_children set ? WHERE emp_id = ?", [values_family, emp_id],  function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });


           var values_previous_job = input.previous_job;
              values_previous_job.creation_date=formatted;
              values_previous_job.emp_id=emp_id;
              values_previous_job.modification_date=formatted;
              values_previous_job.modified_by=req.cookies.user;

        connection.query("update previous_job set ? WHERE emp_id = ?", [values_previous_job, emp_id], function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });


           var qr=`delete from work_experience WHERE emp_id=${emp_id}`;
            connection.query(qr, function (error, rows) {
              console.log(qr)
              if (error) {
                return connection.rollback(function() {
                  throw error;
                });
              }
              console.log("delete queery")

              //after delet, insert into work_experience

              // work Experience 
          var workExperienceValues =[];
         // console.log(input.workExperienceArray)
          var workExperienceArray = input.workExperienceArray
          workExperienceArray.emp_id=emp_id;
          console.log("heregjg")
          console.log(emp_id)
          for(var i=0; i<workExperienceArray.length; i++){
            var empID=emp_id
            console.log(empID)
            var institution=workExperienceArray[i].institution
            var date_of_joining=workExperienceArray[i].date_of_joining
            var date_of_leaving=workExperienceArray[i].date_of_leaving
            var position=workExperienceArray[i].position
            var subjects_taught=workExperienceArray[i].subjects_taught
            var creation_date=formatted;
            var modification_date=formatted;
            var modified_by=req.cookies.user;

             workExperienceValues.push([empID,institution,date_of_joining,date_of_leaving,position,subjects_taught,formatted,formatted,req.cookies.user])      
          }

            console.log("VALUES")
            console.log(workExperienceValues)


            var sql = "insert into work_experience(emp_id,institution,date_of_joining, date_of_leaving, position,subjects_taught,creation_date,modification_date,modified_by) VALUES ?";
            connection.query(sql,[workExperienceValues], function(err, result) 
            {
               console.log(sql)
              if(err){
               return connection.rollback(function() {
                    throw error;
                  });

              }
            });
        }) 

        //**********insert into Parent Data  ***************************
          var values_qualification = input.qualification;
         // values_qualification.emp_id=log;
          values_qualification.creation_date=formatted;
          //values_qualification.current_session_id=req.cookies.session_id;
          values_qualification.modified_by=req.cookies.user;

          connection.query("update employee_qualification set ? WHERE emp_id = ?", [values_qualification, emp_id], function(error, rows)
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
                data.staff_id=emp_id
                console.log('success!');
                console.log(data);
                res.send(JSON.stringify(data))

              });
          });

        });//end of ection con
      });
    });

  } //end of else

});



/* Update temp Staff into main staff table */
router.post('/edit_temp_staff/:emp_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  var emp_id = req.params.emp_id;
//  var editType=req.params.editType

  console.log("inside temp stff update")
  var data = {} 
  var values_staffs = input.staff
  values_staffs.creation_date=formatted;
  values_staffs.modified_by=req.cookies.user;

    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {


     //   if (err) { throw err; }
        connection.query('update employee set ? WHERE emp_id = ?', [values_staffs, emp_id], function (error, rows) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }

        console.log("1") 

        var values_family = input.family;
        values_family.creation_date=formatted;
        //values_family.emp_id=log;
        values_family.modification_date=formatted;
        values_family.modified_by=req.cookies.user;

        connection.query("update employee_children set ? WHERE emp_id = ?", [values_family, emp_id],  function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });
            console.log("2") 
        //update previous job

        var values_previous_job = input.previous_job;
       // values_previous_job.creation_date=formatted;
       // values_previous_job.emp_id=emp_id;
        values_previous_job.modification_date=formatted;
        values_previous_job.modified_by=req.cookies.user;

        connection.query("update previous_job set ? WHERE emp_id = ?", [values_previous_job, emp_id], function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });
          console.log("3") 

         //  if (err) { throw err; }
            connection.query('delete from work_experience WHERE emp_id = ?', [emp_id], function (error, rows) {
              if (error) {
                return connection.rollback(function() {
                  throw error;
                });
              }
             }) 


         console.log("inser into work experience")

        // work Experience 
          var workExperienceValues =[];
          var workExperienceArray = input.workExperienceArray
          for(var i=0; i<workExperienceArray.length; i++){
             var obj= []
              obj.push(emp_id)
              obj.push(workExperienceArray[i].institution)
              obj.push(workExperienceArray[i].date_of_joining)
              obj.push(workExperienceArray[i].date_of_leaving)
              obj.push(workExperienceArray[i].position)
              obj.push(workExperienceArray[i].subjects_taught)
              obj.push(formatted)
              obj.push(formatted)
              obj.push(req.cookies.user)
              workExperienceValues.push(obj)
          }
            console.log("VALUES")
            console.log(workExperienceValues)


        var sql = `insert into work_experience(emp_id,institution,date_of_joining,date_of_leaving, 
        position,subjects_taught,creation_date,modification_date,modified_by) VALUES ?`;
        connection.query(sql,[workExperienceValues], function(err, result) 
        {
           console.log(sql)
          if(err){
           return connection.rollback(function() {
                throw error;
              });

          }
        });

         //**********insert into Parent Data  ***************************
          var values_qualification = input.qualification;
         // values_qualification.emp_id=log;
          values_qualification.creation_date=formatted;
          //values_qualification.current_session_id=req.cookies.session_id;
          values_qualification.modified_by=req.cookies.user;

          connection.query("update employee_qualification set ? WHERE emp_id = ?", [values_qualification, emp_id], function(error, rows)
          {
              if (error) {
                return connection.rollback(function() {
                  throw error;
                });
              }
            if (err) { throw err; }
            connection.query('delete from employee_temp WHERE emp_id = ?', [emp_id], function (error, rows) {
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
                data.staff_id=emp_id
                console.log('success!');
                console.log(data);
                res.send(JSON.stringify(data))

              });
          });

        });//end of ection con
       })
      })
    });
});



//delete staff

router.get('/delete/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from employee WHERE emp_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting staff : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
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

// staff Image Upload
const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/'+req.params.folder_name);
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

router.post('/upload_staff_image/:folder_name/:image_name', upload.single('staff_profile_picture'), function(req, res, next) {
  console.log('inside uploading images');
  res.send('ok')
});


// update Employee Status

/* Edit Course listing. */
router.post('/update_staff_status', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
 // var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}
        var id= input.emp_id
        var values = {
            leaving_date    : input.leaving_date,
            leaving_remarks    : input.remark,
            is_active    : 'N',
        };
        
        var query = connection.query("UPDATE employee set ? WHERE emp_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error editing employee : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              data.id = rows.insertId;
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});


/* Edit allow_block_staff listing. */
/*router.post('/allow_block_staff', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
 // var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}
        var id= input.emp_id
        var values = {
            is_active    : input.is_active,
           
        };
        
        var query = connection.query("UPDATE employee set ? WHERE emp_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error editing employee : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              data.id = rows.insertId;
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});*/


router.post('/fast_edit_staff', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log(input);

  req.getConnection(function(err,connection){

        var today = new Date();
        var data = {}
        var sql = '';

        var columnName=input.fast_edit_value
        var editValue=input.editValues

        //var qry = `update section_master set active_section='${input.active_section}' where section_id=${input.section_id}`;

        editValue.map(c=>{
        if(sql == ''){
          sql = `update employee set ` + columnName + ` = '${c.value}'
                 where emp_id='${c.emp_id}' `;
        }else{
          sql = sql+';'+`update employee set  ` + columnName + ` ='${c.value}'
                where emp_id='${c.emp_id}'`;
        }
      }) 
        console.log(sql);
        
        connection.query(sql, function(err, rows)
        {
  
          if(err){
           console.log("Error updating fast edit : ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
           res.send(JSON.stringify(data))
        }else{
              data.status = 's';
              res.send(JSON.stringify(data))
        }
          
        });
   });

});

router.post('/allow_block_staff', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log(input);

  req.getConnection(function(err,connection){

        var today = new Date();
        var data = {}
        var sql = '';

        //var qry = `update section_master set active_section='${input.active_section}' where section_id=${input.section_id}`;

        input.map(c=>{
        if(sql == ''){
          sql = `update employee set is_active='${c.is_active}'
                 where emp_id='${c.emp_id}'`;
        }else{
          sql = sql+';'+`update employee set is_active='${c.is_active}'
                where emp_id='${c.emp_id}'`;
        }
      }) 
        console.log(sql);
        
        connection.query(sql, function(err, rows)
        {
  
          if(err){
           console.log("Error updating staff : ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
           res.send(JSON.stringify(data))
        }else{
              data.status = 's';
              res.send(JSON.stringify(data))
        }
          
        });
   });

});

/* Read Staff ID Card */

router.post('/read_staff_id_card/', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log(input);
  console.log("hiiii");

  req.getConnection(function(err,connection){

    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      var data = {}
      var obj = {};
      var new_emp_id = '';
        input.map(c=>{
          if(new_emp_id=='') {
            new_emp_id=c.emp_id
          }else{
            new_emp_id = new_emp_id+','+c.emp_id;
          } 
        })
        var qry =`select a.emp_id, employee_id, concat(first_name,' ',middle_name,' ',last_name)as staff_name,
                  blood_group, c_add_l1, c_add_l2, c_city, c_zip, c_state, c_country,
                  residence_phone, mobile, designation
                  from employee a
                  LEFT JOIN designation_master b on a.designation_id=b.designation_id
                  where a.emp_id in(${new_emp_id})
                  and a.is_active='Y' `;
        console.log(qry);

        var querySign = `select type from signature_image where is_active=1 limit 1`;
        var image_type = '';

        connection.query(querySign, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          image_type = result[0];           
          console.log(image_type);
          data.image_type = image_type;
          
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
              data.staff_id_card_details = result;
              res.send(JSON.stringify(data))

              });
          
            });

          });//end of ection con
        });
       
  });

});

/* Edit reset_staff_password listing. */
router.post('/reset_staff_password', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
 // var id = input.id;
   //var password=('12345')
  req.getConnection(function(err,connection){
        var data = {}
        var id= input.emp_id
       /* var values = {
            password    : input.password,
           
        };*/
        
        var query = connection.query("UPDATE employee set password=md5(123456) WHERE emp_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error editing employee : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              data.id = rows.insertId;
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});


// image upload end *******************************************************


module.exports = router;
