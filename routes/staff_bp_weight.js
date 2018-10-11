var express = require('express');
var router = express.Router();

/* Read Course listing. */


router.get('/read_employee', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query("SELECT emp_id,employee_id,  concat(first_name,' ', middle_name,' ',last_name,' ( ',employee_id,')') as name FROM employee",function(err,result)     {
            
        if(err){
           console.log("Error reading category : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.employees = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});



// staff infirmary cae wise and date wise report 

/*router.get('/read_staff_monthly_case_report/:month_id', function(req, res, next) {
    req.getConnection(function(err,connection){
       var month_id = req.params.month_id;
         console.log(month_id)
         //return;
       var session_id=req.cookies.session_id
       var user='';
       var data = {}
       var category_condition=""
        var d = new Date();
        var n = d.getFullYear();
      // if(req.cookies.role != 'ADMIN') condition =  ' and a.created_by = ' + user;

         //var qry = "select staff_infirmary_id, a.case_id, a.category_id, b.employee_id, concat(first_name,' ',middle_name,'',last_name) as name, f.case_name, date_format(treatment_date,'%d/%m/%Y') as t_date , date_format(treatment_date,'%Y-%m-%d') as treatment_date,  time_format(time_in, '%H:%i') as time_in, time_format(time_out,'%H:%i') as time_out, treatment from staff_infirmary a join employee b on a.staff_id=b.emp_id join infirmary_case_master f on a.case_id = f.case_id where  " + category_condition + condition + date_condition + " order by first_name, t_date"; 
         var from_date = n + "-" + month_id + "-" + '01';
         var to_date = n + "-" + month_id + "-" + '31'; 
          
          console.log(from_date);
         var qry=`select a.category_id,category_name, staff_id, concat(first_name,' ',middle_name,' ',last_name)as staff_name,
                   date_format(treatment_date,'%d/%m/%Y') as treatment_date
                   from staff_infirmary a
                   join infirmary_category_master b on a.category_id = b.category_id
                   join employee c on a.staff_id = c.emp_id
                   where a.treatment_date between '${from_date}' and '${to_date}'
                   order by staff_id, category_name, treatment_date`;
        console.log(qry);
         connection.query(qry,function(err,result)     {
        if(err){
           console.log("Error reading staff infirmary : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
             data.status = 's';
            var std = Array();
            var prev_staff_id = "";        
            var prev_category_name = "";
            var prev_category_id="";
            var prev_treatment_date="";
            var total = 0;
         for (var i = 0; i < result.length; i++) {
          console.log(result[i])
          if(result[i].staff_id !=prev_staff_id){//check for different activity_id
          //if($staff_id !=$prev_staff_id ){// distinct staff_id
             if(prev_staff_id==""){    // loop runs first time
                var obj ={};
                obj['category_name'] = result[i].category_name;
                obj['staff_name'] =  result[i].staff_name; 
                prev_staff_id = result[i].staff_id; 
                prev_treatment_date = result[i].treatment_date;       
                prev_category_id=result[i].category_id;  
                total++;             
             }else{
                obj['treatment_date'] = prev_treatment_date;
                obj['total'] = total; 
                std.push(obj);
                //console.log(std)
                total=0;
                total++;
                var obj = {};
                obj['category_name'] = result[i].category_name;
                obj['staff_name'] =  result[i].staff_name;  
                prev_staff_id = result[i].staff_id;
                prev_category_id=result[i].category_id;
                prev_treatment_date = result[i].treatment_date;       
             }
          }else if(result[i].category_id ==  prev_category_id){
                prev_treatment_date = prev_treatment_date + "  | " + result[i].treatment_date;
                prev_staff_id=result[i].staff_id;   
                prev_category_id=result[i].category_id;
                total++;
          }else if(result[i].category_id !=  prev_category_id){
                obj['treatment_date'] = prev_treatment_date;
                obj['total'] = total; 
                std.push(obj);
                 total=0;
                 total++;
                var obj = {};
                obj['category_name'] = result[i].category_name;
                obj['staff_name'] =  result[i].staff_name;  
                prev_staff_id = result[i].staff_id;
                prev_category_id=result[i].category_id;
                prev_treatment_date = result[i].treatment_date;      
          }
 

        }
          //if($error ==0){
           // var obj={}
             //console.log(std);
             obj['treatment_date'] = prev_treatment_date;
             obj['total'] =total; 
            std.push(obj);
          //}
           //connection.end()
            data.staffMonthlyReport = std;
            res.send(JSON.stringify(data))
        }
          
     });
       
  });

});*/
// staff infirmary cae wise and date wise report 

router.post('/read_staff_wise_report', function(req, res, next) {
     var input = JSON.parse(JSON.stringify(req.body));
     console.log(input.staff_id)
    req.getConnection(function(err,connection){
         

       var staff_id = input.staff_id;
       var start_date = input.start_date;
       console.log(start_date)
       var end_date =input.end_date;
       console.log(staff_id);
       var session_id=req.cookies.session_id
       var user='';
       var data = {}
       //var staff_id=-1;
       var staff_condition="";
       var date_condition="";
        if(staff_id !=-1){
          staff_condition =' a.staff_id = ' + staff_id;
        }
        if(start_date !=''){
          date_condition =` and checkup_date between '${start_date}' and '${end_date}' `;
        }
       var condition = "";

      // if(req.cookies.role != 'ADMIN') condition =  ' and a.created_by = ' + user;

         var qry = "select concat(first_name,' ',middle_name,' ',last_name) as name,date_format(checkup_date,'%d/%m/%Y') as checkup_date, checkup_date as c_date, height,weight, concat(upper_bp,'/',lower_bp,' mmHg') as blood_pressure, bmi from staff_health a join employee b on a.staff_id=b.emp_id where  " + staff_condition + condition + date_condition + " order by c_date"; 
         connection.query(qry,function(err,result)     {
           console.log(qry);
        if(err){
           console.log("Error reading staff infirmary : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.staffWiseReports = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
          
     });
       
  });

});

router.get('/read_staff_bp_weight', function(req, res, next) {
    req.getConnection(function(err,connection){
      
       var session_id=req.cookies.session_id
       var user='';
       var data = {}
       var condition=""

      //if(req.cookies.role != 'ADMIN') condition =  ' a.created_by = ' + user;

         var qry =`select staff_id, health_id, b.employee_id, concat(first_name,' ',middle_name,' ',last_name)as name,
              date_format(checkup_date,'%d/%m/%Y') as checkup_date, checkup_date as c_date,
              time_format(time_in, '%H:%i') as time_in, time_format(time_out,'%H:%i') as time_out,
              weight,upper_bp, lower_bp, concat(upper_bp,'/',lower_bp,' mmHg') as blood_pressure, bmi,height
              from staff_health a
              join employee b on a.staff_id=b.emp_id
              where a.creation_date >'2017-06-01'
               ${condition}
              order by name, c_date`; 
         connection.query(qry,function(err,result)     {
          //  console.log(qry);
        if(err){
           console.log("Error reading infirmary : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.staffBPWeights = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
          
     });
       
  });

});
/*router.post('/readCaseReport', function(req, res, next) {
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
          date_condition =' and treatment_date between ' + start_date + ' and ' + end_date;
        }
       var condition = "";

      //if(req.cookies.role != 'ADMINISTRATOR') condition =  ' and a.created_by = ' + user;

         var qry = "select sent_home, staff_infirmary_id, a.case_id, a.category_id, a.enroll_number, concat(first_name,' ',middle_name,'',last_name)as student_name, concat(standard,' ',section)as standard, f.case_name, date_format(treatment_date,'%d/%m/%Y') as t_date , date_format(treatment_date,'%Y-%m-%d') as treatment_date,  time_format(time_in, '%H:%i') as time_in, time_format(time_out,'%H:%i') as time_out, treatment from infirmary a join student_master b on (a.enroll_number=b.enroll_number and b.current_session_id =" + session_id + ") join student_current_standing c on (b.student_id = c.student_id and b.current_session_id = " + session_id + ") join section_master d on c.section_id = d.section_id join standard_master e on d.standard_id = e.standard_id  join infirmary_case_master f on a.case_id = f.case_id where c.session_id= " + session_id + category_condition + condition + date_condition + " order by d.section_id, first_name, t_date"; 
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

});*/

/* Add Event listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            staff_id : input.staff_id,
            height    : input.height,
            weight : input.weight,
            upper_bp : input.upper_bp,
            lower_bp : input.lower_bp,
            checkup_date : input.checkup_date,
            time_in : input.time_in,
            time_out : input.time_out,
            bmi : input.bmi,
        };
        
        var query = connection.query("INSERT INTO staff_health set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting case : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.health_id = rows.insertId;
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
            staff_id : input.staff_id,
            height : input.height,
            weight : input.weight,
            upper_bp : input.upper_bp,
            lower_bp : input.lower_bp,
            checkup_date : input.checkup_date,
            time_in : input.time_in,
            time_out : input.time_out,
            bmi : input.bmi,
        };
        
        var query = connection.query("UPDATE staff_health set ? WHERE health_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting cases : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.health_id = rows.insertId;
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

        var query = connection.query("DELETE from staff_health WHERE health_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

module.exports = router;
