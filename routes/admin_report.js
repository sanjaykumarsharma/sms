var express = require('express');
var router = express.Router();
var multer = require('multer')
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");



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
        data.session_name=session_name
        data.browseStudents = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


/* Student Summary report */

router.get('/read_student_summary_report', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  var session_name = req.cookies.session_name
  
  req.getConnection(function(err,connection){
       
    var data = {}
      var qry =`SELECT a.standard_id, standard, b.section_id, 

            section, COUNT( d.student_id ) AS strength

                FROM section_master b

                JOIN standard_master a ON a.standard_id = b.standard_id

                LEFT JOIN student_current_standing c ON ( b.section_id = c.section_id

                AND c.session_id = ${session_id}) 

                LEFT JOIN student_master d ON ( c.student_id = d.student_id and d.current_session_id = ${session_id}

                AND (d.withdraw='N' || d.withdraw_session > ${session_id}) ) 

                GROUP BY b.section_id

                order by a.standard_id, b.section_id`;
    connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
            data.status='s'
            var stdData = Array();

            var prev_standard_id = "";        
            var grand_total = 0;
      for (var i = 0; i < result.length; i++) {
          console.log(result[i])
        var error = 0;

        if(prev_standard_id != result[i].standard_id){

         if(prev_standard_id == ""){
             var j=0
             var total=0
             var student = {}
            student["standard"] = result[i].standard
            student["s" + j] =result[i].strength
           
            total=result[i].strength
            prev_standard_id=result[i].standard_id

         }else{
           student["total"] = total
           stdData.push(student)        
           grand_total= Number(grand_total) + Number(total)
           j=0
           total=0
           student={}
           student["standard"] = result[i].standard
           student["s"+j] = result[i].strength
           total=result[i].strength
           prev_standard_id=result[i].standard_id       

         }

        }else{
            j++
            student["s"+j] = result[i].strength
            total=Number(total) + Number(result[i].strength)
            prev_standard_id=result[i].standard_id

         }

      }

      // for last row

      student["total"] = total
      grand_total=Number(grand_total) + Number(total)
      stdData.push(student)
      total ={}
      total["standard"]="Total"
      total["total"]=grand_total
      stdData.push(total)
      data.studentSummaryReports = stdData
      data.session_name = session_name
      data.status = 's'
      res.send(JSON.stringify(data))
      }
     
     });
       
  });

});


/*  csv export Student Summary Report*/
router.post('/csv_export_student_summary_report', function(req, res, next) {
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
        obj['Standard'] = result[i].standard;
        obj['A'] = result[i].s0;
        obj['B'] = result[i].s1;
        obj['C'] = result[i].s2;
        obj['D'] = result[i].s3;
        obj['E'] = result[i].s4;
        obj['N'] = result[i].s5;
        obj['Total'] = result[i].total;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Standard','A', 'B','C','D','E','N','Total'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/StudentSummaryReport.csv'; 
      data.url = '/csv/StudentSummaryReport.csv';

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

/* Student Category Summary report */

router.post('/read_student_category_summary_report', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  var session_name = req.cookies.session_name
    req.getConnection(function(err,connection){
    var data = []
//,category_name,standard,b.section_id,section,
      connection.beginTransaction(function(err) {
        if (err) { throw err; }

        var qry =`SELECT a.standard_id, standard, e.category_id,
                category_name,count(d.student_id) as strength 
                FROM section_master b
                JOIN standard_master a ON a.standard_id = b.standard_id
                JOIN student_current_standing c ON (b.section_id = c.section_id  and c.session_id =${req.cookies.session_id}) 
                LEFT JOIN student_master d on (c.student_id = d.student_id and d.current_session_id = ${req.cookies.session_id} AND (d.withdraw =  'N' || d.withdraw_session > ${session_id}))
                JOIN category_master e ON d.category_id = e.category_id 
                group by a.standard_id,e.category_id`;

        var qry_one = `select category_name from category_master`;

        var error = 1;
        var prev_standard_id="";
        var grand_total=0;
        var c_name= [];
        var total= [];

        connection.query(qry_one, function (error, result1) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          
          result1.map(c=>{
            total[c.category_name] = 0;
          })
           
          

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


            var stdData = [];
            for(var i = 0; i < result.length; i++){

              error = 0;
              if(prev_standard_id != result[i].standard_id){

                 if(prev_standard_id == ""){
                    var student = {};
                    student["standard"] = result[i].standard;
                    student[result[i].category_name] = result[i].strength;            
                    prev_standard_id=result[i].standard_id;

                    //counting total
                    total.map(c=>{
                      if(c.category_name == result[i].category_name){
                        total[result[i].category_name] = c + result[i].strength;
                      }
                    })

                 }else{

                     stdData.push(student);        
                     var student = {};
                     student["standard"] = result[i].standard;
                     student[result[i].category_name] = result[i].strength;  
                     prev_standard_id=result[i].standard_id;   

                     //counting total

                     total.map(c=>{
                      if(c.category_name == result[i].category_name){
                        total[result[i].category_name] = c + result[i].strength;
                      }
                     })  

                 }

              }else{  

                  student[result[i].category_name] = result[i].strength;  
                  prev_standard_id=result[i].standard_id;

                  //counting total

                   total.map(c=>{
                    if(c.category_name == result[i].category_name){
                      total[result[i].category_name] = c + result[i].strength;
                    }
                   }) 

              }
                
            }

            stdData.push(student);

      

            // for last row

           //  var student = {};

             //student["standard"] = "Total";
             total.map(c=>{
              $student[c.category_name] = c;
             })

             stdData.push(student);

                var r = {}
                r.status = 's';
                r.session_name = session_name;
                r.studentCategorySummaryReports = stdData 
                console.log(stdData);
                res.send(r)

              });
          
          });

        });//end of ection con
      });
    });

});

