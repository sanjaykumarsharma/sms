var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var download = require('download-file')

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
  var user= req.cookies.user;
  console.log(user);

  req.getConnection(function(err,connection){
       
     var data = {}
     var values={
        category_id : req.params.category_id,
     };

     var category_condition=""; 
     if(category_id !=-1){

        var category_condition = " where a.category_id = "+ category_id ;
        var condition = "";
        var user_condition = "";
        if(req.cookies.role != 'ADMIN')
        condition = " and a.created_by = "+ req.cookies.role; 
      
        if(req.cookies.role != 'ADMIN')
        var user_condition =` and a.created_by =  '${user}' `;

        var qry =`select a.activity_id,session_name, activity_type, 
                  date_format(activity_date,"%d/%m/%Y") as activity_date, activity_date as a_date, 
                  d.event_name, organised_by, venue,  result, concat(first_name," ",middle_name," ",last_name)as name, 
                  item_taken,result 
                  from school_activity a 
                  join session_master b on a.session_id=b.session_id 
                  join activity_event_master d on a.event_id = d.event_id 
                  left join activity_teacher_map e on a.activity_id=e.activity_id 
                  left join employee c on e.teacher_id = c.emp_id 
                  ${category_condition} ${user_condition}
                  order by a.activity_id `;
        console.log(qry)
       
        
      }else if(category_id ==-1){
        var condition = "";
        var user_condition = "";
        /*if(req.cookies.role != 'ADMIN') 
        condition = " where a.created_by = "+ req.cookies.role;*/
        if(req.cookies.role != 'ADMIN')
        var user_condition =` where a.created_by =  '${user}' `;

        var qry =`select a.activity_id, session_name, activity_type,
                  date_format(activity_date,"%d/%m/%Y") as activity_date, activity_date as a_date, 
                  d.event_name, organised_by, venue,  result, concat(first_name," ",middle_name," ",last_name)as name, 
                  item_taken,result
                  from school_activity a 
                  join session_master b on a.session_id=b.session_id 
                  join activity_event_master d on a.event_id = d.event_id 
                  left join activity_teacher_map e on a.activity_id=e.activity_id 
                  left join employee c on e.teacher_id = c.emp_id 
                  ${user_condition}
                  order by a.activity_id `;
        }
        console.log(qry)

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

/* Read Print Event Detail. */
router.get('/read_print_event_detail/:activity_id', function(req, res, next) {
  var activity_id = req.params.activity_id;
  console.log("HERE")
  console.log(activity_id)
  var data = {}

  req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        var qry_one=`select date_format(activity_date,'%d/%m/%Y') as activity_date,
                     i.event_name, organised_by, venue, item_taken, time_format(time_in, '%H:%i') as time_in,
                     time_format(time_out, '%H:%i') as time_out, remarks, result, 
                     concat(c.first_name,' ',c.middle_name,' ',c.last_name)as participant_name, enroll_number,
                     c.mobile, concat(standard,' ',section)as standard
                     from school_activity a
                     left join activity_participant_map b on a.activity_id = b.activity_id
                     left join student_master c on (b.student_id = c.student_id and a.session_id = c.current_session_id)
                     left join student_current_standing f on (b.student_id = f.student_id and a.session_id = f.session_id)
                     left join section_master g on f.section_id = g.section_id
                     left join standard_master h on g.standard_id = h.standard_id
                     left join session_master d on a.session_id=d.session_id
                     left join activity_event_master i on a.event_id = i.event_id
                     where a.activity_id = ${activity_id}
                     order by activity_date`;

        var qry_two=`select a.activity_id,
                     concat(first_name,' ',middle_name,' ',last_name)as teacher_name
                     from school_activity a
                     left join activity_teacher_map b on a.activity_id = b.activity_id
                     join employee c on b.teacher_id=c.emp_id
                     where b.activity_id = ${activity_id}
                     order by a.activity_id`;
        connection.query(qry_two, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }

          var teacher="";
          var count=0;
          result.map(c=>{
            if(count == 0){
              teacher = c.teacher_name
              count =1;
            }else{
              teacher = teacher +","+c.teacher_name
            }
          }) 
          console.log(teacher);

        connection.query(qry_one, function(error, rows)
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
            data.teacher = teacher;
            data.print_event_detail = rows;
            console.log('success!');
            console.log(data);
            res.send(JSON.stringify(data))

          });
        });
      });//end of ection con
    });
  });
});

