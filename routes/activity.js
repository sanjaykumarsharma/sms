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
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.staff = result;
           //connection.end()

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
            console.log("qqqqqqqqqqqqqqqqqqqqqqq");
            console.log(data.update_employee_activity);

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

/* Add Course listing. */
router.post('/add', function(obj, res, next) {

  var input = JSON.parse(JSON.stringify(obj.body));

  obj.getConnection(function(err,connection){
        var data = {}

        var values = {

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
        
        var query = connection.query("INSERT INTO school_activity set ? ",values, function(err, rows)
        {
 
         if(err){
          console.log("Error inserting Activity : %s ",err );
          data.status = 'e';

        }else{
           data.status = 's';
           data.id = rows.insertId;
           
        }

        var values = [];
        for (var i = 0; i < input.emp_id.length; i++) {
          var obj = [];
          obj.push(data.id);
          obj.push(input.emp_id[i]);

          values.push(obj);
        }
        console.log(values)
        var sql = "insert into activity_teacher_map(activity_id,teacher_id) VALUES ?";
        var query = connection.query(sql,[values], function(err, rows)
          {
     
             if(err){
              console.log("Error inserting activity_teacher_map : %s ",err );
             }else{
                 res.send(JSON.stringify(data))
             }
            
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

module.exports = router;