/*  csv export Student Category Summary Report*/
router.post('/csv_export_student_category_summary_report', function(req, res, next) {
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
        obj['Standard'] = result[i].standard;
        obj['General'] = result[i].General;
        obj['ST'] = result[i].ST;
        obj['SC'] = result[i].SC;
        obj['OBC'] = result[i].OBC;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Standard','General','ST','SC','OBC'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/StudentCategorySummaryReport.csv'; 
      data.url = '/csv/StudentCategorySummaryReport.csv';

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

 /* Student Religion Listing report */

router.post('/read_student_religion_listing_report', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  var session_name = req.cookies.session_name
    req.getConnection(function(err,connection){
    var data = []

      connection.beginTransaction(function(err) {
        if (err) { throw err; }

        var qry =`SELECT a.standard_id, e.religion_id,standard, religion,count(d.student_id) as strength 
                FROM section_master b
                JOIN standard_master a ON a.standard_id = b.standard_id
                LEFT JOIN student_current_standing c ON ( b.section_id = c.section_id  AND c.session_id = ${session_id} ) 
                LEFT JOIN student_master d ON ( c.student_id = d.student_id and d.current_session_id = ${session_id}  
                  and  (d.withdraw =  'N' || d.withdraw_session > ${session_id}))
                JOIN religion_master e ON d.religion_id = e.religion_id 
                group by a.standard_id,e.religion_id,standard, religion`;

        var qry_one = `select religion from religion_master`;

        var error = 1;
        var prev_standard_id="";
        var grand_total=0;
        var c_name= [];
        var total= [];

        connection.query(qry_one, function (error, result1) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          
          result1.map(c=>{
            total[c.religion] = 0;
          })
           
          

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


            var stdData = [];
            for(var i = 0; i < result.length; i++){

              error = 0;
              if(prev_standard_id != result[i].standard_id){

                 if(prev_standard_id == ""){
                    var student = {};
                    student["standard"] = result[i].standard;
                    student[result[i].religion] = result[i].strength;            
                    prev_standard_id=result[i].standard_id;

                    //counting total
                    total.map(c=>{
                      if(c.religion == result[i].religion){
                        total[result[i].religion] = c + result[i].strength;
                      }
                    })

                 }else{

                     stdData.push(student);        
                     var student = {};
                     student["standard"] = result[i].standard;
                     student[result[i].religion] = result[i].strength;  
                     prev_standard_id=result[i].standard_id;   

                     //counting total

                     total.map(c=>{
                      if(c.religion == result[i].religion){
                        total[result[i].religion] = c + result[i].strength;
                      }
                     })  

                 }

              }else{  

                  student[result[i].religion] = result[i].strength;  
                  prev_standard_id=result[i].standard_id;

                  //counting total

                   total.map(c=>{
                    if(c.religion == result[i].religion){
                      total[result[i].religion] = c + result[i].strength;
                    }
                   }) 

              }
                
            }

            stdData.push(student);

      

            // for last row

            // var student = {};

           //  student["standard"] = "Total";
             total.map(c=>{
              $student[c.religion] = c;
             })

             stdData.push(student);

                var r = {}
                r.status = 's';
                r.session_name = session_name;
                r.studentReligionListingReports = stdData 
                console.log(stdData);
                res.send(r)

              });
          
          });

        });//end of ection con
      });
    });

});

