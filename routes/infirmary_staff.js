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

// staff infirmary cae wise and date wise report 

router.get('/read_staff_monthly_case_report/:month_id', function(req, res, next) {
    req.getConnection(function(err,connection){
       var month_id = req.params.month_id;
         console.log(month_id)
         //return;
       var session_id=req.cookies.session_id
       var user='';
       user=req.cookies.user
       var data = {}
       var condition=``
       var category_condition=""
        var d = new Date();
        var n = d.getFullYear();
      if(req.cookies.role != 'ADMIN') condition =  ` and a.created_by = '${user}' `;

         //var qry = "select staff_infirmary_id, a.case_id, a.category_id, b.employee_id, concat(first_name,' ',middle_name,'',last_name) as name, f.case_name, date_format(treatment_date,'%d/%m/%Y') as t_date , date_format(treatment_date,'%Y-%m-%d') as treatment_date,  time_format(time_in, '%H:%i') as time_in, time_format(time_out,'%H:%i') as time_out, treatment from staff_infirmary a join employee b on a.staff_id=b.emp_id join infirmary_case_master f on a.case_id = f.case_id where  " + category_condition + condition + date_condition + " order by first_name, t_date"; 
         var from_date = n + "-" + month_id + "-" + '01';
         var to_date = n + "-" + month_id + "-" + '31'; 
          
          console.log(from_date);
         var qry=`select a.category_id,category_name, staff_id, concat(first_name,' ',middle_name,' ',last_name)as staff_name,
                   date_format(treatment_date,'%d/%m/%Y') as treatment_date, treatment_date as t_date
                   from staff_infirmary a
                   join infirmary_category_master b on a.category_id = b.category_id
                   join employee c on a.staff_id = c.emp_id
                   where a.treatment_date between '${from_date}' and '${to_date}' ${condition}
                   order by staff_id, category_name, t_date`;
        console.log(qry);
         connection.query(qry,function(err,result)     {
        if(err){
           console.log("Error reading staff infirmary : %s ",err );
           data.status = 'e';
           console.log("inside else")

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
          console.log("treatment_date")
          console.log(result[i].treatment_date)
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
             if(result.length>0){
                obj['treatment_date'] = prev_treatment_date;
                obj['total'] =total; 
                std.push(obj);
               }
        
            data.staffMonthlyReport = std;
            res.send(JSON.stringify(data))
        }
          
     });
       
  });

});

// staff infirmary cae wise and date wise report 

router.post('/readStaffCaseReport', function(req, res, next) {
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
       user=req.cookies.user
       var data = {}
       //var category_id=-1;
       var category_condition="";
       var date_condition="";
        if(category_id !=-1){
          category_condition =' a.category_id = ' + category_id;
        }
        if(start_date !=''){
          date_condition =` and treatment_date between '${start_date}' and '${end_date}' `;
        }
       var condition = "";

       if(req.cookies.role != 'ADMIN') condition = ` and a.created_by = '${user}' `;

         var qry =`select staff_infirmary_id, a.case_id, a.category_id, b.employee_id, 
         concat(first_name,' ',middle_name,'',last_name) as name, f.case_name,
          date_format(treatment_date,'%d/%m/%Y') as t_date , date_format(treatment_date,'%Y-%m-%d') as treatment_date,
            time_format(time_in, '%H:%i') as time_in, time_format(time_out,'%H:%i') as time_out, treatment
              from staff_infirmary a
              join employee b on a.staff_id=b.emp_id 
              join infirmary_case_master f on a.case_id = f.case_id 
              where  ${category_condition} ${condition} ${date_condition}
               order by first_name, t_date`; 
         connection.query(qry,function(err,result)     {
           console.log(qry);
        if(err){
           console.log("Error reading staff infirmary : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.staffDateWiseCaseReports = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
          
     });
       
  });

});


// staff infirmary health Report

