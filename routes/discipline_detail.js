var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var download = require('download-file')

/* Read Category listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('select category_id,category_name from discipline_category_master order by 2',function(err,result)     {
            
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
router.get('/read_discipline_case', function(req, res, next) {
//  var category_id = req.params.category_id;
  console.log("HERE")
  //console.log(category_id)

  req.getConnection(function(err,connection){
       
     var data = {}
     var query = connection.query("SELECT case_id,category_id, case_name FROM discipline_case_master ", function(err, result)     
     {
            
        if(err){
           console.log("Error reading case : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.discipline_case = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Discipline listing for CSV */
router.get('/csv_export_discipline/:read_category_id', function(req, res, next) {
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

    var qry = `select * from(select id,c.section_id, referred_by as 'Referred by', a.enroll_number as 'Enroll No', 
              concat(b.first_name,' ',b.middle_name,'',b.last_name)as student_name,
              concat(b.first_name,' ',b.middle_name,'',b.last_name)as Name,
              concat(standard,' ',section)as Class, category_name, 
              date_format(consult_date,'%d/%m/%Y')as Date, 
              date_format(consult_date, "%Y-%m-%d") as c_date, 
              diagnosis as 'Diagnosis', remarks as 'Suggestion',g.case_name as 'Case', 
              h.short_name as 'Recorded By', h.short_name as created_by
              from discipline a
              left join student_master b on (a.enroll_number=b.enroll_number and b.current_session_id = ${session_id} )
              left join student_current_standing c on (b.student_id=c.student_id and b.current_session_id = ${session_id} )
              left join section_master d on c.section_id = d.section_id
              left join standard_master e on d.standard_id = e.standard_id
              left join discipline_category_master f on a.category_id = f.category_id
              join discipline_case_master g on a.case_id = g.case_id
              left join employee h on a.created_by = h.employee_id
              where (b.withdraw='N' || b.withdraw_session > ${session_id} ) and
              c.session_id=(select session_id from session_master where session_id = ${session_id} ) 
              ${category_condition} ${condition}

              UNION

              select id,c.section_id, referred_by as 'Referred by', a.enroll_number as 'Enroll No', 
              concat(b.first_name,' ',b.middle_name,'',b.last_name)as student_name,
              concat(b.first_name,' ',b.middle_name,'',b.last_name)as Name,
              concat(standard,' ',section)as Class, category_name, 
              date_format(consult_date,'%d/%m/%Y')as Date, 
              date_format(consult_date, "%Y-%m-%d") as c_date, 
              diagnosis as 'Diagnosis', remarks as 'Suggestion',g.case_name, 
              h.short_name as created_by,h.short_name as 'Recorded By'
              from discipline a
              left join student_master b on (a.enroll_number=b.enroll_number and b.current_session_id = ${session_id} )
              left join student_current_standing c on (b.student_id=c.student_id and a.session_id = c.session_id and b.current_session_id = ${session_id})
              left join section_master d on c.section_id = d.section_id
              left join standard_master e on d.standard_id = e.standard_id
              left join discipline_category_master f on a.category_id = f.category_id
              join discipline_case_master g on a.case_id = g.case_id
              left join employee h on a.created_by = h.employee_id
              where b.withdraw='Y' ${category_condition} ${condition} ) z
              order by z.c_date desc, z.section_id, z.student_name `;

    connection.query(qry,[category_id], function(err, result)     
     {
        if(err){
           console.log("Error reading Discipline : %s ",err );
           data.status = 'e';

        }else{
          data.status = 's';
          data.disciplines = result;
          const fields = ['Referred by','Recorded By','Name','Enroll No','Class','Case','Date','Diagnosis','Suggestion'];
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(result);

          var path='./public/csv/DisciplineDetail.csv'; 
          fs.writeFile(path, csv, function(err,data) {
            if (err) {throw err;}
            else{ 
              res.send(data)
              var url='http://localhost:4000/csv/DisciplineDetail.csv';
              var open = require("open","");
              open(url);  
            }
          });
        }
     
     });
    
  });
       
});

