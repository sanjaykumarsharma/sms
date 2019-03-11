var express = require('express');
var router = express.Router();
var multer = require('multer')
var fs = require('fs');
var async = require("async");
const Json2csvParser = require('json2csv').Parser;
var http = require('http');


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

/* Read Student */

router.get('/read_student/:standard_id/:section_id/:enroll_number', function(req, res, next) {

  var standard_id = req.params.standard_id;
  var section_id = req.params.section_id;
  var enroll_number = req.params.enroll_number;
  var session_id = req.cookies.session_id
  console.log("hiiii");

  req.getConnection(function(err,connection){
       
    var data = {}
    if(enroll_number!="0"){
      var qry =`select a.student_id, first_name, middle_name, last_name,blood_group,standard,section,
                f_name,c_add_l1,c_add_l2,c_city,c_state,c_zip,c_country,mobile,
                if(transport_mode = 'None','',transport_mode)as transport_mode,
                concat(first_name,' ',middle_name, ' ' ,last_name)as name,enroll_number, roll_number
                from student_master a
                JOIN student_current_standing b on (a.student_id=b.student_id and a.current_session_id =${session_id})
                LEFT JOIN section_master c on  b.section_id = c.section_id
                join standard_master d on c.standard_id = d.standard_id
                join parent_master f on (a.student_id = f.student_id  and f.current_session_id = ${session_id})
                where a.enroll_number in (${enroll_number})
                and (a.withdraw='N' or a.withdraw_session > ${session_id}) 
                and session_id = ${session_id}
                order by first_name,roll_number`;
    }else{
      var qry =`select a.student_id, first_name, middle_name, last_name,blood_group,standard,section,
                f_name,c_add_l1,c_add_l2,c_city,c_state,c_zip,c_country,mobile,
                if(transport_mode = 'None','',transport_mode)as transport_mode,
                concat(first_name,' ',middle_name, ' ' ,last_name)as name,enroll_number, roll_number
                from student_master a
                JOIN student_current_standing b on (a.student_id=b.student_id and a.current_session_id =${session_id})
                LEFT JOIN section_master c on  b.section_id = c.section_id
                join standard_master d on c.standard_id = d.standard_id
                join parent_master f on (a.student_id = f.student_id  and f.current_session_id = ${session_id})
                where c.standard_id=${standard_id} and c.section_id= ${section_id}
                and (a.withdraw='N' or a.withdraw_session > ${session_id}) 
                and session_id = ${session_id}
                order by first_name,roll_number `;
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

/* Read Id Card  for CSV */
router.post('/csv_export_id_card', function(req, res, next) {
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
        console.log(result[i].referred_by)
        var obj = {};
        obj['Enroll No'] = result[i].enroll_number;
        obj['Standard'] = result[i].standard;
        obj['Section'] = result[i].section;
        obj['Student Name'] = result[i].name;
        obj['Father Name'] = result[i].f_name;
        obj['Address Line 1'] = result[i].c_add_l1;
        obj['Address Line 2'] = result[i].c_add_l2;
        obj['City'] = result[i].c_city;
        obj['Zip'] = result[i].c_zip;
        obj['State'] = result[i].c_state;
        obj['Country'] = result[i].c_country;
        obj['Mobile'] = result[i].mobile;
        obj['Blood Group'] = result[i].blood_group;
        obj['Transport'] = result[i].transport_mode;
        obj['Session'] = session_name
        obj['BarCode'] = '*'+result[i].enroll_number+'*';
        obj['Image Id'] = result[i].student_id+'.jpg' ;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Enroll No','Standard','Section','Student Name','Father Name','Address Line 1','Address Line 2','City','Zip','State','Country','Mobile','Blood Group','Transport','Session','BarCode','Image Id'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/idCard.csv'; 
      data.url = '/csv/idCard.csv';

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
    });//end of async loop     
    
  });
       
});

/* Read Student ID Card */

router.get('/read_id_card/:student_id', function(req, res, next) {

  var student_id = req.params.student_id;
  var session_id = req.cookies.session_id
  console.log("hiiii");

  req.getConnection(function(err,connection){
       
    var data = {}

    var qry =` select a.student_id,enroll_number, concat(first_name,' ',middle_name,' ',last_name)as student_name,
               gender, standard, section,blood_group, if(transport_mode = 'None','',transport_mode)as transport_mode, 
               f_name, session_name,
               c_add_l1, c_add_l2, c_city, c_zip, c_state, c_country, mobile
               from student_master a  
               join student_current_standing b on (a.student_id = b.student_id  and a.current_session_id = ${session_id})        
               join section_master c on b.section_id = c.section_id
               join standard_master d on c.standard_id = d.standard_id
               join parent_master f on (a.student_id = f.student_id  and f.current_session_id = ${session_id})
               join session_master g on b.session_id =g.session_id
               where a.student_id in (${student_id})
               and a.withdraw ='N'
               and b.session_id= ${session_id}
               order by first_name, middle_name, last_name`;
    connection.query(qry,function(err,result)     {
            
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
        data.status = 's';
        data.students_id_card_details = result;
        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Student Escort Card */

router.get('/read_escort_card/:student_id', function(req, res, next) {

  var student_id = req.params.student_id;
  var session_id = req.cookies.session_id
  console.log("hiiii");

  req.getConnection(function(err,connection){
       
    var data = {}

    var qry =` select a.student_id,enroll_number, concat(first_name,' ',middle_name,' ',last_name)as student_name,
               gender, standard, section,blood_group, if(transport_mode = 'None','',transport_mode)as transport_mode, 
               f_name, session_name,
               c_add_l1, c_add_l2, c_city, c_zip, c_state, c_country, mobile
               from student_master a  
               join student_current_standing b on (a.student_id = b.student_id  and a.current_session_id = ${session_id})        
               join section_master c on b.section_id = c.section_id
               join standard_master d on c.standard_id = d.standard_id
               join parent_master f on (a.student_id = f.student_id  and f.current_session_id = ${session_id})
               join session_master g on b.session_id =g.session_id
               where a.student_id in (${student_id})
               and a.withdraw ='N'
               and b.session_id= ${session_id}
               order by first_name, middle_name, last_name`;
    connection.query(qry,function(err,result)     {
            
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
        data.status = 's';
        data.students_escort_card_details = result;
        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

module.exports = router;