router.post('/read_staff_health_report', function(req, res, next) {
     var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err,connection){
         

       var employee_id = input.employee_id;
       var empID= employee_id.split(',')
      
     var str="";
    for (var i=0; i<empID.length; i++){
      if(i==0){
        str="'" + empID[i] + "'";
      }else{
        str=str + ",'"+ empID[i] + "'"; 
      }
    }
      console.log("empID")
      console.log(employee_id)
  

       var start_date = input.start_date;
      // console.log(start_date)
       var end_date =input.end_date;
     //  console.log(category_id);
       var session_id=req.cookies.session_id
       var user='';
       user=req.cookies.user
       var data = {}
       //var category_id=-1;
       var emp_condition=``;
       var date_condition="";
     //   and ${emp_condition} 
        if(employee_id !='' ){
          emp_condition =` and b.employee_id in (${str}) `;
        }
     /*   if(start_date !=''){
          date_condition =` and treatment_date between '${start_date}' and '${end_date}' `;
        }*/
       var condition = "";

     //  if(req.cookies.role != 'ADMIN') condition = ` and a.created_by = '${user}' `;

         var qry =`select b.emp_id, employee_id, concat(first_name,' ',middle_name,' ',last_name)as name,designation, 
              date_format(checkup_date,'%d/%m/%Y')as checkup_date, checkup_date as c_date,
              date_format(dob,'%d/%m/%Y')as dob, department_name,
              time_format(time_in, '%H:%i') as time_in, time_format(time_out,'%H:%i') as time_out,
              weight, concat(upper_bp,'/',lower_bp,' mmHg')as blood_pressure,bmi,height
              from staff_health a
              join employee b on a.staff_id=b.emp_id
              join department_master d on d.department_id=b.department_id
              left join designation_master c on b.designation_id=c.designation_id
              where checkup_date>= '${start_date}' and checkup_date<='${end_date}' ${emp_condition} 
              order by name, c_date`; 
         connection.query(qry,function(err,result)     {
          console.log(qry);
        if(err){
           console.log("Error reading staff health report : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.staffHealthReports = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
          
     });
       
  });

});

