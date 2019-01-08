var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var download = require('download-file')

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

/* Read Event listing. */
router.get('/read_event', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry =`SELECT e.event_id, e.category_id, event_name, category_name FROM activity_event_master e
               JOIN activity_category_master c ON e.category_id = c.category_id `; 
     connection.query(qry,function(err,result)     {
            
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

router.get('/read_activity_event_wise_graph_report/:activity_type/:session_id', function(req, res, next) {
  var activity_type = req.params.activity_type;
  var session_id = req.params.session_id;
  console.log("HERE")

  req.getConnection(function(err,connection){
       
     var data = {}
     var condition = "";
     var created_by = req.cookies.user
     var condition = "";
     var activityCondition="";
     /*if(category_id !=-1){
        category_condition = ` and a.category_id =  ${category_id} ` ;
      }*/
      if(activity_type=='Both') activityCondition = "";

      if(activity_type=='Intra-School') activityCondition = `and activity_type = '${activity_type}'`;

      if(activity_type=='Inter-School') activityCondition = `and activity_type= '${activity_type}'`;

      if(req.cookies.role != 'ADMIN') condition = `and a.created_by = '${created_by}'`;

      var qry =`select a.category_id, category_name, count(*) as total
                from school_activity a
                join activity_category_master b on a.category_id = b.category_id
                where session_id=${session_id}
                ${activityCondition} ${condition}
                group by category_name `;

     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
          data.status = 's';
          data.activity_event_wise_graph_report = result;
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

/* Read Activity Date Wise CSV */
router.get('/csv_activity_event_wise_graph_report/:activity_type/:session_id', function(req, res, next) {
  var activity_type = req.params.activity_type;
  var session_id = req.params.session_id;
  console.log("HERE")

  req.getConnection(function(err,connection){
       
     var data = {}
     var condition = "";
     var created_by = req.cookies.user
     var condition = "";
     var activityCondition="";
     /*if(category_id !=-1){
        category_condition = ` and a.category_id =  ${category_id} ` ;
      }*/
      if(activity_type=='Both') activityCondition = "";

      if(activity_type=='Intra-School') activityCondition = `and activity_type = '${activity_type}'`;

      if(activity_type=='Inter-School') activityCondition = `and activity_type= '${activity_type}'`;

      if(req.cookies.role != 'ADMIN') condition = `and a.created_by = '${created_by}'`;
     var qry = `select a.category_id, category_name as 'Category', count(*) as total
                from school_activity a
                join activity_category_master b on a.category_id = b.category_id
                where session_id=${session_id}
                ${activityCondition} ${condition}
                group by category_name `;

     connection.query(qry, function(err, result)     
     {     
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';
        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.activity_event_wise_graph_report = result;
           //connection.end()
           var grand_total=0;
            for (var i = result.length - 1; i >= 0; i--) {
              grand_total = grand_total+result[i].total;
            }
              data.grand_total = grand_total;
             
              const fields = ['Category','total'];
              const json2csvParser = new Json2csvParser({ fields });
              const csv = json2csvParser.parse(result);
                var path='./public/csv/EventGraphReport.csv'; 
                fs.writeFile(path, csv, function(err,data) {
                  if (err) {throw err;}
                  else{ 
                    res.send(data)
                    var url='http://localhost:4000/csv/EventGraphReport.csv';
                    var open = require("open","");
                    open(url);  
                  }
                });
        } 
     });
       
  });

});

/* Read Activity Date Wise */

router.get('/read_activity_date_wise_report/:start_date/:end_date/:activity_type', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;
  var activity_type = req.params.activity_type;
  console.log(start_date)
  console.log("HERE")

  req.getConnection(function(err,connection){
    var data = []
     var created_by = req.cookies.user
     var session_id = req.cookies.session_id
     console.log(session_id)
     var condition = "";
     var activityCondition="";
     var obj = {};

      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        if(activity_type=='Both') activityCondition = "";

        if(activity_type=='Intra-School') activityCondition = `and a.activity_type = '${activity_type}'`;
        if(activity_type=='Inter-School') activityCondition = `and a.activity_type= '${activity_type}'`;

        if(req.cookies.role != 'ADMIN') condition = `and a.created_by = '${created_by}'`;

        var qry =` select date_format(activity_date,'%d/%m/%Y') as activity_date,
                   a.activity_type, activity_date as a_date,a.activity_id,
                   g.event_name, organised_by, venue, result,
                   concat(d.first_name,' ',d.middle_name,' ',d.last_name)as participant_name,b.student_id
                   from school_activity a
                   left join activity_participant_map b on a.activity_id = b.activity_id
                   left join student_master d on (b.student_id = d.student_id and d.current_session_id = ${session_id})
                   join session_master e on a.session_id=e.session_id
                   join activity_event_master g on a.event_id = g.event_id
                   where activity_date between '${start_date}' and '${end_date}'
                   ${activityCondition} ${condition}
                   order by a.activity_id,b.student_id `;
        console.log(qry);

        var qry_one = `select activity_id,GROUP_CONCAT(teacher_name1) as teacher_name from 
                      (select a.activity_id,a.session_id,
                      concat(first_name,' ',middle_name,' ',last_name)as teacher_name1
                      from school_activity a
                      left join activity_teacher_map b on a.activity_id = b.activity_id
                      join employee c on b.teacher_id=c.emp_id
                      where a.session_id = ${session_id} ) a
                      GROUP BY activity_id, teacher_name1`;

        var teacher_name = '';
        var participant_name = '';

        connection.query(qry_one, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          teacher_name = result;           
          console.log(teacher_name);

        connection.query(qry, function(error, result)
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

            var prev_activity_id = '';

            var prev_participant_name = '';

            var prev_teacher_name='';

            var prev_participant_id=0;

            var activity_id = 0;
            var error = 1;

            console.log(result)

            for(var i = 0; i < result.length; i++){
              var error = 0;

              if(result[i].activity_id != prev_activity_id){// distinct event name

                if(prev_activity_id ==""){    // loop runs first time

                    var obj = {};

                    obj['activity_date'] = result[i].activity_date;

                    obj['event_name'] =  result[i].event_name;

                    obj['activity_type'] =  result[i].activity_type;

                    obj['organised_by'] = result[i].organised_by;

                    obj['venue'] = result[i].venue;

                    obj['result'] = result[i].result;

                    prev_activity_id= result[i].activity_id;

                    prev_participant_name = result[i].participant_name;

                    console.log("Comming")
                    var temp_prev_teacher_name = teacher_name.filter(c=>{
                      return result[i].activity_id==c.activity_id
                    })

                    if(temp_prev_teacher_name.length>0){
                      prev_teacher_name = temp_prev_teacher_name[0].teacher_name;
                    }else{
                      prev_teacher_name = ''
                    }

                    console.log(prev_teacher_name)

                }else{
                  
                  obj['participant_name'] = result[i].participant_name;

                  obj['teacher_name'] = prev_teacher_name;

                  data.push(obj);

                  var obj = {};              

                  obj['activity_date'] = result[i].activity_date;

                  obj['event_name'] =  result[i].event_name;

                  obj['activity_type'] =  result[i].activity_type;

                  obj['organised_by'] = result[i].organised_by;

                  obj['venue'] = result[i].venue;             

                  obj['result'] = result[i].result;

                  prev_activity_id=result[i].activity_id;

                  prev_participant_name = result[i].participant_name;
                  var temp_prev_teacher_name = teacher_name.filter(c=>{
                    return result[i].activity_id==c.activity_id
                  })

                  if(temp_prev_teacher_name.length>0){
                    prev_teacher_name = temp_prev_teacher_name[0].teacher_name;
                  }else{
                    prev_teacher_name = ''
                  }
                }

              }else{
                if(result[i].participant_name != null){
                  prev_participant_name = prev_participant_name + ", " + result[i].participant_name;
                }
                prev_activity_id=result[i].activity_id; 

                }
              }
              if(error ==0){

                obj['participant_name'] = prev_participant_name;

                obj['teacher_name'] = prev_teacher_name;
                data.push(obj);
              }
                var r = {}
                r.status = 's';
                r.activity_date_wise_report = data 
                console.log(data);
                res.send(r)

              });
          
            });

          });//end of ection con
        });
      });
    });