/*  csv export Student Religion Listing Report*/
router.post('/csv_export_student_religion_listing_report', function(req, res, next) {
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
        obj['Standard'] = result[i].standard;
        obj['Buddhism'] = result[i].Buddhism;
        obj['Christianity'] = result[i].Christianity;
        obj['Hinduism'] = result[i].Hinduism;
        obj['Jainism'] = result[i].Jainism;
        obj['Islam'] = result[i].Islam;
        obj['Sikhism'] = result[i].Sikhism;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Standard','Buddhism', 'Christianity','Hinduism','Jainism','Islam','Sikhism'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/StudentCategoryStrengthReport.csv'; 
      data.url = '/csv/StudentCategoryStrengthReport.csv';

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

/* Student Religion Listing report */

router.post('/read_student_blood_group_listing_report', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  var session_name = req.cookies.session_name
    req.getConnection(function(err,connection){
    var data = []

      connection.beginTransaction(function(err) {
        if (err) { throw err; }

        var qry =`SELECT a.standard_id, standard,
                blood_group, count(d.student_id) as strength 
                FROM section_master b
                JOIN standard_master a ON a.standard_id = b.standard_id
                LEFT JOIN student_current_standing c ON ( b.section_id = c.section_id  AND c.session_id = ${session_id} ) 
                LEFT JOIN student_master d ON ( c.student_id = d.student_id and d.current_session_id = ${session_id} 
                AND (d.withdraw='N' || d.withdraw_session > ${session_id})) 
                where blood_group !=''
                group by a.standard_id, blood_group`;

        var qry_one = `select blood_group
            from student_master a
            join student_current_standing b on (a.student_id=b.student_id and b.session_id =${session_id} )
            where blood_group !=''
            and a.current_session_id = ${session_id}
            group by blood_group
            order by blood_group`;

        var error = 1;
        var prev_standard_id="";
        var grand_total=0;
        var c_name= [];
        var total= [];

        connection.query(qry_one, function (error, result1) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          
          result1.map(c=>{
            total[c.blood_group] = 0;
          })
           
          

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


            var stdData = [];
            for(var i = 0; i < result.length; i++){

              error = 0;
              if(prev_standard_id != result[i].standard_id){

                 if(prev_standard_id == ""){
                    var student = {};
                    student["standard"] = result[i].standard;

                    console.log("blood_group")
                    console.log(student[result[i].blood_group])
                    student[result[i].blood_group] = result[i].strength;            
                    prev_standard_id=result[i].standard_id;

                    //counting total
                    total.map(c=>{
                      if(c.blood_group == result[i].blood_group){
                        total[result[i].blood_group] = c + result[i].strength;
                      }
                    })

                 }else{

                     stdData.push(student);        
                     var student = {};
                     student["standard"] = result[i].standard;
                     student[result[i].blood_group] = result[i].strength;  
                     prev_standard_id=result[i].standard_id;   

                     //counting total

                     total.map(c=>{
                      if(c.blood_group == result[i].blood_group){
                        total[result[i].blood_group] = c + result[i].strength;
                      }
                     })  

                 }



              }else{  

                  student[result[i].blood_group] = result[i].strength;  
                  prev_standard_id=result[i].standard_id;

                  //counting total

                   total.map(c=>{
                    if(c.blood_group == result[i].blood_group){
                      total[result[i].blood_group] = c + result[i].strength;
                    }
                   }) 

              }
                
            }

            stdData.push(student);

      

            // for last row

             var student = {};

              student["standard"] = "Total";
              total.map(c=>{
              $student[c.blood_group] = c;
             })

               stdData.push(student);

               

                var r = {}
                r.session_name = session_name;
                r.status = 's';
                r.studentBloodGroupListingReports = stdData 
               // console.log(stdData);
                res.send(r)

              });
          
          });

        });//end of ection con
      });
    });

});