router.get('/read_staff_infirmary/:id', function(req, res, next) {
    req.getConnection(function(err,connection){
       var category_id = req.params.id;
       console.log(category_id);
       var session_id=req.cookies.session_id
       var user='';
       var data = {}
       //var category_id=-1;
       var category_condition="";
        if(category_id !=-1){
          category_condition =` a.category_id = ${category_id} `
        }
         var condition = "";
          user=req.cookies.user
        if(req.cookies.role != 'ADMIN') condition =  ` and a.created_by = '${user}' `

         var qry = `select staff_infirmary_id,  a.case_id,employee_id, staff_id,
           concat(first_name,' ',middle_name,'',last_name) as name, a.category_id, 
           c.case_name, date_format(treatment_date,'%d/%m/%Y') as treatment_date, 
           date_format(treatment_date,'%d/%m/%Y') as t_date,time_format(time_in, '%H:%i') as time_in, 
           time_format(time_out,'%H:%i') as time_out, treatment 
           from staff_infirmary a 
           join employee b on a.staff_id=b.emp_id
            join infirmary_case_master c on a.case_id = c.case_id 
            where ${category_condition} ${condition} 
            order by name`; 
         connection.query(qry,function(err,result)     {
          console.log(qry);
        if(err){
           console.log("Error reading infirmary : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.staffInfirmarys = result;
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

/* Add Staff infiramry  . */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
   var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);
  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            staff_id : input.staff_id,
            case_id    : input.case_id,
            category_id : input.category_id,
            treatment_date : input.treatment_date,
            time_in : input.time_in,
            time_out : input.time_out,
            treatment : input.treatment,
            case_name : input.case_name,
            creation_date    : formatted,
            created_by    : req.cookies.user,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO staff_infirmary set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting case : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.staff_infirmary_id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});



// read Staff Lab test report


router.post('/read_staff_lab_test', function(req, res, next) {
    req.getConnection(function(err,connection){
       var category_id = req.params.id;
       console.log(category_id);
       var session_id=req.cookies.session_id
       var user='';
       var data = {}
       //var category_id=-1;
    /*   var category_condition="";
        if(category_id !=-1){
          category_condition =` a.category_id = ${category_id} `
        }*/
         var condition = "";
          user=req.cookies.user
        if(req.cookies.user != 'ADMIN') condition =  `  a.created_by = '${user}' `

         var qry = `select  lab_id,employee_id, a.emp_id, gender, first_name,middle_name,last_name, heamoglobin,platelet,creatinine,blood_sugar_f,
            blood_sugar_p,triglyceride,total_cholesterol,sgpt,sgot,systolic_bp,diastolic_bp
           from infirmary_lab_test a 
           join employee b on a.emp_id=b.emp_id
            where ${condition} 
            and a.session_id=${session_id}
            order by first_name`; 
          connection.query(qry,function(err,result){
          console.log(qry);
        if(err){
           console.log("Error reading infirmary lab test : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.staffInfirmaryLabTests = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
          
     });
       
  });

});

// Add Staff Lab test

router.post('/add_staff_lab_test_infirmary', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
        var now = new Date();
        var jsonDate = now.toJSON();
        var formatted = new Date(jsonDate);

        var data = {} 

        var values = {
            emp_id : input.emp_id,
            heamoglobin : input.heamoglobin,
            platelet : input.platelet,
            creatinine : input.creatinine,
            blood_sugar_f : input.blood_sugar_f,
            blood_sugar_p : input.blood_sugar_p,
            triglyceride : input.triglyceride,
            total_cholesterol : input.total_cholesterol,
            sgpt : input.sgpt,
            sgot : input.sgot,
            systolic_bp : input.systolic_bp,
            diastolic_bp : input.diastolic_bp,
            creation_date : formatted,
            modification_date : formatted,
            created_by : req.cookies.user,
            modified_by : req.cookies.user,
            session_id : req.cookies.session_id,
        };
        
        var query = connection.query("INSERT INTO infirmary_lab_test set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting Lab test : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              data.lab_id = rows.insertId;
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});


/* Edit lab test. */
router.post('/edit_staff_lab_test_infirmary/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var id = input.id;
   var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);
  req.getConnection(function(err,connection){
        var data = {}
          var now = new Date();
          var jsonDate = now.toJSON();
          var formatted = new Date(jsonDate);
          var values = {
            emp_id : input.emp_id,
            heamoglobin : input.heamoglobin,
            platelet : input.platelet,
            creatinine : input.creatinine,
            blood_sugar_f : input.blood_sugar_f,
            blood_sugar_p : input.blood_sugar_p,
            triglyceride : input.triglyceride,
            total_cholesterol : input.total_cholesterol,
            sgpt : input.sgpt,
            sgot : input.sgot,
            systolic_bp : input.systolic_bp,
            diastolic_bp : input.diastolic_bp,
            modification_date : formatted,
            modified_by : req.cookies.user,
        };
        
        var query = connection.query("UPDATE infirmary_lab_test set ? WHERE lab_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error updating lab test : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.lab_id = id;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

// update staff 


router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var id = input.id;
   var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);
  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            staff_id    : input.staff_id,
            case_id    : input.case_id,
            category_id : input.category_id,
            treatment_date : input.treatment_date,
            time_in : input.time_in,
            time_out : input.time_out,
            treatment : input.treatment,
            case_name : input.case_name,
            modification_date : formatted,
            modified_by : req.cookies.user,
        };
        
        var query = connection.query("UPDATE staff_infirmary set ? WHERE staff_infirmary_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting cases : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              data.staff_infirmary_id = rows.insertId;
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

// delete staff lab test



router.get('/delete_lab_test/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from infirmary_lab_test WHERE lab_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting lab test : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
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

        var query = connection.query("DELETE from staff_infirmary WHERE staff_infirmary_id = ?",[id], function(err, rows)
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
