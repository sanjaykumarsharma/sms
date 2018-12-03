var express = require('express');
var router = express.Router();

/* Read Course listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM activity_category_master',function(err,result)     {
            
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
router.get('/read_activity_event', function(req, res, next) {
  console.log("HERE")

  req.getConnection(function(err,connection){
       
     var data = {}
     var query = connection.query("SELECT * FROM activity_event_master ", function(err, result)     
     {
            
        if(err){
           console.log("Error reading case : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.activity_event = result;

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Items listing. */
router.get('/read_item', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM item_master',function(err,result)     {
            
        if(err){
           console.log("Error reading item : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.items = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Staff listing. */
router.get('/read_staff', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT CONCAT(first_name, " " , last_name) as name, employee_id,emp_id FROM employee',function(err,result)     {
            
        if(err){
          console.log("Error reading staff : %s ",err );
          data.status = 'e';

        }else{
          data.status = 's';
          data.staff = result;
          res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Event listing. */
router.get('/read_event/:category_id', function(req, res, next) {
  var category_id = req.params.category_id;
  console.log("HERE")
  console.log(category_id)

  req.getConnection(function(err,connection){
       
     var data = {}
     var query = connection.query("SELECT * FROM activity_event_master WHERE category_id = ?",[category_id], function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.events = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Activity By Category. */
router.get('/read_activity_by_category/:category_id', function(req, res, next) {
  var category_id = req.params.category_id;
  console.log("HERE")
  console.log(category_id)

  req.getConnection(function(err,connection){
       
     var data = {}
     var values={
        category_id : req.params.category_id,
     };

     var category_condition=""; 
     if(category_id !=-1){

        var category_condition = " where a.category_id = "+ category_id ;
        var condition = "";
        if(req.cookies.role != 'ADMIN')
        condition = " and a.created_by = "+ req.cookies.role; 
         var qry = 'select a.activity_id,session_name, activity_type, ';
          qry = qry + ' date_format(activity_date,"%d/%m/%Y") as activity_date, activity_date as a_date, '; 
          qry = qry + ' d.event_name, organised_by, venue,  result, concat(first_name," ",middle_name," ",last_name)as name, ';
          qry = qry + ' item_taken,result ';
          qry = qry + ' from school_activity a ';
          qry = qry + ' join session_master b on a.session_id=b.session_id ';
          qry = qry + ' join activity_event_master d on a.event_id = d.event_id ';
          qry = qry + ' left join activity_teacher_map e on a.activity_id=e.activity_id ';
          qry = qry + ' left join employee c on e.teacher_id = c.emp_id ';
          qry = qry + category_condition ;
          qry = qry + ' order by a.activity_id ';
          console.log(qry)
       
        
      }else if(category_id ==-1){
        var condition = "";
        if(req.cookies.role != 'ADMIN') 
        condition = " where a.created_by = "+ req.cookies.role;
        var qry = 'select a.activity_id, session_name, activity_type, ';
          qry = qry + ' date_format(activity_date,"%d/%m/%Y") as activity_date, activity_date as a_date, '; 
          qry = qry + ' d.event_name, organised_by, venue,  result, concat(first_name," ",middle_name," ",last_name)as name, ';
          qry = qry + ' item_taken,result ';
          qry = qry + ' from school_activity a ';
          qry = qry + ' join session_master b on a.session_id=b.session_id ';
          qry = qry + ' join activity_event_master d on a.event_id = d.event_id ';
          qry = qry + ' left join activity_teacher_map e on a.activity_id=e.activity_id ';
          qry = qry + ' left join employee c on e.teacher_id = c.emp_id ';
          qry = qry + condition ;
          qry = qry + ' order by a.activity_id ';
     }

        connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading activities : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            var prev_activity_id="";
            var obj_name="";
            var prev_name="";
            var std = Array();
        for (var i = 0; i < result.length; i++) {
        if(result[i].activity_id !=prev_activity_id){//check for different activity_id
             if(prev_activity_id == ""){// first time only
                var obj = {};
                obj['activity_id']=result[i].activity_id;
                obj['session_name']=result[i].session_name;
                obj['activity_type']=result[i].activity_type;
                obj['activity_date']=result[i].activity_date;             
                obj['event_name']=result[i].event_name;
                obj['organised_by']=result[i].organised_by;
                obj['venue']=result[i].venue;
                obj['item_taken']=result[i].item_taken;
                obj['result']=result[i].result;
                prev_activity_id =result[i].activity_id;
                prev_name = result[i].name;
                // console.log(obj)
             }else{
                obj['name'] = prev_name;
                std.push(obj);
                var obj = {};
                obj['activity_id']=result[i].activity_id;
                obj['session_name']=result[i].session_name;
                obj['activity_type']=result[i].activity_type;
                obj['activity_date']=result[i].activity_date;             
                obj['event_name']=result[i].event_name;
                obj['organised_by']=result[i].organised_by;
                obj['venue']=result[i].venue;
                obj['item_taken']=result[i].item_taken;
                obj['result']=result[i].result;
                prev_activity_id =result[i].activity_id;
                prev_name = result[i].name;
                // console.log(obj)
             }
             
        }else{
             prev_name = prev_name + " ," + result[i].name;
             prev_activity_id =result[i].activity_id;
        }
        
      }
            obj['name'] = prev_name; 
            std.push(obj);
            console.log(std)
            data.activities = std;

            res.send(JSON.stringify(data))
        }


     
     });
       
  });

});

/* read update Data  */
router.get('/read_update_activity/:activity_id', function(req, res, next) {
  var activity_id = req.params.activity_id;
  console.log("HERE")
  console.log(activity_id)

  req.getConnection(function(err,connection){
       
     var data = {}

      var qry = 'select activity_type, category_id, event_id,';
          qry = qry + ' venue, item_taken, organised_by, result,'
          qry = qry + ' date_format(activity_date,"%Y-%m-%d") as activity_date, remarks, '; 
          qry = qry + ' time_format(time_in, "%H:%i") as time_in, ';
          qry = qry + ' time_format(time_out, "%H:%i") as time_out ';
          qry = qry + ' from school_activity ';
          qry = qry + ' WHERE activity_id = ? ';

          connection.query(qry,[activity_id], function(err, result)     
      {
            
        if(err){
           console.log("Error reading activity : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.update_activity = result;
            console.log("*/*/*/*/*/");
            console.log(result)
           //connection.end()

        }

        //read for employee

        var query = connection.query(" select teacher_id from activity_teacher_map WHERE activity_id = ?",[activity_id], function(err, result)
        {
 
         if(err){
          console.log("Error reading employees for activity : %s ",err );
         }else{
            data.status = 's';
            data.update_employee_activity = result;

         }

         //read for readStaffParticipant
         var techer_in_charge =''
        var query = connection.query(" select teacher_incharge from school_activity WHERE activity_id = ?",[activity_id], function(err, result)
        {
 
         if(err){
          console.log("Error reading teacher_incharge for activity : %s ",err );
         }else{
            data.status = 's';
            techer_in_charge =  result;
            console.log('techer_in_charge')
            console.log(techer_in_charge)
            
         }
          var value="";
            if( techer_in_charge != "" || techer_in_charge !=null){

               var qry = 'select concat(first_name," " ,middle_name," ",last_name)as name ';
               qry = qry + ' from employee ';
               qry = qry + ' WHERE emp_id in ("'+ techer_in_charge +'")';
               console.log(qry)
                connection.query(qry, function(err, result)     {

                 //data.update_employee_activity = result;
                 console.log('result')
                 console.log(result)
                 for (var i = 0; i < result.length; i++) {

                   value=  name+ "," +result[i].name;
              
                 }
                   
                   console.log(value)
                   data.values = value;
                   res.send(JSON.stringify(data))
              });
            }
         
        });
        
         
      });

     
    });
       
  });

});

/* Add Activity. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log(input.emp_id)
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  var data = {} 

     var activity_values = {
          activity_type    : input.activity_type,
          activity_date : input.activity_date,
          category_id : input.category_id,
          event_id : input.event_id,
          organised_by : input.organised_by,
          venue : input.venue,
          item_taken : input.item_taken,
          time_in : input.time_in,
          time_out : input.time_out,
          remarks : input.remarks,
          result : input.result,
            
        };
    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        connection.query('INSERT INTO school_activity set ? ', activity_values, function (error, rows) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          var activity_id = rows.insertId;
          var teacher_id = input.emp_id;

         //**********insert into activity_teacher_map  ***************************
          var values = [];
          for(i=0;i<teacher_id.length;i++){
            values.push([activity_id,teacher_id[i]])
          };
          console.log(values)
          var sql = "insert into activity_teacher_map(activity_id,teacher_id) VALUES ?";
          connection.query(sql, [values], function(error, rows)
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
              console.log(data);
              res.send(JSON.stringify(data))
            });
          });
        });
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
            events    : input.events,
            category_id : input.category_id,
        };
        
        var query = connection.query("UPDATE event set ? WHERE id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting courses : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.id = rows.insertId;
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

        var query = connection.query("DELETE from event WHERE id = ?",[id], function(err, rows)
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
/*****************************************************students************************************************/

/* Read Students listing. */

router.get('/students/:activity_id/:standard_id/:section_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select a.student_id, concat(first_name,' ',middle_name,' ',last_name) as student_name,
                enroll_number,roll_number
                from student_master a
                join student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${req.cookies.session_id})
                join section_master c on b.section_id = c.section_id
                where c.standard_id = ${req.params.standard_id}        
                and c.section_id = ${req.params.section_id}
                and b.session_id = ${req.cookies.session_id}
                and (a.withdraw='N' || a.withdraw_session > ${req.cookies.session_id})
                and a.student_id not in (select student_id from activity_participant_map  where activity_id=${req.params.activity_id})
                order by first_name ,roll_number`;

     console.log(qry)
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Free students : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.status = 's';
            data.freeStudents = result;
        }
     
     });

     var qry = `select a.student_id, concat(first_name,' ',middle_name,' ',last_name) as student_name,
                enroll_number,roll_number
                from student_master a
                join student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${req.cookies.session_id})
                join section_master c on b.section_id = c.section_id
                where c.standard_id = ${req.params.standard_id}         
                and c.section_id = ${req.params.section_id}
                and b.session_id = ${req.cookies.session_id}
                and (a.withdraw='N' || a.withdraw_session > ${req.cookies.session_id})
                and a.student_id in (select student_id from activity_participant_map  where activity_id=${req.params.activity_id})
                order by first_name,roll_number`;
     console.log(qry)
     connection.query(qry,[req.params.id],function(err,result)     {
            
        if(err){
           console.log("Error reading Assigned students : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.assignedStudents = result;
            res.send(data)
        }
     
     });
       
  });

});

/*Assign Students*/

router.post('/assign_students', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  var creation_date = formatted;
  var modified_by=req.cookies.role;

  req.getConnection(function(err,connection){
    var data = {}
    var activity_id = input.activity_id;
    var values = [];
    for(i=0;i<input.students.length;i++){
      values.push([activity_id,input.students[i].student_id,creation_date,modified_by])
    };
    console.log(values)
    var sql = "insert into activity_participant_map(activity_id,student_id,creation_date,modified_by) VALUES ?";
    console.log(sql);
    connection.query(sql,[values], function(err, rows)
    {

      if(err){
       console.log("Error inserting student group map : %s ",err );
       data.status = 'e';
       data.error = err
       data.messaage = err.sqlMessage
      }else{
        data.status = 's';
        res.send(data)
      }
    });
  });
});

// free students
router.post('/free_up_student', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
    var data = {}
      
    var activity_id = input.activity_id;
    var values = [];
    for(i=0;i<input.students.length;i++){
      values.push([activity_id,input.students[i].student_id])
    };
    console.log(values)     

    var sql = `delete from activity_participant_map where activity_id= ${activity_id} and student_id in (${values}) `;
      console.log(sql);

      connection.query(sql, function(err, rows)
      {

        if(err){
          console.log("Error in free students : %s ",err );
          data.status = 'e';
          data.error = err
          data.messaage = err.sqlMessage
        }else{
          data.status = 's';
          res.send(data)
        }
        
      });


   });

});

module.exports = router;