/*  csv export Student Blood Group Report*/
router.post('/csv_export_student_blood_group_listing_report', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
       
    var data = {}
    var std = Array();
    var result = input.data;
    console.log(result)
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {
      result.map(c => {
        var obj = {};
        obj['Standard'] = c.standard;
        obj['A+'] = c['A+'];
        obj['A-'] = c['A-'];
        obj['AB+'] = c['AB+'];
        obj['AB-'] = c['AB-'];
        obj['B+'] = c['B+'];
        obj['B-'] = c['B-'];
        obj['O+'] = c['O+'];
        obj['O-'] = c['O-'];
        std.push(obj);
      });
      data.status = 's';
      const fields = ['Standard','A+','A-','AB+','AB-','B+','B-','O+','O-'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/StudentBloodGroupReport.csv'; 
      data.url = '/csv/StudentBloodGroupReport.csv';

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
 
 // read New Student List Report

router.get('/read_new_student_list_report', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  var session_name = req.cookies.session_name
  console.log(session_name)
 // var session_name = '2018-2019'
  var regNumber='';
    var str = session_name;
    var n = str.length
     if(n==9){
        var first_four = session_name.substr(0,4);
        var last_four = session_name.substr(5,9);
         regNumber=first_four.substr(2, 2)+'-'+ last_four.substr(2, 2);
     }else{
      regNumber=session_name.substr(2, 7);  
     }
  req.getConnection(function(err,connection){
       
    var data = {}
    
     var qry_one=`SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))` ;
      connection.query(qry_one,function(err,result){
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';
      }else{
              var qry =`SELECT enroll_number, concat(standard, ' ', section) as standard,reg_number, 
                concat(first_name, ' ', middle_name, ' ', last_name) as student_name,withdraw,
                category_name, date_format(dob,'%d/%m/%Y') as dob, blood_group, religion 
                FROM student_master a
                join student_current_standing b on (a.student_id = b.student_id and b.session_id = ${session_id} )
                join section_master c on b.section_id = c.section_id
                join standard_master d ON c.standard_id = d.standard_id 
                left join category_master e ON a.category_id = e.category_id
                left join religion_master f ON a.religion_id = f.religion_id 
                where  reg_number LIKE concat('%/', '${regNumber}' , '/%')
                group by b.section_id,student_name`;
          connection.query(qry,function(err,result)     {
         //console.log(qry)   
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
            data.status='s'
            var stdData = Array()
            var prev_standard=''        
            //var grand_total = 0;
      for (var i = 0; i < result.length; i++) {
           var error = 0;
        if(prev_standard != result[i].standard){
               console.log("jjist time")
               console.log(prev_standard)
         if(prev_standard==''){
               console.log("ist time")
               var student = {}
                student["student_name"] = "Class: " + result[i].standard
                stdData.push(student)
                var student ={}
                student["enroll_number"] = result[i].enroll_number
                student["student_name"] = result[i].student_name
                student["category_name"] = result[i].category_name
                student["dob"] = result[i].dob
                student["blood_group"] = result[i].blood_group
                student["religion"] = result[i].religion
                student["withdraw"] = result[i].withdraw
                student["reg_number"] = result[i].reg_number
                student["standard"] = result[i].standard
                prev_standard=result[i].standard

         }else{
             console.log("2nd time")
             stdData.push(student) 
             var student = {}
             student["student_name"] = "Class: " + result[i].standard
             stdData.push(student) 
             student["enroll_number"] =result[i].enroll_number
             student["student_name"] =result[i].student_name
             student["category_name"] =result[i].category_name
             student["dob"] =result[i].dob
             student["blood_group"] =result[i].blood_group
             student["religion"] =result[i].religion
             student["withdraw"] =result[i].withdraw
             student["reg_number"] =result[i].reg_number
             student["standard"] =result[i].standard            
             prev_standard=result[i].standard     
         }

        }else{
              console.log("equal")
              var student={}
             student["enroll_number"] = result[i].enroll_number
             student["student_name"] = result[i].student_name
             student["category_name"] = result[i].category_name
             student["dob"] = result[i].dob
             student["blood_group"] = result[i].blood_group
             student["religion"] = result[i].religion
             student["withdraw"] = result[i].withdraw
             student["reg_number"] = result[i].reg_number
             student["standard"] = result[i].standard
             stdData.push(student) 
             prev_standard=result[i].standard   

         }

      }

      // for last row
      console.log("last time")
      stdData.push(student)
      data.newStudentListReports = stdData
      res.send(JSON.stringify(data))

      }
     
       });
      }

    })


       
  });

});
/*  csv export New Student List Report*/
router.post('/csv_export_new_student_list_report', function(req, res, next) {
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
        obj['Enroll No'] = result[i].enroll_number;
        obj['Student Name'] = result[i].student_name;
        obj['Category Name'] = result[i].category_name;
        obj['DOB'] = result[i].dob;
        obj['Blood Group'] = result[i].blood_group;
        obj['Religion'] = result[i].religion;
        obj['Withdrawn'] = result[i].withdraw;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Enroll No','Student Name','Category Name','DOB','Blood Group','Religion','Withdrawn'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/NewStudentListReport.csv'; 
      data.url = '/csv/NewStudentListReport.csv';

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


// read New Student List Report


router.get('/read_new_student_category_report', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  var session_name = req.cookies.session_name
  console.log(session_name)
 // var session_name = '2018-2019'
  var regNumber='';
    var str = session_name;
    var n = str.length
     if(n==9){
        var first_four = session_name.substr(0,4);
        var last_four = session_name.substr(5,9);
         regNumber=first_four.substr(2, 2)+'-'+ last_four.substr(2, 2);
     }else{
      regNumber=session_name.substr(2, 7);  
     }
    req.getConnection(function(err,connection){
    var data = []

      connection.beginTransaction(function(err) {
        if (err) { throw err; }

        var qry =`SELECT a.standard_id, standard,
                category_name,count(d.student_id)as strength 
                FROM section_master b
                JOIN standard_master a ON a.standard_id = b.standard_id
                LEFT JOIN student_current_standing c ON ( b.section_id = c.section_id  AND c.session_id = " . $_SESSION['session_id'] . "  ) 
                LEFT JOIN student_master d ON ( c.student_id = d.student_id)
                JOIN category_master e ON d.category_id = e.category_id 
                where  reg_number LIKE concat('%/', '${regNumber}' , '/%')
                group by a.standard_id,e.category_id`;

        var qry_one = `select category_name from category_master`;

        var error = 1;
        var prev_standard_id="";
        var grand_total=0;
        var c_name= [];
        var total= [];

        connection.query(qry_one, function (error, result1) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          
          result1.map(c=>{
            total[c.category_name] = 0;
          })
           
          

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


            var stdData = [];
            for(var i = 0; i < result.length; i++){

              error = 0;
              if(prev_standard_id != result[i].standard_id){

                 if(prev_standard_id == ""){
                    var student = {};
                    student["standard"] = result[i].standard;
                    student[result[i].category_name] = result[i].strength;            
                    prev_standard_id=result[i].standard_id;

                    //counting total
                    total.map(c=>{
                      if(c.category_name == result[i].category_name){
                        total[result[i].category_name] = c + result[i].strength;
                      }
                    })

                 }else{

                     stdData.push(student);        
                     var student = {};
                     student["standard"] = result[i].standard;
                     student[result[i].category_name] = result[i].strength;  
                     prev_standard_id=result[i].standard_id;   

                     //counting total

                     total.map(c=>{
                      if(c.category_name == result[i].category_name){
                        total[result[i].category_name] = c + result[i].strength;
                      }
                     })  

                 }

              }else{  

                  student[result[i].category_name] = result[i].strength;  
                  prev_standard_id=result[i].standard_id;

                  //counting total

                   total.map(c=>{
                    if(c.category_name == result[i].category_name){
                      total[result[i].category_name] = c + result[i].strength;
                    }
                   }) 

              }
                
            }

            stdData.push(student);

      

            // for last row

             var student = {};

             student["standard"] = "Total";
             total.map(c=>{
              $student[c.category_name] = c;
             })

             stdData.push(student);

                var r = {}
                r.status = 's';
                r.session_name = session_name;
                r.newStudentCategoryReports = stdData 
                console.log(stdData);
                res.send(r)

              });
          
          });

        });//end of ection con
      });
    });

});


