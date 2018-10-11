var express = require('express');
var router = express.Router();

/* Read Course listing. */
router.get('/readInfirmaryCategory', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM infirmary_category_master',function(err,result)     {
            
        if(err){
           console.log("Error reading category : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.infirmaryCategories = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Event listing. */
router.get('/read_infirmary_case', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = 'SELECT e.category_id, case_id, category_name, case_name FROM infirmary_case_master e';
         qry = qry + ' LEFT JOIN infirmary_category_master c ON e.category_id = c.category_id '; 
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading case : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.infirmaryCases = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.get('/read_student_infirmary/:id', function(req, res, next) {
    req.getConnection(function(err,connection){
       var category_id = req.params.id;
       console.log(category_id);
       var session_id=req.cookies.session_id
       var user='';
       var data = {}
       //var category_id=-1;
       var category_condition="";
        if(category_id !=-1){
          category_condition =' and a.category_id = ' + category_id;
        }
       var condition = "";

      //if(req.cookies.role != 'ADMINISTRATOR') condition =  ' and a.created_by = ' + user;

         var qry = "select sent_home, infirmary_id, a.case_id, a.category_id, a.enroll_number, concat(first_name,' ',middle_name,'',last_name)as student_name, concat(standard,' ',section)as standard, f.case_name, date_format(treatment_date,'%d/%m/%Y') as t_date , date_format(treatment_date,'%Y-%m-%d') as treatment_date,  time_format(time_in, '%H:%i') as time_in, time_format(time_out,'%H:%i') as time_out, treatment from infirmary a join student_master b on (a.enroll_number=b.enroll_number and b.current_session_id =" + session_id + ") join student_current_standing c on (b.student_id = c.student_id and b.current_session_id = " + session_id + ") join section_master d on c.section_id = d.section_id join standard_master e on d.standard_id = e.standard_id  join infirmary_case_master f on a.case_id = f.case_id where c.session_id= " + session_id + category_condition + condition + " order by d.section_id, first_name, t_date"; 
         connection.query(qry,function(err,result)     {
          //  console.log(qry);
        if(err){
           console.log("Error reading infirmary : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.studentInfirmarys = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
          
     });
       
  });

});
router.post('/readCaseReport', function(req, res, next) {
     var input = JSON.parse(JSON.stringify(req.body));
     console.log(input.category_id)
    req.getConnection(function(err,connection){
         

       var category_id = input.category_id;
       var start_date = input.start_date;
       console.log(start_date)
       var end_date =input.end_date;
       console.log(category_id);
       var session_id=req.cookies.session_id
       var user='';
       var data = {}
       //var category_id=-1;
       var category_condition="";
       var date_condition="";
        if(category_id !=-1){
          category_condition =' and a.category_id = ' + category_id;
        }
        if(start_date !=''){
          date_condition =` and treatment_date between '${start_date}' and '${end_date}' `;
        }
       var condition = "";

      //if(req.cookies.role != 'ADMINISTRATOR') condition =  ' and a.created_by = ' + user;

         var qry = "select sent_home, infirmary_id, a.case_id, a.category_id, a.enroll_number, concat(first_name,' ',middle_name,'',last_name)as student_name, concat(standard,' ',section)as standard, f.case_name, date_format(treatment_date,'%d/%m/%Y') as t_date , date_format(treatment_date,'%Y-%m-%d') as treatment_date,  time_format(time_in, '%H:%i') as time_in, time_format(time_out,'%H:%i') as time_out, treatment from infirmary a join student_master b on (a.enroll_number=b.enroll_number and b.current_session_id =" + session_id + ") join student_current_standing c on (b.student_id = c.student_id and b.current_session_id = " + session_id + ") join section_master d on c.section_id = d.section_id join standard_master e on d.standard_id = e.standard_id  join infirmary_case_master f on a.case_id = f.case_id where c.session_id= " + session_id + category_condition + condition + date_condition + " order by d.section_id, first_name, t_date"; 
         connection.query(qry,function(err,result)     {
           console.log(qry);
        if(err){
           console.log("Error reading infirmary : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.studentDateWiseCaseReports = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
          
     });
       
  });

});

/* Add Event listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            enroll_number : input.enroll_number,
            case_id    : input.case_id,
            category_id : input.category_id,
            treatment_date : input.treatment_date,
            sent_home : input.sent_home,
            time_in : input.time_in,
            time_out : input.time_out,
            treatment : input.treatment,
            case_name : input.case_name,
        };
        
        var query = connection.query("INSERT INTO infirmary set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting case : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.infirmary_id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


/* Edit Event listing. */
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            enroll_number    : input.enroll_number,
            case_id    : input.case_id,
            category_id : input.category_id,
            treatment_date : input.treatment_date,
            sent_home : input.sent_home,
            time_in : input.time_in,
            time_out : input.time_out,
            treatment : input.treatment,
            case_name : input.case_name,
        };
        
        var query = connection.query("UPDATE infirmary set ? WHERE infirmary_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting cases : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.infirmary_id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

/* Delete Event listing. */
router.get('/delete/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from infirmary WHERE infirmary_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting event : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

module.exports = router;