/* Read Activity Date Wise CSV */
router.get('/csv_activity_date_wise_report/:start_date/:end_date/:activity_type', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;
  var activity_type = req.params.activity_type;
  console.log(start_date)
  console.log("HERE")

  req.getConnection(function(err,connection){
    var data = []
     var created_by = req.cookies.user
     var session_id = req.cookies.session_id
     console.log(session_id)
     var condition = "";
     var activityCondition="";
     var obj = {};


      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        if(activity_type=='Both') activityCondition = "";

        if(activity_type=='Intra-School') activityCondition = `and a.activity_type = '${activity_type}'`;

        if(activity_type=='Inter-School') activityCondition = `and a.activity_type= '${activity_type}'`;
        
        if(req.cookies.role != 'ADMIN') condition = `and a.created_by = '${created_by}'`;

        var qry =` select date_format(activity_date,'%d/%m/%Y') as activity_date,
                   a.activity_type, activity_date as a_date,a.activity_id,
                   g.event_name, organised_by, venue, result,
                   concat(d.first_name,' ',d.middle_name,' ',d.last_name)as participant_name,b.student_id
                   from school_activity a
                   left join activity_participant_map b on a.activity_id = b.activity_id
                   left join student_master d on (b.student_id = d.student_id and d.current_session_id = ${session_id})
                   join session_master e on a.session_id=e.session_id
                   join activity_event_master g on a.event_id = g.event_id
                   where activity_date between '${start_date}' and '${end_date}'
                   ${activityCondition} ${condition}
                   order by a.activity_id,b.student_id `;
        console.log(qry);

        var qry_one = `select activity_id,GROUP_CONCAT(teacher_name1) as teacher_name from 
                      (select a.activity_id,a.session_id,
                      concat(first_name,' ',middle_name,' ',last_name)as teacher_name1
                      from school_activity a
                      left join activity_teacher_map b on a.activity_id = b.activity_id
                      join employee c on b.teacher_id=c.emp_id
                      where a.session_id = ${session_id} ) a
                      GROUP BY activity_id, teacher_name1`;

        var teacher_name = '';
        var participant_name = '';

        connection.query(qry_one, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          teacher_name = result;           
          console.log(teacher_name);

        connection.query(qry, function(error, result)
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

            var prev_activity_id = '';

            var prev_participant_name = '';

            var prev_teacher_name='';

            var prev_participant_id=0;

            var activity_id = 0;
            var error = 1;

            console.log(result)

            for(var i = 0; i < result.length; i++){
              var error = 0;

              if(result[i].activity_id != prev_activity_id){// distinct event name

                if(prev_activity_id ==""){    // loop runs first time

                    var obj = {};

                    obj['Date'] = result[i].activity_date;

                    obj['Event'] =  result[i].event_name;

                    obj['Type'] =  result[i].activity_type;

                    obj['Organised By'] = result[i].organised_by;

                    obj['Venue'] = result[i].venue;

                    obj['Result'] = result[i].result;

                    prev_activity_id= result[i].activity_id;

                    prev_participant_name = result[i].participant_name;

                    console.log("Comming")
                    var temp_prev_teacher_name = teacher_name.filter(c=>{
                      return result[i].activity_id==c.activity_id
                    })

                    if(temp_prev_teacher_name.length>0){
                      prev_teacher_name = temp_prev_teacher_name[0].teacher_name;
                    }else{
                      prev_teacher_name = ''
                    }

                    console.log(prev_teacher_name)

                }else{
                  
                  obj['Participant'] = result[i].participant_name;

                  obj['Teacher Incharge'] = prev_teacher_name;

                  data.push(obj);

                  var obj = {};              

                  obj['Date'] = result[i].activity_date;

                  obj['Event'] =  result[i].event_name;

                  obj['Type'] =  result[i].activity_type;

                  obj['Organised By'] = result[i].organised_by;

                  obj['Venue'] = result[i].venue;             

                  obj['Result'] = result[i].result;

                  prev_activity_id=result[i].activity_id;

                  prev_participant_name = result[i].participant_name;
                  var temp_prev_teacher_name = teacher_name.filter(c=>{
                    return result[i].activity_id==c.activity_id
                  })

                  if(temp_prev_teacher_name.length>0){
                    prev_teacher_name = temp_prev_teacher_name[0].teacher_name;
                  }else{
                    prev_teacher_name = ''
                  }
                }

              }else{
                if(result[i].participant_name != null){
                  prev_participant_name = prev_participant_name + ", " + result[i].participant_name;
                }
                prev_activity_id=result[i].activity_id; 

                }
              }
              if(error ==0){

                obj['Participant'] = prev_participant_name;

                obj['Teacher Incharge'] = prev_teacher_name;
                data.push(obj);
              }
              const fields = ['Date','Type','Event','Organised By','Venue','Participant','Teacher Name','Result'];
                const json2csvParser = new Json2csvParser({ fields });
                const csv = json2csvParser.parse(data);

                var path='./public/csv/Month Wise Activity.csv'; 
                fs.writeFile(path, csv, function(err,data) {
                  if (err) {throw err;}
                  else{ 
                    res.send(data)
                    var url='http://localhost:4000/csv/Month Wise Activity.csv';
                    var open = require("open","");
                    open(url);  
                  }
                });

              });
          
            });

          });//end of ection con
        });
      });
    });