/* Student Category Strength report */

router.get('/read_student_category_strength_report/:category_id', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  var session_name = req.cookies.session_name
  var category_id=req.params.category_id
  req.getConnection(function(err,connection){
       
    var data = {}
      var qry =`SELECT concat(first_name,' ',middle_name,' ',last_name) as name, a.enroll_number, mobile as sms, 

              concat(standard,' ',section) as standard,category_name

              FROM  student_master a

              join student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${session_id})

              join section_master c on b.section_id = c.section_id

              JOIN standard_master d on  c.standard_id = d.standard_id

              JOIN category_master e ON a.category_id = e.category_id

              where e.category_id=${category_id} 

              and b.session_id = ${session_id}

              and (a.withdraw =  'N' || a.withdraw_session > ${session_id})

              order by c.standard_id,c.section_id, name`;
          connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
            data.status='s'
            data.session_name=session_name
            data.studentCategoryStrengthReports = result
             res.send(JSON.stringify(data))

      }
     
     });
       
  });

});

/*  csv export Student Category Strength Report*/
router.post('/csv_export_student_category_strength_report', function(req, res, next) {
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
        obj['Enroll'] = result[i].enroll_number;
        obj['Name'] = result[i].name;
        obj['Class'] = result[i].standard;
        obj['Sms'] = result[i].sms;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Enroll','Name', 'Class','Sms'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/StudentCategoryStrengthReport.csv'; 
      data.url = '/csv/StudentCategoryStrengthReport.csv';

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


//read Session From Session AMster

router.get('/read_session', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function(err,connection){
       
    var data = {}
      var qry =`SELECT session_id, session_name from session_master`;
          connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading session_name : %s ",err );
        data.status = 'e';

      }else{
            data.status='s'
            data.sessions = result
             res.send(JSON.stringify(data))
      }
     
     });
       
  });

});

