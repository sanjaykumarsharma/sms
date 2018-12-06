var express = require('express');
var router = express.Router();
var pool = require('../db');

router.get('/read-init', function(req, res, next) {

     var data = {}

      var condition="";
      if(req.cookies.role == "TEACHER"){
        condition = ` and employee_id = ${req.cookies.role} `;
      }

      var teachers = `select emp_id, concat(first_name,' ',middle_name,' ',last_name)as name 
                 from employee
                 where emp_type_id!=5 and is_active='Y' ${condition} 
                 order by name`;     

      var days = `select day_id,day_name 
                 from day_master 
                 where session_id=${req.cookies.session_id} `;   

      var periods = `select period_id, period_name,
                     concat('(',time_format(start_time, '%H:%i'),' - ',time_format(end_time, '%H:%i'),')' ) as period_time,
                     is_break
                     from period_master`;
           

      var rooms = `select room_id,room_name from room_master`;    

      var qry = teachers+';'+days+';'+periods+';'+rooms;

      console.log(qry);

     pool.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading teachers : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
          data.status = 's';
          data.teachers = result[0];
          data.days = result[1];
          data.periods = result[2];
          data.rooms = result[3];
          res.send(data)
        }
     
     });

});



router.get('/read-periods/:emp_id', function(req, res, next) {

     var data = {}

      var time_table  = `select distinct a.period_id,a.day_id,a.room_id,a.subject_id,subject_short_name,period_type,d.day_name,e.room_name,
                         concat(standard,'  ',section) as standard,g.standard_id,a.section_id 
                         from time_table_substitution a
                         left join subject_master b on(a.subject_id = b.subject_id)
                         left join period_master c on(a.period_id = c.period_id)
                         left join day_master d on(a.day_id=d.day_id)
                         left join room_master e on (a.room_id= e.room_id)
                         left join section_master f on (a.section_id= f.section_id)
                         left join standard_master g on (f.standard_id= g.standard_id)
                         where a.teacher_id=${req.params.emp_id}
                         and a.session_id=${req.cookies.session_id}
                         order by a.day_id`;

      console.log(time_table);

     pool.query(time_table,function(err,result)     {
            
        if(err){
           console.log("Error reading time_table : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
          data.status = 's';
          data.time_table = result;
          res.send(data)
        }
     
     });

});


router.post('/reset-time-table', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log(input)

  var data = {} 

    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }

        var query = `delete from time_table_substitution`;

        console.log(query)             

        connection.query(query, function (error, rows) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }

           var qry = `insert into time_table_substitution(section_id,period_id,day_id,subject_id,period_type,
                      room_id,teacher_id,session_id,creation_date,modification_date,modified_by)
                      select section_id,period_id,day_id,subject_id,period_type,
                      room_id,teacher_id,session_id,creation_date,modification_date,modified_by
                      from time_table`;

          connection.query(qry, function (error, rows) {
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
              res.send(data)
            });

          });

        });//main query
      });
    });
  });



