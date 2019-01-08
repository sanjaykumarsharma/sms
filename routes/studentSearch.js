var express = require('express');
var router = express.Router();
var multer = require('multer')



/* Search Student */

router.post('/read_by_field', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var roll_no = input.roll_no;
  var student_name = input.student_name;
  var reg_number = input.reg_number;
  var father_name = input.f_name;
  var mother_name = input.m_name;
  var session_id = req.cookies.session_id
  console.log("hi");
  var roll_condition = "";
  var name_condition = "";
  var reg_condition = "";
  var father_condition = "";
  var mother_condition = "";
 
        
        if(student_name !=""){
          name_condition =`and concat(IFNULL(a.first_name,''), IFNULL(a.middle_name,''), IFNULL(a.last_name,'')) like concat('%', '${student_name}' , '%') ` ;
        }

        if(roll_no !=""){
          roll_condition = ` and a.enroll_number = ${roll_no}`;
        } 
        if(reg_number !=""){
          reg_condition = `and a.reg_number = ${reg_number} `;
        }

        if(father_name !=""){
          father_condition = `and f.f_name like concat('%', '${father_name}' , '%') `;
        }

        if(mother_name != ""){
          mother_condition = `and f.m_name like concat('%', '${mother_name}' , '%') `;
        }


  req.getConnection(function(err,connection){
       
    var data = {}
      var qry =` select a.student_id, b.standard_id, concat(b.standard,' ',g.section) as standard,withdraw,

        g.section_id,  c.group_id, c.group_name, d.house_id, d.house_name,  title, first_name,middle_name, last_name,

        enroll_number,roll_number, reg_number,gender, e.category_name, date_format(dob,'%d/%m/%Y') as dob,

        date_format(doa,'%d/%m/%Y') as doa, date_format(doj,'%d/%m/%Y') as doj,

        mother_tongue, last_school, last_class, admission_for_class, hobby, blood_group, nationality, cast, 

        h.religion_id, h.religion,

        c_add_l1, c_add_l2, c_city, c_zip, c_state, c_country,

        p_add_l1, p_add_l2, p_city, p_zip, p_state, p_country, is_permanent,

        mobile, residence_phone, fax, staff_child, staff_name, student_type, email,

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

        sibling_name, sibling_enroll_number

        from student_master a

        JOIN student_current_standing i on (a.student_id = i.student_id and  a.current_session_id =${session_id})

        LEFT JOIN section_master g on i.section_id = g.section_id

        LEFT JOIN standard_master b on g.standard_id = b.standard_id 

        LEFT JOIN student_group c on i.group_id = c.group_id

        LEFT JOIN house_master d on i.house_id = d.house_id

        LEFT JOIN category_master e on a.category_id = e.category_id

        JOIN parent_master f on (a.student_id = f.student_id and f.current_session_id =${session_id})

        LEFT JOIN religion_master h on a.religion_id = h.religion_id
        where  i.session_id=${session_id} 
        ${roll_condition} ${name_condition} ${reg_condition} ${father_condition} ${mother_condition}
        order by a.first_name, a.middle_name, a.last_name`;
    connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.searchStudents = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


/* Search Student */

router.post('/read_student_browser', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var standard_id = input.standard_id;
  var section_id = input.section_id;
  var session_id = req.cookies.session_id
  var session_name = req.cookies.session_name
  var condition = "";
  //var condition = "";
 
     //if($standard_id == -1 && $section_id==-1)   $condition = "";
      if(standard_id != -1 && section_id==-1)   condition = ` and g.standard_id =${standard_id}`;
      if(standard_id != -1 && section_id!=-1)   condition = ` and g.standard_id=${standard_id} and g.section_id=${section_id}`;

/* first_child_name, first_child_age, first_child_class, first_child_section, first_child_school,
      second_child_name, second_child_age, second_child_class, second_child_section, second_child_school,
      third_child_name, third_child_age, third_child_class, third_child_section, third_child_school,
      fourth_child_name, fourth_child_age, fourth_child_class, fourth_child_section, fourth_child_school,
      first_enrol, second_enrol, third_enrol, fourth_enrol*/
  req.getConnection(function(err,connection){
       
    var data = {}
      var qry =` select a.student_id, b.standard_id, g.section_id, concat(standard,' ',section)as standard, 
        c.group_id, c.group_name, d.house_id, 
        d.house_name,  title, first_name,middle_name, last_name,
        enroll_number,roll_number, reg_number,gender, e.category_name, date_format(dob,'%d/%m/%Y') as dob,
        date_format(old_doa,'%d/%m/%Y') as old_doa, date_format(old_doj,'%d/%m/%Y') as old_doj,
        date_format(doa,'%d/%m/%Y') as doa, date_format(doj,'%d/%m/%Y') as doj, dob as date_of_birth,
        mother_tongue, second_language, last_school, last_class, admission_for_class, hobby, blood_group, nationality, cast, 
        h.religion_id, h.religion,aadhar_no,
        c_add_l1, c_add_l2, c_city, c_zip, c_state, c_country,
        p_add_l1, p_add_l2, p_city, p_zip, p_state, p_country, is_permanent,
        mobile, residence_phone, fax, staff_child, staff_name, student_type, email,
        f_title, f_name, f_school_name, f_school_exam_passed, f_college_name, f_college_exam_passed, 
        f_occupation,is_caddress, f_add_l1, f_add_l2, f_city, f_zip, f_state, f_country, f_phone, f_mobile, f_fax, f_email, 
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
        sibling_name, sibling_enroll_number
        from student_master a
        LEFT JOIN student_current_standing i on (a.student_id = i.student_id and a.current_session_id =  ${session_id} )
        LEFT JOIN section_master g on i.section_id = g.section_id
        LEFT JOIN standard_master b on g.standard_id = b.standard_id 
        LEFT JOIN student_group c on i.group_id = c.group_id
        LEFT JOIN house_master d on i.house_id = d.house_id
        LEFT JOIN category_master e on a.category_id = e.category_id
        JOIN parent_master f on (a.student_id = f.student_id and f.current_session_id =  ${session_id} )
        LEFT JOIN religion_master h on a.religion_id = h.religion_id
        where  i.session_id=${session_id}
        and (a.withdraw='N' || a.withdraw_session > ${session_id})  
        ${condition}
        order by g.section_id, a.first_name,a.middle_name,a.last_name,a.enroll_number`;
    connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.session_name = session_name;
        data.browseStudents = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

//read Student Family Occupation
/* Search Student */

router.get('/read_occupation', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  
  req.getConnection(function(err,connection){
       
    var data = {}
      var qry =`select distinct occupation from

               (SELECT f_occupation as occupation FROM parent_master where current_session_id =${session_id}

               UNION

               SELECT  m_occupation as occupation FROM parent_master where current_session_id =${session_id}

                  group by m_occupation

               UNION

               SELECT g_occupation as occupation FROM parent_master where current_session_id =${session_id}) z

               order by z.occupation`;
    connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.session_name = session_name;
        data.parentOccupations = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


//read Occupation Report

router.get('/read_occupation_report/:occupation', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var occupation=req.params.occupation
  var session_id = req.cookies.session_id
  
  req.getConnection(function(err,connection){
       
    var data = {}
      var qry =`select enroll_number, first_name, middle_name, last_name,

         concat(standard,'-',section) as standard, f_name as name, f_mobile as mobile,

         f_email as email, 'Father' as relation,

         f_add_l1 as add_line1, f_add_l2 as add_line2, f_city as city, f_zip as zip, f_state as state, f_country as country

         from student_master a

         join parent_master b on (a.student_id = b.student_id and b.current_session_id = ${session_id})

         LEFT JOIN student_current_standing c on (a.student_id=c.student_id and a.current_session_id = ${session_id})

         LEFT JOIN section_master d on  c.section_id = d.section_id

         LEFT JOIN standard_master e on  d.standard_id = e.standard_id

         where f_occupation='${occupation}'

         and (a.withdraw='N' or a.withdraw_session > ${session_id}) and session_id = ${session_id}

      UNION

         select enroll_number, first_name, middle_name, last_name,

         concat(standard,'-',section) as standard, m_name as name, m_mobile as mobile,

         m_email as email, 'Mother' as relation,

         m_add_l1 as add_line1, m_add_l2 as add_line2, m_city as city, m_zip as zip, m_state as state, m_country as country

         from student_master a

         join parent_master b on (a.student_id = b.student_id  and b.current_session_id = ${session_id})

         LEFT JOIN student_current_standing c on (a.student_id=c.student_id and a.current_session_id = ${session_id})

         LEFT JOIN section_master d on  c.section_id = d.section_id

         LEFT JOIN standard_master e on  d.standard_id = e.standard_id

         where m_occupation='${occupation}'

         and (a.withdraw='N' or a.withdraw_session > ${session_id}) and session_id = ${session_id}

      UNION

         select enroll_number, first_name, middle_name, last_name,

         concat(standard,'-',section) as standard, g_name as name, g_mobile as mobile,

         g_email as email, 'Guardian' as relation,

         g_add_l1 as add_line1, g_add_l2 as add_line2, g_city as city, g_zip as zip, g_state as state, g_country as country

         from student_master a

         join parent_master b on (a.student_id = b.student_id  and b.current_session_id = ${session_id})

         LEFT JOIN student_current_standing c on (a.student_id=c.student_id and a.current_session_id = ${session_id})

         LEFT JOIN section_master d on  c.section_id = d.section_id

         LEFT JOIN standard_master e on  d.standard_id = e.standard_id

         where g_occupation='${occupation}'

         and g_relation !='Father' and  g_relation !='Mother' and g_relation !='' and g_relation is not null

         and (a.withdraw='N' or a.withdraw_session > ${session_id}) and session_id = ${session_id}   

         order by first_name`;
    connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading Occupation report : %s ",err );
        data.status = 'e';

      }else{
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.occupationReports = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


module.exports = router;
