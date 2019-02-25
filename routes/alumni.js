var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var download = require('download-file')


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
