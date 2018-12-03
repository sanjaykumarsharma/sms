var express = require('express');
var router = express.Router();
var pool = require('../db');

router.get('/read-teachers', function(req, res, next) {

     var data = {}

      var condition="";
      // if($_SESSION['role'] == "TEACHER"){
      //   $condition = " and employee_id = :employee_id ";
      // }

      var qry = `select emp_id, concat(first_name,' ',middle_name,' ',last_name)as name 
                 from employee
                 where emp_type_id!=5 and is_active='Y' ${condition} 
                 order by name`;          

      console.log(qry);

     pool.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading teachers : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
          data.status = 's';
          data.teachers = result;
          res.send(data)
        }
     
     });

});

router.get('/read-periods/:emp_id', function(req, res, next) {

     var data = {}

      var periods = `select period_id, period_name,
                     concat('(',time_format(start_time, '%H:%i'),' - ',time_format(end_time, '%H:%i'),')' ) as period_time,
                     is_break
                     from period_master`;

      var days = `select day_id,day_name from day_master
                  where session_id=${req.cookies.session_id}
                  order by 1`;

      // var days = `select day_id,day_name from day_master
      //             where day_id not in (select day_id from time_table where teacher_id=${req.params.emp_id} )
      //             and session_id=${req.cookies.session_id}
      //             order by 1`;            

      var time_table = `select distinct a.period_id,a.day_id,a.room_id,a.subject_id,subject_short_name,period_type,d.day_name,e.room_name,
                        concat(standard,'  ',section) as standard,g.standard_id,a.section_id 
                        from time_table a
                        left join subject_master b on(a.subject_id = b.subject_id)
                        left join period_master c on(a.period_id = c.period_id)
                        left join day_master d on(a.day_id=d.day_id)
                        left join room_master e on (a.room_id= e.room_id)
                        left join section_master f on (a.section_id= f.section_id)
                        left join standard_master g on (f.standard_id= g.standard_id)
                        where a.teacher_id=${req.params.emp_id}
                        and a.session_id=${req.cookies.session_id}
                        order by a.day_id`;

      var qry = periods+';'+days+';'+time_table;

      console.log(qry);

     pool.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading periods/days/time_table : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
          data.status = 's';
          
          //result of first query conversion
          var head= {};
          head['day']="Days/Periods";

          //var header = [];
          //var dataFields = [];
          var period_break = [];

          result[0].map(p=>{

            var objs={};
            objs["subject"]=p.period_name;
            objs["room"]=p.period_time;

            head["P"+p.period_id]=objs;

            //header.push(p.period_name);
            //dataFields.push("P"+p.period_id);
        
            // if(p.is_break == 'Y'){
            //   period_break["P"+p.period_id] = 1;
            // }else{
            //   period_break["P"+p.period_id] = 0;
            // }  

          })

          data.head = head;
          // data.header = header;
          // data.dataFields = dataFields;
          // data.period_break = period_break;
          data.periods = result[0];
          
          //result of second query conversion

          data.days = result[1];
          data.time_table = result[2];
          res.send(data)
        }
     
     });

});



module.exports = router;
