var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");

/* Read Category listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT category_id, category_name FROM mentor_category_master',function(err,result)     {
            
        if(err){
           console.log("Error reading category : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.categories = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Event listing. */
router.get('/read_case', function(req, res, next) {
//  var category_id = req.params.category_id;
  console.log("HERE")
  //console.log(category_id)

  req.getConnection(function(err,connection){
       
     var data = {}
     var query = connection.query("SELECT case_id,category_id, case_name FROM mentor_case_master ", function(err, result)     
     {
            
        if(err){
           console.log("Error reading case : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.mentor_case = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Mentor listing. */
router.get('/read_mentor/:read_category_id', function(req, res, next) {
  var category_id = req.params.read_category_id;
  console.log("HERE")
  console.log(category_id)

  req.getConnection(function(err,connection){
       
     var data = {}
     /*var values={
        category_id : req.params.read_category_id,
     };*/

     var category_condition="";
     var session_id = req.cookies.session_id
     var created_by = req.cookies.user
     var category_condition="";

      if(category_id !=-1){
        category_condition = ` and a.category_id =  ${category_id} ` ;
      }

        var condition = "";

        if(req.cookies.role != 'ADMIN') condition = ` and a.created_by = '${created_by}' `;
     var qry = `select * from
               (select id,c.section_id,a.category_id, a.case_id, referred_by, a.enroll_number, concat(first_name,' ',middle_name,'',last_name) as student_name,
                concat(standard,' ',section)as standard, category_name, date_format(consult_date,'%d/%m/%Y')as consult_date,date_format(consult_date, "%Y-%m-%d") as c_date,
                time_format(time_in, '%H:%i') as time_in, time_format(time_out,'%H:%i') as time_out,diagnosis, suggestion,g.case_name
                from mentor a
                left join student_master b on (a.enroll_number=b.enroll_number and b.current_session_id =  ${session_id} )
                left join student_current_standing c on (b.student_id=c.student_id and b.current_session_id =  ${session_id} )
                left join section_master d on c.section_id = d.section_id
                left join standard_master e on d.standard_id = e.standard_id
                left join mentor_category_master f on a.category_id = f.category_id
                join mentor_case_master g on a.case_id = g.case_id
                where (b.withdraw='N' || b.withdraw_session >  ${session_id} ) and 
                c.session_id=(select session_id from session_master where session_id =  ${session_id} ) 
                ${category_condition}  ${condition}

                UNION

                select id,c.section_id, a.category_id, a.case_id, referred_by, a.enroll_number, concat(first_name,' ',middle_name,'',last_name)as student_name,
                concat(standard,' ',section)as standard, category_name, date_format(consult_date,'%d/%m/%Y')as consult_date, date_format(consult_date, "%Y-%m-%d") as c_date, 
                time_format(time_in, '%H:%i') as time_in, time_format(time_out,'%H:%i') as time_out,diagnosis, suggestion,g.case_name
                from mentor a
                left join student_master b on (a.enroll_number=b.enroll_number and b.current_session_id =  ${session_id} )
                left join student_current_standing c on (b.student_id=c.student_id and a.session_id = c.session_id and b.current_session_id = " ${session_id} ")
                left join section_master d on c.section_id = d.section_id
                left join standard_master e on d.standard_id = e.standard_id
                left join mentor_category_master f on a.category_id = f.category_id
                join mentor_case_master g on a.case_id = g.case_id
                where b.withdraw='Y'  ${category_condition}  ${condition} ) z
                order by z.c_date desc, z.section_id, z.student_name `;
                console.log(qry);
      connection.query(qry,[category_id], function(err, result)     
     {
            
        if(err){
           console.log("Error reading Mentor : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.mentors = result;
            res.send(JSON.stringify(data))
        }
     
     });
    
  });
       
});

/* Read Mentor listing for CSV */
router.post('/csv_export_mentor', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));

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
        obj['Referred by'] = result[i].referred_by;
        obj['Name'] = result[i].student_name;
        obj['Enroll No'] = result[i].enroll_number;
        obj['Class'] = result[i].standard;
        obj['Case'] = result[i].case_name;
        obj['Date'] = result[i].c_date;
        obj['Time In'] = result[i].time_in;
        obj['Time Out'] = result[i].time_out;
        obj['Diagnosis'] = result[i].diagnosis;
        obj['Suggestion'] = result[i].suggestion;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Referred by','Name', 'Enroll No','Class','Case','Date','Time In','Time Out','Diagnosis','Suggestion'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/MentorDetail.csv'; 
      data.url = '/csv/MentorDetail.csv';

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

/* Add Mentor Detail. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  req.getConnection(function(err,connection){
        var data = {}

        var values = {

            referred_by    : input.referred_by,
            enroll_number : input.enroll_number,
            category_id : input.category_id,
            case_id : input.case_id,
            consult_date : input.consult_date,
            time_in : input.time_in,
            time_out : input.time_out,
            diagnosis : input.diagnosis,
            suggestion : input.suggestion,
            creation_date    : formatted,
            modified_by    : req.cookies.user,
            created_by    : req.cookies.user,
            session_id    : req.cookies.session_id,
            
        };
        
        var query = connection.query("INSERT INTO mentor set ? ",values, function(err, rows)
        {
 
         if(err){
          console.log("Error inserting Mentor : %s ",err );
          data.status = 'e';

        }else{
           data.status = 's';
           data.id = rows.insertId;
           res.send(JSON.stringify(data))
           
        }
        
         
       });
   });

});



/* Read mentor For Edit. */
router.get('/read_for_edit_mentor/:id/', function(req, res, next) {
  var id = req.params.id;
  console.log("HERE")
  console.log(id)

  req.getConnection(function(err,connection){
       
    var data = {}
    var qry = ` select id,referred_by, enroll_number,category_id,  case_id,
                 date_format(consult_date,'%d/%m/%Y')as consult_date,
                 time_format(time_in, '%H:%i') as time_in, time_format(time_out,'%H:%i') as time_out,
                 diagnosis, suggestion
                 from mentor
                 where id= ? `;
    connection.query(qry,[id], function(err, result)     
     {
            
        if(err){
           console.log("Error reading case : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.mentor_details = result;

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Edit Course listing. */
router.post('/edit/:id', function(req, res, next) {

  var id = req.params.id;

  var input = JSON.parse(JSON.stringify(req.body));
  console.log(input)
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            referred_by    : input.referred_by,
            enroll_number : input.enroll_number,
            category_id : input.category_id,
            case_id : input.case_id,
            consult_date : input.consult_date,
            time_in : input.time_in,
            time_out : input.time_out,
            diagnosis : input.diagnosis,
            suggestion : input.suggestion,
            creation_date    : formatted,
            modified_by    : req.cookies.user,
            created_by    : req.cookies.user,
            session_id    : req.cookies.session_id,
        };
        
        var query = connection.query("UPDATE mentor set ? WHERE id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error Updating Mentor : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              data.id = rows.insertId;
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

/* Read Case Details listing. */
router.get('/read_mentor_case/:id/:enroll_number', function(req, res, next) {
  var id = req.params.id;
  var enroll_number = req.params.enroll_number;
  console.log("HERE")
  console.log(id)
  console.log(enroll_number)

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select id, visitor, date_format(visit_date,'%d/%m/%Y')as visit_date,visit_date as v_date,
                time_format(time_in, '%H:%i') as time_in, time_format(time_out,'%H:%i') as time_out, 
                suggestion,status
                from mentor_case 
                where case_id = ?
                and enroll_number = ?
                order by v_date `;
    connection.query(qry,[id,enroll_number], function(err, result)     
     {
            
        if(err){
           console.log("Error reading case : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.mentor_case_details = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Case Details CSV */
router.post('/read_mentor_case_csv', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));

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
        obj['Visitor'] = result[i].visitor;
        obj['Visit Date'] = result[i].visit_date;
        obj['Time In'] = result[i].time_in;
        obj['Time Out'] = result[i].time_out;
        obj['Suggestion'] = result[i].suggestion;
        obj['Status'] = result[i].status;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Visitor','Visit Date','Time In','Time Out','Suggestion','Status'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/CaseDetails.csv'; 
      data.url = '/csv/CaseDetails.csv';

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

/* Add Case Detail. */
router.post('/add_case_detail', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  req.getConnection(function(err,connection){
        var data = {}

        var values = {

            visitor    : input.visitor,
            enroll_number : input.enroll_number,
            case_id : input.case_id,
            visit_date : input.visit_date,
            time_in : input.time_in,
            time_out : input.time_out,
            status : input.status,
            suggestion : input.suggestion,
            creation_date    : formatted,
            modified_by    : req.cookies.user,
            
        };
        
        var query = connection.query("INSERT INTO mentor_case set ? ",values, function(err, rows)
        {
 
         if(err){
          console.log("Error inserting Mentor : %s ",err );
          data.status = 'e';

        }else{
           data.status = 's';
           data.id = rows.insertId;
           res.send(JSON.stringify(data))
           
        }
        
         
       });
   });

});

/* Read Case Details For Edit. */
router.get('/read_for_edit_case/:id', function(req, res, next) {
  var id = req.params.id;
  console.log("HERE")
  console.log(id)

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select id,visitor, date_format(visit_date,'%d/%m/%Y')as visit_date,
                time_format(time_in, '%H:%i') as time_in, time_format(time_out,'%H:%i') as time_out, 
                suggestion,status
                from mentor_case
                where id= ? `;
    connection.query(qry,[id], function(err, result)     
     {
            
        if(err){
           console.log("Error reading case : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.update_case_details_for_update = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Edit Case Details. */
router.post('/edit_case_detail/:id', function(req, res, next) {

  var id = req.params.id;

  var input = JSON.parse(JSON.stringify(req.body));
  console.log(input)
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            visitor    : input.visitor,
            visit_date : input.visit_date,
            time_in : input.time_in,
            time_out : input.time_out,
            status : input.status,
            suggestion : input.suggestion,
            creation_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("UPDATE mentor_case set ? WHERE id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error Updating Case Details : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              data.id = rows.insertId;
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

/* Delete Case Details. */
router.get('/delete_case_details/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from mentor_case WHERE id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting case details : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

/* Delete Mentor Details. */
router.get('/delete_mentor_detail/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from mentor WHERE id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting mentor details : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});




module.exports = router;
