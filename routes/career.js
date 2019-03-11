var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");

//read career Interview

router.get('/read_career_interview/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;
  console.log(start_date)
  console.log("HERE")

  req.getConnection(function(err,connection){
    var data = {}

    var qry =`select b.career_id,interview_id,attendance,panel,feedback,post_applied_for,
              subject_tobe_taught, class_tobe_taught,
              concat(first_name,' ',middle_name,' ',last_name) as full_name,
              concat(f_first_name,'',f_middle_name,'',f_last_name) as father_name,
              date_format(date_of_birth, '%d/%m/%Y') as date_of_birth, age, sex,
              date_format(interview_date,'%d/%m/%Y')as interview_date,interview_time,marital_status
              from career_interview a 
              LEFT JOIN career_personal_details b on a.career_id = b.career_id
              where a.interview_date between '${start_date}' and '${end_date}'
              and attendance is null
              order by full_name `;
    console.log(qry);
    connection.query(qry,function(err,result){
            
      if(err){
        console.log("Error reading Session : %s ",err );
        data.status = 'e';

      }else{
        data.status = 's';
        data.career_interview = result;
        res.send(JSON.stringify(data))
      }
    });   
  });
});

/* read career Interview CSV */
router.get('/csv_export_career_interview/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;
  console.log(start_date)
  console.log("HERE")

  req.getConnection(function(err,connection){
    var data = {}

    var qry =`select b.career_id as 'Applicant No',interview_id,attendance,panel,
              feedback,post_applied_for as 'Post Applied',
              subject_tobe_taught as 'Subject Taught', class_tobe_taught as 'Class Taught',
              concat(first_name,' ',middle_name,' ',last_name) as 'Name',
              concat(f_first_name,'',f_middle_name,'',f_last_name) as father_name,
              date_format(date_of_birth, '%d/%m/%Y') as 'DOB', age, sex as 'Sex',interview_time as 'Interview Time',
              date_format(interview_date,'%d/%m/%Y')as 'Interview Date',marital_status as 'Marital Status'
              from career_interview a 
              LEFT JOIN career_personal_details b on a.career_id = b.career_id
              where a.interview_date between '${start_date}' and '${end_date}'
              and attendance is null
              order by Name `;
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {
      connection.query(qry,function(err,result)     {
            
        if(err){
          console.log("Error reading Activity Event : %s ",err );
          data.status = 'e';

        }else{
          const fields = ['Applicant No','Name','Post Applied','Subject Taught','Class Taught','DOB','Sex','Marital Status','Interview Date','Interview Time'];
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);
          var path='./public/csv/CareerInterview.csv'; 
          data.url = '/csv/CareerInterview.csv';

          fs.writeFile(path, csv, function(err,data) {
            if (err) {
              throw err;
            }else{ 
              callback() 
            }
          });
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
    });//end of async loop  

  });// get connection
});


/*updateInterview */

router.post('/update_interview/:interview_id', function(req, res, next) {

  var interview_id = req.params.interview_id;
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {} 
  var values_applicant = input.applicant

    req.getConnection(function(err,connection){

      var qry =`update career_interview set attendance ='${values_applicant.attendance}', 
                result ='${values_applicant.result}',
                panel ='${values_applicant.panel}',
                feedback ='${values_applicant.feedback}'
                where interview_id = ${interview_id} `;
      console.log(qry);
      var query = connection.query(qry, function(err, rows)
      {
        if(err){
          console.log("Error update feedback : %s ",err );
          data.status = 'e';
        }else{
          data.status = 's';
          res.send(JSON.stringify(data))
        }
      });
    });
});