/* Read Activity Session Wise */

router.get('/read_activity_session_wise_report/:activity_type/:session_id', function(req, res, next) {
  
  var activity_type = req.params.activity_type;
  var selected_session_id = req.params.session_id;
  console.log("HERE")

  req.getConnection(function(err,connection){
    var data = []
    var created_by = req.cookies.user
    var session_id = req.cookies.session_id
    console.log(session_id)
    var condition = "";
    var activityCondition="";
    var obj = {};

      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        if(activity_type=='Both') activityCondition = "";

        if(activity_type=='Intra-School') activityCondition = `and a.activity_type = '${activity_type}'`;

        if(activity_type=='Inter-School') activityCondition = `and a.activity_type= '${activity_type}'`;

        if(req.cookies.role != 'ADMIN') condition = `and a.created_by = '${created_by}'`;

        var qry =` select date_format(activity_date,'%d/%m/%Y') as activity_date, activity_date as a_date,

                    a.activity_id, f.event_name, organised_by, venue, result,a.activity_type, 

                    concat(c.first_name,' ',c.middle_name,' ',c.last_name)as participant_name

                    from school_activity a

                    left join activity_participant_map b on a.activity_id = b.activity_id

                    left join student_master c on (b.student_id = c.student_id and c.current_session_id = ${session_id})

                    join activity_event_master f on a.event_id = f.event_id

                    where session_id = ${selected_session_id}

                    ${activityCondition} ${condition}

                    order by a_date `;

        var qry_one = `select activity_id,GROUP_CONCAT(teacher_name1) as teacher_name from 
                      (
                      select a.activity_id,a.session_id,

                      concat(first_name,' ',middle_name,' ',last_name)as teacher_name1

                      from school_activity a

                      left join activity_teacher_map b on a.activity_id = b.activity_id

                      join employee c on b.teacher_id=c.emp_id

                      where a.session_id = ${selected_session_id}
                      ) a

                  GROUP BY activity_id, teacher_name1`;

        var teacher_name = ''; 

        connection.query(qry_one, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          teacher_name = result;
           //connection.end()
           console.log(teacher_name);

        connection.query(qry, function(error, result)
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
              var prev_activity_id = "";
              var prev_participant_name = "";
              var prev_teacher_name="";
              var prev_participant_id=0;
              var activity_id = 0;
              var error = 1;
              console.log(result)

            for(var i = 0; i < result.length; i++){
              var error = 0;
              if(result[i].activity_id != prev_activity_id){// distinct event name

                if(prev_activity_id ==""){    // loop runs first time

                    var obj = {};

                    obj['activity_date'] = result[i].activity_date;

                    obj['event_name'] =  result[i].event_name;

                    obj['activity_type'] =  result[i].activity_type;

                    obj['organised_by'] = result[i].organised_by;

                    obj['venue'] = result[i].venue;

                    obj['result'] = result[i].result;

                    prev_activity_id= result[i].activity_id;

                    prev_participant_name = result[i].participant_name;

                    console.log("Comming")
                    var temp_prev_teacher_name = teacher_name.filter(c=>{
                      return result[i].activity_id==c.activity_id
                    })

                    if(temp_prev_teacher_name.length>0){
                      prev_teacher_name = temp_prev_teacher_name[0].teacher_name;
                    }else{
                      prev_teacher_name = ''
                    }

                    console.log(prev_teacher_name)

                }else{

                  obj['participant_name'] = result[i].participant_name;

                  obj['teacher_name'] = prev_teacher_name;

                  data.push(obj);

                  var obj = {};              

                  obj['activity_date'] = result[i].activity_date;

                  obj['event_name'] =  result[i].event_name;

                  obj['activity_type'] =  result[i].activity_type;

                  obj['organised_by'] = result[i].organised_by;

                  obj['venue'] = result[i].venue;             

                  obj['result'] = result[i].result;

                  prev_activity_id=result[i].activity_id;

                  prev_participant_name = result[i].participant_name;
                  var temp_prev_teacher_name = teacher_name.filter(c=>{
                      return result[i].activity_id==c.activity_id
                    })

                    if(temp_prev_teacher_name.length>0){
                      prev_teacher_name = temp_prev_teacher_name[0].teacher_name;
                    }else{
                      prev_teacher_name = ''
                    }
                }

              }else{
                  if(result[i].participant_name != null){
                    prev_participant_name = prev_participant_name + ", " + result[i].participant_name;
                  }
                  prev_activity_id=result[i].activity_id; 

                }
              }
                if(error ==0){

                  obj['participant_name'] = prev_participant_name;
                  obj['teacher_name'] = prev_teacher_name;
                  data.push(obj);
                }
                var r = {}
                r.status = 's';
                r.activity_session_wise_report = data 
                console.log(data);
                res.send(r)

              });
          
          });

        });//end of ection con
      });
    });
});


