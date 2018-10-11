var express = require('express');
var router = express.Router();

var pool = require('../db');


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
    var creation_date = new Date(jsonDate);

    var modified_by = req.cookies.role;
    //console.log(input)

    var session_id = req.cookies.session_id;
    var slips = input.fee;




    req.getConnection(function(err, connection) {
        connection.beginTransaction(function(err) {

            for (var i = 0; i < slips.length; i++) {
                if (slips[i].amount > 0) {

                    var count = -1;
                    var updateCount = -2;
                    console.log("Count 1")


                    var q = `select count(*) as total from 
          fee_scholorship 
          where student_id=${input.student_id}
          and fee_slip_id=${slips[i].fee_slip_id}`;

                    if (err) { throw err; }

                    connection.query(q, function(error, results, fields) {
                        if (error) {
                            return connection.rollback(function() {
                                throw error;
                            });
                        } else {
                            //console.log("result" + results[0].total)
                            var total = results[0].total
                            console.log("results")
                            count = total;
                            console.log("total = " + total)
                            console.log("Count 2")
                            if (total > 0) updateCount = 1;

                            
                        }
                    })

                    var q1 = `select count(*) as totals from fee_received 
          where student_id=${input.student_id}
          and fee_slip_id=${slips[i].fee_slip_id}`;

                    connection.query(q1, function(error1, results1, fields) {
                        if (error1) {
                            return connection.rollback(function() {
                                throw error1;
                            });
                        } else {
                            var totals = results1[0].totals
                            if (totals > 0) {
                                updateCount = 2;
                                count = -999;
                            }
                        }
                    })
                    var data = [];
                    console.log("count ======" + count)
                    console.log("Count 3")
                    if (count == 0) { // insert
                        var queryAdd = `insert into fee_scholorship(student_id,fee_slip_id,scholorship_amount,session_id,
            scholorship_remarks,creation_date,modified_by)
            values(${input.student_id},${slips[i].fee_slip_id},${slips[i].amount},${session_id},
            ${input.scholorship_remarks},${creation_date},${modified_by})`;

                        connection.query(queryAdd, function(error2, results2) {
                            if (error2) {
                                return connection.rollback(function() {
                                    throw error2;
                                });
                            } else {
                                data.status = 's';
                                data.scholarSlips = results2;

                            }
                        })

                        //$statement->execute();
                    } else if (updateCount == 1) { // update
                        var queryUpdate = `update fee_scholorship set scholorship_amount=${slips[i].amount}
           where student_id=${input.student_id}
           and fee_slip_id=${slips[i].fee_slip_id}`;
                        connection.query(queryUpdate, function(error3, results3) {
                            if (error3) {
                                return connection.rollback(function() {
                                    throw error3;
                                });
                            } else {
                                data.status = 's';
                                data.scholarSlips = results3;

                            }
                        })

                    }



                }
            }
            res.send(JSON.stringify(data))

        })
    })

    console.log('res')
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