router.get('/csv_export_activity/:category_id', function(req, res, next) {
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

           var qry = `select a.activity_id, activity_type,
                      date_format(activity_date,"%d/%m/%Y") as activity_date,
                      d.event_name, organised_by, venue, concat(first_name," ",middle_name," ",last_name)as name,
                      item_taken,result
                      from school_activity a 
                      join session_master b on a.session_id=b.session_id 
                      join activity_event_master d on a.event_id = d.event_id 
                      left join activity_teacher_map e on a.activity_id=e.activity_id 
                      left join employee c on e.teacher_id = c.emp_id
                      ${category_condition}
                      order by a.activity_id `;
            console.log(qry) 
          }else if(category_id ==-1){
            var condition = "";
          if(req.cookies.role != 'ADMIN') 
          condition = " where a.created_by = "+ req.cookies.role;
          var qry = `select a.activity_id, activity_type,
                     date_format(activity_date,"%d/%m/%Y") as activity_date,
                     d.event_name, organised_by, venue, concat(first_name," ",middle_name," ",last_name)as name,
                     item_taken,result
                     from school_activity a 
                     join session_master b on a.session_id=b.session_id 
                     join activity_event_master d on a.event_id = d.event_id 
                     left join activity_teacher_map e on a.activity_id=e.activity_id
                     left join employee c on e.teacher_id = c.emp_id
                     ${condition}
                     order by a.activity_id `;
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
                    obj['Activity Type']=result[i].activity_type;
                    obj['Activity Date']=result[i].activity_date;             
                    obj['Event']=result[i].event_name;
                    obj['Organised By']=result[i].organised_by;
                    obj['Venue']=result[i].venue;
                    obj['Item Taken']=result[i].item_taken;
                    obj['Result']=result[i].result;
                    prev_activity_id =result[i].activity_id;
                    prev_name = result[i].name;
                    // console.log(obj)
                 }else{
                    obj['Teacher Name'] = prev_name;
                    std.push(obj);
                    var obj = {};
                    obj['activity_id']=result[i].activity_id;
                    obj['Activity Type']=result[i].activity_type;
                    obj['Activity Date']=result[i].activity_date;             
                    obj['Event']=result[i].event_name;
                    obj['Organised By']=result[i].organised_by;
                    obj['Venue']=result[i].venue;
                    obj['Item Taken']=result[i].item_taken;
                    obj['Result']=result[i].result;
                    prev_activity_id =result[i].activity_id;
                    prev_name = result[i].name;
                    // console.log(obj)
                 }
                 
                }else{
                 prev_name = prev_name + " ," + result[i].name;
                 prev_activity_id =result[i].activity_id;
                }
        
              }
                obj['Teacher Name'] = prev_name; 
                std.push(obj);
                console.log(std)
                data.activities = std;

                const fields = ['Activity Date','Event', 'Activity Type','Organised By','Venue','Teacher Name','Result'];
                const json2csvParser = new Json2csvParser({ fields });
                const csv = json2csvParser.parse(std);

                var path='./public/csv/Activity.csv'; 
                fs.writeFile(path, csv, function(err,data) {
                  if (err) {throw err;}
                  else{ 
                    res.send(data)
                    var url='http://localhost:4000/csv/Activity.csv';
                    var open = require("open","");
                    open(url);  
                  }
                });
              }    
            });    
          });
        });

/* read update Data  */
router.get('/read_update_activity/:activity_id', function(req, res, next) {
  var activity_id = req.params.activity_id;
  console.log("HERE")
  console.log(activity_id)
  var data = {};
  var techer_in_charge ='';
 

  req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        var qry =`select activity_type, category_id, event_id,
                venue, item_taken, organised_by, result,
                date_format(activity_date,"%d/%m/%Y") as activity_date, remarks,
                time_format(time_in, "%H:%i") as time_in,
                time_format(time_out, "%H:%i") as time_out 
                from school_activity
                WHERE activity_id = ${activity_id} `;

        connection.query(qry, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          data.update_activity = result;
          console.log(result)

        connection.query(`select teacher_id from activity_teacher_map WHERE activity_id = ${activity_id}`, function(error, result)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
            console.log(result)
            
            for(i=0;i<result.length;i++){
             if(techer_in_charge==''){
                techer_in_charge = result[i].teacher_id;
             }else{
                 techer_in_charge = techer_in_charge+','+result[i].teacher_id;
             }

            };
            console.log(techer_in_charge)
            var qry =`select concat(first_name," ",middle_name," ",last_name)as name
                    from employee
                    WHERE emp_id in (${techer_in_charge}) `;
          console.log(qry);
          var value="";

          if(techer_in_charge == ""){
              data.status = 's';
              data.techer_in_charge = techer_in_charge;
              console.log(data);
              res.send(JSON.stringify(data))
            }else{
              connection.query(qry, function(error, rows)
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
                  for (var i = 0; i < rows.length; i++) {
                    value=  value+ "," +rows[i].name;
                  }
                  console.log('success!');
                  data.employees = value;
                  data.techer_in_charge = techer_in_charge;
                  console.log(data);
                  res.send(JSON.stringify(data))

                });
              });
            }
        });
      });//end of ection con
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
  var session_id=req.cookies.session_id;
  var created_by=req.cookies.user;
  var modified_by=req.cookies.user;

  var data = {} 

     var activity_values = {
          session_id       : session_id,
          activity_type    : input.activity_type,
          activity_date : input.activity_date,
          category_id : input.category_id,
          event_id : input.event_id,
          event_name : input.event_name,
          organised_by : input.organised_by,
          venue : input.venue,
          item_taken : input.item_taken,
          time_in : input.time_in,
          time_out : input.time_out,
          remarks : input.remarks,
          result : input.result,
          created_by : created_by,
          modified_by : modified_by,
          creation_date : formatted,
            
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


/* Edit Activity. */
router.post('/edit_activity/:activity_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var activity_id = req.params.activity_id;
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  var modified_by=req.cookies.user;
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
          modified_by : modified_by,
            
        };

  req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        connection.query('UPDATE school_activity set ? WHERE activity_id = ?', [activity_values, activity_id], function (error, rows) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }

        //**********Update activity_teacher Map  ***************************
        

        connection.query(`delete from activity_teacher_map WHERE activity_id = ${activity_id}`, function(error, rows)
          {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
          
          });
        var teacher_id = input.emp_id;
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
              console.log('success!');
              console.log(data);
              res.send(JSON.stringify(data))

            });
          });
        });//end of ection con
      });
    });

});

/* Delete Activity */
router.get('/delete_activity/:activity_id', function(req, res, next) {

  var activity_id = req.params.activity_id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("delete from school_activity where activity_id = ?",[activity_id], function(err, rows)
        {
          if(err){
           console.log("Error deleting Activity : %s ",err );
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
  var modified_by=req.cookies.user;

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