/* Read Activity Session Wise CSV */

router.get('/csv_activity_session_wise_report/:activity_type/:session_id', function(req, res, next) {
  
  var activity_type = req.params.activity_type;
  var selected_session_id = req.params.session_id;
  console.log("HERE")

  req.getConnection(function(err,connection){
    var data = []
    var created_by = req.cookies.user
    var session_id = req.cookies.session_id
    console.log(session_id)
    var condition = "";
    var activityCondition="";
    var obj = {};

      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        if(activity_type=='Both') activityCondition = "";

        if(activity_type=='Intra-School') activityCondition = `and a.activity_type = '${activity_type}'`;

        if(activity_type=='Inter-School') activityCondition = `and a.activity_type= '${activity_type}'`;

        if(req.cookies.role != 'ADMIN') condition = `and a.created_by = '${created_by}'`;

        var qry =` select date_format(activity_date,'%d/%m/%Y') as activity_date, activity_date as a_date,
                    a.activity_id, f.event_name, organised_by, venue, result,a.activity_type, 
                    concat(c.first_name,' ',c.middle_name,' ',c.last_name)as participant_name
                    from school_activity a
                    left join activity_participant_map b on a.activity_id = b.activity_id
                    left join student_master c on (b.student_id = c.student_id and c.current_session_id = ${session_id})
                    join activity_event_master f on a.event_id = f.event_id
                    where session_id = ${selected_session_id}
                    ${activityCondition} ${condition}
                    order by a_date `;

        var qry_one =`select activity_id,GROUP_CONCAT(teacher_name1) as teacher_name from 
                      (select a.activity_id,a.session_id,
                      concat(first_name,' ',middle_name,' ',last_name)as teacher_name1
                      from school_activity a
                      left join activity_teacher_map b on a.activity_id = b.activity_id
                      join employee c on b.teacher_id=c.emp_id
                      where a.session_id = ${selected_session_id}
                      ) a
                      GROUP BY activity_id, teacher_name1`;

        var teacher_name = ''; 

        connection.query(qry_one, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          teacher_name = result;
           //connection.end()
           console.log(teacher_name);

        connection.query(qry, function(error, result)
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
              var prev_activity_id = "";
              var prev_participant_name = "";
              var prev_teacher_name="";
              var prev_participant_id=0;
              var activity_id = 0;
              var error = 1;
              console.log(result)

            for(var i = 0; i < result.length; i++){
              var error = 0;
              if(result[i].activity_id != prev_activity_id){// distinct event name

                if(prev_activity_id ==""){    // loop runs first time

                    var obj = {};

                    obj['Date'] = result[i].activity_date;

                    obj['Event'] =  result[i].event_name;

                    obj['Type'] =  result[i].activity_type;

                    obj['Organised By'] = result[i].organised_by;

                    obj['Venue'] = result[i].venue;

                    obj['Result'] = result[i].result;

                    prev_activity_id= result[i].activity_id;

                    prev_participant_name = result[i].participant_name;

                    console.log("Comming")
                    var temp_prev_teacher_name = teacher_name.filter(c=>{
                      return result[i].activity_id==c.activity_id
                    })

                    if(temp_prev_teacher_name.length>0){
                      prev_teacher_name = temp_prev_teacher_name[0].teacher_name;
                    }else{
                      prev_teacher_name = ''
                    }

                    console.log(prev_teacher_name)

                }else{

                  obj['Participant'] = result[i].participant_name;

                  obj['Teacher Incharge'] = prev_teacher_name;

                  data.push(obj);

                  var obj = {};              

                  obj['Date'] = result[i].activity_date;

                  obj['Event'] =  result[i].event_name;

                  obj['Type'] =  result[i].activity_type;

                  obj['Organised By'] = result[i].organised_by;

                  obj['Venue'] = result[i].venue;             

                  obj['Result'] = result[i].result;

                  prev_activity_id=result[i].activity_id;

                  prev_participant_name = result[i].participant_name;
                  var temp_prev_teacher_name = teacher_name.filter(c=>{
                      return result[i].activity_id==c.activity_id
                    })

                    if(temp_prev_teacher_name.length>0){
                      prev_teacher_name = temp_prev_teacher_name[0].teacher_name;
                    }else{
                      prev_teacher_name = ''
                    }
                }

              }else{
                  if(result[i].participant_name != null){
                    prev_participant_name = prev_participant_name + ", " + result[i].participant_name;
                  }
                  prev_activity_id=result[i].activity_id; 
                }
              }
                if(error ==0){

                  obj['Participant'] = prev_participant_name;
                  obj['Teacher Incharge'] = prev_teacher_name;
                  data.push(obj);
                }
                const fields = ['Date','Type','Event','Organised By','Venue','Participant','Teacher Incharge','Result'];
                const json2csvParser = new Json2csvParser({ fields });
                const csv = json2csvParser.parse(data);

                var path='./public/csv/SessionWiseActivity.csv'; 
                fs.writeFile(path, csv, function(err,data) {
                  if (err) {throw err;}
                  else{ 
                    res.send(data)
                    var url='http://localhost:4000/csv/SessionWiseActivity.csv';
                    var open = require("open","");
                    open(url);  
                  }
                });

              });
          
          });

        });//end of ection con
      });
    });
});

