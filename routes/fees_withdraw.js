var express = require('express');
var router = express.Router();

var pool = require('../db');

//====== students ======
router.get('/read_student/:enroll', function(req, res, next) {
    var enroll = req.params.enroll;
    req.getConnection(function(err, connection) {

        var data = {}
        var session_id = req.cookies.session_id;
        var qry =`select b.session_id, a.student_id, d.standard_id, 
                  concat(first_name,' ',middle_name,' ',last_name) as student_name,
                  a.last_fee_slip_id,
                  concat(d.standard,' ',c.section)as standard
                  from student_master a
                  join student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${session_id})
                  join section_master c on b.section_id = c.section_id
                  join standard_master d on c.standard_id = d.standard_id
                  where enroll_number=? 
                  and b.session_id = ${session_id}`;


        pool.query(qry, [enroll], function(err, result) {

            if (err) {
                console.log("Error reading students : %s ", err);
                data.status = 'e';

            } else {
                // res.render('customers',{page_title:"Customers - Node.js",data:rows});
                data.status = 's';
                data.students = result;
                //connection.end()

                res.send(JSON.stringify(data))
            }

        });

    });

});

//======== read fee slip by student =====
router.get('/read_fee_slip/:student_id', function(req, res, next) {
    var student_id = req.params.student_id;
    req.getConnection(function(err, connection) {

        var data = {}
        var session_id = req.cookies.session_id;
        var qry = `select fee_slip_name, a.fee_slip_id, a.fee_plan_id,
                    total_amount as amount
                    from fee_slip a
                    LEFT JOIN fee_plan_student_map c on  a.fee_plan_id = c.fee_plan_id
                    where  c.student_id = ${student_id}
                    and session_id=${session_id}  
                    order by 2`;
            pool.query(qry, [student_id], function(err, result){
            if (err) {
                console.log("Error reading scholarship fee slip : %s ", err);
                data.status = 'e';
            } else {
                // res.render('customers',{page_title:"Customers - Node.js",data:rows});
                data.status = 's';
                data.fee_slips = result;
                //connection.end()
                res.send(JSON.stringify(data))
            }
        });

    });

});

/*Assign Fees*/

router.post('/active_fees/:fee_slip_id/:student_id/', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var modified_by=req.cookies.role;
  var session_id = req.cookies.session_id;
  var fee_slip_id = req.params.fee_slip_id;
  var student_id = req.params.student_id;

  req.getConnection(function(err,connection){
        var data = {}      
       
        var sql = `update student_master set 
                   last_fee_slip_id= ${fee_slip_id},
                   modified_by= '${modified_by}'
                   where student_id = ${student_id}
                   and current_session_id =${session_id} `;

        connection.query(sql, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting student group map : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
          }else{
              data.status = 's';
              //data.feeSlips = rows;
              res.send(data)
          }
          
        });
   });

});


module.exports = router;