var express = require('express');
var router = express.Router();

var pool = require('../db');
var async = require("async");

/* Read Session listing. */
router.get('/', function(req, res, next) {
    var data = {}
    var session_id = req.cookies.session_id;
    var qry = `select scholorship_id, concat(first_name,' ',middle_name,' ',last_name) as student_name,
  concat(standard,' ',section)as standard, enroll_number, scholorship_amount, 
  scholorship_remarks, fee_slip_name, e.student_id,e.fee_slip_id
  from student_master a
  join student_current_standing b on (a.student_id = b.student_id and a.current_session_id =${session_id})
  join section_master c on b.section_id = c.section_id
  join standard_master d on c.standard_id = d.standard_id
  join fee_scholorship e on (b.student_id = e.student_id and b.session_id =${session_id})
  join fee_slip f on e.fee_slip_id = f.fee_slip_id
  where e.session_id= ${session_id}
  order by enroll_number, e.fee_slip_id`;
    console.log("Starting time")
    console.log(new Date())
    pool.query(qry, function(err, result) {
        console.log("Ending time")
        console.log(new Date())
        if (err) {
            console.log("Error reading scholarship : %s ", err);
            data.status = 'e';

        } else {
            // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.students = result;
            //connection.end()

            res.send(data)
        }

    });
});

//====== students ======
router.get('/read_student/:enroll', function(req, res, next) {
    var enroll = req.params.enroll;
    req.getConnection(function(err, connection) {

        var data = {}
        var session_id = req.cookies.session_id;
        var qry = `select b.session_id, a.student_id, d.standard_id, 
   concat(first_name,' ',middle_name,' ',last_name) as student_name,
   concat(standard,'-',section)as standard,
   a.last_fee_slip_id
   from student_master a
   join student_current_standing b on (a.student_id = b.student_id and a.current_session_id = ${session_id})
   join section_master c on b.section_id = c.section_id
   join standard_master d on c.standard_id = d.standard_id
   where enroll_number=? 
   and b.session_id = ${session_id}`;


        connection.query(qry, [enroll], function(err, result) {

            if (err) {
                console.log("Error reading students : %s ", err);
                data.status = 'e';

            } else {
                // res.render('customers',{page_title:"Customers - Node.js",data:rows});
                data.status = 's';
                data.student = result;
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
        var qry = `select a.fee_slip_name, a.fee_slip_id,a.total_amount,scholorship_amount, scholorship_remarks
   from fee_slip a
   JOIN fee_plan_student_map b on (a.fee_plan_id = b.fee_plan_id and b.student_id = ${student_id})
   LEFT JOIN fee_scholorship c on (a.fee_slip_id = c.fee_slip_id and c.student_id = ${student_id})
   JOIN session_master d on (b.session_id=d.session_id and d.session_id=${session_id})
   order by 2`;


        connection.query(qry, [student_id], function(err, result) {

            if (err) {
                console.log("Error reading scholarship fee slip : %s ", err);
                data.status = 'e';

            } else {
                // res.render('customers',{page_title:"Customers - Node.js",data:rows});
                data.status = 's';
                data.scholarSlips = result;
                //connection.end()

                res.send(JSON.stringify(data))
            }

        });

    });

});

/* Add Event listing. */
router.post('/add', function(req, res, next) {

    var input = JSON.parse(JSON.stringify(req.body));
    var now = new Date();
    var jsonDate = now.toJSON();
    var creation_date = '2018-10-10';

    var modified_by = req.cookies.role;
    //console.log(input)

    var session_id = req.cookies.session_id;
    var slips = input.fee;


    var fee_slip_id = '';
    var amount = 0;
    var data = [];
    console.log("====slips====")
    console.log(slips)
   
     req.getConnection(function(err, connection) {
         connection.beginTransaction(function(err) {

          if (err) { throw err; }
            
            async.eachSeries(slips,function iteratorOverElems(element,callback) {
                console.log("------------")
                 console.log(slips[index])

                 
                  })
              },function finalCb(err){
              if(err){
                 //rollback
              }else{
              // commmit here when all the insertions have been successful            
              }
          });
            
          //res.send(JSON.stringify(data))

    });

  
});


/* Edit Event listing. */
router.post('/edit/:bank_ac', function(req, res, next) {

    var input = JSON.parse(JSON.stringify(req.body));
    var bank_ac = input.bank_ac;

    req.getConnection(function(err, connection) {
        var data = {}

        var values = {
            bank_account_no: input.bank_account_no,
            bank_name: input.bank_name,
            branch: input.branch,
        };

        var query = connection.query("UPDATE bank_account_master set ? WHERE bank_account_no = ?", [values, bank_ac], function(err, rows) {

            if (err) {
                console.log("Error updating bank : %s ", err);
                data.status = 'e';

            } else {
                data.status = 's';
                data.id = rows.insertId;
                res.send(JSON.stringify(data))
            }


        });
    });

});

/* Delete Event listing. */
router.get('/delete/:bank_ac', function(req, res, next) {

    var bank_ac = req.params.bank_ac;

    req.getConnection(function(err, connection) {
        var data = {}

        var query = connection.query("DELETE from bank_account_master WHERE bank_account_no = ?", [bank_ac], function(err, rows) {

            if (err) {
                console.log("Error deleting bank : %s ", err);
                data.status = 'e';

            } else {
                data.status = 's';
                res.send(JSON.stringify(data))
            }


        });
    });

});


module.exports = router;