/* Read Activity Event Wise */

router.get('/read_activity_event_wise_report/:activity_type/:event_id', function(req, res, next) {
  
  var activity_type = req.params.activity_type;
  var event_id = req.params.event_id;
  console.log("HERE")

  req.getConnection(function(err,connection){
    var data = []
     var created_by = req.cookies.user
     var session_id = req.cookies.session_id
     console.log(session_id)
     var condition = "";
     var activityCondition="";
     var participant_name = "";
     var obj = {};


      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        if(activity_type=='Both') activityCondition = "";

        if(activity_type=='Intra-School') activityCondition = `and a.activity_type = '${activity_type}'`;

        if(activity_type=='Inter-School') activityCondition = `and a.activity_type= '${activity_type}'`;

        if(req.cookies.role != 'ADMIN') condition = `and a.created_by = '${created_by}'`;

        var qry =` select date_format(activity_date,'%d/%m/%Y') as activity_date, activity_date as a_date, a.activity_id,

                    activity_type, f.event_name, organised_by, venue, result,

                    concat(c.first_name,' ',c.middle_name,' ',c.last_name)as participant_name

                    from school_activity a

                    left join activity_participant_map b on a.activity_id = b.activity_id

                    left join student_master c on (b.student_id = c.student_id and c.current_session_id= ${session_id})

                    join session_master d on a.session_id=d.session_id

                    join activity_event_master f on a.event_id = f.event_id

                    where a.event_id = ${event_id}

                    ${activityCondition} ${condition}

                    order by a_date `;

        var qry_one = `select activity_id,GROUP_CONCAT(COALESCE(teacher_name1,'')) as teacher_name from 
                      (
                      select a.activity_id,a.session_id,

                      concat(first_name,' ',middle_name,' ',last_name)as teacher_name1

                      from school_activity a

                      left join activity_teacher_map b on a.activity_id = b.activity_id

                      join employee c on b.teacher_id=c.emp_id

                      where a.session_id = ${session_id}
                      ) a

                  GROUP BY activity_id, teacher_name1`;

        var teacher_name = ''; 

        connection.query(qry_one, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          teacher_name = result;
           //connection.end()
           console.log(teacher_name);

        connection.query(qry, function(error, result)
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

            var prev_activity_id = "";

            var prev_participant_name = "";

            var prev_teacher_name="";

            var prev_participant_id=0;

            var activity_id = 0;

            var error = 1;
            console.log(result)

            for(var i = 0; i < result.length; i++){
              error = 0;

              if(result[i].activity_id != prev_activity_id){// distinct event name

                if(prev_activity_id ==""){    // loop runs first time

                    var obj = {};

                    obj['activity_date'] = result[i].activity_date;

                    obj['event_name'] =  result[i].event_name;

                    obj['activity_type'] =  result[i].activity_type;

                    obj['organised_by'] = result[i].organised_by;

                    obj['venue'] = result[i].venue;

                    obj['result'] = result[i].result;

                    prev_activity_id= result[i].activity_id;

                    prev_participant_name = result[i].participant_name;

                    console.log("Comming")
                    var temp_prev_teacher_name = teacher_name.filter(c=>{
                      return result[i].activity_id==c.activity_id
                    })

                    if(temp_prev_teacher_name.length>0){
                      prev_teacher_name = temp_prev_teacher_name[0].teacher_name;
                    }else{
                      prev_teacher_name = ''
                    }

                    console.log(prev_teacher_name)

                }else{

                  obj['participant_name'] = result[i].participant_name;

                  obj['teacher_name'] = prev_teacher_name;

                  data.push(obj);

                  var obj = {};              

                  obj['activity_date'] = result[i].activity_date;

                  obj['event_name'] =  result[i].event_name;

                  obj['activity_type'] =  result[i].activity_type;

                  obj['organised_by'] = result[i].organised_by;

                  obj['venue'] = result[i].venue;             

                  obj['result'] = result[i].result;

                  prev_activity_id=result[i].activity_id;

                  prev_participant_name = result[i].participant_name;

                  var temp_prev_teacher_name = teacher_name.filter(c=>{
                      return result[i].activity_id==c.activity_id
                    })

                    if(temp_prev_teacher_name.length>0){
                      prev_teacher_name = temp_prev_teacher_name[0].teacher_name;
                    }else{
                      prev_teacher_name = ''
                    }

                    //prev_teacher_name=$this->readParticipantTeacher($activity_id);
                }

              }else{

                  if(result[i].participant_name != null){
                    prev_participant_name = prev_participant_name + ", " + result[i].participant_name;
                  }
                  prev_activity_id=result[i].activity_id; 

                }
              }

              if(error ==0){

                obj['participant_name'] = prev_participant_name;

                obj['teacher_name'] = prev_teacher_name;
                data.push(obj);
              }
                var r = {}
                r.status = 's';
                r.activity_event_wise_report = data 
                console.log(data);
                res.send(r)

              });
          
          });

        });//end of ection con
      });
    });
});


