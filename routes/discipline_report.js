var express = require('express');
var router = express.Router();

router.get('/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;
  console.log("HERE")

  req.getConnection(function(err,connection){
       
     var data = {}
     var condition = "";
     var created_by = req.cookies.user
     //if(req.cookies.role != 'ADMINISTRATOR') $condition = ` and created_by = '${created_by}' `;
     var qry = `select a.category_id, category_name, count(*) as total
                from discipline a
                join discipline_category_master b on a.category_id = b.category_id
                where consult_date between ? and ?
                ${condition}
                group by category_name `;

     connection.query(qry,[start_date,end_date], function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.case_wise_reports = result;
           //connection.end()
           var grand_total=0;
            for (var i = result.length - 1; i >= 0; i--) {
               grand_total = grand_total+result[i].total;
             } 

            data.grand_total = grand_total; 

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.get('/read_date_wise_case_report/:start_date/:end_date/:category_id', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;
  var category_id = req.params.category_id;
  console.log("HERE")

  req.getConnection(function(err,connection){
       
     var data = {}
     var condition = "";
     var created_by = req.cookies.user
     var session_id = req.cookies.session_id
     console.log(session_id)
     var category_condition="";
     if(category_id !=-1){
        category_condition = ` and a.category_id =  ${category_id} ` ;
      }
     /*if(req.cookies.role != 'ADMIN') $condition = ` and created_by = '${created_by}' `;*/
     var qry = `select a.enroll_number, concat(first_name,' ',middle_name,'',last_name)as student_name,
                concat(standard,' ',section)as standard, category_name, g.case_name,
                date_format(consult_date,'%d/%m/%Y')as consult_date, diagnosis, remarks
                from discipline a
                left join student_master b on (a.enroll_number=b.enroll_number and b.current_session_id = ${session_id})
                left join student_current_standing c on( b.student_id=c.student_id and a.session_id = c.session_id and b.current_session_id = ${session_id})
                left join section_master d on c.section_id = d.section_id
                left join standard_master e on d.standard_id = e.standard_id
                left join discipline_case_master f on a.category_id = f.category_id
                join discipline_case_master g on a.case_id = g.case_id
                where consult_date between ? and ? 
                ${category_condition}
                order by d.section_id, first_name,consult_date `;

     connection.query(qry,[start_date,end_date], function(err, result)     
     {
            
        if(err){
           console.log("Error reading Date Wise Case Report : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.date_wise_case_report = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});
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

/* Read Session */

router.get('/read_session', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT session_id, session_name FROM session_master',function(err,result)     {
            
        if(err){
           console.log("Error reading Session : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.sessions = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.get('/read_class_wise_report/:standard_id/:section_id/:session_id', function(req, res, next) {
  var standard_id = req.params.standard_id;
  var section_id = req.params.section_id;
  var session_id = req.params.session_id;
  console.log("HERE")

  req.getConnection(function(err,connection){
       
     var data = {}
     var condition = "";
     var created_by = req.cookies.user
     var active_session_id = req.cookies.session_id
     console.log(session_id)
     var category_condition="";

      if(standard_id == -1 && section_id==-1)   condition = "";

      if(standard_id != -1 && section_id==-1)   condition = ` and d.standard_id = ${standard_id} `;

      if(standard_id != -1 && section_id!=-1)   condition = ` and  d.standard_id= ${standard_id} and d.section_id= ${section_id} `;
     /*if(req.cookies.role != 'ADMIN') $condition = ` and created_by = '${created_by}' `;*/

     var roleCondition = "";

      if(req.cookies.role != "ADMIN") roleCondition = ` and a.created_by =  '${created_by}' `;

      if(req.cookies.role != "ADMIN" && condition !="") roleCondition = ` and  a.created_by = '${created_by}' `;


     var qry = `select category_name, count(*) as total
                from discipline a
                left join student_master b on (a.enroll_number = b.enroll_number and b.current_session_id = ${active_session_id} )
                left join student_current_standing c on (b.student_id = c.student_id and a.session_id = c.session_id and b.current_session_id = ${active_session_id} )
                left join section_master d on c.section_id = d.section_id
                left join standard_master f on d.standard_id = f.standard_id 
                join discipline_category_master e on a.category_id = e.category_id
                where a.session_id = ?
                ${condition} ${roleCondition}
                group by category_name `;

     connection.query(qry,[session_id], function(err, result)
     {
            
        if(err){
           console.log("Error reading Date Wise Case Report : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.class_wise_case_report = result;

            var grand_total=0;
            for (var i = result.length - 1; i >= 0; i--) {
               grand_total = grand_total+result[i].total;
             } 

            data.grand_total = grand_total; 
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


module.exports = router;