//read UDISE  From Session AMster

router.get('/read_udise_report/:standard_id/:section_id/:session_id', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function(err,connection){
        
      var standard_id=req.params.standard_id
      var section_id=req.params.section_id
      var prev_session_id=req.params.session_id
      var session_id=req.cookies.session_id

    var data = {}
      var qry =`select aadhar_no, concat(first_name, ' ', middle_name, ' ', last_name) as student_name,
      f_name, m_name, date_format(dob,'%d/%m/%Y') as dob, gender,
    category_name, religion, mother_tongue, date_format(doa,'%d/%m/%Y') as doa,
    reg_number, concat(standard,' ',section)as standard, mobile, email, 
    percentage, attendance, previous_class
    from student_master a
    LEFT JOIN student_current_standing i on (a.student_id = i.student_id and a.current_session_id =  ${session_id})
    LEFT JOIN section_master g on i.section_id = g.section_id
    LEFT JOIN standard_master b on g.standard_id = b.standard_id 
    LEFT JOIN category_master e on a.category_id = e.category_id
    JOIN parent_master f on (a.student_id = f.student_id and f.current_session_id =  ${session_id})
    JOIN student_final_percentage z on (a.student_id = z.student_id and z.session_id =  ${session_id})
    LEFT JOIN religion_master h on a.religion_id = h.religion_id
    
    left join (select student_id, standard as previous_class 
               from student_current_standing x 
               join section_master y on (x.section_id = y.section_id and x.session_id = ${prev_session_id})
               join standard_master z on y.standard_id = z.standard_id) u
               on a.student_id = u.student_id

    where  i.session_id=${session_id}
    and (a.withdraw='N' || a.withdraw_session > ${session_id} ) 
    and i.section_id = ${section_id}
    order by a.first_name,a.middle_name,a.last_name`;
          connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading udise  : %s ",err );
        data.status = 'e';

      }else{
            data.status='s'
            data.udiseReports = result
             res.send(JSON.stringify(data))
      }
     
     });
       
  });

});


/* Student Group report */

router.get('/read_student_group_report/:standard_id/:section_id', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  var standard_id=req.params.standard_id
  var section_id=req.params.section_id
  req.getConnection(function(err,connection){
       
    var data = {}
    var condition = "";

  if(standard_id == -1 && section_id==-1)   condition = ``;

  if(standard_id != -1 && section_id==-1)   condition = ` and c.standard_id =${standard_id}`;

  if(standard_id != -1 && section_id!=-1)   condition = ` and c.standard_id=${standard_id} and d.section_id=${section_id}`;
     
      var qry =`select b.group_name, count(*) as total

      from student_current_standing a

      join student_group b on a.group_id=b.group_id

      join section_master d on  a.section_id = d.section_id

      join standard_master c on c.standard_id = d.standard_id

      join student_master e on (a.student_id = e.student_id and e.current_session_id =${session_id})

         where a.session_id=${session_id}
         ${condition}
         and (e.withdraw='N' || e.withdraw_session > ${session_id} )

         group by  group_name`;
          connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
            data.status='s'
            data.studentGroupReports = result
             res.send(JSON.stringify(data))

      }
     
     });
       
  });

});