router.post('/read-edit-time-table', function(req, res, next) {

     var input = JSON.parse(JSON.stringify(req.body));

     var data = {}

     var free_periods = `select * from
                        (select emp_id, concat(first_name, ' ', middle_name, ' ', last_name)as teacher,a.department_id,
                        count(period_id)as period_count_day
                        from employee a
                        join time_table_substitution b on a.emp_id=b.teacher_id
                        where emp_type_id!=5 and is_active='Y' and b.teacher_id not in((select teacher_id from time_table_substitution 
                                                  where period_id=${input.period_id} and day_id=${input.day_id} and session_id=${req.cookies.session_id}))
                        and b.day_id=${input.day_id}
                        group by teacher_id 
                        
                        UNION
                        
                        select emp_id, concat(first_name, ' ', middle_name, ' ', last_name)as teacher,a.department_id,
                        '0' as period_count_day 
                        from employee a
                        where emp_type_id!=5 and is_active='Y' and emp_id not in (select distinct teacher_id from time_table_substitution 
                                             where session_id=${req.cookies.session_id}))a  
                        order by teacher`;

      var teacher_peiods = `select * from
                          (select emp_id, concat(first_name, ' ', middle_name, ' ', last_name)as teacher,a.department_id,
                          count(period_id)as period_count_day
                          from employee a
                          join time_table b on a.emp_id=b.teacher_id
                          where emp_type_id!=5 and is_active='Y' and b.teacher_id not in((select teacher_id from time_table 
                                                    where period_id=${input.period_id} and day_id=${input.day_id} and session_id=${req.cookies.session_id}) )
                          and b.day_id=${input.day_id}
                          group by teacher_id 
                          
                          UNION
                          
                          select emp_id, concat(first_name, ' ', middle_name, ' ', last_name)as teacher,a.department_id,
                          '0' as period_count_day 
                          from employee a
                          where emp_type_id!=5 and is_active='Y' and emp_id not in (select distinct teacher_id from time_table 
                                               where session_id=${req.cookies.session_id}))a  
                          order by teacher`;                  

      var qry = free_periods+';'+teacher_peiods;
      console.log(qry);

     pool.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading teachers : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
          data.status = 's';
          data.free_periods = result[0];
          data.teacher_peiods = result[1];
          res.send(data)
        }
     
     });

});




router.post('/edit-time-table', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log(input)

  var data = {} 

    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }

        var query = `delete from time_table where day_id = ${input.day_id} and period_id=${input.period_id} and teacher_id=${input.teacher_id}
                     and session_id=${req.cookies.session_id} `;

        connection.query(query, function (error, rows) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }

          var sql = `insert into time_table(teacher_id,subject_id,period_type,period_id,room_id,section_id,day_id,session_id,creation_date,modified_by)
                     values(${input.teacher_id},${input.subject_id},'${input.period_type}',${input.period_id},${input.room_id},${input.section_id},
                     ${input.day_id},${req.cookies.session_id},curdate(),'${req.cookies.user}')`;

          connection.query(sql, function(error, rows)
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
              res.send(data)
            });
          });
        });//main query
      });
    });
  });


router.post('/add-time-table', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log(input)

  var data = {} 

    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }

        var query = '';

        input.days.map(d=>{
           var  q = `select count(section_id) as section_id_count from time_table
                       where period_id=${input.period_id} and day_id=${d.day_id} and teacher_id=${input.teacher_id}
                       and session_id= ${req.cookies.session_id} `;

            if(query==''){
              query = q;
            }else{
              query = query+';'+q;
            }
        })             

        console.log(query)             

        connection.query(query, function (error, rows) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }

          console.log(rows)
          console.log(rows.length)
          var count = 0;
          if(rows.length==1){
            count = rows[0].section_id_count 
          }else if(rows.length>1){
            rows.map(c=>{
              count = count + c[0].section_id_count 
            })
          }
          

          console.log(count)

          if(count==0){
             
             var sql = ''

             input.days.map(d=>{
                 var  q = `insert into time_table(teacher_id,subject_id,period_type,period_id,room_id,section_id,day_id,session_id,creation_date,modified_by)
                           values(${input.teacher_id},${input.subject_id},'${input.period_type}',${input.period_id},${input.room_id},${input.section_id},
                           ${d.day_id},${req.cookies.session_id},curdate(),'${req.cookies.user}')`;

                  if(sql==''){
                    sql = q;
                  }else{
                    sql = sql+';'+q;
                  }
              })             
       
            connection.query(sql, function(error, rows)
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
                res.send(data)
              });
            });

          }else{
            data.status = 'e';
            data.messaage = 'Please Check Your Selection';
            console.log(data);
            res.send(data)
          }

          
        });//main query
      });
    });
  });


router.post('/delete-time-table', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log(input)

  var data = {} 

    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }

        var query = `delete from time_table where day_id = ${input.day_id} and period_id=${input.period_id} and teacher_id=${input.teacher_id}
                     and session_id=${req.cookies.session_id} `;

        console.log(query)             

        connection.query(query, function (error, rows) {
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
            res.send(data)
          });

        });//main query
      });
    });
  });




module.exports = router;