/* Read Activity Event Wise CSV */

router.get('/csv_activity_event_wise_report/:activity_type/:event_id', function(req, res, next) {
  
  var activity_type = req.params.activity_type;
  var event_id = req.params.event_id;
  console.log("HERE")

  req.getConnection(function(err,connection){
    var data = []
     var created_by = req.cookies.user
     var session_id = req.cookies.session_id
     console.log(session_id)
     var condition = "";
     var activityCondition="";
     var participant_name = "";
     var obj = {};


      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        if(activity_type=='Both') activityCondition = "";

        if(activity_type=='Intra-School') activityCondition = `and a.activity_type = '${activity_type}'`;

        if(activity_type=='Inter-School') activityCondition = `and a.activity_type= '${activity_type}'`;

        if(req.cookies.role != 'ADMIN') condition = `and a.created_by = '${created_by}'`;

        var qry =` select date_format(activity_date,'%d/%m/%Y') as activity_date, activity_date as a_date, a.activity_id,

                    activity_type, f.event_name, organised_by, venue, result,

                    concat(c.first_name,' ',c.middle_name,' ',c.last_name)as participant_name

                    from school_activity a

                    left join activity_participant_map b on a.activity_id = b.activity_id

                    left join student_master c on (b.student_id = c.student_id and c.current_session_id= ${session_id})

                    join session_master d on a.session_id=d.session_id

                    join activity_event_master f on a.event_id = f.event_id

                    where a.event_id = ${event_id}

                    ${activityCondition} ${condition}

                    order by a_date `;

        var qry_one = `select activity_id,GROUP_CONCAT(teacher_name1) as teacher_name from 
                      (
                      select a.activity_id,a.session_id,

                      concat(first_name,' ',middle_name,' ',last_name)as teacher_name1

                      from school_activity a

                      left join activity_teacher_map b on a.activity_id = b.activity_id

                      join employee c on b.teacher_id=c.emp_id

                      where a.session_id = ${session_id}
                      ) a

                  GROUP BY activity_id, teacher_name1`;

        var teacher_name = ''; 

        connection.query(qry_one, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          teacher_name = result;
           //connection.end()
           console.log(teacher_name);

        connection.query(qry, function(error, result)
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

            var prev_activity_id = "";

            var prev_participant_name = "";

            var prev_teacher_name="";

            var prev_participant_id=0;

            var activity_id = 0;

            var error = 1;
            console.log(result)

            for(var i = 0; i < result.length; i++){
              error = 0;

              if(result[i].activity_id != prev_activity_id){// distinct event name

                if(prev_activity_id ==""){    // loop runs first time

                    var obj = {};

                    obj['Date'] = result[i].activity_date;
                    obj['Type'] =  result[i].activity_type;
                    obj['Organised By'] = result[i].organised_by;
                    obj['Venue'] = result[i].venue;
                    obj['Result'] = result[i].result;
                    prev_activity_id= result[i].activity_id;
                    prev_participant_name = result[i].participant_name;
                    console.log("Comming")
                    var temp_prev_teacher_name = teacher_name.filter(c=>{
                      return result[i].activity_id==c.activity_id
                    })

                    if(temp_prev_teacher_name.length>0){
                      prev_teacher_name = temp_prev_teacher_name[0].teacher_name;
                    }else{
                      prev_teacher_name = ''
                    }

                    console.log(prev_teacher_name)

                }else{

                  obj['Participant'] = result[i].participant_name;
                  obj['Teacher Incharge'] = prev_teacher_name;
                  data.push(obj);
                  var obj = {};              
                  obj['Date'] = result[i].activity_date;
                  obj['Type'] =  result[i].activity_type;
                  obj['Organised By'] = result[i].organised_by;
                  obj['Venue'] = result[i].venue;             
                  obj['Result'] = result[i].result;

                  prev_activity_id=result[i].activity_id;
                  prev_participant_name = result[i].participant_name;
                  var temp_prev_teacher_name = teacher_name.filter(c=>{
                      return result[i].activity_id==c.activity_id
                    })

                    if(temp_prev_teacher_name.length>0){
                      prev_teacher_name = temp_prev_teacher_name[0].teacher_name;
                    }else{
                      prev_teacher_name = ''
                    }

                    //prev_teacher_name=$this->readParticipantTeacher($activity_id);
                }

              }else{

                  prev_participant_name = prev_participant_name + ", " + result[i].participant_name;

                  prev_activity_id=result[i].activity_id; 

                }
              }

              if(error ==0){

                obj['Participant'] = prev_participant_name;
                obj['Teacher Incharge'] = prev_teacher_name;
                data.push(obj);
              }
                const fields = ['Date','Type','Organised By','Venue','Participant','Teacher Incharge','Result'];
                const json2csvParser = new Json2csvParser({ fields });
                const csv = json2csvParser.parse(data);

                var path='./public/csv/EventWiseActivity .csv'; 
                fs.writeFile(path, csv, function(err,data) {
                  if (err) {throw err;}
                  else{ 
                    res.send(data)
                    var url='http://localhost:4000/csv/EventWiseActivity .csv';
                    var open = require("open","");
                    open(url);  
                  }
                });

              });
          
          });

        });//end of ection con
      });
    });
});