/*  csv export Student Group Report*/
router.post('/csv_export_student_group_report', function(req, res, next) {
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
        obj['Student Group'] = result[i].group_name;
        obj['Strength'] = result[i].total;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Student Group','Strength'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/StudentGroupReport.csv'; 
      data.url = '/csv/StudentGroupReport.csv';

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


//student House Report

router.get('/read_student_house_report/:standard_id/:section_id', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  var session_name = req.cookies.session_name
  var standard_id=req.params.standard_id
  var section_id=req.params.section_id
  req.getConnection(function(err,connection){
       
    var data = {}
    var condition = "";

  if(standard_id == -1 && section_id==-1)   condition = ``;

  if(standard_id != -1 && section_id==-1)   condition = ` and d.standard_id =${standard_id}`;

  if(standard_id != -1 && section_id!=-1)   condition = ` and d.standard_id=${standard_id} and d.section_id=${section_id}`;
     
      var qry =`select b.house_name, count(*) as total

        from student_master s

        join student_current_standing a on (s.student_id=a.student_id and s.current_session_id=${session_id})

        left join house_master b on a.house_id=b.house_id

        join section_master d on a.section_id = d.section_id

        where a.session_id= ${session_id}
          ${condition}
        and (s.withdraw='N' || s.withdraw_session > ${session_id})
        and a.house_id > 0 and a.house_id is not null
        group by  house_name`;
          connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
            data.status='s'
            data.session_name=session_name
            data.studentHouseReports = result
             res.send(JSON.stringify(data))

      }
     
     });
       
  });

});

/*  csv export Student House Report*/
router.post('/csv_export_student_house_report', function(req, res, next) {
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
        obj['Student House'] = result[i].house_name;
        obj['Strength'] = result[i].total;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Student House','Strength'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/StudentHouseReport.csv'; 
      data.url = '/csv/StudentHouseReport.csv';

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


//student Class teacher Report

router.get('/read_class_teacher_report', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  var session_name = req.cookies.session_name
  req.getConnection(function(err,connection){
       
    var data = {}

      var qry =`select  standard, section, concat(first_name,' ',middle_name, ' ' ,last_name) as teacher_name
                from section_master  a
                LEFT JOIN class_teacher_section d on (a.section_id=d.section_id and d.session_id =${session_id})
                LEFT JOIN standard_master b on a.standard_id = b.standard_id
                LEFT JOIN employee c on d.class_teacher = c.emp_id
                order by b.standard_id, d.section_id`;
          connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
            data.session_name=session_name
            data.status='s'
            data.studentClassTeacherReports = result
             res.send(JSON.stringify(data))

      }
     
     });
       
  });

});

/*  csv export Student Class Teacher Report*/
router.post('/csv_export_student_class_teacher_report', function(req, res, next) {
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
        obj['Class'] = result[i].standard;
        obj['Section'] = result[i].section;
        obj['Teacher'] = result[i].teacher_name;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Class','Section','Teacher'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/StudentClassTeacherReport.csv'; 
      data.url = '/csv/StudentClassTeacherReport.csv';

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


/* Student Strength report */

router.get('/read_student_strength_report', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var session_id = req.cookies.session_id
  var session_name = req.cookies.session_name
  
  req.getConnection(function(err,connection){
       
    var data = {}
      var qry =`select d.standard_id,standard,count(b.student_id) as total

      from student_current_standing a

      join student_master b on (a.student_id = b.student_id and b.current_session_id = ${session_id})

      join section_master c on a.section_id = c.section_id

      join standard_master d on c.standard_id = d.standard_id

      where a.session_id= ${session_id}

      and (b.withdraw='N' || b.withdraw_session > ${session_id})

      group by d.standard_id, standard`;
    connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
            data.status='s'
            data.session_name=session_name
            data.studentStrengthReports = result;
       res.send(JSON.stringify(data))
      }
     
     });
       
  });

});

/*  csv export Student Strength Report*/
router.post('/csv_export_student_strength_report', function(req, res, next) {
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
        obj['Class'] = result[i].standard;
        obj['Total'] = result[i].total;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Class','Total'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/StudentStrengthReport.csv'; 
      data.url = '/csv/StudentStrengthReport.csv';

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

// read occupation 

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
       // data.session_name = session_name;
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