/* Read Discipline listing. */
router.get('/read_discipline/:read_category_id', function(req, res, next) {
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

    var qry =`select * from(select id,c.section_id, referred_by, a.enroll_number, 
              concat(b.first_name,' ',b.middle_name,'',b.last_name)as student_name,
              concat(standard,' ',section)as standard, category_name, 
              date_format(consult_date,'%d/%m/%Y')as consult_date, date_format(consult_date, "%Y-%m-%d") as c_date, 
              diagnosis, remarks,g.case_name, h.short_name as created_by
              from discipline a
              left join student_master b on (a.enroll_number=b.enroll_number and b.current_session_id = ${session_id} )
              left join student_current_standing c on (b.student_id=c.student_id and b.current_session_id = ${session_id} )
              left join section_master d on c.section_id = d.section_id
              left join standard_master e on d.standard_id = e.standard_id
              left join discipline_category_master f on a.category_id = f.category_id
              join discipline_case_master g on a.case_id = g.case_id
              left join employee h on a.created_by = h.employee_id
              where (b.withdraw='N' || b.withdraw_session > ${session_id} ) and
              c.session_id=(select session_id from session_master where session_id = ${session_id} ) 
              ${category_condition} ${condition}

              UNION

              select id,c.section_id, referred_by, a.enroll_number, 
              concat(b.first_name,' ',b.middle_name,'',b.last_name)as student_name,
              concat(standard,' ',section)as standard, category_name, 
              date_format(consult_date,'%d/%m/%Y')as consult_date, date_format(consult_date, "%Y-%m-%d") as c_date, 
              diagnosis, remarks,g.case_name, h.short_name as created_by
              from discipline a
              left join student_master b on (a.enroll_number=b.enroll_number and b.current_session_id = ${session_id} )
              left join student_current_standing c on (b.student_id=c.student_id and a.session_id = c.session_id and b.current_session_id = ${session_id})
              left join section_master d on c.section_id = d.section_id
              left join standard_master e on d.standard_id = e.standard_id
              left join discipline_category_master f on a.category_id = f.category_id
              join discipline_case_master g on a.case_id = g.case_id
              left join employee h on a.created_by = h.employee_id
              where b.withdraw='Y' ${category_condition} ${condition} ) z
              order by z.c_date desc, z.section_id, z.student_name `;
        console.log(qry);
    connection.query(qry,[category_id], function(err, result)     
     {
            
        if(err){
           console.log("Error reading Discipline : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.disciplines = result;
            res.send(JSON.stringify(data))
        }
     
     });
    
  });
       
});

/* Add Discipline Detail. */
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
            diagnosis : input.diagnosis,
            remarks : input.remarks,
            creation_date    : formatted,
            modified_by    : req.cookies.user,
            created_by    : req.cookies.user,
            session_id    : req.cookies.session_id,
            
        };
        
        var query = connection.query("INSERT INTO discipline set ? ",values, function(err, rows)
        {
 
         if(err){
          console.log("Error inserting Discipline : %s ",err );
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
router.get('/read_for_edit_discipline/:id/', function(req, res, next) {
  var id = req.params.id;
  console.log("HERE")
  console.log(id)

  req.getConnection(function(err,connection){
       
    var data = {}
    var qry = ` select id,referred_by, enroll_number,category_id,  case_id,
                date_format(consult_date,'%d/%m/%Y')as consult_date,
                diagnosis,  remarks
                from discipline
                where id= ? `;
    connection.query(qry,[id], function(err, result)     
     {
            
        if(err){
           console.log("Error reading Discipline : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.discipline_details = result;

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Edit Discipline listing. */
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
            diagnosis : input.diagnosis,
            remarks : input.remarks,
            modified_by    : req.cookies.user,
            session_id    : req.cookies.session_id,
        };
        
        var query = connection.query("UPDATE discipline set ? WHERE id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error Updating Discipline : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              data.id = rows.insertId;
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

/* Delete Discipline Details. */
router.get('/delete_discipline_detail/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from discipline WHERE id = ?",[id], function(err, rows)
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