/* Read Student Event Report CSV */

router.get('/csv_student_event_report/:start_date/:end_date', function(req, res, next) {

  var start_date = req.params.start_date;
  var end_date = req.params.end_date;

  req.getConnection(function(err,connection){
    var data = []
    var created_by = req.cookies.user
    var session_id = req.cookies.session_id
    var condition = "";
    var obj = {}; 

    if(req.cookies.role != 'ADMIN') condition = `and a.created_by = '${created_by}'`;
       
    var qry =`select a.student_id, concat(first_name,' ',middle_name,' ',last_name)as student_name,
              g.event_name, enroll_number, concat(standard,' ',section)as standard
              from activity_participant_map a
              join school_activity b on a.activity_id = b.activity_id
              join student_master c on (a.student_id = c.student_id and c.current_session_id= ${session_id})
              join student_current_standing d on c.student_id = d.student_id
              join section_master e on d.section_id = e.section_id
              join standard_master f on e.standard_id = f.standard_id
              join activity_event_master g on b.event_id = g.event_id
              where activity_date between '${start_date}' and '${end_date}'
              ${condition}
              order by e.section_id, student_name `;
      connection.query(qry,function(err,result)     {     
        if(err){
           console.log("Error reading data : %s ",err );
           data.status = 'e';

        }else{
          var prev_student_id = "";
          var prev_event_name="";
          var error = 1;

            for(var i = 0; i < result.length; i++){
              var error = 0;
              if(result[i].student_id != prev_student_id){// distinct event name

                if(prev_student_id ==""){    // loop runs first time
                  var obj = {};
                  obj['Participant Name'] = result[i].student_name;
                  obj['Enroll No'] =  result[i].enroll_number;
                  obj['Standard'] =  result[i].standard;
                  prev_student_id= result[i].student_id;
                  prev_event_name = result[i].event_name;
                }else{
                  obj['event_name'] = prev_event_name;
                  data.push(obj);
                  var obj = {};              
                  obj['Participant Name'] = result[i].student_name;
                  obj['Enroll No'] =  result[i].enroll_number;
                  obj['Standard'] =  result[i].standard;
                  prev_student_id=result[i].student_id;
                  prev_event_name = result[i].event_name;
                }
              }else{
                prev_event_name = prev_event_name + ", " + result[i].event_name;
                prev_student_id=result[i].student_id; 
              }
            }
              if(error ==0){
                obj['Event'] = prev_event_name;
                data.push(obj);
              }
               const fields = ['Participant Name','Enroll No','Standard','Event'];
                const json2csvParser = new Json2csvParser({ fields });
                const csv = json2csvParser.parse(data);

                var path='./public/csv/StudentEvent.csv'; 
                fs.writeFile(path, csv, function(err,data) {
                  if (err) {throw err;}
                  else{ 
                    res.send(data)
                    var url='http://localhost:4000/csv/StudentEvent.csv';
                    var open = require("open","");
                    open(url);  
                  }
                });
            }
        }); 
    });

});