/* Delete Candidate . */
router.get('/delete_candidate/:interview_id', function(req, res, next) {

  var interview_id = req.params.interview_id;

  req.getConnection(function(err,connection){
        var data = {}

        var qry =`delete from career_interview where interview_id = ${interview_id} `;

        connection.query(qry, function(err, rows)
        {
  
          if(err){
           console.log("Error deleting Candidate : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

//read Applicant Profile 

router.get('/read_applicant_profile/:career_id', function(req, res, next) {
  var career_id = req.params.career_id;
  
  console.log("HERE")

  req.getConnection(function(err,connection){
    var data = {}

    var qry =`select post_applied_for, subject_tobe_taught, class_tobe_taught,
              first_name, middle_name, last_name, f_first_name, f_middle_name, f_last_name,
              husband_first_name, husband_middle_name,  husband_last_name,
              date_format(date_of_birth, '%d/%m/%Y') as date_of_birth, age, sex, marital_status,
              address_line1, address_line2, city, zip, state, country,
              p_address_line1,  p_address_line2, p_city, p_zip, p_state, p_country,
              mobile, email, phone_office,phone_residence,
              bed_institution, bed_college, bed_year, bed_subject, bed_marks, bed_remarks,
              ttc_institution, ttc_college, ttc_year, ttc_subject,ttc_marks, ttc_remarks,
              pg_degree, pg_institution, pg_college, pg_year, pg_subject, pg_marks, pg_remarks,
              xii_institution, xii_college, xii_year, xii_subject, xii_marks, xii_remarks,
              x_institution, x_college, x_year, x_subject, x_marks, x_remarks,
              g_degree, g_institution, g_college, g_year, g_subject, g_marks, g_remarks,file_name,
              degree1, university1, marks1, year1, remarks1,
              degree2, university2, marks2, year2, remarks2,
              degree3, university3, marks3, year3, remarks3,
              school1, address1, designation1, class_taught1, subject_taught1, work_profile1, date_format(from_date1, '%d/%m/%Y') as from_date1,
              date_format(to_date1, '%d/%m/%Y') as to_date1, salary_drawn1,
              school2, address2, designation2, class_taught2, subject_taught2,work_profile2,
              date_format(from_date2, '%d/%m/%Y') as from_date2, date_format(to_date2, '%d/%m/%Y') as to_date2, salary_drawn2,
              school3, address3, designation3, class_taught3, subject_taught3,work_profile3,
              date_format(from_date3, '%d/%m/%Y') as from_date3, date_format(to_date3, '%d/%m/%Y') as to_date3, salary_drawn3,
              s_achievements, r_name, r_organisation, r_designation, r_phone, r_mobile, r_email, 
              r1_name, r1_organisation, r1_designation, r1_phone, r1_mobile, r1_email  
              from career_personal_details a
              LEFT JOIN career_qualification b on a.career_id = b.career_id
              LEFT JOIN career_other_qualification c on a.career_id = c.career_id
              LEFT JOIN career_work_experiencs d on a.career_id = d.career_id
              LEFT JOIN career_refrence e on a.career_id = e.career_id
              where a.career_id = ${career_id}
              order by a.career_id `;
    console.log(qry);
    connection.query(qry,function(err,result){
            
      if(err){
        console.log("Error reading Applicant Profile : %s ",err );
        data.status = 'e';

      }else{
        data.status = 's';
        data.applicant_profile_data = result;
        res.send(JSON.stringify(data))
      }
    });   
  });
});

//read Interviewed Candidate

router.get('/read_interviewed_candidate/:start_date/:end_date/:result', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;
  var result = req.params.result;
  console.log(start_date)
  console.log("HERE")

  req.getConnection(function(err,connection){
    var data = {}

    var qry =`select b.career_id,interview_id,attendance,panel,feedback,post_applied_for, 
              subject_tobe_taught, class_tobe_taught,
              concat(first_name,' ',middle_name,' ',last_name) as full_name,
              concat(f_first_name,'',f_middle_name,'',f_last_name) as father_name,
              date_format(date_of_birth, '%d/%m/%Y') as date_of_birth, age, sex,
              date_format(interview_date,'%d/%m/%Y')as interview_date,marital_status
              from career_interview a 
              LEFT JOIN career_personal_details b on a.career_id = b.career_id
              where a.interview_date between '${start_date}' and '${end_date}'
              and result='${result}'
              and attendance is not null
              order by full_name `;
    
    console.log(qry);
    connection.query(qry,function(err,result){
            
      if(err){
        console.log("Error reading Session : %s ",err );
        data.status = 'e';

      }else{
        data.status = 's';
        data.interviewed_candidate = result;
        res.send(JSON.stringify(data))
      }
    });   
  });
});

//read Interviewed Candidate CSV

router.get('/csv_export_interviewed_candidate/:start_date/:end_date/:result', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;
  var result = req.params.result;
  console.log(start_date)
  console.log("HERE")

  req.getConnection(function(err,connection){
    var data = {}

    var qry =`select b.career_id as 'Applicant No',interview_id,
              attendance as 'Attendance',panel as 'Panel',feedback as 'Feedback',
              post_applied_for as 'Post Applied', 
              subject_tobe_taught as 'Subject Taught', class_tobe_taught as 'Class Taught',
              concat(first_name,' ',middle_name,' ',last_name) as 'Name',
              concat(f_first_name,'',f_middle_name,'',f_last_name) as father_name,
              date_format(date_of_birth, '%d/%m/%Y') as 'DOB', age, sex as 'Sex',
              date_format(interview_date,'%d/%m/%Y')as 'Interview Date',
              marital_status as 'Marital Status'
              from career_interview a 
              LEFT JOIN career_personal_details b on a.career_id = b.career_id
              where a.interview_date between '${start_date}' and '${end_date}'
              and result='${result}'
              and attendance is not null
              order by Name `;
    
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {
      connection.query(qry,function(err,result)     {
            
        if(err){
          console.log("Error download IntervieweeList csv : %s ",err );
          data.status = 'e';

        }else{
          const fields = ['Applicant No','Name','Post Applied','Subject Taught','Attendance','Panel','Feedback','Class Taught','DOB','Sex','Marital Status','Interview Date'];
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);
          var path='./public/csv/IntervieweeList.csv'; 
          data.url = '/csv/IntervieweeList.csv';

          fs.writeFile(path, csv, function(err,data) {
            if (err) {
              throw err;
            }else{ 
              callback() 
            }
          });
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
    });//end of async loop  

  });// get connection
});

/*updateInterviewedCandidate */

router.post('/update_interviewed_candidate/:interview_id', function(req, res, next) {

  var interview_id = req.params.interview_id;
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {} 

    req.getConnection(function(err,connection){

      var qry =`update career_interview set attendance =null, result =null,
                panel =null, feedback =null
                where interview_id = ${interview_id} `;
      console.log(qry);
      var query = connection.query(qry, function(err, rows)
      {
        if(err){
          console.log("Error update Interviewed Candidate : %s ",err );
          data.status = 'e';
        }else{
          data.status = 's';
          res.send(JSON.stringify(data))
        }
      });
    });
});

//read Career Feedback Report

router.get('/read_career_feedback_report/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;
  console.log(start_date)
  console.log("HERE")

  req.getConnection(function(err,connection){
    var data = {}

    var qry =`select b.career_id,interview_id,attendance,result,panel,feedback,post_applied_for, 
              subject_tobe_taught, class_tobe_taught,
              concat(first_name,' ',middle_name,' ',last_name) as full_name,
              concat(f_first_name,'',f_middle_name,'',f_last_name) as father_name,
              date_format(date_of_birth, '%d/%m/%Y') as date_of_birth, age, sex,
              date_format(interview_date,'%d/%m/%Y')as interview_date,marital_status
              from career_interview a 
              LEFT JOIN career_personal_details b on a.career_id = b.career_id
              where a.interview_date between '${start_date}' and '${end_date}'
              and attendance is not null
              order by full_name `;
    
    console.log(qry);
    connection.query(qry,function(err,result){
            
      if(err){
        console.log("Error reading Session : %s ",err );
        data.status = 'e';

      }else{
        data.status = 's';
        data.career_feedback_report_data = result;
        res.send(JSON.stringify(data))
      }
    });   
  });
});

//read Career Feedback Report CSV

router.get('/csv_export_career_feedback_report/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;
  console.log(start_date)
  console.log("HERE")

  req.getConnection(function(err,connection){
    var data = {}

    var qry =`select b.career_id as 'Applicant No',interview_id,attendance as 'Attendance',
              result as 'Result',panel as 'Panel',feedback as 'Feedback',post_applied_for as 'Post Applied', 
              subject_tobe_taught as 'Subject Taught', class_tobe_taught as 'Class Taught',
              concat(first_name,' ',middle_name,' ',last_name) as 'Name',
              concat(f_first_name,'',f_middle_name,'',f_last_name) as father_name,
              date_format(date_of_birth, '%d/%m/%Y') as 'DOB', age, sex as 'Sex',
              date_format(interview_date,'%d/%m/%Y')as 'Interview Date',marital_status as 'Marital Status'
              from career_interview a 
              LEFT JOIN career_personal_details b on a.career_id = b.career_id
              where a.interview_date between '${start_date}' and '${end_date}'
              and attendance is not null
              order by Name `;

    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {
      connection.query(qry,function(err,result)     {
            
        if(err){
          console.log("Error reading Activity Event : %s ",err );
          data.status = 'e';

        }else{
          const fields = ['Applicant No','Name','Post Applied','Subject Taught','Attendance','Result','Panel','Feedback','Class Taught','DOB','Sex','Marital Status','Interview Date'];
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);
          var path='./public/csv/InterviewFeedback.csv'; 
          data.url = '/csv/InterviewFeedback.csv';

          fs.writeFile(path, csv, function(err,data) {
            if (err) {
              throw err;
            }else{ 
              callback() 
            }
          });
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
    });//end of async loop  

  });// get connection
});

//read Applicant Details

router.get('/read_applicant_detail/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;
  console.log(start_date)
  console.log("HERE")

  req.getConnection(function(err,connection){
    var data = {}

    var qry =`select a.career_id, post_applied_for, subject_tobe_taught, class_tobe_taught,
              concat(first_name,' ',middle_name,' ',last_name) as full_name,
              concat(f_first_name,' ',f_middle_name,' ',f_last_name) as father_name,
              concat(husband_first_name,' ',husband_middle_name,' ',husband_last_name) as husband_name,
              date_format(date_of_birth, '%d/%m/%Y') as date_of_birth, age, sex, marital_status,
              concat(address_line1, ', ', address_line2,', ', city, ', ',zip, ', ',state, ', ',country) as address,
              concat(p_address_line1, ', ', p_address_line2, ', ',p_city,', ',p_zip,', ',p_state,', ',p_country) as p_address,
              mobile, email, phone_office,phone_residence,
              bed_institution, bed_college, bed_year, bed_subject, bed_marks, bed_remarks,
              ttc_institution, ttc_college, ttc_year, ttc_subject,ttc_marks, ttc_remarks,
              pg_degree, pg_institution, pg_college, pg_year, pg_subject, pg_marks, pg_remarks,
              xii_institution, xii_college, xii_year, xii_subject, xii_marks, xii_remarks,
              x_institution, x_college, x_year, x_subject, x_marks, x_remarks,
              g_degree, g_institution, g_college, g_year, g_subject, g_marks, g_remarks,file_name,
              degree1, university1, marks1, year1, remarks1,
              degree2, university2, marks2, year2, remarks2,
              degree3, university3, marks3, year3, remarks3,
              school1, address1, designation1, class_taught1, subject_taught1,work_profile1,date_format(from_date1, '%d/%m/%Y') as from_date1,
              date_format(to_date1, '%d/%m/%Y') as to_date1, salary_drawn1,
              school2, address2, designation2, class_taught2, subject_taught2,work_profile2,
              date_format(from_date2, '%d/%m/%Y') as from_date2, date_format(to_date2, '%d/%m/%Y') as to_date2, salary_drawn2,
              school3, address3, designation3, class_taught3, subject_taught3,work_profile3,
              date_format(from_date3, '%d/%m/%Y') as from_date3, date_format(to_date3, '%d/%m/%Y') as to_date3, salary_drawn3,
              date_format(creation_date, '%d/%m/%Y') as  creation_date,interview_call
              from career_personal_details a
              LEFT JOIN career_qualification b on a.career_id = b.career_id
              LEFT JOIN career_other_qualification c on a.career_id = c.career_id
              LEFT JOIN career_work_experiencs d on a.career_id = d.career_id
              where a.creation_date between '${start_date}' and '${end_date}'
              order by full_name `;
    console.log(qry);
    connection.query(qry,function(err,result){
            
      if(err){
        console.log("Error reading Applicant Details : %s ",err );
        data.status = 'e';

      }else{
        data.status = 's';
        data.applicant_details = result;
        res.send(JSON.stringify(data))
      }
    });   
  });
});

//read Applicant Details CSV

router.get('/csv_export_applicant_detail/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;
  console.log(start_date)
  console.log("HERE")

  req.getConnection(function(err,connection){
    var data = {}

    var qry =`select a.career_id, post_applied_for as 'Post Applied', subject_tobe_taught as 'Subject Taught', class_tobe_taught as 'Class Taught',
              concat(first_name,' ',middle_name,' ',last_name) as 'Full Name',
              concat(f_first_name,' ',f_middle_name,' ',f_last_name) as "Father's Name",
              concat(husband_first_name,' ',husband_middle_name,' ',husband_last_name) as "Husband's Name",
              date_format(date_of_birth, '%d/%m/%Y') as 'DOB', age as 'Age', sex as 'Sex', marital_status as 'Marital Status',
              concat(address_line1, ', ', address_line2,', ', city, ', ',zip, ', ',state, ', ',country) as "Correspondence Address",
              concat(p_address_line1, ', ', p_address_line2, ', ',p_city,', ',p_zip,', ',p_state,', ',p_country) as "Permanent Address",
              mobile as 'Mobile', email as 'Email', phone_office as 'Phone Office',phone_residence as 'Residence Phone',
              bed_institution as 'B.Ed Institution', bed_college as 'B.Ed College', bed_year as 'B.Ed Year', bed_subject as 'B.Ed Subject', bed_marks as 'B.Ed Marks', bed_remarks as 'B.Ed Remarks',
              ttc_institution as 'TTC Institution', ttc_college as 'TTC College', ttc_year as 'TTC Year', ttc_subject as 'TTC Subject',ttc_marks as 'TTC Marks', ttc_remarks as 'TTC Remarks',
              pg_institution as 'PG Institution', pg_college as 'PG College', pg_year as 'PG Year', pg_subject as 'PG Subject', pg_marks as 'PG Marks', pg_remarks as 'PG Remarks',
              xii_institution as 'XII Institution', xii_college as 'XII College', xii_year as 'XII Year', xii_subject as 'XII Subject', xii_marks as 'XII Marks', xii_remarks as 'XII Remarks',
              x_institution as 'X Institution', x_college as 'X College', x_year as 'X Year', x_subject as 'X Subject', x_marks as 'X Marks', x_remarks as 'X Remarks',
              g_institution as 'G Institution', g_college as 'G College', g_year as 'G Year', g_subject as 'G Subject', g_marks as 'G Marks', g_remarks as 'G Remarks',
              degree1 as 'Degree 1', university1 as 'University 1', marks1 as 'Marks 1', year1 as 'Year 1', remarks1 as 'Remarks 1',
              degree2 as 'Degree 2', university2 as 'University 2', marks2 as 'Marks 2', year2 as 'Year 2', remarks2 as 'Remarks 2',
              degree3 as 'Degree 3', university3 as 'University 3', marks3 as 'Marks 3', year3 as 'Year 3', remarks3 as 'Remarks 3',
              school1 as 'School 1', address1 as 'Address 1', designation1 as 'Designation 1', class_taught1 as 'Class Taught 1', subject_taught1 as 'Subject Taught 1',work_profile1 as 'Work Profile 1',date_format(from_date1, '%d/%m/%Y') as 'From Date 1',
              date_format(to_date1, '%d/%m/%Y') as 'To Date 1', salary_drawn1 as 'Salary 1',
              school2 as 'School 2', address2 as 'Address 2', designation2 as 'Designation 2', class_taught2 as 'Class Taught 2', subject_taught2 as 'Subject Taught 2',work_profile2 as 'Work Profile 2',
              date_format(from_date2, '%d/%m/%Y') as 'From Date 2', date_format(to_date2, '%d/%m/%Y') as 'To Date 2', salary_drawn2 as 'Salary 2',
              school3 as 'School 3', address3 as 'Address 3', designation3 as 'Designation 3', class_taught3 as 'Class Taught 3', subject_taught3 as 'Subject Taught 3',work_profile3 as 'Work Profile 3',
              date_format(from_date3, '%d/%m/%Y') as 'From Date 3', date_format(to_date3, '%d/%m/%Y') as 'To Date 3', salary_drawn3 as 'Salary 3',
              date_format(creation_date, '%d/%m/%Y') as  'Submission Date',interview_call as 'Interview Call'
              from career_personal_details a
              LEFT JOIN career_qualification b on a.career_id = b.career_id
              LEFT JOIN career_other_qualification c on a.career_id = c.career_id
              LEFT JOIN career_work_experiencs d on a.career_id = d.career_id
              where a.creation_date between '${start_date}' and '${end_date}'
              `;
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {
      connection.query(qry,function(err,result)     {
            
        if(err){
          console.log("Error CSV download Career : %s ",err );
          data.status = 'e';

        }else{
          const fields = ["Full Name","Post Applied","Subject Taught","Class Taught","DOB","Age","Sex","Father's Name","Husband's Name","Marital Status","Mobile","Email","Phone Office","Residence Phone","Permanent Address","Correspondence Address","B.Ed Institution","B.Ed College","B.Ed Year","B.Ed Subject","B.Ed Marks","B.Ed Remarks","TTC Institution","TTC College","TTC Year","TTC Subject","TTC Marks","TTC Remarks","PG Institution","PG College","PG Year","PG Subject","PG Marks","PG Remarks","XII Institution","XII College","XII Year","XII Subject","XII Marks","XII Remarks","X Institution","X College","X Year","X Subject","X Marks","X Remarks","G Institution","G College","G Year","G Subject","G Marks","G Remarks","Degree 1","University 1","Marks 1","Year 1","Remarks 1","Degree 2","University 2","Marks 2","Year 2","Remarks 2","Degree 3","University 3","Marks 3","Year 3","Remarks 3","School 1","Address 1","Designation 1","Class Taught 1","Subject Taught 1","Work Profile 1","From Date 1","To Date 1","Salary 1","School 2","Address 2","Designation 2","Class Taught 2","Subject Taught 2","Work Profile 2","From Date 2","To Date 2","Salary 2","School 3","Address 3","Designation 3","Class Taught 3","Subject Taught 3","Work Profile 3","From Date 3","To Date 3","Salary 3","Submission Date","Interview Call"]; 
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);
          var path='./public/csv/Career.csv'; 
          data.url = '/csv/Career.csv';

          fs.writeFile(path, csv, function(err,data) {
            if (err) {
              throw err;
            }else{ 
              callback() 
            }
          });
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
    });//end of async loop  

  });// get connection
});

/* Create Interview Call */
router.post('/create_interview_call/:career_id', function(req, res, next) {


  var career_id = req.params.career_id;
  console.log(career_id);
  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  var data = {} 

      var values_interview = input.interview_detail
      values_interview.career_id = career_id
      values_interview.creation_date=formatted;
      values_interview.modified_by=req.cookies.user;

    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        var query=`INSERT INTO career_interview set ?`;
        console.log(query);
        connection.query(query, values_interview, function (error, rows) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }

        qry =`update career_personal_details set interview_call='Y'
              where career_id=${career_id} `;
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

        });//end of ection con
      });
    });
  });

/* Delete Candidate . */
router.get('/delete_applicant_detail/:career_id', function(req, res, next) {

  var career_id = req.params.career_id;

  req.getConnection(function(err,connection){
        var data = {}

        var qry =`delete from career_personal_details where career_id = ${career_id} `;

        connection.query(qry, function(err, rows)
        {
  
          if(err){
           console.log("Error deleting Candidate : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

module.exports = router;