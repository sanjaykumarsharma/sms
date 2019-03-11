var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");


/* Read Approved Alumni. */
router.get('/read_approved_alumni', function(req, res, next) {
  console.log("HERE")

  req.getConnection(function(err,connection){
       
    var data = {}
    var qry =`select a.alumni_id,first_name,middle_name,last_name,concat(first_name,' ',middle_name,' ',last_name) as name,enroll_no, batch_year,
              residence_addl1, residence_addl2, residence_city, residence_zip,  residence_state,  residence_country,
              a.mobile, a.fax,  a.email,  dob, assisting_org_alumni, assisting_student_career, assisting_executive_commitee, news,
              concat(residence_addl1,' ',residence_addl2,', ',residence_city,', ',residence_zip,', ',residence_state,', ',residence_country)as address,
              approved,date_format(approval_date,'%d/%m/%Y') as approval_date,fees,date_format(creation_date,'%d/%m/%Y') as creation_date,
              icse_school, icse_board, icse_city, icse_division, isc_school, isc_board, isc_city, isc_division, bachlor_school, bachlor_board, bachlor_city, bachlor_division, master_school, master_board, master_city, master_division, other_school, other_board, other_city, other_division,
              c_institute,c_course,c_location,c_year,c_degree,
              c.company_name,c.nature_of_job,c.designation,c.office_addl1,c.office_addl2,c.office_city,c.office_zip,c.office_state,c.office_country,c.mobile as office_mobile,c.otelephone,c.fax as office_fax,c.email as office_email,
              f1_name1,f1_batch_year,f1_stream,f1_contactno,f2_name2,f2_batch_year,f2_stream,f2_contactno,f3_name3,f3_batch_year,f3_stream,f3_contactno,
              relative_name,relative_relation,relative_class  
              from alumni_personal_details a
              JOIN alumni_educational_details b on a.alumni_id=b.alumni_id
              JOIN alumni_employment_details c on a.alumni_id=c.alumni_id    
              JOIN alumni_friend_details d on a.alumni_id=d.alumni_id
              JOIN alumni_relative e on a.alumni_id=e.alumni_id
              where approved='Y'
              order by approved,first_name,middle_name,last_name`;
    console.log(qry);
    connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading Approved Alumni : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.alumni = result;

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Alumni. */
router.get('/read_alumni', function(req, res, next) {
  console.log("HERE")

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select a.alumni_id,first_name,middle_name,last_name,concat(first_name,' ',middle_name,' ',last_name) as name,enroll_no, batch_year,
                residence_addl1, residence_addl2, residence_city, residence_zip,  residence_state,  residence_country,
                a.mobile, a.fax,  a.email,date_format(dob,'%d/%m/%Y') as  dob, assisting_org_alumni, assisting_student_career, assisting_executive_commitee, news,
                concat(residence_addl1,' ',residence_addl2,', ',residence_city,', ',residence_zip,', ',residence_state,', ',residence_country)as address,
                approved,date_format(approval_date,'%d/%m/%Y') as approval_date,fees,date_format(creation_date,'%d/%m/%Y') as creation_date,
                icse_school, icse_board, icse_city, icse_division, isc_school, isc_board, isc_city, isc_division, bachlor_school, bachlor_board, bachlor_city, bachlor_division, master_school, master_board, master_city, master_division, other_school, other_board, other_city, other_division,
                c_institute,c_course,c_location,c_year,c_degree,
                c.company_name,c.nature_of_job,c.designation,c.office_addl1,c.office_addl2,c.office_city,c.office_zip,c.office_state,c.office_country,c.mobile as office_mobile,c.otelephone,c.fax as office_fax,c.email as office_email,
                f1_name1,f1_batch_year,f1_stream,f1_contactno,f2_name2,f2_batch_year,f2_stream,f2_contactno,f3_name3,f3_batch_year,f3_stream,f3_contactno,
                relative_name,relative_relation,relative_class  
                from alumni_personal_details a
                JOIN alumni_educational_details b on a.alumni_id=b.alumni_id
                JOIN alumni_employment_details c on a.alumni_id=c.alumni_id    
                JOIN alumni_friend_details d on a.alumni_id=d.alumni_id
                JOIN alumni_relative e on a.alumni_id=e.alumni_id
                where approved='N'
                order by approved,first_name,middle_name,last_name`;
     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading Alumni : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.alumni = result;

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.post('/read_approved_alumni_csv', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var session_name = req.cookies.session_name
  req.getConnection(function(err,connection){

    var data = {}
    var std = Array();
    var result = input.data;
    console.log(result)
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {

      for(var i = 0; i < result.length; i++){
        var obj = {};
        obj['Name'] = result[i].name;
        obj['Email'] = result[i].email;
        obj['Address'] = result[i].address;
        obj['City'] = result[i].residence_city;
        obj['State'] = result[i].residence_state;
        obj['Country'] = result[i].residence_country;
        obj['Zip'] = result[i].residence_zip;
        obj['Batch Year'] = result[i].batch_year;
        obj['Mobile'] = result[i].mobile;
        obj['Fax'] = result[i].fax;
        obj['Approved'] = result[i].approved;
        obj['Approval Date'] = result[i].approval_date;
        obj['Fees'] = result[i].fees;
        obj['Submission Date'] = result[i].creation_date;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Name','Email','Address','City','State','Country','Zip','Batch Year','Mobile','Fax','Approved','Approval Date','Fees','Submission Date'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/Alumni.csv'; 
      data.url = '/csv/Alumni.csv';

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

router.post('/read_alumni_csv', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var session_name = req.cookies.session_name
  req.getConnection(function(err,connection){

    var data = {}
    var std = Array();
    var result = input.data;
    console.log(result)
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {

      for(var i = 0; i < result.length; i++){
        var obj = {};
        obj['Name'] = result[i].name;
        obj['Enroll No'] = result[i].enroll_no;
        obj['Email'] = result[i].email;
        obj['City'] = result[i].residence_city;
        obj['State'] = result[i].residence_state;
        obj['Country'] = result[i].residence_country;
        obj['Zip'] = result[i].residence_zip;
        obj['Batch Year'] = result[i].batch_year;
        obj['Mobile'] = result[i].mobile;
        obj['Approved'] = result[i].approved;
        obj['Fees'] = result[i].fees;
        obj['Submission Date'] = result[i].creation_date;
        obj['Icse School'] = result[i].icse_school;
        obj['Icse Board'] = result[i].icse_board;
        obj['Icse City'] = result[i].icse_city;
        obj['Icse Division'] = result[i].icse_division;
        obj['Isc School'] = result[i].isc_school;
        obj['Isc Board'] = result[i].isc_board;
        obj['Isc City'] = result[i].isc_city;
        obj['Isc Division'] = result[i].isc_division;
        obj['Bachlor School'] = result[i].bachlor_school;
        obj['Bachlor Board'] = result[i].bachlor_board;
        obj['Bachlor City'] = result[i].bachlor_city;
        obj['Bachlor Division'] = result[i].bachlor_division;
        obj['Master School'] = result[i].master_school;
        obj['Master Board'] = result[i].master_board;
        obj['Master City'] = result[i].master_city;
        obj['Master Division'] = result[i].master_division;
        obj['Other School'] = result[i].other_school;
        obj['Other Board'] = result[i].other_board;
        obj['Other City'] = result[i].other_city;
        obj['Other Division'] = result[i].other_division;
        obj['Current Institute'] = result[i].c_institute;
        obj['Current Course'] = result[i].c_course;
        obj['Current Year'] = result[i].c_year;
        obj['Current Degree'] = result[i].c_degree;
        obj['Office Name'] = result[i].company_name;
        obj['Nature of Job'] = result[i].nature_of_job;
        obj['Designation'] = result[i].designation;
        obj['Office Add Line1'] = result[i].office_addl1;
        obj['Office Add Line2'] = result[i].office_addl2;
        obj['Office City'] = result[i].office_city;
        obj['Office Zip'] = result[i].office_zip;
        obj['Office State'] = result[i].office_state;
        obj['Office Country'] = result[i].office_country;
        obj['Office Mobile'] = result[i].office_mobile;
        obj['Office Telephone'] = result[i].otelephone;
        obj['Office Email'] = result[i].office_email;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Name','Enroll No','Email','City','State','Country','Zip','Batch Year','Mobile','Approved','Fees','Submission Date','Icse School','Icse Board','Icse City','Icse Division','Isc School','Isc Board','Isc City','Isc Division','Bachlor School','Bachlor Board','Bachlor City','Bachlor Division','Master School','Master Board','Master City','Master Division','Other School','Other Board','Other City','Other Division','Current Institute','Current Course','Current Year','Current Degree','Office Name','Nature of Job','Designation','Office Add Line1','Office Add Line2','Office City','Office Zip','Office State','Office Country','Office Mobile','Office Telephone','Office Email'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/UnappovedAlumni.csv'; 
      data.url = '/csv/UnappovedAlumni.csv';

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

/* Approved Alumni */
router.post('/approved_alumni/:approval_date/:fees/:alumni_id', function(req, res, next) {

  var approval_date = req.params.approval_date;
  var fees = req.params.fees;
  var alumni_id = req.params.alumni_id;
  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  var data = {}

    req.getConnection(function(err,connection){
      qry =`update alumni_personal_details set approved='Y',
            approval_date="${approval_date}",fees=${fees} 
            where alumni_id = ${alumni_id}`;
      console.log(qry);
      connection.query(qry, function(error, rows)
      {
          
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
    });
  });

/* Read Student Details */

router.get('/read_for_edit_alumni/:alumni_id', function(req, res, next) {
  var alumni_id = req.params.alumni_id;

  req.getConnection(function(err,connection){
       
    var data = {}
    var qry =` select a.alumni_id,first_name,middle_name,last_name,concat(first_name,' ',middle_name,' ',last_name) as name,enroll_no, batch_year,
                residence_addl1,telephone,spouse, date_format(marriage_date,'%d/%m/%Y') as marriage_date,residence_addl2, residence_city, residence_zip,  residence_state,  residence_country,
                a.mobile, a.fax, a.email,date_format(dob,'%d/%m/%Y') as  dob, assisting_org_alumni, assisting_student_career, assisting_executive_commitee, news,
                concat(residence_addl1,' ',residence_addl2,', ',residence_city,', ',residence_zip,', ',residence_state,', ',residence_country)as address,
                approved,date_format(approval_date,'%d/%m/%Y') as approval_date,fees,date_format(creation_date,'%d/%m/%Y') as creation_date,
                icse_school, icse_board, icse_city, icse_division, isc_school, isc_board, isc_city, isc_division, bachlor_school, bachlor_board, bachlor_city, bachlor_division, master_school, master_board, master_city, master_division, other_school, other_board, other_city, other_division,
                c_institute,c_course,c_location,c_year,c_degree,
                c.company_name,c.nature_of_job,c.designation,c.office_addl1,c.office_addl2,c.office_city,c.office_zip,c.office_state,c.office_country,c.mobile as office_mobile,c.otelephone,c.fax as office_fax,c.email as office_email,
                f1_name1,f1_batch_year,f1_stream,f1_contactno,f2_name2,f2_batch_year,f2_stream,f2_contactno,f3_name3,f3_batch_year,f3_stream,f3_contactno,
                relative_name,relative_relation,relative_class  
                from alumni_personal_details a
                JOIN alumni_educational_details b on a.alumni_id=b.alumni_id
                JOIN alumni_employment_details c on a.alumni_id=c.alumni_id    
                JOIN alumni_friend_details d on a.alumni_id=d.alumni_id
                JOIN alumni_relative e on a.alumni_id=e.alumni_id
                where approved='N' and a.alumni_id = ${alumni_id}`;
    
    connection.query(qry,function(err,result){      
      if(err){
        console.log("Error reading Alumni Details : %s ",err );
        data.status = 'e';

      }else{
        data.status = 's';
        data.alumni_details = result;
        res.send(JSON.stringify(data))
      }
     
    });
  });
});

/* Edit Alumni. */
router.post('/edit_alumni/:alumni_id', function(req, res, next) {

  var alumni_id = req.params.alumni_id;
  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  var data = {} 
    var values_alumni_personal_details = input.alumni_personal_details
        values_alumni_personal_details.creation_date=formatted;

    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        connection.query('UPDATE alumni_personal_details set ? WHERE alumni_id = ? ', [values_alumni_personal_details, alumni_id], function (error, rows) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }

        // Update value educational details
        var values_alumni_educational_details = input.alumni_educational_details;

        connection.query("UPDATE alumni_educational_details set ? WHERE alumni_id = ? ", [values_alumni_educational_details, alumni_id], function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });

        // Update value relative_details
        var values_alumni_relative_details = input.alumni_relative_details;

        connection.query("UPDATE alumni_relative set ? WHERE alumni_id = ? ", [values_alumni_relative_details, alumni_id], function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });

        // Update value friend_details
        var values_alumni_friend_details = input.alumni_friend_details;

        connection.query("UPDATE alumni_friend_details set ? WHERE alumni_id = ? ", [values_alumni_friend_details, alumni_id], function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });

         //**********Update value emp_details ***************************
          var values_alumni_employment_details = input.alumni_employment_details;

          connection.query("UPDATE alumni_employment_details set ? WHERE alumni_id = ? ", [values_alumni_employment_details,alumni_id], function(error, rows)
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

  /*Delete Alumni*/

router.get('/delete_alumni/:alumni_id', function(req, res, next) {

  var alumni_id = req.params.alumni_id;
  req.getConnection(function(err,connection){
       
     var data = {}
     var qry =` delete from alumni_personal_details where alumni_id = ${alumni_id} `;
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error Deleting Alumni : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Alumni Profile */

router.get('/read_alumni_profile/:alumni_id', function(req, res, next) {

  var alumni_id = req.params.alumni_id;

  req.getConnection(function(err,connection){
       
     var data = {}

     var qry = `select a.alumni_id,concat(first_name,' ',middle_name,' ',last_name) as name,date_format(dob,'%d/%m/%Y') as  dob,enroll_no, batch_year,
                concat(residence_addl1,' ',residence_addl2,', ',residence_city,', ',residence_state,', ',residence_country,',',residence_zip)as address,
                a.mobile, a.fax,  a.email,telephone,spouse,date_format(marriage_date,'%d/%m/%Y') as marriage_date, assisting_org_alumni, assisting_student_career, assisting_executive_commitee, news,
                approved,date_format(approval_date,'%d/%m/%Y') as approval_date,fees,date_format(creation_date,'%d/%m/%Y') as creation_date,
                icse_school, icse_board, icse_city, icse_division, isc_school, isc_board, isc_city, isc_division, bachlor_school, bachlor_board, bachlor_city, bachlor_division, master_school, master_board, master_city, master_division, other_school, other_board, other_city, other_division,
                c_institute,c_course,c_location,c_year,c_degree,
                c.company_name,c.nature_of_job,c.designation,concat(c.office_addl1,' ',c.office_addl2,' ',c.office_city,' ',c.office_state,' ',c.office_country,' ',c.office_zip)as office_address,c.mobile as office_mobile,c.otelephone,c.fax as office_fax,c.email as office_email,
                f1_name1,f1_batch_year,f1_stream,f1_contactno,f2_name2,f2_batch_year,f2_stream,f2_contactno,f3_name3,f3_batch_year,f3_stream,f3_contactno,
                relative_name,relative_relation,relative_class  
                from alumni_personal_details a
                JOIN alumni_educational_details b on a.alumni_id=b.alumni_id
                JOIN alumni_employment_details c on a.alumni_id=c.alumni_id    
                JOIN alumni_friend_details d on a.alumni_id=d.alumni_id
                JOIN alumni_relative e on a.alumni_id=e.alumni_id
                where a.alumni_id= ${alumni_id}
                order by approved,first_name,middle_name,last_name`;

     connection.query(qry,function(err,result)     {
            
        if(err){
          console.log("Error reading Alumni Profile : %s ",err );
          data.status = 'e';

        }else{
          data.status = 's';
          data.alumni_profile_details = result;
          res.send(JSON.stringify(data))
        }
     });   
  });
});

module.exports = router;