/* Read Student Event Report */

router.get('/read_student_event_report/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;

  req.getConnection(function(err,connection){
    var data = []
    var created_by = req.cookies.user
    var session_id = req.cookies.session_id
    var condition = "";
    var obj = {}; 

    if(req.cookies.role != 'ADMIN') condition = `and a.created_by = '${created_by}'`;
       
    var qry =`select a.student_id, concat(first_name,' ',middle_name,' ',last_name)as student_name,
              g.event_name, enroll_number, concat(standard,' ',section)as standard
              from activity_participant_map a
              join school_activity b on a.activity_id = b.activity_id
              join student_master c on (a.student_id = c.student_id and c.current_session_id= ${session_id})
              join student_current_standing d on c.student_id = d.student_id
              join section_master e on d.section_id = e.section_id
              join standard_master f on e.standard_id = f.standard_id
              join activity_event_master g on b.event_id = g.event_id
              where activity_date between '${start_date}' and '${end_date}'
              ${condition}
              order by e.section_id, student_name `;
      connection.query(qry,function(err,result)     {     
        if(err){
           console.log("Error reading data : %s ",err );
           data.status = 'e';

        }else{
          var prev_student_id = "";
          var prev_event_name="";
          var error = 1;

            for(var i = 0; i < result.length; i++){
              var error = 0;
              if(result[i].student_id != prev_student_id){// distinct event name

                if(prev_student_id ==""){    // loop runs first time
                  var obj = {};
                  obj['student_name'] = result[i].student_name;
                  obj['enroll_number'] =  result[i].enroll_number;
                  obj['standard'] =  result[i].standard;
                  prev_student_id= result[i].student_id;
                  prev_event_name = result[i].event_name;
                }else{
                  obj['event_name'] = prev_event_name;
                  data.push(obj);
                  var obj = {};              
                  obj['student_name'] = result[i].student_name;
                  obj['enroll_number'] =  result[i].enroll_number;
                  obj['standard'] =  result[i].standard;
                  prev_student_id=result[i].student_id;
                  prev_event_name = result[i].event_name;
                }
              }else{
                prev_event_name = prev_event_name + ", " + result[i].event_name;
                prev_student_id=result[i].student_id; 
              }
            }
              if(error ==0){
                obj['event_name'] = prev_event_name;
                data.push(obj);
              }
                var r = {}
                r.status = 's';
                r.student_event_report = data 
                console.log(data);
                res.send(r)
          }
        }); 
    });

});

module.exports = router;
